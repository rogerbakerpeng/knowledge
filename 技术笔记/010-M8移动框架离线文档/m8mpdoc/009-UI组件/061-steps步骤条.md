# 组件使用

## steps 步骤条

### 介绍

-   步骤条。

### 代码演示

#### 基础用法

`active`属性表示当前步骤的索引，从 `0` 起计

```html
<em-steps :active="active">
    <em-step>买家下单</em-step>
    <em-step>商家接单</em-step>
    <em-step>买家提货</em-step>
    <em-step>交易完成</em-step>
</em-steps>
```

#### 自定义样式

可以通过`active-icon`和`active-color`属性设置激活状态下的图标和颜色

```html
<em-steps :active="active" active-icon="success" active-color="#38f" inactive-color="#f00">
    <em-step>买家下单</em-step>
    <em-step>商家接单</em-step>
    <em-step>买家提货</em-step>
    <em-step>交易完成</em-step>
</em-steps>
```

#### 竖向步骤条

可以通过设置`direction`属性来改变步骤条的显示方向

```html
<em-steps direction="vertical" :active="active">
    <em-step>
        <h5>【城市】物流状态1</h5>
        <p>2016-07-12 12:40</p>
    </em-step>
    <em-step>
        <h5>【城市】物流状态2</h5>
        <p>2016-07-11 10:00</p>
    </em-step>
    <em-step>
        <h5>【城市】物流状态3</h5>
        <p>2016-07-11 10:00</p>
    </em-step>
    <em-step>
        <h5>快件已发货</h5>
        <p>2016-07-10 09:30</p>
    </em-step>
</em-steps>
```

### API

#### Steps Props

| 参数           |                                     说明                                      | 类型            | 默认值       |
| :------------- | :---------------------------------------------------------------------------: | :-------------- | :----------- |
| active         |                                   当前步骤                                    | number / string | `0`          |
| direction      |                         显示方向，可选值为 `vertical`                         | string          | `horizontal` |
| active-color   |                                 激活状态颜色                                  | string          | `#36B389`    |
| inactive-color |                                未激活状态颜色                                 | string          | `#999`       |
| active-icon    |                    激活状态底部图标，可选值见 `Icon` 组件                     | string          | `checked`    |
| inactive-icon  |                   未激活状态底部图标，可选值见 `Icon` 组件                    | string          | -            |
| finish-icon    | 已完成步骤对应的底部图标，优先级高于 `inactive-icon`，可选值见 `em-icon` 组件 | string          | -            |

#### Step Slots

| 名称         |                           说明                            |
| :----------- | :-------------------------------------------------------: |
| activeIcon   |                    自定义激活状态图标                     |
| inactiveIcon |                   自定义未激活状态图标                    |
| finishIcon   | 自定义已完成步骤对应的底部图标，优先级高于 `inactiveIcon` |

#### Steps Events

| 事件名     |            说明            |   回调参数    |
| :--------- | :------------------------: | :-----------: |
| click-step | 点击步骤的标题或图标时触发 | index: number |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-steps"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-steps"
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
