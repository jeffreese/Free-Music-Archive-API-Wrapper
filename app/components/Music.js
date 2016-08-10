import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getCurators } from '../actions/musicActions'

@connect((store) => {
  return {
    curators: store.music.curators,
    genres: store.music.genres
  }
})

export default class Music extends Component {

  componentWillMount () {
    getCurators()
  }

  getCurators () {
    this.props.dispatch(getCurators())
  }

  render () {
    if(!this.props.curators.length) {
      return (
        <div>
          <div>Simple example of a triggered dispatch to get Curators from freemusicarchive</div>
          <button onClick={this.getCurators.bind(this)}>load curators</button>
        </div>
      )
    }

    const curatorOutput = this.props.curators.map((curator) => <div key={curator.curator_id}>{curator.curator_title}</div>)

    return (
      <div id='mod-music'>
        <h1>Curators</h1>
        {curatorOutput}
      </div>
    )
  }
}
