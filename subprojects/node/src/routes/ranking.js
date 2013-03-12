/*
 * GET ranking page.
 */

rankingListApicall = require('api/rankinglistapicall.js');

exports.handleRoute = function(request, response) {
    response.render('ranking', function (err, out) {
        if (err) {
            response.writeHead(500);
            response.write(err.toString());
        } else {
            response.writeHead(200, {
                'Content-Type': 'text/html; charset=UTF-8'
            });
            response.write(out);
            var auth = request.headers.cookie;

            rankingListApicall.send(auth, function(data) {
                response.write('<script type="text/javascript">robin.bootstrap.initializeRanking(' + JSON.stringify(data) + ');</script>');
                response.write('</body></html>');
                            response.end();
            }, function(error) {
                response.write('</body></html>');
                response.end();
            });
        }
    })

};