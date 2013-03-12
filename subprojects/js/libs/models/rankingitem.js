goog.provide('robin.models.RankingListItem');

/**
 * @constructor
 */
robin.models.RankingListItem = function(id, name, rank) {
    this.id_ = id;
    this.name_ = name;
    this.rank_ = rank;
};


/**
 * @type {number}
 * @private
 */
robin.models.RankingListItem.prototype.id_;

/**
 * @type {string}
 * @private
 */
robin.models.RankingListItem.prototype.name_;

/**
 * @type {number}
 * @private
 */
robin.models.RankingListItem.prototype.rank_;




/**
 * @return {number}
 */
robin.models.RankingListItem.prototype.getId = function() {
    return this.id_;
};

/**
 * @return {string}
 */
robin.models.RankingListItem.prototype.getName = function() {
    return this.name_;
};

/**
 * @return {number}
 */
robin.models.RankingListItem.prototype.getRank = function() {
    return this.rank_;
};


