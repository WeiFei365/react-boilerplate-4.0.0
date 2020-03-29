import { useState, useEffect } from 'react';

export default function useStorageUser() {
  const [user, setUser] = useState(UTS.lstoreGet('user'));

  useEffect(() => {
    const onChange = evt => {
      if (evt.key !== 'user') {
        return;
      }
      UTS.lstoreRefresh(['user']);
      setUser(UTS.lstoreGet('user'));
    };
    // 设置监听
    window.addEventListener('storage', onChange);
    // 取消监听，避免内存溢出
    return () => window.removeEventListener('storage', onChange);
  }, []);

  // ❓为什么无法通过 setUser 通知所有使用 useStorageUser 的地方 user 变化了？
  // 因为，React 官方已明确：自定义 hook 只共享逻辑，不共享 state 的，
  // 因此，这里的 setUser 无法通知所有使用 useStorageUser 的地方，
  // 并且，localStorage 的 storage 事件只会响应其他页面对 localStorage 的操作，
  // 不会响应当前页面对 localStorage 的修改；
  // ✅想要通知当前页面 user 信息变化了？请使用 store 中的 app.user 的更新；
  return [user, setUser];
}
