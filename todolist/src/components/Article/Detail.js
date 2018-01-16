import React from 'react'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'

class Detail extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {}
    this.init()
  }
  init() {
    fetch('http://localhost:3000/article.json').then(response => {
      return response.json().then(data => {
        console.log(data)
        let article = data.articles[this.props.match.params.articleid - 1]
        console.log(article)
        this.setState({
          article
        })
      })
    })
  }
  render() {
    // let article = this.state.articles[this.props.match.params.articleid]
    // console.log(article)
    return (
      <div className="detail">
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/article">article</Link></Breadcrumb.Item>
          <Breadcrumb.Item>detail</Breadcrumb.Item>
        </Breadcrumb>
        <br/>
        <div>
          <p>{this.state.article && this.state.article.title}</p>
          <p>{this.state.article && this.state.article.detail}</p>
          {/* <h3>{ props.title}</h3>
          <p>{props.detail}</p> */}
        </div>
      </div>
    )
  }
}

// const Detail= ({match}) => (
//   <div className="detail">
//     <Breadcrumb>
//       <Breadcrumb.Item>Home</Breadcrumb.Item>
//       <Breadcrumb.Item><Link to="/about">about</Link></Breadcrumb.Item>
//       <Breadcrumb.Item>detail</Breadcrumb.Item>
//     </Breadcrumb>
//     <div>
//       干嘛的啊 {match.params.articleid}
//       {/* <h3>{ props.title}</h3>
//       <p>{ props.detail}</p> */}
//     </div>
//   </div>
// )

export default Detail