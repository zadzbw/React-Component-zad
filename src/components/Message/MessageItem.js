/**
 * Created by zad on 17/7/4.
 */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import { messagePrefix } from './Message';

export default class MessageItem extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    duration: PropTypes.number,
    onClose: PropTypes.func,
    itemClass: PropTypes.string,
    itemStyle: PropTypes.object,
  };

  static defaultProps = {
    duration: 1500,
    onClose: () => undefined,
  };

  componentDidMount() {
    const { duration, onClose } = this.props;
    // 如果为0，则一直显示
    if (duration !== 0) {
      this.closeTimer = setTimeout(() => {
        onClose();
        this.clearCloseTimer();
      }, duration);
    }
  }

  componentWillUnmount() {
    this.clearCloseTimer();
  }

  clearCloseTimer = () => {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  };

  render() {
    const { itemClass, itemStyle, children } = this.props;
    const itemCls = classNames({
      [`${messagePrefix}-item`]: true,
      [itemClass]: !!itemClass,
    });

    return (
      <div className={itemCls} style={itemStyle}>
        <div className={`${messagePrefix}-content-container`}>{children}</div>
      </div>
    );
  }
}
