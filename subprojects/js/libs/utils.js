goog.provide('robin.Utils');

goog.require('robin.api.Reader');

/**
 * Convenience method to resolve a given deferred at the root scope.
 * @param {*} injector The injector that created the scope
 * @param {angular.$q.Deferred} deferred The deferred to resolve
 * @param {*} value The value to resolve the deferred to
 */
robin.Utils.resolveAtRootScope = function(injector, deferred, value) {
    injector.invoke(['$rootScope', function($rootScope) {
        $rootScope.$apply(function() {
            deferred.resolve(value);
        });
    }]);
};


/**
 * Parse a response using the given parser.
 * @param {Object} jsonData
 * @param {Function} parser
 */
robin.Utils.parseNodeResponse = function(jsonData, parser) {
    /** @type {robin.api.Reader} */
    var reader = new robin.api.Reader(jsonData);
    reader.push('response').push('data');
    var result = parser(reader);
    reader.pop(2);
    return result;
};
