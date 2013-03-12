<?php
require_once '../settings.php';

require_once API_DIR . 'loginapicontroller.php';
require_once API_DIR . 'logoutapicontroller.php';
require_once API_DIR . 'registerapicontroller.php';
require_once API_DIR . 'gamecreateapicontroller.php';
require_once API_DIR . 'gameapproveapicontroller.php';
require_once API_DIR . 'gameslistapicontroller.php';
require_once API_DIR . 'unapprovedgameslistapicontroller.php';
require_once API_DIR . 'newsfeedlistapicontroller.php';
require_once API_DIR . 'userlistapicontroller.php';
require_once API_DIR . 'rankinglistapicontroller.php';

$ROUTE_MAPPING = array(
    '/login' => 'LoginAPIController',
    '/logout' => 'LogoutAPIController',
    '/register' => 'RegisterAPIController',
    '/user/list' => 'UserListAPIController',
    '/games/create' => 'GameCreateAPIController',
    '/games/approve' => 'GameApproveAPIController',
    '/games/list' => 'GamesListAPIController',
    '/games/unapproved' => 'UnapprovedGamesListAPIController',
    '/games/recent' => 'NewsfeedListAPIController',
    '/ranking/list' => 'RankingListAPIController'
);

// Get the name of the controller
$endpoint = $_SERVER['PATH_INFO'];
$controllerName = strval($ROUTE_MAPPING[$endpoint]);
if (!$controllerName) {
    header("HTTP/1.0 404 Not Found");
    die();
}

// Instantiate the controller class and then make it handle the request
$controller = new $controllerName();
try {
    echo $controller->handle();
} catch (APIException $err) {
    // APIExceptions should come back in a normal response
    echo json_encode(array(
        'type' => 'error',
        'data' => array(
            'code'    => $err->getCode(),
            'message' => $err->getMessage()
        )
    ));
} catch (Exception $err) {
    // Other things are actually a 500
    header("HTTP/1.0 500 Internal Server Error");
    echo $err->getMessage();
}
