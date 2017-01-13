/**
 * Created by zad on 17/1/13.
 */
import React from 'react';
import classNames from 'classnames';
import isOneOf from '../../utils/isOneOf';

const loaderPrefix = 'zad-loader';
const _type = {
  size: ['small', 'large']
};

export default function ({
  size = undefined,
  tip = '',
  loading,
}) {
  const sizeSuffix = ({
    large: 'lg',
    small: 'sm',
  })[size];
  const loadingClass = classNames(loaderPrefix, {
    [`${loaderPrefix}-${sizeSuffix}`]: size && isOneOf(_type.size, size),
    [`${loaderPrefix}-show-tip`]: !!tip,
    [`${loaderPrefix}-is-loading`]: loading,
  });

  return (
    <div className={loadingClass}>
      <div className={`${loaderPrefix}-entity`}>
        <svg className={`${loaderPrefix}-svg`} viewBox="25 25 50 50">
          <circle className={`${loaderPrefix}-circle`} cx="50" cy="50" r="20" fill="none"/>
        </svg>
      </div>
      {!!tip && <div className={`${loaderPrefix}-tip`}>{tip}</div>}
    </div>
  );
}
