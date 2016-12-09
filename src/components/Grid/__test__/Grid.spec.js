/**
 * Created by zad on 16/12/9.
 */
import React from 'react';
import {mount} from 'enzyme';
import {mountToJson} from 'enzyme-to-json';
import {Row, Col} from '../../Grid';

describe('Grid test', () => {
  it('normal', () => {
    const wrapper = mount(
      <Row className="test-row" gap={24}>
        <Col className="test-col" span={4}>
          <div className="test-col-box">
            col-4
          </div>
        </Col>
        <Col className="test-col" span={6}>
          <div className="test-col-box">
            col-6
          </div>
        </Col>
        <div className="test-only-col">
          test-only-col
        </div>
      </Row>
    );

    expect(wrapper.find('.test-row').hasClass('zad-row')).toBeTruthy();
    expect(wrapper.find('.test-row').hasClass('zad-row-vertical-top')).toBeTruthy();
    expect(wrapper.find('.test-row').hasClass('zad-row-horizontal-start')).toBeTruthy();
    expect(wrapper.find('.test-row').prop('style').marginLeft).toEqual(-12);
    expect(wrapper.find('.test-row').prop('style').marginRight).toEqual(-12);

    wrapper.find(Col).forEach((col) => {
      expect(col.prop('style').paddingLeft).toEqual(12);
      expect(col.prop('style').paddingRight).toEqual(12);
    });

    expect(wrapper.find('.test-col').at(0).hasClass('zad-col-4')).toBeTruthy();
    expect(wrapper.find('.test-col').at(0).find('.test-col-box').get(0).textContent).toEqual('col-4');
    expect(wrapper.find('.test-col').at(1).hasClass('zad-col-6')).toBeTruthy();
    expect(wrapper.find('.test-col').at(1).find('.test-col-box').get(0).textContent).toEqual('col-6');

    expect(wrapper.find('.test-col')).toHaveLength(2);
    expect(wrapper.find('.test-only-col')).toHaveLength(0);

    expect(mountToJson(wrapper)).toMatchSnapshot();
  });

  it('align and justify', () => {
    const wrapper = mount(
      <Row className="test-row" align={'middle'} justify={'space-around'}>
        <Col className="test-col" span={4}/>
      </Row>
    );

    expect(wrapper.find('.test-row').hasClass('zad-row-vertical-middle')).toBeTruthy();
    expect(wrapper.find('.test-row').hasClass('zad-row-horizontal-space-around')).toBeTruthy();

    expect(mountToJson(wrapper)).toMatchSnapshot();
  });

  it('offset', () => {
    const wrapper = mount(
      <Row className="test-row">
        <Col className="test-col" span={4} offset={8}/>
        <Col className="test-col" span={6} offset={12}/>
      </Row>
    );

    expect(wrapper.find('.test-col').at(0).hasClass('zad-col-offset-8')).toBeTruthy();
    expect(wrapper.find('.test-col').at(1).hasClass('zad-col-offset-12')).toBeTruthy();

    expect(mountToJson(wrapper)).toMatchSnapshot();
  });

  it('responsive', () => {
    const wrapper = mount(
      <Row className="test-row">
        <Col className="test-col" xs={4} sm={6} md={8} lg={12}/>
      </Row>
    );

    expect(wrapper.find('.test-col').hasClass('zad-col-xs-4')).toBeTruthy();
    expect(wrapper.find('.test-col').hasClass('zad-col-sm-6')).toBeTruthy();
    expect(wrapper.find('.test-col').hasClass('zad-col-md-8')).toBeTruthy();
    expect(wrapper.find('.test-col').hasClass('zad-col-lg-12')).toBeTruthy();

    expect(mountToJson(wrapper)).toMatchSnapshot();
  });
});
