# 组件使用

## circle 环形进度条

### 介绍

-   环形进度条组件。

### 代码演示

#### 基础用法

`rate`属性表示进度条的目标进度，`v-model`表示动画过程中的实时进度。当`rate`发生变化时，`v-model`会以`speed`的速度变化，直至达到`rate`设定的值。

```html
<em-circle v-model="currentRate" :rate="30" :speed="100" :text="text" />
```

::: ifdef M83

```js
export default {
    data() {
        return {
            currentRate: 0
        };
    },
    computed: {
        text() {
            return this.currentRate.toFixed(0) + '%';
        }
    }
};
```

::: endif
::: ifdef M84

```js
import { ref, computed } from 'vue';
const currentRate = ref(0);

const text = computed(() => {
    return currentRate.value.toFixed(0) + '%';
});
```

::: endif

#### 宽度定制

通过`stroke-width`属性来控制进度条宽度

```html
<em-circle v-model="currentRate" :rate="rate" :stroke-width="6" text="宽度定制" />
```

#### 颜色定制

通过`color`属性来控制进度条颜色，`layer-color`属性来控制轨道颜色

```html
<em-circle v-model="currentRate" :rate="rate" layer-color="#ebedf0" color="#ee0a24" text="颜色定制" />
```

#### 渐变色

`color`属性支持传入对象格式来定义渐变色

```html
<em-circle v-model="currentRate" :rate="rate" :color="gradientColor" text="渐变色" />
```
::: ifdef M83
```js
export default {
    data() {
        return {
            currentRate: 0,
            gradientColor: {
                '0%': '#3fecff',
                '100%': '#6149f6'
            }
        };
    }
};
```
::: endif
::: ifdef M84
```js
import { ref } from 'vue';
const currentRate = ref(0);
const gradientColor = {
    '0%': '#3fecff',
    '100%': '#6149f6'
};
```
::: endif

#### 逆时针方向

将`clockwise`设置为`false`，进度会从逆时针方向开始

```html
<em-circle v-model="currentRate" :rate="rate" :clockwise="false" text="逆时针方向" />
```

#### 大小定制

通过`size`属性设置圆环直径

```html
<em-circle v-model="currentRate" :rate="rate" size="120px" text="大小定制" />
```

### API

#### Props

| 参数                                                                         |                   说明                    | 类型            | 默认值    |
| :--------------------------------------------------------------------------- | :---------------------------------------: | :-------------- | :-------- |
| v-model ::: ifdef M83 (value) ::: endif ::: ifdef M84 (modelValue) ::: endif |                 当前进度                  | number          | -         |
| rate                                                                         |                 目标进度                  | number / string | `100`     |
| size                                                                         |         圆环直径，默认单位为 `px`         | number / string | `100px`   |
| color                                                                        |  进度条颜色，传入对象格式可以定义渐变色   | string / object | `#2e6be5` |
| layer-color                                                                  |                 轨道颜色                  | string          | `white`   |
| fill                                                                         |                 填充颜色                  | string          | -         |
| speed                                                                        |        动画速度（单位为 `rate/s`）        | number / string | `0`       |
| text                                                                         |                   文字                    | string          | -         |
| stroke-width                                                                 |                进度条宽度                 | number / string | `4`       |
| stroke-linecap                                                               | 进度条端点的形状，可选值为`sqaure` `butt` | string          | `round`   |
| clockwise                                                                    |              是否顺时针增加               | boolean         | `true`    |

#### Slots

| 名称    |      说明      |
| :------ | :------------: |
| default | 自定义文字内容 |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-circle"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-circle"
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
