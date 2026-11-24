# Form 表单

表单包括 `输入框`、`单选框`、`下拉框`、`复选框` 等等。使用表单，您可以收集、验证和提交数据。

## 基础表单

它包括各种输入项，如 `输入框`、`下拉框`、`单选框` 和 `复选框`。

在每个 `表单` 组件中，您需要使用 `表单项` 来容纳您的输入项。

```html
<template>
    <e-form-m :model="form" label-width="120px">
        <e-form-item-m label="活动名称">
            <e-input-m v-model="form.name" />
        </e-form-item-m>
        <e-form-item-m label="活动形式">
            <e-input-m v-model="form.desc" type="textarea" />
        </e-form-item-m>
        <e-form-item-m>
            <e-button-m type="primary" @click="onSubmit(form)">创建</e-button-m>
            <e-button-m>取消</e-button-m>
        </e-form-item-m>
    </e-form-m>
</template>

<script lang="ts" setup>
    import { reactive } from 'vue';

    // do not use same name with ref
    const form = reactive({
        name: '',
        desc: ''
    });

    const onSubmit = (form) => {
        console.log(form, 'form');
    };
</script>
```

## 验证

表单组件允许您验证数据，帮助您查找和纠正错误。

只需为 表单 组件添加 `rules` 属性，传递验证规则，并为 表单项 设置 `prop` 属性作为需要验证的特定键。

```html
<template>
    <e-form-m ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="220px">
        <e-form-item-m label="活动名称" prop="name">
            <e-input-m v-model="ruleForm.name" />
        </e-form-item-m>
        <e-form-item-m label="活动区域" prop="region">
            <e-select-m v-model="ruleForm.region" placeholder="选择活动区域">
                <e-option-m label="区域一" value="shanghai" />
                <e-option-m label="区域二" value="beijing" />
            </e-select-m>
        </e-form-item-m>
        <e-form-item-m label="活动时间" required>
            <!-- 当 ep-form-item 嵌套在另一个 ep-form-item 中时，其标签宽度将为 0。如果需要，您可以在该 ep-form-item 上设置 label-width -->
            <em-row>
                <em-col :span="11">
                    <e-form-item-m prop="date1">
                        <e-date-picker-m
                            v-model="ruleForm.date1"
                            type="date"
                            label="选择日期"
                            placeholder="选择日期"
                            style="width: 100%"
                        />
                    </e-form-item-m>
                </em-col>
                <em-col class="text-center" :span="2">
                    <span class="text-gray-500">-</span>
                </em-col>
                <em-col :span="11">
                    <e-form-item-m prop="date2">
                        <e-date-picker-m
                            v-model="ruleForm.date2"
                            type="date"
                            label="选择日期"
                            placeholder="选择日期"
                            style="width: 100%"
                        />
                    </e-form-item-m>
                </em-col>
            </em-row>
        </e-form-item-m>
        <e-form-item-m label="即时交付" prop="delivery">
            <e-switch-m v-model="ruleForm.delivery" />
        </e-form-item-m>
        <e-form-item-m label="活动类型" prop="type">
            <e-checkbox-group-m v-model="ruleForm.type">
                <e-checkbox-m value="线上活动" label="线上活动" name="1" />
                <e-checkbox-m value="促销活动" label="促销活动" name="2" />
                <e-checkbox-m value="线下活动" label="线下活动" name="3" />
                <e-checkbox-m value="简单品牌曝光" label="简单品牌曝光" name="4" />
            </e-checkbox-group-m>
        </e-form-item-m>
        <e-form-item-m label="资源" prop="resource">
            <e-radio-group-m v-model="ruleForm.resource">
                <e-radio-m value="赞助商" label="赞助商" />
                <e-radio-m value="场馆" label="场馆" />
            </e-radio-group-m>
        </e-form-item-m>
        <e-form-item-m label="活动形式" prop="desc">
            <e-input-m v-model="ruleForm.desc" type="textarea" />
        </e-form-item-m>
        <e-form-item-m label="主办人身份证号码" prop="idCard">
            <e-input-m v-model="ruleForm.idCard" />
        </e-form-item-m>
        <e-form-item-m label="主办人手机号码" prop="phone">
            <e-input-m v-model="ruleForm.phone" />
        </e-form-item-m>
        <e-form-item-m label="地址" prop="address">
            <e-input-m v-model="ruleForm.address" />
        </e-form-item-m>
        <e-form-item-m label="社会信用代码" prop="creditCode">
            <e-input-m v-model="ruleForm.creditCode" />
        </e-form-item-m>
        <e-form-item-m label="邮编" prop="postCode">
            <e-input-m v-model="ruleForm.postCode" />
        </e-form-item-m>
        <e-form-item-m label="爱好" prop="hobby">
            <e-input-m v-model="ruleForm.hobby" />
        </e-form-item-m>
        <e-form-item-m>
            <e-button-m type="primary" @click="submitForm(ruleFormRef)">创建</e-button-m>
            <e-button-m type="primary" @click="quicklyValidate(ruleFormRef)">快速验证</e-button-m>
            <e-button-m @click="resetForm(ruleFormRef)">重置</e-button-m>
        </e-form-item-m>
    </e-form-m>
</template>

<script lang="ts" setup>
    import { reactive, ref } from 'vue';
    import { type FormRules, type FormInstance } from '@epoint-mfe/eui-components';

    const ruleFormRef = ref<FormInstance>(); // 表单引用
    const ruleForm = reactive({
        name: 'Hello', // 活动名称
        date1: '', // 活动日期
        date2: '', // 活动时间
        delivery: false, // 即时交付
        type: [], // 活动类型
        resource: '', // 资源
        desc: '', // 活动形式
        idCard: '', // 主办人身份证号码
        phone: '', // 主办人身份证号码
        address: '',
        creditCode: '',
        postCode: '',
        hobby: ''
    });
    const rules = reactive<FormRules>({
        name: [
            {
                validator: (v, opt) => {
                    console.log(v, opt);
                    if (v.length >= 3 && v.length <= 5) {
                        return true;
                    }
                    return new Error('长度应为3至5个字符');
                },
                required: false,
                trigger: 'blur'
            }
        ],
        date1: [{ required: true, type: 'date', message: '请选择日期', trigger: 'change' }],
        date2: [{ required: true, type: 'date', message: '请选择时间', trigger: 'change' }],
        type: [
            {
                required: true,
                message: '请至少选择一个活动类型',
                trigger: 'change'
            }
        ],
        resource: [
            {
                required: true,
                message: '请选择活动资源',
                trigger: 'change'
            }
        ],
        desc: [{ required: true, message: '请输入活动形式', trigger: 'blur' }],
        idCard: [{ type: 'idCard', required: true, message: '必须是身份证格式', trigger: 'blur' }],
        phone: [{ required: true }, { type: 'phone' }],
        address: [{ type: 'string', required: true, min: 10, trigger: 'blur' }],
        creditCode: [{ type: 'creditCode', required: true, min: 10, trigger: 'blur' }],
        postCode: [{ type: 'postCode', required: true, min: 10, trigger: 'blur' }],
        hobby: [{ type: 'enum', enums: ['读书', '音乐', '写代码'], trigger: 'blur' }]
    });
    const submitForm = async (formEl: FormInstance | undefined) => {
        if (!formEl) return;
        await formEl.validate((valid, fields) => {
            if (valid) {
                console.log('提交成功！');
            } else {
                console.log('提交失败！', fields);
            }
        });
    };
    const quicklyValidate = async (formEl: FormInstance | undefined) => {
        if (!formEl) return;
        await formEl.fastValidate((valid, fields) => {
            if (valid) {
                console.log('验证成功！');
            } else {
                console.log('验证失败！', fields);
            }
        });
    };
    const resetForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return;
        formEl.resetFields();
    };
</script>
```

#### 注意

1. 控件的 model 必须和表单的 model 一致。表单验证是基于表单的 model 进行的，所以表单项的 model 必须和表单的 model 一致。也就是说，下面这样的代码是不合法的：

```html
<e-form-m v-model="formDataA">
    <e-form-item-m
        label="name"
        prop="name"
        :rules="[{ required: true, message: '请输入姓名' }, { type: 'string', min: 2, max: 5, message: '长度必须在 2 到 5 个字符之间' }]"
    >
        <e-input-m v-model="formDataB.name" />
    </e-form-item-m>
</e-form-m>
<e-form-m v-model="formDataB">
    <!-- 代码省略 -->
</e-form-m>
```

2. 必填规则比较常用，因此我们提供了简写的形式，即在内置规则上都可以额外加上 `required` 属性来表示必填，如： `{type: 'idCard', required: true, message: '请输入身份证号码'}` 。但是这种情况下，必填验证和内置的格式验证将会使用统一的验证错误信息提示。如果你需要针对必填和格式验证使用不同的错误信息提示，则不能使用这种简写的形式， 需要将其拆分为单独的验证规则，可参考下面的代码示例或上方的示例中的 phone 验证规则。

```js
[
    { type: 'required', message: '请输入身份证号码' }, // 等价 { required: true, message: '请输入身份证号码' },
    { type: 'idCard', message: '请输入正确的身份证号码' }
];
```

## 自定义验证规则

此示例演示如何自定义自己的验证规则以完成双因素密码验证。

这里我们使用 `status-icon` 来反映验证结果，显示为图标。

你可以在验证规则上通过 `validator` 来自定义验证函数。 函数必须具有显式返回值，返回值可以是 `boolean` `Error` `Promise<boolean>` `Promise<Error>` 之一。

异步验证验证返回 `Promise` 的情况下，请始终使用 `resolve` 返回结果，包括验证失败的情况。

```html
<template>
    <e-form-m ref="ruleFormRef2" :model="ruleForm2" status-icon :rules="rules2" label-width="120px">
        <e-form-item-m label="密码" prop="pass">
            <e-input-m v-model="ruleForm2.pass" type="password" autocomplete="off" show-password />
        </e-form-item-m>
        <e-form-item-m label="再次输入密码" prop="checkPass">
            <e-input-m v-model="ruleForm2.checkPass" type="password" autocomplete="off" show-password />
        </e-form-item-m>
        <e-form-item-m label="年龄" prop="age">
            <e-input-m v-model.number="ruleForm2.age" />
        </e-form-item-m>
        <e-form-item-m>
            <e-button-m type="primary" @click="submitForm(ruleFormRef2)">Submit</e-button-m>
            <e-button-m @click="resetForm(ruleFormRef2)">Reset</e-button-m>
        </e-form-item-m>
    </e-form-m>
</template>

<script lang="ts" setup>
    import { reactive, ref } from 'vue';
    import { type FormRules, type FormInstance } from '@epoint-mfe/eui-components';

    const ruleFormRef2 = ref<FormInstance>();
    const ruleForm2 = reactive({
        pass: '',
        checkPass: '',
        age: ''
    });
    const checkAge = (value: any, rule: any) => {
        if (!value) {
            return new Error('请输入年龄');
        }
        return new Promise((resolve) => {
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                    resolve(new Error('年龄只能是数字'));
                } else {
                    if (value < 18) {
                        resolve(new Error('年龄必须大于18'));
                    } else {
                        resolve(true);
                    }
                }
            }, 1000);
        });
    };
    const validatePwd = (
        pwd: string,
        options: {
            minLength: number;
            requireCombo: number;
            hasNumber: boolean;
            hasLowerCase: boolean;
            hasUpperCase: boolean;
            hasSymbol: boolean;
        }
    ) => {
        const { minLength, requireCombo, hasNumber, hasLowerCase, hasUpperCase, hasSymbol } = options;
        if (pwd.length < minLength) return false;

        let criteriaMet = 0;
        if (hasNumber && /\d/.test(pwd)) criteriaMet++;
        if (hasLowerCase && /[a-z]/.test(pwd)) criteriaMet++;
        if (hasUpperCase && /[A-Z]/.test(pwd)) criteriaMet++;
        if (hasSymbol && /[^a-zA-Z0-9]/.test(pwd)) criteriaMet++;

        return criteriaMet >= requireCombo;
    };
    function defaultPwdRule(pwd: string) {
        const ok = validatePwd(pwd, {
            minLength: 8,
            requireCombo: 3,
            hasNumber: true,
            hasLowerCase: true,
            hasUpperCase: true,
            hasSymbol: true
        });
        return {
            isValid: ok,
            message: ok ? '' : '密码最短需要8个字符, 至少包含 (大写字母, 小写字母, 数字, 符号) 中的3种'
        };
    }
    const validatePass = (value: any, rule: any) => {
        if (value === '') {
            return new Error('请输入密码');
        } else {
            const { isValid, message } = defaultPwdRule(value);
            return isValid ? true : new Error(message);
        }
    };
    const validatePass2 = (value: any, rule: any, callback: any) => {
        if (value === '') {
            return new Error('请再次输入密码进行确认');
        } else if (value !== ruleForm2.pass) {
            return new Error('两次的密码不一致');
        } else {
            return true;
        }
    };
    const rules2 = reactive<FormRules>({
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        age: [{ validator: checkAge, trigger: 'blur' }]
    });
    const submitForm = async (formEl: FormInstance | undefined) => {
        if (!formEl) return;
        await formEl.validate((valid, fields) => {
            if (valid) {
                console.log('提交成功！');
            } else {
                console.log('提交失败！', fields);
            }
        });
    };
    const resetForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return;
        formEl.resetFields();
    };
</script>
```

## 添加/删除表单项

除了一次性在表单组件上传递所有验证规则，还可以在单个表单字段上动态传递验证规则或删除规则。

```html
<template>
    <e-form-m ref="formRef" :model="dynamicValidateForm" label-width="120px">
        <e-form-item-m
            prop="email"
            label="电子邮件"
            :rules="[
                        {
                            required: true,
                            message: '请输入电子邮件地址',
                            trigger: 'blur'
                        },
                        {
                            type: 'email',
                            message: '请输入正确的电子邮件地址',
                            trigger: ['blur', 'change']
                        }
                    ]"
        >
            <e-input-m v-model="dynamicValidateForm.email" />
        </e-form-item-m>
        <e-form-item-m
            v-for="(domain, index) in dynamicValidateForm.domains"
            :key="domain.key"
            :label="'域名' + (index + 1)"
            :prop="'domains.' + index + '.value'"
            :rules="{
                        required: true,
                        message: '域名不能为空',
                        trigger: 'blur'
                    }"
        >
            <e-input-m v-model="domain.value" />
            <e-button-m class="mt-2" @click="removeDomain(domain)">删除</e-button-m>
        </e-form-item-m>
        <e-form-item-m>
            <e-button-m type="primary" @click="submitForm(formRef)">提交</e-button-m>
            <e-button-m @click="addDomain">新增域名</e-button-m>
            <e-button-m @click="resetForm(formRef)">重置</e-button-m>
        </e-form-item-m>
    </e-form-m>
</template>

<script lang="ts" setup>
    import { ref, reactive } from 'vue';
    import { type FormInstance } from '@epoint-mfe/eui-components';

    interface DomainItem {
        key: number;
        value: string;
    }

    const formRef = ref<FormInstance>();
    const dynamicValidateForm = reactive<{
        domains: DomainItem[];
        email: string;
    }>({
        domains: [
            {
                key: 1,
                value: ''
            }
        ],
        email: ''
    });
    const removeDomain = (item: DomainItem) => {
        const index = dynamicValidateForm.domains.indexOf(item);
        if (index !== -1) {
            dynamicValidateForm.domains.splice(index, 1);
        }
    };
    const addDomain = () => {
        dynamicValidateForm.domains.push({
            key: Date.now(),
            value: ''
        });
    };
    const submitForm = async (formEl: FormInstance | undefined) => {
        if (!formEl) return;
        await formEl.validate((valid, fields) => {
            if (valid) {
                console.log('提交成功！');
            } else {
                console.log('提交失败！', fields);
            }
        });
    };
    const resetForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return;
        formEl.resetFields();
    };
</script>
```

## 数值验证

数值验证需要在输入框的 `v-model` 绑定上添加 `.number` 修饰符，用于将字符串值转换为由 `Vue` 提供的数字。

```html
<template>
    <e-form-m ref="formRef1" :model="numberValidateForm" label-width="100px">
        <e-form-item-m
            label="年龄"
            prop="age"
            :rules="[
                        { required: true, message: '年龄是必填项' },
                        { type: 'number', message: '年龄必须是数字' }
                    ]"
        >
            <e-input-m v-model.number="numberValidateForm.age" type="text" autocomplete="off" />
        </e-form-item-m>
        <e-form-item-m>
            <e-button-m type="primary" @click="submitForm(formRef1)">提交</e-button-m>
            <e-button-m @click="resetForm(formRef1)">重置</e-button-m>
        </e-form-item-m>
    </e-form-m>
</template>

<script lang="ts" setup>
    import { reactive, ref } from 'vue';
    import type { FormInstance } from '@epoint-fe/eui-components';

    const formRef1 = ref<FormInstance>();
    const numberValidateForm = reactive({
        age: ''
    });

    const submitForm = async (formEl: FormInstance | undefined) => {
        if (!formEl) return;
        await formEl.validate((valid, fields) => {
            if (valid) {
                console.log('提交成功！');
            } else {
                console.log('提交失败！', fields);
            }
        });
    };
    const resetForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return;
        formEl.resetFields();
    };
</script>
```

## 尺寸、对齐方式及风格控制

表单中的所有组件都从该表单继承其 `size` 属性。同样，`FormItem` 也有一个 `size` 属性。尽管如此，如果您不希望组件从 `Form` 或 `FormItem` 继承其尺寸，仍然可以微调每个组件的 `size`。

可通过 `label-position` 控制表单标签的对齐方式，可选值 `left`、`right`、`top`。

当`label-position`与输入框横向对齐时，可通过 `value-position`控制输入框的对齐方式，可选值`left`、`right`。

表单默认为圆角卡片风格，可通过 `round` 设为 `false` 切换为直角风格。

```html
<template>
    <div class="toolbar-box">
        <e-radio-group-m v-model="size" label="尺寸控制">
            <e-radio-button-m value="large">大尺寸</e-radio-button-m>
            <e-radio-button-m value="default">默认尺寸</e-radio-button-m>
            <e-radio-button-m value="small">小尺寸</e-radio-button-m>
        </e-radio-group-m>
        <e-radio-group-m v-model="labelPosition" label="标签位置控制">
            <e-radio-button-m value="left">label左侧</e-radio-button-m>
            <e-radio-button-m value="right">label右侧</e-radio-button-m>
            <e-radio-button-m value="top">label顶部</e-radio-button-m>
        </e-radio-group-m>
        <e-radio-group-m v-if="labelPosition !== 'top'" v-model="valuePosition" label="输入框位置控制">
            <e-radio-button-m value="left">value左侧</e-radio-button-m>
            <e-radio-button-m value="right">value右侧</e-radio-button-m>
        </e-radio-group-m>
        <text class="mx-1">圆角卡片</text>
        <e-switch-m v-model="round" />
    </div>
    <br />
    <e-form-m
        ref="form"
        :model="sizeForm"
        label-width="100px"
        :round="round"
        :label-position="labelPosition"
        :value-position="valuePosition"
        :size="size"
    >
        <e-form-item-m prop="name" label="活动名称" :rules="[{ required: true, message: '这是必填项' }]">
            <e-input-m v-model="sizeForm.name" placeholder="请输入活动名称" />
        </e-form-item-m>
        <e-form-item-m label="活动形式">
            <e-input-m v-model="sizeForm.desc" type="textarea" />
        </e-form-item-m>
        <e-form-item-m label="活动时间">
            <em-col :span="11">
                <e-date-picker-m
                    v-model="sizeForm.date1"
                    type="date"
                    label="选择日期"
                    placeholder="选择日期"
                    style="width: 100%"
                />
            </em-col>
            <em-col class="text-center" :span="1" style="margin: 0 0.5rem">-</em-col>
            <em-col :span="11">
                <e-date-picker-m
                    v-model="sizeForm.date2"
                    type="date"
                    label="选择时间"
                    placeholder="选择时间"
                    style="width: 100%"
                />
            </em-col>
        </e-form-item-m>
        <e-form-item-m label="活动类型">
            <e-checkbox-group-m v-model="sizeForm.type">
                <e-checkbox-m value="线上活动" label="线上活动" name="type" />
                <e-checkbox-m value="促销活动" label="促销活动" name="type" />
            </e-checkbox-group-m>
        </e-form-item-m>
        <e-form-item-m label="即时交付" prop="delivery">
            <e-switch-m v-model="sizeForm.delivery" />
        </e-form-item-m>
        <e-form-item-m label="资源">
            <e-radio-group-m v-model="sizeForm.resource">
                <e-radio-m value="赞助商" label="赞助商" />
                <e-radio-m value="场馆" label="场馆" />
            </e-radio-group-m>
        </e-form-item-m>
        <e-form-item-m>
            <e-button-m type="primary" @click="onSubmit(sizeForm)">创建</e-button-m>
            <e-button-m>取消</e-button-m>
        </e-form-item-m>
    </e-form-m>
</template>

<script lang="ts" setup>
    import { reactive, ref } from 'vue';

    const size = ref('default');
    const labelPosition = ref('left');
    const valuePosition = ref('left');
    const round = ref<boolean>(true);
    const sizeForm = reactive({
        name: '',
        desc: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: ''
    });
    const onSubmit = (form) => {
        console.log(form, 'form');
    };
</script>
```

## 帮助提示

`label-tooltip`​（label 区域的悬浮帮助提示）、​`tooltip`​（控件区域的悬浮帮助提示）用于设置表单项的帮助信息； `top`插槽用于在表单项上方添加始终可见的辅助说明文本；`extra`插槽用于在表单项下方添加始终可见的辅助说明文本。

```html
<template>
    <e-form-m :model="formTooltip" label-width="120px">
        <e-form-item-m label="活动名称" label-tooltip="帮助提示：请输入活动名称">
            <e-input-m v-model="formTooltip.name" placeholder="请输入活动名称" />
        </e-form-item-m>
        <e-form-item-m
            label="活动时间"
            :label-tooltip="{
                        content: '帮助提示：<span style=\'color:var(--e-color-danger)\'>请选择日期</span>',
                        rawContent: true
                    }"
        >
            <em-col :span="11">
                <e-date-picker-m v-model="formTooltip.date1" type="date" placeholder="选择日期" style="width: 100%" />
            </em-col>
            <em-col :span="2" class="text-center">
                <span class="text-gray-500">-</span>
            </em-col>
            <em-col :span="11">
                <e-date-picker-m v-model="formTooltip.date2" type="date" placeholder="选择日期" style="width: 100%" />
            </em-col>
        </e-form-item-m>
        <e-form-item-m label="活动类型" tooltip="帮助提示：请选择活动类型">
            <e-checkbox-group-m v-model="formTooltip.type">
                <e-checkbox-m value="线上活动" label="线上活动" name="type" />
                <e-checkbox-m value="促销活动" label="促销活动" name="type" />
            </e-checkbox-group-m>
        </e-form-item-m>
        <e-form-item-m label="活动说明">
            <template #top>
                <e-alert-m
                    title="提示信息"
                    type="primary"
                    show-icon
                    :closable="false"
                    style="margin-bottom: 12px; padding: 8px 12px"
                />
            </template>
            <e-input-m v-model="formTooltip.desc" type="textarea" />
            <template #extra>
                <span>请填写活动的详细说明，不少于10个字符</span>
            </template>
        </e-form-item-m>
        <e-form-item-m>
            <e-button-m type="primary" @click="onSubmit(formTooltip)">创建</e-button-m>
            <e-button-m>取消</e-button-m>
        </e-form-item-m>
    </e-form-m>
</template>
<script lang="ts" setup>
    import { reactive } from 'vue';

    const formTooltip = reactive({
        name: '',
        date1: '',
        date2: '',
        type: [],
        desc: ''
    });
    const onSubmit = (form) => {
        console.log(form, 'form');
    };
</script>
```

## 数据脱敏的表单提交

由于数据脱敏的特殊性，首次进入编辑时，需要全部重新录入。未保存前，用户在页面的编辑需要脱敏展示的同时需要保留真实值，表单提交时需要对脱敏数据进行处理，也就是脱敏的内容知道当前是否保存过，提供以下两种处理方式：

1. 自己提交数据，手动更新表单状态。

2. 将提交数据的逻辑放在表单内部，表单内进行提交请求的发起，内部会自动处理状态逻辑。

### 外部手动提交

在表单外进行数据提交时，调用 `getCleanData` 获取未设置脱敏、脱敏已修改、未设置只读的数据，在提交成功后需调用 `resetEditStatus` 重置脱敏项的修改状态。

```html
<template>
    <e-form-m ref="formRef2" :model="formData" :rules="formRules">
        <e-form-item-m prop="testtext" label="测试" label-width="120px" :divider="false">
            <e-input-m v-model="formData.testtext" placeholder="请输入" :desensitization-type="''" />
        </e-form-item-m>
        <e-divider-m content-position="right">以下为敏感数据,已脱敏</e-divider-m>
        <e-form-item-m prop="name" label="姓名" label-width="120px">
            <e-input-m v-model="formData.name" placeholder="请输入" :desensitization-type="DESENDATATYPE_CHINESE_NAME" />
        </e-form-item-m>
        <e-form-item-m prop="address" label="地址(只读)" label-width="120px" :divider="false">
            <e-input-m v-model="formData.address" placeholder="请输入" readonly />
        </e-form-item-m>
        <em-row>
            <em-col :span="4" style="margin-left: 131px">
                <e-button-m type="primary" @click="submit">提交</e-button-m>
            </em-col>
        </em-row>
    </e-form-m>
</template>
<script lang="ts" setup>
    import { reactive, ref } from 'vue';
    import {
        DESENDATATYPE_CHINESE_NAME,
        type FormRules,
        type FormInstance,
        type SubmitRequestOptions,
        type ValidateFieldsError
    } from '@epoint-mfe/eui-components';

    const formRef2 = ref();
    const formData = reactive({
        testtext: '测试校验文本',
        name: '张三',
        address: '张家港市港城大道'
    });
    const formRules = reactive<FormRules>({
        testtext: [
            {
                type: 'string',
                required: true,
                message: '请输入',
                trigger: 'change'
            }
        ],
        name: [
            {
                type: 'string',
                required: true,
                message: '请输入',
                trigger: 'change'
            }
        ]
    });
    const submit = async () => {
        // 走表单验证
        const validateRes = await formRef2.value.validate((valid, fields) => {
            if (!valid) {
                // 处理错误信息
                ejs.ui.toast(`表单验证失败，错误字段：${Object.keys(fields).join('、')}`);

                return;
            }
        });

        // 验证未通过
        if (!validateRes) {
            return;
        }

        // 通过getCleanData 获取无需脱敏数据+脱敏已修改数据
        const data = formRef2.value.getCleanData();

        console.log('提交数据', data);

        Util.ajax({
            url: location.href,
            data
        })
            .then((res) => {
                ejs.ui.toast('提交成功');

                // 重置表单内脱敏项的已修改情况，避免重复提交
                formRef2.value.resetEditState();
            })
            .catch((err) => {
                console.error(`提交失败 ${JSON.stringify(err)}`);
            });
    };
</script>
```

### 内部提交

使用表单内部能力进行提交,包含脱敏数据处理。

```html
<template>
    <e-form-m
        ref="formRef3"
        :model="formData3"
        :rules="formRules3"
        :submit-url="submitUrl"
        :submit-request-options="submitRequestOptions"
    >
        <e-form-item-m prop="testtext" label="测试" label-width="120px" :divider="false">
            <e-input-m v-model="formData3.testtext" placeholder="请输入" :desensitization-type="''" />
        </e-form-item-m>

        <e-divider-m content-position="right">以下为敏感数据,已脱敏</e-divider-m>
        <e-form-item-m prop="name" label="姓名" label-width="120px">
            <e-input-m
                v-model="formData3.name"
                placeholder="请输入"
                :desensitization-type="DESENDATATYPE_CHINESE_NAME"
            />
        </e-form-item-m>
        <e-form-item-m prop="address" label="地址(只读)" label-width="120px" :divider="false">
            <e-input-m v-model="formData3.address" placeholder="请输入" readonly />
        </e-form-item-m>
        <em-row>
            <em-col :span="6" style="margin-left: 131px">
                <e-button-m type="primary" @click="submit3">提交</e-button-m>
            </em-col>
        </em-row>
    </e-form-m>
</template>
<script lang="ts" setup>
    import { reactive, ref } from 'vue';
    import {
        DESENDATATYPE_CHINESE_NAME,
        type FormRules,
        type FormInstance,
        type SubmitRequestOptions,
        type ValidateFieldsError
    } from '@epoint-mfe/eui-components';

    const formRef3 = ref();
    const formData3 = reactive({
        testtext: '测试必填文本',
        name: '张三',
        address: '张家港市港城大道'
    });
    const formRules3 = reactive<FormRules>({
        testtext: [
            {
                type: 'string',
                required: true,
                message: '请输入',
                trigger: 'change'
            }
        ],
        name: [
            {
                type: 'string',
                required: true,
                message: '请输入',
                trigger: 'change'
            }
        ]
    });

    // 表单请求配置
    const submitUrl = ref(location.href);
    const submitRequestOptions: Partial<SubmitRequestOptions> = {
        method: 'get',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'with-test-falg': '1'
        },
        withCredentials: false,
        getRequestData: (data: Record<string, any>) => {
            console.log('提交数据', data);
            ejs.ui.toast(`提交数据： ${JSON.stringify(data)}`);

            return data;
        },
        validateErrorHandler: (fields: ValidateFieldsError): void => {
            ejs.ui.toast(`表单验证失败，错误字段：${Object.keys(fields).join('、')}`);
        },
        onSuccess: (response: any): void => {
            ejs.ui.toast('提交成功');
        }
    };
    // 表单提交
    const submit3 = () => {
        // 表单提交
        formRef3.value.submit();
    };
</script>
```

## Form API

### Form Attributes

| 名称                      | 描述                                                                                                                                                | 类型                                                                  | 默认值      |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ----------- |
| model                     | 表单组件的数据。                                                                                                                                    | `object`-`Record<string, any>`                                        | —           |
| rules                     | 表单的验证规则。                                                                                                                                    | `object`-`FormRules`                                                  | —           |
| label-position            | 标签的位置。如果设置为 `'left'` 或 `'right'`，还需要 `label-width` 属性。                                                                           | `enum`-`'left' \| 'right' \| 'top'`                                   | top         |
| label-width               | 标签的宽度，例如 `'50px'`。其所有直接子表单项都将继承此值。支持 `auto`。                                                                            | `string` / `number`                                                   | —           |
| label-suffix              | 标签的后缀。                                                                                                                                        | `string`                                                              | —           |
| value-position            | label 和输入框横向展示时，输入框的位置。                                                                                                            | `enum`-`'left' \| 'right'`                                            | left        |
| round                     | 表单是否展示为圆角卡片风格                                                                                                                          | `boolean`                                                             | true        |
| hide-required-asterisk    | 是否隐藏标签旁边的红色星号，表示必填字段。                                                                                                          | `boolean`                                                             | false       |
| require-asterisk-position | 星号的位置。                                                                                                                                        | `enum`-`'left' \| 'right'`                                            | left        |
| show-message              | 是否显示错误消息。                                                                                                                                  | `boolean`                                                             | true        |
| error-message             | 从表单上按验证类型配置统一的错误提示信息                                                                                                            | `object`-`Record<string, string>`                                     | null        |
| status-icon               | 是否显示表示验证结果的图标。                                                                                                                        | `boolean`                                                             | false       |
| validate-on-rule-change   | 当 `rules` 属性更改时，是否触发验证。                                                                                                               | `boolean`                                                             | true        |
| size                      | 控制此表单中组件的大小。                                                                                                                            | `enum`-`'large' \| 'default' \| 'small'`                              | —           |
| disabled                  | 是否禁用此表单中的所有组件。如果设置为 `true`，它将覆盖内部组件的 `disabled` 属性。                                                                 | `boolean`                                                             | false       |
| scroll-to-error           | 验证失败时，滚动到第一个错误表单项。                                                                                                                | `boolean`                                                             | false       |
| scroll-into-view-options  | 验证失败时，根据 scrollIntoView 选项滚动到第一个错误项。[scrollIntoView](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView)。 | `object` / `boolean`                                                  | —           |
| submit-url                | 请求的 Url 地址                                                                                                                                     | `string`                                                              | `#`         |
| submit-request-options    | 请求配置,参考下面的表格                                                                                                                             | `SubmitRequestOptions`                                                | —           |
| submit-http-request       | 覆盖默认的 xhr 行为，允许你实现自己的上传文件请求。FormRequestOptions                                                                               | `(options: FormRequestOptions) => XMLHttpRequest \| Promise<unknown>` | `Util.ajax` |

#### error-message 说明

`error-message` 用于统一配置表单上的错误提示信息，key 为验证类型，value 为错误提示信息，下面是一个示例：

<!-- eslint-skip -->

```js
{
  required: '这是必填字段',
  number: '请输入数字值'
}
```

这个配置将会自动和语言包中的错误提示信息合并，如果有相同的 key，将会覆盖语言包中的错误提示信息。

语言包中默认提示信息如下：

<!-- eslint-skip -->

```js
{
  /**
   * 支持的占位符
   * - name: 文本类型，FormItem 里面的文字，没有时降级为 filed
   * - filed: 文本类型，FormItem 所关联的prop值
   * - value: 任意类型，当前 FormItem 的值
   * - ...: 其他所有来自 验证规则的字段，如 type、min、max、enums 等
   */
  _validateRuntime: '验证过程中出错了：',
  required: '${name}必填',
  whitespace: '${name}不能是空白',
  boolean: '${name}数据类型必须是布尔类型',
  number: '${name}必须是数字',
  string: '${name}必须是字符串',
  enum: '${name}只能是${enums}等',
  date: '请输入正确的${name}，必须是日期',
  url: '请输入正确的${name}，必须是url格式',
  email: '请输入正确的${name}，必须是邮箱格式',
  idCard:
    '输入的身份证号码格式不正确，若最后一位为“X”则只允许输入大写的“X”',
  hkIdCard: '输入的香港身份证号码格式不正确',
  orgCode: '输入的组织机构代码格式不正确',
  creditCode: '输入的统一社会信用代码格式不正确',
  postCode: '输入的邮政编码格式不正确',
  pattern: '请输入正确的${name}',
}
```

#### SubmitRequestOptions 说明

表单属性，请求入参配置

| Name                 | Description                                     | Type                                                     | Default                                                                                 |
| -------------------- | ----------------------------------------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| method               | 设置上传请求的方法                              | `string`                                                 | post                                                                                    |
| headers              | 请求头部信息                                    | `Headers \| Record<string, any>`                         | {}                                                                                      |
| withCredentials      | 是否发送 cookies                                | `boolean`                                                | false                                                                                   |
| getRequestData       | 获取请求 data 入参,入参为 getCleanData 获取数据 | `(cleanData: Record<string, any) => Record<string, any>` | `(cleanData) => { return { params: JSON.stringify(cleanData) }; }`                      |
| validateErrorHandler | 表单验证错误处理                                | `(fields: ValidateFieldsError) => void`                  | `(fields) => { fields && EpMessage.warning('表单校验未通过,请检查表单字段填写情况'); }` |
| onSuccess            | 上传成功时的钩子函数                            | `(response: any) => void`                                | `(res) => { EpMessage.error('提交成功'); }`                                             |
| onError              | 发生错误时的钩子函数                            | `(error: Error) => void`                                 | `(err) => { EpMessage.error('提交失败'); }`                                             |

#### FormRequestOptions 说明

请求方法，入参参考

| Name                 | Description          | Type                                    |
| -------------------- | -------------------- | --------------------------------------- |
| action               | 请求地址             | `string`                                |
| method               | 设置上传请求的方法   | `string`                                |
| headers              | 请求头部信息         | `Headers \| Record<string, any>`        |
| withCredentials      | 是否发送 cookies     | `boolean`                               |
| data                 | 请求数据             | `Record<string, any>`                   |
| validateErrorHandler | 表单验证错误处理     | `(fields: ValidateFieldsError) => void` |
| onSuccess            | 上传成功时的钩子函数 | `(response: any) => void`               |
| onError              | 发生错误时的钩子函数 | `(error: Error) => void`                |

### Form Events

| Name     | Description          | Type                                                                          |
| -------- | -------------------- | ----------------------------------------------------------------------------- |
| validate | 在验证表单项后触发。 | `Function`- `(prop: FormItemProp, isValid: boolean, message: string) => void` |

### Form Exposes

| Name           | Description                                                                    | Type                                                                                                                                                 |
| -------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| validate       | 验证整个表单。接受回调函数或返回 `Promise`。                                   | `Function` - `(callback?: (isValid: boolean, invalidFields?: ValidateFieldsError) => void) => Promise<void>`                                         |
| fastValidate   | 快速验证整个表单(第一个字段验证失败就立即返回)。接受回调函数或返回 `Promise`。 | `Function` - `(callback?: (isValid: boolean, invalidFields?: ValidateFieldsError) => void) => Promise<void>`                                         |
| validateField  | 验证指定字段。                                                                 | `Function` - `(props?: FormItemProp \| FormItemProp[], callback?: (isValid: boolean, invalidFields?: ValidateFieldsError) => void) => Promise<void>` |
| resetFields    | 重置指定字段并移除验证结果。                                                   | `Function` - `(props?: FormItemProp \| FormItemProp[]) => void`                                                                                      |
| scrollToField  | 滚动到指定字段。                                                               | `Function` - `(prop: FormItemProp) => void`                                                                                                          |
| clearValidate  | 清除指定字段的验证消息。                                                       | `Function` - `(props?: FormItemProp \| FormItemProp[]) => void`                                                                                      |
| getCleanData   | 获得无需脱敏、脱敏已修改、未设置只读的数据集合。                               | `Function` - `() => Record<string, any>`                                                                                                             |
| resetEditState | 重置其下脱敏组件的修改状态。                                                   | `Function` - `() => void`                                                                                                                            |
| submit         | 表单提交。                                                                     | `Function` - `() => void`                                                                                                                            |

### Form Slots

| Name    | Description    | Subtags  |
| ------- | -------------- | -------- |
| default | 自定义默认内容 | FormItem |

## FormItem API

### FormItem Attributes

| Name            | Description                                                                                                                   | Type                                                  | Default |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ------- |
| prop            | `model` 的键。它可以是一个属性路径的数组（例如 `['a', 'b', 0]`）。在使用 `validate` 和 `resetFields` 方法时，该属性是必需的。 | `string` / `string[]`                                 | —       |
| label           | 标签文本。                                                                                                                    | `string`                                              | —       |
| label-position  | 标签的位置。如果设置为 'left' 或 'right'，还需要 label-width 属性。                                                           | `enum`-`'left' \| 'right' \| 'top'`                   | `top`   |
| label-width     | 标签宽度，例如 `'50px'`。支持 `'auto'`。                                                                                      | `string` / `number`                                   | —       |
| value-position  | label 和输入框横向展示时，输入框的位置。                                                                                      | `enum`-`'left' \| 'right'`                            | left    |
| required        | 字段是否必填，如果省略，将由验证规则确定。                                                                                    | `boolean`                                             | false   |
| rules           | 表单的验证规则，请参考[下面的表格](#formitemrule)                                                                             | ` object` `FormItemRule \| FormItemRule[] `           | —       |
| error           | 字段错误消息，设置其值，字段将立即验证错误并显示此消息。                                                                      | `string`                                              | —       |
| show-message    | 是否显示错误消息。                                                                                                            | `boolean`                                             | true    |
| size            | 控制该表单项中组件的大小。                                                                                                    | `enum` - `'large' \| 'default' \| 'small'`            | default |
| label-tooltip   | 设置表单项 label 区域的帮助提示。                                                                                             | `string` \ `EpTooltipProps`                           | -       |
| tooltip         | 设置表单项控件区域的帮助提示。                                                                                                | `string` \ `EpTooltipProps`                           | -       |
| for             | 与原生标签中的 `for` 相同。                                                                                                   | `string`                                              | —       |
| validate-status | 表单项的验证状态。                                                                                                            | `enum` - `'' \| 'error' \| 'validating' \| 'success'` | —       |

### FormItem Slots

| Name    | Description                                  | Type                           |
| ------- | -------------------------------------------- | ------------------------------ |
| default | 表单项的默认内容。                           | —                              |
| label   | 自定义标签的显示内容。                       | `object` - `{ label: string }` |
| error   | 自定义验证消息的显示内容。                   | `object` - `{ error: string }` |
| top     | 用于在表单项上方添加始终可见的辅助说明文本。 | -                              |
| extra   | 用于在表单项下方添加始终可见的辅助说明文本。 | -                              |

### FormItem Exposes

| Name            | Description                  | Type                                                                                                  |
| --------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------- |
| size            | 表单项的大小。               | `object` - `ComputedRef<'' \| 'large' \| 'default' \| 'small'>`                                       |
| validateMessage | 验证消息。                   | ` object``Ref<string> `                                                                               |
| validateState   | 验证状态。                   | `object` - `Ref<'' \| 'error' \| 'validating' \| 'success'>`                                          |
| validate        | 验证表单项。                 | `Function` - `(trigger: string, callback?: FormValidateCallback \| undefined) => FormValidationResult` |
| resetField      | 重置当前字段并删除验证结果。 | `Function` - `() => void`                                                                              |
| clearValidate   | 移除字段的验证状态。         | `Function` - `() => void`                                                                              |

## 验证规则

验证规则的通用属性如下表：

| Name      | Description          | Type                                                                                       | Default |
| --------- | -------------------- | ------------------------------------------------------------------------------------------ | ------- |
| trigger   | 触发验证的方式。     | `enum` - `'blur' \| 'change' \| ['blur'] \| ['change'] \| ['blur', 'change']`              | —       |
| required  | 是否必填             | `boolean`                                                                                  | —       |
| message   | 验证失败时的错误消息 | `string`                                                                                   | —       |
| validator | 自定义的验证函数     | `Function` - `(val:any, option) => boolean \| Promise<boolean> \| Error \| Promise<Error>` | —       |
| type      | 验证的类型           | 详见下表                                                                                   | —       |

内置的验证规则如下表，你可以直接使用 `{type: "某个验证规则"}` 进行配置，但请注意，某些验证规则必须提供配置，如 `type: 'enum'` 则必须提供 `enums`。

| Type              | Options                                                                                             | Description                            |
| ----------------- | --------------------------------------------------------------------------------------------------- | -------------------------------------- |
| required          | --                                                                                                  | 必填的验证规则                         |
| boolean           | --                                                                                                  | 必须是布尔值                           |
| number            | `IsNumberOptions` - `{min?:number; max?:number}`                                                    | 必须是数值                             |
| string            | `LengthOptions`                                                                                     | 必须是字符串                           |
| enum              | `IsEnumOptions`                                                                                     | 必须是指定的选项之一                   |
| date              | `IsDateOptions`                                                                                     | 必须是日期                             |
| url               | `IsURLOptions`                                                                                      | 必须是 url                             |
| email             | `IsEmailOptions`                                                                                    | 必须是 email                           |
| postCode          | --                                                                                                  | 是否为邮政编码                         |
| pattern           | `PatternValidatoroptions`                                                                           | 是符合给定的正则表达式                 |
| idCard            | `IDCardOptions`                                                                                     | 必须是身份证号码                       |
| hkIdCard          | --                                                                                                  | 必须是香港的身份证号码                 |
| float             | `IsF9FloatOptions` - `{min?: number; max?: number; maxDecimalLength?: number; maxLength?: number;}` | 是否是小数（只判断形式不判断类型）     |
| int               | `IsF9IntOptions` - `{min?:number; max?:number}`                                                     | 是否是 int（只判断形式不判断类型）     |
| creditCode        | --                                                                                                  | 是否为统一社会信用代码                 |
| orgCode           | --                                                                                                  | 是否为组织机构代码（包含社会信用代码） |
| phone             | --                                                                                                  | 是否是电话号码                         |
| mobile            | --                                                                                                  | 是否为手机号                           |
| tel               | --                                                                                                  | 是否为固定电话号码                     |
| phoneWithShortNum | --                                                                                                  | 更弱的电话号码验证                     |
| projectCode       | --                                                                                                  | 投资项目统一代码                       |

#### Options 说明

各个内置的验证规则的 `options` 类型定义如下。

```ts
interface IsNumberOptions {
    min?: number; // 最小值
    max?: number; // 最大值
}

interface LengthOptions {
    min?: number; // 最小长度
    max?: number; // 最大长度
    asciiDouble?: boolean; // 是否将非ascii字符长度计为2
}

interface IsEnumOptions {
    enums: Array<any>; // 选项列表， eg：['a', 'b', 'c]
    strict?: boolean; // 是否严格匹配
    /**
     * 自定义的比较器，配置了将使用此函数的返回值作为判断依据
     * 第一个参数为 迭代器当前值，第二个参数为当前的验证的值
     *
     * @memberof IsEnumOptions
     */
    compare?: (a: any, b: any) => boolean;
}

interface IsDateOptions {
    /**
     * @default false
     */
    format?: string | undefined;
    /**
     * If strictMode is set to true,
     * the validator will reject inputs different from format.
     *
     * @default false
     */
    strictMode?: boolean | undefined;
    /**
     * `delimiters` is an array of allowed date delimiters
     *
     * @default ['/', '-']
     */
    delimiters?: string[] | undefined;
}
interface IsURLOptions {
    /**
     * @default ['http','https','ftp']
     */
    protocols?: string[] | undefined;
    /**
     * @default true
     */
    require_tld?: boolean | undefined;
    /**
     * @default false
     */
    require_protocol?: boolean | undefined;
    /**
     * @default true
     */
    require_host?: boolean | undefined;
    /**
     * if set as true isURL will check if port is present in the URL
     * @default false
     */
    require_port?: boolean | undefined;
    /**
     * @default true
     */
    require_valid_protocol?: boolean | undefined;
    /**
     * @default false
     */
    allow_underscores?: boolean | undefined;
    /**
     * @default false
     */
    host_whitelist?: Array<string | RegExp> | undefined;
    /**
     * @default false
     */
    host_blacklist?: Array<string | RegExp> | undefined;
    /**
     * @default false
     */
    allow_trailing_dot?: boolean | undefined;
    /**
     * @default false
     */
    allow_protocol_relative_urls?: boolean | undefined;
    /**
     * @default false
     */
    disallow_auth?: boolean | undefined;
    /**
     * @default true
     */
    allow_fragments?: boolean | undefined;
    /**
     * @default true
     */
    allow_query_components?: boolean | undefined;
    /**
     * @default true
     */
    validate_length?: boolean | undefined;
}

interface IsEmailOptions {
    /**
     * If `allow_display_name` is set to `true`, the validator will also match `Display Name <email-address>`.
     *
     * @default false
     */
    allow_display_name?: boolean | undefined;
    /**
     * If `require_display_name` is set to `true`, the validator will reject strings without the format `Display Name <email-address>`.
     *
     * @default false
     */
    require_display_name?: boolean | undefined;
    /**
     * If `allow_utf8_local_part` is set to `false`, the validator will not allow any non-English UTF8 character in email address' local part.
     *
     * @default true
     */
    allow_utf8_local_part?: boolean | undefined;
    /**
     * If `require_tld` is set to `false`, e-mail addresses without having TLD in their domain will also be matched.
     *
     * @default true
     */
    require_tld?: boolean | undefined;
    /**
     * If `ignore_max_length` is set to `true`, the validator will not check for the standard max length of an email.
     *
     * @default false
     */
    ignore_max_length?: boolean | undefined;
    /**
     * If `allow_ip_domain` is set to `true`, the validator will allow IP addresses in the host part.
     *
     * @default false
     */
    allow_ip_domain?: boolean | undefined;
    /**
     * If `domain_specific_validation` is `true`, some additional validation will be enabled,
     * e.g. disallowing certain syntactically valid email addresses that are rejected by GMail.
     *
     * @default false
     */
    domain_specific_validation?: boolean | undefined;
    /**
     *  If host_blacklist is set to an array of strings
     *  and the part of the email after the @ symbol matches one of the strings defined in it,
     *  the validation fails.
     */
    host_blacklist?: string[] | undefined;
    /**
     * If host_whitelist is set to an array of strings
     * and the part of the email after the @ symbol matches none of the strings defined in it,
     * the validation fails.
     */
    host_whitelist?: string[] | undefined;
    /**
     *  If blacklisted_chars receives a string, then the validator will reject emails that include
     *  any of the characters in the string, in the name part.
     */
    blacklisted_chars?: string | undefined;
}

type IDCardOptions = {
    ignoreX: boolean; // 是否忽略X的大小写
};

interface PatternValidatoroptions {
    regexp: RegExp; // 要匹配的正则表达
}

interface IsF9FloatOptions {
    min?: number; // 最小值
    max?: number; // 最大值
    maxDecimalLength?: number; // 小数部分最大长度
    maxLength?: number; // 总的长度限制
}

export interface IsF9IntOptions {
    min?: number; // 最小值
    max?: number; // 最大值
}
```

如果不想基于输入事件触发验证器，请在相应的输入类型组件（`<e-input-m>`，`<e-radio-m>`，...）上将 `validate-event` 属性设置为 `false`。

::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-form-m"
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