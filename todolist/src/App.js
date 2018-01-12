import React, { Component } from 'react';
import {Button, Jumbotron} from 'react-bootstrap'
import Header from './components/Header/Header'
import logo from './assert/images/logo.svg';
import './assert/css/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="main">
          <Header />
          <Jumbotron>
            <h1>Hello, world!</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for calling
              extra attention to featured content or information.
            </p>
            <p>
              <Button bsStyle="primary">Learn more</Button>
            </p>
          </Jumbotron>
          <Button>Friday</Button>
          <Button bsStyle="success">Saturday</Button>
          <Button bsStyle="info">Sunday</Button>
        </div>
      </div>
    );
  }
}

export default App;
