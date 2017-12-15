const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'develop2017'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/develop2017-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'develop2017'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/develop2017-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'develop2017'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/develop2017-production'
  }
};

module.exports = config[env];
