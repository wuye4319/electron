/**
 * Author: Code Lai （赖传峰）
 * Email: codelai@staritgp.com
 * Desc: 获取滚动条的位置
 */
export default function getScrollOffsets(w = window) {
  if (w.pageXOffset !== null) {
    return [w.pageXOffset, w.pageYOffset];
  }

  const d = w.document;
  if (d.compatMode === 'CSS1Compat') {
    return [
      d.documentElement.scrollLeft,
      d.documentElement.scrollTop
    ];
  }

  return [d.body.scrollLeft, d.body.scrollTop];
}