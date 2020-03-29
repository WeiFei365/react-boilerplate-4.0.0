const { version } = (() => {
  if (!window.navigator) {
    window.navigator = {};
  }
  const ua = String(navigator.userAgent || '');
  return {
    version: {
      // IE内核
      trident: ua.indexOf('Trident') > -1,
      // opera内核
      presto: ua.indexOf('Presto') > -1,
      // 苹果、谷歌内核
      webKit: ua.indexOf('AppleWebKit') > -1,
      // 火狐内核
      gecko: ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') === -1,
      // 是否为移动终端
      mobile: !!ua.match(/AppleWebKit.*Mobile.*/),
      // 是否为微信内置浏览器
      wechat: !!ua.match(/MicroMessenger/i),
      // ios终端
      ios: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      // android终端
      android: ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1,
      // 是否为iPhone或者QQHD浏览器
      iPhone: ua.indexOf('iPhone') > -1,
      // 是否iPad
      iPad: ua.indexOf('iPad') > -1,
      // 是否web应该程序，没有头部与底部
      webApp: ua.indexOf('Safari') === -1,
      // 是否QQ
      qq: ua.match(/\sQQ/i) === 'qq',
    },
    app: String(navigator.appVersion || ''),
    language: String(
      navigator.browserLanguage || navigator.language || '',
    ).toLowerCase(),
  };
})();

export const isIE = version.trident;
export const isWebKit = version.webKit;
export const isMobile =
  version.mobile || version.android || version.ios || version.iPad;
export const isWeixin = version.wechat;
