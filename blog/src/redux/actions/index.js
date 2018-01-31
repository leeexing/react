import * as actionType from './actionTypes'

// 登录
export const login = username => {
  return {
    type: actionType.LOG_IN,
    payload: username
  }
}

// 更改后台主题
export const changeTheme = theme => {
  return {
    type: actionType.CHANGE_THEME,
    payload: theme
  }
}
