<?php

require_once '../settings.php';
require_once API_DIR . 'apicontroller.php';
require_once LIBS_DIR . 'utils.php';


class LogoutAPIController extends APIController {
    public function getResponseData($params) {
        Utils::DeleteSession($this->user);
        return array(
            'message' => 'Goodbye.'
        );
    }
}
