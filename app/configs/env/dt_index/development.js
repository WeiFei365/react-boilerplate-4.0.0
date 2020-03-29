/* eslint-disable global-require */

module.exports = (NODE_ENV, APP_ENV) =>
  require('../base')(
    {
      PUBLIC_PATH: '/dt/',
    },
    NODE_ENV,
    APP_ENV,
  );
