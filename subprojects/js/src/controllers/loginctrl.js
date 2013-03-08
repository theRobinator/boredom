goog.provide('robin.controllers.LoginCtrl');

goog.require('robin.api.APIEndpoints');
goog.require('robin.api.SingleUserParser');

/**
 * Controller for handling authentication from the login page.
 *
 * @param {angular.Scope} $scope
 * @param {robin.services.APIService} apiService
 */
robin.controllers.LoginCtrl = function($scope, apiService) {
    $scope['login'] = function() {
        $scope['error'] = '';
        apiService.getRequestBuilder()
            .setPath(robin.api.APIEndpoints.LOGIN)
            .setGetParams({
                'username': $scope['username'],
                'password': $scope['password']
            })
            .setParser(robin.api.SingleUserParser.parseResponseFromJson)
            .send()
            .success(function(response) {
                if (!response.isSuccess()) {
                    $scope['error'] = response.getError().toString();
                    return;
                }
                window.location = '/home';
            })
            .error(function(error) {
                if (error) {
                    $scope['error'] = error.toString();
                } else {
                    $scope['error'] = 'We could not log you in at this time. Please try again.';
                }
            }
        );
    };

    $scope['register'] = function() {
        $scope['error'] = '';
        apiService.getRequestBuilder()
            .setPath(robin.api.APIEndpoints.REGISTER)
            .setGetParams({
                'username': $scope['username'],
                'password': $scope['password']
            })
            .setParser(robin.api.SingleUserParser.parseResponseFromJson)
            .send()
            .success(function(response) {
                if (!response.isSuccess()) {
                    $scope['error'] = response.getError().toString();
                    return;
                }
                window.location = '/home';
            })
            .error(function(error) {
                if (error) {
                    $scope['error'] = error.toString();
                } else {
                    $scope['error'] = 'Registration failed! Please try again.';
                }
            }
        );
    };
};
