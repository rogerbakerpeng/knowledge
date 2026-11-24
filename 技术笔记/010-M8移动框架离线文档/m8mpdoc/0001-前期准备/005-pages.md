# pages.json

`pages.json` 文件用来对工程进行全局配置，决定页面文件的路径**（M8自动根据模块下的router.js生成）**、窗口样式、小程序的导航栏等。

它类似微信小程序中`app.json`的**页面管理**部分。注意定位权限申请等原属于`app.json`的内容，在跨端框架中是在manifest中配置。

## 更新说明

v8.3.10:

- 为了防止多人协作时出现冲突，在`v8.3.10`版本之后，`pages.json`不再生成路由`pages`和分包路由`subPackages`的信息。路由配置仍然由在各模块下的`router.js`文件中进行配置以生效。

- 其他`pages.json`下的配置仍然在此处生效。

- 完整的`pages.json`信息在构建过程中会同步到`node_modules/@epoint-mrc/.cache/pages.router.json`中，如果需要可以查看该文件。

## 配置项列表

|属性|类型|必填|描述|平台兼容|
|:-|:-|:-|:-|:-|
|[globalStyle](#globalstyle)|Object|否|设置默认页面的窗口表现||
|[pages](#pages)|Object Array|是|设置默认页面的窗口表现，由框架根据`router.js`自动生成||
|[easycom](#easycom)|Object|否|组件自动引入规则||
|[tabBar](#tabBar)|Object|否|设置底部 tab 的表现||
|[subPackages](#subPackages)|Object Array|否|分包加载配置, 由框架根据`router.js`自动生成||

<!-- |[pages](#pages)(自动生成)|Object Array|否|设置页面路径及窗口表现|| -->
<!-- |[subPackages](#subPackages)(自动生成)|Object Array|否|分包加载配置||| -->

以下是一个 `pages.json` 示例 ：

```javascript
{
	"globalStyle": {
		"navigationBarTextStyle": "black",
		"navigationBarTitleText": "演示",
		"navigationBarBackgroundColor": "#F8F8F8",
		"backgroundColor": "#F8F8F8",
		"usingComponents":{
			"collapse-tree-item":"/components/collapse-tree-item"
		},
		"renderingMode": "seperated", // 仅微信小程序，webrtc 无法正常时尝试强制关闭同层渲染
		"pageOrientation": "portrait" //横屏配置，全局屏幕旋转设置(仅 APP/微信/QQ小程序)，支持 auto / portrait / landscape
	},
    "easycom": {
        "autoscan": true, //是否自动扫描组件
        "custom": {//自定义扫描规则
            "^uni-(.*)": "@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue",
            "^em-(.*)": "@epoint-mrc/em-components/src/components/em-$1/em-$1.vue"// 匹配M8移动前端框架跨端UI组件
        }
    }
}
```

## globalStyle

用于设置应用的状态栏、导航条、标题、窗口背景色等。

<!-- TODO 需要完善页面跳转，H5、微信、支付宝相关配置等 -->
|属性|类型|默认值|描述|平台差异说明|
|:-|:-|:-|:-|:-|
|navigationBarBackgroundColor|HexColor|#F7F7F7|导航栏背景颜色（同状态栏背景色）|小程序平台请参考相应小程序文档|
|navigationBarTextStyle|String|white|导航栏标题颜色及状态栏前景颜色，仅支持 black/white||
|navigationBarTitleText|String||导航栏标题文字内容||
|navigationStyle|String|default|导航栏样式，仅支持 default/custom。custom即取消默认的原生导航栏|微信小程序|
|backgroundColor|HexColor|#ffffff|下拉显示出来的窗口的背景色|微信小程序|
|backgroundTextStyle|String|dark|下拉 loading 的样式，仅支持 dark / light|微信小程序|
|mp-alipay|Object||设置编译到 mp-alipay 平台的特定样式，配置项参考[MP-ALIPAY](/m8mpdoc/index.html?file=011-vuex与router的使用/router的使用#mp-alipay)|支付宝小程序|
|mp-weixin|Object||设置编译到 mp-weixin 平台的特定样式|微信小程序|
|renderingMode|String| |同层渲染，webrtc(实时音视频) 无法正常时尝试配置 seperated 强制关掉同层|微信小程序|
|maxWidth|Number||单位px，当浏览器可见区域宽度大于maxWidth时，两侧留白，当小于等于maxWidth时，页面铺满；不同页面支持配置不同的maxWidth；maxWidth = leftWindow(可选)+page(页面主体)+rightWindow(可选)|H5|

**注意**

- 使用 `maxWidth` 时，页面内fixed元素需要使用--window-left,--window-right来保证布局位置正确

## pages

pages节点无需开发手动修改，M8移动前端框架会自动根据模块下的router.js生成此部分。具体内容见[router.js](/m8mpdoc/index.html?file=011-vuex与router的使用/router的使用)

`v8.3.10`：

    `v8.3.10`版本之后，pages节点不再生成，路由配置仍然由在各模块下的router.js文件中进行配置以生效。

    完整的`pages.json`信息在构建过程中会同步到`node_modules/@epoint-mrc/.cache/pages.router.json`中，如果需要可以查看该文件。

## easycom

传统vue组件，需要安装、引用、注册，三个步骤后才能使用组件。`easycom`将其精简为一步。
只要组件安装在项目的components目录下，并符合`components/组件名称/组件名称.vue`目录结构。就可以不用引用、注册，直接在页面中使用。
如下：
```html
<template>
	<view class="container">
		<uni-list>
			<uni-list-item title="第一行"></uni-list-item>
			<uni-list-item title="第二行"></uni-list-item>
		</uni-list>
	</view>
</template>
<script>
	// 这里不用import引入，也不需要在components内注册uni-list组件。template里就可以直接用
	export default {
		data() {
			return {

			}
		}
	}
</script>
```

不管components目录下安装了多少组件，`easycom`打包后会自动剔除没有使用的组件，对组件库的使用尤为友好。

`easycom`是自动开启的，不需要手动开启，有需求时可以在`pages.json`的`easycom`节点进行个性化设置，如关闭自动扫描，或自定义扫描匹配组件的策略。设置参数如下：

|属性			|类型		|默认值	|描述																																											|
|:-				|:-			|:-			|:-																																												|
|autoscan	|Boolean|true		|是否开启自动扫描，开启后将会自动扫描符合`components/组件名称/组件名称.vue`目录结构的组件	|
|custom		|Object	|-			|以正则方式自定义组件匹配规则。如果`autoscan`不能满足需求，可以使用`custom`自定义匹配规则	|

**自定义easycom配置的示例**

如果需要匹配node_modules内的vue文件，需要使用`packageName/path/to/vue-file-$1.vue`形式的匹配规则，其中`packageName`为安装的包名，`/path/to/vue-file-$1.vue`为vue文件在包内的路径。

```json
"easycom": {
  "autoscan": true,
  "custom": {
	"^uni-(.*)": "@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue",
    "^em-(.*)": "@epoint-mrc/em-components/src/components/em-$1/em-$1.vue"// 匹配M8移动前端框架跨端UI组件
  }
}
```

**说明**
- `easycom`方式引入的组件无需在页面内`import`，也不需要在`components`内声明，即可在任意页面使用
- `easycom`方式引入组件不是全局引入，而是局部引入。例如在H5端只有加载相应页面才会加载使用的组件
- 在组件名完全一致的情况下，`easycom`引入的优先级低于手动引入（区分连字符形式与驼峰形式）
- 考虑到编译速度，直接在`pages.json`内修改`easycom`不会触发重新编译，需要改动页面内容触发。
- `easycom`只处理vue组件，不处理小程序专用组件（如微信的wxml格式组件）。


## tabBar

如果应用是一个多 tab 应用，可以通过 `tabBar` 配置项指定一级导航栏，以及 tab 切换时显示的对应页。

在 `pages.json` 中提供 `tabBar` 配置，不仅仅是为了方便快速开发导航，更重要的是在平台小程序端提升性能。在这些平台，底层原生引擎在启动时无需等待js引擎初始化，即可直接读取 `pages.json` 中配置的 `tabBar` 信息，渲染原生tab。

**Tips**

- 当设置 `position` 为 `top` 时，将不会显示 `icon`。
- `tabBar` 中的 `list` 是一个数组，只能配置最少2个、最多5个 tab，tab 按数组的顺序排序。
- `tabbar` 切换第一次加载时可能渲染不及时，可以在每个`tabbar`页面的`onLoad`生命周期里先弹出一个等待雪花。
- `tabbar` 的页面展现过一次后就保留在内存中，再次切换 `tabbar` 页面，只会触发每个页面的`onShow`，不会再触发`onLoad`。
- 顶部的 `tabbar` 目前仅微信小程序上支持。需要用到顶部选项卡的话，建议不使用 `tabbar` 的顶部设置，而是自己做顶部选项卡。

**属性说明：**

|属性|类型|必填|默认值|描述|平台差异说明|
|:-|:-|:-|:-|:-|:-|
|color|HexColor|是||tab 上的文字默认颜色||
|selectedColor|HexColor|是||tab 上的文字选中时的颜色||
|backgroundColor|HexColor|是||tab 的背景色||
|borderStyle|String|否|black|tabbar 上边框的颜色，可选值 black/white，也支持其他颜色值| H5 |
|blurEffect|String|否|none|iOS 高斯模糊效果，可选值 dark/extralight/light/none（参考:[使用说明](https://ask.dcloud.net.cn/article/36617)）|H5（只有最新版浏览器才支持）|
|list|Array|是||tab 的列表，详见 list 属性说明，最少2个、最多5个 tab||
|position|String|否|bottom|可选值 bottom、top|top 值仅微信小程序支持|
|fontSize|String|否|10px|文字默认大小|H5|
|iconWidth|String|否|24px|图标默认宽度（高度等比例缩放）|H5|
|spacing|String|否|3px|图标和文字的间距|H5|
|height|String|否|50px|tabBar 默认高度|H5|
|midButton|Object|否||中间按钮 仅在 list 项为偶数时有效|H5|
|iconfontSrc|String|否||list设置 iconfont 属性时，需要指定字体文件路径 |H5|

**list 属性说明**

list 接收一个数组，数组中的每个项都是一个对象，其属性值如下：

|属性|类型|必填|说明|平台差异|
|:-|:-|:-|:-|:-|
|pagePath|String|是|页面路径，必须在 pages 中先定义||
|text|String|是|tab 上按钮文字，在 H5 平台为非必填。例如中间可放一个没有文字的+号图标||
|iconPath|String|否|图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px，当 position 为 top 时，此参数无效，不支持网络图片，不支持字体图标||
|selectedIconPath|String|否|选中时的图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px ，当 position 为 top 时，此参数无效||
|visible|Boolean|否|该项是否显示，默认显示|H5|
|iconfont|Object|否|字体图标，优先级高于 iconPath|H5|

其中 iconfont 参数说明：

|属性|类型|说明|
|:-|:-|:-|
|text|String|字库 Unicode 码|
|selectedText|String|选中后字库 Unicode 码|
|fontSize|String|字体图标字号(px)|
|color|String|字体图标颜色|
|selectedColor|String|字体图标选中颜色|


**midButton 属性说明**

|属性|类型|必填|默认值|描述|
|:-|:-|:-|:-|:-|
|width|String|否|80px|中间按钮的宽度，tabBar 其它项为减去此宽度后平分，默认值为与其它项平分宽度|
|height|String|否|50px|中间按钮的高度，可以大于 tabBar 高度，达到中间凸起的效果|
|text|String|否||中间按钮的文字|
|iconPath|String|否||中间按钮的图片路径|
|iconWidth|String|否|24px|图片宽度（高度等比例缩放）|
|backgroundImage|String|否||中间按钮的背景图片路径|

midButton没有pagePath，需监听点击事件，自行处理点击后的行为逻辑。监听点击事件为调用API：`uni.onTabBarMidButtonTap`，详见[https://uniapp.dcloud.io/api/ui/tabbar?id=ontabbarmidbuttontap](https://uniapp.dcloud.io/api/ui/tabbar?id=ontabbarmidbuttontap)


#### **tabbar常见问题** 

- tabbar 的 js api 见[uniapp-tabbar](https://uniapp.dcloud.io/api/ui/tabbar)，可实现动态显示隐藏（如弹出层无法覆盖tabbar）、内容修改（如国际化）、item加角标等功能。
- tabbar 的 item 点击事件见[页面生命周期的onTabItemTap](/m8mpdoc/index.html?file=001-页面开发/009-生命周期)。
- 代码跳转到 tabbar 页面，api只能使用[uni.switchTab](https://uniapp.dcloud.io/api/router?id=switchtab)，不能使用`uni.navigateTo`或 `ejs.page.open`、`uni.redirectTo`或`ejs.page.replace`；
- tabbar 的默认高度，在不同平台不一样。H5端为50px。开发者也可以自行设定高度。[详见](https://uniapp.dcloud.io/tutorial/syntax-css.html#固定值)
- tabbar 在H5端是div模拟的，属于前端屏幕窗口的一部分，如果要使用bottom居底定位方式，应该使用css变量`--window-bottom`，比如悬浮在tabbar上方10px的按钮，样式如下`bottom: calc(var(--window-bottom) + 10px)`
- 中间带+号的tabbar模板例子，[参考](https://ext.dcloud.net.cn/plugin?id=98)。可跨端，但+号不凸起。如需中间凸起，配置tabbar的midButton。
- 如果是需要先登录、后进入tab页面，不需要把登录页设为首页，首页仍然是tabbar页，可参考[云端一体登录模板](https://ext.dcloud.net.cn/plugin?id=13)
- 前端弹出遮罩层挡不住tabbar的问题，跨端处理方式时动态隐藏tabbar。
- 微信小程序模拟器1.02.1904090版有bug，在缩放模拟器页面百分比后，tabbar点击多次后就会卡死。真机无碍，使用时注意。[详见](https://developers.weixin.qq.com/community/develop/doc/0002e6e6bf0d602d8c783e10756400)


**代码示例**
```json
"tabBar": {
	"color": "#7A7E83",
	"selectedColor": "#3cc51f",
	"borderStyle": "black",
	"backgroundColor": "#ffffff",
	"list": [{
		"pagePath": "pages/component/index",
		"iconPath": "static/image/icon_component.png",
		"selectedIconPath": "static/image/icon_component_HL.png",
		"text": "组件"
	}, {
		"pagePath": "pages/API/index",
		"iconPath": "static/image/icon_API.png",
		"selectedIconPath": "static/image/icon_API_HL.png",
		"text": "接口"
	}]
}
```

#### 自定义tabbar

原生tabBar是相对固定的配置方式，可能无法满足所有场景，这就涉及到自定义tabBar。

但注意除了H5端，自定义tabBar的性能体验会低于原生tabBar。平台小程序端非必要不要自定义。

- H5端的自定义tabBar组件：H5端不存在原生tabBar性能更高的概念，并且宽屏下常见的tabBar在顶部而不是底部，此时可以使用 [custom-tab-bar组件](https://uniapp.dcloud.io/component/custom-tab-bar) 来自定义
- 普通自定义tabBar：使用view自行绘制tabBar。如果页面是多页方式，切换tabBar将无法保持底部tabBar一直显示。所以这种情况建议使用单页方式。单页方式，如果是复杂页面，应用性能会下降明显，需减少页面复杂度。
- 微信小程序自定义tabbar：微信提供一直基于webview自定义tabBar的方案。该功能体验不佳，不太推荐使用。如果要使用，参考[微信文档](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/custom-tabbar.html)，项目根创建 custom-tab-bar 目录，注意里边的代码是 wxml,wxss，不是 vue，uni-app编译器会直接拷贝该目录到微信小程序中

## subPackages

subPackages节点无需开发手动修改，M8移动前端框架会自动根据模块下的router.js生成此部分。具体内容见[router.js](/m8mpdoc/index.html?file=011-vuex与router的使用/router的使用)

`v8.3.10`：

    `v8.3.10`版本之后，subPackages节点不再生成，路由分包配置仍然由在各模块下的router.js文件中进行配置以生效。

    完整的`pages.json`信息在构建过程中会同步到`node_modules/@epoint-mrc/.cache/pages.router.json`中，如果需要可以查看该文件。

subPackages无需手动配置，可以了解一下分包机制的说明：

### subPackages分包机制的说明


分包加载配置，此配置为小程序的分包加载机制。

因小程序有体积和资源加载限制，各家小程序平台提供了分包方式，优化小程序的下载和启动速度。

所谓的主包，即放置默认启动页面/TabBar 页面，以及一些所有分包都需用到公共资源/JS 脚本；而分包则是根据pages.json的配置进行划分。

在小程序启动时，默认会下载主包并启动主包内页面，当用户进入分包内某个页面时，会把对应分包自动下载下来，下载完成后再进行展示。此时终端界面会有等待提示。

subPackages 节点接收一个数组，数组每一项都是应用的子包，其属性值如下：

|属性|类型|是否必填|描述|
|:-|:-|:-|:-|
|root|String|是|子包的根目录|
|pages|Array|是|子包由哪些页面组成，参数同 [pages](#pages)|

**注意：**

- ```subPackages``` 里的pages的路径是 ``root`` 下的相对路径，不是全路径。
- 微信小程序每个分包的大小是2M，总体积一共不能超过20M。
- 支付宝小程序每个分包的大小是2M，总体积一共不能超过8M。
- 分包下支持独立的 ```static``` 目录，用来对静态资源进行分包。
- 框架 内支持对`微信小程序`、`支付宝小程序`分包优化，即将静态资源或者js文件放入分包内不占用主包大小。详情请参考：[关于分包优化的说明](https://uniapp.dcloud.net.cn/collocation/manifest.html#%E5%85%B3%E4%BA%8E%E5%88%86%E5%8C%85%E4%BC%98%E5%8C%96%E7%9A%84%E8%AF%B4%E6%98%8E)
- 针对`vendor.js`过大的情况可以使用运行时压缩代码
  + 项目可以在`package.json`中添加参数`--minimize`，示例：`"dev:mp-weixin": "cross-env NODE_ENV=development UNI_PLATFORM=mp-weixin vue-cli-service uni-build --watch --minimize"`

**使用方法：**

在[router.js](/m8mpdoc/index.html?file=011-vuex与router的使用/router的使用)中配置`options.autoSubPackages`，由框架自动生成。