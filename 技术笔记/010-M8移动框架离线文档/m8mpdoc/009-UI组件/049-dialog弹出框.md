# 组件使用

## dialog 弹出框

### 介绍

-   弹出模态框，常用于消息提示、消息确认，或在当前页面内完成特定的交互操作。

弹出框组件支持函数调用和组件调用两种方式。

::: ifdef M83

-   `v8.3.11`开始支持 weex 端使用

::: endif

### 引入

手动引入时的引入路径：

```js
import Dialog from '@components/em-dialog/index.js';
```

Dialog 作为全局函数，跨端框架为其提供了全局注入的功能，使用 Dialog 函数时，框架会自动引入上述路径，所以在跨端框架中使用时，不必再手动引入。

#### 调用方式

通过函数调用 dialog 组件时，需要手动在页面上放一个 dialog 节点，且提供一个 ref 方便函数进行查找

::: ifdef M83
该 ref 值默认为 emDialog
::: endif

::: ifdef M84
该 ref 值默认为 emDialogRef
::: endif

#### 函数调用

::: ifdef M83

```html
<em-dialog ref="emDialog"></em-dialog>
```

```js
Dialog({ message: '提示' });
```

::: endif

::: ifdef M84

```html
<em-dialog ref="emDialogRef"></em-dialog>
```

```js
import { ref } from 'vue';

const emDialogRef = ref(null);
Dialog({ message: '提示' });
defineExpose({
    emDialogRef
});
```

::: endif

### 代码演示

#### 消息提示

用于提示一些消息，只包含一个确认按钮。

::: ifdef M83

```html
<em-dialog ref="emDialog"></em-dialog>
```

```js
Dialog.alert({
    title: '标题',
    message: '弹窗内容'
})
    .then(() => {
        // on confirm
    })
    .catch(() => {
        // on cancel
    });

Dialog.alert({
    message: '弹窗内容'
})
    .then(() => {
        // on confirm
    })
    .catch(() => {
        // on cancel
    });
```

::: endif

::: ifdef M84

```html
<em-dialog ref="emDialogRef"></em-dialog>
```

```js
import { ref } from 'vue';

const emDialogRef = ref(null);

Dialog.alert({
    title: '标题',
    message: '弹窗内容'
})
    .then(() => {
        // on confirm
    })
    .catch(() => {
        // on cancel
    });

Dialog.alert({
    message: '弹窗内容'
})
    .then(() => {
        // on confirm
    })
    .catch(() => {
        // on cancel
    });
defineExpose({
    emDialogRef
});
```

::: endif

#### 普通风格

将 `theme` 选项设置为 `default` 可以展示普通的弹窗。

::: ifdef M83

```html
<em-dialog ref="emDialog"></em-dialog>
```

```js
Dialog.alert({
    title: '标题',
    message: '弹窗内容',
    theme: 'default'
})
    .then(() => {
        // on confirm
    })
    .catch(() => {
        // on cancel
    });

Dialog.alert({
    message: '弹窗内容',
    theme: 'default'
})
    .then(() => {
        // on confirm
    })
    .catch(() => {
        // on cancel
    });
```

::: endif

::: ifdef M84

```html
<em-dialog ref="emDialogRef"></em-dialog>
```

```js
import { ref } from 'vue';

const emDialogRef = ref(null);

Dialog.alert({
    title: '标题',
    message: '弹窗内容',
    theme: 'default'
})
    .then(() => {
        // on confirm
    })
    .catch(() => {
        // on cancel
    });

Dialog.alert({
    message: '弹窗内容',
    theme: 'default'
})
    .then(() => {
        // on confirm
    })
    .catch(() => {
        // on cancel
    });
defineExpose({
    emDialogRef
});
```

::: endif

#### 消息确认

用于确认消息，包含取消和确认按钮。

::: ifdef M83

```html
<em-dialog ref="emDialog"></em-dialog>
```

```js
Dialog.confirm({
    title: '标题',
    message: '弹窗内容'
})
    .then(() => {
        // on confirm
    })
    .catch(() => {
        // on cancel
    });
```

::: endif

::: ifdef M84

```html
<em-dialog ref="emDialogRef"></em-dialog>
```

```js
import { ref } from 'vue';

const emDialogRef = ref(null);

Dialog.confirm({
    title: '标题',
    message: '弹窗内容'
})
    .then(() => {
        // on confirm
    })
    .catch(() => {
        // on cancel
    });
defineExpose({
    emDialogRef
});
```

::: endif

#### 异步关闭

通过 `beforeClose` 属性可以传入一个回调函数，在弹窗关闭前进行特定操作。

::: ifdef M83

```html
<em-dialog ref="emDialog"></em-dialog>
```

```js
function beforeClose(action, done) {
    if (action === 'confirm') {
        setTimeout(done, 1000);
    } else {
        done();
    }
}

Dialog.confirm({
    title: '标题',
    message: '弹窗内容',
    beforeClose
});
```

::: endif

::: ifdef M84

```html
<em-dialog ref="emDialogRef"></em-dialog>
```

```js
import { ref } from 'vue';

const emDialogRef = ref(null);

function beforeClose(action, done) {
    if (action === 'confirm') {
        setTimeout(done, 1000);
    } else {
        done();
    }
}

Dialog.confirm({
    title: '标题',
    message: '弹窗内容',
    beforeClose
});
defineExpose({
    emDialogRef
});
```

::: endif

#### 组件调用

如果需要在弹窗内嵌入组件或其他自定义内容，可以使用组件调用的方式。

```html
<em-dialog v-model="show" title="标题" show-cancel-button>
    <img src="https://img.yzcdn.cn/vant/apple-3.jpg" />
</em-dialog>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            show: false
        };
    }
};
```

::: endif

::: ifdef M84

```js
import { ref } from 'vue';
const show = ref(false);
```

::: endif

### API

#### 方法

| 方法名                     | 说明                             | 参数    | 返回值  |
| :------------------------- | :------------------------------- | :------ | :------ |
| Dialog                     | 展示弹窗                         | options | Promise |
| Dialog.alert               | 展示消息提示弹窗                 | options | Promise |
| Dialog.confirm             | 展示消息确认弹窗                 | options | Promise |
| Dialog.setDefaultOptions   | 修改默认配置，对所有 Dialog 生效 | options | void    |
| Dialog.resetDefaultOptions | 重置默认配置，对所有 Dialog 生效 | -       | void    |
| Dialog.close               | 关闭弹窗                         | -       | void    |

#### Options

通过函数调用 `Dialog` 时，支持传入以下选项：

| 参数                | 说明                                                                        | 类型                   | 默认值         | ::: ifdef M83 weex 端支持 ::: endif |
| :------------------ | :-------------------------------------------------------------------------- | :--------------------- | :------------- | :---------------------------------- |
| context             | dialog 节点上下文，传入后只在该$vm 节点下查找 dialog 节点                   | vue 实例               | 当前页面       | 是                                  |
| selector            | dialog 节点的 ref，函数根据该 ref 进行查找                                  | string                 | `emDialog`     | 是                                  |
| title               | 标题                                                                        | string                 | -              | 是                                  |
| width               | 弹窗宽度，默认单位为`px`                                                    | number / string        | `295px`        | 是                                  |
| message             | 文本内容，支持通过`\n`换行，注意微信小程序包含换行符时可能编译报错          | string                 | -              | 是                                  |
| messageAlign        | 内容对齐方式，可选值为`left` `right`                                        | string                 | `center`       | 是                                  |
| theme               | 样式风格，可选值为`default`                                                 | string                 | `round-button` | 是                                  |
| showConfirmButton   | 是否展示确认按钮                                                            | boolean                | `true`         | 是                                  |
| showCancelButton    | 是否展示取消按钮                                                            | boolean                | `false`        | 是                                  |
| confirmButtonText   | 确认按钮文案                                                                | string                 | `确认`         | 是                                  |
| confirmButtonColor  | 确认按钮颜色                                                                | string                 | `#ee0a24`      | 是                                  |
| cancelButtonText    | 取消按钮文案                                                                | string                 | `取消`         | 是                                  |
| cancelButtonColor   | 取消按钮颜色                                                                | string                 | `black`        | 是                                  |
| overlay             | 是否展示遮罩层                                                              | boolean                | `true`         | 是                                  |
| overlayStyle        | 自定义遮罩层样式                                                            | string                 | -              | 是                                  |
| closeOnPopstate     | 是否在页面回退时自动关闭                                                    | boolean                | `true`         | 否                                  |
| closeOnClickOverlay | 是否在点击遮罩层后关闭弹窗                                                  | boolean                | `true`         | 是                                  |
| lockScroll          | 是否锁定背景滚动                                                            | boolean                | `true`         | 否 （weex 端默认锁定）              |
| allowHtml           | 是否允许 `message` 内容中渲染 `HTML`                                        | boolean                | `true`         | 否                                  |
| beforeClose         | 关闭前的回调函数，调用 `done()` 后关闭弹窗，调用 `done(false)` 阻止弹窗关闭 | (action, done) => void | -              | 是                                  |
| transition          | 动画类名，等价于 `transtion` 的`name`属性                                   | string                 | `em-fade`      | 是                                  |

注意，其中`transition`属性组件库支持的可选值有：`em-fade` `em-fade-up` `em-fade-down` `em-fade-left` `em-fade-right` `em-slide-up` `em-slide-down` `em-slide-left` `em-slide-right`

#### Props

通过组件调用 `Dialog` 时，支持以下 `Props`：

| 参数                                                                         | 说明                                                                                                                                 | 类型                   | 默认值         | ::: ifdef M83 weex 端支持 ::: endif |
| :--------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- | :--------------------- | :------------- | :---------------------------------- |
| v-model ::: ifdef M83 (value) ::: endif ::: ifdef M84 (modelValue) ::: endif | 是否显示弹窗                                                                                                                         | boolean                | -              | 是                                  |
| title                                                                        | 标题                                                                                                                                 | string                 | -              | 是                                  |
| width                                                                        | 弹窗宽度，默认单位为`px`                                                                                                             | number / string        | `295px`        | 是                                  |
| message                                                                      | 文本内容，支持通过`\n`换行，注意微信小程序包含换行符时可能编译报错                                                                   | string                 | -              | 是                                  |
| message-align                                                                | 内容对齐方式，可选值为`left` `right`                                                                                                 | string                 | `center`       | 是                                  |
| theme                                                                        | 样式风格，可选值为`default`                                                                                                          | string                 | `round-button` | 是                                  |
| show-confirm-button                                                          | 是否展示确认按钮                                                                                                                     | boolean                | `true`         | 是                                  |
| show-cancel-button                                                           | 是否展示取消按钮                                                                                                                     | boolean                | `false`        | 是                                  |
| confirm-button-text                                                          | 确认按钮文案                                                                                                                         | string                 | `确认`         | 是                                  |
| confirm-button-color                                                         | 确认按钮颜色                                                                                                                         | string                 | `#2e6be5`      | 是                                  |
| cancel-button-text                                                           | 取消按钮文案                                                                                                                         | string                 | `取消`         | 是                                  |
| cancel-button-color                                                          | 取消按钮颜色                                                                                                                         | string                 | `#2e3033`      | 是                                  |
| overlay                                                                      | 是否展示遮罩层                                                                                                                       | boolean                | `true`         | 是                                  |
| overlay-class                                                                | 自定义遮罩层类名                                                                                                                     | string                 | -              | 否                                  |
| overlay-style                                                                | 自定义遮罩层样式                                                                                                                     | string                 | -              | 是                                  |
| close-on-popstate                                                            | 是否在页面回退时自动关闭                                                                                                             | boolean                | `true`         | 否                                  |
| close-on-click-overlay                                                       | 是否在点击遮罩层后关闭弹窗                                                                                                           | boolean                | `true`         | 是                                  |
| lazy-render                                                                  | 是否在显示弹层时才渲染节点                                                                                                           | boolean                | `true`         | 否                                  |
| lock-scroll                                                                  | 是否锁定背景滚动, 该属性在支付宝小程序中不生效，无法禁止蒙版下的滚动，若要在支付宝小程序禁止滚动，请自行给蒙版下元素添加动态样式实现 | boolean                | `true`         | 否                                  |
| allow-html                                                                   | 是否允许 `message` 内容中渲染 `HTML`                                                                                                 | boolean                | `true`         | 否                                  |
| before-close                                                                 | 关闭前的回调函数，调用 `done()` 后关闭弹窗，调用 `done(false)` 阻止弹窗关闭                                                          | (action, done) => void | -              | 是                                  |
| transition                                                                   | 动画类名，等价于 `transtion` 的`name`属性                                                                                            | string                 | -              | 是                                  |

#### Events

通过组件调用 `Dialog` 时，支持以下事件：

| 事件    | 说明                     | 回调参数 |
| :------ | :----------------------- | :------- |
| confirm | 点击确认按钮时触发       | -        |
| cancel  | 点击取消按钮时触发       | -        |
| open    | 打开弹窗时触发           | -        |
| close   | 关闭弹窗时触发           | -        |
| opened  | 打开弹窗且动画结束后触发 | -        |
| closed  | 关闭弹窗且动画结束后触发 | -        |

#### Slots

通过组件调用 `Dialog` 时，支持以下插槽：

| 名称    | 说明       |
| :------ | :--------- |
| default | 自定义内容 |
| title   | 自定义标题 |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-dialog"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-dialog"
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
