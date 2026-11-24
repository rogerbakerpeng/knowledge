# 组件使用

## form 表单

### 介绍

-   用于数据录入、校验，支持输入框、单选框、复选框、文件上传等类型。

### 代码演示

#### 基础用法

在表单中，每个 `Field` 组件 代表一个表单项，使用 `Field` 的`rules`属性定义校验规则

```html
<em-form @submit="onSubmit">
    <em-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <em-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
    />
    <div style="margin: 16px;">
        <em-button round block type="info" native-type="submit">提交</em-button>
    </div>
</em-form>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            username: '',
            password: ''
        };
    },
    methods: {
        onSubmit(values) {
            console.log('submit', values);
        }
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';

const username = ref('');
const password = ref('');

const onSubmit = (values) => {
    console.log('submit', values);
};
```

::: endif

#### 校验规则

通过`rules`定义表单校验规则，可用字段见下方表格

::: ifdef M83

```html
<em-form validate-first @failed="onFailed">
    <!-- 通过 pattern 进行正则校验 -->
    <em-field
        v-model="value1"
        name="pattern"
        placeholder="正则校验"
        :rules="[{ pattern, message: '请输入正确内容' }]"
    />
    <!-- 通过 validator 进行函数校验 -->
    <em-field
        v-model="value2"
        name="validator"
        placeholder="函数校验"
        :rules="[{ validator, message: '请输入正确内容' }]"
    />
    <!-- 通过 validator 进行异步函数校验 -->
    <em-field
        v-model="value3"
        name="asyncValidator"
        placeholder="异步函数校验"
        :rules="[{ validator: asyncValidator, message: '请输入正确内容' }]"
    />
    <div style="margin: 16px;">
        <em-button round block type="info" native-type="submit">提交</em-button>
    </div>
</em-form>
<em-toast ref="emToast"></em-toast>
```

```js
export default {
    data() {
        return {
            value1: '',
            value2: '',
            value3: '',
            pattern: /^\d{6}$/
        };
    },
    methods: {
        // 校验函数返回 true 表示校验通过，false 表示不通过
        validator(val) {
            return /^1\d{10}$/.test(val);
        },
        // 异步校验函数返回 Promise
        asyncValidator(val) {
            return new Promise((resolve) => {
                Toast.loading({
                    // 加载信息
                    message: '验证中...'
                });
                setTimeout(() => {
                    Toast.clear();
                    resolve(/^\d{6}$/.test(val));
                }, 1000);
            });
        },
        onFailed(errorInfo) {
            console.log('failed', errorInfo);
        }
    }
};
```

::: endif
::: ifdef M84

```html
<em-form validate-first @failed="onFailed">
    <!-- 通过 pattern 进行正则校验 -->
    <em-field
        v-model="value1"
        name="pattern"
        placeholder="正则校验"
        :rules="[{ pattern, message: '请输入正确内容' }]"
    />
    <!-- 通过 validator 进行函数校验 -->
    <em-field
        v-model="value2"
        name="validator"
        placeholder="函数校验"
        :rules="[{ validator, message: '请输入正确内容' }]"
    />
    <!-- 通过 validator 进行异步函数校验 -->
    <em-field
        v-model="value3"
        name="asyncValidator"
        placeholder="异步函数校验"
        :rules="[{ validator: asyncValidator, message: '请输入正确内容' }]"
    />
    <div style="margin: 16px;">
        <em-button round block type="info" native-type="submit">提交</em-button>
    </div>
</em-form>
<em-toast ref="emToastRef"></em-toast>
```

```js
import { ref } from 'vue';

const value1 = ref('');
const value2 = ref('');
const value3 = ref('');
const emToastRef = ref(null);

const pattern = /^d{6}$/;

const validator = (val) => /^1\d{10}$/.test(val);

const asyncValidator = (val) => {
    return new Promise((resolve) => {
        Toast.loading({
            // 加载信息
            message: '验证中...'
        });
        setTimeout(() => {
            Toast.clear();
            resolve(pattern.test(val));
        }, 1000);
    });
};

const onFailed = (errorInfo) => {
    console.log('failed', errorInfo);
};

defineExpose({
    emToastRef
});
```

::: endif

#### 脱敏

::: ifdef M83

`v8.3.24`开始支持。

::: endif

::: ifdef M84

`v8.4.5`开始支持。

::: endif

表单项设置 `desensitizationType`，即可实现脱敏，该属性可选值见下文 `脱敏数据类型` 说明。脱敏数据根据设置的`desensitizationType`类型进行处理。

也可以将 `desensitizationType` 设置成 `DESENDATATYPE_CUSTOM`，通过 `desensitizer`、`desensitizeReg` 设置自定义的脱敏处理方式。

```html
<em-form ref="formComp" validate-first @submit="onSubmit2">
    <!-- 手机号，默认脱敏校验 -->
    <em-field
        v-model="valueMobile"
        label="手机号"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[{ validator, message: '请输入以1开头的11位数字' }]"
        :desensitization-type="DESENDATATYPE_MOBILE_PHONE"
    />
    <!-- 邮箱，自定义脱敏 -->
    <em-field
        v-model="valueEmail"
        label="邮箱"
        name="email"
        placeholder="请输入邮箱"
        :rules="[{ validator: emailValidator, message: '请输入正确的邮箱格式' }]"
        :desensitization-type="DESENDATATYPE_CUSTOM"
        :desensitizer="desensitizer"
    />
    <div style="margin: 16px">
        <em-button round block type="info" native-type="submit">提交</em-button>
    </div>
</em-form>
```

::: ifdef M83

```js
import { DESENDATATYPE_CUSTOM, DESENDATATYPE_MOBILE_PHONE } from '@components/common/use-desensitization';
export default {
    data() {
        return {
            valueMobile: '11111111111',
            valueEmail: '222@qq.com'
        };
    },
    computed: {
        DESENDATATYPE_CUSTOM() {
            return DESENDATATYPE_CUSTOM;
        },
        DESENDATATYPE_MOBILE_PHONE() {
            return DESENDATATYPE_MOBILE_PHONE;
        }
    },
    methods: {
        validator(val) {
            return /1\d{10}/.test(val);
        },
        emailValidator(val) {
            return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(val);
        },
        desensitizer(val) {
            const index = val.indexOf('@');

            return `****${val.slice(index)}`;
        },
        onSubmit2(values) {
            ejs.ui.alert(JSON.stringify(values), '提交成功', '确定');
            // 提交成功后需要重置脱敏字段编辑状态
            this.$refs.formComp.resetEditState();
        }
    }
};
```

::: endif

::: ifdef M84

```js
import { DESENDATATYPE_CUSTOM, DESENDATATYPE_MOBILE_PHONE } from '@components/common/use-desensitization';
import { ref } from 'vue';

const valueMobile = ref('11111111111');
const valueEmail = ref('222@qq.com');
const formComp = ref();

const validator = (val) => {
    return /1\d{10}/.test(val);
};
const emailValidator = (val) => {
    return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(val);
};
const desensitizer = (val) => {
    const index = val.indexOf('@');

    return `****${val.slice(index)}`;
};
const onSubmit2 = (values) => {
    ejs.ui.alert(JSON.stringify(values), '提交成功', '确定');
    // 提交成功后需要重置脱敏字段编辑状态
    formComp.value.resetEditState();
};
```

::: endif

#### 表单项类型 - 输入框

在表单中使用 `Input` 组件

```html
<em-field name="input" label="输入框">
    <template #input>
        <em-input v-model="input" placeholder="请输入内容" />
    </template>
</em-field>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            input: ''
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';

const input = ref('');
```

::: endif

#### 表单项类型 - 开关

在表单中使用 `Switch` 组件

```html
<em-field name="switch" label="开关">
    <template #input>
        <em-switch v-model="switchChecked" size="20" />
    </template>
</em-field>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            switchChecked: false
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';

const switchChecked = ref(false);
```

::: endif

#### 表单项类型 - 复选框

在表单中使用 `Checkbox` 组件

```html
<em-field name="checkbox" label="复选框">
    <template #input>
        <em-checkbox v-model="checkbox" shape="square" />
    </template>
</em-field>
<em-field name="checkboxGroup" label="复选框组">
    <template #input>
        <em-checkbox-group v-model="checkboxGroup" direction="horizontal">
            <em-checkbox name="1" shape="square">复选框 1</em-checkbox>
            <em-checkbox name="2" shape="square">复选框 2</em-checkbox>
        </em-checkbox-group>
    </template>
</em-field>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            checkbox: false,
            checkboxGroup: []
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';

const checkbox = ref(false);
const checkboxGroup = ref([]);
```

::: endif

#### 表单项类型 - 单选框

在表单中使用 `Radio` 组件

```html
<em-field name="radio" label="单选框">
    <template #input>
        <em-radio-group v-model="radio" direction="horizontal">
            <em-radio name="1">单选框 1</em-radio>
            <em-radio name="2">单选框 2</em-radio>
        </em-radio-group>
    </template>
</em-field>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            radio: '1'
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';

const radio = ref('1');
```

::: endif

#### 表单项类型 - 步进器

在表单中使用 `Stepper` 组件

```html
<em-field name="stepper" label="步进器">
    <template #input>
        <em-stepper v-model="stepper" />
    </template>
</em-field>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            stepper: 1
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';

const stepper = ref(1);
```

::: endif

#### 表单项类型 - 评分

在表单中使用 `Rate` 组件

```html
<em-field name="rate" label="评分">
    <template #input>
        <em-rate v-model="rate" />
    </template>
</em-field>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            rate: 3
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';

const rate = ref(3);
```

::: endif

#### 表单项类型 - 滑块

在表单中使用 `Slider` 组件。

在小程序下 `Slider` 组件宽度无法自动撑开，需要在外面包裹一层宽度为 `100%` 的 view 元素。

```html
<em-field name="slider" label="滑块">
    <template #input>
        <view style="width: 100%;">
            <em-slider v-model="slider" />
        </view>
    </template>
</em-field>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            slider: 50
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';

const slider = ref(50);
```

::: endif

#### 表单项类型 - 文件上传

在表单中使用 `Uploader` 组件

```html
<em-field name="uploader" label="文件上传">
    <template #input>
        <em-uploader v-model="uploader" />
    </template>
</em-field>
```

::: ifdef M83

```js
export default {
    data() {
        return {
            uploader: [{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' }]
        };
    }
};
```

::: endif
::: ifdef M84

```js
import { ref } from 'vue';

const uploader = ref([{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' }]);
```

::: endif

#### 表单项类型 - 选择器

在表单中使用 `Picker` 组件

::: ifdef M83

```html
<em-field
    readonly
    clickable
    name="picker"
    :value="value"
    label="选择器"
    placeholder="点击选择城市"
    @click="showPicker = true"
/>
<em-picker v-model="showPicker" show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
```

```js
export default {
    data() {
        return {
            value: '',
            columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
            showPicker: false
        };
    },
    methods: {
        onConfirm(value) {
            this.value = value;
            this.showPicker = false;
        }
    }
};
```

::: endif
::: ifdef M84

```html
<em-field
    readonly
    clickable
    name="picker"
    :model-value="value"
    label="选择器"
    placeholder="点击选择城市"
    @click="showPicker = true"
/>
<em-picker v-model="showPicker" show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
```

```js
import { ref } from 'vue';
const value = ref('');
const columns = ['杭州', '宁波', '温州', '嘉兴', '湖州'];
const showPicker = ref(false);

const onConfirm = (val) => {
    value.value = val;
    showPicker.value = false;
};
```

::: endif

#### 表单项类型 - 时间选择器

在表单中使用 `DatetimePicker` 组件

::: ifdef M83

```html
<em-field
    readonly
    clickable
    name="datetimePicker"
    :value="value"
    label="时间选择"
    placeholder="点击选择时间"
    @click="showPicker = true"
/>
<em-date-picker v-model="showPicker" basic type="time" @confirm="onConfirm" @cancel="showPicker = false" />
```

```js
export default {
    data() {
        return {
            value: '',
            showPicker: false
        };
    },
    methods: {
        onConfirm(time) {
            this.value = time;
            this.showPicker = false;
        }
    }
};
```

::: endif
::: ifdef M84

```html
<em-field
    readonly
    clickable
    name="datetimePicker"
    :model-value="value"
    label="时间选择"
    placeholder="点击选择时间"
    @click="showPicker = true"
/>
<em-date-picker v-model="showPicker" basic type="time" @confirm="onConfirm" @cancel="showPicker = false" />
```

```js
import { ref } from 'vue';
const value = ref('');
const showPicker = ref(false);

const onConfirm = (time) => {
    value.value = time;
    showPicker.value = false;
};
```

::: endif

#### 表单项类型 - 省市区选择器

在表单中使用 `Area` 组件

::: ifdef M83

```html
<em-field
    readonly
    clickable
    name="area"
    :value="value"
    label="地区选择"
    placeholder="点击选择省市区"
    @click="showArea = true"
/>
<em-area v-model="showArea" :area-list="areaList" @confirm="onConfirm" @cancel="showArea = false" />
```

```js
export default {
    data() {
        return {
            value: '',
            showArea: false,
            areaList: {} // 数据格式见 Area 组件文档
        };
    },
    methods: {
        onConfirm(values) {
            this.value = values.map((item) => item.name).join('/');
            this.showArea = false;
        }
    }
};
```

::: endif
::: ifdef M84

```html
<em-field
    readonly
    clickable
    name="area"
    :model-value="value"
    label="地区选择"
    placeholder="点击选择省市区"
    @click="showArea = true"
/>
<em-area v-model="showArea" :area-list="areaList" @confirm="onConfirm" @cancel="showArea = false" />
```

```js
import { ref } from 'vue';
const value = ref('');
const showArea = ref(false);
const areaList = {}; // 数据格式见 Area 组件文档

const onConfirm = (values) => {
    value.value = values.map((item) => item.name).join('/');
    showArea.value = false;
};
```

::: endif

#### 表单项类型 - 日历

在表单中使用 `Calendar` 组件

::: ifdef M83

```html
<em-field
    readonly
    clickable
    name="calendar"
    :value="value"
    label="日历"
    placeholder="点击选择日期"
    @click="showCalendar = true"
/>
<em-calendar v-model="showCalendar" @confirm="onConfirm" />
```

```js
export default {
    data() {
        return {
            value: '',
            showCalendar: false
        };
    },
    methods: {
        onConfirm(date) {
            this.value = `${date.getMonth() + 1}/${date.getDate()}`;
            this.showCalendar = false;
        }
    }
};
```

::: endif
::: ifdef M84

```html
<em-field
    readonly
    clickable
    name="calendar"
    :model-value="value"
    label="日历"
    placeholder="点击选择日期"
    @click="showCalendar = true"
/>
<em-calendar v-model="showCalendar" @confirm="onConfirm" />
```

```js
import { ref } from 'vue';
const value = ref('');
const showCalendar = ref(false);

const onConfirm = (date) => {
    value.value = `${date.getMonth() + 1}/${date.getDate()}`;
    showCalendar.value = false;
};
```

::: endif

### API

表单项的 `API` 参见：`Field` 组件

#### Props

| 参数                |                         说明                         | 类型           | 默认值   |
| :------------------ | :--------------------------------------------------: | :------------- | :------- |
| label-width         |         表单项 `label` 宽度，默认单位为`px`          | number /string | `96px`   |
| label-align         |  表单项 `label` 对齐方式，可选值为 `center` `right`  | string         | `left`   |
| input-align         | 输入框对齐方式，可选值为 `center` `right` `vertical` | string         | `left`   |
| error-message-align |   错误提示文案对齐方式，可选值为 `center` `right`    | string         | `left`   |
| validate-trigger    |   表单校验触发时机，可选值为`onChange` `onSubmit`    | string         | `onBlur` |
| colon               |             是否在 `label` 后面添加冒号              | boolean        | `false`  |
| disabled            |              是否禁用表单中的所有输入框              | boolean        | `false`  |
| readonly            |          是否将表单中的所有输入框设置为只读          | boolean        | `false`  |
| validate-first      |           是否在某一项校验不通过时停止校验           | boolean        | `false`  |
| scroll-to-error     |    是否在提交表单且校验不通过时滚动至错误的表单项    | boolean        | `false`  |
| show-error          |             是否在校验不通过时标红输入框             | boolean        | `true`   |
| show-error-message  |      是否在校验不通过时在输入框下方展示错误提示      | boolean        | `true`   |

#### Rule 数据结构

使用 `Field` 的`rules`属性可以定义校验规则，可选属性如下:

| 键名      |                        说明                        | 类型                               |
| :-------- | :------------------------------------------------: | :--------------------------------- |
| required  |                   是否为必选字段                   | boolean                            |
| message   |                    错误提示文案                    | string / (value, rule) => string   |
| validator |                  通过函数进行校验                  | (value, rule) => boolean / Promise |
| pattern   | 通过正则表达式进行校验（小程序下只支持正则字符串） | RegExp                             |
| trigger   |  本项规则的触发时机，可选值为`onChange`、`onBlur`  | string                             |
| formatter |       格式化函数，将表单项的值转换后进行校验       | (value, rule) => any               |

#### Events

| 事件名 |            说明            | 回调参数                                        |
| :----- | :------------------------: | :---------------------------------------------- |
| submit |  提交表单且验证通过后触发  | values: object                                  |
| failed | 提交表单且验证不通过后触发 | errorInfo: { values: object, errors: object[] } |

#### 方法

通过 `ref` 可以获取到 `Form` 实例并调用实例方法，详见组件实例方法

| 方法名                                                                            |                                   说明                                    | 参数                              | 返回值    |
| :-------------------------------------------------------------------------------- | :-----------------------------------------------------------------------: | :-------------------------------- | :-------- |
| submit                                                                            |                    提交表单，与点击提交按钮的效果等价                     | -                                 | -         |
| validate                                                                          |              验证表单，支持传入`name`来验证单个或部分表单项               | name?: string / string[]          | `Promise` |
| resetValidation                                                                   |        重置表单项的验证提示，支持传入`name`来重置单个或部分表单项         | name?: string / string[]          | -         |
| scrollToField                                                                     | 滚动到对应表单项的位置，默认滚动到顶部，第二个参数传 `false` 可滚动至底部 | name: string, alignToTop: boolean | -         |
| resetEditState ::: ifdef M83 `v8.3.24` ::: endif ::: ifdef M84 `v8.4.5` ::: endif |                           重置脱敏字段编辑状态                            | -                                 | -         |

#### Slots

| 名称    |   说明   |
| :------ | :------: |
| default | 表单内容 |

#### 脱敏数据类型 ​

脱敏数据类型入参如下：

| Export Const                  | Value           | Description            | Desensitization Rules                                              |
| :---------------------------- | :-------------- | :--------------------- | :----------------------------------------------------------------- |
| DESENDATATYPE_ID_CARD         | ID_CARD         | 身份证号脱敏           | 保留后 4 位                                                        |
| DESENDATATYPE_MOBILE_PHONE    | MOBILE_PHONE    | 手机号脱敏             | 保留前 3 位和后 4 位，如果手机号不足 11 位，则保留前 2 位和后 2 位 |
| DESENDATATYPE_CHINESE_NAME    | CHINESE_NAME    | 人名脱敏               | 保留后 1 位                                                        |
| DESENDATATYPE_FIXED_PHONE     | FIXED_PHONE     | 固定电话脱敏           | 保留后 4 位                                                        |
| DESENDATATYPE_LOGINID         | LOGINID         | 登录名脱敏             | 保留后 1 位                                                        |
| DESENDATATYPE_BANK_CARD       | BANK_CARD       | 银行卡脱敏             | 保留前 5 位和后 4 位                                               |
| DESENDATATYPE_EMAIL           | EMAIL           | 电子邮箱脱敏           | 保留@及之后的信息                                                  |
| DESENDATATYPE_PASSWORD        | PASSWORD        | 密码脱敏               | 全部隐藏                                                           |
| DESENDATATYPE_ADDRESS         | ADDRESS         | 地址脱敏               | 不足 12 位保留前面不超过 50%，大于 12 位只保留前 6 位              |
| DESENDATATYPE_CREDENTIAL_DATE | CREDENTIAL_DATE | 证件日期脱敏           | 保留后 4 位                                                        |
| DESENDATATYPE_INTELLIGENCE    | INTELLIGENCE    | 智能脱敏               | 小于 4 位的全脱，否则保留前后各 2 位                               |
| DESENDATATYPE_REGEXP          | REGEXP          | 自定义脱敏正则         | 自定义脱敏正则,使用 desensitize-reg 入参值进行匹配                 |
| DESENDATATYPE_CUSTOM          | CUSTOM          | 自定义脱敏数据处理方法 | 自定义脱敏数据处理方法,使用 desensitizer 入参方法处理原始数据      |

::: ifdef M83

<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-form"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-form"
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
