import React from 'react'
import { Button } from 'antd'
import axios from 'axios'

class Music extends React.Component {
  constructor(props) {
    super()
    this.state = {
      musics: []
    }
  }
  componentWillMount() {
    axios.get('/api/music').then(res => {
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
        <Button>检查一些字段</Button>
        <ul>
          {
            this.state.musics.map((item, index) => 
              <li key={index}>
                <img src={item.img.src} alt={item.img.alt}/>
              </li>
            )
          }
        </ul>
      </div>
    )
  }
}
export default Music