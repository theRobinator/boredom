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

angular.module('services.newsfeedModelService', [])
    .factory('newsfeedModelService', function() {
        return new robin.services.NewsfeedModelService();
    });
