import React, { Component } from 'react';
import './pagination.css';

class Pagination extends Component {
  render () {
    const { totalPages, activePage } = this.props;
    if(totalPages === 1)
      return null;
    let pages = [];
    const showPages = this.drawPages(totalPages, activePage, 3);
    for (let i = showPages.begin; i < showPages.end; i++) {
      const className = i === activePage ? 'active' : 'waves-effect';
      pages.push(<li key={i}
                     className={className}
                     onClick={(e) => this.onClickHandler(e)}><a href="#" number={i}>{i + 1}</a></li>)
    }

    const classLeft = activePage === 0 ? 'disabled':'waves-effect';
    const classRight = activePage === totalPages - 1 ? 'disabled':'waves-effect';
    return (
      <ul className="pagination">
        <li className={classLeft} onClick={(e) => this.onClickHandler(e)}><a href="#" number={"-1"}>{'<'}</a></li>
        {pages}
        <li className={classRight} onClick={(e) => this.onClickHandler(e)}><a href="#" number={"+1"}>{'>'}</a></li>
      </ul>
    )
  }
  onClickHandler = (e) => {
    if (e.target.parentElement.classList.contains('disabled'))
      return;
    if (e.target.parentElement.classList.contains('active'))
      return;
    this.props.onPageChecked(e.target.getAttribute('number'));
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

export default Pagination