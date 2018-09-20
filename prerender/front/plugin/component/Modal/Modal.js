/**
 * Author: Code Lai （赖传峰）
 * Email: codelai@staritgp.com
 */
import Button from '../Button';
import Mask from '../Mask';
import getValidValue from '../util/getValidValue';
const { Component, PropTypes }=window.React;
const { string, bool, func, node, oneOf, object }=PropTypes;

class ModalAlert extends Component {
  static version = '1.0.0';

  static typeValues = ['primary', 'success', 'warning', 'danger'];

  static propTypes = {
    type: oneOf(ModalAlert.typeValues),
    message: node,
    textStyle: object,
    center: bool,
    style: object,
    children: node,
  };

  static defaultProps = {
    type: 'primary',
    message: 'Please Enter Message',
    textStyle: {},
    center: false,
    style: {},
  };

  render() {
    const { type, message, textStyle, center, style, children, ...rest }=this.props;
    const validType = getValidValue(type, ModalAlert.typeValues);
    return (
      <div {...rest}
           style={{ ...style, textAlign: center ? 'center' : 'left' }}
           className={`orion-modal-alert orion-modal-alert-${validType}`}>
        <div>
          <i style={{ float: center ? 'none' : 'left' }}
             className="orion-modal-alert-icon"></i>
          <div
            style={textStyle}
            className={`orion-modal-alert-message ${! center && 'middle'}`}
          >{children ? children : message}</div>
        </div>
      </div>
    );
  }
}

export default class Modal extends Component {
  static Alert = ModalAlert;

  static propTypes = {
    title: string,
    type: oneOf(Modal.Alert.typeValues),
    children: node,
    visible: bool,//对话框是否可见
    closable: bool,//是否显示右上角的关闭按钮
    okText: string,
    onOk: func,
    onCancel: func,
    width: (props, propName, componentName) => {
      if (Number(props[propName]) > 1200) {
        return new Error(`width 不能超过1200，目前的值为：${props[propName]},componentName：${componentName}`);
      }
    },
    footer: node,
    maskClosable: bool,//点击蒙层是否允许关闭
  };

  static defaultProps = {
    type: 'primary',
    width: 760,
    closable: true,
    okText: '确定',
    maskClosable: true,
  };

  componentDidUpdate() {
    const { height }=this._modalContent.getBoundingClientRect();
    this._modal.style.height = `${height + ( height % 2 !== 0 ? 11 : 10)}px`;
  }

  render() {
    const {
      title,
      type,
      children,
      visible,
      closable,
      okText,
      onOk,
      onCancel,
      width,
      footer,
      maskClosable,
    }=this.props;
    const defaultType = getValidValue(type, Modal.Alert.typeValues);
    return (
      <div>
        <div
          ref={ref => this._modal = ref}
          className={`orion-modal ${visible && 'orion-modal-show'} orion-modal-${defaultType}`}
          style={{ width }}
        >
          <div className="orion-modal-bg"></div>
          <div
            className="orion-modal-content"
            ref={ref => this._modalContent = ref}
          >
            <div className="orion-modal-header">
              {title}
              {
                closable
                  ? <button
                    type="button"
                    className="orion-modal-close"
                    onClick={onCancel}><i></i></button>
                  : null
              }
            </div>
            <div className="orion-modal-body">
              {children}
            </div>
            <div className="orion-modal-footer">
              {footer ?
                footer :
                <Button
                  style={{ width: 160 }}
                  size="lg"
                  key="ok"
                  type={type}
                  onClick={onOk}
                  label={okText}
                />}
            </div>
          </div>
        </div>
        <Mask
          visible={visible}
          onClick={() => maskClosable ? onCancel() : null}
        />
      </div>
    );
  }
}