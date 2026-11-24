# Util.string

## 使用场景

该工具类封装了一些常用的字符串验证操作，包括

- 身份证验证，获取出生日期

- 邮箱，手机等常见场景的验证

- 过滤特殊字符等等

**平台差异**

|  H5   | 新点小程序 | 微信小程序 | 支付宝小程序 |
| :---: | :--------: | :--------: | :----------: |
|   √   |     √      |     √      |      √       |

## 方法说明

注：此工具集下的方法以 `Util.string` 为前缀进行调用

### isInt(str)

验证一个字符是否是整数

```js
Util.string.isInt('1234'); // true

Util.string.isInt('1s34'); // false
```

### isFloat(str)

判断一个字符串是否是 `数字`

```js
Util.string.isFloat('123'); // true
Util.string.isFloat('123.321'); // true

Util.string.isFloat('saber'); // false
```

### isMobile(str)

判断一个字符串是不是 `手机号码`

```js
Util.string.isMobile('18962299766'); // true

Util.string.isMobile('1896229976'); // false
```

### isTel(str)

判断一个字符串是不是 `固定电话`

```js
Util.string.isTel('051258222222'); // true

Util.string.isTel('1896229976'); // false
```

### isPhone(str)

判断一个字符串是不是 `电话号码`

```js
Util.string.isPhone('18962299766'); // true
Util.string.isPhone('051258222222'); // true

Util.string.isPhone('1896229976'); // false
```

### isEmail(str)

判断一个字符串是否是合法的 `EMAIL`

```js
Util.string.isEmail('abcd_s.ddf.ff-sss@vip.qq.com'); // true
Util.string.isEmail('abc@qq.com'); // true

Util.string.isEmail('abc@.com'); // false
Util.string.isEmail('-abc@qq.com'); // false
Util.string.isEmail('abc.@qq.com'); // false
Util.string.isEmail('ab-.c@qq.com'); // false
```

### isPostCode(str)

判断一个字符串是否是 `邮政编码`

```js
Util.string.isPostCode('215600'); // true

Util.string.isPostCode('21560'); // false
```

### isOrgCode(str)

判断一个字符串是否是 `组织机构代码`

```js
Util.string.isOrgCode('91320582704068740Y'); // true

Util.string.isOrgCode('91320582704068740a'); // false
```

### isUrl(str)

判断一个字符串是否是 `URL`

```js
Util.string.isUrl('https://fe.epoint.com.cn/ejs/'); // true
Util.string.isUrl('https://app.epoint.com.cn/ejs/'); // true
Util.string.isUrl('ftp://app.epoint.com.cn/'); // true
Util.string.isUrl('//app.epoint.com.cn/'); // true

Util.string.isUrl('page/html/api.html'); // false
Util.string.isUrl('./page/html/api.html'); // false
Util.string.isUrl('../page/html/api.html'); // false
```

### isIdCard(str)

判断一个字符串是否是 `身份证`

```js
Util.string.isIdCard('320926195511175276'); // true

Util.string.isIdCard('320582199566666614'); // false
```

### excludeSpecial(str, reg)

过滤特殊字符与转义字符，默认大部分的特殊字符都被剔除了，如果不满意，可以传自定义的正则

```js
var test="<>?:？》《《《，<><<<<><<<<<<<<|\\\\}}{{{{{PPOTWWERTYUIOSDFGHJKLXCVBNM<)(887676555433222!!@@@##$$%%<<>>??????;;;;''’‘；，。。、。。、090-=-098776654112234567@@##￥%……&&**（（（）））））））！@#￥%……&*（））（&%￥￥#￥%……&**！@~~！！@#￥%……&*（：“：”；“”：：“《》》？？{}哈哈哈哈()~!@@##$%^^&&**(())___+[`!@#$%^&*()_!@#$%^&*()_!@#$%^&*()_+~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]";

//  PPOTWWERTYUIOSDFGHJKLXCVBNM887676555433222090--098776654112234567哈哈哈哈______
Util.string.excludeSpecial(test);

const test2 = "sdfffjh@s#sk%jn";

// 用自定义的正则提取，这里只剔除 @和# 结果为: sdfffjhssk%jn
Util.string.excludeSpecial(test, /[@#]/g);
```