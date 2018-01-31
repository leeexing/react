import React from 'react'
import { message } from 'antd'
import { Link } from 'react-router-dom'
// import PubSub from 'pubsub-js'
import PropTypes from 'prop-types'

class SideNav extends React.Component {
  static contextTypes = {
    store: PropTypes.object
  }
  constructor(props) {
    super()
    this.state = {
      isAdmin: false,
      username: 'leexing'
    }
  }
  componentDidMount() {
    console.log('执行了什么呢？')
    // this.is_admin = PubSub.subscribe('login-ok', (topic, loginInfo) => {
    //   this.setState({
    //     isAdmin: loginInfo.isAdmin,
    //     username: loginInfo.username
    //   })
    // })
  }
  // componentWillUnmount() {
  //   PubSub.unsubscribe(this.is_admin)
  // }
  logout() {
    global.constants.http.post('/api/logout')
      .then(data => {
        console.log(data)
        if (!data.data.success) {
          message.error(data.data.msg)
          return
        }
        sessionStorage.clear()
        this.props.history.push('/login')
      })
  }
  render() {
    console.log(this.state.isAdmin)
    let username = this.context.store.constant.userInfo.username || this.state.username
    let isAdmin = this.context.store.constant.userInfo.isAdmin
    // console.log(this.context.store.constant.username)
    return (
      <nav className="m-sidenav">
        <section className="header-top">
          <div className="site-brand">
            <h1 className="info">{username}</h1>
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
                isAdmin
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