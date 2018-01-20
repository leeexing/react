import React from 'react'
import { Link } from 'react-router-dom'

class Essay extends React.Component {
  constructor(props) {
    super()
    this.state = {
      content: props
    }
  }
  render() {
    return (
      <article className="post">
        <header className="post-header">
          <h1 className="title">
            <Link to={`/article/${this.state.content.id}`}>{this.state.content.title}</Link>
          </h1>
          <div className="post-meta">
            <i className="icon iconfont icon-time"></i>
            <time>{this.state.content.time}</time>
          </div>
        </header>
        <div className="post-body">
          <div className="cover">
            <img src={this.state.content.imgUrl} alt="Lee"/>
          </div>
          <p className="forward">{this.state.content.forward}</p>
          <div className="read-more">
            <Link to={`/article/${this.state.content.id}`}>阅读全文</Link>
          </div>
        </div>
      </article>
    )
  }
}

export default Essay