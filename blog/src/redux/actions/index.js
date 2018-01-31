import * as actionType from './actionTypes'

// 登录
export const login = username => {
  return {
    type: actionType.LOG_IN,
    payload: username
  }
}
