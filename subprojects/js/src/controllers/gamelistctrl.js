goog.provide('robin.controllers.GameListCtrl');

/**
 * Controller for handling authentication from the login page.
 *
 * @param {angular.Scope} $scope
 * @param {Array.<robin.models.Game>|angular.$q.Promise} gameList
 */
robin.controllers.GameListCtrl = function($scope, gameList) {
    $scope['games'] = gameList;
};
