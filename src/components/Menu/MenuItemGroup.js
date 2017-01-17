/**
 * Created by zad on 17/1/16.
 */
import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';

import MenuItem from './MenuItem';

export default class MenuItemGroup extends Component {
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
      if (child.type !== MenuItem) {
        console.error('the children of Menu.ItemGroup must to be Menu.Item');
        return null;
      }
      return React.cloneElement(child,
        {
          ...child.props,
          level: props.level,
          prefix: props.prefix,
          selectedKeys: props.selectedKeys,
          eventKey: child.key,
          _selectItem: props._selectItem,
        });
    });
  }

  render() {
    const {prefix, title, level} = this.props;
    const groupClass = classNames({
      [`${prefix}-item-group`]: true
    });
    const paddingLeft = level * 16;

    return (
      <li className={groupClass}>
        <div className={`${prefix}-item-group-title`} style={{paddingLeft}}>
          {title}
        </div>
        <ul className={`${prefix}-item-group-items`}>{this.renderChildren(this.props)}</ul>
      </li>
    );
  }
}
