/**
 * [操作 localStorage 工具包]
 * ❤️
 * ❤️使用说明：使用前，请先在 saveKeys 定义需要从 localStorage 获取并且会写到 localStorage 中的所有数据的 KEY；
 * ❤️未在 localStorage 中定义的 KEY，既不会在初始化时从 localStorage 获取，也不会写入到 localStorage 中；
 * ❤️KEY 的值为该数据的校验器
 * ❤️
 * @author  WEIFEI
 * @requires lodash
 */

import { jsonStringify, jsonParse } from '../native';
import { vcArrayObjectKey, vcObjectKeyNull } from '../other/value-checker';

const NKEY = `_${Date.now()}_${Math.random()}`;
// 数据存储池
const store = {
  // 标记是否已从 localStorage 加载数据
  [NKEY]: true,
};
// 需要读取/存储 localStorage 中数据的 KEY 定义
const saveKeys = {
  // 检验 t 存在，否则 []
  'search-words': vcArrayObjectKey('t'),
  // 检验 id 和 token 同时存在，否则 null
  user: v => vcObjectKeyNull('id')(vcObjectKeyNull('token')(v)),
};

/**
 * @param {*} path 修改数据的路径，类似 lodash 的 set
 * @param {*} value 新的数据
 * @param {*} sKey 对应 localStorage 中保存数据的 KEY
 * @param {*} isMerge 是否 merge 到老数据上，或者直接替换老数据
 * @param {*} isSave 更新后是否立刻保存到 localStorage 中
 */
export function lstoreSet(path, value, sKey, isMerge = false, isSave = true) {
  lstoreInit();

  /* eslint-disable no-param-reassign */
  sKey = sKey || path;
  /* eslint-enable */

  if (isMerge) {
    const oldv = _.get(store, path);
    if (_.isObject(oldv) && _.isObject(value)) {
      /* eslint-disable no-param-reassign */
      value = _.merge(oldv, value);
      /* eslint-enable */
    }
  }
  // 校验数据
  if (saveKeys[sKey]) {
    /* eslint-disable no-param-reassign */
    value = saveKeys[sKey](value);
    /* eslint-enable */
  }

  _.set(store, path, value);

  if (isSave) {
    lstoreSave(path);
  }

  return value;
}

export function lstoreGet(path) {
  lstoreInit();

  return _.get(store, path);
}

export function lstoreSave(sKey) {
  if (sKey) {
    if (saveKeys[sKey]) {
      localStorage.setItem(sKey, jsonStringify(store[sKey]));
    }
  } else {
    Object.keys(saveKeys).forEach(name => {
      localStorage.setItem(name, jsonStringify(store[name]));
    });
  }
}

export function lstoreClear(isAll = false) {
  if (isAll) {
    Object.keys(store).forEach(name => delete store[name]);
    localStorage.clear();
    return;
  }
  Object.keys(saveKeys).forEach(name => {
    delete store[name];
    localStorage.removeItem(name);
  });
}

export function lstoreInit(isForce = false) {
  if (!store[NKEY] && !isForce) {
    return;
  }
  Object.keys(saveKeys).forEach(name => {
    // 从localStorage读取指定key的数据
    store[name] = jsonParse(localStorage.getItem(name));
    // 验证已加载的数据正确性: 根据用户设定的校验器或默认校验器
    store[name] = saveKeys[name](store[name]);
  });

  delete store[NKEY];
}
