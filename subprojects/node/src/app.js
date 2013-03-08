
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routeHandlers')
  , https = require('https')
  , cons = require('consolidate')
  , fs = require('fs')
  , path = require('path');

var app = express();

app.configure(function(){
  app.engine('dust', cons.dust);
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'dust');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.login);

// SSL Config
var privateKey = fs.readFileSync('privatekey.pem');
var certificate = fs.readFileSync('certificate.pem');
var options = { key: privateKey, cert: certificate };


https.createServer(options, app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
