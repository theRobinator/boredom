goog.provide('robin.commands.RegisterCommand');

goog.require('robin.api.APIEndpoints');
goog.require('robin.api.UserParser');
goog.require('robin.commands.AbstractCommand');

/**
 * @constructor
 * @extends {robin.commands.AbstractCommand}
 * @param {robin.services.APIService} apiService
 * @param {string} username
 * @param {string} password
 */
robin.commands.RegisterCommand = function(apiService, username, password) {
    goog.base(this, apiService);
    this.username_ = username;
    this.password_ = password;
};
goog.inherits(robin.commands.RegisterCommand, robin.commands.AbstractCommand);

/**
 * @type {string}
 * @private
 */
robin.commands.RegisterCommand.prototype.username_;

/**
 * @type {string}
 * @private
 */
robin.commands.RegisterCommand.prototype.password_;

/** @inheritDoc */
robin.commands.RegisterCommand.prototype.execute = function() {
    return this.apiService_.sendRequest({
        'endpoint': robin.api.APIEndpoints.REGISTER,
        'getParams': {
            'username': this.username_,
            'password': this.password_
        },
        'parser': robin.api.UserParser.parseUserFromJson
    });
};
