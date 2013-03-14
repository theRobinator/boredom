/*
 * GET home page.
 */

renderutils = require('utils/renderutils.js');

exports.handleRoute = function(request, response) {
    renderutils.renderBasicPage(response, 'login');
};
