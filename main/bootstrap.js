import { app, BrowserWindow, ipcMain } from 'electron';
import loadUserConfig from './storage/user-config';
import * as ipc from '../shared/ipc-messages';

// TODO: What about security?
// https://electron.atom.io/docs/tutorial/security/
// http://utf-8.jp/public/2016/0629/electron.pdf

module.exports = function bootstrap() {
  app.on('ready', () => {
    const window = new BrowserWindow({
      x: 0,
      y: 0,
      width: 600,
      height: 1000,
    });

    window.loadURL(`file://${__dirname}/index.html`);

    if (process.env.NODE_ENV === 'development') {
      window.webContents.openDevTools();
    }
  });

  loadUserConfig().then(config => {
    ipcMain.on(ipc.UPDATE_TOKEN, (event, token) => {
      config.setAccessToken(token);
    });
  });
};
