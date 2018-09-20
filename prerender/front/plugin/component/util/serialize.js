/**
 * Author: Code Lai （赖传峰）
 * Email: codelai@staritgp.com
 * Desc:
 */
export default function serialize(obj, encode) {
  if (obj.constructor !== Object) {
    console.error('传入的值必须是对象');//eslint-disable-line
    return '';
  }
  const serializeArr = [];
  (function iteration(obj, key) {//eslint-disable-line
    for (const ele in obj) {
      if (! obj.hasOwnProperty(ele)) continue;
      (() => {
        const itemKey = key ? key + '[' + ele + ']' : ele;
        if (obj[ele].constructor === Object) {
          iteration(obj[ele], key);
        } else if (obj[ele].constructor === Array) {
          for (let i = obj[ele]; i --;) {
            serializeArr.push(itemKey + '[]=' + obj[ele][i]);
          }
        } else {
          serializeArr.push(itemKey + '=' + obj[ele]);
        }
      })(obj, key);
    }
  })(obj);
  return encode ? encodeURIComponent(serializeArr.join('&')) : serializeArr.join('&');
};