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
      openKeys: 'openKeys' in this.props ? this.props.openKeys : this.props.defaultOpenKeys,
      selectedKeys: 'selectedKeys' in this.props ? this.props.selectedKeys : this.props.defaultSelectedKeys,
    };
    this._expandSub = this::this._expandSub;
    this._selectItem = this::this._selectItem;
  }

  static propTypes = {
    mode: PropTypes.oneOf(['vertical', 'inline']),
    level: PropTypes.number,
    prefix: PropTypes.string,
    openKeys: PropTypes.arrayOf(PropTypes.string),
    defaultOpenKeys: PropTypes.arrayOf(PropTypes.string),
    selectedKeys: PropTypes.arrayOf(PropTypes.string),
    defaultSelectedKeys: PropTypes.arrayOf(PropTypes.string),
    onOpenChange: PropTypes.func,
    onSelect: PropTypes.func,
  };

  static defaultProps = {
    mode: 'inline',
    level: 1,
    prefix: menuPrefix,
    defaultOpenKeys: [],
    defaultSelectedKeys: [],
    onOpenChange: () => undefined,
    onSelect: () => undefined,
  };

  componentWillReceiveProps(nextProps) {
    // 为受控组件时，运行如下代码
    const keys = {};
    if ('selectedKeys' in nextProps) {
      keys.selectedKeys = nextProps.selectedKeys;
    }
    if ('openKeys' in nextProps) {
      keys.openKeys = nextProps.openKeys;
    }
    this.setState(keys);
  }

  renderChildren(props) {
    const {openKeys, selectedKeys} = this.state;
    return React.Children.map(props.children, (child) => {
      return React.cloneElement(child,
        {
          ...child.props,
          level: props.level,
          prefix: props.prefix,
          openKeys,
          selectedKeys,
          eventKey: child.key,
          _expandSub: this._expandSub,
          _selectItem: this._selectItem,
        });
    });
  }

  _expandSub(args) {
    const openKeys = this.state.openKeys.concat();
    if (!args.open) {
      openKeys.push(args.eventKey);
    } else {
      _remove(openKeys, (key) => args.eventKey === key);
    }
    if (!('openKeys' in this.props)) {
      this.setState({openKeys});
    }
    this.props.onOpenChange(openKeys);
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
