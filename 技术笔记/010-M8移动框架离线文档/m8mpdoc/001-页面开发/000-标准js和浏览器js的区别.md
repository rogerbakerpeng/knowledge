# 标准js和浏览器js的区别


`M8`的js API 由标准`ECMAScript`的 js API 和 Util 扩展 API 这两部分组成。

标准ECMAScript的js仅是最基础的js。浏览器基于它扩展了window、document、navigator等对象。平台小程序也基于标准js扩展了各种wx.xx、my.xx、swan.xx的API。node也扩展了fs等模块。

### 区别

``M8``的js代码，h5端运行于浏览器中。非h5端（包含平台小程序），没有运行在浏览器或webview里。

非H5端，虽然不支持window、document、navigator等浏览器的js API，但也支持标准ECMAScript。

请注意不要把浏览器里的js扩展对象等价于标准js。

所以`M8`的非H5端，一样支持标准js，支持if、for等语法，支持字符串、数字、时间、布尔值、数组、自定义对象等变量类型及各种处理方法。仅仅是不支持window、document、navigator等浏览器专用对象。
