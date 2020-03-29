import React from 'react';
import classes from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Layout } from 'antd';

import * as appSelectors from 'models/app/selectors';

import css from './style.css';

const { Header } = Layout;

function AppHeader({ siderCollapsed }) {
  return (
    <Header className={css.header}>
      <div className={classes(css.logo, css[siderCollapsed])} />
      <span>Header</span>
    </Header>
  );
}

AppHeader.propTypes = {
  siderCollapsed: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  siderCollapsed: appSelectors.makeSelectSiderCollapsed(),
});

export default connect(mapStateToProps)(AppHeader);
