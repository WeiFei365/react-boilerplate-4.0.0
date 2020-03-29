/**
 * 封装来自 iconfont.cn 的图标；
 * 参见：
 */

import React from 'react';
import PropTypes from 'prop-types';

import { createFromIconfontCN } from '@ant-design/icons';

const Component = createFromIconfontCN({
  // 来自 iconfont 的图标
  scriptUrl: '//at.alicdn.com/t/font_1716782_1hrwk7jbq9a.js',
  // extraCommonProps: {},
});

export default function IconFont({
  size,
  color,
  margin,
  verticalAlign,
  ...rest
}) {
  return (
    <Component
      {...rest}
      style={{
        color,
        margin,
        verticalAlign,
        width: size,
        height: size,
        fontSize: size,
      }}
    />
  );
}

IconFont.propTypes = {
  verticalAlign: PropTypes.string,
  color: PropTypes.string,
  margin: PropTypes.string,
  size: PropTypes.number,
};

IconFont.defaultProps = {
  size: 14,
  margin: '0 4px',
};
