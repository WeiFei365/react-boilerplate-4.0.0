import {
  CodeOutlined,
  UserOutlined,
  DashboardOutlined,
} from '@ant-design/icons';

import PageNull from 'components/PageNull/loader';

import {
  PROTECT_LOGIN,
  hasPermission,
  findProtectConfig,
  PROTECT_PERMISSION,
} from 'configs/constants';

const { PRE_PUBLIC_PATH } = process.env.app;

const routeConfigs = [
  {
    name: '首页',
    key: PRE_PUBLIC_PATH,
    Icon: DashboardOutlined,
    exact: true,
    // 用来检查当前 pathname 是否匹配，用以高亮
    test: new RegExp(`^${PRE_PUBLIC_PATH}$`, 'i'),
    protectList: [PROTECT_LOGIN],
    loader: () => import('containers/HomePage'),
  },
  {
    name: '用户管理',
    key: `${PRE_PUBLIC_PATH}/user`,
    Icon: UserOutlined,
    // 用来检查当前 pathname 是否匹配，用以高亮
    test: new RegExp(`^${PRE_PUBLIC_PATH}/user`, 'i'),
    // 权限会在子路由中限制
    // protectList: [PROTECT_LOGIN],
    children: [
      {
        name: '用户列表',
        key: `${PRE_PUBLIC_PATH}/user/list`,
        // react-route 参数
        exact: true,
        // 用来检查当前 pathname 是否匹配，用以高亮
        test: new RegExp(`^${PRE_PUBLIC_PATH}/user/list`, 'i'),
        // 页面权限
        protectList: [
          PROTECT_LOGIN,
          {
            key: PROTECT_PERMISSION,
            oneOf: ['manage.user.list', 'manage.user.detail'],
          },
        ],
        loader: PageNull,
      },
      // 用户详情菜单不会展示在 menu 中，因此不需要 test 字段
      {
        name: '用户详情',
        key: `${PRE_PUBLIC_PATH}/user/list/:userId`,
        // react-route 参数
        exact: true,
        // 页面权限
        protectList: [
          PROTECT_LOGIN,
          {
            key: PROTECT_PERMISSION,
            allOf: ['manage.user.detail'],
          },
        ],
        loader: PageNull,
      },
      {
        name: '用户角色',
        key: `${PRE_PUBLIC_PATH}/user/permission`,
        // react-route 参数
        exact: true,
        // 用来检查当前 pathname 是否匹配，用以高亮
        test: new RegExp(`^${PRE_PUBLIC_PATH}/user/permission`, 'i'),
        // 页面权限
        protectList: [
          PROTECT_LOGIN,
          {
            key: PROTECT_PERMISSION,
            oneOf: ['manage.user.permission'],
          },
        ],
        loader: PageNull,
      },
    ],
  },
  {
    name: 'Memo',
    key: `${PRE_PUBLIC_PATH}/memo`,
    Icon: CodeOutlined,
    exact: true,
    // 用来检查当前 pathname 是否匹配，用以高亮
    test: new RegExp(`^${PRE_PUBLIC_PATH}/memo$`, 'i'),
    loader: PageNull,
  },
];

function getRoutes(dataList) {
  const routes = [];

  dataList.forEach(({ name, loader, key, protectList, exact, children }) => {
    if (loader) {
      routes.push({ name, key, loader, protectList, exact });
    }
    if (children) {
      getRoutes(children).forEach(d => routes.push(d));
    }
  });

  return routes;
}

export const routes = getRoutes(routeConfigs);

export default function getMenus(permissionList = []) {
  const menus = [];

  routeConfigs.forEach(
    ({ name, key, test, Icon, protectList, children, loader }) => {
      if (
        !hasPermission(
          permissionList,
          findProtectConfig(protectList, PROTECT_PERMISSION),
        )
      ) {
        // 无权限页面
        return;
      }
      const item = { name, key, Icon, test };
      if (children) {
        item.children = [];
        children.forEach(d => {
          if (!d.test) {
            // 非菜单路由
            return;
          }
          item.children.push({
            name: d.name,
            key: d.key,
            Icon: d.Icon,
            test: d.test,
          });
        });
        if (!item.children.length) {
          delete item.children;
        }
      }
      if (loader || item.children) {
        menus.push(item);
      }
    },
  );

  return menus;
}
