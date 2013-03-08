/*
 * GET home page.
 */

exports.handleRoute = function(request, response) {
    response.render('login', function (err, out) {
        if (err) {
            response.writeHead(500);
            response.write(err.toString());
        } else {
            response.writeHead(200, {
                'Content-Type': 'text/html; charset=UTF-8'
            });
            response.write(out);
        }
        response.end();
    });
};
