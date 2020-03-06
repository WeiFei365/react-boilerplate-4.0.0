/**
 * 这里有点类似于前端保存用户的输入历史, 用户输入时给予提示
 * @author WEIFEI
 */

import LStoreDB from './lstore-db';
import { vcStringTo } from '../other/value-checker';
import { lstoreGet, lstoreSet } from './local-storage';

class LStoreSearchWords extends LStoreDB {
  check = v => {
    /* eslint-disable no-param-reassign */
    v = vcStringTo(v);
    /* eslint-enable */
    return [!!v, v];
  };

  setter = itemList => lstoreSet('search-words', itemList);

  getter = () => lstoreGet('search-words');

  // equal = (oldd, newd) => oldd === newd;

  // searchStrList = (data) => [String(data || '')];
}

// 实例化
const ins = new LStoreSearchWords({ saveKey: '', maxLength: 8 });

export const searchWords = {
  add: ins.add,
  select: ins.select,
  delete: ins.delete,
};
