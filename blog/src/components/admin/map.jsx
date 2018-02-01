import React from 'react'
import {Button, Divider} from 'antd'
import PubSub from 'pubsub-js'
import PropTypes from 'prop-types'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
// const PropTypes = require('prop-types') // 另外一种 引用方式

class ToggleButton extends React.Component {
  changeParentCount() {
    this.props.callback(2)
  }
  render() {
    return (
      <div className="child">
        <Button type="primary" onClick={this.changeParentCount.bind(this)}>{this.props.btnname}</Button>
      </div>
    )
  }
}

// 孙子组件
class SunButton extends React.Component {
  handleChangeMsg() {
    // console.log(this.props)
    this.props.cb()
  }
  handleChangeMusic() {
    console.log(this.context)
    this.context.changeMusic('菊花台满地伤，你的笑容已泛黄')
  }
  render() {
    return (
      <div className="grandson">
        <Button type="danger" ghost onClick={this.handleChangeMsg.bind(this)}>{this.props.name}</Button>
        《》
        <Button type="danger" ghost onClick={this.handleChangeMusic.bind(this)}>{this.context.test}</Button>
      </div>
    )
  }
}
SunButton.contextTypes = {
  test: PropTypes.string,
  changeMusic: PropTypes.func
}

// 父亲组件
class ParentButton extends React.Component {
  render() {
    return (
      <div className="parent">
        <h1>我只是一快腹肌</h1>
        <br/>
        <SunButton name="南征北战" cb={this.props.changeMsg}/>
      </div>
    )
  }
}

/**
 * 非父子组件信息传递
 */
class PopularSinger extends React.Component {
  constructor() {
    super()
    this.state = {
      popSinger: 'Jay'
    }
  }
  componentDidMount() {
    // 第一个参数：topic 指代的是 订阅事件的名称，这里就是指 singer-vote
    // 第二个参数：popSinger 发布事件传过来的参数
    this.singer_vote = PubSub.subscribe('singer-vote', (topic, popSinger) => {
      console.log(topic, popSinger) // 输出：singer-vote 陈奕迅
      this.setState({
        popSinger
      })
    })
  }
  componentWillUnmount() {
    PubSub.unsubscribe(this.singer_vote)
  }
  render() {
    return (
      <div className="singer-start">
        <h3>你选择的年度最佳歌手是：{this.state.popSinger}</h3>
      </div>
    )
  }
}

class Singer extends React.Component {
  vote() {
    console.log('感谢您的投票', this.props)
    PubSub.publish('singer-vote', this.props.singer)
  }
  render() {
    return (
      <span className="singer-candidate" style={{'display':'inline-block','padding': '10px'}}>
        <Button onClick={this.vote.bind(this)} type="primary" ghost>{this.props.singer}</Button>
      </span>
    )
  }
}

// 主组件
class Map extends React.Component {
  constructor() {
    super()
    this.state = {
      count: 0,
      msg: '我想回到过去',
      music: '一首简单的歌',
      singer: 'Jay'
    }
  }
  componentWillMount() {
    // console.log(store)
  }
  getChildContext() {
    return {
      test: '等你下课',
      changeMusic: this.changeMusic.bind(this)
    }
  }
  changeCount(newVal) {
    console.log(newVal)
    this.setState({
      count: this.state.count + newVal
    })
  }
  changeMsg(newMsg) {
    console.log(newMsg)
    this.setState({
      msg: newMsg || '你怎么可以不穿内裤'
    })
  }
  changeMusic(newMusic) {
    console.log(newMusic)
    this.setState({
      music: newMusic
    })
  }
  render() {
    return (
      <div className="parent">
        <h1>子组件改变父组件的状态</h1>
        <br/>
        <span>值的改变：{this.state.count}</span>
        <hr/>
        <ToggleButton btnname="漂亮的回旋踢" callback={this.changeCount.bind(this)}/>
        <br/>
        <br/>
        <p>来自sun组件的呼呼(props)：{this.state.msg}</p>
        <p>来自sun组件的呼呼(context)：{this.state.music}</p>
        <hr/>
        <ParentButton changeMsg={this.changeMsg.bind(this)}/>
        <br/>
        <br/>
        <h3>Tips：React之使用context传递数据</h3>
        <p>与props只能逐级传递数据相比，使用context可以实现跨级传递数据。 </p>
        <Divider>2017年度最佳歌手颁奖典礼</Divider>
        <PopularSinger />
        <ReactCSSTransitionGroup
          transitionName="map"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}>
        >
          <div>
            <Singer singer="周杰伦"/>
            <Singer singer="陈奕迅"/>
            <Singer singer="张学友"/>
            <Singer singer="林俊杰"/>
            <Singer singer="结实姐"/>
            <Singer singer="jonyJ"/>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}
Map.childContextTypes = {
  test: PropTypes.string,
  changeMusic: PropTypes.func
}

export default Map