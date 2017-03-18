const env = process.env.NODE_ENV || 'production';

module.exports = env === 'production'
  ? require('./prod')
  : require('./dev');
