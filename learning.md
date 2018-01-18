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