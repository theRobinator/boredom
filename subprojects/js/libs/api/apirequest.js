goog.provide('robin.api.APIRequest');

goog.require('goog.debug.Logger');
goog.require('goog.Uri');

goog.require('robin.api.APIExceptionParser');
goog.require('robin.api.APIResponse');
goog.require('robin.api.Reader');
goog.require('robin.api.RequestMethod');
goog.require('robin.Constants');

/**
 * @param {!robin.api.APIRequestBuilder} builder
 * @constructor
 */
robin.api.APIRequest = function(builder) {
    this.http_ = builder.http;
    this.q_ = builder.q;
    
    this.path_ = builder.path;
    this.method_ = builder.method;
    this.getParams_ = builder.getParams;
    this.postParams_ = builder.postParams;

    this.parser_ = builder.parser;
};

/**
 * @protected
 * @type {!goog.debug.Logger}
 */
robin.api.APIRequest.prototype.logger_ = goog.debug.Logger.getLogger('zoosk.api.AbstractRequest');

/**
 * @protected
 * @type {angular.$http}
 */
robin.api.APIRequest.prototype.http_;

/**
 * @protected
 * @type {angular.$q}
 */
robin.api.APIRequest.prototype.q_;

/**
 * @protected
 * @type {!robin.api.RequestMethod}
 */
robin.api.APIRequest.prototype.method_;

/**
 * @protected
 * @type {string}
 */
robin.api.APIRequest.prototype.path_;

/**
 * @protected
 * @type {goog.Uri.QueryData}
 */
robin.api.APIRequest.prototype.getParams_;

/**
 * @protected
 * @type {goog.Uri.QueryData}
 */
robin.api.APIRequest.prototype.postParams_;

/**
 * @protected
 * @type {Function}
 */
robin.api.APIRequest.prototype.parser_;

/**
 * @return {string}
 */
robin.api.APIRequest.prototype.getPath = function() {
    return this.path_;
};

/**
 * @return {boolean}
 */
robin.api.APIRequest.prototype.hasGetParams = function() {
    return !!this.getParams_;
};

/**
 * @return {goog.Uri.QueryData}
 */
robin.api.APIRequest.prototype.getGetParams = function() {
    return this.getParams_;
};

/**
 * @return {boolean}
 */
robin.api.APIRequest.prototype.hasPostParams = function() {
    return !!this.postParams_
};

/**
 * @return {goog.Uri.QueryData}
 */
robin.api.APIRequest.prototype.getPostParams = function() {
    return this.postParams_;
};

/**
 * @return {!angular.$http.HttpPromise}
 */
robin.api.APIRequest.prototype.send = function() {
    /** @type {!Object} */
    var params = {
        'method': this.method_,
        'url': this.buildUrl_(),
        'transformResponse': goog.bind(this.requestSuccess_, this)
    };

    if (this.method_ == robin.api.RequestMethod.POST) {
        params['data'] = this.postParams_.toString();
        params['headers'] = { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' };
    }

    return /** @type {Function} */ (this.http_)(params);
};

/**
 * @return {string}
 * @private
 */
robin.api.APIRequest.prototype.buildUrl_ = function() {
    /** @type {goog.Uri} */
    var uri = new goog.Uri()
        .setPath(robin.Constants.API_URL + '/' + this.path_)
        .setParameterValue('format', 'json');

    if (this.getParams_) {
        uri.getQueryData().extend(this.getParams_);
    }

    return uri.toString();
};

/**
 * @return {robin.api.APIResponse|angular.$q.Promise}
 * @private
 */
robin.api.APIRequest.prototype.requestSuccess_ = function(data) {
    /** @type {robin.api.APIResponse|angular.$q.Promise} */
    var response;

    try {
        response = this.parseResponse(new robin.api.Reader(/** @type {Object} */ (angular.fromJson(data))));
    } catch (e) {
        this.logger_.warning('Error processing api response', e);
        response = this.q_.reject(e);
    }

    return response;
};

/**
 * @param {!robin.api.Reader} reader
 * @return {!robin.api.APIResponse}
 */
robin.api.APIRequest.prototype.parseResponse = function(reader) {
    /** @type {!robin.api.APIResponse} */
    var response = new robin.api.APIResponse();

    robin.api.APIExceptionParser.parseResponseFromJson(reader, response);

    if (response.isSuccess()) {
        reader.push('response').push('data');
        this.parser_(reader, response);
        reader.pop(2);
    }

    return response;
};
