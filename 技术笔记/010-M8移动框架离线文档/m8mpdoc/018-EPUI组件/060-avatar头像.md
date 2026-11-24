# Avatar 头像

头像组件可用于表示人物或对象。它支持图片、图标或文字。

## 基础用法

使用 `shape` 和 `size` 属性来设置头像的形状和大小。

```html
<template>
  <div class="container">
    <e-avatar-m size="50" :src="circleUrl" />
    <e-avatar-m shape="square" size="50" :src="squareUrl" />
  </div>
</template>
<script setup lang="ts">
  import { reactive, toRefs } from "vue";

  const state = reactive({
    circleUrl:
      "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    squareUrl:
      "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
  });

  const { circleUrl,squareUrl } = toRefs(state);
</script>
```

## 类型

支持图片、图标或文字。

```html
<template>
  <div class="container">
    <e-avatar-m :icon="UserFilled" />
    <e-avatar-m
      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
    />
    <e-avatar-m> user </e-avatar-m>
  </div>
</template>

<script setup lang="ts">
  import { UserFilled } from "@epoint-mfe/eui-icons";
</script>
```

## 加载失败

图片加载失败时的回退显示。

```html
<template>
  <div class="container">
    <div class="block">
      <e-avatar-m size="60" src="https://empty" @error="errorHandler">
        <img
          src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
        />
      </e-avatar-m>
    </div>
  </div>
</template>

<script setup lang="ts">
  const errorHandler = () => true;
</script>
<style scoped lang="scss">
  .ep-avatar > img {
    display: block;
    height: 100%;
  }
</style>
```

## 适应容器

设置图片如何适应容器框，与 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) 属性相同。

```html
<template>
  <div class="container">
    <div v-for="fit in fits" :key="fit" class="flex">
      <span class="title">{{ fit }}</span>
      <e-avatar-m shape="square" :fit="fit" :src="url" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive, toRefs } from "vue";

  const state = reactive({
    fits: ["fill", "contain", "cover", "none", "scale-down"],
    url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
  });

  const { fits, url } = toRefs(state);
</script>
```

## 徽标

头像组件可以与徽标（Badge）一起使用，用于显示计数或状态指示。

您可以使用 `count` 属性设置徽标的数值，或使用 `is-dot` 属性显示一个小圆点。当数值超过 `max` 值时，将显示为 `{max}+`。

```html
<template>
  <div class="container">
    <e-avatar-m
      shape="square"
      count="10"
      src="https://picsum.photos/200/200/?random=1"
      alt="用户头像"
    />
    <e-avatar-m
      shape="square"
      is-dot
      src="https://picsum.photos/200/200/?random=2"
      alt="用户头像"
    />
    <e-avatar-m shape="square" count="100">张三</e-avatar-m>

    <e-avatar-m
      count="10"
      src="https://picsum.photos/200/200/?random=1"
      alt="用户头像"
    />
    <e-avatar-m
      is-dot
      src="https://picsum.photos/200/200/?random=2"
      alt="用户头像"
    />
    <e-avatar-m count="100">张三</e-avatar-m>
  </div>
</template>
```

## 大小

头像组件支持多种尺寸设置，以适应不同的界面需求。

您可以通过 `size` 属性设置头像的大小，该属性接受以下值：

- 预设尺寸：`large(50px)`、`default(42px)`、`small(38px)` 或 `compact(30px)`
- 自定义数值：直接传入数字（单位为像素）

```html
<template>
  <div class="container">
    <e-avatar-m
      shape="square"
      size="compact"
      src="https://picsum.photos/200/200/?random=1"
      alt="用户头像"
    />
    <e-avatar-m
      shape="square"
      size="small"
      src="https://picsum.photos/200/200/?random=2"
      alt="用户头像"
    />
    <e-avatar-m shape="square">张三</e-avatar-m>
    <e-avatar-m shape="square" size="large" :icon="UserFilled" alt="用户头像" />

    <e-avatar-m
      shape="circle"
      size="compact"
      src="https://picsum.photos/200/200/?random=1"
      alt="用户头像"
    />
    <e-avatar-m
      shape="circle"
      size="small"
      src="https://picsum.photos/200/200/?random=2"
      alt="用户头像"
    />
    <e-avatar-m shape="circle">张三</e-avatar-m>
    <e-avatar-m shape="circle" size="large" :icon="UserFilled" alt="用户头像" />
  </div>
</template>
<script setup lang="ts">
  import { UserFilled } from "@epoint-mfe/eui-icons";
</script>
```

## 头像组

头像组件提供了强大的头像组功能，能够以紧凑美观的方式展示多个用户头像。

通过 `avatarList` 属性传入头像数据数组，每个元素可包含 `src`、`alt`、`text` 或 `icon` 属性。

当头像数量超过 `maxCount` 设置的阈值时，会自动显示 `+n` 的溢出指示器，溢出指示器会计算并显示未展示的头像数量。

默认情况下，溢出指示器显示在头像组的末尾，添加 `before-order` 属性可将溢出指示器放置在头像组的开头。

```html
<template>
  <div class="container">
    <e-avatar-group-m :avatar-list="avatarList" before-order />
    <e-avatar-group-m :avatar-list="avatarList" />
    <e-avatar-group-m :avatar-list="avatarList" :max-count="3" />
    <e-avatar-group-m shape="circle" :avatar-list="avatarList2" />
    <e-avatar-group-m shape="square" :avatar-list="avatarList2" />
    <e-avatar-group-m shape="square" :avatar-list="avatarList2" :max-count="3" />
  </div>
</template>

<script setup lang="ts">
  const avatarList = [
    { src: "https://picsum.photos/200/200/?random=1", alt: "用户头像" },
    { src: "https://picsum.photos/200/200/?random=2", alt: "用户头像" },
    { src: "https://picsum.photos/200/200/?random=3", alt: "用户头像" },
    { src: "https://picsum.photos/200/200/?random=4", alt: "用户头像" },
    { src: "https://picsum.photos/200/200/?random=5", alt: "用户头像" },
    { src: "https://picsum.photos/200/200/?random=6", alt: "用户头像" },
    { src: "https://picsum.photos/200/200/?random=7", alt: "用户头像" },
    { src: "https://picsum.photos/200/200/?random=8", alt: "用户头像" },
  ];

  const avatarList2 = [
    { src: "https://picsum.photos/200/200/?random=1", alt: "用户头像" },
    { src: "https://picsum.photos/200/200/?random=2", alt: "用户头像" },
    { src: "https://picsum.photos/200/200/?random=3", alt: "用户头像" },
    { src: "https://picsum.photos/200/200/?random=4", alt: "用户头像" },
  ];
</script>
```

## API

### 属性

| Name    | Description                                    | Type                                                     | Default |
| ------- | ---------------------------------------------- | -------------------------------------------------------- | ------- |
| icon    | 设置头像的图标类型，更多信息请参考 Icon 组件。 | `string` / [Component]                                   | —       |
| size    | 设置头像的大小。                               | `number` / 'large' \| 'default' \| 'small' \| 'compact'  | default |
| shape   | 设置头像的形状。                               | 'circle' \| 'square'                                     | circle  |
| src     | 图片头像的资源地址。                           | `string`                                                 | —       |
| src-set | 图片头像的原生 `srcset` 属性。                 | `string`                                                 | —       |
| alt     | 图片头像的原生 `alt` 属性。                    | `string`                                                 | —       |
| fit     | 设置图片如何适应容器框。                       | 'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down' | cover   |
| count   | 显示头像右上角的徽标数字。                     | `number`                                                 | —       |
| is-dot  | 显示头像右上角的徽标点。                       | `boolean`                                                | false   |

### 事件

| Name  | Description        | Type                          |
| ----- | ------------------ | ----------------------------- |
| error | 图片加载失败时触发 | `Function (val: any) => void` |

### 插槽

| Name    | Description    |
| ------- | -------------- |
| default | 自定义头像内容 |

### 头像组 API

## 属性

| Name         | Description                                      | Type                                                                | Default |
| ------------ | ------------------------------------------------ | ------------------------------------------------------------------- | ------- |
| avatarList   | 头像组数据，用于展示多个头像。                   | `Array<{src?: string, alt?: string, text?: string, icon?: string}>` | —       |
| maxCount     | 头像组最大显示数量，超出部分将以 +n 的形式显示。 | `number`                                                            | 5       |
| before-order | 是否将溢出指示器放置在头像组的开头。             | `boolean`                                                           | false   |
| shape        | 设置头像的形状（头像组没有溢出的情况下生效）。   | 'circle' \| 'square'                                                | circle  |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-avatar-m"
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