goog.require('robin.controllers.MenuCtrl');
goog.require('robin.controllers.NewGameCtrl');


// The module
var home = angular.module('pages.newgame', [robin.controllers.MenuCtrl.NAME, robin.controllers.NewGameCtrl.NAME]);

// Start 'er up!
var injector = /** @type {*} */ (angular.bootstrap(/** @type {Element} */ (document), ['pages.newgame']));
