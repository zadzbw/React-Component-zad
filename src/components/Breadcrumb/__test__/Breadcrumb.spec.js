/**
 * Created by zad on 16/12/13.
 */
import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import Breadcrumb from '../../Breadcrumb';
import Icon from '../../Icon';

const BreadcrumbItem = Breadcrumb.Item;

describe('Breadcrumb test', () => {
  it('normal', () => {
    const wrapper = shallow(
      <Breadcrumb>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem><a href="#/post">Post</a></BreadcrumbItem>
        <BreadcrumbItem href={'#/app'}><Icon name={'shield'}/><span>Application</span></BreadcrumbItem>
        <div>test</div>
      </Breadcrumb>
    );

    expect(wrapper.hasClass('zad-bread')).toBeTruthy();
    expect(wrapper.children()).toHaveLength(3);

    expect(wrapper.find(BreadcrumbItem).at(0).shallow().text()).toEqual('Home/');
    expect(wrapper.find(BreadcrumbItem).at(0).shallow().find('.zad-bread-item-link').type()).toEqual('span');

    expect(wrapper.find(BreadcrumbItem).at(1).shallow().find('.zad-bread-item-link').type()).toEqual('span');
    expect(wrapper.find(BreadcrumbItem).at(1).shallow().find('.zad-bread-item-link').children().at(0).type()).toEqual('a');
    expect(wrapper.find(BreadcrumbItem).at(1).shallow().find('.zad-bread-item-link').children().get(0).props.href).toEqual('#/post');

    expect(wrapper.find(BreadcrumbItem).at(2).shallow().find('.zad-bread-item-link').type()).toEqual('a');
    expect(wrapper.find(BreadcrumbItem).at(2).shallow().find('a').at(0).hasClass('zad-bread-item-link')).toBeTruthy();
    expect(wrapper.find(BreadcrumbItem).at(2).shallow().find('span').at(0).hasClass('zad-bread-item-link')).toBeFalsy();

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('separator', () => {
    const wrapper = shallow(
      <Breadcrumb separator={'>'}>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Application</BreadcrumbItem>
        <BreadcrumbItem>About</BreadcrumbItem>
      </Breadcrumb>
    );

    expect(wrapper.find(BreadcrumbItem).at(0).shallow().text()).toEqual('Home>');
    expect(wrapper.find(BreadcrumbItem).at(1).shallow().text()).toEqual('Application>');
    expect(wrapper.find(BreadcrumbItem).at(2).shallow().text()).toEqual('About>');

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('react-router mock', () => {
    const mock = {
      bread: {
        // react-router mock
        params: {userId: 1, appId: 2, postId: 3},
        routes: [
          {path: '/', breadcrumbName: 'Home'},
          {path: 'user/:userId', breadcrumbName: 'User:userId'},
          {path: 'application/:appId', breadcrumbName: 'Application:appId'},
          {path: 'post/:postId', breadcrumbName: 'Post:postId'}
        ]
      }
    };
    const wrapper = shallow(<Breadcrumb params={mock.bread.params} routes={mock.bread.routes}/>);

    expect(wrapper.find(BreadcrumbItem).at(0).shallow().text()).toEqual('Home/');
    expect(wrapper.find(BreadcrumbItem).at(0).shallow().find('.zad-bread-item-link').children().get(0).props.href).toEqual('#/');

    expect(wrapper.find(BreadcrumbItem).at(1).shallow().text()).toEqual('User1/');
    expect(wrapper.find(BreadcrumbItem).at(1).shallow().find('.zad-bread-item-link').children().get(0).props.href).toEqual('#/user/1');

    expect(wrapper.find(BreadcrumbItem).at(2).shallow().text()).toEqual('Application2/');
    expect(wrapper.find(BreadcrumbItem).at(2).shallow().find('.zad-bread-item-link').children().get(0).props.href).toEqual('#/user/1/application/2');

    expect(wrapper.find(BreadcrumbItem).at(3).shallow().text()).toEqual('Post3/');
    expect(wrapper.find(BreadcrumbItem).at(3).shallow().find('.zad-bread-item-link').children().at(0).type()).toEqual('span');
    expect(wrapper.find(BreadcrumbItem).at(3).shallow().find('.zad-bread-item-link').children().text()).toEqual('Post3');

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
