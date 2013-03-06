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

    public static function LoadById($id) {
        if ($row = DBConnection::getInstance()->firstResult("SELECT * FROM games WHERE id=$id")) {
            return new Game($row['id'], $row['player1'], $row['player2'], $row['player1Score'], $row['player2Score'], $row['date'], $row['validated']);
        } else {
            return null;
        }
    }
};
