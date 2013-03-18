goog.provide('robin.controllers.MenuCtrl');

goog.require('robin.api.UserParser');
goog.require('robin.commands.LogoutCommand');
goog.require('robin.Paths');
goog.require('robin.services.APIService');
goog.require('robin.services.UserModelService');
goog.require('robin.soy.Menu');
goog.require('robin.Utils');

/**
 * Controller for the sidebar menu.
 *
 * @param {angular.Scope} $scope
 * @param {robin.services.APIService} apiService
 * @param {Array.<robin.models.User>} userList
 * @constructor
 */
robin.controllers.MenuCtrl = function($scope, apiService, userList) {
    $scope['users'] = userList;

    $scope['toggleUserList'] = function() {
        $scope['showUsers'] = !$scope['showUsers'];
    };

    $scope['logout'] = function() {
        new robin.commands.LogoutCommand(apiService).execute().then(
            function(response) {
                window.location = robin.Paths.LOGIN;
            });
    };
};

/**
 * @type {string}
 * @const
 */
robin.controllers.MenuCtrl.NAME = 'controllers.menu';




// Create the controller using the basic util
angular.module(robin.controllers.MenuCtrl.NAME, [robin.services.APIService.NAME, robin.services.UserModelService.NAME])
    .controller(robin.controllers.MenuCtrl.NAME, ['$scope', robin.services.APIService.NAME, 'menuCtrl_userList', robin.controllers.MenuCtrl])
    .factory('menuCtrl_userList', [robin.services.UserModelService.NAME, function(userModelService) {
        return userModelService.getModel().getSource();
    }])
    .run(['$templateCache', function($templateCache) {
        $templateCache.put('Menu.menu.soy', robin.soy.Menu.menu());
    }]);


/**
 * Initialize the default MenuCtrl with a user list. This list will be displayed on the menu and will link to profiles.
 * @param {Object} userJson The returned result from the user list endpoint.
 */
robin.controllers.MenuCtrl.initialize = function(userJson) {
    var userList = robin.Utils.parseNodeResponse(userJson, robin.api.UserParser.parseListFromJson);
    injector.invoke(['$rootScope', robin.services.UserModelService.NAME, function($rootScope, userModelService) {
        $rootScope.$apply(function() {
            userModelService.setModel(userList);
        });
    }]);
};
goog.exportSymbol('robin.controllers.MenuCtrl.initialize', robin.controllers.MenuCtrl.initialize);
