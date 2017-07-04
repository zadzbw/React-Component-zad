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
  };

  static defaultProps = {
    duration: 1500,
    onClose: () => undefined,
  };

  componentDidMount() {
    const { duration, onClose } = this.props;
    this.closeTimer = setTimeout(() => {
      onClose();
      this.clearCloseTimer();
    }, duration);
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
    const { className, children } = this.props;
    const itemCls = classNames({
      [`${messagePrefix}-item`]: true,
      [className]: !!className,
    });

    return (
      <div className={itemCls}>
        <div className={`${messagePrefix}-content-container`}>{children}</div>
      </div>
    );
  }
}
