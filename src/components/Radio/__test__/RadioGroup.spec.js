/**
 * Created by zad on 17/4/17.
 */
import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import Radio from '../Radio';
import RadioGroup from '../RadioGroup';

describe('Radio Test', () => {
  it('controlled component', () => {
    class Test extends React.Component {
      constructor(props) {
        super(props);
        this.state = {radio_group: 'other'};
      }

      testCheckGroup = ({value}) => {
        this.setState({
          radio_group: value,
        })
      };

      render() {
        return (
          <RadioGroup
            options={[
              {name: '男性', value: 'male'},
              {name: '女性', value: 'female'},
              {name: '其他', value: 'other'},
            ]}
            value={this.state.radio_group}
            onChange={this.testCheckGroup}
          />
        );
      }
    }

    const wrapper = shallow(<Test/>);

    expect(wrapper.state('radio_group')).toEqual('other');
    expect(wrapper.shallow().find(Radio).at(2).prop('checked')).toBe(true);

    expect(wrapper.shallow().find(Radio).at(0).simulate('change')); // male

    expect(wrapper.state('radio_group')).toEqual('male');
    expect(wrapper.shallow().find(Radio).at(0).prop('checked')).toBe(true);

    expect(shallowToJson(wrapper.shallow())).toMatchSnapshot();
  });

  it('uncontrolled component', () => {
    const wrapper = shallow(
      <RadioGroup
        options={[
          {name: '男性', value: 'male'},
          {name: '女性', value: 'female'},
          {name: '其他', value: 'other'},
        ]}
        defaultValue={'female'}
      />
    );

    expect(wrapper.state('value')).toEqual('female');
    expect(wrapper.find(Radio).at(1).prop('checked')).toBe(true);
    expect(wrapper.shallow().find(Radio).at(2).simulate('change'));
    expect(wrapper.state('value')).toEqual('other');
    expect(wrapper.find(Radio).at(2).prop('checked')).toBe(true);

    expect(shallowToJson(wrapper.shallow())).toMatchSnapshot();
  });

  it('with disabled', () => {
    const wrapper = shallow(
      <RadioGroup
        options={[
          {name: '男性', value: 'male'},
          {name: '女性', value: 'female', disabled: true},
          {name: '其他', value: 'other'},
        ]}
        defaultValue={'female'}
      />
    );

    expect(wrapper.find(Radio).at(1).prop('checked')).toBe(true);

    expect(wrapper.find(Radio).at(0).prop('disabled')).toBe(false);
    expect(wrapper.find(Radio).at(1).prop('disabled')).toBe(true);
    expect(wrapper.find(Radio).at(2).prop('disabled')).toBe(false);

    expect(shallowToJson(wrapper.shallow())).toMatchSnapshot();
  });
});
