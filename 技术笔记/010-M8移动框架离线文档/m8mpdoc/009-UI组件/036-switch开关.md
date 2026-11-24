# 组件使用

## switch 开关

### 介绍

-   开关组件。

### 代码演示

#### 基础用法

通过`v-model`绑定开关的选中状态，`true`表示开，`false`表示关。

```html
<em-switch v-model="checked" />
```

::: ifdef M83

```js
export default {
    data() {
        return {
            checked: true
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const checked = ref(true);
```

::: endif

#### 禁用状态

通过`disabled`属性来禁用开关，禁用状态下开关不可点击

```html
<em-switch v-model="checked" disabled />
```

#### 加载状态

通过`loading`属性设置开关为加载状态，加载状态下开关不可点击

```html
<em-switch v-model="checked" loading />
```

#### 自定义大小

通过`size`属性自定义开关的大小

```html
<em-switch v-model="checked" size="24px" />
```

#### 自定义颜色

`active-color`属性表示打开时的背景色，`inactive-color`表示关闭时的背景色

```html
<em-switch v-model="checked" active-color="#07c160" inactive-color="#ee0a24" />
```

#### 异步控制

需要异步控制开关时，可以使用`value`属性和`input`事件代替`v-model`，并在`input`事件回调函数中手动处理开关状态

::: ifdef M83

```html
<em-switch :value="checked" @input="onInput" />
<em-dialog ref="emDialog"></em-dialog>
```

```js
export default {
    data() {
        return {
            checked: true
        };
    },
    methods: {
        onInput(checked) {
            Dialog.confirm({
                message: '是否切换开关？'
            })
                .then(() => {
                    this.checked = checked;
                })
                .catch(() => {});
        }
    }
};
```

::: endif
::: ifdef M84

```html
<em-switch :model-value="checked" @input="onInput" />
<em-dialog ref="emDialogRef"></em-dialog>
```

```js
import { ref } from 'vue';
const checked = ref(true);
const emDialogRef = ref(null);

function onInput(checked) {
    Dialog.confirm({
        message: '是否切换开关？'
    })
        .then(() => {
            checked.value = checked;
        })
        .catch(() => {});
}

defineExpose({
    emDialogRef
});
```

::: endif

#### 搭配单元格使用

```html
<em-cell center title="标题">
    <template #right-icon>
        <em-switch v-model="checked" size="24" />
    </template>
</em-cell>
```

### API

#### Props

| 参数                                                                         |           说明           | 类型            | 默认值    |
| :--------------------------------------------------------------------------- | :----------------------: | :-------------- | :-------- |
| v-model ::: ifdef M83 (value) ::: endif ::: ifdef M84 (modelValue) ::: endif |       开关选中状态       | any             | `false`   |
| loading                                                                      |      是否为加载状态      | boolean         | `false`   |
| disabled                                                                     |      是否为禁用状态      | boolean         | `false`   |
| size                                                                         | 开关尺寸，默认单位为`px` | number / string | `30px`    |
| active-color                                                                 |      打开时的背景色      | string          | `#2e6be5` |
| inactive-color                                                               |      关闭时的背景色      | string          | `#b8becc` |
| active-value                                                                 |      打开时对应的值      | any             | `true`    |
| inactive-value                                                               |      关闭时对应的值      | any             | `false`   |

#### Events

| 事件名 |        说明        | 回调参数     |
| :----- | :----------------: | :----------- |
| change | 开关状态切换时触发 | value: any   |
| click  |     点击时触发     | event: Event |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-switch"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-switch"
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
