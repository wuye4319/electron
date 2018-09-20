/**
 * Author: Code Lai （赖传峰）
 * Email: codelai@staritgp.com
 * Date: 2017/1/12
 */
import NetworkError from './NetworkError';

/**
 *
 * @param state 数字表示的状态
 * @param lang 语言版本 cn | en
 * @param msg 错误消息
 */
export default function fetchFail({ state, lang, msg }) {
  if (state === 10008) {
    location.href = window.supervar.util.loginUrl(lang);
  } else {
    throw new NetworkError(msg);
  }
}