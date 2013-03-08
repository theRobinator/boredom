<?php

require_once '../settings.php';
require_once API_DIR . 'apicontroller.php';
require_once LIBS_DIR . 'gamelistutils.php';


class UnapprovedGamesListAPIController extends APIController {
    public function getResponseData($params) {
        $games = GameListUtils::LoadUnapprovedGames($this->user->getId());

        $result = array();
        foreach ($games as $game) {
            $result[] = $game->toArray();
        }
        return array(
            'games_list' => $result
        );
    }
}
