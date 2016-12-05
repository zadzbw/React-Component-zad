/**
 * Created by zad on 16/11/30.
 */
import React from 'react';

import './TestPage.less';

import {Icon, Button} from '../components';

export default class TestPage extends React.Component {
	render() {
		return (
			<div className="test-wrap">
				<Button type={'primary'}>primary</Button>
				<Button>default</Button>
				<Button type={'ghost'}>ghost</Button>
				<Button type={'dashed'}>dashed</Button>
				<br/>
				<Button type={'primary'}><Icon name={'shield'}/>shield</Button>
				<Button shape={'circle'}><Icon name={'shield'}/></Button>
				<Button type={'ghost'}>shield<Icon name={'shield'}/></Button>
				<Button type={'dashed'} shape={'circle'}><Icon name={'shield'}/></Button>
				<br/>
			</div>
		);
	}
}