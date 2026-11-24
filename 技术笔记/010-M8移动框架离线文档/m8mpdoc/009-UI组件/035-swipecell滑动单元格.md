# 组件使用

## swipecell 滑动单元格

### 介绍

-   滑动单元格组件。

### 代码演示

#### 基础用法

`SwipeCell`组件提供了`left`和`right`两个插槽，用于定义两侧滑动区域的内容。

```html
<em-swipe-cell>
    <template #left>
        <em-button type="primary" square>选择</em-button>
    </template>
    <em-cell title="单元格" value="内容" :border="false"></em-cell>
    <template #right>
        <em-button type="danger" square>删除</em-button>
        <em-button type="primary" square>收藏</em-button>
    </template>
</em-swipe-cell>
```

#### 自定义内容

SwipeCell 内容可以嵌套任意内容，比如嵌套一个 Image

```html
<em-swipe-cell>
    <em-image width="100" height="100" src="https://img.yzcdn.cn/vant/cat.jpeg" />
    <template #right>
        <em-button type="danger" square>关闭</em-button>
    </template>
</em-swipe-cell>
```

#### 异步关闭

通过传入`before-close`回调函数，可以自定义两侧滑动内容关闭时的行为

::: ifdef M83

```html
<em-swipe-cell
    left-width="100"
    right-width="200"
    :before-close="beforeClose"
    ref="swipecell"
    @open="onOpen"
    @close="onClose"
    @click="onClick"
>
    <template #left>
        <em-button type="primary" square>选择</em-button>
    </template>
    <em-cell title="单元格" value="内容" :border="false"></em-cell>
    <template #right>
        <em-button type="danger" square>异步关闭</em-button>
    </template>
</em-swipe-cell>
<em-button type="primary" square @click="openLeft">打开左侧</em-button>
<em-toast ref="emToast"></em-toast>
```

```js
export default {
    methods: {
        // position 为关闭时点击的位置
        // instance 为对应的 SwipeCell 实例
        beforeClose({ position, instance }) {
            switch (position) {
                case 'left':
                case 'cell':
                    instance.close();
                    break;
                case 'right':
                    setTimeout(() => {
                        instance.close();
                    }, 2000);
                    break;
                default:
                    break;
            }
        },
        openLeft() {
            this.$refs.swipecell.open('left');
        },
        onOpen(e) {
            Toast({
                message: `触发open事件：${JSON.stringify(e)}`
            });
        },
        onClose(e) {
            Toast({
                message: `触发close事件：${JSON.stringify(e)}`
            });
        },
        onClick(e) {
            Toast({
                message: `触发click事件：${JSON.stringify(e)}`
            });
        }
    }
};
```

::: endif
::: ifdef M84

```html
<em-swipe-cell
    left-width="100"
    right-width="200"
    :before-close="beforeClose"
    ref="swipecell"
    @open="onOpen"
    @close="onClose"
    @click="onClick"
>
    <template #left>
        <em-button type="primary" square>选择</em-button>
    </template>
    <em-cell title="单元格" value="内容" :border="false"></em-cell>
    <template #right>
        <em-button type="danger" square>异步关闭</em-button>
    </template>
</em-swipe-cell>
<em-button type="primary" square @click="openLeft">打开左侧</em-button>
<em-toast ref="emToastRef"></em-toast>
```

```js
import { ref } from 'vue';
const swipecell = ref(null);

const beforeClose = ({ position, instance }) => {
    switch (position) {
        case 'left':
        case 'cell':
            instance.close();
            break;
        case 'right':
            setTimeout(() => {
                instance.close();
            }, 2000);
            break;
        default:
            break;
    }
};

const openLeft = () => {
    swipecell.value.open('left');
};

const onOpen = (e) => {
    Toast({
        message: `触发open事件：${JSON.stringify(e)}`
    });
};

const onClose = (e) => {
    Toast({
        message: `触发close事件：${JSON.stringify(e)}`
    });
};

const onClick = (e) => {
    Toast({
        message: `触发click事件：${JSON.stringify(e)}`
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

| 参数             |               说明               | 类型            | 默认值  |
| :--------------- | :------------------------------: | :-------------- | :------ |
| name             |  标识符，可以在事件参数中获取到  | number / string | -       |
| left-width       | 指定左侧滑动区域宽度，单位为`px` | number / string | `auto`  |
| right-width      | 指定右侧滑动区域宽度，单位为`px` | number / string | `auto`  |
| before-close     |         关闭前的回调函数         | Function        | -       |
| disabled         |           是否禁用滑动           | boolean         | `false` |
| stop-propagation |       是否阻止滑动事件冒泡       | boolean         | `false` |
| threshold        |           滑动缺省距离           | Number          | `20px`  |

#### Slots

| 名称    |      说明      |
| :------ | :------------: |
| default | 自定义显示内容 |
| left    |  左侧滑动内容  |
| right   |  右侧滑动内容  |

#### Events

| 事件名 |    说明    | 回调参数                                      |
| :----- | :--------: | :-------------------------------------------- |
| click  | 点击时触发 | 关闭时的点击位置 (left right cell)            |
| open   | 打开时触发 | { position: 'left' / 'right' , name: string } |
| close  | 关闭时触发 | { position: string , name: string }           |

#### beforeClose 参数

`beforeClose` 的第一个参数为对象，对象中包含以下属性：

| 参数名   |                   说明                   | 类型        |
| :------- | :--------------------------------------: | :---------- |
| name     |                  标识符                  | string      |
| position | 关闭时的点击位置 (`left` `right` `cell`) | string      |
| instance |    `SwipeCell` 实例，用于调用实例方法    | `SwipeCell` |

#### 方法

通过 `ref` 可以获取到 `SwipeCell` 实例并调用实例方法，详见组件实例方法

| 方法名 |       说明       | 参数                   | 返回值 |
| :----- | :--------------: | :--------------------- | :----- |
| open   | 打开单元格侧边栏 | position: left / right | -      |
| close  | 收起单元格侧边栏 | -                      | -      |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-swipe-cell"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-swipe-cell"
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
