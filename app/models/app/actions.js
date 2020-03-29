import { STATE_ANY, STATE_BY_ANY, FETCH_USER } from './constants';

export function stateAny(payload) {
  return {
    type: STATE_ANY,
    payload,
  };
}

export function stateByAny(keyPath, data, isAssign = false) {
  return {
    type: STATE_BY_ANY,
    keyPath,
    data,
    isAssign,
  };
}

export function fetchUser() {
  return {
    type: FETCH_USER,
  };
}
