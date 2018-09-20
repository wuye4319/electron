/**
 * Author: Code Lai （赖传峰）
 * Email: codelai@staritgp.com
 * Desc: 带背景色的按钮
 */
import getValidValue from '../util/getValidValue';
const { Component, PropTypes }=window.React;

export default class Button extends Component {
  static version = '1.0.0';

  static sizeValues = ['xs', 'sm', 'md', 'lg'];

  static typeValues = ['primary', 'success', 'danger', 'warning'];

  static propTypes = {
    label: PropTypes.string,
    size: PropTypes.oneOf(Button.sizeValues),
    style: PropTypes.object,
    type: PropTypes.oneOf(Button.typeValues),
    disabled: PropTypes.bool,
    href: PropTypes.string,
  };

  static defaultProps = {
    label: 'Button',
    size: 'md',
    type: 'primary',
    disabled: false,
  };

  constructor() {
    super();
    this.classPrefix = 'orion-btn';
  }

  render() {
    const { href, label, size, type, disabled, ...rest }=this.props;
    const className = (() => {
      const btnSize = getValidValue(size, Button.sizeValues);
      const btnType = getValidValue(type, Button.typeValues);
      return `${this.classPrefix} ${this.classPrefix}-${btnSize} ${this.classPrefix}-${btnType}`
    })();

    return (
      href
        ?
        <a
          {...rest}
          href={href}
          className={`${className} ${disabled ? 'disabled' : ''}`}
        >{label}</a>
        :
        <button
          {...rest}
          className={className}
          disabled={disabled}
          type="button"
        >{label}</button>
    );
  }
}