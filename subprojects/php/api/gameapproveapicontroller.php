<?php

require_once '../settings.php';
require_once API_DIR . 'apicontroller.php';
require_once LIBS_DIR . 'apiexception.php';
require_once MODELS_DIR . 'game.php';


class GameApproveAPIController extends APIController {
    public function __construct() {
        $this->requiredParams = array('game_id');
    }

    public function getResponseData($params) {
        if (Game::ApproveGame($params['game_id'], $this->user)) {
            return array();
        } else {
            throw new APIException(APIException::FAILURE, 'Could not approve game!');
        }
    }
}
