/**
 * Author: Code Lai （赖传峰）
 * Email: codelai@staritgp.com
 * Desc: 弹出框
 */
import  getValidValue  from '../util/getValidValue';
const { Component, PropTypes }=window.React;
const { node, oneOf, func, string, object }=PropTypes;

export default class Popup extends Component {
  static version = '1.0.0';

  static placementValues = ['top', 'right', 'bottom', 'left'];

  static propTypes = {
    content: node,
    placement: oneOf(Popup.placementValues),
    onClick: func,
    className: string,
    style: object,
  };

  static defaultProps = {
    onClick: () => {},
    className: '',
    style: {}
  };

  render() {
    const { content, placement, onClick, className, style }=this.props;
    const placementClassName = (() => {
      return `orion-prompt-placement-${getValidValue(placement, Popup.placementValues)}`;
    })();
    return (
      <div>
        <div
          ref={ref => this._domNode = ref}
          onClick={onClick}
          className={`orion-prompt ${placementClassName} ${className}`}
        >
          <div className="orion-prompt-content">
            <div className="orion-prompt-arrow"></div>
            <div
              ref={ref => this._content = ref}
              className={`orion-prompt-inner`}
              style={style}
            >{content}</div>
          </div>
        </div>
      </div>
    );
  }
}