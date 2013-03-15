/*
 * GET home page.
 */
q = require('q');

newsfeedApiCall = require('api/newsfeedapicall.js');
unapprovedGamesApiCall = require('api/unapprovedgamesapicall.js');
userListApiCall = require('api/userlistapicall.js');
renderutils = require('utils/renderutils.js');

exports.handleRoute = function(request, response) {
    renderutils.renderPageWithPromises(response, 'home', null, function() {
        var auth = request.headers.cookie;
        var promises = [];

        promises.push(userListApiCall.send(auth).then(function(data) {
            response.write('<script type="text/javascript">robin.controllers.MenuCtrl.initialize(' + JSON.stringify(data) + ');</script>');
        }));

        promises.push(unapprovedGamesApiCall.send(auth).then(function(data) {
            response.write('<script type="text/javascript">robin.controllers.UnapprovedCtrl.initialize(' + JSON.stringify(data) + ');</script>');
        }));

        promises.push(newsfeedApiCall.send(auth).then(function(data) {
            response.write('<script type="text/javascript">robin.pages.Home.initializeNewsfeed(' + JSON.stringify(data) + ');</script>');
        }));

        return promises;
    })
};
