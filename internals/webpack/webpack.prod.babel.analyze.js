const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const prodConf = require('./webpack.prod.babel.js');
prodConf.plugins.unshift(new BundleAnalyzerPlugin());

module.exports = prodConf;
