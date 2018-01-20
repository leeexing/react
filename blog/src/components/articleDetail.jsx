import React from 'react'
// import { Link } from 'react-router-dom'

class ArticleDetail extends React.Component {
  constructor(props) {
    super()
    // console.log(props)
    this.state = {
      articleId: props.match.params.id,
      detail: {}
    }
  }
  componentWillMount() {
    fetch(`http://v3.wufazhuce.com:8000/api/essay/${this.state.articleId}`).then(res => {
      return res.json().then(data => {
        // console.log(data)
        this.setState({
          detail: data.data
        })
      })
    })
  }
  render() {
    return (
      <article className="post">
        <header className="post-header">
          <h1>{this.state.detail.hp_title}</h1>
          <div className="post-meta">
            <i className="icon iconfont icon-time"></i>
            <time>{this.state.detail.maketime}</time>
          </div>
        </header>
        <div className="post-body">
          <h3 className="guide-word">{this.state.detail.guide_word}</h3>
          <div className="post-content" dangerouslySetInnerHTML={{__html: this.state.detail.hp_content}}>
          </div>
          <div className="post-copy-right">
            <ul>
              <li>
                <strong>本文作者：</strong>
                {this.state.detail.hp_author}
              </li>
              <li>
                <strong>本文链接：</strong>
                <a href={this.state.detail.web_url}>
                  {this.state.detail.web_url}
                </a>
              </li>
              <li>
                <strong>版权声明：</strong>
                本博客所有文章除特别声明外，均采用 CC BY-NC-SA 3.0 许可协议。转载请注明出处！
              </li>
            </ul>
          </div>
        </div>
      </article>
    )
  }
}

export default ArticleDetail