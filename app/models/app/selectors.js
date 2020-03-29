import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectApp = state => state.app || initialState();

export const makeSelectUser = () =>
  createSelector(
    selectApp,
    appState => appState.user,
  );
// 与 makeSelectUser 两者差别，在于是否只关心 user.value 的变化，可以节省一次 render
export const makeSelectUserValue = () =>
  createSelector(
    makeSelectUser,
    user => user.value,
  );

export const makeSelectMatch = () =>
  createSelector(
    selectApp,
    appState => appState.match,
  );

export const makeSelectSiderCollapsed = () =>
  createSelector(
    selectApp,
    appState => appState.siderCollapsed,
  );

export const makeSelectPermissions = () =>
  createSelector(
    selectApp,
    appState => appState.permissions,
  );
export const makeSelectPermissionsValue = () =>
  createSelector(
    makeSelectPermissions,
    permissions => permissions.value,
  );
