/**
 * Created by zad on 16/12/7.
 */
import React from 'react';
import {mount} from 'enzyme';
import {mountToJson} from 'enzyme-to-json';
import Button from '../../Button';
import Icon from '../../Icon';

describe('Button test', function () {
  it('type', () => {
    const wrapper = mount(
      <Button type={'primary'}>primary</Button>
    );
    expect(wrapper.find('button').type()).toEqual('button');
    expect(wrapper.find('button').text()).toEqual('primary');
    expect(wrapper.find('button').hasClass('zad-btn-primary')).toBeTruthy();
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });

  it('size', () => {
    const wrapper = mount(
      <Button size={'large'}>large</Button>
    );
    expect(wrapper.find('button').type()).toEqual('button');
    expect(wrapper.find('button').text()).toEqual('large');
    expect(wrapper.find('button').hasClass('zad-btn-lg')).toBeTruthy();
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });

  it('shape', () => {
    const wrapper = mount(
      <Button shape={'circle'}>circle</Button>
    );
    expect(wrapper.find('button').type()).toEqual('button');
    expect(wrapper.find('button').text()).toEqual('circle');
    expect(wrapper.find('button').hasClass('zad-btn-circle')).toBeTruthy();
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });

  it('clicked', () => {
    let a = 1;

    function test() {
      a++;
    }

    const wrapper = mount(
      <Button onClick={test}>button</Button>
    );
    expect(a).toEqual(1);
    wrapper.find('button').simulate('click');
    expect(a).toEqual(2);
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });

  it('disabled', () => {
    const wrapper = mount(
      <Button disabled>button</Button>
    );

    expect(wrapper.find('button').get(0).disabled).toBeTruthy();
    expect(wrapper.find('button').type()).toEqual('button');
    expect(wrapper.find('button').text()).toEqual('button');
    expect(wrapper.find('button').hasClass('zad-btn')).toBeTruthy();
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });

  it('Icon', () => {
    const wrapper = mount(
      <Button disabled><Icon name={'shield'}/>hello</Button>
    );

    expect(wrapper.find('i').hasClass('fa-shield')).toBeTruthy();
    expect(wrapper.find('button').text()).toEqual('hello');
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });
});