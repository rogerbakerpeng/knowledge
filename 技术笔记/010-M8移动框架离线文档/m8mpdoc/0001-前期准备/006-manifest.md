# manifest.json

`manifest.json` 文件是应用的配置文件，用于指定小程序的名称、权限等。

## 配置项列表

|属性|类型|默认值|描述|最低版本|
|:-|:-|:-|:-|:-|
|locale|String|auto|设置当前默认语言，具体参考 [locale](https://uniapp.dcloud.io/api/ui/locale.html)||
|transformPx|Boolean|false|是否转换项目的px，为true时将px转换为rpx，为false时，px为传统的实际像素。||
|debug|Boolean|false|是否开启 debug 模式，开启后调试信息以 ``info`` 的形式给出，其信息有页面的注册，页面路由，数据更新，事件触发等||
|h5|Object||[H5 特有配置](#h5)||
|mp-weixin|Object||[微信小程序特有配置](#mp-weixin)||
|mp-alipay|Object||[支付宝小程序特有配置](#mp-alipay)|||

## h5
|属性|类型|说明|
|:-|:-|:-|
|title|String|页面标题|
|router|Object|参考：[router](#router@h5-router)|
|publicPath|String|引用资源的地址前缀，仅发布时生效。参考：[publicPath](#publicPath)|
|sdkConfigs|String|SDK配置，例如地图...  参考：[sdkConfigs](#sdkconfig@h5sdkconfig)|

### router@h5-router
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|mode|String|hash|路由跳转模式，支持 hash、history|
|base|String|/|应用基础路径，例如，如果整个单页应用服务在 /app/ 下，然后 base 就应该设为 "/app/"，支持设置为相对路径 "./"|

**注意：**

* `history` 模式部分浏览器器不支持，iOS微信内置浏览器无法观测到URL变动，默认分享（不使用微信[JSSDK](https://ask.dcloud.net.cn/article/35380)的情况下）的链接为入口页链接。
* `history` 模式发行需要后台配置支持，详见：[history 模式的后端配置](https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90)


### publicPath
配置 publicPath 为 cdn 资源地址前缀，这样编译出来的 html 文件，引用的 js，css 路径会自动变成 cdn 上的地址。

注意：如果想对图片生效，image组件的图片地址需要使用相对路径

**示例**

以发布 H5 时为例

未配置 publicPath 时，发布时 index.html 中的结果：

```html
<script src=/h5/static/js/chunk-vendors.803ce52d.js></script>
<script src=/h5/static/js/index.34e8497d.js>
```
配置 publicPath 为 `https://www.cdn.com/h5/`（无效地址仅用作示例） 后，发布时 index.html 中的结果：

```html
<script src=https://www.cdn.com/h5/static/js/chunk-vendors.803ce52d.js></script>
<script src=https://www.cdn.com/h5/static/js/index.34e8497d.js>
```

**注意**
- 打包部署后，在服务器上开启 gzip 可以进一步压缩文件。具体的配置，可以参考网上的分享：https://juejin.im/post/5af003286fb9a07aac24611b

### sdkconfig@h5sdkconfig

三方SDK配置。三方SDK的使用需要向这些SDK提供商申请，并配置参数到此处。

|属性|类型|描述|
|:-|:-|:-|
|maps|Object|地图或位置相关SDK|

### maps@h5sdkconfigmaps

地图服务商 SDK 配置，使用地图以及位置（IP 定位及坐标转换）需要配置此项。

**示例**

```json
"h5": {
	"sdkConfigs": {
		// 使用地图或位置相关功能必须填写其一
		"maps": {
			"qqmap": {
				// 腾讯地图秘钥 https://lbs.qq.com/dev/console/key/manage
				"key": ""
			},
			"google": {
				// 谷歌地图秘钥 https://developers.google.com/maps/documentation/javascript/get-api-key
				"key": ""
			}
		}
	}
}
```

## mp-weixin

|属性|类型|说明|
|:-|:-|:-|
|appid|String|微信小程序的AppID，登录 [https://mp.weixin.qq.com](https://mp.weixin.qq.com) 申请|
|setting|Object|微信小程序项目设置，参考[setting](#setting)|
|functionalPages|Boolean|微信小程序是否启用插件功能页，默认关闭|
|requiredBackgroundModes|Array|微信小程序需要在后台使用的能力,[详见](https://developers.weixin.qq.com/miniprogram/dev/framework/config.html#requiredbackgroundmodes)|
|plugins|Object|使用到的插件，[详见](https://developers.weixin.qq.com/miniprogram/dev/framework/plugin/using.html)|
|resizable|Boolean|在iPad上小程序是否支持屏幕旋转，默认关闭|
|permission|Object|微信小程序接口权限相关设置，比如申请位置权限必须填此处[详见](https://developers.weixin.qq.com/miniprogram/dev/framework/config.html)|
|workers|String|Worker 代码放置的目录。 [详见](https://developers.weixin.qq.com/miniprogram/dev/framework/workers.html)|
|optimization|Object| 对微信小程序的优化配置 |
|cloudfunctionRoot|String| 配置云开发目录，参考[setting](/collocation/manifest?id=cloudfunctionRoot)|
|scopedSlotsCompiler|String|Vue2 作用域插槽编译模式，可选：legacy、auto、augmented，默认：auto|
|mergeVirtualHostAttributes|Boolean|合并组件[虚拟节点](https://uniapp.dcloud.io/tutorial/vue-api.html#%E5%85%B6%E4%BB%96%E9%85%8D%E7%BD%AE)外层属性（目前仅支持 style、class 属性）|
|embeddedAppIdList|Array|要半屏跳转的小程序appid。[详见](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/openEmbeddedMiniProgram.html)|
|requirePrivateInfos|Array|地理位置相关接口。[详见](https://developers.weixin.qq.com/community/develop/doc/000a02f2c5026891650e7f40351c01)|


### setting

编译到微信小程序平台下的项目设置。

|属性|类型|说明|
|:-|:-|:-|
|urlCheck|Boolean|是否检查安全域名和 TLS 版本|
|es6|Boolean|ES6 转 ES5|
|postcss|Boolean|上传代码时样式是否自动补全|
|minified|Boolean|上传代码时是否自动压缩|

### optimization

对微信小程序的优化配置

|属性|类型|说明|
|:-|:-|:-|
|subPackages|Boolean|是否开启分包优化|

### cloudfunctionRoot

如果需要使用微信小程序的云开发，需要在 mp-weixin 配置云开发目录

```javascript
"mp-weixin":{
  // ...
   "cloudfunctionRoot": "cloudfunctions/", // 配置云开发目录
  // ...
}
```

配置目录之后，需要在build/index.js中配置对应的文件编译规则

```javascript

{

 plugins: [
     new CopyWebpackPlugin([
       {
         from: path.join(__dirname, '../cloudfunctions'),
         to: path.join(__dirname, 'unpackage', 'dist', process.env.NODE_ENV === 'production' ? 'build' : 'dev', process.env.UNI_PLATFORM, 'cloudfunctions'),
       },
     ]),
   ],
}

```

## mp-alipay

| 属性                       | 类型    | 说明                                                                                                                                          |
| :------------------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| plugins                    | Object  | 使用到的插件，[详见](https://opendocs.alipay.com/mini/plugin/plugin-usage)                                                                    |
| component2                 | Boolean | 是否启用 `component2` 编译，默认为 true，[查看详情](https://docs.alipay.com/mini/framework/custom-component-overview)                         |
| enableAppxNg               | Boolean | 是否启用 `enableAppxNg` 小程序基础库 2.x 构建，默认为 true，[查看详情](https://opendocs.alipay.com/mini/framework/project) |
| axmlStrictCheck            | Boolean | 是否启用 `axml` 严格语法检查，默认为 false                                                                                                    |
| enableParallelLoader       | Boolean | 是否启用多进程编译，默认为 false                                                                                                              |
| enableDistFileMinify       | Boolean | 是否压缩编译产物（仅在真机预览/真机调试时生效），默认为 false                                                                                 |
| scopedSlotsCompiler        | String  | Vue2 作用域插槽编译模式，可选：legacy、auto、augmented，默认：auto                                                  |
| mergeVirtualHostAttributes | Boolean | 合并组件节点外层属性（目前仅支持 style、class 属性）  