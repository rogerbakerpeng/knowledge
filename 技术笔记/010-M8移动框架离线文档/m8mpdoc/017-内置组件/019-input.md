#### input

输入框。

**属性说明**

| 属性名                 | 类型        | 默认值              | 说明                                                                                                                                                        | 平台差异说明                                                           |
| :--------------------- | :---------- | :------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| value                  | String      |                     | 输入框的初始内容                                                                                                                                            |                                                                        |
| type                   | String      | text                | input 的类型                                                                                                                                                | H5 暂未支持动态切换，详见下方 Tips，请使用 v-if 进行整体切换           |
| password               | Boolean     | false               | 是否是密码类型                                                                                                                                              | H5 写此属性时，type 失效                                               |
| placeholder            | String      |                     | 输入框为空时占位符                                                                                                                                          |                                                                        |
| placeholder-style      | String      |                     | 指定 placeholder 的样式                                                                                                                                     |                                                                        |
| placeholder-class      | String      | "input-placeholder" | 指定 placeholder 的样式类，注意页面或组件的 style 中写了 scoped 时，需要在类名前写::v-deep                                                                  |                                                                        |
| disabled               | Boolean     | false               | 是否禁用                                                                                                                                                    |                                                                        |
| maxlength              | Number      | 140                 | 最大输入长度，设置为 -1 的时候不限制最大长度                                                                                                                |                                                                        |
| cursor-spacing         | Number      | 0                   | 指定光标与键盘的距离，单位 px 。取 input 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离                                             | 微信小程序支持                                                         |
| focus                  | Boolean     | false               | 获取焦点。                                                                                                                                                  | 在 H5 平台能否聚焦以及软键盘是否跟随弹出，取决于当前浏览器本身的实现。 |
| confirm-type           | String      | done                | 设置键盘右下角按钮的文字，仅在 type="text" 时生效。                                                                                                         | 微信小程序、H5 支持                                                    |
| confirm-hold           | Boolean     | false               | 点击键盘右下角按钮时是否保持键盘不收起                                                                                                                      |                                                                        |
| cursor                 | Number      |                     | 指定 focus 时的光标位置                                                                                                                                     |                                                                        |
| selection-start        | Number      | -1                  | 光标起始位置，自动聚集时有效，需与 selection-end 搭配使用                                                                                                   |                                                                        |
| selection-end          | Number      | -1                  | 光标结束位置，自动聚集时有效，需与 selection-start 搭配使用                                                                                                 |                                                                        |
| adjust-position        | Boolean     | true                | 键盘弹起时，是否自动上推页面                                                                                                                                | 微信小程序支持                                                         |
| hold-keyboard          | boolean     | false               | focus 时，点击页面的时候不收起键盘                                                                                                                          | 微信小程序 2.8.2 支持                                                  |
| ignoreCompositionEvent | boolean     | true                | 是否忽略组件内对文本合成系统事件的处理。为 `false` 时将触发 `compositionstart、compositionend、compositionupdate` 事件，且在文本合成期间会触发 `input` 事件 | H5 不支持                                                              |
| @input                 | EventHandle |                     | 当键盘输入时，触发 input 事件，event.detail = {value}                                                                                                       | 差异见下方 Tips                                                        |
| @focus                 | EventHandle |                     | 输入框聚焦时触发，event.detail = { value, height }，height 为键盘高度                                                                                       | 仅微信小程序支持 height                                                |
| @blur                  | EventHandle |                     | 输入框失去焦点时触发，event.detail = {value: value}                                                                                                         |                                                                        |
| @confirm               | EventHandle |                     | 点击完成按钮时触发，event.detail = {value: value}                                                                                                           |                                                                        |
| @keyboardheightchange  | eventhandle |                     | 键盘高度发生变化的时候触发此事件，event.detail = {height: height, duration: duration}                                                                       | 微信小程序基础库 2.7.0+支持                                            |

**Tips**

-   `input` 事件处理函数可以直接 return 一个字符串，将替换输入框的内容。仅微信小程序支持。
-   如果遇到 value 属性设置不生效的问题参考：[组件属性设置不生效解决办法](https://uniapp.dcloud.io/tutorial/vue-api.html#%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98)
-   `input` 组件上有默认的 `min-height` 样式，如果 `min-height` 的值大于 `height` 的值那么 `height` 样式无效。
-   H5 暂未支持动态切换，请使用 `v-if`进行整体切换。

```html
<!-- 错误写法 -->
<input :type="isText?'text':'number'" placeholder="请输入内容" />

<!-- 正确写法 -->
<input v-if="isText" type="text" placeholder="请输入文本" />
<input v-else type="number" placeholder="请输入数字" />
```

**type 有效值**

| 值     | 说明               | 平台差异说明                                                                            |
| :----- | :----------------- | :-------------------------------------------------------------------------------------- |
| text   | 文本输入键盘       |                                                                                         |
| number | 数字输入键盘       |  |
| idcard | 身份证输入键盘     | 微信、支付宝支持 |
| digit  | 带小数点的数字键盘 |  |

**注意事项**

-   原 html 规范中 input 不仅是输入框，还有 radio、checkbox、时间、日期、文件选择功能。在 M8跨端框架及平台小程序规范中，input 仅仅是输入框。其他功能 M8跨端框架 有单独的组件或 API：[radio 组件](/m8mpdoc/index.html?file=009-UI组件/029-radio单选框)、[checkbox 组件](/m8mpdoc/index.html?file=009-UI组件/009-checkbox复选框)、图片选择(ejs.util.selectImage)、视频选择(ejs.util.selectVideo)、通用文件选择(ejs.io.selectFile)等等。
-   小程序平台，`number` 类型只支持输入整型数字。微信开发者工具上体现不出效果，请使用真机预览。
-   如果需要在小程序平台输入浮点型数字，请使用 `digit` 类型。
-   平台小程序端 input 在置焦时，会表现为原生控件，此时会层级变高。如需前端组件遮盖 input，需让 input 失焦，或使用 cover-view 等覆盖原生控件的方案，参考开发规范中的平台小程序原生组件说明。具体来讲，微信所有 input 置焦均为原生控件。
-   input 组件若不想弹出软键盘，可设置为 disabled

**confirm-type 有效值**

| 值     | 说明                 | 平台差异说明                                                                                                                      |
| :----- | :------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| send   | 右下角按钮为“发送”   | 微信、支付宝、 h5(2.9.9+，且要求设备 webview 内核 Chrome81+、Safari13.7+) |
| search | 右下角按钮为“搜索”   |                                                                                                                                   |
| next   | 右下角按钮为“下一个” | 微信、支付宝、h5(2.9.9+，且要求设备 webview 内核 Chrome81+、Safari13.7+) |
| go     | 右下角按钮为“前往”   |                                                                                                                                   |
| done   | 右下角按钮为“完成”   | 微信、支付宝、h5(2.9.9+，且要求设备 webview 内核 Chrome81+、Safari13.7+) |

-   H5 平台 的弹出键盘使用的是浏览器控制的键盘，在 Chrome81+、Safari13.7+之前，键盘右下角文字只能设置完成和搜索，从 Chrome81+、Safari13.7+起支持设置发送、下一个。

#### 关于软键盘弹出的逻辑说明

小程序平台只支持 adjustPan 模式，H5 平台因不同浏览器而异

-   adjustResize：软键盘弹出时，webview 窗体高度挤压。屏幕高度=webview 窗体高度+软键盘高度
-   adjustPan：软键盘弹出时，webview 窗体高度不变，但窗体上推，以保证输入框不被软键盘盖住

配置方式，在 pages.json 中配置 style

```json
"app-plus": {
	"softinputMode": "adjustResize"
}
```

**注意**

-   平台小程序端在 input 聚焦期间，避免使用 css 动画。
-   H5 平台只能在用户交互时修改 focus 生效。
-   如果遇到 focus 属性设置不生效的问题参考：[组件属性设置不生效解决办法](https://uniapp.dcloud.io/tutorial/vue-api.html#%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98)
-   如需禁止点击其他位置收起键盘的默认行为，可以监听`touch`事件并使用`prevent`修饰符（仅支持H5，其他平台可以通过设置`focus`来使输入框重新获取焦点），例如在确认按钮上使用：`@touchend.prevent="onTap"`

#### 关于软键盘收起的逻辑说明

-   Android 上在软键盘弹出后，点击 back 或点击非置焦区域可收起软键盘。
-   iOS 上如果软键盘上方有带有“完成”的横条，则需要点完成才能收起键盘；如果没有软键盘上方横条，则点击非 input/textarea 区域即可收起软键盘

**input 示例** [查看演示](https://hellouniapp.dcloud.net.cn/pages/component/input/input)

以下示例代码，来自于[hello uni-app 项目](https://github.com/dcloudio/hello-uniapp)。

::: preview https://hellouniapp.dcloud.net.cn/pages/component/input/input

> Template

```html
<!-- 本示例未包含完整css，获取外链css请参考上文，在hello uni-app项目中查看 -->
<template>
    <view>
        <view class="uni-common-mt">
            <view class="uni-form-item uni-column">
                <view class="title">可自动聚焦的input</view>
                <input class="uni-input" focus placeholder="自动获得焦点" />
            </view>
            <view class="uni-form-item uni-column">
                <view class="title">键盘右下角按钮显示为搜索</view>
                <input class="uni-input" confirm-type="search" placeholder="键盘右下角按钮显示为搜索" />
            </view>
            <view class="uni-form-item uni-column">
                <view class="title">控制最大输入长度的input</view>
                <input class="uni-input" maxlength="10" placeholder="最大输入长度为10" />
            </view>
            <view class="uni-form-item uni-column">
                <view class="title">实时获取输入值：{{ inputValue }}</view>
                <input class="uni-input" @input="onKeyInput" placeholder="输入同步到view中" />
            </view>
            <view class="uni-form-item uni-column">
                <view class="title">控制输入的input</view>
                <input class="uni-input" @input="replaceInput" v-model="changeValue" placeholder="连续的两个1会变成2" />
            </view>
            <!-- #ifndef MP-BAIDU -->
            <view class="uni-form-item uni-column">
                <view class="title">控制键盘的input</view>
                <input class="uni-input" ref="input1" @input="hideKeyboard" placeholder="输入123自动收起键盘" />
            </view>
            <!-- #endif -->
            <view class="uni-form-item uni-column">
                <view class="title">数字输入的input</view>
                <input class="uni-input" type="number" placeholder="这是一个数字输入框" />
            </view>
            <view class="uni-form-item uni-column">
                <view class="title">密码输入的input</view>
                <input class="uni-input" password type="text" placeholder="这是一个密码输入框" />
            </view>
            <view class="uni-form-item uni-column">
                <view class="title">带小数点的input</view>
                <input class="uni-input" type="digit" placeholder="带小数点的数字键盘" />
            </view>
            <view class="uni-form-item uni-column">
                <view class="title">身份证输入的input</view>
                <input class="uni-input" type="idcard" placeholder="身份证输入键盘" />
            </view>
            <view class="uni-form-item uni-column">
                <view class="title">控制占位符颜色的input</view>
                <input class="uni-input" placeholder-style="color:#F76260" placeholder="占位符字体是红色的" />
            </view>
        </view>
    </view>
</template>
```

> Script

```html
<script>
export default {
    data() {
        return {
            title: 'input',
            focus: false,
            inputValue: '',
            changeValue: ''
        };
    },
    methods: {
        onKeyInput: function (event) {
            this.inputValue = event.target.value;
        },
        replaceInput: function (event) {
            var value = event.target.value;
            if (value === '11') {
                this.changeValue = '2';
            }
        },
        hideKeyboard: function (event) {
            if (event.target.value === '123') {
                uni.hideKeyboard();
            }
        }
    }
};
</script>
```

:::
