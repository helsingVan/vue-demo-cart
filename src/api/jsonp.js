/*
 * @name jsonp请求方法
 * @time 2017-10-24
 * @author fanguang
 */

 import jsonp from 'jsonp';

 // 格式化url参数
 function param(data) {
   let url = '';
   for(var k in data) {
   	  let value = data[k] !== undefined ? data[k] : '';
   	  url += '&' + encodeURIComponent(k) + '=' + encodeURIComponent(value);
   }
   return url ? url.substring(1): '';
 }

// jsonp请求方法
 export function jsonpRequest(url,data,option) {
   url += (url.indexOf('?') < 0 ? '?' : '&') + param(data);
   return new Promise((resolve,reject) => {
   	  jsonp(url,option,(err,data) => {
   	  	if(!err) {
   	  	  resolve(data);
   	  	}else {
   	  	  reject(err);
   	  	}
   	  })
   })
 }