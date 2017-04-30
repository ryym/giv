import { fork } from 'redux-saga/effects';
import userConfigSaga from './user-config';
import notificationsSaga from './notifications';

export default function* rootSaga() {
  yield fork(userConfigSaga);
  yield fork(notificationsSaga);
}
