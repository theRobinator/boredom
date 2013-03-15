/*
 * GET ranking page.
 */

rankingListApicall = require('api/rankinglistapicall.js');
renderutils = require('utils/renderutils.js');

exports.handleRoute = function(request, response) {
    renderutils.renderPageWithPromises(response, 'ranking', null, function() {
        return [rankingListApicall.send(request.headers.cookie).then(function(data) {
            response.write('<script type="text/javascript">robin.controllers.RankingCtrl.initialize(' + JSON.stringify(data) + ');</script>');
        })];
    });
};
