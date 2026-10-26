# Epoint 框架加解密工具排查手册

> 共享版：案例密文、解密明文及具体密钥已移除，保留排查方法。实际凭据仅在本机安全保存。

记录从 `Epoint.Frame.Utils` jar 中定位、识别并还原加解密逻辑的方法,供下次遇到同类"某处密文/配置项如何加解密"问题时按图索骥。本次只处理了 DES 场景,其余算法按同一套方法论处理即可。

## 1. 背景案例(已解决)

- 场景:一个 `密码加密DES.bat` 脚本,自动在当前目录下查找包含 `Epoint.Frame.Utils` 字样的 jar,然后执行:
  `java -cp <jar> com.epoint.core.utils.code.DES <明文>`
  只传一个参数 → 走的是**加密**分支(用默认密钥),不是解密工具。
- 待解密密文:`<案例密文已移除>`
- 用 `DES.decrypt(s)`(默认密钥 `<默认密钥>`)解密报 `BadPaddingException`,说明密钥不对。
- 反编译 `DES.class` 字节码,发现还有一个 `encrypt_final_key(String)` 方法,内部用一段混淆字符串经 `EncodeUtil.l()` → `EncodeUtil.a()` 还原出硬编码密钥;反射调用这两个方法还原出真实密钥为 `<其他密钥>`。
- 用 `DES.decrypt(密文, "<其他密钥>")` 解密成功,结果:`<案例明文已移除>`;再用 `DES.encrypt(结果, "<其他密钥>")` 重新加密回去,与原密文完全一致 → 验证通过。

## 2. jar 里都有哪些加解密相关的类

解压 jar 后,`com/epoint/core/utils/code/` 目录下常见类:

| 类名 | 推测用途 |
|---|---|
| `DES.class` | DES 加解密(本次用到的) |
| `AESEncDec.class` | AES 加解密 |
| `Blowfish.class` | Blowfish 加解密 |
| `RSAUtils.class` / `RsaHelper.class` | RSA 非对称加解密 |
| `MD5Util.class` / `MDUtil.class` | MD5/摘要算法(不可逆,只能撞库或暴力破解) |
| `Base64Util.class` | Base64 编解码(常作为其他算法的前置/后置步骤) |
| `EncodeUtil.class` | 字符串混淆/反混淆的辅助类,经常被各加密类内部调用来"藏"密钥 |
| `f.class` / `g.class` | 匿名/工具类,命名被混淆,需要具体看字节码才知道作用 |

**排查新场景时先做的事**:解压 jar,在 `com/epoint/core/utils/code/`(或搜索 `*Util*`、`*Code*`、`*Crypto*`、`*DES*`、`*AES*`、`*RSA*` 关键字)里找同类工具类,而不是只看 DES 一个。

## 3. 通用排查方法论(可复用步骤)

### 第一步:先看有没有调用入口
找相关的 `.bat` / `.sh` / 配置文件 / 启动脚本,看它们是怎么调用这些工具类的(比如本次的 `密码加密DES.bat` 直接 `java -cp jar 类名 参数` 调用了 `main` 方法)。这能确认:
- 具体用的是哪个类、哪个方法;
- 传了几个参数(决定走默认密钥还是自定义密钥分支)。

### 第二步:反射列出类的方法/字段,搞清楚有哪些入口可用
不需要先反编译,先用反射快速摸底:
```java
Class<?> c = Class.forName("类全名");
for (var m : c.getDeclaredMethods()) System.out.println(m);
for (var f : c.getDeclaredFields()) System.out.println(f);
```
重点看:
- 有没有 `public static` 的 `encrypt`/`decrypt` 方法,以及重载版本(单参数=默认密钥,双参数=自定义密钥);
- 有没有看起来像"默认密钥"的 `static` 字段(本次是 `strDefaultKey = "<默认密钥>"`);
- 有没有名字特殊的方法(本次是 `encrypt_final_key`、`isDES`),这类方法往往内部藏了另一套密钥或校验逻辑。

### 第三步:直接调用默认方法试一下
先用最省事的方式试:`类.decrypt(密文)` / `类.decrypt(密文, 候选密钥)`,仅使用经授权取得的候选密钥，不在共享文档记录真实密钥。如果直接成功就不用往下走了。

### 第四步:默认密钥不行 → 反编译字节码找隐藏密钥
环境里只有 JRE 没有 `javap`/`javac` 时,可以用 apt 装:
```bash
apt-get update -qq && apt-get install -y -qq openjdk-21-jdk-headless
```
然后:
```bash
javap -c -p com.epoint.core.utils.code.DES > des_decomp.txt
```
在反编译结果里找:
- 字节码里出现的**字符串常量**往往是乱码/转义字符(如 `Q\"C\u0001S)[+`),这些常量会被传给类似 `EncodeUtil.l()` / `EncodeUtil.a()` / `Base64Util.l()` 这种"反混淆/解码"方法,解码后才是真正用到的密钥、算法名(如 `DES/CBC/PKCS5Padding`)或正则表达式。
- 哪个方法最终把解码结果传进了 `Cipher.init(...)` / `SecretKeyFactory` / `DESKeySpec` / `IvParameterSpec`,这就是真正生效的密钥来源。

### 第五步:反射直接调用这些内部解码方法,把隐藏密钥"抠"出来
不用自己逆向混淆算法,直接反射调用原始的解码方法链,传入字节码里看到的那个字符串常量,让 jar 自己把密钥解出来:
```java
Method l = EncodeUtil.class.getMethod("l", String.class);
Method a = EncodeUtil.class.getMethod("a", String.class);
String key = (String) a.invoke(null, l.invoke(null, "字节码里看到的那段混淆字符串"));
System.out.println(key); // 本次得到 <其他密钥>
```

### 第六步:用还原出的密钥解密,并做"回环验证"
解密后,再用同一个密钥把解密结果重新加密一遍,看是否等于原始密文;一致就说明密钥和算法都找对了,不是蒙对的。

## 4. 速查表:本次确认的 DES 细节

- 算法:`DES/CBC/PKCS5Padding`(经 gb2312 编码)
- 密文格式:十六进制字符串(大写),每两个字符一个字节,长度必须是 16 的倍数
- 密钥/IV:用同一个 8 字符字符串的 `getBytes("gb2312")` 同时当 DES key 和 IV
- 默认密钥:`<默认密钥>`(`DES.strDefaultKey`,对应 `DES.encrypt(s)` / `DES.decrypt(s)` 单参数版本)
- 隐藏/另一套密钥:`<其他密钥>`(对应 `DES.encrypt_final_key(s)`,没有对应的公开 `decrypt_final_key`,解密时要显式传 `"<其他密钥>"` 作为第二参数调用 `DES.decrypt(s, "<其他密钥>")`)

## 5. 下次遇到新场景(AES/Blowfish/RSA/MD5 等)时怎么套用

1. 先确认是不是在同一个 Epoint jar 体系里 —— 如果是,大概率沿用同一套"默认密钥 + 混淆隐藏密钥"的设计模式,直接重复第 2～6 步,把 `DES` 换成对应的类名(`AESEncDec`、`Blowfish`、`RSAUtils`/`RsaHelper`)即可。
2. 如果是 **MD5/摘要类算法**(`MD5Util`、`MDUtil`):这是单向哈希,没有解密这一说,只能考虑撞库/彩虹表/暴力破解,遇到这种需求要先跟用户确认诉求(通常是验证某个输入是否等于某个哈希值,而不是"解密")。
3. 如果是 **RSA 非对称加密**:没有"默认密钥"这种东西,需要先找私钥(通常在配置文件、keystore 文件或代码里以 PEM/Base64 形式存在),没有私钥是无法解密的,要先确认私钥来源。
4. 不管哪种算法,优先级都是:**先看调用脚本/配置 → 反射摸底方法和字段 → 试默认/常见密钥 → 反编译找隐藏密钥/算法细节 → 反射抠出隐藏值 → 解密并回环验证**。
