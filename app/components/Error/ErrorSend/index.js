import React from 'react';
// import classes from 'classnames';
// import PropTypes from 'prop-types';

import { Layout } from 'antd';

import css from './style.css';

const { Content } = Layout;

export default function ErrorSend() {
  return (
    <Content className={css.error}>
      <div>
        <p>
          <b>500.</b>ERROR
        </p>
        <h1>Darn co-ops...</h1>
        <p>发生错误；请稍后再试，或刷新浏览器。</p>
        <p className={css.ops}>
          <small>请扫描下方二维码联系客服：</small>
        </p>
        <div className={css.qrcode} />
      </div>
      <div className={css.robot} />
    </Content>
  );
}
