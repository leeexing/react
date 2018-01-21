import React from 'react'
import axios from 'axios'

import { Breadcrumb, Table, Divider, Input, Button, Tooltip } from 'antd';
const Search = Input.Search

const columns = [{
  title: 'Name',
  dataIndex: 'username',
  key: 'username',
  render: text => <a href="/">{text}</a>,
}, {
  title: 'isAdmin',
  dataIndex: 'isAdmin',
  key: 'isAdmin',
  render: (text, record) => (
    <span>
      {text ? "是" : '否'}
    </span>
  )
}, {
  title: 'Password',
  dataIndex: 'password',
  key: 'password',
  width: '40%'
}, {
  title: 'Action',
  key: 'action',
  width: 200,
  render: (text, record) => (
    <div className="user-opr">
      <Button type="danger" onClick={() => {console.log(this)}}>删除</Button>
      <Divider type="vertical" />
      <Button type="primary">编辑</Button>
    </div>
  )
}];

class Userlist extends React.Component {
  constructor(props) {
    super()
    this.state = {
      tableData: [],
      columns: columns
    }
    this.deleteUser = this.deleteUser.bind(this)
  }
  componentWillMount() {
    axios.get('/api/users').then(res => {
      console.log(res)
      let data = res.data.data
      data = data.map((item, index) => {
        item.key = (index + 1)
        return item
      })
      this.setState({
        tableData: data
      })
    })
  }
  deleteUser(e) {
    console.log(e)
  }
  render() {
    return (
      <div className="user-list">
        <div className="breadcrumb">
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item><a href="">blog</a></Breadcrumb.Item>
            <Breadcrumb.Item>userlist</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <hr/>
        <div className="user-search">
          <Search
            placeholder="input search username"
            onSearch={value => console.log(value)}
            enterButton
          />
          <Tooltip title="增加登陆用户" placement="left">
            <Button icon="plus-circle"></Button>
          </Tooltip>
        </div>
        <div className="list">
          <Table columns={this.state.columns} dataSource={this.state.tableData} />
        </div>
      </div>
    )
  }
}
export default Userlist