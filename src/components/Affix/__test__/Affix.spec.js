/**
 * Created by zad on 16/12/9.
 */
import React from 'react';
import {mount} from 'enzyme';
import {mountToJson} from 'enzyme-to-json';
import Affix from '../../Affix';
import Button from '../../Button';

describe('Affix test', () => {
  it('normal', () => {
    const wrapper = mount(
      <Affix offsetTop={20}>
        <Button type="primary">Affix top</Button>
      </Affix>
    );
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });
});
