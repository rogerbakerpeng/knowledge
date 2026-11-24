# Skeleton 骨架屏

当加载数据并需要为最终用户提供富有视觉和交互体验时，您可以选择 `skeleton`。

## 基本用法

基本的骨架屏。

```html
<template>
  <e-skeleton-m />
  <br />
  <e-skeleton-m style="--e-skeleton-circle-size: 100px">
    <template #template>
      <e-skeleton-item-m variant="circle" />
    </template>
  </e-skeleton-m>
</template>
```

## 可配置的行数

您可以自己配置行数，以获得更精确的渲染效果。实际渲染的行数将始终比给定的行数多 1 行，因为我们正在渲染一个标题行，其宽度为其他行的 33%。

```html
<template>
  <e-skeleton-m :rows="5" />
</template>
```

## 动画

我们提供了一个开关标志，指示是否显示加载动画，称为 `animated`，当为 `true` 时，`ep-skeleton` 的所有子元素都会显示动画。

```html
<template>
  <e-skeleton-m :rows="5" animated />
</template>
```

## 自定义模板

您可以使用名为 `template` 的插槽来完成此工作。

此外，我们还提供了不同类型的骨架屏单元，您可以进行选择。有关更详细的信息，请向下滚动到本页底部查看 API 描述。此外，在构建自定义骨架结构时，您应尽量使其与真实 DOM 结构接近，以避免由高度差异引起的 DOM 弹跳。

```html
<template>
  <e-skeleton-m style="width: 240px">
    <template #template>
      <e-skeleton-item-m variant="image" style="width: 240px; height: 240px" />
      <div style="padding: 14px">
        <e-skeleton-item-m variant="p" style="width: 50%" />
        <div style="display: flex; align-items: center; justify-items: space-between">
          <e-skeleton-item-m variant="text" style="margin-right: 16px" />
          <e-skeleton-item-m variant="text" style="width: 30%" />
        </div>
      </div>
    </template>
  </e-skeleton-m>
</template>
```

## 加载状态

当 `Loading` 结束时，我们始终需要向最终用户显示带有数据的真实 UI。使用 `loading` 属性，我们可以控制是否显示 DOM。您还可以使用插槽 `default` 来构建真实的 DOM 元素。

```html
<template>
  <e-space-m direction="vertical" alignment="flex-start">
    <div>
      <label style="margin-right: 16px">Switch Loading</label>
      <e-switch-m v-model="loading" />
    </div>
    <e-skeleton-m style="width: 240px" :loading="loading" animated>
      <template #template>
        <e-skeleton-item-m variant="image" style="width: 240px; height: 240px" />
        <div style="padding: 14px">
          <e-skeleton-item-m variant="h3" style="width: 50%" />
          <div style="display: flex; align-items: center; justify-items: space-between; margin-top: 16px; height: 16px">
            <e-skeleton-item-m variant="text" style="margin-right: 16px" />
            <e-skeleton-item-m variant="text" style="width: 30%" />
          </div>
        </div>
      </template>
      <template #default>
        <e-card-m :body-style="{ padding: '0px', marginBottom: '1px' }">
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          />
          <div style="padding: 14px">
            <span>Delicious hamburger</span>
            <div class="bottom card-header">
              <div class="time">{{ currentDate }}</div>
              <e-button-m text class="button">Operation button</e-button-m>
            </div>
          </div>
        </e-card-m>
      </template>
    </e-skeleton-m>
  </e-space-m>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const loading = ref(true);
const currentDate = new Date().toDateString();
</script>
```

## 渲染数据列表

大多数情况下，骨架屏用作渲染尚未从服务器获取的数据列表的指示器，然后我们需要创建一堆骨架屏，使其看起来像正在加载。使用 `count` 属性，您可以控制需要向浏览器渲染多少此类模板。

**TIP:** 我们不建议向浏览器渲染大量虚假 UI，这仍会导致性能问题，还需要更长的时间来销毁骨架屏。保持 `count` 尽可能小，以提供更好的用户体验。

```html
<template>
  <e-space-m direction="vertical" alignment="flex-start">
    <e-button-m @click="setLoading">Click me to reload</e-button-m>
    <e-skeleton-m style="width: 240px" :loading="loading" animated :count="3">
      <template #template>
        <e-skeleton-item-m variant="image" style="width: 400px; height: 267px" />
        <div style="padding: 14px">
          <e-skeleton-item-m variant="h3" style="width: 50%" />
          <div style="display: flex; align-items: center; justify-items: space-between; margin-top: 16px; height: 16px">
            <e-skeleton-item-m variant="text" style="margin-right: 16px" />
            <e-skeleton-item-m variant="text" style="width: 30%" />
          </div>
        </div>
      </template>
      <template #default>
        <e-card-m v-for="item in lists" :key="item.name" :body-style="{ padding: '0px', marginBottom: '1px' }">
          <img :src="item.imgUrl" class="image multi-content" />
          <div style="padding: 14px">
            <span>{{ item.name }}</span>
            <div class="bottom card-header">
              <div class="time">{{ currentDate }}</div>
              <e-button-m text class="button">Operation button</e-button-m>
            </div>
          </div>
        </e-card-m>
      </template>
    </e-skeleton-m>
  </e-space-m>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

interface ListItem {
  imgUrl: string;
  name: string;
}

const loading = ref(true);
const lists = ref<ListItem[]>([]);
const currentDate = new Date().toDateString();

const setLoading = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};

onMounted(() => {
  loading.value = false;
  lists.value = [
    {
      imgUrl: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      name: 'Deer',
    },
    {
      imgUrl: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
      name: 'Horse',
    },
    {
      imgUrl: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
      name: 'Mountain Lion',
    },
  ];
});
</script>
```
## 避免渲染跳动

有时 API 响应非常快，当发生这种情况时，骨架屏只是被渲染到 DOM，然后它需要切换回真实 DOM，这会导致突然的闪烁。为了避免这种情况，您可以使用 `throttle` 属性。

```html
<template>
  <e-space-m direction="vertical" alignment="flex-start">
    <div>
      <label style="margin-right: 16px">Switch Loading</label>
      <e-switch-m v-model="loading" />
    </div>
    <e-skeleton-m style="width: 240px" :loading="loading" animated :throttle="500">
      <template #template>
        <e-skeleton-item-m variant="image" style="width: 240px; height: 240px" />
        <div style="padding: 14px">
          <e-skeleton-item-m variant="h3" style="width: 50%" />
          <div style="display: flex; align-items: center; justify-items: space-between; margin-top: 16px; height: 16px">
            <e-skeleton-item-m variant="text" style="margin-right: 16px" />
            <e-skeleton-item-m variant="text" style="width: 30%" />
          </div>
        </div>
      </template>
      <template #default>
        <e-card-m :body-style="{ padding: '0px', marginBottom: '1px' }">
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          />
          <div style="padding: 14px">
            <span>Delicious hamburger</span>
            <div class="bottom card-header">
              <div class="time">{{ currentDate }}</div>
              <e-button-m text class="button">operation button</e-button-m>
            </div>
          </div>
        </e-card-m>
      </template>
    </e-skeleton-m>
  </e-space-m>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const loading = ref(false);
const currentDate = new Date().toDateString();
</script>
```



## Skeleton API

### Skeleton Attributes
| Name     | Description                                 | Type      | Default |
| :------- | :------------------------------------------ | :-------- | :------ |
| animated | 是否使用动画                                | `boolean` | false   |
| count    | 渲染多少个 template, 建议使用尽可能小的数字 | `number`  | 1       |
| loading  | 是否显示加载结束后的 DOM 结构               | `boolean` | false   |
| rows     | 骨架屏段落数量                              | `number`  | 3       |
| throttle | 渲染延迟（以毫秒为单位）                    | `number`  | 0       |
### Skeleton Slots
| Name     | Description              | Scope                      |
| :------- | :----------------------- | :------------------------- |
| default  | 真正渲染的 DOM           | `object`-`$attrs`          |
| template | 渲染 skeleton 模板的内容 | `object`-`{ key: number }` |
## SkeletonItem API

### SkeletonItem Attributes

| Name    | Description            | Type                                                         | Default |
| :------ | :--------------------- | :----------------------------------------------------------- | :------ |
| variant | 当前渲染 skeleton 类型 | `enum`-`p \| text\| h1 \| h3 \| caption \| button \| image \| circle \| rect` | text    |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-skeleton-m"
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