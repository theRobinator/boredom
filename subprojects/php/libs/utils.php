<?php

require_once '../settings.php';
require_once MODELS_DIR . 'user.php';

class Utils {
    public static function HashPassword($pass) {
        return md5($pass . '9137hto13t');
    }

    /**
     * Save the session.
     * @param User $user
     */
    public static function SaveSession($user) {
        $_SESSION['id'] = $user->getId();
        session_write_close();
    }

    /**
     * Load the session.
     * @return User
     */
    public static function LoadSession() {
        session_start();
        $id = $_SESSION['id'];
        if ($id) {
            return User::LoadByID($id);
        } else {
            return null;
        }
    }

    /**
     * Delete the session.
     */
    public static function DeleteSession() {
        $_SESSION['id'] = '';
        session_destroy();
    }
}
