/**
 * antd 的 Icon 组件的封装，简化 icon 的 size 等配置
 */

import React from 'react';
import PropTypes from 'prop-types';

export default function SIcon({
  size,
  color,
  margin,
  verticalAlign,
  Component,
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

SIcon.propTypes = {
  Component: PropTypes.elementType.isRequired,
  verticalAlign: PropTypes.string,
  color: PropTypes.string,
  margin: PropTypes.string,
  size: PropTypes.number,
};
SIcon.defaultProps = {
  size: 14,
  margin: '0 4px',
};
