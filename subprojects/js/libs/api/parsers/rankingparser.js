goog.provide('robin.api.RankingParser');

goog.require('robin.api.ResponseType');
goog.require('robin.models.RankingListItem');

/**
 * Parse a list of users from an API response.
 * @param {robin.api.Reader} reader The reader for the API response.
 * @param {robin.api.APIResponse=} response An optional APIResponse object that will be populated with the results.
 * @return {!Array.<!robin.models.User>} The list of parsed users.
 */
robin.api.RankingParser.parseRankingListFromJson = function(reader, response) {
    /** @type {!Array.<!robin.models.RankingListItem>} */
    var list = [];

    reader.forEachInArray('ranking_list', function(r) {
        list.push(new robin.models.RankingListItem(r.number('id'), r.string('name'), r.number('simple-rank')));
    });

    if (response) {
        response.setResult(robin.api.ResponseType.RANKING_LIST, list);
    }
    return list;
};
