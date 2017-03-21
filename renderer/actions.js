const action = (type, payload) => ({ type, payload });

export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const updateToken = token => action(UPDATE_TOKEN, { token });

export const LOAD_USER_CONFIG = 'LOAD_USER_CONFIG';
export const loadUserConfig = () => action(LOAD_USER_CONFIG);

export const LOAD_USER_CONFIG_SUCCESS = 'LOAD_USER_CONFIG_SUCCESS';
export const loadUserConfigSuccess = config => action(LOAD_USER_CONFIG_SUCCESS, config);

export const FETCH_NOTIFS_START = 'FETCH_NOTIFS_START';
export const fetchNotifsStart = () => action(FETCH_NOTIFS_START);

export const FETCH_NOTIFS_SUCCESS = 'FETCH_NOTIFS_SUCCESS';
export const fetchNotifsSuccess = data => action(FETCH_NOTIFS_SUCCESS, data);
