/** loadjs loading source of page
 * author nero
 * Interceptor of frontend
 */
(function () {
  /** common path **/
  var pluginPATH = '/plugin/base/'

  /** supervar **/
  window.supervar = {
    imgsrc: '../source/img/'
  }

  /** js **/
  document.write('<script src="' + pluginPATH + 'react.production.min.js" type="text/javascript"></sc' + 'ript>')
  document.write('<script src="' + pluginPATH + 'react-dom.production.min.js" type="text/javascript"></sc' + 'ript>')
})()
