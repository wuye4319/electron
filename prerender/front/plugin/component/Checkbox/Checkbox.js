/**
 * Author: Code Lai （赖传峰）
 * Email: codelai@staritgp.com
 * Date: 2017/1/3
 */
const { Component, PropTypes }=window.React;
const { bool, func, string, node, object }=PropTypes;
export default class Checkbox extends Component {
  static version = '1.0.0';

  static propTypes = {
    checked: bool,
    onChange: func,
    children: node,
    label: string,
    style: object,
  };

  static defaultProps = {
    onChange: () => {},
  };

  render() {
    const { checked, onChange, children, label, style, ...rest }=this.props;
    return (
      <label
        className="orion-checkbox"
        style={style}
      >
        <input
          {...rest}
          type="checkbox"
          className="orion-checkbox-ele"
          checked={checked}
          onChange={onChange}
        />
        <div className="orion-checkbox-label"/>
        {label || children}
      </label>
    );
  }
}