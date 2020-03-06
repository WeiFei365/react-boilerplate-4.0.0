if (!process.env.APP_KEY) {
  process.env.APP_KEY = 'rp_index';
}

const prodConf = require('./index');

module.exports = prodConf;
