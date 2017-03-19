const action = (type, payload) => ({ type, payload });

export const FETCH_NOTIFS_START = 'FETCH_NOTIFS_START';
export const fetchNotifsStart = () => action(FETCH_NOTIFS_START);

export const FETCH_NOTIFS_SUCCESS = 'FETCH_NOTIFS_SUCCESS';
export const fetchNotifsSuccess = data => action(FETCH_NOTIFS_SUCCESS, data);
