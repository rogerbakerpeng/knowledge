# 组件使用

## imagepreview 图片预览

### 介绍

-   图片放大预览，支持函数调用和组件调用两种方式。

### 引入

手动引入时的引入路径：

```js
import ImagePreview from '@components/em-image-preview/index.js';
```

ImagePreview 作为全局函数，跨端框架为其提供了全局注入的功能，使用该函数时，框架会自动引入上述路径，所以在跨端框架中使用时，不必再手动引入。

### 调用方式

#### 函数调用

通过函数调用 imagePreview 组件时，需要在页面上放一个 imagePreview 节点，且提供一个 ref 方便函数进行查找。

::: ifdef M83
该 ref 值默认为 emImagePreview。
::: endif
::: ifdef M84
该 ref 值默认为 emImagePreviewRef。
::: endif

::: ifdef M83

```html
<em-image-preview ref="emImagePreview"></em-image-preview>
```

```js
ImagePreview(['https://img.yzcdn.cn/vant/apple-1.jpg']);
```

::: endif

::: ifdef M84

```html
<em-image-preview ref="emImagePreviewRef"></em-image-preview>
```

```js
import { ref } from 'vue';

const emImagePreviewRef = ref(null);
ImagePreview(['https://img.yzcdn.cn/vant/apple-1.jpg']);
defineExpose({
    emImagePreviewRef
});
```

::: endif

#### 组件调用

ImagePreview 也可以像常规的组件一样通过组件调用的形式来使用

### 代码演示

#### 基础用法

直接传入图片数组，即可展示图片预览。

```js
ImagePreview(['https://img.yzcdn.cn/vant/apple-1.jpg', 'https://img.yzcdn.cn/vant/apple-2.jpg']);
```

#### 传入配置项

通过传入配置对象，可以指定初始图片的位置、监听关闭事件。

```js
ImagePreview({
    images: ['https://img.yzcdn.cn/vant/apple-1.jpg', 'https://img.yzcdn.cn/vant/apple-2.jpg'],
    startPosition: 1,
    onClose() {
        // do something
    }
});
```

#### 展示关闭按钮

设置`closeable`属性后，会在弹出层的右上角显示关闭图标，并且可以通过`close-icon`属性自定义图标，使用`close-icon-position`属性可以自定义图标位置。

```js
ImagePreview({
    images: ['https://img.yzcdn.cn/vant/apple-1.jpg', 'https://img.yzcdn.cn/vant/apple-2.jpg'],
    closeable: true
});
```

#### 异步关闭

通过`asyncClose`属性可以开启异步关闭，开启后异步关闭后，只能通过实例上的 `close` 方法关闭图片预览。

```js
const instance = ImagePreview({
    images: ['https://img.yzcdn.cn/vant/apple-1.jpg', 'https://img.yzcdn.cn/vant/apple-2.jpg'],
    asyncClose: true
});

setTimeout(() => {
    instance.close();
}, 1000);
```

#### 组件调用

如果需要在图片预览内嵌入组件或其他自定义内容，可以使用组件调用的方式。

```html
<em-image-preview v-model="show" :images="images" @change="onChange">
    <template v-slot:index>第{{ index }}页</template>
</em-image-preview>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            show: false,
            index: 0,
            images: ['https://img.yzcdn.cn/vant/apple-1.jpg', 'https://img.yzcdn.cn/vant/apple-2.jpg']
        };
    },

    methods: {
        onChange(index) {
            this.index = index;
        }
    }
};
```

::: endif

::: ifdef M84

```js
import { ref } from 'vue';

const show = ref(false);
const index = ref(0);
const images = ['https://img.yzcdn.cn/vant/apple-1.jpg', 'https://img.yzcdn.cn/vant/apple-2.jpg'];

const emImagePreviewRef = ref(null);

const onChange = (index) => {
    index.value = index;
};
```

::: endif

### API

#### Options

通过函数调用 `ImagePreview` 时，支持传入以下选项：

| 参数名            |                                 说明                                  | 类型            | 默认值           |
| :---------------- | :-------------------------------------------------------------------: | :-------------- | :--------------- |
| context           | ImagePreview 节点上下文，传入后只在该$vm 节点下查找 ImagePreview 节点 | vue 实例        | 当前页面         |
| selector          |           ImagePreview 节点的 ref，函数根据该 ref 进行查找            | string          | `emImagePreview` |
| images            |                       需要预览的图片 `URL` 数组                       | string[]        | `[]`             |
| startPosition     |                         图片预览起始位置索引                          | number / string | `0`              |
| swipeDuration     |                         动画时长，单位为`ms`                          | number / string | `300`            |
| showIndex         |                             是否显示页码                              | boolean         | `true`           |
| showIndicators    |                          是否显示轮播指示器                           | boolean         | `false`          |
| loop              |                           是否开启循环播放                            | boolean         | `true`           |
| onClose           |                           关闭时的回调函数                            | Function        | -                |
| onChange          |               切换图片时的回调函数，回调参数为当前索引                | Function        | -                |
| onScale           |    缩放图片时的回调函数，回调参数为当前索引和当前缩放值组成的对象     | Function        | -                |
| onClick           |               点击图片时的回调函数，回调参数为当前索引                | Function        | -                |
| asyncClose        |                           是否开启异步关闭                            | boolean         | `false`          |
| closeOnPopstate   |                       是否在页面回退时自动关闭                        | boolean         | `true`           |
| maxZoom           |                       手势缩放时，最大缩放比例                        | number / string | `3`              |
| minZoom           |                       手势缩放时，最小缩放比例                        | number / string | `1/3`            |
| closeable         |                           是否显示关闭图标                            | boolean         | `false`          |
| closeIcon         |                        关闭图标名称或图片链接                         | string          | `clear`          |
| closeIconPosition |     关闭图标位置，可选值为`top-left` `bottom-left` `bottom-right`     | string          | `top-right`      |

#### Props

通过组件调用 `ImagePreview` 时，支持以下 `Props`：

| 参数                |                             说明                              | 类型            | 默认值      |
| :------------------ | :-----------------------------------------------------------: | :-------------- | :---------- |
| images              |                   需要预览的图片 `URL` 数组                   | string[]        | `[]`        |
| start-position      |                     图片预览起始位置索引                      | number / string | `0`         |
| swipe-duration      |                     动画时长，单位为 `ms`                     | number / string | `500`       |
| show-index          |                         是否显示页码                          | boolean         | `true`      |
| show-indicators     |                      是否显示轮播指示器                       | boolean         | `false`     |
| loop                |                       是否开启循环播放                        | boolean         | `true`      |
| async-close         |                       是否开启异步关闭                        | boolean         | `false`     |
| close-on-popstate   |                   是否在页面回退时自动关闭                    | boolean         | `true`      |
| max-zoom            |                   手势缩放时，最大缩放比例                    | number / string | `3`         |
| min-zoom            |                   手势缩放时，最小缩放比例                    | number / string | `1/3`       |
| closeable           |                       是否显示关闭图标                        | boolean         | `false`     |
| close-icon          |                    关闭图标名称或图片链接                     | string          | `clear`     |
| close-icon-position | 关闭图标位置，可选值为`top-left` `bottom-left` `bottom-right` | string          | `top-right` |

#### Events

通过组件调用 `ImagePreview` 时，支持以下事件：

| 事件   |          说明          | 回调参数                                       |
| :----- | :--------------------: | :--------------------------------------------- |
| close  |       关闭时触发       | { index: 索引, url: 图片链接 }                 |
| closed | 关闭且且动画结束后触发 | -                                              |
| change |   切换当前图片时触发   | index: 当前图片的索引                          |
| scale  |   缩放当前图片时触发   | { index: 当前图片的索引, scale: 当前缩放的值 } |
| click  |     点击图片时触发     | index: 当前图片的索引                          |

#### 方法

通过 `ref` 可以获取到 `ImagePreview` 实例并调用实例方法，详见组件实例方法。

| 方法名  |      说明      | 参数                            | 返回值 |
| :------ | :------------: | :------------------------------ | :----- |
| swipeTo | 切换到指定位置 | index: number, options: Options | -      |

##### swipeTo Options 格式

| 名称      |     说明     | 类型      |
| :-------- | :----------: | :-------- |
| immediate | 是否跳过动画 | `boolean` |

#### Slots

通过组件调用 `ImagePreview` 时，支持以下插槽：

| 名称  | 说明                           |
| :---- | :----------------------------- |
| index | 自定义页码内容                 |
| cover | 自定义覆盖在图片预览上方的内容 |

#### onClose 回调参数

| 参数名 | 说明             | 类型   |
| :----- | :--------------- | :----- |
| url    | 当前图片 URL     | string |
| index  | 当前图片的索引值 | number |

#### onScale 回调参数

| 参数名 | 说明             | 类型   |
| :----- | :--------------- | :----- |
| index  | 当前图片的索引值 | number |
| scale  | 当前图片的缩放值 | number |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-image-preview"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-image-preview"
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
