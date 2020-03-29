import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import SIcon from 'components/SIcon';

import * as appAction from 'models/app/actions';
import * as appSelectors from 'models/app/selectors';

import SiderMenu from './SiderMenu';
import css from './style.css';

const { Sider } = Layout;

function AppSider({ siderCollapsed, dispatch }) {
  const onSwitch = useCallback(() => {
    dispatch(appAction.stateAny({ siderCollapsed: !siderCollapsed }));
  }, [dispatch, siderCollapsed]);

  return (
    <Sider
      collapsible
      trigger={null}
      collapsed={siderCollapsed}
      className={css.sider}
    >
      <SiderMenu />
      <div className={css.switch}>
        <SIcon
          size={20}
          color="#20232a"
          onClick={onSwitch}
          Component={siderCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined}
        />
      </div>
    </Sider>
  );
}

AppSider.propTypes = {
  dispatch: PropTypes.func.isRequired,
  siderCollapsed: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  siderCollapsed: appSelectors.makeSelectSiderCollapsed(),
});

export default connect(mapStateToProps)(AppSider);
