goog.provide('robin.api.UserParser');

goog.require('robin.api.ResponseType');
goog.require('robin.models.UserBuilder');


/**
 * Parse a single user from an API response.
 * @param {robin.api.Reader} reader The reader for the API response.
 * @param {robin.api.APIResponse=} response An optional APIResponse object that will be populated with the results.
 * @return {!robin.models.User} The user that was parsed.
 */
robin.api.UserParser.parseUserFromJson = function(reader, response) {
    reader.push('user');

    /** @type {!robin.models.User} */
    var user = robin.api.UserParser.parseUserDirect(reader);

    if (response) {
        response.setResult(robin.api.ResponseType.USER, user);
    }
    return user;
};


/**
 * Parse a list of users from an API response.
 * @param {robin.api.Reader} reader The reader for the API response.
 * @param {robin.api.APIResponse=} response An optional APIResponse object that will be populated with the results.
 * @return {!Array.<!robin.models.User>} The list of parsed users.
 */
robin.api.UserParser.parseListFromJson = function(reader, response) {
    /** @type {!Array.<!robin.models.User>} */
    var list = [];

    reader.forEachInArray('user_list', function(r) {
        list.push(robin.api.UserParser.parseUserDirect(r));
    });

    if (response) {
        response.setResult(robin.api.ResponseType.USER_LIST, list);
    }
    return list;
};


/**
 * Parse a single user directly from the current reader.
 * @param {robin.api.Reader} reader
 * @return {!robin.models.User}
 */
robin.api.UserParser.parseUserDirect = function(reader) {
    /** @type {!robin.models.UserBuilder} */
    var builder = new robin.models.UserBuilder()
        .setId(reader.number('id'))
        .setName(reader.string('name'))
        .setWins(reader.number('wins'))
        .setLosses(reader.number('losses'))
        .setGamesPlayed(reader.number('games_played'));

    return builder.build();
};
