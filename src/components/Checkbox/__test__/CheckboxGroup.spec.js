/**
 * Created by zad on 17/4/11.
 */
import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import Checkbox from '../Checkbox';
import CheckboxGroup from '../CheckboxGroup';

describe('CheckboxGroup Test', () => {
  it('controlled component', () => {
    class Test extends React.Component {
      constructor(props) {
        super(props);
        this.state = {check_group: ['Pear', 'Orange']};
      }

      testCheckGroup = (v) => {
        this.setState({
          check_group: v,
        })
      };

      render() {
        return (
          <CheckboxGroup
            options={['Apple', 'Pear', 'Orange']}
            value={this.state.check_group}
            onChange={this.testCheckGroup}
          />
        );
      }
    }

    const wrapper = shallow(<Test/>);

    expect(wrapper.state('check_group')).toContain('Pear');
    expect(wrapper.state('check_group')).toContain('Orange');
    expect(wrapper.state('check_group')).not.toContain('Apple');
    wrapper.shallow().find(Checkbox).at(0).simulate('change'); // Apple on
    wrapper.shallow().find(Checkbox).at(2).simulate('change'); // Orange off
    expect(wrapper.state('check_group')).toContain('Apple');
    expect(wrapper.state('check_group')).toContain('Pear');
    expect(wrapper.state('check_group')).not.toContain('Orange');

    expect(shallowToJson(wrapper.shallow())).toMatchSnapshot();
  });

  it('uncontrolled component', () => {
    const wrapper = shallow(
      <CheckboxGroup
        options={['Apple', 'Pear', 'Orange']}
        defaultValue={['Pear', 'Orange']}
      />
    );

    expect(wrapper.state().value).toContain('Pear');
    expect(wrapper.state().value).toContain('Orange');
    expect(wrapper.state().value).not.toContain('Apple');
    wrapper.find(Checkbox).at(0).simulate('change'); // Apple on
    wrapper.find(Checkbox).at(1).simulate('change'); // Pear off
    expect(wrapper.state().value).toContain('Apple');
    expect(wrapper.state().value).toContain('Orange');
    expect(wrapper.state().value).not.toContain('Pear');

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('with disabled', () => {
    const wrapper = shallow(
      <CheckboxGroup
        options={[
          {name: 'Apple', value: 'Apple'},
          {name: 'Pear', value: 'Pear'},
          {name: 'Orange', value: 'Orange', disabled: true},
        ]}
        defaultValue={['Pear', 'Orange']}
      />
    );

    expect(wrapper.find(Checkbox).at(0).prop('disabled')).toBe(false);
    expect(wrapper.find(Checkbox).at(1).prop('disabled')).toBe(false);
    expect(wrapper.find(Checkbox).at(2).prop('disabled')).toBe(true);

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
