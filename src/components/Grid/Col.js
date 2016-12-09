/**
 * Created by zad on 16/12/8.
 */
import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import _forEach from 'lodash/forEach';

import './Col.less';

const colPrefix = 'zad-col';

export default class Col extends Component {
  static propTypes = {
    span: PropTypes.number,
    offset: PropTypes.number,
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number
  };

  static defaultProps = {
    span: 0,
    offset: 0
  };

  render() {
    const {span, offset, xs, sm, md, lg, className, children, ...props} = this.props;
    const sizeMap = {
      xs: xs,
      sm: sm,
      md: md,
      lg: lg
    };

    let sizeClassObj = {};
    _forEach(sizeMap, (value, key) => {
      sizeClassObj = Object.assign({}, sizeClassObj, {
        [`${colPrefix}-${key}-${value}`]: !!value
      });
    });

    const colClass = classNames(className, {
      [`${colPrefix}-${span}`]: !!span,
      [`${colPrefix}-offset-${offset}`]: !!offset
    }, sizeClassObj);

    return (
      <div {...props} className={colClass}>
        {children}
      </div>
    );
  }
}
