/**
 * Author: Code Lai （赖传峰）
 * Email: codelai@staritgp.com
 * Date: 2017/2/15
 */
/**
 * 将图的尺寸压缩成指定宽高缩略图
 * @param url {string} 图片地址
 * @param width {number}
 * @param height {number}
 */
export default function resizeImg(url, width = 78, height = 78) {
  return url ? `${url}?x-oss-process=image/resize,m_fill,w_${width},h_${height}` : url;
}