import React from 'react'

import PropTypes from 'prop-types'
// import PubSub from 'pubsub-js'
import { Link} from 'react-router-dom'
import { Menu, Dropdown, Icon, message } from 'antd'
import avatar from '../../assets/images/admin_avatar.png'

// import store from '../../redux/store/store'

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
      headerBackground: {},
      headerColor: {}
    }
  }
  componentDidMount() {
    // 这里使用的是 订阅发布的方式 实现数据跨组间传递
    // this.change_bg = PubSub.subscribe('change_bg', (topic, bgColor) => {
    //   console.log(topic, bgColor)
    //   let bg = {
    //     background: bgColor.bg
    //   }
    //   let color = {
    //     color: bgColor.icon
    //   }
    //   this.setState({
    //     bg, color
    //   })
    // })
  }
  // componentWillUnmount() {
  //   PubSub.unsubscribe(this.change_bg)
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
    // console.log(this.props.history)
    // sessionStorage.setItem('auth', null)
    // this.props.history.push('/login')
  }
  render() {
    // console.log(this.context)
    let theme = this.context.store.constant.theme
    let headerBackground = {}
    let headerColor = {}
    if (theme === 'light') {
      headerBackground = {background: '#F6F6F6'}
      headerColor = {color: '#eb2f96'}
    }
    return (
      <div className="header-inner" style={headerBackground}>
        <div className="site-logo">
          <Link to="/">
            <img src={avatar} alt="avatar"/>
            <span>欢迎访问我的博客</span>
          </Link>
        </div>
        <div className="site-brand">
          <h1>LEE's Kingdom {theme}</h1>
        </div>
        <div className="site-nav">
          <a onClick={this.logout.bind(this)} className="logout" style={headerColor} ><i className="icon iconfont icon-logout"></i></a>
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" style={headerColor}>
              <Icon type="coffee" />
            </a>
          </Dropdown>
        </div>
      </div>
    )
  }
}

// 静态方法移动到 class 内部实现了
// Header.contextTypes = {
//   store: PropTypes.object
// }

export default Header