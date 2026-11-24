# image 图片

图片容器，在保留所有原生 `img` 的特性下，支持懒加载，自定义占位、加载失败等

## 基础用法

可通过 `fit` 确定图片如何适应到容器框，同原生 `object-fit`.

```html
<template>
  <h5>基本使用</h5>
  <div class="demo-image">
    <div v-for="fit in fits" :key="fit" class="block">
      <e-image-m style="width: 100px; height: 100px" :src="url" :fit="fit" />
      <span class="demonstration">{{ fit }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const fits = ["fill", "contain", "cover", "none"];
  const url =
    "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg";
</script>
```

## 占位内容

可通过 `slot = placeholder` 可自定义占位内容

```html
<template>
  <h5>占位内容</h5>
  <div class="demo-image__placeholder">
    <div class="block">
      <span class="demonstration">Default</span>
      <e-image-m :src="src" />
    </div>
    <div class="block">
      <span class="demonstration">Custom</span>
      <e-image-m :src="src">
        <template #placeholder>
          <div class="image-slot">
            Loading
            <span class="dot">...</span>
          </div>
        </template>
      </e-image-m>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const src =
    "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg";
</script>
```

## 加载失败

可通过 `slot = error` 可自定义加载失败内容

```html
<template>
  <h5>加载失败</h5>
  <div class="demo-image__placeholder">
    <div class="block">
      <span class="demonstration">Default</span>
      <e-image-m src="cross" />
    </div>
    <div class="block">
      <span class="demonstration">Custom</span>
      <e-image-m src="cross">
        <template #error>
          <div class="image-slot">
            <e-icon-m><picture /></e-icon-m>
          </div>
        </template>
      </e-image-m>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Picture } from "@epoint-mfe/eui-icons";
</script>
```

## 懒加载

通过 `lazy = true` 使用懒加载。当设置后，图像将在滚动到视图中时加载。

```html
<template>
  <h5>懒加载</h5>
  <div class="demo-image__lazy">
    <e-image-m v-for="url in srcList" :key="url" :src="url" lazy />
  </div>
</template>

<script lang="ts" setup>
  const url =
    "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg";
  const srcList = [
    "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
    "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
    "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
    "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
    "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
    "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
    "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
  ];
</script>
```

## 图像预览

通过设置 `previewSrcList` 属性，可以允许大图像预览。您可以通过 `initial-index` 初始化首张图片的预览位置。默认的初始位置是 `0`。

```html
<template>
  <h5>图像预览</h5>
  <div class="demo-image__lazy">
    <e-image-m
      style="width: 100px; height: 100px"
      :src="url"
      :preview-src-list="srcList"
      :initial-index="4"
      fit="cover"
    />
  </div>
</template>

<script lang="ts" setup>
  const url =
    "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg";
  const srcList = [
    "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
    "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
    "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
    "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
    "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
    "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
    "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
  ];
</script>
```

## Image API

### Image Attributes

| 属性名              | 说明                                                     | 类型                                  | 默认值 |
|---------------------|--------------------------------------------------------|---------------------------------------|--------|
| src                 | 图像源，与原生相同。                                       | string                                | -      |
| fit                 | 指示图像应如何调整大小以适应其容器同。                    | string(fill / contain / cover / none) | fill   |
| hide-on-click-modal | 启用预览时，使用此标志来控制是否点击背景可以退出预览模式。 | boolean                               | false  |
| lazy                | 是否使用懒加载。                                          | boolean                               | false  |
| preview-src-list    | 允许大图像预览。                                          | string[]                              | -      |
| z-index             | 设置图像预览的 z-index。                                  | number                                | -      |
| initial-index       | 初始预览图像索引，必须小于 preview-src-list 的长度。       | number                                | 0      |
| infinite            | 预览是否无限循环。                                        | boolean                               | true   |
| max-zoom            | 手势缩放时，最大缩放比例                                  | number / string                       | 3      |
| min-zoom            | 手势缩放时，最小缩放比例                                  | number / string                       | 1/3    |

### Image Events

| Name   | Description                                                | Type                    |
|--------|------------------------------------------------------------|-------------------------|
| load   | 与原生 load 相同。                                          | (e: Event) => void      |
| error  | 与原生 error 相同。                                         | (e: Error) => void      |
| switch | 切换图像时触发。                                            | (index: number) => void |
| close  | 在单击关闭按钮或启用 hide-on-click-modal 后单击背景时触发。 | () => void              |

### Image Slots

| Name        | Description                     |
|-------------|---------------------------------|
| placeholder | 图像尚未加载时的自定义占位内容。 |
| error       | 自定义图像加载失败内容。         |
| viewer      | 图像的描述。                     |

### Image Methods

| 方法            | 描述         | 参数                                  |
|-----------------|------------|-------------------------------------|
| `setActiveItem` | 手动切换图像 | 要切换到的图像的索引，从 `0` 开始计数。 |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-image-m"
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