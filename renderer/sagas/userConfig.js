import { fork, take, takeEvery, put, call } from 'redux-saga/effects';
import {
  UPDATE_TOKEN,
  LOAD_USER_CONFIG,
  loadUserConfigSuccess,
} from '../actions';
import {
  sendNewToken,
  fetchUserConfig,
} from '../lib/ipc';

export default function* userConfigSaga() {
  yield fork(loadUserConfig);
  yield takeEvery(UPDATE_TOKEN, saveAccessToken);
}

function* loadUserConfig() {
  yield take(LOAD_USER_CONFIG);
  const config = yield call(fetchUserConfig);
  yield put(loadUserConfigSuccess(config));
}

function* saveAccessToken(action) {
  yield call(sendNewToken, action.payload.token);
}
