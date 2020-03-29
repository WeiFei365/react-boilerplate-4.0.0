import React, { lazy, Suspense, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import LoadingPage from 'components/Loading/LoadingPage';

import {
  PROTECT_LOGIN,
  findProtectConfig,
  PROTECT_PERMISSION,
} from 'configs/constants';
import * as appAction from 'models/app/actions';

import ProtectLogin from './ProtectLogin';
import ProtectPermission from './ProtectPermission';

function Protect({ name, loader, dispatch, protectList }) {
  const [Lazy] = useState(lazy(loader));
  const match = useParams();

  useEffect(() => {
    dispatch(appAction.stateAny({ match }));
  }, [match]);

  return useMemo(() =>
    [
      [PROTECT_PERMISSION, ProtectPermission],
      [PROTECT_LOGIN, ProtectLogin],
    ].reduce(
      (children, [key, Component]) => {
        const config = findProtectConfig(protectList, key);
        return config ? (
          <Component config={config}>{children}</Component>
        ) : (
          children
        );
      },
      <Suspense fallback={<LoadingPage />}>
        <Lazy>{name}</Lazy>
      </Suspense>,
    ),
  );
}

Protect.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Protect);
