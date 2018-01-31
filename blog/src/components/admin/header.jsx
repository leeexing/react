import React from 'react'

import PropTypes from 'prop-types'
import PubSub from 'pubsub-js'
import { Link} from 'react-router-dom'
import { Menu, Dropdown, Icon, message } from 'antd'
import avatar from '../../assets/images/admin_avatar.png'

import store from '../../redux/store/store'

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">Music</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">Film</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">Travel</a>
    </Menu.Item>
  </Menu>
);

class Header extends React.Component {
  static contextTypes = {
    store: PropTypes.object
  }
  constructor() {
    super()
    this.state = {
      bg: {},
      colot: {}
    }
  }
  componentDidMount() {
    // 这里使用的是 redux 的方式，实现数据的 共享
    console.warn(this.context.store)
    console.log(store)
    let state_store = store.getState()
    console.log(state_store)
    // this.setState({
    //   legend: state_store.legend.msg
    // })

    // 这里使用的是 订阅发布的方式 实现数据跨组间传递
    this.change_bg = PubSub.subscribe('change_bg', (topic, bgColor) => {
      console.log(topic, bgColor)
      let bg = {
        background: bgColor.bg
      }
      let color = {
        color: bgColor.icon
      }
      this.setState({
        bg, color
      })
    })
  }
  componentWillUnmount() {
    PubSub.unsubscribe(this.change_bg)
  }
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
    // console.log(this.props.history)
    // sessionStorage.setItem('auth', null)
    // this.props.history.push('/login')
  }
  render() {
    return (
      <div className="header-inner" style={this.state.bg}>
        <div className="site-logo">
          <Link to="/">
            <img src={avatar} alt="avatar"/>
            <span>欢迎访问我的博客</span>
          </Link>
        </div>
        <div className="site-brand">
          <h1>LEE's Kingdom</h1>
        </div>
        <div className="site-nav">
          <a onClick={this.logout.bind(this)} className="logout" style={this.state.color} ><i className="icon iconfont icon-logout"></i></a>
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" style={this.state.color}>
              <Icon type="coffee" />
            </a>
          </Dropdown>
        </div>
      </div>
    )
  }
}

// Header.contextTypes = {
//   store: PropTypes.object
// }

export default Header