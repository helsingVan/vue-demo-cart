/*
 * @name 首页请求数据方法
 * @time 2017-10-24
 * @author fanguang
 */

import { jsonpRequest } from './jsonp';
import { commonParams, options } from './config';


// 首页banner数据请求方法
export function getSlider() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  });

  return jsonpRequest(url, data, options);
}