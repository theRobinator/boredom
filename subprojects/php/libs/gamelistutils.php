<?php

require_once '../settings.php';
require_once LIBS_DIR . 'dbconnection.php';
require_once MODELS_DIR .'game.php';

class GameListUtils {
    public static function LoadGamesForPlayer($id) {
        $result = array();
        $resource = DBConnection::getInstance()->query("SELECT * FROM games WHERE (player1=$id OR player2=$id) AND validated=1 ORDER BY date DESC");
        while ($row = mysql_fetch_array($resource)) {
            $result[] = new Game($row['id'], $row['player1'], $row['player2'], $row['player1score'], $row['player2score'], $row['date'], $row['validated']);
        }
        return $result;
    }

    public static function LoadUnapprovedGames($userId) {
        $result = array();
        $resource = DBConnection::getInstance()->query("SELECT * FROM games WHERE player2=$userId AND validated=0 ORDER BY date DESC");
        while ($row = mysql_fetch_array($resource)) {
            $result[] = new Game($row['id'], $row['player1'], $row['player2'], $row['player1score'], $row['player2score'], $row['date'], $row['validated']);
        }
        return $result;
    }

    public static function LoadRecentGames() {
        $result = array();
        $resource = DBConnection::getInstance()->query("SELECT * FROM games WHERE validated=1 ORDER BY date DESC LIMIT 10");
        while ($row = mysql_fetch_array($resource)) {
            $result[] = new Game($row['id'], $row['player1'], $row['player2'], $row['player1score'], $row['player2score'], $row['date'], $row['validated']);
        }
        return $result;
    }
}
