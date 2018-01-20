import React from 'react'
import Article from './article'

class ArticleList extends React.Component {
  constructor(props) {
    super()
    this.state = {
      articles: []
    }
  }
  componentWillMount() {
    fetch('http://v3.wufazhuce.com:8000/api/channel/reading/more/0').then(res => {
      return res.json().then(data => {
        console.log(data)
        this.setState({
          articles: data.data
        })
      })
    })
  }
  componentDidMount() {
    // this.setState({
    //   name: 'balabal'
    // })
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