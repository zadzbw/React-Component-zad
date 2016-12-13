/**
 * Created by zad on 16/12/13.
 */
import React from 'react';
import {mount} from 'enzyme';
import {mountToJson} from 'enzyme-to-json';
import ToTop from '../../ToTop';

describe('ToTop test', () => {
  it('init', () => {
    const wrapper = mount(
      <ToTop/>
    );

    expect(wrapper.text()).toEqual('');
    expect(wrapper.find('div')).toHaveLength(0);
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });
});
