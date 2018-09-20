/**
 * Author: Code Lai （赖传峰）
 * Email: codelai@staritgp.com
 * Date: 2016/12/26
 */
Array.prototype._orion_add = function (data) {
  if (this && this.indexOf(data) < 0) {
    this.push(data);
    return true;
  }
  return false;
};
Array.prototype._orion_remove = function (data) {
  if (! this) return false;
  const pos = this.indexOf(data);
  if (pos > - 1) {
    this.splice(pos, 1);
    return true;
  }
  return false;
};

export default Array;