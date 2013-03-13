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
 * @return {!robin.services.NewsfeedModelService}
 */
robin.services.NewsfeedModelService.factory = function() {
    return new robin.services.NewsfeedModelService();
};
