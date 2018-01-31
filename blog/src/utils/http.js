import axios from 'axios'
import {message as Message} from 'antd'

// const getToken = function() {
//   let token = sessionStorage.getItem('token')
//   return token
// }

// axios.interceptors.request.use(config => { // 这里的config包含了每次请求的内容
//   // let token = getToken()
//   // console.log('有没有发送验证票', token)
//   if (token) {
//     config.headers.Authorization = `Token ${token}`
//   }
//   return config
// }, err => {
//   return Promise.reject(err)
// })

// 返回状态判断
axios.interceptors.response.use(response => {
  // console.log(response)
  if (response.data === 401) {
    console.error('没有权限，退出')
    window.location.href = "/login";
  }
  // let message = response.data.error || response.data.message;
  if (!response.data.success) {
      Message.info(200000);
      return Promise.reject(response);
  }
  return response;
}, (error) => {
  if (error.response && error.response.status === 401) {
      window.location.href = "/unAuthorized";
      return;
  }
  Message.info('网络异常');
  return Promise.reject(error);
})

export default axios