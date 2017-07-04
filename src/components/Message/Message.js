/**
 * Created by zad on 17/7/4.
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Animate from 'rc-animate';
import chainFunc from '../../utils/chainFunc';
import MessageItem from './MessageItem';

export const messagePrefix = 'zad-message';

function getKey() {
  let level = 1;
  return () => {
    const now = +new Date();
    return `${messagePrefix}-${now}-${level++}`;
  };
}

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }

  static propTypes = {
    animation: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
  };

  static defaultProps = {
    animation: 'fade',
    style: {
      top: 65,
      left: '50%',
    },
  };

  componentDidMount() {
    this.getKey = getKey();
  }

  addMessage = (message = {}) => {
    const key = message.key = message.key || this.getKey();
    const { messages } = this.state;
    // 如果key唯一，则添加
    if (messages.findIndex((msg) => msg.key === key) === -1) {
      this.setState({
        messages: messages.concat(message),
      });
    }
  };

  removeMessage = (key) => {
    const { messages } = this.state;
    this.setState({
      messages: messages.filter((msg) => msg.key !== key),
    });
  };

  getItems = () => {
    const { messages } = this.state;
    return messages.map((msg) => {
      const { onClose, duration, content, className, style, key } = msg;
      const closeFunc = chainFunc(this.removeMessage.bind(this, msg.key), onClose);
      return (
        <MessageItem
          duration={duration}
          onClose={closeFunc}
          className={className}
          style={style}
          key={key}
        >
          {content}
        </MessageItem>
      );
    });
  };

  render() {
    const { className, style, animation } = this.props;
    const wrapCls = classNames({
      [`${messagePrefix}-container`]: true,
      [className]: !!className,
    });

    return (
      <div className={wrapCls} style={style}>
        <Animate transitionName={animation}>
          {this.getItems()}
        </Animate>
      </div>
    );
  }
}

Message.createInstance = (options = {}) => {
  const { getContainer, ...msgProps } = options;
  let target;
  if (getContainer) {
    target = getContainer();
  } else {
    target = document.createElement('div');
    target.classList.add(`${messagePrefix}-wrap`);
    document.body.appendChild(target);
  }

  const instance = ReactDOM.render(<Message {...msgProps}/>, target);
  return {
    add(msg) {
      instance.addMessage(msg);
    },
    remove(key) {
      instance.removeMessage(key);
    },
    destroy() {
      ReactDOM.unmountComponentAtNode(target); // target是其他element
      document.body.removeChild(target);
    },
    instance,
  };
};

export default Message;
