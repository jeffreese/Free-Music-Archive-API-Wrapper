import { combineReducers } from 'redux'

import music from './musicReducer'
import artists from './artistsReducer'
import artist from './artistReducer'

export default combineReducers({
  music,
  artists,
  artist
})
