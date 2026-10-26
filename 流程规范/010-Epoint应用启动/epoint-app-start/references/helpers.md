# 辅助工具用法

使用本机可用 Node.js；脚本只依赖内置模块。先根据实际项目探测路径。以下示例中的脚本路径相对于本技能目录，运行时优先用绝对路径。

## 日志导航（只读）
node scripts/epoint-start.cjs inspect-log --file "<当前日志.txt>"

输出成功候选、授权结果、缺类/方法、Redis、条件性告警和需复核的数据库升级错误。不会因找到 Started 一行就宣称启动成功。

## Redis 预检（只读连接）
node scripts/epoint-start.cjs redis-check --file "<war>/src/main/resources/epointframe.properties"

支持单地址明文 redis:// 和 rediss://；用既有账号执行 AUTH（若配置）、SELECT、PING，不读写业务键。ENC/集群等输出需按工程机制处理。仅输出主机、端口、db 和检查结果，不输出 URL 用户名密码。

## 刷新一个陈旧 JAR
PowerShell 示例（内部类用单引号）：

    node scripts/epoint-start.cjs refresh-artifact --java-home 'D:\eclipse4.15\env\jdk' --maven-home 'D:\eclipse4.15\env\maven' --settings 'D:\git\dataex-settings.xml' --repo 'E:\.m2\repository' --group com.epoint.ztb --artifact ztb-bizlogic --version 1.0.23 --class 'com.epoint.ztb.bizlogic.UserPortraitCache$IPortraitLoader'

先加 --dry-run 可检查最终坐标、路径和 Maven 参数，不删除 JAR、不执行 Maven。实际模式只操作指定版本的一个 JAR，先备份到系统临时目录，再 dependency:get，transitive=false。失败恢复原文件（成功时保留备份路径供排查），不触碰源码 POM。下载最长 120 秒；工具调用应支持分段等待/日志更新，不让用户无反馈等待。

方法验证额外参数：

    --class 'com.epoint.core.dto.RequestContext' --method 'public java.lang.reflect.Method getMethod();'

同版本私服不包含目标类/方法时脚本失败并恢复原件，接下来人工/Agent 查版本声明；不自动升级。Maven认证由原 settings 获取；失败摘要避免输出完整 Maven命令错误中的凭据。默认仅支持无 classifier 的标准 jar，其他打包方式先核对坐标再按 Maven正规方式处理。

## 准备新 IDEA 工程
先编译，再发现/登记真实 SDK 名称，然后：

    node scripts/epoint-start.cjs prepare-idea --project '<工程根>' --module '<根下WAR相对路径>' --java-home '<JDK8>' --jdk-name '<IDEA中已登记的SDK名称>' --maven-home '<Maven>' --settings '<settings.xml>' --port 8081

- 默认 plugin 模式：配置中没有手工 agent，使用 Run with JRebel。
- 需要普通 Run 时增加 --agent-mode standalone --jrebel-dll '<实际DLL>'，生成恰好一个手工 agent参数；不能再用插件注入。
- 端口被占用会在后续最多100个端口内选空闲端口，不停止任何进程。检测与实际启动有时间间隔，启动时仍需核对。
- 只创建目标工程内 .idea 文件；已存在的 misc.xml不覆盖、同名运行配置不覆盖；不更改全局 SDK表。
- jdk-name 是调用前已确认的 SDK 名称。工具不能证明 SDK已登记或 IDE已导入，结果明确标记 NOT_VERIFIED。
- 存在根 POM 时导入根；无根 POM时导入目标 WAR，按真实依赖把其他本地模块也加入导入。随后用 IDEA 打开并 Reload Maven，检查工程与配置生效。
- 不执行启动、不编译、不改业务 POM、不注册全局 JDK。实际编译、注册SDK、导入、启动由技能流程使用现有IDEA/终端工具完成；不要把辅助命令成功当作应用已经启动。
