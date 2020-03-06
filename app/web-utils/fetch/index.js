import _ from 'lodash';

import { lstoreGet } from '../store/local-storage';
import { jsonStringify, hashStringify } from '../native';
import request from './request';

const { HOST_API } = process.env.app;

/**
 * [Post 类型接口, 默认发送数据类型为 body(application/json) 类型]
 * @method fetchGet
 * @param  {String} [pathname='/']                  [请求的 pathname]
 * @param  {Object} data                            [请求的数据, 默认采用 application/json 的方式放在 body 中]
 * @param  {Object} [options={}]                    [其他可配置的参数(参见 whatwg-fetch), 如: headers]
 * @param  {String} [host='http://127.0.0.1:7000']  [请求的主机(可含端口号)]
 * @return {Promise}                                 [description]
 */
export const fetchGet = (
  pathname = '/',
  data,
  options = {},
  host = HOST_API,
) => {
  const user = lstoreGet('user') || {};
  let search = hashStringify(data);
  search = search ? `?${search}` : '';

  return request(
    `${host}${pathname}${search}`,
    _.merge(
      {
        method: 'GET',
        // 解决跨域
        // credentials: 'include',
        headers: {
          version: '1.0.0',
          'user-id': user.id || 0,
          'user-token': user.token || 'QQ',
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      },
      options,
    ),
  );
};

/**
 * [Get 类型接口, 默认发送数据类型为 hash(search) 类型]
 * @method fetchPost
 * @param  {String}  [pathname='/']                 [请求的 pathname]
 * @param  {Object}  data                           [请求的数据, 默认采用 hash(search) 的方式拼接在 pathname 中]
 * @param  {Object}  [options={}]                   [其他可配置的参数(参见 whatwg-fetch), 如: headers]
 * @param  {String}  [host='http://127.0.0.1:7000'] [请求的主机(可含端口号)]
 * @return {Promise}                                [description]
 */
export const fetchPost = (
  pathname = '/',
  data,
  options = {},
  host = HOST_API,
) => {
  const user = lstoreGet('user') || {};
  const body = jsonStringify(data) || '';

  return request(
    `${host}${pathname}`,
    _.merge(
      {
        method: 'POST',
        // 解决跨域
        // credentials: 'include',
        headers: {
          version: '1.0.0',
          'user-id': user.id || 0,
          'user-token': user.token || 'QQ',
          'content-type': 'application/json; charset=UTF-8',
        },
        body,
      },
      options,
    ),
  );
};
