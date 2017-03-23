/**
 * Created by zad on 17/3/23.
 */
import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import Tab from '../../Tab';
import TabItem from '../../Tab/TabItem';
import TabBar from '../../Tab/TabBar';
import {describe, it} from 'eslint/lib/testers/event-generator-tester';

// 不知为何高阶组件不能simulate
describe('Tab', () => {
  it('normal', () => {
    const wrapper = shallow(
      <Tab defaultCurrent={'33'}>
        <TabItem name="Tab 1111" key="11">11111</TabItem>
        <TabItem name="Tab 22" key="22">22222</TabItem>
        <div>12345</div>
        <TabItem name="Tab 333" key="33">33333</TabItem>
      </Tab>
    );

    expect(wrapper.shallow().hasClass('zad-tab-card')).toBeTruthy();

    expect(wrapper.shallow().find(TabBar)).toHaveLength(3);
    expect(wrapper.shallow().find(TabBar).at(2).shallow().hasClass('zad-tab-bar-active')).toBeTruthy();
    expect(wrapper.shallow().find(TabItem)).toHaveLength(3);
    expect(wrapper.shallow().find(TabItem).at(2).shallow().hasClass('zad-tab-item-active')).toBeTruthy();

    expect(shallowToJson(wrapper.shallow())).toMatchSnapshot();
  });

  it('inline', () => {
    const wrapper = shallow(
      <Tab defaultCurrent={'22'} type={'inline'}>
        <TabItem name="Tab 1111" key="11">11111</TabItem>
        <TabItem name="Tab 22" key="22">22222</TabItem>
        <div>12345</div>
        <TabItem name="Tab 333" key="33">33333</TabItem>
        <TabItem name="Tab 444" key="4">4444</TabItem>
      </Tab>
    );

    expect(wrapper.shallow().hasClass('zad-tab-inline')).toBeTruthy();

    expect(wrapper.shallow().find(TabBar)).toHaveLength(4);
    expect(wrapper.shallow().find(TabBar).at(1).shallow().hasClass('zad-tab-bar-active')).toBeTruthy();
    expect(wrapper.shallow().find(TabItem)).toHaveLength(4);
    expect(wrapper.shallow().find(TabItem).at(1).shallow().hasClass('zad-tab-item-active')).toBeTruthy();

    expect(shallowToJson(wrapper.shallow())).toMatchSnapshot();
  })
});
