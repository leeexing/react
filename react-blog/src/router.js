import React from 'react';
// import { Router, Route, Switch } from 'dva/router';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import IndexPage from './routes/IndexPage';
import About from './components/Example';
import Login from './components/Login';
import 'antd/dist/antd.css'

function RouterConfig({ history }) {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/about" exact component={About} />
        <Route exact path="/" exact component={IndexPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
