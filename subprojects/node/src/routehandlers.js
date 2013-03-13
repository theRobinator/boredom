/*
 * This file will collect all of the files in the routes/ directory and export their handleRoute methods. The
 * fields on the object will be named after the file they were found in. For example, if you wrote login.js, this file's
 * exports object would have a field called login that pointed to the exports.handleRoute method in login.js.
 */
var fs = require('fs');

var routeFiles = fs.readdirSync('routes');

for (var i = 0; i < routeFiles.length; ++i) {
    var routeName = routeFiles[i];
    exports[routeName.split('.')[0]] = require('routes/' + routeName).handleRoute;
}
