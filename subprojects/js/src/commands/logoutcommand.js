goog.provide('robin.commands.LogoutCommand');

goog.require('robin.api.APIEndpoints');
goog.require('robin.commands.AbstractCommand');

/**
 * @constructor
 * @extends {robin.commands.AbstractCommand}
 * @param {robin.services.APIService} apiService
 */
robin.commands.LogoutCommand = function(apiService) {
    goog.base(this, apiService);
};
goog.inherits(robin.commands.LogoutCommand, robin.commands.AbstractCommand);

/** @inheritDoc */
robin.commands.LogoutCommand.prototype.execute = function() {
    return this.apiService_.sendRequest({
        'endpoint': robin.api.APIEndpoints.LOGIN
    });
};
