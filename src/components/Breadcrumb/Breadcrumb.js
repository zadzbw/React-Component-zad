/**
 * Created by zad on 16/12/13.
 */
import React, {PropTypes, Component, cloneElement} from 'react';
import classNames from 'classnames';
import BreadcrumbItem from './BreadcrumbItem';

import './Breadcrumb.less';

function defaultItemRender(route, params, routes, paths) {
  const isLastItem = routes.indexOf(route) === routes.length - 1;
  const name = getBreadcrumbName(route, params);
  return isLastItem ? <span>{name}</span> : <a href={`#/${paths.join('/')}`}>{name}</a>;
}

export default class Breadcrumb extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    routes: PropTypes.array,
    params: PropTypes.object,
    separator: PropTypes.string,
    itemRender: PropTypes.func,
  };

  static defaultProps = {
    separator: '/',
    params: {},
    itemRender: defaultItemRender
  };

  render() {
    const {routes, params, separator, itemRender, children, className, ...props} = this.props;
    const breadClass = classNames('zad-bread', className);
    let crumbs = '';

    // todo render

    return (
      <div className={breadClass}>
        {crumbs}
      </div>
    );
  }
}
