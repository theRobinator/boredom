<?php

require_once '../settings.php';
require_once API_DIR . 'apicontroller.php';
require_once LIBS_DIR . 'apiexception.php';
require_once LIBS_DIR . 'utils.php';


class LoginAPIController extends APIController {
    public function __construct() {
        $this->needsAuth = false;
        $this->requiredParams = array('username', 'password');
    }

    public function getResponseData($params) {
        $name = $params['username'];
        $password = $params['password'];

        $user = User::LoadByNameAndPassword($name, $password);
        if (!$user) {
            throw new APIException(APIException::AUTH_REQUIRED, 'Invalid login details supplied.');
        }

        session_start();
        Utils::SaveSession($user);

        return array(
            'user' => $user->toArray()
        );
    }
}
