/**
 * Author: Code Lai
 * Email: codelai@staritgp.com
 */
import Prompt from '../Prompt/';
const { Component, PropTypes }=window.React;
const { number, string, func, bool, arrayOf, oneOfType, shape }=PropTypes;

class Option extends Component {
  static version = '0.0.1';

  static propTypes = {
    children: string.isRequired,
    value: string,
  };

  render() {
    const { value, children }=this.props;
    return (
      <li value={value ? value : children}>{children}</li>
    );
  }
}

export default class AutoComplete extends Component {
  static version = '0.0.1';

  static propTypes = {
    dataSource: arrayOf(shape({
      value: oneOfType([string, number]),
      label: oneOfType([string, number]).isRequired,
    })).isRequired,
    value: oneOfType([string, number]),
    onChange: func,//选中 option，或 input 的 value 变化时，调用此函数 (value)=>{}
    onSelect: func,//被选中时调用，参数为选中项的 value 值 (value, option)=>{}
    disabled: bool,
    placeholder: string,
    container: PropTypes.object,
    style: PropTypes.object,//下拉列表的 style 属性
  };

  static defaultValue = {
    disabled: false,
    container: document.body
  };
}