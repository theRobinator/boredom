goog.provide('robin.models.User');
goog.provide('robin.models.UserBuilder');

goog.require('robin.interfaces.ITemplatable');


/**
 * @constructor
 * @implements {robin.interfaces.ITemplatable}
 * @param {robin.models.UserBuilder} builder
 */
robin.models.User = function(builder) {
    this.id_ = builder.id;
    this.name_ = builder.name;
    this.wins_ = builder.wins;
    this.losses_ = builder.losses;
    this.gamesPlayed_ = builder.gamesPlayed;

    this.templateArray_ = {
        'id': this.id_,
        'name': this.name_,
        'wins': this.wins_,
        'losses': this.losses_,
        'gamesPlayed': this.gamesPlayed_
    };
};


/**
 * @type {number}
 * @private
 */
robin.models.User.prototype.gamesPlayed_;

/**
 * @type {number}
 * @private
 */
robin.models.User.prototype.id_;

/**
 * @type {number}
 * @private
 */
robin.models.User.prototype.losses_;

/**
 * @type {string}
 * @private
 */
robin.models.User.prototype.name_;

/**
 * @type {number}
 */
robin.models.User.prototype.wins_;

/**
 * @type {!Object}
 */
robin.models.User.prototype.templateArray_;


/**
 * @param {robin.models.User} otherUser
 */
robin.models.User.prototype.equals = function(otherUser) {
    return !!otherUser &&
        this.id_ == otherUser.getId() &&
        this.name_ == otherUser.getName() &&
        this.wins_ == otherUser.getWins() &&
        this.losses_ == otherUser.getLosses() &&
        this.gamesPlayed_ == otherUser.getGamesPlayed();
};

/**
 * @return {number}
 */
robin.models.User.prototype.getGamesPlayed = function() {
    return this.gamesPlayed_;
};

/**
 * @return {number}
 */
robin.models.User.prototype.getId = function() {
    return this.id_;
};

/**
 * @return {number}
 */
robin.models.User.prototype.getLosses = function() {
    return this.losses_;
};

/**
 * @return {string}
 */
robin.models.User.prototype.getName = function() {
    return this.name_;
};

/**
 * @return {number}
 */
robin.models.User.prototype.getWins = function() {
    return this.wins_;
};

/** @inheritDoc */
robin.models.User.prototype.toTemplateArray = function() {
    return this.templateArray_;
};


/**
 * @constructor
 */
robin.models.UserBuilder = function() {
};


/**
 * @type {number}
 */
robin.models.UserBuilder.prototype.gamesPlayed;

/**
 * @type {number}
 */
robin.models.UserBuilder.prototype.id;

/**
 * @type {number}
 */
robin.models.UserBuilder.prototype.losses;

/**
 * @type {string}
 */
robin.models.UserBuilder.prototype.name;

/**
 * @type {number}
 */
robin.models.UserBuilder.prototype.wins;


/**
 * @return {!robin.models.User}
 */
robin.models.UserBuilder.prototype.build = function() {
    return new robin.models.User(this);
};

/**
 * @param {robin.models.User} instance
 * @return {robin.models.UserBuilder}
 */
robin.models.UserBuilder.fromInstance = function(instance) {
    return new robin.models.UserBuilder()
        .setId(instance.getId())
        .setLosses(instance.getLosses())
        .setWins(instance.getWins())
        .setGamesPlayed(instance.getGamesPlayed())
        .setName(instance.getName());
};

/**
 * @param {number} gamesPlayed
 * @return {!robin.models.UserBuilder}
 */
robin.models.UserBuilder.prototype.setGamesPlayed = function(gamesPlayed) {
    this.gamesPlayed = gamesPlayed;
    return this;
};

/**
 * @param {number} id
 * @return {!robin.models.UserBuilder}
 */
robin.models.UserBuilder.prototype.setId = function(id) {
    this.id = id;
    return this;
};

/**
 * @param {number} losses
 * @return {!robin.models.UserBuilder}
 */
robin.models.UserBuilder.prototype.setLosses = function(losses) {
    this.losses = losses;
    return this;
};

/**
 * @param {string} name
 * @return {!robin.models.UserBuilder}
 */
robin.models.UserBuilder.prototype.setName = function(name) {
    this.name = name;
    return this;
};

/**
 * @param {number} wins
 * @return {!robin.models.UserBuilder}
 */
robin.models.UserBuilder.prototype.setWins = function(wins) {
    this.wins = wins;
    return this;
};
