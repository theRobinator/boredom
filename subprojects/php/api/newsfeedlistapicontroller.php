<?php

require_once '../settings.php';
require_once API_DIR . 'apicontroller.php';
require_once LIBS_DIR . 'gamelistutils.php';


class NewsfeedListAPIController extends APIController {
    public function getResponseData($params) {
        $games = GameListUtils::LoadRecentGames();

        $result = array();
        foreach ($games as $game) {
            $result[] = $game->toArray();
        }
        return array(
            'games_list' => $result
        );
    }
}
