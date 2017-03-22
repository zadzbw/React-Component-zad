/**
 * Created by zad on 17/2/6.
 */
import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';
import {tabPrefix} from './Tab';

const TabItem = ({active, children}) => {
  const itemClass = classNames(`${tabPrefix}-item`, {
    [`${tabPrefix}-item-active`]: active,
    [`${tabPrefix}-item-inactive`]: !active,
  });
  return (
    <div className={itemClass}>{children}</div>
  );
};

TabItem.propTypes = {
  active: PropTypes.bool,
};

export default TabItem;
