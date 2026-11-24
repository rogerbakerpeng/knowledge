# MessageBox 消息弹框

这是一组用于模拟系统消息框的模态框，主要用于警告信息、确认操作和提示消息。

TIP

MessageBox 的设计提供了对系统的 `alert`、`confirm` 和 `prompt` 的模拟，因此其内容应该保持简单。对于更复杂的内容，请使用 Dialog。

## 不同状态的消息弹窗

MessageBox 提供了多种状态类型，用于表达不同的信息提示场景。

通过设置 `type` 参数可以显示不同状态的消息框：成功（success）、警告（warning）和错误（error）。每种状态都有对应的图标和颜色，以便用户快速识别消息的重要性和类型。

```html
<template>
  <div class="demo-message-box">
    <p class="mb-4">不同状态的消息弹窗示例：</p>
    <div class="demo-message-box__buttons">
      <e-button-m @click="openDefault">默认消息框</e-button-m>
      <e-button-m type="success" @click="openSuccess">成功消息框</e-button-m>
      <e-button-m type="warning" @click="openWarning">警告消息框</e-button-m>
      <e-button-m type="danger" @click="openError">错误消息框</e-button-m>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { EpMessageBox } from '@epoint-mfe/eui-components';

const openDefault = () => {
  EpMessageBox.alert('这是一条默认消息提示', '提示', {
    confirmButtonText: '确定',
  });
};

const openSuccess = () => {
  EpMessageBox.alert('操作已成功完成', '成功', {
    type: 'success',
    confirmButtonText: '确定',
  });
};

const openWarning = () => {
  EpMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '警告', {
    type: 'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  });
};

const openError = () => {
  EpMessageBox.alert('系统检测到错误，请联系管理员', '错误', {
    type: 'error',
    confirmButtonText: '我知道了',
  });
};
</script>

<style scoped>
.demo-message-box__buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.mb-4 {
  margin-bottom: 16px;
}
</style>
```

## Alert

当用户进行操作时会被触发，该对话框中断用户操作，直到用户确认知晓后才可关闭。

通过调用 `EpMessageBox.alert` 方法来打开警告框。它模拟系统的 `alert`，无法通过按 ESC 键或点击框外部来关闭。在此示例中，接收了两个参数 `message` 和 `title`。值得注意的是，当框关闭时，它会返回一个 `Promise` 对象，以供进一步处理。

```html
<template>
  <e-button-m text @click="open">Click to open the Message Box</e-button-m>
</template>

<script lang="ts" setup>
import { EpMessage, EpMessageBox } from '@epoint-mfe/eui-components';
import type { Action } from '@epoint-fe/eui-components';

const open = () => {
  EpMessageBox.alert('This is a message', 'Title', {
    // if you want to disable its autofocus
    // autofocus: false,
    callback: (action: Action) => {
      EpMessage({
        type: 'info',
        message: `action: ${action}`,
      });
    },
  });
};
</script>
```

## Confirm

Confirm 用于请求用户的确认。

调用 `EpMessageBox.confirm` 方法以打开一个确认框，它模拟系统的 `confirm`。我们还可以通过传递第三个属性 `options` 来高度自定义消息框，它是一个字面对象。属性 `type` 指示消息类型，其值可以是 `success`、`error`、`info` 和 `warning`。请注意，第二个属性 `title` 必须是一个 `string`，如果它是一个 `object`，则将处理为属性 `options`。在这里，我们使用 `Promise` 来处理进一步的处理。

```html
<template>
  <e-button-m text @click="open">Click to open the Message Box</e-button-m>
</template>

<script lang="ts" setup>
import { EpMessage, EpMessageBox } from '@epoint-mfe/eui-components';

const open = () => {
  EpMessageBox.confirm('proxy will permanently delete the file. Continue?', 'Warning', {
    type: 'warning',
  })
    .then(() => {
      EpMessage({
        type: 'success',
        message: 'Delete completed',
      });
    })
    .catch(() => {
      EpMessage({
        type: 'info',
        message: 'Delete canceled',
      });
    });
};
</script>
```

## Prompt

当需要用户输入内容时，可以使用 Prompt 类型的消息框。

调用 `EpMessageBox.prompt` 方法以打开一个提示框，它模拟系统的 `prompt`。您可以使用 `inputPattern` 参数来指定自己的正则表达式模式。使用 `inputValidator` 来指定验证方法，它应该返回 `Boolean` 或 `String`。返回 `false` 或 `String` 表示验证失败，返回的字符串将用作 `inputErrorMessage`。此外，您还可以使用 `inputPlaceholder` 参数自定义输入框的占位符。

```html
<template>
  <e-button-m text @click="open">Click to open Message Box</e-button-m>
</template>

<script lang="ts" setup>
import { EpMessage, EpMessageBox } from '@epoint-mfe/eui-components';

const open = () => {
  EpMessageBox.prompt('请输入您的邮箱', '提示', {
    inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
    inputErrorMessage: '无效的邮箱格式',
    confirmButtonDisabled: true,
    inputValidator: (value, state, isValid) => {
      state.confirmButtonDisabled = !isValid;
      return isValid;
    }
  })
    .then(({ value }) => {
      EpMessage({
        type: 'success',
        message: `您的邮箱是: ${value}`,
      });
    })
    .catch(() => {
      EpMessage({
        type: 'info',
        message: '输入已取消',
      });
    });
};
</script>
```

## DeletePrompt

在删除场景中，需要用户进行二次确认，可以使用 DeletePrompt 类型的消息框。

调用 `EpMessageBox.deletePrompt` 方法打开一个提示框，它与 `Prompt` 弹框类似，但在 message 之后附加提示用户输入关键字内容确认的提示，同时整合了输入的内容必须和关键字匹配的验证逻辑。

```html
<template>
  <div>
    <e-divider-m>默认弹框</e-divider-m>
    <e-button-m text @click="openDefault">Click to open Default Delete Prompt Message Box</e-button-m>
    <e-divider-m>个性化弹框</e-divider-m>
    <e-button-m text @click="openCustom">Click to open Message Box</e-button-m>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { EpMessage, EpMessageBox } from '@epoint-mfe/eui-components';

// -- 默认
const hintValueDefault = ref('删除');
const openDefault = () => {
  EpMessageBox.deletePrompt({
    keyword: hintValueDefault.value,
  })
    .then(() => {
      EpMessage({
        type: 'success',
        message: `Delete success`,
      });
    })
    .catch(() => {
      EpMessage({
        type: 'info',
        message: 'Delete canceled',
      });
    });
};

// -- 个性化
const hintValueCustom = ref('你的名字');

const openCustom = () => {
  EpMessageBox.deletePrompt({
    message: '检查姓名',
    title: '确认删除',
    confirmTpl: ', 请再次输入姓名 %s ',
    keyword: hintValueCustom.value,
    inputErrorMessage: '输入名称不匹配',
    keywordSelectable: true,
  })
    .then(() => {
      EpMessage({
        type: 'success',
        message: `Delete success`,
      });
    })
    .catch(() => {
      EpMessage({
        type: 'info',
        message: 'Delete canceled',
      });
    });
};
</script>
```

`EpMessageBox.deletePrompt(options)` 中关于参数 `options` 说明：

- `keyword` 要求用户手动输入的内容，必须。
- `message` 删除提醒的内容，在整个内容中是前置的，后面会跟上确认关键字组织的内容。eg： `EpMessageBox.deletePrompt({keyword: '张三', message: '用户信息删除后不可恢复'})`。 实际内容为： “用户信息删除后不可恢复，请输入 张三 确认。”
- `confirmTpl` 确认内容的生成模板，可选。 默认值为 `'，请输入 %s 确认。'`。 如果配置必须包含 `%s`。
- `title` 弹出框的标题名称，可选。
- `keywordSelectable` 用于控制用户是否可以选中、复制关键词，默认关闭。
- `inputErrorMessage` 用于自定义验证失败时的错误消息。

WARNING

此 API 给删除场景下要输入关键字场景使用，如需对输入框校验进行个性化，只能使用 `inputValidator` 进行方法覆写。**请勿使用 `inputPattern` 防止逻辑被正则校验提前阻断。**

- `inputValidator` 逻辑参考：

```javascript
// 重复性校验
const inputValidator = (val, state) => {
  // 未传入关键词文本=>跳过校验
  if (!state.deleteKeyword) {
    return true;
  }
  return val == state.deleteKeyword;
};
```

## 使用 VNode

`message` 可以是 VNode。

```html
<template>
  <e-button-m plain @click="open">Common VNode</e-button-m>
  <e-button-m plain @click="open1">Dynamic props</e-button-m>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue';
import { EpMessageBox, EpSwitch } from '@epoint-mfe/eui-components';

const open = () => {
  EpMessageBox({
    title: 'Message',
    message: h('p', null, [h('span', null, 'Message can be '), h('i', { style: 'color: teal' }, 'VNode')]),
  });
};

const open1 = () => {
  const checked = ref<boolean | string | number>(false);
  EpMessageBox({
    title: 'Message',
    // Should pass a function if VNode contains dynamic props
    message: () =>
      h(EpSwitch, {
        modelValue: checked.value,
        'onUpdate:modelValue': (val: boolean | string | number) => {
          checked.value = val;
        },
      }),
  });
};
</script>
```

## 自定义

可以自定义以显示各种内容。

上面提到的三种方法都是 `EpMessageBox` 方法的重新封装。此示例直接调用 `EpMessageBox` 方法，使用 `showCancelButton` 属性来指示是否显示取消按钮。此外，我们还可以使用 `cancelButtonClass` 来添加自定义样式，使用 `cancelButtonText` 来自定义按钮文本（确认按钮也具有这些字段，完整字段列表可在本文档末尾找到）。此示例还使用了 `beforeClose` 属性。它是一个方法，将在 MessageBox 实例将被关闭时触发，并且其执行将阻止实例关闭。它有三个参数：`action`、`instance` 和 `done`。使用它可以在关闭之前操控实例，例如为确认按钮激活 `loading`；您可以调用 `done` 方法来关闭 MessageBox 实例（如果 `done` 在 `beforeClose` 内部没有被调用，实例将不会关闭）

```html
<template>
  <e-button-m text @click="open">Click to open Message Box</e-button-m>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { EpMessage, EpMessageBox } from '@epoint-mfe/eui-components';
const open = () => {
  EpMessageBox({
    title: 'Message',
    message: h('p', null, [h('span', null, 'Message can be '), h('i', { style: 'color: teal' }, 'VNode')]),
    showCancelButton: true,
    // confirmButtonText: 'OK',
    // cancelButtonText: 'Cancel',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true;
        instance.confirmButtonText = 'Loading...';
        setTimeout(() => {
          done();
          setTimeout(() => {
            instance.confirmButtonLoading = false;
          }, 300);
        }, 3000);
      } else {
        done();
      }
    },
  }).then((action) => {
    EpMessage({
      type: 'info',
      message: `action: ${action}`,
    });
  });
};
</script>
```

## 使用 HTML 字符串

`message` 支持 HTML 字符串。

将 `dangerouslyUseHTMLString` 设置为 `true`，`message` 将被视为 HTML 字符串。

```html
<template>
  <e-button-m text @click="open">Click to open Message Box</e-button-m>
</template>

<script lang="ts" setup>
import { EpMessageBox } from '@epoint-mfe/eui-components';

const open = () => {
  EpMessageBox.alert('<strong>proxy is <i>HTML</i> string</strong>', 'HTML String', {
    dangerouslyUseHTMLString: true,
  });
};
</script>
```

WARNING

虽然 `message` 属性支持 HTML 字符串，但在网站上动态渲染任意 HTML 可能非常危险，因为它很容易导致 [XSS 攻击](https://en.wikipedia.org/wiki/Cross-site_scripting)。因此，当 `dangerouslyUseHTMLString` 打开时，请确保 `message` 的内容是受信任的，**绝对不要**将 `message` 分配给用户提供的内容。

## 区分取消和关闭

在某些情况下，点击取消按钮和遮罩可能具有不同的含义。

默认情况下，Promise 的拒绝回调和 `callback` 的参数在用户取消（点击取消按钮）和关闭（点击遮罩层）MessageBox 时为 'cancel'。如果将 `distinguishCancelAndClose` 设置为 true，则上述两种操作的参数分别为 'cancel' 和 'close'。

```html
template>
  <e-button-m text @click="open">Click to open Message Box</e-button-m>
</template>

<script lang="ts" setup>
import { EpMessage, EpMessageBox } from '@epoint-mfe/eui-components';
import type { Action } from '@epoint-mfe/eui-components';
const open = () => {
  EpMessageBox.confirm('You have unsaved changes, save and proceed?', 'Confirm', {
    distinguishCancelAndClose: true,
    confirmButtonText: '保存',
    cancelButtonText: '取消修改',
  })
    .then(() => {
      EpMessage({
        type: 'info',
        message: 'Changes saved. Proceeding to a new route.',
      });
    })
    .catch((action: Action) => {
      EpMessage({
        type: 'info',
        message: action === 'cancel' ? 'Changes discarded. Proceeding to a new route.' : 'Stay in the current route',
      });
    });
};
</script>
```

## 自定义图标

图标可以自定义为任何 Vue 组件或 [渲染函数（JSX）](https://vuejs.org/guide/extras/render-function.html)。

```html
<template>
  <e-button-m text @click="open">Click to open Message Box</e-button-m>
</template>

<script lang="ts" setup>
import { markRaw } from 'vue';
import { EpMessageBox } from '@epoint-mfe/eui-components';
import { Delete } from '@epoint-mfe/eui-icons';

const open = () => {
  EpMessageBox.confirm('It will permanently delete the file. Continue?', 'Warning', {
    type: 'warning',
    icon: markRaw(Delete),
  });
};
</script>
```

## 应用程序上下文继承

现在 `MessageBox` 接受构造器的 `context` 作为第二个(如果你正在使用消息框变量的话) 参数，这个参数允许你将当前应用的上下文注入到消息中，这将允许你继承应用程序的所有属性。

```javascript
import { getCurrentInstance } from 'vue';
import { EpMessageBox } from '@epoint-mfe/eui-components';

// 在你的 setup 方法中
const { appContext } = getCurrentInstance()!;
// 你可以像这样传递参数：
EpMessageBox({}, appContext);
// 或者正在使用不同的调用方式
EpMessageBox.alert('Hello world!', 'Title', {}, appContext);
```

## 按需引入

如果您需要按需引入 `MessageBox`

```javascript
import { EpMessageBox } from '@epoint-mfe/eui-components';
```

那么对应于上述四个全局方法的调用方法依次为：`EpMessageBox`, `EpMessageBox.alert`, `EpMessageBox.confirm` and `EpMessageBox.prompt` 。 参数同上所述。

## Options

| Attribute                    | Description                                                  | Type                                                         | Default                                                      |
| :--------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| autofocus                    | 打开 MessageBox 时自动聚焦                                   | `boolean`                                                    | true                                                         |
| title                        | MessageBox 的标题                                            | `string`                                                     | —  （与 deletePrompt 一起调用时为 '确认删除'）               |
| message                      | MessageBox 的内容                                            | `string` / `VNode` / `Function`-`() => VNode`                | —  （与 deletePrompt 一起调用时为 '删除后不可恢复'）         |
| dangerouslyUseHTMLString     | 是否将 `message` 视为 HTML 字符串                            | `boolean`                                                    | false  （与 deletePrompt 一起调用时为 true）                 |
| type                         | 消息类型，用于显示图标                                       | `枚举`-`'success' \| 'info' \| 'warning' \| 'error'`         | —  （与 deletePrompt 一起调用时为 'warning'）                |
| icon                         | 自定义图标组件，覆盖 `type`                                  | `string \| Component`                                        | —                                                            |
| custom-class                 | MessageBox 的自定义类名                                      | `string`                                                     | —                                                            |
| custom-style                 | MessageBox 的自定义内联样式                                  | `CSSProperties`                                              | —                                                            |
| callback                     | MessageBox 关闭回调，如果不喜欢 Promise 可使用这个   回调参数中 `action` 可以是 'confirm'、'cancel' 或 'close'，`instance` 是 MessageBox 实例。您可以访问该实例的属性和方法 | `Function`-`(value: string, action: Action) => any \| (action: Action) => any` | —                                                            |
| before-close                 | MessageBox 关闭前的回调，它会阻止 MessageBox 关闭     回调参数中`action` 可以是 'confirm'、'cancel' 或 'close'；`instance` 是 MessageBox 实例，您可以访问该实例的属性和方法；`done` 用于关闭实例 | `Function`-`(action: Action, instance: MessageBoxState, done: () => void) => void` | —                                                            |
| distinguish-cancel-and-close | 是否区分取消和关闭 MessageBox                                | `boolean`                                                    | false                                                        |
| lock-scroll                  | MessageBox 提示时是否锁定页面滚动                            | `boolean`                                                    | true                                                         |
| show-cancel-button           | 是否显示取消按钮                                             | `boolean`                                                    | false  （与 confirm 、 prompt 和 deletePrompt 一起调用时为 true） |
| show-confirm-button          | 是否显示确认按钮                                             | `boolean`                                                    | true                                                         |
| cancel-button-text           | 取消按钮的文本内容                                           | `string`                                                     | Cancel                                                       |
| confirm-button-text          | 确认按钮的文本内容                                           | `string`                                                     | OK  （与 deletePrompt 一起调用时为 '确认删除'）              |
| cancel-button-class          | 取消按钮的自定义类名                                         | `string`                                                     | —                                                            |
| confirm-button-class         | 确认按钮的自定义类名                                         | `string`                                                     | —                                                            |
| close-on-click-modal         | 是否允许点击遮罩关闭 MessageBox                              | `boolean`                                                    | true  （与 alert、deletePrompt 一起调用时为 false）          |
| close-on-hash-change         | 是否在哈希更改时关闭 MessageBox                              | `boolean`                                                    | true                                                         |
| show-input                   | 是否显示输入框                                               | `boolean`                                                    | false  （与 prompt 和 deletePrompt 一起调用时为 true）       |
| input-placeholder            | 输入框的占位符                                               | `string`                                                     | —                                                            |
| input-type                   | 输入框的类型                                                 | `string`                                                     | text                                                         |
| input-value                  | 输入框的初始值                                               | `string`                                                     | —                                                            |
| input-pattern                | 输入框的正则表达式                                           | `regexp`                                                     | —                                                            |
| input-validator              | 输入框的验证函数。应返回布尔值或字符串。如果返回字符串，将分配给 inputErrorMessage | `function`                                                   | —  （与 deletePrompt 一起调用时 会校验值是否与 `keyword`一致） |
| input-error-message          | 验证失败时的错误消息                                         | `string`                                                     | Illegal input  （与 deletePrompt 一起调用时为 '输入内容不匹配'） |
| maxlength                    | 输入框的最大输入长度                                         | `Number`                                                     | —                                                            |
| center                       | 是否将 MessageBox 的内容居中显示                             | `boolean`                                                    | true                                                         |
| round-button                 | 是否使用圆形按钮                                             | `boolean`                                                    | false                                                        |
| button-size                  | 确认和取消按钮的自定义尺寸                                   | `枚举`-`'large' \| 'default' \| 'small'`                     | default                                                      |
| append-to                    | 设置消息框的根元素                                           | `string` / `HTMLElement`                                     | —                                                            |
| confirm-tpl                  | 内容消息中后半部分的消息模板，请确保值中含有 `%s` 否则无效   | `string`                                                     | —  （与 deletePrompt 一起调用时为 '，请输入 %s 确认。'）     |
| keyword                      | `confirm-tpl` 入参中对 `%s` 进行替换的内容                   | `string`                                                     | —                                                            |
| keyword-selectable           | 关键词是否可选中                                             | `boolean`                                                    | false                                                        |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-message-box-m"
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