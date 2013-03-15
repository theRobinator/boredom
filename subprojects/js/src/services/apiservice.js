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
 * @type {string}
 * @const
 */
robin.services.APIService.NAME = 'services.apiService';

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
 * @param {!Object} options Options for the request, with the following possible values:
 *      endpoint: The API endpoint to send to
 *      method: The method to use. Defaults to GET.
 *      getParams: GET parameters. Optional.
 *      postParams: POST parameters. Optional.
 *      parser: The parser to use. Optional.
 * @return {angular.$q.Promise}
 */
robin.services.APIService.prototype.sendRequest = function(options) {
    /** @type {!robin.api.APIRequestBuilder} */
    var builder = new robin.api.APIRequestBuilder(this.http_, this.q_);

    // Set default value
    options['method'] || (options['method'] = robin.api.RequestMethod.GET);

    builder.setPath(options['endpoint'])
        .setMethod(options['method'])
        .setParser(options['parser']);

    if (options['getParams']) {
        builder.setGetParams(options['getParams']);
    }
    if (options['postParams']) {
        builder.setPostParams(options['postParams']);
    }

    var deferred = this.q_.defer();

    builder.send()
        .success(function(response) {
            if (!response || response instanceof Error || !response.isSuccess()) {
                deferred.reject(response);
            }
            deferred.resolve(response);
        })
        .error(function(error) {
            deferred.reject(error);
        })

    return deferred.promise;
};

angular.module(robin.services.APIService.NAME, [])
    .factory(robin.services.APIService.NAME, ['$http', '$q', function($http, $q) {
        return new robin.services.APIService($http, $q);
    }]);
