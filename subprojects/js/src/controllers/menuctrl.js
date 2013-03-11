goog.provide('robin.controllers.MenuCtrl');

goog.require('robin.api.APIEndpoints');

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
