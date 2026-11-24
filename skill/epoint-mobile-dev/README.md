# epoint-mobile-dev 使用说明 & 提示词模板

把新点电子交易 APP 的移动端需求交给 Claude：它会先判断需求类型，再给出步骤图、要改的文件和后台配置、代码、验证清单。H5 部分的写法会自动交给 `m8-mobile-cross-platform` skill。

## 一、怎么触发

| 方式 | 写法 |
|---|---|
| 斜杠命令（最稳） | `/epoint-mobile-dev 会员端加一个"保证金查询"页面` |
| 点名 | `用 epoint-mobile-dev 帮我做：……` |
| 自然触发 | 提到「交易app / EJS / EMP8 / 菜单配置 / 待办审批移动端 / 开标大厅 / 手机盾」等关键词时会自动用 |

## 二、通用提示词模板（复制后填空）

```
/epoint-mobile-dev
需求：<一句话说明要做什么，给谁用（中心 / 交易甲方 / 交易乙方 / 代理 / 专家）>
背景：
- 业务版本：<7.1.40.x / 8.0 / 不清楚>
- 建设模式：<落地 APP / 标证通专区 / 三方 / 微信小程序>
- H5 框架：<M8.3 / M8.4 / 标准版 ejs.m7.bidding.v3 / 不清楚>
- 工程路径：<H5 工程、tpframe 或 tpbidder 源码路径；没有就不填>
- PC 端参考：<PC 页面地址、Action 类名、SQL；没有就不填>
- 接口：<已有接口地址和返回示例；没有就写"需要新写">
输出要求：<只要方案 / 方案 + 代码 / 直接改工程>
```

只有一句话需求也能用，Claude 会先列出要确认的问题。**信息给得越全，返工越少。**

## 三、按场景的提示词示例

### A. 新做 H5 页面（M8）
```
/epoint-mobile-dev 交易乙方要一个"我的保证金"列表 + 详情页，M8.4，
接口 rest/frameztbv8/getbaozhengjinlist，返回示例：{...}。
需要下拉刷新、按项目名搜索，点进详情能预览附件。直接生成代码。
```

### B. 配菜单 / 入口 / 权限（EMP8 后台）
```
/epoint-mobile-dev 给"代理机构"门户首页加一个"今日开标"卡片，
H5 地址是 http://ip:port/ejs.m7.bidding.v3/pages/center/today/today_index.html，
告诉我 EMP8 后台每一步点哪里、填什么。
```

### G. 待办审批搬到 APP（FMUI + Action）
```
/epoint-mobile-dev 中心端"招标公告审核"流程要能在 APP 上审批，业务版本 8.0，
PC 页面是 jsgcztbmis2/pages/zbgg/ZBGG_Detail，代码如下：<粘贴 PC 页面代码>。
给出转换后的 FMUI 页面、要用的 wf_approve 页，以及工作流里怎么配置。
```

### H. 标准模块和 PC 不一致（个性化）
```
/epoint-mobile-dev APP 工作台显示的环节和 PC 端对不上，PC 多了"资格预审"节点，
业务版本 7.1.40.3。帮我定位要改哪里，并给出修改方法。
```

### C. H5 需要新的原生能力（会改 App、要发版）
```
/epoint-mobile-dev H5 里要调用手机 NFC 读身份证，现在壳里没有这个能力。
给出原生 IBridgeImpl 代码、注册位置，以及 H5 端的 ejs.callApi 调用代码，并说明发版影响。
```

### E. 实时消息（MQTT）
```
/epoint-mobile-dev 开标大厅加"解密倒计时"，到点自动弹窗提醒投标人解密，
参考现有的 bjmejsapi.startMqttService，给出 H5 + 原生的完整方案。
```

### F. CA / 签章
```
/epoint-mobile-dev 投标人在 APP 上确认报价时，需要用手机盾对报价单 PDF 做 P7 签名，
给出 mobileShieldNewApi 的调用顺序、H5 代码和失败处理。
```

### 排查问题
```
/epoint-mobile-dev 排查：新配置的"保证金查询"应用，交易乙方登录后看不到。
/epoint-mobile-dev 排查：待办点进去一片空白，业务版本 8.0，日志如下：<粘贴日志>。
/epoint-mobile-dev 排查：APP 登录提示密码错误，PC 能登录。
```

### 学习 / 解释
```
/epoint-mobile-dev 用新人能懂的方式讲一下：点一个菜单后，从 EMP8 到 H5 到业务接口是怎么走的？
/epoint-mobile-dev ejs.callApi 和 ejs.ui.alert 有什么区别？什么时候用哪个？
```

## 四、常用追加指令

| 想要 | 追加一句 |
|---|---|
| 只要方案、先不写代码 | `只输出分类、步骤图和改动清单，先不要写代码` |
| 代码生成到资料目录 | `代码生成到 dfx待分析/需求开发/<需求名>/` |
| 直接改工程 | `工程在 <路径>，直接在工程里改，改完列出变更文件` |
| 指定 H5 版本 | `按 M8.4（Vue3 + Pinia + router.ts）写` |
| 补接口文档 | `顺便按 V7 规范写接口文档（名称、地址、请求示例、参数、返回示例、注意事项）` |
| 交付给实施 | `整理一份给实施的 EMP8 配置清单` |

## 五、输出你会拿到什么

1. 需求理解：拆成功能点。
2. 分类：A–H 类型，以及是否需要 App 发版。
3. ASCII 步骤图。
4. 分步说明：做什么、改哪里、为什么。
5. 代码：H5 / Java / FMUI。
6. 验证清单。
7. 风险和待确认项。

## 六、在另一台电脑上使用

1. 拷贝整个 `dfx待分析`，建议放在 `D:\git\dfx待分析`。
2. 把 `dfx待分析\epoint-mobile-dev` 和 `dfx待分析\m8-mobile-cross-platform` 复制到 `%USERPROFILE%\.claude\skills\`。
3. （可选）`git clone https://github.com/rogerbakerpeng/knowledge.git`，用来查 M8 和 EJS 的 API 细节。
4. 重启 Claude Code。
