/**
 * Author: Code Lai （赖传峰）
 * Email: codelai@staritgp.com
 * Desc: Tooltip 组件，工具提示
 */
import Prompt from '../Prompt';
const { Component, PropTypes, isValidElement }=window.React;
const { string, node, object, oneOf, bool }=PropTypes;

export default class Tooltip extends Component {
  static version = '1.0.0';

  static placementValues = ['top', 'right', 'bottom', 'left'];

  static propTypes = {
    title: node,
    placement: oneOf(Tooltip.placementValues),
    children: node,
    container: object,
    disabled: bool,
    className: string,
    style: object,
  };

  static defaultProps = {
    children: <span>Tooltip</span>,
    container: document.body,
    disabled: false,
  };

  getPopupDomNode = () => this._prompt.getPopupDomNode();

  render() {
    const { children }=this.props;
    const child = isValidElement(children)
      ? children
      : <span>{children}</span>;

    return (
      <Prompt
        {...this.props}
        content={this.props.title}
        ref={ref => this._prompt = ref}
      >
        {child}
      </Prompt>
    );
  }
}

