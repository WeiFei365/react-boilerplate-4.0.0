const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const prodConf = require('./index.js');
prodConf.plugins.unshift(new BundleAnalyzerPlugin());

module.exports = prodConf;
