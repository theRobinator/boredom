<?php

require_once '../settings.php';
require_once API_DIR . 'apicontroller.php';
require_once LIBS_DIR . 'apiexception.php';
require_once LIBS_DIR . 'utils.php';


class RegisterAPIController extends APIController {
    public function __construct() {
        $this->needsAuth = false;
        $this->requiredParams = array('username', 'password');
    }

    public function getResponseData($params) {
        $name = $params['username'];
        $password = $params['password'];

        $user = User::CreateUser($name, $password);
        if (!$user) {
            throw new APIException(APIException::INVALID_PARAMS, 'That username has already been taken.');
        }

        session_start();
        Utils::SaveSession($user);

        return array(
            'user' => $user->toArray()
        );
    }
}
