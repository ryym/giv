import {
  fork, take, takeEvery,
  put, call,
} from 'redux-saga/effects';
import { ipcRenderer } from 'electron';
import * as ipc from '../../shared/ipc-messages';
import {
  UPDATE_TOKEN,
  FETCH_NOTIFS_START,
  fetchNotifsSuccess,
  LOAD_USER_CONFIG,
  loadUserConfigSuccess,
} from '../actions';

const sendNewToken = token => {
  ipcRenderer.send(ipc.UPDATE_TOKEN, token);
};

const fetchUserConfig = () => new Promise((resolve) => {
  ipcRenderer.once(ipc.LOAD_USER_CONFIG_SUCCESS, (event, config) => {
    resolve(config);
  });
  ipcRenderer.send(ipc.LOAD_USER_CONFIG);
});

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
