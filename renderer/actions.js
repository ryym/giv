import { push as pushHistory } from 'react-router-redux';

// react-router-redux
export const push = pushHistory;

const action = (type, payload) => ({ type, payload });

export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const updateToken = accessToken => action(UPDATE_TOKEN, { accessToken });

export const LOAD_USER_CONFIG = 'LOAD_USER_CONFIG';
export const loadUserConfig = () => action(LOAD_USER_CONFIG);

export const LOAD_USER_CONFIG_SUCCESS = 'LOAD_USER_CONFIG_SUCCESS';
export const loadUserConfigSuccess = config => action(LOAD_USER_CONFIG_SUCCESS, config);

export const FETCH_UNREAD_NOTIFS = 'FETCH_UNREAD_NOTIFS';
export const fetchNotifs = () => action(FETCH_UNREAD_NOTIFS);

export const FETCH_UNREAD_NOTIFS_START = 'FETCH_UNREAD_NOTIFS_START';
export const fetchNotifsStart = () => action(FETCH_UNREAD_NOTIFS_START);

export const FETCH_UNREAD_NOTIFS_SUCCESS = 'FETCH_UNREAD_NOTIFS_SUCCESS';
export const fetchNotifsSuccess = data => action(FETCH_UNREAD_NOTIFS_SUCCESS, data);
