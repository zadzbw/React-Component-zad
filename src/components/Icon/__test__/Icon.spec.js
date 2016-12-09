/**
 * Created by zad on 16/12/7.
 */
import React from 'react';
import {mount} from 'enzyme';
import {mountToJson} from 'enzyme-to-json';
import Icon from '../../Icon';

describe('Icon test', () => {
  it('icon name', () => {
    const wrapper = mount(
      <Icon name={'shield'}/>
    );
    expect(wrapper.find('i').hasClass('fa-shield')).toBeTruthy();
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });

  it('size', () => {
    const wrapper = mount(
      <Icon name={'shield'} size={'2x'}/>
    );
    expect(wrapper.find('i').hasClass('fa-shield')).toBeTruthy();
    expect(wrapper.find('i').hasClass('fa-2x')).toBeTruthy();
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });

  it('fixedWidth', () => {
    const wrapper = mount(
      <Icon name={'shield'} fixedWidth={true}/>
    );
    expect(wrapper.find('i').hasClass('fa-shield')).toBeTruthy();
    expect(wrapper.find('i').hasClass('fa-fw')).toBeTruthy();
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });

  it('spin', () => {
    const wrapper = mount(
      <Icon name={'shield'} spin={true}/>
    );
    expect(wrapper.find('i').hasClass('fa-shield')).toBeTruthy();
    expect(wrapper.find('i').hasClass('fa-spin')).toBeTruthy();
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });

  it('pulse', () => {
    const wrapper = mount(
      <Icon name={'shield'} pulse={true}/>
    );
    expect(wrapper.find('i').hasClass('fa-shield')).toBeTruthy();
    expect(wrapper.find('i').hasClass('fa-pulse')).toBeTruthy();
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });

  it('rotate', () => {
    const wrapper = mount(
      <Icon name={'shield'} rotate={90}/>
    );
    expect(wrapper.find('i').hasClass('fa-shield')).toBeTruthy();
    expect(wrapper.find('i').hasClass('fa-rotate-90')).toBeTruthy();
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });
});
