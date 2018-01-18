import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/login'
import Register from './components/register'
import About from './components/about'
import Home from './components/index'


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/about" component={About}></Route>
          <Route exact path="/" component={Home}></Route>
        </Switch>
      </Router>
    )
  }
}

export default App;
