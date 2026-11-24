# 组件使用

## lazyload 懒加载

### 介绍

-   懒加载组件。

注：在微信和支付宝小程序下，页面上需要添加`onPageScroll`函数用于监听页面滚动，否则该组件会失效。

### 代码演示

#### 基础用法

将需要懒加载的内容放在`em-lazy-component`标签中，即可实现该部分内容的懒加载。

注：图片的懒加载建议直接使用`em-image`提供的`lazy-load`属性，以下仅作示例。

```html
<em-lazy-component>
    <img v-for="img in imageList" :src="img" :key="img" />
</em-lazy-component>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            imageList: [
                'https://img.yzcdn.cn/vant/apple-1.jpg',
                'https://img.yzcdn.cn/vant/apple-2.jpg',
                'https://img.yzcdn.cn/vant/apple-3.jpg',
                'https://img.yzcdn.cn/vant/apple-4.jpg'
            ]
        };
    },
    // #ifdef MP-WEIXIN || MP-ALIPAY
    onPageScroll() {}
    // #endif
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
import { onPageScroll } from '@dcloudio/uni-app';
const imageList = ref([
    'https://img.yzcdn.cn/vant/apple-1.jpg',
    'https://img.yzcdn.cn/vant/apple-2.jpg',
    'https://img.yzcdn.cn/vant/apple-3.jpg',
    'https://img.yzcdn.cn/vant/apple-4.jpg'
]);

// #ifdef MP-WEIXIN || MP-ALIPAY
const onPageScroll = () => {};
// #endif
```

::: endif

#### 背景图懒加载

背景图懒加载需要使用`background-image`，值设置为背景图片的地址，需要注意的是必须声明容器高度。

设置`background-image`时表示只有背景图懒加载。

```html
<em-lazy-component
    v-for="img in imageList"
    :background-image="img"
    :key="img"
    custom-style="height: 250px; width: 100%; margin-bottom: 20px; background-size: 100%;"
>
    内容
</em-lazy-component>
```

### API

#### Options

| 参数             |                     说明                     | 类型          | 默认值 |
| :--------------- | :------------------------------------------: | :------------ | :----- |
| preload          |               预加载高度的比例               | string/number | `1.1`  |
| background-image | 需要懒加载的背景图片，此时只对背景图片懒加载 | string        | -      |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-lazy-component"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-lazy-component"
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
