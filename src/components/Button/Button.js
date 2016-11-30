import React, {PropTypes, Component}from 'react';
import classNames from 'classnames';
import oneOf from '../../utils/oneOf';

import './Button.less';

const _type = {
	type: ['primary', 'ghost', 'dashed'],
	size: ['small', 'large'],
	shape: ['circle', 'circle-o']
};
const btnPrefix = 'zad-btn';

export default class Button extends Component {
	constructor(props) {
		super(props);
	}

	static propTypes = {
		type: PropTypes.string,
		size: PropTypes.string,
		shape: PropTypes.string,
		onClick: PropTypes.func
	};

	static defaultProps = {
		onClick: () => undefined
	};


	render() {
		const {type, size, shape, className, children, ...props} = this.props;

		const sizeClass = ({
				large: 'lg',
				small: 'sm',
			})[size] || '';

		const btnClass = classNames(btnPrefix, className, {
			[`${btnPrefix}-${type}`]: type && oneOf(_type.type, type),
			[`${btnPrefix}-${sizeClass}`]: size && oneOf(_type.size, size),
			[`${btnPrefix}-${shape}`]: shape && oneOf(_type.shape, shape)
		});

		return (
			<button
				{...props}
				type="button"
				className={btnClass}
			>
				<span>{children}</span>
			</button>
		);
	}
}
