apiCall = require('api/apicall.js');
apiEnums = require('api/apienums.js');


exports.send = function(auth, callback, errback) {
    apiCall.send({
        endpoint: apiEnums.Endpoints.GAMES_UNAPPROVED,
        auth: auth
    }, callback, errback);
};
