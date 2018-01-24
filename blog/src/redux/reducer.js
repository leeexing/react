import { combineReducers } from 'redux'
import { 
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  VisibilityFilters,
  HELLO_LEGEND,
  PLUS_LEGEND
} from './actions/actions'
const { SHOW_ALL } = VisibilityFilters

function visibilityFilter(state = SHOW_ALL, action) {
  // console.log(action)
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}


function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_TODO:
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index], {
          completed: true
        }),
        ...state.slice(action.index + 1)
      ]
    default:
      return state
  }
}

function hello(state = {count: 0, msg: '豆浆油条'}, action) {
  switch (action.type) {
    case HELLO_LEGEND:
      return {
        ...state,
        msg: action.text
      }
    case PLUS_LEGEND:
      return {
        ...state,
        count: action.count
      }
    default:
      return state
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  todos,
  legend:hello
})

export default todoApp