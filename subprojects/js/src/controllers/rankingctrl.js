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

/**
 * @type {string}
 * @const
 */
robin.controllers.RankingCtrl.NAME = 'controllers.ranking';


var rankingCtrl_rankingList;
angular.module(robin.controllers.RankingCtrl.NAME, [])
    .controller(robin.controllers.RankingCtrl.NAME, ['$scope', 'rankingCtrl_rankingList', robin.controllers.RankingCtrl])
    .factory('rankingCtrl_rankingList', function() {
        rankingCtrl_rankingList = new robin.collections.ArrayCollection();
        return rankingCtrl_rankingList;
    })
    .run(['$templateCache', function($templateCache) {
        $templateCache.put('Ranking.list.soy', robin.soy.Ranking.list());
    }]);


/**
 * @param {Object} userJson
 */
robin.controllers.RankingCtrl.initialize = function(userJson) {
    var parsedResponse = robin.Utils.parseNodeResponse(userJson, robin.api.RankingParser.parseRankingListFromJson);
    goog.array.sort(parsedResponse, function(item1 ,item2) {
        return item2.getRank() - item1.getRank();
    });
    injector.invoke(['$rootScope', function($rootScope) {
        $rootScope.$apply(function() {
            rankingCtrl_rankingList.addAllAt(0, parsedResponse);
        });
    }]);
};
goog.exportSymbol('robin.controllers.RankingCtrl.initialize', robin.controllers.RankingCtrl.initialize);
