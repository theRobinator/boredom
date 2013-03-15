/*
 * GET home page.
 */
userListApiCall = require('api/userlistapicall.js');
renderutils = require('utils/renderutils.js');

exports.handleRoute = function(request, response) {
    renderutils.renderPageWithPromises(response, 'newgame', null, function() {
        return [userListApiCall.send(request.headers.cookie).then(function(data) {
            response.write('<script type="text/javascript">robin.controllers.MenuCtrl.initialize(' + JSON.stringify(data) + ');</script>');
            response.write('<script type="text/javascript">robin.controllers.NewGameCtrl.initialize(' + JSON.stringify(data) + ');</script>');
        })];
    });
};
