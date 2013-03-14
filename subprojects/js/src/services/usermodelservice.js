goog.provide('robin.services.UserModelService');

goog.require('robin.services.ModelService');

/**
 * @constructor
 * @extends {robin.services.ModelService}
 */
robin.services.UserModelService = function() {
    goog.base(this);
};
goog.inherits(robin.services.UserModelService, robin.services.ModelService);


angular.module('services.userModelService', [])
    .factory('userModelService', function() {
        return new robin.services.UserModelService();
    });
