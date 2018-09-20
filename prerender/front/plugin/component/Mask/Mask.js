/**
 * Author: Code Lai （赖传峰）
 * Email: codelai@staritgp.com
 * Date: 2017/1/16
 */
const { Component, PropTypes }=window.React;

export default class Mask extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    background: PropTypes.string,
    style: PropTypes.object,
  };

  static defaultProps = {
    visible: false,
    background: '#000',
    style: {},
  };

  render() {
    const { visible, background, style, ...rest }=this.props;
    return (
      <div
        {...rest}
        style={{ ...style, background }}
        className={`orion-mask ${visible && 'orion-mask-show'}`}
      ></div>
    );
  }
}

