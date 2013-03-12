goog.provide('robin.api.APIEndpoints');
goog.provide('robin.api.RequestMethod');
goog.provide('robin.api.ResponseType');

/** @enum {string} */
robin.api.APIEndpoints = {
    LOGIN: 'login',
    LOGOUT: 'logout',
    REGISTER: 'register',
    USER_LIST: 'user/list',
    GAME_CREATE: 'games/create',
    GAME_APPROVE: 'games/approve',
    GAME_DENY: 'games/deny',
    GAMES_LIST: 'games/list',
    GAMES_UNAPPROVED: "games/unapproved",
    GAMES_RECENT: 'games/recent',
    RANKING_LIST: 'ranking/list'
};

/** @enum {string} */
robin.api.RequestMethod = {
    GET: 'GET',
    POST: 'POST'
};


/** @enum {string} */
robin.api.ResponseType = {
    USER: 'user',
    USER_LIST: 'user_list',
    GAME: 'game',
    GAME_LIST: 'game_list',
    RANKING_LIST: 'ranking_list'
};
