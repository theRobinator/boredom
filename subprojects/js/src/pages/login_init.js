goog.require('robin.controllers.LoginCtrl');

var index = angular.module('pages.login', [robin.controllers.LoginCtrl.NAME]);

var injector = angular.bootstrap(/** @type {Element} */ (document), ['pages.login']);
