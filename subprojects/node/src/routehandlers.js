/*
 * This file will collect all of the listed files and dump their handleRoute methods into its exported object. The
 * fields on the object will be named after the file they were found in. For example, adding 'login' to this array
 * causes this file to export a 'login' field that points to the handleRoute function in routes/login.js.
 */
var routeFiles = ['login', 'home'];

for (var i = 0; i < routeFiles.length; ++i) {
    var routeName = routeFiles[i];
    exports[routeName] = require('routes/' + routeName + '.js').handleRoute;
}
