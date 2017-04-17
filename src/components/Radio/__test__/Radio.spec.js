/**
 * Created by zad on 17/4/17.
 */
import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import Radio from '../Radio';

describe('Radio Test', () => {
  it('normal', () => {
    const wrapper = shallow(
      <Radio>Radio</Radio>
    );

    expect(wrapper.state().checked).toEqual(false);
    wrapper.find('input').at(0).simulate('change', {target: {checked: true}}); // change
    expect(wrapper.state().checked).toEqual(true);

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('disabled', () => {
    const wrapper = shallow(
      <Radio disabled={true}>Radio</Radio>
    );

    expect(wrapper.state().checked).toEqual(false);
    wrapper.find('input').at(0).simulate('change', {target: {checked: true}}); // change
    expect(wrapper.state().checked).toEqual(false); // not changed because disabled

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
