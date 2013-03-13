goog.provide('robin.models.User');
goog.provide('robin.models.UserBuilder');


/**
 * @constructor
 * @param {robin.models.UserBuilder} builder
 */
robin.models.User = function(builder) {
    this['id'] = builder.id;
    this['name'] = builder.name;
    this['wins'] = builder.wins;
    this['losses'] = builder.losses;
    this['gamesPlayed'] = builder.gamesPlayed;
};


/**
 * @param {robin.models.User} otherUser
 */
robin.models.User.prototype.equals = function(otherUser) {
    return !!otherUser &&
        this.getId() == otherUser.getId() &&
        this.getName() == otherUser.getName() &&
        this.getWins() == otherUser.getWins() &&
        this.getLosses() == otherUser.getLosses() &&
        this.getGamesPlayed() == otherUser.getGamesPlayed();
};

/**
 * @return {number}
 */
robin.models.User.prototype.getGamesPlayed = function() {
    return this['gamesPlayed'];
};

/**
 * @return {number}
 */
robin.models.User.prototype.getId = function() {
    return this['id'];
};

/**
 * @return {number}
 */
robin.models.User.prototype.getLosses = function() {
    return this['losses'];
};

/**
 * @return {string}
 */
robin.models.User.prototype.getName = function() {
    return this['name'];
};

/**
 * @return {number}
 */
robin.models.User.prototype.getWins = function() {
    return this['wins'];
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
