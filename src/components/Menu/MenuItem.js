/**
 * Created by zad on 17/1/16.
 */
import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';

export default class MenuItem extends Component {
  render() {
    const {prefix} = this.props;
    const itemClass = classNames({
      [`${prefix}-item`]: true
    });

    return (
      <li className={itemClass}>
        {this.props.children}
      </li>
    );
  }
}
