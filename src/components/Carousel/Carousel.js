/**
 * Created by zad on 17/4/20.
 */
import React, {Component, Proptypes, Children} from 'react';
import classNames from 'classnames';
import isOneOf from '../../utils/isOneOf';
import keyCode from '../../utils/keyCode';

const carouselClass = 'zad-carousel';

export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  setCurrent = (v) => {
    const {current} = this.state;
    if (v !== current) {
      this.setState({
        current: v,
      });
    }
  };

  getNextCurrent = (flag = true) => {
    const {current} = this.state;
    const len = this.props.children.length;
    if (flag) {
      return (current + 1) % len;
    } else {
      return (current + len - 1) % len;
    }
  };

  _keyDown = (e) => {
    const code = e.keyCode;
    if (isOneOf([keyCode.LEFT, keyCode.UP], code)) {
      e.preventDefault();
      const prevCurrent = this.getNextCurrent(false);
      this.setCurrent(prevCurrent);
    } else if (isOneOf([keyCode.RIGHT, keyCode.DOWN], code)) {
      e.preventDefault();
      const nextCurrent = this.getNextCurrent(true);
      this.setCurrent(nextCurrent);
    }
  };

  getItems = () => {
    const {children} = this.props;
    const {current} = this.state;
    return Children.map(children, (child, i) => {
      const itemClass = classNames({
        [`${carouselClass}-item`]: true,
        [`${carouselClass}-item-active`]: current === i,
      });
      return React.cloneElement(child, {
        className: itemClass,
        style: {
          transform: `translateX(${(i - current) * 100}%)`,
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

  render() {
    return (
      <div className={`${carouselClass}-wrapper`} tabIndex="0" onKeyDown={this._keyDown}>
        <div className={`${carouselClass}-content`}>
          {this.getItems()}
        </div>
        <div className={`${carouselClass}-nav`}>

        </div>
        <ul className={`${carouselClass}-dots`}>
          {this.getDots()}
        </ul>
      </div>
    );
  }
}
