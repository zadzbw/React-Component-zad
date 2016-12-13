import React, {PropTypes, Component} from 'react';
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
    this.state = {clicked: false};
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

  _clickBtn(e) {
    this.setState({clicked: false});
    // 先clear，再remove
    if (this.removeClicked) {
      clearTimeout(this.removeClicked);
    }

    this.addClicked = setTimeout(() => {
      this.setState({clicked: true});
    }, 10);
    this.removeClicked = setTimeout(() => {
      this.setState({clicked: false});
    }, 500);
    this.props.onClick(e);
  }

  _blurBtn() {
    ReactDOM.findDOMNode(this).blur();
  }

  render() {
    const {type, size, shape, className, children, ...props} = this.props;
    const {clicked} = this.state;

    const sizeSuffix = ({
      large: 'lg',
      small: 'sm',
    })[size];

    const btnClass = classNames(btnPrefix, className, {
      [`${btnPrefix}-clicked`]: clicked,
      [`${btnPrefix}-${type}`]: type && isOneOf(_type.type, type),
      [`${btnPrefix}-${sizeSuffix}`]: size && isOneOf(_type.size, size),
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
