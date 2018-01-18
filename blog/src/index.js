import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css'
import './assets/css/index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
