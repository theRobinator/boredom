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

/**
 * @const
 * @type {string}
 */
robin.controllers.GameListCtrl.NAME = 'controllers.gameList';


angular.module(robin.controllers.GameListCtrl.NAME, [robin.directives.GameDirective.NAME, robin.services.APIService.NAME])
    .controller(robin.controllers.GameListCtrl.NAME, ['$scope', 'gameListCtrl_gameList', robin.controllers.GameListCtrl])
    .run(['$templateCache', function($templateCache) {
        $templateCache.put('Games.list.soy', robin.soy.Games.list());
    }]);
