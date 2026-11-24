# 组件使用

## actionsheet 动作面板

### 介绍

-   底部弹起的模态面板，包含与当前情境相关的多个选项。

### 代码演示

#### 基础用法

动作面板通过 `actions` 属性来定义选项，`actions` 属性是一个由对象构成的数组，数组中的每个对象配置一列。

::: ifdef M83

```html
<em-cell is-link title="基础用法" @click="showTop = true" />
<em-actionsheet
    title="标题"
    @close="showTop = !showTop"
    v-model="showTop"
    :actions="actionsTop"
    @select="onSelectTop"
/>
<em-toast ref="emToast"></em-toast>
```

```js
export default {
    data() {
        return {
            showTop: false,
            actionsTop: [{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }]
        };
    },
    methods: {
        onSelectTop(item) {
            // 默认情况下点击选项时不会自动收起
            // 可以通过 close-on-click-action 属性开启自动收起
            this.showTop = false;
            Toast({
                zIndex: 3000,
                message: item.name
            });
        }
    }
};
```

::: endif
::: ifdef M84

```html
<em-cell is-link title="基础用法" @click="showTop = true" />
<em-actionsheet
    title="标题"
    @close="showTop = !showTop"
    v-model="showTop"
    :actions="actionsTop"
    @select="onSelectTop"
/>
<em-toast ref="emToastRef"></em-toast>
```

```js
import { ref } from 'vue';

const showTop = ref(false);
const actionsTop = [{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }];

function onSelectTop(item) {
    // 默认情况下点击选项时不会自动收起
    // 可以通过 close-on-click-action 属性开启自动收起
    showTop.value = false;
    Toast({
        zIndex: 3000,
        message: item.name
    });
}

const emToastRef = ref(null);

defineExpose({
    emToastRef
});
```

::: endif

#### 展示取消按钮

设置 `cancel-text` 属性后，会在底部展示取消按钮，点击后关闭当前面板并触发 `cancel` 事件。

::: ifdef M83

```html
<em-actionsheet
    v-model="showBottom"
    :actions="actionsTop"
    cancel-text="取消"
    close-on-click-action
    @cancel="onCancel1"
    @close="showBottom = !showBottom"
/>
<em-toast ref="emToast"></em-toast>
```

```js
export default {
    data() {
        return {
            showBottom: false,
            actionsTop: [{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }]
        };
    },
    methods: {
        onCancel1() {
            Toast({
                zIndex: 3000,
                message: '取消'
            });
            this.showBottom = !this.showBottom;
        }
    }
};
```

::: endif
::: ifdef M84

```html
<em-actionsheet
    v-model="showBottom"
    :actions="actionsTop"
    cancel-text="取消"
    close-on-click-action
    @cancel="onCancel1"
    @close="showBottom = !showBottom"
/>
<em-toast ref="emToastRef"></em-toast>
```

```js
import { ref } from 'vue';

const showBottom = ref(false);
const actionsTop = [{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }];

function onCancel1() {
    Toast({
        zIndex: 3000,
        message: '取消'
    });
    showBottom.value = !showBottom.value;
}

const emToastRef = ref(null);

defineExpose({
    emToastRef
});
```

::: endif

#### 展示描述信息

通过 `description` 可以在菜单顶部显示描述信息，通过选项的 `subname` 属性可以在选项文字的右侧展示描述信息。

::: ifdef M83

```html
<em-actionsheet
    v-model="showLeft"
    :actions="actionsLeft"
    cancel-text="取消"
    description="这是一段描述信息"
    close-on-click-action
    @cancel="onCancel2"
    @close="showLeft = !showLeft"
/>
<em-toast ref="emToast"></em-toast>
```

```js
export default {
    data() {
        return {
            showLeft: false,
            actionsLeft: [{ name: '选项一' }, { name: '选项二' }, { name: '选项三', subname: '描述信息' }]
        };
    },
    methods: {
        onCancel2() {
            Toast({
                zIndex: 3000,
                message: '取消'
            });
            this.showLeft = !this.showLeft;
        }
    }
};
```

::: endif

::: ifdef M84

```html
<em-actionsheet
    v-model="showLeft"
    :actions="actionsLeft"
    cancel-text="取消"
    description="这是一段描述信息"
    close-on-click-action
    @cancel="onCancel2"
    @close="showLeft = !showLeft"
/>
<em-toast ref="emToastRef"></em-toast>
```

```js
import { ref } from 'vue';

const showLeft = ref(false);
const actionsLeft = [{ name: '选项一' }, { name: '选项二' }, { name: '选项三', subname: '描述信息' }];

function onCancel2() {
    Toast({
        zIndex: 3000,
        message: '取消'
    });
    showLeft.value = !showLeft.value;
}

const emToastRef = ref(null);

defineExpose({
    emToastRef
});
```

::: endif

#### 选项状态

可以通过 `loading` 和 `disabled` 将选项设置为加载状态或禁用状态，或者通过`color`设置选项的颜色

::: ifdef M83

```html
<em-actionsheet
    v-model="showStatus"
    :actions="actionsStatus"
    @close="showStatus = !showStatus"
    @cancel="showStatus = !showStatus"
    @select="onSelectTop"
    cancel-text="取消"
    close-on-click-action
/>
<em-toast ref="emToast"></em-toast>
```

```js
export default {
    data() {
        return {
            showStatus: false,
            actionsStatus: [
                { name: '着色选项', color: '#ee0a24' },
                { name: '禁用选项', disabled: true },
                { name: '加载选项', loading: true }
            ]
        };
    },
    methods: {
        onSelectTop(item) {
            // 默认情况下点击选项时不会自动收起
            // 可以通过 close-on-click-action 属性开启自动收起
            this.showStatus = false;
            Toast({
                zIndex: 3000,
                message: item.name
            });
        }
    }
};
```

::: endif

::: ifdef M84

```html
<em-actionsheet
    v-model="showStatus"
    :actions="actionsStatus"
    @close="showStatus = !showStatus"
    @cancel="showStatus = !showStatus"
    @select="onSelectTop"
    cancel-text="取消"
    close-on-click-action
/>
<em-toast ref="emToastRef"></em-toast>
```

```js
import { ref } from 'vue';

const showStatus = ref(false);
const actionsStatus = [
    { name: '着色选项', color: '#ee0a24' },
    { name: '禁用选项', disabled: true },
    { name: '加载选项', loading: true }
];

function onSelectTop(item) {
    // 默认情况下点击选项时不会自动收起
    // 可以通过 close-on-click-action 属性开启自动收起
    showTop.value = false;
    Toast({
        zIndex: 3000,
        message: item.name
    });
}

const emToastRef = ref(null);

defineExpose({
    emToastRef
});
```

::: endif

#### 自定义面板

通过插槽可以自定义面板的展示内容，同时可以使用`title`属性展示标题栏

```html
<em-actionsheet v-model="showZdy" @close="showZdy = !showZdy" title="标题">
    <div class="content">内容</div>
</em-actionsheet>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            showZdy: false
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';

const showZdy = ref(false);
```

::: endif

```html
<style>
    .content {
        padding: 16px 16px 160px;
    }
</style>
```

### API

#### Props

| 参数                                                                         |          说明          | 类型            | 默认值  |
| :--------------------------------------------------------------------------- | :--------------------: | :-------------- | :------ |
| v-model ::: ifdef M83 (value) ::: endif ::: ifdef M84 (modelValue) ::: endif |    是否显示动作面板    | boolean         | `false` |
| actions                                                                      |      面板选项列表      | Action[]        | `[]`    |
| title                                                                        |        顶部标题        | string          | -       |
| cancel-text                                                                  |      取消按钮文字      | string          | -       |
| description                                                                  |   选项上方的描述信息   | string          | -       |
| z-index                                                                      |      z-index 层级      | number          | 99      |
| closeable                                                                    |    是否显示关闭图标    | boolean         | `true`  |
| close-icon                                                                   | 关闭图标名称或图片链接 | string          | `cross` |
| duration                                                                     |   动画时长，单位毫秒   | number / string | `300`   |
| round                                                                        |      是否显示圆角      | boolean         | `true`  |
| overlay                                                                      |     是否显示遮罩层     | boolean         | `true`  |
| close-on-click-action                                                        |  是否在点击选项后关闭  | boolean         | `false` |
| close-on-click-overlay                                                       | 是否在点击遮罩层后关闭 | boolean         | `true`  |
| safe-area-inset-bottom                                                       | 是否开启底部安全区适配 | boolean         | `true`  |

#### Action 数据结构

`actions` 属性是一个由对象构成的数组，数组中的每个对象配置一列，对象可以包含以下值：

| 键名      |            说明            | 类型    |
| :-------- | :------------------------: | :------ |
| name      |            标题            | string  |
| subname   |          二级标题          | string  |
| color     |        选项文字颜色        | string  |
| className | 为对应列添加额外的 `class` | any     |
| loading   |       是否为加载状态       | boolean |
| disabled  |       是否为禁用状态       | boolean |

#### Events

| 事件          |                   说明                   | 回调参数                                     |
| :------------ | :--------------------------------------: | :------------------------------------------- |
| select        | 点击选项时触发，禁用或加载状态下不会触发 | action: Action 选项对应的对象, index: number |
| cancel        |            点击取消按钮时触发            | -                                            |
| open          |              打开面板时触发              | -                                            |
| close         |              关闭面板时触发              | -                                            |
| opened        |         打开面板且动画结束后触发         | -                                            |
| closed        |         关闭面板且动画结束后触发         | -                                            |
| click-overlay |             点击遮罩层时触发             | -                                            |

#### Slots

| 名称        |         说明         |
| :---------- | :------------------: |
| default     | 自定义面板的展示内容 |
| description |    自定义描述文案    |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-actionsheet"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-actionsheet"
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
