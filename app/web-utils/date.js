import _ from 'lodash';

// 一小时的毫秒值
export const mSecondsHour = 1000 * 60 * 60;
// 一天的毫秒值
export const mSecondsDay = 1000 * 60 * 60 * 24;
// 一周的毫秒值
export const mSecondsWeek = 1000 * 60 * 60 * 24 * 7;

/**
 * 以各种形式构造 Date 实例
 * @method dateConstructor
 * @param  {Date|Number|String} any             [支持的类型:
 *                                              时间毫秒值,
 *                                              Date 实例,
 *                                              Date 字符串, 需要能被原生 Date 解析]
 * @param  {Boolean}            [isSelf=false]  [如果 any 为 Date 实例类型, 是否直接返回, 还是返回新构造的 Date 实例]
 * @return {Date}                               [description]
 */
export const dateConstructor = (any, isSelf = false) => {
  if (any instanceof Date) {
    // TODO 这里使用 any.getTime 来获取构造新 Date 实例的方式可能因为运行时的环境或时区问题,
    // 导致返回的新 Date 实例和 any 表示的时间不同
    return isSelf ? any : new Date(any.getTime());
  }
  if (typeof any === 'number') {
    return new Date(any);
  }
  const s = String(any || 0);
  return s.replace(/\d+/g, '').length ? new Date(s) : new Date(+s || 0);
};

/**
 * 日期重置工具,
 * 即: 重置日期到某个起点, 如: 零点、零分、当月第一天,
 * 比如: 原日期是 2018-09-29 13:14:15 60,
 * 重置到 零点后是 2018-09-29 13:00:00 0, 即endPoint='h'
 * 重置到 零分后是 2018-09-29 13:00:00 0, 即endPoint='m'
 * @author WEIFEI
 * @method dateSet
 * @param  {Date|Number|String} any [参见: dateConstructor 的 any 参数]
 * @param  {String} endPoint        [重置的结束点, 当前支持的值有(假设原时间为 2018-09-29 13:14:15 60):
 *                                  M: 返回 2018-01-01 00:00:00 0
 *                                  d: 返回 2018-09-01 00:00:00 0
 *                                  h: 返回 2018-09-29 00:00:00 0
 *                                  m: 返回 2018-09-29 13:00:00 0
 *                                  s: 返回 2018-09-29 13:14:00 0
 *                                  ms: 返回 2018-09-29 13:14:15 0]
 * @param  {String} timezone        [时区, 默认是本地时区, 当前支持的值有: UTC]
 * @return {Date}                   [description]
 */
export const dateSet = (any, endPoint, timezone = '') => {
  /* eslint-disable no-fallthrough */
  const date = dateConstructor(any, true);

  switch (endPoint) {
    case 'M':
      date[`set${timezone}Month`](1);
    case 'd':
      date[`set${timezone}Date`](1);
    case 'h':
      date[`set${timezone}Hours`](0);
    case 'm':
      date[`set${timezone}Minutes`](0);
    case 's':
      date[`set${timezone}Seconds`](0);
    case 'ms':
      date[`set${timezone}Milliseconds`](0);
      break;
    default:
  }
  return date;
};

/**
 * 计算两个时间毫秒值之间相差的天数
 * @author WEIFEI
 * @method dateDays
 * @param  {Number|Date|String} start [参见: dateConstructor 的 any 参数]
 * @param  {Number|Date|String} end   [参见: dateConstructor 的 any 参数]
 * @return {Number}                   [相差天数]
 */
export const dateDays = (start, end) => {
  const [min, max] = [dateConstructor(start), dateConstructor(end)].sort(
    (a, b) => a.getTime() - b.getTime(),
  );

  dateSet(min, 'h');
  dateSet(max, 'h');

  return (max.getTime() - min.getTime()) / mSecondsDay;
};

/**
 * 时间格式化
 * @author WEIFEI
 * @method dateFormat
 * @param  {Date|Number|String}   any         [参见: dateConstructor 的 any 参数]
 * @param  {String}   [pattern='YYYY-MM-DD']  [模板, 完整模板为:
 *                                            YYYY-MM-DD HH:mm:ss S EE,
 *                                            其中,
 *                                            HH 表示24小时制, hh 表示12小时制,
 *                                            EE 的输出如: 周四,
 *                                            EEE 的输出如: 星期四,
 *                                            - 可以改为任意值, 如: YYYY年MM月DD日HH时mm分ss秒 S毫秒 EE]
 * @param  {String}   [timezone='']           [时区，默认本地时区，还支持 UTC 时区]
 * @return {String}                           [description]
 */
export const dateFormat = (any, pattern = 'YYYY-MM-DD', timezone = '') => {
  /* eslint-disable no-param-reassign */
  const date = dateConstructor(any);

  const dict = {
    'M+': date[`get${timezone}Month`]() + 1,
    'D+': date[`get${timezone}Date`](),
    'h+':
      date[`get${timezone}Hours`]() % 12 === 0
        ? 12
        : date[`get${timezone}Hours`]() % 12,
    'H+': date[`get${timezone}Hours`](),
    'm+': date[`get${timezone}Minutes`](),
    's+': date[`get${timezone}Seconds`](),
    'q+': Math.floor((date[`get${timezone}Month`]() + 3) / 3),
    'S+': date[`get${timezone}Milliseconds`](),
  };
  // 日, 一, 二, 三, 四, 五, 六
  const weekDay = [
    '\u65e5',
    '\u4e00',
    '\u4e8c',
    '\u4e09',
    '\u56db',
    '\u4e94',
    '\u516d',
  ];
  // , 一, 二, 三, 四
  const quarter = ['', '\u4e00', '\u4e8c', '\u4e09', '\u56db'];

  // 替换模板中的年
  if (/(Y+)/.test(pattern)) {
    pattern = pattern.replace(
      RegExp.$1,
      String(date[`get${timezone}FullYear`]()).substr(4 - RegExp.$1.length),
    );
  }
  // 替换一周中的某天
  if (/(E+)/.test(pattern)) {
    let pre = '';
    if (RegExp.$1.length === 2) {
      // 前缀为: 周
      pre = '\u5468';
    } else if (RegExp.$1.length > 2) {
      // 前缀为: 星期
      pre = '\u661f\u671f';
    }
    pattern = pattern.replace(
      RegExp.$1,
      `${pre}${weekDay[date[`get${timezone}Day`]()]}`,
    );
  }
  // 替换季度数为：一, 二, 三, 四
  if (/(Q+)/.test(pattern)) {
    pattern = pattern.replace(RegExp.$1, _.get(quarter, +dict['q+']));
  }
  // 替换其他的标志
  Object.keys(dict).forEach(d => {
    if (!new RegExp(`(${d})`).test(pattern)) {
      return;
    }
    pattern = pattern.replace(
      RegExp.$1,
      RegExp.$1.length === 1
        ? dict[d]
        : `00${dict[d]}`.substr(String(dict[d]).length),
    );
  });

  return pattern;
};

/**
 * 时间碎片
 * @author WEIFEI
 * @method datePatterns
 * @param  {Date|Number|String}   any         [参见: dateConstructor 的 any 参数]
 * @param  {String}   [timezone='']           [时区，默认本地时区，还支持 UTC 时区]
 * @return {String}                           [description]
 */
export const datePatterns = (any, timezone = '') => {
  /* eslint-disable no-param-reassign */
  const pattern = [
    'YYYY', // 2019年
    'YYY', // 019年
    'YY', // 19年
    'Y', // 9年
    'MM', // 09月
    'M', // 9月
    'DD', // 09日
    'D', // 9日
    'HH', // 21时
    'H', // 9时
    'hh', // 09时(21时)
    'h', // 9时
    'mm', // 09分
    'm', // 9分
    'ss', // 09秒
    's', // 9秒
    'q', // 1季度
    'Q', // 一季度
    'SSS', // 099毫秒
    'S', // 999毫秒
    'EE', // 周一
    'EEE', // 星期一
  ];
  const dates = ['', pattern.join('-')];
  do {
    [, dates[0]] = dates;
    dates[1] = dateFormat(any, dates[1], timezone);
  } while (dates[0] !== dates[1]);
  const value = dates[1].split('-');

  const data = {};
  pattern.forEach((k, i) => {
    data[k] = value[i];
  });

  return data;
};
