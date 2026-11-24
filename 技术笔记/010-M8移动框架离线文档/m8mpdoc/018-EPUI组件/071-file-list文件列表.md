# FileList 文件列表

文件上传控件的文件列表。

## 基础用法

使用 `data` 指定文件列表。

```html
<template>
    <e-file-list-m :data="fileList" />
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

## API

### Attributes

| Name   | Description | Type             | Default |
|--------|-------------|------------------|---------|
| `data` | 文件列表    | `UploadedFile[]` | `[]`    |

### Type Declarations

<details>
  <summary>查看类型定义</summary>

```ts
type UploadStatus = "ready" | "uploading" | "success" | "fail";
interface UploadRawFile extends File {
    uid: number;
}

interface UploadedFile {
    uploadDate: string;
    attachGuid: string;
    downloadUrl: string;
    name: string;
    size: number;
    percentage?: number;
    status?: UploadStatus;
    response?: unknown;
    uid?: number;
    url?: string;
    raw?: UploadRawFile;
}
```

</details>

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-file-list-m"
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