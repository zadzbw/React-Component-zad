/**
 * Created by zad on 17/3/23.
 */
import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import isOneOf from '../../utils/isOneOf';
import _isFunction from 'lodash/isFunction';

const _type = {
  size: ['small', 'large'],
};
const inputPrefix = 'zad-input';

export default class Input extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    size: PropTypes.oneOf(['small', 'default', 'large']),
    type: PropTypes.string,
    onPressEnter: PropTypes.func,
  };

  static defaultProps = {
    size: 'default',
    type: 'text',
    onPressEnter: () => undefined,
  };

  _handleKeyDown = (e) => {
    const {onPressEnter, onKeyDown} = this.props;
    if (e.keyCode === 13 && _isFunction(onPressEnter)) {
      onPressEnter(e);
    }
    if (_isFunction(onKeyDown)) {
      onKeyDown(e);
    }
  };

  render() {
    const {size, className, onPressEnter, ...props} = this.props;
    const sizeSuffix = ({
      large: 'lg',
      small: 'sm',
    })[size];
    const inputClass = classNames(inputPrefix, className, {
      [`${inputPrefix}-${sizeSuffix}`]: size && isOneOf(_type.size, size),
    });

    return (
      <input
        {...props}
        className={inputClass}
        onKeyDown={this._handleKeyDown}
      />
    );
  }
}
