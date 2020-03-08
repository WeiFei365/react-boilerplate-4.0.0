/* eslint-disable global-require */

module.exports = (NODE_ENV, APP_ENV) =>
  require('../base')(
    {
      ROUTER: '/dt/',
    },
    NODE_ENV,
    APP_ENV,
  );
