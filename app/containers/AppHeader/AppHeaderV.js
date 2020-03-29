import React, { useCallback } from 'react';
import classes from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import SIcon from 'components/SIcon';

import * as appAction from 'models/app/actions';
import * as appSelectors from 'models/app/selectors';

import css from './style.css';

const { Header } = Layout;

function AppHeaderV({ siderCollapsed, dispatch }) {
  const onSwitch = useCallback(() => {
    dispatch(appAction.stateAny({ siderCollapsed: !siderCollapsed }));
  }, [dispatch, siderCollapsed]);

  return (
    <Header className={classes(css.header, css.v)}>
      <SIcon
        size={16}
        color="#fff"
        onClick={onSwitch}
        className={css.switch}
        Component={siderCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined}
      />
    </Header>
  );
}

AppHeaderV.propTypes = {
  dispatch: PropTypes.func.isRequired,
  siderCollapsed: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  siderCollapsed: appSelectors.makeSelectSiderCollapsed(),
});

export default connect(mapStateToProps)(AppHeaderV);
