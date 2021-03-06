/**
 * Created by zad on 16/11/30.
 */
import React from 'react';

import './TestPage.less';

import {
  Icon,
  Button,
  Row,
  Col,
  Affix,
  ToTop,
  Breadcrumb,
  DropDown,
  Loading,
  Menu,
  Pagination,
  Tab,
  Input,
  Checkbox,
  Radio,
  Carousel,
  Message,
} from '../components';
const ButtonGroup = Button.Group;
const BreadcrumbItem = Breadcrumb.Item;
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabItem = Tab.TabItem;
const InputGroup = Input.Group;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;

const mock = {
  bread: {
    // react-router mock
    params: { userId: 1, appId: 2, postId: 3 },
    routes: [
      { path: '/', breadcrumbName: 'Home' },
      { path: 'user/:userId', breadcrumbName: 'User:userId' },
      { path: 'application/:appId', breadcrumbName: 'Application:appId' },
      { path: 'post/:postId', breadcrumbName: 'Post:postId' }
    ]
  },
  dropdown: [
    { name: '中国1-China', value: 'CN1' },
    { name: '日本1-Japan', value: 'JP1' },
    { name: '美国1-USA', value: 'USA1' },
    {
      name: '二级菜单', menus: [
      { name: '中国2-China', value: 'CN2' },
      { name: '日本2-Japan', value: 'JP2' },
      { name: '美国2-USA', value: 'USA2' },
      {
        name: '三级菜单', menus: [
        { name: '中国3-China', value: 'CN3' },
        { name: '日本3-Japan', value: 'JP3' },
        { name: '美国3-USA', value: 'USA3' }
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
      loading: true,
      page: 2,
      tab: '3333',
      input: '',
      checkbox: false,
      check_group1: ['Apple'],
      check_group2: ['Apple', 'Orange'],
      checkAll: false,
      indeterminate: true,
      radio_group: 'male',
    };
    this.text = 'test';
    this.testDropDown = this.testDropDown.bind(this);
    this.testPage = this.testPage.bind(this);
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
              <div style={{ background: '#eee' }}>
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
              <div style={{ background: '#eee' }}>
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

        <div style={{ width: 240 }}>
          <Menu onlyExpandOneSub>
            <SubMenu key="sub-1" title={<span><Icon name={'folder-o'}/><span>Navigation One</span></span>}>
              <MenuItemGroup title={'test1'}>
                <MenuItem key="111">11111</MenuItem>
                <MenuItem key="222">22222</MenuItem>
              </MenuItemGroup>
              <MenuItemGroup title={'test2'}>
                <MenuItem key="333">33333</MenuItem>
                <MenuItem key="444">44444</MenuItem>
              </MenuItemGroup>
            </SubMenu>

            <SubMenu key="sub-2" title={<span><Icon name={'shield'}/><span>Navigation Two</span></span>}>
              <SubMenu key="sub-2-1" title="Submenu 1">
                <MenuItemGroup title={'test3'}>
                  <MenuItem key="555">55555</MenuItem>
                  <MenuItem key="666">66666</MenuItem>
                </MenuItemGroup>
                <SubMenu key="sub-2-1-1" title="Submenu 2">
                  <MenuItemGroup title={'test4'}>
                    <MenuItem key="aaa">aaaaa</MenuItem>
                    <MenuItem key="bbb">bbbbb</MenuItem>
                  </MenuItemGroup>
                </SubMenu>
              </SubMenu>
              <MenuItemGroup title={'test5'}>
                <MenuItem key="777">77777</MenuItem>
                <MenuItem key="888">88888</MenuItem>
              </MenuItemGroup>
            </SubMenu>

            <SubMenu key="sub-3" title={<span><Icon name={'user'}/><span>Navigation Three</span></span>}>
              <Menu.Item key="option5">Option 5</Menu.Item>
              <Menu.Item key="option6">Option 6</Menu.Item>
              <SubMenu key="sub-3-1" title="Submenu 1">
                <Menu.Item key="option7">Option 7</Menu.Item>
                <Menu.Item key="option8">Option 8</Menu.Item>
                <SubMenu key="sub-3-1-1" title="Submenu 2">
                  <Menu.Item key="option1">Option 1</Menu.Item>
                  <Menu.Item key="option2">Option 2</Menu.Item>
                </SubMenu>
              </SubMenu>
            </SubMenu>
          </Menu>
        </div>
        <br/>

        <Pagination current={this.state.page} total={155} onChange={this.testPage} showQuickJumper/>
        <br/>

        <div style={{ width: 400 }}>
          <Tab defaultCurrent={'22'} onTabChange={this.testTab2}>
            <TabItem name="Tab 1111" key="11">11111</TabItem>
            <div>12345</div>
            <TabItem name="Tab 22" key="22">22222</TabItem>
            <TabItem name="Tab 333" key="33">33333</TabItem>
            <TabItem name="Tab 4">44444</TabItem>
          </Tab>
        </div>
        <br/>
        <div style={{ width: 400 }}>
          <Tab current={this.state.tab} type={'inline'} onTabChange={this.testTab}>
            <TabItem name="Tab 1" key="1111">11111</TabItem>
            <TabItem name="Tab 2" key="2222">22222</TabItem>
            <TabItem name="Tab 3" key="3333">33333</TabItem>
            <TabItem name="Tab 4" key="4444">44444</TabItem>
          </Tab>
        </div>
        <br/>
        <div style={{ width: 400, height: 250 }}>
          <Tab type={'inline'} animation={false} onTabChange={this.testTab2}>
            <TabItem name="Input" key="1111">
              <div className="test-input">
                <Input onChange={this.testInput} placeholder="受控input" value={this.state.input}/>
                <Input disabled placeholder="disabled"/>
                <Input size={'large'} placeholder="large size"/>
                <Input placeholder="default size" onChange={this.testInput2} onPressEnter={this.testInputEnter}/>
                <Input size={'small'} placeholder="small size"/>
              </div>
              <br/>
            </TabItem>
            <TabItem name="InputGroup" key="2222">
              <InputGroup>
                <Col span={6}>
                  <Input defaultValue="0571"/>
                </Col>
                <Col span={8}>
                  <Input defaultValue="26888888"/>
                </Col>
              </InputGroup>
              <br/>
              <InputGroup compact={true} size={'large'}>
                <Input style={{ width: '15%' }} defaultValue="+86"/>
                <Input style={{ width: '20%' }} defaultValue="0571" size={'small'}/>
                <Input style={{ width: '30%' }} defaultValue="26888888"/>
              </InputGroup>
              <br/>
              <InputGroup compact={true}>
                <Input style={{ width: '20%' }} defaultValue="0571"/>
                <Input style={{ width: '30%' }} defaultValue="26888888"/>
              </InputGroup>
            </TabItem>
            <TabItem name="Tab 3" key="3333">333333</TabItem>
            <TabItem name="Tab 4" key="4444">444444</TabItem>
          </Tab>
        </div>
        <h3>CheckBox</h3>
        <div style={{ width: 400 }}>
          <Checkbox defaultChecked={true} onChange={this.testCheckBox1}>非受控</Checkbox>
          <Checkbox checked={this.state.checkbox} onChange={this.testCheckBox2}>受控</Checkbox>
        </div>
        <br/>
        <div style={{ width: 400 }}>
          <Checkbox defaultChecked={true} disabled>disabled1</Checkbox>
          <Checkbox indeterminate={true} disabled>disabled2</Checkbox>
          <Checkbox disabled>disabled3</Checkbox>
        </div>
        <br/>
        非受控
        <CheckboxGroup
          options={['Apple', 'Pear', 'Orange']}
          defaultValue={['Pear', 'Orange']}
          onChange={this.testCheckGroup1}
        />
        <br/>
        受控
        <CheckboxGroup
          options={[
            { name: 'Apple', value: 'Apple' },
            { name: 'Pear', value: 'Pear' },
            { name: 'Orange', value: 'Orange', disabled: true },
          ]}
          value={this.state.check_group1}
          onChange={this.testCheckGroup2}
        />
        <br/>
        <div style={{ width: 300 }}>
          中间状态
          <div style={{ borderBottom: '1px solid #E9E9E9', paddingBottom: 5 }}>
            <Checkbox
              checked={this.state.checkAll}
              indeterminate={this.state.indeterminate}
              onChange={this.testCheckAll}
            >
              Check All
            </Checkbox>
          </div>
          <br/>
          <CheckboxGroup
            options={['Apple', 'Pear', 'Orange']}
            value={this.state.check_group2}
            onChange={this.testCheckGroup3}
          />
        </div>
        <h3>Radio</h3>
        <div style={{ width: 400 }}>
          <Radio>Radio1</Radio>
          <Radio checked={true}>Radio2</Radio>
          <br/>
          <Radio disabled checked={false}>disabled</Radio>
          <Radio disabled checked={true}>disabled</Radio>
        </div>
        <br/>
        <div>
          非受控
          <RadioGroup
            options={[
              { name: '男性', value: 'male' },
              { name: '女性', value: 'female' },
              { name: '其他', value: 'other', disabled: true },
            ]}
            defaultValue={'female'}
            onChange={this.testRadioGroup1}
          />
        </div>
        <br/>
        <div>
          受控
          <RadioGroup
            options={[
              { name: '男性', value: 'male' },
              { name: '女性', value: 'female' },
              { name: '其他', value: 'other' },
            ]}
            value={this.state.radio_group}
            onChange={this.testRadioGroup2}
          />
        </div>
        <br/>
        <div style={{ width: 400 }} className="test-carousel">
          <p style={{ color: 'black' }}>normal carousel</p>
          <Carousel onPageChange={this.testCarousel}>
            <div><h3>0</h3></div>
            <div><h3>1</h3></div>
            <div><h3>2</h3></div>
            <div><h3>3</h3></div>
            <div><h3>4</h3></div>
            <div><h3>5</h3></div>
          </Carousel>
        </div>
        <div style={{ width: 400 }} className="test-carousel">
          <p style={{ color: 'black' }}>自动播放</p>
          <Carousel auto>
            <div><h3>0</h3></div>
            <div><h3>1</h3></div>
            <div><h3>2</h3></div>
            <div><h3>3</h3></div>
            <div><h3>4</h3></div>
            <div><h3>5</h3></div>
          </Carousel>
        </div>
        <br/>
        <div className="test-corner">
          123
        </div>
        <br/>
        <Button className="test-btn" onClick={this.infoMessage}>info</Button>
        <Button className="test-btn" onClick={this.successMessage}>success</Button>
        <Button className="test-btn" onClick={this.setMessage}>setOptions</Button>
        <Button className="test-btn" onClick={this.destroyMessage}>destroy</Button>
      </div>
    );
  }

  setMessage = () => {
    Message.setOptions({
      containerClass: 'test123',
    });
  };

  destroyMessage = () => {
    Message.destroy();
  };

  infoMessage = () => {
    Message.info({
      content: 'info',
      duration: 60000 * 5,
      itemClass: 'test-info'
    });
  };

  successMessage = () => {
    Message.success({
      content: 'success',
      duration: 60000 * 5,
    });
  };

  testCarousel(obj) {
    console.log(obj);
  }

  testRadioGroup1 = (o) => {
    console.log(o);
  };

  testRadioGroup2 = ({ value }) => {
    console.log(`radio的值为: ${value}`);
    this.setState({
      radio_group: value,
    });
  };

  testCheckGroup1 = (v) => {
    console.log(v);
  };

  testCheckGroup2 = (v) => {
    console.log(v);
    this.setState({
      check_group1: v,
    });
  };

  testCheckGroup3 = (v) => {
    const totalOptions = ['Apple', 'Pear', 'Orange'];
    this.setState({
      check_group2: v,
      indeterminate: 0 < v.length && v.length < totalOptions.length,
      checkAll: v.length === totalOptions.length,
    });
  };

  testCheckAll = (e) => {
    const totalOptions = ['Apple', 'Pear', 'Orange'];
    this.setState({
      check_group2: e.target.checked ? totalOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  testCheckBox1 = (e) => {
    console.log(`checked: ${e.target.checked}`);
  };

  testCheckBox2 = (e) => {
    console.log(`checked: ${e.target.checked}`);
    this.setState({
      checkbox: e.target.checked,
    });
  };

  testInput = (e) => {
    console.log(`输入中 现在input的值为${e.target.value}`);
    this.setState({
      input: e.target.value,
    });
  };

  testInput2(e) {
    console.log(`输入中 现在input的值为${e.target.value}`);
  }

  testInputEnter(e) {
    console.log(`按下回车 现在input的值为${e.target.value}`);
  }

  testTab = (key) => {
    console.log(`当前tab的key为${key}`);
    this.setState({
      tab: key,
    });
  };

  testTab2(key) {
    console.log(`当前tab的key为${key}`);
  }

  testPage(page) {
    this.setState({
      page,
    });
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
