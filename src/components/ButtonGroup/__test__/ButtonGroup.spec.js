import React from 'react';
import {mount} from 'enzyme';
import {mountToJson} from 'enzyme-to-json';
import ButtonGroup from '../../ButtonGroup';
import Button from '../../Button';
import Icon from '../../Icon';

describe('ButtonGroup test', () => {
	it('normal', () => {
		const wrapper = mount(
			<ButtonGroup>
				<Button type={'primary'}><Icon name={'shield'}/>shield</Button>
				<Button>default</Button>
				<Button type={'ghost'}>ghost</Button>
				<Button type={'dashed'}>dashed</Button>
			</ButtonGroup>
		);

		expect(wrapper.find('div').hasClass('zad-btn-group')).toBeTruthy();
		expect(wrapper.find('button').get(0).classList.contains('zad-btn-primary')).toBeTruthy();
		expect(wrapper.find('button').get(0).textContent).toEqual('shield');
		expect(wrapper.find('button').get(1).classList.contains('zad-btn')).toBeTruthy();
		expect(wrapper.find('button').get(1).textContent).toEqual('default');
		expect(wrapper.find('button').get(2).classList.contains('zad-btn-ghost')).toBeTruthy();
		expect(wrapper.find('button').get(2).textContent).toEqual('ghost');
		expect(wrapper.find('button').get(3).classList.contains('zad-btn-dashed')).toBeTruthy();
		expect(wrapper.find('button').get(3).textContent).toEqual('dashed');
		expect(mountToJson(wrapper)).toMatchSnapshot();
	});

	it('size', () => {
		const wrapper = mount(
			<ButtonGroup size={'large'}>
				<Button type={'primary'}><Icon name={'shield'}/>shield</Button>
				<Button>default</Button>
				<Button type={'ghost'}>ghost</Button>
				<Button type={'dashed'}>dashed</Button>
			</ButtonGroup>
		);

		expect(wrapper.find('div').hasClass('zad-btn-group')).toBeTruthy();
		expect(wrapper.find('div').hasClass('zad-btn-group-lg')).toBeTruthy();
		expect(wrapper.find('button').get(0).classList.contains('zad-btn-primary')).toBeTruthy();
		expect(wrapper.find('button').get(0).textContent).toEqual('shield');
		expect(wrapper.find('button').get(1).classList.contains('zad-btn')).toBeTruthy();
		expect(wrapper.find('button').get(1).textContent).toEqual('default');
		expect(wrapper.find('button').get(2).classList.contains('zad-btn-ghost')).toBeTruthy();
		expect(wrapper.find('button').get(2).textContent).toEqual('ghost');
		expect(wrapper.find('button').get(3).classList.contains('zad-btn-dashed')).toBeTruthy();
		expect(wrapper.find('button').get(3).textContent).toEqual('dashed');
		expect(mountToJson(wrapper)).toMatchSnapshot();
	});
});