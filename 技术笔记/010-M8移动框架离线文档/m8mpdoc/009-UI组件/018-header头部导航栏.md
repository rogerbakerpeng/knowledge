# 组件使用

## header 头部导航栏

### 介绍

-   头部导航栏组件。

### 代码演示

#### 基础用法

::: ifdef M83

```html
<em-header
    title="标题"
    :left-arrow="true"
    left-text="返回"
    right-text="按钮"
    @click-left="onClickLeft"
    @click-right="onClickRight"
></em-header>
<em-toast ref="emToast"></em-toast>
```

```js
export default {
    name: 'Header',
    methods: {
        onClickLeft() {
            Toast('返回');
        },
        onClickRight() {
            Toast('按钮');
        }
    }
};
```

::: endif
::: ifdef M84

```html
<em-header
    title="标题"
    :left-arrow="true"
    left-text="返回"
    right-text="按钮"
    @click-left="onClickLeft"
    @click-right="onClickRight"
></em-header>
<em-toast ref="emToastRef"></em-toast>
```

```js
import { ref } from 'vue';
const emToastRef = ref(null);
const onClickLeft = () => {
    Toast('返回');
};

const onClickRight = () => {
    Toast('按钮');
};

defineExpose({
    emToastRef
});
```

::: endif

#### 使用插槽

通过插槽自定义导航栏两侧的内容

```html
<em-header title="标题" :left-arrow="true" left-text="返回" @click-left="onClickLeft" style="top: 14px;">
    <template #right>
        <em-icon name="search"></em-icon>
    </template>
</em-header>
```

### API

#### Props

| 参数                             |                        说明                        | 类型            | 默认值    |
| :------------------------------- | :------------------------------------------------: | :-------------- | :-------- |
| title                            |                        标题                        | string          | `''`      |
| left-text                        |                      左侧文案                      | string          | `''`      |
| right-text                       |                      右侧文案                      | string          | `''`      |
| left-arrow                       |                  是否显示左侧箭头                  | boolean         | `false`   |
| border                           |                   是否显示下边框                   | boolean         | `true`    |
| backgroundColor                  |                      背景颜色                      | string          | `#fff`    |
| color                            |                      标题颜色                      | string          | `#333`    |
| btnColor                         |                    箭头按钮颜色                    | string          | `#2e6be5` |
| fixed                            |                   是否固定在顶部                   | boolean         | `false`   |
| placeholder                      | 固定在顶部时，是否在标签位置生成一个等高的占位元素 | boolean         | `false`   |
| z-index                          |                   元素 `z-index`                   | number / string | `1`       |
| safe-area-inset-top              |               是否开启顶部安全区适配               | boolean         | `false`   |
| click-left-back `v8.3.16-beta.1` |          点击左上角按钮是否自动返回上一页          | boolean         | `true`    |

#### Slots

| 名称  |        说明        |
| :---- | :----------------: |
| title |     自定义标题     |
| left  | 自定义左侧区域内容 |
| right | 自定义右侧区域内容 |

#### Events

| 事件名      |        说明        | 回调参数 |
| :---------- | :----------------: | :------- |
| click-left  | 点击左侧按钮时触发 | -        |
| click-right | 点击右侧按钮时触发 | -        |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-header"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-header"
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
