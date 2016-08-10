import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

// set up the store
import store from './store'

// load routable components
import App from './components/App'
import Artists from './components/Artists'
import Artist from './components/Artist'
import Music from './components/Music'

const content = document.getElementById('content')

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Artists} />
        <Route path='/artists(/:page)' component={Artists} />
        <Route path='/artist/:id' component={Artist} />
        <Route path='/music' component={Music} />
      </Route>
    </Router>
  </Provider>
, content)
