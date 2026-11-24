# 组件使用

## sticky 粘性布局

### 介绍

-   `Sticky` 组件与 `CSS` 中`position: sticky`属性实现的效果一致，当组件在屏幕范围内时，会按照正常的布局排列，当组件滚出屏幕范围时，始终会固定在屏幕顶部。

注：

1. 在微信和支付宝小程序下，页面上需要添加`onPageScroll`函数用于监听页面滚动，否则该组件会失效。

2. 设置容器时，需要借助组件提供的方法进行设置。

### 代码演示

#### 基础用法

将内容包裹在`Sticky`组件内即可

```html
<em-sticky>
    <em-button type="primary">基础用法</em-button>
</em-sticky>
```

#### 吸顶距离

通过`offset-top`属性可以设置组件在吸顶时与顶部的距离

```html
<em-sticky :offset-top="50">
    <em-button type="info">吸顶距离</em-button>
</em-sticky>
```

#### 指定容器

通过`container`属性可以指定组件的容器，页面滚动时，组件会始终保持在容器范围内，当组件即将超出容器底部时，会固定在容器的底部。

由于微信小程序中，自定义组件获取节点信息受限，所以为了方便获取容器的位置信息，需要借助组件提供的方法`wrapFunc`设置容器。

```html
<div :id="id" style="height: 150px; background-color: #fff">
    <em-sticky ref="emSticky" :container="container">
        <em-button type="warning" custom-style="margin-left: 215px;">指定容器</em-button>
    </em-sticky>
</div>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            id: 'container-id',
            container: ''
        };
    },
    methods: {
        getContainer() {
            if (this.container) {
                // 若已注册过方法，需要将该方法删除
                this.$refs.emSticky.releaseFunc(this.container);
            }
            let selector = `#${this.id}`;
            // wrapFunc 会将传入的方法注册到一个内部对象上，再将方法的key返回
            // sticky组件则根据这个key查找对应的方法，获取容器节点
            this.container = this.$refs.emSticky.wrapFunc(() => {
                // 传入的方法中需要返回容器的 NodesRef 对象实例
                let c;

                // #ifndef MP-ALIPAY
                c = uni.createSelectorQuery().in(this).select(selector);
                // #endif
                // #ifdef MP-ALIPAY
                c = uni.createSelectorQuery().select(selector);
                // #endif

                return c;
            });
        }
    },
    mounted() {
        this.getContainer();
    },
    destroy() {
        if (this.container) {
            // 组件销毁时也需要释放对应的方法
            this.$refs.emSticky.releaseFunc(this.container);
        }
    },
    // #ifdef MP-WEIXIN || MP-ALIPAY
    // 微信/支付宝小程序下的滚动事件,如不加,则在微信/支付宝环境下不可滚动
    onPageScroll() {}
    // #endif
};
```

::: endif
::: ifdef M84

```js
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { onPageScroll } from '@dcloudio/uni-app';

const id = 'container-id';
const container = ref('');
const emSticky = ref(null);

const getContainer = () => {
    if (container.value) {
        // 若已注册过方法，需要将该方法删除
        emSticky.value.releaseFunc(container.value);
    }
    let selector = `#${id}`;
    // wrapFunc 会将传入的方法注册到一个内部对象上，再将方法的key返回
    // sticky组件则根据这个key查找对应的方法，获取容器节点
    container.value = emSticky.value.wrapFunc(() => {
        // 传入的方法中需要返回容器的 NodesRef 对象实例
        let c;

        // #ifndef MP-ALIPAY
        c = uni.createSelectorQuery().in(this).select(selector);
        // #endif
        // #ifdef MP-ALIPAY
        c = uni.createSelectorQuery().select(selector);
        // #endif

        return c;
    });
};

onMounted(() => {
    getContainer();
});

onBeforeUnmount(() => {
    if (container.value) {
        // 组件销毁时也需要释放对应的方法
        emSticky.value.releaseFunc(container.value);
    }
});

// #ifdef MP-WEIXIN || MP-ALIPAY
// 微信/支付宝小程序下的滚动事件,如不加,则在微信/支付宝环境下不可滚动
const onPageScroll = () => {};
// #endif
```

::: endif

### API

#### Props

| 参数       |                             说明                              | 类型            | 默认值 |
| :--------- | :-----------------------------------------------------------: | :-------------- | :----- |
| offset-top | 吸顶时与顶部的距离，支持 `px` `vw` `rem` `vh` 单位，默认 `px` | number / string | `0`    |
| z-index    |                      吸顶时的 `z-index`                       | number / string | `99`   |
| container  |                           指定容器                            | string          | -      |

#### Events

| 事件名 |         说明         | 回调参数                                       |
| :----- | :------------------: | :--------------------------------------------- |
| change | 当吸顶状态改变时触发 | isFixed: boolean                               |
| scroll |      滚动时触发      | { scrollTop: 距离顶部位置, isFixed: 是否吸顶 } |

#### 方法

| 事件名      |                      说明                      | 参数         |
| :---------- | :--------------------------------------------: | :----------- |
| wrapFunc    | 将传入的方法注册到内部对象上，并返回对应的 key | cb: Function |
| releaseFunc |           从内部对象中删除对应的方法           | key: string  |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-sticky"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-sticky"
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
