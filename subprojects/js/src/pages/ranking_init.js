goog.require('robin.controllers.RankingCtrl');
goog.require('robin.Constants')


// The module
var ranking = angular.module('pages.ranking', ['controllers.ranking']);

// Start 'er up!
var injector = /** @type {*} */ (angular.bootstrap(/** @type {Element} */ (document), ['pages.ranking']));
