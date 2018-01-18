import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import { Link } from 'react-router-dom'
import { Button } from "antd"


function IndexPage() {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to dva!</h1>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
        <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
      <hr/>
      <Button>周三</Button>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
