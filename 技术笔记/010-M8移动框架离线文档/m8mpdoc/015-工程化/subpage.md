# 平台小程序分包

因平台小程序有体积和资源加载限制：

- 微信小程序每个分包的大小是2M，总体积一共不能超过20M。

- 支付宝小程序每个分包的大小是2M，总体积一共不能超过8M。

各家小程序平台提供了分包方式，优化小程序的下载和启动速度。

所谓的主包，即放置默认启动页面/TabBar 页面，以及一些所有分包都需用到公共资源/JS 脚本；而分包则是根据`pages.json`的配置进行划分。

在M8跨端框架下，平台小程序分包通过读取模块下的`router.js`中的配置识别。 

## 配置分包模块

在router.js新增`options`变量，配置当前是否是分包模块。

配置options后，在最后导出时以对象类型导出。

```js
const routes = [
    {
        path: 'pages/m8showcase/index',
        style: {
            navigationBarTitleText: 'index'
        }
    }
];

const options = {
    // 该模块是否自动分包处理
    autoSubPackages: true
};

// 导出路由文件
export default { routes, options };
```

假设支持分包的 目录结构如下：

```
ejs.m8.mobileframe
    ├── src
    │   ├── pages
    │   │   ├── module               
    │   │   │       ├── module.vue   
    │   │   │       ├── router.js             
    │   │   │       ├── store.js              
    │   │   │       ├── mock.js              
    │   │   ├── m8showcase           
    │   │   │       ├── static        // 分包支持static静态资源分包 
    │   │   │       ├── index.vue   
    │   │   │       ├── router.js             
    │   │   │       ├── store.js              
    │   │   │       ├── mock.js                 
```

若此时`m8showcase`模块配置了分包加载，则主包包含分包`m8showcase`以外所有的资源。

只在跳转到分包 `m8showcase` 目录下页面时，才会加载该分包中需要的资源。

注意：

- 多于一个分包或主包都要用到的资源，最终也会被打包到主包里。

- 分包下支持独立的 `static` 目录，用来对静态资源进行分包。

## 异步分包

某些项目主包过大，且无法再细分为多个分包，这时可以通过将部分组件设为异步分包的方式来减小主包体积。

### 异步分包原理

页面在渲染时，会将异步分包中的组件先渲染为占位组件，加载完组件的异步分包后，再渲染真实组件。

### 异步分包配置

跨端框架`v8.3.5-beta.0`版本开始，在全局配置文件 `src/shared/config.js` 中新增了 `isAsyncPackages` 配置项，开启后可将跨端组件库设置为异步分包。

若去掉跨端组件库后，主包体积仍然过大，项目需要整理主包中的组件，考虑将部分业务组件设为异步分包。

跨端框架`v8.3.15-beta.0`版本开始，在全局配置文件 `src/shared/config.js` 中新增了 `customAsyncPackages` 配置项，用于自定义异步分包目录。

`customAsyncPackages`配置项接受一个字符串数组，数组中的每个字符串代表一个异步分包目录，默认是src目录下的路径。

假设业务组件全都存放在 `src/components/custom_components` 目录下：

```
ejs.m8.mobileframe
    ├── src
    │   ├── components
    │   │   ├── custom_components               
    │   │   │       ├── com1.vue   
    │   │   │       ├── com2.vue             
    │   │   │       ├── com3.vue                        
```

可配置 `customAsyncPackages` 为 `["components/custom_components"]` 来将`custom_components`目录设为异步分包。

注意：

- 由于异步分包的组件首次加载时会先渲染占位组件，所以使用异步分包中组件时，需要注意组件的生命周期，避免在组件未加载完成时去获取组件。

- 只支持设置vue组件为异步分包，不支持设置页面或其他类型如js、css等资源为异步分包。

- 多于一个分包或主包都要用到的资源，最终还是会被打包到主包里。