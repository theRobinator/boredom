goog.provide('robin.controllers.NewGameCtrl');

goog.require('robin.api.UserParser');
goog.require('robin.commands.CreateGameCommand');
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
        new robin.commands.CreateGameCommand(apiService, $scope['opponent'], $scope['player1score'], $scope['player2score']).execute()
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

/**
 * @type {string}
 * @const
 */
robin.controllers.NewGameCtrl.NAME = 'controllers.newGame';


// Initialize the module
var newGameCtrl_gameList;
angular.module(robin.controllers.NewGameCtrl.NAME, [robin.services.APIService.NAME])
    .controller(robin.controllers.NewGameCtrl.NAME, ['$scope', robin.services.APIService.NAME, 'newGameCtrl_gameList', robin.controllers.NewGameCtrl])
    .factory('newGameCtrl_gameList', function() {
        newGameCtrl_gameList = new robin.collections.ArrayCollection();
        return newGameCtrl_gameList;
    })
    .run(['$templateCache', function($templateCache) {
        $templateCache.put('Games.newForm.soy', robin.soy.Games.newForm());
    }]);


/**
 * @param {Object} userJson
 */
robin.controllers.NewGameCtrl.initialize = function(userJson) {
    var userList = robin.Utils.parseNodeResponse(userJson, robin.api.UserParser.parseListFromJson);
    injector.invoke(['$rootScope', function($rootScope) {
        $rootScope.$apply(function() {
            newGameCtrl_gameList.addAllAt(0, userList);
        });
    }]);
};
goog.exportSymbol('robin.controllers.NewGameCtrl.initialize', robin.controllers.NewGameCtrl.initialize);
