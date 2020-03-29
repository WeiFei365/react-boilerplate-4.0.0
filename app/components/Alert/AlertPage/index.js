import React from 'react';
import PropTypes from 'prop-types';

import { Alert, Layout } from 'antd';

import css from './style.css';

const { Content } = Layout;

function AlertPage(props) {
  return (
    <Content className="flex-center padding-24">
      <Alert className={css.alert} {...props} />
    </Content>
  );
}

AlertPage.propTypes = {
  type: PropTypes.string,
};
AlertPage.defaultProps = {
  type: 'warning',
};

export default AlertPage;
