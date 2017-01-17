/**
 * Created by zad on 17/1/16.
 */
import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';
import Animate from 'rc-animate';
import collapseAnimation from '../../utils/collapseAnimation';

export default class SubMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false,
    };
    this._expandItems = this::this._expandItems;
  }

  renderChildren(props) {
    return React.Children.map(props.children, (child) => {
      return React.cloneElement(child,
        {
          ...child.props,
          level: props.level + 1,
          prefix: props.prefix,
        });
    });
  }

  _expandItems() {
    this.setState({
      expand: !this.state.expand
    });
  }

  render() {
    const {prefix, title, level} = this.props;
    const {expand} = this.state;
    const subClass = classNames({
      [`${prefix}-sub`]: true,
      [`${prefix}-sub-expand`]: expand,
    });
    const paddingLeft = level * 20;

    return (
      <li className={subClass}>
        <div className={`${prefix}-sub-title`} onClick={this._expandItems} style={{paddingLeft}}>
          {title}
        </div>
        <Animate animation={collapseAnimation} component={'ul'}>
          {expand && <ul>{this.renderChildren(this.props)}</ul>}
        </Animate>
      </li>
    );
  }
}
