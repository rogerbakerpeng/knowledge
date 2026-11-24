# 组件使用

## skeleton 骨架屏

### 介绍

-   骨架屏。

::: ifdef M83

-   `v8.3.11`开始支持 weex 端使用

::: endif

### 代码演示

#### 基础用法

通过`title`属性显示标题占位图，通过`row`属性配置占位段落行数

```html
<em-skeleton title :row="3" />
```

#### 显示头像

通过`avatar`属性显示头像占位图

```html
<em-skeleton title avatar :row="3" />
```

#### 展示子组件

将`loading`属性设置成`false`表示内容加载完成，此时会隐藏占位图，并显示`Skeleton`的子组件

```html
<em-skeleton title avatar :row="3" :loading="loading">
    <div>实际内容</div>
</em-skeleton>
```
::: ifdef M83
```js
export default {
    data() {
        return {
            loading: true
        };
    },
    mounted() {
        this.loading = false;
    }
};
```
::: endif
::: ifdef M84
```js
import { ref, onMounted } from 'vue';

const loading = ref(true);

onMounted(() => {
    loading.value = false;
});
```
::: endif

### API

#### Props

| 参数         |                               说明                               | 类型                                  | 默认值  | ::: ifdef M83 weex 端支持 ::: endif |
| :----------- | :--------------------------------------------------------------: | :------------------------------------ | :------ | :---------------------------------- |
| row          |                          段落占位图行数                          | number / string                       | `0`     | 是                                  |
| row-width    | 段落占位图宽度，可传数组来设置每一行的宽度, 传数字时默认是百分比 | number / string / (number / string)[] | `100%`  | 是                                  |
| title        |                        是否显示标题占位图                        | boolean                               | `false` | 是                                  |
| avatar       |                        是否显示头像占位图                        | boolean                               | `false` | 是                                  |
| loading      |          是否显示骨架屏，传 `false` 时会展示子组件内容           | boolean                               | `true`  | 是                                  |
| animate      |                           是否开启动画                           | boolean                               | `true`  | 是                                  |
| round        |                  是否将标题和段落显示为圆角风格                  | boolean                               | `false` | 是                                  |
| title-width  |               标题占位图宽度，传数字时默认是百分比               | number / string                       | `40%`   | 是                                  |
| avatar-size  |              头像占位图大小，传数字时默认单位为`px`              | number / string                       | `32px`  | 是                                  |
| avatar-shape |                 头像占位图形状，可选值为`square`                 | string                                | `round` | 是                                  |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-skeleton"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-skeleton"
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
