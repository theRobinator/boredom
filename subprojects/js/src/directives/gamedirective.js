goog.provide('robin.directives.GameDirective');

goog.require('robin.soy.Games');


/**
 * @type {string}
 * @const
 */
robin.directives.GameDirective.NAME = 'directives.game';


angular.module(robin.directives.GameDirective.NAME, [])
    .directive('game',
    function() {
        var dir = {
            'restrict': 'E',
            'scope': {
                'game': '='
            },
            'template': robin.soy.Games.game(),
            'link': function(scope, element, attrs) {
                /** @type {robin.models.Game} */
                var game = scope['game'];
                var winner = game.getWinner();
                var loser = game.getLoser();

                if (winner) {
                    scope['winner'] = winner.getName();
                    scope['loser'] = loser.getName();
                } else {
                    scope['winner'] = game.getPlayer1().getName();
                    scope['loser'] = game.getPlayer2().getName();
                }

                if (winner == game.getPlayer1()) {
                    scope['winnerScore'] = game.getPlayer1Score();
                    scope['loserScore'] = game.getPlayer2Score();
                } else {
                    scope['winnerScore'] = game.getPlayer2Score();
                    scope['loserScore'] = game.getPlayer1Score();
                }

                /** @type {goog.date.DateTime} */
                var date = game.getDate();
                if (date) {
                    scope['date'] = date.getMonth() + '/' + date.getDate() + '/' + date.getYear();
                } else {
                    scope['date'] = '';
                }

                if (winner) {
                    var verbs = ['defeated', 'ambushed', 'annihilated', 'beat down', 'beat', 'butchered', 'crushed', 'decimated', 'demolished', 'eradicated', 'exterminated', 'finished', 'mowed down', 'murdered', 'obliterated', 'overpowered', 'overthrew', 'overwhelmed', 'routed', 'sacked', 'slaughtered', 'smashed', 'took out', 'trampled', 'trashed', 'vanquished', 'wiped out', 'wrecked'];
                    scope['verb'] = verbs[Math.floor(Math.random() * verbs.length)];
                } else {
                    scope['verb'] = 'tied';
                }
            }
        };
        return dir;
    }
);
