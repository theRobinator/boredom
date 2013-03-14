goog.provide('robin.controllers.NewGameCtrl');

goog.require('robin.api.APIEndpoints');
goog.require('robin.api.UserParser');
goog.require('robin.services.APIService');
goog.require('robin.soy.Games');
goog.require('robin.Paths');
goog.require('robin.Utils');

/**
 * Controller for handling authentication from the login page.
 *
 * @param {angular.Scope} $scope
 * @param {robin.services.APIService} apiService
 * @param {robin.collections.ArrayCollection} newGameList
 */
robin.controllers.NewGameCtrl = function($scope, apiService, newGameList) {
    $scope['submit'] = function() {
        $scope['errorMsg'] = '';
        apiService.sendRequest({
            'endpoint': robin.api.APIEndpoints.GAME_CREATE,
            'getParams': {
                'player2id': $scope['opponent'],
                'player1score': $scope['player1score'],
                'player2score': $scope['player2score'],
                'date': Math.floor(goog.now() / 1000)
            }
        })
        .then(function(response) {
            window.location = robin.Paths.HOME;
        },
        function(error) {
            if (error) {
                $scope['errorMsg'] = error.getError().toString();
            } else {
                $scope['errorMsg'] = "We couldn't create the game. Please try again.";
            }
        });
    };

    $scope['users'] = newGameList.getSource();
};


// Initialize the module
var newGameUsers;
angular.module('controllers.newGame', ['services.apiService'])
    .controller('NewGameCtrl', ['$scope', 'apiService', 'newGameCtrl_gameList', robin.controllers.NewGameCtrl])
    .factory('newGameCtrl_gameList', function() {
        newGameUsers = new robin.collections.ArrayCollection();
        return newGameUsers;
    })
    .run(['$templateCache', function($templateCache) {
        $templateCache.put('games.newform.soy', robin.soy.Games.newForm());
    }]);


goog.exportSymbol('robin.bootstrap.initializeNewGameForm', function(userJson) {
    var userList = robin.Utils.parseNodeResponse(userJson, robin.api.UserParser.parseListFromJson);
    injector.invoke(['$rootScope', function($rootScope) {
        $rootScope.$apply(function() {
            newGameUsers.addAllAt(0, userList);
        });
    }]);
});
