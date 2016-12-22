/**
 * Created by zad on 16/12/20.
 */
import React, {PropTypes, Component} from 'react';
import Animate from 'rc-animate';
import isOneOf from '../../utils/isOneOf';
import {dropDownPrefix} from './DropDown';

const _type = {
  type: ['normal', 'sub']
};

export default class DropDownItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    this.showSub = this.showSub.bind(this);
    this.hideSub = this.hideSub.bind(this);
  }

  static propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    onClick: PropTypes.func
  };

  static defaultProps = {
    type: 'normal',
    name: '',
    onClick: () => undefined
  };

  showSub() {
    this.setState({
      visible: true
    });
  }

  hideSub() {
    this.setState({
      visible: false
    });
  }

  render() {
    const {name, onClick, children} = this.props;
    let {type} = this.props;
    type = type && isOneOf(_type.type, type) ? type : 'normal';

    if (type === 'normal') {
      return (
        <div className={`${dropDownPrefix}-item`} onClick={onClick}>
          {name}
        </div>
      );
    } else {
      const items = this.state.visible ? (
        <div className={`${dropDownPrefix}-sub-items`}>
          {children}
        </div>
      ) : null;
      return (
        <div className={`${dropDownPrefix}-sub`} onMouseEnter={this.showSub} onMouseLeave={this.hideSub}>
          <div className={`${dropDownPrefix}-sub-title`}>{name}</div>
          <div className={`${dropDownPrefix}-sub-wrap`}>
            <Animate transitionName="fade">
              {items}
            </Animate>
          </div>
        </div>
      );
    }
  }
}
