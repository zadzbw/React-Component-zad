/**
 * Created by zad on 17/1/16.
 */
import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';
import Animate from 'rc-animate';
import collapseAnimation from '../../utils/collapseAnimation';

import MenuItem from './MenuItem';
import MenuItemGroup from './MenuItemGroup';
import _SubMenu from './SubMenu';

export default class SubMenu extends Component {
  constructor(props) {
    super(props);
    this.__expandSub = this::this.__expandSub;
    this._isExpand = this::this._isExpand;
  }

  static propTypes = {
    title: PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element,
    ]),
  };

  static defaultProps = {
    title: '',
  };

  renderChildren(props) {
    return React.Children.map(props.children, (child) => {
      if (child.type !== MenuItem && child.type !== MenuItemGroup && child.type !== _SubMenu) {
        console.error('the children of Menu.SubMenu must to be Menu.Item, Menu.ItemGroup or itself');
        return null;
      }
      return React.cloneElement(child,
        {
          ...child.props,
          // 传递每一级的level，用于缩进
          level: props.level + 1,
          prefix: props.prefix,
          expandKeys: props.expandKeys,
          selectedKeys: props.selectedKeys,
          eventKey: child.key,
          _expandSub: props._expandSub,
          _selectItem: props._selectItem,
          // 用于传递上一级sub的key
          subParentKey: child.type === _SubMenu ? this.props.eventKey : '',
        });
    });
  }

  _isExpand() {
    const {expandKeys, eventKey} = this.props;
    return expandKeys.includes(eventKey);
  }

  __expandSub() {
    const {eventKey, _expandSub, subParentKey} = this.props;
    const param = {
      eventKey,
      expand: this._isExpand(),
      subParentKey,
    };
    _expandSub(param);
  }

  render() {
    const {prefix, title, level} = this.props;
    const expand = this._isExpand();
    const subClass = classNames({
      [`${prefix}-sub`]: true,
      [`${prefix}-sub-expand`]: expand,
    });
    const paddingLeft = level * 20;

    return (
      <li className={subClass}>
        <div className={`${prefix}-sub-title`} onClick={this.__expandSub} style={{paddingLeft}}>
          {title}
        </div>
        <Animate animation={collapseAnimation} component={'ul'}>
          {expand && <ul>{this.renderChildren(this.props)}</ul>}
        </Animate>
      </li>
    );
  }
}
