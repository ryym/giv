const { app, BrowserWindow } = require('electron');

// TODO: What about security?
// https://electron.atom.io/docs/tutorial/security/
// http://utf-8.jp/public/2016/0629/electron.pdf

module.exports = function bootstrap() {
  app.on('ready', () => {
    const window = new BrowserWindow({
      x: 0,
      y: 0,
      width: 1000,
      height: 1000,
    });

    window.loadURL(`file://${__dirname}/index.html`);

    if (process.env.NODE_ENV === 'development') {
      window.webContents.openDevTools();
    }
  });
};
