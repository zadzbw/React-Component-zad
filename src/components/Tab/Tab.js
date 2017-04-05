/**
 * Created by zad on 17/2/6.
 */
import React, {PropTypes, Component, Children} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import _findIndex from 'lodash/findIndex';
import isOneOf from '../../utils/isOneOf';
import validChild from './validChild';
import keyCode from './keyCode';
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
      });
    }
  }

  componentDidMount() {
    this.setStyle(true);
  }

  componentDidUpdate() {
    this.setStyle(false);
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
        });
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

  // todo 想一个不操作dom的方法去改变style?
  setStyle(isFirst) {
    const {type} = this.props;
    const activeIndex = this.getInfo().index;
    const tabBarElm = ReactDOM.findDOMNode(this[`TabBar-${activeIndex}`]);
    if (!tabBarElm) {
      return;
    }
    const tabContent = this.tabContent;

    if (type === 'inline') {
      const tabBarRect = tabBarElm.getBoundingClientRect();
      const barsWrapRect = this.barsWrap.getBoundingClientRect();
      const bottomStyle = {
        width: tabBarRect.width - 2, // 1px border on both sides
        offset: tabBarRect.left - barsWrapRect.left + 1, // 1px border on left side
      };
      this.setBottomBarStyle(bottomStyle, isFirst);
    }

    const contentRect = tabContent.getBoundingClientRect();
    const contentStyle = {
      offset: -(contentRect.width * activeIndex),
    };
    this.setContentStyle(contentStyle, isFirst);
  }

  setBottomBarStyle = (style, isFirst) => {
    const barsBottom = this.barsBottom;
    const animate = this.getAnimation().bottomBar;
    barsBottom.style.width = `${style.width}px`;
    barsBottom.style.transform = barsBottom.style.WebkitTransform = `translateX(${style.offset}px)`;
    !isFirst && animate && (barsBottom.style.transition = 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)');
  };

  setContentStyle = (style, isFirst) => {
    const tabContent = this.tabContent;
    const animate = this.getAnimation().tabContent;
    tabContent.style.marginLeft = `${style.offset}px`;
    !isFirst && animate && (tabContent.style.transition = 'margin-left 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)');
  };

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
      });
    });

    const tabClass = classNames(tabPrefix, {
      [`${tabPrefix}-${type}`]: type && isOneOf(_type.type, type)
    }, className);

    const animation = this.getAnimation();
    const contentClass = classNames({
      [`${tabPrefix}-content`]: true,
      [`${tabPrefix}-content-no-animate`]: !animation.tabContent,
    });

    return (
      <div className={tabClass}>
        <div className={`${tabPrefix}-bars-list`} tabIndex="0" onKeyDown={this._keyDown}>
          <div className={`${tabPrefix}-bars-container`}>
            <div className={`${tabPrefix}-bars-wrap`} ref={(a) => this.barsWrap = a}>
              {type === 'inline' && <div className={`${tabPrefix}-bars-bottom`} ref={(a) => this.barsBottom = a}/>}
              {tabBars}
            </div>
          </div>
        </div>
        <div className={contentClass} ref={(a) => this.tabContent = a}>
          {tabItems}
        </div>
      </div>
    );
  }
}

export default validChild(Tab, TabItem);
