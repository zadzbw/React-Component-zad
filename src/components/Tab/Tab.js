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
      current: 'current' in this.props ? this.props.current : this.props.defaultCurrent,
    };
    this.adjustCurrent = this::this.adjustCurrent;
    this._tabChange = this::this._tabChange;
    this.getInfo = this::this.getInfo;
    this.setStyle = this::this.setStyle;
  }

  static propTypes = {
    current: PropTypes.string,
    defaultCurrent: PropTypes.string,
    onTabChange: PropTypes.func,
    type: PropTypes.oneOf(['card', 'inline']),
  };

  static defaultProps = {
    defaultCurrent: '1',
    onTabChange: (current) => undefined,
    type: 'card',
  };

  componentWillReceiveProps(nextProps) {
    if ('current' in nextProps) {
      this.setState({
        current: nextProps.current,
      });
    }
  }

  componentDidMount() {
    this.adjustCurrent();
    this.setStyle(true);
  }

  componentDidUpdate() {
    this.setStyle(false);
  }

  // 排除非法的current
  adjustCurrent() {
    const props = this.props;
    if ('defaultCurrent' in props) {
      const {defaultCurrent} = props;
      const keys = this.getInfo().keys;
      if (!isOneOf(keys, defaultCurrent)) {
        this.setState({
          current: keys[0],
        });
      }
    }
  }

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

  // todo 想一个不操作dom的方法去改变style?
  setStyle(isFirst) {
    const activeIndex = this.getInfo().index;
    const tabBarElm = ReactDOM.findDOMNode(this[`TabBar-${activeIndex}`]);
    if (!tabBarElm) {
      return;
    }
    const tabContent = this.tabContent;
    const tabBarRect = tabBarElm.getBoundingClientRect();
    const barsWrapRect = this.barsWrap.getBoundingClientRect();
    const contentRect = tabContent.getBoundingClientRect();

    const bottomStyle = {
      width: tabBarRect.width - 2, // 1px border on both sides
      offset: tabBarRect.left - barsWrapRect.left + 1, // 1px border on left side
    };
    this.setBottomStyle(bottomStyle, isFirst);

    const contentStyle = {
      offset: -(contentRect.width * activeIndex),
    };
    this.setContentStyle(contentStyle, isFirst);
  }

  setBottomStyle = (style, isFirst) => {
    const barsBottom = this.barsBottom;
    barsBottom.style.width = `${style.width}px`;
    barsBottom.style.transform = barsBottom.style.WebkitTransform = `translateX(${style.offset}px)`;
    !isFirst && (barsBottom.style.transition = 'transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)');
  };

  setContentStyle = (style, isFirst) => {
    const tabContent = this.tabContent;
    tabContent.style.marginLeft = `${style.offset}px`;
    !isFirst && (tabContent.style.transition = 'margin-left 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)');
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
        ...child.props,
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

    return (
      <div className={tabClass}>
        <div className={`${tabPrefix}-bars-list`} tabIndex="0" onKeyDown={this._keyDown}>
          <div className={`${tabPrefix}-bars-container`}>
            <div className={`${tabPrefix}-bars-wrap`} ref={(a) => this.barsWrap = a}>
              <div className={`${tabPrefix}-bars-bottom`} ref={(a) => this.barsBottom = a}/>
              {tabBars}
            </div>
          </div>
        </div>
        <div className={`${tabPrefix}-content`} ref={(a) => this.tabContent = a}>
          {tabItems}
        </div>
      </div>
    );
  }
}

export default validChild(Tab, TabItem);
