goog.provide('robin.controllers.MenuCtrl');

/**
 * Controller for handling authentication from the login page.
 *
 * @param {angular.Scope} $scope
 * @param {Array.<robin.models.User>|angular.$q.Promise} userList
 */
robin.controllers.MenuCtrl = function($scope, userList) {
    $scope['toggleUserList'] = function() {
        $scope['showUsers'] = !$scope['showUsers'];
    }

    $scope['users'] = userList;
};
