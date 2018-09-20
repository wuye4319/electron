/**
 * Author: Code Lai （赖传峰）
 * Email: codelai@staritgp.com
 * Date: 2016/12/21
 */
const { Component, PropTypes }=window.React;

export default class Loading extends Component {
  static version = '1.0.0';

  static propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    src: PropTypes.string,
    style: PropTypes.object,
  };

  static defaultProps = {
    width: '100%',
    height: 200,
    src: '/cn/source/img/orion/loading_normal_62.gif',
    style: {},
  };

  render() {
    const { width, height, src, style }=this.props;
    const inlineStyle = {
      margin: 'auto',
      width,
      height,
      background: `url(${src}) center no-repeat`,
      ...style
    };
    return (
      <div style={inlineStyle}></div>
    );
  }
}