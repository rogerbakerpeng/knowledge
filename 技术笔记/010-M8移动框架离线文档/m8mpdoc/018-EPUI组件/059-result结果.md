# Result 结果

用于对用户的操作结果或者异常状态做反馈。

## 基本用法

```html
<e-result-m
  title="Success Tip"
  sub-title="Please follow the instructions"
  icon="success"
>
  <template #extra>
    <e-button-m type="primary">Back</e-button-m>
  </template>
</e-result-m>

<e-result-m
  title="Warning Tip"
  sub-title="Please follow the instructions"
  icon="warning"
>
  <template #extra>
    <e-button-m type="primary">Back</e-button-m>
  </template>
</e-result-m>

<e-result-m
  title="Error Tip"
  sub-title="Please follow the instructions"
  icon="error"
>
  <template #extra>
    <e-button-m type="primary">Back</e-button-m>
  </template>
</e-result-m>

<e-result-m
  title="Info Tip"
  sub-title="Please follow the instructions"
  icon="info"
>
  <template #extra>
    <e-button-m type="primary">Back</e-button-m>
  </template>
</e-result-m>
```

## 自定义内容

```html
<e-result-m title="404" sub-title="Sorry, request error">
  <template #icon>
    <img
      src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
      alt=""
    />
  </template>
  <template #extra>
    <e-button-m type="primary">Back</e-button-m>
  </template>
</e-result-m>
```

## API

### Attributes

| Name      | Description    | Type                                             | Default |
| --------- | -------------- | ------------------------------------------------ | ------- |
| title     | 结果的标题     | string                                           | ''      |
| sub-title | 结果的副标题   | string                                           | ''      |
| icon      | 结果的图标类型 | `enum` `｜'success'｜'warning'｜'info'｜'error'` | info    |

### Slots

| Name      | Description            |
| --------- | ---------------------- |
| icon      | 作为结果图标的内容     |
| title     | 作为结果标题的内容     |
| sub-title | 作为结果副标题的内容   |
| extra     | 作为结果额外区域的内容 |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-result-m"
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