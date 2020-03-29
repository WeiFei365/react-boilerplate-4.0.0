import React from 'react';
import PropTypes from 'prop-types';

import { Layout } from 'antd';

const { Content } = Layout;

export default function PageNull({ children }) {
  return <Content className="flex-center">{children}</Content>;
}

PageNull.propTypes = {
  children: PropTypes.node,
};
