/**
 * Created by zad on 16/12/8.
 */
import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import isOneOf from '../../utils/isOneOf';
import Col from './Col';

import './Row.less';

const _type = {
  align: ['top', 'middle', 'bottom'],
  justify: ['start', 'end', 'center', 'space-around', 'space-between']
};
const rowPrefix = 'zad-row';

export default class Row extends Component {
  static propTypes = {
    gap: PropTypes.number,
    align: PropTypes.string,
    justify: PropTypes.string
  };

  static defaultProps = {
    gap: 0,
    align: 'top',
    justify: 'start'
  };

  render() {
    const {gap, align, justify, style, className, children, ...props} = this.props;
    const rowClass = classNames(rowPrefix, className, {
      [`${rowPrefix}-vertical-${align}`]: align && isOneOf(_type.align, align),
      [`${rowPrefix}-horizontal-${justify}`]: justify && isOneOf(_type.justify, justify)
    });
    const rowStyle = gap ? Object.assign({}, {
      marginLeft: gap / -2,
      marginRight: gap / -2,
    }, style) : style;
    const cols = React.Children.map(children, (col) => {
      if (col.type !== Col) {
        // 限制 Row 的子元素只能是 Col
        return null;
      }

      return React.cloneElement(col, {
        style: gap ? Object.assign({}, {
          paddingLeft: gap / 2,
          paddingRight: gap / 2,
        }, col.props.style) : col.props.style
      });
    });

    return (
      <div {...props} className={rowClass} style={rowStyle}>
        {cols}
      </div>
    );
  }
}
