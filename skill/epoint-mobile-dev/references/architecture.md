# cs0822.apk 移动端架构分析 & 交易 APP 新人开发指南

> 分析对象：`dfx待分析/cs0822.apk`（约 60MB）
> 分析方式：静态分析（AndroidManifest、dex 字符串、assets），并用 jadx 1.5.3 反编译，源码在 `~/workspace/cs0822-src/`
> 说明：代码经过混淆（大量 `c/e/a` 这样的类名），但新点（Epoint）框架的类名基本都保留了。文中的结论来自源码，标注为“建议”的内容是基于架构给出的开发实践。

---

## 1. 这是什么 App

| 项 | 内容 |
|---|---|
| 包名 | `com.epoint.workplatform.dzjy.ywtb`（电子交易 · 一网通办） |
| 框架 | 新点移动框架 EMP8，核心组件版本 ≥ 7.3.0（JSBridge 会校验） |
| 后端地址 | `platform_url = https://ywtb-test.gzggzy.cn/emp831_cs/rest/mobile/`（广州公共资源交易，**测试环境**） |
| 形态 | **混合开发**：原生壳负责登录、推送、MQTT、扫码、CA、签名、音视频；业务页面大多是 H5，通过 **EJS（Epoint JS Bridge）** 调用原生能力 |
| 入口 Application | `com.epoint.workarea.AppApplication` → `com.epoint.app.AppApplication` → `PluginApplication` → `FrmApplication` |

业务模块前缀：

| 前缀 | 含义 | 代表类 |
|---|---|---|
| BJM | 不见面开标 | `BJMEJSApi`、`bjm/service/MqttService`、`BJMMqEjsWebLoader`、`bjm/widget/fsp` |
| BID | 开标 | `BIDMqttService`、`BIDEJSActivity` |
| BZT | 标证通（CA 证书） | `BztCertService`、`BZTEntryActivity` |
| BYT / Jy | 项目定制的登录、设置 | `BYTLoginActivity`、`JyLoginPresenter`、`JyMainPresenter` |
| ZTB / JJ / TB | 招投标、竞价、投标相关接口 | `ZTBEJSApi`、`JJEJSApi`、`TBEJSApi` |

---

## 1.0 ⭐ 8.0+ 交付全景（来自「电子交易APP基础学习资料」）

> 详细内容见 `~/.claude/skills/epoint-mobile-dev/references/delivery-8x.md`。HTML 版有部署全景图、EMP8 配置清单、标准模块表和查漏补缺表。

```
APP(M8基座) → EMP8 运营平台（菜单 / 参数 / 角色；EmpFitMobileAPIFilter：rest/frameztbv8/ → 转调）
   → 8.0：tpframe(中心) / tpbidder(会员)  ← 移动端合并到 PC；7.x：EpointMobileService
   → epoint-sso（loginflow applogin）+ epoint-soa（注册 EMP8、APP 两个应用）
   → H5 资源 ejs.m7.bidding.v3（APP 参数 ejs_h5-pageurl）；按需部署开标大厅 + MQ、officeweb、oarest9
```

- **版本**：业务 ≥7.1.40.3 / 框架 ≥9.4.2-sp1 → M8 基座；**8.0 / 9.5 → 移动端合并到 PC**。「M8 基座」不等于「M8 跨端框架」。
- **建设模式**：落地型 / 标证通专区 / 接入第三方。
- **两种页面开发模式**：
  - **FMUI + Action**：PC 页面经转换工具转成 FMUI，复用 PC 的 Action，**待办审批页都用这种**，并在工作流活动里配置移动端地址；
  - **H5 + Rest**：用 M8 框架写页面，接口遵循 V7 规范。
- **EMP8 后台**：
  - 配置中心：EMP 参数（sso_*）、APP 参数（ejs_h5-pageurl、ejs_business-rest-url、portal_role_relation、bidlogin_show_flag、ejs_bidopening-*…）；
  - 外部用户扩展（getuserinfotoemp / getuserroletoemp）、角色（中心 / 甲方 11 / 乙方 13 / 代理 18 / 专家）；
  - 应用中心（应用 / 卡片）、首页管理（首页 / Tab / 门户）。
- **接口 V7**：`{"params":{小写参数}}` → `{"status":{"code":1,"text"},"custom":{}}`；TokenUtils(emp8userext)；跨域用 nginx 或 CORSFilter。
- **个性化核心原则**：App 数据和 PC 一致（对齐 SQL、筛选、按钮；工作台看 WorkbenchPackages，交易信息看 WEBDB_CATEGROY 栏目号，我的项目看 bdinfo.json）。PC 先完善，移动端再做。
- **对接流程**：立项 → 资源和账号（开发者账号 2–4 周）→ PC 先完善 → UIUE → 接口 → H5 → 上线（商店 / 备案 / 隐私协议）。

## 1.0.1 ⭐ EJS 全链路（ejsv4 JS 源码 ↔ APK 原生源码，已完整对上）

> JS 源码：`dfx待分析/epoint-mrc-next-packages-ejsv4/packages/ejsv4`（@epoint-mrc/ejsv4 4.2.23）。**EJS 的功能都在 App 层实现**，ejsv4 只是 JS 桥；壳里没有的能力，H5 调不到，必须改 App 并发版。

```
H5  ejs.callApi({ mudule:'bjmejsapi', name:'startMqttService', data:{…}, success, error })   ← 参数名就是 mudule
    ejsv4 core/callnativeapi.ts → inner/triggerjsbridge.ts（回调 id：短期 / 长期 isLongCb）
    ejsv4 core/nativejsbridge.ts → EpointJSBridge://模块:回调id/方法?encodeURIComponent(JSON)
         Android window.prompt(uri)（超过 5000 字符时分块走 setLongCache）；iOS WKWebViewJavascriptBridge.postMessage
App onJsPrompt → JSBridgeAuth.callJava → IBridgeImpl.callMethod → Callback.apply
    → JSBridge._handleMessageFromNative({responseId, responseData})
H5  responseData.code==0 → error(res)；否则 success(res.result)
```
- **静态注册**（项目里的 tbejsapi / bjmejsapi / mobileShieldNewApi）：原生在 `AppApplication.l()` 里调用 `JSBridge.registerApi`；H5 直接 `ejs.callApi`。
- **动态注册**：H5 调用 `ejs.config({ jsApiList:[{ 模块名: 'Android 类全名' }] })`（iOS 写类名）→ 原生 `EventApi.config` 执行 `jsBridgeAuth.register(key, Class.forName(value))` → ready 之后再 `ejs.callApi`。
- 标准 API 不要用 callApi 调（会丢掉兼容处理）；非 EJS 环境要先用 `ejs.extendModule` 注册同名 API。示例在 `showcase/showcase/ejsv4/ejs_api_v4_callapi.html`。

**8.0 补充**：移动端接口和审批页**和 PC 一样，以 jar 包形式放在 tpframe / tpbidder 的 lib 里**，个性化方式也和 PC 一致。

## 1.1 ⭐ 先看：H5、EJS、EMP8 是什么关系

**一句话：** EMP8 是整套平台（手机上的 App 壳 + 服务器上的移动管理后台），EJS 是 App 壳里专门用来跑 H5 的容器和接口层，H5 是交易业务页面，跑在 EJS 里面。三者一层套一层。

```
┌──────────────────────── EMP8（新点移动平台）────────────────────────┐
│  📱 App 壳（Android 原生）: 登录 · 推送 · MQTT · 扫码 · CA · 音视频    │
│     └─ EJS（WebView + JSBridge + 接口）                              │
│          └─ H5 页面（交易业务）── prompt(EpointJSBridge://) ─→ 调原生 │
│  🖥 EMP8 移动管理平台 /emp831_cs/rest/mobile/: 登录·用户·菜单配置·更新 │
│  🖥 交易业务系统: 项目·投标·开标 接口（H5 直接调用）                    │
└─────────────────────────────────────────────────────────────────────┘
```

| 新点 | 类比微信 | 作用 |
|---|---|---|
| EMP8 | 微信 App + 微信后台 | 整个平台：壳 + 服务端移动管理 |
| EJS | 内置浏览器 + JS-SDK（`wx.xxx`） | 让 H5 在 App 里跑，并能调用原生能力 |
| H5 | 公众号网页 | 写交易业务的地方 |

## 1.2 App 壳是什么

- 壳就是这个 APK 里用 Java 写的原生部分，**本身就运行在 Android 上**；它自己几乎不含交易业务，主要负责装载 H5。
- H5 是网页，不能直接跑在 Android 系统上，需要浏览器内核，壳里的 WebView 就充当这个内置浏览器。
- **为什么不全部写原生：** 改 H5 不用发版、用户无感更新；一份 H5 可以给 Android、iOS、鸿蒙共用；菜单可以在后台配置。
- **为什么不用手机浏览器直接打开：** CA 签名、MQTT 常驻连接、推送、扫码、直播、统一 token 都需要原生代码，所以由壳通过 EJS 开放给 H5。

```
Android 系统 ─运行→ APK（壳：原生能力 + WebView/EJS）─装载→ H5（交易业务）
```

## 1.3 菜单在 EMP8 后台配置（源码已核实）

```
EMP8 后台：① 新建应用(名称/图标/H5地址|Android入口|小程序) ② 挂到 Tab/门户/卡片 ③ 角色授权
   ▼ 登录后拉取（接口定义：c/e/a/w/f.java）
   system/tablist · system/getportal · system/getcardbyprotalguid · appcenter/getmyapplicationfornative
   ▼
   ApplicationBean { applicationname, imgurl, h5url, android, minih5, params }
   ▼ 点击：c/e/a/z/m.java d() 按顺序判断
     有 h5url → EJS 打开 H5 ｜ 有 android → PageRouter/类名 ｜ 有 minih5 → EPH5 小程序
```
菜单不出现时，先排查：没给角色授权 / Tab 缓存 `tab_list_<登录名>` 没刷新（重新登录）/ 挂错了门户。

## 1.3.1 H5 是怎么写的：M8 移动前端跨端框架（官方离线文档）

> 文档：`~/workspace/knowledge/knowledge-main/技术笔记/010-M8移动框架离线文档/`（m8mpdoc 框架文档 + ejs4mpdoc 的 148 个 EJS API）
> 官方架构图：`M8跨端架构图.png`（与本文件同目录）
> 配套 skill：`dfx待分析/m8-mobile-cross-platform/`（M8.3 / M8.4 的写法规范）

- **H5 用 M8 框架开发**（Vue + uni-app，工程名 `ejs.m8.mobileframe`），一套代码可以构建成 H5、H5-EJS、钉钉、微信小程序、支付宝小程序、新点小程序。
- 框架核心是三个 npm 包：`@epoint-mrc/em-components`（UI 组件，`em-` 开头，easycom 自动引入）、`@epoint-mrc/ejsv4`（EJS JSSDK，即 H5 里的 `ejs.xxx`）、`@epoint-mrc/utils`（`Util.ajax` 等）。依赖在公司内网的私有 npm 仓库。
- **两个版本**：M8.3 用 Vue2 + Vuex + webpack + `router.js`，Node 16；M8.4 用 Vue3 + Pinia + Vite + `router.ts`，Node 22。**开发前先确认是哪个版本。**

工程结构：
```
src/pages/<模块>/  list.vue  detail.vue  router.js(只写 path+style，构建时合并进 pages.json)  store.js  mock.js
src/shared/config.js   serverUrl / env('native_uni' 时加载 App 内的 ejs JSSDK) / ajax / token / isDebugPanel
src/shared/boot.js · src/static/(不编译) · manifest.json · pages.json
```

命令：`npm install`（需连内网）→ `npm run dev:h5`（浏览器 F12 调试）→ `npm run build`（产物在 `dist/build/h5`，交给交付人员上传得到 URL）；新点小程序用 `npm run build -- --moduleType=mp-epoint --moduleName=xxx --buildType=build|debug|upload`。

关键写法：
```js
// 跳转页面用 ejs.page，不要用 vue-router；参数在目标页的 onLoad(option) 里取
ejs.page.open({ pageUrl: './detail', data: { guid } });
// 原生能力统一用 success / error 回调
ejs.auth.getToken({ success(r) { r.access_token }, error(e) {} });
// 请求：Util.ajax 会自动带 token（Config.ajax.isAutoProxy，请求头 User-Token）
Util.ajax({ url: `${Config.serverUrl}/rest/detail`, data: { params: JSON.stringify({ guid }) } })
  .then(res => { if (res.status.code === 1) { /* 数据在 res.custom 里 */ } });
// 列表直接用 <em-minirefresh :url :request-data :change-data> 实现下拉刷新和分页
```

文档和 APK 源码互相印证：
| 官方文档（H5 端） | APK 反编译（原生端） |
|---|---|
| `ejs.auth.refreshToken({isForce, isAutoLogout})` | SSO 插件 `c/e/r/b/c.java` 读取 `isforce` / `isautologout` |
| EJS 各模块（auth / page / ui / device …） | `com/epoint/ejs/api/*Api.java` 逐个对应 |
| 能力矩阵的 Auth 列 | `JSApiEnable` + `public_exposed_api` 白名单 |
| `ejs.config({ jsApiList })`：key 是模块名，value 是原生类的包名 | `JSBridgeAuth.register(name, Class)` 动态注册自定义 API |
| `Config.env='native_uni'` | `onJsPrompt` 拦截 `EpointJSBridge://` |
| 构建 `--moduleType=mp-epoint` | 菜单项 `minih5` → EPH5 小程序 |

## 1.4 ⭐ 交易开发步骤

| # | 做什么 | 具体操作 |
|---|---|---|
| 0 | 准备环境（只需一次） | Node（M8.4 用 22，M8.3 用 16）、nvm、pnpm，VSCode 以管理员身份安装并装 EPOINT TOOLS，连公司内网 |
| 1 | 拿框架、建模块 | GitLab / SVN 拿 `ejs.m8.mobileframe` → `npm install` → 新建 `src/pages/<模块>/router.js` 和 `.vue`（先确认是 M8.3 还是 M8.4） |
| 2 | 写页面、联调 | 在 `config.js` 设置 `serverUrl` 和 `env`；`Util.ajax` 调接口；`ejs.*` 调原生；先用 mock，再 `npm run dev:h5` |
| 3 | 构建、部署 | `npm run build` → `dist/build/h5` 交给交付人员上传，得到 URL（做成新点小程序用 `--moduleType=mp-epoint`） |
| 4 | EMP8 后台配菜单 | 新建应用并填 H5 地址或 minih5 → 挂载 → 授权 |
| 5 | App 验证 | 重新登录 → 点菜单验证；用 `Config.isDebugPanel` 在手机上看日志 |
| 分支 | 缺原生能力 | 写 `IBridgeImpl` → 注册 → 白名单 → App 重新发版 |

```
第0步 需求分类 → 第1步 写 H5（调业务接口 + EJS 调原生）→ 第2步 EMP8 后台配菜单(应用/挂载/授权) → 第3步 重新登录 App 验证
                       └─ 分支：缺原生能力 → 写 IBridgeImpl + 注册 + 白名单 → App 重新打包发版
```

---

## 2. 整体分层架构

```
┌─────────────────────────────────────────────────────────────┐
│ H5 业务页面（服务端下发 / 离线包）                              │
│   prompt("EpointJSBridge://模块:port/方法?{json}")             │
├─────────────────────────────────────────────────────────────┤
│ EJS 容器层 com.epoint.ejs                                     │
│   EJSWebLoader / EJSWebView / WebChromeClient(onJsPrompt)     │
│   JSBridgeAuth(解析+鉴权) → JSApiEnable(白名单) → IBridgeImpl  │
│   框架 API: ui page runtime device storage io auth event ...  │
│   项目 API: tbejsapi bjmejsapi mobileShieldNewApi JJ BYT ...   │
├─────────────────────────────────────────────────────────────┤
│ 插件层（plugin_provider 数组 → 反射 ApplicationLogic.onCreate） │
│   app sso ui contact message ejs sm rongy baidumap            │
│   handwrite push speech                                        │
│   跨插件调用: c.e.m.e.a.b().h(ctx,"sso.provider.serverOperation",params,cb) │
├─────────────────────────────────────────────────────────────┤
│ 原生功能层                                                    │
│   页面 app/view  逻辑 app/presenter(MVP)  路由 PageRouter      │
│   登录/SSO  推送  MQTT  扫码  CA/手机盾  手写签名  定位  语音    │
├─────────────────────────────────────────────────────────────┤
│ 平台层 com.epoint.platform / core                              │
│   ICommonInfoProvider  INetworkProvider  ISecurityProvider    │
│   Retrofit + RxJava2 + OkHttp   MMKV   WCDB   Glide           │
└─────────────────────────────────────────────────────────────┘
```

### 2.1 第三方 SDK 一览

| 能力 | SDK |
|---|---|
| 网络 | Retrofit + RxJava2 + OkHttp（被混淆），Gson |
| 推送 | 腾讯 TPNS、华为 HMS、vivo 厂商通道 |
| 实时消息 | MQTT（Eclipse Paho），封装在 `com.epoint.mqttshell` |
| 音视频 / 直播 | 腾讯 LiteAV（`libliteavsdk.so`）、好视通 FSP（视频会议） |
| 扫码 | 华为 ScanKit |
| CA / 签名 | ccit mkeysdk、手机盾（`MobileshieldNewApi`）、标证通、手写签名板 |
| 定位 / 地图 | 百度地图 / 定位 SDK v7.5.3 |
| 语音 | 讯飞 MSC |
| 存储 | MMKV（键值存储）、WCDB（数据库） |
| UI | QMUI、BRVAH、Glide、Lottie、Matisse（图片选择）、ButterKnife |
| 下载 | OkDownload（liulishuo） |

---

## 3. 核心机制一：JSBridge（H5 调用原生）

### 3.1 调用协议

H5 调用 `prompt()`，传入一个约定格式的 URL：

```
EpointJSBridge://模块名:端口号/方法名?{json参数}
例：EpointJSBridge://tbejsapi:1001/getToken?{"loginId":"xxx"}
```

- **端口号（port）就是回调 ID**，原生返回结果时用它对应到 JS 里的回调函数。
- URL 里不能出现 `#`；`setItem` 方法的参数取第一个 `{` 之后的整段内容（`JSBridge.parseUrl`）。

### 3.2 执行链路

| 步骤 | 位置 | 做了什么 |
|---|---|---|
| ① 拦截 | `c/e/i/l/e/g.java:224`（继承 `WebChromeClient`） | 在 `onJsPrompt` 里把内容交给 `callJava()`，用 `jsPromptResult.confirm(...)` 同步返回 |
| ② 解析 | `JSBridge.parseUrl()` | 校验 scheme、核心版本 ≥ 7.3.0，拆出 `[port, 模块名, 方法名, 参数]` |
| ③ 校验 | `JSBridgeAuth.callJava()` + `JSApiEnable.canIUse()` | 检查白名单 `public_exposed_api`；域名鉴权开关 `ejs_auth_enable`（本包为 `0`，即关闭） |
| ④ 分发 | `JSBridge.callNewAndroidMethod()` | 先用 `provideMethodNames()` 校验方法存在，再调用 `callMethod()`；值为 `JSBridgeParamForCallback://` 的参数会被转成 Callback |
| ⑤ 回传 | `Callback.apply()` | 拼成 `{responseId: port, responseData}`，切到主线程执行 `evaluateJavascript("JSBridge._handleMessageFromNative(...)")` |

> 为什么用 `onJsPrompt` 而不是 `addJavascriptInterface`：Android 4.2 以下 `addJavascriptInterface` 有反射漏洞；`prompt` 能同步返回值，也便于统一鉴权和打日志（`recordJsApiCalled`）。

### 3.3 一个 API 的标准写法（来自 `com/epoint/app/plugin/TBEJSApi.java`）

```java
public class TBEJSApi implements IBridgeImpl {
    public static String RegisterName = "tbejsapi";              // H5 里用的模块名

    @Override public ArrayList<String> provideMethodNames() {    // 声明对外开放的方法
        ArrayList<String> l = new ArrayList<>();
        l.add("getToken"); l.add("login"); l.add("getCollections"); ...
        return l;
    }

    @Override public void callMethod(String m, b container, EJSWebView wv,
                                     JSONObject p, Callback cb) {
        switch (m) {
            case "login": login(container, wv, p, cb); break;
            ...
        }
    }

    static void login(b c, EJSWebView wv, JSONObject p, Callback cb) {
        PageRouter.getsInstance().build("/activity/loginaccount").navigation(wv.getContext());
        cb.applySuccess();
    }
}
```

注册位置在 `com/epoint/workarea/AppApplication.java:148`：

```java
@Override public void l() {          // PluginApplication 加载插件的钩子
    super.l();
    JSBridge.registerApi(MobileshieldNewApi.RegisterName, new MobileshieldNewApi());
    JSBridge.registerApi(TBEJSApi.RegisterName, new TBEJSApi());
}
```

`Callback` 常用方法：`applySuccess()` / `applySuccess(JSONObject|Map|Object)` / `applyFail(msg)` / `applyAuthError` / `applyNativeError`。

### 3.4 项目里自定义的 API

| 模块名 | 主要方法 |
|---|---|
| `tbejsapi` | getToken、login、getCollections、saveCollections、delCollection、isCollection、startWXPay |
| `bjmejsapi` | startMqttService、stopMqttService、startMQEJSWebLoader、playWithURL、showPlayer、hidePlayer、switchToVideoWithRowguid、joinFspMeeting、openMobileshield、ZtbAppSwitchPortal、gohome… |
| `mobileShieldNewApi` | applyEnterpriseCert、applyUserCert、genUserCSR、saveCert、signData、signDataP7、pubKeyEncrypt、priKeyDecrypt、getCertList… |
| JJ | getToken、startMqttService、stopMqttService |
| BYT | getDeviceInfo、cleanCache、switchUserType、switchUserIdentity |

---

## 4. 核心机制二：插件化 + 服务总线

`com/epoint/plugin/application/PluginApplication.java` 的流程：

1. 读取 `res/values/arrays.xml` 里的 `plugin_provider` 数组（12 个插件：app、sso、ui、contact、message、ejs、sm、rongy、baidumap、handwrite、push、speech）。
2. 用 `Class.forName` 加载每个插件。`ejs` 插件会**立即初始化**，其余插件稍后统一调用 `ApplicationLogic.onCreate()`。
3. 插件在 `onCreate` 里把服务注册到总线上：
   ```java
   // com/epoint/sso/plugin/ApplicationLogic.java
   c.e.m.e.a.b().d("sso", "provider", new SsoProvider());
   ```
4. 其他模块按 **"插件名.provider.操作"** 的字符串调用，不需要编译期依赖：
   ```java
   Map<String,String> m = new HashMap<>();
   m.put("method", "getToken"); m.put("loginid", id); m.put("password", pwd);
   c.e.m.e.a.b().h(ctx, "sso.provider.serverOperation", m, callback);
   ```
5. 平台级服务用接口注入：`(ICommonInfoProvider) c.e.l.c.a.a(ICommonInfoProvider.class)`，可以拿到用户信息 `q0()`、判断插件是否存在 `k("sso")`。

## 5. 核心机制三：PageRouter 路由 + MVP

- 页面用注解声明路由：`@Route(path = "/activity/loginpassword")`。编译期生成 `PageRouter_Root_*` / `PageRouter_Group_*` 路由表，共 50 多个路由。
- 初始化：`PageRouter.init(this, roots, "ui", "workplatform", "workarea")`。
- 跳转：`PageRouter.getsInstance().build("/activity/xxx").navigation(ctx)`。
- 项目定制：同一个功能注册新路由来覆盖，例如 `MainActivity` 用 `/activity/mainActivity/new`；也可以通过 `factorypool/PresenterPool_*` 替换 Presenter。
- 代码分层：`app/view/*Activity`（V）→ `app/presenter/*Presenter`（P）→ `c.e.a.r.*` Model（M）→ 插件 provider / Retrofit。

---

## 6. 典型功能链路

### 6.1 账号密码登录

```
LoginPasswordActivity (@Route /activity/loginpassword)
  → LoginPasswordPresenter.startLogin(pwd, extra)
    → Model c.e.a.r.p.n():  {loginid, password, encrypttype, method:"getToken"}
      → 服务总线 "sso.provider.serverOperation"
        → SSO 插件 c.e.r.b.c.invoke(): getToken / refreshToken / cancelToken / refreshAuthCode
          → Retrofit 接口 c.e.r.d.a:  POST mobileappclient/mobilelogin (form-urlencoded)
  ← 成功：getTabListAndRequestUserInfo() → "contact.provider.serverOperation" getuserinfo → 进入主页
  ← 失败：code 1001 走特殊分支（view.N()），其他情况提示错误
```

其他登录方式：短信（`LoginSmsValidate*`）、设备校验（`LoginDeviceCheck*`）、手势/指纹（`ui/component/lockpattern`、`lockfinger`）、人脸（`faceLogin`）、OAuth2（`/mobileoauth2login`）。

### 6.2 不见面开标：MQTT 实时消息 + 直播

```
H5 → bjmejsapi.startMqttService({biaoduanguid, userguid, uri, username, pwd, projectguid})
  → bjm/service/MqttService (Android Service)
     订阅 topic: [标段guid_用户guid, projectguid, 标段guid]   clientId: 标段guid_设备号
  → 收到消息 g(topic, msg) → EventBus 发事件 ("LiveControl" 或 "11111111")
  → BJMMqEjsWebLoader.onReceiveMsg() (@Subscribe MAIN)
     → webView.loadUrl("javascript:onReceiveMsg('msg','topic')")   ← 推给 H5
     → LiveControl 类消息：控制直播播放器（腾讯 LiteAV）
H5 → bjmejsapi.playWithURL / showPlayer / joinFspMeeting (好视通视频会议)
```

### 6.3 CA 签名（手机盾）

H5 → `mobileShieldNewApi.applyUserCert / genUserCSR / saveCert / signDataP7` → ccit mkeysdk。投标文件签名、加解密（`priKeyDecrypt`）都走这条路径。

---

## 7. 新人做交易 APP 开发：怎么上手

### 7.1 先判断需求属于哪一类

| 需求 | 做法 |
|---|---|
| 普通业务页面（列表、表单、详情） | **写 H5**，通过 EJS 调用原生能力，原生代码不用动 |
| H5 需要一个新的原生能力 | **新增 / 扩展 `IBridgeImpl`**，注册后加入白名单 |
| 必须原生实现的页面（登录、主框架、直播、扫码） | **新增原生 Activity + `@Route` + MVP** |
| 跨模块调用（拿 token、用户信息） | **走 provider 总线 / `ICommonInfoProvider`**，不要直接 import |
| 实时性业务（开标、竞价、解密进度） | **MQTT Service + EventBus → 推给 H5** |
| CA / 签章 / 加解密 | 复用 `mobileShieldNewApi` / 标证通，不要自己写 |

### 7.2 新增一个原生能力给 H5 用（最常见的任务）

1. 新建 `XxxEJSApi implements IBridgeImpl`，定义 `RegisterName`。
2. 在 `provideMethodNames()` 里列出方法，在 `callMethod()` 里用 switch 分发。
3. 耗时操作放到子线程执行，完成后调用 `callback.applySuccess/applyFail`（Callback 内部会切回主线程）。
4. 在 `AppApplication.l()` 里调用 `JSBridge.registerApi(...)` 注册。
5. 如果开启了 API 鉴权，需要在 `public_exposed_api` 或后台配置里放开这个方法。
6. H5 端：`ejs.callApi({ mudule:'xxxejsapi', name:'method', data:{...}, success, error })`。静态注册的直接调用；动态注册的先在 `ejs.config({ jsApiList })` 里声明，ready 之后再调用（见 1.0.1）。

### 7.3 新增一个原生页面

1. 新建 Activity，**继承框架的 `FrmBaseActivity`**（`Callback.checkContext` 要求 Context 是 `FrmBaseActivity`，否则回调直接丢弃）。
2. 加上 `@Route(path="/activity/xxx")`，再写 `IXxx` 契约接口和 Presenter、Model。
3. 在 AndroidManifest 里注册；跳转统一用 `PageRouter`。

### 7.4 踩坑清单（从源码里读出来的）

- JSBridge URL **不能带 `#`**，port 不能为空，核心版本必须 ≥ 7.3.0。
- 回调前先确认页面还在：Activity finish 之后回调会被丢弃（WebView 由 Callback 弱引用持有）。
- 多次回调（进度、监听）的参数要用 `JSBridgeParamForCallback://` 传，原生端会拿到一个独立的 Callback。
- iframe 里调用要带 `callbackFunc` / `callbackIframeUUid`，否则结果回不到 iframe。
- 后端地址在 `strings.xml` 的 `platform_url`，环境切换有 `ChangeEnvActivity`。**提交代码前确认不要带着测试地址发版。**
- MQTT Service 要配对调用 `start` / `stop`，页面退出时要停掉，否则会重复订阅、耗电。
- 插件只能通过字符串 provider 调用，**改了 provider 的 method 名字，所有调用方都要同步改**，编译期不会报错。

### 7.5 调试方法

- WebView：电脑上打开 Chrome `chrome://inspect` 调试 H5（需要 debug 包开启 WebView 调试）。
- 日志：`adb logcat`，过滤 `epoint`、`[epoint-mqtt]`；JSBridge 调用会写到 dailyrecords 本地日志。
- 小程序 / 卡片：框架自带 `Epth5CardDebugActivity`。
- 反编译对照：`~/devtools/jadx/bin/jadx-gui ~/workspace/cs0822-src`。

### 7.6 建议的学习路线

1. 跑通一个 EJS 页面：H5 → prompt → `callJava` → `IBridgeImpl` → `Callback` → H5。
2. 读 `PluginApplication` 和 `plugin_provider`，理解模块是怎么拼起来的、provider 总线怎么用。
3. 读登录链路：`LoginPasswordPresenter` → `c.e.a.r.p` → SSO 插件 → Retrofit。
4. 读一个实时业务：`BJMEJSApi.startMqttService` → `MqttService` → `BJMMqEjsWebLoader`。
5. 学定制套路：`app/project/*`、`Jy*`、`BYT*`，也就是“继承框架类 + 覆盖路由 / Presenter 工厂”。
6. **H5 端以 M8 离线文档为准**（`~/workspace/knowledge/knowledge-main/技术笔记/010-M8移动框架离线文档/`），配合 skill `m8-mobile-cross-platform`；EMP8 后台操作再向团队要文档。

---

## 附：关键文件索引（`~/workspace/cs0822-src/sources/`）

| 文件 | 作用 |
|---|---|
| `com/epoint/ejs/jsbridge/JSBridge.java` | API 注册表、URL 解析、方法分发 |
| `com/epoint/ejs/jsbridge/JSBridgeAuth.java` | `callJava` 主流程、鉴权、调用日志 |
| `com/epoint/ejs/jsbridge/Callback.java` | 原生 → H5 回传结果 |
| `com/epoint/ejs/jsbridge/JSApiEnable.java` | API 白名单 / 可用性判断 |
| `c/e/i/l/e/g.java` | WebChromeClient，`onJsPrompt` 拦截入口 |
| `com/epoint/plugin/application/PluginApplication.java` | 插件加载 |
| `com/epoint/workarea/AppApplication.java` | 项目 Application，注册 API、初始化路由 |
| `com/epoint/app/plugin/TBEJSApi.java` | 自定义 API 模板 |
| `com/epoint/app/project/plugin/BJMEJSApi.java` | 不见面开标 API |
| `com/epoint/app/bjm/service/MqttService.java` | 开标 MQTT 服务 |
| `com/epoint/app/bjm/view/BJMMqEjsWebLoader.java` | MQTT 消息推给 H5、直播控制 |
| `com/epoint/app/presenter/LoginPasswordPresenter.java` | 密码登录 |
| `c/e/r/b/c.java`、`c/e/r/d/a.java` | SSO provider、Retrofit 登录接口 |
| `resources/res/values/arrays.xml` | `plugin_provider`、`public_exposed_api` |
| `resources/res/values/strings.xml` | `platform_url`、`ejs_*` 配置 |
