import React from 'react'
import { Route, Link } from 'react-router-dom'
import Detail from './Detail'

// class Article extends React.Component {
//   render({match}) {
//     return (
//       <div className="article">
//         <h1 className="title">文章列表</h1>
//         <ul>
//           <li>
//             <Link to={`${match.url}/1`}>第一章</Link>
//           </li>
//           <li>
//             <Link to={`${match.url}/1`}>第二章</Link>
//           </li>
//           <li>
//             <Link to={`${match.url}/1`}>第三章</Link>
//           </li>
//         </ul>
//         <hr/>

//         <Route path={`${match.url}/:articleiid`} component={Detail}></Route>
//         <Route exact path={match.url} render={() => (
//           <h3>请选择一个篇章。</h3>
//         )}/>
//       </div>
//     )
//   }
// }

const Article = ({match}) => (
  <div className="article">
    <div className="article-list">
      <h1 className="title">文章列表</h1>
      <ul>
        <li>
          <Link to={`${match.url}/1`}>第一章</Link>
        </li>
        <li>
          <Link to={`${match.url}/2`}>第二章</Link>
        </li>
        <li>
          <Link to={`${match.url}/3`}>第三章</Link>
        </li>
      </ul>
      <hr/>
    </div>

    {/* <Route path={`${match.url}/:articleid`} component={Detail}></Route> */}
    <Route exact path={match.url} render={() => (
      <h3>请选择一个篇章。</h3>
    )}/>
  </div>
)

export default Article