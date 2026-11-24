# 组件使用

## toast 轻提示

### 介绍

-   在页面中间弹出黑色半透明提示，用于消息通知、加载提示、操作结果提示等场景。

::: ifdef M83

-   `v8.3.11`开始支持 weex 端使用

::: endif

### 引入

手动引入时的引入路径：

```js
import Toast from '@components/em-toast/index.js';
```

Toast 作为全局函数，跨端框架为其提供了全局注入的功能，使用 Toast 函数时，框架会自动引入上述路径，所以在跨端框架中使用时，不必再手动引入。

### 代码演示

#### 文字提示

通过函数调用 toast 组件时，需要手动在页面上放一个 toast 节点，且提供一个 ref 方便函数进行查找。

::: ifdef M83
该 ref 值默认为 emToast
::: endif

::: ifdef M84
该 ref 值默认为 emToastRef
::: endif

::: ifdef M83

```html
<em-toast ref="emToast"></em-toast>
```

```js
Toast('提示内容');
```

::: endif

::: ifdef M84

```html
<em-toast ref="emToastRef"></em-toast>
```

```js
import { ref } from 'vue';

const emToastRef = ref(null);
Toast('提示内容');
defineExpose({
    emToastRef
});
```

::: endif

#### 加载提示

使用 `Toast.loading` 方法展示加载提示，通过 `forbidClick` 属性可以禁用背景点击。

::: ifdef M83

```html
<em-toast ref="emToast"></em-toast>
```

```js
Toast.loading({
    message: '加载中...',
    forbidClick: true
});
```

::: endif

::: ifdef M84

```html
<em-toast ref="emToastRef"></em-toast>
```

```js
import { ref } from 'vue';

const emToastRef = ref(null);
Toast.loading({
    message: '加载中...',
    forbidClick: true
});
defineExpose({
    emToastRef
});
```

::: endif

#### 成功/失败提示

使用 `Toast.success` 方法展示成功提示，使用 `Toast.fail` 方法展示失败提示。

::: ifdef M83

```html
<em-toast ref="emToast"></em-toast>
```

```js
Toast.success('成功文案');
Toast.fail('失败文案');
```

::: endif

::: ifdef M84

```html
<em-toast ref="emToastRef"></em-toast>
```

```js
import { ref } from 'vue';

const emToastRef = ref(null);
Toast.success('成功文案');
Toast.fail('失败文案');
defineExpose({
    emToastRef
});
```

::: endif

#### 自定义图标

通过 `icon` 选项可以自定义图标，支持传入图标名称或图片链接，通过`loadingType` 属性可以自定义加载图标类型。

::: ifdef M83

```html
<em-toast ref="emToast"></em-toast>
```

```js
Toast({
    message: '自定义图标',
    icon: 'like-o'
});

Toast({
    message: '自定义图片',
    icon: 'https://img.yzcdn.cn/vant/logo.png'
});

// 自定义加载图标
Toast.loading({
    message: '加载中...',
    loadingType: 'spinner'
});
```

::: endif

::: ifdef M84

```html
<em-toast ref="emToastRef"></em-toast>
```

```js
import { ref } from 'vue';

const emToastRef = ref(null);
Toast({
    message: '自定义图标',
    icon: 'like-o'
});

Toast({
    message: '自定义图片',
    icon: 'https://img.yzcdn.cn/vant/logo.png'
});

// 自定义加载图标
Toast.loading({
    message: '加载中...',
    loadingType: 'spinner'
});
defineExpose({
    emToastRef
});
```

::: endif

#### 动态更新提示

执行 `Toast` 方法时会返回对应的 `Toast` 实例，通过修改实例上的 `message` 属性可以实现动态更新提示的效果。

::: ifdef M83

```html
<em-toast ref="emToast"></em-toast>
```

```js
const toast = Toast.loading({
    duration: 0, // 持续展示 toast
    forbidClick: true,
    message: '倒计时 3 秒'
});

let second = 3;
let times = () => {
    setTimeout(() => {
        second--;
        if (second > 0) {
            toast.message = `倒计时 ${second} 秒`;
            times();
        } else {
            // 关闭 toast
            Toast.clear();
        }
    }, 1000);
};

times();
```

::: endif

::: ifdef M84

```html
<em-toast ref="emToastRef"></em-toast>
```

```js
import { ref } from 'vue';

const emToastRef = ref(null);
const toast = Toast.loading({
    duration: 0, // 持续展示 toast
    forbidClick: true,
    message: '倒计时 3 秒'
});

let second = 3;
let times = () => {
    setTimeout(() => {
        second--;
        if (second > 0) {
            toast.message = `倒计时 ${second} 秒`;
            times();
        } else {
            // 关闭 toast
            Toast.clear();
        }
    }, 1000);
};

times();
defineExpose({
    emToastRef
});
```

::: endif

#### 展示多个提示

若需要展示多个 toast，可以在页面上放置多个 toast 节点，通过 selector 传入不同节点的 ref。

::: ifdef M83

```html
<em-toast ref="emToast"></em-toast>
<em-toast ref="other"></em-toast>
```

```js
// 使用了默认的emToast节点
Toast('一个提示');
// 使用了手动添加的 other 节点
Toast({
    selector: 'other',
    message: '另一个提示',
    position: 'bottom'
});
```

::: endif

::: ifdef M84

```html
<em-toast ref="emToastRef"></em-toast>
<em-toast ref="other"></em-toast>
```

```js
import { ref } from 'vue';

const emToastRef = ref(null);
const other = ref(null);

// 使用了默认的emToast节点
Toast('一个提示');
// 使用了手动添加的 other 节点
Toast({
    selector: 'other',
    message: '另一个提示',
    position: 'bottom'
});

defineExpose({
    emToastRef,
    other
});
```

::: endif

#### 修改默认配置

通过`Toast.setDefaultOptions`函数可以全局修改 `Toast` 的默认配置。

```js
// 将所有 Toast 的展示时长设置为 2000 毫秒
Toast.setDefaultOptions({ duration: 2000 });

// 将所有 loading Toast 设置为背景不可点击
Toast.setDefaultOptions('loading', { forbidClick: true });

// 重置所有 Toast 的默认配置
Toast.resetDefaultOptions();

// 重置 loading Toast 的默认配置
Toast.resetDefaultOptions('loading');
```

### API

#### 方法

| 方法名                    |                                   说明                                    | 参数              | 返回值       |
| :------------------------ | :-----------------------------------------------------------------------: | :---------------- | :----------- |
| Toast                     |                                 展示提示                                  | options / message | `toast` 实例 |
| Toast.loading             |                               展示加载提示                                | options / message | `toast` 实例 |
| Toast.success             |                               展示成功提示                                | options / message | `toast` 实例 |
| Toast.fail                |                               展示失败提示                                | options / message | `toast` 实例 |
| Toast.clear               |                            关闭页面上所有提示                             |                   | `void`       |
| Toast.setDefaultOptions   |  修改默认配置，对所有 `Toast` 生效。传入 type 可以修改指定类型的默认配置  | type / options    | `void`       |
| Toast.resetDefaultOptions | 重置默认配置，对所有 `Toast` 生效。传入 `type` 可以重置指定类型的默认配置 | type              | `void`       |

#### Options

| 参数                |                             说明                             | 类型     | 默认值     | ::: ifdef M83 weex 端支持 ::: endif                                                                       |
| :------------------ | :----------------------------------------------------------: | :------- | :--------- | :-------------------------------------------------------------------------------------------------------- |
| context             |   toast 节点上下文，传入后只在该$vm 节点下查找 toast 节点    | vue 实例 | 当前页面   | 是 ::: ifdef M83（weex 端必填项，`v8.3.11`开始可以通过`setDefaultOptions`统一设置当前`context`）::: endif |
| selector            |          toast 节点的 ref，函数根据该 ref 进行查找           | string   | `emToast`  | 是                                                                                                        |
| type                |        提示类型，可选值为 `loading` `success` `fail`         | string   | `text`     | 是                                                                                                        |
| position            |                位置，可选值为 `top` `bottom`                 | string   | `middle`   | 是                                                                                                        |
| message             |                  文本内容，支持通过`\n`换行                  | string   | `''`       | 是                                                                                                        |
| icon                |            自定义图标，支持传入图标名称或图片链接            | string   | -          | 是                                                                                                        |
| iconPrefix          |      图标类名前缀，同 `Icon` 组件的 `class-prefix` 属性      | string   | `van-icon` | 否                                                                                                        |
| overlay             |                      是否显示背景遮罩层                      | boolean  | `false`    | 是                                                                                                        |
| forbidClick         |                       是否禁止背景点击                       | boolean  | `false`    | 是                                                                                                        |
| closeOnClick        |                       是否在点击后关闭                       | boolean  | `false`    | 是                                                                                                        |
| closeOnClickOverlay |                    是否在点击遮罩层后关闭                    | boolean  | `false`    | 是                                                                                                        |
| loadingType         | 加载图标类型, 可选值为 `spinner` `ball` `operation` `square` | string   | `circular` | 是                                                                                                        |
| duration            |         展示时长(`ms`)，值为 `0` 时，`toast`不会消失         | number   | `2000`     | 是                                                                                                        |
| onOpened            |                     完全展示后的回调函数                     | Function | -          | 是                                                                                                        |
| onClose             |                       关闭时的回调函数                       | Function | -          | 是                                                                                                        |
| transition          |          动画类名，等价于 `transtion` 的`name`属性           | string   | `em-fade`  | 是                                                                                                        |
| zIndex              |                           样式层级                           | number   | `9999`     | 否                                                                                                        |

注意，其中`transition`属性组件库支持的可选值有：`em-fade` `em-fade-up` `em-fade-down` `em-fade-left` `em-fade-right` `em-slide-up` `em-slide-down` `em-slide-left` `em-slide-right`

#### Props

这是可以放在 toast 节点上的属性，对该节点有效

| 参数         |    说明    | 类型   | 默认值 | ::: ifdef M83 weex 端支持 ::: endif    |
| :----------- | :--------: | :----- | :----- | :------------------------------------- |
| custom-class | 自定义类名 | string | -      | 否                                     |
| custom-style | 自定义样式 | string | -      | 是（有可能不生效，因为优先级规则不同） |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-toast"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-toast"
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
