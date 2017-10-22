import { app, BrowserWindow, ipcMain, session } from 'electron';
import loadUserConfig from './storage/user-config';
import * as ipc from '../shared/ipc-messages';

// TODO: What about security?
// https://electron.atom.io/docs/tutorial/security/
// http://utf-8.jp/public/2016/0629/electron.pdf

async function handleUserConfigRequests(ipcMain, shouldInit) {
  const config = await loadUserConfig();

  if (shouldInit) {
    await config.clear();
  }

  ipcMain.on(ipc.UPDATE_TOKEN, (event, token) => {
    config.setAccessToken(token);
  });

  ipcMain.on(ipc.LOAD_USER_CONFIG, async (event) => {
    const json = await config.toJSON();
    event.sender.send(ipc.LOAD_USER_CONFIG_SUCCESS, json);
  });
}

module.exports = function bootstrap(options) {
  app.on('ready', () => {
    // Disable cache to fetch latest data correctly from GitHub.
    const noCacheSession = session.fromPartition('', { cache: false });

    const window = new BrowserWindow({
      x: 0,
      y: 0,
      width: 600,
      height: 1000,
      webPreferences: {
        session: noCacheSession,
      },
    });

    window.loadURL(`file://${__dirname}/index.html`);

    if (process.env.NODE_ENV === 'development') {
      window.webContents.openDevTools();
    }
  });

  handleUserConfigRequests(ipcMain, options.initConfig);
};
