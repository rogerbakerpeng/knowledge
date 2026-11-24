# Mock 的使用

## 前言

    在跨端框架中，为了支持跨平台小程序使用，使用`better-mock`库代替了mockjs库，使用方法保持一致。

`Mock.js` 是一款模拟数据生成器，旨在帮助前端工程师独立于后端进行开发。提供了以下模拟功能：

- 根据数据模板生成模拟数据
- 模拟 `Ajax` 请求，生成并返回模拟数据

`Mock` 的具体使用方法可参照 [Mock.js 官方文档](http://mockjs.com/0.1/ 'Mock.js官方文档')

## 配置开启

需要`mock`数据时，在框架 `ejs.m8.project -> src -> shared` 文件夹下的 `config.js` 配置文件中设置 `isMock` 字段为 `true`，框架会自动开启 `Mock` 的功能。

```js
export default {
    ...
    /**
     * 是否进行mock模拟数据请求
     * 仅在debug模式下有效
     */
    isMock: true,
    ...
};
```

___

支持在pages下的每个模块下定义mock.js文件，框架将会自动引入定义的mock.js文件


## 文件位置

```
ejs.m8.project
    ├── src
    │   ├── pages
    │   │   ├── [module_name]                 // 以模块名命名的文件夹
    │   │   │       ├── css                   // 当前模块下的css样式目录
    │   │   │       ├── images                // 当前模块下的图片资源目录
    │   │   │       ├── [module_name_A].vue   // 模块单文件组件
    │   │   │       ├── [module_name_B].vue   // 模块单文件组件
    │   │   │       ├── [module_name_C].vue   // 模块单文件组件
    │   │   │       ├── router.js             // 此模块对应的路由定义
    │   │   │       ├── store.js              // 此模块对应的状态管理定义
    │   │   │       ├── mock.js               // v8.2.15版本支持，此模块对应的mock管理定义
```

## mock.js文件示例
示例一

```js
import Mock from '@mock'; // 与M8.2应用不同，跨端中通过重新定义别名引用。注意引用的名称为 @mock
export default [
    {
        // 接口地址
        methodUrl: '/rest/mock/test',
        // 入参
        input: {
            guid: ''
        },
        // 出参
        output: Mock.mock({
            info: {
                title: Mock.Random.csentence(5, 10), // 随机生成一段中文文本。
                data: Mock.Random.csentence(25, 30)
            }
        })
    }
];
```
导出resultData数组，每个元素为一个mock数据对象，其中包含以下属性：

- methodUrl：用于匹配mock的接口地址
- input: 入参
- output: 用于模拟的出参mock数据

经过以上步骤模拟好请求后，在应用中请求相应接口就会接收到对应的模拟数据（框架中已封装好`axios`），例如：

```js
Util.ajax({
    url: `${Config.serverUrl}/rest/mock/test`,
    data: {
        params: JSON.stringify({
            guid: id
        })
    }
})
    .then(result => {
        if (result && result.status && result.status.code === 1) {
            console.log(result);
        }
    })
    .catch(err => {
        console.error(err);
    });
```

控制台打印：

```js
{
    custom: {
        info: {
            data: "元府连度圆委象比做县接南条系区集根标式状节温打水院集。",
            title: "包近际计包院主于。"
        }
    },
    status: {
        code: 1
    }
}
```