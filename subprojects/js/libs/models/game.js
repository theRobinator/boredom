goog.provide('robin.models.GameBuilder');
goog.provide('robin.models.Game');

/**
 * @constructor
 * @param {robin.models.GameBuilder} builder
 */
robin.models.Game = function(builder) {
    this.id_ = builder.id;
    this.player1_ = builder.player1;
    this.player2_ = builder.player2;
    this.player1Score = builder.player1Score;
    this.player2Score = builder.player2Score;
    this.validated_ = builder.validated;
    this.date_ = builder.date;
};


/**
 * @type {goog.date.DateTime}
 * @private
 */
robin.models.Game.prototype.date_;

/**
 * @type {number}
 * @private
 */
robin.models.Game.prototype.id_;

/**
 * @type {number}
 */
robin.models.Game.prototype.player1Score;

/**
 * @type {!robin.models.User}
 * @private
 */
robin.models.Game.prototype.player1_;

/**
 * @type {number}
 */
robin.models.Game.prototype.player2Score;

/**
 * @type {!robin.models.User}
 * @private
 */
robin.models.Game.prototype.player2_;

/**
 * @type {boolean}
 * @private
 */
robin.models.Game.prototype.validated_;


/**
 * @param {robin.models.Game} otherGame
 */
robin.models.Game.prototype.equals = function(otherGame) {
    return !!otherGame &&
        this.id_ == otherGame.getId() &&
        this.player1_.getId() == otherGame.getPlayer1().getId() &&
        this.player2_.getId() == otherGame.getPlayer2().getId() &&
        this.player1Score == otherGame.getPlayer1Score() &&
        this.player2Score == otherGame.getPlayer2Score() &&
        this.validated_ == otherGame.getValidated() &&
        this.date_ == otherGame.getDate();
};

/**
 * @return {goog.date.DateTime}
 */
robin.models.Game.prototype.getDate = function() {
    return this.date_;
};

/**
 * @return {number}
 */
robin.models.Game.prototype.getId = function() {
    return this.id_;
};

/**
 * @return {!robin.models.User}
 */
robin.models.Game.prototype.getPlayer1 = function() {
    return this.player1_;
};

/**
 * @return {number}
 */
robin.models.Game.prototype.getPlayer1Score = function() {
    return this.player1Score;
};

/**
 * @return {!robin.models.User}
 */
robin.models.Game.prototype.getPlayer2 = function() {
    return this.player2_;
};

/**
 * @return {number}
 */
robin.models.Game.prototype.getPlayer2Score = function() {
    return this.player2Score;
};

/**
 * @return {boolean}
 */
robin.models.Game.prototype.getValidated = function() {
    return this.validated_;
};

/**
 * @return {robin.models.User}
 */
robin.models.Game.prototype.getWinner = function() {
    if (this.player1Score > this.player2Score) {
        return this.player1_;
    } else if (this.player2Score > this.player1Score) {
        return this.player2_;
    } else {
        return null;
    }
};

/**
 * @return {robin.models.User}
 */
robin.models.Game.prototype.getLoser = function() {
    if (this.player1Score > this.player2Score) {
        return this.player2_;
    } else if (this.player2Score > this.player1Score) {
        return this.player1_;
    } else {
        return null;
    }
};

/**
 * @param {robin.models.Game} otherGame
 */
robin.models.Game.prototype.update = function(otherGame) {
    if (!this.equals(otherGame)) {
        this.id_ = otherGame.getId();
        this.player1_ = otherGame.getPlayer1();
        this.player2_ = otherGame.getPlayer2();
        this.player1Score = otherGame.getPlayer1Score();
        this.player2Score = otherGame.getPlayer2Score();
        this.validated_ = otherGame.getValidated();
        this.date_ = otherGame.getDate();
    }
};


/**
 * @constructor
 */
robin.models.GameBuilder = function() {
};


/**
 * @type {goog.date.DateTime}
 */
robin.models.GameBuilder.prototype.date;

/**
 * @type {number}
 */
robin.models.GameBuilder.prototype.id;

/**
 * @type {!robin.models.User}
 */
robin.models.GameBuilder.prototype.player1;

/**
 * @type {number}
 */
robin.models.GameBuilder.prototype.player1Score;

/**
 * @type {!robin.models.User}
 */
robin.models.GameBuilder.prototype.player2;

/**
 * @type {number}
 */
robin.models.GameBuilder.prototype.player2Score;

/**
 * @type {boolean}
 */
robin.models.GameBuilder.prototype.validated;


/**
 * @return {!robin.models.Game}
 */
robin.models.GameBuilder.prototype.build = function() {
    return new robin.models.Game(this);
};

/**
 * @param {robin.models.Game} instance
 * @return {robin.models.GameBuilder}
 */
robin.models.GameBuilder.fromInstance = function(instance) {
    return new robin.models.GameBuilder()
        .setId(instance.getId())
        .setValidated(instance.getValidated())
        .setPlayer1(instance.getPlayer1())
        .setDate(instance.getDate())
        .setPlayer2(instance.getPlayer2())
        .setPlayer2Score(instance.getPlayer2Score())
        .setPlayer1Score(instance.getPlayer1Score());
};

/**
 * @param {goog.date.DateTime} date
 * @return {!robin.models.GameBuilder}
 */
robin.models.GameBuilder.prototype.setDate = function(date) {
    this.date = date;
    return this;
};

/**
 * @param {number} id
 * @return {!robin.models.GameBuilder}
 */
robin.models.GameBuilder.prototype.setId = function(id) {
    this.id = id;
    return this;
};

/**
 * @param {!robin.models.User} player1
 * @return {!robin.models.GameBuilder}
 */
robin.models.GameBuilder.prototype.setPlayer1 = function(player1) {
    this.player1 = player1;
    return this;
};

/**
 * @param {number} player1Score
 * @return {!robin.models.GameBuilder}
 */
robin.models.GameBuilder.prototype.setPlayer1Score = function(player1Score) {
    this.player1Score = player1Score;
    return this;
};

/**
 * @param {!robin.models.User} player2
 * @return {!robin.models.GameBuilder}
 */
robin.models.GameBuilder.prototype.setPlayer2 = function(player2) {
    this.player2 = player2;
    return this;
};

/**
 * @param {number} player2Score
 * @return {!robin.models.GameBuilder}
 */
robin.models.GameBuilder.prototype.setPlayer2Score = function(player2Score) {
    this.player2Score = player2Score;
    return this;
};

/**
 * @param {boolean} validated
 * @return {!robin.models.GameBuilder}
 */
robin.models.GameBuilder.prototype.setValidated = function(validated) {
    this.validated = validated;
    return this;
};
