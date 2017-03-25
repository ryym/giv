const path = require('path');
const pkgJson = require('../package.json');

const rootPath = path.join(__dirname, '..');

module.exports = {
  env: process.env.NODE_ENV || 'development',
  rootPath,
  nodeModulesPath: path.join(rootPath, 'node_modules'),
  rendererPath: path.join(rootPath, 'renderer'),
  distPath: path.join(rootPath, 'dist'),
  externalModules: Object.keys(pkgJson),
};
