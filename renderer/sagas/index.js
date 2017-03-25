import { fork } from 'redux-saga/effects';
import userConfigSaga from './userConfig';
import notificationsSaga from './notifications';

export default function* rootSaga() {
  yield fork(userConfigSaga);
  yield fork(notificationsSaga);
}
