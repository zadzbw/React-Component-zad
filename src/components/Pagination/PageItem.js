/**
 * Created by zad on 17/2/3.
 */
import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';
import {paginationPrefix} from './Pagination';

export default class PageItem extends Component {
  static propTypes = {
    page: PropTypes.number,
    active: PropTypes.bool,
    itemClick: PropTypes.func,
  };

  render() {
    const {page, active, itemClick} = this.props;
    const itemClass = classNames(`${paginationPrefix}-item`, {
      [`${paginationPrefix}-item-active`]: active,
    });

    return (
      <li title={page} className={itemClass} onClick={itemClick}>
        <a>{page}</a>
      </li>
    );
  }
}
