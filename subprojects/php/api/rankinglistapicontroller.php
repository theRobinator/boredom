<?php

require_once '../settings.php';
require_once API_DIR . 'apicontroller.php';
require_once LIBS_DIR . 'userlistutils.php';


class RankingListAPIController extends APIController {
    public function getResponseData($params) {
        $users = UserListUtils::LoadAllUsers();

        $ranking = array();
        foreach ($users as $user) {
            $ranking[] = array(
                        'id'            => $user->getId(),
                        'name'          => $user->getName(),
                        'simple-rank'   => $user->getWins() - $user->getLosses()
            );
        }
        return array(
            'ranking_list' => $ranking
        );
    }
}
