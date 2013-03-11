/**
 * Create a generic error handler that can be used to handle API request errors.
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
