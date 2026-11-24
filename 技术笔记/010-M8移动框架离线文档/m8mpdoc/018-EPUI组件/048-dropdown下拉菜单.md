# Dropdown 下拉菜单

下拉菜单用于页面中进行分组筛选或操作切换，支持多种自定义内容和交互方式。

## 基本用法

点击下拉菜单以展开更多操作。

默认情况下，触发元素由默认`slot`渲染，下拉部分由名为`dropdown`的`slot`渲染。默认情况下，当您点击触发元素时，即可显示下拉列表。

```html
<template>
    <e-dropdown-m>
        <span class="ep-dropdown-link">
            Dropdown List
            <e-icon-m class="ep-icon--right" name="ArrowDownBold"></e-icon-m>
        </span>
        <template #dropdown>
            <e-dropdown-menu-m>
                <e-dropdown-item-m>Action 1</e-dropdown-item-m>
                <e-dropdown-item-m>Action 2</e-dropdown-item-m>
                <e-dropdown-item-m>Action 3</e-dropdown-item-m>
                <e-dropdown-item-m disabled>Action 4</e-dropdown-item-m>
                <e-dropdown-item-m divided>Action 5</e-dropdown-item-m>
            </e-dropdown-menu-m>
        </template>
    </e-dropdown-m>
</template>
<style lang="scss" scoped>
    .ep-dropdown-link {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        cursor: pointer;
        color: var(--e-color-primary);
        .ep-icon--right {
            margin-left: 5px;
        }
    }
</style>
```

## 如何触发

点击或长按触发元素。

使用属性`trigger`。默认值为`click`。

```html
<template>
    <div class="em-dropdown-group">
        <e-dropdown-m trigger="click">
            <span class="ep-dropdown-link">
                click to trigger
                <e-icon-m class="ep-icon--right" name="ArrowDownBold"></e-icon-m>
            </span>
            <template #dropdown>
                <e-dropdown-menu-m>
                    <e-dropdown-item-m>Action 1</e-dropdown-item-m>
                    <e-dropdown-item-m>Action 2</e-dropdown-item-m>
                    <e-dropdown-item-m>Action 3</e-dropdown-item-m>
                    <e-dropdown-item-m disabled>Action 4</e-dropdown-item-m>
                    <e-dropdown-item-m divided>Action 5</e-dropdown-item-m>
                </e-dropdown-menu-m>
            </template>
        </e-dropdown-m>
        <e-dropdown-m trigger="longpress">
            <span class="ep-dropdown-link">
                longpress to trigger
                <e-icon-m class="ep-icon--right" name="ArrowDownBold"></e-icon-m>
            </span>
            <template #dropdown>
                <e-dropdown-menu-m>
                    <e-dropdown-item-m>Action 1</e-dropdown-item-m>
                    <e-dropdown-item-m>Action 2</e-dropdown-item-m>
                    <e-dropdown-item-m>Action 3</e-dropdown-item-m>
                    <e-dropdown-item-m disabled>Action 4</e-dropdown-item-m>
                    <e-dropdown-item-m divided>Action 5</e-dropdown-item-m>
                </e-dropdown-menu-m>
            </template>
        </e-dropdown-m>
    </div>
</template>
<style lang="scss" scoped>
    .ep-dropdown-link {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        cursor: pointer;
        color: var(--e-color-primary);
        .ep-icon--right {
            margin-left: 5px;
        }
    }
    .em-dropdown-group {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        > div + div {
            margin-left: 20px;
        }
    }
</style>
```

## 菜单隐藏行为

使用`hide-on-click`属性定义点击时是否关闭菜单。

默认情况下，当您点击菜单项时，菜单将关闭，通过将`hide-on-click`设置为`false`可以关闭此功能。

```html
<template>
    <e-dropdown-m :hide-on-click="false">
        <span class="ep-dropdown-link">
            Dropdown List
            <e-icon-m class="ep-icon--right" name="ArrowDownBold"></e-icon-m>
        </span>
        <template #dropdown>
            <e-dropdown-menu-m>
                <e-dropdown-item-m>Action 1</e-dropdown-item-m>
                <e-dropdown-item-m>Action 2</e-dropdown-item-m>
                <e-dropdown-item-m>Action 3</e-dropdown-item-m>
                <e-dropdown-item-m disabled>Action 4</e-dropdown-item-m>
                <e-dropdown-item-m divided>Action 5</e-dropdown-item-m>
            </e-dropdown-menu-m>
        </template>
    </e-dropdown-m>
</template>
<style lang="scss" scoped>
    .ep-dropdown-link {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        cursor: pointer;
        color: var(--e-color-primary);
        .ep-icon--right {
            margin-left: 5px;
        }
    }
</style>
```

## 命令事件

单击每个下拉项会触发 command 事件，参数由每个项分配。

```html
<template>
    <e-dropdown-m @command="myCommand">
        <span class="ep-dropdown-link">
            Dropdown List
            <e-icon-m class="ep-icon--right" name="ArrowDownBold"></e-icon-m>
        </span>
        <template #dropdown>
            <e-dropdown-menu-m>
                <e-dropdown-item-m command="a">Action 1</e-dropdown-item-m>
                <e-dropdown-item-m command="b">Action 2</e-dropdown-item-m>
                <e-dropdown-item-m command="c">Action 3</e-dropdown-item-m>
                <e-dropdown-item-m command="d" disabled>Action 4</e-dropdown-item-m>
                <e-dropdown-item-m command="e" divided>Action 5</e-dropdown-item-m>
            </e-dropdown-menu-m>
        </template>
    </e-dropdown-m>
</template>
<script setup lang="ts">
    const myCommand = (command) => {
        console.log('command', command);
    };
</script>
<style lang="scss" scoped>
    .ep-dropdown-link {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        cursor: pointer;
        color: var(--e-color-primary);
        .ep-icon--right {
            margin-left: 5px;
        }
    }
</style>
```

## 下拉方法

通过 ref 获取组件实例，调用 `handleOpen`/`handleClose` 方法手动控制菜单显示/隐藏。

```html
<template>
    <e-button-m @click="handleOpen">打开下拉菜单</e-button-m>
    <e-button-m @click="handleClose">关闭下拉菜单</e-button-m>
    <e-dropdown-m ref="menus" :close-on-click-body="false">
        <span class="ep-dropdown-link">
            Dropdown List
            <e-icon-m class="ep-icon--right" name="ArrowDownBold"></e-icon-m>
        </span>
        <template #dropdown>
            <e-dropdown-menu-m>
                <e-dropdown-item-m command="a">Action 1</e-dropdown-item-m>
                <e-dropdown-item-m command="b" divided>Action 2</e-dropdown-item-m>
                <e-dropdown-item-m command="c" disabled>Action 3</e-dropdown-item-m>
                <e-dropdown-item-m command="d" icon="Search">Action 4</e-dropdown-item-m>
                <e-dropdown-item-m command="e" divided>Action 2</e-dropdown-item-m>
            </e-dropdown-menu-m>
        </template>
    </e-dropdown-m>
</template>
<script setup lang="ts">
    import { ref } from 'vue';
    const menus = ref(null);
    const handleOpen = () => {
        menus.value?.handleOpen?.();
    };
    const handleClose = () => {
        menus.value?.handleClose?.();
    };
</script>
<style lang="scss" scoped>
    .ep-dropdown-link {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        cursor: pointer;
        color: var(--e-color-primary);
        .ep-icon--right {
            margin-left: 5px;
        }
    }
</style>
```

## 尺寸

通过 `size` 属性设置下拉菜单尺寸，可选`large`、`default`或`small`。

```html
<template>
    <div class="em-dropdown-group" style="padding-bottom: 300px;">
        <e-dropdown-m size="large">
            <span class="ep-dropdown-link">
                large
                <e-icon-m class="ep-icon--right" name="ArrowDownBold"></e-icon-m>
            </span>
            <template #dropdown>
                <e-dropdown-menu-m>
                    <e-dropdown-item-m>Action 1</e-dropdown-item-m>
                    <e-dropdown-item-m>Action 2</e-dropdown-item-m>
                    <e-dropdown-item-m>Action 3</e-dropdown-item-m>
                    <e-dropdown-item-m>Action 4</e-dropdown-item-m>
                    <e-dropdown-item-m>Action 5</e-dropdown-item-m>
                </e-dropdown-menu-m>
            </template>
        </e-dropdown-m>
        <e-dropdown-m size="default">
            <span class="ep-dropdown-link">
                default
                <e-icon-m class="ep-icon--right" name="ArrowDownBold"></e-icon-m>
            </span>
            <template #dropdown>
                <e-dropdown-menu-m>
                    <e-dropdown-item-m>Action 1</e-dropdown-item-m>
                    <e-dropdown-item-m>Action 2</e-dropdown-item-m>
                    <e-dropdown-item-m>Action 3</e-dropdown-item-m>
                    <e-dropdown-item-m>Action 4</e-dropdown-item-m>
                    <e-dropdown-item-m>Action 5</e-dropdown-item-m>
                </e-dropdown-menu-m>
            </template>
        </e-dropdown-m>
        <e-dropdown-m size="small">
            <span class="ep-dropdown-link">
                small
                <e-icon-m class="ep-icon--right" name="ArrowDownBold"></e-icon-m>
            </span>
            <template #dropdown>
                <e-dropdown-menu-m>
                    <e-dropdown-item-m>Action 1</e-dropdown-item-m>
                    <e-dropdown-item-m>Action 2</e-dropdown-item-m>
                    <e-dropdown-item-m>Action 3</e-dropdown-item-m>
                    <e-dropdown-item-m>Action 4</e-dropdown-item-m>
                    <e-dropdown-item-m>Action 5</e-dropdown-item-m>
                </e-dropdown-menu-m>
            </template>
        </e-dropdown-m>
    </div>
</template>
<style lang="scss" scoped>
    .ep-dropdown-link {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        cursor: pointer;
        color: var(--e-color-primary);
        .ep-icon--right {
            margin-left: 5px;
        }
    }
    .em-dropdown-group {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        > div + div {
            margin-left: 20px;
        }
    }
</style>
```

## Dropdown API

### Dropdown Attributes

| Name                | Description                                                                                                    | Type                                 | Default     |
| ------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ----------- |
| size                | 尺寸                                                                                                           | `enum` `'small'丨'default'丨'large'` | `'default'` |
| max-height          | 弹出菜单的最大高度                                                                                             | `string 丨 number`                   | —           |
| disabled            | 是否禁用                                                                                                       | `boolean`                            | `false`     |
| placement           | 弹出菜单的位置                                                                                                 | `enum` `'down'丨'up'`                | `'down'`    |
| trigger             | 如何触发                                                                                                       | `enum` `'click'丨'longpress'`        | `'click'`   |
| hide-on-click       | 在点击菜单项后是否隐藏菜单                                                                                     | `boolean`                            | `true`      |
| role                | 下拉菜单的 ARIA 角色属性。根据使用场景，您可能希望将其更改为`'navigation'`                                     | `string`                             | `'menu'`    |
| tabindex            | Dropdown 的[tabindex ](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/tabindex) | `number`                             | `0`         |
| popper-class        | Dropdown 的下拉自定义类名                                                                                      | `string`                             | —           |
| close-on-click-body | 是否在点击 body 空白位置时关闭下拉                                                                             | `boolean`                            | `true`      |
| before-close        | 下拉菜单关闭前的回调，它将阻止下拉关闭                                                                         | `Function` `(done)=>{done()}`        | —           |
| visible             | 控制下拉菜单显隐，配置后下拉菜单的显隐只能通过此属性控制                                                       | `boolean`                            | `undefined` |
| zIndex              | 下拉菜单面板层级                                                                                               | `number`                             | `-`         |
| modelValue          | 当前选中 item，需配合 item 的 name                                                                             | `number \| string`                   | `''`        |

### Dropdown Slots

| Name     | Description                                             | Subtags       |
| :------- | :------------------------------------------------------ | :------------ |
| default  | 默认插槽                                                | —             |
| dropdown | Dropdown 菜单的内容，通常是一个 `ep-dropdown-menu` 元素 | Dropdown-Menu |

### Dropdown Events

| Name           | Description                  | Parameters            |
| -------------- | ---------------------------- | --------------------- |
| command        | 菜单项被点击时触发           | `(command : string)`  |
| visible-change | 菜单显示状态变化时           | `(visible : boolean)` |
| after-hide     | 当下拉菜单消失动画结束后触发 | —                     |
| click-overlay  | 点击遮罩层触发               | —                     |

### Dropdown Methods

| Method      | Description | Parameters |
| ----------- | ----------- | ---------- |
| handleOpen  | 打开菜单    | —          |
| handleClose | 关闭菜单    | —          |

### Dropdown-Menu Slots

| Name    | Description         | Subtags       |
| :------ | :------------------ | :------------ |
| default | Dropdown 菜单的内容 | Dropdown-Item |

## Dropdown-Item API

### Dropdown-Item Attributes

| Name     | Description                               | Type                     | Default |
| -------- | ----------------------------------------- | ------------------------ | ------- |
| command  | 要派发到 Dropdown 的 `command` 回调的命令 | `string丨number丨object` | —       |
| disabled | 菜单项是否禁用                            | `boolean`                | `false` |
| divided  | 是否显示分割线                            | `boolean`                | `false` |
| icon     | 菜单项图标                                | `string丨Component`      | —       |
| name     | 菜单项标识                                | `string`                 | —       |

### Dropdown-Item Slots

| Name      | Description        |
| :-------- | :----------------- |
| default   | 自定义 Dropdown 项 |
| rightIcon | 右侧自定义图标内容 |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-dropdown-m"
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