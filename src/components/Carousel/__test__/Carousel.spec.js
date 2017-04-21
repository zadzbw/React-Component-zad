/**
 * Created by zad on 17/4/21.
 */
import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import Carousel from '../Carousel';

describe('Carousel', () => {
  it('normal', () => {
    const wrapper = shallow(
      <Carousel>
        <div><h3>0</h3></div>
        <div><h3>1</h3></div>
        <div><h3>2</h3></div>
        <div><h3>3</h3></div>
        <div><h3>4</h3></div>
        <div><h3>5</h3></div>
      </Carousel>
    );

    expect(wrapper.state('current')).toEqual(0);
    expect(wrapper.find('.zad-carousel-dot').at(0).hasClass('zad-carousel-dot-active')).toBeTruthy();
    wrapper.find('.zad-carousel-dot').at(3).find('button').simulate('click'); // dot click
    expect(wrapper.state('current')).toEqual(3);
    expect(wrapper.find('.zad-carousel-dot').at(3).hasClass('zad-carousel-dot-active')).toBeTruthy();

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

});