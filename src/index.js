import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Provider from './Context'
import './index.css'
import App from './App'
import AppWrapper from './AppWrapper'

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <Router>
        <Switch>
          <Route exact path='/'>
            <App />
          </Route>
          <Route path='/:login'>
            <AppWrapper />
          </Route>
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
