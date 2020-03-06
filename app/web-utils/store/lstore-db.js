/**
 * [基于 local-storage 模块的高级存储结构, 适合于存储高级的数据结构, 并有一定的操作方式;
 * 本模块也可以基于其他类似 local-storage 的存储块, 比如: IndexedDB, Web SQL;
 * 本模块主要用于存储 Array 类型的数据结构, 并且可以基于该数据做增、删、检索的操作;
 * 存储列表采用先进后出的时间策略, 类似于用户的输入历史会优先展示最近的输入历史]
 * @author WEIFEI
 * @example 使用方式：
 *    请继承 LStoreDB 后，
 *    并实现这些类方法 check、equal、searchStrList；
 */

import { regexSearchChar } from '../regex';
import { vcStringTo, vcBoolean } from '../other/value-checker';

export default class LStoreDB {
  constructor() {
    // 使用内置 check 检查元数据的正确性
    let itemList = this.getter().map(item => {
      const [isTrue, data] = this.check(item.d);
      if (isTrue) {
        /* eslint-disable no-param-reassign */
        item.d = data;
        /* eslint-enable */
      }
      return isTrue ? item : false;
    });
    itemList = itemList.filter(vcBoolean);
    this.setter(itemList);
  }

  // 【✅可覆盖】元数据的校验器
  check = data => [true, data];

  // 【✅可覆盖】用以对比数据是否一样，通常用在 增删改 时数据的查找
  equal = (oldd, newd) => oldd === newd;

  // 【✅可覆盖】需要检索哪些数据，以数组形式返回，可以检索多个字符串
  searchStrList = data => [vcStringTo(data)];

  // 从 localStorage 中获取数据
  getter = () => [];

  setter = itemList => itemList;

  //
  toItem = d => ({ d, t: Date.now() });

  //
  fromItem = item => item.d;

  // desc 从大到小
  select = (limit = 6, search = '', orderDesc = true) => {
    let itemList = this.getter().sort((a, b) => b.t - a.t);
    if (!orderDesc) {
      itemList.reverse();
    }

    if (search) {
      const regex = regexSearchChar(search);
      if (regex.replacement) {
        itemList = itemList.map(item => {
          let isAny = false;
          const row = { html: [], data: item.d };
          this.searchStrList(item.d).forEach(str => {
            const isTest = regex.test.test(str);
            row.html.push(
              isTest ? str.replace(regex.replace, regex.replacement) : str,
            );
            if (isTest) {
              isAny = true;
            }
          });
          return isAny ? row : false;
        });
        itemList = itemList.filter(vcBoolean);
      }
    }
    // 去除内部使用的 t 等字段
    itemList = itemList.map(d => (d.t ? { data: d.d } : d));

    return itemList.slice(0, limit);
  };

  add = data => {
    const result = this.check(data);
    if (!result[0]) {
      return;
    }
    /* eslint-disable no-param-reassign */
    [, data] = result;
    /* eslint-enable */

    const itemList = this.getter().filter(d => !this.equal(d.d, data));
    itemList.unshift(this.toItem(data));
    this.setter(itemList.slice(0, this.maxLength));
  };

  delete = data => {
    const result = this.check(data);
    if (!result[0]) {
      return;
    }
    /* eslint-disable no-param-reassign */
    [, data] = result;
    /* eslint-enable */

    this.setter(this.getter().filter(d => !this.equal(d.d, data)));
  };
}
