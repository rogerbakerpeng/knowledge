# workflow 工作流组件

工作流流转所需组件。

## 基本用法

工作流整体通过 `workflow-container` 组件包裹，该组件展示了工作流顶部信息、底部工作流按钮组及意见签署框。

`workflow-container`组件初始化时会去请求工作流按钮信息，获取到按钮信息后，触发初始化事件，您可以在初始化事件中做一些如获取页面表单数据等初始化操作。

`workflow-container`组件提供默认插槽，您可以在默认插槽中搭配使用 `ep-form`组件自定义表单内容。

有关入参：

-   场景一：未发起，要求入参 `processGuid`

-   场景二：已发起，要求入参 `pviGuid`、`workItemGuid`

在送下一步过程中，校验、提交表单等操作都由组件内部处理，您无需关心。您只需要注意绑定好工作流在签署意见过程中可能触发的页面跳转、关闭、打开选人等事件。

<!-- 框架将意见签署框封装成 `workflow-opinion` 组件，您也可以单独拿出来使用。 -->

`审批记录`和`流程图` 则通过 `workflow-tab` 组件展示。

```html
<template>
    <div class="container">
        <workflow-container
            class="workflow-container"
            :http-action="httpActionPath"
            :process-guid="processGuid"
            :pviGuid="pviGuid"
            :workItemGuid="workItemGuid"
            :form-data="formDataForWorkflow"
            :custom-params="customParamsForWorkflow"
            :form-ref-list="formRefList"
            @init="initPage"
            @save="frozenForm"
            @close="closePage"
            @select-person="selectPerson"
        >
            <template #headerExtra="{ processInfo }">
                <div>业务其他信息： {{ processInfo }}</div>
            </template>
            <e-form-m class="form mrg" ref="frameUserForm" :model="model" label-position="top">
                <e-form-item-m label="登录名" prop="frameuser.loginid">
                    <e-input-m v-model="model.frameuser.loginid" :disabled="isFormFrozen" />
                </e-form-item-m>
                <e-form-item-m label="用户姓名" prop="frameuser.displayname">
                    <e-input-m v-model="model.frameuser.displayname" />
                </e-form-item-m>
            </e-form-m>

            <e-form-m class="form mrg" ref="userextendinfoForm" :model="model" label-position="top">
                <e-form-item-m label="用户生日" prop="frameuser.userextendinfo.birthday">
                    <e-date-picker-m
                        v-model="model.frameuser.userextendinfo.birthday"
                        type="date"
                        format="YYYY/MM/DD"
                        value-format="YYYY-MM-DD"
                    />
                </e-form-item-m>
                <e-form-item-m label="身份证号" prop="frameuser.userextendinfo.identitycardnum">
                    <e-input-m
                        v-model="model.frameuser.userextendinfo.identitycardnum"
                        :desensitization-type="DESENDATATYPE_ID_CARD"
                        clearable
                    />
                </e-form-item-m>
            </e-form-m>

            <workflow-tab class="mrg" :http-action="httpActionPath" :pviGuid="pviGuid"></workflow-tab>
        </workflow-container>
    </div>
</template>
<script lang="ts" setup>
    import { ref, computed, provide } from 'vue';
    import { onPageScroll } from '@dcloudio/uni-app';
    import { model as modelWorkflow } from '../model/model_workflow'; // 结合编码模型使用
    import { useSelectPersonStore } from '../../selectperson/store';
    import { DESENDATATYPE_ID_CARD } from '@epoint-mfe/eui-components';

    onPageScroll(() => {});
    // action路径地址
    const httpActionPath = 'workflowcommoncontroller/';
    // 工作流页面url上会携带以下guid，流程发起时只有processGuid
    // 流程guid
    const processGuid = 'ac7de324-ce86-48f2-b773-18dc35ce04ef';
    // 流程实例guid
    const pviGuid = ref('');
    // 工作项guid
    const workItemGuid = ref('');
    const model = modelWorkflow as any;
    // 表单接口使用数据,设置单独监听
    const formDataForWorkflow = computed(() => {
        return {
            ...(model as any).frameuser,
            // 临时处理表单数据
            otherOuGuid: (model.frameuser.otherOuGuid || []).join(',')
        };
    });
    // 表单一引用
    const frameUserForm = ref(null);
    // 表单二引用
    const userextendinfoForm = ref();
    // 表单引用列表
    const formRefList = computed(() => [frameUserForm, userextendinfoForm]);
    // 个性化入参
    const customParamsForWorkflow = computed(() => {
        return {
            userguid: isFormFrozen.value ? '' : model.initUserGuid
        };
    });
    const isEdit = ref(true);
    // 是否冻结表单
    const isFormFrozen = ref(isEdit.value);

    // 监听工作流组件初始化完成
    const initPage = async () => {
        console.log('工作流初始化');
        // TODO: 页面配置请求入参
        model.securityConfigParams.processguid = processGuid;
        model.securityConfigParams.processversioninstanceguid = pviGuid.value;
        model.securityConfigParams.workitemguid = workItemGuid.value;
        // 初始化接口
        await model.initData({ userGuid: '', pviGuid: pviGuid.value, isCopy: false });

        model.frameuser.ouguid = model.frameuser.ouguid || '';
    };

    // 监听工作流保存后事件回调-冻结表单
    // NOTE: 当工作流按钮替代完成表单保存操作后,需冻结表单关键值,防止保存但未下送时触发另一个保存操作
    const frozenForm = (saveData) => {
        console.log('保存返回:', saveData);
        isFormFrozen.value = true;
    };

    // 关闭当前页面，错误/成功最终执行
    const closePage = () => {
        console.log('工作流页面关闭');
        ejs.page.close();
    };
    // 选人
    const SelectPersonStore = useSelectPersonStore();
    const selectPerson = (config) => {
        SelectPersonStore.setOption(config);

        ejs.page.open({
            pageUrl: '../../selectperson/index'
        });
    };
</script>
<style lang="scss" scoped>
    .form {
        border-radius: var(--e-border-radius-base);
        overflow: hidden;
    }

    .mrg {
        margin-top: var(--e-space-l);
    }
</style>
```

## API

### WorkflowContainer Attributes

| Name               | Description                                                                                       | Type                                                                        | Default              |
| :----------------- | :------------------------------------------------------------------------------------------------ | :-------------------------------------------------------------------------- | :------------------- |
| httpAction         | 请求 action 地址, 介于 ROOTPATH 与 actionname 之间的地址，例如: 'handlemainnomateriallistaction/' | `string`                                                                    | '/'                  |
| processGuid        | 流程 guid                                                                                         | `string`                                                                    | `-`                  |
| pviGuid            | 流程实例 guid                                                                                     | `string`                                                                    | `-`                  |
| workItemGuid       | 工作项 guid                                                                                       | `string`                                                                    | `-`                  |
| customParams       | 个性化入参                                                                                        | `Object`                                                                    | `{}`                 |
| formRefList        | 表单引用对象列表，用于表单校验等操作                                                              | `Ref<ComponentPublicInstance>[]`                                            | `[]`                 |
| formData           | 表单数据，用于表单校验、提交等操作                                                                | `Object`                                                                    | `{}`                 |
| closeAlertMessage  | 关闭时的提示消息                                                                                  | `string`                                                                    | —                    |
| isAutoInit         | 是否默认自动初始化，关闭时需要手动调用 组件的 `initComponent` 方法进行初始化                      | `boolean`                                                                   | `true`               |
| showOpinionPanel   | 是否弹窗进行意见签署，关闭后需要配合 `sign` 事件自行意见签署操作                                  | `boolean`                                                                   | `true`               |
| opinion            | 默认签署意见                                                                                      | `string`                                                                    | `-`                  |
| actionBeforeFunc   | 按钮操作前调用方法，只有返回 `true` 或 `Promise.resolve(true)` 才会继续执行按钮操作               | `(btn: WorkflowButtonHandledStruct) => boolean \| Promise<boolean> \| void` | `() => true`         |
| actionAfterFunc    | 按钮操作后调用方法                                                                                | `(btn: WorkflowButtonHandledStruct) => boolean \| Promise<boolean> \| void` | `() => {}`           |
| submitReplaceFunc  | 下送替换方法, 替换默认下送逻辑方法                                                                | `(btn: WorkflowButtonHandledStruct) => boolean \| Promise<boolean>`         | `-`                  |
| checkFormFunc      | 校验表单方法，替换默认校验方法                                                                    | `() => boolean \| Promise<boolean>`                                         | `-`                  |
| saveFormFunc       | 保存表单方法，替换默认保存方法                                                                    | `(flowData: WorkflowDataForSaveStruct) => boolean \| Promise<boolean>`      | `-`                  |
| submitFormFunc     | 提交表单方法，替换默认提交方法                                                                    | `(flowData: WorkflowDataForSubmitStruct) => boolean \| Promise<boolean>`    | `-`                  |
| frameUrl           | 框架接口地址，用于移动端选人组件                                                                  | `string`                                                                    | `-`                  |
| selectPersonConfig | 自定义的选人配置，传入后会与默认选人配置合并                                                      | `object`                                                                    | `-`                  |
| formAction         | 接口 action 路径                                                                                  | `string`                                                                    | `frameuserworkflow/` |

### WorkflowContainer Slots

| 名称        | 说明                         | slotProps                          |
| ----------- | ---------------------------- | ---------------------------------- |
| default     | 自定义表单内容               | -                                  |
| headerExtra | 自定义顶部信息区展开后的内容 | `processInfo：WorkflowProcessInfo` |

### WorkflowContainer Events

| 事件名        |                                               说明                                                | 回调参数                                                 |
| :------------ | :-----------------------------------------------------------------------------------------------: | :------------------------------------------------------- |
| init          |                                     工作流按钮初始化完成事件                                      | -                                                        |
| close         |                                           页面关闭事件                                            | -                                                        |
| save          |                                     默认表单保存方式完成事件                                      | `saveRes: Record<string, unknown>`                       |
| select-person |                              打开选人事件，外部可在此时打开选人组件                               | `selectPersonConfig: 选人参数，参考选人组件文档说明`     |
| sign          | 不使用框架的意见签署框时，可通过该事件触发自定义的意见签署，需配合 `showOpinionPanel: false` 使用 | `operationHandleInfo: WorkflowOperationHandleDataStruct` |

### WorkflowContainer Exposes

| Name          | Description                                                                | Type                                                                  |
| :------------ | :------------------------------------------------------------------------- | :-------------------------------------------------------------------- |
| processInfo   | 接口返回的流程信息                                                         | `WorkflowProcessData`                                                 |
| initComponent | 手动初始化组件方法                                                         | `function`-`() => Promise<void>`                                      |
| submit        | 提交表单方法，自定义意见签署时，意见签署完成后可通过该方法提交表单送下一步 | `function`-`(flowData: WorkflowDataForSubmitStruct) => Promise<void>` |
| unlock        | 解锁方法                                                                   | `function`-`(tagStr: string) => Promise<void>`                        |

### WorkflowTab Attributes

| Name          | Description                                                                                       | Type     | Default                    |
| :------------ | :------------------------------------------------------------------------------------------------ | :------- | :------------------------- |
| httpAction    | 请求 action 地址, 介于 ROOTPATH 与 actionname 之间的地址，例如: 'handlemainnomateriallistaction/' | `string` | '/'                        |
| pviGuid       | 流程实例 guid                                                                                     | `string` | `-`                        |
| workItemGuid  | 工作项 guid                                                                                       | `string` | `-`                        |
| tabs `v8.4.5` | 用于配置需要展示的 tab 模块数组，默认展示全部功能。可选值：`spjl`、`gtjl`、`lczz`                 | `array`  | `['spjl', 'gtjl', 'lczz']` |

### WorkflowOpinion Attributes

| Name               | Description                                                                                       | Type     | Default |
| :----------------- | :------------------------------------------------------------------------------------------------ | :------- | :------ |
| httpAction         | 请求 action 地址, 介于 ROOTPATH 与 actionname 之间的地址，例如: 'handlemainnomateriallistaction/' | `string` | '/'     |
| processGuid        | 流程 guid                                                                                         | `string` | `-`     |
| pviGuid            | 流程实例 guid                                                                                     | `string` | `-`     |
| workItemGuid       | 工作项 guid                                                                                       | `string` | `-`     |
| frameUrl           | 框架接口地址，用于移动端选人组件                                                                  | `string` | `-`     |
| selectPersonConfig | 自定义的选人配置，传入后会与默认选人配置合并                                                      | `object` | `-`     |

### WorkflowOpinion Events

| 事件名        |                  说明                  | 回调参数                                             |
| :------------ | :------------------------------------: | :--------------------------------------------------- |
| submit        |              确认提交事件              | `flowData: WorkflowDataForSubmitStruct`              |
| close         |              页面关闭事件              | -                                                    |
| cancel        |            点击取消按钮事件            | -                                                    |
| select-person | 打开选人事件，外部可在此时打开选人组件 | `selectPersonConfig: 选人参数，参考选人组件文档说明` |

### WorkflowOpinion Exposes

| Name          | Description    | Type                                                                                                                                                             |
| :------------ | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| initComponent | 初始化组件方法 | `function`-`(handleInfo: WorkflowOperationHandleDataStruct, operationInfo: { operationGuid: string; operationType: string; }, opinion: string) => Promise<void>` |

### 以上涉及的部分类型说明

```ts
interface WorkflowButtonHandledStruct {
    // 按钮中文名称
    text: string;
    // 按钮标识
    operationguid: string;
    // 按钮操作类型
    operationtype: string;
    // 变迁独立按钮关联的变迁标识，非变迁独立按钮为空
    transitionguid: string;
    // 按钮触发前事件，返回对应隐藏按钮id
    beforeact: string;
    // 按钮操作后事件，返回对应隐藏按钮id
    afteract: string;
    // 意见是否必填
    isrequireopinion: boolean;
    // 点击执行调用事件Js
    click: string;
    // 与statelevel配合计算PC端按钮样式
    operationmodel: string;
    // 按钮配置对应重要程度
    statelevel: number;
    // "btn_"+操作按钮标识
    btnid: string;
    // 是否是自定义流程设计按钮类型
    isflow: boolean;
    // 按钮备注
    note: string;
    // 按钮配置的预处理人数量限制数据（送阅读、转交、抄送）
    transactormaxcount: number;
}

interface WorkflowDataForSaveStruct {
    // 流程标识
    processguid: string;
    // 流程版本实例标识
    processversioninstanceguid: string;
}

interface WorkflowDataForSubmitStruct {
    // 流程标识
    processguid: string;
    // 流程版本实例标识
    processversioninstanceguid: string;
    // 工作项标识
    workitemguid: string;
    // 处理意见;
    opinion: string;
    // 操作按钮标识
    operationguid: string;
    // 操作类型
    operatetype: string | number;
    // 如果场景需要下一步流转信息，传入stepinfo相关信息
    nextsteplist?: {
        // 下一步活动标识
        nextactivityguid: string;
        // 活动处理人列表
        handlerlist: {
            // 下一步活动处理人标识
            transactor: string;
            // 下一步活动处理人名称
            transactorname: string;
            // 下一步活动处理人所属部门;
            ouguid: string;
        }[];
    }[];
    // 协办行为选项
    mixedsignature?: number;
    // 加办信息结构
    externalsignature?: {
        // 办理人
        supplement: {
            persondata: {
                transactor: string;
                transactorname: string;
                ouguid: string;
            }[];
            activityguid: string;
        }[];
        // 审批人
        review: {
            transactor: string;
            transactorname: string;
            ouguid: string;
        }[];
    };
}

interface WorkflowProcessInfo {
    // 标题
    title: string;
    // 当前所处活动环节名称
    currentactname: string;
    // 当前流程流转进度百分比
    currentpercentage: number;
    // 工作项由谁发过来
    fromdisplayname: string;
    // 接收时间
    generatedata: string;
    // 头像
    image: string;
    // 完成时间
    endtime: string;
}

interface WorkflowOperationHandleDataStruct {
    // 是否默认流转boolean
    isdefoperation: boolean;
    // 能否向后流转
    iscanpass: boolean;
    // 提醒信息
    message: string;
    // 流程版本实例标识
    processversioninstanceguid: string;
    // 活动实例标识
    activityinstanceguid: string;
    // 活动guid
    operationtype: string | number;
    // 活动名称
    activityname: string;
    // 按钮名称
    operationname: string;
    // （true/false）
    isshownextactivity: boolean;
    // （true/false）
    isshowopiniontemplete: boolean;
    // 变迁标识
    transitionguid: string;
    // 是否激活tab（true/false）
    is_ShowAdvicetab: boolean;
    // 仅剩单分支情况下,是否隐藏分支区域
    ishidestep: boolean;
    // 下一步分支列表
    nextsteplist: {
        issinglecheck: boolean;
        data: WorkflowStepStruct[];
    };
    opinion: {
        text: string;
        // (true/false)
        required: boolean;
        // 个人意见
        useropinionlist: {
            // 总数
            total: string;
            data: WorkflowOpinionTemplateStruct[];
        };
        // 公共意见
        commonopinionlist: {
            // 总数
            total: string;
            data: WorkflowOpinionTemplateStruct[];
        };
    };
    workitemlist: {
        // 总数
        total: string;
        data: WorkflowHistoryItemStruct[];
    };
    pagestyle: string;
    url: string;
}

interface WorkflowProcessData {
    // 是否自定义流程标识
    flag: boolean;
    // 新自定义流程标识
    newCustomProcess: string;
    // 新设计交互表示
    isdesign: boolean;
    // 是否是状态机标识
    isStateMachine: boolean;
    info: WorkflowProcessInfo;
}
```

::: ifdef M84

<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/epshowcase/examples/e-workflow-m"
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
