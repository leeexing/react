import React from 'react'
import { Route } from 'react-router-dom'
import SideNav from './sideNav'
import ArticleList from './articleList'
import ArticleDetail from './articleDetail'
import Music from './music'
import Search from './search'
import Footer from './footer'
import { BackTop } from 'antd'

class Index extends React.Component {
  componentWillMount() {
    // let auth = sessionStorage.getItem('auth')
    // console.log(auth)
    // if (auth === 'null') {
    //   this.props.history.push('/login')
    // }
  }
  render() {
    return (
      <div className="app">
        <div className="headband"></div>
        <header className="header"></header>
        <main className="main clearfix">
          <div className="nav">
            <SideNav history={this.props.history} />
          </div>
          <div className="main-inner">
            <Route path="/article/:id" component={ArticleDetail}></Route>
            <Route path="/music" component={Music}></Route>
            <Route path="/search" component={Search}></Route>
            <Route exact path="/" component={ArticleList}></Route>
          </div>
        </main>
        <BackTop/>
        <Footer />
      </div>
    )
  }
}
export default Index