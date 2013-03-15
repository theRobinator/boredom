goog.provide('robin.services.NewsfeedModelService');

goog.require('robin.services.ModelService');

/**
 * @constructor
 * @extends {robin.services.ModelService}
 */
robin.services.NewsfeedModelService = function() {
    goog.base(this);
};
goog.inherits(robin.services.NewsfeedModelService, robin.services.ModelService);

/**
 * @type {string}
 * @const
 */
robin.services.NewsfeedModelService.NAME = 'services.newsfeedModelService';


angular.module(robin.services.NewsfeedModelService.NAME, [])
    .factory(robin.services.NewsfeedModelService.NAME, function() {
        return new robin.services.NewsfeedModelService();
    });
