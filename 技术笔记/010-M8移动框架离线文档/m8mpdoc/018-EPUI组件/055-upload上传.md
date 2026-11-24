# Upload 上传

通过单击文件来上传。

## 基本用法

使用 `slot` 自定义上传按钮类型和文本。设置 `limit` 和 `on-exceed` 以限制允许上传的最大数量，并在超出限制时指定方法。此外，您还可以在 `before-remove` 钩子中中止删除文件。

```html
<template>
    <e-upload-m
        ref="upload"
        v-model:file-list="fileList"
        class="upload-demo"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        multiple
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :limit="3"
        :on-exceed="handleExceed"
    >
        <e-button-m type="primary">Click to upload</e-button-m>
        <template #tip>
            <div class="ep-upload__tip">
                这里是对上传文件的提示说明文本，例如格式、大小等
            </div>
        </template>
    </e-upload-m>
    <em-dialog ref="emDialogRef"></em-dialog>
</template>
<script lang="ts" setup>
    import { ref } from "vue";

    import type {
        UploadProps,
        UploadFile,
        UploadFiles,
    } from "@epoint-mfe/eui-components";
    const upload = ref<any>();
    const emDialogRef = ref(null);
    const fileList = ref<UploadFiles>([
        {
            name: "element-plus-logo.svg",
            url: "https://element-plus.org/images/element-plus-logo.svg",
        },
        {
            name: "element-plus-logo2.svg",
            url: "https://element-plus.org/images/element-plus-logo.svg",
        },
        {
            name: "food.jpeg",
            url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
    ]);
    const handleRemove: UploadProps["onRemove"] = (
        file: UploadFile,
        uploadFiles: UploadFiles
    ) => {
        console.log(file, uploadFiles);
    };

    const handlePreview: UploadProps["onPreview"] = (
        uploadFile: UploadFile
    ) => {
        ImagePreview([uploadFile.url!]);
    };

    const beforeRemove: UploadProps["beforeRemove"] = (
        uploadFile: UploadFile,
        uploadFiles: UploadFiles
    ) => {
        console.log(uploadFile, uploadFiles);
        return Dialog.confirm({
            message: `Cancel the transfer of ${uploadFile.name} ?`,
        })
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            });
    };

    const handleExceed: UploadProps["onExceed"] = (
        files: UploadFiles,
        uploadFiles: UploadFiles
    ) => {
        Dialog.alert({
            message: `The limit is 3, you selected ${
                files.length
            } files this time, add up to ${
                files.length + uploadFiles.length
            } totally`,
        });
    };
</script>
```

## 覆盖先前文件

设置 `limit` 和 `on-exceed` 以在选择新文件时自动替换先前的文件。

```html
<template>
    <e-upload-m
        ref="upload"
        class="upload-demo"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :limit="1"
        :on-exceed="handleExceed"
        :auto-upload="false"
    >
        <template #trigger>
            <e-button-m type="primary">select file</e-button-m>
        </template>
        <e-button-m class="ml-3" type="success" @click="submitUpload"
            >upload to server</e-button-m
        >
        <template #tip>
            <div class="ep-upload__tip text-red">
                limit 1 file, new file will cover the old file
            </div>
        </template>
    </e-upload-m>
</template>
<script lang="ts" setup>
    import { ref } from "vue";
    import { genFileId } from "@epoint-mfe/eui-components";
    import type {
        UploadProps,
        UploadFile,
        UploadFiles,
    } from "@epoint-mfe/eui-components";
    const upload = ref<any>();
    const submitUpload = () => {
        upload.value!.submit();
    };
    const handleExceed: UploadProps["onExceed"] = (files: UploadFiles) => {
        upload.value!.clearFiles();
        const file = files[0];
        file.uid = genFileId();
        upload.value!.handleStart(file);
    };
</script>
```

## 用户头像

使用 `before-upload` 钩子来限制上传文件的格式和大小。

```html
<template>
    <e-upload-m
        class="avatar-uploader"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
    >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    </e-upload-m>
</template>

<script lang="ts" setup>
    import { ref } from "vue";
    import type {
        UploadProps,
        UploadFile,
        UploadFiles,
    } from "@epoint-mfe/eui-components";
    const imageUrl = ref("");

    const handleAvatarSuccess: UploadProps["onSuccess"] = (
        response: Response,
        uploadFile: UploadFile
    ) => {
        imageUrl.value = uploadFile.url!;
    };

    const beforeAvatarUpload: UploadProps["beforeUpload"] = (
        rawFile: UploadFile
    ) => {
        if (rawFile.type !== "image/jpeg") {
            ejs.ui.toast("Avatar picture must be JPG format!");
            return false;
        } else if (rawFile.size / 1024 / 1024 > 2) {
            ejs.ui.toast("Avatar picture size can not exceed 2MB!");
            return false;
        }
        return true;
    };
</script>

<style scoped>
    .avatar {
        width: 80px;
        height: 80px;
        display: block;
    }
</style>
```

## 照片墙

使用 `list-type` 来更改文件列表的样式。

```html
<template>
    <e-upload-m
        v-model:file-list="fileList"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        list-type="card"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
    ></e-upload-m>
    <em-dialog ref="emDialogRef"></em-dialog>
</template>

<script lang="ts" setup>
    import { ref } from "vue";
    import type {
        UploadProps,
        UploadFile,
        UploadFiles,
    } from "@epoint-mfe/eui-components";
    const emDialogRef = ref(null);
    const fileList = ref<UploadFiles>([
        {
            name: "food.jpeg",
            url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
            name: "plant-1.png",
            url: "/images/plant-1.png",
        },
        {
            name: "food.jpeg",
            url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
            name: "plant-2.png",
            url: "/images/plant-2.png",
        },
        {
            name: "food.jpeg",
            url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
            name: "figure-1.png",
            url: "/images/figure-1.png",
        },
        {
            name: "food.jpeg",
            url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
            name: "figure-2.png",
            url: "/images/figure-2.png",
        },
    ]);

    const handleRemove: UploadProps["onRemove"] = (
        file: UploadFile,
        uploadFiles: UploadFiles
    ) => {
        console.log(file, uploadFiles);
    };

    const handlePreview: UploadProps["onPreview"] = (
        uploadFile: UploadFile
    ) => {
        ImagePreview([uploadFile.url!]);
    };
</script>
```

## 自定义缩略图

使用 `scoped-slot`来更改默认缩略图模板。

```html
<template>
    <e-upload-m action="#" :auto-upload="false">
        <template #file="{ file }">
            <img
                class="ep-upload-list__item-thumbnail"
                :src="file.url"
                @click="handleShowTop(file)"
            />
        </template>
    </e-upload-m>
    <em-image-preview ref="emImagePreviewRef"></em-image-preview>
    <em-actionsheet
        @close="showTop = !showTop"
        v-model="showTop"
        :actions="actionsTop"
        @select="onSelectTop"
        close-on-click-action
    />
</template>
<script lang="ts" setup>
    import { ref } from "vue";
    import type {
        UploadProps,
        UploadFile,
        UploadFiles,
    } from "@epoint-mfe/eui-components";
    const emImagePreviewRef = ref(null);
    const showTop = ref(false);
    const actionsTop = ref([]);
    const uploadFile = ref<UploadFile>();

    function handleShowTop(
        file,
        enablePreview = true,
        enableDownload = true,
        enableDelete = true
    ) {
        showTop.value = true;
        uploadFile.value = file;
        actionsTop.value = [
            { name: "预览", disabled: !enablePreview },
            { name: "下载", disabled: !enableDownload },
            { name: "删除", disabled: !enableDelete },
        ];
    }
    function onSelectTop(item) {
        item.name === "预览" && handlePreview(uploadFile.value!);
        item.name === "下载" && handleDownload(uploadFile.value!);
        item.name === "删除" && handleRemove(uploadFile.value!);
    }
    const handleRemove = (file: UploadFile) => {
        console.log(file);
    };

    const handlePreview = (file: UploadFile) => {
        ImagePreview([file.url!]);
    };

    const handleDownload = (file: UploadFile) => {
        console.log(file);
    };
</script>
```

## 带缩略图的文件列表

```html
<template>
    <e-upload-m
        ref="upload"
        v-model:file-list="fileList"
        class="upload-demo"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        list-type="vertical"
    >
        <e-button-m type="primary">Click to upload</e-button-m>
        <template #tip>
            <div class="ep-upload__tip">
                jpg/png files with a size less than 500kb
            </div>
        </template>
    </e-upload-m>
</template>

<script lang="ts" setup>
    import { ref } from "vue";
    import type {
        UploadProps,
        UploadFile,
        UploadFiles,
    } from "@epoint-mfe/eui-components";
    const upload = ref<any>();
    const fileList = ref<UploadFiles>([
        {
            name: "food.jpeg",
            url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
            name: "food2.jpeg",
            url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
    ]);

    const handleRemove: UploadProps["onRemove"] = (
        file: UploadFile,
        uploadFiles: UploadFiles
    ) => {
        console.log(file, uploadFiles);
    };
    const handlePreview: UploadProps["onPreview"] = (file: UploadFile) => {
        console.log(file);
    };
</script>
```

## 文件列表控制

使用 `on-change` 钩子函数来控制上传文件列表。

```html
<template>
    <e-upload-m
        ref="upload"
        v-model:file-list="fileList"
        class="upload-demo"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :on-change="handleChange"
    >
        <e-button-m type="primary">Click to upload</e-button-m>
        <template #tip>
            <div class="ep-upload__tip">
                jpg/png files with a size less than 500kb
            </div>
        </template>
    </e-upload-m>
</template>
<script lang="ts" setup>
    import { ref } from "vue";

    import type {
        UploadProps,
        UploadFile,
        UploadFiles,
    } from "@epoint-mfe/eui-components";
    const upload = ref<any>();
    const fileList = ref<UploadFiles>([
        {
            name: "food.jpeg",
            url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
            name: "food2.jpeg",
            url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
    ]);
    const handleChange: UploadProps["onChange"] = (
        uploadFile: UploadFile,
        uploadFiles: UploadFiles
    ) => {
        fileList.value = fileList.value.slice(-3);
    };
</script>
```

## 手动上传

```html
<template>
    <e-upload-m
        ref="upload"
        class="upload-demo"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :auto-upload="false"
    >
        <template #trigger>
            <e-button-m type="primary">select file</e-button-m>
        </template>
        <e-button-m class="ml-3" type="success" @click="submitUpload"
            >upload to server</e-button-m
        >
        <template #tip>
            <div class="ep-upload__tip">
                jpg/png files with a size less than 500kb
            </div>
        </template>
    </e-upload-m>
</template>
<script lang="ts" setup>
    import { ref } from "vue";
    import type {
        UploadProps,
        UploadFile,
        UploadFiles,
    } from "@epoint-mfe/eui-components";
    const upload = ref<any>();
    const submitUpload = () => {
        upload.value!.submit();
    };
</script>
```

## 排序

使用 `enableSort` 来开启拖拽排序

```html
<template>
    <e-upload-m
        v-model:file-list="fileList"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        enable-sort
        :on-sort-change="handleSortChange"
    ></e-upload-m>
</template>
<script lang="ts" setup>
    import { ref } from "vue";
    import type {
        UploadProps,
        UploadFile,
        UploadFiles,
    } from "@epoint-mfe/eui-components";
    const fileList = ref<UploadFiles>([
        {
            name: "food.jpeg",
            url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
            name: "plant-1.png",
            url: "/images/plant-1.png",
        },
        {
            name: "plant-2.png",
            url: "/images/plant-2.png",
        },
        {
            name: "figure-1.png",
            url: "/images/figure-1.png",
        },
        {
            name: "figure-2.png",
            url: "/images/figure-2.png",
        },
    ]);

    const handleSortChange: UploadProps["onSortChange"] = (
        uploadFiles: UploadFiles
    ) => {
        console.log(uploadFiles);
    };
</script>
```

## 权限控制

通过 `enable-add`、`enable-delete`、`enable-download`、`enable-preview` 可以控制组件上传、删除、下载、预览功能的开启情况。

```html
<template>
    <e-upload-m
        action="#"
        v-model:file-list="fileList"
        list-type="card"
        :enable-add="true"
        :enable-download="true"
        :enable-delete="true"
        :enable-preview="false"
    >
        <template #file="{ file, enableDelete, enableDownload, enablePreview }">
            <img
                :src="file.url"
                @click="handleShowTop(file, enablePreview, enableDownload, enableDelete)"
            />
        </template>
    </e-upload-m>
    <em-image-preview ref="emImagePreviewRef"></em-image-preview>
    <em-actionsheet
        @close="showTop = !showTop"
        v-model="showTop"
        :actions="actionsTop"
        @select="onSelectTop"
        close-on-click-action
    />
</template>
<script lang="ts" setup>
    import { ref } from "vue";
    import type {
        UploadProps,
        UploadFile,
        UploadFiles,
    } from "@epoint-mfe/eui-components";

    const uploadFile = ref<UploadFile>();
    const emImagePreviewRef = ref(null);
    const showTop = ref(false);
    const actionsTop = ref([]);
    const fileList = ref<UploadFiles>([
        {
            name: "food.jpeg",
            url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
            name: "plant-1.png",
            url: "/images/plant-1.png",
        },
        {
            name: "plant-2.png",
            url: "/images/plant-2.png",
        },
        {
            name: "figure-1.png",
            url: "/images/figure-1.png",
        },
        {
            name: "figure-2.png",
            url: "/images/figure-2.png",
        },
    ]);

    function handleShowTop(
        file,
        enablePreview = true,
        enableDownload = true,
        enableDelete = true
    ) {
        showTop.value = true;
        uploadFile.value = file;
        actionsTop.value = [
            { name: "预览", disabled: !enablePreview },
            { name: "下载", disabled: !enableDownload },
            { name: "删除", disabled: !enableDelete },
        ];
    }

    function onSelectTop(item) {
        item.name === "预览" && handlePreview(uploadFile.value!);
        item.name === "下载" && handleDownload(uploadFile.value!);
        item.name === "删除" && handleRemove(uploadFile.value!);
    }
    const handleRemove = (file: UploadFile) => {
        console.log("Delete", file);
    };

    const handlePreview = (file: UploadFile) => {
        ImagePreview([file.url!]);
    };

    const handleDownload = (file: UploadFile) => {
        console.log("Download", file);
    };
</script>
```

## Upload API

### Attributes

| Name                              | Description                                                                                                                      | Type                                                                                       | Default     | Required |
|-----------------------------------|----------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|-------------|----------|
| `action`                          | 请求的 URL 地址                                                                                                                  | `string`                                                                                   | —           | 是       |
| `headers`                         | 请求头部信息                                                                                                                     | `Headers \| Record<string, any>`                                                           | —           | 否       |
| `method`                          | 设置上传请求的方法                                                                                                               | `string`                                                                                   | `'post'`    | 否       |
| `multiple`                        | 是否允许上传多个文件                                                                                                             | `boolean`                                                                                  | `false`     | 否       |
| `data`                            | 请求的附加参数                                                                                                                   | `Record<string, any>`                                                                      | —           | 否       |
| `name`                            | 上传文件的键名                                                                                                                   | `string`                                                                                   | `'file'`    | 否       |
| `with-credentials`                | 是否发送 cookies                                                                                                                 | `boolean`                                                                                  | `false`     | 否       |
| `show-file-list`                  | 是否显示已上传文件列表                                                                                                           | `boolean`                                                                                  | `true`      | 否       |
| `accept`                          | 接受的文件类型，当 `thumbnail-mode === true` 时不起作用                                                                           | `string`                                                                                   | —           | 否       |
| `enable-sort`                     | 是否启用拖拽排序                                                                                                                 | `boolean`                                                                                  | `false`     | 否       |
| `on-preview`                      | 点击已上传文件时的钩子函数                                                                                                       | `(uploadFile: UploadFile) => void`                                                         | —           | 否       |
| `on-remove`                       | 删除文件时的钩子函数                                                                                                             | `(uploadFile: UploadFile, uploadFiles: UploadFiles) => void`                               | —           | 否       |
| `on-success`                      | 上传成功时的钩子函数                                                                                                             | `(response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => void`                | —           | 否       |
| `on-error`                        | 发生错误时的钩子函数                                                                                                             | `(error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => void`                 | —           | 否       |
| `on-progress`                     | 上传过程中的钩子函数                                                                                                             | `(evt: UploadProgressEvent, uploadFile: UploadFile, uploadFiles: UploadFiles) => void`     | —           | 否       |
| `on-change`                       | 选择文件、上传成功或上传失败时的钩子函数                                                                                          | `(uploadFile: UploadFile, uploadFiles: UploadFiles) => void`                               | —           | 否       |
| `on-exceed`                       | 超出限制时的钩子函数                                                                                                             | `(files: UploadFiles, uploadFiles: UploadFiles) => void`                                   | —           | 否       |
| `before-start`                    | 开始添加文件前的钩子函数，接受待添加的文件作为参数。如果返回 `false` 或返回一个被拒绝的 `Promise`，则会中止添加。可用来做文件的验证。 | `(rawFile: UploadFile) => Awaitable<boolean>`                                              | —           | 否       |
| `before-upload`                   | 上传前的钩子函数，接受待上传的文件作为参数。如果返回 `false` 或返回一个被拒绝的 `Promise`，则会中止上传。                            | `(rawFile: UploadFile) => Awaitable<void \| undefined \| null \| boolean \| File \| Blob>` | —           | 否       |
| `before-remove`                   | 删除文件前的钩子函数，接受文件和文件列表作为参数。如果返回 `false` 或返回一个被拒绝的 `Promise`，则会中止删除。                      | `(uploadFile: UploadFile, uploadFiles: UploadFiles) => Awaitable<boolean>`                 | —           | 否       |
| `file-list` / `v-model:file-list` | 默认的已上传文件列表                                                                                                             | `UploadFiles`                                                                              | `[]`        | 否       |
| `on-sort-change`                  | 排序成功后的钩子函数                                                                                                             | `(uploadFiles: UploadFiles) => void`                                                       | —           | 否       |
| `list-type`                       | 文件列表的类型                                                                                                                   | `'default' \| 'card' \| 'vertical'`                                                        | `'default'` | 否       |
| `auto-upload`                     | 是否自动上传文件                                                                                                                 | `boolean`                                                                                  | `true`      | 否       |
| `http-request`                    | 覆盖默认的 xhr 行为，允许你实现自己的上传文件请求                                                                                 | `(options: UploadRequestOptions) => XMLHttpRequest \| Promise<unknown>`                    | —           | 否       |
| `disabled`                        | 是否禁用上传                                                                                                                     | `boolean`                                                                                  | `false`     | 否       |
| `enable-add`                      | 是否允许新增文件                                                                                                                 | `boolean`                                                                                  | `true`      | 否       |
| `enable-delete`                   | 是否允许删除文件                                                                                                                 | `boolean`                                                                                  | `true`      | 否       |
| `enable-download`                 | 是否允许下载文件                                                                                                                 | `boolean`                                                                                  | `false`     | 否       |
| `enable-preview`                  | 是否允许预览文件                                                                                                                 | `boolean`                                                                                  | `false`     | 否       |
| `limit`                           | 允许的最大上传数量                                                                                                               | `number`                                                                                   | —           | 否       |
| `limit-alert`                     | 上传超过最大可上传文件数的文本提示                                                                                               | `string`                                                                                   | —           | 否       |

### Slots

| Name      | Description          | Type                                                                                           |
|-----------|----------------------|------------------------------------------------------------------------------------------------|
| `default` | 自定义默认内容       | -                                                                                              |
| `trigger` | 触发文件对话框的内容 | -                                                                                              |
| `tip`     | 提示内容             | -                                                                                              |
| `file`    | 缩略图模板的内容     | `{ file: UploadFile, enableDelete: Boolean, enableDownload: Boolean, enablePreview: Boolean }` |

### Exposes

| Name           | Description                                             | Type                            |
|----------------|---------------------------------------------------------|---------------------------------|
| `abort`        | 取消上传请求                                            | `(file: UploadFile) => void`    |
| `submit`       | 手动上传文件列表                                        | `() => void`                    |
| `clearFiles`   | 清空文件列表（此方法不支持在 `before-upload` 钩子中使用） | `() => void`                    |
| `handleStart`  | 手动选择文件                                            | `(rawFile: UploadFile) => void` |
| `handleRemove` | 手动移除文件                                            | `(file: UploadFile) => void`    |
| `triggerClick` | 手动触发选择文件                                        | `() => void`                    |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-upload-m"
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