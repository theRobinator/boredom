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

    public function __construct($id, $name, $wins, $losses, $gamesPlayed) {
        $this->id = $id;
        $this->name = $name;
        $this->wins = $wins;
        $this->losses = $losses;
        $this->gamesPlayed = $gamesPlayed;
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
            return new User($row['id'], $row['name'], $row['wins'], $row['losses'], $row['gamesPlayed']);
        } else {
            return null;
        }
    }

    public static function LoadByID($id) {
        $row = DBConnection::getInstance()->firstResult("SELECT * FROM users WHERE id=$id LIMIT 1;");
        if ($row) {
            return new User($row['id'], $row['name'], $row['wins'], $row['losses'], $row['gamesPlayed']);
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
