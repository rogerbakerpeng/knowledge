# 组件使用

## numberkeyboard 数字键盘

### 介绍

-   数字虚拟键盘，可以配合密码输入框组件或自定义的输入框组件使用。

### 代码演示

#### 默认样式

数字键盘提供了 `inputkey`、`delete`、`blur` 事件，分别对应输入内容、删除内容和失去焦点的动作

::: ifdef M83

```html
<em-cell title="弹出默认键盘" @click="show1 = true" is-link></em-cell>
<em-number-keyboard :show="show1" @blur="show1 = false" @inputkey="onInput" @delete="onDelete"></em-number-keyboard>
<em-toast ref="emToast"></em-toast>
```

```js
export default {
    data() {
        return {
            show1: false
        };
    },
    methods: {
        onInput(key) {
            Toast({
                message: `触发inputkey事件，key:${key}`
            });
        },
        onDelete() {
            Toast({
                message: '触发delete事件'
            });
        }
    }
};
```

::: endif
::: ifdef M84

```html
<em-cell title="弹出默认键盘" @click="show1 = true" is-link></em-cell>
<em-number-keyboard :show="show1" @blur="show1 = false" @inputkey="onInput" @delete="onDelete"></em-number-keyboard>
<em-toast ref="emToastRef"></em-toast>
```

```js
import { ref } from 'vue';
const show1 = ref(false);
const emToastRef = ref(null);
const onInput = (key) => {
    Toast({
        message: `触发inputkey事件，key:${key}`
    });
};

const onDelete = () => {
    Toast({
        message: '触发delete事件'
    });
};

defineExpose({
    emToastRef
});
```

::: endif

点击键盘以外的区域时，键盘会自动收起，通过设置`hide-on-click-outside`可以避免键盘收起。

#### 带右侧栏的键盘

将 `theme` 属性设置为 `custom` 来展示键盘的右侧栏，常用于输入金额的场景

```html
<em-cell title="带右侧栏的键盘" @click="show2 = true" is-link></em-cell>
<em-number-keyboard
    :show="show2"
    theme="custom"
    extra-key="."
    close-button-text="完成"
    @blur="show2 = false"
    @inputkey="onInput"
    @delete="onDelete"
></em-number-keyboard>
```

#### 身份证号键盘

通过 `extra-key` 属性可以设置左下角按键内容，比如需要输入身份证号时，可以将 `extra-key` 设置为 `X`

```html
<em-cell title="弹出身份证号键盘" @click="show3 = true" is-link></em-cell>
<em-number-keyboard
    :show="show3"
    extra-key="X"
    close-button-text="完成"
    @blur="show3 = false"
    @inputkey="onInput"
    @delete="onDelete"
></em-number-keyboard>
```

#### 键盘标题

通过 `title` 属性可以设置键盘标题

```html
<em-cell title="弹出带标题的键盘" @click="show4 = true" is-link></em-cell>
<em-number-keyboard
    :show="show4"
    title="键盘标题"
    extra-key="."
    close-button-text="完成"
    @blur="show4 = false"
    @inputkey="onInput"
    @delete="onDelete"
></em-number-keyboard>
```

#### 配置多个按键

当 `theme` 为 `custom` 时，支持以数组的形式配置两个 `extra-key`

```html
<em-cell title="弹出配置多个按键的键盘" @click="show5 = true" is-link></em-cell>
<em-number-keyboard
    :show="show5"
    :extra-key="['00', '.']"
    close-button-text="完成"
    @blur="show5 = false"
    @inputkey="onInput"
    @delete="onDelete"
></em-number-keyboard>
```

#### 双向绑定

可以通过 `v-model` 绑定键盘当前输入值

::: ifdef M83

```html
<em-field label="双向绑定" readonly clickable :value="value" @click-input="show6 = true"></em-field>
<em-number-keyboard v-model="value" :show="show6" :maxlength="6" @close="show6 = false"></em-number-keyboard>
```

```js
export default {
    data() {
        return {
            show6: false,
            value: ''
        };
    }
};
```

::: endif
::: ifdef M84

```html
<em-field label="双向绑定" readonly clickable :model-value="value" @click-input="show6 = true"></em-field>
<em-number-keyboard v-model="value" :show="show6" :maxlength="6" @close="show6 = false"></em-number-keyboard>
```

```js
import { ref } from 'vue';
const show6 = ref(false);
const value = ref('');
```

::: endif

#### 自定义插槽

::: ifdef M83

```html
<em-cell title="弹出自定义插槽的键盘" @click="show7 = true" is-link></em-cell>
<em-number-keyboard
    :show="show7"
    title="标题"
    close-button-text="确定"
    delete-button-text="删除"
    :transition="true"
    :random-key-order="true"
    :extra-key="'.'"
    :show-title-left="true"
    @blur="show7 = false"
    @inputkey="onInput"
    @delete="onDelete"
    @show="onShowFun"
    @hide="onHideFun"
>
    <template #extraKey>按键</template>
    <template #delete>删除</template>
    <template #titleLeft>标题左侧</template>
</em-number-keyboard>
<em-cell title="弹出自定义插槽的键盘2" @click="show8 = true" is-link></em-cell>
<em-number-keyboard
    :show="show8"
    theme="custom"
    title="标题"
    close-button-text="确定"
    delete-button-text="删除"
    :transition="true"
    :random-key-order="true"
    :extra-key="['.','00']"
    :show-title-left="true"
    :closeButtonLoading="true"
    @blur="show8 = false"
    @inputkey="onInput"
    @delete="onDelete"
    @show="onShowFun"
    @hide="onHideFun"
>
    <template #extraKey>按键</template>
    <template #delete>删除</template>
    <template #titleLeft>标题左侧</template>
</em-number-keyboard>
<em-toast ref="emToast"></em-toast>
```

```js
export default {
    data() {
        return {
            show7: false,
            show8: false,
            value: ''
        };
    },
    methods: {
        onInput(key) {
            Toast({
                message: `触发inputkey事件，key:${key}`
            });
        },
        onDelete() {
            Toast({
                message: '触发delete事件'
            });
        },
        onShowFun() {
            Toast({
                message: '触发show事件'
            });
        },
        onHideFun() {
            Toast({
                message: '触发hide事件'
            });
        }
    }
};
```

::: endif
::: ifdef M84

```html
<em-cell title="弹出自定义插槽的键盘" @click="show7 = true" is-link></em-cell>
<em-number-keyboard
    :show="show7"
    title="标题"
    close-button-text="确定"
    delete-button-text="删除"
    :transition="true"
    :random-key-order="true"
    :extra-key="'.'"
    :show-title-left="true"
    @blur="show7 = false"
    @inputkey="onInput"
    @delete="onDelete"
    @show="onShowFun"
    @hide="onHideFun"
>
    <template #extraKey>按键</template>
    <template #delete>删除</template>
    <template #titleLeft>标题左侧</template>
</em-number-keyboard>
<em-cell title="弹出自定义插槽的键盘2" @click="show8 = true" is-link></em-cell>
<em-number-keyboard
    :show="show8"
    theme="custom"
    title="标题"
    close-button-text="确定"
    delete-button-text="删除"
    :transition="true"
    :random-key-order="true"
    :extra-key="['.','00']"
    :show-title-left="true"
    :closeButtonLoading="true"
    @blur="show8 = false"
    @inputkey="onInput"
    @delete="onDelete"
    @show="onShowFun"
    @hide="onHideFun"
>
    <template #extraKey>按键</template>
    <template #delete>删除</template>
    <template #titleLeft>标题左侧</template>
</em-number-keyboard>
<em-toast ref="emToastRef"></em-toast>
```

```js
import { ref } from 'vue';
const show7 = ref(false);
const show8 = ref(false);
const value = ref('');

const onInput = (key) => {
    Toast({
        message: `触发inputkey事件，key:${key}`
    });
};

const onDelete = () => {
    Toast({
        message: '触发delete事件'
    });
};

const onShowFun = () => {
    Toast({
        message: '触发show事件'
    });
};

const onHideFun = () => {
    Toast({
        message: '触发hide事件'
    });
};

const emToastRef = ref(null);

defineExpose({
    emToastRef
});
```

::: endif

### API

#### Props

| 参数                                                                         |                            说明                             | 类型              | 默认值    |
| :--------------------------------------------------------------------------- | :---------------------------------------------------------: | :---------------- | :-------- |
| v-model ::: ifdef M83 (value) ::: endif ::: ifdef M84 (modelValue) ::: endif |                         当前输入值                          | string            | -         |
| show                                                                         |                        是否显示键盘                         | boolean           | -         |
| title                                                                        |                          键盘标题                           | string            | -         |
| theme                                                                        |                 样式风格，可选值为 `custom`                 | string            | `default` |
| maxlength                                                                    |                       输入值最大长度                        | number / string   | -         |
| transition                                                                   |                      是否开启过场动画                       | boolean           | `true`    |
| z-index                                                                      |                     键盘 `z-index` 层级                     | number / string   | `99`      |
| extra-key                                                                    |                     底部额外按键的内容                      | string / string[] | `''`      |
| close-button-text                                                            |                  关闭按钮文字，空则不展示                   | string            | -         |
| delete-button-text                                                           |               删除按钮文字，空则展示删除图标                | string            | -         |
| close-button-loading                                                         | 是否将关闭按钮设置为加载中状态，仅在 `theme="custom"`时有效 | boolean           | `false`   |
| show-delete-key                                                              |                      是否展示删除图标                       | boolean           | `true`    |
| hide-on-click-outside                                                        |                   点击外部时是否收起键盘                    | boolean           | `true`    |
| safe-area-inset-bottom                                                       |                   是否开启底部安全区适配                    | boolean           | `true`    |
| random-key-order                                                             |                 是否将通过随机顺序展示按键                  | boolean           | `false`   |
| show-title-left                                                              |                   是否展示 titleLeft slot                   | boolean           | `false`   |

#### Events

| 事件名   |              说明              | 回调参数      |
| :------- | :----------------------------: | :------------ |
| inputkey |         点击按键时触发         | key: 按键内容 |
| delete   |        点击删除键时触发        | -             |
| close    |       点击关闭按钮时触发       | -             |
| blur     | 点击关闭按钮或非键盘区域时触发 | -             |
| show     |       键盘完全弹出时触发       | -             |
| hide     |       键盘完全收起时触发       | -             |

#### Slots

| 名称         |                     说明                      |
| :----------- | :-------------------------------------------: |
| delete       |              自定义删除按键内容               |
| extraKey     |             自定义左下角按键内容              |
| extraKeyNext | 第二个自定义按键内容,仅在 theme=custom 时生效 |
| titleLeft    |             自定义标题栏左侧内容              |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-number-keyboard"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-number-keyboard"
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
