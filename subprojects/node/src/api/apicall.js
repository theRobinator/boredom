apienums = require('api/apienums.js');
https = require('https');
querystring = require('querystring');
util = require('util');
request = require('request');
settings = require('settings.js');

/**
 * Send an API call.
 * @param {Object} options Options include:
 *      endpoint: The endpoint to call
 *      auth: The auth cookies to use. Optional.
 *      getParams: The get parameters. Optional.
 *      postParams: The post parameters. Optional.
 * @param callback The callback to call with the result. Optional.
 * @param errback The errback to call with the result. Optional.
 */
exports.send = function(options, callback, errback) {
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

    request({
        method: method,
        uri: path,
        headers: headers,
        body: postParams
    }
    ,
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var data = JSON.parse(body);
                // We don't have these if statements combined because we want to skip the errback if we have a good response but no callback
                if (data && data['response'] && data['response']['type'] == 'success') {
                    if (callback) {
                        callback(data);
                    }
                } else {
                    util.log('Error in API call (bad params): ' + body);
                    if (errback) {
                        errback(data);
                    }
                }
            } else {
                util.log('Error in API call (HTTP request failed): ' + error.toString());
                if (errback) {
                    errback(null);
                }
            }
        }
    )
};
