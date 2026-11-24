# 文档更新日志
::: ifdef M84

## 20260317
- 发布`8.4.5`版本
    - 新功能(ejs.m8.componentization): 补充对齐PC的工程国际化方案 [`#1291`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1291)
    - 新功能(eui-components):新增日历、分割线组件；工作流tab新增tabs属性配置功能显隐 [`#1272`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1272) [`#1322`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1322)[`#1387`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1387)
    - 新功能(ejs.m8.mobileframe): themeManager新增动态添加切换主题能力 [`#1389`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1389)
    - 新功能(em-components): em-field组件新增脱敏功能 [`#1323`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1323)
    - 新功能(em-utils): 新增独立 sm2Util 构建并修复 sm2 Unicode 加解密 [`#1411`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1411)
    - 新功能(ejs.m8.mobileframe): 升级uniapp版本至最新正式版 [`#1302`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1302)
    - 新功能(vite-plugin-mccommon): mccommon打包eui组件库 [`#1386`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1386)
    - 修复问题(em-utils): 修复 Util 工程外使用报错问题 [`#1303`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1303)[`#1360`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1360)
    - 修复问题(em-utils): 修复 Util.ajax 在微信小程序下配置 headers 无效问题 [`#1398`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1398)
    - 修复问题(em-utils): 调整默认contentType与M82统一 [`#1403`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1403)
    - 修复问题(em-utils): 调整ajax参数合并逻辑，与M83保持一致 [`#1408`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1408)
    - 修复问题(ejs.m8.mobileframe): 微信端替换掉uni.getSystemInfo方法调用，避免警告 [`#1330`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1330)[`#1365`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1365)
    - 修复问题(ejs.m8.mobileframe): 修复build未排除mock资源时编译报错问题 [`#1353`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1353)
    - 修复问题(ejs.m8.mobileframe): 修复 vue 依赖提升防止构建build:common报错 [`#1393`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1393)
    - 修复问题(em-cli): 修复ep组件在组件化工程中导入问题 [`#1354`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1354)
    - 修复问题(em-cli): 修复微信小程序端异步分包中父子组件通讯异常问题 [`#1370`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1370)
    - 修复问题(ejsv4): 优化鸿蒙环境下钉钉与政务钉钉环境区分 [`#1376`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1376)
    - 修复问题(em-components): 修复下拉刷新与overlay一起使用时，列表会在overlay上闪现的问题 [`#1375`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1375)
    - 修复问题(em-components): 修复emField组件extra插槽与箭头重合问题 [`#1367`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1367)
    - 修复问题(em-components): 修复小程序端picker组件切换选项时报错问题 [`#1388`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1388)
    - 修复问题(em-components): 修复图片预览组件使用方式不能正常展示图片问题 [`#1385`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1385)
    - 修复问题(em-components): 选人优化只选部门空提示文字 [`#1382`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1382)
    - 修复问题(auto-scan-plugin): 添加对非 H5 EUI 不支持包的过滤功能，优化依赖包路径解析 [`#1399`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1399)
    - 修复问题(auto-scan-plugin): 添加开发监听模式支持，优化文件监听逻辑 [`#1405`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1405)
    - 修复问题(eui-components): 修复大量 EUI4.0 组件问题  [`#1289`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1289)[`#1293`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1293)[`#1305`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1305)[`#1325`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1325)[`#1341`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1341)[`#1346`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1346)[`#1345`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1345)[`#1357`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1357)
    - 代码重构(@epframe/eui-core-m): 调整core包中ep组件目录结构及导入路径 [`#1333`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1333)
    - 代码重构(@epframe/eui-core-m): 同步PC模型调整 [`#1366`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1366)


## 20251011
- 发布`8.4.4`版本
    - 新功能: 移动端支持 [统一编码模型开发模式](http://192.168.219.170/docs/vue/latest/frame/getting-started/use-data-model/#he_xin_API)
    - 新功能: 移动端支持 [组件化开发模式](http://192.168.219.170/docs/vue/latest/frame/mobile/guides/base/component-system/#wei_shi_mo_yao_zu_jian_hua)
    - 新功能: 移动端新增 [EUI4.0 UI 组件](//app.epoint.com.cn/m8mpdoc/?file=018-EPUI组件/0-介绍)

## 20250722
- 发布`8.4.3`版本
    - 新功能(vite-plugin-neui): m8.4移动前端框架支持构建 neui 新点小程序 [`#843`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/843)
    - 新功能(ejsv4): 更新发布ejsv4.2.21 [`#903`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/903)
    - 杂项(ejsv4): 完善ejs.config类型声明 [`#841`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/841)

## 20250624
- 发布`8.4.2`版本
    - 修复问题(em-components): 修复选人组件传入个性化接口时url不正确问题 [`#810`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/810)
    - 修复问题(em-components): 修复选人组件首次进入我的部门时ouguid未正常设置问题 [`#805`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/805)
    - 修复问题(em-components): 优化选人组件在部门下没有人员时的选择状态 [`#791`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/791)
    - 修复问题(em-components): 优化tab组件吸顶切换在微信小程序端过于卡顿问题 [`#809`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/809)
    - 修复问题(vue-cli-plugin-mc): 调色板组件点击完成不传递更新问题修复 [`#802`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/802)
    - 修复问题(em-components): 修复使用ejs方法多选文件时数据格式问题 [`#788`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/788)
    - 修复问题(ejsv4): 打包排除vant，修复pickDate切换datetime失效问题 [`#773`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/773)
    - 新功能(vite-plugin-mc): 新增小屏低码开发vite插件 [`#762`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/762)
    - 修复问题(vite-plugin-mccommon): 调整公共库适配低码设计器 [`#761`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/761)
    - 修复问题(em-rtc): 修复openVideo切换DOM失效问题 [`#760`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/760)
    - 修复问题(mobileframe): 修复H5端build构建后报错echarts为undefined问题 [`#759`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/759)
    - 修复问题(ejsv4): 鸿蒙环境与原生通讯不需要拆分长数据 [`#758`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/758)

## 20250328
- 发布`8.4.1`版本
    - 新功能(em-components): 新增跨端[表格](//app.epoint.com.cn/m8mpdoc/?file=009-UI组件/078-table表格)、[分页组件](//app.epoint.com.cn/m8mpdoc/?file=009-UI组件/023-pagination分页) [`#718`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/718)
    - 新功能(em-components): 选人组件应项目要求，usercount为-1时不展示人数 [`#744`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/744)
    - 修复问题(em-components): 修复field组件input的密码类型设置不正确问题 [`#736`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/736)
    - 修复问题(em-components): 选人组件修复多次点击搜索框返回异常问题 [`#735`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/735)
    - 修复问题(em-components): 修复第二次跳转下拉刷新页面时组件一直报错问题 [`#722`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/722)
    - 代码重构(em-components): 优化swipe组件监听事件逻辑 [`#720`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/720)
    - 修复问题(em-components): 修复下拉刷新组件安卓端软键盘弹出后不能正常上拉加载问题 [`#713`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/713)
    - 修复问题(em-components): 修复级联组件再次展开时 tab 样式异常问题 [`#717`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/717)
    - 新功能(ejsv4): 更新发布v4.2.20版本 [`#738`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/738)
    - 修复问题(ejsv4): 修复快速点击取消执行俩次问题，修复弹窗消失比遮罩阴影慢问题 [`#730`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/730)
    - 修复问题(ejsv4): 修复快速点击确定执行俩次问题 [`#729`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/729)
    - 修复问题(ejsv4): ejs.util.invokePluginApi新增isLongCb参数用于标识是否是长期回调 [`#723`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/723)
    - 修复问题(em-cli): 修复H5端build模式下引入Mock报错问题 [`#728`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/728)
    - 杂项(mobileframe): node 版本要求限制更新 [`#714`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/714)
    - 修复问题(em-rtc): rtc音视频组件兼容旧版本导入写法 [`#747`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/747)
    - 修复问题(em-rtc): rtc音视频组件修复共享屏幕视频流与主视频流共用一个userId导致渲染video异常问题 [`#739`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/739)
    - 修复问题(em-rtc): rtc音视频组件修复部分机型切换摄像头偶现无法正常播放情况 [`#724`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/724)
    - 杂项(em-rtc): rtc音视频组件优化rtc类型导出，方便ts项目导入使用 [`#746`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/746)
## 20250116
- 发布`8.4.0`版本
    - **发布移动前端框架 M8.4.0**
        - 杂项(mobileframe): 更新 uniapp 版本 [`#707`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/707)
        - 新功能(em-rtc): 融云音视频初始化新增customCMP及environment参数 [`#706`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/706)
        - 代码重构(mobileframe): 通过 pages.json 配置隐藏H5导航栏 [`#705`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/705)
        - 代码重构(mobileframe): 精简 main.ts 内容 [`#704`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/704)
        - 修复问题(em-cli): 修复异步分包引入其他异步分包组件无法正常加载问题 [`#702`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/702)
        - 新功能(em-components): 图表组件新增getEcharts方法用于获取echarts变量 [`#701`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/701)

-   文档更新
    - 在线文档默认展示 M8.4 版本文档

## 20250103
- 发布`8.4.0-beta.11`版本
    - 修复问题(em-components): 完善组件默认文字语言切换 [`#696`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/696)
    - 修复问题(em-components): 修复图片预览缩放后与滑动切换手势冲突问题 [`#692`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/692)
    - 修复问题(em-components): 优化日期选择组件pad端样式 [`#675`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/675)
    - 新功能(em-rtc): 新增replayRemote方法重新播放远端资源 [`#670`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/670)
    - 修复问题(em-rtc): 修复muteLocal总是走错误回调问题 [`#690`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/690)
    - 杂项(em-rtc): 更新升级最新融云sdk版本 [`#678`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/678)
    - 杂项: 更新 uniapp 依赖版本 [`#685`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/685)

## 20241217
- 发布`8.4.0-beta.10`版本
    - 修复问题(em-components): 完善选人组件多维组织架构下搜索框显隐逻辑 [`#668`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/668)
    - 新功能(em-rtc): 新增getMediaDevices方法获取设备列表 [`#659`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/659)

## 20241205
- 发布`8.4.0-beta.9`版本
    - 杂项(types): 补充 type 版本提升文件 [`#655`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/655)
    - 新功能(em-rtc): 新增cameraOpt用于配置视频分辨率等配置项 [`#647`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/647)
    - 新功能(em-cli): 支持 H5 构建后自动生成 zip 功能 [`#651`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/651)
    - 修复问题(ejsv4): 修复两次调用confirm时，第二次弹窗无法正常展示问题 [`#649`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/649)
    - 修复问题(em-components): 修复 uploader 组件部分事件参数中 index 不正确问题 [`#640`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/640)
    - 修复问题(em-components): tabs组件优化未选中任何tab时的状态 [`#636`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/636)


## 20241108
- 发布`8.4.0-beta.8`版本
    - 修复问题(em-components): 修复附件上传多选时afterRead参数不对问题 [`#617`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/617)
    - 修复问题(em-components): 优化全屏图片预览指定索引时闪现第一个元素的问题 [`#615`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/615)
    - 修复问题(em-components): 修复ImagePreview传参string[]报错问题 [`#616`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/616)


## 20241106
- 发布`8.4.0-beta.7`版本
    - 修复问题(em-components): 修复附件上传组件修改文件加载状态失效问题 [`#609`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/609)
    - 新功能(em-components): field组件新增requiredBefore属性用于切换必填标识位置 [`#610`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/610)
    - 修复问题(em-utils): 修复Util.ajax默认请求方法不是POST问题 [`#611`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/611)

## 20241105
- 发布`8.4.0-beta.6`版本
    - 修复问题(em-components): 修复picker滚轮未触发change事件问题，修复日期选择问题 [`#604`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/604)
    - 新功能(mobileframe): 新增lockTokenDuration配置项用于自定义token锁定时长 [`#603`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/603)
    - 修复问题(mobileframe): postcss配置排除H5端基础组件样式单位转换，修复textarea自适应高度失效问题 [`#601`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/601)


## 20241025
- 发布`8.4.0-beta.5`版本
    - 新功能(mobileframe): npm install 时对 nodejs 版本检查 [`#594`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/594)
    - 修复问题(em-utils): 优化Util.ajax回调，兼容拦截器中已处理返回数据的情况 [`#593`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/593)
    - 修复问题(mobileframe): 更新uniapp版本至3.0.0-4020920240930001 [`#589`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/589)
    - 新功能(em-cli): router文件新增options.exclude字段控制是否排除该模块编译 [`#588`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/588)


## 20241015
- 发布`8.4.0-beta.4`版本
    - 杂项(其他): 更新日志添加types变动 [`#586`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/586)
    - 杂项(其他): 添加更新日志 [`#585`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/585)
    - 杂项: 更新.npmrc 文件 [`#581`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/581)


## 20241014
- 发布`8.4.0-beta.3`版本
    - 杂项(ejsv4): 优化ejs.util模块加解密方法示例 [`#574`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/574)
    - 修复问题(em-utils): 修改axios版本，修复微信小程序平台报错问题 [`#571`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/571)
    - 新功能(em-cli): dev模式下新增em-components及Util库的热更新 [`#570`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/570)
    - 新功能(em-cli): 去除 uniapp 构建后广告提示 [`#569`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/569)
    - 修复问题(em-cli): 修复nodev22版本报错问题 [`#567`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/567)
    - 修复问题(em-cli): mock引入兼容js文件 [`#566`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/566)

## 20240912

- 发布`8.4.0-beta.2`版本
    - 修复问题(em-cli): 修复 dev 命令指定模块路由问题 [`#563`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/563)
    - 杂项(mobileframe): 更新rtc版本号为0.0.10 [`#561`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/561)
    - 修复问题(em-components): 图片变量名避开关键字，修复支付宝异步分包报错 [`#562`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/562)
    - 新功能(ejsv4): 发布@epoint-mrc/ejsv4@4.2.19-beta.2版本 [`#560`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/560)

## 20240911

- 发布`8.4.0-beta.1`版本
    - 发布移动前端框架 `M8.4.0-beta.1` 初始 beta 版本

::: endif
::: ifdef M83

## 20260325
-   更新`8.3.25`版本
    - 修复问题(vue-cli-plugin-mc): 修复this.$refs获取不到列表布局容器子组件的bug，改为使用.$children获取 [`#1395`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1395)
    - 修复问题(vue-cli-plugin-mc): 修复this.$refs获取不到列表布局容器子组件的bug，改为使用.$children获取(丁昊) [`#1394`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1394)
    - 修复问题(em-cli): 修复微信小程序端异步分包中父子组件通讯异常问题 [`#1384`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1384)
    - 修复问题(em-components): 选人优化只选部门空提示文字 [`#1383`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1383)
    - 修复问题(vue-cli-plugin-mc): 修复本地构建renderData赋值不生效的bug [`#1377`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1377)
    - 修复问题(em-components): 修复下拉刷新与overlay一起使用时，列表会在overlay上闪现的问题 [`#1374`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1374)
    - 修复问题(vue-cli-plugin-mc): 修复mccommon获取ref报错的问题 [`#1372`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1372)
    - 修复问题(em-components): 修复field脱敏数据初始为空时不能触发必填校验问题 [`#1358`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1358)
    - 修复问题(em-components): 修复windows端附件上传点击无反应问题 [`#1397`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1397)
    - 修复问题(em-utils): 修复 sm2 对 unicode 字符加解密 [`#1415`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1415)

## 20251125
-   更新`8.3.24`版本
    - 新功能(em-components): form表单新增脱敏功能 [`#1321`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1321)
    - 新功能(vue-cli-plugin-mc): 列表布局容器嵌套列表布局容器pdata取值 [`#1319`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1319)
    - 修复问题(vue-cli-plugin-mc): 小屏依赖更新 [`#999`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/999)
    - 修复问题(vue-cli-plugin-mc): 更新小屏依赖，列表布局容器行加上overflow控制 [`#997`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/997)
    - 修复问题(vue-cli-plugin-mc): 修复本地构建布局容器状态背景图片不显示的bug [`#940`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/940)
    - 修复问题(vue-cli-plugin-mc): 低码模块，修复positionStyle的width丢失问题，修复mc:ajax-finally事件不触发的问题 [`#892`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/892)
    - 修复问题(em-components): 下拉刷新组件隐藏滚动条 [`#879`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/879)
    - 修复问题(em-components): 1、iOS接收短信自填充时会自动删除一位；2、扫码调试体验版时键盘type类型不会变化 [`#1328`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1328)
    - 修复问题(vue-cli-plugin-mc): 修改出码后页面背景图地址不正确的问题 [`#1344`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1344)
    - 修复问题(em-components): EJS容器内部可使用EJS API截图的二维码 [`#1332`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1332)
    - 修复问题(vue-cli-plugin-mc): 加上popGridContainer布局容器支持 [`#1342`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1342)
    - 修复问题(em-components): 多个range示例在同一时间触发可导致未能同时展示 开始与结束时间 [`#1329`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1329)
    - 修复问题(vue-cli-plugin-mc): 修改布局容器背景图路径有特殊字符无法显示的bug [`#1335`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1335)
    - 修复问题(em-components): minirefresh报错问题 [`#1327`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1327)
    - 修复问题(vue-cli-plugin-mc): 修改height: defaultConfig.dimension.width、height取值问题 [`#1294`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1294)
    - 修复问题(vue-cli-plugin-mc): 修复triggerDataFilter函数一处bug [`#1192`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1192)
    - 修复问题(vue-cli-plugin-mc): 修复列表布局容器下拉刷新重复渲染的bug [`#1067`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1067)
    - 修复问题(em-components): 修复附件上传国际化及列表icon样式问题 [`#1048`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1048)
    - 修复问题(em-components): 部分英文文本开头大写 [`#1031`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/1031)

## 20250627
-   更新`8.3.23`版本
    - 修复问题(em-components): 下拉刷新在异步分包时报错listData未定义问题，添加update:listData事件兼容 [`#823`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/823)
    - 修复问题(em-components): 优化tab组件吸顶切换在微信小程序端过于卡顿问题 [`#808`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/808)
    - 修复问题(em-components): 修复选人组件传入个性化接口时url不正确问题 [`#811`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/811)
    - 修复问题(em-components): 修复选人组件首次进入我的部门时ouguid未正常设置问题 [`#804`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/804)
    - 修复问题(em-components): 优化选人组件在部门下没有人员时的选择状态 [`#792`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/792)
    - 修复问题(em-components): 修复使用 ejs 方法多选文件时数据格式问题 [`#787`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/787)
    - 修复问题(em-components): 优化grid组件获取宽度时机，避免无法正常展示 [`#748`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/748)
    - 修复问题(em-components): 选人组件usercount为-1时不展示人数 [`#745`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/745)
    - 修复问题(em-components): 修复 field 组件 input 的密码类型设置不正确问题 [`#737`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/737)
    - 修复问题(em-components): 修复选人组件多次点击搜索框返回异常问题 [`#734`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/734)
    - 修复问题(em-utils): 修复 ejs 容器无法使用 sse 流式请求问题 [`#731`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/731)
    - 修复问题(em-components): 修复第二次跳转下拉刷新页面时组件一直报错问题 [`#721`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/721)
    - 杂项(em-components): 优化部分组件代码写法 [`#719`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/719)
    - 修复问题(em-components): 修复下拉刷新组件安卓端软键盘弹出后不能正常上拉加载问题 [`#712`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/712)
    - 修复问题(em-components): 修复级联组件再次展开时 tab 样式异常问题 [`#716`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/716)
    - 新功能(em-components): 新增跨端[表格](//app.epoint.com.cn/m8mpdoc/?file=009-UI组件/078-table表格) [分页组件](//app.epoint.com.cn/m8mpdoc/?file=009-UI组件/023-pagination分页) [`#711`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/711)
    - 修复问题(em-cli): 修复异步分包引入其他异步分包组件无法正常加载问题 [`#703`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/703)
    - 新功能(em-components): 图表组件新增getEcharts方法用于获取echarts变量 [`#700`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/700)
    - 修复问题(em-components): 组件库默认文字语言切换支持动态切换 [`#695`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/695)
    - 修复问题(em-components): 修复图片预览缩放后与滑动切换手势冲突问题 [`#691`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/691)
    - 修复问题(mobileframe): 升级uni-ui版本，修复uni-section报错未找到问题 [`#682`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/682)
    - 修复问题(em-components): 优化日期选择组件pad端样式 [`#676`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/676)
    - 修复问题(em-components): 完善选人组件多维组织架构下搜索框显隐逻辑 [`#667`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/667)
    - 新功能(vue-cli-plugin-mc): 本地构建数据源加上指标工厂类型接口 [`#801`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/801)
    - 修复问题(vue-cli-plugin-mc): 修复公司参数入参动态绑定替换问题 [`#803`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/803)
    - 修复问题(vue-cli-plugin-mc): 组件未触发mounted导致其他事件不触发的问题，加上warning提示 [`#742`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/742)
    - 修复问题(vue-cli-plugin-mc): 加上粘性定位特殊样式处理方法 [`#715`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/715)
    - 修复问题(vue-cli-plugin-mc): 优化隐藏被return掉的组件后续接口调用问题 [`#679`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/679)
    - 修复问题(vue-cli-plugin-mc): 更新列表布局容器代码 [`#669`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/669)
    - 修复问题(vue-cli-plugin-mc): 修复triggerDataFilter函数中错误的深拷贝导致spansData为空值的问题 [`#660`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/660)

## 20241204
-   更新`8.3.22`版本
    - 新功能(em-cli): 支持小屏低码应用构建时自动读取 ejsapi 配置文件 [`#646`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/646)
    - 新功能(em-utils): 新增ajax配置项lockTokenDuration用于自定义锁定时长 [`#602`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/602)
    - 修复问题(em-components): 修复附件上传多选时 afterRead 参数不对问题 [`#645`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/645)
    - 修复问题(em-components): 修复附件部分事件参数中 index 不正确问题 [`#639`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/639)
    - 修复问题(em-components): tabs 组件优化未选中任何tab时的状态 [`#635`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/635)
    - 修复问题(em-components): 修复附件上传修改文件加载状态失败问题 [`#608`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/608)

-   文档更新
    - 在线文档顶部新增 UI 组件 M8.3 和 M8.4 的示例切换功能，对应 `选项式` 与 `组合式` 两种模式切换

## 20241109
-   更新`8.3.21`版本
    - 修复问题(vue-cli-plugin-mc): 修复小屏低码布局容器组件定位配置不生效的问题 [`#590`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/590)


## 20240903

-  新增FAQ: 安装依赖时 @epoint-mrc/ejsv4 报错 sha512 校验失败处理FAQ [code EINTEGRITY 报错](https://app.epoint.com.cn/m8mpdoc/?file=014-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98/install#npm%20install%20%E4%BE%9D%E8%B5%96%E5%AE%89%E8%A3%85%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98)

## 20240902
-   更新`8.3.20`版本
    - 新功能(em-cli): H5多模块打包时支持指定静态资源 [`#530`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/530)
    - 修复问题(em-components): 优化scss格式修复postcss编译报错 [`#520`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/520)
    - 修复问题(em-components): 同步处理下拉刷新H5端内存泄漏问题 [`#515`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/515)
    - 修复问题(em-utils): 超出token刷新次数时，不使用ejs时仍走自定义的refreshTokenCountExceeded [`#499`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/499)
    - 修复问题(em-components): 优化同步选人首页样式 [`#497`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/497)

## 20240830
-   新增 [M8风格指南规范](//app.epoint.com.cn/m8mpdoc/index.html?file=002-规范与模式/003-style-guide) 章节


## 20240731
-   更新`8.3.19`版本
    - 新功能(em-components): 同步M8.2最新选人功能 [`#491`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/491)
    - 新功能(em-components): popover 组件新增 closeOnTouchmoveOutside 属性、 trigger 属性和展示优化 [`#484`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/484)[`#483`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/483)[`#472`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/472)
    - 新功能(em-components): minirefresh 新增 noMoreSize 属性用于设置多少数据时才显示无更多数据提示 [`#479`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/479)
    - 修复问题(em-components): 修复日期选择组件选项展示错误问题 [`#482`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/482)
    - 修复问题(em-components): 修复支付宝小程序端 field 组件在类型为 digit、number 时无法输入数字问题 [`#481`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/481)
    - 修复问题(em-components): 修复下拉刷新组件在微信小程序端偶现的downImmediatePull设置失效问题 [`#478`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/478)
    - 修复问题(em-components): 修复dialog异步关闭时无法切换loading状态问题 [`#476`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/476)
    - 修复问题(em-components): dropdown-item下拉选项较多时滚动展示全部选项 [`#475`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/475)
    - 修复问题(em-components): 修复tabs组件 滚动导航与 putaway 同时使用时失效问题 [`#474`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/474)
    - 修复问题(em-components): 修复picker组件级联的子级展示错误问题 [`#473`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/473)
    - 修复问题(em-components): 修改grid及拖拽排序组件实现逻辑，优化体验 [`#471`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/471)
    - 修复问题(em-components): 优化复选框组默认值设置 [`#466`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/466)
    - 杂项(mobileframe): 优化icon组件示例样式 [`#469`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/469)

## 20240612
-   更新`8.3.18`版本
    - 修复问题(em-utils): util.ajax sse 流式请求优化报错处理 [`#464`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/464)
    - 新功能(em-rtc): rtc新增是否是屏幕分享流字段isScreenShare [`#463`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/463)
    - 修复问题(em-components): 修复iphone8 ios13.3.1出现弹窗不展示问题 [`#462`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/462)
    - 修复问题(mobileframe): 固定postcss版本，修复设置横屏转换时postcss编译报错问题 [`#461`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/461)
    - 修复问题(em-components): 修复field组件滚动穿透问题，修复快速调用popup无法再弹出问题 [`#460`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/460)
    - 修复问题(em-components): 修复field输入框微信小程序端切换密码显隐出现的异常清空与切换失效问题 [`#459`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/459)
    - 修复问题(em-utils): util.ajax h5 sse 请求支持取消 [`#453`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/453)
    - 修复问题(em-components): 修复日期选择组件展示的默认选中项错误问题，修复切换到0时分自动跳到最小时间的问题 [`#450`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/450)
    - 修复问题(em-components): 修复 actionSheet 组件 closeIcon 参数设置无效问题 [`#451`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/451)

## 20240513
-   更新`8.3.17`版本
    - 新功能(em-utils): util新增获取节点信息相关API [`#435`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/435)
    - 新功能(em-utils): util.ajax 支持 SSE 流式请求响应 [`#440`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/440)
    - 修复问题(em-components): 修复swipe轮播item-click事件触发两次问题 [`#446`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/446)
    - 修复问题(em-components): 修复下拉刷新组件refresh后首次上拉页码不正确问题 [`#444`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/444)
    - 修复问题(em-components): ejsui组件添加load事件优化开启异步组件时ejsui模块调用失败问题 [`#447`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/447)
    - 修复问题(em-components): 修复 em-tabs 组件销毁时无法释放内存问题 [`#428`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/428)
    - 修复问题(em-components): 修复radio及checkbox在label过长时icon宽度缩小问题 [`#415`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/415)
    - 文档(em-components): 音视频文档补充异步操作说明 [`#442`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/442)


## 20240326
-   更新`8.3.16`版本

    - 新功能(em-components): 附件上传新增 from 字段标识图片来源是相机还是图库 [`#411`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/411)
    - 新功能(mobileframe): 条件编译支持 ejs 环境 [`#394`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/394)
    - 新功能(em-components): header导航栏组件新增click-left-back属性控制点击左上角按钮是否自动返回 [`#380`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/380)
    - 新功能(em-components): 附件上传组件新增后缀名校验功能 [`#376`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/376)
    - 修复问题(em-components): 修复微信小程序ios端真机面包屑导航高度异常问题 [`#409`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/409)
    - 修复问题(em-components): 修复图片路径变化后仍展示错误状态的问题 [`#408`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/408)
    - 修复问题(em-components): 优化H5环境下插入input部分逻辑 [`#407`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/407)
    - 修复问题(em-components): 修复result-type为dataUrl时预览文件名显示不正确问题 [`#403`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/403)
    - 修复问题(em-components): 修复跨端ejs.ui.pickDateTime选项计算问题 [`#393`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/393)
    - 修复问题(em-components): 修复图片预览 cover 插槽问题 [`#392`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/392)
    - 修复问题(mobileframe): 优化checkbox示例代码，与文档保持一致 [`#391`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/391)
    - 修复问题(mobileframe): 去掉默认的全局标题文字，避免标题文字闪现uni-app [`#389`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/389)
    - 修复问题(em-components): 优化 field 组件 readonly 逻辑；修复 datepicker 组件类型默认值报错问题。 [`#385`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/385)
    - 修复问题(em-utils): 优化 getToken 失败无需导致 Util.ajax 请求失败 [`#384`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/384)
    - 修复问题(em-components): 修复grid安卓端换行问题 [`#382`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/382)
    - 修复问题(em-components): 修复tab进行v-if切换时顺序不对问题 [`#381`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/381)
    - 修复问题(em-components): 修复ejs.ui.dialog方法在支付宝小程序中按钮之间没有间距问题 [`#378`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/378)
    - 修复问题(em-cli): pages.router.json 不存在时进行提示 [`#375`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/375)
    - 修复问题(em-components): 修复dropmenu在不使用默认导航栏时样式异常问题 [`#372`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/372)
    - 修复问题(em-components): 修复 tabs 组件初始化时导航未滚动至指定标签问题，修复 value 为空字符串时 dropmenu 选中项标题展示不出来问题 [`#371`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/371)
    - 修复问题(em-components): 下拉组件item增加隐藏下拉项与菜单配置 [`#369`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/369)
    - 修复问题(em-components): 修复tabs选中后导航未滚动问题，修复dropdownmenu组件v-model失效问题 [`#368`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/368)
    - 修复问题(vue-cli-plugin-mc): 修复低码平台构建源码更新接口数据问题 [`#366`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/366)
    - 修复问题(em-components): 修复dialog组件message渲染html标签问题 [`#367`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/367)
    - 杂项(ejsv4): 修改ejs版本号，发布ejsv4.2.16版本 [`#386`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/386)


## 20240103
-   更新`8.3.15`版本
    - 新功能(em-cli): 模块下的路由配置文件支持条件编译 [`#346`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/346)
    - 新功能(em-cli): 新增自定义组件的异步化分包目录功能 [`#343`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/343)
    - 修复问题(em-cli): 修复构建时临时路由文件报错问题 [`#361`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/361)
    - 修复问题(em-cli): 修复构建H5时js文件名过长的问题 [`#356`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/356)
    - 修复问题(em-cli): 修复pages.json中条件编译失效问题 [`#350`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/350)[`#359`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/359)
    - 修复问题(em-cli): 修复打包成微信小程序分包时，作用域插槽生成的组件json内路径不是相对路径问题 [`#353`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/353)
    - 修复问题(em-cli): 当Config.env设置为空时，不引入全局ejs变量 [`#351`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/351)
    - 修复问题(em-cli): 修复打包成分包时，异步化分包报错的问题 [`#342`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/342)
    - 修复问题(em-components): 修复field组件支付宝小程序安卓端输入时闪烁问题 [`#358`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/358)
    - 修复问题(em-components): 修复tab在微信小程序中无法横向滚动问题 [`#357`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/357)
    - 修复问题(em-components): 修复图片预览初始化报错问题 [`#349`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/349)
    - 修复问题(em-components): 修复部分跨端组件缺陷 [`#344`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/344)
    - 文档(em-components): 补充音视频faq [`#345`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/345)


## 20231113
-   更新`8.3.14`版本
    - 新功能(em-utils): Util.upload支持空附件上传 [`#330`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/330)
    - 修复问题(mobileframe): 根据配置动态引用剥离的config.js文件 [`#323`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/323)
    - 修复问题(mobileframe): 修复选人组件在异步化分包时报错问题 [`#322`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/322)
    - 修复问题(em-components): 优化插槽传参 [`#339`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/339)
    - 修复问题(em-components): 修复search组件在微信小程序端无法输入的问题 [`#321`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/321)
    - 修复问题(em-utils): 优化染色体请求头判断逻辑 [`#338`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/338)
    - 修复问题(em-utils): 修复支付宝小程序安卓真机上无法正常上传附件问题 [`#329`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/329)
    - 修复问题(em-rtc): 优化rtc切换摄像头代码 [`#336`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/336)
    - 修复问题(em-rtc): 修复融云在华为设备上无法正常切换后置摄像头问题，新增兼容多人通话情况 [`#326`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/326)

## 20231017
-   更新`8.3.13`版本
    - 新功能(em-cli): 支持构建H5端剥离Config.js文件 [`#297`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/297)
    - 新功能(em-cli): 多模块构建支持批量打包命令 [`#299`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/299)
    - 新功能(em-utils): Util.sm2增加解密API [`#302`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/302)
    - 新功能(em-utils): Util新增自动提示请求错误功能 [`#311`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/311)
    - 新功能(em-rtc): rtc组件新增融云音视频封装，新增拓展功能 [`#310`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/310)
    - 修复问题(em-utils): Util.ajax修复dataType设置失效问题 [`#309`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/309)
    - 修复问题(em-components): 修复rate组件v-model失效问题 [`#303`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/303)
    - 修复问题(em-components): 修复checkbox与radio组件在异步分包时无法正常展示label的问题 [`#304`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/304)
    - 修复问题(em-components): 修复下拉刷新设置ulMinHeight为calc功能异常问题 [`#300`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/300)
    - 修复问题(em-components): 修复uploader组件fileList无法带上自定义字段的问题 [`#301`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/301)
    - 修复问题(em-components): 修复radio组件在radiogroup中无法自定义颜色问题 [`#296`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/296)
    - 修复问题(em-components): 修复collapse插槽内容是异步获取时，高度渲染不正确问题 [`#294`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/294)
    - 修复问题(mobileframe): 优化级联组件代码示例 [`#295`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/295)

## 20230914
-   更新`8.3.12`版本
    - 新功能(em-rtc): 新增[rtc音视频组件](http://app.epoint.com.cn/m8mpdoc/?file=009-UI%E7%BB%84%E4%BB%B6/077-rtc%E9%9F%B3%E8%A7%86%E9%A2%91) [`#287`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/287)
    - 新功能(em-components): 验证码组件新增两个属性调节点线干扰复杂度 [`#282`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/282)
    - 修复问题(mobileframe): 修复安装依赖过程中认证失败问题 [`#250`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/250)
    - 修复问题(em-components): 修复checkbox在复选框组里面无法设置颜色及icon-size的问题 [`#290`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/290)
    - 修复问题(em-components): 修复minirefresh下拉刷新组件某些情况下卡顿问题 [`#285`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/285)
    - 修复问题(em-components): 修复field组件必填项特定情况下的样式问题 [`#255`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/255)
    - 修复问题(em-components): 修复minirefresh下拉刷新组件问题 [`#249`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/249)
    - 修复问题(em-components): 优化dropdown-menu在安卓端展示问题 [`#244`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/244)
    - 修复问题(em-components): 修复优化chart组件问题 [`#243`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/243)
    - 修复问题(em-components): 修复tab组件滚动导航问题 [`#239`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/239)
    - 修复问题(em-components): chart组件新增loaded事件，优化异步化分包时展示 [`#240`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/240)
    - 修复问题(vue-cli-plugin-weex): 修复weex构建图片路径问题 [`#283`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/283)
    - 修复问题(ejsv4): 修复ejsv4与原生交互时的缺陷 [`#242`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/242)
    - 文档(em-components): 完善chart组件示例 [`#254`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/254)
    - 文档(ejsv4): ejs-showcase新增getUserAuthCode示例 [`#241`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/241)

## 20230721
-   更新`8.3.11`版本
    - 新功能(ejsv4): ejsv4更新发布4.2.11版本 [`#235`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/235)
    - 新功能(mobileframe): weex构建支持ejs、Util和部分跨端UI组件 [`#208`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/208)[`#230`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/230)
    - 新功能(em-cli): 跨端框架支持[H5多模块构建](http://app.epoint.com.cn/m8mpdoc/index.html?file=015-工程化/multiple)功能 [`#220`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/220)
    - 新功能(em-utils): 新增自定义刷新token失败处理 [`#223`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/223)
    - 修复问题(mobileframe): ejs.error出现报错默认打印error信息 [`#221`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/221)
    - 修复问题(ejsv4): 优化JSBridge获取回调集合的逻辑，兼容多个ejs资源冲突 [`#225`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/225)
    - 修复问题(em-components): 优化field组件props属性说明，新增placeholderClass属性 [`#234`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/234)
    - 修复问题(em-utils): 去除非标准的H5门户相关代码 [`#222`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/222)
    - 修复问题(em-utils): 优化获取染色体请求头方式 [`#217`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/217)

## 20230624

- 在线文档支持全局搜索功能

## 20230609
-   更新`8.3.10`版本
    - 新功能(em-cli): `pages.json`防止多人协作冲突（[文档连接](http://app.epoint.com.cn/m8mpdoc/?file=015-工程化/pages)） [`#193`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/193)
    - 新功能(em-cli): 支持个性化代码隔离功能（[文档连接](http://app.epoint.com.cn/m8mpdoc/?file=015-工程化/customize)） [`#187`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/187)
    - 新功能(em-utils): Util.ajax补充增加`dataPath`配置，优化开发体验 [`#197`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/197)
    - 新功能(mobileframe): 增加`jsconfig.json`配置文件，支持别名路径感知跳转等 [`#195`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/195)
    - 新功能(vue-cli-plugin-mc): 支持新点小程序构建weex模式 [`#202`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/202)
    - 新功能(vue-cli-plugin-del-uni-tips): 构建新点小程序过程提示优化，去除uniappv3版本升级提示 [`#210`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/210)
    - 修复问题(vue-cli-plugin-mccommon): 修复公共资源未打包chart组件问题 [`#198`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/198)
    - 修复问题(em-cli): 修复vue文件没有script报错问题 [`#196`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/196)
    - 修复问题(em-components): 优化整理`uploader组件`弹窗及各端实现方式 [`#186`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/186)
    - 修复问题(vue-cli-plugin-mc): 跨端组件构建时部分公共资源外置 [`#171`](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/171)

## 20230509
-   更新`8.3.9`版本
    - 新功能(mobileframe): 新增基础weex应用构建支持（[文档连接](http://app.epoint.com.cn/m8mpdoc/?file=015-工程化/weex应用构建)） ([e71e7ea7](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/155))
    - 新功能(em-components): 新增em-chart组件及其示例 ([966ed468](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/177))
    - 新功能(em-utils): 提交登录管理器代码 ([4a383305](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/138))
    - 新功能(em-utils): 新增染色体方案适配 ([e64e05dc](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/150))
    - 新功能(em-utils): 新增获取token异步锁定功能  ([08cd5eed](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/167))
    - 新功能(em-cli): 支持显示转义npm依赖 ([6104b51a](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/152))
    - 新功能(vue-cli-plugin-mc): 跨端组件开发支持npm依赖 ([67421896](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/151))
    - 新功能(vue-cli-plugin-mccommon): 跨端组件打包时公共资源外置，新增构建H5端公共资源命令 ([dffad7e7](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/165))
    - 修复问题(vue-cli-plugin-mc): 据低码平台要求，优化层级，修复报错问题 ([6e06b25a](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/139)) ([c944f722](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/146)) ([6b01b631](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/147)) ([2b9dd5df](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/158)) ([daa6bd4f](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/163))
    - 修复问题(em-components): 修复跨端组件库问题 ([725be880](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/140))([d3f71b43](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/149))([1f84b95e](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/141))([8a2a76d6](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/153))([a9d8c6bb](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/154))([cf121a7e](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/166))([4d946466](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/148))([b5e82c86](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/168))
    - 修复问题(em-cli): 修复构建H5后资源存在特殊字符~ ([b1facb47](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/145))
    - 修复问题(em-cli): 修复无modules文件夹时构建报错问题 ([2f851497](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/169))
    - 修复问题(em-cli): 优化低码组件及公共资源样式在大屏中的单位转换 ([cfc56e2d](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/179))
    - 修复问题(em-utils): 修复因qs版本较高导致在微信小程序真机中调用Util.ajax报错问题 ([a4fde6d2](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/176))
    - 修复问题(ejsv4): 修复第三方脚本引入没有全局ejs变量问题 ([f29e4778](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/178))

-  受影响
    - ejs.m8.mobileframe@8.3.9
    - @epoint-mrc/ejsv4@4.2.9
    - @epoint-mrc/em-cli@1.0.7
    - @epoint-mrc/em-components@1.0.9
    - @epoint-mrc/utils@1.0.8
    - @epoint-mrc/vue-cli-plugin-del-uni-tips@0.0.3
    - @epoint-mrc/vue-cli-plugin-mc@1.0.4
    - @epoint-mrc/vue-cli-plugin-mccommon@0.0.2
    - @epoint-mrc/vue-cli-plugin-weex@0.0.2

## 20230321
-   更新`8.3.8`版本
    - 新功能(em-cli): 支持modules页面组件；支持调试时新增模块的自动构建 ([69ff4cb5](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/117))
    - 新功能(mobileframe): 调整部分模块至modules内 ([a1be45c1](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/118))
    - 新功能(构建流程): 对开发工程添加jest单元测试 ([b6e68a0e](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/119))
    - 修复问题(ejsv4): 优化ejsUI模块兼容同时调用API的情况 ([f2796828](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/120))
    - 修复问题(em-components): 修复picker组件在H5端级联模式下数据不变时显示错位问题 ([1390a7ac](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/121))
    - 修复问题(em-components): 优化ejsapi跨端组件调用时的报错提示 ([e6838b45](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/124))
    - 修复问题(vue-cli-plugin-mc): 解决低码组件预览时，控制台vue出现警告问题 ([41215653](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/123))
    - 修复问题(em-utils): util支持在非框架下运行 ([831880a7](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/128))
    - 修复问题(vue-cli-plugin-del-uni-tips): 新增命令修复跨端框架pages.json修改失效问题 ([6b1bb0d5](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/127))

-  受影响
    - ejs.m8.mobileframe@8.3.8
    - @epoint-mrc/ejsv4@4.2.8
    - @epoint-mrc/em-components@1.0.8
    - @epoint-mrc/em-cli@1.0.6
    - @epoint-mrc/utils@1.0.7
    - @epoint-mrc/vue-cli-plugin-mc@1.0.3
    - @epoint-mrc/vue-cli-plugin-del-uni-tips@0.0.2

## 20230201
-   更新`8.3.7`版本
    - 新功能(em-components): 下拉刷新组件新增自定义请求方法功能 ([6e441f9c](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/110))
    - 修复问题(mobileframe): 阻止uni默认加载hcloud的无法访问的cdn图片，防止白屏 ([da231d01](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/109))
    - 修复问题(em-components): UI走查优化，修复部分跨端组件缺陷，并规范跨端组件样式 ([c9c7551d](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/111))
    - 修复问题(em-components): 下拉刷新设置高度问题修复([59ff0b42](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/112))
    - 新功能(em-components): tabs组件新增pop-height属性用于自定义下拉弹窗的高度([ee492690](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/113))
    - 修复问题(ejsv4): 优化ejsUI模块交互效果([9a36b2fe](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/111))

-  受影响
    - ejs.m8.mobileframe@8.3.7
    - @epoint-mrc/ejsv4@4.2.7
    - @epoint-mrc/em-components@1.0.7

## 20230104
-   更新`8.3.6`版本
    - 新功能(em-components): 新增拖拽组件 ([4ee5c1c](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/104))
    - 新功能(em-components): 在下拉刷新changeData方法中新增请求入参回传 ([d06b318](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/commits/d06b318))
    - 修复问题(em-components): 修复checkboxGroup值改变时触发两次change事件的问题 ([15e841f](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/commits/15e841f))
    - 修复问题(em-components): 修复dialog.confirm方法在点击遮罩时触发cancel事件的问题 ([6440be3](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/commits/6440be3))
    - 修复问题(em-components): 修复field组件在Input时无法正常格式化输入值的问题 ([de44631](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/commits/de44631))
    - 修复问题(em-components): 优化calendar组件展示默认日期的逻辑 ([0566c0f](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/commits/0566c0f))
    - 修复问题(ejsv4): toast方法兼容null传参 ([6973b85](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/commits/6973b85))
    - 修复问题(em-utils): 修改统一社会信用码的校验，与PC保持一致 ([7af0d6b](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/commits/7af0d6b))
    - 修复问题(em-utils): 优化parseDate方法 ([96e8ba1](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/commits/96e8ba1))
    - 修复问题(mobileframe): 删除仅在示例中用到的全局cell-title样式 ([e5cb791](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/97))
    - 修复问题(vue-cli-plugin-mc): 修复小屏低码设置render和附件选择菜单问题 ([82e024b](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/commits/82e024b))
    - 修改跨端框架发布仓库地址 ([releases](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/ejs.m8.mobileframe/-/releases))
-  受影响
    - ejs.m8.mobileframe@8.3.6
    - @epoint-mrc/em-components@1.0.6
    - @epoint-mrc/ejsv4@4.2.6
    - @epoint-mrc/util@1.0.6
    - @epoint-mrc/vue-cli-plugin-mc@1.0.2

## 20221201
-   更新`8.3.5`版本
    -   新功能(vue-cli-plugin-mc): 支持小屏低码源码构建使用的通用文件 ([e9fdee1](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/89))
    -   修复问题(em-components): 修复跨端组件库问题([
        b90d6463](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/85))([
        0d93e1ac](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/84))([
        cebc1504](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/91))
    -   修复问题(em-utils): Util增加页面通讯api ([4664135](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/86))
    -   修复问题(ejsv4): 修复ejs.ui.pickDateTime无法正常展示可选时间范围的问题 ([79f4242](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/83))

-  受影响
    -   ejs.m8.mobileframe@8.3.5
    -   @epoint-mrc/em-components@1.0.5
    -   @epoint-mrc/util@1.0.5
    -   @epoint-mrc/vue-cli-plugin-mc@1.0.1

## 20221116

-   更新`8.3.5-beta.0`版本

    -   修复问题(em-components): 修复跨端组件库问题([
        b90d6463](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/74))([
        0d93e1ac](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/70))([
        cebc1504](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/74))([
        c4b7bfee](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/76))([
        47020a2a](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/82))([
        ae605624](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/84))
    -   修复问题(em-components): 修复dialog组件message无法换行的问题([
        9082da89](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/79))
    -   修复问题(em-components): 同步修复选人组件在党政通反馈的问题([
        5be76eb7](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/80))
    -   新功能(em-cli): 支持page.json中使用注释，支持条件编译([
        08272a65](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/69))
    -   新功能(ejsv4): 新增封装日期选择API([
        ac56ef1b](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/71))
    -   修复问题(ejsv4): 修复page.close回传长数字字符串时回调返回数值类型的问题([
        22eadb53](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/75))
    -   修复问题(ejsv4): 修复ejs.page.replace在ejs环境中跳转失败的问题([
        94e84782](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/73))
    -   新功能(构建流程): 新增低码组件开发插件库([
        2fc8d9ea](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/72))
    -   新功能(mobileframe): 新增异步化分包处理([
        7ab897fb](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/81))
    -   杂项(vue-cli-plugin-mc): 增加构建成功提示([
        0b913162](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/commit/0b913162d56634be0c07479d6381c1612fa6c871))
    -   修复问题(em-utils): 修复新点小程序上传本地文件无法正常获取本地文件信息的问题([
        7bdc1e3d](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/77))


-   受影响
    -   ejs.m8.mobileframe@8.3.5-beta.0
    -   @epoint-mrc/em-cli@1.0.5-beta.0
    -   @epoint-mrc/em-components@1.0.5-beta.0
    -   @epoint-mrc/util@1.0.5-beta.0
    -   @epoint-mrc/ejsv4@4.2.5
    -   @epoint-mrc/vue-cli-plugin-mc@1.0.1-beta.0

## 20221013

-   更新`8.3.4`版本

    -   修复问题(em-cli): 修复构建新点小程序未生成 appid 与 indexURL 问题([a897bb2c](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/64))
    -   修复问题(em-cli): dev 命令时支持新点小程序卡片页面页面([ffece6ee](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/58))
    -   修复问题(em-cli): 构建新点小程序卡片时过滤首页配置([5fc9e1a4](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/58))
    -   修复问题(em-cli): 兼容 plugin.json 仅配置 cardId([77bb71bd](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/58))
    -   修复问题(em-cli): 修复构建新点小程序卡片生成无 cardId 问题([2e2eddd7](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/58))
    -   修复问题(em-components): 修复组件库发现的问题，优化组件文档([1e42c680](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/65))([a7748f33](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/63))
    -   修复问题(em-components): 修复下拉刷新缺少的 prop，优化空提示展示([e81439b4](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/63))
    -   修复问题(em-components): 修复组件库重复引入样式文件导致样式隔离失效的缺陷([1506547b](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/59))
    -   修复问题(em-components): 优化国际化方法([e13bb8db](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/57))
    -   文档(em-components): 优化组件库公共样式说明([0cba942e](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/commit/0cba942ec31602ea4a776001b79aef983ed01542))
    -   修复问题(em-utils): 修复 extend 对数组深拷贝无效的 bug([997eddc3](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/56))
    -   修复问题(ejsv4): 优化 ejs 代码，原生 API 不再打包 H5 环境的 API([31c83e73](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/62))
    -   修复问题(ejsv4): 修复 ejsv4 发包时忽略 npm/dist 的问题([0417768f](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/61))
    -   杂项(mobileframe): 删除多余的 vconsole 文件，performance 使用条件编译目录([3fed5486](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/62))

-   受影响
    -   ejs.m8.mobileframe@8.3.4
    -   @epoint-mrc/em-cli@1.0.4
    -   @epoint-mrc/em-components@1.0.4
    -   @epoint-mrc/util@1.0.4
    -   @epoint-mrc/ejsv4@4.2.3

## 20220923

-   更新`8.3.3`版本

    -   修复问题(mobileframe): 支持 dev 模式下对 js 进行压缩 ([30cb21e6](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/39))
    -   修复问题(util): 修复 ajax 默认参数继承问题 ([3f258123](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/46))
    -   修复问题(util): 修复 upload 上传 formData 丢失问题 ([fa9108d4](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/48))
    -   修复问题(em-components): em-minirefresh 中无数据时 empty 布局问题 ([980ccd8b](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/45))
    -   修复问题(em-components): 优化组件库的层级问题 ([7fb3bea8](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/50))
    -   修复问题(em-components): 优化组件样式单位设置问题 ([c133e3e6](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/52))
    -   修复问题(em-cli): 修复 main.js 中无法使用 ejs 和 util 的问题 ([8776d52a](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/49))
    -   修复问题(构建流程): 修改 better-mock 依赖 ([9b4e4bd4](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/51))
    -   杂项(mobileframe): 固定依赖版本号 ([b1f424b6](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/54))

-   受影响
    -   ejs.m8.mobileframe@8.3.3
        -   @epoint-mrc/em-cli@1.0.3
        -   @epoint-mrc/em-components@1.0.3
        -   @epoint-mrc/util@1.0.3

## 20220902

-   更新`8.3.2`版本

    -   新功能(em-cli): 新增支持构建新点小程序 ([b43779d5](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/16))
    -   新功能(em-cli): 去除 uni 构建后的终端广告 ([629c3d69](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/18))
    -   新功能(em-components): 新增选人组件 ([5d556083](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/25))
    -   新功能(em-components): 新增标签栏组件 ([df10661a](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/22))
    -   新功能(em-components): 新增二维码组件 ([de4be006](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/26))
    -   新功能(ejsv4): ejs.ui.select 新增全选功能 ([5cdc4c71](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/30))
    -   新功能(构建流程): 修改 npm 源为公司新私有仓库路径 ([b19bd83b](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/27))
    -   修复问题(ejsv4): 修复 ejs 容器中打开页面的问题 ([b84b6945](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/15))
    -   修复问题(ejsv4): 修复 ejs 容器中使用 ui 模块报错的问题 ([027afeab](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/24))
    -   修复问题(em-components): 修复 sticky 组件缺陷 ([41871d4f](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/32))
    -   修复问题(em-utils): 修复自定义刷新 token 逻辑 ([41871d4f](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/19))
    -   代码重构(em-cli): 统一构建命令 ([b80603e4](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/33))

-   受影响
    -   @epoint-mrc/em-cli@1.0.2
    -   @epoint-mrc/em-components@1.0.2
    -   @epoint-mrc/util@1.0.2
    -   @epoint-mrc/ejsv4@4.2.2

## 20220729

-   更新`8.3.1`版本

    -   跨端框架使用 monorepo 仓库管理[epoint-mrc](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc)
    -   新增`@epoint-mrc/em-cli`依赖，框架构建逻辑从`ejs.m8.mobileframe`中剥离
    -   新功能(em-cli): 增加 router.js[自动分包](http://app.epoint.com.cn/m8mpdoc/?file=015-工程化/subpage)功能 ([91431e0](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/8))
    -   新功能(em-cli): 增加 router.js 指定应用[首页配置](http://app.epoint.com.cn/m8mpdoc/index.html?file=011-vuex%E4%B8%8Erouter%E7%9A%84%E4%BD%BF%E7%94%A8/router%E7%9A%84%E4%BD%BF%E7%94%A8#router.js%20%E6%94%AF%E6%8C%81%E9%85%8D%E7%BD%AE)，支持命令行 dev 时指定打开的首页 url ([5df1af4](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/9))
    -   新功能(mobileframe): 增加 m8showcase 模块，用于预览 UI 组件 ([298c1cd](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/4))
    -   新功能(ejsv4): 新增拦截器功能 ([b75810a](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/commits/b75810a))
    -   新功能(em-components): 新增 layout 布局、circle 环形进度条、countdown 倒计时、divider 分割线、lazyload 懒加载、popover 气泡弹出框、progress 进度条、grid 宫格、verifycode 验证码组件([14f22cb0](http://192.168.217.8/epoint-mrc-fe/em-components/-/merge_requests?scope=all&state=merged&search=%E6%96%B0%E5%8A%9F%E8%83%BD))
    -   修复问题(em-components): 修复试点验证阶段反馈的问题缺陷([f88f3a8f](http://192.168.217.8/epoint-mrc-fe/em-components/-/merge_requests?scope=all&state=merged&search=%E4%BF%AE%E5%A4%8D))
    -   修复问题(em-utils): 解决 ajax 请求参数合并问题 ([2458ff3](http://192.168.217.8/epoint-mrc-fe/ejs.mp.mobileframe/epoint-mrc/-/merge_requests/10))

-   受影响
    -   @epoint-mrc/em-cli@1.0.1
    -   @epoint-mrc/em-components@1.0.1
    -   @epoint-mrc/util@1.0.1
    -   @epoint-mrc/ejsv4@4.2.1

## 20220630

-   更新`8.3.0`版本

    -   发布移动前端框架 M8.3.0
::: endif
