/**
 * Created by zad on 17/7/4.
 */
import React from 'react';
import classNames from 'classnames';
import './Message.less';
import Message, { messagePrefix } from './Message';
import Icon from '../Icon';

let instance = null;
function getInstance() {
  instance = instance || Message.createInstance({
      animation: 'move-up',
      style: {
        top: 65,
        left: '50%',
      },
      className: '',
    });
  return instance;
}

function show(content, duration = 1500, onClose = () => undefined, type) {
  const msg = getInstance();
  const contentCls = classNames(
    `${messagePrefix}-content`,
    `${messagePrefix}-${type}`,
  );
  const iconName = ({
    info: 'info-circle',
    success: 'check-circle',
    error: 'times-circle',
    warning: 'exclamation-circle',
    loading: 'spinner',
  })[type];

  msg.add({
    duration,
    onClose,
    content: (
      <div className={contentCls}>
        <Icon name={iconName} spin={type === 'loading'}/>
        <span>{content}</span>
      </div>
    ),
  });
}

export default {
  info(content, duration, onClose){
    return show(content, duration, onClose, 'info');
  },
  success(content, duration, onClose){
    return show(content, duration, onClose, 'success');
  },
  error(content, duration, onClose){
    return show(content, duration, onClose, 'error');
  },
  warning(content, duration, onClose){
    return show(content, duration, onClose, 'warning');
  },
  loading(content, duration, onClose){
    return show(content, duration, onClose, 'loading');
  }
};
