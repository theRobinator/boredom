goog.provide('robin.api.Reader');

goog.require('goog.array');
goog.require('goog.object');

/**
 * @constructor
 * @param {Object=} opt_data
 * @param {Array=} opt_stack
 */
robin.api.Reader = function(opt_data, opt_stack) {
    /**
     * @private
     * @type {Object}
     */
    this.object_ = opt_data || {};

    /**
     * @private
     * @type {Array}
     */
    this.stack_ = opt_stack || [ ];
};

/**
 * @return {!robin.api.Reader}
 */
robin.api.Reader.prototype.clone = function() {
    return new robin.api.Reader(this.object_, goog.array.clone(this.stack_));
};

/**
 * @param {string} propname
 * @return {!robin.api.Reader} This, for chaining
 */
robin.api.Reader.prototype.push = function(propname) {
    this.pushObj(this.object_[propname]);
    return this;
};

/**
 * @param {Object} obj
 * @return {!robin.api.Reader} This, for chaining
 */
robin.api.Reader.prototype.pushObj = function(obj) {
    this.stack_.push(this.object_);
    this.object_ = obj || {};
    return this;
};

/**
 * @param {number=} opt_times, number of times to pop. defaults to 1
 * @return {!robin.api.Reader} This, for chaining
 */
robin.api.Reader.prototype.pop = function(opt_times) {
    // backwards loops perform faster in javascript
    for (opt_times || (opt_times = 1); opt_times > 0; opt_times--) {
        this.object_ = this.stack_.pop();
    }
    return this;
};

/**
 * @param {string} propname
 * @return {string}
 */
robin.api.Reader.prototype.string = function(propname) {
    return /** @type {string} */ (this.object_[propname]);
};

/**
 * @param {string} propname
 * @return {number}
 */
robin.api.Reader.prototype.number = function(propname) {
    return /** @type {number} */ (this.object_[propname]);
};

/**
 * @param {string} propname
 * @return {boolean}
 */
robin.api.Reader.prototype.bool = function(propname) {
    return /** @type {boolean} */ (this.object_[propname]);
};

/**
 * Read the value of a cdata node as a property value.
 * This is for the common case where there is a node
 * that has a cdata, and there aren't any other
 * properties that the reader cares about.
 *
 * @param {string=} opt_propname
 * @return {string}
 * @notypecheck
 */
robin.api.Reader.prototype.cdata = function(opt_propname) {
    var obj =opt_propname ? this.object_[opt_propname] : this.object_;
return obj ? obj['cdata'] : undefined;
};

/**
 * @param {string} propname
 * @return {boolean}
 */
robin.api.Reader.prototype.hasProperty = function(propname) {
    return (propname in this.object_) && goog.isDef(this.object_[propname]);
};

/**
 * @param {string} propname
 * @param {Function} f The function to call for every member of array; should
 *    take 2 arguments (a reader positioned at the object, and its index).
 * @param {Object=} opt_obj Used as the 'this' object in f when called.
 * @return {!robin.api.Reader} This, for chaining
 */
robin.api.Reader.prototype.forEachInArray = function(propname, f, opt_obj) {
    if (goog.isArray(this.object_[propname])) {
        var arr = this.object_[propname];
        for (var i = 0, l=arr.length; i < l; i++) {
            this.pushObj(arr[i]);
            f.call(/** @type {Object} */ (opt_obj || goog.global), this, i, arr);
            this.pop();
        }
    }
    return this;
};

/**
 * @param {string} propname
 * @param {Function} f The function to call for every element. This function
 *     takes 2 arguments (the reader positioned at the value, which can be an object, and its key)
 * @param {Object=} opt_obj Used as the 'this' object in f when called.
 * @return {!robin.api.Reader} This, for chaining
 */
robin.api.Reader.prototype.forEachInObject = function(propname, f, opt_obj) {
    if (goog.typeOf(this.object_[propname]) == 'object') {
        var obj = this.object_[propname];
        goog.object.forEach(obj, function(val, key) {
            this.pushObj(val);
            f.call(/** @type {Object} */ (opt_obj || goog.global), this, key);
            this.pop();
        }, this);
    }
    return this;
};

/**
 * @param {string} propname
 * @param {Array.<!string>} exceptionList
 * @param {Function} f The function to call for every element. This function
 *     takes 2 arguments (the reader positioned at the value, which can be an object, and its key)
 * @param {Object=} opt_obj Used as the 'this' object in f when called.
 * @return {!robin.api.Reader} This, for chaining
 */
robin.api.Reader.prototype.forEachInObjectExcept = function(propname, exceptionList,  f, opt_obj) {
    return this.forEachInObject(propname, function(r, key) {
        if (!goog.array.contains(exceptionList, key)) {
            f.call(/** @type {Object} */ this, r, key);
        }
    }, opt_obj);
};
