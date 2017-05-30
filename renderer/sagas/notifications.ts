import { call, fork, spawn, take, takeEvery, put } from '../redux/saga';
import { Action } from '../redux/actions';
import {
  LoadUserConfigSuccess,
  LoadUserConfigSuccessParam,
  UpdateToken,
  UpdateTokenParam,
  FetchNotifs,
  FetchNotifsParam,
  FetchNotifsStart,
  FetchNotifsSuccess,
  FetchIssueSuccess,
} from '../actions';
import createGitHubClient, { GitHubClient } from '../lib/github-api';
import normalizeNotifications from '../lib/normalizers/notifications';
import { Issue, NotificationJSON, NormalizedNotifs } from '../models/types';
import { Failable } from '../models/result';

export default function* notificationsSaga() {
  type AccessTokenAction = Action<LoadUserConfigSuccessParam> | Action<UpdateTokenParam>;

  let token;
  while (!token) {
    const action: AccessTokenAction = yield take(
      [LoadUserConfigSuccess.type, UpdateToken.type],
    );
    token = action.payload.accessToken;
  }

  yield fork(runNotificationFetchers, token);
}

function* runNotificationFetchers(accessToken: string) {
  const api = createGitHubClient(accessToken);

  // Fetch notifications for first view.
  yield call(fetchUnreadNotifications, api);
  yield takeEvery(FetchNotifs.type, fetchUnreadNotifications, api);
}

function* fetchUnreadNotifications(api: GitHubClient, action?: Action<FetchNotifsParam>) {
  yield put(FetchNotifsStart());

  const [notifs, _]: Failable<NotificationJSON[]> = yield call(
    api.notifications.listUnread,
    action ? action.payload.oldestUpdatedAt : null,
  );

  if (notifs != null) {
    const normalizedNotifs: NormalizedNotifs = yield call(normalizeNotifications, notifs);
    yield put(FetchNotifsSuccess(normalizedNotifs));

    // yield spawn(fetchIssues, api, notifs);
  }
}

function* fetchIssues(api: GitHubClient, notifs: NotificationJSON[]) {
  for (const notif of notifs) {
    yield fork(fetchIssue, api, notif);
  }
}

function* fetchIssue(api: GitHubClient, notif: NotificationJSON) {
  const [issue, _]: Failable<Issue> = yield call(api.issues.getIssue, notif.subject.url);
  if (issue != null) {
    yield put(FetchIssueSuccess(issue));
  }
}
