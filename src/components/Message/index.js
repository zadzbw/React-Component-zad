/**
 * Created by zad on 17/7/4.
 */
import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import './Message.less';
import Message, { messagePrefix } from './Message';
import Icon from '../Icon';

let instance = null;
let defaultStyle = {
  top: 65,
  left: '50%',
};
let defaultCls = '';
let defaultGetContainer = null;
let defaultDuration = 1500;

function getInstance() {
  instance = instance || Message.createInstance({
      animation: 'move-up',
      style: defaultStyle,
      className: defaultCls,
      getContainer: defaultGetContainer,
    });
  return instance;
}

function show(content, duration = defaultDuration, onClose = () => undefined, type) {
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

  const addedMsg = msg.add({
    duration,
    onClose,
    content: (
      <div className={contentCls}>
        <Icon name={iconName} spin={type === 'loading'}/>
        <span>{content}</span>
      </div>
    ),
  });
  return msg.remove.bind(msg, addedMsg.key);
}

export default {
  info(content, duration, onClose) {
    return show(content, duration, onClose, 'info');
  },
  success(content, duration, onClose) {
    return show(content, duration, onClose, 'success');
  },
  error(content, duration, onClose) {
    return show(content, duration, onClose, 'error');
  },
  warning(content, duration, onClose) {
    return show(content, duration, onClose, 'warning');
  },
  loading(content, duration, onClose) {
    return show(content, duration, onClose, 'loading');
  },
  setOptions(options) {
    const { style, duration, className, getContainer } = options;
    let needClear = false;
    if (_.isObject(style)) {
      defaultStyle = style;
      needClear = true;
    }
    if (_.isString(className)) {
      defaultCls = className;
      needClear = true;
    }
    if (_.isFunction(getContainer)) {
      defaultGetContainer = getContainer;
      needClear = true;
    }
    if (_.isNumber(duration)) {
      defaultDuration = duration;
    }
    if (needClear) {
      instance = null;
    }
  },
  destroy() {
    if (instance) {
      instance.destroy();
      instance = null;
    }
  },
};
