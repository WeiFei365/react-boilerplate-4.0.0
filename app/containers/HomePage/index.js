/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';

import { Button } from 'antd';

import css from './style.css';

export default function HomePage() {
  return (
    <div className={css.homePage}>
      <h1>This is the HomePage container!</h1>
      <Button type="primary">Antd</Button>
    </div>
  );
}
