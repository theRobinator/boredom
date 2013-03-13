goog.provide('robin.controllers.GameListCtrl');

goog.require('robin.directives.GameDirective');
goog.require('robin.services.APIService');
goog.require('robin.services.NewsfeedModelService');
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


// Initialize the module
angular.module('controllers.gameList', ['directives.game']).controller('GameListCtrl', ['$scope', 'newsfeedList', robin.controllers.GameListCtrl])
    .factory('newsfeedList', ['newsfeedModelService', function(newsfeedModelService) {
        return newsfeedModelService.getModel().getSource();
    }])
    .factory('newsfeedModelService', robin.services.NewsfeedModelService.factory)
    .factory('apiService', robin.services.APIService.factory)
    .run(['$templateCache', function($templateCache) {
        $templateCache.put('games.list.soy', robin.soy.Games.list());
    }]);
