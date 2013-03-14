q = require('q');
util = require('util');

/**
 * Create a generic error handler that can be used to handle API request errors.
 *
 * @param response The response to write error messages to.
 * @param callback A function to call when the error checking is complete.
 * @return {Function}
 */
exports.requestErrorHandler = function(response, callback) {
    return function(error) {
        try {
            if (error['data']['code'] == 'auth_required') {
                response.write('<script type="text/javascript">window.location = "/";</script>');
                response.end();
            }
        } catch (err) {
            console.log(err.stack);
        }
        if (callback) {
            callback();
        }
    };
};


/**
 * Create a generic error handler that can be used to handle template render errors.
 *
 * @param response The response to write error messages to.
 * @param callback A function to call after the 500 status code is written, but before the response ends
 * @return {Function}
 */
exports.renderErrorHandler = function(response, callback) {
    return function(error) {
        util.log('Could not render template ' + templateName + '. Error was ' + error);
        response.writeHead(500);
        response.write(err.toString());
        if (callback) {
            callback(error);
        } else {
            response.end();
        }
    };
};


/**
 * Write the output of a render call to a response along with a success header.
 * @param response
 * @param output
 */
exports.writeRenderResponse = function(response, output) {
    response.writeHead(200, {
        'Content-Type': 'text/html; charset=UTF-8'
    });
    response.write(output);
};


/**
 * Render a page that uses only a template.
 *
 * @param {Response} response The response to write the output to.
 * @param {string} templateName The name of the template to render.
 * @param {Object=} templateParams The parameters to pass to the template.
 */
exports.renderBasicPage = function(response, templateName, templateParams) {
    templateParams || (templateParams = {});
    response.render(templateName, templateParams, function(error, out) {
        if (error) {
            (exports.renderErrorHandler(response))(error);
        } else {
            exports.writeRenderResponse(response, out);
        }
        response.write('</body></html>');
        response.end();
    });
};


/**
 * Render a generic page that is made up of an initially written template and several promises that write later data.
 *
 * @param {Response} response The response to write to.
 * @param {string} templateName The name of the dust template to render.
 * @param {Object=} templateParams The parameters that will be passed into the template.
 * @param {Function=} promiseFunc A function called after the render that optionally returns an array of promises. If
 *                                it does, the response will not end until all promises are resolved or rejected.
 */
exports.renderPageWithPromises = function(response, templateName, templateParams, promiseFunc) {
    templateParams || (templateParams = {});
    response.render(templateName, templateParams, function(error, out) {
        if (error) {
            (exports.renderErrorHandler(response))(error);
        } else {
            exports.writeRenderResponse(response, out);
            if (promiseFunc) {
                var promises = promiseFunc();
                if (promises) {
                    q.all(promises).then(function() {
                        response.write('</body></html>');
                        response.end();
                    },
                    exports.requestErrorHandler(response)
                    );
                }
            }
        }
    });
};


/**
 * Render a page and defer processing to callbacks. These functions take the render output as an argument and are
 * responsible for closing the request after they finish.
 *
 * @param {Response} response The response to write to.
 * @param {string} templateName The name of the dust template to render.
 * @param {Object=} templateParams The parameters that will be passed into the template.
 * @param {Function} callback A function called after the render completes successfully.
 * @param {Function=} errback A function called if the render fails. If not specified, the response will close automatically.
 */
exports.renderPageWithCallbacks = function(response, templateName, templateParams, callback, errback) {
    templateParams || (templateParams = {});
    response.render(templateName, templateParams, function(error, out) {
        if (error) {
            (exports.renderErrorHandler(response, errback))(error);
        } else {
            exports.writeRenderResponse(response, out);
            callback(out);
        }
    });
};
