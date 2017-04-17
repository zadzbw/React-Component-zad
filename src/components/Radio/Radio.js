/**
 * Created by zad on 17/4/17.
 */
import React, {PureComponent, PropTypes} from 'react';
import classNames from 'classnames';

export const radioPrefix = 'zad-radio';

export default class Radio extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checked: 'checked' in this.props ? this.props.checked : this.getInitChecked(),
    };
  }

  static propTypes = {
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    onChange: PropTypes.func,
    wrapperClassName: PropTypes.string,
  };

  static defaultProps = {
    disabled: false,
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

  changeChecked = (e) => {
    const {onChange, disabled} = this.props;
    if (disabled) {
      return false;
    }
    if (!('checked' in this.props)) {
      this.setState({
        checked: e.target.checked,
      });
    }
    onChange(e);
  };

  render() {
    const {disabled, wrapperClassName, children} = this.props;
    const {checked} = this.state;

    const wrapperClass = classNames(wrapperClassName, {
      [`${radioPrefix}-wrapper`]: true,
      [`${radioPrefix}-wrapper-disabled`]: disabled,
    });
    const radioClass = classNames(radioPrefix, {
      [`${radioPrefix}-checked`]: checked,
    });

    return (
      <label className={wrapperClass}>
        <span className={radioClass}>
          <input type="radio"
                 className={`${radioPrefix}-input`}
                 checked={checked}
                 onChange={this.changeChecked}
          />
          <span className={`${radioPrefix}-mock`}/>
        </span>
        <span className={`${radioPrefix}-name`}>
          {children}
        </span>
      </label>
    );
  }
}
