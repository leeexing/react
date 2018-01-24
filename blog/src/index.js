import React from 'react';
import ReactDOM from 'react-dom';
// import { createStore } from 'redux'
import { Provider } from 'react-redux'

import 'antd/dist/antd.css'
import './assets/css/index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// import todoApp from './redux/reducer'
// let store = createStore(todoApp)
import store from './redux/store/store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker();
