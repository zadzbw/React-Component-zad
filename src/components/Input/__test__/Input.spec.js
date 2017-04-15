/**
 * Created by zad on 17/4/11.
 */
import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import Input from '../Input';
import InputGroup from '../InputGroup';
import Col from '../../../components/Grid/Col';

describe('Input Test', () => {
  it('normal', () => {
    class Test extends React.Component {
      constructor(props) {
        super(props);
        this.state = {input: 'test1'};
      }

      testInput = (e) => {
        this.setState({
          input: e.target.value
        })
      };

      render() {
        return (
          <div>
            <Input disabled placeholder="disabled"/>
            <Input size={'large'} placeholder="large size"/>
            <Input placeholder="default size" onChange={this.testInput} value={this.state.input}/>
            <Input size={'small'} placeholder="small size"/>
          </div>
        );
      }
    }

    const wrapper = shallow(<Test/>);

    // simulate change
    expect(wrapper.find(Input).at(2).props().value).toBe('test1');
    wrapper.find(Input).at(2).simulate('change', {keyCode: 13, target: {value: 'test2'}});
    expect(wrapper.find(Input).at(2).props().value).toBe('test2');

    expect(wrapper.find(Input).at(1).shallow().hasClass('zad-input-lg')).toBeTruthy();
    expect(wrapper.find(Input).at(3).shallow().hasClass('zad-input-sm')).toBeTruthy();

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe('InputGroup Test', () => {
  it('no compact', () => {
    const wrapper = shallow(
      <InputGroup size={'large'}>
        <Col span={6}>
          <Input defaultValue="0571"/>
        </Col>
        <Col span={8}>
          <Input defaultValue="26888888"/>
        </Col>
      </InputGroup>
    );

    expect(wrapper.hasClass('zad-input-group-lg')).toBeTruthy();
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('no compact', () => {
    const wrapper = shallow(
      <InputGroup size={'small'} compact={true}>
        <Input style={{width: '15%'}} defaultValue="+86"/>
        <Input style={{width: '20%'}} defaultValue="0571" size={'small'}/>
        <Input style={{width: '30%'}} defaultValue="26888888"/>
      </InputGroup>
    );

    expect(wrapper.hasClass('zad-input-group-sm')).toBeTruthy();
    expect(wrapper.hasClass('zad-input-group-compact')).toBeTruthy();
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
