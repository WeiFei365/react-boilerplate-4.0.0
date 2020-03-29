import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Layout } from 'antd';

import * as appSelectors from 'models/app/selectors';

import SiderMenu from './SiderMenu';
import css from './style.css';

const { Sider } = Layout;

function AppSiderV({ siderCollapsed }) {
  return (
    <Sider
      collapsible
      trigger={null}
      collapsed={siderCollapsed}
      className={css.sider}
    >
      <div className={css.logo} />
      <SiderMenu />
    </Sider>
  );
}

AppSiderV.propTypes = {
  siderCollapsed: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  siderCollapsed: appSelectors.makeSelectSiderCollapsed(),
});

export default connect(mapStateToProps)(AppSiderV);
