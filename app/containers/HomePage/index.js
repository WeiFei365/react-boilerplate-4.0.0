/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Button } from 'antd';

import messages from './messages';
import css from './style.css';

export default function HomePage() {
  return (
    <div className={css.homePage}>
      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
      <Button type="primary">Antd</Button>
    </div>
  );
}
