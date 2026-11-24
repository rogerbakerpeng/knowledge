# 组件使用

## easycalendar 日历

### 介绍

-   M8 日历组件,支持日历与周历切换。

### 代码演示

#### 基础用法

```html
<em-easy-calendar />
```

#### 仅展示周历

```html
<em-easy-calendar :allow-switch="false" :is-show-week-view="true" />
```

#### 设置标记的日期

```html
<em-easy-calendar :mark-date="markDate" />
```

::: ifdef M83

```js
export default {
    data() {
        return {
            markDate: [
                {
                    // 昨天标记为红色
                    date: new Date().getTime() - 86400000,
                    color: 'red'
                },
                {
                    // 明天标记为黄色
                    date: new Date().getTime() + 86400000,
                    color: 'yellow'
                }
            ]
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';

// 使用 ref 创建响应式数据
const markDate = ref([
    {
        // 昨天标记为红色
        date: new Date().getTime() - 86400000,
        color: 'red'
    },
    {
        // 明天标记为黄色
        date: new Date().getTime() + 86400000,
        color: 'yellow'
    }
]);
```

::: endif

### API

#### Props

| 参数              |             说明             | 类型    | 默认值  |
| :---------------- | :--------------------------: | :------ | :------ |
| allow-switch      |    是否开启周历和月历互换    | boolean | `true`  |
| is-show-week-view | 是否展示周历（否即展示月历） | boolean | `false` |
| mark-date         |         有标记的日期         | Array   | `-`     |
| is-show-watermark |    是否显示背景的月份数字    | boolean | `true`  |

**mark-date 数据格式**

`mark-date`是一个数组，数组每项是一个对象，对象可配置的参数如下：

| 参数  |                            说明                             | 类型          |
| :---- | :---------------------------------------------------------: | :------------ |
| date  | 要标记的日期，可以是 `2022/1/1`这样的字符串，也可以是毫秒数 | string/number |
| color |                      该日期标记的颜色                       | string        |

#### Events

| 事件名          |            说明             | 回调参数                         |
| :-------------- | :-------------------------: | :------------------------------- |
| getNextSchedule | 滑动到下一月/周时触发的函数 | String(2022 年 05 月 01 日 周日) |
| getPreSchedule  | 滑动到上一月/周时触发的函数 | String(2022 年 05 月 01 日 周日) |
| clickItem       |    点击每一天触发的函数     | String(2022 年 05 月 01 日 周日) |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-easy-calendar"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-easy-calendar"
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
