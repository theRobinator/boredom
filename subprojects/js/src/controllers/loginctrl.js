goog.provide('robin.controllers.LoginCtrl');

goog.require('robin.api.APIEndpoints');
goog.require('robin.api.UserParser');
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
        apiService.sendRequest({
            'endpoint': robin.api.APIEndpoints.LOGIN,
            'getParams': {
                'username': $scope['username'],
                'password': $scope['password']
            },
            'parser': robin.api.UserParser.parseUserFromJson
        })
        .then(function(response) {
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
        apiService.sendRequest({
            'endpoint': robin.api.APIEndpoints.REGISTER,
            'getParams': {
                'username': $scope['username'],
                'password': $scope['password']
            },
            'parser': robin.api.UserParser.parseUserFromJson
        })
        .then(function(response) {
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

angular.module('controllers.login', ['services.apiService'])
    .controller('LoginCtrl', ['$scope', 'apiService', robin.controllers.LoginCtrl])
    .run(['$templateCache', function($templateCache) {
        $templateCache.put('login.form.soy', robin.soy.Login.form());
    }]);
