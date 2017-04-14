/**
 * Created by zad on 17/4/11.
 */
import React, {PureComponent, PropTypes} from 'react';
import classNames from 'classnames';

const checkboxPrefix = 'zad-checkbox';

export default class Checkbox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checked: 'checked' in this.props ? this.props.checked : this.getInitChecked(),
    };
    this.changeChecked = this::this.changeChecked;
  }

  static propTypes = {
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    indeterminate: PropTypes.bool,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    disabled: false,
    indeterminate: false,
    onChange: () => undefined,
  };

  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({
        checked: nextProps.checked,
      });
    }
  }

  getInitChecked = () => {
    const props = this.props;
    if ('defaultChecked' in props) {
      return props.defaultChecked;
    }
    return false;
  };

  changeChecked(e) {
    const {onChange, disabled} = this.props;
    if (disabled) {
      return false;
    }
    const {checked} = this.state;
    const isChange = checked !== e.target.checked;
    if (isChange) {
      if (!('checked' in this.props)) {
        this.setState({
          checked: e.target.checked,
        });
      }
      onChange(e);
    }
  }

  render() {
    const {indeterminate, disabled, children} = this.props;
    const {checked} = this.state;

    const wrapperClass = classNames({
      [`${checkboxPrefix}-wrapper`]: true,
      [`${checkboxPrefix}-wrapper-disabled`]: disabled,
    });
    const checkboxClass = classNames(checkboxPrefix, {
      [`${checkboxPrefix}-checked`]: checked,
      [`${checkboxPrefix}-indeterminate`]: indeterminate,
    });

    return (
      <label className={wrapperClass}>
        <span className={checkboxClass}>
          <input type="checkbox"
                 className={`${checkboxPrefix}-input`}
                 checked={checked}
                 onChange={this.changeChecked}
          />
          <span className={`${checkboxPrefix}-mock`}/>
        </span>
        <span className={`${checkboxPrefix}-name`}>
          {children}
        </span>
      </label>
    );
  }
}
