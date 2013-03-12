goog.require('robin.api.UserParser');
goog.require('robin.controllers.MenuCtrl');
goog.require('robin.controllers.NewGameCtrl');
goog.require('robin.soy.Games');
goog.require('robin.soy.Menu');
goog.require('robin.services.APIService');
goog.require('robin.Utils');


// The module
var home = angular.module('newgame', ['menu'])
    .run(['$templateCache', function($templateCache) {
        $templateCache.put('games_newform.soy', robin.soy.Games.newForm());
    }])
    .factory('apiService', robin.services.APIService.factory);


// The unapproved games section
var newGameDeferred;
home.controller('NewGameCtrl', ['$scope', 'apiService', 'newGameList', robin.controllers.NewGameCtrl])
    .factory('newGameList', ['$q', function($q) {
        newGameDeferred = $q.defer();
        return newGameDeferred.promise;
    }]
);
goog.exportSymbol('robin.bootstrap.initializeNewGameForm', function(userJson) {
    var userList = robin.Utils.parseNodeResponse(userJson, robin.api.UserParser.parseListFromJson);
    var templateOut = [];
    for (var i = 0; i < userList.length; ++i) {
        templateOut.push({'name': userList[i].getName(), 'id': userList[i].getId()});
    }
    robin.Utils.resolveAtRootScope(injector, newGameDeferred, templateOut);
});


// Start 'er up!
var injector = /** @type {*} */ (angular.bootstrap(/** @type {Element} */ (document), ['newgame']));
