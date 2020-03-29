import React from 'react';

import { Layout } from 'antd';

import css from './style.css';

const { Footer } = Layout;

export default function AppFooter() {
  return (
    <Footer className={css.footer}>
      This project is licensed under the MIT license, Copyright (c) 2019
      Maximilian Stoiber.
    </Footer>
  );
}
