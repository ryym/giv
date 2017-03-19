import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import {
  FETCH_NOTIFS_START,
  fetchNotifsSuccess,
} from '../actions';

function* fetchNotifications() {
  yield put(fetchNotifsSuccess([]));
}

export default function* rootSaga() {
  yield takeEvery(FETCH_NOTIFS_START, fetchNotifications);
}
