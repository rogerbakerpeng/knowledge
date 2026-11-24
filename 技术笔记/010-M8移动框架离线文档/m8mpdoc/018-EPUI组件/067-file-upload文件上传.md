# FileUpload 文件上传

参照 F9 框架的文件上传控件，对 Upload 控件的进一步封装，添加了分片上传的功能。

## 基础用法

使用 `action` 指定上传接口地址，`fileList` 指定已上传的文件列表，`data` 指定上传请求提交的个性化数据。

```html
<template>
    <e-file-upload-m
        v-model:file-list="fileList"
        action="https://fe.epoint.com.cn/mock/752/eui-vue/uploadFile"
    />
</template>
<script lang="ts" setup>
    import { ref } from "vue";

    const fileList = ref([
        {
            name: "图片1.jpg",
            attachGuid: "c8ecece4-0a99-46dc-b419-fb7050aab4c8",
            downloadUrl: "https://picsum.photos/800/800/",
            uploadDate: "2023-10-27 18:17:31",
            size: 1392528,
        },
        {
            name: "图片2.png",
            attachGuid: "19314fdd-be3b-42f4-ab7e-78c90b797b2b",
            downloadUrl: "https://picsum.photos/800/800/",
            uploadDate: "2023-10-27 18:18:55",
            size: 79358,
        },
    ]);
</script>
```

## 单文件上传

通过 `numLimit` 可以控制最大上传文件数。

```html
<template>
    <e-file-upload-m
        v-model:file-list="fileList"
        action="https://fe.epoint.com.cn/mock/752/eui-vue/uploadFile"
        :num-limit="1"
    />
</template>

<script lang="ts" setup>
    import { ref } from "vue";

    const fileList = ref([]);
</script>
```

## 限制文件大小

通过 `sizeLimit` 可以限制最大可上传的文件大小，单位为 KB 。

```html
<template>
    <e-file-upload-m
        v-model:file-list="fileList"
        action="https://fe.epoint.com.cn/mock/752/eui-vue/uploadFile"
        multiple
        :size-limit="1024"
    />
    <text>最大可上传文件大小为 1024KB</text>
</template>

<script lang="ts" setup>
    import { ref } from "vue";

    const fileList = ref([]);
</script>
```

## 分片上传

通过 `chunk` 可以开启分片上传模式，`chunkSize` 属性可以指定分片的大小

```html
<template>
    <e-file-upload-m
        v-model:file-list="fileList"
        action="https://fe.epoint.com.cn/mock/752/eui-vue/uploadFile"
        chunk
        :chunk-size="1024"
    />
</template>

<script lang="ts" setup>
    import { ref } from "vue";

    const fileList = ref([]);
</script>
```

## 非分片模式下计算 MD5

通过 `needMd5` 可以在未开启分片上传模式时，上传请求中也带上文件 MD5

```html
<template>
    <e-file-upload-m
        v-model:file-list="fileList"
        action="https://fe.epoint.com.cn/mock/752/eui-vue/uploadFile"
        need-md5
    />
</template>

<script lang="ts" setup>
    import { ref } from "vue";

    const fileList = ref([]);
</script>
```

## 拖拽排序

通过 `enableSort` 可以开启文件列表的拖拽排序功能。

```html
<template>
    <e-file-upload-m
        v-model:file-list="fileList"
        action="https://fe.epoint.com.cn/mock/752/eui-vue/uploadFile"
        enable-sort
        :on-sort-change="handleSortChange"
    />
</template>

<script lang="ts" setup>
    import { ref } from "vue";

    const fileList = ref([
        {
            name: "图片1.jpg",
            attachGuid: "c8ecece4-0a99-46dc-b419-fb7050aab4c8",
            downloadUrl: "https://picsum.photos/800/800/",
            uploadDate: "2023-10-27 18:17:31",
            size: 1392528,
        },
        {
            name: "图片2.png",
            attachGuid: "19314fdd-be3b-42f4-ab7e-78c90b797b2b",
            downloadUrl: "https://picsum.photos/800/800/",
            uploadDate: "2023-10-27 18:18:55",
            size: 79358,
        },
    ]);

    const handleSortChange = (files) => {
        console.log(files);
    };
</script>
```

## 权限控制

通过 `enable-add`、`enable-delete`、`enable-download`、`enable-preview` 可以控制组件上传、删除、下载、预览功能的开启情况。

```html
<template>
    <e-file-upload-m
        v-model:file-list="fileList"
        action="https://fe.epoint.com.cn/mock/752/eui-vue/uploadFile"
        :enable-add="false"
        :enable-delete="true"
        :enable-download="false"
        :enable-preview="true"
        :resolve-preview-url="resolvePreviewUrl"
    />
</template>

<script lang="ts" setup>
    import { ref } from "vue";

    const fileList = ref([
        {
            name: "图片1.jpg",
            attachGuid: "c8ecece4-0a99-46dc-b419-fb7050aab4c8",
            previewUrl: "https://picsum.photos/800/800/",
            downloadUrl: "https://picsum.photos/800/800/",
            uploadDate: "2023-10-27 18:17:31",
            size: 1392528,
        },
        {
            name: "图片2.png",
            attachGuid: "19314fdd-be3b-42f4-ab7e-78c90b797b2b",
            previewUrl: "https://picsum.photos/800/800/",
            downloadUrl: "https://picsum.photos/800/800/",
            uploadDate: "2023-10-27 18:18:55",
            size: 79358,
        },
    ]);
    const resolvePreviewUrl = (file) => {
        return file.downloadUrl;
    };
</script>
```

## FileUpload API

### Attributes

| Name                              | Description                                                                                           | Type                                                                                    | Default |
|-----------------------------------|-------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------|---------|
| `action`                          | 请求的 URL 地址                                                                                       | `string`                                                                                | —       |
| `data`                            | 请求的附加参数                                                                                        | `Record<string, any>`                                                                   | —       |
| `multiple`                        | 是否多选                                                                                              | `boolean`                                                                               | `false` |
| `file-list` / `v-model:file-list` | 默认的已上传文件列表                                                                                  | `UploadFile[]`                                                                          | `[]`    |
| `auto`                            | 是否自动上传                                                                                          | `boolean`                                                                               | `true`  |
| `num-limit`                       | 最大可上传文件数                                                                                      | `number`                                                                                | —       |
| `num-limit-alert`                 | 上传超过最大可上传文件数的文本提示                                                                    | `string`                                                                                | —       |
| `size-limit`                      | 最大可上传文件大小，单位为`KB`                                                                         | `number`                                                                                | —       |
| `type-limit`                      | 可上传文件后缀                                                                                        | `string`                                                                                | —       |
| `accept`                          | 可接受文件类型                                                                                        | `string`                                                                                | —       |
| `file-name-length-limit`          | 可上传的最大文件名称长度                                                                              | `number`                                                                                | —       |
| `duplicate`                       | 是否不允许上传重复文件                                                                                | `boolean`                                                                               | `false` |
| `enable-add`                      | 是否允许新增文件                                                                                      | `boolean`                                                                               | `true`  |
| `enable-delete`                   | 是否允许删除文件                                                                                      | `boolean`                                                                               | `true`  |
| `enable-download`                 | 是否允许下载文件                                                                                      | `boolean`                                                                               | `true`  |
| `enable-preview`                  | 是否允许预览文件                                                                                      | `boolean`                                                                               | `false` |
| `enable-sort`                     | 是否允许拖拽文件进行排序                                                                              | `boolean`                                                                               | `false` |
| `need-md5`                        | 是否需要计算 MD5，该属性只有在非分片模式下其效果                                                       | `boolean`                                                                               | `false` |
| `chunk`                           | 是否开启分片模式果                                                                                    | `boolean`                                                                               | `false` |
| `chunk-size`                      | 分片大小，单位为 `KB`                                                                                  | `number`                                                                                | `5120`  |
| `need-chunk-md5`                  | 分片是否计算 MD5，该属性只有在分片模式下起效果                                                         | `boolean`                                                                               | `false` |
| `need-chunk-local`                | 控制服务端是否将分片存储到本地磁盘上，该属性只有在分片模式下起效果                                     | `boolean`                                                                               | `false` |
| `show-file-list`                  | 是否显示已上传文件列表                                                                                | `boolean`                                                                               | `true`  |
| `pick-text`                       | 选择文件按钮文本                                                                                      | `string`                                                                                | —       |
| `is-data-import`                  | 是否导入模式，为 true 时可直接当导入使用，始终不会显示文件列表                                          | `boolean`                                                                               | `false` |
| `resolve-download-url`            | 个性化处理下载地址的方法                                                                              | `(url: string) => string`                                                               | —       |
| `resolve-preview-url`             | 个性化处理预览地址的方法                                                                              | `(data: Record<string, unknown>) => string`                                             | —       |
| `before-upload`                   | 上传前的钩子函数，接受待上传的文件作为参数。如果返回 `false` 或返回一个被拒绝的 `Promise`，则会中止上传。 | `(rawFile: UploadRawFile) => Awaitable<void \| undefined \| null \| boolean>`           | —       |
| `before-remove`                   | 删除前的钩子函数，接受待删除的文件作为参数。如果返回 `false` 或返回一个被拒绝的 `Promise`，则会中止删除。 | `(file: UploadFile) => Awaitable<boolean>`                                              | —       |
| `on-remove`                       | 删除文件时的钩子函数                                                                                  | `(uploadFile: UploadFile, uploadFiles: UploadFile[]) => void`                           | —       |
| `on-change`                       | 选择文件、上传成功或上传失败时的钩子函数                                                               | `(uploadFile: UploadFile, uploadFiles: UploadFile[]) => void`                           | —       |
| `on-success`                      | 上传成功时的钩子函数                                                                                  | `(response: any, uploadFile: UploadFile, uploadFiles: UploadFile[]) => void`            | —       |
| `on-error`                        | 发生错误时的钩子函数                                                                                  | `(error: Error, uploadFile: UploadFile, uploadFiles: UploadFile[]) => void`             | —       |
| `on-progress`                     | 上传过程中的钩子函数                                                                                  | `(evt: UploadProgressEvent, uploadFile: UploadFile, uploadFiles: UploadFile[]) => void` | —       |
| `on-sort-change`                  | 排序修改后的钩子函数                                                                                  | `(uploadFiles: UploadFile[]) => void`                                                   | —       |
| `on-validate`                     | 验证文件时的钩子函数。如果返回 `false` 或返回一个被拒绝的 `Promise`，则会中止上传。                      | `(rawFile: UploadRawFile) => Awaitable<boolean>`                                        | —       |

### Slots

| Name            | Description                      | Type                                                                                           |
|-----------------|----------------------------------|------------------------------------------------------------------------------------------------|
| `default`       | 触发文件上传的内容               | -                                                                                              |
| `file`          | 文件展示内容(含功能图标按钮区域) | `{file: UploadedFile, enableDelete: Boolean, enableDownload: Boolean, enablePreview: Boolean}` |
| `actions`       | 文件功能按钮内容                 | `{file: UploadedFile, enableDelete: Boolean, enableDownload: Boolean, enablePreview: Boolean}` |
| `extra-actions` | 额外文件功能按钮内容             | `{file: UploadedFile}`                                                                         |

### Exposes

| Name           | Description                                             | Type                                                                                                                                 |
|----------------|---------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| `abort`        | 取消上传请求                                            | `(file: UploadFile) => void`                                                                                                         |
| `submit`       | 手动上传文件列表                                        | `() => void`                                                                                                                         |
| `retry`        | 重新上传文件                                            | `(file: UploadFile) => void`                                                                                                         |
| `clearFiles`   | 清空文件列表（此方法不支持在 `before-upload` 钩子中使用） | ^[Function]`(clearFile = true) => void \| (status?: Array<'ready' \| 'uploading' \| 'success' \| 'fail'>, clearFile = true) => void` |
| `handleRemove` | 手动移除文件                                            | `(file: UploadFile \| UploadRawFile, removeServer = true) => void`                                                                   |
| `selectFile`   | 手动触发选择文件                                        | `() => void`                                                                                                                         |

## 请求说明

内置的所有请求统一都是走控件 `action` 属性配置的后端接口，后端接口可通过请求参数中的 `action` 字段来区分是那种请求。

### 文件上传请求

文件上传分为分片模式和非分片模式。非分片模式请求参数如下：

<!-- eslint-skip -->

```js
{
  action: 'upload',
  name: string, // 文件名
  size: number, // 文件大小
  type: string, // 文件类型
  lastModifiedDate: string, // 文件修改时间
  file: binary // 文件二进制流
}
```

分片模式请求参数：

<!-- eslint-skip -->

```js
{
  action: 'chunk',
  name: string, // 文件名
  size: number, // 文件大小
  type: string, // 文件类型
  lastModifiedDate: string, // 文件修改时间
  chunk: number, // 当前分片序号
  chunks: number, // 总分片数
  chunkSize: number, // 分片大小
  file: binary // 文件二进制流
}
```

### 查询文件状态请求

分片模式下，请求前需要发送一个查询分片上传状态的请求，来确认哪些分片已上传。请求参数如下：

<!-- eslint-skip -->

```js
{
  action: 'queryFileStatus',
  fileMD5: string, // 文件 MD5
  fileName: string, // 文件名
  fileSize: number, // 文件大小
  uploadGuid: string, // 文件的 uid
  lastModifiedDate: string // 文件最后修改时间
}
```

### 分片上传结束请求

分片模式下，所有分片上传完成后，需要发送一个结束请求告知服务端所有分片已上传完成。请求参数如下：

<!-- eslint-skip -->

```js
{
  action: 'finishUpload',
  fileMD5: string, // 文件 MD5
  fileName: string, // 文件名
  fileSize: number, // 文件大小
  uploadGuid: string, // 文件的 uid
  lastModifiedDate: string // 文件最后修改时间
}
```

### 删除文件请求

删除文件时的请求。请求参数如下：

<!-- eslint-skip -->

```js
{
  action: 'delete',
  attachGuid: string // 被删除文件的 guid
}
```

### 排序请求

排序时的请求。请求参数如下：

<!-- eslint-skip -->

```js
{
  action: 'saveSort'
  sort: string[] // 排序后的文件 guid 数组
}
```

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-file-upload-m"
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