/* eslint-disable global-require */

module.exports = (NODE_ENV, APP_ENV) =>
  require('../base')(
    {
      ROUTER: '/rp/',
    },
    NODE_ENV,
    APP_ENV,
  );
