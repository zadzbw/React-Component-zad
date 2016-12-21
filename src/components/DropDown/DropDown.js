/**
 * Created by zad on 16/12/20.
 */
import React, {PropTypes, Component} from 'react';
import Animate from 'rc-animate';
import classNames from 'classnames';
import chainFunc from '../../utils/chainFunc';
import Icon from '../Icon';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import DropDownItem from './DropDownItem';

import './DropDown.less';

export default class DropDown extends Component {
  static propTypes = {
    onSelect: PropTypes.func,
    menus: PropTypes.array
  };

  static defaultProps = {
    onSelect: () => undefined,
    menus: []
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    this.switchVisible = this.switchVisible.bind(this);
    this.click = this.click.bind(this);
  }

  switchVisible() {
    this.setState({
      visible: !this.state.visible,
    }, () => {
      if (this.state.visible) {
        setTimeout(() => {
          window.addEventListener('click', this.click, false);
        }, 0);
      } else {
        setTimeout(() => {
          window.removeEventListener('click', this.click, false);
        }, 0);
      }
    });
  }

  click() {
    const {visible} = this.state;
    if (visible) {
      this.switchVisible();
    }
  }

  render() {
    const {className, style, children, menus, onSelect, ...props} = this.props;
    const dropDownClass = classNames('zad-dropdown', className);
    const Func = chainFunc(onSelect, this.switchVisible);
    const items = menus.map((menu) => {
      return (
        <DropDownItem onClick={Func.bind(this, menu.value)} name={menu.name} key={menu.value}/>
      );
    });
    const itemsWrap = !this.state.visible ? null : (
      <div className="zad-dropdown-items">
        {items}
      </div>
    );

    return (
      <div {...props} className={dropDownClass} style={style}>
        <ButtonGroup>
          <Button type={'ghost'}>{children}</Button>
          <Button type={'ghost'} onClick={this.switchVisible}><Icon name={'angle-down'}/></Button>
        </ButtonGroup>
        <Animate transitionName="slide-up">
          {itemsWrap}
        </Animate>
      </div>
    );
  }
}
