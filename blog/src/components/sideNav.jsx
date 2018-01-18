import React from 'react'
import { Link } from 'react-router-dom'

class SideNav extends React.Component {
  constructor(props) {
    super()
    this.state = {}
  }
  render() {
    return (
      <nav className="m-sidenav">
        <section className="header-top">
          <div className="site-brand">
            <h1 className="info">LEEING</h1>
            <p className="motto">Keep Simple | Keep Sunshine</p>
          </div>
          <div className="site-nav">
            <ul>
              <li className="active">
                <Link to="/">
                  <i className="icon iconfont icon-code"></i>
                  首页
                </Link>
              </li>
              <li>
                <Link to="/about">
                  <i className="icon iconfont icon-star"></i>
                  关于
                </Link>
              </li>
              <li>
                <Link to="/music">
                  <i className="icon iconfont icon-music"></i>
                  音乐
                </Link>
              </li>
              <li>
                <Link to="/search">
                  <i className="icon iconfont icon-search"></i>
                  搜索
                </Link>
              </li>
              <li>
                <Link to="/admin">
                  <i className="icon iconfont icon-python"></i>
                  管理员
                </Link>
              </li>
            </ul>
          </div>
        </section>
        <section className="header-bot">
        
        </section>
      </nav>
    )
  }
}

export default SideNav