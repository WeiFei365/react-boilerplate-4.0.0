/**
 * process.env中通用的环境变量
 * @type {String}
 */

const mapHostApis = {
  development: 'http://api-test.example.com',
  production_test: 'http://api-test.example.com',
  production: 'https://api.example.com',
};

module.exports = function base(configs, NODE_ENV, APP_ENV) {
  const HOST_API = configs.HOST_API || mapHostApis[`${NODE_ENV}${APP_ENV}`];

  const ROUTER = configs.ROUTER || '/';
  const PREROUTER = ROUTER === '/' ? ROUTER : ROUTER.replace(/\/+$/, '');

  return Object.assign(
    {
      HOST_API,
      // webpack public path
      ROUTER,
      // 专用于页面跳转，避免拼接出类似 ////login 的错误路由（多个斜杠相连）
      PREROUTER,

      META_KEYWORDS: 'react redux react-boilerplate',
      META_DESCRIPTION:
        'A highly scalable, offline-first foundation with the best DX and a focus on performance and best practices',

      // 是否为线上环境，排除本地、测试环境
      IS_PRODUCTION: NODE_ENV === 'production' && APP_ENV !== '_test',
    },
    configs,
  );
};
