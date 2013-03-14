goog.provide('robin.controllers.GameListCtrl');

goog.require('robin.directives.GameDirective');
goog.require('robin.services.APIService');
goog.require('robin.soy.Games');
goog.require('robin.Utils');

/**
 * Controller for handling authentication from the login page.
 *
 * @param {angular.Scope} $scope
 * @param {Array.<robin.models.Game>|angular.$q.Promise} gameList
 */
robin.controllers.GameListCtrl = function($scope, gameList) {
    $scope['games'] = gameList;
};


angular.module('controllers.gameList', ['directives.game', 'services.apiService'])
    .controller('GameListCtrl', ['$scope', 'gameListCtrl_gameList', robin.controllers.GameListCtrl])
    .run(['$templateCache', function($templateCache) {
        $templateCache.put('games.list.soy', robin.soy.Games.list());
    }]);
