# ImageUpload 图片上传

图片上传控件。

## 基础用法

使用 `action` 指定上传接口地址，`imageList` 指定已上传的图片列表，`data` 指定上传请求提交的个性化数据。

```html
<template>
    <e-image-upload-m
        v-model:image-list="imageList"
        action="https://fe.epoint.com.cn/mock/752/eui-vue/uploadFile"
        :data="data"
    />
</template>
<script lang="ts" setup>
    import { ref } from "vue";

    const imageList = ref([
        {
            name: "图片1",
            attachGuid: "1",
            downloadUrl: `https://picsum.photos/800/800/?random=${Math.trunc(
                Math.random() * 100000
            )}`,
        },
        {
            name: "图片2",
            attachGuid: "2",
            downloadUrl: `https://picsum.photos/800/800/?random=${Math.trunc(
                Math.random() * 100000
            )}`,
        },
    ]);

    const data = ref({
        custom: "customData",
    });
</script>
```

## 自定义图片显示大小

通过 `imageSize` 来调整图片列表中的图片显示大小。

```html
<template>
    <e-image-upload-m
        v-model:image-list="imageList1"
        action="https://fe.epoint.com.cn/mock/752/eui-vue/uploadFile"
        :image-size="100"
    />

    <div style="margin: 20px 0" />

    <e-image-upload-m
        v-model:image-list="imageList2"
        action="https://fe.epoint.com.cn/mock/752/eui-vue/uploadFile"
        :image-size="150"
    />
</template>

<script lang="ts" setup>
    import { ref } from "vue";

    const imageList1 = ref([
        {
            name: "图片1",
            attachGuid: "1",
            downloadUrl: `https://picsum.photos/800/800/?random=${Math.trunc(
                Math.random() * 100000
            )}`,
        },
        {
            name: "图片2",
            attachGuid: "2",
            downloadUrl: `https://picsum.photos/800/800/?random=${Math.trunc(
                Math.random() * 100000
            )}`,
        },
    ]);

    const imageList2 = ref([
        {
            name: "图片3",
            attachGuid: "3",
            downloadUrl: `https://picsum.photos/800/800/?random=${Math.trunc(
                Math.random() * 100000
            )}`,
        },
        {
            name: "图片4",
            attachGuid: "4",
            downloadUrl: `https://picsum.photos/800/800/?random=${Math.trunc(
                Math.random() * 100000
            )}`,
        },
    ]);
</script>
```

## 单图上传

通过 `numLimit` 可以控制最大上传图片数。

```html
<template>
    <e-image-upload-m
        v-model:image-list="imageList"
        action="https://fe.epoint.com.cn/mock/752/eui-vue/uploadFile"
        :num-limit="1"
    />
</template>

<script lang="ts" setup>
    import { ref } from "vue";

    const imageList = ref([]);
</script>
```

## 限制图片大小

通过 `sizeLimit` 可以限制最大可上传的图片大小，单位为 `KB` 。

```html
<template>
    <e-image-upload-m
        v-model:image-list="imageList"
        action="https://fe.epoint.com.cn/mock/752/eui-vue/uploadFile"
        multiple
        :size-limit="1024"
    />
    <text>最大可上传图片大小为 1024KB</text>
</template>

<script lang="ts" setup>
    import { ref } from "vue";

    const imageList = ref([]);
</script>
```

## 自定义验证

通过 `onValidate` 函数钩子来实现自定义验证。

```html
<template>
    <e-image-upload-m
        v-model:image-list="imageList"
        action="https://fe.epoint.com.cn/mock/752/eui-vue/uploadFile"
        :on-validate="handleValidate"
    />
</template>

<script lang="ts" setup>
    import { ref } from "vue";

    const imageList = ref([]);

    const handleValidate = (file) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const isValidate = file.size < 102400;
                if (!isValidate) {
                    ejs.ui.toast("验证失败，文件大小不能超过 100KB！");
                }
                resolve(isValidate);
            }, 100);
        });
    };
</script>
```

## 操作按钮

通过 `enablePreview` 可以控制是否支持预览，`beforeRemove` 和 `onRemove` 函数钩子来处理删除事件 。

```html
<template>
    <e-image-upload-m
        v-model:image-list="imageList"
        action="https://fe.epoint.com.cn/mock/752/eui-vue/uploadFile"
        :enable-preview="false"
        :before-remove="handleBeforeRemove"
        :on-remove="handleRemove"
    />
    <em-dialog ref="emDialogRef"></em-dialog>
</template>

<script lang="ts" setup>
    import { ref } from "vue";
    import { type UploadImage } from "@epoint-fe/eui-components";
    const emDialogRef = ref(null);
    const imageList = ref([
        {
            name: "图片1",
            attachGuid: "1",
            downloadUrl: `https://picsum.photos/800/800/?random=${Math.trunc(
                Math.random() * 100000
            )}`,
        },
        {
            name: "图片2",
            attachGuid: "2",
            downloadUrl: `https://picsum.photos/800/800/?random=${Math.trunc(
                Math.random() * 100000
            )}`,
        },
    ]);

    const handleBeforeRemove = (
        file: UploadImage,
        data: Record<string, any>
    ) => {
        return new Promise((resolve) => {
            Dialog.confirm({
                title: "删除提醒",
                message: `确定移除${file.name}？`,
            })
                .then(() => {
                    // 发送删除请求
                    setTimeout(() => {
                        console.log("删除图片请求", data);
                        resolve(true);
                    });
                })
                .catch(() => {
                    resolve(false);
                });
        });
    };
    const handleRemove = (file: UploadImage) => {
        console.log("删除成功", file);
    };
</script>
```

## 拖拽排序

通过 `enableSort` 可以开启图片列表的拖拽排序功能。

```html
<template>
    <e-image-upload-m
        v-model:image-list="imageList"
        action="https://fe.epoint.com.cn/mock/752/eui-vue/uploadFile"
        enable-sort
        :on-sort-change="handleSortChange"
    />
</template>

<script lang="ts" setup>
    import { ref } from "vue";

    const imageList = ref([
        {
            name: "图片1",
            attachGuid: "1",
            downloadUrl: `https://picsum.photos/800/800/?random=${Math.trunc(
                Math.random() * 100000
            )}`,
        },
        {
            name: "图片2",
            attachGuid: "2",
            downloadUrl: `https://picsum.photos/800/800/?random=${Math.trunc(
                Math.random() * 100000
            )}`,
        },
    ]);

    const handleSortChange = (images) => {
        console.log(images);
    };
</script>
```

## 权限控制

通过 `enable-add`、`enable-delete`、`enable-download`、`enable-preview` 可以控制组件上传、删除、下载、预览功能的开启情况。

```html
<template>
    <e-image-upload-m
        v-model:image-list="imageList"
        action="https://fe.epoint.com.cn/mock/752/eui-vue/uploadFile"
        :enable-add="false"
        :enable-delete="false"
        :enable-download="true"
        :enable-preview="true"
        :data="data"
    />
</template>

<script lang="ts" setup>
    import { ref } from "vue";

    const imageList = ref([
        {
            name: "图片1",
            attachGuid: "1",
            downloadUrl: `https://picsum.photos/800/800/?random=${Math.trunc(
                Math.random() * 100000
            )}`,
        },
        {
            name: "图片2",
            attachGuid: "2",
            downloadUrl: `https://picsum.photos/800/800/?random=${Math.trunc(
                Math.random() * 100000
            )}`,
        },
    ]);

    const data = ref({
        custom: "customData",
    });
</script>
```

## ImageUpload API

### Attributes

| Name                                | Description                                                                                           | Type                                                                                      | Default                     |
|-------------------------------------|-------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------|-----------------------------|
| `action`                            | 请求的 URL 地址                                                                                       | `string`                                                                                  | —                           |
| `data`                              | 请求的附加参数                                                                                        | `Record<string, any>`                                                                     | —                           |
| `multiple`                          | 是否多选                                                                                              | `boolean`                                                                                 | `false`                     |
| `image-size`                        | 图片展示大小                                                                                          | `number`                                                                                  | 140                         |
| `image-list` / `v-model:image-list` | 默认的已上传图片列表                                                                                  | `UploadImage[]`                                                                           | `[]`                        |
| `num-limit`                         | 最大可上传图片数                                                                                      | `number`                                                                                  | —                           |
| `num-limit-alert`                   | 上传超过最大可上传文件数的文本提示                                                                    | `string`                                                                                  | —                           |
| `size-limit`                        | 最大可上传图片大小，单位为`KB`                                                                         | `number`                                                                                  | —                           |
| `type-limit`                        | 可上传图片后缀                                                                                        | `string`                                                                                  | `gif,jpg,jpeg,bmp,png,webp` |
| `accept`                            | 可接受图片类型                                                                                        | `string`                                                                                  | `image/*`                   |
| `enable-add`                        | 是否允许新增图片                                                                                      | `boolean`                                                                                 | `true`                      |
| `enable-replace`                    | 是否允许替换图片                                                                                      | `boolean`                                                                                 | `true`                      |
| `enable-delete`                     | 是否允许删除图片                                                                                      | `boolean`                                                                                 | `true`                      |
| `enable-download`                   | 是否允许下载图片                                                                                      | `boolean`                                                                                 | `false`                     |
| `enable-preview`                    | 是否允许预览图片                                                                                      | `boolean`                                                                                 | `true`                      |
| `enable-sort`                       | 是否允许拖拽图片进行排序                                                                              | `boolean`                                                                                 | `false`                     |
| `before-upload`                     | 上传前的钩子函数，接受待上传的文件作为参数。如果返回 `false` 或返回一个被拒绝的 `Promise`，则会中止上传。 | `(rawFile: UploadRawFile) => Awaitable<void \| undefined \| null \| boolean>`             | —                           |
| `before-remove`                     | 删除前的钩子函数，接受待删除的文件作为参数。如果返回 `false` 或返回一个被拒绝的 `Promise`，则会中止删除。 | `(file: UploadImage) => Awaitable<boolean>`                                               | —                           |
| `before-download`                   | 下载前的钩子函数，接受待下载的文件作为参数。                                                            | `(file: UploadImage) => Awaitable<void>`                                                  | —                           |
| `on-remove`                         | 删除文件时的钩子函数                                                                                  | `(uploadFile: UploadImage, uploadFiles: UploadImage[]) => void`                           | —                           |
| `on-change`                         | 选择文件、上传成功或上传失败时的钩子函数                                                               | `(uploadFile: UploadImage, uploadFiles: UploadImage[]) => void`                           | —                           |
| `on-success`                        | 上传成功时的钩子函数                                                                                  | `(response: any, uploadFile: UploadImage, uploadFiles: UploadImage[]) => void`            | —                           |
| `on-error`                          | 发生错误时的钩子函数                                                                                  | `(error: Error, uploadFile: UploadImage, uploadFiles: UploadImage[]) => void`             | —                           |
| `on-progress`                       | 上传过程中的钩子函数                                                                                  | `(evt: UploadProgressEvent, uploadFile: UploadImage, uploadFiles: UploadImage[]) => void` | —                           |
| `on-sort-change`                    | 排序修改后的钩子函数                                                                                  | `(uploadFiles: UploadImage[]) => void`                                                    | —                           |
| `on-validate`                       | 验证文件时的钩子函数。如果返回 `false` 或返回一个被拒绝的 `Promise`，则会中止上传。                      | `(rawFile: UploadRawFile) => Awaitable<boolean>`                                          | —                           |

### Slots

| Name            | Description                      | Type                                                                                                                   |
|-----------------|----------------------------------|------------------------------------------------------------------------------------------------------------------------|
| `default`       | 触发文件上传的内容               | -                                                                                                                      |
| `file`          | 文件展示内容(含功能图标按钮区域) | `{file: UploadedFile, enableReplace: Boolean, enableDelete: Boolean, enableDownload: Boolean, enablePreview: Boolean}` |
| `actions`       | 文件功能按钮内容                 | `{file: UploadedFile, enableReplace: Boolean, enableDelete: Boolean, enableDownload: Boolean, enablePreview: Boolean}` |
| `extra-actions` | 额外文件功能按钮内容             | `{file: UploadedFile}`                                                                                                 |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-image-upload-m"
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