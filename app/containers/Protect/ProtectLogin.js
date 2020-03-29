import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { Modal } from 'antd';

import LoadingPage from 'components/Loading/LoadingPage';
import AlertPage from 'components/Alert/AlertPage';

import * as appAction from 'models/app/actions';
import * as appSelectors from 'models/app/selectors';

import useStorageUser from 'hooks/useStorageUser';
import * as userApi from 'apis/user';

const { PATH_LOGIN, IS_DEVELOPMENT, IS_LOGIN_SELF } = process.env.app;

/**
 * 路由级：登录拦截器
 * @param {*} param0 是
 */
function ProtectLogin({ dispatch, children, userValue }) {
  console.log('---ProtectLogin - render'); // eslint-disable-line no-console
  const [localUser, setLocalUser] = useStorageUser();
  // 之前是否已挂载了 children
  const [isSuccessMounted, setSuccessMounted] = useState(false);
  // 这里的 user 来源会有两个，
  // 是因为 userValue 负责监听当前页面 user 变化，
  // localUser 负责监听 localStorage 中 user 变化；
  const user = userValue || localUser;

  // 从服务端刷新用户信息
  useEffect(() => {
    if (!user) {
      return UTS.func;
    }
    // 避免频繁的 user 更新
    const timer = setTimeout(() => {
      userApi.userToken().then(data => {
        // 更新到 store，因此可以通知所有监听 store 中 user 变化的地方
        dispatch(appAction.stateByAny('user.value', data));
        if (!data) {
          // 已注销：通知其他页面 user 信息变化
          UTS.lstoreSet('user', null);
          // 这里仅仅是为了清理 localUser，从而清理 user
          setLocalUser(null);
          return;
        }
        setSuccessMounted(true);
      });
    }, 200);
    return () => clearTimeout(timer);
  }, [localUser]);
  // 提示用户被注销
  useEffect(() => {
    if (!user && isSuccessMounted) {
      const modal = Modal.warning({
        title: '账户已注销',
        content: '您已注销当前登录账户，请重新登录！',
        onOk: () => {
          modal.destroy();
          window.location.reload();
        },
      });
      return () => modal.destroy();
    }
    return UTS.func;
  }, [user, isSuccessMounted]);

  if (isSuccessMounted) {
    // 只要之前渲染了 children，为了避免页面突然空白/闪烁，还是要显示 children；
    // 但是会通过 useEffect 来提示用户
    return children;
  }
  if (!user) {
    if (IS_DEVELOPMENT) {
      return <AlertPage message="本地开发环境，请登录！" />;
    }
    const query = `${PATH_LOGIN}?from=${UTS.encodeURIComponent(
      window.location.href,
    )}`;
    if (IS_LOGIN_SELF) {
      return <Redirect to={query} />;
    }
    // TODO 如何跨应用跳转登录
    return <AlertPage message="未登录，或登录信息已失效！" />;
  }

  return <LoadingPage />;
}

ProtectLogin.propTypes = {
  userValue: PropTypes.object,
  children: PropTypes.element.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userValue: appSelectors.makeSelectUserValue(),
});

export default connect(mapStateToProps)(ProtectLogin);
