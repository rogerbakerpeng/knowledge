/**
 * 作者: 郭天琦
 * 创建时间: 2017/05/23
 * 版本: [1.0, 2017/05/23 ]
 * 版权: 江苏国泰新点软件有限公司
 * 描述: 统一前端框架，统一Util文件
 */
'use strict';

window.Util = window.Util || (function(exports) {

    /**
     * 产生一个 唯一uuid，默认为32位的随机字符串，8-4-4-4-12 格式
     * @param {Object} options 配置参数
     * len 默认为32位，最大不能超过36，最小不能小于4
     * radix 随机的基数，如果小于等于10代表只用纯数字，最大为62，最小为2，默认为62
     * type 类别，默认为default代表 8-4-4-4-12的模式，如果为 noline代表不会有连线
     * @return {String} 返回一个随机性的唯一uuid
     */
    exports.uuid = function(options) {
        options = options || {};

        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''),
            uuid = [],
            i;
        var radix = options.radix || chars.length;
        var len = options.len || 32;
        var type = options.type || 'default';

        len = Math.min(len, 36);
        len = Math.max(len, 4);
        radix = Math.min(radix, 62);
        radix = Math.max(radix, 2);

        if (len) {
            for (i = 0; i < len; i++) {
                uuid[i] = chars[0 | Math.random() * radix];
            }

            if (type === 'default') {
                len > 23 && (uuid[23] = '-');
                len > 18 && (uuid[18] = '-');
                len > 13 && (uuid[13] = '-');
                len > 8 && (uuid[8] = '-');
            }
        }

        return uuid.join('');
    };

    var class2type = {};

    exports.noop = function() {};

    exports.isFunction = function(value) {
        return exports.type(value) === 'function';
    };
    exports.isPlainObject = function(obj) {
        return exports.isObject(obj) && !exports.isWindow(obj) && Object.getPrototypeOf(obj) === Object.prototype;
    };
    exports.isArray = Array.isArray ||
        function(object) {
            return object instanceof Array;
        };

    /**
     * isWindow(需考虑obj为undefined的情况)
     * @param {Object} obj 需要判断的对象
     * @return {Boolean} 返回true或false
     */
    exports.isWindow = function(obj) {
        return obj && obj === window;
    };
    exports.isObject = function(obj) {
        return exports.type(obj) === 'object';
    };
    exports.type = function(obj) {
        return (obj === null || obj === undefined) ? String(obj) : class2type[{}.toString.call(obj)] || 'object';
    };

    /**
     * each遍历操作
     * @param {Object} elements 元素
     * @param {Function} callback 回调
     * @param {Function} hasOwnProperty 过滤函数
     * @returns {global} 返回调用的上下文
     */
    exports.each = function(elements, callback, hasOwnProperty) {
        if (!elements) {
            return this;
        }
        if (typeof elements.length === 'number') {
            [].every.call(elements, function(el, idx) {
                return callback.call(el, idx, el) !== false;
            });
        } else {
            for (var key in elements) {
                if (hasOwnProperty) {
                    if (elements.hasOwnProperty(key)) {
                        if (callback.call(elements[key], key, elements[key]) === false) {
                            return elements;
                        }
                    }
                } else {
                    if (callback.call(elements[key], key, elements[key]) === false) {
                        return elements;
                    }
                }
            }
        }

        return this;
    };

    /**
     * extend 合并多个对象，可以递归合并
     * @param {type} deep 是否递归合并
     * @param {type} target 最终返回的就是target
     * @param {type} source 从左到又，优先级依次提高，最右侧的是最后覆盖的
     * @returns {Object} 最终的合并对象
     */
    exports.extend = function() {
        var args = [].slice.call(arguments);

        // 目标
        var target = args[0] || {},
            // 默认source从1开始
            index = 1,
            len = args.length,
            // 默认非深复制
            deep = false;

        if (typeof target === 'boolean') {
            // 如果开启了深复制
            deep = target;
            target = args[index] || {};
            index++;
        }

        if (!exports.isObject(target)) {
            // 确保拓展的一定是object
            target = {};
        }

        for (; index < len; index++) {
            // source的拓展
            var source = args[index];

            if (source && exports.isObject(source)) {
                for (var name in source) {
                    if (!Object.prototype.hasOwnProperty.call(source, name)) {
                        // 防止原型上的数据
                        continue;
                    }

                    var src = target[name];
                    var copy = source[name];
                    var clone,
                        copyIsArray;

                    if (target === copy) {
                        // 防止环形引用
                        continue;
                    }

                    // 这里必须用isPlainObject,只有同样是普通的object才会复制继承，如果是FormData之流的，会走后面的覆盖路线
                    if (deep && copy && (exports.isPlainObject(copy) || (copyIsArray = exports.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && exports.isArray(src) ? src : [];
                        } else {
                            clone = src && exports.isPlainObject(src) ? src : {};
                        }

                        target[name] = exports.extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        // 如果不是普通的object，直接覆盖，例如FormData之类的会覆盖
                        target[name] = copy;
                    }
                }
            }
        }

        return target;
    };

    exports.each(['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Object', 'Error'], function(i, name) {
        class2type['[object ' + name + ']'] = name.toLowerCase();
    });

    /**
     * 选择这段代码用到的太多了，因此抽取封装出来
     * @param {Object} element dom元素或者selector
     * @return {HTMLElement} 返回对应的dom
     */
    exports.selector = function(element) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }

        return element;
    };

    /**
     * 判断值是否为空
     * @param {String} value 值
     */
    exports.isNull = function(value) {
        return value === null || value === undefined;
    };

    /**
     * 设置一个Util对象下的命名空间
     * @param {String} namespace 命名空间
     * @param {Object} obj 需要赋值的目标对象
     * @return {Object} 返回目标对象
     */
    exports.namespace = function(namespace, obj) {
        var parent = window.Util;

        if (!namespace) {
            return parent;
        }

        var namespaceArr = namespace.split('.'),
            len = namespaceArr.length;

        for (var i = 0; i < len - 1; i++) {
            var tmp = namespaceArr[i];

            // 不存在的话要重新创建对象
            parent[tmp] = parent[tmp] || {};
            // parent要向下一级
            parent = parent[tmp];
        }
        parent[namespaceArr[len - 1]] = obj;

        return parent[namespaceArr[len - 1]];
    };

    /**
     * 获取这个模块下对应命名空间的对象
     * 如果不存在，则返回null，这个api只要是供内部获取接口数据时调用
     * @param {Object} module 模块
     * @param {Array} namespace 命名空间
     * @return {Object} 返回目标对象
     */
    exports.getNameSpaceObj = function(module, namespace) {
        if (!namespace) {
            return null;
        }
        var namespaceArr = namespace.split('.'),
            len = namespaceArr.length;

        for (var i = 0; i < len; i++) {
            module && (module = module[namespaceArr[i]]);
        }

        return module;
    };

    /**
     * 将string字符串转为html对象,默认创一个div填充
     * 因为很常用，所以单独提取出来了
     * @param {String} strHtml 目标字符串
     * @return {HTMLElement} 返回处理好后的html对象,如果字符串非法,返回null
     */
    exports.parseHtml = function(strHtml) {
        if (!strHtml || typeof(strHtml) !== 'string') {
            return null;
        }
        // 创一个灵活的div
        var i,
            a = document.createElement('div');
        var b = document.createDocumentFragment();

        a.innerHTML = strHtml;
        while ((i = a.firstChild)) {
            b.appendChild(i);
        }

        return b;
    };

    /**
     * 图片的base64字符串转Blob
     * @param {String} urlData 完整的base64字符串
     * @return {Blob} 转换后的Blob对象，可用于表单文件上传
     */
    exports.base64ToBlob = function(urlData) {
        var arr = urlData.split(',');
        var mime = arr[0].match(/:(.*?);/)[1] || 'image/png';
        // 去掉url的头，并转化为byte
        var bytes = window.atob(arr[1]);
        // 处理异常,将ascii码小于0的转换为大于0
        var ab = new ArrayBuffer(bytes.length);
        // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
        var ia = new Uint8Array(ab);

        for (var i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i);
        }

        return new Blob([ab], {
            type: mime
        });
    };

    /**
     * 通过传入key值,得到页面key的初始化传值
     * 实际情况是获取 window.location.href 中的参数的值
     * @param {String} key 键名
     * @return {String} 键值
     */
    exports.getExtraDataByKey = function(key) {
        if (!key) {
            return '';
        }

        var search = decodeURIComponent(window.location.search);
        var reg = new RegExp(key + '=([^&#]*)');
        var matches = search.match(reg);

        return matches && Array.isArray(matches) && matches[1] || '';
    };

    // 避免提示警告
    var Console = console;

    exports.log = function() {
        // 方便后续控制
        Console.log.apply(this, arguments);
    };

    exports.warn = function() {
        Console.warn.apply(this, arguments);
    };

    exports.error = function() {
        Console.error.apply(this, arguments);
    };

    return exports;
})({});