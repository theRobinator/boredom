/**
 * Enums for calling the API.
 */

/**
 * @enum {string}
 */
exports.Methods = {
    GET: 'GET',
    POST: 'POST'
};


/**
 * @enum {string}
 */
exports.Endpoints = {
    LOGIN: 'login',
    LOGOUT: 'logout',
    REGISTER: 'register',
    USER_LIST: 'user/list',
    GAME_CREATE: 'games/create',
    GAME_APPROVE: 'games/approve',
    GAMES_LIST: 'games/list',
    GAMES_UNAPPROVED: "games/unapproved",
    GAMES_RECENT: 'games/recent',
    RANKING_LIST: 'ranking/list'
};

