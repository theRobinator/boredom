goog.provide('robin.controllers.UnapprovedCtrl');

/**
 * Controller for handling authentication from the login page.
 *
 * @param {angular.Scope} $scope
 * @param {Array.<robin.models.Game>|angular.$q.Promise} gameList
 */
robin.controllers.UnapprovedCtrl = function($scope, gameList) {
    $scope['games'] = gameList;

    $scope['approve'] = function(gameId) {
        // TODO
    };

    $scope['deny'] = function(gameId) {
        // TODO
    }
};
