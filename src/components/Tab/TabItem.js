/**
 * Created by zad on 17/2/6.
 */
import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';
import {tabPrefix} from './Tab';

const TabItem = ({current, _key, children}) => {
  const itemClass = classNames(`${tabPrefix}-item`, {
    [`${tabPrefix}-item-active`]: current === _key,
  });
  return (
    <div className={itemClass}>{children}</div>
  );
};

TabItem.propTypes = {
  name: PropTypes.string,
  _key: PropTypes.string,
};

export default TabItem;
