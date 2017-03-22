const electron = require('electron');
const childProcess = require('child_process');
const webpack = require('webpack');
const mainConf = require('../webpack/webpack.main.js');
const rendConf = require('../webpack/webpack.renderer.js');

const runElectron = (mainFile, argv = []) => {
  const args = [mainFile, ...argv.slice(2)]
  return childProcess.spawn(electron, args, { stdio: 'inherit' });
};

const webpackWatch = (compiler, options, callback) => {
  return compiler.watch(options, (err, stats) => {
    if (err) {
      throw err;
    }
    console.log(stats.toString({ colors: true }));
    callback(err, stats);
  });
};

const runElectronIfWatchStarted = (isStarted, onClosed) => {
  if (isStarted()) {
    runElectron('dist/main.js', process.argv).on('close', onClosed);
  }
  else {
    setTimeout(() => runElectronIfWatchStarted(isStarted, onClosed), 10);
  }
};

/**
 * 1. Run webpack watchings of main and renderer process builds.
 * 2. Run Electron after the watching started.
 * 3. Close webpack watchings when Electron process is closed.
 */
const startWatch = () => {
  let mainWatchStarted = false;
  let rendWatchStarted = false;
  const isStarted = () => mainWatchStarted && rendWatchStarted;

  const mainWatching = webpackWatch(webpack(mainConf), {}, () => {
    mainWatchStarted = true;
  });
  const rendWatching = webpackWatch(webpack(rendConf), {}, () => {
    rendWatchStarted = true;
  });

  runElectronIfWatchStarted(isStarted, () => {
    mainWatching.close();
    rendWatching.close();
  });
};

startWatch();
