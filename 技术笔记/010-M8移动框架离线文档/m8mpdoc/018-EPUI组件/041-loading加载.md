# Loading 加载

加载数据时显示动效。

## 区域加载

在需要的时候展示加载动画，防止页面失去响应提高用户体验（例如表格）。

EUI4 提供了两种调用 Loading 的方法：指令和服务。 对于自定义指令 `v-loading`，只需要绑定 `boolean` 值即可。 默认状况下，Loading 遮罩会插入到绑定元素的子节点。 通过添加 `body` 修饰符，可以使遮罩插入至 Dom 中的 body 上。

```html
<template>
    <div v-loading="loading">
        内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    const loading = ref(true);
</script>

<style></style>
```

## 自定义加载中组件内容

你可以自定义加载中组件的文字，图标，以及背景颜色。

在绑定了 `v-loading` 指令的元素上添加 `loading-text` 属性，其值会被渲染为加载文案，并显示在加载图标的下方。 类似地，`loading-spinner` 、`loading-background` 和 `loading-svg` 属性分别用来设定 svg 图标、背景色值、加载图标。

```html
<template>
    <div
        v-loading="loading"
        loading-text="Loading..."
        :loading-spinner="svg"
        loading-svg-view-box="0 0 400 400"
        loading-background="rgba(122, 122, 122, 0.8)"
    >
        内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
    </div>
    <div v-loading="loading" :loading-svg="svg" class="custom-loading-svg" loading-svg-view-box="0 0 400 400">
        内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    import { useTableDataSource } from '@epoint-fe/eui-hooks';
    const loading = ref(true);
    const svg = `
<g><path fill="#3472d7" d="M219.91,190.42v119.54h-39.99V190.42h20H219.91z" /><path fill="#3472d7" d="M143.44,237.17L228.28,322L200,350.28l-84.83-84.83l14.14-14.14L143.44,237.17z" /><path fill="#3472d7" d="M284.83,265.45L200,350.28L171.72,322l84.83-84.83l14.14,14.14L284.83,265.45z" /><path fill="#4E5463" d="M342.36,171.17c-12.12-12.58-27.07-21.57-43.46-26.33c0.29-2.88,0.44-5.79,0.44-8.71 c0-47.24-38.43-85.67-85.68-85.67c-43.92,0-80.23,33.22-85.11,75.85c-54.97,3.95-98.49,49.94-98.49,105.9 c0,56.45,44.29,102.75,99.94,105.99v-40.11c-33.58-3.15-59.94-31.49-59.94-65.87c0-36.49,29.69-66.18,66.18-66.18 c3.22,0,6.5,0.24,9.75,0.72l27.14,4l-4.49-27.06c-0.42-2.54-0.63-5.08-0.63-7.56c0-25.19,20.49-45.67,45.67-45.67 c25.19,0,45.68,20.49,45.68,45.67c0,5.97-1.14,11.78-3.39,17.27l-10.8,26.4l28.5,1.16c31.58,1.28,56.31,27.05,56.31,58.67 c0,32.39-26.35,58.74-58.74,58.74c-0.41,0-0.81-0.01-1.22-0.02v39.99c0.41,0,0.81,0.03,1.22,0.03 c54.45,0,98.74-44.29,98.74-98.74C369.96,213.97,360.16,189.66,342.36,171.17z" /></g>`;
</script>

<style></style>
```

**warning**

虽然 `loading-spinner` / `loading-svg` 属性支持传入的 HTML 片段，但是动态在网站上渲染任意的 HTML 是非常危险的，因为很容易导致 [XSS 攻击](https://en.wikipedia.org/wiki/Cross-site_scripting). 请确保 `loading-spinner` / `loading-svg` 的内容是可信的， **不要**将用户提交的内容赋值给 `loading-spinner` / `loading-svg` 属性。

## 让加载组件铺满整个屏幕

加载数据时显示全屏动画。

当使用指令方式时，全屏遮罩需要添加 `fullscreen` 修饰符（遮罩会插入至 body 上） 此时若需要锁定屏幕的滚动，可以使用 `lock` 修饰符； 当使用服务方式时，遮罩默认即为全屏，无需额外设置。

```html
<template>
    <e-button-m v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click="openFullScreen1">
        As a directive
    </e-button-m>
    <e-button-m type="primary" @click="openFullScreen2"> As a service </e-button-m>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    import { EpLoading } from '@epoint-mfe/eui-components';

    const fullscreenLoading = ref(false);
    const openFullScreen1 = () => {
        fullscreenLoading.value = true;
        setTimeout(() => {
            fullscreenLoading.value = false;
        }, 2000);
    };

    const openFullScreen2 = () => {
        const loading = EpLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
            loading.close();
        }, 2000);
    };
</script>
```

## 以服务的方式来调用

Loading 还可以以服务的方式调用。 你可以像这样引入 Loading 服务：

```tsx
import { EpLoading } from '@epoint-mfe/eui-components';
```

在你需要的时候通过下面的方式调用：

```tsx
EpLoading.service(options);
```

其中 `options` 参数为 Loading 的配置项，具体见下表。 `LoadingService` 会返回一个 `Loading` 实例，可通过调用该实例的 `close` 方法来关闭它：

```tsx
const loadingInstance = EpLoading.service(options);
nextTick(() => {
    // 这里只是一个模拟 实际上你可以在数据加载完成后调用 loadingInstance.close() 来关闭 Loading
    loadingInstance.close();
});
```

需要注意的是，以服务的方式调用的全屏 `Loading` 是单例的。 若在前一个全屏 `Loading` 关闭前再次调用全屏 `Loading`，并不会创建一个新的 `Loading` 实例，而是返回现有全屏 `Loading` 的实例：

```tsx
const loadingInstance1 = EpLoading.service({ fullscreen: true });
const loadingInstance2 = EpLoading.service({ fullscreen: true });
console.log(loadingInstance1 === loadingInstance2); // true
```

此时调用它们中任意一个的 `close` 方法都能关闭这个全屏 `Loading` 。

## API

### Options

| Name        | Description                                                                                                                                   | Type                     | Default       |
| :---------- | :-------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------- | :------------ |
| target      | Loading 需要覆盖的 DOM 节点。 可传入一个 DOM 对象或字符串； 若传入字符串，则会将其作为参数传入 `document.querySelector` 以获取到对应 DOM 节点 | `string` / `HTMLElement` | document.body |
| body        | 同 `v-loading` 指令中的 `body` 修饰符                                                                                                         | `boolean`                | false         |
| fullscreen  | 同 `v-loading` 指令中的 `fullscreen` 修饰符                                                                                                   | `boolean`                | true          |
| lock        | 同 `v-loading` 指令中的 `lock` 修饰符                                                                                                         | `boolean`                | false         |
| text        | 显示在加载图标下方的加载文案                                                                                                                  | `string`                 | —             |
| spinner     | 自定义加载图标类名                                                                                                                            | `string`                 | —             |
| background  | 遮罩背景色                                                                                                                                    | `string`                 | —             |
| customClass | Loading 的自定义类名                                                                                                                          | `string`                 | —             |

### Directives

| Name               | Description                              | Type                  |
| :----------------- | :--------------------------------------- | :-------------------- |
| v-loading          | 是否显示动画                             | `boolean` / `Options` |
| loading-text       | 显示在加载图标下方的加载文案             | `string`              |
| loading-spinner    | 自定义加载图标                           | `string`              |
| loading-svg        | 自定义加载图标 (与 loading-spinner 相同) | `string`              |
| loading-background | 背景遮罩的颜色                           | `string`              |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-loading-m"
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