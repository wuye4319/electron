/**
 * Author: Code Lai （赖传峰）
 * Email: codelai@staritgp.com
 * Date: 2017/1/3
 */

/** 与服务器通信失败，网络链接失败等错误 **/
export default class NetworkError extends Error {
  constructor(message = 'NetworkError Message') {
    super();
    this.name = 'NetworkError';
    this.message = message;
  }
}
