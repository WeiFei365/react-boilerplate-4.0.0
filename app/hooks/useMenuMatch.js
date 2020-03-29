import { useState, useMemo } from 'react';

export default function useMenuMatch(menus, pathname) {
  const [selectedKeys, initOpenKeys] = useMemo(() => {
    const openKeys = [];
    const sks = [];
    menus.forEach(({ test, key, children }) => {
      if (!children) {
        // 无子菜单，如果匹配应该放到 selectedKeys 中
        if (test.test(pathname)) {
          sks.push(key);
        }
        return;
      }
      children.forEach(d => {
        if (d.test.test(pathname)) {
          sks.push(d.key);
        }
      });
      if (test.test(pathname)) {
        openKeys.push(key);
      }
    });

    return [sks, openKeys];
  }, [menus, pathname]);
  const [openKeys, setOpenKeys] = useState(initOpenKeys);

  return [selectedKeys, openKeys, setOpenKeys];
}
