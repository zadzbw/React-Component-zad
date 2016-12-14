/**
 * Created by zad on 16/12/13.
 */
import React, {PropTypes, Component} from 'react';
import Animate from 'rc-animate';
import classNames from 'classnames';
import _omit from 'lodash/omit';
import getScroll from '../../utils/getScroll';
import Motion from '../../utils/Motion';
import Icon from '../Icon';

import './ToTop.less';

function quarticInOut(t, start, end, duration) {
  const diff = end - start;
  // 归一化
  t = t / duration;
  return start + diff * Motion.quarticInOut(t);
}

export default class ToTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    this._scrollToTop = this._scrollToTop.bind(this);
    this._setTopValue = this._setTopValue.bind(this);
    this._listenScroll = this._listenScroll.bind(this);
  }

  static propTypes = {
    triggerHeight: PropTypes.number,
    duration: PropTypes.number,
    target: PropTypes.func,
    onClick: PropTypes.func
  };

  static defaultProps = {
    triggerHeight: 300,
    duration: 400,
    target: () => window,
    onClick: () => undefined
  };

  _scrollToTop(e) {
    if (window.requestAnimationFrame) {
      let start = null;
      const {duration, target} = this.props;
      // 获取 target 的滚动高度
      const scrollTop = getScroll(target()).top;
      const step = (now) => {
        if (!start) {
          start = now;
        }
        const diff = now - start;
        this._setTopValue(quarticInOut(diff, scrollTop, 0, duration));
        if (diff < duration) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    } else {
      window.scroll(0, 0);
    }
    this.props.onClick(e);
  }

  _setTopValue(value) {
    const target = (this.props.target)();
    if (target === window) {
      document.body.scrollTop = value; // Safari and Chrome
      document.documentElement.scrollTop = value; // Firefox Opera and IE
    } else if (target instanceof HTMLElement) {
      target.scrollTop = value;
    }
  }

  _listenScroll() {
    const {triggerHeight, target} = this.props;
    const scrollTop = getScroll(target()).top;
    this.setState({
      visible: scrollTop > triggerHeight
    });
  }

  componentDidMount() {
    const {target} = this.props;
    target().addEventListener('scroll', this._listenScroll, false);
  }

  componentWillUnmount() {
    const {target} = this.props;
    target().removeEventListener('scroll', this._listenScroll, false);
  }

  render() {
    const {className, children, ...rest} = this.props;
    const props = _omit(rest, ['duration', 'target', 'triggerHeight', 'onClick']);
    const defaultContent = (
      <div className="zad-to-top-content">
        <Icon className="zad-to-top-icon" name={'arrow-up'}/>
      </div>
    );
    const toTopClass = classNames('zad-to-top', className);

    const toTopBtn = !this.state.visible ? null : (
      <div {...props} className={toTopClass} onClick={this._scrollToTop}>
        {children || defaultContent}
      </div>
    );

    return (
      <Animate transitionName="zoom">
        {toTopBtn}
      </Animate>
    );
  }
}
