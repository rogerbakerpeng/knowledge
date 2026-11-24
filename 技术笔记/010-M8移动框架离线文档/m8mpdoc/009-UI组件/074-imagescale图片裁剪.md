# 组件使用

## imagescale 图片裁剪

### 介绍

-   图片裁剪组件。

### 代码演示

#### 基础图片裁剪

```html
<image :src="url1" v-if="url1" mode="widthFix"></image>
<em-image-scale
    v-if="show1"
    :image-url="imageUrl1"
    @success="
                url1 = $event.url;
                show1 = false;
            "
    @cancel="show1 = false"
/>
<button @click="show1 = true">基础图片裁剪</button>
```

::: ifdef M83

```js
export default {
    name: 'Imagescale',
    data() {
        return {
            show1: false,
            url1: '',
            imageUrl1: '/static/logo.jpg'
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
// 使用 ref 创建响应式数据
const show1 = ref(false);
const url1 = ref('');
const imageUrl1 = ref('/static/logo.jpg');
```

::: endif

#### 带功能图片裁剪

```html
<image :src="url2" v-if="url2" mode="widthFix"></image>
<em-image-scale
    v-if="show2"
    :isLockWidth="isLockWidth"
    :isLockHeight="isLockHeight"
    :isLockRatio="isLockRatio"
    :isLimitMove="isLimitMove"
    :isDisableScale="isDisableScale"
    :isDisableRotate="isDisableRotate"
    :isShowCancelBtn="isShowCancelBtn"
    :isShowPhotoBtn="isShowPhotoBtn"
    :isShowRotateBtn="isShowRotateBtn"
    :isShowConfirmBtn="isShowConfirmBtn"
    :image-url="imageUrl2"
    @success="
                url2 = $event.url;
                show2 = false;
            "
    @cancel="show2 = false"
>
    <!-- 四个基本按钮插槽 -->
    <template #cancel>
        <em-button>取消</em-button>
    </template>
    <template #photo>
        <em-button>选择图片</em-button>
    </template>
    <template #rotate>
        <em-button>旋转</em-button>
    </template>
    <template #confirm>
        <em-button>确定</em-button>
    </template>
    <!-- 默认插槽 -->
    <em-row class="tools">
        <em-col span="12">
            显示取消按钮
            <em-switch v-model="isShowCancelBtn" @change="(value) => isShowCancelBtn = value" />
        </em-col>
        <em-col span="12">
            显示选择图片按钮
            <em-switch v-model="isShowPhotoBtn" @change="(value) => isShowPhotoBtn = value" />
        </em-col>
        <em-col span="12">
            显示旋转按钮
            <em-switch v-model="isShowRotateBtn" @change="(value) => isShowRotateBtn = value" />
        </em-col>
        <em-col span="12">
            显示确定按钮
            <em-switch v-model="isShowConfirmBtn" @change="(value) => isShowConfirmBtn = value" />
        </em-col>
        <em-col span="12">
            锁定裁剪框宽度
            <em-switch v-model="isLockWidth" @change="(value) => isLockWidth = value" />
        </em-col>
        <em-col span="12">
            锁定裁剪框高度
            <em-switch v-model="isLockHeight" @change="(value) => isLockHeight = value" />
        </em-col>
        <em-col span="12">
            锁定裁剪框比例
            <em-switch v-model="isLockRatio" @change="(value) => isLockRatio = value" />
        </em-col>
        <em-col span="12">
            限制移动范围
            <em-switch v-model="isLimitMove" @change="(value) => isLimitMove = value" />
        </em-col>
        <em-col span="12">
            禁止缩放
            <em-switch v-model="isDisableScale" @change="(value) => isDisableScale = value" />
        </em-col>
        <em-col span="12">
            禁止旋转
            <em-switch v-model="isDisableRotate" @change="(value) => isDisableRotate = value" />
        </em-col>
    </em-row>
</em-image-scale>
<button @click="show2 = true">带功能图片裁剪</button>
```
::: ifdef M83
```js
export default {
    name: 'Imagescale',
    data() {
        return {
            show2: false,
            url2: '',
            imageUrl2: '/static/logo.jpg',
            isLockWidth: false,
            isLockHeight: false,
            isLockRatio: true,
            isLimitMove: false,
            isDisableScale: false,
            isDisableRotate: false,
            isShowCancelBtn: true,
            isShowPhotoBtn: true,
            isShowRotateBtn: true,
            isShowConfirmBtn: true
        };
    }
};
```
::: endif
::: ifdef M84
```js
import { ref } from 'vue';
// 使用 ref 创建响应式数据
const show2 = ref(false);
const url2 = ref('');
const imageUrl2 = ref('/static/logo.jpg');
const isLockWidth = ref(false);
const isLockHeight = ref(false);
const isLockRatio = ref(true);
const isLimitMove = ref(false);
const isDisableScale = ref(false);
const isDisableRotate = ref(false);
const isShowCancelBtn = ref(true);
const isShowPhotoBtn = ref(true);
const isShowRotateBtn = ref(true);
const isShowConfirmBtn = ref(true);
```
::: endif

### API

#### Props

| 参数                |                              说明                              | 类型    | 默认值  |
| :------------------ | :------------------------------------------------------------: | :------ | :------ | --- |
| image-url           |                            图片路径                            |         | string  | -   |
| quality             |   图片的质量，取值范围为 `[0, 1]`，不在范围内时当作 `1 `处理   | number  | `1`     |
| source              | `{album: '从相册中选择'}` key 为图片来源类型，value 为选项说明 | Object  | -       |
| width               |                   裁剪框高度，默认单位为`px`                   | number  | `400`   |
| height              |                           裁剪框宽度                           | number  | `400`   |
| min-width           |                         裁剪框最小高度                         | number  | `200`   |
| min-height          |                         裁剪框最小高度                         | number  | `200`   |
| max-width           |                         裁剪框最大宽度                         | number  | `600`   |
| max-height          |                         裁剪框最大高度                         | number  | `600`   |
| min-ratio           |                         图片最小缩放比                         | number  | `0.5`   |
| max-ratio           |                         图片最大缩放比                         | number  | `2`     |
| rotate-angle        |                     旋转按钮每次旋转的角度                     | number  | `90`    |
| scale-ratio         |      生成图片相对于裁剪框的比例， 比例越高生成图片越清晰       | number  | `1`     |
| is-lock-width       |                       是否锁定裁剪框宽度                       | boolean | `false` |
| is-lock-height      |                      是否锁定裁剪框高度上                      | boolean | `false` |
| is-lock-ratio       |                       是否锁定裁剪框比例                       | boolean | `true`  |
| is-disable-scale    |                          是否禁止缩放                          | boolean | `false` |
| is-disable-rotate   |                          是否禁止旋转                          | boolean | `false` |
| is-limit-move       |                        是否限制移动范围                        | boolean | `false` |
| is-show-photo-btn   |                      是否显示选择图片按钮                      | boolean | `true`  |
| is-show-rotate-btn  |                         是否显示转按钮                         | boolean | `true`  |
| is-show-confirm-btn |                        是否显示确定按钮                        | boolean | `true`  |
| is-show-cancel-btn  |                        是否显示关闭按钮                        | boolean | `true`  |

#### Events

| 事件名  |        说明        | 回调参数                                    |
| :------ | :----------------: | :------------------------------------------ |
| success |    生成图片成功    | ` {width, height, url}`                     |
| fail    |    生成图片失败    | -                                           |
| cancel  |        关闭        | -                                           |
| ready   |    图片加载完成    | ` {width, height, path, orientation, type}` |
| change  | 图片大小改变时触发 | `{width, height}`                           |
| rotate  |   图片旋转时触发   | -                                           |

#### Slots

| 名称    | 说明                                   |
| :------ | :------------------------------------- |
| default | 默认插槽，用于按钮栏底部插入自定义内容 |
| cancel  | 用于自定义取消按钮                     |
| photo   | 用于自定义选择图片按钮                 |
| rotate  | 用于自定义旋转按钮                     |
| confirm | 用于自定义确定按钮                     |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-image-scale"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-image-scale"
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
