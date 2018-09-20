/**
 * Author: Code Lai （赖传峰）
 * Email: codelai@staritgp.com
 * Date: 2017/1/6
 */
/**
 * 为添加添加尺寸限制参数，减小图片传输体积
 * @param link {String} 图片链接
 * @param size {Number} 目标尺寸
 */
export default function addSizeToLink(link, size) {
  return link.replace(/^(.*)(\.[a-zA-Z]+)$/, `$1$2_${size}x${size}$2`);
}