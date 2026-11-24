# Autocomplete 自动补全输入框

根据输入内容提供对应的输入建议。

## 基本用法

自动完成组件提供输入建议。

`fetch-suggestions` 属性是一个方法，用于返回建议的输入。在此示例中，`querySearch(queryString, cb)` 通过 `cb(data)` 将建议传递给 Autocomplete，当建议准备就绪时。

```html
<template>
      <div class="sub-title my-2 text-sm text-gray-600">
        list suggestions when activated
      </div>
      <e-autocomplete-m
        v-model="state1"
        :fetch-suggestions="querySearch"
        clearable
        class="inline-input w-50"
        placeholder="Please Input"
        @select="handleSelect"
      />
      <div class="sub-title my-2 text-sm text-gray-600">
        list suggestions on input
      </div>
      <e-autocomplete-m
        v-model="state2"
        :fetch-suggestions="querySearch"
        :trigger-on-focus="false"
        clearable
        class="inline-input w-50"
        placeholder="Please Input"
        @select="handleSelect"
      />
</template>
<script lang="ts" setup>
  import { onMounted, ref } from "vue";
  interface RestaurantItem {
    value: string;
    link: string;
  }
  const state1 = ref("");
  const state2 = ref("");
  const restaurants = ref<RestaurantItem[]>([]);
  const querySearch = (queryString: string, cb: any) => {
    const results = queryString
      ? restaurants.value.filter(createFilter(queryString))
      : restaurants.value;
    cb(results);
  };
  const createFilter = (queryString: string) => {
    return (restaurant: RestaurantItem) => {
      return (
        restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      );
    };
  };
  const loadAll = () => {
    return [
      { value: "vue", link: "https://github.com/vuejs/vue" },
      { value: "element", link: "https://github.com/ElemeFE/element" },
      { value: "cooking", link: "https://github.com/ElemeFE/cooking" },
      { value: "mint-ui", link: "https://github.com/ElemeFE/mint-ui" },
      { value: "vuex", link: "https://github.com/vuejs/vuex" },
      { value: "vue-router", link: "https://github.com/vuejs/vue-router" },
      { value: "babel", link: "https://github.com/babel/babel" },
    ];
  };

  const handleSelect = (item: RestaurantItem) => {
    console.log(item);
  };

  onMounted(() => {
    restaurants.value = loadAll();
  });
</script>
```

## 自定义模板

自定义建议的显示方式。

使用 `作用域插槽` 来自定义建议项。在作用域中，您可以通过 `item` 键访问建议对象。

```html
<template>
  <e-autocomplete-m
    v-model="state"
    :fetch-suggestions="querySearch"
    popper-class="my-autocomplete"
    placeholder="Please input"
    @select="handleSelect"
  >
    <template #suffix>
      <e-icon-m name="Edit" @click="handleIconClick"/>
    </template>
    <template #item="{ item }">
      <div class="value">{{ item.value }}</div>
      <span class="link">{{ item.link }}</span>
    </template>
  </e-autocomplete-m>
</template>

<script setup>
import { onMounted, ref } from 'vue';
const state = ref('');
const links = ref([]);
const querySearch = (queryString, cb) => {
  const results = queryString ? links.value.filter(createFilter(queryString)) : links.value;
  // call callback function to return suggestion objects
  cb(results);
};
const createFilter = (queryString) => {
  return (restaurant) => {
    return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
  };
};
const loadAll = () => {
  return [
    { value: 'vue', link: 'https://github.com/vuejs/vue' },
    { value: 'element', link: 'https://github.com/ElemeFE/element' },
    { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
    { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
    { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
    { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
    { value: 'babel', link: 'https://github.com/babel/babel' },
  ];
};
const handleSelect = (item) => {
  console.log(item);
};

const handleIconClick = (ev) => {
  console.log(ev);
};

onMounted(() => {
  links.value = loadAll();
});
</script>

<style scoped>
.my-autocomplete li {
  line-height: normal;
  padding: 7px;
}
.my-autocomplete li .name {
  text-overflow: ellipsis;
  overflow: hidden;
}
.my-autocomplete li .addr {
  font-size: 12px;
  color: #b4b4b4;
}
.my-autocomplete li .highlighted .addr {
  color: #ddd;
}
</style>
```

## 远程搜索

从服务器端检索数据。

```html
<template>
  <e-autocomplete-m
    v-model="state"
    :fetch-suggestions="querySearchAsync"
    placeholder="Please input"
    @select="handleSelect"
  />
</template>

<script lang="ts" setup>
  import { onMounted, ref } from "vue";
  const state = ref("");
  interface LinkItem {
    value: string;
    link: string;
  }
  const links = ref<LinkItem[]>([]);
  const loadAll = () => {
    return [
      { value: "vue", link: "https://github.com/vuejs/vue" },
      { value: "element", link: "https://github.com/ElemeFE/element" },
      { value: "cooking", link: "https://github.com/ElemeFE/cooking" },
      { value: "mint-ui", link: "https://github.com/ElemeFE/mint-ui" },
      { value: "vuex", link: "https://github.com/vuejs/vuex" },
      { value: "vue-router", link: "https://github.com/vuejs/vue-router" },
      { value: "babel", link: "https://github.com/babel/babel" },
    ];
  };

  let timeout: NodeJS.Timeout;
  const querySearchAsync = (queryString: string, cb) => {
    const results = queryString
      ? links.value.filter(createFilter(queryString))
      : links.value;

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(results);
    }, 3000 * Math.random());
  };
  const createFilter = (queryString: string) => {
    return (restaurant: LinkItem) => {
      return (
        restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      );
    };
  };

  const handleSelect = (item: LinkItem) => {
    console.log(item);
  };

  onMounted(() => {
    links.value = loadAll();
  });
</script>
```

## API

### Attributes

| 属性名                  | 描述                                                                      | 类型                                                                                     | 默认值      |
| --------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------ |
| model-value / v-model | 绑定值                                                                           | `string`                                                                                | —            |
| placeholder           | 自动完成输入框的占位符                                                           | `string`                                                                                | —            |
| clearable             | 是否显示清除按钮                                                                 | `boolean`                                                                               | `false`        |
| disabled              | 是否禁用自动完成                                                                 | `boolean`                                                                               | `false`        |
| value-key             | 用于显示输入建议对象的键名                                                       | `string`                                                                                | `value`        |
| debounce              | 输入时的去抖延迟，以毫秒为单位                                                   | `number`                                                                                | `300`          |
| placement             | 弹出菜单的位置                                                                   |`string(enum)`--`'top'\| 'bottom-start'` | `bottom-start` |
| fetch-suggestions     | 获取输入建议的方法。当建议准备好时，调用 `callback(data: [])` 返回它们给自动完成 | `Function`-`(queryString: string, callback: callbackfn) => void`                         | —            |
| trigger-on-focus      | 输入框获取焦点时是否显示建议                                                     | `boolean`                                                                               | `true`         |
| select-when-unmatched | 当没有自动完成匹配项时，是否在按回车键时触发 `select` 事件                       | `boolean`                                                                               | `false`        |
| name                  | 与原生输入框的 `name` 属性相同                                                   | `string`                                                                                | —            |
| label                 | 标签文本                                                                         | `string`                                                                                | —            |
| hide-loading          | 是否隐藏远程搜索中的加载图标                                                     | `boolean`                                                                               | `false`        |
| popper-class          | 自动完成下拉菜单的自定义类名                                                     | `string`                                                                                | —            |
| teleported            | 选择下拉菜单是否被传送到 `body` 中                                               | `boolean`                                                                               | `true`         |
| highlight-first-item  | 是否默认高亮显示远程搜索建议中的第一项                                           | `boolean`                                                                               | `false`        |
| fit-input-width       | 下拉菜单的宽度是否与输入框相同                                                   | `boolean`                                                                               | `false`        |

### Events

| 属性名   | 描述                  | 类型                                                  |
| ------ | ---------------------------- | ----------------------------------------------------- |
| select | 当选择建议时触发             | `Function`-`(item: typeof modelValue \| any) => void` |
| change | 当失焦时输入值发生变化 | `Function`-`(value: string \| number) => void`        |

### Slots

| 属性名    | 描述                                 |
| ------- | ------------------------------------------- |
| item    | 自定义输入建议的内容。作用域参数为 { `item` } |
| prefix  | 作为输入框前缀的内容                        |
| suffix  | 作为输入框后缀的内容                        |
| prepend | 输入框前的内容                              |
| append  | 输入框后的内容                              |

### Exposes

| 属性名             | 描述        | 类型                                      |
| ---------------- | ------------------ | ----------------------------------------- |
| activated        | 自动完成是否激活   | `object`-`Ref<boolean>`                   |
| blur             | 模糊输入框元素     | `Function`-`() => void`                   |
| close            | 收起建议列表       | `Function`-`() => void`                   |
| focus            | 聚焦输入框元素     | `Function`-`() => void`                   |
| handleSelect     | 当选择建议时触发   | `Function`-`(item: any) => promise<void>` |
| highlightedIndex | 当前高亮项目的索引 | `object`-`Ref<number>`                    |
| highlight        | 高亮建议中的项目   | `Function`-`(itemIndex: number) => void`  |
| inputRef         | `ep-input` 组件实例   | `object`-`Ref<EpInputInstance>`           |
| loading          | 远程搜索加载指示器 | `object`-`Ref<boolean>`                   |
| popperRef        | 弹出框实例 | `object`-`Ref<HTMLDivElement>` |
| suggestions      | 获取建议结果       | `object`-`Ref<record<string, any>>`       |

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-autocomplete-m"
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