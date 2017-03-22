/**
 * Created by zad on 17/3/20.
 */
import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';
import {tabPrefix} from './Tab';

export default class TabBar extends Component {
  constructor(props) {
    super(props);
    this._tabChange = this::this._tabChange;
  }

  _tabChange() {
    const {_tabChange, _key} = this.props;
    _tabChange(_key);
  }

  render() {
    const {active, name} = this.props;
    const barClass = classNames(`${tabPrefix}-bar`, {
      [`${tabPrefix}-bar-active`]: active,
    });

    return (
      <div className={barClass} onClick={this._tabChange}>
        {name}
      </div>
    );
  }
}
