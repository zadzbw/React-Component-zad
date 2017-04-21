/**
 * Created by zad on 17/4/20.
 */
import React, {Component, PropTypes, Children} from 'react';
import Animate from 'rc-animate';
import classNames from 'classnames';
import _isFunction from 'lodash/isFunction';
import isOneOf from '../../utils/isOneOf';
import keyCode from '../../utils/keyCode';
import {rightShift} from '../../utils/array_shift';
import chainFunc from '../../utils/chainFunc';
import Icon from '../Icon';

const carouselClass = 'zad-carousel';

export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      prevCurrent: this.getChildrenLength() - 1,
      hover: false,
    };
  }

  static propTypes = {
    showDots: PropTypes.bool,
    showNav: PropTypes.bool,
    onPageChange: PropTypes.func,
    auto: PropTypes.bool,
  };

  static defaultProps = {
    showDots: true,
    showNav: true,
    onPageChange: () => undefined,
    auto: false,
  };

  getChildrenLength = () => {
    return this.props.children.length;
  };

  // [0, 1, 2, -1]
  getPositionArray = () => {
    const result = [];
    const len = this.getChildrenLength();
    for (let i = 0; i < len - 1; i++) {
      result.push(i);
    }
    result.push(-1);
    return result;
  };

  setCurrent = (v) => {
    const {current} = this.state;
    const {onPageChange} = this.props;
    if (v !== current) {
      // 先stop，再start
      this.stopAuto();
      this.startAuto();
      this.setState({
        current: v,
        prevCurrent: current,
      });
      if (_isFunction(onPageChange)) {
        onPageChange({
          current: v,
          prevCurrent: current,
        });
      }
    }
  };

  autoPlay = () => {
    const {auto} = this.props;
    if (!auto) {
      return;
    }
    const len = this.getChildrenLength();
    const {current} = this.state;
    if (current < len - 1) {
      this.setState({
        current: current + 1,
        prevCurrent: current,
      });
    } else {
      this.setState({
        current: 0,
        prevCurrent: len - 1,
      });
    }
    this.timer = setTimeout(this.autoPlay, 4000);
  };

  componentDidMount() {
    this.startAuto();
  }

  componentWillUnmount() {
    this.stopAuto();
  }

  stopAuto = () => {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.startTimer) {
      clearTimeout(this.startTimer);
      this.startTimer = null;
    }
  };

  startAuto = () => {
    if (this.startTimer) {
      clearTimeout(this.startTimer);
      this.startTimer = null;
    }
    this.startTimer = setTimeout(this.autoPlay, 4000);
  };

  getNextCurrent = (flag = true) => {
    const {current} = this.state;
    const len = this.getChildrenLength();
    if (flag) {
      return (current + 1) % len;
    } else {
      return (current + len - 1) % len;
    }
  };

  doKeyDown = (e) => {
    if (isOneOf([keyCode.LEFT, keyCode.UP], e.keyCode)) {
      e.preventDefault();
      const prevCurrent = this.getNextCurrent(false);
      this.setCurrent(prevCurrent);
    } else if (isOneOf([keyCode.RIGHT, keyCode.DOWN], e.keyCode)) {
      e.preventDefault();
      const nextCurrent = this.getNextCurrent(true);
      this.setCurrent(nextCurrent);
    }
  };

  // 不用lodash.throttle的原因是无法异步获取event，且改变state后，重新render，使节流失效
  throttleKeyDown = () => {
    let start = +new Date();
    return (e) => {
      const now = +new Date();
      if (now - start > 400) {
        this.doKeyDown(e);
        start = now;
      }
    };
  };

  getItems = () => {
    const {children} = this.props;
    const {current, prevCurrent} = this.state;
    const positionArray = rightShift(this.getPositionArray(), current);
    return Children.map(children, (child, i) => {
      const itemClass = classNames({
        [`${carouselClass}-item`]: true,
        [`${carouselClass}-item-active`]: current === i,
      });
      const position = positionArray[i];
      const min = Math.min(current, prevCurrent);
      const max = Math.max(current, prevCurrent);
      return React.cloneElement(child, {
        className: itemClass,
        style: {
          transform: `translate3d(${ position * 100}%, 0px, 0px)`,
          transitionDuration: (min <= i && i <= max) ? '400ms' : '0ms',
        }
      });
    });
  };

  getDots = () => {
    const {children} = this.props;
    const {current} = this.state;
    return Children.map(children, (child, i) => {
      const dotClass = classNames({
        [`${carouselClass}-dot`]: true,
        [`${carouselClass}-dot-active`]: current === i,
      });
      return (
        <li className={dotClass}>
          <button onClick={this.setCurrent.bind(this, i)}/>
        </li>
      );
    });
  };

  clickNav = (left) => {
    if (left) {
      const prevCurrent = this.getNextCurrent(false);
      this.setCurrent(prevCurrent);
    } else {
      const nextCurrent = this.getNextCurrent(true);
      this.setCurrent(nextCurrent);
    }
  };

  throttleClickNav = (left) => {
    let start = +new Date();
    return () => {
      const now = +new Date();
      if (now - start > 400) {
        this.clickNav(left);
        start = now;
      }
    };
  };

  getNavClass = (left) => {
    return classNames(`${carouselClass}-nav`, {
      [`${carouselClass}-nav-left`]: left,
      [`${carouselClass}-nav-right`]: !left,
    });
  };

  _hover = () => {
    const {showNav} = this.props;
    if (showNav) {
      this.setState({
        hover: true,
      });
    }
  };

  _blur = () => {
    const {showNav} = this.props;
    if (showNav) {
      this.setState({
        hover: false,
      });
    }
  };

  getNav = (left) => {
    const {hover} = this.state;
    if (hover) {
      return (
        <div
          className={this.getNavClass(left)}
          onClick={this.throttleClickNav(left)}
        >
          <Icon name={left ? 'angle-left' : 'angle-right'}/>
        </div>
      );
    }
    return null;
  };

  render() {
    const {showDots, showNav} = this.props;
    const enterFunc = chainFunc(this._hover, this.stopAuto);
    const leaveFunc = chainFunc(this._blur, this.startAuto);
    return (
      <div
        className={`${carouselClass}-wrapper`}
        tabIndex="0"
        onKeyDown={this.throttleKeyDown()}
        onMouseEnter={enterFunc}
        onMouseLeave={leaveFunc}
      >
        <div className={`${carouselClass}-content`}>
          {this.getItems()}
        </div>
        {
          showNav &&
          <Animate transitionName="move-left">
            {this.getNav(true)}
          </Animate>
        }
        {
          showNav &&
          <Animate transitionName="move-right">
            {this.getNav(false)}
          </Animate>
        }
        {
          showDots &&
          <ul className={`${carouselClass}-dots`}>
            {this.getDots()}
          </ul>
        }
      </div>
    );
  }
}
