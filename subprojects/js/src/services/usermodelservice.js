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

/**
 * @type {string}
 * @const
 */
robin.services.UserModelService.NAME = 'services.userModelService';


angular.module(robin.services.UserModelService.NAME, [])
    .factory(robin.services.UserModelService.NAME, function() {
        return new robin.services.UserModelService();
    });
