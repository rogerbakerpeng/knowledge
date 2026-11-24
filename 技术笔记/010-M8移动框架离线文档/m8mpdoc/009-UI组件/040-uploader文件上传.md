# 组件使用

## uploader 文件上传

### 介绍

-   文件上传组件。

### 代码演示

#### 基础用法

文件上传完毕后会触发 `after-read` 回调函数，获取到对应的 `file` 对象。

```html
<em-uploader :after-read="afterRead" />
```

::: ifdef M83

```js
export default {
    methods: {
        afterRead(file, detail) {
            // 此时可以自行将文件上传至服务器
            console.log(file, detail);
        }
    }
};
```

::: endif

::: ifdef M84

```js
const afterRead = (file, detail) => {
    // 此时可以自行将文件上传至服务器
    console.log(file, detail);
};
```

::: endif

#### 文件预览

通过`v-model`可以绑定已经上传的文件列表，并展示文件列表的预览图。

```html
<em-uploader v-model="fileList" multiple />
```

::: ifdef M83

```js
export default {
    data() {
        return {
            fileList: [
                { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
                // Uploader 根据文件后缀来判断是否为图片文件
                // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
                { url: 'https://cloud-image', isImage: true }
            ]
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';

const fileList = ref([
    { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
    // Uploader 根据文件后缀来判断是否为图片文件
    // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
    { url: 'https://cloud-image', isImage: true }
]);
```

::: endif

#### 上传状态

通过 `status` 属性可以标识上传状态，`uploading` 表示上传中，`failed` 表示上传失败，`done` 表示上传完成。

```html
<em-uploader v-model="fileList" :after-read="afterRead" />
```

::: ifdef M83

```js
export default {
    data() {
        return {
            fileList: [
                {
                    url: 'https://img.yzcdn.cn/vant/leaf.jpg',
                    status: 'uploading',
                    message: '上传中...'
                },
                {
                    url: 'https://img.yzcdn.cn/vant/tree.jpg',
                    status: 'failed',
                    message: '上传失败'
                }
            ]
        };
    },
    methods: {
        afterRead(file, detail) {
            file.status = 'uploading';
            file.message = '上传中...';

            setTimeout(() => {
                file.status = 'failed';
                file.message = '上传失败';
            }, 1000);
        }
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';

const fileList = ref([
    {
        url: 'https://img.yzcdn.cn/vant/leaf.jpg',
        status: 'uploading',
        message: '上传中...'
    },
    {
        url: 'https://img.yzcdn.cn/vant/tree.jpg',
        status: 'failed',
        message: '上传失败'
    }
]);

const afterRead = (file, detail) => {
    file.status = 'uploading';
    file.message = '上传中...';

    setTimeout(() => {
        file.status = 'failed';
        file.message = '上传失败';
    }, 1000);
};
```

::: endif

#### 限制上传数量

通过 `max-count` 属性可以限制上传文件的数量，上传数量达到限制后，会自动隐藏上传区域。

```html
<em-uploader v-model="fileList" multiple :max-count="2" />
```

::: ifdef M83

```js
export default {
    data() {
        return {
            fileList: []
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';

const fileList = ref([]);
```

::: endif

#### 限制上传大小

通过 `max-size` 属性可以限制上传文件的大小，超过大小的文件会被自动过滤，这些文件信息可以通过 `oversize` 事件获取。

```html
<em-uploader multiple :max-size="14 * 1024" @oversize="onOversize" />
```

::: ifdef M83

```js
export default {
    methods: {
        onOversize(file) {
            console.log(file);
        }
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';

const oversize = (file) => {
    console.log(file);
};
```

::: endif

#### 自定义上传样式

通过默认插槽可以自定义上传区域的样式。

```html
<em-uploader>
    <em-button icon="plus" type="primary">上传文件</em-button>
</em-uploader>
```

#### 上传前置处理

通过传入 `beforeRead` 函数可以在上传前进行校验和处理，返回 `true` 表示校验通过，返回 `false` 表示校验失败。支持返回 `Promise` 对 `file` 对象进行自定义处理，例如压缩图片。

::: ifdef M83

```html
<em-uploader :before-read="beforeRead" />
<em-toast ref="emToast"></em-toast>
```

```js
export default {
    methods: {
        // 返回布尔值
        beforeRead(file) {
            if (file.type !== 'image/jpeg') {
                Toast('请上传 jpg 格式图片');
                return false;
            }
            return true;
        },
        // 返回 Promise
        asyncBeforeRead(file) {
            return new Promise((resolve, reject) => {
                if (file.type !== 'image/jpeg') {
                    Toast('请上传 jpg 格式图片');
                    reject();
                } else {
                    let img = new File(['foo'], 'bar.jpg', {
                        type: 'image/jpeg'
                    });
                    resolve(img);
                }
            });
        }
    }
};
```

::: endif
::: ifdef M84

```html
<em-uploader :before-read="beforeRead" />
<em-toast ref="emToastRef"></em-toast>
```

```js
import { ref } from 'vue';

const beforeRead = (file) => {
    if (file.type !== 'image/jpeg') {
        Toast('请上传 jpg 格式图片');
        return false;
    }
    return true;
};

const asyncBeforeRead = (file) => {
    return new Promise((resolve, reject) => {
        if (file.type !== 'image/jpeg') {
            Toast('请上传 jpg 格式图片');
            reject();
        } else {
            let img = new File(['foo'], 'bar.jpg', {
                type: 'image/jpeg'
            });
            resolve(img);
        }
    });
};

const emToastRef = ref(null);

defineExpose({
    emToastRef
});
```

::: endif

#### 禁用文件上传

通过 `disabled` 属性禁用文件上传

```html
<em-uploader disabled />
```

#### 自定义单个图片预览

在 `v-model` 数组中设置单个预览图片属性，支持 `imageFit` `deletable` `previewSize` `beforeDelete`，从 `8.2.10` 版本开始支持。

::: ifdef M83

```html
<em-uploader v-model="fileList" :deletable="false" />
<em-toast ref="emToast"></em-toast>
```

```js
export default {
  data() {
    return {
      fileList = [
        { url: 'https://img01.yzcdn.cn/vant/leaf.jpg' },
        {
          url: 'https://img01.yzcdn.cn/vant/sand.jpg',
          deletable: true,
          beforeDelete: () => {
            Toast('自定义单个预览图片的事件和样式');
          },
        },
        {
          url: 'https://img01.yzcdn.cn/vant/tree.jpg',
          deletable: true,
          imageFit: 'contain',
          previewSize: 120,
        },
      ];
    }
  }
};
```

::: endif
::: ifdef M84

```html
<em-uploader v-model="fileList" :deletable="false" />
<em-toast ref="emToastRef"></em-toast>
```

```js
import { ref } from 'vue';

const fileList = ref([
    { url: 'https://img01.yzcdn.cn/vant/leaf.jpg' },
    {
        url: 'https://img01.yzcdn.cn/vant/sand.jpg',
        deletable: true,
        beforeDelete: () => {
            Toast('自定义单个预览图片的事件和样式');
        }
    },
    {
        url: 'https://img01.yzcdn.cn/vant/tree.jpg',
        deletable: true,
        imageFit: 'contain',
        previewSize: 120
    }
]);

const emToastRef = ref(null);

defineExpose({
    emToastRef
});
```

::: endif

### API

建议在 ejs 容器中使用 ejs 方法进行上传。

#### Props

| 参数                               |                                                                                                                说明                                                                                                                 | 类型            | 默认值                |
| :--------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------- | :-------------------- |
| v-model (fileList)                 |                                                                                                          已上传的文件列表                                                                                                           | FileListItem[]  | -                     |
| useEjsUpload                       |                             ejs 环境下是否使用 ejs 方法进行选择文件、图片、视频, 注意，由于`ejs api`返回的是个本地路径，若该参数开启则无法正常展示预览图，建议上传后，使用接口返回的图片路径进行展示。                              | boolean         | `false`               |
| accept                             | 允许上传的文件类型，例如，选择所有图片和视频：`image/*,video/*`，(详细说明)[https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/file#%E9%99%90%E5%88%B6%E5%85%81%E8%AE%B8%E7%9A%84%E6%96%87%E4%BB%B6%E7%B1%BB%E5%9E%8B] | string          | `image/*`             |
| accept-extensions `v8.3.16-beta.1` |                                                                                     允许上传的文件后缀名，例如，`['jpg', 'png']`, 不区分大小写                                                                                      | array           | -                     |
| listType `v8.3.16-beta.1`          |                                                                                             列表样式类型：`default`、`card`、`vertical`                                                                                             | string          | `default`             |
| title `v8.3.16-beta.1`             |                                                                                                            附件上传标题                                                                                                             | string          | -                     |
| tip `v8.3.16-beta.1`               |                                                                                                            附件上传提示                                                                                                             | string          | -                     |
| required `v8.3.16-beta.1`          |                                                                                                附件上传必填样式，`title`不为空时生效                                                                                                | boolean         | `false`               |
| name                               |                                                                                              标识符，可以在回调函数的第二项参数中获取                                                                                               | number / string | -                     |
| preview-size                       |                                                                                                预览图和上传区域的尺寸，默认单位为 px                                                                                                | number / string | `80px`                |
| preview-image                      |                                                                                                     是否在上传完成后展示预览图                                                                                                      | boolean         | `true`                |
| preview-full-image                 |                                                                                                 是否在点击预览图后展示全屏图片预览                                                                                                  | boolean         | `true`                |
| preview-options                    |                                                                                         全屏图片预览的配置项，可选值见 `ImagePreview` 组件                                                                                          | object          | -                     |
| multiple                           |                                                                                                是否开启图片多选，部分安卓机型不支持                                                                                                 | boolean         | `false`               |
| disabled                           |                                                                                                          是否禁用文件上传                                                                                                           | boolean         | `false`               |
| deletable                          |                                                                                                          是否展示删除按钮                                                                                                           | boolean         | `true`                |
| show-upload                        |                                                                                                          是否展示上传区域                                                                                                           | boolean         | `true`                |
| lazy-load                          |                                                                                                        是否开启图片懒加载，                                                                                                         | boolean         | `false`               |
| capture                            |                                                                                      图片选取模式，可选值为 `camera` `album` (直接调起摄像头)                                                                                       | array           | `['camera', 'album']` |
| after-read                         |                                                                                                      文件读取完成后的回调函数                                                                                                       | Function        | -                     |
| before-read                        |                                                                                文件读取前的回调函数，返回 `false` 可终止文件读取，支持返回`Promise`                                                                                 | Function        | -                     |
| before-delete                      |                                                                                文件删除前的回调函数，返回 `false` 可终止文件读取，支持返回`Promise`                                                                                 | Function        | -                     |
| max-size                           |                                                                                                     文件大小限制，单位为 `byte`                                                                                                     | number / string | -                     |
| max-count                          |                                                                                                          文件上传数量限制                                                                                                           | number / string | -                     |
| result-type                        |                                                 文件读取结果类型，可选值为 `dataUrl` `text`，注意，当开启`useEjsUpload`参数时，ejs 环境下该参数设置无效，文件只能读取到一个本地路径                                                 | string          | `file`                |
| upload-text                        |                                                                                                          上传区域文字提示                                                                                                           | **string**      | -                     |
| image-fit                          |                                                                                                预览图裁剪模式，可选值见 `Image` 组件                                                                                                | string          | `cover`               |
| upload-icon                        |                                                                                                     上传区域图标名称或图片链接                                                                                                      | string          | `photograph`          |

##### accept

1. 在微信小程序和支付宝小程序中，上传图片或视频，底部弹窗由框架组件实现，弹窗内容依据`accept`及`capture`值展示，点击弹窗选项会调用`uniapp`提供的 API 选择图片或视频。

2. 在`H5`环境中，自框架`v8.3.10`开始，组件最终调用原生`input`实现功能，上传文件类型通过`accept`属性控制。由于各端浏览器实现不同，框架组件并未在 H5 环境中统一弹窗，弹窗内容由各端浏览器实现。

3. 在`EJS`环境中，设置`useEjsUpload`为`true`时，通过`ejs`方法实现不同文件选择，底部弹窗由框架组件实现。设置`useEjsUpload`为`false`时，自框架`v8.3.10`开始，调用原生`input`实现功能，上传文件类型通过`accept`属性控制。注意，`EJS-Android`环境下，由`input`唤起的底部弹窗由`EJS`原生实现，弹窗内容由`accept`一些特殊值决定，这些特殊值有必要在此说明下：

| 值             |          说明          |
| :------------- | :--------------------: |
| `image/*`      |    `相册`（仅图片）    |
| `imagevideo/*` |  `相册`（图片、视频）  |
| `camera/*`     |         `拍照`         |
| `video/*`      |         `录像`         |
| `file/*`       |         `文件`         |
| `*/*`          | `文件`、`相册`、`拍照` |

以上几项也可以互相组合，用`_`连接，例如 `image_camera/*` 会弹出 `相册`、`拍照`选项。若不设置`accept`，在`EJS-Android`环境默认是`image_camera/*`。

4. 支付宝小程序不支持`file`类型上传，如果需要上传 pdf 类似文件，请单独使用支付宝小程序-文件管理系统：https://opendocs.alipay.com/mini/02pmiu。

#### Events

| 事件名                        |              说明              | 回调参数                                                                |
| :---------------------------- | :----------------------------: | :---------------------------------------------------------------------- |
| oversize                      |     文件大小超过限制时触发     | 同`after-read`                                                          |
| click-preview                 |        点击预览图时触发        | 同`after-read`                                                          |
| close-preview                 |        关闭预览图时触发        | 同`after-read`                                                          |
| delete                        |       删除文件预览时触发       | 同`after-read`                                                          |
| errextension `v8.3.16-beta.1` | 上传文件后缀名校验未通过时触发 | `file`: object，上传的文件, `acceptExtensions`: array，允许的后缀名列表 |

#### Slots

| 名称    |      说明      | SlotProps |
| :------ | :------------: | :-------- |
| default | 自定义上传区域 | -         |

#### 回调参数

`before-read`、`after-read`、`before-delete` 执行时会传递以下回调参数：

| 参数名 |                 说明                  | 类型   |
| :----- | :-----------------------------------: | :----- |
| file   |              `file` 对象              | object |
| detail | 额外信息，包含 `name` 和 `index` 字段 | object |

#### ResultType 可选值

`result-type`字段表示文件读取结果的类型，上传大文件时，建议使用 `file` 类型，避免卡顿。

以当前端数据传输为准

| 值      |                               描述                                |
| :------ | :---------------------------------------------------------------: |
| file    |                   结果仅包含 `File` 对象 `file`                   |
| text    |      结果包含 `File` 对象`file`，以及文件的文本内容`content`      |
| dataUrl | 结果包含 `File` 对象`file`，以及文件对应的 `base64` 编码`content` |

#### 方法

通过 `ref` 可以获取到 `Uploader` 实例并调用实例方法，详见组件实例方法

| 方法名            |                                     说明                                     | 参数 | 返回值 |
| :---------------- | :--------------------------------------------------------------------------: | :--- | :----: |
| closeImagePreview |                              关闭全屏的图片预览                              | -    |   -    |
| chooseFile        | 主动调起文件选择，由于浏览器安全限制，只有在用户触发操作的上下文中调用才有效 | -    |   -    |

::: ifdef M83

<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-uploader"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-uploader"
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
