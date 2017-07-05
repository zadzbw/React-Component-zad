/**
 * Created by zad on 17/7/4.
 */
import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import './Message.less';
import Message, { messagePrefix } from './Message';
import Icon from '../Icon';

const instances = [];
let instance = null;

let defaultContainerStyle = {
  top: 65,
  left: '50%',
};
let defaultContainerClass = '';
let defaultItemStyle = {};
let defaultItemClass = '';
let defaultGetContainer = null;
let defaultDuration = 1500;

function getInstance() {
  if (!instance) {
    instance = Message.createInstance({
      animation: 'move-up',
      containerStyle: defaultContainerStyle,
      containerClass: defaultContainerClass,
      getContainer: defaultGetContainer,
    });
    instances.push(instance);
  }
  return instance;
}

function show({
                content = '',
                duration = defaultDuration,
                itemStyle = defaultItemStyle,
                itemClass = defaultItemClass,
                onClose = () => undefined,
              },
              type,) {
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
    itemStyle,
    itemClass,
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
  info(options) {
    return show(options, 'info');
  },
  success(options) {
    return show(options, 'success');
  },
  error(options) {
    return show(options, 'error');
  },
  warning(options) {
    return show(options, 'warning');
  },
  loading(options) {
    return show(options, 'loading');
  },
  setOptions(options) {
    const { containerStyle, containerClass, getContainer, itemStyle, itemClass, duration } = options;
    let needClear = false;
    if (_.isObject(containerStyle)) {
      defaultContainerStyle = containerStyle;
      needClear = true;
    }
    if (_.isString(containerClass)) {
      defaultContainerClass = containerClass;
      needClear = true;
    }
    if (_.isFunction(getContainer)) {
      defaultGetContainer = getContainer;
      needClear = true;
    }
    if (_.isObject(itemStyle)) {
      defaultItemStyle = itemStyle;
    }
    if (_.isString(itemClass)) {
      defaultItemClass = itemClass;
    }
    if (_.isNumber(duration)) {
      defaultDuration = duration;
    }
    if (needClear) {
      instance = null;
    }
  },
  destroy() {
    instances.forEach((instance) => {
      if (instance) {
        instance.destroy(instance.target);
        instance = null;
      }
    });
  },
};
