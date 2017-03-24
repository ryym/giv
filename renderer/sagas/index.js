import { fork, put, takeEvery } from 'redux-saga/effects';
import userConfigSaga from './userConfig';
import {
  FETCH_NOTIFS_START,
  fetchNotifsSuccess,
} from '../actions';

function* fetchNotifications() {
  yield put(fetchNotifsSuccess([]));
}

export default function* rootSaga() {
  yield fork(userConfigSaga);
  yield takeEvery(FETCH_NOTIFS_START, fetchNotifications);
}
