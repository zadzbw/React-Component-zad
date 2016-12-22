/**
 * Created by zad on 16/12/22.
 */
import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import DropDown from '../../DropDown';
import DropDownItem from '../../DropDown/DropDownItem';
import Button from '../../Button';

const dropdown = [
  {name: '中国1-China', value: 'CN1'},
  {name: '日本1-Japan', value: 'JP1'},
  {name: '美国1-USA', value: 'USA1'},
  {
    name: '二级菜单', menus: [
    {name: '中国2-China', value: 'CN2'},
    {name: '日本2-Japan', value: 'JP2'},
    {name: '美国2-USA', value: 'USA2'},
    {
      name: '三级菜单', menus: [
      {name: '中国3-China', value: 'CN3'},
      {name: '日本3-Japan', value: 'JP3'},
      {name: '美国3-USA', value: 'USA3'}
    ]
    }
  ]
  }
];

describe('dropDown Test', () => {
  it('normal', () => {
    function test(value) {
      selected = value;
    }

    let selected = '';
    const wrapper = shallow(
      <DropDown menus={dropdown} onSelect={test}>
        DropDown
      </DropDown>
    );

    // open
    wrapper.find(Button).at(1).simulate('click');
    expect(wrapper.find(DropDownItem)).toHaveLength(11);
    // sub click
    wrapper.find(DropDownItem).at(3).simulate('click');
    wrapper.find(DropDownItem).at(7).simulate('click');
    expect(wrapper.find(DropDownItem)).toHaveLength(11);
    expect(selected).toEqual('');
    expect(wrapper.find(DropDownItem).at(3).shallow().find('.zad-dropdown-sub-title').text()).toEqual('二级菜单');
    expect(wrapper.find(DropDownItem).at(7).shallow().find('.zad-dropdown-sub-title').text()).toEqual('三级菜单');
    expect(shallowToJson(wrapper)).toMatchSnapshot();

    // click
    wrapper.find(DropDownItem).at(0).simulate('click');
    expect(wrapper.find(DropDownItem)).toHaveLength(0);
    expect(selected).toEqual('CN1');

    // open
    wrapper.find(Button).at(1).simulate('click');
    // click
    wrapper.find(DropDownItem).at(5).simulate('click');
    expect(wrapper.find(DropDownItem)).toHaveLength(0);
    expect(selected).toEqual('JP2');

    // open
    wrapper.find(Button).at(1).simulate('click');
    // click
    wrapper.find(DropDownItem).at(10).simulate('click');
    expect(wrapper.find(DropDownItem)).toHaveLength(0);
    expect(selected).toEqual('USA3');
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
