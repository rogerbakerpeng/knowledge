# Timeline 时间轴

直观地展示时间线。

## 基本用法

时间轴可以分为多个活动。时间戳是区别于其他组件的重要特征。请注意与步骤组件的区别。

```html
<template>
    <e-timeline-m>
        <e-timeline-item-m v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp">
            {{ activity.content }}
        </e-timeline-item-m>
    </e-timeline-m>
</template>

<script setup lang="ts">
    const activities = [
        {
            content: 'Custom icon',
            timestamp: '2018-04-12 20:46'
        },
        {
            content: 'Custom color',
            timestamp: '2018-04-03 20:46'
        },
        {
            content: 'Custom size',
            timestamp: '2018-04-03 20:46'
        },
        {
            content: 'Custom hollow',
            timestamp: '2018-04-03 20:46'
        },
        {
            content: 'Default node',
            timestamp: '2018-04-03 20:46'
        }
    ];
</script>
```

## 自定义节点

节点的大小、颜色和图标可以自定义。

```html
<template>
    <e-timeline-m>
        <e-timeline-item-m
            v-for="(activity, index) in activities"
            :key="index"
            :icon="activity.icon"
            :type="activity.type"
            :color="activity.color"
            :size="activity.size"
            :hollow="activity.hollow"
            :timestamp="activity.timestamp"
        >
            {{ activity.content }}
        </e-timeline-item-m>
    </e-timeline-m>
</template>

<script setup lang="ts">
    import { MoreFilled } from '@epoint-mfe/eui-icons';

    const activities = [
        {
            content: 'Custom icon',
            timestamp: '2018-04-12 20:46',
            size: 'large',
            type: 'primary',
            icon: MoreFilled
        },
        {
            content: 'Custom color',
            timestamp: '2018-04-03 20:46',
            color: '#0bbd87'
        },
        {
            content: 'Custom size',
            timestamp: '2018-04-03 20:46',
            size: 'large'
        },
        {
            content: 'Custom hollow',
            timestamp: '2018-04-03 20:46',
            type: 'primary',
            hollow: true
        },
        {
            content: 'Default node',
            timestamp: '2018-04-03 20:46'
        }
    ];
</script>
```

## 自定义时间戳

当内容太高时，时间戳可以放置在内容上方。

```html
<template>
    <e-timeline-m>
        <e-timeline-item-m timestamp="2018/4/12" placement="top">
            <h4>Update Github template</h4>
            <p>Tom committed 2018/4/12 20:46</p>
        </e-timeline-item-m>
        <e-timeline-item-m timestamp="2018/4/3" placement="top">
            <h4>Update Github template</h4>
            <p>Tom committed 2018/4/3 20:46</p>
        </e-timeline-item-m>
        <e-timeline-item-m timestamp="2018/4/2" placement="top">
            <h4>Update Github template</h4>
            <p>Tom committed 2018/4/2 20:46</p>
        </e-timeline-item-m>
    </e-timeline-m>
</template>
```

## 垂直居中

时间轴项垂直居中。

```html
<template>
    <e-timeline-m>
        <e-timeline-item-m center timestamp="2018/4/12" placement="top">
            <h4>Update Github template</h4>
            <p>Tom committed 2018/4/12 20:46</p>
        </e-timeline-item-m>
        <e-timeline-item-m timestamp="2018/4/3" placement="top">
            <h4>Update Github template</h4>
            <p>Tom committed 2018/4/3 20:46</p>
        </e-timeline-item-m>
        <e-timeline-item-m center timestamp="2018/4/2" placement="top">Event start</e-timeline-item-m>
        <e-timeline-item-m timestamp="2018/4/2" placement="top">Event end</e-timeline-item-m>
    </e-timeline-m>
</template>
```

## API

### Timeline Slots

| 名称    | 说明                   |
| ------- | ---------------------- |
| default | 自定义时间轴的默认内容 |

### TimelineItem Attributes

| Name           | Description    | Type                                                        | Default    |
| :------------- | :------------- | :---------------------------------------------------------- | :--------- |
| timestamp      | 时间戳内容     | `string`                                                    | ''         |
| hide-timestamp | 是否显示时间戳 | `boolean`                                                   | `false`    |
| center         | 是否垂直居中   | `boolean`                                                   | `false`    |
| placement      | 时间戳位置     | `'top' \| 'bottom'`                                         | `'bottom'` |
| type           | 节点类型       | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | —          |
| color          | 节点背景颜色   | `'hsl' \| 'hsv' \| 'hex' \| 'rgb'`                          | —          |
| size           | 节点大小       | `'normal' \| 'large'`                                       | `'normal'` |
| icon           | 图标组件       | `string \| Component`                                       | —          |
| hollow         | 图标是否为空心 | `boolean`                                                   | `false`    |

### TimelineItem Slots

| 名称    | 说明                     |
| ------- | ------------------------ |
| default | 自定义时间轴项的默认内容 |
| dot     | 自定义时间轴项的定义节点 |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-timeline-m"
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