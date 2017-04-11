/**
 * Created by zad on 17/2/6.
 */
import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import Pagination from '../../Pagination';
import PageItem from '../../Pagination/PageItem';
import Input from '../../Input';

describe('Pagination Test', () => {
  it('Normal', () => {
    const wrapper = shallow(
      <Pagination defaultCurrent={3} total={155}/>
    );

    // page 3
    expect(wrapper.find('.zad-pagination-jump-prev').exists()).toBeFalsy();
    expect(wrapper.find('.zad-pagination-jump-next').exists()).toBeTruthy();
    expect(wrapper.state()._current).toEqual(3);
    expect(wrapper.find(PageItem)).toHaveLength(6);
    expect(wrapper.find('.zad-pagination-prev').hasClass('zad-pagination-disabled')).toBeFalsy();
    expect(wrapper.find('.zad-pagination-next').hasClass('zad-pagination-disabled')).toBeFalsy();

    // page 8
    wrapper.shallow().find('.zad-pagination-jump-next').at(0).shallow().simulate('click');
    expect(wrapper.find('.zad-pagination-jump-prev').exists()).toBeTruthy();
    expect(wrapper.find('.zad-pagination-jump-next').exists()).toBeTruthy();
    expect(wrapper.state()._current).toEqual(8);
    expect(wrapper.find(PageItem)).toHaveLength(7);
    expect(wrapper.find('.zad-pagination-prev').hasClass('zad-pagination-disabled')).toBeFalsy();
    expect(wrapper.find('.zad-pagination-next').hasClass('zad-pagination-disabled')).toBeFalsy();

    // page last
    wrapper.shallow().find(PageItem).at(6).shallow().simulate('click');
    expect(wrapper.find('.zad-pagination-jump-prev').exists()).toBeTruthy();
    expect(wrapper.find('.zad-pagination-jump-next').exists()).toBeFalsy();
    expect(wrapper.state()._current).toEqual(16);
    expect(wrapper.find(PageItem)).toHaveLength(6);
    expect(wrapper.find('.zad-pagination-prev').hasClass('zad-pagination-disabled')).toBeFalsy();
    expect(wrapper.find('.zad-pagination-next').hasClass('zad-pagination-disabled')).toBeTruthy();

    // page first
    wrapper.shallow().find(PageItem).at(0).shallow().simulate('click');
    expect(wrapper.find('.zad-pagination-jump-prev').exists()).toBeFalsy();
    expect(wrapper.find('.zad-pagination-jump-next').exists()).toBeTruthy();
    expect(wrapper.state()._current).toEqual(1);
    expect(wrapper.find(PageItem)).toHaveLength(6);
    expect(wrapper.find('.zad-pagination-prev').hasClass('zad-pagination-disabled')).toBeTruthy();
    expect(wrapper.find('.zad-pagination-next').hasClass('zad-pagination-disabled')).toBeFalsy();

    expect(wrapper.find('.zad-pagination-quick-jumper').exists()).toBeFalsy();
    expect(shallowToJson(wrapper.shallow())).toMatchSnapshot();
  });

  it('QuickJump', () => {
    const wrapper = shallow(
      <Pagination defaultCurrent={3} total={155} showQuickJumper/>
    );
    expect(wrapper.find('.zad-pagination-quick-jumper').exists()).toBeTruthy();

    // to page 9
    wrapper.find('.zad-pagination-quick-jumper').find(Input).simulate('keyUp', {keyCode: 13, target: {value: '9'}});
    expect(wrapper.find('.zad-pagination-jump-prev').exists()).toBeTruthy();
    expect(wrapper.find('.zad-pagination-jump-next').exists()).toBeTruthy();
    expect(wrapper.state()._current).toEqual(9);
    expect(wrapper.find(PageItem)).toHaveLength(7);
    expect(wrapper.find('.zad-pagination-prev').hasClass('zad-pagination-disabled')).toBeFalsy();
    expect(wrapper.find('.zad-pagination-next').hasClass('zad-pagination-disabled')).toBeFalsy();

    expect(shallowToJson(wrapper.shallow())).toMatchSnapshot();
  });
});
