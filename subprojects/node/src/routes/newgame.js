/*
 * GET home page.
 */
userListApiCall = require('api/userlistapicall.js');
utils = require('utils.js');

exports.handleRoute = function(request, response) {
    response.render('newgame', function (err, out) {
        if (err) {
            response.writeHead(500);
            response.write(err.toString());
        } else {
            console.log('writing headers');
            response.writeHead(200, {
                'Content-Type': 'text/html; charset=UTF-8'
            });
            response.write(out);
        }
    });

    userListApiCall.send(request.headers.cookie, function(data) {
        response.write('<script type="text/javascript">robin.bootstrap.initializeMenu(' + JSON.stringify(data) + ');</script>');
        response.write('<script type="text/javascript">robin.bootstrap.initializeNewGameForm(' + JSON.stringify(data) + ');</script>');
        response.write('</body></html>');
        response.end();
    }, utils.requestErrorHandler(response));
};
