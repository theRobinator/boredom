goog.provide('robin.controllers.MenuCtrl');

goog.require('robin.api.APIEndpoints');
goog.require('robin.api.UserParser');
goog.require('robin.Paths');
goog.require('robin.services.APIService');
goog.require('robin.services.UserModelService');
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
angular.module('controllers.menu', ['services.apiService', 'services.userModelService'])
    .controller('MenuCtrl', ['$scope', 'apiService', 'menuCtrl_userList', robin.controllers.MenuCtrl])
    .factory('menuCtrl_userList', ['userModelService', function(userModelService) {
        return userModelService.getModel().getSource();
    }])
    .run(['$templateCache', function($templateCache) {
            $templateCache.put('menu.soy', robin.soy.Menu.menu());
    }]);


goog.exportSymbol('robin.bootstrap.initializeMenu', function(userJson) {
    var userList = robin.Utils.parseNodeResponse(userJson, robin.api.UserParser.parseListFromJson);
    injector.invoke(['$rootScope', 'userModelService', function($rootScope, userModelService) {
        $rootScope.$apply(function() {
            userModelService.setModel(userList);
        });
    }]);
});
