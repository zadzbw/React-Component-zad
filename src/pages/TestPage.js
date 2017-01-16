/**
 * Created by zad on 16/11/30.
 */
import React from 'react';

import './TestPage.less';

import {Icon, Button, Row, Col, Affix, ToTop, Breadcrumb, DropDown, Loading, Menu} from '../components';
const ButtonGroup = Button.Group;
const BreadcrumbItem = Breadcrumb.Item;
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

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
  },
  dropdown: [
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
  ]
};

export default class TestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    this.text = 'test';
    this.testDropDown = this.testDropDown.bind(this);
    this.changeLoading = this.changeLoading.bind(this);
  }

  render() {
    return (
      <div className="test-wrap">
        <Button className="test-btn" type={'primary'}>primary</Button>
        <Button className="test-btn">default</Button>
        <Button className="test-btn" type={'ghost'}>ghost</Button>
        <Button className="test-btn" type={'dashed'}>dashed</Button>
        <br/>
        <Button className="test-btn" type={'primary'}><Icon name={'shield'}/>shield</Button>
        <Button className="test-btn" shape={'circle'}><Icon name={'shield'}/></Button>
        <Button className="test-btn" type={'ghost'}>shield<Icon name={'shield'}/></Button>
        <Button className="test-btn" type={'dashed'} shape={'circle'}><Icon name={'shield'}/></Button>
        <br/>
        <ButtonGroup>
          <Button className="test-btn" type={'primary'}>primary</Button>
          <Button className="test-btn">default</Button>
          <Button className="test-btn" type={'ghost'}>ghost</Button>
          <Button className="test-btn" type={'dashed'}>dashed</Button>
        </ButtonGroup>
        <br/>
        <Row className="test-row" gap={24}>
          <Col className="test-col" span={4}>
            <div className="test-col-box">Column</div>
          </Col>
          <Col className="test-col" span={4}>
            <div className="test-col-box">Column</div>
          </Col>
          <Col className="test-col" span={6}>
            <div className="test-col-box">Column</div>
          </Col>
          <Col className="test-col" span={6}>
            <div className="test-col-box">Column</div>
          </Col>
        </Row>
        <br/>
        <Row className="test-row" gap={24}>
          <Col className="test-col" xs={2} sm={4} md={6} lg={8}>
            <div className="test-col-box">Column</div>
          </Col>
          <Col className="test-col" xs={20} sm={16} md={12} lg={8}>
            <div className="test-col-box">Column</div>
          </Col>
          <Col className="test-col" xs={2} sm={4} md={6} lg={8}>
            <div className="test-col-box">Column</div>
          </Col>
        </Row>
        <br/>
        <div>
          <Affix offsetTop={20}>
            <Button type="primary">Affix top</Button>
          </Affix>
          <br />
          <Affix offsetBottom={20}>
            <Button type="primary">Affix bottom</Button>
          </Affix>
        </div>
        <br/>
        <div>
          <Breadcrumb>
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem><a href="#/post">Post</a></BreadcrumbItem>
            <BreadcrumbItem href={'#/app'}><Icon name={'shield'}/><span>Application</span></BreadcrumbItem>
            <BreadcrumbItem href={'#/app/details'}><Icon name={'shield'}/><span>Details</span></BreadcrumbItem>
            <BreadcrumbItem>About</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <br/>
        <div>
          <Breadcrumb params={mock.bread.params} routes={mock.bread.routes}/>
        </div>
        <br/>
        <div>
          <DropDown className="test-dropdown" menus={mock.dropdown} onSelect={this.testDropDown}>
            DropDown
          </DropDown>
          <DropDown className="test-dropdown" menus={mock.dropdown} onSelect={this.testDropDown}>
            DropDown
          </DropDown>
        </div>
        <br/>
        <ToTop duration={700}/>
        <div>
          <Row gap={24}>
            <Col span={6}>
              <div style={{background: '#eee'}}>
                <Loading tip="waiting for success..." size={'default'} loading={this.state.loading} delay={300}>
                  <div>
                    <p>111111111</p>
                    <p>222222222</p>
                    <p>333333333</p>
                    <p>444444444</p>
                    <p>555555555</p>
                    <p>666666666</p>
                    <p>777777777</p>
                  </div>
                </Loading>
              </div>
            </Col>
            <Col span={6}>
              <div style={{background: '#eee'}}>
                <Loading size={'small'}/>
                <Loading/>
                <Loading size={'large'}/>
              </div>
            </Col>
          </Row>
          <br/>
          <Button type={'primary'} onClick={this.changeLoading}>change loading</Button>
        </div>
        <br/>

        <div style={{width: 240}}>
          <Menu>
            <SubMenu key="sub1" title={'navigation one'}>
              <MenuItemGroup title={'test1'}>
                <MenuItem>11111</MenuItem>
                <MenuItem>22222</MenuItem>
              </MenuItemGroup>
              <MenuItemGroup title={'test2'}>
                <MenuItem>33333</MenuItem>
                <MenuItem>44444</MenuItem>
              </MenuItemGroup>
            </SubMenu>

            <SubMenu key="sub2" title={'navigation two'}>
              <MenuItemGroup title={'test3'}>
                <MenuItem>55555</MenuItem>
                <MenuItem>66666</MenuItem>
              </MenuItemGroup>
              <MenuItemGroup title={'test4'}>
                <MenuItem>77777</MenuItem>
                <MenuItem>88888</MenuItem>
              </MenuItemGroup>
            </SubMenu>

            <SubMenu key="sub3" title={'navigation three'}>
              <Menu.Item key="5">Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
              <SubMenu key="sub4" title="Submenu">
                <Menu.Item key="7">Option 7</Menu.Item>
                <Menu.Item key="8">Option 8</Menu.Item>
              </SubMenu>
            </SubMenu>
          </Menu>
        </div>

      </div>
    );
  }

  testDropDown(value, e) {
    console.log(this.text, value, e.target);
  }

  changeLoading() {
    this.setState({
      loading: !this.state.loading
    });
  }
}
