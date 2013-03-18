goog.provide('robin.commands.AbstractCommand');

/**
 * @constructor
 * @param {robin.services.APIService} apiService
 */
robin.commands.AbstractCommand = function(apiService) {
    this.apiService_ = apiService;
};

/**
 * @type {robin.services.APIService}
 * @protected
 */
robin.commands.AbstractCommand.prototype.apiService_;

/**
 * Override this function to handle executing the command.
 * @return {angular.$q.Promise|null}
 */
robin.commands.AbstractCommand.prototype.execute = function() {
    return null;
};
