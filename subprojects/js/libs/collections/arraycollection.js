/**
 * @fileoverview An ArrayCollection is a wrapper around the basic array object. It provides
 * more intuitive functionality for adding and removing items, as well as helper functions
 * for iteration, search, and sorting.
 */

goog.provide('robin.collections.ArrayCollection');

goog.require('goog.array');


/**
 * @param {Array=} opt_source
 * @constructor
 */
robin.collections.ArrayCollection = function(opt_source) {
    this.source_ = opt_source || [ ];
};


/**
 * The underlying array source.
 * @private
 * @type {!Array}
 */
robin.collections.ArrayCollection.prototype.source_;

/**
 * Any modifications made directly to the source will not cause
 * collection events to be dispatched
 * @return {!Array}
 */
robin.collections.ArrayCollection.prototype.getSource = function() {
    return this.source_;
};

/**
 * @return {number}
 */
robin.collections.ArrayCollection.prototype.getLength = function() {
    return this.source_.length;
};

/**
 * @param {number} index
 * @return {*}
 */
robin.collections.ArrayCollection.prototype.getItemAt = function(index) {
    if (!this.isValidIndex_(index)) {
        return null;
    }

    return this.source_[index];
};

/**
 * @param {*} item
 * @param {number} index
 * @return {*} the item that was replaced, or null if none
 */
robin.collections.ArrayCollection.prototype.setItemAt = function(item, index) {
    if (!this.isValidIndex_(index)) {
        return null;
    }

    /** @type {*} */
    var oldItem = this.source_[index];
    this.source_[index] = item;

    return oldItem;
};

/**
 * @param {*} item
 */
robin.collections.ArrayCollection.prototype.addItem = function(item) {
    this.addItemAt(item, this.getLength());
};

/**
 * @param {*} item
 * @param {number} index
 */
robin.collections.ArrayCollection.prototype.addItemAt = function(item, index) {
    if (index < 0 || index > this.getLength()) {
        throw new RangeError(index);
    }

    this.source_.splice(index, 0, item);
};

/**
 * @param {number} index
 * @param {!Array} itemsArray
 */
robin.collections.ArrayCollection.prototype.addAllAt = function(index, itemsArray) {
    for (var i = 0, l = itemsArray.length; i < l; i++) {
        this.addItemAt(itemsArray[i], index + i);
    }
};

/**
 * @param {number} index
 * @return {*}
 */
robin.collections.ArrayCollection.prototype.removeItemAt = function(index) {
    if (!this.isValidIndex_(index)) {
        throw new RangeError(index);
    }

    // splice(index, 1) returns an array with one element
    return this.source_.splice(index, 1)[0];
};

/**
 * @param {*} item
 * @return {boolean}
 */
robin.collections.ArrayCollection.prototype.removeItem = function(item) {
    /** @type {!Array} */
    var source = this.source_;

    for (var index = 0, l = source.length; index < l; index++) {
       if (source[index] == item) {
           this.removeItemAt(index);
           return true;
       }
    }
    return false;
};

/**
 *
 */
robin.collections.ArrayCollection.prototype.removeAll = function() {
    /** @type {number} */
    var length = this.getLength();

    if (length > 0) {
        this.source_.splice(0, length);
    }
};

/**
 * Calls a function for each element in an array.
 *
 * See {@link http://tinyurl.com/developer-mozilla-org-array-foreach}
 *
 * @param {?function(this: T, ...)} f The function to call for every element.
 *     This function takes 3 arguments (the element, the index and the array).
 *     The return value is ignored. The function is called only for indexes of
 *     the array which have assigned values; it is not called for indexes which
 *     have been deleted or which have never been assigned values.
 * @param {T=} opt_obj The object to be used as the value of 'this'
 *     within f.
 * @template T
 */
robin.collections.ArrayCollection.prototype.forEach = function(f, opt_obj) {
    goog.array.forEach(this.source_, f, opt_obj);
};

/**
 * Calls f for each element of an array. If any call returns true, some()
 * returns true (without checking the remaining elements). If all calls
 * return false, some() returns false.
 *
 * See {@link http://tinyurl.com/developer-mozilla-org-array-some}
 *
 * @param {Function} f The function to call for every element. This function
 *     takes 3 arguments (the element, the index and the array) and must
 *     return a Boolean.
 * @param {Object=} opt_obj  The object to be used as the value of 'this'
 *     within f.
 * @return {boolean} true if any element passes the test.
 */
robin.collections.ArrayCollection.prototype.some = function(f, opt_obj) {
    return goog.array.some(this.source_, f, opt_obj);
};

/**
 * Searches the specified array for the specified target using the binary
 * search algorithm.  If no opt_compareFn is specified, elements are compared
 * using <code>goog.array.defaultCompare</code>, which compares the elements
 * using the built in < and > operators.  This will produce the expected
 * behavior for homogeneous arrays of String(s) and Number(s). The array
 * specified <b>must</b> be sorted in ascending order (as defined by the
 * comparison function).  If the array is not sorted, results are undefined.
 * If the array contains multiple instances of the specified target value, any
 * of these instances may be found.
 *
 * Runtime: O(log n)
 *
 * @param {*} target The sought value.
 * @param {Function=} opt_compareFn Optional comparison function by which the
 *     array is ordered. Should take 2 arguments to compare, and return a
 *     negative number, zero, or a positive number depending on whether the
 *     first argument is less than, equal to, or greater than the second.
 * @return {number} Lowest index of the target value if found, otherwise
 *     (-(insertion point) - 1). The insertion point is where the value should
 *     be inserted into arr to preserve the sorted property.  Return value >= 0
 *     iff target is found.
 */
robin.collections.ArrayCollection.prototype.binarySearch = function(target, opt_compareFn) {
    return goog.array.binarySearch(this.source_, target, opt_compareFn);
};

/**
 * Inserts a value into a sorted array. The array is not modified if the
 * value is already present.
 * @param {*} value The object to insert.
 * @param {Function=} opt_compareFn Optional comparison function by which the
 *     array is ordered. Should take 2 arguments to compare, and return a
 *     negative number, zero, or a positive number depending on whether the
 *     first argument is less than, equal to, or greater than the second.
 * @return {boolean} True if an element was inserted.
 */
robin.collections.ArrayCollection.prototype.binaryInsert = function(value, opt_compareFn) {
    /** @type {number} */
    var index = goog.array.binarySearch(this.source_, value, opt_compareFn);

    if (index < 0) {
        this.addItemAt(value, -(index + 1));
        return true;
    }

    return false;
};

/**
 * @param {number} index
 * @return {boolean}
 */
robin.collections.ArrayCollection.prototype.isValidIndex_ = function(index) {
    return ((0 <= index) && (index < this.getLength()));
};

/**
 * @return {boolean}
 */
robin.collections.ArrayCollection.prototype.isEmpty = function() {
    return this.source_.length == 0;
};