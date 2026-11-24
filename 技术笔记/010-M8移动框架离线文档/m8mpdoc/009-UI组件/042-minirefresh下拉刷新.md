# 组件使用

## minirefresh 下拉刷新

### 介绍

-   M8 下拉刷新组件

### 代码演示

#### 基础演示

::: ifdef M83

```html
<em-minirefresh ref="scrollPull" :page-size="pageSize" :url="url" :request-data="dataRequest" :change-data="dataChange">
    <!-- 定义列表模板内容 -->
    <template v-slot:default="{ listData }">
        <!--listData为经过dataChange处理的返回参数 -->
        <em-cell v-for="(item, index) in listData" :key="index" :title="item.title" @click="itemClick(item)" />
    </template>
</em-minirefresh>
```

```js
export default {
    data() {
        return {
            // 请求的url
            url: `${Config.serverUrl}/rest/list`,
            // 接口请求的初始页面
            initPageIndex: 0,
            // 每次请求的分页大小
            pageSize: 15
        };
    },
    methods: {
        // 请求参数函数
        dataRequest(currPage, pageSize) {
            const data = {
                // keyword: this.keyWord,
                // 当前搜索的第几页，数字类型
                currentpageindex: currPage,
                // 每页显示记录条数，数字类型
                pagesize: pageSize
            };
            const requestData = {
                params: JSON.stringify(data)
            };

            return requestData;
        },
        // 修改数据返回参数, res为接口返回参数，requestData为请求入参（组件库v1.0.6版本开始支持）
        dataChange(res, requestData) {
            let data;

            if (res.status.code === 1) {
                data = res.custom.infolist;
            } else {
                console.error('接口返回参数错误');
            }

            return data;
        },
        // 列表模板绑定的点击事件函数
        itemClick(item) {
            console.log(item);
        }
    }
};
```

::: endif
::: ifdef M84

```html
<em-minirefresh ref="scrollPull" :page-size="pageSize" :url="url" :request-data="dataRequest" :change-data="dataChange">
    <template #default="{ listData }">
        <em-cell v-for="(item, index) in listData" :key="index" :title="item.title" @click="itemClick(item)" />
    </template>
</em-minirefresh>
```

```js
import { ref } from 'vue';
// 请求的url
const url = `${Config.serverUrl}/rest/list`;
// 接口请求的初始页面
const initPageIndex = ref(0);
// 每次请求的分页大小
const pageSize = ref(15);

// 请求参数函数
const dataRequest = (currPage, pageSize) => {
    const data = {
        // keyword: this.keyWord,
        // 当前搜索的第几页，数字类型
        currentpageindex: currPage,
        // 每页显示记录条数，数字类型
        pagesize: pageSize
    };
    const requestData = {
        params: JSON.stringify(data)
    };

    return requestData;
};

// 修改数据返回参数, res为接口返回参数，requestData为请求入参（组件库v1.0.6版本开始支持）
const dataChange = (res, requestData) => {
    let data;

    if (res.status.code === 1) {
        data = res.custom.infolist;
    } else {
        console.error('接口返回参数错误');
    }

    return data;
};

// 列表模板绑定的点击事件函数
const itemClick = (item) => {
    console.log(item);
};
```

::: endif

#### 无感刷新并保持滚动位置

无感刷新并保持滚动位置，需要同时设置 `keeppos`，并向 `refresh` 方法传入 `{ animationType: 'noAnimation' }`：

```html
<em-minirefresh
    ref="scrollPull"
    :keeppos="true"
    :page-size="pageSize"
    :url="url"
    :request-data="dataRequest"
    :change-data="dataChange"
>
    <template v-slot:default="{ listData }">
        <em-cell v-for="(item, index) in listData" :key="index" :title="item.title" />
    </template>
</em-minirefresh>
```

::: ifdef M83

```js
export default {
    methods: {
        silentRefresh() {
            this.$refs.scrollPull.refresh({
                animationType: 'noAnimation'
            });
        }
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';

const scrollPull = ref(null);

const silentRefresh = () => {
    scrollPull.value.refresh({
        animationType: 'noAnimation'
    });
};
```

::: endif

`noAnimation` 只控制不展示刷新动画，`keeppos` 用于保持刷新前的滚动位置，请勿使用 `refresh(4)`。保位刷新会根据已加载页数动态调整请求的页码和每页数量，因此 `request-data` 必须使用回调传入的 `currPage`、`pageSize`；使用自定义请求时，必须使用 `options.currPageIndex`、`options.currPageSize`，不能写死分页参数。

组件默认使用固定、可滚动容器。若修改了 `fixed`、`ulMinHeight` 或 `disableScroll`，需确保组件外层有明确高度且内容可滚动，否则无法保持位置。

#### 自定义请求数据源

`useCustomRequest` 参数为`true`时，开发者可自定义获取数据源，下拉刷新组件通过`request`事件触发数据源获取。

`page-size`必须设置，因为该参数影响组件加载结束判定，不设置时该参数默认为`10`。

请求接口时应使用 `options.currPageIndex` 和 `options.currPageSize`。开启 `keeppos` 后手动刷新时，组件可能临时增大 `currPageSize`，用于重新获取当前位置之前已经加载的数据。

::: ifdef M83

```html
<em-minirefresh :page-size="pageSize" useCustomRequest @request="request">
    <template v-slot:default="{ listData }">
        <em-cell v-for="(item, index) in listData" :key="index" :title="item.title" @click="itemClick(item)" />
    </template>
</em-minirefresh>
```

```js
export default {
    data() {
        return {
            // 每次请求的分页大小
            pageSize: 15
        };
    },
    methods: {
        // 自定义请求数据方法，options包含currPageIndex，currPageSize等参数
        // 数据通过 successcb 方法再回调给下拉刷新组件
        request(options, successcb, errorcb) {
            const requestData = {
                currentpageindex: options.currPageIndex,
                pagesize: options.currPageSize
            };

            console.log(requestData);
            setTimeout(() => {
                let res = [
                    {
                        title: '选择标题样式,在这里更改标题的排列方式'
                    },
                    {
                        title: '选择标题'
                    }
                ];

                successcb(res);
            }, 1000);
        },
        // 列表模板绑定的点击事件函数
        itemClick(item) {
            console.log(item);
        }
    }
};
```

::: endif
::: ifdef M84

```html
<em-minirefresh :page-size="pageSize" useCustomRequest @request="request">
    <template v-slot:default="{ listData }">
        <em-cell v-for="(item, index) in listData" :key="index" :title="item.title" @click="itemClick(item)" />
    </template>
</em-minirefresh>
```

```js
import { ref } from 'vue';
// 每次请求的分页大小
const pageSize = ref(15);

// 自定义请求数据方法，options包含currPageIndex，currPageSize等参数
// 数据通过 successcb 方法再回调给下拉刷新组件
const request = (options, successcb, errorcb) => {
    const requestData = {
        currentpageindex: options.currPageIndex,
        pagesize: options.currPageSize
    };

    console.log(requestData);
    setTimeout(() => {
        let res = [
            {
                title: '选择标题样式,在这里更改标题的排列方式'
            },
            {
                title: '选择标题'
            }
        ];

        successcb(res);
    }, 1000);
};

// 列表模板绑定的点击事件函数
const itemClick = (item) => {
    console.log(item);
};
```

::: endif

### API

#### Props

| 参数                                          |                                                 说明                                                 | 类型          | 默认值                              |
| :-------------------------------------------- | :--------------------------------------------------------------------------------------------------: | :------------ | :---------------------------------- |
| url                                           |                                              请求的 url                                              | string        | -                                   |
| type                                          |                                               请求类型                                               | string        | `POST`                              |
| initPageIndex                                 |                           接口请求的初始页面,根据不同项目服务器配置而不同                            | number        | 0                                   |
| page-size                                     |                                          每次请求的分页大小                                          | number        | 10                                  |
| <span style="color: red;">request-data</span> |             请求的数据，为函数时请将数据返回出去（为了兼容小程序端，命名方式与原本不同）             | object        | -                                   |
| <span style="color: red;">change-data</span>  |            请求返回参数，请将列表数组数据返回出去（为了兼容小程序端，命名方式与原本不同）            | object        | -                                   |
| timeout                                       |                                        每次请求的最大超时时间                                        | number        | `6000`                              |
| delay                                         |                                      延迟请求的时间，单位为毫秒                                      | number        | `0`                                 |
| contentType                                   |                                      下拉刷新请求的 contentType                                      | string        | `application/x-www-form-urlencoded` |
| headers                                       |                                           自定义请求头内容                                           | object        |                                     |
| isAutoProxy                                   |                                       是否使用 token 自动代理                                        | boolean       | true                                |
| downPullingText                               |                                           下拉过程提示文案                                           | string        | `下拉即可刷新...`                   |
| downLoosingText                               |                                         下拉释放过程提示文案                                         | string        | `释放即可刷新...`                   |
| downLoadingText                               |                                           加载过程提示文案                                           | string        | `加载中...`                         |
| downSuccessText                               |                                           刷新成功提示文案                                           | string        | `刷新成功`                          |
| downErrorText                                 |                                           刷新失败提示文案                                           | string        | `刷新失败`                          |
| downSuccessDuration                           |                                       刷新成功提示展示时长(ms)                                       | string/number | `500`                               |
| downAnimationDuration                         |                                             动画时长(ms)                                             | string/number | `300`                               |
| downHeadHeight                                |                                             顶部内容高度                                             | string/number | `50`                                |
| downDisabled                                  |                                           是否禁用下拉刷新                                           | boolean       | `false`                             |
| downImmediatePull                             |                                    是否在初始化时立即执行下拉刷新                                    | boolean       | `true`                              |
| upOffset                                      |                             滚动条与底部距离小于 offset 时触发 load 事件                             | string/number | `300`                               |
| upLoadingText                                 |                                       上拉加载过程中的提示文案                                       | string        | `加载中...`                         |
| upFnishedText                                 |                                       上拉加载完成后的提示文案                                       | string        | `没有更多了`                        |
| upErrorText                                   |                                          加载失败的提示文案                                          | string        | -                                   |
| upImmediateCheck                              |                                  是否在初始化时立即执行滚动位置检查                                  | boolean       | `false`                             |
| upDirection                                   |                                   滚动触发加载的方向，可选值为 up                                    | boolean       | `down`                              |
| ulMinHeight                                   |                                         下拉刷新容器最小高度                                         | string        | `-`                                 |
| keeppos                                       | 是否保持手动刷新前的滚动位置；需配合 `refresh({ animationType: 'noAnimation' })` 实现无感保位刷新，并确保容器有固定高度且可滚动 | boolean       | `false`                             |
| description                                   |                                    列表为空时, 默认缺省图文字描述                                    | string        | `暂无数据`                          |
| image                                         |         列表为空时, 默认缺省图图标, 可选值为 `error` `network` `search`，支持传入图片 `URL`          | string        | `default`                           |
| top                                           |                                              顶部偏移量                                              | string/number | `0`                                 |
| bottom                                        |                                              底部偏移量                                              | string/number | `0`                                 |
| otherOptions                                  |                                        ajax 其他自定义配置项                                         | object        | `-`                                 |
| useCustomRequest `v8.3.7-beta.0`              |                                        是否自定义请求数据方法                                        | boolean       | `false`                             |
| noMoreSize `v8.3.19-beta.0`                   | 如果列表已加载不出更多数据，底部是否展示无更多数据提示取决于，列表的总数量是否大于等于`noMoreSize`条 | number/string | `5`                                 |

#### 事件

| 事件名                                         |                       说明                       | 回调参数                                                         |
| :--------------------------------------------- | :----------------------------------------------: | :--------------------------------------------------------------- |
| request `v8.3.7-beta.0`                        | 刷新时触发，仅在`useCustomRequest`为`true`时生效 | options: 请求相关的参数，successcb: 成功回调， errorcb: 失败回调 |
| ::: ifdef M84 update:listData `v8.4` ::: endif |              用于同步 listData 事件              | listData: 数据列表                                               |
| ::: ifdef M84 update:distance `v8.4` ::: endif |              用于同步 distance 事件              | distance: 距离                                                   |

#### 方法

通过 ref 可以获取到 minirefresh 实例并调用实例方法，详见组件实例方法

| 名称    |         说明         | 参数                                             | 返回值 |
| :------ | :------------------: | :----------------------------------------------- | :----- |
| refresh | 手动触发刷新；传入 `noAnimation` 时不展示刷新动画，保持位置还需设置 `keeppos` | `{ animationType: 'noAnimation' }` | -      |
| check   | 手动触发上拉加载功能 | -                                                | -      |

#### Slots

插槽，用于个性化实现内容

| 名称        |           说明           |         SlotProps          |
| :---------- | :----------------------: | :------------------------: |
| default     |    自定义列表模板内容    |   { listData: 列表数据 }   |
| down-Normal |   非下拉状态时顶部内容   |             -              |
| downPulling |    下拉过程中顶部内容    | { distance: 当前下拉距离 } |
| downLoosing |  下拉释放过程中顶部内容  | { distance: 当前下拉距离 } |
| downLoading |  下拉加载过程中顶部内容  | { distance: 当前下拉距离 } |
| downSuccess | 下拉刷新成功顶部提示内容 |             -              |
| upHeader    |   自定义底部加载中内容   |             -              |
| upFinished  |  自定义加载完成后的提示  |             -              |
| upError     |  自定义加载失败后的提示  |             -              |
| empty       |      空列表内容提示      |             -              |

::: ifdef M83

<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-minirefresh"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-minirefresh"
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

### 常见问题

为什么下拉刷新加载后会立即触发刷新事件？

> 下拉刷新初始化后会自动触发一次刷新事件，用于加载第一屏的数据，这个特性可以通过 upImmediateCheck 属性或 downImmediatePull 关闭。

如何手动实现第一次的下拉刷新请求?

![](https://pic.downk.cc/item/5fe012953ffa7d37b3207d2f.jpg)
