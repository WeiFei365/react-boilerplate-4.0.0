import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Layout } from 'antd';

import DidCatch from 'components/DidCatch';

import Protect from 'containers/Protect';

import { routes } from 'configs/page/dt_index/routes';

import AppFooter from 'containers/AppFooter';
import AppSiderV from 'containers/AppSider/AppSiderV';
import AppHeaderV from 'containers/AppHeader/AppHeaderV';

const { PRE_PUBLIC_PATH } = process.env.app;

export default function App() {
  return (
    <Layout className="fill-100" id="container">
      <DidCatch>
        <AppSiderV />
      </DidCatch>
      <Layout>
        <DidCatch>
          <AppHeaderV />
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
        <DidCatch>
          <AppFooter />
        </DidCatch>
      </Layout>
    </Layout>
  );
}
