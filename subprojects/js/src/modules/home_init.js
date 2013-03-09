goog.require('robin.api.GameParser');
goog.require('robin.api.UserParser');
goog.require('robin.api.Reader');
goog.require('robin.controllers.GameListCtrl');
goog.require('robin.controllers.MenuCtrl');
goog.require('robin.controllers.UnapprovedCtrl');
goog.require('robin.directives.GameDirective');
goog.require('robin.soy.Games');
goog.require('robin.soy.Menu');
goog.require('robin.services.APIService');
goog.require('robin.Utils');


// The module
var home = angular.module('home', [])
    .run(['$templateCache', function($templateCache) {
        $templateCache.put('menu.soy', robin.soy.Menu.menu());
        $templateCache.put('games_unapproved.soy', robin.soy.Games.unapprovedSection());
        $templateCache.put('games_list.soy', robin.soy.Games.list());
    }])
    .directive.apply(null, robin.directives.GameDirective);


// The menu
var menuDeferred;
home.controller('MenuCtrl', ['$scope', 'userList', robin.controllers.MenuCtrl])
    .factory('userList', ['$q', function($q) {
        menuDeferred = $q.defer();
        return menuDeferred.promise;
    }]
);
goog.exportSymbol('robin.bootstrap.initializeMenu', function(userJson) {
    var userList = robin.Utils.parseNodeResponse(userJson, robin.api.UserParser.parseListFromJson);
    var templateOut = [];
    for (var i = 0; i < userList.length; ++i) {
        templateOut.push(userList[i].getName());
    }
    robin.Utils.resolveAtRootScope(injector, menuDeferred, templateOut);
});


// The unapproved games section
var unapprovedDeferred;
home.controller('UnapprovedCtrl', ['$scope', 'unapprovedList', robin.controllers.UnapprovedCtrl])
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
