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
				<Icon name={'shield'}/>
				<br/>
				<Button>123</Button>
			</div>
		);
	}
}