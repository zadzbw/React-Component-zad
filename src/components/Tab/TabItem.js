/**
 * Created by zad on 17/2/6.
 */
import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';
import {tabPrefix} from './Tab';

export default class TabItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.active
    };
  }

  static propTypes = {
    active: PropTypes.bool,
  };

  clearTimer = () => {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  };

  // 主要目的是解决多个TabItem内部如果有能够focus的element，键盘多次按下tab键时导致focus到下一个TabItem中的element的bug
  componentWillReceiveProps(nextProps) {
    const {animate, active} = nextProps;
    if (animate) {
      // 先clear
      this.clearTimer();
      if (active) {
        this.setState({
          active,
        });
      } else {
        // 如果下一次active为false，则等待300ms后再set，保证动画的连续性
        this.timer = setTimeout(() => {
          this.setState({
            active,
          });
        }, 300);
      }
    } else {
      // 如果无动画，则直接set
      this.setState({
        active,
      });
    }
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  render() {
    const {children} = this.props;
    const {active} = this.state;
    const itemClass = classNames(`${tabPrefix}-item`, {
      [`${tabPrefix}-item-active`]: active,
      [`${tabPrefix}-item-inactive`]: !active,
    });
    // 当active为false时，不显示children，以使得tab之间
    return (
      <div className={itemClass}>{active && children}</div>
    );
  }
}
