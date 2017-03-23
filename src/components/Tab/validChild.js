/**
 * Created by zad on 17/3/22.
 */
import React, {Component, Children, cloneElement} from 'react';

export default function (WrappedComponent, childName) {
  return class Valid extends Component {
    static displayName = `Valid(${WrappedComponent.name})`;

    render() {
      const {children, ...props} = this.props;
      const validChildren = Children.map(children, (child, i) => {
        if (child.type !== childName) {
          return null;
        }
        return cloneElement(child, {
          _key: child.key ? child.key : `${WrappedComponent.name}-${i}`,
        });
      });
      return (
        <WrappedComponent
          {...props}
          children={validChildren}
        />
      );
    }
  };
}
