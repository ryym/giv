const path = require('path');
const pkgJson = require('../package.json');

const rootPath = path.join(__dirname, '..');

module.exports = {
  env: process.env.NODE_ENV || 'development',
  rootPath,
  distPath: path.join(rootPath, 'dist'),
  externalModules: Object.keys(pkgJson),
};
