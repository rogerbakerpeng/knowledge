# 新工程 IDEA、JRebel 与本机环境

## 本机仅作发现线索
| 项目 | 2026-10-25 验证位置 |
|---|---|
| 工程 | D:\git\guangzhou-ztk |
| WAR | tspbidderztk，默认端口 8081 |
| Java 8 | D:\eclipse4.15\env\jdk |
| Maven 3.6.3 | D:\eclipse4.15\env\maven |
| settings | 优先按实际运行配置；此机有 env\maven\conf\settings.xml 和 D:\git\dataex-settings.xml |
| 本地仓库 | E:\.m2\repository；不要因 D:\.m2 存在就选错 |
| epoint-nexus | 该 settings 中的 http://<内部Nexus主机>:<端口>/nexus/content/groups/public/ |
| IDEA | D:\JetBrains\IntelliJ IDEA Community Edition 2023.1.2 |
| JRebel DLL | IDEA 安装目录\plugins\jr-ide-idea\lib\jrebel6\lib\jrebel64.dll |
| SDK | 本机 IDEA 中已登记 1.8，指向上述 Java 8 |
| 正常授权 | 各电脑自行提供匹配机器码的 .lic 文件；共享版不附带 |

不把这些值当跨电脑默认。已有运行配置比历史脚本更可靠；昨天仓库脚本里的 X:、E:\01_code、C:\Users\o 等路径不属于本机。临时 JRebel DLL 路径也不适合持久复制。

## 全新工程
1. 读各 POM，取得本地模块与 WAR 的真实依赖关系。有根聚合 POM 才使用 -pl/-am；无根时对必要父 POM、通用 jar、业务 jar、WAR 顺序 install/compile，跳过测试。
2. 必要依赖缺失先按缺类/仓库流程修复，不先打开空壳 IDEA 然后不停执行无法解析的运行配置。
3. 探测已有 IDEA SDK（如用户目录 AppData/Roaming/JetBrains/<当前IDEA版本>/options/jdk.table.xml）。没有目标 JDK 时通过 IDEA 工具或 UI 自动注册该 JDK，再使用真实 SDK 名称；不要伪造“已登记 SDK”。
4. prepare-idea 生成 .idea/misc.xml（仅不存在时）及 .idea/runConfigurations/*.xml，原工程配置保留。无根 POM 时它只列目标 WAR 的 POM；还应通过 MavenProjectsManager/IDEA 将编译所需本地模块 POM 加入导入列表，不能把它当完整多模块导入已完成。
5. 调用本机 IDEA launcher 打开工程，或复用已开的项目；Reload Maven 并确认导入成功。若 IDEA MCP 可用先读其工具 schema；不假设所有版本支持创建/复制运行配置或停止应用。
6. 核对 Project SDK、Maven runner JRE、Maven home、settings 与实际 localRepository一致。生成 XML 只是准备工作，还需验证 IDE 实际读取。

## JRebel 配置
- 插件模式：Maven 配置 VM options 放工程必需 JVM 参数与 -Dmaven.tomcat.port，使用 Run with JRebel，由插件加一个 agent。
- 独立模式：普通 Run 或命令行 JVM 参数显式加载一个 -agentpath:<实际DLL>；不要再用插件按钮额外注入。
- 已有 VM 参数按项目保留，不为所有工程统一套用历史示例的 -Xverify:none、-Xss512k 或 TieredStopAtLevel。
- 查看日志中 JRebel Agent 启动及 Directory ... will be monitored，确认当前工程、个性化 jar 模块的真实映射。源码保存不会自动产生 class；必须触发编译。
- jar 模块资源不一定随 mvn compile 自动进入当前 WAR 的运行 classpath；检查 JRebel/web映射或项目的 additionalClasspathDirs。编译成功不等于 HTTP 内容已刷新。
- clean 会删除 target，放在其中的临时 JAR、运行配置依赖和授权副本均会消失；本技能坚持标准 pom.xml + 正常 Maven 缓存。

## Redis 与授权
- epointframe.properties 常见 redisSetting=redis://host:6379/6，带密码/用户名时使用真实配置，不输出明文。
- 同时比较源码、target/classes、外部配置覆盖和日志实际值；常见“源码已改127.0.0.1，运行副本还是local.vm”。
- 检查正确数据库索引的 SELECT/PING；有认证则先 AUTH。禁止修改共用 Redis 数据或为了启动清空缓存数据库。
- 匹配本机授权可从使用者提供的文件路径复制到 WAR src/main/resources，再同步到 target/classes。本机只读源授权保持不动；其他机器的文件由人工取得并替换。
- 不复制历史脚本的 License 增强 Agent/校验绕过参数。本技能只部署已有合法授权文件，以机器码验证结果为准。
