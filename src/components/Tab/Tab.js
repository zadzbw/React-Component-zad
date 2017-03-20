/**
 * Created by zad on 17/2/6.
 */
import React, {PropTypes, Component, Children} from 'react';
import classNames from 'classnames';
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
    type: 'inline',
  };

  componentWillReceiveProps(nextProps) {
    if ('current' in nextProps) {
      this.setState({
        current: nextProps.current,
      });
    }
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

  componentDidMount() {
    this.adjustCurrent();
  }

  _tabChange() {
    console.log(123);
  }

  render() {
    const {type, className, children} = this.props;
    const {current} =this.state;

    const tabBars = Children.map(children, (child) => {
      if (child.type !== TabItem) {
        return null;
      }
      return (
        <TabBar
          current={current}
          name={child.props.name}
          _key={child.key}
          _tabChange={this._tabChange}
        />
      );
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
          {tabBars}
        </div>
        <div className={`${tabPrefix}-content`}>
          {tabItems}
        </div>
      </div>
    );
  }
}
