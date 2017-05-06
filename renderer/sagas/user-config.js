import { fork, take, takeEvery, put, call } from 'redux-saga/effects';
import {
  UpdateToken,
  LoadUserConfig,
  LoadUserConfigSuccess,
} from '../actions';
import {
  sendNewToken,
  fetchUserConfig,
} from '../lib/ipc';

export default function* userConfigSaga() {
  yield fork(loadUserConfig);
  yield takeEvery(UpdateToken.type, saveAccessToken);
}

function* loadUserConfig() {
  yield take(LoadUserConfig.type);
  const config = yield call(fetchUserConfig);
  yield put(LoadUserConfigSuccess(config));
}

function* saveAccessToken(action) {
  yield call(sendNewToken, action.payload.accessToken);
}
