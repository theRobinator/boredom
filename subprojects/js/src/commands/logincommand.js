goog.provide('robin.commands.LoginCommand');

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
robin.commands.LoginCommand = function(apiService, username, password) {
    goog.base(this, apiService);
    this.username_ = username;
    this.password_ = password;
};
goog.inherits(robin.commands.LoginCommand, robin.commands.AbstractCommand);

/**
 * @type {string}
 * @private
 */
robin.commands.LoginCommand.prototype.username_;

/**
 * @type {string}
 * @private
 */
robin.commands.LoginCommand.prototype.password_;

/** @inheritDoc */
robin.commands.LoginCommand.prototype.execute = function() {
    return this.apiService_.sendRequest({
        'endpoint': robin.api.APIEndpoints.LOGIN,
        'getParams': {
            'username': this.username_,
            'password': this.password_
        },
        'parser': robin.api.UserParser.parseUserFromJson
    });
};
