import React, {PropTypes, Component}from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import isOneOf from '../../utils/isOneOf';

import './Button.less';

const _type = {
	type: ['primary', 'ghost', 'dashed'],
	size: ['small', 'large'],
	shape: ['circle']
};
const btnPrefix = 'zad-btn';

export default class Button extends Component {
	constructor(props) {
		super(props);
		this._clickBtn = this._clickBtn.bind(this);
		this._blurBtn = this._blurBtn.bind(this);
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

	componentWillUnmount() {
		if (this.addClicked) {
			clearTimeout(this.addClicked);
			this.addClicked = null;
		}
		if (this.removeClicked) {
			clearTimeout(this.removeClicked);
			this.removeClicked = null;
		}
	}

	_toggleBtnClass(btn) {
		btn.classList.remove(`${btnPrefix}-clicked`);

		this.addClicked = setTimeout(() => {
			btn.classList.add(`${btnPrefix}-clicked`);
		}, 20);

		// 先clear，再remove
		if (this.removeClicked) {
			clearTimeout(this.removeClicked);
		}
		this.removeClicked = setTimeout(() => {
			btn.classList.remove(`${btnPrefix}-clicked`);
		}, 500);
	}

	_clickBtn(e) {
		const btn = ReactDOM.findDOMNode(this);
		this._toggleBtnClass(btn);
		this.props.onClick(e);
	}

	_blurBtn() {
		ReactDOM.findDOMNode(this).blur();
	}

	render() {
		const {type, size, shape, className, children, ...props} = this.props;

		const sizeClass = ({
			large: 'lg',
			small: 'sm',
		})[size];

		const btnClass = classNames(btnPrefix, className, {
			[`${btnPrefix}-${type}`]: type && isOneOf(_type.type, type),
			[`${btnPrefix}-${sizeClass}`]: size && isOneOf(_type.size, size),
			[`${btnPrefix}-${shape}`]: shape && isOneOf(_type.shape, shape)
		});

		const _children = React.Children.map(children, (child) => {
			if (typeof child === 'string') {
				return (<span>{child}</span>);
			}
			return child;
		});

		return (
			<button
				{...props}
				type="button"
				className={btnClass}
				onClick={this._clickBtn}
				onMouseUp={this._blurBtn}
			>
				{_children}
			</button>
		);
	}
}
