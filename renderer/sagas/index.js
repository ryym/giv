import { takeEvery } from 'redux-saga/effects';
import { put, call } from 'redux-saga/effects';
import { ipcRenderer } from 'electron';
import * as ipc from '../../shared/ipc-messages';
import {
  UPDATE_TOKEN,
  FETCH_NOTIFS_START,
  fetchNotifsSuccess,
} from '../actions';

const sendNewToken = token => {
  ipcRenderer.send(ipc.UPDATE_TOKEN, token);
};

function* saveAccessToken(action) {
  yield call(sendNewToken, action.payload.token);
}

function* fetchNotifications() {
  yield put(fetchNotifsSuccess([]));
}

export default function* rootSaga() {
  yield takeEvery(FETCH_NOTIFS_START, fetchNotifications);
  yield takeEvery(UPDATE_TOKEN, saveAccessToken);
}
