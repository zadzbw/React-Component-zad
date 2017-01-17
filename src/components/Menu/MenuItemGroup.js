/**
 * Created by zad on 17/1/16.
 */
import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';

export default class MenuItemGroup extends Component {
  renderChildren(props) {
    return React.Children.map(props.children, (child) => {
      return React.cloneElement(child,
        {
          ...child.props,
          level: props.level,
          prefix: props.prefix,
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
