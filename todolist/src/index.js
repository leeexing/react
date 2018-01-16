import React from 'react';
import ReactDOM from 'react-dom';
import './asset/css/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
// ant design UI
import 'antd/dist/antd.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';

// import {BrowserRouter as Router, Route } from 'react-router-dom'
// import { browserHistory } from 'react-router-dom'
// import Home from './components/Home/Home'
// import About from './components/About/About'

// origin.01
// ReactDOM.render(<App />, document.getElementById('root'));

// origin.02
import App from './router/approute'
ReactDOM.render(<App />, document.getElementById('root'));

// myself.01
// ReactDOM.render((
//   <Router>
//     <Route path="/" component={App}>
//       <Route path="home" component={Home} />
//       <Route path="about" component={About} />
//       {/* <Route></Route> */}
//       {/* <Route></Route> */}

//       {/* <Route path="*" component={NoMatch} /> */}
//     </Route>
//   </Router>
// ), document.getElementById('root'))
registerServiceWorker();


