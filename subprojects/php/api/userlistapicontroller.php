<?php

require_once '../settings.php';
require_once API_DIR . 'apicontroller.php';
require_once LIBS_DIR . 'userlistutils.php';


class UserListAPIController extends APIController {
    public function getResponseData($params) {
        $users = UserListUtils::LoadAllUsers();

        $result = array();
        foreach ($users as $user) {
            $result[] = $user->toArray();
        }
        return array(
            'games_list' => $result
        );
    }
}
