/*
 * GET home page.
 */
newsfeedApiCall = require('api/newsfeedapicall.js');
unapprovedGamesApiCall = require('api/unapprovedgamesapicall.js');
userListApiCall = require('api/userlistapicall.js');
utils = require('utils.js');

exports.handleRoute = function(request, response) {
    response.render('home', function (err, out) {
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

    var apiCalls = 3;

    var responseDone = function() {
        apiCalls--;
        if (apiCalls === 0) {
            response.write('</body></html>');
            response.end();
        }
    };

    var responseError = utils.requestErrorHandler(response, responseDone);

    var auth = request.headers.cookie;

    userListApiCall.send(auth, function(data) {
        response.write('<script type="text/javascript">robin.bootstrap.initializeMenu(' + JSON.stringify(data) + ');</script>');
        responseDone();
    }, responseError);

    unapprovedGamesApiCall.send(auth, function(data) {
        response.write('<script type="text/javascript">robin.bootstrap.initializeUnapprovedGames(' + JSON.stringify(data) + ');</script>');
        responseDone();
    }, responseError);

    newsfeedApiCall.send(auth, function(data) {
        response.write('<script type="text/javascript">robin.bootstrap.initializeNewsfeed(' + JSON.stringify(data) + ');</script>');
        responseDone();
    }, responseError);
};
