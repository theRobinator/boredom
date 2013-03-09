apiCall = require('api/apicall.js');
apiEnums = require('api/apienums.js');


exports.send = function(auth, callback, errback) {
    apiCall.send({
        endpoint: apiEnums.Endpoints.GAMES_RECENT,
        auth: auth
    }, callback, errback);
};
