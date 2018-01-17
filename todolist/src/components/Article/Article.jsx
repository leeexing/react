import React from 'react'
import { Route, Link } from 'react-router-dom'
// import Detail from './Detail'
let articles = null
class Article extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.getData()
  }
  getData() {
    // 这里有个问题，每次进入这个组件的时候，都需要重新获取数据，这个有点消耗啊。是不是有更好的办法可以解决这个问题
    // if (!articles) {
      fetch('http://localhost:3000/article.json').then(res => {
        return res.json().then(data => {
          let articles = data.articles
          this.setState({
            articles
          })
          console.log(articles)
        })
      })
    // } else {
    //   this.setState({
    //     articles
    //   })
    // }
  }
  render() {
    let articles = this.state.articles || []
    return (
      <div className="article">
        <h1 className="title">文章列表</h1>
        <ul className="article-list">
          {
            articles.map((item, index) => 
              <li key={index}>
                <Link to={`${this.props.match.url}/${index+1}`}>第{index+1}章： {item.title}</Link>
              </li>
            )
          }
          {/* <li>
            <Link to={`${match.url}/1`}>第一章</Link>
          </li>
          <li>
            <Link to={`${match.url}/2`}>第二章</Link>
          </li>
          <li>
            <Link to={`${match.url}/3`}>第三章</Link>
          </li> */}
        </ul>
        <hr/>
        {/* <Route path={`${match.url}/:articleid`} component={Detail}></Route> */}
        <Route exact path={this.props.match.url} render={() => (
          <h3>请选择一个篇章。</h3>
        )}/>
      </div>
    )
  }
}
// let articles = null
// fetch('http://localhost:3000/article.json').then(res => {
//   return res.json().then(data => {
//     articles = data.articles
//     console.log(articles)
//   })
// })

// const Article = ({match}) => (
//   <div className="article">
//     <h1 className="title">文章列表</h1>
//     <ul className="article-list">
//       {
//         articles.map((item, index) => 
//           <li>
//             <Link to={`${match.url}/${index+1}`}>item.title</Link>
//           </li>
//         )
//       }
//       {/* <li>
//         <Link to={`${match.url}/1`}>第一章</Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/2`}>第二章</Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/3`}>第三章</Link>
//       </li> */}
//     </ul>
//     <hr/>
//     {/* <Route path={`${match.url}/:articleid`} component={Detail}></Route> */}
//     <Route exact path={match.url} render={() => (
//       <h3>请选择一个篇章。</h3>
//     )}/>
//   </div>
// )

export default Article