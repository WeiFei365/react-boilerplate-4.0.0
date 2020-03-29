import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Layout, Button } from 'antd';

import css from './style.css';

const { Content } = Layout;
const { PRE_PUBLIC_PATH } = process.env.app;

export default function NotFound() {
  return (
    <Content className={css.error}>
      <div>
        <p>
          <b>404.</b>ERROR
        </p>
        <p>在此服务器上找不到请求的页面。</p>
        <p className={css.ops}>
          <Button type="primary">
            <Link to={PRE_PUBLIC_PATH}>返回首页</Link>
          </Button>
        </p>
        <div className={css.qrcode} />
      </div>
      <div className={css.robot} />
    </Content>
  );
}
