/**
 * Created by zad on 17/1/16.
 */
import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';

export default class MenuItem extends Component {
  render() {
    const {prefix, level} = this.props;
    const itemClass = classNames({
      [`${prefix}-item`]: true
    });
    const paddingLeft = level * 20;

    return (
      <li className={itemClass} style={{paddingLeft}}>
        {this.props.children}
      </li>
    );
  }
}
