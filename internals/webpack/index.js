/* eslint-disable no-console */

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}
if (!process.env.APP_ENV) {
  process.env.APP_ENV = '';
}
if (!process.env.APP_KEY) {
  process.env.APP_KEY = 'rp_index';
}

const { APP_KEY, NODE_ENV } = process.env;

const configs = require(`./${APP_KEY}/${NODE_ENV}.js`);

module.exports = require('./base')(configs);
