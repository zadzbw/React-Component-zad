/**
 * Created by zad on 17/2/6.
 */
import React, {PropTypes, Component, Children} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import _findIndex from 'lodash/findIndex';
import isOneOf from '../../utils/isOneOf';
import TabItem from './TabItem';
import TabBar from './TabBar';

const _type = {
  type: ['card', 'inline'],
};
export const tabPrefix = 'zad-tab';

export default class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'current' in this.props ? this.props.current : this.props.defaultCurrent,
    };
    this.adjustCurrent = this::this.adjustCurrent;
    this._tabChange = this::this._tabChange;
    this.setBottomStyle = this::this.setBottomStyle;
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
    this.setBottomStyle();
  }

  componentDidUpdate() {
    this.setBottomStyle();
  }

  // 排除非法的current
  adjustCurrent() {
    const props = this.props;
    if ('defaultCurrent' in props) {
      const {children, defaultCurrent} = props;
      const keys = Children.map(children, child => child.key);
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
    if (!('current' in this.props)) {
      this.setState({
        current: key,
      });
    }
    isChange && this.props.onTabChange(key);
  }

  setBottomStyle() {
    const {children} = this.props;
    const {current} = this.state;
    const keys = Children.map(children, child => child.key);
    const activeIndex = _findIndex(keys, (key) => key === current);
    const tabBarElm = ReactDOM.findDOMNode(this[`TabBar-${activeIndex}`]);
    const tabBarRect = tabBarElm.getBoundingClientRect();

    const style = {
      width: tabBarRect.width - 2, // 1px border on both sides
      offset: tabBarRect.left - this.barsWrap.getBoundingClientRect().left + 1, // 1px border on left side
    };

    const barsBottom = ReactDOM.findDOMNode(this.barsBottom);
    barsBottom.style.width = `${style.width}px`;
    barsBottom.style.transform = `translateX(${style.offset}px)`;
    barsBottom.style.WebkitTransform = `translateX(${style.offset}px)`;
  }

  render() {
    const {type, className, children} = this.props;
    const {current} =this.state;

    const tabBars = Children.map(children, (child, index) => {
      if (child.type !== TabItem) {
        return null;
      }
      return React.createElement(TabBar, {
        current,
        name: child.props.name,
        _key: child.key,
        _tabChange: this._tabChange,
        ref: (a) => this[`TabBar-${index}`] = a,
      });
    });
    const tabItems = Children.map(children, (child) => {
      if (child.type !== TabItem) {
        return null;
      }
      return (
        <TabItem
          current={current}
          children={child.props.children}
          _key={child.key}
        />
      );
    });

    const tabClass = classNames(tabPrefix, {
      [`${tabPrefix}-${type}`]: type && isOneOf(_type.type, type)
    }, className);

    return (
      <div className={tabClass}>
        <div className={`${tabPrefix}-bars-list`}>
          <div className={`${tabPrefix}-bars-container`}>
            <div className={`${tabPrefix}-bars-wrap`} ref={(a) => this.barsWrap = a}>
              <div className={`${tabPrefix}-bars-bottom`} ref={(a) => this.barsBottom = a}/>
              {tabBars}
            </div>
          </div>
        </div>
        <div className={`${tabPrefix}-content`}>
          {tabItems}
        </div>
      </div>
    );
  }
}
