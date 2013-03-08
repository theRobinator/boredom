goog.provide('robin.api.APIResponse');

/**
 * @constructor
 */
robin.api.APIResponse = function() {
    this.result_ = { };
};

/**
 * @type {!Object}
 */
robin.api.APIResponse.prototype.result_;

/**
 * @type {robin.api.APIException}
 * @private
 */
robin.api.APIResponse.prototype.error_;

/**
 * @return {boolean}
 */
robin.api.APIResponse.prototype.isSuccess = function() {
    return !this.error_;
};

/**
 * @return {robin.api.APIException}
 */
robin.api.APIResponse.prototype.getError = function() {
    return this.error_;
};

/**
 * @param {robin.api.APIException} error
 */
robin.api.APIResponse.prototype.setError = function(error) {
    this.error_ = error;
};

/**
 * @param {string} type
 * @return {*}
 */
robin.api.APIResponse.prototype.getResult = function(type) {
    return this.result_[type];
};

/**
 * @param {string} type
 * @param {*} result
 */
robin.api.APIResponse.prototype.setResult = function(type, result) {
    this.result_[type] = result;
};
