# 组件使用

## calendar 日历

### 介绍

-   日历组件用于选择日期或日期区间。

### 代码演示

#### 选择单个日期

下面演示了结合单元格来使用日历组件的用法，日期选择完成后会触发 `confirm` 事件。

```html
<em-cell title="选择单个日期" :value="date" @click="show = true" />
<em-calendar v-model="show" @confirm="onConfirm" />
```

::: ifdef M83

```js
export default {
    data() {
        return {
            date: '',
            show: false
        };
    },
    methods: {
        formatDate(date) {
            return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
        },
        onConfirm(date) {
            this.show = false;
            this.date = this.formatDate(date);
        }
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';

const date = ref('');
const show = ref(false);

const formatDate = (currdate) => {
    return `${currdate.getFullYear()}/${currdate.getMonth() + 1}/${currdate.getDate()}`;
};

const onConfirm = (currdate) => {
    show.value = false;
    date.value = formatDate(currdate);
};
```

::: endif

#### 选择多个日期

设置 `type` 为 `multiple` 后可以选择多个日期，此时 `confirm` 事件返回的 `date` 为数组结构，数组包含若干个选中的日期。

```html
<em-cell title="选择多个日期" :value="text" @click="show = true" />
<em-calendar v-model="show" type="multiple" @confirm="onConfirm" />
```

::: ifdef M83

```js
export default {
    data() {
        return {
            text: '',
            show: false
        };
    },
    methods: {
        onConfirm(date) {
            this.show = false;
            this.text = `选择了 ${date.length} 个日期`;
        }
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';

const text = ref('');
const show = ref(false);

const onConfirm = (date) => {
    show.value = false;
    text.value = `选择了 ${date.length} 个日期`;
};
```

::: endif

#### 选择日期区间

设置 `type` 为 `range` 后可以选择日期区间，此时 `confirm` 事件返回的 `date` 为数组结构，数组第一项为开始时间，第二项为结束时间。

```html
<em-cell title="选择日期区间" :value="date" @click="show = true" />
<em-calendar v-model="show" type="range" @confirm="onConfirm" />
```

::: ifdef M83

```js
export default {
    data() {
        return {
            date: '',
            show: false
        };
    },
    methods: {
        formatDate(date) {
            return `${date.getMonth() + 1}/${date.getDate()}`;
        },
        onConfirm(date) {
            const [start, end] = date;
            this.show = false;
            this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`;
        }
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';

const date = ref('');
const show = ref(false);

const formatDate = (currdate) => {
    return `${currdate.getMonth() + 1}/${currdate.getDate()}`;
};

const onConfirm = (date) => {
    const [start, end] = date;
    show.value = false;
    date.value = `${formatDate(start)} - ${formatDate(end)}`;
};
```

::: endif

#### 快捷选择

将 `show-confirm` 设置为 `false` 可以隐藏确认按钮，这种情况下选择完成后会立即触发 `confirm` 事件。

```html
<em-calendar v-model="show" :show-confirm="false" />
```

#### 自定义颜色

通过 `color` 属性可以自定义日历的颜色，对选中日期和底部按钮生效。

```html
<em-calendar v-model="show" color="#07c160" />
```

#### 自定义日期范围

通过 `min-date` 和 `max-date` 定义日历的范围。

```html
<em-calendar v-model="show" :min-date="minDate" :max-date="maxDate" />
```

::: ifdef M83

```js
export default {
    data() {
        return {
            show: false,
            minDate: new Date(2010, 0, 1).getTime(),
            maxDate: new Date(2010, 0, 31).getTime()
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';

const show = ref(false);
const minDate = ref(new Date(2010, 0, 1).getTime());
const maxDate = ref(new Date(2010, 0, 31).getTime());
```

::: endif

#### 自定义按钮文字

通过 `confirm-text` 设置按钮文字，通过 `confirm-disabled-text` 设置按钮禁用时的文字。

```html
<em-calendar v-model="show" type="range" confirm-text="完成" confirm-disabled-text="请选择结束时间" />
```

#### 自定义日期文案

通过传入 `formatter` 函数来对日历上每一格的内容进行格式化。

```html
<em-cell is-link title="自定义日期文案" :value="date9" @click="onclickShow" />
<em-calendar v-model="show9" :min-date="minDate" :max-date="maxDate" type="range" :formatter="formatter" />
```
::: ifdef M83
```js
// 动态添加和去除ref名称
export default {
    data() {
        return {
            date9: '',
            show9: false,
            minDate: new Date(2010, 4, 1).getTime(),
            maxDate: new Date(2010, 4, 31).getTime()
        };
    },
    methods: {
        onclickShow() {
            this.show9 = true;
        },
        formatter(day) {
            const month = day.date.getMonth() + 1;
            const date = day.date.getDate();

            if (month === 5) {
                if (date === 1) {
                    day.topInfo = '劳动节';
                } else if (date === 4) {
                    day.topInfo = '青年节';
                } else if (date === 11) {
                    day.text = '今天';
                }
            }

            if (day.type === 'start') {
                day.bottomInfo = '入店';
            } else if (day.type === 'end') {
                day.bottomInfo = '离店';
            }

            return day;
        }
    }
};
```
::: endif
::: ifdef M84
```js
import { ref } from 'vue';

const date9 = ref('');
const show9 = ref(false);
const minDate = ref(new Date(2010, 4, 1).getTime());
const maxDate = ref(new Date(2010, 4, 31).getTime());

const onclickShow = () => {
    show9.value = true;
};

const formatter = (day) => {
    const month = day.date.getMonth() + 1;
    const date = day.date.getDate();

    if (month === 5) {
        if (date === 1) {
            day.topInfo = '劳动节';
        } else if (date === 4) {
            day.topInfo = '青年节';
        } else if (date === 11) {
            day.text = '今天';
        }
    }

    if (day.type === 'start') {
        day.bottomInfo = '入店';
    } else if (day.type === 'end') {
        day.bottomInfo = '离店';
    }

    return day;
};
```
::: endif

#### 自定义弹出位置

通过 `position` 属性自定义弹出层的弹出位置，可选值为 `top`、`left`、`right`。

```html
<em-calendar v-model="show" :round="false" position="right" />
```

#### 日期区间最大范围

选择日期区间时，可以通过 `max-range` 属性来指定最多可选天数，选择的范围超过最多可选天数时，会弹出相应的提示文案。

```html
<em-calendar type="range" :max-range="3" :style="{ height: '500px' }" />
```

#### 自定义周起始日

通过 `first-day-of-week` 属性设置一周从哪天开始。

```html
<em-calendar first-day-of-week="1" />
```

#### 平铺展示

将 `poppable` 设置为 `false`，日历会直接展示在页面内，而不是以弹层的形式出现。

```html
<em-calendar title="日历" :poppable="false" :show-confirm="false" custom-style="height:500px;" ref="calendar" />
```

### API

#### Props

| 参数                  |                                          说明                                          | 类型              | 默认值             |
| :-------------------- | :------------------------------------------------------------------------------------: | :---------------- | :----------------- |
| type                  | 选择类型:`single`表示选择单个日期，`multiple`表示选择多个日期，`range`表示选择日期区间 | string            | `single`           |
| title                 |                                        日历标题                                        | string            | 日期选择           |
| color                 |                            主题色，对底部按钮和选中日期生效                            | string            | `#ee0a24`          |
| min-date              |                                    可选择的最小日期                                    | Number(时间戳)    | 当前日期           |
| max-date              |                                    可选择的最大日期                                    | Number(时间戳)    | 当前日期的六个月后 |
| default-date          |                  默认选中的日期，`type`为`multiple`或`range`时为数组                   | Number(时间戳)    | 今天               |
| row-height            |                                        日期行高                                        | number / string   | `64`               |
| formatter             |                                     日期格式化函数                                     | (day: Day) => Day | -                  |
| poppable              |                                是否以弹层的形式展示日历                                | boolean           | `true`             |
| show-mark             |                                  是否显示月份背景水印                                  | boolean           | `true`             |
| show-title            |                                    是否展示日历标题                                    | boolean           | `true`             |
| show-subtitle         |                               是否展示日历副标题（年月）                               | boolean           | `true`             |
| show-confirm          |                                    是否展示确认按钮                                    | boolean           | `true`             |
| readonly              |                         是否为只读状态，只读状态下不能选择日期                         | boolean           | `false`            |
| confirm-text          |                                     确认按钮的文字                                     | string            | 确定               |
| confirm-disabled-text |                              确认按钮处于禁用状态时的文字                              | string            | 确定               |
| first-day-of-week     |                                      设置周起始日                                      | 0-6               | `0`                |

#### Poppable Props

当 `Canlendar` 的 `poppable` 为 `true` 时，支持以下 `props`:

| 参数                                                                         |                  说明                   | 类型    | 默认值   |
| :--------------------------------------------------------------------------- | :-------------------------------------: | :------ | :------- |
| v-model ::: ifdef M83 (value) ::: endif ::: ifdef M84 (modelValue) ::: endif |            是否显示日历弹窗             | boolean | `false`  |
| position                                                                     | 弹出位置，可选值为 `top` `right` `left` | string  | `bottom` |
| round                                                                        |            是否显示圆角弹窗             | boolean | `true`   |
| close-on-click-overlay                                                       |         是否在点击遮罩层后关闭          | boolean | `true`   |
| safe-area-inset-bottom                                                       |         是否开启底部安全区适配          | boolean | `true`   |

#### Range Props

当 `Canlendar` 的 `type` 为 `range` 时，支持以下 `props`:

| 参数           |                 说明                 | 类型            | 默认值                 |
| :------------- | :----------------------------------: | :-------------- | :--------------------- |
| max-range      |         日期区间最多可选天数         | number / string | 无限制                 |
| range-prompt   | 范围选择超过最多可选天数时的提示文案 | string          | 选择天数不能超过 xx 天 |
| allow-same-day |  是否允许日期范围的起止时间为同一天  | boolean         | `fasle`                |

#### Multiple Props

当 `Canlendar` 的 `type` 为 `multiple` 时，支持以下 `props`:

| 参数         |               说明               | 类型            | 默认值                 |
| :----------- | :------------------------------: | :-------------- | :--------------------- |
| max-range    |         日期最多可选天数         | number / string | 无限制                 |
| range-prompt | 选择超过最多可选天数时的提示文案 | string          | 选择天数不能超过 xx 天 |

#### Day 数据结构

日历中的每个日期都对应一个 `Day` 对象，通过`formatter`属性可以自定义 `Day` 对象的内容

| 键名       |                                说明                                | 类型   |
| :--------- | :----------------------------------------------------------------: | :----- |
| date       |                        日期对应的 Date 对象                        | Date   |
| type       | 日期类型，可选值为`selected`、`start`、`middle`、`end`、`disabled` | string |
| text       |                           中间显示的文字                           | string |
| topInfo    |                           上方的提示信息                           | string |
| bottomInfo |                           下方的提示信息                           | string |
| className  |                              额外类名                              | string |

#### Events

| 事件名     |                                说明                                | 回调参数                      |
| :--------- | :----------------------------------------------------------------: | :---------------------------- |
| select     |                      点击并选中任意日期时触发                      | value: Date / Date[]          |
| confirm    | 日期选择完成后触发，若`show-confirm`为`true`，则点击确认按钮后触发 | value: Date / Date[]          |
| open       |                          打开弹出层时触发                          | -                             |
| close      |                          关闭弹出层时触发                          | -                             |
| opened     |                     打开弹出层且动画结束后触发                     | -                             |
| closed     |                     关闭弹出层且动画结束后触发                     | -                             |
| unselect   |      当日历组件的 `type` 为 `multiple` 时，取消选中日期时触发      | value: Date                   |
| month-show |                    当某个月份进入可视区域时触发                    | { date: Date, title: string } |

#### Slots

| 名称   |        说明        |
| :----- | :----------------: |
| title  |     自定义标题     |
| footer | 自定义底部区域内容 |

#### 方法

通过 `ref` 可以获取到 `Calendar` 实例并调用实例方法，详见组件实例方法

| 方法名       |                         说明                         | 参数                       | 返回值 |
| :----------- | :--------------------------------------------------: | :------------------------- | :----- |
| reset        | 将选中的日期重置到指定日期，未传参时会重置到默认日期 | number?: number / number[] | -      |
| scrollToDate |                    滚动到某个日期                    | date: Date                 | -      |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-calendar"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-calendar"
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
