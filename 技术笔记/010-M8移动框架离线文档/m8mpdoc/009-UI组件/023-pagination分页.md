# 组件使用

## pagination 分页

### 介绍

-   分页组件。

::: ifdef M83

-   该组件自`v8.3.23-beta.3`版本开始支持

::: endif
::: ifdef M84

-   该组件自`v8.4.1-beta.1`版本开始支持

::: endif

### 代码演示

#### 基础用法

通过`total-items`设置总记录数。

```html
<em-pagination v-model="currentPage" :total-items="100"></em-pagination>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            currentPage: 1
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
// 使用 ref 创建响应式数据
const currentPage = ref(1);
```

::: endif

#### 简单模式

通过`mode`设置分页模式，可选值为`simple`、`multi`，默认是 `multi`

```html
<em-pagination v-model="currentPage" mode="simple" :page-count="12" />
```

::: ifdef M83

```js
export default {
    data() {
        return {
            currentPage: 1
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
// 使用 ref 创建响应式数据
const currentPage = ref(1);
```

::: endif

#### 显示省略号

通过`force-ellipses`属性设置为`true`，为页码两侧添加省略号。

```html
<em-pagination v-model="currentPage" :total-items="125" :show-page-size="3" force-ellipses />
```

::: ifdef M83

```js
export default {
    data() {
        return {
            currentPage: 1
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
// 使用 ref 创建响应式数据
const currentPage = ref(1);
```

::: endif

#### 使用插槽

通过`prevText`、`nextText`插槽可自定义前后按钮内容。

通过`page`插槽可自定义页面每项内容。

```html
<em-pagination v-model="currentPage" :total-items="125">
    <template #prevText>-</template>
    <template #nextText>+</template>
    <template #page="{ text, active, number }">{{ number }}+</template>
</em-pagination>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            currentPage: 1
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
// 使用 ref 创建响应式数据
const currentPage = ref(1);
```

::: endif

### API

#### Props

| 参数                                                                         |             说明             | 类型            | 默认值     |
| :--------------------------------------------------------------------------- | :--------------------------: | :-------------- | :--------- |
| v-model ::: ifdef M83 (value) ::: endif ::: ifdef M84 (modelValue) ::: endif |           当前页码           | number          | -          |
| mode                                                                         |  显示模式，可选值为 simple   | string          | `multi`    |
| prev-text                                                                    |        上一页按钮文字        | string          | `上一页`   |
| next-text                                                                    |        下一页按钮文字        | string          | `下一页`   |
| page-count                                                                   |            总页数            | number / string | `自动计算` |
| total-items                                                                  |           总记录数           | number / string | `0`        |
| items-per-page                                                               |          每页记录数          | number / string | `10`       |
| show-page-size                                                               |        显示的页码个数        | number / string | `5`        |
| force-ellipses                                                               |        是否显示省略号        | boolean         | `false`    |
| disable-input                                                                | 简单模式下，禁用 select 弹窗 | boolean         | `false`    |

#### Events

| 名称   |      说明      | 参数                  |
| :----- | :------------: | --------------------- |
| change | 页码改变时触发 | `currentPage: number` |

#### Slots

| 名称      |         描述         | 参数                                              |
| :-------- | :------------------: | :------------------------------------------------ |
| page      |      自定义页码      | { number: number, text: string, active: boolean } |
| prev-text | 自定义上一页按钮文字 | -                                                 |
| next-text | 自定义下一页按钮文字 | -                                                 |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-pagination"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-pagination"
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
