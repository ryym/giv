import { fork, spawn, take, takeEvery, call, put } from 'redux-saga/effects';
import {
  LoadUserConfigSuccess,
  UpdateToken,
  FetchNotifs,
  FetchNotifsStart,
  FetchNotifsSuccess,
  FetchIssueSuccess,
} from '../actions';
import createGitHubClient from '../lib/github-api';
import normalizeNotifications from '../lib/normalizers/notifications';

export default function* notificationsSaga() {
  let token;
  while (!token) {
    const action = yield take([LoadUserConfigSuccess.type, UpdateToken.type]);
    token = action.payload.accessToken;
  }

  yield fork(runNotificationFetchers, token);
}

function* runNotificationFetchers(accessToken) {
  const api = createGitHubClient(accessToken);

  // Fetch notifications for first view.
  yield call(fetchUnreadNotifications, api);
  yield takeEvery(FetchNotifs.type, fetchUnreadNotifications, api);
}

function* fetchUnreadNotifications(api, action) {
  yield put(FetchNotifsStart());

  const oldestUpdatedAt = action ? action.payload.oldestUpdatedAt : null;
  const { notifications: notifs } = yield call(api.notifications.listUnread, oldestUpdatedAt);
  const normalizedNotifs = yield call(normalizeNotifications, notifs);
  yield put(FetchNotifsSuccess(normalizedNotifs));

  yield spawn(fetchIssues, api, notifs);
}

function* fetchIssues(api, notifs) {
  for (const notif of notifs) {
    yield fork(fetchIssue, api, notif);
  }
}

function* fetchIssue(api, notif) {
  const { issue } = yield call(api.issues.getIssue, notif.subject.url);
  yield put(FetchIssueSuccess(issue));
}
