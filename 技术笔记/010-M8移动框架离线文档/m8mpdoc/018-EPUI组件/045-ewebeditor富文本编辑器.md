# EwebEditor 富文本编辑器

EwebEditor 是一个功能丰富的富文本编辑器，支持多种自定义配置和事件，基于`uniapp`的`editor`组件封装

## 基本使用

- 通过 `v-model` 进行富文本编辑器的赋值、获取。
- 通过 `@change` 事件监听内容变化

```html
<template>
    <e-eweb-editor-m
        id="ewebeditor"
        v-model="simpleEditorContent"
        @change="onChange"
        ref="ewebeditor"
    />
    <div class="btn-groups">
        <e-button-m type="primary" @click="getValue">获取值</e-button-m>
        <e-button-m type="primary" @click="setValue">设置值</e-button-m>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const simpleEditorContent = ref('');
const getValue = () => {
    console.log('getValue', simpleEditorContent.value);
};
const setValue = () => {
    simpleEditorContent.value = 'EwebEditor Hello！';
};
const onChange = (editorInstance,editorId) => {
    console.log(`onchagned: ${editorId}`, editorInstance);
};
</script>
```

## 进阶使用

**使用config属性传入自定义配置**

- 使用`height`设置编辑器高度
- 使用`autoHeight`设置编辑器自适应高度
- `readonly`设置编辑器只读
- `skin`设置编辑器亮色暗色主题
- 更多方法调用
- 更多监听事件

```html
<template>
    <e-eweb-editor-m
        id="ewebeditor"
        v-model="editorContent"
        :config="editorConfig"
        :autoHeight="true"
        :height="600"
        :style="['font-size:24px']"
        skin="dark"
        lang="zh-tw"
        :readonly="false"
        @ready="onReady"
        @change="onChange"
        @remove="onRemove"
        @paste="onPaste"
        @all="onAll"
        ref="ewebeditor"
    />
    <div class="btn-groups">
        <e-button-m type="primary" @click="getCount">获取文本长度</e-button-m>
        <e-button-m type="primary" @click="getHtml">获取HTML内容</e-button-m>
        <e-button-m type="primary" @click="getText">获取纯文本内容</e-button-m>
        <e-button-m type="primary" @click="setHtml">设置HTML内容</e-button-m>
        <e-button-m type="primary" @click="getSelectedElement">获取选中的元素</e-button-m>
        <e-button-m type="primary" @click="getSelectedHtml">获取选中的HTML</e-button-m>
        <e-button-m type="primary" @click="getSelectedText">获取选中的文本</e-button-m>
        <e-button-m type="primary" @click="setReadOnly">设置只读</e-button-m>
        <e-button-m type="primary" @click="update">更新内容</e-button-m>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
const editorContent = ref('');
// ref变量
const ewebeditor = ref();
// editorConfig 额外参数配置
const editorConfig = reactive({
    placeholder: '请输入内容'
});

//获取文本长度
const getCount = () => {
    let data = ewebeditor.value.getCount(); //获取当前字数
    console.log('getCount', data);
};

//获取HTML内容
const getHtml = () => {
    let data = ewebeditor.value.getHtml();
    console.log('getHtml', data);
};
//获取纯文本内容
const getText = () => {
    let data = ewebeditor.value.getText();
    console.log('getText', data);
};
//设置HTML内容
const setHtml = () => {
    ewebeditor.value.setHtml('<p>2025年6月30日18:21:37</p>');
};
//获取选中的元素
const getSelectedElement = () => {
    let data = ewebeditor.value.getSelectedElement();
    console.log('getSelectedElement', data);
};

//获取选中的HTML
const getSelectedHtml = () => {
    let data = ewebeditor.value.getSelectedHtml();
    console.log('getSelectedHtml', data);
};
//获取选中的文本
const getSelectedText = () => {
    let data = ewebeditor.value.getSelectedText();
    console.log('getSelectedText', data);
};
//设置只读
const setReadOnly = () => {
    ewebeditor.value.setReadOnly(true);
};

//更新内容
const update = () => {
    ewebeditor.value.update();
};

// 监听变化
const onChange = (editorInstance,editorId) => {
    console.log(`onchagned: ${editorId}`, editorInstance);
};
// 监听初始化完成
const onReady = (editorInstance) => {
    console.log('onReady', editorInstance);
};
//监听onRemove 编辑器移除
const onRemove = (editorInstance, editorId) => {
    console.log('onRemove', editorInstance, editorId);
};
//监听编辑器的粘贴功能
const onPaste = (editorInstance, editorId) => {
    console.log('onPaste', editorInstance, editorId);
};
//监听所有事件
const onAll = (eventName, editorInstance, editorId) => {
    console.log('onAll', eventName, editorInstance, editorId);
};
</script>
```



## API

### Attributes

| Name    | Description        | Type | Default |
| --------------------- | ------------------------------ | ---------------------------------------------------------- | -------------- |
| model-value / v-model | 绑定值，编辑器内容             | `string`                                                   | —              |
| config                | 编辑器额外配置                 | `EditorConfig`                                             | `{}`           |
| autoHeight         | 是否自适应高度          | `boolean`                                           | `false`     |
| height            | 编辑器高度（默认单位：px）      | `number`                                                   | `400`         |
| style    | 自定义样式               | `string`/`object`/`array` | —          |
| skin         | 主题色（light/dark）           | `enum` `'light'丨'dark'`                           | `'light'`      |
| lang           | 指定语言             | `enum` `'zh-cn'丨'zh-tw'丨'en'`                     | `'zh-cn'` |
| readonly      | 设置编辑器为只读模式。<br/>`1`：带状态栏;`2`：不带状态栏 | `enum` `1丨2`                                          | `false`       |

#### EditorConfig

| Name        | Description                                                  | Type     | Default       |
| ----------- | ------------------------------------------------------------ | -------- | ------------- |
| id          | 编辑器唯一标识id                                             | `string` | `'my-editor'` |
| placeholder | 占位符                                                       | `string` | —             |
| maxlength   | 最大字数限制，-1 时不限制                                    | `number` | `-1`          |
| —           | 更多入参，参考[`富文本插件文档`](https://sonvee.github.io/sv-app-docs/docs-github/src/plugins/sp-editor/sp-editor.html) | -        | -             |



### Events

| Name   | Description              | Type                                                         |
| ------ | ------------------------ | ------------------------------------------------------------ |
| ready  | 编辑器初始化完成时触发   | `(editorInstance:any) => void`                               |
| change | 内容变化时触发           | `(editorInstance:any,editorId:string) => void`               |
| remove | 编辑器被销毁时触发       | `(editorInstance:any, editorId:string) => void`              |
| paste  | 当内容粘贴进编辑器时触发 | `(editorInstance:any, editorId:string) => void`              |
| all    | 所有事件触发监听         | `(eventName:string, editorInstance:any, editorId:string) => void` |

### Exposes

| Name               | Description                                                  | Type                            |
| ------------------ | ------------------------------------------------------------ | ------------------------------- |
| getCount           | 获取内容文本长度                                             | `() => number`                  |
| getHtml            | 获取 HTML 内容                                               | `() => string`                  |
| getText            | 获取纯文本内容                                               | `() => string`                  |
| setHtml            | 设置 HTML 内容                                               | `(html: string) => void`        |
| getSelectedElement | 获得已选中元素                                               | `() => string`                  |
| getSelectedHtml    | 获取选中的 HTML 内容                                         | `() => string`                  |
| getSelectedText    | 获得已选中文本                                               | `() => string`                  |
| setReadOnly        | 设置是否只读状态                                             | `(isReadOnly: boolean) => void` |
| update             | 更新编辑器渲染内容                                           | `() => void`                    |
| ……                 | 更多可调用方法，可通过 `onReady`返回的`editorInstance`富文本编辑器实例调用。<br/>[`editor-组件的接口方法`](https://uniapp.dcloud.net.cn/api/media/editor-context) <br/>[`富文本编辑器 sp-editor`](https://sonvee.github.io/sv-app-docs/docs-github/src/plugins/sp-editor/sp-editor.html) | `() => void`                    |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-eweb-editor-m"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
</iframe>
::: endif

<style>
 .ui-showcase-iframe {
    position: fixed;
    right: 3.5vw;
    top: 17%;
    width: 375px;
    height: 75vh;
    box-shadow: 0 0 12px 6px #eee;
    border-radius: 15px;
 }
 .main .markdown-body {
    padding: 45px;
    width: calc(97vw - 661px);
}
 </style>