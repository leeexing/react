import React from 'react'
import axios from 'axios'
import { Input, Pagination  } from 'antd'
const Search = Input.Search

class Music extends React.Component {
  constructor(props) {
    super()
    this.state = {
      musics: [],
      musicTypes: [],
      type: 1,
      page: 1,
      pageSize: 20,
      pageCount: 10
    }
  }
  componentWillMount() {
    axios.get('/api/music/1').then(res => {
      console.log(res)
      this.setState({
        musics: res.data.data
      })
    })
    axios.get('/api/music/type')
      .then(data => {
        console.log(data)
        this.setState({
          musicTypes: data.data.data
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
        musics: res.data.data,
        pageCount: Math.ceil(res.data.data.length / 10)
      })
    })
  }
  onShowSizeChange(current, pagesize) {
    console.log(current, pagesize)
    this.setState({
      page: current,
      pageSize: pagesize
    })
  }
  pagesizeChange(page, pagesize) {
    console.log(page, pagesize)
    this.setState({
      page,
      pageSize: pagesize
    })
  }
  render() {
    let start = (this.state.page - 1) * this.state.pageSize
    let end = this.state.page < this.state.pageCount ? this.state.page * this.state.pageSize : this.state.musics.length
    let musics = this.state.musics.slice(start, end)
    return (
      <div className="m-music">
        <h1>我的音乐，我的电台</h1>
        <hr/>
        <div className="music-type">
          {
            this.state.musicTypes.map(item =>
              <span>{item}</span>
            )
          }
        </div>
        <Search 
          placeholder = "input music type eg: 1,2, 轻音乐"
          onChange={this.handleChange.bind(this)}
          onSearch = {this.searchMusic.bind(this)}
          enterButton
        />
        <br/>
        <div className="music-list">
          <ul>
            {
              musics.map((item, index) => 
                <li key={index}>
                  <img src={item.cover} alt={item.name}/>
                </li>
              )
            }
          </ul>
        </div>
        <div className="paging">
          <Pagination showSizeChanger onChange={this.pagesizeChange.bind(this)} 
                      onShowSizeChange={this.onShowSizeChange.bind(this)} 
                      defaultPageSize={this.state.pageSize}
                      defaultCurrent={this.state.page} total={this.state.musics.length} />
        </div>
      </div>
    )
  }
}
export default Music