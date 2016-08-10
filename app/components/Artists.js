import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactPaginate from 'react-paginate'

import { getArtists } from '../actions/musicActions'

import ArtistThumb from './ArtistThumb'
import Paging from './Paging'

// inject store props (using transform decorator)
@connect((store) => {
  return {
    artists: store.artists.artists,
    pageQty: store.artists.pageQty  // total # of pages from api
  }
})

export default class Artists extends Component {

  constructor(props){
    super(props)

    this.state = {
      page: 1
    }
  }

  componentWillMount () {
    this.getArtists()
  }

  getArtists () {
    this.props.dispatch(getArtists(this.state.page))
  }

  // handle page changing
  handlePageClick (data) {
    let selected = data.selected;

    this.setState({page: selected + 1}, () => {
      this.getArtists();
    });
  }

  render () {
    // build thumbs for each artist
    const artistsDisplay = this.props.artists.map((artist) => <ArtistThumb key={artist.artist_id} artist={artist} />)

    return (
      <div>
        <Paging pageQty={this.props.pageQty} callback={this.handlePageClick.bind(this)} />
        <div>{artistsDisplay}</div>
      </div>
    )
  }
}
