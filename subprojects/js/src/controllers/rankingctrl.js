goog.provide('robin.controllers.RankingCtrl');

goog.require('robin.api.RankingParser');
goog.require('robin.collections.ArrayCollection');
goog.require('robin.soy.Ranking');
goog.require('robin.Utils');


/**
 * Controller for handling authentication from the login page.
 *
 * @param {angular.Scope} $scope
 * @param {robin.collections.ArrayCollection} rankingList
 */
robin.controllers.RankingCtrl = function($scope, rankingList) {
    $scope['rankingList'] = rankingList.getSource();
};


var rankingList;
angular.module('controllers.ranking', []).controller('RankingCtrl', ['$scope', 'rankingList', robin.controllers.RankingCtrl])
    .factory('rankingList', function() {
        rankingList = new robin.collections.ArrayCollection();
        return rankingList;
    })
    .run(['$templateCache', function($templateCache) {
        $templateCache.put('ranking.list.soy', robin.soy.Ranking.list());
    }]);


goog.exportSymbol('robin.bootstrap.initializeRanking', function(userJson) {
    var parsedResponse = robin.Utils.parseNodeResponse(userJson, robin.api.RankingParser.parseRankingListFromJson);
    goog.array.sort(parsedResponse, function(item1 ,item2) {
        return item2.getRank() - item1.getRank();
    });
    injector.invoke(['$rootScope', function($rootScope) {
        $rootScope.$apply(function() {
            rankingList.addAllAt(0, parsedResponse);
        });
    }]);
});
