import React, { Component } from 'react';
import Header from './components/Header/Header'
// import Footer from './components/Footer/Footer'
import logo from './asset/images/logo.png';
import './asset/css/App.css';


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
      deleteItemIndex: 0,
      deleteItem: 'Hello world',
      todolistsData: [
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
    this.init()
    this.handleChange = this.handleChange.bind(this)
  }
  init() {
    this.state.todolists = this.state.todolistsData
  }
  showAll() {
    this.setState({
      todolists: this.state.todolistsData
    })
  }
  showDone() {
    let doneLists = this.state.todolistsData.filter(item => item.finish === true)
    this.setState({
      todolists: doneLists
    })
  }
  showUndone() {
    let doneLists = this.state.todolistsData.filter(item => item.finish !== true)
    this.setState({
      todolists: doneLists
    })
  }
  addNewTodo (e) {
    if (e.keyCode === 13) {
      let newTodo = {
        finish: false,
        title: e.target.value,
        time: moment().format('llll')
      }
      let todolistsData = this.state.todolistsData.slice()
      todolistsData.unshift(newTodo)
      this.setState({
        text: '',
        todolistsData,
        
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
    todolists.splice(this.state.deleteItemIndex, 1)
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
  handleDelete(index) {
    console.log(`删除的是第几个任务: ${index}`)
    this.setState({
      deleteItemIndex: index,
      deleteItem: this.state.todolists[index].title
    })
    // let todolists = this.state.todolists.slice()
    // todolists.splice(index, 1)
    // Modal.success({
    //   title: 'This schedule has deleted successful!',
    //   content: todolists[index].title,
    // });
    // this.setState({todolists})
    this.setState({
      visible: true
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Header />
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
              <Button onClick={this.showAll.bind(this)} className="all" icon="meh">All</Button>
              <Button onClick={this.showDone.bind(this)} icon="smile-o">Done</Button>
              <Button onClick={this.showUndone.bind(this)} icon="frown">Undone</Button>
            </ButtonGroup>
          </div>
          <ul>
            {
              this.state.todolists.map((todolist, index) =>
                <li key={index}>
                  <span className="status">
                    <Checkbox onChange={e => this.changeCheck(e, index)} checked={todolist.finish}>{todolist.finish ? 'Welldone' : 'Unfinish'}</Checkbox>
                    {todolist.finish ? <Icon type="smile-o" /> : <Icon type="frown" />}
                  </span>
                  <p className="todo-list">
                    <span className={todolist.finish ? 'title done' : 'title'}>{todolist.title}</span>
                    <time>{todolist.time}</time>
                  </p>
                  <Button className="opr" type="danger" onClick={e => this.handleDelete(index)}>删除</Button>
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
          <p>The schedule is: {this.state.deleteItem}</p>
        </Modal>
      </div>
    );
  }
}

export default App;
