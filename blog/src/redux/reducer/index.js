import * as actionTypes from '../actions/actionTypes'

const defaultState = {
  userInfo: {
    username: 'leeing',
    isAdmin: false
  },
  theme: 'dark'
}
export const constant = (state = defaultState, action = {}) => {
  const {type, payload} = action
  switch (type) {
    case actionTypes.LOG_IN:
      return {
        ...state,
        userInfo: payload
      }
    case actionTypes.CHANGE_THEME:
      return {
        ...state,
        theme: payload
      }
    default:
      return state
  }
}

const todoListState = []
export const todoList = (state = todoListState, action = {}) => {
  const {type, payload} = action
  switch (type) {
    case actionTypes.ADD_TODO:
      return [
        ...state,
        {
          title: payload,
          finished: false
        }
      ]
    default:
      return state
  }
}