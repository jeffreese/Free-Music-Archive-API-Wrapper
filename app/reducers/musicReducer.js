export default function reducer (state = {
  curators: [],
  fetching: false,
  fetched: false,
  error: null
}, action) {
  switch (action.type) {
    case 'GET_CURATORS_PENDING': {
      return { ...state, fetching: true }
    }
    case 'GET_CURATORS_REJECTED': {
      return { ...state, fetching: false, error: action.payload }
    }
    case 'GET_CURATORS_FULFILLED': {
      return { ...state, fetching: false, fetched: true, curators: action.payload.data.dataset }
    }
  }

  return state
}
