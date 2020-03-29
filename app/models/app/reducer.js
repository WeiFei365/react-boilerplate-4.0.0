import { createReducer } from 'models/reducer.utils';

import { STATE_ANY, STATE_BY_ANY } from './constants';

export const initialState = () => ({
  siderCollapsed: false,
  // location.match
  match: null,
  user: {
    error: '',
    loading: false,
    value: UTS.lstoreGet('user'),
  },
  permissions: {
    error: '',
    loading: false,
    value: [],
  },
});

export default createReducer(initialState(), {}, STATE_ANY, STATE_BY_ANY);
