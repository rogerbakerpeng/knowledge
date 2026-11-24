# Collapse

通过折叠面板收纳内容区域

## 基础用法

可同时展开多个面板，面板之间不影响

```html
<template>
    <div class="demo-collapse">
        <e-collapse-m v-model="activeNames" @change="handleChange">
            <e-collapse-item-m title="一致性" name="1">
                <div>与现实生活保持一致：符合真实生活的过程和逻辑，并遵守用户习惯的语言和习惯；</div>
                <div>在界面内保持一致性：所有元素都应该保持一致，如：设计风格、图标和文本、元素位置等。</div>
            </e-collapse-item-m>
            <e-collapse-item-m title="反馈" name="2">
                <div>操作反馈：通过样式更新和交互效果使用户清晰感知其操作；</div>
                <div>视觉反馈：通过更新或重新排列页面元素来反映当前状态。</div>
            </e-collapse-item-m>
            <e-collapse-item-m title="效率" name="3">
                <div>简化流程：保持操作流程简单和直观；</div>
                <div>明确和清晰：明确表达您的意图，以便用户能够迅速理解并做出决策；</div>
                <div>易于识别：界面应该直截了当，帮助用户辨识，并让他们免于记忆和回忆。</div>
            </e-collapse-item-m>
            <e-collapse-item-m title="可控性" name="4">
                <div>决策制定：提供关于操作的建议是可以接受的，但不要代替用户做决策；</div>
                <div>可控的后果：用户应该获得自由操作的权利，包括取消、中止或终止当前操作。</div>
            </e-collapse-item-m>
        </e-collapse-m>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';

    const activeNames = ref(['1']);
    const handleChange = (val: string[]) => {
        console.log(val);
    };
</script>
```

## 显示序号

通过 `show-index` 属性来设置是否显示序号，在不使用插槽自定义序号的情况下默认将`formatedIndex`作为显示值。

```html
<template>
    <div class="demo-collapse">
        <e-checkbox-m v-model="showIndex" style="padding: 0 10px;">显示序号</e-checkbox-m>
        <e-collapse-m v-model="activeNames" :show-index="showIndex" class="collapse">
            <e-collapse-item-m title="一致性" name="1">
                <template #index="{ index, formatedIndex }">
                    <span class="index" style="color: red">起始值： {{ index }} ；默认是 {{ formatedIndex }}</span>
                </template>
                <div>与现实生活保持一致：与现实生活的过程和逻辑一致，并符合用户习惯的语言和习惯；</div>
                <div>在界面内保持一致性：所有元素都应保持一致，如设计风格、图标和文本、元素位置等。</div>
            </e-collapse-item-m>
            <e-collapse-item-m title="反馈" name="2">
                <div>操作反馈：通过样式更新和交互效果使用户清晰地感知其操作；</div>
                <div>视觉反馈：通过更新或重新排列页面元素来反映当前状态。</div>
            </e-collapse-item-m>
        </e-collapse-m>
    </div>
</template>
<script lang="ts" setup>
    import { ref } from 'vue';
    const showIndex = ref(true);
    const activeNames = ref(['1']);
</script>
```

## 开启面板间距

通过 gap 属性来设置是否在面板项目之间添加间距。

```html
<e-collapse-m v-model="activeNames" gap>
    <e-collapse-item-m title="一致性" name="1">
        <div>与现实生活保持一致：符合真实生活的过程和逻辑，并遵守用户习惯的语言和习惯；</div>
        <div>在界面内保持一致性：所有元素都应该保持一致，如：设计风格、图标和文本、元素位置等。</div>
    </e-collapse-item-m>
</e-collapse-m>
```

## 隐藏标题前色块

通过`header-prefix`属性来设置标题前色块，默认显示色块，值为 `none`时不显示色块。

```html
<e-collapse-m v-model="activeNames" header-prefix="none">
    <e-collapse-item-m title="一致性" name="1">
        <div>与现实生活保持一致：符合真实生活的过程和逻辑，并遵守用户习惯的语言和习惯；</div>
        <div>在界面内保持一致性：所有元素都应该保持一致，如：设计风格、图标和文本、元素位置等。</div>
    </e-collapse-item-m>
</e-collapse-m>
```

## 设置箭头样式

通过`arrow-type`属性来设置标题后展开收起箭头是否带有文字，也可使用插槽自定义样式。

```html
<e-collapse-m v-model="activeNames" arrow-type="icon">
    <e-collapse-item-m title="一致性" name="1">
        <div>与现实生活保持一致：符合真实生活的过程和逻辑，并遵守用户习惯的语言和习惯；</div>
        <div>在界面内保持一致性：所有元素都应该保持一致，如：设计风格、图标和文本、元素位置等。</div>
    </e-collapse-item-m>
</e-collapse-m>
```

## 手风琴效果

每次只能展开一个面板

```html
<template>
    <div class="demo-collapse">
        <e-collapse-m v-model="activeName" accordion>
            <e-collapse-item-m title="一致性" name="1">
                <div>与现实生活保持一致：与现实生活的过程和逻辑一致，并符合用户习惯的语言和习惯；</div>
                <div>在界面内保持一致性：所有元素都应保持一致，如设计风格、图标和文本、元素位置等。</div>
            </e-collapse-item-m>
            <e-collapse-item-m title="反馈" name="2">
                <div>操作反馈：通过样式更新和交互效果使用户清晰地感知其操作；</div>
                <div>视觉反馈：通过更新或重新排列页面元素来反映当前状态。</div>
            </e-collapse-item-m>
            <e-collapse-item-m title="效率" name="3">
                <div>简化流程：保持操作流程简单和直观；</div>
                <div>明确清晰：明确表达您的意图，以便用户能够快速理解并做出决策；</div>
                <div>易于识别：界面应该直接，有助于用户识别，避免他们记忆和回想。</div>
            </e-collapse-item-m>
            <e-collapse-item-m title="可控性" name="4">
                <div>决策制定：提供操作建议是可以接受的，但不要为用户做决策；</div>
                <div>可控的后果：用户应该被授予自由操作的权利，包括取消、中止或终止当前操作。</div>
            </e-collapse-item-m>
        </e-collapse-m>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';

    const activeName = ref('1');
</script>
```

## 自定义面板标题

除了可以通过 `title` 属性以外，还可以通过具名 `slot` 来实现自定义面板的标题内容，以实现增加图标等效果。

```html
<template>
    <div class="demo-collapse">
        <e-collapse-m accordion>
            <e-collapse-item-m name="1">
                <template #title>
                    一致性
                    <e-icon-m class="header-icon">
                        <info-filled />
                    </e-icon-m>
                </template>
                <div>与现实生活保持一致：符合真实生活的过程和逻辑，并遵守用户习惯的语言和习惯；</div>
                <div>在界面内保持一致性：所有元素都应该保持一致，如：设计风格、图标和文本、元素位置等。</div>
            </e-collapse-item-m>
            <e-collapse-item-m title="反馈" name="2">
                <template #index>
                    <span class="index" style="color: red;">2</span>
                </template>
                <div>操作反馈：通过样式更新和交互效果使用户能够清晰地感知他们的操作；</div>
                <div>视觉反馈：通过更新或重新排列页面元素来反映当前状态。</div>
            </e-collapse-item-m>
            <e-collapse-item-m title="效率" name="3">
                <div>简化流程：保持操作流程简单和直观；</div>
                <div>明确和清晰：明确表达您的意图，以便用户能够迅速理解并做出决策；</div>
                <div>易于识别：界面应该直截了当，帮助用户辨识，避免他们记忆和回忆。</div>
            </e-collapse-item-m>
            <e-collapse-item-m title="可控性" name="4">
                <div>决策制定：提供关于操作的建议是可以接受的，但不要代替用户做决策；</div>
                <div>可控的后果：用户应该被赋予自由操作的权利，包括取消、中止或终止当前操作。</div>
            </e-collapse-item-m>
        </e-collapse-m>
    </div>
</template>

<script setup lang="ts">
    import { InfoFilled } from '@epoint-mfe/eui-components/eui-icons';
</script>
```

## API

### Collapse Attributes

| 属性名                | 描述                                                                          | 类型                                       | 默认值  |
| --------------------- | ----------------------------------------------------------------------------- | ------------------------------------------ | ------- |
| model-value / v-model | model 当前激活的面板(如果是手风琴模式，绑定值类型需要为 string，否则为 array) | string (手风琴模式) / array (非手风琴模式) | —       |
| accordion             | 是否手风琴模式                                                                | `boolean`                                  | false   |
| show-index            | 是否显示序号                                                                  | `boolean`                                  | false   |
| gap                   | 是否在面板之间添加间距                                                        | `boolean`                                  | false   |
| header-prefix         | 标题前色块                                                                    | `string` `可选值'none','block'`            | `block` |
| arrow-type            | 折叠箭头类型                                                                  | `string` `可选值'icon','text'`             | `text`  |

### Collapse Events

| 属性名 | 描述                                                                                   | 参数                                                      |
| ------ | -------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| change | 当前激活面板改变时触发(如果是手风琴模式，参数 activeNames 类型为 string，否则为 array) | (activeNames: array (非手风琴模式) / string (手风琴模式)) |

### Collapse Slots

| 属性名  | 描述           | 子标签        |
| ------- | -------------- | ------------- |
| default | 自定义默认内容 | Collapse Item |

### Collapse Item Attributes

| 属性名   | 描述       | 类型               | 默认值 |
| -------- | ---------- | ------------------ | ------ |
| name     | 唯一标志符 | `string / boolean` | —      |
| title    | 面板标题   | `string`           | —      |
| disabled | 是否禁用   | `boolean`          | —      |

### Collapse Item Slot

| 属性名      | 描述                                                               |
| ----------- | ------------------------------------------------------------------ |
| default     | Collapse Item 的内容                                               |
| title       | Collapse Item title 的内容，v-slot:title="{isActive}"              |
| index       | Collapse Item index 的内容 v-slot:index="{index, formatedIndex}"   |
| arrow       | Collapse Item arrow 箭头自定义内容 v-slot:arrow="{isActive}"       |
| description | Collapse Item 标题行底部的额外内容 v-slot:description="{isActive}" |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-collapse-m"
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