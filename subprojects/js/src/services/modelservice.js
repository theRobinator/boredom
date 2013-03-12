goog.provide('robin.services.ModelService');

goog.require('robin.collections.TemplatableCollection');

/**
 * @constructor
 */
robin.services.ModelService = function() {
};

/**
 * @type {!robin.collections.TemplatableCollection}
 * @private
 */
robin.services.ModelService.prototype.newsfeedModel_;

/**
 * @type {!robin.collections.TemplatableCollection}
 * @private
 */
robin.services.ModelService.prototype.userModel_;


/**
 * @return {!robin.collections.TemplatableCollection}
 */
robin.services.ModelService.prototype.getNewsfeedModel = function() {
    return this.newsfeedModel_ || (this.newsfeedModel_ = new robin.collections.TemplatableCollection());
};

/**
 * @return {!robin.collections.TemplatableCollection}
 */
robin.services.ModelService.prototype.getUserModel = function() {
    return this.userModel_ || (this.userModel_ = new robin.collections.TemplatableCollection());
};


/**
 * @param {!Array.<!robin.models.Game>} newsfeedModel
 */
robin.services.ModelService.prototype.setNewsfeedModel = function(newsfeedModel) {
    if (!this.newsfeedModel_) {
        this.newsfeedModel_ = new robin.collections.TemplatableCollection(newsfeedModel);
    } else {
        this.newsfeedModel_.removeAll();
        this.newsfeedModel_.addAllAt(0, newsfeedModel);
    }
};

/**
 * @param {!Array.<!robin.models.User>} userModel
 */
robin.services.ModelService.prototype.setUserModel = function(userModel) {
    if (!this.userModel_) {
        this.userModel_ = new robin.collections.TemplatableCollection(userModel);
    } else {
        this.userModel_.removeAll();
        this.userModel_.addAllAt(0, userModel);
    }
};
