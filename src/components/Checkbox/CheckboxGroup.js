/**
 * Created by zad on 17/4/11.
 */
import React, {PureComponent, PropTypes} from 'react';
import classNames from 'classnames';
import _omit from 'lodash/omit';
import _remove from 'lodash/remove';
import _isString from 'lodash/isString';
import _isFunction from 'lodash/isFunction';
import Checkbox, {checkboxPrefix} from './Checkbox';
import isOneOf from '../../utils/isOneOf';

const checkboxGroupPrefix = `${checkboxPrefix}-group`;

export default class CheckboxGroup extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: 'value' in this.props ? this.props.value : this.props.defaultValue,
    };
  }

  static propTypes = {
    value: PropTypes.arrayOf(PropTypes.string),
    defaultValue: PropTypes.arrayOf(PropTypes.string),
    options: PropTypes.array,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    defaultValue: [],
    options: [],
    onChange: () => undefined,
  };

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value || [],
      });
    }
  }

  changeChecked = (v) => {
    const {value} = this.state;
    const {onChange} = this.props;
    const newValue = value.concat();
    if (isOneOf(value, v)) {
      _remove(newValue, (_v) => {
        return _v === v;
      });
    } else {
      newValue.push(v);
    }
    if (!('value' in this.props)) {
      this.setState({
        value: newValue,
      });
    }
    if (_isFunction(onChange)) {
      onChange(newValue);
    }
  };

  getOptions = () => {
    const {options} = this.props;
    return options.map((item) => {
      if (_isString(item)) {
        return {name: item, value: item, disabled: false};
      }
      return item;
    });
  };

  getCheckbox = () => {
    const options = this.getOptions();
    const {value} = this.state;
    return options.map((option, i) => {
      return React.createElement(Checkbox, {
        key: `group-check-box-${i}`,
        disabled: option.disabled,
        children: option.name,
        checked: isOneOf(value, option.value),
        wrapperClassName: `${checkboxGroupPrefix}-item`,
        onChange: this.changeChecked.bind(this, option.value),
      });
    });
  };

  render() {
    const {className} = this.props;
    const restProps = _omit(this.props, [
      'className',
      'value',
      'defaultValue',
      'options',
      'onChange',
    ]);
    const groupClass = classNames(checkboxGroupPrefix, className);
    return (
      <div className={groupClass} {...restProps}>
        {this.getCheckbox()}
      </div>
    );
  }
}
