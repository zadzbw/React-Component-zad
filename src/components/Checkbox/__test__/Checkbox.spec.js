/**
 * Created by zad on 17/4/11.
 */
import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import Checkbox from '../Checkbox';

describe('Checkbox Test', () => {
  it('controlled component', () => {
    class Test extends React.Component {
      constructor(props) {
        super(props);
        this.state = {checked: true};
      }

      testCheckBox = (e) => {
        this.setState({
          checked: e.target.checked
        })
      };

      render() {
        return (
          <div>
            <Checkbox checked={this.state.checked} onChange={this.testCheckBox}>受控</Checkbox>
          </div>
        );
      }
    }

    const wrapper = shallow(<Test/>);

    // simulate change
    expect(wrapper.state().checked).toBe(true);
    expect(wrapper.find(Checkbox).at(0).shallow().find('.zad-checkbox').hasClass('zad-checkbox-checked')).toBeTruthy();
    wrapper.find(Checkbox).at(0).simulate('change', {target: {checked: false}}); // change
    expect(wrapper.state().checked).toBe(false);
    expect(wrapper.find(Checkbox).at(0).shallow().find('.zad-checkbox').hasClass('zad-checkbox-checked')).toBeFalsy();

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('uncontrolled component', () => {
    const wrapper = shallow(
      <Checkbox defaultChecked={false}>非受控</Checkbox>
    );

    expect(wrapper.state().checked).toBe(false);
    expect(wrapper.find('.zad-checkbox').hasClass('zad-checkbox-checked')).toBeFalsy();
    wrapper.find('input').at(0).simulate('change', {target: {checked: true}}); // change
    expect(wrapper.state().checked).toBe(true);
    expect(wrapper.find('.zad-checkbox').hasClass('zad-checkbox-checked')).toBeTruthy();

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('disabled', () => {
    const wrapper = shallow(
      <Checkbox disabled={true}>disabled</Checkbox>
    );

    expect(wrapper.hasClass('zad-checkbox-wrapper-disabled')).toBeTruthy();

    expect(wrapper.state().checked).toBe(false);
    wrapper.find('input').at(0).simulate('change', {target: {checked: true}}); // change
    expect(wrapper.state().checked).toBe(false); // not changed because disabled

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('indeterminate', () => {
    const wrapper = shallow(
      <Checkbox indeterminate={true}>indeterminate</Checkbox>
    );

    expect(wrapper.find('.zad-checkbox').hasClass('zad-checkbox-indeterminate')).toBeTruthy();
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
