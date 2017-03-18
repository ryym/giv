const { app, BrowserWindow } = require('electron');

module.exports = function bootstrap() {
  app.on('ready', () => {
    const window = new BrowserWindow({
      x: 0,
      y: 0,
      width: 1000,
      height: 1000,
    });

    window.loadURL(`file://${__dirname}/../index.html`);
  });
};
