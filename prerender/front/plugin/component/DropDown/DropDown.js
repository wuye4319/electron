/**
 * Author: Code Lai （赖传峰）
 * Email: codelai@staritgp.com
 * Desc: Dropdown 下拉菜单组件
 */
import Prompt from '../Prompt';
const { Component, PropTypes }=window.React;
import  getValidValue  from '../util/getValidValue';


export default class DropDown extends Component {
  static version = '1.0.0';

  static placementValues = ['bottom', 'top',];

  static triggerValues = ['hover', 'click'];

  static PropTypes = {
    menu: PropTypes.arrayOf(PropTypes.node),
    trigger: PropTypes.arrayOf(DropDown.triggerValues),
    placement: PropTypes.oneOf(DropDown.placementValues),
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.element]),
    container: PropTypes.object,
  };

  render() {
    const { menu, placement, children }=this.props;
    return (
      <Prompt
        {...this.props}
        placement={getValidValue(placement, DropDown.placementValues)}
        content={menu}
      >
        {children}
      </Prompt>
    );
  }
}