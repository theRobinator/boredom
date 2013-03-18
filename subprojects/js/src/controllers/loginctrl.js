goog.provide('robin.controllers.LoginCtrl');

goog.require('robin.commands.LoginCommand');
goog.require('robin.commands.RegisterCommand');
goog.require('robin.Paths');
goog.require('robin.services.APIService');
goog.require('robin.soy.Login');


/**
 * Controller for handling authentication from the login page.
 *
 * @param {angular.Scope} $scope
 * @param {robin.services.APIService} apiService
 */
robin.controllers.LoginCtrl = function($scope, apiService) {
    $scope['login'] = function() {
        $scope['error'] = '';
        new robin.commands.LoginCommand(apiService, $scope['username'], $scope['password']).execute().then(function(response) {
            window.location = robin.Paths.HOME;
        },
        function(error) {
            if (error) {
                $scope['error'] = error.toString();
            } else {
                $scope['error'] = 'We could not log you in at this time. Please try again.';
            }
        });
    };

    $scope['register'] = function() {
        $scope['error'] = '';
        new robin.commands.RegisterCommand(apiService, $scope['username'], $scope['password']).execute().then(
        function(response) {
            window.location = robin.Paths.HOME;
        },
        function(error) {
            if (error) {
                $scope['error'] = error.toString();
            } else {
                $scope['error'] = 'Registration failed! Please try again.';
            }
        });
    };
};

/**
 * @type {string}
 * @const
 */
robin.controllers.LoginCtrl.NAME = 'controllers.login';


angular.module(robin.controllers.LoginCtrl.NAME, [robin.services.APIService.NAME])
    .controller(robin.controllers.LoginCtrl.NAME, ['$scope', robin.services.APIService.NAME, robin.controllers.LoginCtrl])
    .run(['$templateCache', function($templateCache) {
        $templateCache.put('Login.form.soy', robin.soy.Login.form());
    }]);
