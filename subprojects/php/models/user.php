<?php
require_once '../settings.php';
require_once LIBS_DIR . 'dbconnection.php';
require_once LIBS_DIR . 'utils.php' ;

class User {
    private $id;
    private $name;
    private $wins;
    private $losses;
    private $gamesPlayed;

    private static $registry = array();

    public function __construct($id, $name, $wins, $losses, $gamesPlayed) {
        $this->id = intval($id);
        $this->name = $name;
        $this->wins = intval($wins);
        $this->losses = intval($losses);
        $this->gamesPlayed = intval($gamesPlayed);
    }

    public function getGamesPlayed() {
        return $this->gamesPlayed;
    }

    public function getId() {
        return $this->id;
    }

    public function getLosses() {
        return $this->losses;
    }

    public function getName() {
        return $this->name;
    }

    public function getWins() {
        return $this->wins;
    }

    public function toArray() {
        return array(
            'id'            => $this->id,
            'name'          => $this->name,
            'wins'          => $this->wins,
            'losses'        => $this->losses,
            'games_played'  => $this->gamesPlayed
        );
    }

    public static function LoadByNameAndPassword($name, $password) {
        $name = mysql_real_escape_string($name);
        $hashedPass = Utils::HashPassword($password);
        $row = DBConnection::getInstance()->firstResult("SELECT * FROM users WHERE name='$name' AND password='$hashedPass' LIMIT 1;");
        if ($row) {
            return new User($row['id'], $row['name'], $row['wins'], $row['losses'], $row['games_played']);
        } else {
            return null;
        }
    }

    public static function LoadByID($id) {
        if (isset(User::$registry[$id])) {
            return User::$registry[$id];
        } elseif (($row = DBConnection::getInstance()->firstResult("SELECT * FROM users WHERE id=$id LIMIT 1;")) && $row['id']) {
            return new User($row['id'], $row['name'], $row['wins'], $row['losses'], $row['games_played']);
        } else {
            return null;
        }
    }

    public static function CreateUser($name, $password) {
        $name = mysql_real_escape_string($name);
        $hashedPass = Utils::HashPassword($password);
        try {
            DBConnection::getInstance()->query("INSERT INTO users (name, password) VALUES ('$name', '$hashedPass')");
            return User::LoadByNameAndPassword($name, $password);
        } catch (Exception $err) {
            return null;
        }
    }
}
