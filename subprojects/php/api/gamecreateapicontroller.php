<?php

require_once '../settings.php';
require_once API_DIR . 'apicontroller.php';
require_once LIBS_DIR . 'apiexception.php';
require_once MODELS_DIR . 'game.php';


class GameCreateAPIController extends APIController {
    public function __construct() {
        $this->requiredParams = array('player2id', 'player1score', 'player2score', 'date');
    }

    public function getResponseData($params) {
        if ($params['player2id'] == $this->user->getId()) {
            throw new APIException(APIException::INVALID_PARAMS, "You can't play against yourself in a game.");
        }
        $date = date('Y-m-d', $params['date']);
        if (Game::CreateGame($this->user->getId(), $params['player2id'], $params['player1score'], $params['player2score'], $date)) {
            return array();
        } else {
            throw new APIException(APIException::FAILURE, 'Could not create the game!');
        }
    }
}
