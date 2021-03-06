# react

## react 中引入 scss

```js 教程
首先将你的文件名称改成scss结尾的文件
然后安装依赖 cnpm install sass-loader node-sass --save-dev
找到node_modules/react-scripts/config/webpack.config.dev.js文件和webpack.config.prod.js文件
将module配置项的最后一项配置改成如下
{
    loader: require.resolve('file-loader'),
    // Exclude `js` files to keep "css" loader working as it injects
    // it's runtime that would otherwise processed through "file" loader.
    // Also exclude `html` and `json` extensions so they get processed
    // by webpacks internal loaders.
    exclude: [/\.js$/, /\.html$/, /\.json$/,/\.scss$/],
    options: {
         name: 'static/media/[name].[hash:8].[ext]',
    },
},
{
    test: /\.scss$/,
    loaders: ['style-loader', 'css-loader', 'sass-loader'],
}

// 自己自作聪明的修改了这个地方 -- 以为自己懂 webpack

{
  test: /[\.css|\.scss]$/,
  use: [
    require.resolve('style-loader'),
    {
      loader: require.resolve('sass-loader'),
    },
    {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: 1,
      },
    },
},

结果在引入css文件的时候 使用 scss 语法进行了编译，不断报错。
还是老实使用别人的方法吧

```

## 组件通信

> react 自身组件之间的交流方式，不牵涉其他外部通信

### 一、父组件 向 子组件 传值

> props

1. 简单的只有一级关系。父组件是只要传递相应的 props 就行

2. 如果组件嵌套层次太深，比较笨的方法，一级一级的传下去【要疯】，合理的做法就是 `context`

```js context
class ToggleButton extends React.Component {
  changeParentCount() {
    this.props.callback(2)
  }
  render() {
    return (
      <div className="child">
        <Button type="primary" onClick={this.changeParentCount.bind(this)}>{this.props.btnname}</Button>
      </div>
    )
  }
}

// 孙子组件
class SunButton extends React.Component {
  handleChangeMsg() {
    // console.log(this.props)
    this.props.cb()
  }
  handleChangeMusic() {
    console.log(this.context)
    this.context.changeMusic('菊花台满地伤，你的笑容已泛黄')
  }
  render() {
    return (
      <div className="grandson">
        <Button type="danger" ghost onClick={this.handleChangeMsg.bind(this)}>{this.props.name}</Button>
        《》
        <Button type="danger" ghost onClick={this.handleChangeMusic.bind(this)}>{this.context.test}</Button>
      </div>
    )
  }
}
SunButton.contextTypes = {
  test: PropTypes.string,
  changeMusic: PropTypes.func
}

// 父亲组件
class ParentButton extends React.Component {
  render() {
    return (
      <div className="parent">
        <h1>我只是一快腹肌</h1>
        <br/>
        <SunButton name="南征北战" cb={this.props.changeMsg}/>
      </div>
    )
  }
}

// 主组件
class Map extends React.Component {
  constructor() {
    super()
    this.state = {
      count: 0,
      msg: '我想回到过去',
      music: '一首简单的歌'
    }
  }
  getChildContext() {
    return {
      test: '等你下课',
      changeMusic: this.changeMusic.bind(this)
    }
  }
  changeCount(newVal) {
    console.log(newVal)
    this.setState({
      count: this.state.count + newVal
    })
  }
  changeMsg(newMsg) {
    console.log(newMsg)
    this.setState({
      msg: newMsg || '你怎么可以不穿内裤'
    })
  }
  changeMusic(newMusic) {
    console.log(newMusic)
    this.setState({
      music: newMusic
    })
  }
  render() {
    return (
      <div className="parent">
        <h1>子组件改变父组件的状态</h1>
        <br/>
        <span>值的改变：{this.state.count}</span>
        <hr/>
        <ToggleButton btnname="漂亮的回旋踢" callback={this.changeCount.bind(this)}/>
        <br/>
        <br/>
        <p>来自sun组件的呼呼(props)：{this.state.msg}</p>
        <p>来自sun组件的呼呼(context)：{this.state.music}</p>
        <hr/>
        <ParentButton changeMsg={this.changeMsg.bind(this)}/>
        <br/>
        <br/>
        <h3>React之使用context传递数据</h3>
        <p>与props只能逐级传递数据相比，使用context可以实现跨级传递数据。 </p>
      </div>
    )
  }
}
Map.childContextTypes = {
  test: PropTypes.string,
  changeMusic: PropTypes.func
}

```

### 二、子组件 向 父组件 传值

> 先要明白，子组件是不能直接修改父组件的状态的

**解决方案**：通过父组件传递过来的 `回掉函数`，在子组件内容触发某个需要修改父组件的状态的函数时，回调从父组件传递过来的 `函数props`,让这个函数在父组件内部执行，父组件内部的逻辑处理子组件传递过来的参数，修改父组件自己内部的状态。一句话，儿子只能给我信号和相应的参数，老爸我自己看着办

**注意**：和第一条一样，如果嵌套的层次太深了，还是的依靠 context 进行回调函数的传递。context传值的时候需要父组件和子组件两者配合

* 父组件：Parent.childContextTypes = {props1: PropTypes.sstring, Props2: PropTypes.func | number | array}. 同时需要在组件内部将对应的 propsname的值定义好

```js parent
  getChildContext() {
    return {
      test: '等你下课',
      changeMusic: this.changeMusic.bind(this)
    }
  }
```

getChildContext 这个方法名是固定的

* 子组件： child.contextTypes = {和父组件的一一对应}。这里需要做的只是通过 this.context.propsName 获取到 父组件 传递过来的 相应的 string 或者 func

```js child-or-grandson
  handleChangeMusic() {
    console.log(this.context)
    this.context.changeMusic('菊花台满地伤，你的笑容已泛黄')
  }
```

### 三、非父子组件之间的通信

> 为组件写一些 订阅/监听、发送/触发/发布 的事件系统。subscribe/listen、send/trigger/publish/dispatch

所以嘛：人家 react 就搞出了一个 redux

1、Event Emitter/Target/Dispatcher
    需要一个值定的订阅源

```js
// to subscribe
otherObject.addEventListener(‘click’, function() { alert(‘click!’); });
// to dispatch
this.dispatchEvent(‘click’);
```

2、Publish / Subscribe
    触发事件的时候，你不需要指定一个特定的源，因为它是使用一个全局对象来处理事件（其实就是一个全局

```js
// to subscribe
globalBroadcaster.subscribe(‘click’, function() { alert(‘click!’); });
// to dispatch
globalBroadcaster.publish(‘click’);
```

3、 Signals
    与Event Emitter/Target/Dispatcher相似，但是你不要使用随机的字符串作为事件触发的引用。触发事件的每一个对象都需要一个确切的名字（就是类似硬编码类的去写事件名字），并且在触发的时候，也必须要指定确切的事件。

```js
// to subscribe
otherObject.clicked.add(function() { alert(‘click’); });
// to dispatch
this.clicked.dispatch();
```

### 钩子函数（Events in React）

> 必须要关注这俩个方法：componentDidMount/componentWillUnmount

1. 在 componentDidMount 事件中，如果组件挂载（mounted）完成，再订阅事件；当组件卸载（unmounted）的时候，在 componentWillUnmount 事件中取消事件的订阅。
1. 因为组件的渲染和销毁是由 React 来控制的，我们不知道怎么引用他们，所以EventEmitter 模式在处理组件的时候用处不大。
1. pub/sub 模式可以使用，你不需要知道引用。

有一个姑娘（做法）：引入 `PubSubJS`

```js 一个例子
// 定义一个容器
var ProductList = React.createClass({
    render: function () {
      return (
        <div>
          <ProductSelection />
          <Product name="product 1" />
          <Product name="product 2" />
          <Product name="product 3" />
        </div>
      );
    }
});
// 用于展示点击的产品信息容器
var ProductSelection = React.createClass({
  getInitialState: function() {
    return {
      selection: 'none'
    };
  },
  componentDidMount: function () {
    this.pubsub_token = PubSub.subscribe('products', function (topic, product) {
      this.setState({
        selection: product
      });
    }.bind(this));
  },
  componentWillUnmount: function () {
    PubSub.unsubscribe(this.pubsub_token);
  },
  render: function () {
    return (
      <p>You have selected the product : {this.state.selection}</p>
    );
  }
});

var Product = React.createClass({
  onclick: function () {
    PubSub.publish('products', this.props.name);
  },
  render: function() {
    return <div onClick={this.onclick}>{this.props.name}</div>;
  }
});
```

```js 我自己写的一个demo
import PubSub from 'pubsub-js' // cnpm i pubsub-js -S
/**
 * 非父子组件信息传递
 */
class PopularSinger extends React.Component {
  constructor() {
    super()
    this.state = {
      popSinger: 'Jay'
    }
  }
  componentDidMount() {
    // 第一个参数：topic 指代的是 订阅事件的名称，这里就是指 singer-vote
    // 第二个参数：popSinger 发布事件传过来的参数
    this.singer_vote = PubSub.subscribe('singer-vote', (topic, popSinger) => {
      console.log(topic, popSinger) // 输出：singer-vote 陈奕迅
      this.setState({
        popSinger
      })
    })
  }
  componentWillUnmount() {
    PubSub.unsubscribe(this.singer_vote)
  }
  render() {
    return (
      <div className="singer-start">
        <h3>你选择的年度最佳歌手是：{this.state.popSinger}</h3>
      </div>
    )
  }
}
class Singer extends React.Component {
  vote() {
    console.log('感谢您的投票', this.props)
    PubSub.publish('singer-vote', this.props.singer)
  }
  render() {
    return (
      <span className="singer-candidate" style={{'display':'inline-block','padding': '10px'}}>
        <Button onClick={this.vote.bind(this)} type="primary" ghost>{this.props.singer}</Button>
      </span>
    )
  }
}

// 主组件
class Map extends React.Component {
  render() {
    return (
      <div className="parent">
        <Divider>2017年度最佳歌手颁奖典礼</Divider>
        <PopularSinger />
        <Singer singer="周杰伦"/>
        <Singer singer="陈奕迅"/>
        <Singer singer="张学友"/>
        <Singer singer="林俊杰"/>
        <Singer singer="结实姐"/>
        <Singer singer="jonyJ"/>
      </div>
    )
  }
}
```

实现后的效果还是不错的
如果状态太多，那真的需要考虑 redux 了
那句话怎么讲来着，你不要去找眼镜，。。。

## redux

> 开始学习|使用时间：2018/1/21

从最简单的 counter 计算开始使用

### 三大原则

#### 1、单一数据源

**整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中**。
这让同构应用开发变得非常容易。来自服务端的 state 可以在无需编写更多代码的情况下被序列化并注入到客户端中。由于是单一的 state tree ，调试也变得非常容易。在开发中，你可以把应用的 state 保存在本地，从而加快开发速度。此外，受益于单一的 state tree ，以前难以实现的如“撤销/重做”这类功能也变得轻而易举。

#### 2、State 是只读的

**唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象**。
这样确保了视图和网络请求都不能直接修改 state，相反它们只能表达想要修改的意图。因为所有的修改都被集中化处理，且严格按照一个接一个的顺序执行，因此不用担心 race condition 的出现。 Action 就是普通对象而已，因此它们可以被日志打印、序列化、储存、后期调试或测试时回放出来。

#### 3、使用纯函数来执行修改

**为了描述 action 如何改变 state tree ，你需要编写 reducers**。
Reducer 只是一些纯函数，它接收先前的 state 和 action，并返回新的 state。刚开始你可以只有一个 reducer，随着应用变大，你可以把它拆成多个小的 reducers，分别独立地操作 state tree 的不同部分，因为 reducer 只是函数，你可以控制它们被调用的顺序，传入附加数据，甚至编写可复用的 reducer 来处理一些通用任务，如分页器。

### action

Action 本质上是 JavaScript 普通对象。我们约定，action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作。多数情况下，type 会被定义成字符串常量。当应用规模越来越大时，建议使用单独的模块或文件来存放 action。

```js action
import { ADD_TODO, REMOVE_TODO } from '../actionTypes'
```

### 终于理解了

> 原来 redux 传递数据也还是需要借助 props 或者 context。用vuex的思维套过来有点绕了

看了好久的redux文档，但是始终还是不知道如何上手
从开始的

```js reducer.js
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
```

```js actions
export function helloLegend(text) {
  return { type: HELLO_LEGEND, text }
}

export function plusLengend(count) {
  return {type: PLUS_LEGEND, count}
}
```

```js store.js
import { createStore } from 'redux'
import todoApp from '../reducer'
// import {addTodo, helloLegend} from '../actions/actions'
const store = createStore(todoApp)

export default store
```

```js index.js
import store from './redux/store/store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

```js App.jsx
class App extends Component {
  static childContextTypes = {
    store: PropTypes.object
  }
  getChildContext() {
    return {
      store: this.props
    }
  }
  render() {
    console.info(this.props)
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/register" component={Register}></Route>
          <Route exact path="/about" component={About}></Route>
          <Route path="/admin" component={Admin}></Route>
          <Route path="/" component={Home}></Route>
        </Switch>
      </Router>
    )
  }
}

// 要么这里定义 子组件环境，要么再class 里面 使用 static 的方法
App.childContextTypes = {
  store: PropTypes.object
}

function select(state) {
  return {
    visibleTodos: selectTodos(state.todos, state.visibilityFilter, state.legend),
    visibilityFilter: state.visibilityFilter,
    legend: state.legend
  }
}

export default connect(select)(App)
```

```js header.jsx
import store from '../../redux/store/store'

class Header extends React.Component {
  static contextTypes = {
    store: PropTypes.object
  }
  constructor() {
    super()
    this.state = {
      bg: {},
      colot: {}
    }
  }
  componentDidMount() {
    // 这里使用的是 redux 的方式，实现数据的 共享
    console.log(store)
    let state_store = store.getState()
    this.setState({
      legend: state_store.legend.msg
    })
  }
  render() {
    return (
      <div className="header-inner" style={this.state.bg}>
        <div className="site-logo">
          <Link to="/">
            <img src={avatar} alt="avatar"/>
            <span>欢迎访问我的博客</span>
          </Link>
        </div>
        <div className="site-brand">
          <h1>LEE's Kingdom > {this.context.store.legend.count}</h1>
        </div>
      </div>
    )
  }
}
```

另一个组件，和 header 完全分离。但是想在 answer 组件内容点击按钮改变 header 组件内部的某些值

```js answer.jsx
import {addTodo, helloLegend, plusLengend} from '../../redux/actions/actions'
import store from '../../redux/store/store'

class Answer extends React.Component {
  constructor () {
    super()
    this.state = {
      num: 1
    }
  }
  componentDidMount () {
    console.log(store)
    console.log(store.getState())
  }
  emitStore () {
    // console.log(store.getState())
    store.dispatch(addTodo('学习redux'))
    store.dispatch(helloLegend('什么鬼'))
  }
  addLegend () {
    let num = this.state.num
    store.dispatch(plusLengend(num))
    this.setState({
      num: this.state.num + 1
    })
  }
  getStore () {
    console.log(store.getState())
  }
  render () {
    return (
      <div className="ai">
        <Row>
          <Col span={8}>
            <Button onClick={this.emitStore} type="danger">dispatch Store</Button>
          </Col>
          <Col span={8}>
            <Button onClick={this.addLegend.bind(this)} type="danger">add Legend count</Button>
          </Col>
          <Col span={8}>
            <Button onClick={this.getStore} type="danger">get Store</Button>
          </Col>
        </Row>
      </div>
    )
  }
}
```

------------------------------------------------

**补充**：
Class 的静态方法
类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

```js es6-class
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo();
foo.classMethod()

父类的静态方法，可以被子类继承。

class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
}

Bar.classMethod() // 'hello'
```

Class 的静态属性和实例属性

```js es6-static-props
class Foo {
}

Foo.prop = 1;
Foo.prop // 1

上面的写法为Foo类定义了一个静态属性prop。

目前，只有这种写法可行，因为 ES6 明确规定，Class 内部只有静态方法，没有静态属性。

// 以下两种写法都无效
class Foo {
  // 写法一
  prop: 2

  // 写法二
  static prop: 2
}

Foo.prop // undefined
```

看来 babel 功能很强大啊！！！！！！

目前有一个静态属性的提案，对实例属性和静态属性都规定了新的写法。
**类的静态属性只要在上面的实例属性写法前面，加上static关键字就可以了**

```js new-es6
// 老写法
class Foo {
  // ...
}
Foo.prop = 1;

// 新写法
class Foo {
  static prop = 1;
}
```

## proxy

> 代理的写法问题

    When `proxy` in package.json is as an object, each `context` object must have a `target` property specified as a url string

```js
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
  "proxy": [
    "http://localhost:5000/",
    "https://img3.doubanio.com"
  ]


修改方法如下

"proxy": {
    "/api/**": { "target": "http://localhost:5000/", "secure": false},
    "/douban/**": { "target": "https://img3.doubanio.com", "secure": false}
  }
}
```

## 豆瓣图片直接引入不能显示的问题

起因是，图片是我从豆瓣上面直接趴下来存储在本地的mongodb数据库中的。如果直接将这个地址放在本地的浏览器中显示，会报一个 403 的错误

```js imgError
GET https://img1.doubanio.com/view/site/median/public/70ff7ae5f82f587.jpg 403 ()

headers:
    Request URL:https://img1.doubanio.com/view/site/median/public/24b552a7df1a7bc.jpg
    Request Method:GET
    Status Code:403 
    Remote Address:58.222.18.30:443
    Referrer Policy:no-referrer-when-downgrade

重点是 Request Headers 中的 referer 字段

    referer:http://localhost:3000/music

```

这是豆瓣做的 防盗链 处理
**解决方案**：
在 index.html 文档中添加如下字段

```html
<meta name="referrer" content="never">
```