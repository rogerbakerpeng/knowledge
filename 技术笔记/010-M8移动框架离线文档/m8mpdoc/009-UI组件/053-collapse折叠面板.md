# 组件使用

## collapse 折叠面板

### 介绍

-   折叠面板。

### 代码演示

#### 基础用法

通过`v-model`控制展开的面板列表，`activeNames`为数组格式

```html
<em-collapse v-model="activeNames">
    <em-collapse-item title="标题1" name="1" is-link>内容</em-collapse-item>
    <em-collapse-item title="标题2" name="2" is-link>内容</em-collapse-item>
    <em-collapse-item title="标题3" name="3" disabled is-link>内容</em-collapse-item>
</em-collapse>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            activeNames: ['1']
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const activeNames = ref(['1']);
```

::: endif

#### 手风琴

通过`accordion`可以设置为手风琴模式，最多展开一个面板，此时`activeName`为字符串格式

```html
<em-collapse v-model="activeName" accordion>
    <em-collapse-item title="标题1" name="1" is-link>内容</em-collapse-item>
    <em-collapse-item title="标题2" name="2" is-link>内容</em-collapse-item>
    <em-collapse-item title="标题3" name="3" is-link>内容</em-collapse-item>
</em-collapse>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            activeName: '1'
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const activeName = ref('1');
```

::: endif

#### 自定义标题内容

```html
<em-collapse v-model="activeNames">
    <em-collapse-item name="1" is-link>
        <template #title>
            <div>
                标题1
                <em-icon name="question-o" />
            </div>
        </template>
        内容
    </em-collapse-item>
    <em-collapse-item title="标题2" name="2" icon="shop-o" is-link value="内容">内容</em-collapse-item>
</em-collapse>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            activeNames: ['1']
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';
const activeNames = ref(['1']);
```

::: endif

### API

#### Collapse Props

| 参数                                                                         |         说明          | 类型                                                           | 默认值  |
| :--------------------------------------------------------------------------- | :-------------------: | :------------------------------------------------------------- | :------ |
| v-model ::: ifdef M83 (value) ::: endif ::: ifdef M84 (modelValue) ::: endif | 当前展开面板的 `name` | 手风琴模式：number / string；非手风琴模式：(number / string)[] | -       |
| accordion                                                                    |  是否开启手风琴模式   | boolean                                                        | `false` |
| border                                                                       |    是否显示外边框     | boolean                                                        | `true`  |

#### Collapse Events

| 事件名 |      说明      | 回调参数                                 |
| :----- | :------------: | :--------------------------------------- |
| change | 切换面板时触发 | activeNames: 类型与 v-model 绑定的值一致 |

#### CollapseItem Props

| 参数          |                 说明                 | 类型            | 默认值  |
| :------------ | :----------------------------------: | :-------------- | :------ |
| name          |       唯一标识符，默认为索引值       | number / string | `index` |
| icon          |     标题栏左侧图标名称或图片链接     | string          | -       |
| size          |     标题栏大小，可选值为 `large`     | string          | -       |
| title         |            标题栏左侧内容            | number / string | -       |
| value         |            标题栏右侧内容            | number / string | -       |
| label         |            标题栏描述信息            | number / string | -       |
| border        |            是否显示内边框            | boolean         | `true`  |
| is-link       | 是否展示标题栏右侧箭头并开启点击反馈 | boolean         | `true`  |
| disabled      |             是否禁用面板             | boolean         | `false` |
| content-class |           内容区域额外类名           | string          | -       |
| title-class   |           左侧标题额外类名           | string          | -       |
| value-class   |           右侧内容额外类名           | string          | -       |
| label-class   |           描述信息额外类名           | string          | -       |

#### CollapseItem Slots

| 名称      |             说明              |
| :-------- | :---------------------------: |
| default   |           面板内容            |
| value     |        自定义显示内容         |
| icon      |         自定义`icon`          |
| title     |         自定义`title`         |
| rightIcon | 自定义右侧按钮，默认是`arrow` |

#### CollapseItem 方法

通过 `ref` 可以获取到 `CollapseItem` 实例并调用实例方法，详见组件实例方法。

| 方法名 |                               说明                               | 参数             | 返回值 |
| :----- | :--------------------------------------------------------------: | :--------------- | :----- |
| toggle | 切换面试展开状态，传 `true` 为展开，`false` 为收起，不传参为切换 | expand?: boolean | -      |

::: ifdef M83
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-collapse"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-collapse"
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
