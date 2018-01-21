import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import Login from './components/login'
import Register from './components/register'
import About from './components/about'
import Home from './components/index'
import Admin from './components/admin/admin'

import todoApp from './redux/reducer'
let store = createStore(todoApp)


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/about" component={About}></Route>
            <Route path="/admin" component={Admin}></Route>
            <Route path="/" component={Home}></Route>
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App;
