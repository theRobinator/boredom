goog.require('robin.controllers.MenuCtrl');
goog.require('robin.controllers.NewGameCtrl');


// The module
var home = angular.module('pages.newgame', ['controllers.menu', 'controllers.newGame']);

// Start 'er up!
var injector = /** @type {*} */ (angular.bootstrap(/** @type {Element} */ (document), ['pages.newgame']));