import { call, put, takeLatest } from 'redux-saga/effects';

import * as userApi from 'apis/user';
import { stateByAny } from './actions';
import { FETCH_USER } from './constants';
import { initialState } from './reducer';

export function* fetchUser() {
  // const username = yield select(makeSelectUsername());
  yield put(stateByAny('user', { loading: true, error: '' }, true));
  try {
    const value = yield call(userApi.userToken);
    yield put(
      stateByAny(
        'user',
        {
          loading: false,
          error: '',
          value,
        },
        true,
      ),
    );
  } catch (err) {
    yield put(
      stateByAny(
        'user',
        {
          loading: false,
          error: err.message || 'Unknown',
          value: initialState().user.value,
        },
        true,
      ),
    );
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  yield takeLatest(FETCH_USER, fetchUser);
}
