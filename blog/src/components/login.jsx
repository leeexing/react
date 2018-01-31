import React from 'react'
import axios from 'axios'
import qs from 'qs'
import PubSub from 'pubsub-js'

import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  constructor(props) {
    super()
    this.state = {
      history: props.history
    }
  }
  loginSuccess(loginInfo) {
    PubSub.publish('login-ok', loginInfo)
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        axios.post('/api/login?a=12&b=34', qs.stringify(values)).then(data => {
          console.log(data)
          if (!data.data.success) {
            message.error(data.data.msg)
            return
          }
          // sessionStorage.setItem('token', data.data.username)
          // sessionStorage.setItem('auth', true)
          // document.cookie = 'blog-ticket=' + data.data.token
          // sessionStorage.setItem('isAdmin', data.data.isAdmin)
          this.state.history.push('/')
          this.loginSuccess({isAdmin: data.data.isAdmin, username: data.data.username})
        })
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="m-login">
        <div className="wrap">
          <h1 className="title">Welcome to Lee's Blog</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </FormItem>
            <FormItem>
              <div className="remeberme">
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox>Remember me</Checkbox>
                )}
                <a className="login-form-forgot" href="">Forgot password</a>
              </div>
              <Button type="primary" htmlType="submit" className="login-form-button login">
                Log in
              </Button>
              Or <a href="/register">register now!</a>
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}

const Login = Form.create()(NormalLoginForm);

export default Login

