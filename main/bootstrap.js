import { app, BrowserWindow, ipcMain, session } from 'electron';
import loadUserConfig from './storage/user-config';
import handleIPCEvents from './ipc';

// TODO: What about security?
// https://electron.atom.io/docs/tutorial/security/
// http://utf-8.jp/public/2016/0629/electron.pdf

export default function bootstrap(options) {
  app.on('ready', async () => {
    // Disable cache to fetch latest data correctly from GitHub.
    const noCacheSession = session.fromPartition('', { cache: false });
    const clearSession = makeSessionClearer(noCacheSession);
    const config = await loadUserConfig();

    const initSettings = () => Promise.all([
      config.clear(),
      clearSession(),
    ]);

    if (options.initConfig) {
      await initSettings();
    }

    handleIPCEvents(ipcMain, {
      initSettings,
      config,
    });

    setupMainWindow({
      session: noCacheSession,
      isDev: process.env.NODE_ENV === 'development',
    });
  });
}

const makeSessionClearer = (session) => () => new Promise(resolve => {
  session.clearStorageData({
    origin: 'https://github.com',
    storages: ['cookies'],
  }, resolve);
});

const setupMainWindow = ({ session, isDev }) => {
  const window = new BrowserWindow({
    x: 0,
    y: 0,
    webPreferences: { session },
  });
  window.loadURL(`file://${__dirname}/index.html`);

  if (isDev) {
    window.webContents.openDevTools();
  }
  return window;
};
