/**
 * Created by zad on 17/4/17.
 */
import React, {PureComponent, PropTypes, createElement} from 'react';
import classNames from 'classnames';
import _omit from 'lodash/omit';
import _isString from 'lodash/isString';
import _isFunction from 'lodash/isFunction';
import Radio, {radioPrefix} from './Radio';

const radioGroupPrefix = `${radioPrefix}-group`;

export default class RadioGroup extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: 'value' in this.props ? this.props.value : this.props.defaultValue,
    };
  }

  static propTypes = {
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    options: PropTypes.array,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    defaultValue: '',
    options: [],
    onChange: () => undefined,
  };

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value || '',
      });
    }
  }

  changeChecked = (v) => {
    return (event) => {
      // 这里的event是由Radio的onChange函数传递的
      const {value} = this.state;
      const isChange = value !== v;
      if (isChange) {
        if (!('value' in this.props)) {
          this.setState({
            value: v,
          });
        }
        const {onChange} = this.props;
        if (_isFunction(onChange)) {
          onChange({
            event,
            value: v,
          });
        }
      }
    };
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

  getRadios = () => {
    const options = this.getOptions();
    const {value} = this.state;
    return options.map((option, i) => {
      return createElement(Radio, {
        key: `group-radio-${i}`,
        disabled: option.disabled,
        children: option.name,
        checked: value === option.value,
        wrapperClassName: `${radioGroupPrefix}-item`,
        onChange: this.changeChecked(option.value),
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
    const groupClass = classNames(radioGroupPrefix, className);
    return (
      <div className={groupClass} {...restProps}>
        {this.getRadios()}
      </div>
    );
  }
}
