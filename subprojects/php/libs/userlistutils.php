<?php

require_once '../settings.php';
require_once LIBS_DIR . 'dbconnection.php';
require_once MODELS_DIR .'user.php';

class UserListUtils {
    public static function LoadAllUsers() {
        $result = array();
        $resource = DBConnection::getInstance()->query("SELECT * FROM users");
        while ($row = mysql_fetch_array($resource)) {
            $result[] = new User($row['id'], $row['name'], $row['wins'], $row['losses'], $row['games_played']);
        }
        return $result;
    }
}
