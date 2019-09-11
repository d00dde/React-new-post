import React, { Component } from 'react';
import './pagination.css';

const withPagination = (List) => {
  return class Pagination extends Component {
    
    _paginationClass = 'pagination';
    _activeClass = 'active';
    _availableClass = 'waves-effect';
    _dasabledClass = 'disabled'

    state = {
      data: null;
      count: 10,
      activePage: 0,
      scale: 3
    }

    componentDidMount () {
      this.update();
    }

    componentDidUpdate (prevProps) {
      if(this.props.data !== prevProps.data)
        this.update();
    }

    update = () => {
      this.state({
        data: this.props.data,
        activePage: 0
      })
    }


    render () {
      return (
        const page = this.getPage (this.state.data,
                                   this.state.count,
                                   this.state.activePage);
        <React.Fragment>
          <List {...this.props} page={page}/>
          {this.createPagination()}
        </React.Fragment>
      )

    }

    createPagination = () => {
      const totalPages = Math.ceil(this.state.data.length/this.state.count);
      const { activePage } = this.state;
      if(totalPages === 1)
        return null;
      let pages = [];
      const showPages = this.drawPages(totalPages, activePage, this.state.scale);
      for (let i = showPages.begin; i < showPages.end; i++) {
        const className = i === activePage ? this._activeClass : this._availableClass;
        pages.push(<li key={i}
                       className={className}
                       onClick={(e) => this.onClickHandler(e)}><a href="#" number={i}>{i + 1}</a></li>)
      }

      const classLeft = activePage === 0 ? this._dasabledClass : this._availableClass;
      const classRight = activePage === totalPages - 1 ? this._dasabledClass : this._availableClass;
      return (
        <ul className={this._paginationClass}>
          <li className={classLeft} onClick={(e) => this.onClickHandler(e)}><a href="#" number={"-1"}>{'<'}</a></li>
          {pages}
          <li className={classRight} onClick={(e) => this.onClickHandler(e)}><a href="#" number={"+1"}>{'>'}</a></li>
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
    })
  }

    getPage = (warehouses, count, number) => {
    return warehouses.slice(count*number, count*(number+1));
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

export default withPagination