/**
 * Created by zad on 17/1/16.
 */
import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';

export default class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.__selectItem = this::this.__selectItem;
    this._isSelected = this::this._isSelected;
  }

  _isSelected() {
    const {eventKey, selectedKeys} = this.props;
    return selectedKeys.includes(eventKey);
  }

  __selectItem(event) {
    // 如果已经被选择，则什么都不做
    if (!this._isSelected()) {
      const {eventKey, _selectItem} = this.props;
      const params = {
        key: [eventKey],
        item: this,
        event,
      };
      _selectItem(params);
    }
  }

  render() {
    const {prefix, level} = this.props;
    const itemClass = classNames({
      [`${prefix}-item`]: true,
      [`${prefix}-item-selected`]: this._isSelected(),
    });
    const paddingLeft = level * 20;

    return (
      <li className={itemClass} style={{paddingLeft}} onClick={this.__selectItem}>
        {this.props.children}
      </li>
    );
  }
}
