/**
 * Created by zad on 16/12/9.
 */
import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import _omit from 'lodash/omit';
import _isEqual from 'lodash/isEqual';
import _noop from 'lodash/noop';
import getScroll from '../../utils/getScroll';

import './Affix.less';

function getTargetRect(target) {
  return target === window ? {top: 0, left: 0, bottom: 0} : target.getBoundingClientRect();
}

function getOffset(element, target) {
  const elementRect = element.getBoundingClientRect();
  const targetRect = getTargetRect(target);

  const scrollTop = getScroll(target).top;
  const scrollLeft = getScroll(target).left;

  const clientTop = document.body.clientTop || 0;
  const clientLeft = document.body.clientLeft || 0;

  return {
    top: elementRect.top - targetRect.top + scrollTop - clientTop,
    left: elementRect.left - targetRect.left + scrollLeft - clientLeft
  };
}

export default class Affix extends Component {
  constructor(props) {
    super(props);
    this.state = {
      affixStyle: null,
      affixWrapperStyle: null,
    };
    this._setAffixStyle = this._setAffixStyle.bind(this);
    this._setAffixWrapperStyle = this._setAffixWrapperStyle.bind(this);
    this._updatePosition = this._updatePosition.bind(this);
    this._setEventListener = this._setEventListener.bind(this);
    this._clearEventListener = this._clearEventListener.bind(this);
  }

  static propTypes = {
    offsetTop: PropTypes.number,
    offsetBottom: PropTypes.number,
    target: PropTypes.func,
    onChange: PropTypes.func
  };

  static defaultProps = {
    target: () => window,
    onChange: () => undefined
  };

  _setAffixStyle(e, newAffixStyle) {
    const {onChange = _noop, target} = this.props;
    const prevAffixStyle = this.state.affixStyle;
    const isWindow = target() === window;

    if (e.type === 'scroll' && prevAffixStyle && newAffixStyle && isWindow) {
      return false;
    }

    if (_isEqual(prevAffixStyle, newAffixStyle)) {
      return false;
    }

    this.setState({affixStyle: newAffixStyle}, () => {
      if ((prevAffixStyle && !newAffixStyle) || (!prevAffixStyle && newAffixStyle)) {
        onChange(!!this.state.affixStyle);
      }
    });
  }

  _setAffixWrapperStyle(e, newAffixWrapperStyle) {
    const prevAffixWrapperStyle = this.state.affixWrapperStyle;
    if (e.type === 'resize') {
      return false;
    }

    if (_isEqual(prevAffixWrapperStyle, newAffixWrapperStyle)) {
      return false;
    }
    this.setState({
      affixWrapperStyle: newAffixWrapperStyle
    });
  }

  _updatePosition(e) {
    let {offsetTop, offsetBottom, target} = this.props;
    const targetNode = target();

    const scrollTop = getScroll(targetNode).top;
    const affixNode = ReactDOM.findDOMNode(this);
    const elementOffset = getOffset(affixNode, targetNode);
    const elemSize = {
      width: this.refs.fixedNode.offsetWidth,
      height: this.refs.fixedNode.offsetHeight,
    };

    const offsetMode = {
      top: false,
      bottom: false,
    };
    // 默认使 offsetTop = 0
    if (typeof offsetTop !== 'number' && typeof offsetBottom !== 'number') {
      offsetTop = 0;
      offsetMode.top = true;
    } else {
      offsetMode.top = typeof offsetTop === 'number';
      offsetMode.bottom = typeof offsetBottom === 'number';
    }

    const targetRect = getTargetRect(targetNode);
    const targetInnerHeight = targetNode === window ? targetNode.innerHeight : targetNode.clientHeight;
    if (offsetMode.top && scrollTop > elementOffset.top - offsetTop) {
      // top
      this._setAffixStyle(e, {
        position: 'fixed',
        top: targetRect.top + offsetTop,
        left: targetRect.left + elementOffset.left,
        width: affixNode.offsetWidth,
      });
      this._setAffixWrapperStyle(e, {
        width: elemSize.width,
        height: elemSize.height,
      });
    } else if (offsetMode.bottom && scrollTop < elementOffset.top + elemSize.height + offsetBottom - targetInnerHeight) {
      // bottom
      const targetBottomOffset = targetNode === window ? 0 : (window.innerHeight - targetRect.bottom);
      this._setAffixStyle(e, {
        position: 'fixed',
        bottom: targetBottomOffset + offsetBottom,
        left: targetRect.left + elementOffset.left,
        width: affixNode.offsetWidth,
      });
      this._setAffixWrapperStyle(e, {
        width: elemSize.width,
        height: elemSize.height,
      });
    } else {
      this._setAffixStyle(e, null);
      this._setAffixWrapperStyle(e, null);
    }
  }

  _setEventListener(getTarget) {
    const target = getTarget();
    if (!target) {
      return false;
    }
    target.addEventListener('scroll', this._updatePosition, false);
    target.addEventListener('resize', this._updatePosition, false);
  }

  _clearEventListener(getTarget) {
    const target = getTarget();
    target.removeEventListener('scroll', this._updatePosition, false);
    target.removeEventListener('resize', this._updatePosition, false);
  }

  componentDidMount() {
    const {target} = this.props;
    // next event loop
    this.timeout = setTimeout(() => {
      this._setEventListener(target);
    }, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.target !== this.props.target) {
      this._clearEventListener(this.props.target);
      this._setEventListener(nextProps.target);
      this._updatePosition({});
    }
  }

  componentWillUnmount() {
    const {target} = this.props;
    this._clearEventListener(target);
    clearTimeout(this.timeout);
  }

  render() {
    const affixClass = classNames({
      'zad-affix': this.state.affixStyle
    });
    const props = _omit(this.props, ['offsetTop', 'offsetBottom', 'target']);
    return (
      <div {...props} style={this.state.affixWrapperStyle}>
        <div className={affixClass} ref="fixedNode" style={this.state.affixStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
