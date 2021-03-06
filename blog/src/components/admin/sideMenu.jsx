import React from 'react'
import { Link } from 'react-router-dom'
// import PubSub from 'pubsub-js'
import PropTypes from 'prop-types'
import { changeTheme } from '../../redux/actions/index'

import { Menu, Icon, Switch } from 'antd';
const SubMenu = Menu.SubMenu;

class Sider extends React.Component {
  static contextTypes = {
    store: PropTypes.object
  }
  constructor(props) {
    super()
    this.state = {
      theme: 'dark',
      current: '0',
      history: props.history
    }
    this.handleClick = this.handleClick.bind(this)
    this.changeTheme = this.changeTheme.bind(this)
  }
  changeTheme(value) {
    let theme = value ? 'dark' : 'light'
    this.setState({
      theme
    })
    console.log(this.context)
    console.log(theme)
    this.context.store.dispatch(changeTheme(theme))

    // PubSub 订阅方式实现
    // let bgColor = {
    //   bg: value ? '#222' : '#F6F6F6',
    //   icon: value ? '#fff' : '#eb2f96'
    // }
    // PubSub.publish('change_bg', bgColor)
  }
  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
    this.state.history.push(e.key)
  }
  render() {
    return (
      <div>
        <div className="toggle-theme">
          <Switch
            checked={this.state.theme === 'dark'}
            onChange={this.changeTheme}
            checkedChildren="Dark"
            unCheckedChildren="Light"
          />
        </div>
        <Menu
          theme={this.state.theme}
          onClick={this.handleClick}
          defaultOpenKeys={['sub2','sub5']}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
          <Menu.Item key="/admin"><Icon type="home" />首页</Menu.Item>
          <SubMenu key="sub1" title={<span><Icon type="mail" /><span>我的博客</span></span>}>
            <Menu.Item key="/admin/userlist">用户列表</Menu.Item>
            <Menu.Item key="2">文章列表</Menu.Item>
            <Menu.Item key="3">图片列表</Menu.Item>
            <Menu.Item key="4">趣味问答</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>试验田</span></span>}>
            <Menu.Item key="/admin/answer">Answer</Menu.Item>
            <Menu.Item key="/admin/map">Map</Menu.Item>
            <Menu.Item key="6">Echart</Menu.Item>
            <SubMenu key="sub3" title="python">
              <Menu.Item key="7">spider</Menu.Item>
              <Menu.Item key="8">numpy</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub4" title={<span><Icon type="compass" /><span>新大陆</span></span>}>
            <Menu.Item key="9">未知世界</Menu.Item>
            <Menu.Item key="10">奇妙旅行</Menu.Item>
            <Menu.Item key="11">穿越时空</Menu.Item>
            <Menu.Item key="12">那一道光</Menu.Item>
          </SubMenu>
          <Menu.Item key="/admin/setting"><Icon type="setting" /><Link to="/admin/setting">设置</Link></Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default Sider

