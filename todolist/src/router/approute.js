import React from 'react'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import Header from '../components/Header/Header'
import Home from '../components/Home/Home'
// import About from '../components/About/About'
// import Article from '../components/Article/Article'
// import Todo from '../components/Todo/Todo'
import Login from '../components/Login/Login'

class AppRoute extends React.Component {
  constructor() {
    super()
    this.state = {

    }
  }
  render() {
    return (
      <Router>
        <div className="app">
          {/* 如果还有其他的模板和 home 以及 login 的不一样，直接在这里添加就可以了 */}
          <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/" component={Home} />
          </Switch>
          {/* <Router>
            <main className="content">
              <Header />
              <Route exact path="/" component={Home}/>
              <Route path="/article" component={Article}/>
              <Route path="/todolist" component={Todo}/>
              <Route path="/about" component={About}/>
            </main>
            </Router> */}
        </div>
      </Router>
    )
  }
}

export default AppRoute