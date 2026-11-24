#### textarea

多行输入框。

**属性说明**

| 属性名                  | 类型        | 默认值               | 说明                                                                                                                                                        | 平台差异说明                                                                              |
| :---------------------- | :---------- | :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------- |
| value                   | String      |                      | 输入框的内容                                                                                                                                                |                                                                                           |
| placeholder             | String      |                      | 输入框为空时占位符                                                                                                                                          |                                                                                           |
| placeholder-style       | String      |                      | 指定 placeholder 的样式                                                                                                                                     |                                                                                           |
| placeholder-class       | String      | textarea-placeholder | 指定 placeholder 的样式类，注意页面或组件的 style 中写了 scoped 时，需要在类名前写/deep/                                                                    |                                                                                           |
| disabled                | Boolean     | false                | 是否禁用                                                                                                                                                    |                                                                                           |
| maxlength               | Number      | 140                  | 最大输入长度，设置为 -1 的时候不限制最大长度                                                                                                                |                                                                                           |
| focus                   | Boolean     | false                | 获取焦点                                                                                                                                                    | 在 H5 平台能否聚焦以及软键盘是否跟随弹出，取决于当前浏览器本身的实现。                    |
| auto-height             | Boolean     | false                | 是否自动增高，设置 auto-height 时，style.height 不生效                                                                                                      |                                                                                           |
| fixed                   | Boolean     | false                | 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true                                                                                | 微信小程序支持                                                                            |
| cursor-spacing          | Number      | 0                    | 指定光标与键盘的距离，单位 px 。取 textarea 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离                                          | 微信小程序支持                                                                            |
| cursor                  | Number      |                      | 指定 focus 时的光标位置                                                                                                                                     | 微信小程序、H5 支持                                                                       |
| confirm-type            | String      | done                 | 设置键盘右下角按钮的文字                                                                                                                                    | 微信小程序基础库 2.13.0+、H5(2.9.9+，且要求设备 webview 内核 Chrome81+、Safari13.7+) 支持 |
| confirm-hold            | Boolean     | false                | 点击键盘右下角按钮时是否保持键盘不收起                                                                                                                      | H5 、微信小程序 (基础库 2.16.0+)支持                                                      |
| show-confirm-bar        | Boolean     | true                 | 是否显示键盘上方带有”完成“按钮那一栏                                                                                                                        | 微信小程序支持                                                                            |
| selection-start         | Number      | -1                   | 光标起始位置，自动聚焦时有效，需与 selection-end 搭配使用                                                                                                   | 微信小程序、H5 支持                                                                       |
| selection-end           | Number      | -1                   | 光标结束位置，自动聚焦时有效，需与 selection-start 搭配使用                                                                                                 | 微信小程序、H5 支持                                                                       |
| adjust-position         | Boolean     | true                 | 键盘弹起时，是否自动上推页面                                                                                                                                | 微信小程序支持                                                                            |
| disable-default-padding | boolean     | false                | 是否去掉 iOS 下的默认内边距                                                                                                                                 | 微信小程序 2.10.0 支持                                                                    |
| hold-keyboard           | boolean     | false                | focus 时，点击页面的时候不收起键盘                                                                                                                          | 微信小程序 2.8.2 支持                                                                     |
| auto-blur               | boolean     | false                | 键盘收起时，是否自动失去焦点                                                                                                                                |                                                                                           |
| ignoreCompositionEvent  | boolean     | true                 | 是否忽略组件内对文本合成系统事件的处理。为 `false` 时将触发 `compositionstart、compositionend、compositionupdate` 事件，且在文本合成期间会触发 `input` 事件 | H5 不支持                                                                                 |
| @focus                  | EventHandle |                      | 输入框聚焦时触发，event.detail = { value, height }，height 为键盘高度                                                                                       | 仅微信小程序支持 height                                                                   |
| @blur                   | EventHandle |                      | 输入框失去焦点时触发，event.detail = {value, cursor}                                                                                                        |                                                                                           |
| @linechange             | EventHandle |                      | 输入框行数变化时调用，event.detail = {height: 0, heightRpx: 0, lineCount: 0}                                                                                |                                                                                           |
| @input                  | EventHandle |                      | 当键盘输入时，触发 input 事件，event.detail = {value, cursor}， @input 处理函数的返回值并不会反映到 textarea 上                                             |                                                                                           |
| @confirm                | EventHandle |                      | 点击完成时， 触发 confirm 事件，event.detail = {value: value}                                                                                               | 微信小程序支持                                                                            |
| @keyboardheightchange   | Eventhandle |                      | 键盘高度发生变化的时候触发此事件，event.detail = {height: height, duration: duration}                                                                       | 微信小程序基础库 2.7.0+支持                                                               |

**confirm-type 有效值**

| 值     | 说明                 |
| :----- | :------------------- |
| send   | 右下角按钮为“发送”   |
| search | 右下角按钮为“搜索”   |
| next   | 右下角按钮为“下一个” |
| go     | 右下角按钮为“前往”   |
| done   | 右下角按钮为“完成”   |

**示例** [查看示例](https://hellouniapp.dcloud.net.cn/pages/component/textarea/textarea)

以下示例代码，来自于[hello uni-app 项目](https://github.com/dcloudio/hello-uniapp)。

::: preview https://hellouniapp.dcloud.net.cn/pages/component/textarea/textarea

> Template

```html
<!-- 本示例未包含完整css，获取外链css请参考上文，在hello uni-app项目中查看 -->
<template>
    <view>
        <view class="uni-title uni-common-pl">输入区域高度自适应，不会出现滚动条</view>
        <view class="uni-textarea">
            <textarea @blur="bindTextAreaBlur" auto-height />
        </view>
        <view class="uni-title uni-common-pl">占位符字体是红色的textarea</view>
        <view class="uni-textarea">
            <textarea placeholder-style="color:#F76260" placeholder="占位符字体是红色的" />
        </view>
    </view>
</template>
<script>
export default {
    data() {
        return {};
    },
    methods: {
        bindTextAreaBlur: function (e) {
            console.log(e.detail.value);
        }
    }
};
</script>
```

:::

**Tips**

-   textarea 的 blur 事件会晚于页面上的 tap 事件。
-   如果遇到 value 属性设置不生效的问题参考：[组件属性设置不生效解决办法](https://uniapp.dcloud.io/tutorial/vue-api.html#%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98)
-   微信小程序中，textarea 是平台小程序原生组件，层级高于前端组件，请勿在 scroll-view、movable-view 中使用 textarea 组件。覆盖 textarea 需要使用 cover-view。
-   平台小程序端 css 动画对 textarea 组件无效。
-   H5 平台只能在用户交互时修改 focus 生效。
-   如果遇到 focus 属性设置不生效的问题参考：[组件属性设置不生效解决办法](https://uniapp.dcloud.io/tutorial/vue-api.html#%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98)
-   软键盘的弹出和收起逻辑，详见[input 的文档](/m8mpdoc/index.html?file=017-内置组件/019-input)
-   如需禁止点击其他位置收起键盘的默认行为，可以监听`touch`事件并使用`prevent`修饰符（仅支持H5，其他平台可以通过设置`focus`来使输入框重新获取焦点），例如在确认按钮上使用：`@touchend.prevent="onTap"`
-   js 中给 textarea 组件赋值为字符串，在字符串中加\n 可实现换行。
-   旧版本 chrome 或同内核浏览器会将输入多个标点符号放在一行，此时可通过将 textarea 样式设置为`word-break: break-word;`实现自动换行。

```html
<template>
    <view class="content">
        <textarea class="textarea" v-model="txt"></textarea>
    </view>
</template>
<script>
    export default {
        data() {
            return {
                txt: 'hello world！\n textarea多行输入框'
            };
        }
    };
</script>
```

**富文本编辑的解决方案**
在输入框里图文混排内容，在 web 上该功能依赖 document，而平台小程序的正常页面又没有 document。

-   方式一：采用 markdown 编辑器方案，输入区输入 markdown 语法，预览区提供预览。这种方式可以跨端。插件市场搜[富文本编辑](https://ext.dcloud.net.cn/search?q=%E5%AF%8C%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91)，有不少插件。
-   方式二：使用 web-view 组件，加载 html 页面，此时可使用 web 中常见的各种富文本编辑器，插件市场也有这类插件。
