goog.provide('robin.commands.CreateGameCommand');

goog.require('robin.api.APIEndpoints');
goog.require('robin.commands.AbstractCommand');

/**
 * @constructor
 * @extends {robin.commands.AbstractCommand}
 * @param {robin.services.APIService} apiService
 * @param {number} opponentId
 * @param {number} myScore
 * @param {number} theirScore
 */
robin.commands.CreateGameCommand = function(apiService, opponentId, myScore, theirScore) {
    goog.base(this, apiService);
    this.opponentId_ = opponentId;
    this.myScore_ = myScore;
    this.theirScore_ = theirScore;
};
goog.inherits(robin.commands.CreateGameCommand, robin.commands.AbstractCommand);

/**
 * @type {number}
 * @private
 */
robin.commands.CreateGameCommand.prototype.opponentId_;

/**
 * @type {number}
 * @private
 */
robin.commands.CreateGameCommand.prototype.myScore_;

/**
 * @type {number}
 * @private
 */
robin.commands.CreateGameCommand.prototype.theirScore_;


/** @inheritDoc */
robin.commands.CreateGameCommand.prototype.execute = function() {
    return this.apiService_.sendRequest({
        'endpoint': robin.api.APIEndpoints.GAME_CREATE,
        'getParams': {
            'player2id': this.opponentId_,
            'player1score': this.myScore_,
            'player2score': this.theirScore_,
            'date': Math.floor(goog.now() / 1000)
        }
    });
};
