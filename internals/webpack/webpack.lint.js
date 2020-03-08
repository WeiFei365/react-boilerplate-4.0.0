if (!process.env.APP_KEY) {
  process.env.APP_KEY = 'rp_index';
}

// 这里，其实只是使用了 webpack 配置中的 resolve 配置
// https://www.npmjs.com/package/eslint-import-resolver-webpack
const prodConf = require('./index');

module.exports = prodConf;
