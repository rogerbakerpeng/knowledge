# Util.cookie

## 使用场景

**平台差异**

|  H5   | 新点小程序 | 微信小程序 | 支付宝小程序 |
| :---: | :--------: | :--------: | :----------: |
|   √   |     √      |     X      |      X       |

该工具类封装了一些常用的`cookie`操作，包括

- 设置某个字段值存到`cookie`中

- 获取`cookie`中的某个字段值

- 移除`cookie`的某个字段值

## 方法说明

注：此工具集下的方法以 `Util.cookie` 为前缀进行调用

### set(key, value, attributes)

设置某个字段值存到`cookie`中，且返回设置的字段值和属性，方法默认的属性为：`path=/`。

`cookie`可设置哪些属性可查看该文档：[cookie](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie)

**注意**

若设置的`expires`属性为一个数字，则代表天数。

```js
Util.cookie.set('key', 'value'); // “key=value;path=/”

Util.cookie.set('key', 'value', { 'max-age': '30' }); // “key=value;path=/;max-age=30”
```

### get(key)

获取`cookie`中的某个字段值

```js
Util.cookie.get('key');// value
```

### remove(key, attributes)

移除`cookie`的某个字段值。

**注意**

若删除的`cookie`字段的属性不是默认属性，必须传递与设置该`cookie`字段时的完全相同的路径`path`和域`domain`属性，否则会删除失败。

```js
Util.cookie.remove('key'); // 使用的默认path和domain

Util.cookie.remove('key', { path: '../' }); // 设置了自定义的path
```
