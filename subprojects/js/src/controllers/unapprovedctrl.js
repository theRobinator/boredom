goog.provide('robin.controllers.UnapprovedCtrl');

goog.require('robin.api.GameParser');
goog.require('robin.collections.ArrayCollection');
goog.require('robin.commands.ApproveGameCommand');
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
        new robin.commands.ApproveGameCommand(apiService, gameId, true).execute().then(
            function(response) {
                removeGame(gameId, true);
            }, function(error) {
                $scope['errorMsg'] = error.getError().toString();
            });
    };

    $scope['deny'] = function(gameId) {
        new robin.commands.ApproveGameCommand(apiService, gameId, false).execute().then(
            function(response) {
                removeGame(gameId, true);
            }, function(error) {
                $scope['errorMsg'] = error.getError().toString();
            });
    }
};

/**
 * @type {string}
 * @const
 */
robin.controllers.UnapprovedCtrl.NAME = 'controllers.unapprovedGames';


// Initialize the module
var unapprovedCtrl_unapprovedList;
angular.module(robin.controllers.UnapprovedCtrl.NAME, [robin.directives.GameDirective.NAME, robin.services.APIService.NAME, robin.services.NewsfeedModelService.NAME])
    .controller(robin.controllers.UnapprovedCtrl.NAME, ['$scope', robin.services.APIService.NAME, robin.services.NewsfeedModelService.NAME, 'unapprovedCtrl_unapprovedList', robin.controllers.UnapprovedCtrl])
    .factory('unapprovedCtrl_unapprovedList', function() {
        unapprovedCtrl_unapprovedList = new robin.collections.ArrayCollection();
        return unapprovedCtrl_unapprovedList;
    })
    .run(['$templateCache', function($templateCache) {
        $templateCache.put('Games.unapprovedSection.soy', robin.soy.Games.unapprovedSection());
    }]);


/**
 * @param {Object} gameJson
 */
robin.controllers.UnapprovedCtrl.initialize = function(gameJson) {
    var gameList = robin.Utils.parseNodeResponse(gameJson, robin.api.GameParser.parseListFromJson);
    injector.invoke(['$rootScope', function($rootScope) {
        $rootScope.$apply(function() {
            unapprovedCtrl_unapprovedList.addAllAt(0, gameList);
        });
    }]);
};
goog.exportSymbol('robin.controllers.UnapprovedCtrl.initialize', robin.controllers.UnapprovedCtrl.initialize);
