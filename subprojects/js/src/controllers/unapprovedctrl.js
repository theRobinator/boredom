goog.provide('robin.controllers.UnapprovedCtrl');

/**
 * Controller for handling authentication from the login page.
 *
 * @param {angular.Scope} $scope
 * @param {robin.services.APIService} apiService
 * @param {Array.<robin.models.Game>|angular.$q.Promise} gameList
 */
robin.controllers.UnapprovedCtrl = function($scope, apiService, gameList) {
    $scope['games'] = gameList;

    var removeGame = function(id, approve) {
        var oldGame;
        for (var i = 0; i < $scope['games'].length; ++i) {
            oldGame = $scope['games'][i]
            if (oldGame.getId() == id) {
                $scope['games'].splice(i, 1);
                break;
            }
        }
        if (approve) {
            injector.invoke(['$rootScope', function($rootScope) {
                $rootScope['newsfeed'].unshift(oldGame);
            }]);
        }
    }

    $scope['approve'] = function(index) {
        var gameId = $scope['games'][index];
        apiService.sendRequest({
            'endpoint': robin.api.APIEndpoints.GAME_APPROVE,
            'getParams': {
                'game_id': gameId
            }
        })
        .then(function(response) {
            removeGame(gameId, true);
        }, function(error) {
            $scope['errorMsg'] = error.getError().toString();
        })
    };

    $scope['deny'] = function(index) {
        var gameId = $scope['games'][index];
        apiService.sendRequest({
            'endpoint': robin.api.APIEndpoints.GAME_DENY,
            'getParams': {
                'game_id': gameId
            }
        })
        .then(function(response) {
            removeGame(gameId, false);
        }, function(error) {
            $scope['errorMsg'] = error.getError().toString();
        })
    }
};
