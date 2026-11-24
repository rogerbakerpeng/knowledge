# 电子交易 APP 交付知识（重点 8.0+）

来源：`/mnt/hgfs/git/dfx待分析/电子交易APP基础学习资料/`
- 《电子交易移动APP部署说明文档 - 8.0版本 - V2.0》
- 《EMP应用相关配置说明》
- 《移动APP项目对接及常见问题.pdf》
- 《电子交易M8app应用模块功能》
- 《01.电子交易M8app个性化接口设计》《02接口开发指南》
- 《交易APP标准版功能开发-中心端/会员端》
- 《审批页开发指南》《微信小程序部署配置指南》、8、微信小程序/README.md

以下配置键已和 cs0822.apk 交叉核对、能找到：`applogin`、`rest/frameztbv8`、`portal_role_relation`、`ejs-authorize-domains`、`message-rest-url`、`face_rest_url`、`service_privacy_url`、`ejs_bidopening-business-rest-url`、`danweitype`。

## 1. 版本与模式

| 业务版本 | 框架 | 基座 | 说明 |
|---|---|---|---|
| 7.1.12.2 / 7.1.30.x | 9.1.18 / 9.3.x | M7、M8 | 落地部署或标证通专区 |
| **≥7.1.40.3** | **≥9.4.2-sp1** | **M8** | 从这个版本起支持开标大厅、标证通首页整合 |
| **8.0** | **9.5** | **M8** | **移动端合并到 PC**：只部署 EMP8 + Ejs(H5)，业务接口和审批页**和 PC 一样以 jar 包形式放在 tpframe（中心端）/ tpbidder（会员端）的 lib 里**，个性化按 PC 的方式做 |

「M8」有两个意思：M8 基座（App 壳和 EMP8 的版本）≠ M8 移动前端跨端框架（写 H5 的 Vue 框架）。标准版 H5 工程是 `ejs.m7.bidding.v3`（git：`192.168.0.200/dzjy/apps/byt/java/h5/ejs.bidding.git`）。

三种建设模式：
- **落地型**：单独的 APP、公众号或小程序。iOS 必须上架；2023-09 起需要 APP 备案。
- **专区模式**：集成到标证通专区，SSO 用多 token 模式。
- **接入第三方**：如皖事通、浙里办，通常提供 H5，按对方的规范开发。

## 2. 部署拓扑（8.0）

```
APP(M8基座) → EMP8 运营平台 (microservice-emp831；Docker 或 Tomcat；独立 MySQL 库)
                ├ 框架接口：EMP8 自己处理
                └ EmpFitMobileAPIFilter：rest/frameztbv8/ 开头 → 转调 empfit_fit_url（解密参数后转发）
                     → 8.0：tpframe / tpbidder（加 EpointMBApp.properties；放 frame/fmui、workflow/）
                     → 7.x：EpointMobileService
          → epoint-sso：放 app-loginservice-1.0.4.jar；loginflow.properties 增加
                [loginflow3] mobilepasswordtokenhandler、[loginflow4] applogin
                （userservice/credentialsmatcher/listener 都是 com.epoint.ztb.mobile.login.Ztb*）
                EpointSSOClient.properties：NoNeedAuthActions 加 getuserroletoemp/getuserinfotoemp/getMemRoleInfoToEmp；
                ejs_customuseragent=Android;iPhone;iPad
          → epoint-soa：系统集成-统一系统-系统管理，注册两个应用「EMP8」「APP」（更新 app_info 的 callbackurl、appkey、secret）
                改完后按顺序重启：epoint-soa → epoint-sso → tpframe → emp8，等前一个完全启动后再重启下一个
          → H5 资源 ejs.m7.bidding.v3（地址填在 APP 参数 ejs_h5-pageurl）
          → 按需部署：开标大厅 BidOpeningApp + MQ；officeweb（预览）；oarest9（邮件/日程/通知，需接入移动端 SSO）
tpframe/tpbidder 的 openplatform_flg 改成项目的登录页（customframe4bid/login_TP、memberLogin）；
在「订阅管理 - 消息订阅」的「消息」「待办」里勾选 APP
```

## 3. EMP8 后台配置

**配置中心 - EMP 参数**
- `sso_url`、`sso_client_id`、`sso_client_secret`
- `faceurl`
- `expandUser` / `expandUserType`（开启外部用户扩展后自动生成；expandUserType 的取值：0 应用、1 卡片、2 tab、3 门户）

**配置中心 - APP 参数**（下发到 App 和 H5）

| 参数 | 作用 |
|---|---|
| `ejs_h5-pageurl` | H5 代码地址 |
| `ejs_business-rest-url` / `business-rest-url` | 业务接口 …/rest/frameztbv8/ |
| `message-rest-url`、`message-channel-id=mobile` | 消息中心 |
| `portal_role_relation` | 门户名 → danweitype：`{"交易乙方":"13","代理机构":"18","交易甲方":"11"}`。**门户改名后这里也要同步改** |
| `bidlogin_show_flag=1111` | 依次控制手机号、扫脸、扫码绑定、标证通四种登录的显示 |
| `ejs-authorize-domains` | EJS 全局安全域名 |
| `service_privacy_url` | 隐私协议地址（html + 版本号） |
| `bidbind_login_url` | 扫码绑定登录地址前缀 |
| `face_rest_url` | 人脸服务（外网） |
| `ejs_bidopening-business-rest-url / -vue-image-url / -mqtt-url / -mqtt-username / -mqtt-pwd` | 开标大厅参数（开标大厅方提供） |
| `oauth-mobile-authorize=token` | 9.3.4 用 cookie，并配合 `oauth-rest-path` / `oauth-rest-url` |

**账号授权**
- 外部用户扩展：用户信息接口 `…/rest/frameztbv8/getuserinfotoemp`，角色关系接口 `…/getuserroletoemp`，权限类别全选。
- 角色：中心、交易甲方(11)、交易乙方(13)、代理机构(18)、专家。

**菜单**
- 应用中心 - 应用管理：名称、图标、类型（H5 / 原生 / 小程序）、地址、权限。对应 APK 的 `ApplicationBean{h5url, android, minih5}`。
- 应用中心 - 卡片管理：如「常用应用」，类型「自定义卡片」，地址 `…/pages/center/homepage/homepage_withoutmeeting.html`。
- 首页管理：首页、Tab、门户（中心工作人员 / 交易甲方 / 交易乙方 / 代理机构 / 专家）。对应 APK 的 `system/tablist`、`system/getportal`。
- 基座小程序：在运营平台新增小程序，上传程序包；程序包里要改 Domain、User/password、AppId。

**EMP8 服务端**
- `EpointSSOClient.properties`：server_url、redirect_url。
- `epointframe.properties`：`empfit_fit_url`、`empfit_custom_api`（已个性化的框架接口，用 ; 分隔）、`empfit_business_api_prefix=rest/frameztbv8/`、`AppKey=epointjweb4.0;emp8userext`、`AppSecret=12345;emp8userext`，以及 SOAAddress / SOA_Appkey_secret。
- 「系统设置 - 移动运营管理平台配置」里的服务 URL。
- ≥9.4.2sp2：外网访问时要配 `EMP8.properties` 的 `emp.ServerUrl`。
- 安全配置：`allowUploadExtensions` 要包含 apk、ipa、crash、log、zip、lic。

## 4. 两种页面开发模式

| | FMUI + Action | H5 + Rest |
|---|---|---|
| 前端 | FMUI（F9 移动框架，PC FUI 的移动版） | H5：标准版 ejs.m7.bidding.v3 / 新开发用 M8 跨端框架 |
| 后端 | **复用 PC 的 Action**（@RestController + BaseController） | Rest（@RequestMapping），遵循 V7 规范 |
| 适合 | PC 已有的 List / Workflow / Detail，**待办审批页** | App 独有功能，或 PC 表单太复杂 |

**审批页做法**
1. 用转换工具把 PC 页面转成 FMUI：`http://218.4.136.118:8022/epoint-translate/pagetranslate/pageinfo/translatepageinfo`。
2. 调整 js、核对字段，保证和 PC 一致；PC 上的个性化控件需要删减或个性化实现。
3. 审批操作用 workflow 标准页：
   - 标准版：`wf_approve_opinion`（提交）、`_back`（退回）、`_opinionpass`（自由选人）、`_opinionpre`（预处理人）
   - 企业版：`wf_approve_qy*`
   - 意见模板：`wf_opinion_template`
4. 在工作流活动的「应用程序配置」里，移动端选 APP，地址填页面，例如 `http://ip:port/EpointMobileService/jsgcztbmis2/pages/projectreg/Project_Detail`。一步审核不用配。
5. 批量转换：手工转好一页后，让 AI 总结规则再批量转换。

工作流事件、业务 jar 有变更时，业务方要同步通知移动端，否则会出现 nosuchmethod / classnotfound。

## 5. 接口规范 V7

```
请求 {"params": {"userguid": "...", "token": "匿名接口才需要传"}}     参数名一律小写
响应 {"status": {"code": 1, "text": "失败描述"}, "custom": {...}}    code=1 表示成功
token：TokenUtils.createToken("emp8userext") / TokenUtils.validateToken(token)
       （AppKey=AppSecret=emp8userext）
```
- 示例接口：中心端五合一卡片 `app_getmodulelist`，入参 token，返回 `custom.listData[{img, title, url}]`。
- 接口文档要写：名称、地址、请求示例、参数说明、返回示例、注意事项。给三方用的文档需要产品评审。
- 跨域有两种做法：
  - nginx 同域代理；
  - web.xml 打开 CORSFilter（`com.thetransactioncompany.cors.CORSFilter`，需要 cors-filter-2.5.jar 和 java-property-utils-1.9.1.jar），并放在第一个 filter。需要 token 时 supportedHeaders 加 `Authorization`；用 M8 染色请求时还要加 `User-Token`、`MobileFrame-Info`。

## 6. 标准模块与个性化要点

**原则：App 数据和 PC 保持一致。PC 功能先完善并测试通过，移动端才开始做。**

**中心端**（H5 路径前缀 `ejs.m7.bidding.v3/pages/`）

| 模块 | 路径 | 个性化要点 |
|---|---|---|
| 工作台 | `center/workbench/workbench_index`、`_detail` | 对照 PC 改 SQL 和筛选条件；节点不一致时，检查 PC 的 ztb.properties 里有没有 `WorkbenchPackages`，App 同步配置 |
| 待办 | `center/todo/todo_index` | 审批页走 FMUI |
| 招标文件 | `center/biddoc/biddoc_index`、`biddocdetail/biddoc_detail` | 对照 PC 调 SQL；预览需要 officeweb |
| 交易信息 | `center/deal/deal_index` | ztb.properties 里的 `WEBDB_CATEGROY` 栏目号；**网站改栏目号会导致公告空白** |
| 今日开标 | `center/today/today_index` | 和 PC 一致；标准版没有搜索 |
| 投标人库 / 代理库 | `center/hylib/bidderlib_*`、`agentlib_*` | 参考 PC 主体管理增减字段 |
| 政策法规 | `center/policy/policy_list` | 标准版从易彩虹获取；如果在网站上，参照交易信息做 |
| 邮件 / 日程 / 通知 | OA 模块 | 需要部署 oarest9，并接入移动端 SSO |

**会员端**
- 我要投标：后台本质是一个 datagrid，对齐 PC 的 SQL、查询条件和按钮渲染。下载、报名后跳转的页面也要按 PC 个性化。
- 我的项目 / 已中标：同一个后台，用 url 参数区分；环节在 `bdinfo.json`（新版 `bdinfo_new.json`）里配，参考 PC。
- 交易信息：`pages/bidding/dealinfo`，改栏目号。
- 单位信息、消息提醒、银行卡、办事指南等。

**登录**
- 账号密码、短信（收费）。
- 扫码绑定：适用于插锁登录、没有 loginid 的用户；需要业务系统有生成二维码的 api。
- 标证通跳转登录。
- 扫脸：虹软 SDK，和标证通冲突，不建议做。

**专家**：在线考试 / 练习、评委请假、视频学习。

**开标大厅**由移动研发和不见面开标大厅的人员负责开发；**标证通**拿到项目参数后，在 ztb 和中间平台配置即可。

## 7. 项目对接流程

1. **立项**：发立项邮件，确定移动开发负责人；提供投标文件、合同、建设方案；申请服务器和外网资源；申请 iOS / 安卓 / 微信开发者账号（2–4 周）；做小程序或公众号还要申请 https 域名（2–5 天）。含开标大厅要部署 MQ，含文件预览要部署 officeweb。
2. **开发建设**：PC 功能先完善 → 提供 checklist（应用地址、svn、服务器远程方式）→ 和现场 SE 厘清功能边界 → 提供审批流程环节清单、开标过程清单 → SE 评审后由移动负责人排期。
3. **开发顺序**：部署完成 → 开通外网接口 → 提 UIUE 需求 → 接口开发 → H5 开发。
4. **上线**：应用商店上架或中间平台发布（网站挂二维码）、APP 备案、隐私协议；发上线约定邮件。
5. 需求要客户签单确认后才能提单开发；新增需求先和远程交付及 BU 负责人评估。

## 8. 常见问题

| 现象 | 排查 |
|---|---|
| 登录提示密码错误 | 先在 PC 标准入口试登录；检查 redis 是否开启、PC 和移动端（SOA）是否同一管道；全部账号都登不上时，看 SOA 和 EMP8 的日志 |
| 网站公告空白 | 网站侧改了栏目号 |
| 待办打开空白或报错 | 这个流程移动端是否对接过；mobileservice 日志里有没有 nosuchmethod / classnotfound（业务 jar 有变）；工作流「移动端」地址是否配置正确 |
| 点应用跳到 PC 鉴权页 | 配 `ejs_customuseragent`；升级 epoint-sso-authenticator 到 3.3.2 |
| 现场复现不了 | 用客户手机抓包，把报文发给移动开发 |

## 9. 微信小程序

- 需要备案的 https 域名。由客户（管理员）添加开发者、生成 AppSecret（禁止外泄，未经允许不能重置）、配置服务器域名和业务域名。
- `EpointMBXcx.properties`：APPID、SECRET、pictureurl（轮播图）。
- `appletmodule.json`：按角色配置常用应用（zhongxin、huiyuan11、huiyuan13、huiyuan18）。
- 图片放到服务器，避免单包超过 2M。
- 新做法（README）：
  1. 用 Gemini + Stitch 生成 html 设计稿，放到 `_doc_`；
  2. 让 AI 按 M8.4 知识库（`ai-m84-knowledge`）转成 pages 下的 vue；
  3. `npm run build` 后扫码调试。
