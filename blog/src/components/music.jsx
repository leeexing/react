import React from 'react'
import { Button, Input } from 'antd'
import axios from 'axios'

class Music extends React.Component {
  constructor(props) {
    super()
    this.state = {
      musics: [],
      type: 1
    }
  }
  componentWillMount() {
    axios.get('/api/music/1').then(res => {
      console.log(res)
      this.setState({
        musics: res.data.data
      })
    })
  }
  handleChange (e) {
    console.log(e.target.value)
    this.setState({
      type: Number(e.target.value)
    })
  }
  searchMusic () {
    axios.get(`/api/music/${this.state.type}`).then(res => {
      console.log(res)
      this.setState({
        musics: res.data.data
      })
    })
  }
  render() {
    return (
      <div className="m-music">
        <h1>我的音乐，我的电台</h1>
        <Input onChange={this.handleChange.bind(this)} placeholder="查询音乐类型" />
        <Button onClick={this.searchMusic.bind(this)}>检查一些字段</Button>
        <ul>
          {
            this.state.musics.map((item, index) => 
              <li key={index}>
                <img src={item.cover} alt={item.name}/>
              </li>
            )
          }
        </ul>
      </div>
    )
  }
}
export default Music