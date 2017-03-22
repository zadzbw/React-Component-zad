/**
 * Created by zad on 17/1/19.
 */
import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import Menu from '../../Menu/Menu';
import SubMenu from '../../Menu/SubMenu';
import MenuItemGroup from '../../Menu/MenuItemGroup';
import MenuItem from '../../Menu/MenuItem';

describe('Menu Test', () => {
  it('select item', () => {
    const wrapper = shallow(
      <Menu defaultSelectedKeys={['222']} defaultExpandKeys={['sub-1']}>
        <SubMenu key="sub-1" title={'Navigation One'}>
          <MenuItem key="000">00000</MenuItem>
          <MenuItem key="111">11111</MenuItem>
          <MenuItem key="222">22222</MenuItem>
          <MenuItem key="333">33333</MenuItem>
        </SubMenu>
      </Menu>
    );

    // initial
    expect(wrapper.state().selectedKeys).toEqual(['222']);
    expect(wrapper.childAt(0).shallow().find(MenuItem).at(2).shallow().hasClass('zad-menu-item-selected')).toBeTruthy();
    expect(wrapper.childAt(0).shallow().find(MenuItem).at(2).shallow().text()).toEqual('22222');

    // select item 1
    wrapper.childAt(0).shallow().find(MenuItem).at(1).shallow().simulate('click');
    expect(wrapper.state().selectedKeys).toEqual(['111']);
    expect(wrapper.childAt(0).shallow().find(MenuItem).at(1).shallow().hasClass('zad-menu-item-selected')).toBeTruthy();
    expect(wrapper.childAt(0).shallow().find(MenuItem).at(1).shallow().text()).toEqual('11111');

    // select item 3
    wrapper.childAt(0).shallow().find(MenuItem).at(3).shallow().simulate('click');
    expect(wrapper.state().selectedKeys).toEqual(['333']);
    expect(wrapper.childAt(0).shallow().find(MenuItem).at(3).shallow().hasClass('zad-menu-item-selected')).toBeTruthy();
    expect(wrapper.childAt(0).shallow().find(MenuItem).at(3).shallow().text()).toEqual('33333');

    expect(shallowToJson(wrapper.shallow())).toMatchSnapshot();
  });

  it('expand sub', () => {
    const wrapper = shallow(
      <Menu defaultSelectedKeys={['222']} defaultExpandKeys={['sub-1']}>
        <SubMenu key="sub-1" title={'Navigation One'}>
          <MenuItemGroup title={'test1'}>
            <MenuItem key="111">11111</MenuItem>
            <MenuItem key="222">22222</MenuItem>
          </MenuItemGroup>
          <MenuItemGroup title={'test2'}>
            <MenuItem key="333">33333</MenuItem>
            <MenuItem key="444">44444</MenuItem>
          </MenuItemGroup>
        </SubMenu>

        <SubMenu key="sub-3" title={'Navigation Three'}>
          <MenuItem key="option5">Option 5</MenuItem>
          <MenuItem key="option6">Option 6</MenuItem>
          <SubMenu key="sub-3-1" title="Submenu 1">
            <MenuItem key="option7">Option 7</MenuItem>
            <MenuItem key="option8">Option 8</MenuItem>
            <SubMenu key="sub-3-1-1" title="Submenu 2">
              <MenuItem key="option1">Option 1</MenuItem>
              <MenuItem key="option2">Option 2</MenuItem>
            </SubMenu>
          </SubMenu>
        </SubMenu>
      </Menu>
    );

    expect(wrapper.state().expandKeys).toEqual(['sub-1']);

    // child 1 before click
    expect(wrapper.childAt(1).shallow().find(MenuItem).exists()).toBeFalsy();
    expect(wrapper.childAt(1).shallow().find(SubMenu).exists()).toBeFalsy();
    expect(wrapper.childAt(1).shallow().hasClass('zad-menu-sub-expand')).toBeFalsy();

    // child 1 click simulate
    wrapper.childAt(1).shallow().find('.zad-menu-sub-title').simulate('click');

    // child 1 after click
    expect(wrapper.childAt(1).shallow().find(MenuItem).exists()).toBeTruthy();
    expect(wrapper.childAt(1).shallow().find(SubMenu).exists()).toBeTruthy();
    expect(wrapper.childAt(1).shallow().hasClass('zad-menu-sub-expand')).toBeTruthy();
    expect(wrapper.state().expandKeys).toEqual(['sub-1', 'sub-3']);

    // child 0 before click
    expect(wrapper.childAt(0).shallow().find(MenuItem).exists()).toBeTruthy();
    expect(wrapper.childAt(0).shallow().hasClass('zad-menu-sub-expand')).toBeTruthy();

    // child 0 click simulate
    wrapper.childAt(0).shallow().find('.zad-menu-sub-title').simulate('click');

    // child 0 after click
    expect(wrapper.childAt(0).shallow().find(MenuItem).exists()).toBeFalsy();
    expect(wrapper.childAt(0).shallow().hasClass('zad-menu-sub-expand')).toBeFalsy();
    expect(wrapper.state().expandKeys).toEqual(['sub-3']);

    // sub in sub
    wrapper.childAt(1).find(SubMenu).at(0).shallow().find(SubMenu).at(0).shallow().find('.zad-menu-sub-title').simulate('click');
    expect(wrapper.state().expandKeys).toEqual(['sub-3', 'sub-3-1']);
    wrapper.childAt(1).find(SubMenu).at(0).shallow().find(SubMenu).at(0).shallow().find(SubMenu).at(0).shallow().find('.zad-menu-sub-title').simulate('click');
    expect(wrapper.state().expandKeys).toEqual(['sub-3', 'sub-3-1', 'sub-3-1-1']);

    expect(shallowToJson(wrapper.shallow())).toMatchSnapshot();
  });
});
