import _ from 'lodash';

/**
 * 安全的转码字符串
 * @param {*} str 是
 * @param {*} dft 出错时的返回值
 */
export const encodeURIComponent = (str, dft) => {
  try {
    return window.encodeURIComponent(str);
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
  return dft;
};

/**
 * 安全的解码字符串
 * @param {*} str 是
 * @param {*} dft 出错时的返回值
 */
export const decodeURIComponent = (str, dft) => {
  try {
    return window.decodeURIComponent(str);
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
  return dft;
};

/**
 * [安全的将字符串转成 json]
 * @author WEIFEI
 * @method jsonParse
 * @param  {String} jsonstr [description]
 * @param  {[type]} dft     [转换失败或非法 jsonstr 时的返回值]
 * @return {[type]}         [description]
 */
export const jsonParse = (jsonstr, dft) => {
  if (!jsonstr) {
    return dft;
  }

  try {
    return JSON.parse(jsonstr);
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }

  return dft;
};

/**
 * [安全的调用JSON.stringify]
 * @author WEIFEI
 * @method jsonStringify
 * @param  {[type]} jsondata [description]
 * @param  {String} [dft=''] [在非法的 jsondata 或转换出错时的返回值]
 * @return {[type]}          [description]
 */
export const jsonStringify = (jsondata, dft = '') => {
  if (jsondata === null || jsondata === undefined || _.isNaN(jsondata)) {
    return dft;
  }

  try {
    return JSON.stringify(jsondata);
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }

  return dft;
};

/**
 * [深度拷贝对象，会丢弃不可拷贝的对象，比如: function]
 * @author WEIFEI
 * @method jsonClone
 * @param  {Object} json  [description]
 * @return {Object}       [description]
 */
export const jsonClone = json => jsonParse(jsonStringify(json));

/**
 * [解码 url 中的 search 或 hash 成 json 对象]
 * @author WEIFEI
 * @method hashParse
 * @param  {String}  [str='']               [待解析的 search 或 hash 字符串]
 * @param  {Boolean} [isValueJson=false]    [是否尝试将 KEY-VALUE 对中的 VALUE 尝试 JSON.parse 解析,
 *                                          小提示: 如果为 true 能够识别出 number boolean 等类型]
 * @param  {Boolean} [isLowerCaseKey=false] [是否将 KEY-VALUE 中的 KEY 转小写]
 * @return {Object}                         [description]
 */
export const hashParse = (
  str = '',
  isValueJson = false,
  isLowerCaseKey = false,
) => {
  const data = {};

  // TODO 这里忽略了一个问题，例如: https://www.baidu.com/?a=1?b=2#c=1?d=2#e=4
  // 先replace所有的'?'和'#'为'&'，之所以replace成'&'是为了拼接出现多个'?'或'#'片段
  _.trim(str)
    .replace(/(\?|#)/gi, '&')
    .split('&')
    // 按=切分KEY-VALUE对
    .map(d =>
      d
        .split('=')
        .map(c => c.replace(/\s+/gi, ''))
        .filter(c => !!c.length),
    )
    .filter(d => {
      if (d.length === 2) {
        return true;
      }
      if (d.length === 1) {
        // 填充无VALUE的参数
        d.push('');
        return true;
      }
      return false;
    })
    .forEach(d => {
      const k = isLowerCaseKey ? d[0].toLowerCase() : d[0];
      const v = decodeURIComponent(d[1]);
      data[k] = (isValueJson ? jsonParse(v) : v) || v;
    });

  return data;
};

/**
 * [编码json为URL中需要的search或hash]
 * @author WEIFEI
 * @method hashStringify
 * @param  {Json} data    [description]
 * @return {String}       [description]
 */
export const hashStringify = data => {
  if (!data || !_.isObject(data)) {
    return '';
  }
  return Object.keys(data)
    .map(hsk => {
      let hsv = data[hsk];
      if (hsv === null || hsv === undefined || _.isNaN(hsv)) {
        return hsk;
      }
      if (_.isArray(hsv) || _.isObject(hsv)) {
        hsv = jsonStringify(hsv);
      } else {
        hsv = String(hsv);
      }
      return `${hsk}=${encodeURIComponent(hsv)}`;
    })
    .filter(d => !!d)
    .join('&');
};

/**
 * [过滤 URL 的 search 或 hash 中的参数, 注意，返回值中不包含前缀 '?' 或 '#']
 * @author WEIFEI
 * @method hashFilter
 * @param  {Object|String}  any           [可以直接传 search 或 hash 字符串, 或 json]
 * @param  {Array}          [excepts=[]]  [要去除的参数名称]
 * @return {String}                       [不带 '?' 或 '#' 前缀的字符串]
 */
export const hashFilter = (any, excepts = []) => {
  if (!excepts || !excepts.length) {
    if (_.isString(any)) {
      // 这里之所以要来回转再返回, 是为了去除前缀的 '?' 或 '#', 统一返回值
      return hashStringify(hashParse(any));
    }
    return hashStringify(any);
  }

  const data = (_.isString(any) ? hashParse(any) : any) || {};
  // 去除要排除参数
  Object.keys(data).forEach(key => {
    if (excepts.indexOf(key) !== -1) {
      delete data[key];
    }
  });

  return hashStringify(data);
};
