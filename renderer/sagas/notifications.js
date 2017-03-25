import { fork, take, takeEvery, call, put } from 'redux-saga/effects';
import {
  LOAD_USER_CONFIG_SUCCESS,
  UPDATE_TOKEN,
  FETCH_UNREAD_NOTIFS,
  fetchNotifsStart,
  fetchNotifsSuccess,
} from '../actions';
import createGitHubClient from '../lib/github-api';
import normalizeNotifications from '../lib/normalizers/notifications';

export default function* notificationsSaga() {
  let token;
  while (!token) {
    const action = yield take([LOAD_USER_CONFIG_SUCCESS, UPDATE_TOKEN]);
    token = action.payload.accessToken;
  }

  yield fork(runNotificationFetchers(token));
}

const runNotificationFetchers = accessToken => function*() {
  const api = createGitHubClient(accessToken);

  // Fetch notifications for first view.
  yield call(fetchUnreadNotifications(api));
  yield takeEvery(FETCH_UNREAD_NOTIFS, fetchUnreadNotifications(api));
};

const fetchUnreadNotifications = api => function*() {
  yield put(fetchNotifsStart());

  const { notifications: notifs } = yield call(api.notifications.listUnread);
  const normalizedNotifs = yield call(normalizeNotifications, notifs);

  yield put(fetchNotifsSuccess(normalizedNotifs));
};
