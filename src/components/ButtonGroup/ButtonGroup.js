/**
 * Created by zad on 16/12/5.
 */
import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';
import isOneOf from '../../utils/isOneOf';
import Button from '../Button';

import './ButtonGroup.less';

const _type = {
  size: ['small', 'large']
};
const btnGroupPrefix = 'zad-btn-group';

export default class ButtonGroup extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    size: PropTypes.string
  };

  render() {
    const {size, className, children, ...props} = this.props;

    const sizeSuffix = ({
      large: 'lg',
      small: 'sm',
    })[size];

    const btnGroupClass = classNames(btnGroupPrefix, className, {
      [`${btnGroupPrefix}-${sizeSuffix}`]: size && isOneOf(_type.size, size)
    });

    const btns = React.Children.map(children, (btn) => {
      if (btn.type !== Button) {
        // 限制 ButtonGroup 的子元素只能是 Button
        return null;
      }
      return btn;
    });

    return (
      <div {...props} className={btnGroupClass}>
        {btns}
      </div>
    );
  }
}
