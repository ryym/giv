import { ipcRenderer } from 'electron';
import * as ipc from '../../shared/ipc-messages';

export const sendNewToken = token => {
  ipcRenderer.send(ipc.UPDATE_TOKEN, token);
};

export const fetchUserConfig = () => new Promise((resolve) => {
  ipcRenderer.once(ipc.LOAD_USER_CONFIG_SUCCESS, (event, config) => {
    resolve(config);
  });
  ipcRenderer.send(ipc.LOAD_USER_CONFIG);
});
