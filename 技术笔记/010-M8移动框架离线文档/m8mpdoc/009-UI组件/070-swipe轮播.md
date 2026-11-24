# 组件使用

## Swipe 轮播

### 介绍

-   用于循环播放一组图片或内容。

::: ifdef M83

-   `v8.3.11`开始支持 weex 端使用

::: endif

### 代码演示

#### 基础用法

每个 SwipeItem 代表一张轮播卡片，可以通过 autoplay 属性设置自动轮播的间隔。

```html
<em-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <em-swipe-item>1</em-swipe-item>
    <em-swipe-item>2</em-swipe-item>
    <em-swipe-item>3</em-swipe-item>
    <em-swipe-item>4</em-swipe-item>
</em-swipe>

<style>
    .my-swipe .em-swipe-item {
        color: #fff;
        font-size: 20px;
        line-height: 150px;
        text-align: center;
        background-color: #39a9ed;
    }
</style>
```

#### 监听 change 事件

::: ifdef M83

```html
<em-swipe @change="onChange">
    <em-swipe-item>1</em-swipe-item>
    <em-swipe-item>2</em-swipe-item>
    <em-swipe-item>3</em-swipe-item>
    <em-swipe-item>4</em-swipe-item>
</em-swipe>
<em-toast ref="emToast"></em-toast>
```

```js
export default {
    methods: {
        onChange(index) {
            Toast({
                message: `当前 Swipe 索引：${index}`
            });
        }
    }
};
```

::: endif
::: ifdef M84

```html
<em-swipe @change="onChange">
    <em-swipe-item>1</em-swipe-item>
    <em-swipe-item>2</em-swipe-item>
    <em-swipe-item>3</em-swipe-item>
    <em-swipe-item>4</em-swipe-item>
</em-swipe>
<em-toast ref="emToastRef"></em-toast>
```

```js
import { ref } from 'vue';
const emToastRef = ref(null); // 创建一个 ref 用于引用 emToast

const onChange = (index) => {
    Toast({
        message: `当前 Swipe 索引：${index}`
    });
};

defineExpose({
    emToastRef
});
```

::: endif

#### 纵向滚动

设置 vertical 属性后滑块会纵向排列，此时需要指定滑块容器的高度。

```html
<em-swipe style="height: 200px;" vertical>
    <em-swipe-item>1</em-swipe-item>
    <em-swipe-item>2</em-swipe-item>
    <em-swipe-item>3</em-swipe-item>
    <em-swipe-item>4</em-swipe-item>
</em-swipe>
```

#### 自定义滑块大小

滑块默认宽度为 100%，可以通过 width 属性设置单个滑块的宽度。纵向滚动模式下，可以通过 height 属性设置单个滑块的高度。

```html
<em-swipe :loop="false" :width="300">
    <em-swipe-item>1</em-swipe-item>
    <em-swipe-item>2</em-swipe-item>
    <em-swipe-item>3</em-swipe-item>
    <em-swipe-item>4</em-swipe-item>
</em-swipe>
```

目前不支持在循环滚动模式下自定义滑块大小，因此需要将 loop 设置为 false。

#### 自定义指示器

通过 indicator 插槽可以自定义指示器的样式。

```html
<em-swipe @change="onChange">
    <em-swipe-item>1</em-swipe-item>
    <em-swipe-item>2</em-swipe-item>
    <em-swipe-item>3</em-swipe-item>
    <em-swipe-item>4</em-swipe-item>
    <template #indicator>
        <div class="custom-indicator">{{ current + 1 }}/4</div>
    </template>
</em-swipe>

<style>
    .custom-indicator {
        position: absolute;
        right: 5px;
        bottom: 5px;
        padding: 2px 5px;
        font-size: 12px;
        background: rgba(0, 0, 0, 0.1);
    }
</style>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            current: 0
        };
    },
    methods: {
        onChange(index) {
            this.current = index;
        }
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';

// 使用 ref 创建响应式数据
const current = ref(0);

// 当索引发生变化时更新 current
const onChange = (index) => {
    current.value = index;
};
```

::: endif

### API

#### Props

| 参数            |           说明            | 类型            | 默认值    | ::: ifdef M83 weex 端支持 ::: endif |
| :-------------- | :-----------------------: | :-------------- | :-------- | :---------------------------------- |
| autoplay        | 自动轮播间隔，单位为 `ms` | number / string |           | 是                                  |
| duration        |   动画时长，单位为 `ms`   | number / string | 500       | 否                                  |
| initial-swipe   |      初始位置索引值       | number / string | 0         | 是                                  |
| width           |   滑块宽度，单位为 `px`   | number / string | `auto`    | 是                                  |
| height          |   滑块高度，单位为 `px`   | number / string | `auto`    | 是                                  |
| loop            |     是否开启循环播放      | boolean         | `true`    | 是                                  |
| show-indicators |      是否显示指示器       | boolean         | `true`    | 是                                  |
| vertical        |      是否为纵向滚动       | boolean         | `false`   | 否                                  |
| touchable       |   是否可以通过手势滑动    | boolean         | `true`    | 是                                  |
| indicator-color |        指示器颜色         | string          | `#2e6be5` | 是                                  |

#### Events

| 事件       |         说明         | 回调参数             |
| :--------- | :------------------: | :------------------- |
| change     | 每一页轮播结束后触发 | `index` 当前页的索引 |
| item-click | 点击某一页轮播时触发 | `index` 当前页的索引 |

#### 方法

通过 `ref` 可以获取到 `Swipe` 实例并调用实例方法，详见组件实例方法。

| 方法名  |                            说明                            | 参数                            | 返回值 |
| :------ | :--------------------------------------------------------: | :------------------------------ | :----- |
| prev    |                       切换到上一轮播                       | -                               | -      |
| next    |                       切换到下一轮播                       | -                               | -      |
| swipeTo |                       切换到指定位置                       | index: number, options: Options | -      |
| resize  | 外层元素大小或组件显示状态变化时，可以调用此方法来触发重绘 | -                               | -      |

##### swipeTo Options 格式

| 名称      |     说明     | 类型      | ::: ifdef M83 weex 端支持 ::: endif |
| :-------- | :----------: | :-------- | :---------------------------------- |
| immediate | 是否跳过动画 | `boolean` | 否                                  |

#### Slots

| 名称      |     说明     |
| :-------- | :----------: |
| default   |   轮播内容   |
| indicator | 自定义指示器 |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-swipe"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-swipe"
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
