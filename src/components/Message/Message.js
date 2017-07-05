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
    containerClass: PropTypes.string,
    containerStyle: PropTypes.object,
    itemClass: PropTypes.string,
    itemStyle: PropTypes.object,
  };

  componentDidMount() {
    this.getKey = getKey();
  }

  addMessage = (message = {}) => {
    const key = message.key = message.key || this.getKey();
    const { messages } = this.state;
    // 如果key唯一，则添加
    if (messages.findIndex(msg => msg.key === key) === -1) {
      this.setState({
        messages: messages.concat(message),
      });
    }
    return message;
  };

  removeMessage = (key) => {
    const { messages } = this.state;
    const restMessages = messages.filter(msg => msg.key !== key);
    this.setState({
      messages: restMessages,
    });
    return restMessages;
  };

  getItems = () => {
    const { messages } = this.state;
    return messages.map((msg) => {
      const { onClose, duration, content, itemClass, itemStyle, key } = msg;
      const closeFunc = chainFunc(this.removeMessage.bind(this, msg.key), onClose);
      return (
        <MessageItem
          duration={duration}
          onClose={closeFunc}
          itemClass={itemClass}
          itemStyle={itemStyle}
          key={key}
        >
          {content}
        </MessageItem>
      );
    });
  };

  render() {
    const { containerClass, containerStyle, animation } = this.props;
    const wrapCls = classNames({
      [`${messagePrefix}-container`]: true,
      [containerClass]: !!containerClass,
    });

    return (
      <div className={wrapCls} style={containerStyle}>
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
      return instance.addMessage(msg);
    },
    remove(key) {
      return instance.removeMessage(key);
    },
    destroy(_target) {
      ReactDOM.unmountComponentAtNode(_target); // _target是其他element
      document.body.removeChild(_target);
    },
    instance,
    target,
  };
};

export default Message;
