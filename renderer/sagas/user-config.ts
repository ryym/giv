import { call, fork, spawn, take, takeEvery, put } from '../redux/saga'
import { Action } from '../redux/actions'
import { UserConfig } from '../models/types'
import {
  UpdateToken,
  UpdateTokenParam,
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
  const config = <UserConfig>(yield call(fetchUserConfig));
  yield put(LoadUserConfigSuccess(config));
}

function* saveAccessToken(action: Action<UpdateTokenParam>) {
  yield call(sendNewToken, action.payload.accessToken);
}
