# 组件使用

## datepicker 日期选择

### 介绍

-   时间选择器，支持日期、年月、时分等维度，通常与弹出层组件配合使用。本组件已包含了 popup 组件的功能。

### 代码演示

#### 选择年月日

`DatePicker` 通过 `type` 属性来定义需要选择的时间类型，`type` 为 `date` 表示选择年月日。通过 `min-date` 和 `max-date` 属性可以确定可选的时间范围。

```html
<em-date-picker
    v-model="showDatePicker"
    type="datetime"
    title="选择年月日"
    :current-date="currentDate"
    :min-date="minDate"
    @confirm="onConfirm"
/>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            minDate: new Date(2020, 0, 1).getTime(),
            maxDate: new Date(2025, 10, 1).getTime(),
            currentDate: new Date().getTime(),
            showDatePicker: false
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const minDate = ref(new Date(2020, 0, 1).getTime());
const maxDate = ref(new Date(2025, 10, 1).getTime());
const currentDate = ref(new Date().getTime());
const showDatePicker = ref(false);
```

::: endif

#### 时间范围

通过 `range` 属性来切换成选择时间范围的选择器，点击确认后，事件传参为一个数组

```html
<em-date-picker
    v-model="showDatePicker"
    range
    type="date"
    title="范围选择年月日"
    :current-date="currentDate"
    :min-date="minDate"
    :max-date="maxDate"
    @confirm="onConfirm"
/>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            minDate: new Date(2020, 0, 1),
            maxDate: new Date(2025, 10, 1),
            currentDate: new Date().getTime(),
            showDatePicker: false
        };
    },
    methods: {
        onConfirm(dateRange) {
            console.log(dateRange.join('~'));
        }
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const minDate = ref(new Date(2020, 0, 1));
const maxDate = ref(new Date(2025, 10, 1));
const currentDate = ref(new Date().getTime());
const showDatePicker = ref(false);

function onConfirm(dateRange) {
    console.log(dateRange.join('~'));
}
```

::: endif

#### pad 端样式

通过 `pad` 属性来切换成`pad`端带日历的样式，默认选择年月日

```html
<em-date-picker
    v-model="showDatePicker"
    pad
    title="选择pad年月"
    :current-date="currentDate"
    :min-date="minDate"
    :max-date="maxDate"
    @confirm="onConfirmPad"
/>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            minDate: new Date(2020, 0, 1).getTime(),
            maxDate: new Date(2025, 10, 1).getTime(),
            currentDate: new Date().getTime(),
            showDatePicker: false
        };
    },
    methods: {
        onConfirmPad(date) {
            console.log(date);
        }
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const minDate = ref(new Date(2020, 0, 1).getTime());
const maxDate = ref(new Date(2025, 10, 1).getTime());
const currentDate = ref(new Date().getTime());
const showDatePicker = ref(false);

function onConfirmPad(date) {
    console.log(date);
}
```

::: endif

#### 选择年月

将 `type` 设置为 `year-month` 即可选择年份和月份。通过传入 `formatter` 函数，可以对选项文字进行格式化处理。

```html
<em-date-picker
    v-model="showDatePicker"
    type="year-month"
    title="选择年月"
    :current-date="currentDate"
    :min-date="minDate"
    :max-date="maxDate"
    :formatter="formatter"
/>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            minDate: new Date(2020, 0, 1).getTime(),
            maxDate: new Date(2025, 10, 1).getTime(),
            currentDate: new Date().getTime(),
            showDatePicker: false
        };
    },
    methods: {
        formatter(type, val) {
            if (type === 'year') {
                return `${val}年`;
            } else if (type === 'month') {
                return `${val}月`;
            }
            return val;
        }
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const minDate = ref(new Date(2020, 0, 1).getTime());
const maxDate = ref(new Date(2025, 10, 1).getTime());
const currentDate = ref(new Date().getTime());
const showDatePicker = ref(false);

function formatter(type, val) {
    if (type === 'year') {
        return `${val}年`;
    } else if (type === 'month') {
        return `${val}月`;
    }
    return val;
}
```

::: endif

#### 选择月日

将 `type` 设置为 `month-day` 即可选择月份和日期。

```html
<em-date-picker
    v-model="showDatePicker"
    type="month-day"
    title="选择月日"
    :current-date="currentDate"
    :min-date="minDate"
    :formatter="formatter"
/>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            minDate: new Date(2020, 0, 1).getTime(),
            maxDate: new Date(2025, 10, 1).getTime(),
            currentDate: new Date().getTime(),
            showDatePicker: false
        };
    },
    methods: {
        formatter(type, val) {
            if (type === 'month') {
                return `${val}月`;
            } else if (type === 'day') {
                return `${val}日`;
            }
            return val;
        }
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const minDate = ref(new Date(2020, 0, 1).getTime());
const maxDate = ref(new Date(2025, 10, 1).getTime());
const currentDate = ref(new Date().getTime());
const showDatePicker = ref(false);

function formatter(type, val) {
    if (type === 'month') {
        return `${val}月`;
    } else if (type === 'day') {
        return `${val}日`;
    }
    return val;
}
```

::: endif

#### 选择时间

将 `type` 设置为 `time` 即可选择时间（小时和分钟）

```html
<em-date-picker
    v-model="showDatePicker"
    type="time"
    title="选择时间"
    :current-date="currentTime"
    :min-hour="10"
    :max-hour="20"
/>
```
::: ifdef M83
```js
export default {
    data() {
        return {
            currentTime: '12:00',
            showDatePicker: false
        };
    }
};
```
::: endif
::: ifdef M84
```js
import { ref } from 'vue';
const currentTime = ref('12:00');
const showDatePicker = ref(false);
```
::: endif

#### 选择完整时间

将 `type` 设置为 `datetime` 即可选择完整时间，包括年月日和小时、分钟。

```html
<em-date-picker
    v-model="showDatePicker"
    :current-date="currentDate"
    type="datetime"
    title="选择完整时间"
    :min-date="minDate"
    :max-date="maxDate"
></em-date-picker>
```
::: ifdef M83
```js
export default {
    data() {
        return {
            minDate: new Date(2020, 0, 1).getTime(),
            maxDate: new Date(2025, 10, 1).getTime(),
            currentDate: new Date().getTime(),
            showDatePicker: false
        };
    }
};
```
::: endif
::: ifdef M84
```js
import { ref } from 'vue';
const minDate = ref(new Date(2020, 0, 1).getTime());
const maxDate = ref(new Date(2025, 10, 1).getTime());
const currentDate = ref(new Date().getTime());
const showDatePicker = ref(false);
```
::: endif

#### 选择年月日小时

将 `type` 设置为 `datehour` 即可选择日期和小时，包括年月日和小时。

```html
<em-date-picker
    v-model="showDatePicker"
    type="datehour"
    title="选择年月日小时"
    :current-date="currentDate"
    :min-date="minDate"
    :max-date="maxDate"
/>
```
::: ifdef M83
```js
export default {
    data() {
        return {
            minDate: new Date(2020, 0, 1).getTime(),
            maxDate: new Date(2025, 10, 1).getTime(),
            currentDate: new Date().getTime(),
            showDatePicker: false
        };
    }
};
```
::: endif
::: ifdef M84
```js
import { ref } from 'vue';
const minDate = ref(new Date(2020, 0, 1).getTime());
const maxDate = ref(new Date(2025, 10, 1).getTime());
const currentDate = ref(new Date().getTime());
const showDatePicker = ref(false);
```
::: endif

#### 选项过滤器

通过传入 `filter` 函数，可以对选项数组进行过滤，实现自定义时间间隔。

```html
<em-date-picker v-model="showDatePicker" type="time" title="选项过滤器" :current-date="currentTime" :filter="filter" />
```
::: ifdef M83
```js
export default {
    data() {
        return {
            currentTime: '12:00',
            showDatePicker: false
        };
    },
    methods: {
        filter(type, options) {
            if (type === 'minute') {
                return options.filter((option) => option % 5 === 0);
            }
            return options;
        }
    }
};
```
::: endif
::: ifdef M84
```js
import { ref } from 'vue';
const currentTime = ref('12:00');
const showDatePicker = ref(false);

function filter(type, options) {
    if (type === 'minute') {
        return options.filter((option) => option % 5 === 0);
    }
    return options;
}
```
::: endif

#### 自定义列排序

```html
<em-date-picker
    v-model="showDatePicker"
    type="date"
    title="自定义列排序"
    :current-date="currentDate"
    :columns-order="['month', 'day', 'year']"
    :formatter="formatter"
/>
```
::: ifdef M83
```js
export default {
    data() {
        return {
            currentDate: new Date().getTime(),
            showDatePicker: false
        };
    },
    methods: {
        formatter(type, val) {
            if (type === 'year') {
                return val + '年';
            }
            if (type === 'month') {
                return val + '月';
            }
            if (type === 'day') {
                return val + '日';
            }
            return val;
        }
    }
};
```
::: endif
::: ifdef M84
```js
import { ref } from 'vue';
const currentDate = ref(new Date().getTime());
const showDatePicker = ref(false);

function formatter(type, val) {
    if (type === 'year') {
        return val + '年';
    }
    if (type === 'month') {
        return val + '月';
    }
    if (type === 'day') {
        return val + '日';
    }
    return val;
}
```
::: endif

### API

#### DatePicker Props

| 参数                                                                         |                                           说明                                           | 类型                 | 默认值                                                  |
| :--------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------: | :------------------- | :------------------------------------------------------ |
| v-model ::: ifdef M83 (value) ::: endif ::: ifdef M84 (modelValue) ::: endif |                                    时间选择组件的显隐                                    | boolean              | `false`                                                 |
| current-date                                                                 |           设置的初始时间，当`range`为`true`时，支持传入数组(`v8.3.5`开始支持)            | number /string/array | 时间类型为`time`时：`00:00`，否则`new Date().getTime()` |
| type                                                                         |           时间类型，可选值为 `date` `time` `year-month` `month-day` `datehour`           | string               | `datetime`                                              |
| title                                                                        |                                        顶部栏标题                                        | string               | ''                                                      |
| confirm-button-text                                                          |                                       确认按钮文字                                       | string               | `确认`                                                  |
| cancel-button-text                                                           |                                       取消按钮文字                                       | string               | `取消`                                                  |
| show-toolbar                                                                 |                                      是否显示顶部栏                                      | boolean              | `true`                                                  |
| loading                                                                      |                                     是否显示加载状态                                     | boolean              | `false`                                                 |
| readonly                                                                     |                          是否为只读状态，只读状态下无法切换选项                          | boolean              | `false`                                                 |
| filter                                                                       |                                       选项过滤函数                                       | (type, vals) => vals | -                                                       |
| formatter                                                                    |                                      选项格式化函数                                      | (type, val) => val   | -                                                       |
| columns-order                                                                |          自定义列排序数组, 子项可选值为`year`、`month`、`day`、`hour`、`minute`          | string[]             | -                                                       |
| item-height                                                                  |                      选项高度，支持 `px` `vw` `rem` 单位，默认 `px`                      | number / string      | `44`                                                    |
| visible-item-count                                                           |                                      可见的选项个数                                      | number / string      | `6`                                                     |
| swipe-duration                                                               |                            快速滑动时惯性滚动的时长，单位`ms`                            | number / string      | `1000`                                                  |
| range                                                                        |                                     是否选择时间范围                                     | boolean              | `false`                                                 |
| pad                                                                          | 是否设为`pad`端样式，该属性为`true`时，默认选择年月日，`basic`自动为`true`，使用基座样式 | boolean              | `false`                                                 |

#### DateTimePicker Props

当时间选择器类型为 `date` 或 `datetime` 时，支持以下 `props`:

| 参数     |            说明            | 类型   | 默认值   |
| :------- | :------------------------: | :----- | :------- |
| min-date | 可选的最小时间，精确到分钟 | number | `十年前` |
| max-date | 可选的最大时间，精确到分钟 | number | `十年后` |

#### TimePicker Props

当时间选择器类型为 `time` 时，支持以下 `props`:

| 参数       |      说明      | 类型   | 默认值 |
| :--------- | :------------: | :----- | :----- |
| min-hour   | 可选的最小小时 | number | `0`    |
| max-hour   | 可选的最大小时 | number | `23`   |
| min-minute | 可选的最小分钟 | number | `0`    |
| max-minute | 可选的最大分钟 | number | `59`   |

#### Popup Props

时间选择组件已经包裹了`popup`组件，故也支持传递`popup`组件的部分`props`。相关`props`的具体示例请参考`popup`组件章节。

| 参数                   |                   说明                    | 类型    | 默认值 |
| :--------------------- | :---------------------------------------: | :------ | :----- |
| overlay                |              是否显示遮罩层               | boolean | `true` |
| overlay-style          |             自定义遮罩层样式              | object  | -      |
| transition             | 动画类名，等价于 `transtion` 的`name`属性 | string  | -      |
| close-on-click-overlay |          是否在点击遮罩层后关闭           | boolean | `true` |
| lock-scroll            |             是否锁定背景滚动              | boolean | `true` |

#### DatePicker Events

| 事件名  |           说明           | 回调参数                                          |
| :------ | :----------------------: | :------------------------------------------------ |
| change  |   当值变化时触发的事件   | `picker`: `Picker` 实例                           |
| confirm | 点击完成按钮时触发的事件 | `value`: 当前选中的时间，选择时间范围时是一个数组 |
| cancel  | 点击取消按钮时触发的事件 | -                                                 |

#### Popup Events

时间选择组件已经包裹了`popup`组件，故也支持`popup`组件的部分事件。相关事件的具体示例请参考`popup`组件章节。

| 事件名 |       说明       | 回调参数                    |
| :----- | :--------------: | :-------------------------- |
| close  | 关闭弹出层时触发 | `value`: 当前弹出层是否展开 |

#### DatePicker Slots

| 名称          |          说明          | 参数 |
| :------------ | :--------------------: | :--- |
| default       | 自定义整个顶部栏的内容 | -    |
| title         |     自定义标题内容     | -    |
| confirm       |   自定义确认按钮内容   | -    |
| cancel        |   自定义取消按钮内容   | -    |
| columnsTop    |   自定义选项上方内容   | -    |
| columnsBottom |   自定义选项下方内容   | -    |

#### 方法

通过 `ref` 可以获取到 `DatetimePicker` 实例并调用实例方法

| 方法名    |                       说明                       | 参数 | 返回值 |
| :-------- | :----------------------------------------------: | :--- | :----- |
| getPicker | 获取 `Picker` 实例，用于调用 `Picker` 的实例方法 | -    | -      |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/ejsdoc/showcase/m8-showcase/default.html#/datepicker"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-date-picker"
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
