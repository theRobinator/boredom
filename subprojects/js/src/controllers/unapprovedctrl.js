goog.provide('robin.controllers.UnapprovedCtrl');

goog.require('robin.api.GameParser');
goog.require('robin.collections.ArrayCollection');
goog.require('robin.directives.GameDirective');
goog.require('robin.services.APIService');
goog.require('robin.services.NewsfeedModelService');
goog.require('robin.soy.Games');
goog.require('robin.Utils');

/**
 * @param {angular.Scope} $scope
 * @param {robin.services.APIService} apiService
 * @param {robin.services.NewsfeedModelService} newsfeedModelService
 * @param {robin.collections.ArrayCollection} gameList
 */
robin.controllers.UnapprovedCtrl = function($scope, apiService, newsfeedModelService, gameList) {
    $scope['games'] = gameList.getSource();

    var removeGame = function(id, approve) {
        var oldGame;
        for (var i = 0; i < gameList.getLength(); ++i) {
            oldGame = gameList.getItemAt(i);
            if (oldGame.getId() == id) {
                gameList.removeItemAt(i);
                break;
            }
        }
        if (approve) {
            newsfeedModelService.getModel().addItemAt(oldGame, 0);
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
var unapprovedGames;
angular.module('controllers.unapprovedGames', ['directives.game']).controller('UnapprovedCtrl', ['$scope', 'apiService', 'newsfeedModelService', 'unapprovedList', robin.controllers.UnapprovedCtrl])
    .factory('unapprovedList', function() {
        unapprovedGames = new robin.collections.ArrayCollection();
        return unapprovedGames;
    })
    .factory('newsfeedModelService', robin.services.NewsfeedModelService.factory)
    .factory('apiService', robin.services.APIService.factory)
    .run(['$templateCache', function($templateCache) {
        $templateCache.put('games.unapproved.soy', robin.soy.Games.unapprovedSection());
    }]);


goog.exportSymbol('robin.bootstrap.initializeUnapprovedGames', function(gameJson) {
    var gameList = robin.Utils.parseNodeResponse(gameJson, robin.api.GameParser.parseListFromJson);
    injector.invoke(['$rootScope', function($rootScope) {
        $rootScope.$apply(function() {
            unapprovedGames.addAllAt(0, gameList);
        });
    }]);
});
