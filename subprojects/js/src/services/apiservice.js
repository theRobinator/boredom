goog.provide('robin.services.APIService');

goog.require('robin.api.APIRequestBuilder');

/**
 * @param {angular.$http} $http
 * @param {angular.$q} $q
 * @constructor
 */
robin.services.APIService = function($http, $q) {
    this.http_ = $http;
    this.q_ = $q;
};

/**
 * @type {angular.$q}
 * @private
 */
robin.services.APIService.prototype.q_;

/**
 * @type {angular.$http}
 * @private
 */
robin.services.APIService.prototype.http_;

/**
 * @return {!robin.api.APIRequestBuilder}
 */
robin.services.APIService.prototype.getRequestBuilder = function() {
    return new robin.api.APIRequestBuilder(this.http_, this.q_);
};

/**
 * @type {Array}
 */
robin.services.APIService.factory = ['$http', '$q', function($http, $q) {
    return new robin.services.APIService($http, $q);
}];
