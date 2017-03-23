import {
  fork, take, takeEvery,
  put, call,
} from 'redux-saga/effects';
import {
  UPDATE_TOKEN,
  FETCH_NOTIFS_START,
  fetchNotifsSuccess,
  LOAD_USER_CONFIG,
  loadUserConfigSuccess,
} from '../actions';
import {
  sendNewToken,
  fetchUserConfig,
} from '../lib/ipc';

function* loadUserConfig() {
  yield take(LOAD_USER_CONFIG);
  const config = yield call(fetchUserConfig);
  yield put(loadUserConfigSuccess(config));
}

function* saveAccessToken(action) {
  yield call(sendNewToken, action.payload.token);
}

function* fetchNotifications() {
  yield put(fetchNotifsSuccess([]));
}

export default function* rootSaga() {
  yield fork(loadUserConfig);
  yield takeEvery(FETCH_NOTIFS_START, fetchNotifications);
  yield takeEvery(UPDATE_TOKEN, saveAccessToken);
}
