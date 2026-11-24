# 组件使用

## rate 评分

### 介绍

-   评分组件。

### 代码演示

#### 基础用法

```html
<em-rate v-model="value" />
```

::: ifdef M83

```js
export default {
    data() {
        return {
            value: 3
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const value = ref(3);
```

::: endif

#### 自定义图标

```html
<em-rate v-model="value" icon="like" void-icon="like-o" />
自定义样式
<em-rate v-model="value" :size="25" color="#ffd21e" void-icon="star" void-color="#eee" />
```

#### 半星

```html
<em-rate v-model="value" allow-half void-icon="star" void-color="#eee" />
```

::: ifdef M83

```js
export default {
    data() {
        return {
            value: 2.5
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const value = ref(2.5);
```

::: endif

#### 自定义数量

::: ifdef M83

```html
<em-rate v-model="value" :count="6" />
禁用状态
<em-rate v-model="value" disabled />
只读状态
<em-rate v-model="value" readonly />
监听 change 事件
<em-rate v-model="value" @change="onChange" />
<em-toast ref="emToast"></em-toast>
```

```js
export default {
    method: {
        onChange(value) {
            Toast({
                message: '当前值：' + value
            });
        }
    }
};
```

::: endif
::: ifdef M84

```html
<em-rate v-model="value" :count="6" />
禁用状态
<em-rate v-model="value" disabled />
只读状态
<em-rate v-model="value" readonly />
监听 change 事件
<em-rate v-model="value" @change="onChange" />
<em-toast ref="emToastRef"></em-toast>
```

```js
import { ref } from 'vue';
const onChange = (value) => {
    Toast({
        message: '当前值：' + value
    });
};
const emToastRef = ref(null);

defineExpose({
    emToastRef
});
```

::: endif

### API

#### Props

| 参数                                                                         |                        说明                        | 类型            | 默认值     |
| :--------------------------------------------------------------------------- | :------------------------------------------------: | :-------------- | :--------- |
| v-model ::: ifdef M83 (value) ::: endif ::: ifdef M84 (modelValue) ::: endif |                      当前分值                      | number          | -          |
| count                                                                        |                      图标总数                      | number / string | `5`        |
| size                                                                         |              图标大小，默认单位为`px`              | number / string | `20px`     |
| gutter                                                                       |              图标间距，默认单位为`px`              | number / string | `4px`      |
| color                                                                        |                    选中时的颜色                    | string          | `#e03f3f`  |
| void-color                                                                   |                   未选中时的颜色                   | string          | `#b8becc`  |
| disabled-color                                                               |                    禁用时的颜色                    | string          | `#b8becc`  |
| icon                                                                         |             选中时的图标名称或图片链接             | string          | `star`     |
| void-icon                                                                    |            未选中时的图标名称或图片链接            | string          | `star-o`   |
| icon-prefix                                                                  | 图标类名前缀，同 `Icon` 组件的 `class-prefix` 属性 | string          | `van-icon` |
| allow-half                                                                   |                    是否允许半选                    | boolean         | `false`    |
| readonly                                                                     |                   是否为只读状态                   | boolean         | `false`    |
| disabled                                                                     |                    是否禁用评分                    | boolean         | `false`    |
| touchable                                                                    |            是否可以通过滑动手势选择评分            | boolean         | `true`     |

#### Events

| 事件名 |           说明           | 回调参数 |
| :----- | :----------------------: | :------- |
| change | 当前分值变化时触发的事件 | 当前分值 |
| input  | 当前分值滑动时触发的事件 | 当前分值 |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-rate"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-rate"
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
