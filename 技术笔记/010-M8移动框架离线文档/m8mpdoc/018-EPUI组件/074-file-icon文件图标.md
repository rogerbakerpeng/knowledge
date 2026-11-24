# FileIcon 文件图标

根据文件名或扩展名自动匹配对应的文件类型图标。支持 37 种内置文件类型，同时支持自定义图标注册和渲染。

> **框架支持版本**：8.4.6-beta.2+

## 基础用法

传入文件名或扩展名（不区分大小写），组件自动匹配图标。内置图标使用 base64 data URI 渲染，H5 端与小程序端均适用。

```html
<!-- 扩展名 -->
<e-file-icon-m icon="pdf" />
<!-- 完整文件名 -->
<e-file-icon-m icon="report.docx" />
<!-- 带路径 -->
<e-file-icon-m icon="/path/to/image.png" />
```

## 内置图标类型

| 分类 | 支持的后缀名 |
|------|-------------|
| 文档 | `pdf`, `doc`, `docx`, `xls`, `xlsx`, `ppt`, `pptx`, `txt`, `ofd` |
| 压缩 | `zip`, `rar` |
| 图片 | `jpg`, `jpeg`, `png`, `gif`, `bmp`, `tif`, `tiff`, `svg`, `ai`, `eps`, `ico`, `ps` |
| 代码 | `html`, `css`, `js`, `json`, `xml`, `md`, `log`, `java`, `vue`, `properties` |
| 音频 | `wav`, `mp3` |
| 视频 | `mp4`, `wmv` |
| 其他 | `dll`, `swf`, `iso`, `com`, `class`, `ioc` |

> **默认图标**：扩展名不匹配时显示灰色问号兜底图标。可通过 `setDefaultFileIcon` 替换。

## 注册自定义图标

### 通过 Vue 组件（仅 H5 端）

```ts
import { registerFileIcons } from '@epoint-mfe/eui-components';
import IconCad from './icon-cad.vue';

registerFileIcons({
    cad: IconCad,
    dwg: IconCad
});
```

### 通过 base64 字符串（跨端通用）

传入 base64 data URI 或图片 URL，H5 和小程序端均以 `<image>` 渲染：

```ts
import { registerFileIcons } from '@epoint-mfe/eui-components';

registerFileIcons({
    ep: 'data:image/svg+xml;base64,...',        // base64 data URI
    dat: 'https://example.com/icon-dat.png'     // 或图片 URL
});
```

## 注册扩展名映射

将多个扩展名映射到同一个图标（跨平台生效）：

```ts
import { registerExtMappings } from '@epoint-mfe/eui-components';

// 批量注册映射关系
registerExtMappings({
  '7z': 'zip',    // .7z 文件使用 zip 图标
  tar: 'zip',     // .tar 文件使用 zip 图标
});
```

## 设置默认图标

替换未匹配到任何图标时的兜底图标。支持 Vue 组件（H5）或 base64 字符串（跨端）：

```ts
import { setDefaultFileIcon } from '@epoint-mfe/eui-components';
import CustomDefault from './custom-default.vue';

// Vue 组件（仅 H5）
setDefaultFileIcon(CustomDefault);
// base64 字符串（跨端）
setDefaultFileIcon('data:image/svg+xml;base64,...');
// 传 null 恢复为内置默认
setDefaultFileIcon(null);
```

> **注意**：`setDefaultFileIcon` 全局生效

## 局部自定义渲染

在单个 `e-file-icon-m` 组件上通过 `custom-icon-render` 属性定制渲染逻辑。返回 Vue 组件（仅 H5）或 base64/URL 字符串（跨端）：

```html
<template>
    <e-file-icon-m icon="special.xyz" :custom-icon-render="customRender" />
</template>

<script setup>
import IconSpecial from './icon-special.vue';

const customRender = (fileName: string) => {
    if (fileName.endsWith('.xyz')) return IconSpecial;      // Vue 组件（仅 H5）
    // if (fileName.endsWith('.str')) return 'data:image/svg+xml,...';  // base64（跨端）
    return null;
};
</script>
```

## provide/inject 注入

父组件通过 `provide` 注入，子组件 `e-file-icon-m` 自动生效。返回 Vue 组件（仅 H5）或 base64/URL 字符串（跨端）：

```ts
import { customIconRenderKey } from '@epoint-mfe/eui-components';

provide(customIconRenderKey, (fileName: string) => {
    if (fileName.endsWith('.bak')) return IconBak;          // Vue 组件（仅 H5）
    // if (fileName.endsWith('.inj')) return 'data:image/svg+xml,...';  // base64（跨端）
    return null;
});
```

## 在 Upload 组件中统一定制

通过 provide 注入 `customIconRenderKey`，批量影响 Upload 中所有文件图标：

```html
<template>
    <e-upload-m :custom-icon-render="customRender">
        <e-button>选择文件</e-button>
    </e-upload-m>
</template>

<script setup>
import IconSpecial from './icon-special.vue';
const customRender = (fileName: string) => {
    if (fileName.endsWith('.msg')) return IconSpecial;
    return null;
};
</script>
```

## 跨端能力

| API | Vue 组件入参/返回 | base64/URL 入参/返回 |
|-----|:--:|:--:|
| 内置图标 | — | ✓ 跨端 |
| `registerFileIcons` | ✓ 仅 H5 | ✓ 跨端 |
| `registerExtMappings` | — | ✓ 跨端 |
| `setDefaultFileIcon` | ✓ 仅 H5 | ✓ 跨端 |
| `customIconRender` | ✓ 仅 H5 | ✓ 跨端 |
| `provide`/`inject` | ✓ 仅 H5 | ✓ 跨端 |

> **原理**：Vue 组件通过 `<component :is>` 渲染，仅 H5 可用。base64/URL 字符串通过 `<image :src>` 渲染，跨端通用。所有自定义 API 同时支持两种参数类型。

## API

### Attributes

| 属性名 | 说明 | 类型 | 默认值 | 必填 |
|--------|------|------|--------|------|
| `icon` | 文件名或扩展名 | `string` | — | 是 |
| `custom-icon-render` | 自定义图标渲染函数（仅 H5） | `(fileName: string) => Component \| string \| null \| undefined` | — | 否 |

### 全局方法

| 方法名 | 说明 | 参数 | 平台 |
|--------|------|------|------|
| `registerFileIcons` | 批量注册图标 | `(iconMap: Record<string, Component \| string>)` | 组件仅 H5，字符串跨端 |
| `registerExtMappings` | 批量注册扩展名映射 | `(extMap: Record<string, string>)` | 跨平台 |
| `setDefaultFileIcon` | 设置默认图标 | `(icon: Component \| string \| null)` | 组件仅 H5，字符串跨端 |

### Provide/Inject Keys

| Key | 说明 | 类型 |
|-----|------|------|
| `customIconRenderKey` | 自定义渲染函数的注入键 | `Symbol` |
