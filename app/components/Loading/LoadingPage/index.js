import React from 'react';
import PropTypes from 'prop-types';

import icon from 'images/loading.svg';
import css from './style.css';

export default function LoadingPage({ size, className, tips }) {
  return (
    <div className={`${css.page} ${className} fill-100`}>
      <img className={css.icon} width={size} src={icon} alt="加载动画" />
      <p className={css.tips}>{tips}</p>
    </div>
  );
}

LoadingPage.propTypes = {
  tips: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.number,
};
LoadingPage.defaultProps = {
  size: 50,
  tips: '加载中...',
};
