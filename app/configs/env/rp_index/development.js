/* eslint-disable global-require */

module.exports = (NODE_ENV, APP_ENV) =>
  require('../base')(
    {
      PUBLIC_PATH: '/rp/',
    },
    NODE_ENV,
    APP_ENV,
  );
