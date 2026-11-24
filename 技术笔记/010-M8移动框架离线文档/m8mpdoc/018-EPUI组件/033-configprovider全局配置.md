# ConfigProvider 全局配置

全局配置组件，为组件提供统一的全局配置。可以配置国际化语言、组件尺寸、表格样式、zIndex 层级等。

## 国际化配置

通过设置 `lang` 属性来实现国际化配置。

```vue
<template>
    <div>
        <e-button-m @click="toggle">Switch Language</e-button-m>
        <e-config-provider-m :lang="language">
            <e-table-m :data="[]" />
            <e-pagination-m :total="100" />
        </e-config-provider-m>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import en from '@epoint-mfe/eui-components/src/hooks/use-locale/lang/en';
import { getAvailableLanguages, registerLocale } from '@epoint-mfe/eui-components';

const language = ref('zh-cn');

// 注册其他语言包
const autoLoad = () => {
    const languages = getAvailableLanguages();

    // 如语言包未注册，则引入并注册
    if (!languages.includes('en')) {
        registerLocale('en', en);
    }
};

const toggle = () => {
    const target = language.value === 'zh-cn' ? 'en' : 'zh-cn';

    if (target === 'en') {
        // 注册其他语言包，en语言包已内置可直接切换，此处仅作代码示例
        autoLoad();
    }

    language.value = target;
};
</script>
```

## 对按钮进行配置

设置是否自动在两个中文字符之间插入空格

```vue
<template>
    <div>
        <div>
            <e-checkbox-m v-model="config.autoInsertSpace">autoInsertSpace</e-checkbox-m>
        </div>
        <e-config-provider-m :button="config">
            <e-button-m>中文</e-button-m>
        </e-config-provider-m>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const config = reactive({
    autoInsertSpace: true
});
</script>
```

## 对消息进行配置

设置可同时显示的消息最大数量

```vue
<template>
    <e-config-provider-m :message="configMessage">
        <e-button-m @click="open">OPEN</e-button-m>
    </e-config-provider-m>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { EMessageM } from '@epoint-mfe/eui-components';

const configMessage = reactive({
    max: 3
});
const open = () => {
    EMessageM({
        message: 'This is a normal message'
    });
};
</script>
```

## 对 select 进行配置

设置是否显示清空按钮

```vue
<template>
    <div>
        <div>
            <e-checkbox-m v-model="selectConfig.clearable">showclearable</e-checkbox-m>
        </div>
        <e-config-provider-m :select="selectConfig">
            <e-select-m v-model="value1" multiple placeholder="请选择">
                <e-option-m v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </e-select-m>
        </e-config-provider-m>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';

const value1 = ref([]);
const options = [
    {
        value: 'Option1',
        label: 'Option1'
    },
    {
        value: 'Option2',
        label: 'Option2'
    },
    {
        value: 'Option3',
        label: 'Option3'
    },
    {
        value: 'Option4',
        label: 'Option4'
    },
    {
        value: 'Option5',
        label: 'Option5'
    }
];
const selectConfig = reactive({
    clearable: true
});
</script>
```

## 对 datePicker 进行配置

设置格式和每周开始的日期

```vue
<template>
    <div>
        <div>
            firstDayOfWeek：
            <e-input-number-m v-model="configDatePicker.firstDayOfWeek" :min="1" :max="7" />
        </div>
        <div>
            format：
            <e-select-m v-model="configDatePicker.format" :options="optionsDatePicker" />
        </div>
        <e-config-provider-m :date-picker="configDatePicker">
            <e-date-picker-m v-model="valueDatePicker" type="date" />
        </e-config-provider-m>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';

const optionsDatePicker = [
    { label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
    { label: 'YYYY/MM/DD', value: 'YYYY/MM/DD' },
    { label: 'YYYY年MM月DD日', value: 'YYYY年MM月DD日' }
];
const valueDatePicker = ref('');
const configDatePicker = reactive({
    firstDayOfWeek: 1,
    format: 'YYYY-MM-DD'
});
</script>
```

## 对表单进行配置

设置标签对齐方式以及标签的后缀

```vue
<template>
    <e-config-provider-m :form="formConfig">
        <e-form-m label-width="100px" :model="formConfig" :rules="rules">
            <e-form-item-m label="标签后缀">
                <e-input-m v-model="formConfig.labelSuffix" />
            </e-form-item-m>
            <e-form-item-m label="标签对齐方式">
                <e-select-m v-model="formConfig.labelPosition" placeholder="请选择对齐方式">
                    <e-option-m v-for="item in optionsForm" :key="item.value" :label="item.label" :value="item.value" />
                </e-select-m>
            </e-form-item-m>
            <e-form-item-m label="必填星号位置设置" prop="requireAsteriskPosition">
                <e-select-m v-model="formConfig.requireAsteriskPosition" placeholder="请选择星号位置">
                    <e-option-m
                        v-for="item in optionsForm2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </e-select-m>
            </e-form-item-m>
        </e-form-m>
    </e-config-provider-m>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const formConfig = reactive({
    labelSuffix: ':',
    labelPosition: 'top',
    requireAsteriskPosition: 'left'
});
const optionsForm = [
    {
        value: 'left',
        label: '左侧'
    },
    {
        value: 'right',
        label: '右侧'
    },
    {
        value: 'top',
        label: '顶部'
    }
];
const optionsForm2 = [
    {
        value: 'left',
        label: '左侧'
    },
    {
        value: 'right',
        label: '右侧'
    }
];
const rules = reactive<FormRules>({
    requireAsteriskPosition: [
        {
            required: true,
            trigger: 'change'
        }
    ]
});
</script>
```

## 对文件上传进行配置

设置文件上传全局属性

```vue
<template>
    <e-config-provider-m :file-upload="configFileUpload">
        <e-file-upload-m action="https://fe.epoint.com.cn/mock/752/eui-vue/uploadFile" />
    </e-config-provider-m>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const configFileUpload = reactive({
    chunkSize: 1024,
    typeLimit: 'doc,docx,xls,xlsx,png,jpg,jpeg'
});
</script>
```

## API

### Attributes

| 属性名                | 描述                                                           | 类型                                                                                                                          | 默认值   |
| --------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------- |
| lang                  | 语言包的 key 值，内置可选：`zh-cn`, `en`, `zh-tw`              | string                                                                                                                        | zh-cn    |
| locale                | 翻译文本对象, 不推荐使用，请使用 lang 属性替代                 | object - `Language`                                                                                                           | zh-CN    |
| size                  | 全局组件大小                                                   | enum - `small`, `default`, `large`                                                                                            | default  |
| zIndex                | 全局初始化 zIndex 的值                                         | number                                                                                                                        | -        |
| button                | 按钮相关配置, 详见下表                                         | object-`{ autoInsertSpace?: boolean }`                                                                                        | 详见下表 |
| message               | 消息相关配置, 详见下表                                         | object-`{ max?: number }`                                                                                                     | 详见下表 |
| select                | select 相关配置, 详见下表                                      | object-`{ clearable?: boolean }`                                                                                              | 详见下表 |
| date-picker           | date-picker 相关配置, 详见下表                                 | object-`{ firstDayOfWeek?: number, format?: string }`                                                                         | 详见下表 |
| form                  | 表单相关配置, 详见下表                                         | object-`{ labelSuffix?: string, labelPosition?: string, requireAsteriskPosition?: string }`               | 详见下表 |
| upload                | 上传组件相关配置, 详见下表                                     | object-`{ accept?: string }`                                                                                                  | 详见下表 |
| table                 | 表格组件相关配置, 详见下表                                     | object-`{ pageSize?: number, borderStyle?: string, stripe?: boolean }`                                                        | 详见下表 |
| fileUpload            | 文件上传组件相关配置, 详见下表                                 | object-`{needChunkMd5?: boolean,needChunkLocal?: boolean,fileNameLengthLimit?: number,typeLimit?: string,chunkSize?: number}` | 详见下表 |
| experimental-features | 将要添加的实验阶段的功能，所有功能都是默认设置为 false         | object                                                                                                                        | —        |
| enableGlobalContext   | 是否设置为全局配置（影响通过 createVNode + render 创建的组件） | boolean                                                                                                                       | false    |
| verifyCode            | 验证码相关配置, 详见下表                                       | object-`{httpRequest?: VerifyRequestHandler}`                                                                                 | 详见下表 |

### Language 国际化配置

Language 类型是一个对象，用于配置组件库中各个组件的文本国际化。它包含了各个组件的文本配置项，结构如下：

```typescript
interface Language {
  name: string; // 语言名称，如 'zh-cn', 'en'
  e: {
    // 组件相关的国际化配置
    table: {
      // 表格组件的国际化配置
      emptyText: string; // 数据为空时显示的文本
      loadingText: string; // 加载中显示的文本
      selectAll: string; // 全选文本
      selectInvert: string; // 反选文本
      ...
    };
    // 其他组件的国际化配置...
  };
}
```

### Button Attribute​

| Attribute       | Description                    | Type    | Default |
| --------------- | ------------------------------ | ------- | ------- |
| autoInsertSpace | 自动在两个中文字符之间插入空格 | boolean | false   |

### Message Attribute​

| Attribute | Description              | Type   | Default |
| --------- | ------------------------ | ------ | ------- |
| max       | 可同时显示的消息最大数量 | number | —       |

### VerifyCode Attribute​

| Attribute   | Description              | Type                                                                                         | Default |
| ----------- | ------------------------ | -------------------------------------------------------------------------------------------- | ------- |
| httpRequest | 自定义的初始化和验证请求 | VerifyRequestHandler-`(options: VerifyRequestOptions) => XMLHttpRequest \| Promise<unknown>` | —       |

### Select Attribute​

| Attribute | Description      | Type    | Default |
| --------- | ---------------- | ------- | ------- |
| clearable | 是否显示清空按钮 | boolean | —       |

### DatePicker Attribute​

| Attribute      | Description      | Type   | Default |
| -------------- | ---------------- | ------ | ------- |
| firstDayOfWeek | 每周第一天的日期 | number | 0       |
| format         | 日期显示格式     | string | —       |

### Form Attribute​

| Attribute               | Description    | Type                                | Default |
| ----------------------- | -------------- | ----------------------------------- | ------- |
| labelSuffix             | 标签后缀       | string                              | —       |
| labelPosition           | 标签对齐方式   | string-`'left' \| 'right' \| 'top'` | —       |
| requireAsteriskPosition | 必填星号位置   | string-`'left' \| 'right'`          | —       |

### Upload Attribute​

| Attribute | Description    | Type   | Default |
| --------- | -------------- | ------ | ------- |
| accept    | 接受的文件类型 | string | —       |

### Table Attribute​

| Attribute   | Description    | Type                                              | Default |
| ----------- | -------------- | ------------------------------------------------- | ------- |
| pageSize    | 每页条数       | number                                            | —       |
| borderStyle | 边框           | boolean\string-`'full' \| 'horizontal' \| 'none'` | —       |
| stripe      | 是否显示斑马纹 | boolean                                           | —       |

### FileUpload Attribute​

| Attribute           | Description                      | Type    | Default |
| ------------------- | -------------------------------- | ------- | ------- |
| needChunkMd5        | 分片是否计算 MD5                 | boolean | —       |
| needChunkLocal      | 服务端是否将分片存储到本地磁盘上 | boolean | —       |
| fileNameLengthLimit | 可上传的最大文件名称长度         | number  | —       |
| typeLimit           | 可上传文件后缀                   | string  | —       |
| chunkSize           | 分片大小，单位为 KB              | number  | —       |

### Slots

| 属性名  | 描述                                 | SlotProps            |
| ------- | ------------------------------------ | -------------------- |
| default | 默认插槽，用于包裹需要全局配置的组件 | config: 当前配置对象 |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-config-provider-m"
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