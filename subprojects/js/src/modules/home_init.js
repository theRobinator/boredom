goog.require('robin.api.GameParser');
goog.require('robin.controllers.GameListCtrl');
goog.require('robin.controllers.MenuCtrl');
goog.require('robin.controllers.UnapprovedCtrl');
goog.require('robin.Utils');


// The module
var home = angular.module('home', ['menu', 'gameList', 'unapprovedGames']);

goog.exportSymbol('robin.bootstrap.initializeNewsfeed', function(gameJson) {
    var gameList = robin.Utils.parseNodeResponse(gameJson, robin.api.GameParser.parseListFromJson);
    injector.invoke(['modelService', function(modelService) {
        modelService.setNewsfeedModel(gameList);
    }]);
});

// Start 'er up!
var injector = /** @type {*} */ (angular.bootstrap(/** @type {Element} */ (document), ['home']));
