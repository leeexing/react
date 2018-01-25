import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/login'
import Register from './components/register'
import About from './components/about'
import Home from './components/index'
import Admin from './components/admin/admin'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { VisibilityFilters } from './redux/actions/actions'

class App extends Component {
  static childContextTypes = {
    store: PropTypes.object
  }
  getChildContext() {
    return {
      store: this.props
    }
  }
  render() {
    console.info(this.props)
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/register" component={Register}></Route>
          <Route exact path="/about" component={About}></Route>
          <Route path="/admin" component={Admin}></Route>
          <Route path="/" component={Home}></Route>
        </Switch>
      </Router>
    )
  }
}

// App.childContextTypes = {
//   store: PropTypes.object
// }

App.propTypes = {
  visibleTodos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired,
  visibilityFilter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
}

function selectTodos(todos, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed)
    default:

  }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
  return {
    visibleTodos: selectTodos(state.todos, state.visibilityFilter, state.legend),
    visibilityFilter: state.visibilityFilter,
    legend: state.legend
  }
}

export default connect(select)(App)
