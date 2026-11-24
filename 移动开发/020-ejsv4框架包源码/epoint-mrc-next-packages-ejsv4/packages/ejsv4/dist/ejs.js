/*!
 * @epoint-mrc/ejsv4 v4.2.23
 * (c) 2017-2026 
 * Released under the ISC License.
 * 
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ejs = factory());
})(this, (function () { 'use strict';

    function weexOsMixin(hybrid) {
      var hybridJs = hybrid;
      var os = hybridJs.os;
      if (weex.isRegisteredModule('ejs')) {
        os.ejs = true;
      }
      if (weex.config.env.osName === 'android') {
        os.android = true;
      }
      if (weex.config.env.osName === 'iOS' || weex.config.env.osName === 'ios') {
        os.ios = true;
        if (weex.config.env.deviceModel.match('iPhone')) {
          os.iPhone = true;
        } else if (weex.config.env.deviceModel.match('iPad')) {
          os.ipad = true;
        }
      }
      os.version = weex.config.env.osVersion;
      // 调整weex位置，在ejs容器中，优先调用ejs原生方法
      hybridJs.supportOsArray.splice(hybridJs.supportOsArray.indexOf('weex'), 1);
      hybridJs.supportOsArray.splice(hybridJs.supportOsArray.indexOf('ejs') + 1, 0, 'weex');
    }

    /**
     * 加入系统判断功能
     * @param {Object} hybrid hybrid对象
     */
    function osMixin(hybrid) {
      var hybridJs = hybrid;
      hybridJs.os = {};
      var detect = function detect(ua) {
        var android = ua.match(/(Android);?[\s/]+([\d.]+)?/);
        if (android) {
          this.os.android = true;
          this.os.version = android[2];
          this.os.isBadAndroid = !/Chrome\/\d/.test(ua);
        }
        var harmonyOs = ua.match(/Harmony(OS)?/);
        if (harmonyOs) {
          this.os.harmonyOs = true;
        }
        var iphone = ua.match(/(iPhone\sOS)\s([\d_]+)/);
        if (iphone) {
          this.os.ios = true;
          this.os.iphone = true;
          this.os.version = iphone[2].replace(/_/g, '.');
        }
        var mac = ua.match(/Mac/i);
        if (mac) {
          this.os.ios = true;
        }
        var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
        if (ipad) {
          this.os.ios = true;
          this.os.ipad = true;
          this.os.version = ipad[2].replace(/_/g, '.');
        }
        var isFireFox = /Firefox/.test(ua);
        var isTablet = /(iPad|PlayBook)/.test(ua) || android && !/Mobile/.test(ua) || isFireFox && /Tablet/.test(ua);
        if (isTablet) {
          this.os.isTablet = true;
        }
        // epoint的容器
        var ejs = ua.match(/EpointEJS/i);
        if (ejs) {
          this.os.ejs = true;
        }
        // epoint小程序容器
        var miniH5 = ua.match(/EpointMiniH5/i);
        if (miniH5) {
          this.os.ejs = true;
          this.os.miniH5 = true;
        }
        // 卡片加载环境是否是原生门户
        var primordial = ua.match(/primordial/i);
        if (primordial) {
          this.os.ejs = true;
          this.os.ejsCard = true;
        }
        // 政务微信容器
        var wxWorkLocal = ua.match(/wxworklocal/i);
        if (wxWorkLocal) {
          this.os.wxWorkLocal = true;
        }
        // 企业微信容器
        var wxWork = ua.match(/wxwork/i);
        if (!wxWorkLocal && wxWork) {
          this.os.wxWork = true;
        }
        // 微信容器
        var wechat = ua.match(/MicroMessenger/i);
        if (!wxWork && !wxWorkLocal && wechat) {
          this.os.wechat = true;
        }
        // welink容器
        var welink = ua.match(/welink/i);
        var cloudlink = ua.match(/cloudlink/i);
        if (welink || cloudlink) {
          this.os.welink = true;
        }
        // 讯盟容器
        var xm = ua.match(/hwminiapp/i);
        if (xm) {
          this.os.xm = true;
        }
        // 政务钉钉容器
        var ddGov = ua.match(/mPaaSClient/i);
        if (!wxWorkLocal && !wxWork && !wechat && !welink && !cloudlink && !xm && ddGov) {
          this.os.ddGov = true;
        }
        // 优化鸿蒙环境下钉钉和政务钉钉的环境区分
        var dd = ua.match(/DingTalk/i);
        if (!ddGov && dd) {
          this.os.dd = true;
        }
        // 支付宝容器
        var alipay = ua.match(/alipay/i);
        if (!ddGov && alipay) {
          this.os.alipay = true;
        }
        // 如果ejs和钉钉都不是，则默认为h5
        if (!ejs && !this.os.dd) {
          this.os.h5 = true;
          // this.os.xm = true;
        }
      };
      // 支持的os放在全局，数组的顺序很重要，不能随便修改
      var supportOsArray = ['dd', 'xm', 'wxWorkLocal', 'wxWork', 'wechat', 'welink', 'ddGov', 'alipay', 'miniH5', 'primordial', 'ejs', 'h5'];
      hybridJs.supportOsArray = supportOsArray;
      // 在这里新增拓展os的方法
      var extendOS = function extendOS(os, cb) {
        if (hybridJs.supportOsArray.indexOf(os) === -1) {
          // 新增支持的os，在头部添加
          hybridJs.supportOsArray.unshift(os);
          // 回调函数中判断并添加os
          cb && cb(hybridJs.os);
        }
      };
      hybridJs.extendOS = extendOS;
      if (typeof weex === 'undefined') {
        window && window.navigator.userAgent && detect.call(hybridJs, window.navigator.userAgent);
      } else {
        // 根据是否存在weex对象判断weex环境
        hybridJs.os.weex = true;
        // weex页面添加os变量
        weexOsMixin(hybridJs);
      }
    }

    /**
     * 不用polyfill，避免体积增大
     * @param {Object} hybrid hybrid对象
     */
    function promiseMixin(hybrid) {
      var hybridJs = hybrid;
      // 暂时去除默认的promise支持，防止普通开发人员不会使用导致报错无法补货
      hybridJs.Promise = Promise;
      hybridJs.getPromise = function () {
        return hybridJs.Promise;
      };
      hybridJs.setPromise = function (newPromise) {
        hybridJs.Promise = newPromise;
      };
    }

    var globalError = {
      /**
       * 1001 api os错误
       */
      ERROR_TYPE_APIOS: {
        code: 1001,
        // 这个只是默认的提示，如果没有新的提示，就会采用默认的提示
        msg: '该API无法在当前OS下运行'
      },
      /**
       * 1002 api modify错误
       */
      ERROR_TYPE_APIMODIFY: {
        code: 1002,
        msg: '不允许更改JSSDK的API'
      },
      /**
       * 1003 module modify错误
       */
      ERROR_TYPE_MODULEMODIFY: {
        code: 1003,
        msg: '不允许更改JSSDK的模块'
      },
      /**
       * 1004 api 不存在
       */
      ERROR_TYPE_APINOTEXIST: {
        code: 1004,
        msg: '调用了不存在的api'
      },
      /**
       * 1005 组件api对应的proto不存在
       */
      ERROR_TYPE_PROTONOTEXIST: {
        code: 1005,
        msg: '调用错误，该组件api对应的proto不存在'
      },
      /**
       * 1006 非容器环境下无法调用自定义组件API
       */
      ERROR_TYPE_CUSTOMEAPINOTEXIST: {
        code: 1006,
        msg: '非容器下无法调用自定义组件API'
      },
      /**
       * 1007 对应的event事件在该环境下不存在
       */
      ERROR_TYPE_EVENTNOTEXIST: {
        code: 1007,
        msg: '对应的event事件在该环境下不存在'
      },
      /**
       * 1008 对应的event事件在该环境下不存在
       */
      ERROR_TYPE_INITVERSIONERROR: {
        code: 1008,
        msg: '初始化版本号错误，请检查容器api的实现情况'
      },
      /**
       * 1009 当前容器版本不支持API
       */
      ERROR_TYPE_APINEEDHIGHNATIVEVERSION: {
        code: 1009,
        msg: '当前API需要更高版本的容器支持'
      },
      /**
       * 2001 ready modify错误-ready回调正常只允许定义一个
       */
      ERROR_TYPE_READYMODIFY: {
        code: 2001,
        msg: 'ready回调不允许多次设置'
      },
      /**
       * 2002 config modify错误-正常一个页面只允许config一次
       */
      ERROR_TYPE_CONFIGMODIFY: {
        code: 2002,
        msg: 'config不允许多次调用'
      },
      /**
       * 2003 config 错误
       */
      ERROR_TYPE_CONFIGERROR: {
        code: 2003,
        msg: 'config校验错误'
      },
      /**
       * 2004 version not support
       */
      ERROR_TYPE_VERSIONNOTSUPPORT: {
        code: 2004,
        msg: '不支持当前容器版本，请确保容器与前端库版本匹配'
      },
      /**
       * 2004 version not support
       */
      ERROR_TYPE_VERSIONNEEDUPGRADE: {
        code: 2005,
        msg: '当前JSSDK库小于容器版本，请将前端库升级到最新版本'
      },
      /**
       * 3000 原生错误(非API错误)，原生捕获到的错误都会通知J5
       */
      ERROR_TYPE_NATIVE: {
        code: 3000,
        msg: '捕获到一处原生容器错误'
      },
      /**
       * 3001 原生调用h5错误  原生通过JSBridge调用h5错误，可能是参数不对
       */
      ERROR_TYPE_NATIVECALL: {
        code: 3001,
        msg: '原生调用H5时参数不对'
      },
      /**
       * 9999 其它未知错误
       */
      ERROR_TYPE_UNKNOWN: {
        code: 9999,
        msg: '未知错误'
      }
    };

    function warn(msg, err) {
      // 模板字符串
      console.error("[hybridJs error]: ".concat(msg), err);
    }
    function log(msg) {
      console.log("[hybridJs log]: ".concat(msg));
    }

    function errorMixin(hybrid) {
      var hybridJs = hybrid;
      var errorFunc;
      /**
       * 提示全局错误
       * @param {Nunber} code 错误代码
       * @param {String} msg 错误提示
       */
      function showError() {
        var code = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '错误!';
        warn("code:".concat(code, ", msg:").concat(msg));
        errorFunc && errorFunc({
          code: code,
          message: msg
        });
      }
      hybridJs.showError = showError;
      hybridJs.globalError = globalError;
      /**
       * 当出现错误时，会通过这个函数回调给开发者，可以拿到里面的提示信息
       * @param {Function} callback 开发者设置的回调(每次会监听一个全局error函数)
       * 回调的参数好似
       * msg 错误信息
       * code 错误码
       */
      hybridJs.error = function error(callback) {
        errorFunc = callback;
        // 兼容钉钉
        if (hybridJs.os.dd && window.dd) {
          window.dd.error(errorFunc);
        }
      };
    }

    function _classCallCheck(a, n) {
      if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
    }
    function _defineProperties(e, r) {
      for (var t = 0; t < r.length; t++) {
        var o = r[t];
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
      }
    }
    function _createClass(e, r, t) {
      return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
        writable: !1
      }), e;
    }
    function _toPrimitive(t, r) {
      if ("object" != typeof t || !t) return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == typeof i ? i : i + "";
    }

    // 返回一个当前时刻的毫秒数，用于获取一个时间戳
    // 检查是否是对象（对象包括普通对象、函数、数组，排除Null）
    function isObject(object) {
      var classType = Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
      return classType !== 'String' && classType !== 'Number' && classType !== 'Boolean' && classType !== 'Undefined' && classType !== 'Null';
    }
    var noop = function noop() {};
    // 对象拓展，且覆盖目标对象的相同的key, 后面的覆盖前面的
    function extend(target) {
      if (!isObject(target)) {
        throw new Error('extend请传对象');
      }
      var finalTarget = target;
      for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        rest[_key - 1] = arguments[_key];
      }
      rest.forEach(function (source) {
        source && Object.keys(source).forEach(function (key) {
          finalTarget[key] = source[key];
        });
      });
      return finalTarget;
    }
    /**
     * 如果version1大于version2，返回1，如果小于，返回-1，否则返回0。 TODO
     * 增加可以比较字母 2019年12月6日 14:45:59 wsz
     * @param {string} version1 版本1
     * @param {string} version2 版本2
     * @return {number} 返回版本1和版本2的关系
     */
    function compareVersion(version1, version2) {
      if (typeof version1 !== 'string' || typeof version2 !== 'string') {
        throw new Error('版本号应该是一个字符串');
      }
      // 非数字字符转换
      var getCharCode = function getCharCode(char) {
        return char.replace(/[a-zA-Z]/g, function (match) {
          return match.charCodeAt();
        }).replace(/[^\d]/g, '') - 0;
      };
      // 判断版本号每个连字符之间字符大小
      var _compareChar = function compareChar(char1, char2, hyphen, islong) {
        // 连字符情况
        var charArray1 = char1.split(hyphen);
        var charArray2 = char2.split(hyphen);
        for (var j = 0; j < charArray1.length; j += 1) {
          if (!charArray2[j]) {
            // 前几位都相同的情况下，char2比char1短
            // islong为true时，谁长谁大
            return islong ? 1 : -1;
          }
          if (charArray1[j].match(/-/) || charArray2[j].match(/-/)) {
            // 如果有连字符，判断字符大小
            return _compareChar(charArray1[j], charArray2[j], '-', true);
          }
          if (getCharCode(charArray1[j]) > getCharCode(charArray2[j])) {
            return 1;
          } else if (getCharCode(charArray1[j]) < getCharCode(charArray2[j])) {
            return -1;
          }
        }
        if (charArray1.length === charArray2.length) {
          // 若跳出循环时，两者长度相同，表明两者相等
          return 0;
        }
        // 若跳出循环时，char2比char1长
        // islong为true时，谁长谁大
        return islong ? -1 : 1;
      };
      return _compareChar(version1, version2, '.', true);
    }
    /**
     * 字符串超出截取
     * @param {string} str 目标字符串
     * @param {Number} count 字数，以英文为基数，如果是中文，会自动除2
     * @return {string} 返回截取后的字符串
     * 暂时不考虑只遍历一部分的性能问题，因为在应用场景内是微不足道的
     */
    function eclipseText() {
      var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
      var LEN_CHINESE = 2;
      var LEN_ENGLISH = 1;
      var num = 0;
      return str.split('').filter(function (ch) {
        num += /[\u4e00-\u9fa5]/.test(ch) ? LEN_CHINESE : LEN_ENGLISH;
        return num <= count;
      }).join('');
    }
    /**
     * 得到一个项目的根路径
     * h5模式下例如:http://id:端口/项目名/
     * @return {String} 项目的根路径，返回'http://id:端口/项目名/'或'http://id:端口/'
     */
    function getProjectBasePath() {
      var locObj = window.location;
      var patehName = locObj.pathname;
      var pathArray = patehName.split('/');
      // 如果是 host/xxx.html 则是/，如果是host/project/xxx.html,则是project/
      // pathName一般是 /context.html 或 /xxx/xx/content.html
      var hasProject = pathArray.length > 2;
      var contextPath = "".concat(pathArray[Number(hasProject)], "/");
      // 如果尾部有两个//替换成一个
      return "".concat(locObj.protocol, "//").concat(locObj.host, "/").concat(contextPath).replace(/[/]{2}$/, '/');
    }
    /**
     * 将相对路径转为绝对路径 ./ ../ 开头的  为相对路径
     * 会基于对应调用js的html路径去计算
     * @param {String} path 需要转换的路径
     * @return {String} 返回转换后的路径
     */
    function changeRelativePathToAbsolute(path) {
      if (!path) {
        throw new Error('changeRelativePathToAbsolute传参不为空');
      }
      var isAbsolute = !path.match(/(^\.\.\/)|(^\.\/)/g);
      if (isAbsolute) {
        return "".concat(getProjectBasePath()).concat(path.substring(0, 1) === '/' ? path.substring(1) : path);
      }
      var locObj = window.location;
      var patehName = locObj.pathname;
      // 匹配相对路径返回父级的个数
      var relatives = path.match(/\.\.\//g);
      var count = relatives && relatives.length || 0;
      // 将patehName拆为数组，然后计算当前的父路径，需要去掉相应相对路径的层级
      var pathArray = patehName.split('/');
      var parentPath = pathArray.slice(0, pathArray.length - (count + 1)).join('/');
      var childPath = path.replace(/\.+\//g, '');
      // 找到最后的路径， 通过正则 去除 ./ 之前的所有路径
      var finalPath = "".concat(parentPath, "/").concat(childPath);
      finalPath = "".concat(locObj.protocol, "//").concat(locObj.host).concat(finalPath);
      return finalPath;
    }
    /**
     * 得到一个全路径
     * @param {String} path 路径
     * @return {String} 返回最终的路径
     */
    function getFullPath() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      // 全路径
      if (/^(http|https|ftp|epth|h5|file|\/\/)/g.test(path)) {
        return path;
      }
      // 是否是相对路径
      var isRelative = /(\.\/)|(\.\.\/)/.test(path);
      if (isRelative) {
        return changeRelativePathToAbsolute(path);
      }
      return "".concat(getProjectBasePath()).concat(path.substring(0, 1) === '/' ? path.substring(1) : path);
    }
    /**
     * 将json参数拼接到url中
     * @param {String} url url地址
     * @param {Object} data 需要添加的json数据
     * @param {Boolean} type 是否相对路径
     * @return {String} 返回最终的url
     */
    function getFullUrlByParams() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var data = arguments.length > 1 ? arguments[1] : undefined;
      var type = arguments.length > 2 ? arguments[2] : undefined;
      var fullUrl = type === true ? url : getFullPath(url);
      var extrasDataStr = '';
      if (data) {
        Object.keys(data).forEach(function (item) {
          if (extrasDataStr.indexOf('?') === -1 && fullUrl.indexOf('?') === -1) {
            extrasDataStr += '?';
          } else {
            extrasDataStr += '&';
          }
          extrasDataStr += "".concat(item, "=").concat(data[item]);
        });
      }
      fullUrl += extrasDataStr;
      return fullUrl;
    }
    /**
     * 获取 base64 去除 url 部分
     * @param {String} base64 base64值
     * @returns {String} 该 base64 去除 url 后的值
     */
    function getBase64NotUrl() {
      var base64 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      return base64.replace(/^data.*,/, '');
    }

    /**
     * 依赖于以下的基础库
     * Promise
     * @param {Object} hybrid hybrid对象
     */
    function proxyMixin(hybrid) {
      var hybridJs = hybrid;
      var globalError = hybridJs.globalError;
      /**
       * 存放所有api调用前拦截func
       * 每一个命名空间下的每一个os都可以执行
       */
      var Interceptors = {};
      /**
       * 添加拦截器
       * @param {String} apiname api名称
       * @param {Object} opt 拦截器配置
       */
      function addInterceptors(apiname, opt) {
        if (!Interceptors[apiname]) {
          Interceptors[apiname] = {
            invoke: [],
            success: [],
            error: []
          };
        }
        var apiInterceptors = Interceptors[apiname];
        if (opt.invoke) {
          apiInterceptors.invoke.push(opt.invoke);
        }
        if (opt.success) {
          apiInterceptors.success.push(opt.success);
        }
        if (opt.error) {
          apiInterceptors.error.push(opt.error);
        }
      }
      function removeInterceptors(apiname, option) {
        if (!Interceptors[apiname]) {
          return;
        }
        if (!option) {
          Interceptors[apiname] = {
            invoke: [],
            success: [],
            error: []
          };
          return;
        }
        if (Interceptors[apiname][option]) {
          Interceptors[apiname][option] = [];
        }
      }
      function getSFuncs(arr, res) {
        var funcArr = [];
        if (arr.length) {
          funcArr = arr.map(function (item) {
            var result = item(res);
            if (result instanceof Promise) {
              return result;
            }
            return new Promise(function (resolve, reject) {
              if (result === false) {
                reject();
              } else {
                resolve();
              }
            });
          });
        }
        return funcArr;
      }
      hybridJs.addInterceptors = addInterceptors;
      hybridJs.removeInterceptors = removeInterceptors;
      /**
       * 对所有的API进行统一参数预处理，promise逻辑支持等操作
       * @param {Object} api 对应的API
       * @param {Function} callback 回调
       * @constructor
       */
      var Proxy = /*#__PURE__*/function () {
        function Proxy(api, callback) {
          _classCallCheck(this, Proxy);
          this.api = api;
          this.apiName = this.api.moduleName + '.' + this.api.namespace;
          this.callback = callback;
          this.os = this.api.os.slice(0);
        }
        /**
         * 实际的代理操作
         * @param {Object} hy hybrid对象
         * @return {Function} hybrid finallyCallback
         */
        return _createClass(Proxy, [{
          key: "walk",
          value: function walk(hy) {
            var _this = this;
            // 实时获取promise
            var Promise = hybridJs.getPromise();
            // 返回一个闭包函数
            return function () {
              for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
                rest[_key] = arguments[_key];
              }
              var args = rest;
              if (typeof args[0] === 'undefined') {
                args[0] = {};
              }
              // 默认参数的处理
              if (_this.api.defaultParams && args[0] instanceof Object) {
                Object.keys(_this.api.defaultParams).forEach(function (item) {
                  if (args[0][item] === undefined) {
                    args[0][item] = _this.api.defaultParams[item];
                  }
                });
              }
              if (args[0] && args[0].h5UI && _this.os.indexOf('h5') === -1) {
                // 强制使用H5环境下的API
                hybridJs[_this.api.moduleName][_this.api.namespace] = 'h5';
                return hybridJs[_this.api.moduleName][_this.api.namespace] ? hybridJs[_this.api.moduleName][_this.api.namespace](args[0]) : console.error('请引入H5环境的ejs库');
              } else {
                hybridJs[_this.api.moduleName][_this.api.namespace] = false;
              }
              // 决定是否使用Promise
              var finallyCallback;
              if (_this.callback) {
                // 将this指针修正为proxy内部，方便直接使用一些api关键参数
                finallyCallback = _this.callback;
              }
              if (_this.api.support && hybridJs.nativeVersion && compareVersion(hybridJs.nativeVersion, _this.api.support) < 0) {
                // 如果当前版本还不支持API
                // 实际上也可以在原生容器进行检测，这里由于遗留问题，改为前端进行
                var msg = "".concat(_this.api.namespace, "\u8981\u6C42\u7684\u5BB9\u5668EJS\u7248\u672C\u81F3\u5C11\u4E3A:").concat(_this.api.support, "\uFF0C\u5F53\u524D\u5BB9\u5668EJS\u7248\u672C\uFF1A").concat(hybridJs.nativeVersion, "\uFF0C\u8BF7\u5347\u7EA7");
                var errorTips = {
                  code: globalError.ERROR_TYPE_APINEEDHIGHNATIVEVERSION.code,
                  msg: msg
                };
                if (hy.ui && typeof hy.ui.toast === 'function') {
                  hy.ui.toast(msg);
                }
                // 不满足要求，直接走错误回调，内部走错误
                finallyCallback = function finallyCallback() {
                  var len = arguments.length;
                  var options = arguments.length <= 0 ? undefined : arguments[0];
                  var reject;
                  if (Promise) {
                    reject = len - 1 < 0 || arguments.length <= len - 1 ? undefined : arguments[len - 1];
                  }
                  // 如果存在错误回调
                  options.error && options.error(errorTips);
                  reject && reject(errorTips);
                };
              }
              if (!finallyCallback) {
                // 如果没有实现
                finallyCallback = function finallyCallback() {
                  var len = arguments.length;
                  var options = arguments.length <= 0 ? undefined : arguments[0];
                  var errorTips = "".concat(_this.api.namespace, "\u672A\u5B9A\u4E49\u5177\u4F53\u5B9E\u73B0\u65B9\u6CD5");
                  var reject;
                  if (Promise) {
                    reject = len - 1 < 0 || arguments.length <= len - 1 ? undefined : arguments[len - 1];
                  }
                  // 如果存在错误回调
                  options.error && options.error(errorTips);
                  reject && reject(errorTips);
                };
              }
              if (Promise) {
                if (Interceptors[_this.apiName]) {
                  return new Promise(function (resolve, reject) {
                    var invokeFuncs = getSFuncs(Interceptors[_this.apiName].invoke, args);
                    Promise.all(invokeFuncs).then(function () {
                      // 拓展 args
                      if (args[0] && args[0] instanceof Object) {
                        var successOrigin = args[0].success;
                        var errorOrigin = args[0].error;
                        args[0].success = function (res) {
                          var funcs = getSFuncs(Interceptors[_this.apiName].success, res);
                          Promise.all(funcs).then(function () {
                            successOrigin && successOrigin(res);
                          }).catch(function (error) {
                            errorOrigin && errorOrigin(error);
                          });
                        };
                        args[0].error = function (err) {
                          var funcs = getSFuncs(Interceptors[_this.apiName].error, err);
                          Promise.all(funcs).then(function () {
                            errorOrigin && errorOrigin(err);
                          }).catch(function (error) {
                            errorOrigin && errorOrigin(error);
                          });
                        };
                      }
                      args = args.concat([resolve, reject]);
                      finallyCallback && finallyCallback.apply(_this, args);
                    }).catch(function (err) {
                      console.warn("".concat(_this.apiName, "\u7684\u8C03\u7528\u5DF2\u88AB\u62E6\u622A\uFF1A"), err);
                    });
                  });
                }
                return finallyCallback && new Promise(function (resolve, reject) {
                  // 拓展 args
                  args = args.concat([resolve, reject]);
                  finallyCallback.apply(_this, args);
                });
              }
              return finallyCallback && finallyCallback.apply(_this, args);
            };
          }
          /**
           * 析构函数
           */
        }, {
          key: "dispose",
          value: function dispose() {
            this.apiName = null;
            this.api = null;
            this.callback = null;
          }
        }]);
      }();
      hybridJs.Proxy = Proxy;
    }

    /**
     * 定义API的添加
     * 必须按照特定方法添加API才能正常的代理
     * 依赖于一些基本库
     * os
     * Proxy
     * globalError
     * showError
     * callInner
     * @param {Object} hybrid hybrid
     */
    function defineapiMixin(hybrid) {
      var hybridJs = hybrid;
      var Proxy = hybridJs.Proxy;
      var globalError = hybridJs.globalError;
      var showError = hybridJs.showError;
      var os = hybridJs.os;
      /**
       * 存放所有的代理 api对象
       * 每一个命名空间下的每一个os都可以执行
       * proxyapi[namespace][os]
       */
      var proxysApis = {};
      /**
       * 存放所有的代理 module对象
       */
      var proxysModules = {};
      var supportOsArray = hybridJs.supportOsArray;
      function getCurrProxyApiOs(currOs) {
        var osArr = [];
        for (var i = 0, len = supportOsArray.length; i < len; i += 1) {
          if (currOs[supportOsArray[i]]) {
            osArr.push(supportOsArray[i]);
          }
        }
        if (osArr.length) {
          return osArr;
        } else {
          // 默认是h5
          return 'h5';
        }
      }
      function getNameSpaceApi(nameSpaceApi, currOs) {
        var proxyObj = nameSpaceApi.h5;
        var osArr = getCurrProxyApiOs(currOs);
        if (nameSpaceApi.useOs === 'h5') {
          return proxyObj;
        }
        if (Array.isArray(osArr) && osArr.length) {
          for (var i = 0; i < osArr.length; i += 1) {
            var item = osArr[i];
            if (nameSpaceApi[item]) {
              proxyObj = nameSpaceApi[item];
              break;
            }
          }
        }
        return proxyObj;
      }
      function getModuleApiParentByNameSpace(module, namespace) {
        var apiParent = module;
        // 只取命名空间的父级,如果仅仅是xxx，是没有父级的
        var parentNamespaceArray = /[.]/.test(namespace) ? namespace.replace(/[.][^.]+$/, '').split('.') : [];
        parentNamespaceArray.forEach(function (item) {
          apiParent[item] = apiParent[item] || {};
          apiParent = apiParent[item];
        });
        return apiParent;
      }
      function proxyApiNamespace(apiParent, apiName, finalNameSpace, hy) {
        // 代理API，将apiParent里的apiName代理到Proxy执行
        Object.defineProperty(apiParent, apiName, {
          configurable: true,
          enumerable: true,
          get: function proxyGetter() {
            // 确保get得到的函数一定是能执行的
            var nameSpaceApi = proxysApis[finalNameSpace];
            // 得到当前是哪一个环境，获得对应环境下的代理对象
            var proxyObj = getNameSpaceApi(nameSpaceApi, os);
            if (proxyObj) {
              /**
               * 返回代理对象，所以所有的api都会通过这个代理函数
               * 注意引用问题，如果直接返回原型链式的函数对象，由于是在getter中，里面的this会被改写
               * 所以需要通过walk后主动返回
               */
              return proxyObj.walk(hy);
            }
            // 使用h5UI时未引入H5环境的包，报错提示
            if (nameSpaceApi.useOs === 'h5') {
              console.error('请引入H5环境的ejs库');
              return noop;
            }
            var apiOs = nameSpaceApi.os;
            // 正常情况下走不到，除非预编译的时候在walk里手动抛出
            var osMsg = apiOs ? apiOs.map(function (item) {
              switch (item) {
                default:
                  return item;
                case 'ejs':
                  return 'EJS客户端';
                case 'dd':
                  return '钉钉容器';
                case 'xm':
                  return '迅盟容器';
                case 'h5':
                  return '浏览器';
              }
            }) : '';
            var osErrorTips = osMsg ? osMsg.join('或') : '该api未定义可执行的环境os';
            var msg = "".concat(apiName, "\u8981\u6C42\u7684os\u73AF\u5883\u4E3A:").concat(osErrorTips, "\uFF0C\u8BF7\u68C0\u67E5\u662F\u5426\u5F15\u5165\u5F53\u524D\u73AF\u5883\u7684ejs\u5E93");
            showError(globalError.ERROR_TYPE_APIOS.code, msg);
            return noop;
          },
          set: function proxySetter(type) {
            var nameSpaceApi = proxysApis[finalNameSpace];
            if (type === 'h5') {
              nameSpaceApi.useOs = 'h5';
            } else if (type === false) {
              nameSpaceApi.useOs = false;
            } else {
              showError(globalError.ERROR_TYPE_APIMODIFY.code, globalError.ERROR_TYPE_APIMODIFY.msg);
            }
          }
        });
      }
      /**
       * 监听模块，防止被篡改
       * @param {String} moduleName 模块名
       * @param {Object} hy hybrid对象
       */
      function observeModule(moduleName, hy) {
        Object.defineProperty(hy, moduleName, {
          configurable: true,
          enumerable: true,
          get: function proxyGetter() {
            if (!proxysModules[moduleName]) {
              proxysModules[moduleName] = {};
            }
            return proxysModules[moduleName];
          },
          set: function proxySetter() {
            showError(globalError.ERROR_TYPE_MODULEMODIFY.code, globalError.ERROR_TYPE_MODULEMODIFY.msg);
          }
        });
      }
      /**
       * 在某一个模块下拓展一个API
       * @param {String} moduleName 模块名
       * @param {String} apiParam api对象,包含
       * namespace 命名空间，必填
       * os 支持的环境
       * defaultParams 默认参数
       * @param {Object} hy hybrid对象
       */
      function extendApi(moduleName, apiParam, hy) {
        var hyb = hy || this;
        if (!moduleName || typeof moduleName !== 'string') {
          return;
        }
        if (!apiParam || !apiParam.namespace) {
          return;
        }
        if (!hyb[moduleName]) {
          // 如果没有定义模块，监听整个模块，用代理取值，防止重定义
          // 这样，模块只允许初次定义以及之后的赋值，其它操作都会被内部拒绝
          observeModule(moduleName, hyb);
        }
        var api = apiParam;
        var modlue = hyb[moduleName];
        var apiNamespace = api.namespace;
        // api加上module关键字，方便内部处理
        api.moduleName = moduleName;
        var apiParent = getModuleApiParentByNameSpace(modlue, apiNamespace);
        // 最终的命名空间是包含模块的
        var finalNameSpace = "".concat(moduleName, ".").concat(api.namespace);
        // 如果仅仅是xxx，直接取xxx，如果aa.bb，取bb
        var apiName = /[.]/.test(apiNamespace) ? api.namespace.match(/[.][^.]+$/)[0].substr(1) : apiNamespace;
        // 这里防止触发代理，就不用apiParent[apiName]了，而是用proxysApis[finalNameSpace]
        if (!proxysApis[finalNameSpace]) {
          // 如果还没有代理这个API的命名空间，代理之，只需要设置一次代理即可
          proxyApiNamespace(apiParent, apiName, finalNameSpace, hy);
        }
        // 一个新的API代理，会替换以前API命名空间中对应的内容
        var apiRuncode = api.runCode;
        if (!apiRuncode) {
          // 如果没有runcode，默认使用callInner
          apiRuncode = hybridJs.callInner;
        }
        var newApiProxy = new Proxy(api, apiRuncode);
        var oldProxyNamespace = proxysApis[finalNameSpace] || {};
        var oldProxyOsNotUse = {};
        proxysApis[finalNameSpace] = {};
        supportOsArray.forEach(function (osTmp) {
          if (api.os && api.os.indexOf(osTmp) !== -1) {
            // 如果存在这个os，并且合法，重新定义
            proxysApis[finalNameSpace][osTmp] = newApiProxy;
            oldProxyOsNotUse[osTmp] = true;
          } else if (oldProxyNamespace[osTmp]) {
            // 否则仍然使用老版本的代理
            proxysApis[finalNameSpace][osTmp] = oldProxyNamespace[osTmp];
            // api本身的os要添加这个环境，便于提示
            api.os && api.os.push(osTmp);
          }
        });
        proxysApis[finalNameSpace].os = api.os;
        Object.keys(oldProxyOsNotUse).forEach(function (notUseOs) {
          // 析构不用的代理
          oldProxyNamespace[notUseOs] && oldProxyNamespace[notUseOs].dispose();
        });
      }
      /**
       * 拓展整个对象的模块
       * @param {String} moduleName 模块名
       * @param {Array} apis 对应的api数组
       */
      function extendModule(moduleName, apis) {
        if (!moduleName || typeof moduleName !== 'string') {
          return;
        }
        if (!apis || !Array.isArray(apis)) {
          return;
        }
        if (!this[moduleName]) {
          // 如果没有定义模块，监听整个模块，用代理取值，防止重定义
          // 这样，模块只允许初次定义以及之后的赋值，其它操作都会被内部拒绝
          observeModule(moduleName, this);
        }
        for (var i = 0, len = apis.length; i < len; i += 1) {
          extendApi(moduleName, apis[i], this);
        }
      }
      hybridJs.extendModule = extendModule;
      hybridJs.extendApi = extendApi;
      /**
       * 获取注册的 API 代理对象（供 callApi 使用）
       * @param moduleName 模块名
       * @param apiName API 名
       * @returns API 代理对象或 null
       */
      hybridJs._getProxyApi = function (moduleName, apiName) {
        var finalNameSpace = "".concat(moduleName, ".").concat(apiName);
        return proxysApis[finalNameSpace] || null;
      };
      /**
       * 根据当前环境获取对应的 API 代理对象（供 callApi 使用）
       * @param nameSpaceApi API 命名空间对象
       * @param currOs 当前环境
       * @returns Proxy 对象
       */
      hybridJs._getNameSpaceApi = getNameSpaceApi;
    }

    /**
     * 初始化给配置全局函数
     * @param {Object} hybrid hybrid对象
     */
    function initMixin(hybrid) {
      var hybridJs = hybrid;
      var globalError = hybridJs.globalError;
      var showError = hybridJs.showError;
      /**
       * 几个全局变量 用来控制全局的config与ready逻辑
       * 默认ready是false的
       */
      var readyFunc;
      var isAllowReady = false;
      var isConfig = false;
      /**
       * 页面初始化时必须要这个config函数
       * 必须先声明ready，然后再config
       * @param {Object} params
       * config的jsApiList主要是同来通知给原生进行注册的
       * 所以这个接口到时候需要向原生容器请求的
       */
      hybridJs.config = function config(params) {
        if (isConfig) {
          showError(globalError.ERROR_TYPE_CONFIGMODIFY.code, globalError.ERROR_TYPE_CONFIGMODIFY.msg);
        } else {
          isConfig = true;
          var successcb = function successcb() {
            // 允许ready直接执行
            isAllowReady = true;
            // 如果这时候有ready回调
            if (readyFunc) {
              log('ready!');
              readyFunc();
            }
          };
          if (this.os.h5 || this.os.miniprogram) {
            // 由于H5平台需要进行调试，较为特殊，所以在这里直接兼容
            // 小程序平台不需要鉴权
            successcb();
            return;
          }
          if (!this.event || !this.event.config) {
            // 如果没有模块方法，需要报错提示
            showError(globalError.ERROR_TYPE_UNKNOWN.code, '当前event.config方法不存在，请确认是否引入了对应环境下的ejs文件');
            return;
          }
          this.event.config(extend({
            success: function success() {
              successcb();
            },
            error: function error(_error) {
              var tips = JSON.stringify(_error);
              showError(globalError.ERROR_TYPE_CONFIGERROR.code, tips);
            }
          }, params));
        }
      };
      /**
       * 初始化完毕，并且config验证完毕后会触发这个回调
       * 注意，只有config了，才会触发ready，否则无法触发
       * ready只会触发一次，所以如果同时设置两个，第二个ready回调会无效
       * @param {Function} callback 回调函数
       */
      hybridJs.ready = function ready(callback) {
        // 修改ready，改为可以触发多个ready回调
        readyFunc = callback;
        // 如果config先进行，然后才进行ready,这时候恰好又isAllowReady，代表ready可以直接自动执行
        if (isAllowReady) {
          log('ready!');
          readyFunc();
        }
      };
      hybridJs.app = function app(params) {
        this.event.app(extend({}, params));
      };
      hybridJs.callApi = function callApi() {
        return this.Promise.reject('未引入ejs环境文件');
      };
    }

    function innerUtilMixin(hybrid) {
      var hybridJs = hybrid;
      var innerUtil = {};
      hybridJs.innerUtil = innerUtil;
      /**
       * 将参数兼容字符串形式，返回新的args
       * 正常应该是 object, resolve, reject
       * 兼容的字符串可能是 key1, (key2, key3,) ..., resolve, reject
       * @param {Object} args 原始的参数
       * @param {Object} rest 剩余的参数，相当于从arguments1开始算起
       * @return {Object} 返回标准的参数
       */
      function compatibleStringParamsToObject(args) {
        var _this = this;
        var newArgs = args;
        if (!args || !Array.isArray(args)) {
          return args;
        }
        if (!innerUtil.isObject(newArgs[0])) {
          var options = {};
          var isPromise = !!hybridJs.getPromise();
          var len = newArgs.length;
          var paramsLen = isPromise ? len - 2 : len;
          // 填充字符串key，排除最后的resolve与reject
          for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            rest[_key - 1] = arguments[_key];
          }
          for (var i = 0; i < paramsLen; i += 1) {
            // 注意映射关系，rest[0]相当于以前的arguments[1]
            if (rest[i] !== undefined) {
              options[rest[i]] = newArgs[i];
            }
          }
          // 分别为options，resolve，reject
          newArgs[0] = options;
          if (isPromise) {
            newArgs[1] = newArgs[len - 2];
            newArgs[2] = newArgs[len - 1];
          } else {
            // 去除普通参数对resolve与reject的影响
            newArgs[1] = undefined;
            newArgs[2] = undefined;
          }
        }
        // 默认参数的处理，因为刚兼容字符串后是没有默认参数的
        if (this.api && this.api.defaultParams && newArgs[0] instanceof Object) {
          Object.keys(this.api.defaultParams).forEach(function (item) {
            if (newArgs[0][item] === undefined) {
              newArgs[0][item] = _this.api.defaultParams[item];
            }
          });
        }
        // 否则已经是标准的参数形式，直接返回
        return newArgs;
      }
      /**
       * 限制按钮个数，只选其中num个
       * @param {Array} arr 参数数组
       * @param {Number} maximum 允许最大个数
       * @returns {Array} 返回正确的数组
       */
      function eclipseButtonsNumber(arr, maximum) {
        var result = arr;
        if (result && Array.isArray(result)) {
          var len = result.length;
          if (len > maximum) {
            var difference = len - (len - maximum);
            result.length = difference;
          }
        }
        return result;
      }
      innerUtil.extend = extend;
      innerUtil.isObject = isObject;
      innerUtil.getFullPath = getFullPath;
      innerUtil.getFullUrlByParams = getFullUrlByParams;
      innerUtil.eclipseText = eclipseText;
      innerUtil.compatibleStringParamsToObject = compatibleStringParamsToObject;
      innerUtil.eclipseButtonsNumber = eclipseButtonsNumber;
      innerUtil.getBase64NotUrl = getBase64NotUrl;
    }

    var utilAjax = null;
    var hybridJs$1 = null;
    // 用于M7框架编码，避免老版本M7框架没有编码的情况
    function param(data) {
      var params = [];
      for (var k in data) {
        params.push(encodeURIComponent(k) + '=' + encodeURIComponent(data[k]));
      }
      return params.join('&').replace(/%20/g, '+');
    }
    // 获取sso地址
    function getSsoUrl(preUrl) {
      return new Promise(function (resolve, reject) {
        var getSSOUrl = "".concat(preUrl, "rest/common/getSSOUrl");
        var option = {
          url: getSSOUrl,
          contentType: 'application/x-www-form-urlencoded',
          type: 'GET',
          // 获取sso地址是匿名
          isAutoProxy: false,
          success: function success(result) {
            var resUrl = result.custom && result.custom.ssourl || '';
            resUrl.substring(resUrl.length - 1) === '/' ? resUrl = resUrl.substring(0, resUrl.length - 1) : resUrl;
            if (result.status && parseInt(result.status.code, 10) === 1 && resUrl && resUrl !== getSSOUrl) {
              hybridJs$1.storage.setItem({
                'h5Home_sso_url': result.custom.ssourl,
                success: function success() {
                  console.log('ejs存储sso地址成功');
                  resolve(result.custom.ssourl);
                },
                error: function error(_error) {
                  console.error('ejs存储sso地址失败', _error);
                  reject(_error);
                }
              });
            } else {
              console.error('ejs存储sso地址失败', result);
              reject(result);
            }
          },
          error: function error(err) {
            console.error('ejs存储sso地址失败', err);
            reject(err);
          }
        };
        utilAjax(option);
      });
    }
    // 通过不同接口获取鉴权参数
    function getJsTicket(env, ssoUrl, data, token, cb) {
      var ajax = function ajax(getJsTicketUrl) {
        return new Promise(function (resolve, reject) {
          var option = {
            url: "".concat(ssoUrl).concat(getJsTicketUrl),
            data: data,
            contentType: 'application/x-www-form-urlencoded',
            isAutoProxy: true,
            success: function success(result) {
              if (result.status && parseInt(result.status.code, 10) === 1) {
                cb && cb(result.custom);
                reject();
              } else {
                resolve(result);
              }
            },
            error: function error(_error2) {
              console.log(_error2);
              resolve(_error2);
            }
          };
          // 跨端框架无法获取全局的Config
          if (Config.version && compareVersion(Config.version, '8.0.0') < 0) {
            // M7框架需要独立编码
            option.data = param(option.data);
          }
          if (token) {
            // 如果传了token，或者不自动代理情况下传了token
            option.isAutoProxy = false;
            option.headers = {
              Authorization: "Bearer ".concat(token)
            };
          }
          utilAjax(option);
        });
      };
      // 先用新接口获取鉴权参数
      var getJsTicketUrl = 'rest/thirdparty/common/getJsTicket';
      if (env === 'wxWorkLocal') {
        data.tickettype = 'govweixin';
      } else if (env === 'wxWork') {
        data.tickettype = 'weixin';
      }
      ajax(getJsTicketUrl).then(function (res) {
        console.log('通过新版getJsTicket接口获取鉴权参数失败');
        console.log('改为使用旧版getJsTicket接口获取鉴权参数');
        getJsTicketUrl = 'rest/common/getJsTicket';
        if (env === 'wxWorkLocal' || env === 'wxWork') {
          data.tickettype = 'weixin';
        }
        ajax(getJsTicketUrl).then(function (res) {
          console.error(res);
        }).catch(function (error) {
          console.log('获取JSTicket成功');
        });
      }).catch(function (error) {
        console.log('获取JSTicket成功');
      });
    }
    // 用于自动鉴权
    function autoConfig(env, preUrl, token, agentId, paramsAjax, hybrid) {
      utilAjax = paramsAjax;
      hybridJs$1 = hybrid;
      return new Promise(function (resolve, reject) {
        var data = {
          tickettype: 'dingtalk',
          // 政务微信获取时，中文传参编译有问题，此处不进行编译
          pageurl: window.location.href.replace(window.location.hash, ''),
          agentid: agentId || ''
        };
        var cb = function cb(result) {
          if (result.jsApiSignature) {
            resolve(result);
          } else {
            var finalResult = {
              nonceStr: result.nonceStr,
              jsApiSignature: result.signature,
              corpId: result.corpId,
              timestamp: result.timestamp,
              userInfoSignature: '',
              'dingtalk_agentid': result.dingtalk_agentid
            };
            resolve(finalResult);
          }
        };
        // 获取sso地址，用于刷新token
        getSsoUrl(preUrl).then(function (res) {
          res += res.substring(res.length - 1) === '/' ? '' : '/';
          // 获取JSTicket
          getJsTicket(env, res, data, token, cb);
        }).catch(function () {
          console.log('获取sso地址失败，使用传进来的url获取鉴权参数');
          // 获取JSTicket
          getJsTicket(env, preUrl, data, token, cb);
        });
      });
    }

    function eventMixin$2(hybrid) {
      var hybridJs = hybrid;
      hybridJs.extendModule('event', [{
        namespace: 'config',
        os: ['wxWork', 'wxWorkLocal'],
        defaultParams: {
          // 一个数组，不要传null，否则可能在iOS中会有问题
          jsApiList: []
        },
        runCode: function runCode(params) {
          if (params.isAutoConfig === 1 && params.jsApiList && params.jsApiList.length > 0 && window.self === window.top) {
            if (window.wx) {
              var env = 'wxWork';
              if (hybridJs.os.wxWorkLocal) {
                env = 'wxWorkLocal';
              }
              // 企业微信或政务微信自动鉴权
              autoConfig(env, params.preUrl, params.token, params.agentId, params.ajax, hybridJs).then(function (res) {
                var nonceStr = res.nonceStr,
                  jsApiSignature = res.jsApiSignature,
                  corpId = res.corpId,
                  timestamp = res.timestamp,
                  userInfoSignature = res.userInfoSignature;
                timestamp = Number(timestamp);
                window.wx.config({
                  beta: true,
                  // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
                  debug: false,
                  // 开启调试模式,调用的所有api的返回值会在客户端alert出来
                  appId: corpId,
                  // 必填，企业微信的corpID
                  timestamp: timestamp,
                  // 必填，生成签名的时间戳
                  nonceStr: nonceStr,
                  // 必填，生成签名的随机串
                  signature: jsApiSignature,
                  // 必填，签名，见附录1
                  jsApiList: params.jsApiList || [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                window.wx.ready(function () {
                  log(env + ' ready');
                  if (params.agentId && userInfoSignature) {
                    if (hybridJs.os.wxWorkLocal) {
                      window.wx.invoke('agentConfig', {
                        agentid: params.agentId,
                        // 必填，单位应用的agentid
                        corpid: corpId,
                        // 必填，政务微信的corpid
                        timestamp: timestamp,
                        // 必填，生成签名的时间戳,int类型, 如 1539100800
                        nonceStr: nonceStr,
                        // 必填，生成签名的随机串
                        signature: userInfoSignature // 必填，签名，见附录5
                      }, function (res) {
                        if (res.err_msg != 'agentConfig:ok') {
                          hybridJs.ui.alert('应用身份鉴权失败');
                          console.log(res);
                          return;
                        }
                        log(env + ' agentConfig ready');
                        params.success && params.success();
                      });
                    } else {
                      window.wx.agentConfig({
                        corpid: corpId,
                        // 必填，企业微信的corpid，必须与当前登录的企业一致
                        agentid: params.agentId,
                        // 必填，企业微信的应用id （e.g. 1000247）
                        timestamp: timestamp,
                        // 必填，生成签名的时间戳
                        nonceStr: nonceStr,
                        // 必填，生成签名的随机串
                        signature: userInfoSignature,
                        // 必填，签名，见附录-JS-SDK使用权限签名算法
                        jsApiList: params.jsApiList || [],
                        //必填，传入需要使用的接口名称
                        success: function success(res) {
                          log(env + ' agentConfig ready');
                          params.success && params.success();
                        },
                        fail: function fail(res) {
                          console.warn(res);
                          if (res.errMsg.indexOf('function not exist') > -1) {
                            hybridJs.ui.alert('应用身份鉴权失败, 版本过低请升级');
                          }
                          // 为了不阻塞页面展示，鉴权失败也能继续进入ready
                          params.success && params.success();
                        }
                      });
                    }
                  } else {
                    params.success && params.success();
                  }
                });
                window.wx.error(function (error) {
                  console.log("wxWork error: ".concat(JSON.stringify(error)));
                  // 为了不阻塞页面展示，鉴权失败也能继续进入ready
                  params.success && params.success();
                });
              });
            } else {
              hybridJs.ui.toast('未引入企业微信的JSSDK，无法自动鉴权');
            }
          } else {
            params.success && params.success();
          }
        }
      }]);
    }

    function eventMixin$1(hybrid) {
      var hybridJs = hybrid;
      hybridJs.extendModule('event', [{
        namespace: 'config',
        os: ['dd'],
        runCode: function runCode(params) {
          if (params.isAutoConfig === 1 && params.jsApiList && params.jsApiList.length > 0) {
            params.preUrl += params.preUrl.substring(params.preUrl.length - 1) === '/' ? '' : '/';
            if (window.dd) {
              autoConfig('dd', params.preUrl, params.token, params.agentId, params.ajax, hybridJs).then(function (res) {
                var nonceStr = res.nonceStr,
                  jsApiSignature = res.jsApiSignature,
                  corpId = res.corpId,
                  timestamp = res.timestamp;
                var agentId = res.dingtalk_agentid;
                dd.config({
                  agentId: agentId || params.agentId || '',
                  // 必填，微应用ID
                  corpId: corpId,
                  // 必填，企业ID
                  timeStamp: timestamp,
                  // 必填，生成签名的时间戳
                  nonceStr: nonceStr,
                  // 必填，生成签名的随机串
                  signature: jsApiSignature,
                  // 必填，签名
                  // 选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
                  type: 0,
                  jsApiList: params.jsApiList || ['runtime.info', 'biz.contact.choose', 'device.notification.confirm', 'device.notification.alert', 'device.notification.prompt', 'biz.ding.post', 'biz.util.openLink', 'biz.contact.complexPicker', 'biz.cspace.saveFile', 'biz.cspace.preview', 'biz.cspace.chooseSpaceDir', 'biz.util.uploadAttachment'] // 必填，需要使用的jsapi列表，注意：不要带dd。
                });
                dd.error(function (error) {
                  console.log("dd error: ".concat(JSON.stringify(error)));
                  // 为了不阻塞页面展示，鉴权失败也能继续进入ready
                  params.success && params.success();
                });
                dd.ready(function () {
                  log('dd ready');
                  localStorage.setItem('corpId', corpId);
                  params.success && params.success();
                });
              });
            } else {
              hybridJs.ui.toast('未引入钉钉的JSSDK，无法自动鉴权');
            }
          } else {
            params.success && params.success();
          }
        }
      }]);
    }

    function eventMixin(hybrid) {
      var hybridJs = hybrid;
      var showError = hybridJs.showError;
      var globalError = hybridJs.globalError;
      /**
       * 检查环境是否合法，包括
       * 检测是否有检测版本号，如果不是，给出错误提示
       * 是否版本号小于容器版本号，如果小于，给予升级提示
       * @param {Object} hy hybrid对象
       */
      function checkEnvAndPrompt(hy) {
        if (!hy.runtime || !hy.runtime.getEjsVersion) {
          showError(globalError.ERROR_TYPE_VERSIONNOTSUPPORT.code, globalError.ERROR_TYPE_VERSIONNOTSUPPORT.msg);
        } else {
          hy.runtime.getEjsVersion({
            success: function success(result) {
              /**
               * 版本可以有差异
                  const version = `${result.version} `;
                   if (compareVersion(hybridJs.version, version) < 0) {
                      showError(
                          globalError.ERROR_TYPE_VERSIONNEEDUPGRADE.code,
                          globalError.ERROR_TYPE_VERSIONNEEDUPGRADE.msg);
                  }
              */
              // 记录原生容器的版本号
              hybridJs.nativeVersion = result.version;
            },
            error: function error() {
              showError(globalError.ERROR_TYPE_INITVERSIONERROR.code, globalError.ERROR_TYPE_INITVERSIONERROR.msg);
            }
          });
        }
      }
      hybridJs.extendModule('event', [{
        namespace: 'config',
        os: ['ejs'],
        defaultParams: {
          // 一个数组，不要传null，否则可能在iOS中会有问题
          jsApiList: []
        },
        runCode: function runCode() {
          for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
            rest[_key] = arguments[_key];
          }
          var args = rest;
          checkEnvAndPrompt(hybridJs);
          hybridJs.callInner.apply(this, args);
        }
      }]);
    }

    var ejsVersion = "4.2.23";

    function mixin(hybrid) {
      var hybridJs = hybrid;
      hybridJs.version = ejsVersion;
      osMixin(hybridJs);
      promiseMixin(hybridJs);
      errorMixin(hybridJs);
      // 不依赖于promise，但是是否有Promise决定返回promise对象还是普通函数, 依赖于globalError
      proxyMixin(hybridJs);
      // 依赖于os，Proxy，globalError，showError，以及callInner
      defineapiMixin(hybridJs);
      // init依赖与基础库以及部分原生的API
      initMixin(hybridJs);
      // 给API快速使用的内部工具集
      innerUtilMixin(hybridJs);
      // 由于鉴权较为特殊，所以直接集成在核心代码中
      // 核心代码默认集成ejs下的config方法
      eventMixin(hybridJs);
      // 核心代码默认集成政务微信下的config方法
      eventMixin$2(hybridJs);
      // 核心代码默认集成钉钉下的config方法
      eventMixin$1(hybridJs);
    }

    var hybridJs = {};
    mixin(hybridJs);

    return hybridJs;

}));
