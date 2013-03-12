goog.provide('robin.controllers.UnapprovedCtrl');

goog.require('robin.api.GameParser');
goog.require('robin.directives.GameDirective');
goog.require('robin.services.APIService');
goog.require('robin.services.ModelService');
goog.require('robin.soy.Games');
goog.require('robin.Utils');

/**
 * Controller for handling authentication from the login page.
 *
 * @param {angular.Scope} $scope
 * @param {robin.services.APIService} apiService
 * @param {robin.services.ModelService} modelService
 * @param {Array.<robin.models.Game>|angular.$q.Promise} gameList
 */
robin.controllers.UnapprovedCtrl = function($scope, apiService, modelService, gameList) {
    $scope['games'] = gameList;

    var removeGame = function(id, approve) {
        var newsfeedModel = modelService.getNewsfeedModel();
        for (var i = 0; i < newsfeedModel.getLength(); ++i) {
            if (newsfeedModel.getItemAt(i).getId() == id) {
                newsfeedModel.removeItemAt(i);
                break;
            }
        }
    };

    $scope['approve'] = function(gameId) {
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

    $scope['deny'] = function(gameId) {
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


// Initialize the module
var unapprovedDeferred;
angular.module('unapprovedGames', []).controller('UnapprovedCtrl', ['$scope', 'apiService', 'modelService', 'unapprovedList', robin.controllers.UnapprovedCtrl])
    .factory('unapprovedList', ['$q', function($q) {
        unapprovedDeferred = $q.defer();
        return unapprovedDeferred.promise;
    }])
    .factory('modelService', function() {
        return new robin.services.ModelService();
    })
    .factory('apiService', robin.services.APIService.factory)
    .run(['$templateCache', function($templateCache) {
        $templateCache.put('games_unapproved.soy', robin.soy.Games.unapprovedSection());
    }]);


goog.exportSymbol('robin.bootstrap.initializeUnapprovedGames', function(gameJson) {
    var gameList = robin.Utils.parseNodeResponse(gameJson, robin.api.GameParser.parseListFromJson);
    robin.Utils.resolveAtRootScope(injector, unapprovedDeferred, gameList);
});
