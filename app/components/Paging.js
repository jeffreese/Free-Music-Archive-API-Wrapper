import React, { Component } from 'react'
import ReactPaginate from 'react-paginate'

export default class Paging extends Component {

  render () {
    return (
      <div className='paging'>
        <ReactPaginate
          previousLabel='&laquo;'
          nextLabel='&raquo;'
          breakLabel={<a href=''>...</a>}
          pageNum={this.props.pageQty}
          marginPagesDisplayed={1}
          pageRangeDisplayed={5}
          clickCallback={this.props.callback}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    )
  }
}
