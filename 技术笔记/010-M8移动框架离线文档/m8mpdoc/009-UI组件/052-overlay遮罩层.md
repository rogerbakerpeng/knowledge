# 组件使用

## overlay 遮罩层

### 介绍

-   创建一个遮罩层，用于强调特定的页面元素，并阻止用户进行其他操作。

::: ifdef M83

-   `v8.3.11`开始支持 weex 端使用

::: endif

### 代码演示

#### 基础用法

```html
<em-button type="primary" text="显示遮罩层" @click="show = true" />
<em-overlay :show="show" @click="show = false" />
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

#### 嵌入内容

通过默认插槽可以在遮罩层上嵌入任意内容

```html
<em-overlay :show="show" @click="show = false">
    <div class="wrapper">
        <scroll-view scroll-y="true" class="scroll-items" style="scroll-behavior: smooth" @click.stop>
            <div v-for="item in 20" :key="item">item</div>
        </scroll-view>
    </div>
</em-overlay>

<style>
    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    .block {
        width: 120px;
        height: 120px;
        background-color: #fff;
    }
</style>
```

### API

#### Props

| 参数         | 说明                                                                 | 类型            | 默认值  | ::: ifdef M83 weex 端支持 ::: endif |
| :----------- | :------------------------------------------------------------------- | :-------------- | :------ | :---------------------------------- |
| show         | 是否展示遮罩层                                                       | boolean         | `false` | 是                                  |
| z-index      | `z-index` 层级                                                       | number / string | `99`    | 否                                  |
| duration     | 动画时长，单位毫秒                                                   | number / string | `280`   | 是                                  |
| custom-style | 自定义样式                                                           | string          | -       | 是                                  |
| lock-scroll  | 是否锁定背景滚动，锁定时蒙层里的内容也将无法滚动, 支付宝小程序不支持 | boolean         | `true`  | 否（weex 端默认锁定背景滚动）       |

#### Events

| 事件名 | 说明       | 回调参数     |
| :----- | :--------- | :----------- |
| click  | 点击时触发 | event: Event |

#### Slots

| 名称    | 说明                               |
| :------ | :--------------------------------- |
| default | 默认插槽，用于在遮罩层上方嵌入内容 |

### 遮罩层滚动穿透说明

在 H5 或微信小程序中，遮罩层组件通过设置`@touchmove.stop.prevent`来锁定背景滚动，此时由于禁止了`touchmove`的默认行为，导致遮罩层内部也无法进行滚动。

若想要在内部滚动，可以使用`scroll-view`组件实现滚动。

而在支付宝小程序中，`@touchmove.stop.prevent`无法锁定背景滚动，若希望触摸蒙版时不会触发底部内容的滚动，可以在蒙版弹出时，设置底部的内容样式为`overflow: hidden`来解决这个问题。

类似问题在其他组件如：`popup`、`picker`等使用了遮罩层的组件中也会存在，都可以参考上述方案解决。

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-overlay"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-overlay"
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
