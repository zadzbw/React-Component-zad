/**
 * Created by zad on 16/12/13.
 */
import React, {PropTypes, Component} from 'react';

export default class BreadcrumbItem extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    separator: PropTypes.string,
    href: PropTypes.string
  };

  static defaultProps = {
    separator: '/'
  };

  render() {
    const {separator, children, ...props} = this.props;
    const link = this.props.href ? (
      <a className="zad-bread-item-link" {...props}>{children}</a>
    ) : (
      <span className="zad-bread-item-link" {...props}>{children}</span>
    );

    return (
      <span className="zad-bread-item">
        {link}
        <span className="zad-bread-item-separator">{separator}</span>
      </span>
    );
  }
}
