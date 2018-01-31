import React from 'react';
import ReactDOM from 'react-dom';
// import { createStore } from 'redux'
import { Provider } from 'react-redux'

import 'antd/dist/antd.css'
import './assets/css/index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from './utils/http'

import store from './redux/store/store'
store.subscribe(() => {
  // 监听state变化
})

global.constants = {
  http: axios
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker();
