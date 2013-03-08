goog.provide('robin.api.APIExceptionParser');

goog.require('robin.api.APIException');


robin.api.APIExceptionParser.parseResponseFromJson = function(reader, response) {
    if (reader.string('type') != 'error') {
        return;
    }

    reader.push('data');
    response.setError(new robin.api.APIException(reader.string('code'), reader.string('message')));
    reader.pop();
};
