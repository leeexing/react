import React from 'react'
import { Route } from 'react-router-dom'
import SideNav from './sideNav'
import ArticleList from './articleList'
import ArticleDetail from './articleDetail'
import Music from './music'
import { BackTop } from 'antd'

class Index extends React.Component {
  render() {
    return (
      <div className="app">
        <div className="headband"></div>
        <header className="header"></header>
        <main className="main clearfix">
          <div className="nav">
            <SideNav />
          </div>
          <div className="main-inner">
            <Route path="/article/:id" component={ArticleDetail}></Route>
            <Route path="/music" component={Music}></Route>
            <Route exact path="/" component={ArticleList}></Route>
          </div>
        </main>
        <BackTop/>
        {/* <Footer /> */}
      </div>
    )
  }
}
export default Index