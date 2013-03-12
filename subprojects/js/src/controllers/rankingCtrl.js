goog.provide('robin.controllers.RankingCtrl');

/**
 * Controller for handling authentication from the login page.
 *
 * @param {angular.Scope} $scope
 * @param {Array.<robin.models.RankingListItem>|angular.$q.Promise} rankingList
 */
robin.controllers.RankingCtrl = function($scope, rankingList) {
    $scope['rankingList'] = rankingList;
};
