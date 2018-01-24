import { createStore } from 'redux'
import todoApp from '../reducer'
// import {addTodo, helloLegend} from '../actions/actions'
const store = createStore(todoApp)

export default store