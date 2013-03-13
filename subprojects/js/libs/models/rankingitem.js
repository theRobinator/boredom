goog.provide('robin.models.RankingListItem');

/**
 * @constructor
 */
robin.models.RankingListItem = function(id, name, rank) {
    this['id'] = id;
    this['name'] = name;
    this['rank'] = rank;
};


/**
 * @type {number}
 * @private
 */
robin.models.RankingListItem.prototype.id;

/**
 * @type {string}
 * @private
 */
robin.models.RankingListItem.prototype.name;

/**
 * @type {number}
 * @private
 */
robin.models.RankingListItem.prototype.rank;



/**
 * @return {number}
 */
robin.models.RankingListItem.prototype.getId = function() {
    return this['id'];
};

/**
 * @return {string}
 */
robin.models.RankingListItem.prototype.getName = function() {
    return this['name'];
};

/**
 * @return {number}
 */
robin.models.RankingListItem.prototype.getRank = function() {
    return this['rank'];
};


