/**
 * Author: Code Lai （赖传峰）
 * Email: codelai@staritgp.com
 * Desc: 幽灵按钮
 */
import Button from '../Button/Button';

export default class GhostButton extends Button {
  static version = '0.0.1';

  static defaultProps = {
    label: 'Button',
    size: 'md',
    type: 'primary',
    disabled: false,
  };

  constructor() {
    super();
    this.classPrefix = 'orion-ghost-btn'
  }
};