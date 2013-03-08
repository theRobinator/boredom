goog.provide('robin.api.APIRequestBuilder');

goog.require('goog.object');
goog.require('goog.Uri.QueryData');

goog.require('robin.api.APIRequest');
goog.require('robin.api.RequestMethod');

/**
 * @param {angular.$http} $http
 * @param {angular.$q} $q
 * @constructor
 */
robin.api.APIRequestBuilder = function($http, $q) {
    this.http = $http;
    this.q = $q;
};

/**
 * @type {angular.$http}
 * @private
 */
robin.api.APIRequestBuilder.prototype.http;

/**
 * @type {angular.$q}
 * @private
 */
robin.api.APIRequestBuilder.prototype.q;

/**
 * @type {string}
 */
robin.api.APIRequestBuilder.prototype.path;

/**
 * @type {goog.Uri.QueryData}
 */
robin.api.APIRequestBuilder.prototype.getParams;

/**
 * @type {goog.Uri.QueryData}
 */
robin.api.APIRequestBuilder.prototype.postParams;

/**
 * @type {function(!robin.api.Reader, !robin.api.APIResponse)}
 */
robin.api.APIRequestBuilder.prototype.parser = goog.nullFunction;

/**
 * @type {!robin.api.RequestMethod}
 */
robin.api.APIRequestBuilder.prototype.method = robin.api.RequestMethod.GET;

/**
 * @param {!Object} params
 * @return {!robin.api.APIRequestBuilder}
 */
robin.api.APIRequestBuilder.prototype.setGetParams = function(params) {
	goog.object.forEach(params, function(value, key) {
        this.addGetParam(key, value);
    }, this);
	return this;
};

/**
 * @param {string} key Name.
 * @param {*} value Value.
 * @return {!robin.api.APIRequestBuilder}
 */
robin.api.APIRequestBuilder.prototype.addGetParam = function(key, value) {
    (this.getParams || (this.getParams = new goog.Uri.QueryData())).add(key, value);
    return this;
};

/**
 * @param {!Object} params
 * @return {!robin.api.APIRequestBuilder}
 */
robin.api.APIRequestBuilder.prototype.setPostParams = function(params) {
	goog.object.forEach(params, function(value, key) {
        this.addPostParam(key, value);
    }, this);
	return this;
};

/**
 * @param {string} key Name.
 * @param {*} value Value.
 * @return {!robin.api.APIRequestBuilder} this for chaining
 */
robin.api.APIRequestBuilder.prototype.addPostParam = function(key, value) {
    (this.postParams || (this.postParams = new goog.Uri.QueryData())).add(key, value);
    return this;
};

/**
 * @param {!robin.api.RequestMethod} method
 * @return {!robin.api.APIRequestBuilder}
 */
robin.api.APIRequestBuilder.prototype.setMethod = function(method) {
	this.method = method;
	return this;
};

/**
 * @param {string} path
 * @return {!robin.api.APIRequestBuilder}
 */
robin.api.APIRequestBuilder.prototype.setPath = function(path) {
	this.path = path;
	return this;
};

/**
 * @param {function(!robin.api.Reader, !robin.api.APIResponse)} parser
 * @return {!robin.api.APIRequestBuilder}
 */
robin.api.APIRequestBuilder.prototype.setParser = function(parser) {
	this.parser = parser;
	return this;
};

/**
 * @return {!robin.api.APIRequest}
 */
robin.api.APIRequestBuilder.prototype.build = function() {
	if (!this.path) {
		throw new Error('[robin.api.APIRequestBuilder] Path was not set');
	}
	
	if (this.postParams && (this.method != robin.api.RequestMethod.POST)) {
		this.method = robin.api.RequestMethod.POST;
	}

    return new robin.api.APIRequest(this);
};

/**
 * @return {angular.$http.HttpPromise}
 */
robin.api.APIRequestBuilder.prototype.send = function() {
    return this.build().send();
};
