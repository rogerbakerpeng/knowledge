# 组件使用

## search 搜索

### 介绍

-   搜索组件。

::: ifdef M83

-   `v8.3.11`开始支持 weex 端使用

::: endif

### 代码演示

#### 基础用法

`v-model` 用于控制搜索框中的文字，`background` 可以自定义搜索框外部背景色。

```html
<em-search v-model="value" placeholder="请输入搜索关键词" />
```

#### 带语音识别搜索功能

设置`showVoice`为`true`, 即可使用语音识别搜索功能, 此功能只能在`ejs`容器中实现

```html
<em-search placeholder="请输入搜索关键词" v-model="value" showVoice></em-search>
```

#### 事件监听

`Search` 组件提供了 `search` 和 `cancel` 事件，`search` 事件在点击键盘上的搜索/回车按钮后触发，`cancel` 事件在点击搜索框右侧取消按钮时触发。

::: ifdef M83

```html
<form action="/">
    <em-search v-model="value" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" />
</form>
<em-toast ref="emToast"></em-toast>
```

```js
export default {
    data() {
        return {
            value: ''
        };
    },
    methods: {
        onSearch(val) {
            Toast({
                message: '搜索：' + this.value
            });
        },
        onCancel() {
            Toast({
                message: '取消'
            });
        }
    }
};
```

::: endif
::: ifdef M84

```html
<form action="/">
    <em-search v-model="value" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" />
</form>
<em-toast ref="emToastRef"></em-toast>
```

```js
import { ref } from 'vue';
const value = ref('');

const onSearch = (val) => {
    Toast({
        message: '搜索：' + value.value
    });
};

const onCancel = () => {
    Toast({
        message: '取消'
    });
};

const emToastRef = ref(null);

defineExpose({
    emToastRef
});
```

::: endif

`Tips`: 在 `em-search` 外层增加 `form` 标签，且 `action` 不为空，即可在 `iOS` 输入法中显示搜索按钮。

#### 搜索框内容对齐

通过 `input-align` 属性设置搜索框内容的对齐方式，可选值为 `center`、`right`。

```html
<em-search v-model="value" placeholder="请输入搜索关键词" input-align="center" />
```

#### 禁用搜索框

通过 `disabled` 属性禁用搜索框。

```html
<em-search v-model="value" disabled placeholder="请输入搜索关键词" />
```

#### 自定义背景色

通过 `background` 属性可以设置搜索框外部的背景色，通过 `shape` 属性设置搜索框的形状，可选值为 `round`。

```html
<em-search v-model="value" shape="round" background="#4fc08d" placeholder="请输入搜索关键词" />
```

#### 自定义按钮

使用 `action` 插槽可以自定义右侧按钮的内容。使用插槽后，`cancel` 事件将不再触发。

```html
<em-search v-model="value" show-action label="地址" placeholder="请输入搜索关键词" @search="onSearch">
    <template #action>
        <div @click="onSearch">搜索</div>
    </template>
</em-search>
```

### API

#### Props

| 参数                                                                         |                                           说明                                            | 类型            | 默认值    | ::: ifdef M83 weex 端支持 ::: endif |
| :--------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------: | :-------------- | :-------- | :---------------------------------- |
| v-model ::: ifdef M83 (value) ::: endif ::: ifdef M84 (modelValue) ::: endif |                                          搜索值                                           | string          | -         | 是                                  |
| label                                                                        |                                      搜索框左侧文本                                       | string          | -         | 是                                  |
| shape                                                                        |                               搜索框形状，可选值为 `square`                               | string          | `round`   | 是                                  |
| background                                                                   |                                     搜索框外部背景色                                      | string          | `#f2f2f2` | 是                                  |
| maxlength                                                                    |                                     输入的最大字符数                                      | number / string | -         | 是                                  |
| placeholder                                                                  |                                       占位提示文字                                        | string          | -         | 是                                  |
| clearable                                                                    |                       是否启用清除图标，点击清除图标后会清空输入框                        | boolean         | `true`    | 是                                  |
| clear-trigger                                                                | 显示清除图标的时机，`always` 表示输入框不为空时展示，`focus` 表示输入框聚焦且不为空时展示 | string          | `focus`   | 是                                  |
| autofocus                                                                    |                           是否自动聚焦，`iOS` 系统不支持该属性                            | boolean         | `false`   | 是                                  |
| show-action                                                                  |                               是否在搜索框右侧显示取消按钮                                | boolean         | `false`   | 是                                  |
| action-text                                                                  |                                       取消按钮文字                                        | boolean         | `取消`    | 是                                  |
| disabled                                                                     |                                      是否禁用输入框                                       | boolean         | `false`   | 是                                  |
| readonly                                                                     |                                   是否将输入框设为只读                                    | boolean         | `false`   | 是                                  |
| error                                                                        |                                    是否将输入内容标红                                     | boolean         | `false`   | 是                                  |
| input-align                                                                  |                       输入框内容对齐方式，可选值为 `center` `right`                       | string          | `left`    | 是                                  |
| left-icon                                                                    |                               输入框左侧图标名称或图片链接                                | string          | `search`  | 是                                  |
| right-icon                                                                   |                               输入框右侧图标名称或图片链接                                | string          | -         | 是                                  |
| showVoice                                                                    |                        是否显示语音识别功能, 只能在 ejs 环境中使用                        | boolean         | `false`   | 是                                  |

#### Events

| 事件名 |         说明         | 回调参数                     |
| :----- | :------------------: | :--------------------------- |
| search |    确定搜索时触发    | value: string (当前输入的值) |
| input  | 输入框内容变化时触发 | value: string (当前输入的值) |
| focus  | 输入框获得焦点时触发 | event: Event                 |
| blur   | 输入框失去焦点时触发 | event: Event                 |
| clear  |  点击清除按钮后触发  | event: Event                 |
| cancel |  点击取消按钮时触发  | -                            |

#### Slots

| 名称      |                          说明                           |
| :-------- | :-----------------------------------------------------: |
| left      |               自定义左侧内容（搜索框外）                |
| action    | 自定义右侧内容（搜索框外），设置 show-action 属性后展示 |
| label     |               自定义左侧文本（搜索框内）                |
| leftIcon  |               自定义左侧图标（搜索框内）                |
| rightIcon |               自定义右侧图标（搜索框内）                |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-search"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-search"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif

 <style>
 iframe {
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
