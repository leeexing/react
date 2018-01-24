import React from 'react'
import { Input, Row, Col, Button } from 'antd'

import {addTodo, helloLegend, plusLengend} from '../../redux/actions/actions'
import store from '../../redux/store/store'

class Child extends React.Component {
  render () {
    return (
      <div className="child">
        <label htmlFor="">{this.props.title}</label>
        <Input placeholder={this.props.holder} />
        {
          this.props.children && this.props.children.map((item, index) => 
            item
          )
        }
      </div>
    )
  }
}

class Answer extends React.Component {
  constructor () {
    super()
    this.state = {
      num: 0
    }
  }
  componentDidMount () {
    console.log(store)
    console.log(store.getState())
  }
  emitStore () {
    // console.log(store.getState())
    store.dispatch(addTodo('什么鬼'))
    store.dispatch(helloLegend('什么鬼'))
  }
  addLegend () {
    let num = this.state.num
    store.dispatch(plusLengend(num))
    this.setState({
      num: this.state.num + 1
    })
  }
  getStore () {
    console.log(store.getState())
  }
  render () {
    return (
      <div className="ai">
        <h1>内容分发 -- 无人区</h1>
        <hr/>
        <Row type="flex" justify="space-between">
          <Col span={12}>
            <Child holder="有事请奏" title="组件内部带内容">
              <span>军机大臣有事要奏，</span>
              <span>礼部尚书有事要参</span>
            </Child>
          </Col>
          <Col span={11}>
            <Child holder="无事退朝" title="很简单的一个组件标签"/>
          </Col>
        </Row>
        <br/>
        <hr/>
        <Row>
          <Col span={8}>
            <Button onClick={this.emitStore} type="danger">dispatch Store</Button>
          </Col>
          <Col span={8}>
            <Button onClick={this.addLegend.bind(this)} type="danger">add Legend count</Button>
          </Col>
          <Col span={8}>
            <Button onClick={this.getStore} type="danger">get Store</Button>
          </Col>
        </Row>
      </div>
    )
  }
}
export default Answer