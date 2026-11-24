# Empty 空状态

空状态时的占位提示。

## 基础用法

```html
<e-empty-m description="暂无数据" />
```

## 自定义图片

通过设置 `image` 属性传入图片 URL。

```html
<e-empty-m
  description="自定义图片显示"
  image="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
/>
```

## 图片尺寸

通过使用 `image-size` 属性来控制图片大小。

```html
<e-empty-m description="设置图片大小" :image-size="120" />
```

## 底部内容

使用默认插槽可在底部插入内容。

```html
<e-empty-m>
  <e-button-m type="primary" size="small">添加数据</e-button-m>
</e-empty-m>
```

## API

### Attributes

| Name        | Description                  | Type   | Default |
| ----------- | ---------------------------- | ------ | ------- |
| image       | empty 组件的图像地址         | string | ''      |
| image-size  | empty 组件的图像尺寸（宽度） | number | —       |
| description | empty 组件的描述信息         | string | ''      |

### Slots

| Name        | Description        |
| ----------- | ------------------ |
| default     | 作为底部内容的内容 |
| image       | 作为图像的内容     |
| description | 作为描述的内容     |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-empty-m"
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