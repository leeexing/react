import React from 'react'
import { Button } from 'antd'

class Music extends React.Component {
  componentWillMount() {
    fetch('http://localhost:5000/api/users', {
      headers: {
        'Accept': 'application/type'
      },
      mode: 'cors'
    })
      .then(res => {
        console.log(res)
        console.log(res.headers.get("content-type"))
        return res.blob()
      })
      .then(data => {
        console.log(data)
      })
  }
  render() {
    return (
      <div className="m-music">
        <h1>我的音乐，我的电台</h1>
        <Button>检查一些字段</Button>
      </div>
    )
  }
}
export default Music