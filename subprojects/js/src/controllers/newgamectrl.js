goog.provide('robin.controllers.NewGameCtrl');

goog.require('robin.api.APIEndpoints');

/**
 * Controller for handling authentication from the login page.
 *
 * @param {angular.Scope} $scope
 * @param {robin.services.APIService} apiService
 * @param {Array.<robin.models.User>|angular.$q.Promise} userList
 */
robin.controllers.NewGameCtrl = function($scope, apiService, userList) {
    $scope['submit'] = function() {
        $scope['errorMsg'] = '';
        apiService.sendRequest({
            'endpoint': robin.api.APIEndpoints.GAME_CREATE,
            'getParams': {
                'player2id': $scope['opponent'],
                'player1score': $scope['player1score'],
                'player2score': $scope['player2score'],
                'date': goog.now()
            }
        })
        .then(function(response) {
            window.location = '/home';
        },
        function(error) {
            if (error) {
                $scope['errorMsg'] = error.getError().toString();
            } else {
                $scope['errorMsg'] = "We couldn't create the game. Please try again.";
            }
        });
    };

    $scope['users'] = userList;
};