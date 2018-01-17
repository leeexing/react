## react

> 2018, serious to learn react

2017年，浅尝辄止的学习了一个月的react，对其语法的不适应让自己没有深入学习下去
2018年，认真的学习 react 的全家桶

### Lists

		just for learn

按照我以往学习 `angular`、`vue` 的经验，首先从一个最经典的 todolist 小项目开始，熟悉基本的语法、数据传递的套路。然后开始使用框架 `react-bootstrap`、`antd`、`element`
接着开始编写带有自己个人特色的 `blog`，随着页面的增加，开始接触 `react-router`，同时随着项目业务逻辑的复杂，开始考虑使用 `redux`
接着，就是考虑如何管理内部文件相互之间的引用/结构
最后，另起炉灶根据已掌握的经验，合理安排项目框架，结合前端的node实现前后台统一

- [ ] todolist demo
- [ ] blog page demo
- [ ] admin demo

### others

		Hold the Fat Lady bugs will be recorded in my [github blog](www.leeeing.com)

学习总是会遇到各种各样的坑，我会将这一路作为一名新手遇到的坑记录下来，并记录填坑之旅

## My load of learning React

### 起步

刚一开始，没有同事熟练使用 react，如何能够快速启动一个项目？
**推荐使用facebook的 create-react-app 脚手架**

```js 快速启动
cnpm i create-react-app -g

create-react app myAppName
cd myAppName
npm start
```

Weolcome to react's world

### 2018/1/17

今天开始使用 reat 制作自己的博客了。
为了不再开一个项目，增加部分重复性的工作，这个 blog 可能一开始就准备有后台的界面
先搭建好博客的基本首页和相关信息，然后在首页通过用户名权限增加管理员角色，管理员可以访问后台的界面
后台一开始准备仍旧使用 node 的 koa，发现 vue 的博客已经这样使用了。vue-koa：koa + mongodb
这里就打算使用 python + mysql 作为后台的服务提供必要的 API 接口。同时，利用 python 我还可以爬虫抓取数据在博客相关页面显示

## 参考文献

> 要想少走弯路，还得多看文档

[react](https://react.bootcss.com/react/docs/forms.html)
[react-router@4](http://reacttraining.cn/web/example/basic)
[react-bootstrap](https://react-bootstrap.github.io/components/navbar/#home)
[ant design](https://ant.design/components/mention-cn/)