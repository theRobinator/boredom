goog.require('robin.api.GameParser');
goog.require('robin.controllers.GameListCtrl');
goog.require('robin.controllers.MenuCtrl');
goog.require('robin.controllers.UnapprovedCtrl');
goog.require('robin.services.NewsfeedModelService');
goog.require('robin.Utils');


// The module
var home = angular.module('pages.home', ['controllers.menu', 'controllers.gameList', 'controllers.unapprovedGames', 'services.newsfeedModelService']);

// Initialize the game list with the newsfeed
home.factory('gameListCtrl_gameList', ['newsfeedModelService', function(newsfeedModelService) {
    return newsfeedModelService.getModel().getSource();
}]);

goog.exportSymbol('robin.bootstrap.initializeNewsfeed', function(gameJson) {
    var gameList = robin.Utils.parseNodeResponse(gameJson, robin.api.GameParser.parseListFromJson);
    injector.invoke(['$rootScope', 'newsfeedModelService', function($rootScope, newsfeedModelService) {
        $rootScope.$apply(function() {
            newsfeedModelService.setModel(gameList);
        });
    }]);
});

// Start 'er up!
var injector = /** @type {*} */ (angular.bootstrap(/** @type {Element} */ (document), ['pages.home']));
