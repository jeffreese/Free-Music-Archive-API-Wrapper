import axios from 'axios'

const apiKey = '5CTNK8Q6B3IELFOE'

export function getCurators () {
  return {
    type: 'GET_CURATORS',
    payload: axios.get('https://freemusicarchive.org/api/get/curators.json?api_key=' + apiKey)
  }
}

export function getArtists (page) {
  return {
    type: 'GET_ARTISTS',
    payload: axios.get('https://freemusicarchive.org/api/get/artists.json?page=' + page + '&limit=20&api_key=' + apiKey)
  }
}

export function getArtist (id) {
  return {
    type: 'GET_ARTIST',
    payload: axios.get('https://freemusicarchive.org/api/get/artists.json?artist_id=' + id + '&api_key=' + apiKey)
  }
}
