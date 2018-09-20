/**
 * Author: Code Lai （赖传峰）
 * Email: codelai@staritgp.com
 */
export default function toggleClass(element, className, add) {
  const classNameList = element.className;
  const classArr = classNameList.split(' ');
  const showClassIndex = classArr.indexOf(className);
  if (add) {
    if (showClassIndex >= 0) return;
    element.className = `${classNameList} ${className}`;
  } else {
    if (showClassIndex < 0) return;
    element.className =
      [
        ...classArr.splice(0, showClassIndex),
        ...classArr.slice(showClassIndex)
      ].join(' ');
  }
}