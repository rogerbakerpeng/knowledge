# 组件使用

## countdown 倒计时

### 介绍

-   倒计时。

### 代码演示

#### 基础用法

`time`属性表示倒计时总时长，单位为毫秒

```html
<em-count-down :time="time" />
```

::: ifdef M83

```js
export default {
    data() {
        return {
            time: 30 * 60 * 60 * 1000
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const time = ref(30 * 60 * 60 * 1000);
```

::: endif

#### 自定义格式

通过`format`属性设置倒计时文本的内容

```html
<em-count-down :time="time" format="DD 天 HH 时 mm 分 ss 秒" />
```

#### 毫秒级渲染

倒计时默认每秒渲染一次，设置`millisecond`属性可以开启毫秒级渲染

```html
<em-count-down millisecond :time="time" format="HH:mm:ss:SS" />
```

#### 自定义样式

通过插槽自定义倒计时的样式，`timeData`对象格式见下方表格

::: ifdef M83

```html
<em-count-down :time="time">
    <template v-slot="{ timeData }">
        <span class="block">{{ timeData.hours }}</span>
        <span class="colon">:</span>
        <span class="block">{{ timeData.minutes }}</span>
        <span class="colon">:</span>
        <span class="block">{{ timeData.seconds }}</span>
    </template>
</em-count-down>

<style>
    .colon {
        display: inline-block;
        margin: 0 4px;
        color: #ee0a24;
    }
    .block {
        display: inline-block;
        width: 22px;
        color: #fff;
        font-size: 12px;
        text-align: center;
        background-color: #ee0a24;
    }
</style>
```

::: endif

::: ifdef M84

```html
<em-count-down :time="time">
    <template #default="{ timeData }">
        <span class="block">{{ timeData.hours }}</span>
        <span class="colon">:</span>
        <span class="block">{{ timeData.minutes }}</span>
        <span class="colon">:</span>
        <span class="block">{{ timeData.seconds }}</span>
    </template>
</em-count-down>

<script setup>
    import { ref } from 'vue';
    const time = ref(30 * 60 * 60 * 1000);
</script>

<style>
    .colon {
        display: inline-block;
        margin: 0 4px;
        color: #ee0a24;
    }
    .block {
        display: inline-block;
        width: 22px;
        color: #fff;
        font-size: 12px;
        text-align: center;
        background-color: #ee0a24;
    }
</style>
```

::: endif

#### 手动控制

通过 `ref` 获取到组件实例后，可以调用`start`、`pause`、`reset`方法

::: ifdef M83

```html
<em-count-down ref="countDown" millisecond :time="3000" :auto-start="false" format="ss:SSS" @finish="finish" />
<em-grid clickable>
    <em-grid-item text="开始" icon="play-circle-o" @click="start" />
    <em-grid-item text="暂停" icon="pause-circle-o" @click="pause" />
    <em-grid-item text="重置" icon="replay" @click="reset" />
</em-grid>
<em-toast ref="emToast"></em-toast>
```

```js
export default {
    methods: {
        start() {
            this.$refs.countDown.start();
        },
        pause() {
            this.$refs.countDown.pause();
        },
        reset() {
            this.$refs.countDown.reset();
        },
        finish() {
            Toast('倒计时结束');
        }
    }
};
```

::: endif
::: ifdef M84

```html
<em-count-down ref="countDown" millisecond :time="3000" :auto-start="false" format="ss:SSS" @finish="finish" />
<em-grid clickable>
    <em-grid-item text="开始" icon="play-circle-o" @click="start" />
    <em-grid-item text="暂停" icon="pause-circle-o" @click="pause" />
    <em-grid-item text="重置" icon="replay" @click="reset" />
</em-grid>
<em-toast ref="emToastRef"></em-toast>
```

```js
import { ref } from 'vue';
const countDown = ref(null);
const emToastRef = ref(null);

const start = () => {
    countDown.value.start();
};
const pause = () => {
    countDown.value.pause();
};
const reset = () => {
    countDown.value.reset();
};
const finish = () => {
    Toast('倒计时结束');
};

defineExpose({
    emToastRef
});
```

::: endif

### API

#### Props

| 参数        |         说明         | 类型            | 默认值     |
| :---------- | :------------------: | :-------------- | :--------- |
| time        | 倒计时时长，单位毫秒 | number / string | `0`        |
| format      |       时间格式       | string          | `HH:mm:ss` |
| auto-start  |  是否自动开始倒计时  | boolean         | `true`     |
| millisecond |  是否开启毫秒级渲染  | boolean         | `false`    |

#### format 格式

| 格式 |     说明     |
| :--- | :----------: |
| DD   |     天数     |
| HH   |     小时     |
| mm   |     分钟     |
| ss   |     秒数     |
| S    | 毫秒（1 位） |
| SS   | 毫秒（2 位） |
| SSS  | 毫秒（3 位） |

#### Events

| 事件名                                         |          说明          | 回调参数           |
| :--------------------------------------------- | :--------------------: | :----------------- |
| finish                                         |    倒计时结束时触发    | -                  |
| change                                         |    倒计时变化时触发    | timeData: TimeData |
| ::: ifdef M84 update:timeData `v8.4` ::: endif | 用于同步 timeData 事件 | timeData: TimeData |

#### Slots

| 名称    |    说明    | SlotProps                                  |
| :------ | :--------: | :----------------------------------------- |
| default | 自定义内容 | timeData: TimeData |

#### TimeData 格式

| 名称         |   说明   | 类型   |
| :----------- | :------: | :----- |
| days         | 剩余天数 | number |
| hours        | 剩余小时 | number |
| minutes      | 剩余分钟 | number |
| seconds      | 剩余秒数 | number |
| milliseconds | 剩余毫秒 | number |

#### 方法

通过 `ref` 可以获取到 `CountDown` 实例并调用实例方法，详见组件实例方法

| 方法名 |                            说明                            | 参数 | 返回值 |
| :----- | :--------------------------------------------------------: | :--- | :----- |
| start  |                         开始倒计时                         | -    | -      |
| pause  |                         暂停倒计时                         | -    | -      |
| reset  | 重设倒计时，若`auto-start`为`true`，重设后会自动开始倒计时 | -    | -      |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-count-down"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-count-down"
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
