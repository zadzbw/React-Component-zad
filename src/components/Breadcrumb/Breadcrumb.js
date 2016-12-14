/**
 * Created by zad on 16/12/13.
 */
import React, {PropTypes, Component, cloneElement} from 'react';
import classNames from 'classnames';
import BreadcrumbItem from './BreadcrumbItem';

import './Breadcrumb.less';

function getBreadcrumbName(route, params) {
  if (!route.breadcrumbName) {
    return null;
  }

  const paramsKeys = Object.keys(params).join('|');
  // reg: /:(id|name|age)/g
  const reg = new RegExp(`:(${paramsKeys})`, 'g');
  return route.breadcrumbName.replace(reg, (match, p1) => params[p1] || match);
}

function defaultItemRender(route, params, routes, paths) {
  const isLast = routes.indexOf(route) === routes.length - 1;
  const name = getBreadcrumbName(route, params);
  return isLast ? (<span>{name}</span>) : (<a href={`#/${paths.join('/')}`}>{name}</a>);
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
    routes: [],
    params: {},
    separator: '/',
    itemRender: defaultItemRender
  };

  render() {
    const {routes, params, separator, itemRender, children, className, ...props} = this.props;
    const breadClass = classNames('zad-bread', className);
    let crumbs = '';

    if (routes && routes.length > 0) {
      const paths = [];
      crumbs = routes.map((route) => {
        route.path = route.path || '';
        // 去除开头处的'/'
        let path = route.path.replace(/^\//, '');
        Object.keys(params).forEach((key) => {
          // user/:id => user/123
          path = path.replace(`:${key}`, params[key]);
        });
        if (path) {
          paths.push(path);
        }
        if (route.breadcrumbName) {
          return (
            <BreadcrumbItem separator={separator} key={route.breadcrumbName}>
              {itemRender(route, params, routes, paths)}
            </BreadcrumbItem>
          );
        }
        return null;
      });
    } else if (children) {
      crumbs = React.Children.map(children, (item, index) => {
        if (item.type !== BreadcrumbItem) {
          return null;
        }
        return cloneElement(item, {
          separator,
          key: `bread-crumb-item-${index}`
        });
      });
    }

    return (
      <div {...props} className={breadClass}>
        {crumbs}
      </div>
    );
  }
}
