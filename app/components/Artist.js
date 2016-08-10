import React, { Component } from 'react'
import { connect } from 'react-redux'
import Remarkable from 'remarkable'

import { getArtist } from '../actions/musicActions'

@connect((store) => {
  return {
    artist: store.artist.artist
  }
})

export default class Artist extends Component {

  componentWillMount () {
    // get the artist based on the url
    this.props.dispatch(getArtist(this.props.params.id))
  }

  // sanitize the external markup before rendering it
  cleanRawMarkup (html) {
    const md = new Remarkable({html: true})
    return { __html: md.render(html) }
  }

  render () {
    const artist = this.props.artist

    return (
      <div className='row'>
        <div className='col-md-12'>
          <div className='panel panel-default'>
            <div className='panel-body'>
              <div className='row'>
                <div className='col-md-12 lead'>Artist profile<hr /></div>
              </div>
              <div className='row'>
                <div className='col-md-4 text-center'>
                  <img className='artist-img' src={artist.artist_image_file} />
                </div>
                <div className='col-md-8'>
                  <div className='row'>
                    <div className='col-md-12'>
                      <h1 className='only-bottom-margin'>{artist.artist_name}</h1>
                      <span className='text-muted'>Bio:</span>
                      <div dangerouslySetInnerHTML={this.cleanRawMarkup(artist.artist_bio)}></div><br />
                      <span className='text-muted'>Website:</span> 
                      <div><a href={artist.artist_website} target='_blank'>{artist.artist_website}</a></div><br />
                      <span className='text-muted'>Donation URL:</span> 
                      <div><a href={artist.artist_donation_url} target='_blank'>{artist.artist_donation_url}</a></div><br /><br />
                      <small className='text-muted'>Created: {artist.artist_date_created}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
