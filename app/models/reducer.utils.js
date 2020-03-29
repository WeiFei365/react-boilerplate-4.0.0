import _ from 'lodash';
import produce from 'immer';

/**
 * 减少样板代码（switch-case）
 * @param {*} initialState 初始 state
 * @param {*} handlers 所有 case
 * @param {*} STATE_ANY 通用 case
 * @param {*} STATE_BY_ANY 通用 case
 */
export const createReducer = (
  initialState,
  handlers,
  STATE_ANY,
  STATE_BY_ANY,
) => {
  if (STATE_ANY) {
    handlers[STATE_ANY] = caseStateAny; // eslint-disable-line no-param-reassign
  }
  if (STATE_BY_ANY) {
    handlers[STATE_BY_ANY] = caseStateByAny; // eslint-disable-line no-param-reassign
  }
  const KEYS = Object.keys(handlers);
  return (state = initialState, action) =>
    produce(state, draft => {
      if (KEYS.indexOf(action.type || '') !== -1) {
        handlers[action.type](draft, action, state);
      }
    });
};

/**
 * 更新 store 中的任意一级数据；
 * 这里不会做深度 merge，深度更新请使用 caseStateByAny；
 * @param {*} draft 参见 immer.produce
 * @param {*} action 是
 * @param {*} state 当前 state，区别于 immer 副本
 */
export const caseStateAny = (draft, action) => {
  if (_.isObject(action.payload)) {
    _.assign(draft, action.payload);
  }
};

/**
 * 更新 store 中的任意 N 级数据；
 * 可选 action.isAssign 是否对对象做 assign 操作，还是直接替换；
 * 不支持深度 merge，因为会涉及到 Array 等类型的数据的特殊处理；
 * @param {*} draft 参见 immer.produce
 * @param {*} action 是
 * @param {*} state 当前 state，区别于 immer 副本
 */
export const caseStateByAny = (draft, action, state) => {
  const { keyPath, data, isAssign } = action;
  if (keyPath) {
    // 这里之所以要从 state 中读取，是因为 draft 的读操作更耗性能，参见：#Pitfalls.3
    const old = _.get(state, keyPath);
    if (!isAssign || !_.isObject(old) || !_.isObject(data)) {
      _.set(draft, keyPath, data);
    } else {
      _.set(draft, keyPath, _.assign(old, data));
    }
  }
};
