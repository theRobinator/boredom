goog.provide('robin.controllers.LoginCtrl');

goog.require('robin.api.APIEndpoints');
goog.require('robin.api.UserParser');

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
            window.location = '/home';
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
            window.location = '/home';
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
