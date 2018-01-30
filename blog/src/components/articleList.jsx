import React from 'react'
import Article from './article'
import axios from '../utils/http'

class ArticleList extends React.Component {
  constructor(props) {
    super()
    this.state = {
      articles: []
    }
  }
  componentDidMount() {
    let auth = sessionStorage.getItem('auth')
    console.log(auth)
    if (auth === 'null' || auth === null) {
      this.props.history.push('/login')
    } else {
      // fetch('http://v3.wufazhuce.com:8000/api/channel/reading/more/0').then(res => {
      //   return res.json().then(data => {
      //     console.log(data)
      //     this.setState({
      //       articles: data.data
      //     })
      //   })
      // })
      axios.get('http://v3.wufazhuce.com:8000/api/channel/reading/more/0')
        .then(data => {
          // console.log(data)
          this.setState({
            articles: data.data.data
          })
        })
      
    }
  }
  render() {
    return (
      <div className="article-list">
        {
          this.state.articles.map((item, index) =>
            <Article key={index} title={item.title} forward={item.forward} time={item.last_update_date} id={item.content_id} imgUrl={item.img_url} />
          )
        }
      </div>
    )
  }
}

export default ArticleList