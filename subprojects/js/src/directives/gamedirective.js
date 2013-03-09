goog.provide('robin.directives.GameDirective');

goog.require('robin.soy.Games');


robin.directives.GameDirective = [
    'game',
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

                scope['winner'] = game.getWinner().getName();
                scope['loser'] = game.getLoser().getName();

                if (game.getWinner() == game.getPlayer1()) {
                    scope['winnerScore'] = game.getPlayer1Score();
                    scope['loserScore'] = game.getPlayer2Score();
                } else {
                    scope['winnerScore'] = game.getPlayer2Score();
                    scope['loserScore'] = game.getPlayer1Score();
                }

                var date = game.getDate();
                scope['date'] = date.getMonth() + '/' + date.getDate() + '/' + date.getYear();

                if (game.getWinner()) {
                    var verbs = ['defeated', 'ambushed', 'annihilated', 'beat down', 'beat', 'butchered', 'crushed', 'decimated', 'demolished', 'eradicated', 'exterminated', 'finished', 'mowed down', 'murdered', 'obliterated', 'overpowered', 'overthrew', 'overwhelmed', 'routed', 'sacked', 'slaughtered', 'smashed', 'took out', 'trampled', 'trashed', 'vanquished', 'wiped out', 'wrecked'];
                    scope['verb'] = verbs[Math.floor(Math.random() * verbs.length)];
                } else {
                    scope['verb'] = 'tied';
                }
            }
        };
        return dir;
    }
];
