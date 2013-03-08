goog.provide('robin.api.SingleUserParser');

goog.require('robin.api.ResponseType');
goog.require('robin.models.UserBuilder');

robin.api.SingleUserParser.parseResponseFromJson = function(reader, response) {
    reader.push('user');

    /** @type {!robin.models.UserBuilder} */
    var builder = new robin.models.UserBuilder()
        .setId(reader.number('id'))
        .setName(reader.string('name'))
        .setWins(reader.number('wins'))
        .setLosses(reader.number('losses'))
        .setGamesPlayed(reader.number('games_played'));

    response.setResult(robin.api.ResponseType.USER, builder.build());
};
