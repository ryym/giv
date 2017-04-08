import { fork, take, takeEvery, call, put } from 'redux-saga/effects';
import {
  LOAD_USER_CONFIG_SUCCESS,
  UPDATE_TOKEN,
  FETCH_UNREAD_NOTIFS,
  fetchNotifsStart,
  fetchNotifsSuccess,
  fetchIssueSuccess,
} from '../actions';
import createGitHubClient from '../lib/github-api';
import normalizeNotifications from '../lib/normalizers/notifications';

export default function* notificationsSaga() {
  let token;
  while (!token) {
    const action = yield take([LOAD_USER_CONFIG_SUCCESS, UPDATE_TOKEN]);
    token = action.payload.accessToken;
  }

  yield fork(runNotificationFetchers, token);
}

function* runNotificationFetchers(accessToken) {
  const api = createGitHubClient(accessToken);

  // Fetch notifications for first view.
  yield call(fetchUnreadNotifications, api);
  yield takeEvery(FETCH_UNREAD_NOTIFS, fetchUnreadNotifications, api);
}

function* fetchUnreadNotifications(api) {
  yield put(fetchNotifsStart());

  const { notifications: notifs } = yield call(api.notifications.listUnread);
  const normalizedNotifs = yield call(normalizeNotifications, notifs);
  yield put(fetchNotifsSuccess(normalizedNotifs));

  yield fork(fetchIssues, api, notifs);
}

function* fetchIssues(api, notifs) {
  for (const notif of notifs) {
    yield fork(fetchIssue, api, notif);
  }
}

function* fetchIssue(api, notif) {
  const { issue } = yield call(api.issues.getIssue, notif.subject.url);
  yield put(fetchIssueSuccess(issue));
}
