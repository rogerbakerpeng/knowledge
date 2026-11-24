# 自定义 token 最佳实践

跨端框架中进行自定义获取 token 功能：

在 Config.js 中，token 对象中可以配置是否开启自定义 token、获取自定义 token、刷新自定义 token 功能。

`8.3.11` 版本中，增加了自定义 token 刷新失败处理。

## 最佳实践：

-   开启自定义 `isUseSelfToken` 配置；
-   `getToken` 中实现自定义 token 获取逻辑，返回 Promise 对象，resolve 中返回 token；（自定义 token 获取过程需要做好 token 缓存功能，存在 token 返回缓存的 token，不存在或需要刷新时再动态获取）
-   `refreshToken` 中实现刷新自定义的 token 获取逻辑
-   `refreshTokenCountExceeded` 中实现自定义刷新失败处理

### 注意：

由于Util工具库依赖config.js文件，所以无法在congif.js中直接调用Util工具库，会造成构建时循环依赖引用。

需要将与Util相关逻辑单独在外部js中实现，在config.js中引入，并在config.js中调用。

## 示例：
```js
token: {
    // 是否使用自定义token，可以用于非ejs环境下的token赋值刷新，影响到所有Util.ajax与下拉刷新请求
    isUseSelfToken: true,
    // 可以是字符串，也可以是方法
    // 非ejs环境下有效，ejs下默认就是容器的token，不容改变
    // 非ejs环境环境下isUseSelfToken为true生效
    getToken() {
        // 外部js中实现个性化token相关逻辑，引用后使用
        const { getCustomToken, storeToken, saveToken } = require('./customToken');

        // 返回Promise对象
        return new Promise((resolve) => {
            // 如果存在暂存的自定义token则直接返回
            if (storeToken) {
                resolve(storeToken);
            } else {
                // 动态获取
                getCustomToken().then((token) => {
                    saveToken(token);
                    resolve(token);
                });
            }
        });
    },
    //非ejs环境下isUseSelfToken为true生效
    refreshToken: function () {
        const { refreshCustomToken, saveToken } = require('./customToken');

        // 自定义刷新token之后，请求的token仍然是从自定义getToken中获取token。
        return new Promise((resolve) => {
            refreshCustomToken().then((token) => {
                saveToken(token);
                resolve();
            });
        });
    },
    // 自定义刷新失败处理
    // 非ejs环境下isUseSelfToken为true生效
    // 超过允许最大刷新token次数后请求接口的响应状态码仍然403|401触发，可以在这里进行处理后续逻辑
    refreshTokenCountExceeded: function () {
        ejs.ui.alert({
            title: '提醒',
            message: '用户身份失效，请重新登录',
            buttonName: '确定',
            success() {
                // ...
            }
        });
    }
}
```
