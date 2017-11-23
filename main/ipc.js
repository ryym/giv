import { shell } from 'electron';
import * as ipc from '../shared/ipc-messages';

export default async function handleIPCEvents(ipcMain, {
  app,
  initSettings,
  config,
}) {
  ipcMain.on(ipc.UPDATE_TOKEN, (event, token) => {
    config.setAccessToken(token);
  });

  ipcMain.on(ipc.LOAD_USER_CONFIG, async (event) => {
    const json = await config.toJSON();
    event.sender.send(ipc.LOAD_USER_CONFIG_OK, json);
  });

  ipcMain.on(ipc.LOG_OUT, async (event) => {
    await initSettings();
    event.sender.send(ipc.LOG_OUT_OK);
  });

  ipcMain.on(ipc.OPEN_URL_EXTERNAL, (event, url) => {
    shell.openExternal(url);
  });

  ipcMain.on(ipc.UPDATE_APP_ICON_STATE, (event, { count }) => {
    count = Number(count);
    if (!app.dock || !count) {
      return;
    }
    const badge = count < 1000 ? String(count) : '999+';
    app.dock.setBadge(badge);
  });
}
