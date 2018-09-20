/**
 * Author: Code Lai （赖传峰）
 * Email: codelai@staritgp.com
 * Desc:
 */
const { Component, PropTypes }=window.React;

class Item extends Component {
  static version = '1.0.0';

  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const { children, ...rest }=this.props;
    return (
      <li {...rest}>{children}</li>
    );
  }
}

export default class Menu extends Component {
  static Item = Item;

  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.node),
  };

  render() {
    const { children, ...rest }=this.props;
    return (
      <ul {...rest}>
        {children}
      </ul>
    );
  }
};