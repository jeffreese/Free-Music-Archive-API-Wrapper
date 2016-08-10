export default function reducer (state = {
  artist: {},
  fetching: false,
  fetched: false,
  error: null
}, action) {
  switch (action.type) {
    case 'GET_ARTIST_PENDING': {
      return { ...state, fetching: true }
    }
    case 'GET_ARTIST_REJECTED': {
      return { ...state, fetching: false, error: action.payload }
    }
    case 'GET_ARTIST_FULFILLED': {
      return { ...state, fetching: false, fetched: true, artist: action.payload.data.dataset[0] }
    }
  }

  return state
}
