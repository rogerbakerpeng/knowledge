# 缺类、缺方法：先定位再刷新

## 昨天案例的关键结论
本地目录有“正确版本号”不代表 JAR 内容是仓库当前同版本。先查同版本原件，再考虑升级，避免用版本变更掩盖缓存问题。SHA1 不同只是线索，也可能有本地处理，最终以需要的类、方法和实际加载来源为准。

| 报错类/方法 | 推理候选 | 实际验证 |
|---|---|---|
| com.epoint.HuiYuan.domain.HuiYuanUserCert | ztb-huiyuan-api | 1.0.23 缓存缺类；重新下载同版本后出现 |
| com.epoint.ztb.bizlogic.UserPortraitCache$IPortraitLoader | ztb-bizlogic | 1.0.23 缓存陈旧；同版本刷新后外部类及内部接口均出现 |
| com.epoint.ztb.constants.HuiYuanConstants$OperateType | ztb-tradeconstants | 原选择 1.0.22 不匹配；1.0.23 私服包含目标内部类，需按实际工程显式引用及刷新 |
| com.epoint.apimanage.event.basic.entity.EventInfo | epoint-api-base、epoint-apimanager-api、epoint-eventcenter-api | 类实际在 api-base；该案例组件声明 1.1.0-SNAPSHOT，而工程选中了 1.0.0 |
| com.epoint.frame.service.metadata.userstatus.api.IUserStatusService | epoint-frame-api | 本地 9.5.6-beta2 缺类；私服原版本含该接口，不能一概认定必须升 sp1 |
| RequestContext.getMethod():java.lang.reflect.Method | epoint-core（不是看到 dto 包名就认定 epoint-dto） | 9.5.0 本地及私服原件均无方法，9.5.2 含方法，属于真正版本不兼容 |

这些坐标/版本是历史证据，不是其他应用的推荐版本表。

## 定位步骤
1. 从最深 Caused by 提取完整类名，保留大小写与 $。包名用于缩小候选范围，不能代替验证。
2. 在实际模块执行 dependency:tree，取得选中版本/冲突路径；核对当前启动使用的 settings 与 localRepository。
3. 使用 jar tf "<jar>"，查完全相同的 com/epoint/.../Class$Inner.class。路径变量/参数数组比 shell 正则更安全，PowerShell 中内部类名用单引号避免 $ 展开。
4. 有重复类时检查真实 classpath、额外目录、历史解压目录；必要时用 JVM 类加载来源信息定位，不能只看本地目录文件名。
5. 刷新当前坐标同版本。例：把版本目录中的 ztb-bizlogic-1.0.23.jar 备份到系统临时目录，只移除该文件，用 settings 里的 epoint-nexus 拉回。不删除整个 com/epoint 或 .m2，不删除 POM 中的版本管理。
6. 新包仍缺类：检查其他候选包、组件自己的父 POM/BOM 和声明，才选兼容版本或补显式依赖。使用标准 Maven 依赖，不添加 target/local-libs/systemPath。
7. NoSuchMethodError 必须 javap 核对完整签名，包括返回类型。类存在、方法名相同都不等于二进制签名匹配。

## 命令口径
- 使用选中的 Maven/JDK、settings、repo；不混用 IDEA 内置 Maven 的默认配置和命令行的其他配置。
- dependency:get -Dartifact=<group>:<artifact>:<version> -Dtransitive=false -U 只拉目标包；release 缓存要先移除具体 JAR。
- 不把仓库密码拼进命令行、URL、日志或输出；Maven 从原 settings 获取认证。
- 下载超时/401/404：恢复原包并报告实际错误，先修复访问/版本，不循环删包。本地失败备份不作为新运行依赖。
- 类库更新后通常需要重启已有 classloader；不能因为 JAR 已更新就声称当前 JVM 已生效。
