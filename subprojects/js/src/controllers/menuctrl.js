goog.provide('robin.controllers.MenuCtrl');

goog.require('robin.api.APIEndpoints');
goog.require('robin.api.UserParser');
goog.require('robin.Paths');
goog.require('robin.services.APIService');
goog.require('robin.services.ModelService');
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
            window.location = robin.Paths.LOGIN;
        });
    }
};


// Initialize the menu module so that it can be included as a dependency
var menuDeferred;
angular.module('menu', []).controller('MenuCtrl', ['$scope', 'apiService', 'userList', robin.controllers.MenuCtrl])
    .factory('userList', ['modelService', function(modelService) {
        return modelService.getUserModel().getTemplateArray();
    }])
    .factory('apiService', robin.services.APIService.factory)
    .factory('modelService', function() {
        return new robin.services.ModelService();
    })
    .run(['$templateCache', function($templateCache) {
            $templateCache.put('menu.soy', robin.soy.Menu.menu());
    }]);


goog.exportSymbol('robin.bootstrap.initializeMenu', function(userJson) {
    var userList = robin.Utils.parseNodeResponse(userJson, robin.api.UserParser.parseListFromJson);
    injector.invoke(['modelService', function(modelService) {
        modelService.setUserModel(userList);
    }]);
});
