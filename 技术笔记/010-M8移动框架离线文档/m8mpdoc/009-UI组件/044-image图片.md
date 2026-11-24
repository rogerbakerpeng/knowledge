# 组件使用

## image 图片

### 介绍

-   增强版的 `img` 标签，提供多种图片填充模式，支持图片懒加载、加载中提示、加载失败提示。

::: ifdef M83

-   `v8.3.11`开始支持 weex 端使用

::: endif

### 代码演示

#### 基础用法

基础用法与原生`img`标签一致，可以设置`src`、`width`、`height`等原生属性。

```html
<em-image width="100" height="100" src="https://img.yzcdn.cn/vant/cat.jpeg" />
```

#### 填充模式

通过`fit`属性可以设置图片填充模式，可选值见下方表格

```html
<em-image width="10rem" height="10rem" fit="contain" src="https://img.yzcdn.cn/vant/cat.jpeg" />
```

#### 圆形图片

通过`round`属性可以设置图片变圆，注意当图片宽高不相等且`fit`为`contain`或`scale-down`时，将无法填充一个完整的圆形。

```html
<em-image round width="10rem" height="10rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
```

#### 图片懒加载

设置`lazy-load`属性来开启图片懒加载

```html
<em-image width="100" height="100" lazy-load src="https://img.yzcdn.cn/vant/cat.jpeg" />
```

#### 加载中提示

`Image`组件提供了默认的加载中提示，支持通过`loading`插槽自定义内容

```html
<em-image src="https://img.yzcdn.cn/vant/cat.jpeg">
    <template v-slot:loading>
        <em-loading type="spinner" size="20" />
    </template>
</em-image>
```

#### 加载失败提示

`Image`组件提供了默认的加载失败提示，支持通过`error`插槽自定义内容

```html
<em-image src="https://img.yzcdn.cn/vant/cat.jpeg">
    <template v-slot:error>加载失败</template>
</em-image>
```

### API

#### Props

| 参数         |                              说明                              | 类型            | 默认值                                   | ::: ifdef M83 weex 端支持 ::: endif |
| :----------- | :------------------------------------------------------------: | :-------------- | :--------------------------------------- | :---------------------------------- |
| src          |                            图片链接                            | string          | -                                        | 是                                  |
| fit          |                          图片填充模式                          | string          | 默认为`fill`，注意：`scale-down`属性无效 | 是(支持部分)                        |
| width        |                      宽度，默认单位为`px`                      | number / string | 100                                      | 是                                  |
| height       |                      高度，默认单位为`px`                      | number / string | 100                                      | 是                                  |
| radius       |                    圆角大小，默认单位为`px`                    | number / string | `0`                                      | 是                                  |
| round        |                         是否显示为圆形                         | boolean         | `false`                                  | 是                                  |
| lazy-load    | 是否开启图片懒加载，只针对`page`与`scroll-view`下的 image 有效 | boolean         | `false`                                  | 否                                  |
| show-error   |                    是否展示图片加载失败提示                    | boolean         | `true`                                   | 是                                  |
| show-loading |                     是否展示图片加载中提示                     | boolean         | `true`                                   | 是                                  |
| error-icon   |                 失败时提示的图标名称或图片链接                 | string          | `photo-fail`                             | 是                                  |
| loading-icon |                 加载时提示的图标名称或图片链接                 | string          | `photo`                                  | 是                                  |
| icon-prefix  |       图标类名前缀，同 `Icon` 组件的 `class-prefix` 属性       | string          | `van-icon`                               | 否                                  |

#### 图片填充模式

| 名称    |                          含义                          | ::: ifdef M83 weex 端支持 ::: endif |
| :------ | :----------------------------------------------------: | :---------------------------------- |
| contain |      保持宽高缩放图片，使图片的长边能完全显示出来      | 是                                  |
| cover   | 保持宽高缩放图片，使图片的短边能完全显示出来，裁剪长边 | 是                                  |
| fill    |                拉伸图片，使图片填满元素                | 是                                  |
| none    |                    保持图片原有尺寸                    | 否                                  |

#### Events

| 事件名 |        说明        |   回调参数   |
| :----- | :----------------: | :----------: |
| click  |   点击图片时触发   | event: Event |
| load   | 图片加载完毕时触发 |      -       |
| error  | 图片加载失败时触发 |      -       |

#### Slots

| 名称              |            说明            |
| :---------------- | :------------------------: |
| default `v8.3.11` |    自定义图片下方的内容    |
| loading           |   自定义加载中的提示内容   |
| error             | 自定义加载失败时的提示内容 |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-image"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-image"
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
