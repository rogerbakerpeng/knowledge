## ** 使用三方npm依赖没有被es5转换 **

默认跨端框架构建时会忽略非跨端框架的 node_modules 中的库文件。

如果你使用了一些三方库，而这些三方库没有使用es5构建，导致低版本移动设备访问页面出现兼容性问题，或者构建时语法报错等，可以在这个选项中列出来。

支持字符串，正则表达式。

文件位置：build/index.js

![img](../assets/014/transpile_dependencies.png)

#### 例如：

```js
// 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
const transpileDependencies = ['lodash', /\@babel\/runtime/, 'xxx'];
```