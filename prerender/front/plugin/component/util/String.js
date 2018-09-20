/**
 * Author: Code Lai （赖传峰）
 * Email: codelai@staritgp.com
 * Date: 2017/1/19
 */
String.prototype.format = function format(...args) {
  try {
    const length = args.length;
    if (length === 0) return this;
    let _this = this;
    for (let i = 0; i < length; i ++) {
      _this = _this.replace(new RegExp(`\\{${i}\\}`, 'g'), args[i]);
    }
    return _this;
  } catch (e) {
    console.warn(e);
    return this;
  }
};

String.prototype.splitAt = function splitAt(index, options = { split: '{-}' }) {
  const splitArr = this.split(options.split);
  return splitArr[index] ? splitArr[index] : this;
};

export default String;