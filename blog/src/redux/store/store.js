import { createStore, combineReducers } from 'redux'
// import todoApp from '../reducer'
// const store = createStore(todoApp)

import * as reducer from '../reducer/index'
const store = createStore(
  combineReducers(reducer)
)

export default store