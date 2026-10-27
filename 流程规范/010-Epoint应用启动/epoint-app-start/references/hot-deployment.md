# Java与前台资源热部署完整性

适用于采用JRebel的Epoint传统Maven Web工程。模块名、目录、开发profile和IDEA配置从目标工程探测；不能照搬案例的三个模块、盘符或参数名。

## 启动前清单

- 确认WAR的target/classes、src/main/webapp，以及本工作区待修改的业务Action/Service、公共、登录等本地JAR模块target/classes。
- 分清页面来自WAR静态目录还是模块src/main/resources/META-INF/resources，分别确认Java与前台资源加载方式。agent已启用或仅监控WAR，不代表业务模块覆盖完整。
- 同时检查源码rebel.xml、target/classes/rebel.xml、实际进程参数和JRebel日志。磁盘配置与运行实例可能不同：旧实例仍监控启动时目录，但覆盖后的XML影响下次启动。
- 路径应真实存在且属于当前工作区，不能指向旧checkout或其它电脑。

## 固化生成配置

不要只手工追加生成的XML。优先在现有JRebel生成器中声明模块目录，或由受控启动脚本生成并校验。保留项目其它配置，使用相对project.basedir的路径。

以下是已验证的jrebel-maven-plugin 1.1.9配置形状。member-action仅为示例，需替换为实际模块；每个待改模块各一项：

~~~xml
<plugin>
  <groupId>org.zeroturnaround</groupId>
  <artifactId>jrebel-maven-plugin</artifactId>
  <version>1.1.9</version>
  <configuration>
    <alwaysGenerate>true</alwaysGenerate>
    <rebelXmlDirectory>${project.basedir}/src/main/resources</rebelXmlDirectory>
    <classpath><resources><resource>
      <directory>${project.basedir}/../member-action/target/classes</directory>
      <excludes><exclude>*-com.properties</exclude></excludes>
    </resource></resources></classpath>
  </configuration>
</plugin>
~~~

- 映射Epoint组件目录时，按实际加载方式排除重复的*-com.properties，避免组件从JAR与目录重复注册；不要泛化为排除全部properties或业务资源。
- 若生成到源码resources，在本地开发profile的generate-resources阶段绑定generate，让后续resources阶段复制到target/classes。直接生成到target也可，但需防止后续拷贝旧XML覆盖。
- 保留WAR默认类和Web映射。生成器声明与自动执行分开，不把开发生成步骤无条件绑定到生产构建。
- 用实际启动命令的profile生成，再重复一次，确认映射和排除项保留；不以手工修补成功作为验收。
- 自动激活开发profile可能关闭同POM的activeByDefault业务profile。检查有效依赖并显式保留原业务profile；normal不是所有工程的通用名称。
- 同时检查真正使用的IDEA配置和CLI入口。由IDEA插件注入agent时，不再手动注入第二份。

## 前台资源单独核实

仅配置业务target/classes，不能推断JAR页面会从源码读取。

- WAR的src/main/webapp可通过现有Web映射直读。
- 若模块资源映射到target/classes，改JS/CSS/HTML后需编译或同步资源。
- 需要源码直读时，可在本地开发profile用Tomcat additionalClasspathDirs挂载资源专用目录，仅含META-INF/resources，联接到当前模块源码。不要混入组件描述、配置和class导致重复扫描。
- 优先复用已验证的挂载，不为所有项目强制创建同名profile。校验联接真实目标属于当前工作区，错误目标不覆盖。
- 使用实际页面路由回读；Epoint页面可能不带.html后缀，并经个性化路由。排除登录重定向、404和缓存，不能只看HTTP 200。
- 源码直读不等于浏览器永不缓存，资源版本号仍按工程约定维护。

## 同进程验收与重启边界

1. 在已授权范围内编译一个业务模块或类，确认实际接口行为变化及类重载日志，记录同一PID。不能仅凭编译成功或文件变化事件宣称热替换成功。
2. 分别验证JS/CSS/HTML。优先利用本次已授权改动；必要的临时探针只能触及受控输出或注释，验证后恢复源码和编译产物，不保存业务测试数据来证明静态资源热更新。
3. 记录Java是否需编译、前台是源码直读还是同步模式，明确未验证项，清理验证标记。

普通方法或类改动不应仅因位于JAR模块就要求install或重启；本地仓库供其它应用解析、打包发布时仍按依赖需要install。静态初始化、枚举、类层次等边界按工程JRebel约定判断。

已有实例未加载某业务目录时，做一次有依据的映射/加载路径验证；运行类仍未替换则停止循环改XML或反复编译。补齐持久配置，说明证据，必要时重启一次重新加载映射，并验证之后的普通编译能在同PID生效。不为补文件先停止仍可用的实例。

最终说明覆盖模块、Java和前台生效方式、实际验证范围、是否重启及原因、生成器覆盖防护。其它项目复用判定流程，不复用案例路径或固定模块数量。
