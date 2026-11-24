# toolbarBtns 按钮组

用于生成底部按钮栏

## 基础用法

通过`items` 设置按钮数据，默认根据窗口宽度自适应按钮布局。

按钮样式根据图标相关设置分为普通按钮及图标按钮。

根据`iconPosition`值是否为`top`，判断是否为图标按钮样式。

其余都为普通按钮。

```html
<template>
    <e-toolbar-btns-m :items="items" borderPosition="both" />
</template>
<script lang="ts" setup>
    import { reactive } from 'vue';

    const clickEvt = (e: any) => {
        ejs.ui.toast(`${e.content}被点击`);
    };
    const items = reactive([
        {
            content: '图标按钮1',
            id: '1',
            icon: 'Edit', // 支持 vant 图标库 及 PC 端的 EUI ICON 名称，以及图片链接
            onClick: clickEvt
        },
        {
            content: '图标按钮2',
            id: '2',
            icon: 'like',
            onClick: clickEvt
        },
        {
            content: '图标按钮3',
            id: '3',
            icon: 'https://img01.yzcdn.cn/vant/cat.jpeg',
            onClick: clickEvt
        },
        {
            content: '副按钮',
            id: '4',
            icon: 'arrow',
            iconPosition: 'right', // 图标位置，支持 top left 和 right，默认为 top 即图标按钮
            onClick: clickEvt
        },
        {
            content: '主按钮',
            id: '5',
            icon: 'Loading',
            iconPosition: 'left',
            type: 'primary', // 按钮类型
            onClick: clickEvt
        }
    ]);
</script>
```

## 调整平铺按钮最大展示数量

自适应按钮布局模式下，`max-display-count` 控制底部可平铺展示的所有按钮最大数量（不包括更多按钮），`displayedIconBtnNum` 控制底部可平铺展示的图标按钮最大数量（不包括更多按钮）。设置时请确保 `max-display-count` 大于等于 `displayedIconBtnNum`。

```html
<template>
    <!-- 任何窗口宽度下平铺展示的所有按钮数量不会超过4个，图标按钮数量不会超过2个 -->
    <e-toolbar-btns-m :items="items" max-display-count="4" displayedIconBtnNum="2" borderPosition="both" />
</template>
```

## 固定按钮布局

设置`responsive`可关闭自适应，此时`max-display-count` 控制底部可平铺展示的所有按钮数量（不包括更多按钮），`displayedIconBtnNum` 控制底部可平铺展示的图标按钮数量（不包括更多按钮）。设置时请确保 `max-display-count` 大于等于 `displayedIconBtnNum`。

```html
<template>
    <!-- 任何窗口宽度下平铺展示的所有按钮数量都为3个，图标按钮数量都为1个 -->
    <e-toolbar-btns-m
        :responsive="false"
        :items="items"
        max-display-count="3"
        displayedIconBtnNum="1"
        borderPosition="both"
    />
</template>
```

## 下拉按钮组

设置 `control` 为 `dropdown` 时，可将此按钮配置为下拉按钮，点击该按钮的箭头可唤起按钮组弹窗。

```html
<template>
    <e-toolbar-btns-m
        :responsive="false"
        :items="items2"
        max-display-count="3"
        displayedIconBtnNum="1"
        borderPosition="both"
    />
</template>
<script lang="ts" setup>
    import { reactive } from 'vue';

    const clickEvt = (e: any) => {
        ejs.ui.toast(`${e.content}被点击`);
    };
    const items2 = reactive([
        {
            content: '图标按钮1',
            id: '21',
            icon: 'Edit', // 支持 vant 图标库 及 PC 端的 EUI ICON 名称，以及图片链接
            onClick: clickEvt
        },
        {
            content: '图标按钮2',
            id: '22',
            icon: 'like',
            onClick: clickEvt
        },
        {
            content: '图标按钮3',
            id: '23',
            icon: 'https://img01.yzcdn.cn/vant/cat.jpeg',
            onClick: clickEvt
        },
        {
            content: '副按钮',
            id: '24',
            control: 'dropdown',
            items: [
                {
                    content: '图标按钮241',
                    id: '241',
                    onClick: clickEvt
                },
                {
                    content: '图标按钮242',
                    id: '242',
                    onClick: clickEvt
                }
            ],
            onClick: clickEvt
        },
        {
            content: '主按钮',
            id: '25',
            icon: 'Loading',
            iconPosition: 'left',
            control: 'buttonGroup',
            items: [
                {
                    content: '图标按钮251',
                    id: '251',
                    onClick: clickEvt
                },
                {
                    content: '图标按钮252',
                    id: '252',
                    onClick: clickEvt
                }
            ],
            type: 'primary', // 按钮类型
            onClick: clickEvt
        }
    ]);
</script>
```

### ToolbarBtns Attributes

| 属性名              | 说明                                                                                       | 类型              | 默认值          |
| ------------------- | ------------------------------------------------------------------------------------------ | ----------------- | --------------- |
| items               | 按钮数据，格式见下                                                                         | `ToolbarButton[]` | `[]`            |
| maxDisplayCount     | 底部平铺展示的按钮数量，自适应布局下为最大数量，不包含更多按钮                             | `number\string`   | `3`             |
| displayedIconBtnNum | 存在普通按钮时，底部平铺展示的图标按钮数量，自适应布局下为最大数量，不包含更多按钮         | `number\string`   | `2`             |
| responsive          | 是否根据窗口宽度自适应调整按钮布局                                                         | `boolean`         | `true`          |
| align               | 按钮横轴对齐方式 `space-between、center、flex-start、flex-end、space-around、space-evenly` | `string`          | `space-between` |
| height              | 按钮栏高度，单位默认`px`                                                                   | `number\string`   | `68`            |
| space               | 按钮间距，单位默认`px`                                                                     | `number\string`   | `16`            |
| iconSize            | 图标按钮的图标大小，仅对 iconPosition='top'的按钮图标有效，单位默认`px`                    | `number\string`   | `20`            |
| border              | 是否显示边框                                                                               | `boolean`         | `true`          |
| borderPosition      | 边框位置，可选值：`top`、`bottom`、`both`，默认为`top`                                     | `string`          | `top`           |

### ToolbarButton 数据结构

| 键名         | 说明                                                                      | 类型                                                      |
| ------------ | ------------------------------------------------------------------------- | --------------------------------------------------------- |
| content      | 按钮文本                                                                  | `string`                                                  |
| id           | 唯一标识符，必填                                                          | `string`                                                  |
| onClick      | 按钮点击事件处理函数                                                      | `(buttonData: ToolbarButton) => void`                     |
| type         | 按钮类型                                                                  | 'primary' 、 'success' 、 'warning' 、 'danger' 、 'info' |
| plain        | 是否为朴素按钮                                                            | `boolean`                                                 |
| disabled     | 是否禁用                                                                  | `boolean` \ `(item: ToolbarButton) => boolean`            |
| control      | 按钮类型, 为 `dropdown` 时点击会弹窗展示子项                              | `dropdown`、`buttonGroup`                                 |
| splitButton  | 为 true 时，按钮本身可以触发点击事件，splitButton 为 false 时，按钮本身不可以触发点击事件, dropdown 类型的按钮在 更多中展示的时候，不管 splitButton 是什么值，本身是都无法点击的 | `boolean`                                                 |
| items        | 子按钮数组                                                                | `{ content: string; onClick: (item) => void; }`           |
| icon         | 图标，选填，支持 vant 图标库 及 PC 端的 EUI ICON 名称，以及图片链接       | `string`                                                  |
| iconPosition | 图标位置，选填，可选：`top`、`left`、`right`，默认为`top`                 | `string`                                                  |
| visible      | 当前按钮显隐                                                              | `boolean`                                                 |
| iconSize     | 图标按钮的图标大小，仅对 iconPosition='top'的按钮图标有效，单位默认`px`   | `number\string`                                           |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-toolbar-btns-m"
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