import React from 'react'
import PubSub from 'pubsub-js'
import { Link} from 'react-router-dom'
import { Menu, Dropdown, Icon } from 'antd'
import avatar from '../../assets/images/admin_avatar.png'

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
  constructor() {
    super()
    this.state = {
      bg: {}
    }
  }
  componentDidMount() {
    this.change_bg = PubSub.subscribe('change_bg', (topic, bgColor) => {
      console.log(topic, bgColor)
      let bg = {
        background: bgColor
      }
      this.setState({
        bg
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
          <h1>LEE's Kingdom</h1>
        </div>
        <div className="site-nav">
          <Link to="/login" className="logout"><i className="icon iconfont icon-logout"></i></Link>
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link">
              <Icon type="coffee" />
            </a>
          </Dropdown>
        </div>
      </div>
    )
  }
}
export default Header