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
    this._isOpen = this::this._isOpen;
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
          level: props.level + 1,
          prefix: props.prefix,
          openKeys: props.openKeys,
          selectedKeys: props.selectedKeys,
          eventKey: child.key,
          _expandSub: props._expandSub,
          _selectItem: props._selectItem,
        });
    });
  }

  _isOpen() {
    const {openKeys, eventKey} = this.props;
    return openKeys.includes(eventKey);
  }

  __expandSub() {
    const {eventKey, _expandSub} = this.props;
    const param = {
      eventKey,
      open: this._isOpen(),
    };
    _expandSub(param);
  }

  render() {
    const {prefix, title, level} = this.props;
    const expand = this._isOpen();
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
