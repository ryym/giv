import { ipcRenderer } from 'electron';
import * as ipc from '../../shared/ipc-messages';
import { UserConfig } from '../lib/models';

export const sendNewToken = (token: string) => {
  ipcRenderer.send(ipc.UPDATE_TOKEN, token);
};

export const fetchUserConfig = (): Promise<UserConfig> => new Promise((resolve) => {
  ipcRenderer.once(
    ipc.LOAD_USER_CONFIG_SUCCESS,
    (event: string, config: UserConfig) => {
      resolve(config);
    },
  );
  ipcRenderer.send(ipc.LOAD_USER_CONFIG);
});

export const openExternal = (url: string) => {
  ipcRenderer.send(ipc.OPEN_URL_EXTERNAL, url);
};
