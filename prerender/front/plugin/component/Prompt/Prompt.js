/**
 * Author: Code Lai （赖传峰）
 * Email: codelai@staritgp.com
 * Desc: 提示组件
 */
import Popup from './Popup';
import getValidValue from '../util/getValidValue';
import getScrollOffsets from '../util/getScrollOffsets';
import toggleClass  from '../util/toggleClass';
const React = window.React;
const { render, findDOMNode }=window.ReactDOM;
const { Component, PropTypes, isValidElement }=window.React;
const { node, string, oneOf, object, bool }=PropTypes;

export default class Prompt extends Component {
  static version = '1.0.0';

  static placementValues = ['top', 'right', 'bottom', 'left'];

  static triggerValues = ['hover', 'click'];

  static propTypes = {
    content: node,
    trigger: oneOf(Prompt.triggerValues),
    placement: oneOf(Prompt.placementValues),
    children: node,
    container: object,
    disabled: bool,
    className: string,
    style: object,
  };

  static defaultProps = {
    content: 'Prompt Text',
    placement: 'top',
    trigger: 'hover',
    container: document.body,
  };

  getPopupDomNode = () => this._popup._domNode;

  /**
   * 获取 Prompt 四边中点的定位信息 [left,top]，
   * @return {[*,*,*,*]} topCenter, rightCenter, bottomCenter, leftCenter
   */
  getPromptLocate = () => {
    const { top, left, height, width }=findDOMNode(this).getBoundingClientRect();
    return [
      {
        top,
        left: left + width / 2,
      },
      {
        top: top + height / 2,
        left: left + width,
      },
      {
        top: top + height,
        left: left + width / 2,
      },
      {
        top: top + height / 2,
        left,
      }
    ];
  };

  /**
   * 计算 Popup 定位，并给值
   */
  setPopupLocate = () => {
    const popupNode = this.getPopupDomNode();
    const [topCenter, rightCenter, bottomCenter, leftCenter]=this.getPromptLocate();
    const { top, left, height, width }=popupNode.getBoundingClientRect();

    const location = {};
    switch (getValidValue(this.props.placement, Prompt.placementValues)) {
      case 'top': {
        const { top, left }=topCenter;
        location.top = top - height;
        location.left = left - width / 2;
        break;
      }
      case 'right': {
        const { top, left }=rightCenter;
        location.top = top - height / 2;
        location.left = left;
        break;
      }
      case 'bottom': {
        const { top, left }=bottomCenter;
        location.top = top;
        location.left = left - width / 2;
        break;
      }
      case 'left': {
        const { top, left }=leftCenter;
        location.top = top - height / 2;
        location.left = left - width;
        break;
      }
    }
    const [scrollX, scrollY] = getScrollOffsets();
    popupNode.style.left = `${location.left + scrollX}px`;
    popupNode.style.top = `${location.top + scrollY}px`;
  };

  popupShow = () => {
    const { container, disabled, ...rest }=this.props;
    if (disabled) return;
    if (! this._popup) {
      const promptContainer = document.createElement('div');
      container.appendChild(promptContainer);
      render(
        <Popup
          ref={ref => this._popup = ref}
          {...rest}
        />,
        promptContainer,
        () => {
          this.getPopupDomNode().parentNode.addEventListener('mouseenter', this.popupShow);
          this.getPopupDomNode().parentNode.addEventListener('mouseleave', this.popupHide);
        }
      );
    } else {
      if (isValidElement(this.props.content) || Array.isArray(this.props.content)) {
        /** 如果传入的是 Element,或者 Element 组成的数组 **/
        // render(this.props.content, this._popup._content);
      } else if (this._popup._content.innerHTML !== this.props.content) {
        /** 如果传入的提示文字有修改，则修改组件中的提示文字 **/
        this._popup._content.innerHTML = this.props.content;
      }
    }

    /** 每次显示都重新计算 Popup 的位置 **/
    this.setPopupLocate();
    toggleClass(this.getPopupDomNode(), 'orion-prompt-show', true);
  };

  popupHide = () => {
    if (this.props.disabled) return;
    toggleClass(this.getPopupDomNode(), 'orion-prompt-show', false);
  };

  getTriggerEventType = () => {
    const validTrigger = getValidValue(this.props.trigger, Prompt.triggerValues);
    return validTrigger === 'hover'
      ? ['mouseenter', 'mouseleave']
      : ['click', 'blur'];
  };

  componentDidMount() {
    findDOMNode(this).addEventListener('mouseenter', this.popupShow);
    findDOMNode(this).addEventListener('mouseleave', this.popupHide);
  };

  render() {
    const { children }=this.props;
    return (children);
  };
}