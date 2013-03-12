goog.provide('robin.directives.GameDirective');

goog.require('robin.soy.Games');


robin.directives.GameDirective = [
    'game',
    function(modelService) {
        var dir = {
            'restrict': 'E',
            'scope': {
                'game': '='
            },
            'template': robin.soy.Games.game(),
            'link': function(scope, element, attrs) {
                var game = scope['game'];
                var winner;
                var loser;
                if (game['player1Score'] > game['player2Score']) {
                    winner = game['player1'];
                    loser = game['player2'];
                } else if (game['player1Score'] > game['player2Score']) {
                    winner = game['player2'];
                    loser = game['player1'];
                } else {
                    winner = null;
                    loser = null;
                }
                if (winner) {
                    scope['winner'] = winner['name'];
                    scope['loser'] = loser['name'];
                } else {
                    scope['winner'] = game['player1']['name'];
                    scope['loser'] = game['player2']['name'];
                }

                if (winner == game['player1']) {
                    scope['winnerScore'] = game['player1Score'];
                    scope['loserScore'] = game['player2Score'];
                } else {
                    scope['winnerScore'] = game['player2Score'];
                    scope['loserScore'] = game['player1Score'];
                }

                scope['date'] = game['date'];

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
];
