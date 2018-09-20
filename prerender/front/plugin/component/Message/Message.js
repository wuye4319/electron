/**
 * Author: Code Lai （赖传峰）
 * Email: codelai@staritgp.com
 * Date: 2017/1/11
 * Desc: 轻提示组件
 */
import getValidValue from '../util/getValidValue';
const { Component, PropTypes }=window.React;
const { number, bool, oneOf, node }=PropTypes;

export default class Message extends Component {
  static typeValues = ['default', 'info', 'success', 'error', 'warning', 'loading'];

  static propTypes = {
    visible: bool,
    type: oneOf(Message.typeValues),
    top: number,
    content: node
  };

  static defaultProps = {
    visible: false,
    type: 'default',
    top: 60,
  };

  render() {
    const { visible, type, top, content }=this.props;
    const _type = `orion-message-${getValidValue(type, Message.typeValues)}`;
    const style = visible ? { top } : { top: - 50 };
    return (
      <div style={style}
           className={`orion-message ${_type}`}>
        {content}
      </div>
    );
  }
}