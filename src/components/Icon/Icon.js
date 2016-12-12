import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';
import isOneOf from '../../utils/isOneOf';

const _type = {
  size: ['lg', '2x', '3x', '4x', '5x'],
  rotate: [90, 180, 270]
};

export default class Icon extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.string,
    fixedWidth: PropTypes.bool,
    spin: PropTypes.bool,
    pulse: PropTypes.bool,
    rotate: PropTypes.number
  };

  render() {
    const {name, size, fixedWidth, spin, pulse, rotate, ...props} = this.props;
    const iconClass = classNames('fa', `fa-${name}`, {
      [`fa-${size}`]: size && isOneOf(_type.size, size),
      [`fa-rotate-${rotate}`]: rotate && isOneOf(_type.rotate, rotate),
      'fa-fw': fixedWidth,
      'fa-spin': spin,
      'fa-pulse': pulse
    });
    return (
      <i {...props} className={iconClass}/>
    );
  }
}
