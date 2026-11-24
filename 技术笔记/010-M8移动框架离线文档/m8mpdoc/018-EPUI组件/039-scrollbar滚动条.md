# ScrollBar 滚动条

用于替换浏览器原生滚动条。



## 基础用法

通过 `height` 属性设置滚动条高度，若不设置则根据父容器高度自适应。

```html
<template>
    <e-scrollbar-m height="400px">
        <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p>
    </e-scrollbar-m>
</template>

<style lang="scss" scoped>
.scrollbar-demo-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: var(--e-color-primary-light-8);
    color: var(--e-color-primary);
}
</style>
```



## 横向滚动

当元素宽度大于滚动条宽度时，会显示横向滚动条。

```html
<template>
    <e-scrollbar-m>
        <div class="scrollbar-flex-content">
            <p v-for="item in 50" :key="item" class="scrollbar-demo-item">
                {{ item }}
            </p>
        </div>
    </e-scrollbar-m>
</template>
<style lang="scss" scoped>
.scrollbar-flex-content {
	display: flex;
}
.scrollbar-demo-item {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 50px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: var(--e-color-danger-light-7);
    color: var(--e-color-danger);
}
</style>
```



## 最大高度

当元素高度超过最大高度，才会显示滚动条。

```html
<template>
    <div class="cell-buttons">
        <e-button-m size="small" @click="add">添加项</e-button-m>
        <e-button-m size="small" @click="onDelete">删除项</e-button-m>
    </div>
    <e-scrollbar-m max-height="400px">
        <p v-for="item in count" :key="item" class="scrollbar-demo-item">
            {{ item }}
        </p>
    </e-scrollbar-m>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const count = ref(3);
const add = () => {
    count.value++;
};
const onDelete = () => {
    if (count.value > 0) {
        count.value--;
    }
};
</script>

<style lang="scss" scoped>
.cell-buttons {
    padding-left: 10px;
}
.scrollbar-demo-item {
 	display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: var(--e-color-primary-light-8);
    color: var(--e-color-primary);
}
</style>

```



## 手动滚动

通过使用`setScrollTop`与`setScrollLeft`方法，可以手动控制滚动条滚动。

```html
<template>
    <e-scrollbar-m ref="scrollbarRef" height="400px" always @scroll="scroll">
        <div>
            <p v-for="item in 20" :key="item" class="scrollbar-demo-item">
                {{ item }}
            </p>
        </div>
    </e-scrollbar-m>
    <div>
        <text class="tips">当前scrollTop高度{{ curScrollTop }}px</text>
        <div class="cell-buttons">
            <e-button-m size="small" @click="addScrollTop">增加50</e-button-m>
            <e-button-m size="small" @click="reduceScrollTop">减少50</e-button-m>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type {Scrollbar}  from '@epoint-mfe/eui-components';

//滚动条实例
const curScrollTop = ref(0);
const scrollbarRef = ref<InstanceType<typeof Scrollbar>>();
//滚动事件
const scroll = ({ scrollTop }) => {
    curScrollTop.value = scrollTop;
};
//增加scrollTop
const addScrollTop = () => {
    let newVal = curScrollTop.value + 50;
    scrollbarRef.value?.setScrollTop(newVal);
};
//减少scrollTop
const reduceScrollTop = () => {
    let newVal = curScrollTop.value - 50;
    scrollbarRef.value?.setScrollTop(newVal);
};
</script>

<style lang="scss" scoped>
.scrollbar-demo-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: var(--e-color-primary-light-8);
    color: var(--e-color-primary);
}
.tips {
    margin-left: 10px;
    font-size: 13px;
    & + .cell-buttons {
        margin-top: 5px;
    }
}
</style>
```



## API

### Attributes

| Name       | Description                                                  | Type                                                  | Default |
| :--------- | :----------------------------------------------------------- | :---------------------------------------------------- | :------ |
| height     | 滚动条高度                                                   | `string` / `number`                                   | —       |
| max-height | 滚动条最大高度                                               | `string` / `number`                                   | —       |
| native     | 是否使用原生滚动条样式                                       | `boolean`                                             | false   |
| wrap-style | 包裹容器的自定义样式                                         | `string` / `CSSProperties丨CSSProperties[]丨string[]` | —       |
| wrap-class | 包裹容器的自定义类名                                         | `string`                                              | —       |
| view-style | 视图的自定义样式                                             | `string` / `CSSProperties丨CSSProperties[]丨string[]` | —       |
| view-class | 视图的自定义类名                                             | `string`                                              | —       |
| noresize   | 不响应容器尺寸变化，如果容器尺寸不会发生变化，最好设置它可以优化性能 | `boolean`                                             | false   |
| tag        | 视图的元素标签                                               | `string`                                              | div     |
| always     | 滚动条总是显示                                               | `boolean`                                             | false   |
| min-size   | 滚动条最小尺寸                                               | `number`                                              | 20      |
| visible    | 是否显示滚动条                                               | `boolean`                                             | false    |

### Events

| Name   | Description                      | Type                                                  |
| :----- | :------------------------------- | :---------------------------------------------------- |
| scroll | 当触发滚动事件时，返回滚动的距离 | `({ scrollLeft: number, scrollTop: number }) => void` |

### Slots

| Name    | Description    |
| :------ | :------------- |
| default | 自定义默认内容 |

### Exposes

| Name          | Description            | Type                                                      |
| :------------ | :--------------------- | :-------------------------------------------------------- |
| handleScroll  | 触发滚动事件           | `() => void`                                              |
| scrollTo      | 滚动到一组特定坐标     | `(options: ScrollToOptions丨number,yCoord?:number)=>void` |
| setScrollTop  | 设置滚动条到顶部的距离 | `(scrollTop: number) => void`                             |
| setScrollLeft | 设置滚动条到左边的距离 | `(scrollLeft: number) => void`                            |
| update        | 手动更新滚动条状态     | `() => void`                                              |
| wrapRef       | 滚动条包裹的 ref 对象  | `Ref<HTMLDivElement>`                                     |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-scrollbar-m"
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