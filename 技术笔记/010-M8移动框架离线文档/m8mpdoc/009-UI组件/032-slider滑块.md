# 组件使用

## slider 滑块

### 介绍

-   滑块组件。

### 代码演示

#### 基础用法

```html
<em-slider v-model="value" @change="onChange" />
```

::: ifdef M83

```js
export default {
    data() {
        return {
            value: 50
        };
    },
    methods: {
        onChange(value) {
            console.log(`当前值：${value}`);
        }
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const value = ref(50);

const onChange = (newValue) => {
    console.log(`当前值：${newValue}`);
};
```

::: endif

#### 指定选择范围

```html
<em-slider v-model="value" :min="-50" :max="50" />
```

#### 禁用

```html
<em-slider v-model="value" disabled />
```

#### 指定步长

```html
<em-slider v-model="value" :step="10" />
```

#### 自定义样式

```html
<em-slider v-model="value" bar-height="4px" active-color="#ee0a24" />
```

#### 自定义按钮

```html
<em-slider v-model="value" active-color="#ee0a24">
    <template #button>
        <div class="custom-button">{{ value }}</div>
    </template>
</em-slider>

<style>
    .custom-button {
        width: 26px;
        color: #fff;
        font-size: 10px;
        line-height: 18px;
        text-align: center;
        background-color: #ee0a24;
        border-radius: 100px;
    }
</style>
```

#### 垂直方向

`Slider` 垂直展示时，高度为 `100%` 父元素高度

```html
<div :style="{ height: '100px' }">
    <em-slider v-model="value" vertical />
</div>
```

### API

#### Props

| 参数                                                                         |             说明             | 类型            | 默认值    |
| :--------------------------------------------------------------------------- | :--------------------------: | :-------------- | :-------- |
| v-model ::: ifdef M83 (value) ::: endif ::: ifdef M84 (modelValue) ::: endif |        当前进度百分比        | number          | `0`       |
| max                                                                          |            最大值            | number / string | `100`     |
| min                                                                          |            最小值            | number / string | `0`       |
| step                                                                         |             步长             | number / string | `1`       |
| bar-height                                                                   |  进度条高度，默认单位为`px`  | number / string | `2px`     |
| button-size                                                                  | 滑块按钮大小，默认单位为`px` | number / string | `24px`    |
| active-color                                                                 |       进度条激活态颜色       | string          | `#2e6be5` |
| inactive-color                                                               |      进度条非激活态颜色      | string          | `#dde0e4` |
| range                                                                        |      是否开启双滑块模式      | boolean         | `false`   |
| disabled                                                                     |         是否禁用滑块         | boolean         | `false`   |
| vertical                                                                     |         是否垂直展示         | boolean         | `false`   |

#### Events

| 事件名     |           说明           | 回调参数        |
| :--------- | :----------------------: | :-------------- |
| input      |    进度变化时实时触发    | value: 当前进度 |
| change     | 进度变化且结束拖动后触发 | value: 当前进度 |
| drag-start |      开始拖动时触发      | -               |
| drag-end   |      结束拖动时触发      | -               |

#### Slots

| 名称   |      说明      |
| :----- | :------------: |
| button | 自定义滑动按钮 |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-slider"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-slider"
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
