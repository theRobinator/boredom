<?php

require_once '../settings.php';
require_once API_DIR . 'apicontroller.php';
require_once LIBS_DIR . 'gamelistutils.php';


class GamesListAPIController extends APIController {
    public function __construct() {
        $this->requiredParams = array('user_id');
    }

    public function getResponseData($params) {
        $user = User::LoadByID($params['user_id']);

        if (!$user) {
            throw new APIException(APIException::INVALID_PARAMS, 'The specified user does not exist');
        }
        $games = GameListUtils::LoadGamesForPlayer($user->getId());

        $result = array();
        foreach ($games as $game) {
            $result[] = $game->toArray();
        }
        return array(
            'games_list' => $result
        );
    }
}
