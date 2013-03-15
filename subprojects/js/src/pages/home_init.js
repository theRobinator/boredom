goog.require('robin.api.GameParser');
goog.require('robin.controllers.GameListCtrl');
goog.require('robin.controllers.MenuCtrl');
goog.require('robin.controllers.UnapprovedCtrl');
goog.require('robin.services.NewsfeedModelService');
goog.require('robin.Utils');


// The module
var home = angular.module('pages.home', [robin.controllers.MenuCtrl.NAME, robin.controllers.GameListCtrl.NAME, robin.controllers.UnapprovedCtrl.NAME, robin.services.NewsfeedModelService.NAME]);

// Initialize the game list with the newsfeed
home.factory('gameListCtrl_gameList', [robin.services.NewsfeedModelService.NAME, function(newsfeedModelService) {
    return newsfeedModelService.getModel().getSource();
}]);

goog.exportSymbol('robin.pages.Home.initializeNewsfeed', function(gameJson) {
    var gameList = robin.Utils.parseNodeResponse(gameJson, robin.api.GameParser.parseListFromJson);
    injector.invoke(['$rootScope', robin.services.NewsfeedModelService.NAME, function($rootScope, newsfeedModelService) {
        $rootScope.$apply(function() {
            newsfeedModelService.setModel(gameList);
        });
    }]);
});

// Start 'er up!
var injector = /** @type {*} */ (angular.bootstrap(/** @type {Element} */ (document), ['pages.home']));
