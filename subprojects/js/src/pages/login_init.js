goog.require('robin.controllers.LoginCtrl');
goog.require('robin.soy.Login');
goog.require('robin.services.APIService');


var index = angular.module('login', [])
    .controller('LoginCtrl', ['$scope', 'apiService', robin.controllers.LoginCtrl])
    .factory('apiService', robin.services.APIService.factory);

index.run(['$templateCache', function($templateCache) {
    $templateCache.put('login.form.soy', robin.soy.Login.form());
}]);

angular.bootstrap(/** @type {Element} */ (document), ['login']);
