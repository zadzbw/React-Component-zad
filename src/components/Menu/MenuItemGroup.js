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
          prefix: props.prefix
        });
    });
  }

  render() {
    const {prefix, title} = this.props;
    const groupClass = classNames({
      [`${prefix}-item-group`]: true
    });

    return (
      <li className={groupClass}>
        <div className={`${prefix}-item-group-title`}>
          {title}
        </div>
        <ul className={`${prefix}-item-group-items`}>{this.renderChildren(this.props)}</ul>
      </li>
    );
  }
}
