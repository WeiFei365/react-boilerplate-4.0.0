/**
 * 格式化数值, 增加千位符, 不会增加小数部分的千位符
 * @author WEIFEI
 * @method beautyNumber
 * @param  {Number}   n       [description]
 * @param  {Boolean}  noZero  [如果结果是'0'时返回'']
 * @return {String}           [description]
 */
export const beautyNumber = (n, noZero) => {
  let number = +n;
  if (_.isNaN(number) || number === 0) {
    return noZero ? '' : '0';
  }
  number = String(number);
  if (number.split('.').filter(d => d.length > 3).length === 0) {
    return number;
  }
  number = number.split('.');
  number[0] = number[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return number.join('.');
};

/**
 * 模糊大数值的显示, 如: 6000万、5000亿、4000万亿
 * @author WEIFEI
 * @method beautyUnit
 * @param  {Number}   n [待处理的数值]
 * @return {String}     [description]
 */
export const beautyUnit = n => {
  let number = +n;
  if (_.isNaN(number)) {
    return '0';
  }
  number = Math.abs(number);
  if (number < 10000) {
    return String(number);
  }

  number = Number(number).toFixed(0);

  let unit = ['', ''];
  if (number.length <= 8) {
    unit = [/\d{4}$/, '万'];
  } else if (number.length <= 12) {
    unit = [/\d{8}$/, '亿'];
  } else if (number.length <= 16) {
    unit = [/\d{12}$/, '万亿'];
  } else {
    return '不计其数';
  }

  number = number
    .replace(unit[0], '')
    .split('')
    .map((d, i) => (i === 0 ? d : 0))
    .join('');
  return `${number}${unit[1]}`;
};

/**
 * 分隔显示大数值, 如: '1234 5678 90'
 * @author WEIFEI
 * @method beautyLong
 * @param  {Number|String}  n             [description]
 * @param  {Boolean}        [byLeft=true] [例如:
 *                                        true: 1234 5678 90,
 *                                        false: 12 3456 7890]
 * @param  {String}         [flag=' ']    [要替换成的分隔符, 默认是: ' ']
 * @param  {Boolean}        [noZero=true] [当 n 非法时, 返回 '0' 或 '']
 * @return {String}                       [description]
 */
export const beautyLong = (n, byLeft = true, flag = ' ', noZero = true) => {
  let number = String(n).replace(/\D+/g, '');
  if (!number) {
    return noZero ? '' : '0';
  }
  if (number.length < 5) {
    return number;
  }
  // 反转
  if (byLeft) {
    number = number
      .split('')
      .reverse()
      .join('');
  }
  // 添加 flag
  number = number.replace(/\B(?=(\d{4})+(?!\d))/g, flag);
  if (byLeft) {
    return number
      .split('')
      .reverse()
      .join('');
  }
  return number;
};

/**
 * 格式化数值, 整数部分增加千位符, 小数部分截取需要的长度
 * @author WEIFEI
 * @method beautyFloat
 * @param  {Number}     n         [description]
 * @param  {Number}     [count=2] [小数容许的最大个数]
 * @param  {Boolean}    noZero    [参见: beautyNumber]
 * @return {String}               [description]
 */
export const beautyFloat = (n, count = 2, noZero) => {
  const [inte, deci] = beautyNumber(n, noZero).split('.');
  if (!deci) {
    return inte;
  }
  return `${inte}.${deci.substr(0, count)}`;
};
