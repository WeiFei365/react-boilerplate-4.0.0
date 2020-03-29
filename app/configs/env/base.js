/**
 * process.env中通用的环境变量
 * @type {String}
 */

const mapHostApis = {
  development: 'https://dev.example.com',
  production_test: 'https://test.example.com',
  production: 'https://api.example.com',
};

module.exports = function base(configs, NODE_ENV, APP_ENV) {
  const HOST_API = configs.HOST_API || mapHostApis[`${NODE_ENV}${APP_ENV}`];

  const PUBLIC_PATH = configs.PUBLIC_PATH || '/';
  const PRE_PUBLIC_PATH =
    PUBLIC_PATH === '/' ? PUBLIC_PATH : PUBLIC_PATH.replace(/\/+$/, '');

  const PATH_LOGIN = '/rp/login';
  const IS_LOGIN_SELF = PUBLIC_PATH === '/rp/';

  const IS_DEVELOPMENT = NODE_ENV === 'development';
  const IS_PROD_TEST = NODE_ENV === 'production' && APP_ENV !== '_test';

  return Object.assign(
    {
      HOST_API,
      // webpack public path
      PUBLIC_PATH,
      // 专用于页面跳转，避免拼接出类似 ////login 的错误路由（多个斜杠相连）
      PRE_PUBLIC_PATH,

      // 登录页 pathname
      PATH_LOGIN,
      // 决定是用 href 跳转到登录页，还是用 lctPush
      IS_LOGIN_SELF,

      META_KEYWORDS: 'react redux react-boilerplate',
      META_DESCRIPTION:
        'A highly scalable, offline-first foundation with the best DX and a focus on performance and best practices',

      // 环境：本地开发、测试、正式
      IS_DEVELOPMENT,
      IS_PROD_TEST,
      IS_PRODUCTION: !(IS_DEVELOPMENT || IS_PROD_TEST),
    },
    configs,
  );
};
