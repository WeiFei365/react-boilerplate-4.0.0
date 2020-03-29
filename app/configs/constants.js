// 检查用户是否已登录
export const PROTECT_LOGIN = 'login';
// 检查用户是否具有某些权限
export const PROTECT_PERMISSION = 'permission';
// 格式化
export function findProtectConfig(protectList, key) {
  const config = (protectList || []).find(d => d === key || d.key === key);
  if (!config) {
    return null;
  }
  return typeof config === 'string' ? { key: config } : config;
}

export function hasPermission(permissionList, permissionConfig) {
  const { oneOf, allOf } = permissionConfig || {};
  if (allOf && allOf.length) {
    const more = allOf.filter(d => permissionList.indexOf(d) !== -1);
    return more.length === allOf.length;
  }
  if (oneOf && oneOf.length) {
    const item = oneOf.find(d => permissionList.indexOf(d) !== -1);
    return !!item;
  }
  return true;
}

/**
 * 提取可渲染的 route
 * @param {*} routeConfigs 参照 configs/page/--/routes.js
 */
export function getRoutes(routeConfigs) {
  const routes = [];

  routeConfigs.forEach(
    ({ name, loader, key, protectList, exact, children }) => {
      if (loader) {
        routes.push({ name, key, loader, protectList, exact });
      }
      if (children) {
        getRoutes(children).forEach(d => routes.push(d));
      }
    },
  );

  return routes;
}

/**
 * 提取可渲染的 menu
 * @param {*} routeConfigs 参照 configs/page/--/routes.js
 */
export const getMenus = routeConfigs => permissionList => {
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
};
