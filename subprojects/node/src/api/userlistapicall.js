apiCall = require('api/apicall.js');
apiEnums = require('api/apienums.js');


exports.send = function(auth) {
    return apiCall.send({
        endpoint: apiEnums.Endpoints.USER_LIST,
        auth: auth
    });
};
