goog.provide('robin.controllers.MenuCtrl');

goog.require('robin.api.APIEndpoints');
goog.require('robin.api.UserParser');
goog.require('robin.services.APIService');
goog.require('robin.soy.Menu');
goog.require('robin.Utils');

/**
 * Controller for handling authentication from the login page.
 *
 * @param {angular.Scope} $scope
 * @param {robin.services.APIService} apiService
 * @param {Array.<robin.models.User>|angular.$q.Promise} userList
 */
robin.controllers.MenuCtrl = function($scope, apiService, userList) {
    $scope['toggleUserList'] = function() {
        $scope['showUsers'] = !$scope['showUsers'];
    }

    $scope['users'] = userList;

    $scope['logout'] = function() {
        apiService.sendRequest({
            'endpoint': robin.api.APIEndpoints.LOGOUT
        })
        .then(function(response) {
            window.location ='/';
        });
    }
};


// The menu
var menuDeferred;
angular.module('menu', []).controller('MenuCtrl', ['$scope', 'apiService', 'userList', robin.controllers.MenuCtrl])
    .factory('userList', ['$q', function($q) {
        menuDeferred = $q.defer();
        return menuDeferred.promise;
    }])
    .factory('apiService', robin.services.APIService.factory)
    .run(['$templateCache', function($templateCache) {
            $templateCache.put('menu.soy', robin.soy.Menu.menu());
    }]);
goog.exportSymbol('robin.bootstrap.initializeMenu', function(userJson) {
    var userList = robin.Utils.parseNodeResponse(userJson, robin.api.UserParser.parseListFromJson);
    var templateOut = [];
    for (var i = 0; i < userList.length; ++i) {
        templateOut.push(userList[i].getName());
    }
    robin.Utils.resolveAtRootScope(injector, menuDeferred, templateOut);
});
