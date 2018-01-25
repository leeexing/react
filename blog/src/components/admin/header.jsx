import React from 'react'

import PropTypes from 'prop-types'
import PubSub from 'pubsub-js'
import { Link} from 'react-router-dom'
import { Menu, Dropdown, Icon } from 'antd'
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
    this.setState({
      legend: state_store.legend.msg
    })

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
          <h1>LEE's Kingdom > {this.context.store.legend.count}</h1>
        </div>
        <div className="site-nav">
          <Link to="/login" className="logout" style={this.state.color}><i className="icon iconfont icon-logout"></i></Link>
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