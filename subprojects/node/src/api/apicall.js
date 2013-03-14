apienums = require('api/apienums.js');
https = require('https');
querystring = require('querystring');
util = require('util');
request = require('request');
settings = require('settings.js');
q = require('q');

/**
 * Send an API call.
 * @param {Object} options Options include:
 *      endpoint: The endpoint to call
 *      auth: The auth cookies to use. Optional.
 *      getParams: The get parameters. Optional.
 *      postParams: The post parameters. Optional.
 * @return {Q.defer.promise}
 */
exports.send = function(options) {
    /** @type {Object} */
    var postParams = options.postParams ? querystring.stringify(options.postParams) : '';

    /** @type {Object} */
    var getParams;
    options.getParams || (options.getParams = {});
    options.getParams['format'] = 'json';
    getParams = querystring.stringify(options.getParams);

    /** @type {string} */
    var path = settings.API_URL + '/' + options.endpoint;
    path += '?' + getParams;
    /** @type {string} */
    var method = postParams ? apienums.Methods.POST : apienums.Methods.GET;

    /** @type {!Object} */
    var headers;

    if (postParams) {
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postParams.length
        }
    } else {
        headers = { };
    }
    headers['Cookie'] = options.auth;

    var deferred = q.defer();

    request({
        method: method,
        uri: path,
        headers: headers,
        body: postParams
    }
    ,
        function(error, response, body) {
            var data;
            try {
                data = JSON.parse(body);
            } catch (err) {
                data = null;
            }
            if (data && !error && response.statusCode == 200) {
                // We don't have these if statements combined because we want to skip the errback if we have a good response but no callback
                if (data && data['response'] && data['response']['type'] == 'success') {
                    deferred.resolve(data);
                } else {
                    util.log('Error in API call (bad params): ' + body);
                    deferred.reject(data);
                }
            } else {
                if (error) {
                    util.log('Error in API call (HTTP request failed): ' + error.toString());
                } else {
                    util.log('Data returned from an API call was unparsable!' + body);
                }
                deferred.reject(null);
            }
        }
    )
    return deferred.promise;
};
