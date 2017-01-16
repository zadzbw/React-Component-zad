/**
 * Created by zad on 17/1/16.
 */
import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';
import isOneOf from '../../utils/isOneOf';

const menuPrefix = 'zad-menu';
const _type = {
  mode: ['vertical', 'inline']
};

export default class Menu extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    mode: PropTypes.oneOf(['vertical', 'inline']),
  };

  static defaultProps = {
    mode: 'inline',
  };

  renderChildren(props) {
    return React.Children.map(props.children, (child) => {
      return React.cloneElement(child,
        {
          ...child.props,
          prefix: menuPrefix
        });
    });
  }

  render() {
    const {mode} = this.props;

    const menuClass = classNames(menuPrefix, {
      [`${menuPrefix}-${mode}`]: mode && isOneOf(_type.mode, mode),
    });

    return (
      <ul className={menuClass}>
        {this.renderChildren(this.props)}
      </ul>
    );
  }
}
