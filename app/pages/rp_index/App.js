import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Layout } from 'antd';

import DidCatch from 'components/DidCatch';

import Protect from 'containers/Protect';

import { routes } from 'configs/page/rp_index/routes';

import AppFooter from 'containers/AppFooter';
import AppSider from 'containers/AppSider';
import AppHeader from 'containers/AppHeader';

const { PRE_PUBLIC_PATH } = process.env.app;

export default function App() {
  return (
    <Layout className="fill-100" id="container">
      <DidCatch>
        <AppHeader />
      </DidCatch>
      <Layout>
        <DidCatch>
          <AppSider />
        </DidCatch>
        <DidCatch>
          <Switch>
            {routes.map(({ key, exact, ...rest }) => (
              <Route key={key} exact={exact} path={key}>
                <Protect {...rest} />
              </Route>
            ))}
            <Route path="*">
              <Redirect to={PRE_PUBLIC_PATH} />
            </Route>
          </Switch>
        </DidCatch>
      </Layout>
      <DidCatch>
        <AppFooter />
      </DidCatch>
    </Layout>
  );
}
