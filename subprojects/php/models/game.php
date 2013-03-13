<?php
require_once '../settings.php';
require_once LIBS_DIR . 'dbconnection.php';
require_once MODELS_DIR . 'user.php';

class Game {
    private $id;
    private $player1;
    private $player2;
    private $player1Score;
    private $player2Score;
    private $date;
    private $validated;

    private static $registry = array();

    public function __construct($id, $player1, $player2, $player1Score, $player2Score, $date, $validated) {
        $this->id = $id;
        $this->date = $date;
        $this->player1 = User::LoadByID($player1);
        $this->player1Score = $player1Score;
        $this->player2 = User::LoadByID($player2);
        $this->player2Score = $player2Score;
        $this->validated = $validated;
    }

    public function getWinner() {
        if ($this->player1Score > $this->player2Score) {
            return $this->player1;
        } elseif ($this->player2Score > $this->player1Score) {
            return $this->player2;
        } else {
            return null;
        }
    }

    public function getLoser() {
        if ($this->player1Score < $this->player2Score) {
            return $this->player1;
        } elseif ($this->player2Score < $this->player1Score) {
            return $this->player2;
        } else {
            return null;
        }
    }

    public function getDate() {
        return $this->date;
    }

    public function getId() {
        return $this->id;
    }

    public function getPlayer1() {
        return $this->player1;
    }

    public function getPlayer1Score() {
        return $this->player1Score;
    }

    public function getPlayer2() {
        return $this->player2;
    }

    public function getPlayer2Score() {
        return $this->player2Score;
    }

    public function getValidated() {
        return $this->validated;
    }

    public function toArray() {
        return array(
            'id' => $this->id,
            'date' => $this->date,
            'player1' => $this->getPlayer1()->toArray(),
            'player2' => $this->getPlayer2()->toArray(),
            'player1score' => $this->player1Score,
            'player2score' => $this->player2Score,
            'validated' => $this->validated
        );
    }

    public static function LoadById($id) {
        if (isset(Game::$registry[$id])) {
            return Game::$registry[$id];
        } elseif (($row = DBConnection::getInstance()->firstResult("SELECT * FROM games WHERE id=$id")) && $row['id']) {
            $game =  new Game($row['id'], $row['player1'], $row['player2'], $row['player1score'], $row['player2score'], $row['date'], $row['validated']);
            Game::$registry[$game->getId()] = $game;
            return $game;
        } else {
            return null;
        }
    }

    public static function CreateGame($player1, $player2, $player1Score, $player2Score, $date) {
        if (!User::LoadByID($player2)) {
            return false;
        }
        try {
            DBConnection::getInstance()->query("INSERT INTO games (player1, player2, player1score, player2score, `date`) VALUES ($player1, $player2, $player1Score, $player2Score, '$date')");
            return true;
        } catch (Exception $err) {
            return false;
        }
    }

    public static function ApproveGame($id, $user) {
        try {
            $game = Game::LoadById($id);
            if (!$game || $game->getValidated() || $game->getPlayer2()->getId() != $user->getId()) {
                throw new Exception();
            }
            DBConnection::getInstance()->query("UPDATE games SET validated=1 WHERE id=$id");

            // Update stats for the winner
            $winner = $game->getWinner();
            if ($winner) {
                $wins = $winner->getWins() + 1;
                $gamesPlayed = $winner->getGamesPlayed() + 1;
                $id = $winner->getId();
                DBConnection::getInstance()->query("UPDATE users SET wins=$wins, games_played=$gamesPlayed WHERE id=$id LIMIT 1");

                // Update stats for the loser
                $loser = $game->getLoser();
                $losses = $loser->getLosses() + 1;
                $gamesPlayed = $loser->getGamesPlayed() + 1;
                $id = $loser->getId();
                DBConnection::getInstance()->query("UPDATE users SET losses=$losses, games_played=$gamesPlayed WHERE id=$id LIMIT 1");
            } else {
                // This is a tie, update games played only
                $player1Id = $game->getPlayer1()->getId();
                $player2Id = $game->getPlayer2()->getId();
                DBConnection::getInstance()->query("UPDATE users SET games_played=games_played+1 WHERE id=$player1Id OR id=$player2Id LIMIT 2");
            }

            return true;
        } catch (Exception $err) {
            return false;
        }
    }

    public static function DenyGame($id, $user) {
        try {
            $game = Game::LoadById($id);
            if (!$game || $game->getValidated() || $game->getPlayer2()->getId() != $user->getId()) {
                throw new Exception();
            }
            DBConnection::getInstance()->query("DELETE FROM games WHERE id=$id");
            return true;
        } catch (Exception $err) {
            return false;
        }
    }
};
