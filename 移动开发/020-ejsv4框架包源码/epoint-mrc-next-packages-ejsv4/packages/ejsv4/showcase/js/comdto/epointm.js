/**
 * 作者: guotq
 * 时间: 2019-6-18
 * 描述:  f9移动端适配文件
 * MControl 目前作为文件引入，全局绑定在window上
 */
(function (win, $) {

    var dio = new(function () {
        var sb = [];
        var _dateFormat = null;
        var useHasOwn = !!{}.hasOwnProperty,
            replaceString = function (a, b) {

                var c = m[b];
                if (c) {

                    //sb[sb.length] = c;
                    return c;
                }
                c = b.charCodeAt();
                return "\\u00" + Math.floor(c / 16).toString(16) + (c % 16).toString(16);

            },
            doEncode = function (o, field) {

                if (o === null) {
                    sb[sb.length] = "null";
                    return;
                }
                var t = typeof o;
                if (t == "undefined") {
                    sb[sb.length] = "null";
                    return;
                } else if (o.push) { //array

                    sb[sb.length] = '[';
                    var b, i, l = o.length,
                        v;
                    for (i = 0; i < l; i += 1) {
                        v = o[i];
                        t = typeof v;
                        if (t == "undefined" || t == "function" || t == "unknown") {} else {
                            if (b) {
                                sb[sb.length] = ',';
                            }
                            doEncode(v);

                            b = true;
                        }
                    }
                    sb[sb.length] = ']';
                    return;
                } else if (o.getFullYear) {
                    if (_dateFormat) {
                        sb[sb.length] = '"';
                        if (typeof _dateFormat == 'function') {
                            sb[sb.length] = _dateFormat(o, field);
                        } else {
                            sb[sb.length] = mini.formatDate(o, _dateFormat);
                        }
                        sb[sb.length] = '"';
                    } else {
                        var n;
                        sb[sb.length] = '"';
                        sb[sb.length] = o.getFullYear();
                        sb[sb.length] = "-";
                        n = o.getMonth() + 1;
                        sb[sb.length] = n < 10 ? "0" + n : n;
                        sb[sb.length] = "-";
                        n = o.getDate();
                        sb[sb.length] = n < 10 ? "0" + n : n;
                        sb[sb.length] = "T"
                        n = o.getHours();
                        sb[sb.length] = n < 10 ? "0" + n : n;
                        sb[sb.length] = ":"
                        n = o.getMinutes();
                        sb[sb.length] = n < 10 ? "0" + n : n;
                        sb[sb.length] = ":"
                        n = o.getSeconds();
                        sb[sb.length] = n < 10 ? "0" + n : n;
                        sb[sb.length] = '"';
                    }
                    return;
                } else if (t == "string") {
                    if (strReg1.test(o)) {
                        sb[sb.length] = '"';

                        sb[sb.length] = o.replace(strReg2, replaceString);
                        sb[sb.length] = '"';
                        return;
                    }
                    sb[sb.length] = '"' + o + '"';
                    return;
                } else if (t == "number") {
                    sb[sb.length] = o;
                    return;
                } else if (t == "boolean") {
                    sb[sb.length] = String(o);
                    return;
                } else { //object
                    sb[sb.length] = "{";
                    var b, i, v;
                    for (i in o) {
                        //if (!useHasOwn || (o.hasOwnProperty && o.hasOwnProperty(i))) {
                        if (!useHasOwn || Object.prototype.hasOwnProperty.call(o, i)) {

                            v = o[i];
                            t = typeof v;
                            if (t == "undefined" || t == "function" || t == "unknown") {} else {
                                if (b) {
                                    sb[sb.length] = ',';
                                }
                                doEncode(i);
                                sb[sb.length] = ":";
                                doEncode(v, i)

                                b = true;
                            }
                        }
                    }
                    sb[sb.length] = "}";
                    return;
                }
            },
            m = {
                "\b": '\\b',
                "\t": '\\t',
                "\n": '\\n',
                "\f": '\\f',
                "\r": '\\r',
                '"': '\\"',
                "\\": '\\\\'
            },
            strReg1 = /["\\\x00-\x1f]/,
            strReg2 = /([\x00-\x1f\\"])/g;

        this.encode = function () {

            var ec;
            return function (o, dateFormat) {
                sb = [];

                _dateFormat = dateFormat;
                doEncode(o);

                _dateFormat = null;

                return sb.join("");
            };
        }();
        this.decode = function () {

            //        var dateRe1 = /(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})/g;
            //        var dateRe2 = new RegExp('\/Date\\(([0-9]+)\\)\/', 'g');
            //var dateRe2 = new RegExp('\/Date\((\d+)\)\/', 'g');


            //"2000-11-12 11:22:33", "2000-05-12 11:22:33", "2008-01-11T12:22:00", "2008-01-11T12:22:00.111Z"


            var dateRe1 = /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2}(?:\.*\d*)?)Z*$/;
            //"\/Date(1382101422005)\/", "//Date(1034000000000)//", "/Date(1034000000000+0800)/"
            var dateRe2 = new RegExp('^\/+Date\\((-?[0-9]+)\.*\\)\/+$', 'g');

            var re = /[\"\'](\d{4})-(\d{1,2})-(\d{1,2})[T ](\d{1,2}):(\d{1,2}):(\d{1,2})(\.*\d*)[\"\']/g;

            return function (json, parseDate) {
                if (json === "" || json === null || json === undefined) return json;

                if (typeof json == 'object') { //不应该序列化，应该遍历处理日期字符串
                    json = this.encode(json);
                }

                function evalParse(json) {
                    if (parseDate !== false) {

                        //json = json.replace(__js_dateRegEx, "$1new Date($2)");

                        json = json.replace(__js_dateRegEx, "$1new Date($2)");
                        json = json.replace(re, "new Date($1,$2-1,$3,$4,$5,$6)");
                        json = json.replace(__js_dateRegEx2, "new Date($1)");
                    }
                    return window["ev" + "al"]('(' + json + ')');
                }


                var data = null;


                if (window.JSON && window.JSON.parse) {

                    var dateReviver = function (key, value) {
                        if (typeof value === 'string' && parseDate !== false) {
                            //dateRe1
                            dateRe1.lastIndex = 0;
                            var a = dateRe1.exec(value);
                            if (a) {
                                value = new Date(a[1], a[2] - 1, a[3], a[4], a[5], a[6]);

                                return value;
                            }
                            //dateRe2
                            dateRe2.lastIndex = 0;
                            var a = dateRe2.exec(value);
                            if (a) {
                                value = new Date(parseInt(a[1]));

                                return value;
                            }
                        }
                        return value;
                    };

                    try {
                        var json2 = json.replace(__js_dateRegEx, "$1\"\/Date($2)\/\"");
                        data = window.JSON.parse(json2, dateReviver);
                    } catch (ex) {
                        data = evalParse(json);
                    }

                } else {

                    data = evalParse(json);
                }
                return data;
            };

        }();

    })();

    var epm = {
        // 保存所有new出来的mui组件，用id作为索引
        components: {},
        idIndex: 0,
        generateId: function (pre) {
            return (pre || 'epm-') + this.idIndex++;
        },
        // 根据id获取mui组件实例，主要用于commondto中实现建立页面dom元素与实际mui组件的联系
        get: function (id) {
            return epm.components[id] || null;
        },
        set: function (id, control) {
            epm.components[id] = control;
        },
        /**
         * 将某个对象转换成json字符串
         *
         * @param obj 对象
         */
        encodeJson: function (obj) {
            return JSON.stringify(obj);
        },
        /**
         * 将json字符串转换为对象
         *
         * @param json  要转换的json字符串
         */
        decodeJson: function (json) {
            return JSON.parse(json);
        },
        /**
         * utf-8编码函数
         *
         * @param s1  要编码的数据
         */
        encodeUtf8: function (s1) {
            var s = escape(s1);
            var sa = s.split("%");
            var retV = "";
            var Hex2Utf8 = epm.Hex2Utf8;
            var Str2Hex = epm.Str2Hex;
            if (sa[0] !== "") {
                retV = sa[0];
            }
            for (var i = 1; i < sa.length; i++) {
                if (sa[i].substring(0, 1) == "u") {
                    retV += Hex2Utf8(Str2Hex(sa[i].substring(1, 5)));
                    if (sa[i].length > 5) {
                        retV += sa[i].substring(5);
                    }

                } else retV += "%" + sa[i];
            }

            return retV;
        },
        Hex2Utf8: function (s) {
            var retS = "";
            var tempS = "";
            var ss = "";
            var Dig2Dec = epm.Dig2Dec;
            if (s.length == 16) {
                tempS = "1110" + s.substring(0, 4);
                tempS += "10" + s.substring(4, 10);
                tempS += "10" + s.substring(10, 16);
                var sss = "0123456789ABCDEF";
                for (var i = 0; i < 3; i++) {
                    retS += "%";
                    ss = tempS.substring(i * 8, (eval(i) + 1) * 8);

                    retS += sss.charAt(Dig2Dec(ss.substring(0, 4)));
                    retS += sss.charAt(Dig2Dec(ss.substring(4, 8)));
                }
                return retS;
            }
            return "";
        },
        Str2Hex: function (s) {
            var c = "";
            var n;
            var ss = "0123456789ABCDEF";
            var digS = "";
            var Dec2Dig = epm.Dec2Dig;
            for (var i = 0; i < s.length; i++) {
                c = s.charAt(i);
                n = ss.indexOf(c);
                digS += Dec2Dig(eval(n));
            }
            // return value;
            return digS;
        },
        Dig2Dec: function (s) {
            var retV = 0;
            if (s.length == 4) {
                for (var i = 0; i < 4; i++) {
                    retV += eval(s.charAt(i)) * Math.pow(2, 3 - i);
                }
                return retV;
            }
            return -1;
        },
        Dec2Dig: function (n1) {
            var s = "";
            var n2 = 0;
            for (var i = 0; i < 4; i++) {
                n2 = Math.pow(2, 3 - i);
                if (n1 >= n2) {
                    s += '1';
                    n1 = n1 - n2;
                } else s += '0';

            }
            return s;
        },
        dealUrl: function (url, isCommondto) {
            /*
             * 不用加上页面路径了，移动端和pc端的页面路径是不一样的，而且有没有页面路径对于后台来说都是一样的 //
             * action形式的url需要加上页面路径 // 例如在
             * "/pages/login/login.xhtml"中，url为"login.autoLoad" // 则url会转换为
             * "/pages/login/login.autoLoad" url = getRequestMapping() + '/' +
             * url;
             */

            // TODO: 应根据配置项决定是否需要将"a.b"类型的url转化为"a/b"
            // 将"a.b"类型的url转化为"a/b"
            // restFul形式才需要转换
            if (url.indexOf('.') != -1 && url.indexOf('.jspx') == -1) {
                if (epm.isRestFul) {
                    url = url.replace('.', '/');
                } else if (url.indexOf('cmd=') < 0) {
                    url = url.replace('.', '.action?cmd=');
                }
            }

            // 加上页面地址中的请求参数
            var all = window.location.href;
            var index = all.indexOf('?');
            var hasParam = url.indexOf('?') > -1;

            if (index != -1) {
                if (hasParam) {
                    url += '&' + all.substring(index + 1);
                } else {
                    url += '?' + all.substring(index + 1);
                }

                if (isCommondto) {
                    // 加上isCommondto标识
                    // 用来给后台区分与其他不是通过epoint中的三个方法发送的请求
                    url += '&isCommondto=true';
                }

            } else if (isCommondto) {
                if (hasParam) {
                    url += '&isCommondto=true';
                } else {
                    url += '?isCommondto=true';
                }
            }

            url = epm.getRightUrl('rest/' + url);
            return url;
        },
        encode: dio.encode,
        decode: dio.decode,
        mask: $.createMask(),
        // 显示遮罩
        showMask: function () {
            this.mask.show();
        },
        // 关闭遮罩
        hideMask: function () {
            this.mask.close();
        },
        // 处理二次请求返回的数据
        getSecondRequestData: function (data) {
            var status = data.status;

            // 处理后台返回的状态码
            if (status) {
                var code = parseInt(status.code),
                    text = status.text,
                    url = status.url;

                if (code >= 300) {
                    if (url) {
                        win.location.href = this.getRightUrl(url);
                    } else {
                        $.alert(text, '提示', '我知道了');
                    }
                    return;
                }

            }

            if (data.controls) {
                data = data.controls[0];
            }

            return data;

        },

        // 返回完整的WebContent根路径
        getRootPath: function () {
            var loc = window.location,
                host = loc.hostname,
                protocol = loc.protocol,
                port = loc.port ? (':' + loc.port) : '',
                path = (window._rootPath !== undefined ? _rootPath : ('/' + loc.pathname.split('/')[1])) + '/';

            var rootPath = protocol + '//' + host + port + path;

            return rootPath;
        },

        // 返回适合的url
        // 1.url为全路径，则返回自身
        // 2.url为，则返回自身
        // 3.url为WebContent开始的路径，则补全为完整的路径
        getRightUrl: function (url) {
            if (!url) return '';

            // 是否是相对路径
            var isRelative = url.indexOf('./') != -1 || url.indexOf('../') != -1;

            // 全路径、相对路径直接返回
            if (/^(http|https|ftp)/g.test(url) || isRelative) {
                url = url;
            } else {
                url = this.getRootPath() + url;
            }

            return url;
        },

        _pageLoagding: $('body>.page-loading'),

        hidePageLoading: function () {
            if (this._pageLoagding && this._pageLoagding.length) {
                document.body.removeChild(this._pageLoagding[0]);
                this._pageLoagding = undefined;
            }
        },
        delsemiforstring: function (str, separator) {
            separator = separator || ';';
            var reg = new RegExp(separator + '$');

            return str.replace(reg, '');
        },
        // 解析配置参数
        // 不用JSON.parse的方法是因为JSON.parse方法要求参数为严格的json格式
        // 而控件的配置参数我们之前是可以不加引号或用单引号的
        parseJSON: function (str) {
            return eval("(" + str + ")");
        },
        // 获取class为cls的最近父元素
        closest: function (dom, cls) {
            if (!dom || !cls) {
                return;
            }
            var parent = dom.parentNode,
                className = parent.className;

            if ((' ' + className + ' ').indexOf(' ' + cls + ' ') >= 0) {
                return parent;
            } else if (parent.tagName === 'BODY') {
                return;
            } else {
                return this.closest(parent, cls);
            }
        },
        getCookie: function (name) {
            var arr,
                reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg)) {
                return unescape(arr[2]);
            } else {
                return null;
            }
        },
        // 拓展的方法
        extend: function () {
            var options, name, src, copy, copyIsArray, clone,
                target = arguments[0] || {},
                i = 1,
                length = arguments.length,
                deep = false;

            if (typeof target === "boolean") {
                deep = target;
                target = arguments[i] || {};
                i++;
            }
            if (typeof target !== "object" && !exports.isFunction(target)) {
                target = {};
            }
            if (i === length) {
                target = this;
                i--;
            }
            for (; i < length; i++) {
                if ((options = arguments[i]) != null) {
                    for (name in options) {
                        src = target[name];
                        copy = options[name];
                        if (target === copy) {
                            continue;
                        }
                        if (deep && copy && (exports.isPlainObject(copy) || (copyIsArray = exports.isArray(copy)))) {
                            if (copyIsArray) {
                                copyIsArray = false;
                                clone = src && exports.isArray(src) ? src : [];

                            } else {
                                clone = src && exports.isPlainObject(src) ? src : {};
                            }

                            target[name] = epm.extend(deep, clone, copy);
                        } else if (copy !== undefined) {
                            target[name] = copy;
                        }
                    }
                }
            }
            return target;
        },
        // 为下拉刷新服务
        appendHtmlChildCustom: function (targetObj, childElem) {
            if (typeof targetObj === 'string') {
                targetObj = document.querySelector(targetObj);
            }
            if (targetObj == null || childElem == null || !(targetObj instanceof HTMLElement)) {
                return;
            }
            if (childElem instanceof HTMLElement) {
                targetObj.appendChild(childElem);
            } else {
                // 否则,创建dom对象然后添加
                var tmpDomObk = exports.pareseStringToHtml(childElem);
                if (tmpDomObk != null) {
                    targetObj.appendChild(tmpDomObk);
                }
            }

        },
        getChildElemLength: function (targetObj) {
            if (!(targetObj instanceof HTMLElement)) {
                return 0;
            }
            return targetObj.children.length;
        },

        isUseConfig: window.Config && window.Config.comdto && window.Config.comdto.isUseConfig,

        isRestFul: window.Config && window.Config.comdto && window.Config.comdto.isRestFul,

        isMock: window.Config && window.Config.comdto && window.Config.comdto.isMock,

        requestMethod: (window.Config && window.Config.comdto && window.Config.comdto.requestMethod) || 'post'
    };
    // 如果存在配置文件
    if (epm.isUseConfig) {
        // 测试时候的重写
        epm.getRootPath = function () {
            return window.Config.comdto.rootUrl;
        };
        // epm.getRightUrl = function(url) {
        // if(!url) return '';
        //
        // // 是否是相对路径
        // var isRelative = url.indexOf('./') != -1 || url.indexOf('../') != -1;
        //
        // // 全路径、相对路径直接返回
        // if(/^(http|https|ftp)/g.test(url) || isRelative) {
        // url = url;
        // } else {
        // url = this.getRootPath() + url;
        // }
        //
        // return url;
        // };
    }

    win.epm = epm;
})(window, window.mui);

(function () {
    "use strict";

    Util.loadJs(Config.bizRootPath + 'js/utils/util.string.js');

    // epointm内容
    (function () {
        // 先初始化页面上的控件
        MControl.init(function (control) {
            var controlType = control.type;

            if (controlType == 'datagrid' || controlType == 'webuploader' || controlType == 'treeselect-non-nested') {
                control.onGetRequestData = function (isCheckedDir) {
                    // 获取自己的数据模型
                    var data = null;

                    data = new CommonDto(this.id).getData(true);

                    if (controlType == 'datagrid' || (controlType == 'treeselect-non-nested' && !isCheckedDir)) {
                        data[0].isSecondRequest = true;
                    }

                    if (isCheckedDir) {
                        data[0].eventType = 'checkedchanged';
                    }
                    // 拼上额外数据
                    if (this.extraId) {
                        var ids = this.extraId.split(',');
                        for (var i = 0; i < ids.length; i++) {
                            data = data.concat(new CommonDto(ids[i]).getData(true));
                        }
                    }

                    return {
                        commonDto: JSON.stringify(data)
                    };
                };
            }
        });

        // 属性扩展
        var extendAttr = function (base, attrs) {
            for (var key in attrs) {
                if (attrs[key]) {
                    base[key] = attrs[key];
                }
            }
        };

        var CommonDto = function (scope, action, initHook, initControl) {
            this.controls = {};

            // 页面action，用于拼接url
            this.action = action;
            this.initHook = initHook;

            var self = this;
            var i, l;

            var controls = [];

            function getControls(scope) {
                var $scope = mui('#' + scope);

                if ($scope[0] && /ep-mui-\w*/g.test($scope[0].className)) {
                    // 有以"ep-mui-"开头的class，说明它本身就是要处理的控件，直接返回其本身
                    // 不考虑有控件嵌套的情况
                    return $scope;
                } else {
                    return mui('[class*="ep-mui-"]', $scope);
                }
            }

            if (scope != '@none') {
                if (!scope || scope === '@all') {
                    controls = mui('[class*="ep-mui-"]');
                } else {
                    if (Array.isArray(scope)) {
                        for (i = 0, l = scope.length; i < l; i++) {
                            controls = controls.concat(getControls(scope[i]));
                        }
                    } else {
                        controls = controls.concat(getControls(scope));
                    }
                }
            }

            for (i = 0, l = controls.length; i < l; i++) {
                var control = controls[i],
                    mcontrol = epm.get(control.id);

                if (mcontrol) {
                    self.controls[mcontrol.id] = mcontrol;

                    // 根据控件action设置控件的url
                    // 主要用于有二次请求的控件（表格）
                    if (initControl && mcontrol.action && mcontrol.setUrl) {
                        mcontrol.setUrl(epm.dealUrl(this.action + '.' + mcontrol.action));
                    }
                }
            }
        };

        CommonDto.prototype = {
            constructor: CommonDto,

            /*
             * 获取控件数据 @params original 控制是否返回原始数据，返回原始数据是为了方便外部操作控件字段
             */
            getData: function (original) {
                var data = [],
                    control,
                    controlData,
                    dataOptions,
                    hidden;
                // 遍历所有控件
                for (var id in this.controls) {
                    control = this.controls[id];

                    // 把data-options加到控件数据中
                    controlData = control.getModule();
                    dataOptions = control.getAttribute('data-options');
                    if (dataOptions) {
                        controlData["dataOptions"] = epm.parseJSON(dataOptions);
                    }
                    data.push(controlData);
                    if (id == '_common_hidden_viewdata') {
                        hidden = control;
                    }
                }

                if (!hidden) {
                    hidden = epm.get('_common_hidden_viewdata');

                    if (hidden) {
                        data.push(hidden.getModule());
                    } else {
                        data.push({
                            id: '_common_hidden_viewdata',
                            type: 'hidden',
                            value: ''
                        });
                    }

                }

                if (original) {
                    return data;
                } else {
                    return {
                        commonDto: JSON.stringify(data)
                    };
                }

            },

            setData: function (data, customData) {
                var id, control, item;

                for (var i = 0, l = data.length; i < l; i++) {
                    item = data[i];
                    id = item.id;
                    control = this.controls[id];

                    if (id === '_common_hidden_viewdata') {
                        this.createHiddenView(item);
                    }

                    if (!control) {
                        continue;
                    }

                    if (item.value !== undefined && control.setValue) {
                        control.setValue(item.value);
                    }
                    if (item.text !== undefined && control.setText) {
                        control.setText(item.text);
                    }
                    if (item.data && control.setData) {
                        control.setData(item.data);

                        if (item.total && control.setTotal) {
                            control.setTotal(item.total);
                        }
                    }

                    if (this.initHook) {
                        this.initHook.call(this, control, item, customData);
                    }
                }
            },
            createHiddenView: function (data) {
                var control = epm.get('_common_hidden_viewdata');

                if (control) {
                    control.setValue(data.value);
                    return;
                }

                var input = document.createElement('input');

                input.id = '_common_hidden_viewdata';
                input.type = 'hidden';
                input.className = 'ep-mui-hidden';
                control = new controlMap['ep-mui-hidden'](input);

                control.setValue(data.value);
                control.render('#body');
                epm.set(control.id, control);
            },
            init: function (opts) {
                var self = this;
                var data = this.getData();

                if (opts.params) {
                    data.cmdParams = opts.params;
                }
                if (!opts.notShowLoading) {
                    epm.showMask();
                }
                // TODO: 发送请求
                Util.ajax({
                    url: opts.url,
                    type: epm.requestMethod,
                    dataType: 'json',
                    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
                    data: data,
                    beforeSend: function (XMLHttpRequest) {
                        // F9框架做了csrf攻击的防御
                        var csrfcookie = epm.getCookie('_CSRFCOOKIE');
                        if (csrfcookie) {
                            XMLHttpRequest.setRequestHeader("CSRFCOOKIE", csrfcookie);
                        }
                    },
                    success: function (data) {
                        var status = data.status,
                            controls = data.controls,
                            custom = data.custom || '',
                            code = parseInt(status.code),
                            text = status.text,
                            url = status.url;

                        if (code == 0) {
                            if (url) {

                                url = epm.getRightUrl(url);
                                Util.ejs.ui.alert('错误:' + JSON.stringify(status));
                                return;
                                // if (status.top) {
                                // top.window.location.href = url;
                                // } else {
                                // window.location.href = url;

                                // }
                            } else {

                                if (opts.fail) {
                                    opts.fail.call(self, text, status);

                                } else {
                                    Util.ejs.alert(text, '提示', '我知道了');

                                }

                            }
                        } else if (code == 1) {
                            controls.length && self.setData(controls, custom);

                            opts.done && opts.done.call(self, custom);
                        }

                    },
                    complete: function () {
                        if (!opts.notShowLoading) {
                            epm.hideMask();
                        }
                    }
                });

            }

        };

        var epointm = {
            /**
             * 初始化页面
             *
             * @param url
             *            ajax请求地址(如果不传，默认为page_Load)
             * @param ids
             *            要回传的页面元素id，是个数组['tree', 'datagrid1']
             * @param callback
             *            回调事件
             * @param opt
             *            其他参数 isPostBack 是否是回传，默认为false keepPageIndex 是否停留在当前页码
             *            默认为false initHook: 初始化时控件在setValue后的回调
             */
            initPage: function (url, ids, callback, fail, opt) {
                var initHook;
                if (typeof fail === 'object' && opt === undefined) {
                    opt = fail;
                    fail = undefined;
                }

                opt = opt || {};
                if (typeof opt == 'function') {
                    initHook = opt;
                    opt = {};
                } else {
                    initHook = opt.initHook;
                }

                var urlArr = url.split('?'),
                    subUrl = urlArr[0],
                    urlParam = urlArr[1];

                var len = subUrl.indexOf('.'),
                    action = (len > 0 ? subUrl.substr(0, len) : subUrl);

                if (!this.getCache('action')) {
                    this.setCache('action', action);
                    this.setCache('urlParam', urlParam);
                    this.setCache('callback', callback);
                }

                // 非模拟数据情况下才需要处理url
                if (!epm.isMock) {
                    if (len < 0) {
                        subUrl += ".page_Load";
                    }

                    url = subUrl + (urlParam ? '?' + urlParam : '');
                }


                var params = {};
                if (ids && ids.constructor === Object) {
                    params = ids;
                    ids = undefined;
                }

                /**
                 * 框架访问日志记录的时候，需要记录模块名称，目前是通过action地址反推的，有的项目如果页面地址和action地址不规范的话，可能反推不了。
                 * 所以需要在初始化请求的时候，自动带上页面地址
                 */
                params.pageUrl = window.location.href;
                params = JSON.stringify(params);

                // 在new CommonDto时是否需要初始化控件与action相关的属性
                // 一般只需要在initPage方法中初始化，其他方法不需要
                var initControl = opt.initControl;
                if (initControl === undefined) {
                    initControl = true;
                }

                // 加载页面数据
                var commonDto = new CommonDto(ids, action, initHook, initControl);
                commonDto.init({
                    url: epm.isMock ? url : epm.dealUrl(url, true),
                    method: opt.method,
                    params: params,
                    done: function (data) {
                        if (callback) {
                            callback.call(this, data);
                        }

                        if (window.epoint_afterInit) {
                            window.epoint_afterInit(data);
                        }

                        // 初始化完后隐藏pageloading
                        epm.hidePageLoading();
                    },
                    fail: fail
                });
            },

            /**
             * 刷新页面
             *
             * @param ids
             *            要回传的页面元素id，是个数组['tree', 'datagrid1'],如果不传，默认为整个form
             * @param callback
             *            回调事件
             */
            refresh: function (ids, callback) {
                var url = this.getCache('action') + '.page_Refresh';

                var urlParam = this.getCache('urlParam');

                if (urlParam) {
                    url += '?' + urlParam;
                }

                if (typeof ids == 'function') {
                    callback = ids;
                    ids = '@all';
                }

                callback = callback || this.getCache('callback');

                this.initPage(url, ids, callback, {
                    initControl: false
                });
            },

            /**
             * 提交表单数据
             *
             * @param url
             *            ajax请求地址
             * @param ids
             *            要回传的页面元素id，是个数组['tree', 'datagrid1'],如果不传，默认为整个form
             * @param callback
             *            回调事件
             * @param notShowLoading
             *            是否不显示loading效果
             */
            execute: function (url, ids, params, callback, notShowLoading) {
                var action,
                    index = url.indexOf('.');

                if (!epm.isMock) {
                    // url不带'.'，则表示没带action，则自动加上initPage时的action
                    if (index < 0) {
                        action = this.getCache('action');

                        url = action + '.' + url;
                    } else {
                        action = url.substr(0, index);
                    }
                }

                var commonDto = new CommonDto(ids, action);
                if (typeof params == 'function') {
                    callback = params;
                    params = null;
                }

                if (this.validate(commonDto.controls)) {
                    commonDto.init({
                        url: epm.isMock ? url : epm.dealUrl(url, true),
                        params: (params ? (typeof params == 'string' ? params : epm.encode(params)) : null),
                        done: callback,
                        notShowLoading: notShowLoading
                    });
                }
            },
            validate: function (controls) {
                var vtypes = ['email', 'url', 'int', 'float', 'phone', 'mobile', 'tel', 'postCode', 'orgCode', 'idCard'];
                var vtypesErrMsg = {
                    email: function (msg) {
                        return (msg || '') + '请输入一个有效的电子邮件地址';
                    },
                    url: function (msg) {
                        return (msg || '') + '请输入一个有效的URL';
                    },
                    int: function (msg) {
                        return (msg || '') + '请输入一个整数';
                    },
                    float: function (msg) {
                        return (msg || '') + '请输入一个有效号码';
                    },
                    phone: function () {
                        return '输入的电话号码格式不正确';
                    },
                    mobile: function () {
                        return '输入的手机号码格式不正确';
                    },
                    tel: function () {
                        return '输入的固定电话号码格式不正确';
                    },
                    postCode: function () {
                        return '输入的邮政编码格式不正确';
                    },
                    orgCode: function () {
                        return '输入的组织机构代码格式不正确';
                    },
                    idCard: function () {
                        return '输入的身份证号码格式不正确';
                    }
                };

                for (var key in controls) {
                    var el = controls[key].el;
                    var vtype = el.getAttribute('vtype');
                    var regExp = el.getAttribute('regExp');
                    var maxthenId = el.getAttribute('maxthen');
                    var minthenId = el.getAttribute('minthen');
                    var value = el.value;

                    // 先验证是否为必填
                    if (el.required) {
                        if (value === '') {
                            var text = ($(el).parent().attr('label') || $(el).parent().text() || $(el).parent().prev().text()).replace(/[:: ]$/, '');
                            Util.ejs.ui.toast(el.getAttribute('requiredErrorText') || (text + '不能为空'));
                            return false;
                        }
                    }

                    // 验证是否有 vtype
                    if (vtype && vtypes.indexOf(vtype) !== -1) {
                        var type = 'is' + vtype.charAt(0).toUpperCase() + vtype.slice(1);

                        if (!Util.string[type](value)) {
                            if (vtype == 'email' || vtype == 'url' || vtype == 'int' || vtype == 'float') {
                                Util.ejs.ui.toast(vtypesErrMsg[vtype](el.previousElementSibling.innerHTML));
                            } else {
                                Util.ejs.ui.toast(vtypesErrMsg[vtype]());
                            }

                            return false;
                        }
                    }

                    // 验证是否有自定义正则
                    if (regExp && regExp !== '') {
                        try {
                            regExp = eval(regExp);
                        } catch (error) {
                            throw new Error(el.id + '自定义正则解析出错');
                        }

                        if (value.length >= 1) {
                            if (!regExp.test(value)) {
                                Util.ejs.ui.toast(el.getAttribute('regExpErrText'));
                                return false;
                            }
                        }
                    }

                    // 验证日期 - 比大
                    if (maxthenId) {
                        var res = this.compare(maxthenId, el, '>', function (elText, compareObjText) {
                            return compareObjText + '不能大于' + elText;
                        });

                        if (!res) {
                            return false;
                        }
                    }

                    // 验证日期 - 比小
                    if (minthenId) {
                        var res = this.compare(minthenId, el, '<', function (elText, compareObjText) {
                            return compareObjText + '不能小于' + elText;
                        });

                        if (!res) {
                            return false;
                        }
                    }
                }

                return true;
            },

            compare: function (compareId, el, operator, callback) {
                var compareObj = epm.get(compareId);
                var compareValue = (compareObj && compareObj.value) || compareId;
                var value = el.value;

                if (compareValue && value) {
                    if (operator === '>' && +new Date(compareValue) > +new Date(value)) {
                        Util.ejs.ui.toast(callback(el.previousElementSibling.innerHTML, (compareObj && compareObj.el.previousElementSibling.innerHTML) || compareId));
                        return false;
                    } else if (operator === '<' && +new Date(compareValue) < +new Date(value)) {
                        Util.ejs.ui.toast(callback(el.previousElementSibling.innerHTML, (compareObj && compareObj.el.previousElementSibling.innerHTML) || compareId));
                        return false;
                    }
                }

                return true;
            },

            alert: function (message, title, callback) {
                Util.ejs.alert(message, title, '我知道了', callback);
            },

            confirm: function (message, title, okCallback, cancelCallback) {
                Util.ejs.confirm(message, title, ['确定', '取消'], function (index) {
                    // 确定
                    if (index === 0 && okCallback) {
                        okCallback();
                    } else if (cancelCallback) {
                        cancelCallback();
                    }
                });
            },

            // 在epoint上增加缓存操作
            _cache: {},

            setCache: function (key, value) {
                this._cache[key] = value;
            },

            getCache: function (key) {
                return this._cache[key];
            },

            delCache: function (key) {
                this._cache[key] = null;
                delete this._cache[key];
            }
        };

        window.epointm = epointm;
    })();
})();
