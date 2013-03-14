/*
 * GET home page.
 */
userListApiCall = require('api/userlistapicall.js');
renderutils = require('utils/renderutils.js');

exports.handleRoute = function(request, response) {
    renderutils.renderPageWithPromises(response, 'newgame', null, function() {
        return [userListApiCall.send(request.headers.cookie).then(function(data) {
            response.write('<script type="text/javascript">robin.bootstrap.initializeMenu(' + JSON.stringify(data) + ');</script>');
            response.write('<script type="text/javascript">robin.bootstrap.initializeNewGameForm(' + JSON.stringify(data) + ');</script>');
        })];
    });
};
