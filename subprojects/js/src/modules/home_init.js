goog.require('robin.api.GameParser');
goog.require('robin.api.UserParser');
goog.require('robin.api.Reader');
goog.require('robin.controllers.GameListCtrl');
goog.require('robin.controllers.MenuCtrl');
goog.require('robin.controllers.UnapprovedCtrl');
goog.require('robin.directives.GameDirective');
goog.require('robin.soy.Games');
goog.require('robin.services.APIService');
goog.require('robin.Utils');


// The module
var home = angular.module('home', ['menu'])
    .run(['$templateCache', function($templateCache) {
        $templateCache.put('games_unapproved.soy', robin.soy.Games.unapprovedSection());
        $templateCache.put('games_list.soy', robin.soy.Games.list());
    }])
    .directive.apply(null, robin.directives.GameDirective)
    .factory('apiService', robin.services.APIService.factory);


// The unapproved games section
var unapprovedDeferred;
home.controller('UnapprovedCtrl', ['$scope', 'apiService', 'unapprovedList', robin.controllers.UnapprovedCtrl])
    .factory('unapprovedList', ['$q', function($q) {
        unapprovedDeferred = $q.defer();
        return unapprovedDeferred.promise;
    }]
);
goog.exportSymbol('robin.bootstrap.initializeUnapprovedGames', function(gameJson) {
    var gameList = robin.Utils.parseNodeResponse(gameJson, robin.api.GameParser.parseListFromJson);
    robin.Utils.resolveAtRootScope(injector, unapprovedDeferred, gameList);
});


// The newsfeed
var newsfeedDeferred;
home.controller('GameListCtrl', ['$scope', 'newsfeedList', robin.controllers.GameListCtrl])
    .factory('newsfeedList', ['$q', function($q) {
        newsfeedDeferred = $q.defer();
        return newsfeedDeferred.promise;
    }]
);
goog.exportSymbol('robin.bootstrap.initializeNewsfeed', function(gameJson) {
    var gameList = robin.Utils.parseNodeResponse(gameJson, robin.api.GameParser.parseListFromJson);
    robin.Utils.resolveAtRootScope(injector, newsfeedDeferred, gameList);
});


// Start 'er up!
var injector = /** @type {*} */ (angular.bootstrap(/** @type {Element} */ (document), ['home']));
