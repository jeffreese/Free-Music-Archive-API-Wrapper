import React, { Component } from 'react'
import { Link } from 'react-router'

export default class ArtistThumb extends Component {

  render () {
    const artist = this.props.artist
    return (
      <div className='artist-thumb-container'>
        <Link to={'/artist/' + artist.artist_id}>
          <img src={artist.artist_image_file} />
        </Link>
        <div>{artist.artist_name}</div>
      </div>
    )
  }
}
