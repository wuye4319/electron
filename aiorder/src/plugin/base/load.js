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
    // domain: domain,
    // apiURL: '//www.' + domain + '/api/',
    //apiURL: "/api/", //同域接口(或配置了反向代理)
    // apiURL_login: '//login.' + domain
  }

  /** js **/
  document.write('<script src="' + pluginPATH + 'react.production.min.js" type="text/javascript"></sc' + 'ript>')
  document.write('<script src="' + pluginPATH + 'react-dom.production.min.js" type="text/javascript"></sc' + 'ript>')
  if (typeof Promise !== 'function') {
    document.write('<script src="' + pluginPATH + 'es6-promise.min.js" type="text/javascript"></sc' + 'ript>')
  }
  if (typeof fetch !== 'function') {
    document.write('<script src="' + pluginPATH + 'fetch.min.js" type="text/javascript"></sc' + 'ript>')
  }
})()
