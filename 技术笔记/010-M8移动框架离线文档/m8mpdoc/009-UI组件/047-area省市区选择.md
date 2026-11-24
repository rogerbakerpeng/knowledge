# 组件使用

## area 省市区选择

### 介绍

-   省市区三级联动选择。

### 代码演示

#### 基础用法

要初始化一个`Area`组件，你需要传入一个`area-list`属性，数据格式具体可看下面数据格式章节。

```html
<em-cell @click="show1 = true">基础用法</em-cell>
<em-area v-model="show1" title="标题" :area-list="areaList"></em-area>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            show1: false
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const show1 = ref(false);
```

::: endif

#### 选中省市区

如果想选中某个省市区，需要传入一个`code-value`属性，绑定对应的省市区`code`

```html
<em-cell @click="show2 = true">选中省市区</em-cell>
<em-area v-model="show2" title="标题" :area-list="areaList" code-value="120105"></em-area>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            show2: false
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const show2 = ref(false);
```

::: endif

#### 配置显示列

可以通过`columns-num`属性配置省市区显示的列数，默认情况下会显示省市区，当你设置为`2`，则只会显示省市选择

```html
<em-cell @click="show3 = true">配置显示列</em-cell>
<em-area v-model="show3" title="标题" :area-list="areaList" :columns-num="2"></em-area>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            show3: false
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const show3 = ref(false);
```

::: endif

#### 配置列占位提示文字

可以通过`columns-placeholder`属性配置每一列的占位提示文字

```html
<em-cell @click="show4 = true">配置列占位提示文字</em-cell>
<em-area
    v-model="show4"
    title="标题"
    :area-list="areaList"
    :columns-placeholder="['请选择', '请选择', '请选择']"
></em-area>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            show4: false
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const show4 = ref(false);
```

::: endif

### API

#### Area Props

| 参数                                                                         | 说明                                           | 类型            | 默认值  |
| :--------------------------------------------------------------------------- | :--------------------------------------------- | :-------------- | :------ |
| v-model ::: ifdef M83 (value) ::: endif ::: ifdef M84 (modelValue) ::: endif | 切换组件显隐                                   | boolean         | `false` |
| code-value                                                                   | 当前选中的省市区`code`                         | string          | -       |
| title                                                                        | 顶部栏标题                                     | string          | -       |
| confirm-button-text                                                          | 确认按钮文字                                   | string          | `确认`  |
| cancel-button-text                                                           | 取消按钮文字                                   | string          | `取消`  |
| area-list                                                                    | 省市区数据，格式见下方                         | object          | -       |
| columns-placeholder                                                          | 列占位提示文字                                 | string[]        | `[]`    |
| loading                                                                      | 是否显示加载状态                               | boolean         | `false` |
| readonly                                                                     | 是否为只读状态，只读状态下无法切换选项         | boolean         | `false` |
| item-height                                                                  | 选项高度，支持 `px` `vw` `rem` 单位，默认 `px` | number / string | `44`    |
| columns-num                                                                  | 显示列数，3-省市区，2-省市，1-省               | number / string | `3`     |
| visible-item-count                                                           | 可见的选项个数                                 | number / string | `6`     |
| swipe-duration                                                               | 快速滑动时惯性滚动的时长，单位`ms`             | number / string | `1000`  |

#### Popup Props

省市区选择器组件已经包裹了`popup`组件，故也支持传递`popup`组件的部分`props`。相关`props`的具体示例请参考`popup`组件章节。

| 参数                   |                   说明                    | 类型    | 默认值 |
| :--------------------- | :---------------------------------------: | :------ | :----- |
| overlay                |              是否显示遮罩层               | boolean | `true` |
| overlay-class          |             自定义遮罩层类名              | string  | -      |
| overlay-style          |             自定义遮罩层样式              | object  | -      |
| transition             | 动画类名，等价于 `transtion` 的`name`属性 | string  | -      |
| close-on-click-overlay |          是否在点击遮罩层后关闭           | boolean | `true` |
| lock-scroll            |             是否锁定背景滚动              | boolean | `true` |
| lazy-render            |        是否在显示弹层时才渲染节点         | boolean | `true` |

注意，其中`transition`属性组件库支持的可选值有：`em-fade` `em-fade-up` `em-fade-down` `em-fade-left` `em-fade-right` `em-slide-up` `em-slide-down` `em-slide-left` `em-slide-right`

#### Area Events

| 事件    | 说明               | 回调参数                                 |
| :------ | :----------------- | :--------------------------------------- |
| confirm | 点击右上方完成按钮 | 一个数组参数，具体格式看下方数据格式章节 |
| cancel  | 点击取消按钮时     | -                                        |
| change  | 选项改变时触发     | 所有列选中值，当前列对应的索引           |

#### Popup Events

省市区选择组件已经包裹了`popup`组件，故也支持`popup`组件的部分事件。相关事件的具体示例请参考`popup`组件章节。

| 事件名 |       说明       | 回调参数                    |
| :----- | :--------------: | :-------------------------- |
| close  | 关闭弹出层时触发 | `value`: 当前弹出层是否展开 |

#### Area Slots

| 名称           | 说明               |
| :------------- | :----------------- |
| title          | 自定义标题内容     |
| columns-top    | 自定义选项上方内容 |
| columns-bottom | 自定义选项下方内容 |

#### Area 方法

通过 `ref` 可以获取到 `Area` 实例并调用实例方法，详见组件实例方法

| 方法名 | 说明                                                    | 参数          | 返回值 |
| :----- | :------------------------------------------------------ | :------------ | :----- |
| reset  | 根据 `code` 重置所有选项，若不传 `code`，则重置到第一项 | code?: string | -      |

#### 省市区列表数据格式

整体是一个 `object`，包含 `province_list`, `city_list`, `county_list` 三个 `key`。

每项以省市区编码作为 `key`，省市区名字作为 `value`。编码为 `6` 位数字，前两位代表省份，中间两位代表城市，后两位代表区县，以 `0` 补足 `6` 位。如北京编码为 `11`，以零补足 `6` 位，为 `110000`。

`AreaList`具体格式如下：

```js
{
  province_list: {
    110000: '北京市',
    120000: '天津市'
  },
  city_list: {
    110100: '北京市',
    110200: '县',
    120100: '天津市',
    120200: '县'
  },
  county_list: {
    110101: '东城区',
    110102: '西城区',
    110105: '朝阳区',
    110106: '丰台区'
    120101: '和平区',
    120102: '河东区',
    120103: '河西区',
    120104: '南开区',
    120105: '河北区',
    // ....
  }
}
```

#### 点击完成时返回的数据格式

返回的数据整体为一个数组，数组内包含 `columnsNum`个数据， 每个数据对应一列选项中被选中的数据。

`code` 代表被选中的地区编码， `name` 代表被选中的地区名称

```js
[
    {
        code: '110000',
        name: '北京市'
    },
    {
        code: '110100',
        name: '北京市'
    },
    {
        code: '110101',
        name: '东城区'
    }
];
```

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-area"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-area"
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
