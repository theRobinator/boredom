goog.require('robin.api.RankingParser');
goog.require('robin.api.Reader');
goog.require('robin.controllers.RankingCtrl');
goog.require('robin.soy.Ranking');
goog.require('robin.services.APIService');
goog.require('robin.Utils');


// The module
var ranking = angular.module('ranking', [])
    .run(['$templateCache', function($templateCache) {
        $templateCache.put('ranking_list.soy', robin.soy.Ranking.list());
    }]);


var rankingDeferred;
ranking.controller('RankingCtrl', ['$scope', 'rankingList', robin.controllers.RankingCtrl])
    .factory('rankingList', ['$q', function($q) {
        rankingDeferred = $q.defer();
        return rankingDeferred.promise;
    }]
);




goog.exportSymbol('robin.bootstrap.initializeRanking', function(userJson) {
    var rankingList = robin.Utils.parseNodeResponse(userJson, robin.api.RankingParser.parseRankingListFromJson);
    goog.array.sort(rankingList, function(item1 ,item2) {
        return item2.getRank() - item1.getRank();
    });
    var templateOut = [];
    for (var i = 0; i < rankingList.length; ++i) {
        templateOut.push(rankingList[i].getName() + ': ' + rankingList[i].getRank());
    }
    robin.Utils.resolveAtRootScope(injector, rankingDeferred, templateOut);
});


// Start 'er up!
var injector = /** @type {*} */ (angular.bootstrap(/** @type {Element} */ (document), ['ranking']));
