/**
 * Created by zad on 17/3/23.
 */
import React, {Component, PropTypes} from 'react';

export default class Input extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    size: PropTypes.oneOf(['small', 'default', 'large']),
    disabled: PropTypes.bool,
    id: PropTypes.string,
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    onPressEnter: PropTypes.func,
  };
  static defaultProps = {
    size: 'default',
    disabled: false,
    onPressEnter: () => undefined,
  };


  render() {


    return (
      <input type="text"/>
    );
  }
}
