/**
 * @fileoverview A TemplatableCollection is a collection of ITemplatable objects. It works like a normal ArrayCollection,
 * except that it also maintains an array of objects with non-obfuscated names that angular templates can read.
 *
 * NOTE: The non-obfuscated array is meant to be read-only. Changes made to the obfuscated model using data objects
 * will be automatically reflected in the template array, but the reverse is not true. Any changes to the template
 * array may disappear at any time.
 */

goog.provide("robin.collections.TemplatableCollection");

goog.require('robin.collections.ArrayCollection');


/**
 * @constructor
 * @extends {robin.collections.ArrayCollection}
 * @param {Array=} opt_source
 */
robin.collections.TemplatableCollection = function(opt_source) {
    goog.base(this, opt_source);
    this.templateArray_ = [];
    if (opt_source && opt_source.length) {
        this.forEach(function(item) {
            this.templateArray_.push(item.toTemplateArray());
        }, this);
    }
};
goog.inherits(robin.collections.TemplatableCollection, robin.collections.ArrayCollection);


/**
 * The template array. Note that this should never be set, because templates will be listening to it for changes.
 * @type {!Array}
 */
robin.collections.TemplatableCollection.prototype.templateArray_;

/**
 * @return {!Array}
 */
robin.collections.TemplatableCollection.prototype.getTemplateArray = function() {
    return this.templateArray_;
};

/** @inheritDoc */
robin.collections.TemplatableCollection.prototype.setItemAt = function(item, index) {
    this.templateArray_[index] = (/** @type {robin.interfaces.ITemplatable} */item).toTemplateArray();
    goog.base(this, 'setItemAt', item, index);
};

/** @inheritDoc */
robin.collections.TemplatableCollection.prototype.addItemAt = function(item, index) {
    this.templateArray_.splice(index, 0, (/** @type {robin.interfaces.ITemplatable} */item).toTemplateArray());
    goog.base(this, 'addItemAt', item, index);
};

/** @inheritDoc */
robin.collections.TemplatableCollection.prototype.removeItemAt = function(index) {
    this.templateArray_.splice(index, 1);
    return goog.base(this, 'removeItemAt', index);
};

/** @inheritDoc */
robin.collections.TemplatableCollection.prototype.removeAll = function() {
    /** @type {number} */
    var length = this.getLength();
    if (length > 0) {
        this.templateArray_.splice(0, length);
    }
    goog.base(this, 'removeAll');
};
