export default function reducer (state = {
  artists: [],
  pageQty: 0,
  fetching: false,
  fetched: false,
  error: null
}, action) {
  switch (action.type) {
    case 'GET_ARTISTS_PENDING': {
      return { ...state, fetching: true }
    }
    case 'GET_ARTISTS_REJECTED': {
      return { ...state, fetching: false, error: action.payload }
    }
    case 'GET_ARTISTS_FULFILLED': {
      return { ...state, fetching: false, fetched: true, artists: action.payload.data.dataset, pageQty: action.payload.data.total_pages }
    }
  }

  return state
}
