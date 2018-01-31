import React from 'react'
import axios from 'axios'
import { Input } from 'antd'
const Search = Input.Search

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
      type: e.target.value
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
        <hr/>
        <Search 
          placeholder = "input music type eg: 1,2, 轻音乐"
          onChange={this.handleChange.bind(this)}
          onSearch = {this.searchMusic.bind(this)}
          enterButton
        />
        {/* <Input onChange={this.handleChange.bind(this)} placeholder="查询音乐类型" /> */}
        {/* <Button onClick={this.searchMusic.bind(this)}>检查一些字段</Button> */}
        <br/>
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