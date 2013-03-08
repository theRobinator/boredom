goog.provide('robin.api.APIException');
goog.require('goog.object');


/**
 * @constructor
 * @param {string} code
 * @param {string} message
 * @extends Error
 */
robin.api.APIException = function(code, message) {
    this.code_ = code;
    this.message = message;
};
goog.inherits(robin.api.APIException, Error);

/**
 * @private
 * @type {string}
 */
robin.api.APIException.prototype.code_;

/**
 * @return {string}
 */
robin.api.APIException.prototype.getCode = function() {
    return this.code_;
};

/**
 * @override
 */
robin.api.APIException.prototype.toString = function() {
    return this.message;
};
