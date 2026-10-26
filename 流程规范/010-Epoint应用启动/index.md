# Epoint 新点应用启动

适用于主体库、交易平台等传统 Java/Maven Web 开发工程，采用 JRebel + tomcat7:run。依赖齐全后先预留 **10–20 分钟**；参考案例约 **14 分钟**完成监听和授权，首次下载、编译、IDEA 导入时间另计。

## 任务导航

| 任务 | 文档 |
|---|---|
| 按完整流程启动 | [SKILL.md](epoint-app-start/SKILL.md) |
| 判断要等多久、是否真正成功 | [启动耗时与日志判读](epoint-app-start/references/startup-log-guide.md) |
| 缺类、缺方法、刷新一个陈旧 JAR | [依赖修复](epoint-app-start/references/dependency-repair.md) |
| 新工程 IDEA 导入、JRebel、Redis、授权 | [环境准备](epoint-app-start/references/idea-and-environment.md) |
| 执行辅助命令 | [脚本用法](epoint-app-start/references/helpers.md) |
| 对照启动阶段时间 | [脱敏日志摘要](epoint-app-start/references/startup-success-guangzhou-ztk-20261025.txt) |

## 安装为个人 Codex 技能

将本目录下整个 epoint-app-start 文件夹复制到个人技能目录，默认位置为 %USERPROFILE%\.codex\skills\epoint-app-start；自定义 CODEX_HOME 时使用该目录下的 skills。已有同名技能时先比较并备份，再合并更新，避免覆盖本机配置。新会话中使用 $epoint-app-start 调用。

辅助脚本只需 Node.js，无第三方依赖。进入技能目录后可运行：

```powershell
node scripts/epoint-start.cjs inspect-log --file "<实际日志路径>"
node scripts/test-helpers.cjs
```

## 常见陷阱

- Spring 的 Started 行不代表所有组件已初始化，成功需检查正确应用的登录页及所需首页。
- 缺类先定位真实 JAR 并刷新同版本缓存，不全库删除，不盲目升级版本。
- 共享版不含 .lic、settings.xml、完整原日志、账号密码或登录态；各电脑自行准备真实配置及匹配机器码的合法授权。
- 文档中的历史路径和版本仅用于说明，不能直接作为其他工程的默认配置。

返回[流程规范索引](../index.md)。
