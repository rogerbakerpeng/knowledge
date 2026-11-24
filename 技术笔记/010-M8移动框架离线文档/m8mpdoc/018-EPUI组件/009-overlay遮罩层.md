# overlay 遮罩层

## 基础用法

```html
<template>
  <e-button-m type="primary" text="显示遮罩层" @click="show = true" />
  <e-overlay-m :show="show" @click="show = false" />
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  const show = ref(false);
</script>
```

## 嵌入内容

通过默认插槽可以在遮罩层上嵌入任意内容

```html
<template>
  <e-button-m type="primary" text="嵌入内容" @click="show = true" />
  <e-overlay-m :show="show" @click="show = false">
    <div class="wrapper">
      <scroll-view
        scroll-y="true"
        class="scroll-items"
        style="scroll-behavior: smooth"
        @click.stop
      >
        <div v-for="item in 20" :key="item">item</div>
      </scroll-view>
    </div>
  </e-overlay-m>
</template>
<script lang="ts" setup>
  import { ref } from "vue";
  const show = ref(false);
</script>
<style scoped>
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 120px;
    height: 120px;
    background-color: #fff;
  }
</style>
```

## API

### Attributes

| 属性名       | 描述                                                                 | 类型                | 默认值 |
| ------------ | -------------------------------------------------------------------- | ------------------- | ------ |
| show         | 是否展示遮罩层                                                       | `boolean`           | false  |
| z-index      | z-index 层级                                                         | `number` \| `string` |  -     |
| overlay-class | 自定义类                                                         | `string` \| `string[]` \|  `[String, Array, Object]`    |    -    |
| mask         | 控制是否渲染遮罩层                                                       | `boolean`           | true  |
| custom-mask-event  | mask为true时，用于控制遮罩层（mask）的点击事件是否采用自定义处理                    | `boolean`           | false  |
| full         | mask为false时，控制遮罩层的尺寸和行为。为 true 时全屏覆盖；为 false 时其尺寸和位置需由外部样式控制，实现局部覆盖。      | `boolean`           | true  |

### Events

| 属性名 | 描述       | 回调参数     |
| ------ | ---------- | ------------ |
| click  | 点击时触发 | event: Event |

### Slots

| 属性名  | 描述                               |
| ------- | ---------------------------------- |
| default | 默认插槽，用于在遮罩层上方嵌入内容 |

### Exposes

| 属性名  | 描述                                           | 类型                           |
| ------- | ---------------------------------------------- | ------------------------------ |
| rootRef | 指向mask为false时，组件根 DOM 元素的响应式引用 | `Ref<HTMLElement \| undefined>` |
| props   | 组件当前接收的 props 对象                      | `OverlayProps`                 |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-overlay-m"
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