/*
 * GET home page.
 */

exports.index = function(request, response) {
    response.render('index', function (err, out) {
        if (err) {
            response.writeHead(500);
            response.write(err);
        } else {
            response.writeHead(200, {
                'Content-Type': 'text/html; charset=UTF-8'
            });
            response.write(out);
        }
    });
};
