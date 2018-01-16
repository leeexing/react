## Todo

> 记录学习 react，编写todolist 的过程

### 第一阶段

> todolist.01 分支

所有的todolist 交互逻辑都集中在一个 app.js 文件中，还没有使用 react-router

### 第二阶段

增加 react-router 的逻辑处理，同时也可是使用 react-router。

**刚开始真的觉得 react-router 好难用啊。比起 vue-router 真是不止一点点**
接下来的学习，我希望看到随着我对 react 的熟悉和熟练，可以发现 react 的_函数式编程_之美

react-router 版本变化比较大，一开始查看网上的教程踩了很多的坑

* 需要安装 react-router-dom，这样才能实现 router 的功能，因为之前常用的 Link 已经不在 react-router 里面了。放在了 react-router-dom 中
* 原先使用了 react-bootstrap的 UI，直接在 NavItem 中插入 Link，结果报错。原因是不能在 a 标签中再嵌套 a 标签，所以还需要继续安装一个 react-router-bootstrap， 使用里面的 LinkContainer
* react-router 配置路由的方式，和 vue 差别很大，vue 只需要在实例化一个 router ，里面编写好相关路径即可，而 react-router 这里需要生产一个 router 类，里面还需要放回一个渲染的结构，包含着你的展示框架是怎么样的
* 我就说嘛，路由怎么能够这么难配置呢，原来是自己挖坑不知道怎么挖的。就因为一个关键字，自己捣鼓了大半天，也是醉了
    * 路由中有一个exact关键字，这个关键字是将"/"做唯一匹配，否则"/"和"/xxx"都会匹配到path为"/"的路由，制定exact后，"/page1"就不会再匹配到"/"了

### 使用 fetch 获取本地数据

貌似试了一下，只能使用`http`的方式获取，并且这个路径还和 `index.html` 的路径相对
可以在 public 目录下新建一个 data 文件夹