# Util.date

## 使用场景

涉及到日期操作时用到，这个类继承自Date类，拥有原有类的所有方法和属性。

## 初始化

必须先获取到 `MyDate` 对象并进行初始化，然后再操作

```js
const MyDate = new Util.MyDate();
```

注意，这个对象继承自 `Date`，拥有它的全部属性以及它原型上的所有属性

而且`new MyDate()`和`new Date()`解析过程一致

**注意**

微信小程序开发者工具中，MyDate实例未继承 Util.MyDate 原型上属性，但在真机没有问题。
为了方便开发者工具中调试，可以添加以下代码进行兼容：

```js
MyDate.__proto__ = Util.MyDate.prototype;
```

## 静态方法

注：直接 `MyDate.xxx()` 调用

### parseDate(dateString, pattern)

将传入的日期字符串，按格式解析成 `MyDate` 对象

**平台差异**

|  H5   | 新点小程序 | 微信小程序 | 支付宝小程序 |
| :---: | :--------: | :--------: | :----------: |
|   √   |     √      |     √      |      √       |

__参数说明__

| 参数 | 参数类型 | 说明 |
| --- | --- | --- |
| dateString | String | 需解析的日期字符串 |
| pattern | String | 匹配字符串，可以手动传入，或者采用默认值 `YYYY-MM-DD hh:mm:ss:iii` |

注意：返回的是 `MyDate` 对象，继承自 `Date`，如果第一个参数不是传的字符串，就和 `new Date()` 时的解析效果一样。

**示例**

```js
// 按当前日期时间解析
const date1 = MyDate.parseDate();

// 按默认的匹配格式解析：YYYY-MM-DD hh:mm:ss:iii
const date2 = MyDate.parseDate('2022-01-01 00:00:00');

// 按默认的匹配格式解析：YYYY-MM-DD hh:mm:ss:iii
const date3 = MyDate.parseDate('2022/01/01');

// 按特定的匹配格式解析：YYYY-MM-DD
// 譬如这个会忽略日期后的所有参数（默认成0）
const date4 = MyDate.parseDate('2022-01-01 00:00:00', 'YYYY-MM-DD');
```


## 对象方法说明

调用方式：

```js
const myDate = new MyDate(...);

myDate.xxx();
```

### Date对象的所有属性

myDate 拥有 Date 对象的所有属性

### format(format)

**平台差异**

|  H5   | 新点小程序 | 微信小程序 | 支付宝小程序 |
| :---: | :--------: | :--------: | :----------: |
|   √   |     √      |     √      |      √       |

__参数说明__

| 参数 | 参数类型 | 说明 |
| --- | ---- | ---- |
| format | String | 需要输出的格式，注意，`YMDhmsiw`这些关键字分别代表着`年月日时分秒毫秒星期`等概念 |

**示例**

```js
const date = MyDate.parseDate('2022-01-01');

// 2022-01-01
date.format('YYYY/MM/DD');

// 2022年01月01日 00小时00分钟00秒000毫秒 星期1
date.format('YYYY年MM月DD日 HH小时mm分钟ss秒iii毫秒 星期w');
```

**注意**

微信小程序开发者工具中，MyDate.parseDate 返回的 date 对象未继承 Util.MyDate 原型上属性，但在真机没有问题。
为了方便开发者工具中调试，可以添加以下代码进行兼容：

```js
date.__proto__ = Util.MyDate.prototype;
```

### getAbsoluteMillonsTime(isTimezoneOffsetFixed)

返回从1970-01-01 00:00:000到现在的绝对毫秒数

**平台差异**

|  H5   | 新点小程序 | 微信小程序 | 支付宝小程序 |
| :---: | :--------: | :--------: | :----------: |
|   √   |     √      |     √      |      √       |

__参数说明__

| 参数 | 参数类型 | 说明 |
| --- | ---- | ---- |
| format | String | 需要输出的格式，注意，`YMDhmsiw`这些关键字分别代表着`年月日时分秒毫秒星期`等概念 |

**示例**

```js
const date = MyDate.parseDate('2022-01-01');

// 1515142825154（仅举例，随着时间变
date.getAbsoluteMillonsTime();

// 补上和GMT时区的误差
// 1515114083170（仅举例，随着时间变）
date.getAbsoluteMillonsTime(true);
```

### toTimeStap(isTimezoneOffsetFixed)

用法同`getAbsoluteMillonsTime`，只不过是换成字符串输出

**平台差异**

|  H5   | 新点小程序 | 微信小程序 | 支付宝小程序 |
| :---: | :--------: | :--------: | :----------: |
|   √   |     √      |     √      |      √       |

### compare(another, pattern)

和另一个MyDate类型的时间比较

如果当前时间大于`another`，返回结果大于`0`，小于的话结果小于0，否则等于0

**平台差异**

|  H5   | 新点小程序 | 微信小程序 | 支付宝小程序 |
| :---: | :--------: | :--------: | :----------: |
|   √   |     √      |     √      |      √       |

__参数说明__

| 参数 | 参数类型 | 说明 |
| --- | --- | --- |
| another | MyDate | 需要被比较的时间，必须是MyDate对象 |
| pattern | String | 比较模式，可选为`YMDhmsi`中的一个，默认为 `s` 代表精确到秒 |

**示例**

```js
const date1 = MyDate.parseDate();
const date2 = MyDate.parseDate('2022-01-01');

console.log('比较结果：' + date1.compare(date2, 's'));
```

### nextSeconds(num)

获取往后n秒的时间。返回的是一个新的MyDate对象

**平台差异**

|  H5   | 新点小程序 | 微信小程序 | 支付宝小程序 |
| :---: | :--------: | :--------: | :----------: |
|   √   |     √      |     √      |      √       |

__参数说明__

| 参数 | 参数类型 | 说明 |
| --- | --- | --- |
| num | Number | 往后多少秒，譬如 `5` 代表往后5秒，可以传负数，负数代表向前，默认为`0` |

**示例**

```js
const date1 = MyDate.parseDate('2022-01-01');

// 获取date1往后5秒的时间，然后输出，精确到秒
console.log('输出结果：' + date1.nextSeconds(5).format('YYYY-MM-DD hh:mm:ss'));
```


