/**
 * Author: Code Lai （赖传峰）
 * Email: codelai@staritgp.com
 * Desc: 如果元素存在于数组中，则是返回元素，否则返回数组的第一个元素
 */

export default function getValidValue(value, array) {
  return array.indexOf(value) >= 0 ? value : array[0];
}
