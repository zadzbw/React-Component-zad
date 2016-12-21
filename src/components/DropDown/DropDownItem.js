/**
 * Created by zad on 16/12/20.
 */
import React, {PropTypes, Component} from 'react';

export default class DropDownItem extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    name: PropTypes.string,
    onClick: PropTypes.func
  };

  static defaultProps = {
    name: '',
    onClick: () => undefined
  };

  render() {
    const {name, onClick} = this.props;
    return (
      <div onClick={onClick} className="zad-dropdown-item">
        {name}
      </div>
    );
  }
}