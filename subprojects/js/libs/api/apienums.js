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
    GAMES_LIST: 'games/list',
    GAMES_UNAPPROVED: "games/unapproved",
    GAMES_RECENT: 'games/recent'
};

/** @enum {string} */
robin.api.RequestMethod = {
    GET: 'GET',
    POST: 'POST'
};


/** @enum {string} */
robin.api.ResponseType = {
    USER: 'user'
};
