import React, { Component } from 'react';
import Header from '../Header/Header'
// import Footer from './components/Footer/Footer'
import logo from '../../asset/images/logo.png';
import '../../asset/css/App.css';


/**
 * 编写组件
 */
import moment from 'moment'
import { Input, Checkbox, Button, message, Icon, Modal } from 'antd';
moment.locale('zh-cn')
message.config({
  top: 70
})
const ButtonGroup = Button.Group

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      visible: false,
      showType: 'all',
      deleteItemIndex: 0,
      deleteItem: 'Hello world',
      todolists: [
        {
          finish: true,
          title: 'Racing car sprays burning fuel into crowd.',
          time: 'Sat, Jan 13, 2018 6:43 PM'
        },
        {
          finish: false,
          title: 'Japanese princess to wed commoner.',
          time: 'Sat, Jan 13, 2018 6:23 PM'
        },
        {
          finish: false,
          title: 'Australian walks 100km after outback crash.',
          time: 'Sat, Jan 13, 2018 6:03 PM'
        },
      ]
    }
    this.handleChange = this.handleChange.bind(this)
  }
  changeType(type) {
    console.log(type)
    this.setState({
      showType: type
    })
  }
  addNewTodo (e) {
    if (e.keyCode === 13) {
      let newTodo = {
        finish: false,
        title: e.target.value,
        time: moment().format('llll')
      }
      let todolists = this.state.todolists.slice()
      todolists.unshift(newTodo)
      this.setState({
        text: '',
        todolists
      })

      setTimeout(() => {
        message.success('you have create a new schedule just now !')
      }, )
    }
  }
  handleChange(e) {
    this.setState({
      text: e.target.value
    })
  }
  changeCheck(e, index) {
    console.log(e.target.checked, index)
    let todolists = this.state.todolists.slice()
    todolists[index].finish = e.target.checked
    this.setState({todolists})

  }
  handleOk() {
    let todolists = this.state.todolists.slice()
    let index = this.state.todolists.findIndex(todolist => todolist === this.state.deleteItem)
    todolists.splice(index, 1)
    this.setState({
      visible: false,
      todolists
    })
  }
  handleCancel() {
    this.setState({
      visible: false,
    });
  }
  handleDelete(item) {
    this.setState({
      deleteItem: item,
      visible: true
    })
  }
  render() {
    let todolists = null
    if (this.state.showType === 'all') {
      todolists = this.state.todolists
    } else if (this.state.showType === 'done') {
      todolists = this.state.todolists.filter(item => item.finish)
    } else {
      todolists = this.state.todolists.filter(item => !item.finish)
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Header />
        {this.props.children}
        <div className="main">
          
          <h1>List of Schedules!</h1>
          <div className="title">
            <Input placeholder="please input you new todolist"
              onKeyDown={e => this.addNewTodo(e)}
              onChange={this.handleChange}
              value={this.state.text}
              className="input"
            />
            <ButtonGroup>
              <Button onClick={this.changeType.bind(this, 'all')} type={this.state.showType === "all" ? "primary": ""} icon="meh-o">All</Button>
              <Button onClick={this.changeType.bind(this, 'done')} type={this.state.showType === 'done' ? "primary" : ""} icon="smile-o">Done</Button>
              <Button onClick={this.changeType.bind(this, 'undone')} type={this.state.showType === 'undone' ? "danger" : ""} icon="frown-o">Undone</Button>
            </ButtonGroup>
          </div>
          <ul>
            {
              todolists.map((todolist, index) =>
                <li key={index}>
                  <span className="status">
                    <Checkbox onChange={e => this.changeCheck(e, index)} checked={todolist.finish}>{todolist.finish ? 'Welldone' : 'Unfinish'}</Checkbox>
                    {todolist.finish ? <Icon type="smile-o" /> : <Icon type="frown" />}
                  </span>
                  <p className="todo-list">
                    <span className={todolist.finish ? 'title done' : 'title'}>{todolist.title}</span>
                    <time>{todolist.time}</time>
                  </p>
                  <Button className="opr" type="danger" onClick={e => this.handleDelete(todolist)}>删除</Button>
                </li>
              )
            }
          </ul>
        </div>
        <Modal
          title="Are you sure to delete this schedule?"
          visible={this.state.visible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
        >
          <p>The schedule is: {this.state.deleteItem.title}</p>
        </Modal>
      </div>
    );
  }
}

export default App;
