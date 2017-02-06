/**
 * Created by zad on 17/1/20.
 */
import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';
import PageItem from './PageItem';

export const paginationPrefix = 'zad-pagination';

export default class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _current: 'current' in this.props ? this.props.current : this.props.defaultCurrent,
      _pageSize: 'selectedKeys' in this.props ? this.props.pageSize : this.props.defaultPageSize,
    };
    this._getPage = this::this._getPage;
    this._isValid = this::this._isValid;
    this._onPageChange = this::this._onPageChange;
    this._hasPrev = this::this._hasPrev;
    this._hasNext = this::this._hasNext;
    this._clickPrev = this::this._clickPrev;
    this._clickNext = this::this._clickNext;
    this._jumpPrev = this::this._jumpPrev;
    this._jumpNext = this::this._jumpNext;
    this._quickJump = this::this._quickJump;
  }

  // todo 等把Select组件完成后，加入pageSizeChange功能

  static propTypes = {
    current: PropTypes.number,
    defaultCurrent: PropTypes.number,
    total: PropTypes.number,
    pageSize: PropTypes.number,
    defaultPageSize: PropTypes.number,
    onChange: PropTypes.func,
    showQuickJumper: PropTypes.bool,
    onPageSizeChange: PropTypes.func,
    showSizeChanger: PropTypes.bool,
    pageSizeOption: PropTypes.arrayOf(PropTypes.number),
  };

  static defaultProps = {
    defaultCurrent: 1,
    total: 0,
    defaultPageSize: 10,
    onChange: (page) => undefined,
    showQuickJumper: false,
    onPageSizeChange: (size) => undefined,
    showSizeChanger: false,
    pageSizeOption: [10, 20, 30, 40],
  };

  componentWillReceiveProps(nextProps) {
    if ('current' in nextProps) {
      this.setState({
        _current: nextProps.current,
      });
    }
  }

  _getPage(p) {
    let _pageSize = p;
    if (typeof _pageSize === 'undefined') {
      _pageSize = this.state._pageSize;
    }
    return Math.ceil(this.props.total / _pageSize);
  }

  _isValid(page) {
    return typeof page === 'number' && page >= 1 && page !== this.state._current;
  }

  _onPageChange(page) {
    if (this._isValid(page)) {
      page = page > this._getPage() ? this._getPage() : page;
      if (!('current' in this.props)) {
        this.setState({
          _current: page,
        });
      }
      this.props.onChange(page);
    }
  }

  _hasPrev() {
    return this.state._current > 1;
  }

  _hasNext() {
    return this.state._current < this._getPage();
  }

  _clickPrev() {
    this._hasPrev() && this._onPageChange(this.state._current - 1);
  }

  _clickNext() {
    this._hasNext() && this._onPageChange(this.state._current + 1);
  }

  _jumpPrev() {
    this._onPageChange(Math.max(1, this.state._current - 5));
  }

  _jumpNext() {
    this._onPageChange(Math.min(this._getPage(), this.state._current + 5));
  }

  _quickJump(e) {
    if (e.keyCode === 13) {
      const {total} = this.props;
      const {_current} = this.state;
      const inputValue = e.target.value;
      const maxPage = this._getPage();

      if (inputValue.length && total !== 0) {
        if (isNaN(inputValue)) {
          e.target.value = _current;
          console.warn('Please input a Number');
        } else {
          if (1 <= inputValue && inputValue <= maxPage) {
            if (_current !== Math.round(inputValue)) {
              this._onPageChange(Math.round(inputValue));
              e.target.value = Math.round(inputValue);
            }
          } else if (inputValue < 1) {
            this._onPageChange(1);
            e.target.value = 1;
          } else {
            this._onPageChange(maxPage);
            e.target.value = maxPage;
          }
        }
      } else {
        e.target.value = '';
      }
    }
  }

  render() {
    const {showQuickJumper}= this.props;
    const {_current} = this.state;
    const pages = this._getPage();
    const itemList = [];

    const prevClass = classNames(`${paginationPrefix}-prev`,
      {[`${paginationPrefix}-disabled`]: !this._hasPrev()}
    );
    const nextClass = classNames(`${paginationPrefix}-next`,
      {[`${paginationPrefix}-disabled`]: !this._hasNext()}
    );

    if (pages <= 9) {
      for (let i = 1; i <= pages; i++) {
        itemList.push(
          <PageItem
            key={i}
            page={i}
            active={i === _current}
            itemClick={this._onPageChange.bind(this, i)}
          />
        );
      }
    } else {
      let left = Math.max(1, _current - 2);
      let right = Math.min(_current + 2, pages);
      if (_current <= 3) {
        right = 5; // 1 + 4
      }
      if (pages - _current <= 2) {
        left = pages - 4;
      }
      for (let i = left; i <= right; i++) {
        itemList.push(
          <PageItem
            key={i}
            page={i}
            active={i === _current}
            itemClick={this._onPageChange.bind(this, i)}
          />
        );
      }

      // 向前或向后跳转
      if (_current >= 4) {
        itemList.unshift(
          <li
            className={`${paginationPrefix}-jump-prev`}
            key="to-prev"
            title="向前5页"
            onClick={this._jumpPrev}
          >
            <a/>
          </li>
        );
      }
      if (_current <= pages - 3) {
        itemList.push(
          <li
            className={`${paginationPrefix}-jump-next`}
            key="to-next"
            title="向后5页"
            onClick={this._jumpNext}
          >
            <a/>
          </li>
        );
      }

      // 跳转至首页与尾页
      if (left > 1) {
        itemList.unshift(
          <PageItem
            key={1}
            page={1}
            active={false}
            itemClick={this._onPageChange.bind(this, 1)}
          />
        );
      }
      if (right < pages) {
        itemList.push(
          <PageItem
            key={pages}
            page={pages}
            active={false}
            itemClick={this._onPageChange.bind(this, pages)}
          />
        );
      }
    }

    const quickJumper = !showQuickJumper ? null : (
      <li className={`${paginationPrefix}-quick-jumper`}>
        to
        <input type="text" onKeyUp={this._quickJump} defaultValue={_current}/>
      </li>
    );

    return (
      <ul className={paginationPrefix}>
        <li
          title={'上一页'}
          className={prevClass}
          onClick={this._clickPrev}
        >
          <a/>
        </li>
        {itemList}
        <li
          title={'下一页'}
          className={nextClass}
          onClick={this._clickNext}
        >
          <a/>
        </li>
        {quickJumper}
      </ul>
    );
  }
}
