/**
 * Created by zad on 17/2/6.
 */
import React, {PropTypes, Component, Children} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import _findIndex from 'lodash/findIndex';
import isOneOf from '../../utils/isOneOf';
import validChild from './validChild';
import keyCode from '../../utils/keyCode';
import TabItem from './TabItem';
import TabBar from './TabBar';

const _type = {
  type: ['card', 'inline'],
};
export const tabPrefix = 'zad-tab';

class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'current' in this.props ? this.props.current : this.getCurrent(),
      bottomStyle: {},
      contentStyle: {},
    };
    this._tabChange = this::this._tabChange;
    this.getInfo = this::this.getInfo;
    this.setStyle = this::this.setStyle;
  }

  static propTypes = {
    current: PropTypes.string,
    defaultCurrent: PropTypes.string,
    onTabChange: PropTypes.func,
    type: PropTypes.oneOf(['card', 'inline']),
    animation: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
  };

  static defaultProps = {
    onTabChange: (current) => undefined,
    type: 'card',
    animation: true,
  };

  componentWillReceiveProps(nextProps) {
    if ('current' in nextProps) {
      this.setState({
        current: nextProps.current,
      }, () => this.setStyle());
    }
  }

  componentDidMount() {
    this.setStyle(true);
  }

  // 排除非法的current
  getCurrent = () => {
    const props = this.props;
    const {children} = props;
    const keys = Children.map(children, child => child.props._key);
    if ('defaultCurrent' in props) {
      const {defaultCurrent} = props;
      if (!isOneOf(keys, defaultCurrent)) {
        return keys[0];
      }
      return defaultCurrent;
    }
    return keys[0];
  };

  _tabChange(key) {
    const {current} = this.state;
    const isChange = current !== key;
    if (isChange) {
      if (!('current' in this.props)) {
        this.setState({
          current: key,
        }, () => this.setStyle());
      }
      this.props.onTabChange(key);
    }
  }

  getInfo() {
    const {children} = this.props;
    const {current} = this.state;
    const keys = Children.map(children, child => child.props._key);
    const index = _findIndex(keys, (key) => key === current);
    return {
      index,
      keys,
    };
  }

  getAnimation = () => {
    const {animation} = this.props;
    switch (animation) {
      case true:
        return {
          bottomBar: true,
          tabContent: true,
        };
      case false:
        return {
          bottomBar: false,
          tabContent: false,
        };
      default:
        return {
          bottomBar: !!animation.bottomBar,
          tabContent: !!animation.tabContent,
        };
    }
  };

  setStyle(isFirst = false) {
    const animate = this.getAnimation();
    const activeIndex = this.getInfo().index;
    const tabBarElm = ReactDOM.findDOMNode(this[`TabBar-${activeIndex}`]);
    if (!tabBarElm) {
      return;
    }
    const tabBarRect = tabBarElm.getBoundingClientRect();
    const barsWrapRect = this.barsWrap.getBoundingClientRect();
    const bottomOffset = tabBarRect.left - barsWrapRect.left + 1; // 1px border on left side
    const contentOffset = -100 * activeIndex;

    const bottomStyle = {
      width: tabBarRect.width - 2, // 1px border on both sides
      transform: `translateX(${bottomOffset}px)`,
      WebkitTransform: `translateX(${bottomOffset}px)`,
      transition: !isFirst && animate.bottomBar && 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)'
    };
    const contentStyle = {
      transform: `translateX(${contentOffset}%)`,
      WebkitTransform: `translateX(${contentOffset}%)`,
      transition: !isFirst && animate.tabContent && 'transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)'
    };
    this.setState({
      bottomStyle,
      contentStyle,
    });
  }

  _keyDown = (e) => {
    const code = e.keyCode;
    if (isOneOf([keyCode.LEFT, keyCode.UP], code)) {
      e.preventDefault();
      const prevKey = this.getNextKey(false);
      this._tabChange(prevKey);
    } else if (isOneOf([keyCode.RIGHT, keyCode.DOWN], code)) {
      e.preventDefault();
      const nextKey = this.getNextKey(true);
      this._tabChange(nextKey);
    }
  };

  // 获取下一个key
  getNextKey = (flag = true) => {
    const index = this.getInfo().index;
    const keys = this.getInfo().keys;
    const len = keys.length;
    let key;
    if (flag) {
      key = keys[(index + 1) % len];
    } else {
      key = keys[(len + index - 1) % len];
    }
    return key;
  };

  render() {
    const {type, className, children} = this.props;
    const activeIndex = this.getInfo().index;
    const animation = this.getAnimation();

    const tabBars = Children.map(children, (child, i) => {
      return React.createElement(TabBar, {
        _key: child.props._key,
        name: child.props.name,
        active: activeIndex === i,
        _tabChange: this._tabChange,
        ref: (a) => this[`TabBar-${i}`] = a,
      });
    });
    const tabItems = Children.map(children, (child, i) => {
      return React.cloneElement(child, {
        active: activeIndex === i,
        animate: animation.tabContent,
      });
    });

    const tabClass = classNames(tabPrefix, {
      [`${tabPrefix}-${type}`]: type && isOneOf(_type.type, type)
    }, className);

    const contentClass = classNames({
      [`${tabPrefix}-content`]: true,
      [`${tabPrefix}-content-no-animate`]: !animation.tabContent,
    });

    return (
      <div className={tabClass}>
        <div className={`${tabPrefix}-bars-list`} tabIndex="0" onKeyDown={this._keyDown}>
          <div className={`${tabPrefix}-bars-container`}>
            <div className={`${tabPrefix}-bars-wrap`} ref={(a) => this.barsWrap = a}>
              {
                type === 'inline' &&
                <div className={`${tabPrefix}-bars-bottom`}
                     style={this.state.bottomStyle}
                     ref={(a) => this.barsBottom = a}
                />
              }
              {tabBars}
            </div>
          </div>
        </div>
        <div className={contentClass} style={this.state.contentStyle}>
          {tabItems}
        </div>
      </div>
    );
  }
}

export default validChild(Tab, TabItem);
