import React from 'react'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import About from '../About/About'
import Article from '../Article/Article'
import Detail from '../Article/Detail'
import Todo from '../Todo/Todo'
import Header from '../Header/Header'

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <Header />
        <Route path="/todolist" component={Todo} />
        <Route path="/about" component={About} />
        <Route path="/article/:articleid" component={Detail}></Route>
        <Route exact path="/article" component={Article} />
        <Route exact path='/' render={() => (
          <h3>沉舟侧畔千帆过</h3>
        )}/>
      </div>
    )
  }
}

export default Home