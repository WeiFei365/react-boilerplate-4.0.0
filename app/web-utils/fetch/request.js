import 'whatwg-fetch';
import React from 'react';
import { message, Modal } from 'antd';

import { ZINDEX_NO_PERMISSION_MODAL } from 'configs/z-index';

const HTTP_CONTENT_TYPE = Math.random();
// http 请求网络级的报错，如: 404、503、断网等
const HTTP_ERROR = Math.random();
/**
 * 统一处理: http错误码
 * @method
 * @param  {Number} [times=1000] [description]
 * @return {[type]}              [description]
 */
const httpError = () => {
  message.error('服务器开小差啦，请稍后再试！', 5);
};
/**
 * 统一处理: 权限不足
 * @method
 * @param  {Number} [times=1000] [description]
 * @return {[type]}              [description]
 */
const login401 = function login401(times = 1000) {
  if (this.modal) {
    return;
  }
  clearTimeout(this.timer);
  this.timer = setTimeout(() => {
    this.modal = Modal.error({
      zIndex: ZINDEX_NO_PERMISSION_MODAL,
      title: '权限不足',
      content: (
        <div>
          您没有该系统的访问权限，请联系管理员；
          <br />
          或者
          <em role="link" tabIndex="0">
            更换账号
          </em>
          再试；
        </div>
      ),
      onOk: () => Promise.reject(),
    });
  }, times);
}.bind({});

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return null;
  }

  const error = new Error(response.statusText);
  error.response = response;
  return error;
}

/**
 * [实际的使用中, 请使用 fetchGet 或 fetchPost
 *  下面的 TODO 都是需要在实际项目中根据需要选择/更改使用
 * ]
 * @method request
 * @param  {String} url     [包含: 主机, pathname, search, hash 等信息的 URL]
 * @param  {Object} options [其他可配置的参数(参见 whatwg-fetch), 如: headers]
 * @return {Promise}         [description]
 */
export default (url, options) =>
  fetch(url, options)
    .then(
      response => {
        const error = checkStatus(response);
        if (error) {
          return {
            error,
            // 服务器出错, 比如: 500
            code: HTTP_ERROR,
          };
        }
        const contentType = response.headers.get('Content-Type') || '';
        if (contentType.toLowerCase().indexOf('application/json') !== -1) {
          return response.json();
        }
        return {
          code: HTTP_CONTENT_TYPE,
          // 可能需要执行：
          // 1、response.blob()
          // 2、response.text()
          response,
        };
      },
      error => ({
        error,
        // 通信异常, 比如: 网络中断、跨域等
        code: HTTP_ERROR,
      }),
    )
    // 捕获其他所有报错, 保证之后的 then 可以只处理 resolve, 以 code 来判断请求结果
    .catch(error => ({ error, code: HTTP_ERROR }))
    .then(resp => {
      if (resp.code === HTTP_CONTENT_TYPE) {
        // 非 json 类型的响应，交由上层处理
        return resp.response;
      }
      if (resp.code === HTTP_ERROR) {
        httpError();
        return Promise.reject(resp.error);
      }
      if (resp.code === 0) {
        // 1、检查请求成功的标志
        return resp.data;
      }
      if (resp.error) {
        // 2、前端错误处理
        return Promise.reject(resp.error);
      }
      if (resp.code === 10404) {
        // 3、检查是否为用户未登录状态
        // 判断是否为 check-token 的请求,
        // 如果是, 则应交由调用层处理
        if (url.indexOf('/check-token') !== -1) {
          return resp;
        }
        // 如果否, 则应刷新页面(或提示用户登录)
        return { code: '未登录' };
      }
      if (resp.code === 40101) {
        // 3、检查是否有权限
        login401();
        return { code: '权限不足' };
      }
      // TODO 4、检查当前版本是否为最新版
      // TODO 5、检查其他状态码
      // TODO 6、未知异常
      return resp;
    });
