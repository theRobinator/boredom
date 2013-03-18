goog.provide('robin.commands.ApproveGameCommand');

goog.require('robin.api.APIEndpoints');
goog.require('robin.commands.AbstractCommand');

/**
 * @constructor
 * @extends {robin.commands.AbstractCommand}
 * @param {robin.services.APIService} apiService
 * @param {number} gameId
 * @param {boolean} approve
 */
robin.commands.ApproveGameCommand = function(apiService, gameId, approve) {
    goog.base(this, apiService);
    this.gameId_ = gameId;
    this.endpoint_ = approve ? robin.api.APIEndpoints.GAME_APPROVE : robin.api.APIEndpoints.GAME_DENY;
};
goog.inherits(robin.commands.ApproveGameCommand, robin.commands.AbstractCommand);

/**
 * @type {number}
 * @private
 */
robin.commands.ApproveGameCommand.prototype.gameId_;

/**
 * @type {robin.api.APIEndpoints}
 * @private
 */
robin.commands.ApproveGameCommand.prototype.endpoint_;

/** @inheritDoc */
robin.commands.ApproveGameCommand.prototype.execute = function() {
    return this.apiService_.sendRequest({
        'endpoint': this.endpoint_,
        'getParams': {
            'game_id': this.gameId_
        }
    });
};
