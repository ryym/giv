import { ipcRenderer } from 'electron';
import * as ipc from '../../shared/ipc-messages';
import { UserConfig } from '../models/types';

export const sendNewToken = (token: string) => {
  ipcRenderer.send(ipc.UPDATE_TOKEN, token);
};

export const fetchUserConfig = (): Promise<UserConfig> => new Promise((resolve) => {
  ipcRenderer.once(
    ipc.LOAD_USER_CONFIG_SUCCESS,
    (event: Electron.IpcRendererEvent, config: UserConfig) => {
      resolve(config);
    },
  );
  ipcRenderer.send(ipc.LOAD_USER_CONFIG);
});
