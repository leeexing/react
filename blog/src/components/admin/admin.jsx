import React from 'react'
import { Route } from 'react-router-dom'

import Header from './header'
import Sider from './sideMenu'
import Setting from './setting'
import UserList from './userlist'
import Map from './map'
import Answer from './answer'

class Admin extends React.Component {
  render() {
    return (
      <div className="admin" id="admin">
        <header className="header">
          <Header/>
        </header>
        <main className="main">
          <nav className="side-nav">
            <Sider history={this.props.history}/>
          </nav>
          <div className="content">
            <Route path={`${this.props.match.path}/userlist`} component={UserList}></Route>
            <Route path={`${this.props.match.path}/map`} component={Map}></Route>
            <Route path={`${this.props.match.path}/answer`} component={Answer}></Route>
            <Route path={`${this.props.match.path}/setting`} component={Setting}></Route>
            <Route exact path={this.props.match.path} render={() => (
              <h1>这里是首页</h1>
            )} />
          </div>
        </main>
      </div>
    )
  }  
}

export default Admin