goog.provide('robin.api.GameParser');

goog.require('robin.api.ResponseType');
goog.require('robin.api.UserParser');
goog.require('robin.models.GameBuilder');


/**
 * Parse a single game from an API response.
 * @param {robin.api.Reader} reader The reader for the API response.
 * @param {robin.api.APIResponse=} response An optional APIResponse object that will be populated with the results.
 * @return {Array.<!robin.models.Game>} The games that were parsed.
 */
robin.api.GameParser.parseListFromJson = function(reader, response) {
    /** @type {Array.<!robin.models.Game>} */
    var gameList = [];
    reader.forEachInArray('games_list', function(r) {
        gameList.push(robin.api.GameParser.parseGameInternal_(r));
    });

    if (response) {
        response.setResult(robin.api.ResponseType.GAME_LIST, gameList);
    }
    return gameList;
};


/**
 * Parse a single game from a reader.
 * @param {robin.api.Reader} reader
 * @return {!robin.models.Game}
 */
robin.api.GameParser.parseGameInternal_ = function(reader) {
    /** @type {!robin.models.GameBuilder} */
    var builder = new robin.models.GameBuilder()
        .setId(reader.number('id'))
        .setDate(reader.datetime('date'))
        .setPlayer1Score(reader.number('player1score'))
        .setPlayer2Score(reader.number('player2score'))
        .setValidated(reader.bool('validated'));

    reader.push('player1');
    builder.setPlayer1(robin.api.UserParser.parseUserDirect(reader));
    reader.pop();

    reader.push('player2');
    builder.setPlayer2(robin.api.UserParser.parseUserDirect(reader));
    reader.pop();

    return builder.build();
};
