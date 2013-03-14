goog.require('robin.controllers.LoginCtrl');

var index = angular.module('pages.login', ['controllers.login']);

var injector = angular.bootstrap(/** @type {Element} */ (document), ['pages.login']);
