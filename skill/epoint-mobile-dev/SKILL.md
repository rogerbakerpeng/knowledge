---
name: epoint-mobile-dev
description: 新点（Epoint）EMP8 移动端（原生壳 + EJS + M8 跨端 H5） / 电子交易 App（一网通办、不见面开标、投标、竞价、CA 签名等）需求开发助手。用户给出一个移动端需求时使用：先判断需求类型（H5 页面 / EJS 接口 / 原生页面 / EMP8 菜单配置 / MQTT 实时 / CA 签章），再按新点混合开发的思路给出分步开发方案、需要改的文件、代码，并实际写代码。触发词：移动端需求、交易app、EJS、EMP8、H5 调原生、菜单配置、待办审批移动端、FMUI、frameztbv8、JSBridge、IBridgeImpl、开标大厅、手机盾、标证通专区。
---

# 新点 EMP8 移动端（交易 App）需求开发

用户给出一个移动端需求时，按本流程分析、开发并输出步骤。用户是新人，所以**每一步都要说明「做什么、改哪里、为什么」**，并配一张 ASCII 步骤图。

## 资源定位（跨机器复用，先做这一步）

本 skill 自带的 `references/architecture.md`、`references/delivery-8x.md` 已经包含全部核心结论，**即使下面的外部资源都找不到，也能按这两份文件工作**。外部资源只用于查细节，用下面三个占位符指代：

| 占位符 | 内容 | 怎么找 |
|---|---|---|
| `<DFX>` | 「dfx待分析」资料目录：cs0822.apk、电子交易APP基础学习资料、epoint-mrc-next-packages-ejsv4、m8-mobile-cross-platform、架构分析 html/md | ① 如果本 skill 放在 `<DFX>/epoint-mobile-dev/`，就取它的父目录；② 已知位置：Linux 虚拟机 `/mnt/hgfs/git/dfx待分析`，Windows `D:\git\dfx待分析`；③ 都不对时，搜索包含 `电子交易APP基础学习资料` 的目录；④ 还找不到就问用户 |
| `<M8DOC>` | M8 官方离线文档（m8mpdoc + ejs4mpdoc） | knowledge 仓库下的 `技术笔记/010-M8移动框架离线文档`（`https://github.com/rogerbakerpeng/knowledge`）。已知位置：`~/workspace/knowledge/knowledge-main/技术笔记/010-M8移动框架离线文档`。没有就提示用户 clone 或下载 zip |
| `<APKSRC>` | cs0822.apk 的 jadx 反编译源码 | 已知位置：`~/workspace/cs0822-src`。没有时可以用 jadx 反编译 `<DFX>/cs0822.apk`（`jadx -d <输出目录> cs0822.apk`，需要 JDK 17），或者直接用 references 里的结论 |

找不到的资源，在输出里说明「未找到 X，按 references 结论处理」，不要编造路径。

## 0. 背景知识（必须遵守的架构事实）

**三者关系：** EMP8 是整套平台（App 壳 + 服务端移动管理后台），EJS 是壳里的 H5 容器和 JSBridge，H5 是交易业务页面，跑在 EJS 里。

```
Android ─运行→ APK 壳（原生能力 + WebView/EJS）─装载→ H5（交易业务）
EMP8 后台（platform_url …/rest/mobile/）：登录、菜单/应用配置、门户、卡片、更新
交易业务系统：项目/投标/开标接口（H5 直接调用）
```

已从 cs0822.apk 反编译源码核实的事实（源码在 `<APKSRC>/sources/`）：

| 机制 | 事实 | 位置 |
|---|---|---|
| H5→原生 | H5 调 `prompt("EpointJSBridge://模块:port/方法?{json}")`，原生在 `onJsPrompt` 拦截；port 是回调 ID；URL 不能带 `#` | `c/e/i/l/e/g.java`、`com/epoint/ejs/jsbridge/JSBridge.java` |
| 校验 / 分发 | `JSBridgeAuth.callJava` → `JSApiEnable.canIUse`（白名单 `public_exposed_api`）→ `IBridgeImpl.callMethod` | `JSBridgeAuth.java`、`res/values/arrays.xml` |
| 回传 | `Callback.applySuccess/applyFail` → 主线程 `JSBridge._handleMessageFromNative`；Context 必须是 `FrmBaseActivity` 且未 finish | `Callback.java` |
| 自定义 API | `implements IBridgeImpl`，`RegisterName` + `provideMethodNames()` + `callMethod()` 里 switch 分发 | 模板 `com/epoint/app/plugin/TBEJSApi.java` |
| 注册 API | `AppApplication.l()` 里调用 `JSBridge.registerApi(Name, new Api())` | `com/epoint/workarea/AppApplication.java:148` |
| 插件 | `arrays.xml` 的 `plugin_provider` → 反射调用 `ApplicationLogic.onCreate()` → 注册 provider | `com/epoint/plugin/application/PluginApplication.java` |
| 跨模块调用 | `c.e.m.e.a.b().h(ctx, "sso.provider.serverOperation", {method:...}, cb)`；平台服务 `ICommonInfoProvider` | `c/e/a/r/p.java` |
| 路由 | `@Route(path="/activity/xxx")` + `PageRouter.getsInstance().build(path).navigation(ctx)` | 各 Activity |
| 菜单 | **在 EMP8 后台配置**，登录后拉取 `system/tablist`、`system/getportal`、`appcenter/getmyapplicationfornative`；菜单项 `ApplicationBean{h5url, android, minih5, params}`；点击时按 h5url → android → minih5 的顺序分发 | `c/e/a/w/f.java`、`c/e/a/z/m.java` |
| 实时 | MQTT Service 订阅 → EventBus → `webView.loadUrl("javascript:onReceiveMsg(msg,topic)")` | `com/epoint/app/bjm/service/MqttService.java`、`BJMMqEjsWebLoader.java` |
| CA | `mobileShieldNewApi`：applyUserCert / genUserCSR / signData / signDataP7 / priKeyDecrypt … | `com/epoint/app/plugin/MobileshieldNewApi.java` |
| 网络 | Retrofit + RxJava2，接口前缀 `platform_url`（目前是测试环境 `ywtb-test.gzggzy.cn/emp831_cs/rest/mobile/`） | `res/values/strings.xml` |

**H5 端 = M8 移动前端跨端框架（官方离线文档已核实）：**
- 文档根目录 `<M8DOC>/`
  - `m8mpdoc/`：框架文档。从 `$navigation.md` 找目录；重点看 `0001-前期准备`、`001-页面开发`、`003-典型案例`、`005-核心通用Util`、`009/017/018` 组件。
  - `ejs4mpdoc/pages/api_<模块>/api_<模块>.md`：EJS API；`EJS-API能力矩阵.md` 列出 148 个方法分别支持哪些端。
- **H5 的代码写法交给 skill `m8-mobile-cross-platform`**，路径 `<DFX>/m8-mobile-cross-platform/SKILL.md`；如果已安装就直接调用。它要求**先识别 M8.3（Vue2 / Vuex / router.js）还是 M8.4（Vue3 / Pinia / router.ts）**，再按对应版本写代码。它的 MCP 查询方式在离线时改为翻上面的文档目录。
- 要点：
  - 工程是 `ejs.m8.mobileframe`，模块放在 `src/pages/<模块>/`，包括 `.vue`、`router.js`（只写 path 和 style）、`store.js`、`mock.js`。
  - 全局配置在 `src/shared/config.js`：`serverUrl`、`env='native_uni'`（在 App 里跑）、`ajax.isAutoProxy`（自动带 token）、`isDebugPanel`。
  - 跳转用 `ejs.page.open({pageUrl, data})`，不要用 vue-router；原生能力用 `ejs.<模块>.<方法>({..., success, error})`；请求用 `Util.ajax`，返回的 `status.code===1` 表示成功，数据在 `custom` 里；列表用 `em-minirefresh`。
  - 命令：`npm install`（需连内网）→ `npm run dev:h5` → `npm run build`（产物 `dist/build/h5`，由交付人员部署得到 URL）；新点小程序用 `npm run build -- --moduleType=mp-epoint --moduleName=x --buildType=build|debug|upload`。
- **EJS 的功能都在 App 层实现**，ejsv4 只是 JS 桥（源码在 `<DFX>/epoint-mrc-next-packages-ejsv4/packages/ejsv4`：`src/core/nativejsbridge.ts`、`callnativeapi.ts`、`src/api/native/*.ts`、`types/*.d.ts`）。壳里没有的能力 → 必须走 C 类（改 App 并发版）。
- **H5 调用项目自定义模块**：`ejs.callApi({ mudule:'bjmejsapi', name:'startMqttService', data:{...}, success, error, isLongCb?:1, appVersion?:'x.y.z' })`。⚠ 参数名就是 `mudule`。返回 `code==0` 走 error，否则 `success(res.result)`。
  - 静态注册（原生在 `AppApplication.l()` 里调用 `registerApi`，本项目的 tbejsapi / bjmejsapi / mobileShieldNewApi 都是这种）：直接调用。
  - 动态注册：`ejs.config({ jsApiList:[{ 模块名: ejs.os.ios ? 'iOS类名' : 'Android类全名' }] })` → 原生 `EventApi.config` → `jsBridgeAuth.register` → ready 之后再调用。
  - 标准 API 用 `ejs.<模块>.<方法>`，不要用 callApi；非 EJS 环境要先用 `ejs.extendModule` 注册同名 API。
- 新增 C 类接口时，**同时给出 H5 端的 callApi 调用代码**，以及（可选的）`types` 声明。

**仍未核实（需要提示用户确认）：**
- H5 部署到哪台服务器、离线包流程（文档只说「交付人员上传服务器」）。

遇到这些内容时，先找 `<DFX>/` 下有没有用户导出的飞书文档。有就以文档为准；没有就在输出里标注「待确认」，不要编造。

**交付知识（8.0+ 部署拓扑、EMP8 配置清单、两种开发模式、接口 V7、标准模块个性化、对接流程、FAQ）见 `references/delivery-8x.md`，涉及后端、配置、审批、个性化的需求必须先读它。** 原始资料在 `<DFX>/电子交易APP基础学习资料/`。

完整的分析文档见 `references/architecture.md`。原生端细节用 Grep/Read 查 `<APKSRC>/sources/`；H5 端细节查 M8 离线文档。

## 1. 工作流程

### 第 0 步：理解需求并分类

先把需求拆成功能点，每个功能点按下表归类（一个需求可能同时属于多类）：

| 类型 | 判断依据 | 做法 | 需要发版吗 |
|---|---|---|---|
| A. H5 业务页面 | App 独有功能、PC 表单太复杂、列表 / 详情 / 查询 | M8 写 H5 + Rest 接口（V7 规范）+ EJS 调原生 | 否 |
| G. 待办审批 / PC 已有 Workflow 页 | 「移动端也要能审批 XX 流程」、PC 已有 List/Detail/Workflow | **FMUI + Action**：转换工具把 PC 页转成 FMUI → 复用 PC Action → 在工作流活动的「应用程序配置」里选 APP 并填地址 | 否 |
| H. 标准模块个性化 | 工作台、招标文件、交易信息、我要投标、我的项目和 PC 不一致 | **对齐 PC**：SQL、筛选、按钮、`WorkbenchPackages`、`WEBDB_CATEGROY` 栏目号、`bdinfo.json` | 否 |
| B. 菜单 / 入口 / 参数 | 新增入口、Tab、首页卡片、门户、角色权限、APP 参数 | EMP8：应用中心（应用 / 卡片）+ 首页管理（首页 / Tab / 门户）+ 角色授权 + 配置中心参数 | 否 |
| C. 新增 EJS 接口 | H5 需要壳里还没有的原生能力 | 写 `IBridgeImpl` + 注册 + 白名单 | **是** |
| D. 原生页面 | 登录、主框架、直播、扫码、强交互、性能敏感 | Activity(继承 FrmBaseActivity) + `@Route` + MVP | **是** |
| E. 实时消息 | 开标、竞价、解密进度、倒计时同步 | MQTT Service + EventBus → 推给 H5（参考 BJM） | 视情况 |
| F. CA / 签章 / 加解密 | 签名、加密投标文件、解密 | 复用 `mobileShieldNewApi` / 标证通，不要自己写 | 否（已有） |

先查壳里有没有现成能力，再决定是否要做 C 类：在 `<APKSRC>/sources/com/epoint/ejs/api/` 和各 `*EJSApi.java` 里 grep `provideMethodNames` 下的方法名。**能用 H5 加现有接口解决的，就不要动原生。**

### 第 1 步及之后：按类型生成开发步骤

先确认前置条件（见 `references/delivery-8x.md`）：
- **业务版本**：≥7.1.40.3 用 M8 基座；8.0 / 9.5 的移动端已合并到 PC，**接口和审批页和 PC 一样以 jar 包形式放在 tpframe（中心端）/ tpbidder（会员端）的 lib 里**，开发和个性化都按 PC 的方式（改业务工程、出 jar 替换）；7.x 写在 EpointMobileService。
- **建设模式**：落地 / 标证通专区 / 三方。
- **PC 端功能**是否已完善并测试通过。

标准主线是：**⓪ 准备环境 → ① 拿框架、建模块 → ② 写 Rest 接口（V7）+ M8 写页面并联调 → ③ 构建部署得到 URL → ④ EMP8 后台配菜单和权限 → ⑤ 重新登录 App 验证**。G / H / C / D / E 类作为分支插入。

#### G. 待办审批页（FMUI + Action）
1. 用转换工具把 PC 页面转成 FMUI：`http://218.4.136.118:8022/epoint-translate/pagetranslate/pageinfo/translatepageinfo`。没有网络时，参照已转好的页面手写，或让 AI 按已转页面总结出的规则批量转换。
2. 调 js、核对字段，和 PC 一致；PC 上的个性化控件需要删减或个性化实现。
3. 审批按钮用 workflow 标准页：`wf_approve_opinion` / `_back` / `_opinionpass` / `_opinionpre` / `wf_approve_qy*` / `wf_opinion_template`。
4. 页面放进 tpframe / tpbidder（8.0）或 EpointMobileService（7.x），并确认 `frame/fmui`、`workflow/` 资源已存在。
5. 工作流配置：在对应活动的「应用程序配置」里，移动端选 APP，填页面地址。一步审核不用配。
6. 验证：在 App 的待办里打开、提交、退回；空白或报错时按 delivery-8x.md 第 8 节排查。

#### H. 标准模块个性化（对齐 PC）
找到标准版 H5 路径（delivery-8x.md 第 6 节）和对应的后台 → 对照 PC 的 SQL、筛选条件、按钮、配置（`WorkbenchPackages`、`WEBDB_CATEGROY`、`bdinfo.json`）逐项对齐 → 数据、排序、字段和 PC 一致。

#### A. H5 页面（M8 框架）
1. **识别版本**：在目标工程里看 `package.json`，判断是 M8.3 还是 M8.4（按 `m8-mobile-cross-platform/references/version-detection.md`）。没有工程时，问用户用哪个版本，默认 M8.4 新项目。
2. 页面结构和业务接口清单：列出 URL、入参（统一包在 `params: JSON.stringify(...)` 里）、出参（`status.code` / `custom`）。
3. 建模块：`src/pages/<模块>/`，写 `router.js`（或 `.ts`）和 `.vue`，需要时加 `store` 和 `mock`。
4. 原生能力：先查 `ejs4mpdoc/EJS-API能力矩阵.md` 确认方法存在、支持 Android 和 iOS，再翻对应的 `api_<模块>.md` 拿准确参数。项目自定义模块（bjmejsapi、mobileShieldNewApi …）见第 0 节。
5. 写代码时按 `m8-mobile-cross-platform` 的版本范式。组件查 `m8mpdoc/009-UI组件`、`017-内置组件`、`018-EPUI组件`。
6. `npm run dev:h5` 联调（可以先用 mock）；在 App 里调试 WebView 用 `chrome://inspect`，或开 `Config.isDebugPanel`。
7. `npm run build` → `dist/build/h5` → 交付部署得到 URL。

#### B. 菜单配置（EMP8 后台，详见 delivery-8x.md 第 3 节）
1. **应用中心 - 应用管理**：新建应用，填名称、图标、类型（H5 / 原生 / 小程序）、地址、权限。原生入口填 `/activity/xxx`。
2. **应用中心 - 卡片管理** 或 **首页管理**（首页 / Tab / 门户）：挂载。门户有中心工作人员 / 交易甲方 / 交易乙方 / 代理机构 / 专家。
3. **角色授权**：中心、甲方 11、乙方 13、代理 18、专家。依赖「外部用户扩展」接口 getuserinfotoemp / getuserroletoemp。
4. 需要新参数时，在配置中心 - APP 参数里增加（`ejs_` 开头的会下发给 H5）。门户改了名字要同步改 `portal_role_relation`。
5. App 退出后重新登录（Tab 有缓存，缓存键是 `tab_list_<登录名>`）。

不出现时的排查：授权、缓存、门户挂载、外部用户扩展接口。

#### 新写 Rest 接口（A 类的后端部分）
- 遵循 V7：请求 `{"params":{小写参数}}`，响应 `{"status":{"code":1,"text"},"custom":{}}`。
- 路径用 `rest/frameztbv8/xxx`，这样 EMP8 会转调到业务后台。如果要覆盖框架自带的接口，要加进 `empfit_custom_api`。
- 匿名接口需要传 token，用 TokenUtils(emp8userext) 校验。
- 处理跨域（CORSFilter 放第一个；需要 token 时加 `Authorization`；M8 染色请求还要加 `User-Token` / `MobileFrame-Info`）。
- 写接口文档：名称、地址、请求示例、参数说明、返回示例、注意事项。

#### C. 新增 EJS 接口（照 TBEJSApi 写）
```java
public class XxxEJSApi implements IBridgeImpl {
    public static String RegisterName = "xxxejsapi";
    @Override public ArrayList<String> provideMethodNames() {
        ArrayList<String> l = new ArrayList<>(); l.add("doSomething"); return l;
    }
    @Override public void callMethod(String m, c.e.i.l.b container, EJSWebView wv,
                                     JSONObject p, Callback cb) {
        switch (m) { case "doSomething": doSomething(container, wv, p, cb); break; }
    }
    static void doSomething(c.e.i.l.b c, EJSWebView wv, JSONObject p, Callback cb) {
        new Thread(() -> {                     // 耗时操作放子线程
            try { /* ... */ cb.applySuccess(result); }
            catch (Exception e) { cb.applyFail(e.getMessage()); }
        }).start();
    }
}
// AppApplication.l(): JSBridge.registerApi(XxxEJSApi.RegisterName, new XxxEJSApi());
```
接着：开启鉴权时把方法加入 `public_exposed_api` 或后台白名单 → 打包 → H5 调用 → 验证。
多次回调用 `JSBridgeParamForCallback://` 参数；iframe 里调用要带 `callbackFunc` / `callbackIframeUUid`。

#### D. 原生页面
- `XxxActivity extends FrmBaseActivity`，加 `@Route(path="/activity/xxx")`。
- 写 `IXxx` 契约接口（View / Presenter / Model）+ `XxxPresenter` + `XxxModel`。
- Model 走 provider 总线或 Retrofit（前缀 `platform_url`）。
- 在 Manifest 注册。
- 入口二选一：后台菜单的 Android 入口填 `/activity/xxx`；或在 H5 里通过 EJS 打开。

#### E. 实时消息（参考 BJM）
- 新增 EJS 方法 `startXxxMqtt` / `stopXxxMqtt`，启动或停止 Service。
- Service 里订阅 topic，按「业务guid_用户guid」的规则命名。
- 收到消息后发 EventBus 事件 → WebLoader 用 `@Subscribe(MAIN)` 接收 → 调用 `javascript:onReceiveMsg(msg, topic)`。
- **start / stop 必须配对**，页面销毁时要停掉。

#### F. CA
直接调用 `mobileShieldNewApi` 的现有方法，明确证书申请、签名、解密的调用顺序，以及失败时的提示文案。

## 2. 输出格式（每次都按这个结构）

1. **需求理解**：一两句话复述需求，拆出功能点。
2. **分类结论**：用表格列出功能点、类型（A–F）、是否需要发版。
3. **步骤图**：用 ASCII 画「第0步 → 第1步 → 第2步 → 第3步」，分支用虚线标出。
4. **分步说明**：每一步写清做什么 / 改哪个文件或后台哪里 / 代码 / 为什么这样做。
5. **代码**：实际写出来。
   - 当前工作目录里有真实项目源码时，直接在项目里修改。
   - 没有项目源码时，在 `<DFX>/需求开发/<需求名>/` 下生成 H5 文件和 Java 文件，并说明应该放进工程的哪个位置。
6. **验证清单**：后台配置是否生效、重新登录、`chrome://inspect`、`adb logcat`（过滤 epoint）、环境切换 `ChangeEnvActivity`。
7. **风险和待确认**：列出未核实的点（后台字段、ejs.js 写法、接口地址），以及发版影响。

## 3. 规则

- 新人视角：术语第一次出现时用一句话解释，必要时用「类比微信」的说法（EMP8≈微信+后台，EJS≈内置浏览器+JS-SDK，H5≈公众号网页）。
- 优先级：**后台配置 > H5 > 复用现有 EJS 接口 > 新增 EJS 接口 > 原生页面**。越往后成本越高，并且需要发版。
- 不要编造后台菜单名、接口地址、ejs.js 的 API 名；不确定的明确标注「待确认」。
- 发版前提醒检查 `platform_url` 是不是测试环境。
- 用户给了真实项目代码或新文档时，以它们为准，并指出和本 skill 记录不一致的地方。
