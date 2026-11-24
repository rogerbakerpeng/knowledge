# 组件使用

## panel 面板

### 介绍

- 面板组件。

### 代码演示

#### 基础用法

面板只是一个容器，里面可以放入自定义的内容。

```html
<em-panel title="标题" desc="描述信息" status="状态">
  <view>内容</view>
</em-panel>
```

#### 高级用法

使用 slot 自定义内容。

```html
<em-panel title="标题" desc="描述信息" status="状态" use-footer-slot>
  <view class="content">内容</view>
  <view slot="footer" class="footer">
    <em-button size="small" class="demo-margin-right">按钮</em-button>
    <em-button size="small" type="danger">按钮</em-button>
  </view>
</em-panel>
```

### API

#### Props

| 参数            |            说明            | 类型    | 默认值  |
| :-------------- | :------------------------: | :------ | :------ |
| title           |            标题            | string  | -       |
| desc            |            描述            | string  | -       |
| status          |            状态            | string  | -       |
| icon            | 标题左侧图标名称或图片链接 | string  | -       |
| border          |     是否显示标题的边框     | boolean | `true`  |
| use-footer-slot |    是否使用 footer 插槽    | boolean | `false` |

#### Slots

| 名称    |    说明    | 
| :------ | :--------: | 
| default | 自定义内容 | 
| header  |   自定义   | 
| footer  |   自定义   |

::: ifdef M83

<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-panel"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-panel"
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
