# 组件使用

## popup 弹出层

### 介绍

-   弹出层容器，用于展示弹窗、信息提示等内容，支持多个弹出层叠加展示。

::: ifdef M83

-   `v8.3.11`开始支持 weex 端使用

::: endif

### 代码演示

#### 基础用法

通过`v-model`控制弹出层是否展示。

```html
<em-cell is-link @click="showPopup">展示弹出层</em-cell>
<em-popup v-model="show">内容</em-popup>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            show: false
        };
    },

    methods: {
        showPopup() {
            this.show = true;
        }
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const show = ref(false);

const showPopup = () => {
    show.value = true;
};
```

::: endif

#### 弹出位置

通过`position`属性设置弹出位置，默认居中弹出，可以设置为`top`、`bottom`、`left`、`right`。

```html
<em-popup v-model="show" position="top" custom-style="height: 30%;" />
```

#### 关闭图标

设置`closeable`属性后，会在弹出层的右上角显示关闭图标，并且可以通过`close-icon`属性自定义图标，使用`close-icon-position`属性可以自定义图标位置。

```html
<em-popup v-model="show" closeable position="bottom" custom-style="height: 30%;" />
<!-- 自定义图标 -->
<em-popup v-model="show" closeable close-icon="close" position="bottom" custom-style="height: 30%;" />
<!-- 图标位置 -->
<em-popup v-model="show" closeable close-icon-position="top-left" position="bottom" custom-style="height: 30%;" />
```

#### 圆角弹窗

设置`round`属性后，弹窗会根据弹出位置添加不同的圆角样式

```html
<em-popup v-model="show" round position="bottom" custom-style="height: 30%;" />
```

### API

#### Props

| 参数                                                                         |                                   说明                                   | 类型            | 默认值      | ::: ifdef M83 weex 端支持 ::: endif                  |
| :--------------------------------------------------------------------------- | :----------------------------------------------------------------------: | :-------------- | :---------- | :--------------------------------------------------- |
| v-model ::: ifdef M83 (value) ::: endif ::: ifdef M84 (modelValue) ::: endif |                              是否显示弹出层                              | boolean         | `false`     | 是                                                   |
| overlay                                                                      |                              是否显示遮罩层                              | boolean         | `true`      | 是                                                   |
| position                                                                     |             弹出位置，可选值为 `top` `bottom` `right` `left`             | string          | `center`    | 是                                                   |
| custom-style                                                                 |                             自定义弹出层样式                             | string          | -           | 是                                                   |
| overlay-style                                                                |                             自定义遮罩层样式                             | string          | -           | 是                                                   |
| duration                                                                     |                            动画时长，单位毫秒                            | number / string | `300`       | 是                                                   |
| round                                                                        |                               是否显示圆角                               | boolean         | `false`     | 是                                                   |
| lock-scroll                                                                  |                             是否锁定背景滚动                             | boolean         | `true`      | 否 ::: ifdef M83 (weex 端默认背景不能滚动) ::: endif |
| close-on-click-overlay                                                       |                          是否在点击遮罩层后关闭                          | boolean         | `true`      | 是                                                   |
| closeable                                                                    |                             是否显示关闭图标                             | boolean         | `false`     | 是                                                   |
| close-icon                                                                   |                          关闭图标名称或图片链接                          | string          | `cross`     | 是                                                   |
| close-icon-position                                                          |      关闭图标位置，可选值为`top-left` `bottom-left` `bottom-right`       | string          | `top-right` | 是                                                   |
| transition                                                                   | 动画类名，等价于 `transtion` 的`name`属性, 仅在`position='center'`时有效 | string          | -           | 是                                                   |
| safe-area-inset-bottom                                                       |                          是否开启底部安全区适配                          | boolean         | `false`     | 否                                                   |

注意，其中`transition`属性组件库支持的可选值有：`em-fade` `em-fade-up` `em-fade-down` `em-fade-left` `em-fade-right` `em-slide-up` `em-slide-down` `em-slide-left` `em-slide-right`

#### Events

| 名称             |        说明        |   回调参数   |
| :--------------- | :----------------: | :----------: |
| click            |  点击弹出层时触发  | event: Event |
| before-enter     |     进入前触发     |      -       |
| enter            |     进入中触发     |      -       |
| after-enter      |     进入后触发     |      -       |
| before-leave     |     离开前触发     |      -       |
| leave            |     离开中触发     |      -       |
| after-leave      |     离开后触发     |      -       |
| click-overlay    |  点击遮罩层时触发  |      -       |
| click-close-icon | 点击关闭图标时触发 | event: Event |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-popup"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-popup"
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
