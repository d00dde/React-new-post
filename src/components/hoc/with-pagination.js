import React, { Component, defaultProps } from 'react';
import PropTypes from 'prop-types';
import './pagination.css';

export default (List) => {
  return class Pagination extends Component {
    
    _paginationClass = 'pagination';
    _activeClass = 'active';
    _availableClass = 'waves-effect';
    _dasabledClass = 'disabled'

    static propTypes = {
      data: PropTypes.array.isRequired,
      paginationCount: PropTypes.number,
      paginationScale: PropTypes.number
    }

    static defaultProps = {
      paginationCount: 10,
      paginationScale: 2
    }

    state = {
      activePage: 0,
    }

    componentDidUpdate (prevProps) {
      if(this.props.data !== prevProps.data)
      this.setState({
        activePage: 0
      })
    }

    render () {
      const page = this.getPage (this.props.data,
                                 this.props.paginationCount,
                                 this.state.activePage);
      return (

        <React.Fragment>
          <List {...this.props} data={page}/>
          {this.createPagination()}
        </React.Fragment>
      )
    }

    createPagination = () => {
      const { activePage } = this.state;
      const { paginationCount,
              paginationScale,
              data } = this.props;
      const totalPages = Math.ceil(data.length/paginationCount);
      if(totalPages <= 1)
        return null;
      let pages = [];
      const showPages = this.drawPages(totalPages, activePage, paginationScale);
      for (let i = showPages.begin; i < showPages.end; i++) {
        const className = i === activePage ? this._activeClass : this._availableClass;
        pages.push(<li key={i}
                       className={className}
                       onClick={(e) => this.onClickHandler(e)}><a number={i}>{i + 1}</a></li>)
      }

      const classLeft = activePage === 0 ? this._dasabledClass : this._availableClass;
      const classRight = activePage === totalPages - 1 ? this._dasabledClass : this._availableClass;
      return (
        <ul className={this._paginationClass}>
          <li className={classLeft} onClick={(e) => this.onClickHandler(e)}><a number={"-1"}>{'<'}</a></li>
          {pages}
          <li className={classRight} onClick={(e) => this.onClickHandler(e)}><a number={"+1"}>{'>'}</a></li>
        </ul>
      )
    }

    onClickHandler = (e) => {
      if (e.target.parentElement.classList.contains(this._dasabledClass))
        return;
      if (e.target.parentElement.classList.contains(this._activeClass))
        return;
      this.onPageChecked(e.target.getAttribute('number'));
    }

    onPageChecked = (number) => {
      let newPage;
      switch (number) {
        case '-1':
          newPage = this.state.activePage - 1;
          break;
        case '+1':
          newPage = this.state.activePage + 1;
          break;
        default:
          newPage = +number;
      }
      this.setState({
        activePage: newPage
      });
  }

    getPage = (data, count, number) => {
    return data.slice(count*number, count*(number+1));
    }

    drawPages = (totalPages, activePage, scale) => {
      if(totalPages > (scale*2 + 1)){
        if(activePage - scale < 0) {
          return {begin: 0, end: (scale*2 + 1)}
        } if (activePage + scale >= totalPages){
          return {begin: totalPages - (scale*2 + 1), end: totalPages }
        } else {
          return {begin: activePage - scale , end: activePage + scale + 1}
        }
      }
      else {
        return {begin: 0, end: totalPages}
      }
    }
  }

}
