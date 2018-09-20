/**
 * Author: Code Lai （赖传峰）
 * Email: codelai@staritgp.com
 * Desc: 深复制对象
 */

export default function deepClone(obj) {
  let str;
  let newObj = obj.constructor === Array ? [] : {};
  if (typeof obj !== 'object') {
    return;
  } else if (window.JSON) {
    str = JSON.stringify(obj); //系列化对象
    newObj = JSON.parse(str); //还原
  } else {
    for (const i in obj) {
      if (! obj.hasOwnProperty(i)) continue;
      newObj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i];

    }
  }
  return newObj;
};