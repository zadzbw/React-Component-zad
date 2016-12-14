/**
 * Created by zad on 16/11/30.
 */
import React from 'react';

import './TestPage.less';

import {Icon, Button, Row, Col, Affix, ToTop, Breadcrumb} from '../components';
const ButtonGroup = Button.Group;
const BreadcrumbItem = Breadcrumb.Item;

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

export default class TestPage extends React.Component {
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
        <ToTop duration={700}/>
      </div>
    );
  }
}
