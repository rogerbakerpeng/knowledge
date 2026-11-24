# 组件使用

## SelectPerson 选人模块

### 介绍

-   跨端选人模块

### 调用方式

为了保持原本 M8 选人组件交互逻辑，且兼容各端差异，跨端选人不再以函数或者组件的形式提供调用，而是作为一个默认的页面提供。

该页面内置在跨端框架的`modules`目录下，路径：`ejs.m8.mobileframe\src\modules\selectperson`。

参数传递则通过`vuex`，跳转选人页面前，需要先设置选人页面命名空间下的`option`状态，来更新选人页面的参数。

调用示例：

```html
<em-cell is-link @click="openSelectPerson" title="选择人员"></em-cell>
```

::: ifdef M83

```js
import { mapMutations } from 'vuex';

export default {
    methods: {
        ...mapMutations('selectperson', ['setOption']),
        openSelectPerson() {
            let opt = {
                url: this.url,
                ismoveup: true,
                selectedusers: this.selectedusers5,
                homepage: ['0'],
                confirm: this.confirm
            };

            // 设置选人参数
            this.setOption(opt);

            ejs.page.open({
                // 这里仅作示例，请根据实际页面的相对路径传参
                pageUrl: '../../selectperson/index'
            });
        },
        confirm(data) {
            // 选人结果
            console.log(data);
        }
    }
};
```

::: endif
::: ifdef M84

```js
import { useSelectPersonStore } from '../../selectperson/store';
import { ref } from 'vue';

const store = useSelectPersonStore(); // 使用 Pinia Store
const url = ref(''); // 假设 url 是需要的引用
const selectedusers5 = ref([]); // 假设 selectedusers5 是需要的引用

const openSelectPerson = () => {
    let opt = {
        url: url.value,
        ismoveup: true,
        selectedusers: selectedusers5.value,
        homepage: ['0'],
        confirm: confirm
    };

    // 设置选人参数
    store.setOption(opt);

    ejs.page.open({
        // 这里仅作示例，请根据实际页面的相对路径传参
        pageUrl: '../../selectperson/index'
    });
};

const confirm = (data) => {
    // 选人结果
    console.log(data);
};
```

::: endif

### 代码演示

#### 基础用法

选择人员，选人主界面默认展示：组织架构、我的单位、我的部门、我的常用

::: ifdef M83

```js
openSelectPerson() {
    let opt = {
        url: 'http://172.29.3.2:8080/epoint-shell-member-center-demo/rest/frame/',
        confirm(result) {
            // 选人结果
            console.log(result);
        }
    };

    // 设置选人参数
    this.setOption(opt);

    ejs.page.open({
        // 这里仅作示例，请根据实际页面的相对路径传参
        pageUrl: '../../selectperson/index'
    });
}
```

::: endif
::: ifdef M84

```js
const openSelectPerson = () => {
    let opt = {
        url: 'http://172.29.3.2:8080/epoint-shell-member-center-demo/rest/frame/',
        confirm(result) {
            // 选人结果
            console.log(result);
        }
    };

    // 设置选人参数
    store.setOption(opt);

    ejs.page.open({
        // 这里仅作示例，请根据实际页面的相对路径传参
        pageUrl: '../../selectperson/index'
    });
};
```

::: endif

#### 配置选人主页

若需要个性化选人主页，可以通过 `homepage` 属性传递一个数组来配置需要的选人树。

::: ifdef M83

```js
openSelectPerson() {
    let opt = {
        url: 'http://172.29.3.2:8080/epoint-shell-member-center-demo/rest/frame/',
        homepage: [
            '1', // 我的单位
            {
                value: '0',
                text: '所有人员' // 将组织架构名称改为所有人员
            }
        ],
        confirm(result) {
            // 选人结果
            console.log(result);
        }
    };

    // 设置选人参数
    this.setOption(opt);

    ejs.page.open({
        // 这里仅作示例，请根据实际页面的相对路径传参
        pageUrl: '../../selectperson/index'
    });
}
```

::: endif
::: ifdef M84

```js
const openSelectPerson = () => {
    let opt = {
        url: 'http://172.29.3.2:8080/epoint-shell-member-center-demo/rest/frame/',
        homepage: [
            '1', // 我的单位
            {
                value: '0',
                text: '所有人员' // 将组织架构名称改为所有人员
            }
        ],
        confirm(result) {
            // 选人结果
            console.log(result);
        }
    };

    // 设置选人参数
    store.setOption(opt);

    ejs.page.open({
        // 这里仅作示例，请根据实际页面的相对路径传参
        pageUrl: '../../selectperson/index'
    });
};
```

::: endif

#### 自定义选人树

可以通过`homepage`属性配置标识为`custom`的选人树。该项可以传递一个完整的选人树，也可以只传递一个`ouguid`，设置组织架构的某个节点作为选人范围，甚至可以传递一个个性化的接口`url`，选人树将从该接口获取，当然该接口的输入输出需要与框架接口：`address_getoulistwithuser_v8` 的数据格式保持一致。

自定义选人树获取下一层级数据的逻辑为：

1、若传了`custom`字段，则首先尝试从`custom`中获取；

2、若未传`custom`字段，或者`custom`中获取不到下一层级的数据，则从接口获取数据；

3、若传了个性化的接口，则从个性化接口中获取数据，否则默认从组织架构中获取数据。

::: ifdef M83

```js
openSelectPerson() {
    let opt = {
        url: 'http://172.29.3.2:8080/epoint-shell-member-center-demo/rest/frame/',
        homepage: [
            {
                value: 'custom',
                text: '个性化接口获取选人树',
                // 需要传递完整路径
                url: 'http://172.29.3.2:8080/epoint-shell-member-center-demo/rest/frame/address_getoulistwithuser_v8',
                // 选择人员时，也需要一个 个性化的获取部门下所有人员接口，参考 address_getalluserlist_v7，否则无法通过选择部门来选择部门下所有人员
                getalluserurl: 'http://172.29.3.2:8080/epoint-shell-member-center-demo/rest/frame/address_getalluserlist_v7'
            },
            {
                value: 'custom',
                text: '从组织架构某一节点开始选人',
                ouguid: '该节点的ouguid'
            },
            {
                value: 'custom',
                text: '完整的选人树',
                custom: {
                    // 传递一个完整的选人树时，以下字段都是必需的
                    oulist: [
                        {
                            ouguid: '491c9e1f-77c9-4e9e-b724-f9d0df1f3e78',
                            ouname: '客户服务中心',
                            parentouguid: 'root',
                            haschildou: '1',
                            haschilduser: '1',
                            userlist: [
                                {
                                    userguid: '2b540caa-2571-4062-a608-683325743f18',
                                    username: '张三',
                                    ouguid: '491c9e1f-77c9-4e9e-b724-f9d0df1f3e78',
                                    photourl:
                                        'rest/readpictureaction/getUserPicture?isCommondto=true&userGuid=2b540caa-2571-4062-a608-683325743f18&isMobile=true&md5=60f5e34d897312c4d89ad213934a82e1'
                                }
                            ]
                        },
                        {
                            ouguid: 'd07d4916-ed90-47d0-82f6-4313bcbf7725',
                            ouname: '现金管理部',
                            parentouguid: 'root',
                            haschildou: '0',
                            haschilduser: '0'
                        }
                    ],
                    userlist: [
                        {
                            userguid: 'ddf347c2-ba4a-41fc-8367-fa74794d230d',
                            username: '曹六',
                            ouguid: 'root',
                            photourl:
                                'lest/readpictureaction/getUserPicture?isCommondto=true&userGuid=ddf347c2-ba4a-41fc-8367-fa74794d230d&isMobile=true&md5=b6caaa28319c5e26d6f57ea2efc58800'
                        }
                    ]
                }
            }
        ],
        confirm(result) {
            // 选人结果
            console.log(result);
        }
    };

    // 设置选人参数
    this.setOption(opt);

    ejs.page.open({
        // 这里仅作示例，请根据实际页面的相对路径传参
        pageUrl: '../../selectperson/index'
    });
}
```

::: endif
::: ifdef M84

```js
const openSelectPerson = () => {
    let opt = {
        url: 'http://172.29.3.2:8080/epoint-shell-member-center-demo/rest/frame/',
        homepage: [
            {
                value: 'custom',
                text: '个性化接口获取选人树',
                // 需要传递完整路径
                url: 'http://172.29.3.2:8080/epoint-shell-member-center-demo/rest/frame/address_getoulistwithuser_v8',
                // 选择人员时，也需要一个 个性化的获取部门下所有人员接口，参考 address_getalluserlist_v7，否则无法通过选择部门来选择部门下所有人员
                getalluserurl:
                    'http://172.29.3.2:8080/epoint-shell-member-center-demo/rest/frame/address_getalluserlist_v7'
            },
            {
                value: 'custom',
                text: '从组织架构某一节点开始选人',
                ouguid: '该节点的ouguid'
            },
            {
                value: 'custom',
                text: '完整的选人树',
                custom: {
                    // 传递一个完整的选人树时，以下字段都是必需的
                    oulist: [
                        {
                            ouguid: '491c9e1f-77c9-4e9e-b724-f9d0df1f3e78',
                            ouname: '客户服务中心',
                            parentouguid: 'root',
                            haschildou: '1',
                            haschilduser: '1',
                            userlist: [
                                {
                                    userguid: '2b540caa-2571-4062-a608-683325743f18',
                                    username: '张三',
                                    ouguid: '491c9e1f-77c9-4e9e-b724-f9d0df1f3e78',
                                    photourl:
                                        'rest/readpictureaction/getUserPicture?isCommondto=true&userGuid=2b540caa-2571-4062-a608-683325743f18&isMobile=true&md5=60f5e34d897312c4d89ad213934a82e1'
                                }
                            ]
                        },
                        {
                            ouguid: 'd07d4916-ed90-47d0-82f6-4313bcbf7725',
                            ouname: '现金管理部',
                            parentouguid: 'root',
                            haschildou: '0',
                            haschilduser: '0'
                        }
                    ],
                    userlist: [
                        {
                            userguid: 'ddf347c2-ba4a-41fc-8367-fa74794d230d',
                            username: '曹六',
                            ouguid: 'root',
                            photourl:
                                'lest/readpictureaction/getUserPicture?isCommondto=true&userGuid=ddf347c2-ba4a-41fc-8367-fa74794d230d&isMobile=true&md5=b6caaa28319c5e26d6f57ea2efc58800'
                        }
                    ]
                }
            }
        ],
        confirm(result) {
            // 选人结果
            console.log(result);
        }
    };

    // 设置选人参数
    store.setOption(opt);

    ejs.page.open({
        // 这里仅作示例，请根据实际页面的相对路径传参
        pageUrl: '../../selectperson/index'
    });
};
```

::: endif

#### 只选部门

通过`isouonly`属性设置只选部门。

::: ifdef M83

```js
openSelectPerson() {
    let opt = {
        url: 'http://172.29.3.2:8080/epoint-shell-member-center-demo/rest/frame/',
        isouonly: true,
        confirm(result) {
            // 选人结果
            ejs.ui.toast(JSON.stringify(result));
            console.log(result);
        }
    };

    // 设置选人参数
    this.setOption(opt);

    ejs.page.open({
        // 这里仅作示例，请根据实际页面的相对路径传参
        pageUrl: '../../selectperson/index'
    });
}
```

::: endif
::: ifdef M84

```js
const openSelectPerson = () => {
    let opt = {
        url: 'http://172.29.3.2:8080/epoint-shell-member-center-demo/rest/frame/',
        isouonly: true,
        confirm(result) {
            // 选人结果
            ejs.ui.toast(JSON.stringify(result));
            console.log(result);
        }
    };

    // 设置选人参数
    store.setOption(opt);

    ejs.page.open({
        // 这里仅作示例，请根据实际页面的相对路径传参
        pageUrl: '../../selectperson/index'
    });
};
```

::: endif

#### 直接进入子级

当父级只有一项时，通过`ismoveup`属性设置是否直接进入子级。选人组件默认该项为`true`。

::: ifdef M83

```js
openSelectPerson() {
    let opt = {
        url: 'http://172.29.3.2:8080/epoint-shell-member-center-demo/rest/frame/',
        ismoveup: true,
        homepage: ['0'],
        confirm(result) {
            // 选人结果
            console.log(result);
        }
    };

    // 设置选人参数
    this.setOption(opt);

    ejs.page.open({
        // 这里仅作示例，请根据实际页面的相对路径传参
        pageUrl: '../../selectperson/index'
    });
}
```

::: endif
::: ifdef M84

```js
const openSelectPerson = () => {
    let opt = {
        url: 'http://172.29.3.2:8080/epoint-shell-member-center-demo/rest/frame/',
        ismoveup: true,
        homepage: ['0'],
        confirm(result) {
            // 选人结果
            console.log(result);
        }
    };

    // 设置选人参数
    store.setOption(opt);

    ejs.page.open({
        // 这里仅作示例，请根据实际页面的相对路径传参
        pageUrl: '../../selectperson/index'
    });
};
```

::: endif

### API

#### Options

选人支持传入以下选项：

| 参数                               | 说明                                                                                                                   | 类型     | 默认值                                                               |
| :--------------------------------- | :--------------------------------------------------------------------------------------------------------------------- | :------- | :------------------------------------------------------------------- |
| value                              | 选人组件的显隐                                                                                                         | boolean  | `true`                                                               |
| url                                | 接口地址                                                                                                               | string   | -                                                                    |
| selectedusers                      | 已选人员，示例：`[{username: '李四', userguid: '3248760a-e4a3-430e-837e-11519d56090f'}]`                               | array    | -                                                                    |
| selectedous                        | 已选部门，示例：`[{ouname: '总部职能部门', ouguid: 'ffa0252c-4bba-4bd6-8d0c-3bc6340a6605'}]`                           | array    | -                                                                    |
| unableselectusers                  | 禁选人员，示例：`[{username: '李四', userguid: '3248760a-e4a3-430e-837e-11519d56090f'}]`                               | array    | -                                                                    |
| selectedroles `v8.3.19-beta.1`     | 已选角色，示例：`[{roledisplayname: '李四', roleguid: '3248760a-e4a3-430e-837e-11519d56090f'}]`                        | array    | -                                                                    |
| selectedjobs `v8.3.19-beta.1`      | 已选岗位，示例：`[{name: '李四', dataguid: '3248760a-e4a3-430e-837e-11519d56090f', datatype: 'job', haschild: false}]` | array    | -                                                                    |
| selectedspecials `v8.3.19-beta.1`  | 已选特殊对象，示例：`[{itemText: '上一步处理人', itemValue: '0'}]`                                                     | array    | -                                                                    |
| issingle                           | 是否单选                                                                                                               | boolean  | `false`                                                              |
| isouonly                           | 是否只选部门                                                                                                           | boolean  | `false`                                                              |
| maxchoosecount                     | 可选人员最大数量                                                                                                       | number   | -                                                                    |
| ismoveup                           | 父级只有一项时，是否直接进入该项子级                                                                                   | boolean  | `true`                                                               |
| homepage                           | 首页配置，可配置字段参考以下说明                                                                                       | array    | 选择人员时默认：`['0', '1', '2', '5']`，只选部门时默认：`['0', '1']` |
| isdimension                        | 是否是多维组织架构，为`true`时表示使用多维组织架构，接口请求`v8`接口，否则切换为`v7`接口                               | boolean  | `true`                                                               |
| showRecent                         | 是否展示最近联系人，仅在`ejs`环境中且鉴权之后有效                                                                      | boolean  | `true`                                                               |
| showSpecial `v8.3.19-beta.1`       | 是否展示特殊对象                                                                                                       | boolean  | `false`                                                              |
| showMainIcon `v8.3.19-beta.1`      | 是否展示首页图标，用于切换旧版首页样式                                                                                 | boolean  | `true`                                                               |
| showCheckedStatus `v8.3.19-beta.1` | 是否动态展示每个部门选中状态。数据量大时判断选中状态时间较长体验较差，可以关闭该选项优化体验                           | boolean  | `true`                                                               |
| searchouguid                       | 将搜索范围限定在某个节点内，该属性为该节点的`ouguid`                                                                   | string   | -                                                                    |
| searchurl                          | 个性化搜索接口完整地址，输入输出数据格式参考框架接口：`address_searchouoruserbycondition_dimension_v8`                 | string   | -                                                                    |
| ismsgonly                          | 是否开启即时通讯权限检查，开启后无法选择没有即时通讯权限的人员                                                         | boolean  | `false`                                                              |
| confirm                            | 点击确定时的回调函数，回传参数：`{ resultData：选择的人员列表, ouData：选择的部门列表 }`                               | function | -                                                                    |
| selectJobUser `v8.4.4-beta.14`     | 选中岗位时是否选中岗位下所有人员，此时只会选中人员，不会返回选中的岗位                                                 | boolean  | `false`                                                              |

#### homepage 可配置字段说明

选人组件提供了 8 种可配置项，每项都有固定的标识，其中标识为`custom`的配置项可以同时配置多个。

| 参数                  |                        说明                        | 类型   |
| :-------------------- | :------------------------------------------------: | :----- |
| value                 |                     配置项标识                     | string |
| text                  |                    配置项字段名                    | string |
| icon `v8.3.19-beta.1` | 配置项图标，可配置默认图标，也可配置自定义图标链接 | string |

各配置项对应的默认字段名：

| value                  |    text    |    icon     |
| :--------------------- | :--------: | :---------: |
| `'0'`                  |  组织架构  | `structure` |
| `'1'`                  |  我的单位  |  `myunit`   |
| `'2'`                  |  我的部门  |   `myou`    |
| `'3'`                  |  公共分组  |   `group`   |
| `'4'`                  |  我的分组  |  `mygroup`  |
| `'5'`                  |  我的常用  |  `common`   |
| `'6'`                  | 星标联系人 |   `star`    |
| `'7'` `v8.3.19-beta.1` |    部门    |    `ous`    |
| `'8'` `v8.3.19-beta.1` |    角色    |   `role`    |
| `'9'` `v8.3.19-beta.1` |    岗位    |    `job`    |
| `'custom'`             |  选择范围  |  `custom`   |

注意：`我的分组`、`星标联系人`是`我的常用`的子级，若首页配置了`我的常用`，则`我的分组`、`星标联系人`都会默认展示在下一层级。

其中`custom`配置项除了`value`和`text`，还有额外的参数用于配置不同的自定义选人树:

| 参数                  |                                                                       说明                                                                        | 类型   |
| :-------------------- | :-----------------------------------------------------------------------------------------------------------------------------------------------: | :----- |
| value                 |                                                              配置项标识，为`custom`                                                               | string |
| text                  |                                                          配置项字段名, 默认为`选人范围`                                                           | string |
| icon `v8.3.19-beta.1` |                                                                    配置项图标                                                                     | string |
| url                   |                       获取人员和部门列表的个性化接口完整地址，输入输出数据格式参考框架接口：`address_getoulistwithuser_v8`                        | string |
| getalluserurl         | 选择人员时，也需要一个 个性化的获取部门下所有人员接口，否则无法通过选择部门来选择部门下所有人员，输入输出数据格式参考 `address_getalluserlist_v7` | string |
| ouguid                |                                   配置该字段且没有配置`custom`字段时，组件默认从组织架构中获取该节点下的选人树                                    | string |
| custom                |                                             完整的选人树，格式参考以上的示例，示例中的字段都是必需的                                              | object |

::: ifdef M83

<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-select-person"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-select-person"
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
