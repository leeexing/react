import React from 'react'
import { Link } from 'react-router-dom'
import PubSub from 'pubsub-js'

class SideNav extends React.Component {
  constructor(props) {
    super()
    this.state = {
      isAdmin: false,
      username: 'leeing'
    }
  }
  componentDidMount() {
    this.is_admin = PubSub.subscribe('login-ok', (topic, loginInfo) => {
      this.setState({
        isAdmin: loginInfo.isAdmin,
        username: loginInfo.username
      })
    })
  }
  componentWillUnmount() {
    PubSub.unsubscribe(this.is_admin)
  }
  logout() {
    sessionStorage.clear()
    this.props.history.push('/login')
  }
  render() {
    return (
      <nav className="m-sidenav">
        <section className="header-top">
          <div className="site-brand">
            <h1 className="info">{this.state.username}</h1>
            <p className="motto"><span>Keep Simple | Keep Sunshine</span><i onClick={this.logout.bind(this)} className="icon iconfont icon-logout"></i></p>
          </div>
          <div className="site-nav">
            <ul>
              <li className="active">
                <Link to="/">
                  <i className="icon iconfont icon-home"></i>
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
              {
                this.state.isAdmin
                &&
                <li>
                  <Link to="/admin">
                    <i className="icon iconfont icon-python"></i>
                    管理员
                  </Link>
                </li>
              }
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