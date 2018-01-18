import React from 'react'
// import Header from './header'
import SideNav from './sideNav'
import Article from './article'

class Index extends React.Component {
  render() {
    return (
      <div className="app">
        {/* <Header /> */}
        <div className="nav">
          <SideNav />
        </div>
        <main className="content">
          <Article content="nioahfoashfoasof jasodf " />
          <Article content="nioahfoashfoasof jasodf " />
          <Article content="nioahfoashfoasof jasodf " />
          <Article content="nioahfoashfoasof jasodf " />
        </main>
      </div>
    )
  }
}
export default Index