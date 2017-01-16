/**
 * Created by zad on 17/1/16.
 */
import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import Loading from '../../Loading';
import Loader from '../../Loading/Loader';

describe('Loading Test', () => {
  it('normal', () => {
    const wrapper = shallow(
      <Loading size={'other'}/>
    );

    expect(wrapper.shallow().hasClass('zad-loader-is-loading')).toBeTruthy();
    expect(wrapper.shallow().hasClass('zad-loader-show-tip')).toBeFalsy();
    expect(wrapper.shallow().hasClass('zad-loader-sm')).toBeFalsy();
    expect(shallowToJson(wrapper.shallow())).toMatchSnapshot();
  });

  it('size', () => {
    const wrapper = shallow(
      <Loading size={'small'}/>
    );

    expect(wrapper.shallow().hasClass('zad-loader-is-loading')).toBeTruthy();
    expect(wrapper.shallow().hasClass('zad-loader-show-tip')).toBeFalsy();
    expect(wrapper.shallow().hasClass('zad-loader-sm')).toBeTruthy();
    expect(shallowToJson(wrapper.shallow())).toMatchSnapshot();
  });

  it('has tip', () => {
    const wrapper = shallow(
      <Loading tip={'hello'}/>
    );

    expect(wrapper.shallow().hasClass('zad-loader-is-loading')).toBeTruthy();
    expect(wrapper.shallow().hasClass('zad-loader-show-tip')).toBeTruthy();
    expect(wrapper.shallow().hasClass('zad-loader-sm')).toBeFalsy();
    expect(wrapper.shallow().find('.zad-loader-tip').text()).toEqual('hello');
    expect(shallowToJson(wrapper.shallow())).toMatchSnapshot();
  });

  it('not loading', () => {
    const wrapper = shallow(
      <Loading loading={false}/>
    );

    expect(wrapper.shallow().hasClass('zad-loader-is-loading')).toBeFalsy();
    expect(wrapper.shallow().hasClass('zad-loader-show-tip')).toBeFalsy();
    expect(wrapper.shallow().hasClass('zad-loader-sm')).toBeFalsy();
    expect(wrapper.shallow().find('.zad-loader-tip').isEmpty()).toBeTruthy();
    expect(shallowToJson(wrapper.shallow())).toMatchSnapshot();
  });


  it('has children', () => {
    const wrapper = shallow(
      <Loading>
        <div className="test">
          test
        </div>
      </Loading>
    );

    expect(wrapper.find(Loader).props().loading).toEqual(true);
    expect(wrapper.find('.zad-loading-container').hasClass('zad-loading-blur')).toBeTruthy();
    expect(wrapper.find('.zad-loading-container').text()).toEqual('test');
    expect(shallowToJson(wrapper.shallow())).toMatchSnapshot();
  });
});
