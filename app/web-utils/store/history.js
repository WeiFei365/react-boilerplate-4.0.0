import _ from 'lodash';

/**
 * [操作 history/location 工具包]
 * @author  WEIFEI
 * @description history is a JavaScript library that lets you easily manage session history anywhere JavaScript runs.
 *              history abstracts away the differences in various environments and provides a minimal API
 *              that lets you manage the history stack, navigate, confirm navigation, and persist state between sessions.
 * @requires lodash
 * @requires history/createBrowserHistory
 * @see https://github.com/ReactTraining/history
 */

import { createBrowserHistory } from 'history';

import { hashStringify, hashParse, hashFilter } from '../native';

// 存储池
const store = {};
// 实例化 history API
export const history = createBrowserHistory();
// 监听 location 变化, 实时解析最新的 location
history.listen(lctParser);
// 初始化 location 数据
lctParser(history.location, history.action);
/**
 * location 解析器
 * @method lctParser
 * @param  {Object}  lct    [类似 window.location]
 * @param  {Object}  action [description]
 * @return {[type]}         [description]
 */
function lctParser(lct, action) {
  const hashJson = hashParse(lct.hash, true);
  const stateJson = hashParse(lct.state, true);
  const searchJson = hashParse(lct.search, true);

  return _.assign(store, {
    action,
    pathname: lct.pathname,
    hashJson,
    hashString: lct.hash,
    stateJson,
    stateString: lct.state,
    searchJson,
    searchString: lct.search,
  });
}

export function lctPush(params) {
  history.push(params);
}

export function lctReplace(params) {
  history.replace(params);
}

export function lctGet(path) {
  return _.get(store, path);
}

export function lctQuery(excepts = [], extra = {}) {
  let search = hashFilter(store.searchJson, excepts);
  let hash = hashFilter(store.hashJson, excepts);

  if (extra.search) {
    search = search
      ? `${search}&${hashStringify(extra.search)}`
      : hashStringify(extra.search);
  }
  if (extra.hash) {
    hash = hash
      ? `${hash}&${hashStringify(extra.hash)}`
      : hashStringify(extra.hash);
  }

  return [search ? `?${search}` : '', hash ? `#${hash}` : ''].join('');
}
