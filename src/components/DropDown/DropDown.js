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

function renderItems(menus, func) {
  return menus.map((menu) => {
    if (!menu.menus) {
      return <DropDownItem name={menu.name} key={menu.value} onClick={func.bind(this, menu.value)}/>;
    } else {
      return (
        <DropDownItem type={'sub'} name={menu.name} key={`sub-${+new Date()}`}>
          {renderItems.apply(this, [menu.menus, func])}
        </DropDownItem>
      );
    }
  });
}

export const dropDownPrefix = 'zad-dropdown';

export default class DropDown extends Component {
  static propTypes = {
    menus: PropTypes.array,
    disabled: PropTypes.bool,
    onSelect: PropTypes.func
  };

  static defaultProps = {
    menus: [],
    disabled: false,
    onSelect: () => undefined
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

  click(e) {
    // 如果点击到2级菜单，则什么都不做
    if (e.target.classList.contains(`${dropDownPrefix}-sub-title`)) {
      return false;
    }
    const {visible} = this.state;
    if (visible) {
      this.switchVisible();
    }
  }

  render() {
    const {className, style, children, menus, disabled, onSelect, ...props} = this.props;
    const dropDownClass = classNames(dropDownPrefix, className);
    const Func = chainFunc(onSelect, this.switchVisible);
    const items = renderItems.apply(this, [menus, Func]);
    const itemsWrap = !this.state.visible ? null : (
      <div className={`${dropDownPrefix}-items`}>
        {items}
      </div>
    );

    return (
      <div {...props} className={dropDownClass} style={style}>
        <ButtonGroup>
          <Button type={'ghost'} disabled={disabled}>
            {children}
          </Button>
          <Button type={'ghost'} disabled={disabled} onClick={this.switchVisible}>
            <Icon name={'angle-down'}/>
          </Button>
        </ButtonGroup>
        <Animate transitionName="slide-up">
          {itemsWrap}
        </Animate>
      </div>
    );
  }
}
