# ejs.auth

## getToken

获取`token`，标准接口需要`token`才能正常请求

如果是使用的公司开发框架，`ajax`请求中自动带了`token`，无需关心

**平台差异**

| ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
| :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
| 支持          |       支持        | 不支持 | 不支持 | 不支持     | 不支持       |

**使用示例**

```js
ejs.auth.getToken({
    success: function (result) {
        /**
         * {
                access_token: ''
           }
         */
    },
    error: function (error) {}
});
```

**返回说明**

| 参数         | 参数类型 | 说明                                                                   |
| :----------- | :------: | :--------------------------------------------------------------------- |
| access_token |  String  | 对应的`token`，必须登录后才会有，`token`的刷新由原始容器进行，无需关心 |

## refreshToken

刷新`token`API

**平台差异**

| ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
| :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
| 支持          |       支持        | 不支持 | 不支持 | 不支持     | 不支持       |

**使用示例**

```js
ejs.auth.refreshToken({
    success: function (result) {},
    error: function (error) {}
});
```

**参数说明**

| 参数         |    参数类型     | 说明                                                                                                                          |
| :----------- | :-------------: | :---------------------------------------------------------------------------------------------------------------------------- |
| isForce      | Number / String | 是否强制刷新 token，默认超出 expires_in 过期时间后才会刷新，如果要强制刷新传 1。iOS（ejs > `3.4.0`） 支持；`Android` 默认支持 |
| isAutoLogout | Number / String | refreshToken 过期后是否自动退出登录，默认会自动退出，如果不自动退出则传 0。iOS（ejs > `3.4.0`） 支持；`Android` 默认支持      |

## getUserInfo

获取当前登陆用户信息

**平台差异**

| ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
| :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
| 支持          |       支持        | 不支持 | 不支持 | 不支持     | 不支持       |

**使用示例**

```js
ejs.auth.getUserInfo({
    success: function (result) {
        /**
         * {
            userInfo: '{...}'
           }
         */
    },
    error: function (error) {}
});
```

**返回说明**

`userInfo` 是一个 JSON 格式的字符串，包含当前登录用户的信息。以下是 JSON.parse()解析 `userInfo` 后所得到的用户信息对象的属性说明：

| 参数             | 参数类型 | 说明                   |
| :--------------- | :------: | :--------------------- |
| displayname      |  String  | 用户姓名               |
| ouguid           |  String  | 部门标识               |
| baseouname       |  String  | 独立部门名称           |
| baseouguid       |  String  | 独立部门标识           |
| ccworksequenceid |  String  | 新版即时通讯账号       |
| loginid          |  String  | 登录名                 |
| forcemodifypwd   |  String  | 是否需要强制修改密码   |
| oaversion        |  String  | 返回业务系统的 oa 版本 |
| userguid         |  String  | 用户标识               |
| previewurl       |  String  | 文件在线预览地址       |
| complexpassword  |  String  | 密码复杂度规则         |
| usersignpicture  |  String  | 用户签名图片地址       |
| photourl         |  String  | 用户个人头像地址       |
| ouname           |  String  | 部门名称               |
| sequenceid       |  String  | 用户微消息帐号         |

## refreshUserInfo

更新原生本地的用户信息，并返回新的用户信息

**平台差异**

| ejs（H5 应用)   | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
| :-------------- | :---------------: | :----: | :----- | :--------- | :----------- |
| `>= 4.2.3 `支持 | `>= V2.0.2` 支持  | 不支持 | 不支持 | 不支持     | 不支持       |

**使用示例**

```js
ejs.auth.refreshUserInfo({
    success: function (result) {
        /**
         * {
            userInfo: {
                ...
            }
           }
         */
    },
    error: function (error) {}
});
```

**返回说明**

| 参数     | 参数类型 | 说明                   |
| :------- | :------: | :--------------------- |
| userInfo |  Object  | 对应的当前登录用户信息 |

## getAuthCode

获取用户授权码(只有在需要鉴权的项目中需要用到)

**平台差异**

| ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
| :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
| 支持          |       支持        | 不支持 | 不支持 | 不支持     | 不支持       |

**使用示例**

```js
ejs.auth.getAuthCode({
    success: function (result) {
        /**
         * {
            authCode: ''
           }
         */
    },
    error: function (error) {}
});
```

**返回说明**

| 参数     | 参数类型 | 说明       |
| :------- | :------: | :--------- |
| authCode |  String  | 用户授权码 |

## getUserAuthCode

调用框架接口获取 `authcode`，H5 应用下需要鉴权后使用

**平台差异**

| ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
| :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
| 支持          |       支持        | 不支持 | 不支持 | 不支持     | 不支持       |

**使用示例**

```js
ejs.auth.getUserAuthCode({
    appkey: '应用的appkey',
    success: function (result) {
        /**
         * {
            authcode: ''
           }
         */
    },
    error: function (error) {}
});
```

**参数说明**

| 参数   | 参数类型 | 说明           |
| :----- | :------: | :------------- |
| appkey |  String  | 应用的`appkey` |

**返回说明**

| 参数     | 参数类型 | 说明       |
| :------- | :------: | :--------- |
| authcode |  String  | 用户授权码 |

## logoutUserWithAlert

退出当前用户至登录页面

**平台差异**

| ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
| :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
| 支持（3.5.0） |    支持(3.5.0)    | 不支持 | 不支持 | 不支持     | 不支持       |

**使用示例**

```js
ejs.auth.logoutUserWithAlert({
    title: '提示',
    message: '请重新登录',
    success: function (result) {},
    error: function (error) {}
});
```

**参数说明**

| 参数    | 参数类型 | 说明     |
| :------ | :------: | :------- |
| title   |  String  | 提示标题 |
| message |  String  | 提示内容 |

## logout

退出当前用户至登录页面，无 UI 提示

**平台差异**

| ejs（H5 应用) | ejs（新点小程序） |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
| :------------ | :---------------: | :----: | :----- | :--------- | :----------- |
| 支持（4.1.9） |    支持(4.1.9)    | 不支持 | 不支持 | 不支持     | 不支持       |

**使用示例**

```js
ejs.auth.logout({
    success: function (result) {},
    error: function (error) {}
});
```
