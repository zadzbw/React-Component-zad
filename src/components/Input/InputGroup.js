/**
 * Created by zad on 17/3/23.
 */
import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import isOneOf from '../../utils/isOneOf';

const _type = {
  size: ['small', 'large']
};
const inputGroupPrefix = 'zad-input-group';

export default class InputGroup extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    size: PropTypes.string,
    compact: PropTypes.bool,
  };

  static defaultProps = {
    size: 'default',
    compact: true,
  };

  render() {
    const {size, compact, className, children, ...props} = this.props;
    const sizeSuffix = ({
      large: 'lg',
      small: 'sm',
    })[size];

    const inputGroupClass = classNames(inputGroupPrefix, className, {
      [`${inputGroupPrefix}-${sizeSuffix}`]: size && isOneOf(_type.size, size),
      [`${inputGroupPrefix}-compact`]: compact,
    });

    return (
      <span {...props} className={inputGroupClass}>
        {children}
      </span>
    );
  }
}
