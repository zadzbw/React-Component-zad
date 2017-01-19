/**
 * Created by zad on 17/1/16.
 */
import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';
import isOneOf from '../../utils/isOneOf';
import _remove from 'lodash/remove';

const menuPrefix = 'zad-menu';
const _type = {
  mode: ['vertical', 'inline']
};

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandKeys: 'expandKeys' in this.props ? this.props.expandKeys : this.props.defaultExpandKeys,
      selectedKeys: 'selectedKeys' in this.props ? this.props.selectedKeys : this.props.defaultSelectedKeys,
    };
    this._expandSub = this::this._expandSub;
    this._selectItem = this::this._selectItem;
  }

  static propTypes = {
    mode: PropTypes.oneOf(['vertical', 'inline']),
    level: PropTypes.number,
    prefix: PropTypes.string,
    expandKeys: PropTypes.arrayOf(PropTypes.string),
    defaultExpandKeys: PropTypes.arrayOf(PropTypes.string),
    selectedKeys: PropTypes.arrayOf(PropTypes.string),
    defaultSelectedKeys: PropTypes.arrayOf(PropTypes.string),
    onExpandChange: PropTypes.func,
    onSelect: PropTypes.func,
    onlyExpandOneSub: PropTypes.bool,
  };

  static defaultProps = {
    mode: 'inline',
    level: 1,
    prefix: menuPrefix,
    defaultExpandKeys: [],
    defaultSelectedKeys: [],
    onExpandChange: () => undefined,
    onSelect: () => undefined,
    onlyExpandOneSub: false,
  };

  componentWillReceiveProps(nextProps) {
    // 为受控组件时，运行如下代码
    const keys = {};
    if ('selectedKeys' in nextProps) {
      keys.selectedKeys = nextProps.selectedKeys;
    }
    if ('expandKeys' in nextProps) {
      keys.expandKeys = nextProps.expandKeys;
    }
    this.setState(keys);
  }

  renderChildren(props) {
    const {expandKeys, selectedKeys} = this.state;
    return React.Children.map(props.children, (child) => {
      return React.cloneElement(child,
        {
          ...child.props,
          level: props.level,
          prefix: props.prefix,
          expandKeys,
          selectedKeys,
          eventKey: child.key,
          _expandSub: this._expandSub,
          _selectItem: this._selectItem,
        });
    });
  }

  _expandSub(args) {
    const expandKeys = this.state.expandKeys.concat();
    const {eventKey, expand, subParentKey} = args;
    if (!expand) {
      // 当onlyExpandOneSub为true时，清空expandKeys数组
      if (!subParentKey && this.props.onlyExpandOneSub) {
        _remove(expandKeys, (key) => eventKey !== key);
      }
      expandKeys.push(eventKey);
    } else {
      _remove(expandKeys, (key) => eventKey === key);
    }
    if (!('expandKeys' in this.props)) {
      this.setState({expandKeys});
    }
    this.props.onExpandChange(expandKeys);
  }

  _selectItem(args) {
    if (!('selectedKeys' in this.props)) {
      this.setState({
        selectedKeys: args.key,
      });
    }
    this.props.onSelect(args);
  }

  render() {
    const {mode} = this.props;
    const menuClass = classNames(menuPrefix, {
      [`${menuPrefix}-${mode}`]: mode && isOneOf(_type.mode, mode),
    });

    return (
      <ul className={menuClass}>
        {this.renderChildren(this.props)}
      </ul>
    );
  }
}
