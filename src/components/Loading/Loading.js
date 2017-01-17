/**
 * Created by zad on 17/1/12.
 */
import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';
import Animate from 'rc-animate';
import Loader from './Loader';

import './Loading.less';

const loadingPrefix = 'zad-loading';

export default class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: this.props.loading
    };
    this.debounceLoading = this.debounceLoading.bind(this);
  }

  static propTypes = {
    size: PropTypes.oneOf(['small', 'default', 'large']),
    loading: PropTypes.bool,
    tip: PropTypes.string,
    delay: PropTypes.number,
  };

  static defaultProps = {
    loading: true,
    delay: undefined,
  };

  // 对改变loading状态进行去抖
  debounceLoading(nextProps) {
    const prevLoading = this.props.loading;
    const nextLoading = nextProps.loading;
    const {delay} = this.props;

    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    // 如果设定了delay且前后状态不一致
    if (delay && !isNaN(+delay) && prevLoading !== nextLoading) {
      this.debounceTimer = setTimeout(() => this.setState({loading: nextLoading}), delay);
    } else {
      this.setState({loading: nextLoading});
    }
  }

  componentWillReceiveProps(nextProps) {
    this.debounceLoading(nextProps);
  }

  componentWillUnmount() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }
  }

  render() {
    const {size, tip, children} = this.props;
    const {loading} = this.state;

    if (children) {
      const containerClass = classNames({
        [`${loadingPrefix}-container`]: true,
        [`${loadingPrefix}-blur`]: loading,
      });

      const loader = loading ? (
        <div key={'loader'}>
          <Loader size={size} tip={tip} loading={loading}/>
        </div>
      ) : null;

      return (
        <Animate className={`${loadingPrefix}-has-children`} transitionName="fade" component="div">
          {loader}
          <div key="container" className={containerClass}>
            {children}
          </div>
        </Animate>
      );
    }

    return (
      <Loader size={size} tip={tip} loading={loading}/>
    );
  }
}
