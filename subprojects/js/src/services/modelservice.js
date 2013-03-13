goog.provide('robin.services.ModelService');

goog.require('robin.collections.ArrayCollection');

/**
 * The ModelService provides a way to share an ArrayCollection of objects between different controllers. It should be
 * extended by other services that provide specific models.
 *
 * A ModelService will always return the same ArrayCollection when getModel is called. This allows listeners in angular
 * to do their job without worry. When the setModel method is called, the internal ArrayCollection will have all of its
 * elements reset to match the passed-in array.
 *
 * @constructor
 */
robin.services.ModelService = function() {
};

/**
 * @type {!robin.collections.ArrayCollection}
 * @private
 */
robin.services.ModelService.prototype.model_;

/**
 * @return {!robin.collections.ArrayCollection}
 */
robin.services.ModelService.prototype.getModel = function() {
    return this.newsfeedModel_ || (this.newsfeedModel_ = new robin.collections.ArrayCollection());
};

/**
 * @param {!Array} model
 */
robin.services.ModelService.prototype.setModel = function(model) {
    if (!this.newsfeedModel_) {
        this.newsfeedModel_ = new robin.collections.ArrayCollection(model);
    } else {
        this.newsfeedModel_.removeAll();
        this.newsfeedModel_.addAllAt(0, model);
    }
};
