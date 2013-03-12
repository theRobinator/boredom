goog.provide('robin.controllers.GameListCtrl');

goog.require('robin.directives.GameDirective');
goog.require('robin.services.APIService');
goog.require('robin.services.ModelService');
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
angular.module('gameList', []).controller('GameListCtrl', ['$scope', 'newsfeedList', robin.controllers.GameListCtrl])
    .factory('newsfeedList', ['modelService', function(modelService) {
        return modelService.getNewsfeedModel().getTemplateArray();
    }])
    .factory('modelService', function() {
        return new robin.services.ModelService();
    })
    .factory('apiService', robin.services.APIService.factory)
    .run(['$templateCache', function($templateCache) {
        $templateCache.put('games_list.soy', robin.soy.Games.list());
    }])
    .directive.apply(null, robin.directives.GameDirective);
