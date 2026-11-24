/*!
 * @epoint-mrc/ejsv4 v4.2.23
 * (c) 2017-2026 
 * Released under the ISC License.
 * 
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('vue'), require('vant')) :
    typeof define === 'function' && define.amd ? define(['vue', 'vant'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Vue, global.vant));
})(this, (function (Vue, vant) { 'use strict';

    /*
     * 作者: 吴松泽
     * 创建时间: 2020-06-15 09:07:04
     * 修改时间: 2020-06-17 19:23:38
     * 版本: [1.0]
     * 版权: 江苏国泰新点软件有限公司
     * 描述:
     */
    /**
     * 统一调用迅盟API
     * @param {Object} args 传参
     * @param {String} api api名称
     * @param {Boolean} isPromise 是否支持promise
     */
    function callXmByArgs(args, api, isPromise) {
      var options = args[0];
      // const resolve = options.success;
      // const reject = options.error;
      var resolve = args[1];
      var reject = args[2];
      if (api && typeof api === 'function') {
        var dataFilter = options.dataFilter;
        var opt = options.params ? options.params : options;
        if (isPromise === undefined || isPromise === true) {
          api(opt).then(function (result) {
            var newResult = result;
            if (dataFilter) {
              newResult = dataFilter(result);
            }
            options.success && options.success(newResult);
            resolve && resolve(newResult);
          }).catch(function (error) {
            options.error && options.error(error);
            reject && reject(error);
          });
        } else if (isPromise === false) {
          api(opt);
          options.success && options.success();
          resolve && resolve();
        }
      } else {
        console.error('api不存在');
      }
    }

    /* eslint-disable camelcase */
    function authMixin(hybrid) {
      var hybridJs = hybrid;
      hybridJs.extendModule('auth', [{
        namespace: 'getToken',
        os: ['xm'],
        runCode: function runCode() {
          for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
            rest[_key] = arguments[_key];
          }
          var args = rest;
          args[0].params = 'getEpointToken';
          args[0].dataFilter = function (result) {
            return {
              access_token: result
            };
          };
          callXmByArgs(args, xm.native);
        }
      }, {
        namespace: 'getAuthCode',
        os: ['xm'],
        defaultParams: {
          appkey: ''
        },
        runCode: function runCode() {
          for (var _len2 = arguments.length, rest = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            rest[_key2] = arguments[_key2];
          }
          var args = rest;
          args[0].dataFilter = function (result) {
            return {
              authCode: result.encryptedString
            };
          };
          callXmByArgs(args, xm.getAuthCode);
        }
      }, {
        namespace: 'refreshToken',
        os: ['xm'],
        runCode: function runCode() {
          for (var _len3 = arguments.length, rest = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            rest[_key3] = arguments[_key3];
          }
          var args = rest;
          args[0].params = 'refreshEpointToken';
          args[0].dataFilter = function (result) {
            return {
              access_token: result
            };
          };
          callXmByArgs(args, xm.native);
        }
      }, {
        namespace: 'getUserInfo',
        os: ['xm'],
        runCode: function runCode() {
          for (var _len4 = arguments.length, rest = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            rest[_key4] = arguments[_key4];
          }
          var args = rest;
          args[0].dataFilter = function (result) {
            return {
              userInfo: result
            };
          };
          callXmByArgs(args, xm.getLoginUserInfo);
        }
      }]);
    }

    /* eslint-disable camelcase */
    function deviceMixin(hybrid) {
      var hybridJs = hybrid;
      hybridJs.extendModule('device', [{
        namespace: 'setOrientation',
        os: ['xm'],
        defaultParams: {
          orientation: 1 // 1表示竖屏，0表示横屏
        },
        runCode: function runCode() {
          for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
            rest[_key] = arguments[_key];
          }
          var args = rest;
          var options = args[0];
          // 设为竖屏，迅盟api为调用切换横竖屏
          if (options.orientation === 1 && window.ejs_xm_orientation !== 0) {
            callXmByArgs(args, xm.horizontalScreen, false);
            window.ejs_xm_orientation = 0;
          } else if (options.orientation === 0 && window.ejs_xm_orientation !== 1) {
            callXmByArgs(args, xm.horizontalScreen, false);
            window.ejs_xm_orientation = 1;
          }
        }
      }, {
        namespace: 'getNetWorkInfo',
        os: ['xm'],
        runCode: function runCode() {
          for (var _len2 = arguments.length, rest = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            rest[_key2] = arguments[_key2];
          }
          var args = rest;
          var options = args[0];
          var isOnline = xm.isOnline();
          options.success && options.success({
            netWorkType: isOnline ? xm.isWifi() ? 1 : 0 : -1
          });
        }
      }, {
        namespace: 'callPhone',
        os: ['xm'],
        defaultParams: {
          phoneNum: ''
        },
        runCode: function runCode() {
          for (var _len3 = arguments.length, rest = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            rest[_key3] = arguments[_key3];
          }
          var args = rest;
          var options = args[0];
          args[0].params = {
            dialNumber: options.phoneNum
          };
          callXmByArgs(rest, xm.makePhoneCall, false);
        }
      }, {
        namespace: 'getDeviceId',
        os: ['xm'],
        runCode: function runCode() {
          for (var _len4 = arguments.length, rest = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            rest[_key4] = arguments[_key4];
          }
          var args = rest;
          args[0].dataFilter = function (res) {
            return {
              deviceId: res.id
            };
          };
          callXmByArgs(rest, xm.getSystemInfo);
        }
      }, {
        namespace: 'getScreenInfo',
        os: ['xm'],
        runCode: function runCode() {
          for (var _len5 = arguments.length, rest = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            rest[_key5] = arguments[_key5];
          }
          var args = rest;
          args[0].dataFilter = function (res) {
            return {
              pixel: Number(res.screenWidth) + '*' + Number(res.screenHeight)
            };
          };
          callXmByArgs(rest, xm.getSystemInfo);
        }
      }, {
        namespace: 'sendTo',
        os: ['xm'],
        defaultParams: {
          title: '',
          url: '',
          imgBase64: '',
          imgURL: '',
          sdPath: ''
        },
        runCode: function runCode() {
          for (var _len6 = arguments.length, rest = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
            rest[_key6] = arguments[_key6];
          }
          var args = rest;
          args[0].params = {
            pic: args[0].imgURL || args[0].imgBase64 || args[0].sdPath,
            title: args[0].title,
            desc: '分享链接，点击试试',
            link: args[0].url
          };
          callXmByArgs(rest, xm.shareLink);
        }
      }, {
        namespace: 'getDeviceInfo',
        os: ['xm'],
        runCode: function runCode() {
          for (var _len7 = arguments.length, rest = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
            rest[_key7] = arguments[_key7];
          }
          var args = rest;
          args[0].dataFilter = function (res) {
            return {
              deviceName: res.brand + ' ' + res.model,
              osType: res.platform,
              osVersion: res.system,
              deviceID: res.id
            };
          };
          callXmByArgs(args, xm.getSystemInfo);
        }
      }, {
        namespace: 'getMacAddress',
        os: ['xm'],
        runCode: function runCode() {
          for (var _len8 = arguments.length, rest = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
            rest[_key8] = arguments[_key8];
          }
          var args = rest;
          args[0].dataFilter = function (res) {
            return {
              macAddress: res.mac
            };
          };
          callXmByArgs(args, xm.getCurrentWifi);
        }
      }, {
        namespace: 'getVendorInfo',
        os: ['xm'],
        runCode: function runCode() {
          for (var _len9 = arguments.length, rest = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
            rest[_key9] = arguments[_key9];
          }
          var args = rest;
          args[0].dataFilter = function (res) {
            return {
              netWorkType: xm.isOnline() ? xm.isWifi() ? 1 : 0 : -1,
              deviceId: res.id,
              pixel: Number(res.screenWidth) + '*' + Number(res.screenHeight),
              uaInfo: "".concat(res.platform, " ").concat(res.brand, " ").concat(res.model)
            };
          };
          callXmByArgs(args, xm.getSystemInfo);
        }
      }]);
    }

    function ioMixin(hybrid) {
      var hybridJs = hybrid;
      var innerUtil = hybridJs.innerUtil;
      hybridJs.extendModule('io', [{
        namespace: 'downloadFile',
        os: ['xm'],
        defaultParams: {
          url: '',
          fileName: ''
        },
        runCode: function runCode() {
          for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
            rest[_key] = arguments[_key];
          }
          var args = rest;
          var options = args[0];
          args[0] = innerUtil.extend(args[0], {
            url: args[0].url,
            filePath: "/ejs/".concat(options.fileName)
          });
          args[0].dataFilter = function (result) {
            return {
              filePath: result.filePath
            };
          };
          callXmByArgs(args, xm.downloadFile);
        }
      }, {
        namespace: 'selectFile',
        os: ['xm'],
        defaultParams: {
          multi: 0
        },
        runCode: function runCode() {
          for (var _len2 = arguments.length, rest = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            rest[_key2] = arguments[_key2];
          }
          var args = rest;
          var options = args[0];
          if (options.multi === 0) {
            // 单选
            args[0] = innerUtil.extend(args[0], {
              count: 1
            });
          } else if (options.multi === 1) {
            // 多选
            args[0] = innerUtil.extend(args[0], {
              count: 9
            });
          }
          args[0].dataFilter = function (result) {
            var path = [];
            if (result instanceof Array) {
              result.forEach(function (item) {
                path.push(item.path);
              });
            } else {
              path.push(result.path);
            }
            return {
              resultData: path
            };
          };
          callXmByArgs(args, xm.chooseFile);
        }
      }, {
        namespace: 'openFile',
        os: ['xm'],
        defaultParams: {
          path: ''
        },
        runCode: function runCode() {
          for (var _len3 = arguments.length, rest = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            rest[_key3] = arguments[_key3];
          }
          var args = rest;
          var options = args[0];
          var fileName = options.path.split('/')[options.path.split('/').length - 1];
          fileName = fileName.split('?')[0];
          args[0] = innerUtil.extend(args[0], {
            path: options.path,
            fileName: fileName
          });
          callXmByArgs(rest, xm.openFile, false);
        }
      }]);
    }

    function navigatorMixin(hybrid) {
      var hybridJs = hybrid;
      var innerUtil = hybridJs.innerUtil;
      hybridJs.extendModule('navigator', [{
        namespace: 'setTitle',
        os: ['xm'],
        defaultParams: {
          title: ''
        },
        runCode: function runCode() {
          for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
            rest[_key] = arguments[_key];
          }
          // 兼容字符串形式
          var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'title');
          callXmByArgs(args, xm.setNavigationBarTitle, false);
        }
      }]);
    }

    function pageMixin(hybrid) {
      var hybridJs = hybrid;
      var innerUtil = hybridJs.innerUtil;
      function getFullUrlByParams() {
        var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var data = arguments.length > 1 ? arguments[1] : undefined;
        var extrasDataStr = '';
        if (data) {
          Object.keys(data).forEach(function (item) {
            if (extrasDataStr.indexOf('?') === -1) {
              extrasDataStr += '?';
            } else {
              extrasDataStr += '&';
            }
            extrasDataStr += "".concat(item, "=").concat(data[item]);
          });
        }
        return url + extrasDataStr;
      }
      hybridJs.extendModule('page', [{
        namespace: 'open',
        os: ['xm'],
        defaultParams: {
          pageUrl: '',
          pageStyle: 1,
          // 额外数据
          data: {},
          useRouter: false
        },
        runCode: function runCode() {
          for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
            rest[_key] = arguments[_key];
          }
          // 兼容字符串形式
          var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'pageUrl', 'data');
          var options = args[0];
          if (window.vm && window.vm.$router && options.useRouter) {
            options.pageUrl = innerUtil.getFullUrlByParams(options.pageUrl, options.data, true);
            window.vm.$router.push(options.pageUrl);
          } else {
            var navBgcolor = '',
              pagestyle = '',
              query = options.pageUrl.substring(options.pageUrl.indexOf('?') + 1),
              arr = query.split('&');
            if (arr && arr.length) {
              arr.forEach(function (item) {
                var tmp = item.split('='),
                  key = tmp[0],
                  val = tmp[1];
                if (key === 'ejs_nav_bgcolor') {
                  navBgcolor = val;
                }
                if (key === 'ejs_pagestyle') {
                  pagestyle = val;
                }
              });
            }
            if (/^(http|https|ftp|epth|h5|\/\/)/g.test(options.pageUrl)) {
              // 将额外数据拼接到url中
              options.pageUrl = innerUtil.getFullUrlByParams(options.pageUrl, options.data);
              args[0] = innerUtil.extend(args[0], {
                url: options.pageUrl,
                hideNavibar: options.pageStyle === -1 || pagestyle === '-1',
                navibarColor: args[0].navibarColor || navBgcolor
              });
              // 如果是全路径
              callXmByArgs(args, xm.openExternal);
            } else {
              if (options.data) {
                // eslint-disable-next-line
                for (var key in options.data) {
                  // eslint-disable-next-line no-prototype-builtins
                  if (options.data.hasOwnProperty(key)) {
                    var element = options.data[key];
                    options.data[key] = encodeURI(element);
                  }
                }
              }
              xm.off('resultData');
              var opt = {
                url: getFullUrlByParams(options.pageUrl, options.data),
                events: {
                  resultData: function resultData(result) {
                    options.success && options.success({
                      resultData: result
                    });
                  }
                },
                hideNavibar: options.pageStyle === -1 || pagestyle === '-1',
                navibarColor: args[0].navibarColor || navBgcolor
              };
              xm.navigateTo(opt);
            }
          }
        }
      }, {
        namespace: 'close',
        os: ['xm'],
        defaultParams: {
          // 需要关闭的页面层级，默认只会关闭一层
          popPageNumber: 1,
          // 需要传递的参数，是一个字符串
          resultData: ''
        },
        runCode: function runCode() {
          for (var _len2 = arguments.length, rest = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            rest[_key2] = arguments[_key2];
          }
          // 兼容字符串形式
          var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'resultData');
          var options = args[0];
          if (window.vm && window.vm.$router) {
            window.vm.$router.go(-args[0].popPageNumber);
          }
          options.resultData && xm.emitParent('resultData', typeof options.resultData === 'string' ? JSON.stringify(options.resultData) : options.resultData);
          xm.navigateBack({
            delta: args[0].popPageNumber
          });
        }
      }, {
        namespace: 'showError',
        os: ['xm'],
        defaultParams: {
          // 0: 网络异常  1: 服务器异常 2: 访问超时 3: 页面加载失败
          type: 0
        },
        runCode: function runCode() {
          for (var _len3 = arguments.length, rest = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            rest[_key3] = arguments[_key3];
          }
          // 兼容字符串形式
          // 兼容字符串形式
          var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'type');
          var msg = '';
          switch (args[0].type) {
            default:
              break;
            case 0:
              msg = '网络异常';
              break;
            case 1:
              msg = '服务器异常';
              break;
            case 2:
              msg = '访问超时';
              break;
            case 3:
              msg = '页面加载失败';
              break;
          }
          args[0].params = {
            msg: msg
          };
          callXmByArgs(args, xm.showExceptionTip, false);
        }
      }]);
    }

    function miniH5Mixin(hybrid) {
      var hybridJs = hybrid;
      var innerUtil = hybridJs.innerUtil;
      hybridJs.extendModule('miniH5', [{
        namespace: 'navigateTo',
        os: ['xm'],
        defaultParams: {
          // 要打开的小程序 appId
          appId: '',
          // 打开指定的页面路径
          path: '',
          // 需要传递给小程序的额外参数
          extraData: {}
        },
        runCode: function runCode() {
          for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
            rest[_key] = arguments[_key];
          }
          var args = rest;
          args[0] = innerUtil.extend(args[0], {
            appid: Number(args[0].appId),
            param: args[0].extraData,
            relativeUrl: args[0].path
          });
          callXmByArgs(args, xm.openApp, false);
        }
      }, {
        namespace: 'navigateBack',
        os: ['xm'],
        defaultParams: {
          delta: 1,
          useRouter: false
        },
        runCode: function runCode() {
          for (var _len2 = arguments.length, rest = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            rest[_key2] = arguments[_key2];
          }
          var args = rest;
          var options = args[0];
          if (window.vm && window.vm.$router && options.useRouter) {
            window.vm.$router.back();
          } else {
            xm.navigateBack({
              delta: args[0].delta
            });
          }
        }
      }, {
        namespace: 'close',
        os: ['xm'],
        defaultParams: {
          params: 'close'
        },
        runCode: function runCode() {
          for (var _len3 = arguments.length, rest = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            rest[_key3] = arguments[_key3];
          }
          // 兼容字符串形式
          var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'params');
          callXmByArgs(args, xm.native, true);
        }
      }, {
        namespace: 'setNavigationBarTitle',
        os: ['xm'],
        defaultParams: {
          title: ''
        },
        runCode: function runCode() {
          for (var _len4 = arguments.length, rest = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            rest[_key4] = arguments[_key4];
          }
          // 兼容字符串形式
          var args = rest;
          args[0].params = {
            title: args[0].title
          };
          callXmByArgs(args, xm.setNavigationBarTitle, false);
        }
      }, {
        namespace: 'onNavigateBack',
        os: ['xm'],
        runCode: function runCode() {
          for (var _len5 = arguments.length, rest = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            rest[_key5] = arguments[_key5];
          }
          // 兼容字符串形式
          var args = rest;
          xm.on('onNavigateBack', function () {
            args[0].success && args[0].success();
          });
        }
      }]);
    }

    /* eslint-disable camelcase */
    function runtimeMixin(hybrid) {
      var hybridJs = hybrid;
      var innerUtil = hybridJs.innerUtil;
      hybridJs.extendModule('runtime', [{
        namespace: 'getGeolocation',
        os: ['xm'],
        defaultParams: {
          // 1代表火星坐标系GCJ-02（天朝特色，带偏差，国内高德坐标也是这个），0代表地球坐标系WGS84（标准坐标）
          coordinate: 1,
          isShowDetail: 1
        },
        runCode: function runCode() {
          for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
            rest[_key] = arguments[_key];
          }
          var args = rest;
          var options = args[0];
          args[0] = innerUtil.extend(args[0], {
            sdk: options.coordinate === 1 ? 0 : 1
          });
          args[0].dataFilter = function (result) {
            return {
              longitude: result.lng,
              latitude: result.lat,
              addressComponent: {
                country: result.country,
                country_code: 0,
                province: result.province,
                city: result.city,
                district: result.district,
                adcode: result.adcode,
                street: result.street,
                street_number: result.streetNum,
                direction: result.streetNum
              }
            };
          };
          callXmByArgs(args, xm.getLocation);
        }
      }, {
        namespace: 'getAppVersion',
        os: ['xm'],
        runCode: function runCode() {
          for (var _len2 = arguments.length, rest = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            rest[_key2] = arguments[_key2];
          }
          var args = rest;
          args[0].dataFilter = function (result) {
            return {
              version: result.version
            };
          };
          callXmByArgs(args, xm.getAppVersion);
        }
      }, {
        namespace: 'clearCache',
        os: ['xm'],
        runCode: function runCode() {
          for (var _len3 = arguments.length, rest = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            rest[_key3] = arguments[_key3];
          }
          var args = rest;
          callXmByArgs(args, xm.clearStorage);
        }
      }, {
        namespace: 'canIUse',
        os: ['xm'],
        defaultParams: {
          apis: ''
        },
        runCode: function runCode() {
          for (var _len4 = arguments.length, rest = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            rest[_key4] = arguments[_key4];
          }
          // 兼容字符串形式
          var args = rest;
          args[0].params = {
            api: args[0].apis
          };
          args[0].dataFilter = function (result) {
            var res = {};
            result.forEach(function (element, i) {
              res[args[0].apis[i]] = element ? 1 : 0;
            });
            return res;
          };
          callXmByArgs(args, xm.canIUse);
        }
      }]);
    }

    function storageMixin(hybrid) {
      var hybridJs = hybrid;
      hybridJs.extendModule('storage', [{
        namespace: 'setItem',
        os: ['xm'],
        runCode: function runCode(params, resolve) {
          var options = params;
          var success = options.success;
          Object.keys(options).forEach(function (key) {
            if (key !== 'success' && key !== 'error') {
              var value = options[key];
              xm.setStorage({
                key: key,
                value: value
              });
            }
          });
          success && success({});
          resolve && resolve({});
        }
      }, {
        namespace: 'getItem',
        os: ['xm'],
        runCode: function runCode(params, resolve) {
          var options = params;
          var success = options.success;
          var res = {};
          var getStorage = function getStorage(key) {
            return new Promise(function (r) {
              xm.getStorage({
                key: key
              }).then(function (data) {
                res[key] = data;
                r();
              });
            });
          };
          var array = [];
          if (options.key instanceof Array) {
            options.key.forEach(function (key) {
              array.push(getStorage(key));
            });
          } else {
            array.push(getStorage(options.key));
          }
          Promise.all(array).then(function () {
            success && success(res);
            resolve && resolve(res);
          });
        }
      }, {
        namespace: 'removeItem',
        os: ['xm'],
        runCode: function runCode(params, resolve) {
          var options = params;
          var success = options.success;
          var removeStorage = function removeStorage(key) {
            return new Promise(function (r) {
              xm.removeStorage({
                key: key
              }).then(function () {
                r();
              });
            });
          };
          var array = [];
          if (options.key instanceof Array) {
            options.key.forEach(function (key) {
              array.push(removeStorage(key));
            });
          } else {
            array.push(removeStorage(options.key));
          }
          Promise.all(array).then(function () {
            success && success({});
            resolve && resolve({});
          });
        }
      }, {
        // 小程序通用数据库取数据
        namespace: 'getShareItem',
        os: ['xm'],
        defaultParams: {
          // 对应的key
          key: ''
        },
        runCode: function runCode(params, resolve) {
          var options = params;
          var success = options.success;
          var res = {};
          var getStorage = function getStorage(key) {
            return new Promise(function (r) {
              xm.getStorage({
                key: key,
                isGlobal: true
              }).then(function (data) {
                res[key] = data;
                r();
              });
            });
          };
          var array = [];
          if (options.key instanceof Array) {
            options.key.forEach(function (key) {
              array.push(getStorage(key));
            });
          } else {
            array.push(getStorage(options.key));
          }
          Promise.all(array).then(function () {
            success && success(res);
            resolve && resolve(res);
          });
        }
      }, {
        // 小程序通用数据库存数据
        namespace: 'setShareItem',
        os: ['xm'],
        runCode: function runCode(params, resolve) {
          var options = params;
          var success = options.success;
          Object.keys(options).forEach(function (key) {
            if (key !== 'success' && key !== 'error') {
              var value = options[key];
              xm.setStorage({
                key: key,
                value: value,
                isGlobal: true
              });
            }
          });
          success && success({});
          resolve && resolve({});
        }
      }, {
        // 小程序通用数据库删数据
        namespace: 'removeShareItem',
        os: ['xm'],
        defaultParams: {
          // 对应的key
          key: ''
        },
        runCode: function runCode(params, resolve) {
          var options = params;
          var success = options.success;
          var removeStorage = function removeStorage(key) {
            return new Promise(function (r) {
              xm.removeStorage({
                key: key,
                isGlobal: true
              }).then(function () {
                r();
              });
            });
          };
          var array = [];
          if (options.key instanceof Array) {
            options.key.forEach(function (key) {
              array.push(removeStorage(key));
            });
          } else {
            array.push(removeStorage(options.key));
          }
          Promise.all(array).then(function () {
            success && success({});
            resolve && resolve({});
          });
        }
      }]);
    }

    function utilMixin(hybrid) {
      var hybridJs = hybrid;
      var innerUtil = hybridJs.innerUtil;
      hybridJs.extendModule('util', [{
        namespace: 'scan',
        os: ['xm'],
        runCode: function runCode() {
          for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
            rest[_key] = arguments[_key];
          }
          var args = rest;
          args[0].dataFilter = function (result) {
            return {
              resultData: result
            };
          };
          callXmByArgs(args, xm.scanCode);
        }
      }, {
        namespace: 'playVideo',
        os: ['xm'],
        defaultParams: {
          videoUrl: 0
        },
        runCode: function runCode() {
          for (var _len2 = arguments.length, rest = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            rest[_key2] = arguments[_key2];
          }
          var args = rest;
          args[0] = innerUtil.extend(args[0], {
            url: args[0].videoUrl
          });
          callXmByArgs(args, xm.playMedia);
        }
      }, {
        namespace: 'selectImage',
        os: ['xm'],
        defaultParams: {
          photoCount: 9,
          showCamera: 0
        },
        runCode: function runCode() {
          for (var _len3 = arguments.length, rest = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            rest[_key3] = arguments[_key3];
          }
          var args = rest;
          args[0].params = {
            selectType: args[0].showCamera ? 0 : 2,
            count: args[0].photoCount
          };
          args[0].dataFilter = function (result) {
            var path = [];
            result.length && result.forEach(function (item) {
              path.push(item.path);
            });
            return {
              resultData: path
            };
          };
          callXmByArgs(args, xm.chooseImage);
        }
      }, {
        namespace: 'cameraImage',
        os: ['xm'],
        runCode: function runCode() {
          for (var _len4 = arguments.length, rest = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            rest[_key4] = arguments[_key4];
          }
          var args = rest;
          args[0].params = {
            selectType: 1
          };
          args[0].dataFilter = function (result) {
            var path = [];
            result.length && result.forEach(function (item) {
              path.push(item.path);
            });
            return {
              resultData: path[0]
            };
          };
          callXmByArgs(args, xm.chooseImage);
        }
      }, {
        namespace: 'prevImage',
        os: ['xm'],
        defaultParams: {
          index: '',
          selectedPhotos: {}
        },
        runCode: function runCode() {
          for (var _len5 = arguments.length, rest = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            rest[_key5] = arguments[_key5];
          }
          var args = rest;
          args[0] = innerUtil.extend(args[0], {
            current: args[0].index,
            urls: args[0].selectedPhotos
          });
          callXmByArgs(args, xm.previewImages, false);
        }
      }, {
        namespace: 'invokePluginApi',
        os: ['xm'],
        defaultParams: {
          path: '',
          dataMap: {}
        },
        runCode: function runCode() {
          for (var _len6 = arguments.length, rest = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
            rest[_key6] = arguments[_key6];
          }
          var args = rest;
          var resolve = args[1];
          var reject = args[2];
          xm.native('invokePlugin', {
            path: args[0].path,
            dataMap: args[0].dataMap
          }).then(function (res) {
            console.log('res.data');
            console.log(res.data);
            args[0].success && args[0].success(res.data);
            resolve && resolve(res.data);
          }).catch(function (err) {
            reject && reject(err);
          });
        }
      }, {
        namespace: 'recordVideo',
        os: ['xm'],
        support: '3.1.2',
        defaultParams: {
          // 最大时长，单位为秒
          maxDuration: 120,
          className: hybridJs.os.android ? 'com.epoint.baseapp.component.media.ShootActivity' : 'EPTVideoRecordViewController'
        },
        runCode: function runCode() {
          for (var _len7 = arguments.length, rest = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
            rest[_key7] = arguments[_key7];
          }
          var args = rest;
          args[0].params = {
            max: args[0].maxDuration
          };
          args[0].dataFilter = function (result) {
            return {
              resultData: result.videoPath
            };
          };
          callXmByArgs(args, xm.recordVideo);
        }
      }]);
    }

    var pickdateStyle = document.createElement('style');
    pickdateStyle.textContent = "\n    .ejs-ui-pickdate .van-picker{\n        padding: 52px 0 70px;\n    }\n    \n    .ejs-ui-pickdate .van-picker .van-picker__toolbar{\n        position: absolute;\n        width: 100%;\n        height: 70px;\n        box-sizing: border-box;\n        bottom: 0;\n        padding: 10px 20px 20px;\n    }\n\n    .ejs-ui-pickdate .van-picker .van-picker__toolbar button{\n        width: calc(50% - 14px);\n        border-radius: 22px;\n        font-size: 15px;\n    }\n\n    .ejs-ui-pickdate .van-picker .van-picker__toolbar .van-picker__cancel{\n        border: 1px solid #969799;\n        color: #2e3033;\n    }\n\n    .ejs-ui-pickdate .van-picker .van-picker__toolbar .van-picker__confirm{\n        background-color: #2463e0;\n        color: #fff;\n    }\n    \n    .ejs-ui-pickdate .van-picker .van-picker__title{\n        position: absolute;\n        top: -300px;\n    }\n    \n    .ejs-ui-pickdate .van-picker .van-picker__columns{\n        height: 264px !important;\n        color: #2E3033;\n        border-top: 1px solid #ebedf0;\n        padding: 0 20px;\n    }\n    ";
    pickdateStyle.id = 'pickdateStyle';
    var pickdatetimeStyle = document.createElement('style');
    pickdatetimeStyle.textContent = "\n    #ejs-ui-pickDateTime .van-picker .van-picker-column:nth-child(1){\n        flex: 2;\n    }\n";
    pickdatetimeStyle.id = 'pickdatetimeStyle';
    var selectStyle = document.createElement('style');
    selectStyle.textContent = "\n    .ejs-ui-select .van-cell-group{\n        max-height: 376px;\n        overflow: scroll;\n    }\n    .ejs-ui-select .van-cell-group::after{\n        border: none;\n    }\n    .ejs-ui-select .van-cell-group .van-cell{\n        padding: 10px 20px;\n        font-size: 16px;\n        color: #2e3033;\n    }\n    .ejs-ui-select .van-cell-group .van-cell::after{\n        border-bottom: none;\n    }\n    .ejs-ui-select .van-cell-group .van-cell .van-radio__icon .van-icon{\n        border: none;\n    }\n    .ejs-ui-select .van-popup__close-icon{\n        color: #2e3033;\n    }\n    .ejs-ui-select .van-checkbox__icon--checked .van-icon,\n    .ejs-ui-select .van-radio__icon--checked .van-icon{\n        background-color: #2463e0;\n    }\n    .ejs-ui-select .van-cell-group .fontActive{\n        color: #2463e0;\n    }\n";
    selectStyle.id = 'selectStyle';
    var dialogStyle = document.createElement('style');
    dialogStyle.textContent = "\n    .van-dialog{\n        border-radius: 1px;\n    }\n    .van-dialog__header{\n        font-size: 18px;\n        color: #2e3033;\n        font-weight: bold;\n    }\n    .van-dialog__footer{\n        padding: 8px 22px 16px;\n    }\n    .van-dialog__footer .van-button{\n        border-radius: 18px;\n        height: 36px;\n    }\n    .van-dialog__footer .van-dialog__cancel{\n        border: 1px solid #ebedf0;\n        margin-right: 16px;\n        background: #fff;\n        color: #2e3033;\n    }\n    .van-dialog__footer .van-dialog__confirm{\n        background-color: rgb(36, 99, 224);\n        color: #fff;\n    }\n    .van-dialog__footer .van-button__text{\n        font-size: 14px;\n    }\n    .van-dialog__message{\n        padding-top: 29px;\n        padding-bottom: 13px;\n        font-size: 18px;\n        color: #2e3033;\n        line-height: 24px;\n    }\n    .van-dialog__message--has-title{\n        padding-top: 4.267vw;\n        font-size: 16px;\n    }\n    .van-dialog__content .van-field{\n        padding: 30px 36px 38px;\n    }\n    .van-dialog__content .van-radio-group{\n        padding: 20px 20px 28px;\n    }\n    .van-hairline--top::after{\n        border-top-width: 0 !important;\n    }\n    .van-hairline--left::after{\n        border-left-width: 0;\n    }\n    [class*=van-hairline]::after{\n        border: none;\n    }\n    input.van-field__control{\n        border: none;\n        margin: 0;\n        padding: 0;\n        height: 24px;\n    }\n";
    dialogStyle.id = 'dialogStyle';
    var skinStyle = document.createElement('style');
    skinStyle.textContent = "\n    .ejs-ui-btn-custom {\n        background-color: #2463e0;\n        background-color: var(--baseBlue, #2463e0);\n        color: #fff;\n        color: var(--baseFontWithe, #fff);\n    }\n  \n    .ejs-ui-waiting {\n        background-color: #000;\n        background-color: var(--baseBgBlack, #000);\n    }\n\n    @keyframes wave {\n        0% {\n            opacity: 1;\n        }\n        50% {\n            opacity: 0.7;\n        }\n        100% {\n            opacity: 0.3;\n        }\n    }\n";
    skinStyle.id = 'skinStyle';

    /**
     * 将小于10的数字前面补齐0,然后变为字符串返回
     * @param {Number} numberStr 需要不起的数字
     * @return {String} 补齐0后的字符串
     */
    function paddingWith0(numberStr) {
      var DECIMAL_TEN = 10;
      var number = numberStr;
      if (typeof number === 'number' || typeof number === 'string') {
        number = parseInt(number.toString(), DECIMAL_TEN);
        if (number < DECIMAL_TEN) {
          number = "0".concat(number);
        }
        return number;
      }
      return '';
    }

    var option = {
      minDate: null,
      maxDate: null
    };
    var nowValue;
    var weekDay;
    function getMonthEndDay(year, month) {
      return 32 - new Date(year, month - 1, 32).getDate();
    }
    function times(n, iteratee) {
      var index = -1;
      var result = Array(n);
      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }
    function formatDate(year, month, date) {
      var week = weekDay[new Date(year, month - 1, date).getDay()];
      return year + '-' + paddingWith0(month) + '-' + paddingWith0(date) + ' ' + week;
    }
    function getBoundary(type, value) {
      var _ref;
      var boundary = option["".concat(type, "Date")];
      var year = boundary.getFullYear();
      var month = 1;
      var date = 1;
      var hour = 0;
      var minute = 0;
      var second = 0;
      if (type === 'max') {
        month = 12;
        date = getMonthEndDay(value.getFullYear(), value.getMonth() + 1);
        hour = 23;
        minute = 59;
        second = 59;
      }
      if (value.getFullYear() === year) {
        month = boundary.getMonth() + 1;
        if (value.getMonth() + 1 === month) {
          date = boundary.getDate();
          if (value.getDate() === date) {
            hour = boundary.getHours();
            if (value.getHours() === hour) {
              minute = boundary.getMinutes();
              if (value.getMinutes() === minute) {
                second = boundary.getSeconds();
              }
            }
          }
        }
      }
      return _ref = {}, _ref["".concat(type, "Year")] = year, _ref["".concat(type, "Month")] = month, _ref["".concat(type, "Date")] = date, _ref["".concat(type, "Hour")] = hour, _ref["".concat(type, "Minute")] = minute, _ref["".concat(type, "Second")] = second, _ref;
    }
    function ranges() {
      var _this$getBoundary = getBoundary('max', nowValue),
        maxYear = _this$getBoundary.maxYear,
        maxDate = 31,
        maxMonth = 12,
        maxHour = _this$getBoundary.maxHour,
        maxMinute = _this$getBoundary.maxMinute,
        maxSecond = _this$getBoundary.maxSecond;
      var _this$getBoundary2 = getBoundary('min', nowValue),
        minYear = _this$getBoundary2.minYear,
        minDate = 1,
        minMonth = 1,
        minHour = _this$getBoundary2.minHour,
        minMinute = _this$getBoundary2.minMinute,
        minSecond = _this$getBoundary2.minSecond;
      var result = [{
        type: 'year',
        range: [minYear, maxYear]
      }, {
        type: 'month',
        range: [minMonth, maxMonth]
      }, {
        type: 'day',
        range: [minDate, maxDate]
      }, {
        type: 'hour',
        range: [minHour, maxHour]
      }, {
        type: 'minute',
        range: [minMinute, maxMinute]
      }, {
        type: 'second',
        range: [minSecond, maxSecond]
      }];
      return result;
    }
    function originColumns() {
      var rangesData = ranges();
      return rangesData.map(function (_ref) {
        var type = _ref.type,
          rangeArr = _ref.range;
        var values = times(rangeArr[1] - rangeArr[0] + 1, function (index) {
          var value = rangeArr[0] + index;
          return value;
        });
        return {
          type: type,
          values: values
        };
      });
    }
    function columns(isFull) {
      var originColumnsData = originColumns();
      var changeColumns = isFull ? originColumnsData.slice(-3) : originColumnsData.slice(-3, -1);
      var maxDate = option.maxDate.getDate(),
        maxMonth = option.maxDate.getMonth() + 1,
        maxYear = option.maxDate.getFullYear(),
        minDate = option.minDate.getDate(),
        minMonth = option.minDate.getMonth() + 1,
        minYear = option.minDate.getFullYear();
      var col1 = [];
      originColumnsData[0].values.forEach(function (year) {
        originColumnsData[1].values.forEach(function (month) {
          if (maxYear === year && month > maxMonth || minYear === year && month < minMonth) ; else {
            originColumnsData[2].values.forEach(function (date) {
              if (maxYear === year && month === maxMonth && date > maxDate || minYear === year && month === minMonth && date < minDate || date > getMonthEndDay(year, month)) ; else {
                col1.push(formatDate(year, month, date));
              }
            });
          }
        });
      });
      changeColumns = [{
        type: 'day',
        values: col1
      }].concat(changeColumns);
      return changeColumns.map(function (column) {
        var index = 0;
        if (column.type === 'day') {
          var now = formatDate(nowValue.getFullYear(), nowValue.getMonth() + 1, nowValue.getDate());
          index = column.values.indexOf(now);
        }
        if (column.type === 'hour') {
          index = column.values.indexOf(nowValue.getHours());
          column.values = column.values.map(function (ele) {
            return paddingWith0(ele);
          });
        }
        if (column.type === 'minute') {
          index = column.values.indexOf(nowValue.getMinutes());
          column.values = column.values.map(function (ele) {
            return paddingWith0(ele);
          });
        }
        if (column.type === 'second') {
          index = column.values.indexOf(nowValue.getSeconds());
          column.values = column.values.map(function (ele) {
            return paddingWith0(ele);
          });
        }
        return {
          values: column.values,
          defaultIndex: index
        };
      });
    }
    function getColumns(minDate, maxDate, innerValue, isFull) {
      var noop = function noop(info) {
        return info;
      };
      var $t = window.di18n && window.di18n.$t.bind(window.di18n) || noop;
      weekDay = [$t('周日'), $t('周一'), $t('周二'), $t('周三'), $t('周四'), $t('周五'), $t('周六')];
      var min = minDate;
      var max = maxDate;
      min = Math.max(innerValue.getTime() - 6 * 30 * 24 * 60 * 60 * 1000, min.getTime());
      max = Math.min(innerValue.getTime() + 6 * 30 * 24 * 60 * 60 * 1000, max.getTime());
      option.minDate = new Date(min);
      option.maxDate = new Date(max);
      nowValue = innerValue;
      return columns(isFull);
    }

    /// <reference types="vue-tsx-support/options/allow-unknown-props" />
    var head = document.getElementsByTagName('head')[0];
    if (!document.querySelector('#skinStyle')) {
      head.appendChild(skinStyle);
    }
    function insertFormatCSS() {
      if (!document.querySelector('#pickdateStyle')) {
        head.appendChild(pickdateStyle);
      }
    }
    function formatDialog(cancelable) {
      if (!document.querySelector('#dialogStyle')) {
        head.appendChild(dialogStyle);
      }
      var style = document.querySelector('#dialogStyle');
      if (!cancelable) {
        style.textContent = (style.textContent || '').replace(/.van-dialog__footer\{([\s]+?)padding: 0 24px 20px;/g, '.van-dialog__footer{\n padding: 0 20% 20px;');
      } else {
        style.textContent = (style.textContent || '').replace(/.van-dialog__footer\{([\s]+?)padding: 0 20% 20px;/g, '.van-dialog__footer{\n padding: 0 24px 20px;');
      }
    }
    var vueData = {
      type: '',
      timer: null,
      confirm: {
        show: false,
        title: '',
        message: '',
        buttonLabels: ['取消', '确定'],
        cancelable: true
      },
      alert: {
        show: false,
        title: '',
        message: '',
        buttonName: '',
        cancelable: true
      },
      prompt: {
        show: false,
        message: '',
        value: '',
        title: '',
        buttonLabels: '',
        hint: '',
        maxlength: '',
        autosize: {},
        cancelable: true
      },
      actionSheet: {
        show: false,
        actions: [],
        cancelable: true
      },
      pickDate: {
        show: false,
        type: '',
        value: null,
        title: '',
        minDate: {},
        maxDate: {},
        innerValue: null,
        columns: null
      },
      pickTime: {
        show: false,
        value: null,
        title: '',
        minHour: '',
        maxHour: '',
        minMinute: '',
        maxMinute: ''
      },
      pickDateTime: {
        show: false,
        value: null,
        title: '',
        showSecond: false,
        minDate: {},
        maxDate: {},
        innerValue: null,
        columns: []
      },
      popPicker: {
        show: false,
        columns: []
      },
      showWaiting: {
        show: false,
        message: '',
        padlock: true
      },
      select: {
        title: '',
        items: [],
        choiceState: [],
        // 由以前的true和false替换为了1和0
        isMultiSelect: 1,
        // 样式类型，默认为0。 0：单列表样式；1：九宫格样式(目前只支持单选)
        type: '',
        columns: 2,
        // 可取消
        cancelable: true,
        isShowSelectAll: false,
        show: false,
        value: []
      }
    };
    function uiVue(args, method, os) {
      var options = args[0];
      var resolve = args[1];
      var noop = function noop(info) {
        return info;
      };
      var $t = window.di18n && window.di18n.$t.bind(window.di18n) || noop;
      var datetime = options.datetime;
      var minDate = options.minDate;
      var maxDate = options.maxDate;
      if (method === 'pickDate' || method === 'pickDateTime' || method === 'pickMonth') {
        insertFormatCSS();
        if (!datetime) {
          // 如果不存在，默认为当前时间
          datetime = new Date();
        } else {
          if (os && os.ios && method === 'pickMonth' && datetime.length <= 7) {
            // ios环境下，new Date('2021/12')是非法的，需要改为new Date('2021/12/1')
            datetime = datetime + '-01';
          }
          datetime = new Date(datetime.replace(/-/g, '/'));
        }
        if (!minDate) {
          // 如果不传，默认从1900开始
          minDate = 1900;
          minDate += '/01/01';
        } else if (os && os.ios && method === 'pickMonth' && minDate.length <= 7) {
          minDate = minDate + '-01';
        }
        if (!maxDate) {
          maxDate = new Date().getFullYear() + 10;
          maxDate += '/12/31';
        } else if (os && os.ios && method === 'pickMonth' && maxDate.length <= 7) {
          maxDate += '-01';
        }
      }
      switch (method) {
        default:
          break;
        case 'confirm':
          vueData.type = 'confirm';
          vueData.confirm.title = options.title;
          vueData.confirm.message = options.message;
          vueData.confirm.buttonLabels = options.buttonLabels;
          vueData.confirm.cancelable = options.cancelable === 1;
          formatDialog(true);
          break;
        case 'alert':
          vueData.type = 'alert';
          vueData.alert.title = options.title;
          vueData.alert.message = options.message;
          vueData.alert.buttonName = options.buttonName;
          vueData.alert.cancelable = options.cancelable === 1;
          formatDialog(false);
          break;
        case 'prompt':
          vueData.type = 'prompt';
          vueData.prompt.message = options.message;
          vueData.prompt.value = options.text;
          vueData.prompt.title = options.title;
          vueData.prompt.buttonLabels = options.buttonLabels;
          vueData.prompt.hint = options.hint;
          vueData.prompt.maxlength = options.maxLength;
          vueData.prompt.cancelable = options.cancelable === 1;
          vueData.prompt.autosize = {
            // 一行的高度是24px
            maxHeight: options.lines * 24,
            minHeight: 24
          };
          formatDialog(true);
          break;
        case 'actionSheet':
          vueData.type = 'actionSheet';
          options.items = options.items.map(function (element) {
            return {
              name: element
            };
          });
          vueData.actionSheet.actions = options.items;
          vueData.actionSheet.cancelable = options.cancelable === 1;
          break;
        case 'pickDate':
          vueData.type = 'pickDate';
          vueData.pickDate.type = 'date';
          setTimeout(function () {
            vueData.pickDate.value = datetime;
          }, 20);
          vueData.pickDate.title = options.title;
          vueData.pickDate.minDate = new Date(minDate.replace(/-/g, '/'));
          vueData.pickDate.maxDate = new Date(maxDate.replace(/-/g, '/'));
          break;
        case 'pickMonth':
          vueData.type = 'pickDate';
          vueData.pickDate.type = 'year-month';
          setTimeout(function () {
            vueData.pickDate.value = datetime;
          }, 20);
          vueData.pickDate.title = options.title;
          vueData.pickDate.minDate = new Date(minDate.replace(/-/g, '/'));
          vueData.pickDate.maxDate = new Date(maxDate.replace(/-/g, '/'));
          break;
        case 'pickTime':
          insertFormatCSS();
          var _datetime = options.datetime;
          if (!_datetime) {
            // 如果不存在，默认为当前时间
            var dateNow = new Date();
            var hours = paddingWith0(dateNow.getHours());
            var minutes = paddingWith0(dateNow.getMinutes());
            _datetime = "".concat(hours, ":").concat(minutes);
          }
          vueData.type = 'pickTime';
          vueData.pickTime.value = _datetime;
          vueData.pickTime.title = options.title;
          vueData.pickTime.minHour = options.minHour;
          vueData.pickTime.maxHour = options.maxHour;
          vueData.pickTime.minMinute = options.minMinute;
          vueData.pickTime.maxMinute = options.maxMinute;
          break;
        case 'pickDateTime':
          vueData.type = 'pickDateTime';
          if (!document.querySelector('pickdatetimeStyle')) {
            head.appendChild(pickdatetimeStyle);
          }
          vueData.pickDateTime.minDate = new Date(minDate.replace(/-/g, '/'));
          vueData.pickDateTime.maxDate = new Date(maxDate.replace(/-/g, '/'));
          vueData.pickDateTime.value = datetime;
          vueData.pickDateTime.title = options.title;
          vueData.pickDateTime.showSecond = options.showSecond;
          vueData.pickDateTime.innerValue = datetime;
          vueData.pickDateTime.columns = getColumns(vueData.pickDateTime.minDate, vueData.pickDateTime.maxDate, datetime, options.showSecond);
          break;
        case 'popPicker':
          vueData.type = 'popPicker';
          if (JSON.stringify(vueData.popPicker.columns) !== JSON.stringify(options.data)) {
            vueData.popPicker.columns = options.data;
          }
          break;
        case 'showWaiting':
          vueData.type = 'showWaiting';
          vueData.showWaiting.message = options.message;
          vueData.showWaiting.padlock = options.padlock;
          break;
        case 'select':
          var setValue = '';
          var _type = '';
          if (options.type === 0 && options.isMultiSelect === 1) {
            // 多选
            _type = 'selectMulti';
            setValue = [];
            options.choiceState.forEach(function (item, index) {
              if (item === '1') {
                setValue.push(options.items[index]);
              }
            });
          } else if (options.type === 0 && options.isMultiSelect === 0) {
            // 单选
            _type = 'select';
          } else if (options.type === 1) {
            // 九宫格单选
            _type = 'selectSingleSP';
            formatDialog(true);
          }
          if (options.type === 0 && !document.querySelector('#selectStyle')) {
            head.appendChild(selectStyle);
          }
          vueData.type = 'select';
          vueData.select.title = options.title;
          vueData.select.items = options.items;
          vueData.select.choiceState = options.choiceState;
          vueData.select.isMultiSelect = options.isMultiSelect;
          vueData.select.type = _type;
          vueData.select.columns = options.columns;
          vueData.select.cancelable = options.cancelable === 1;
          vueData.select.isShowSelectAll = options.isShowSelectAll === 1;
          vueData.select.value = setValue;
          break;
      }
      if (options.success) {
        vueData[vueData.type].success = options.success;
      }
      if (resolve) {
        vueData[vueData.type].resolve = resolve;
      }
      var createPickDate = function createPickDate() {
        var vnode = new Vue({
          data: function data() {
            return vueData;
          },
          render: function render() {
            var h = arguments[0];
            var self = this;
            var innerDOM;
            switch (self.type) {
              default:
                break;
              case 'confirm':
                innerDOM = h(vant.Dialog.Component, {
                  attrs: {
                    id: "ejs-ui-confirm"
                  },
                  props: {
                    "value": self.confirm.show,
                    "width": 295,
                    "title": self.confirm.title,
                    "message": self.confirm.message,
                    "close-on-click-overlay": self.confirm.cancelable,
                    "show-cancel-button": true,
                    "confirm-button-text": self.confirm.buttonLabels[1],
                    "cancel-button-text": self.confirm.buttonLabels[0],
                    "overlay-style": {
                      backgroundColor: 'rgba(0, 0, 0, 0.6)'
                    }
                  },
                  on: {
                    "confirm": self.conConfirm,
                    "cancel": self.conCancel,
                    "click-overlay": self.dialogCancel
                  }
                });
                break;
              case 'alert':
                innerDOM = h(vant.Dialog.Component, {
                  attrs: {
                    id: "ejs-ui-alert"
                  },
                  props: {
                    "width": 295,
                    "value": self.alert.show,
                    "title": self.alert.title,
                    "message": self.alert.message,
                    "close-on-click-overlay": self.alert.cancelable,
                    "show-cancel-button": false,
                    "confirm-button-text": self.alert.buttonName,
                    "overlay-style": {
                      backgroundColor: 'rgba(0, 0, 0, 0.6)'
                    }
                  },
                  on: {
                    "confirm": self.alertConfirm,
                    "cancel": self.alertConfirm,
                    "click-overlay": self.dialogCancel
                  }
                });
                break;
              case 'prompt':
                innerDOM = h(vant.Dialog.Component, {
                  attrs: {
                    id: "ejs-ui-prompt"
                  },
                  props: {
                    "value": self.prompt.show,
                    "width": 295,
                    "title": self.prompt.title,
                    "close-on-click-overlay": self.prompt.cancelable,
                    "show-cancel-button": true,
                    "confirm-button-text": self.prompt.buttonLabels[1],
                    "cancel-button-text": self.prompt.buttonLabels[0],
                    "overlay-style": {
                      backgroundColor: 'rgba(0, 0, 0, 0.6)'
                    }
                  },
                  on: {
                    "confirm": self.promptConfirm,
                    "cancel": self.promptCancel,
                    "click-overlay": self.dialogCancel
                  }
                }, [h(vant.Field, {
                  props: {
                    "value": self.prompt.value,
                    "type": self.prompt.autosize.maxHeight / 24 === 1 ? 'text' : 'textarea',
                    "autosize": self.prompt.autosize,
                    "placeholder": self.prompt.hint,
                    "maxlength": self.prompt.maxlength
                  },
                  on: {
                    "input": self.promptInput
                  }
                })]);
                break;
              case 'actionSheet':
                innerDOM = h(vant.ActionSheet, {
                  attrs: {
                    id: "ejs-ui-actionSheet"
                  },
                  props: {
                    "value": self.actionSheet.show,
                    "actions": self.actionSheet.actions,
                    "cancelText": $t('取消'),
                    "close-on-click-overlay": self.actionSheet.cancelable
                  },
                  on: {
                    "select": self.actionSheetSelect,
                    "cancel": self.actionSheetSelect,
                    "click-overlay": self.dialogCancel
                  }
                });
                break;
              case 'pickDate':
                innerDOM = h(vant.Popup, {
                  props: {
                    "value": self.pickDate.show,
                    "position": "bottom",
                    "close-on-click-overlay": false,
                    "overlay-style": {
                      backgroundColor: 'rgba(0, 0, 0, 0.6)'
                    }
                  },
                  attrs: {
                    id: "ejs-ui-".concat(self.type)
                  },
                  "class": "ejs-ui-pickdate",
                  on: {
                    "click-overlay": self.cancel
                  }
                }, [h(vant.DatetimePicker, {
                  props: {
                    "value": self.pickDate.value,
                    "type": self.pickDate.type,
                    "title": self.pickDate.title,
                    "minDate": self.pickDate.minDate,
                    "maxDate": self.pickDate.maxDate,
                    "swipe-duration": 500,
                    "confirm-button-text": $t('确定'),
                    "cancel-button-text": $t('取消')
                  },
                  on: {
                    "confirm": self.pickDateConfirm,
                    "cancel": self.cancel
                  }
                })]);
                break;
              case 'pickTime':
                innerDOM = h(vant.Popup, {
                  props: {
                    "value": self.pickTime.show,
                    "position": "bottom",
                    "close-on-click-overlay": false,
                    "overlay-style": {
                      backgroundColor: 'rgba(0, 0, 0, 0.6)'
                    }
                  },
                  attrs: {
                    id: "ejs-ui-pickTime"
                  },
                  "class": "ejs-ui-pickdate",
                  on: {
                    "click-overlay": self.cancel
                  }
                }, [h(vant.DatetimePicker, {
                  props: {
                    "value": self.pickTime.value,
                    "type": "time",
                    "title": self.pickTime.title,
                    "min-hour": self.pickTime.minHour,
                    "max-hour": self.pickTime.maxHour,
                    "min-minute": self.pickTime.minMinute,
                    "max-minute": self.pickTime.maxMinute,
                    "swipe-duration": 500,
                    "confirm-button-text": $t('确定'),
                    "cancel-button-text": $t('取消')
                  },
                  on: {
                    "confirm": self.pickTimeConfirm,
                    "cancel": self.cancel
                  }
                })]);
                break;
              case 'pickDateTime':
                innerDOM = h(vant.Popup, {
                  props: {
                    "value": self.pickDateTime.show,
                    "position": "bottom",
                    "close-on-click-overlay": false,
                    "overlay-style": {
                      backgroundColor: 'rgba(0, 0, 0, 0.6)'
                    }
                  },
                  attrs: {
                    id: "ejs-ui-".concat(self.type)
                  },
                  "class": "ejs-ui-pickdate",
                  on: {
                    "click-overlay": self.cancel
                  }
                }, [h(vant.Picker, {
                  props: {
                    "title": self.pickDateTime.title,
                    "swipe-duration": 500,
                    "show-toolbar": true,
                    "columns": self.pickDateTime.columns,
                    "confirm-button-text": $t('确定'),
                    "cancel-button-text": $t('取消')
                  },
                  on: {
                    "confirm": self.pickDateTime.showSecond ? self.pickDateFullTimeConfirm : self.pickDateTimeConfirm,
                    "cancel": self.cancel,
                    "change": self.pickDateTime.showSecond ? self.pickDateFullTimeChange : self.pickDateTimeChange
                  }
                })]);
                break;
              case 'popPicker':
                innerDOM = h(vant.Popup, {
                  props: {
                    "value": self.popPicker.show,
                    "position": "bottom",
                    "close-on-click-overlay": false,
                    "overlay-style": {
                      backgroundColor: 'rgba(0, 0, 0, 0.6)'
                    }
                  },
                  attrs: {
                    id: "ejs-ui-popPicker"
                  },
                  on: {
                    "click-overlay": self.cancel
                  }
                }, [h(vant.Picker, {
                  props: {
                    "show-toolbar": true,
                    "swipe-duration": 500,
                    "columns": self.popPicker.columns,
                    "confirm-button-text": $t('确定'),
                    "cancel-button-text": $t('取消')
                  },
                  on: {
                    "confirm": self.popPickerConfirm,
                    "cancel": self.cancel
                  }
                })]);
                break;
              case 'showWaiting':
                innerDOM = h(vant.Popup, {
                  props: {
                    "value": self.showWaiting.show,
                    "close-on-click-overlay": false
                  },
                  attrs: {
                    id: "ejs-ui-showWaiting",
                    overlay: false
                  },
                  on: {
                    "click-overlay": self.cancel,
                    "click": !self.showWaiting.padlock ? self.cancel : function () {}
                  },
                  style: {
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'transparent',
                    zIndex: '10001'
                  },
                  "class": "ejs-ui-waiting"
                }, [h("div", {
                  style: {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-57.5px',
                    marginLeft: '-70px',
                    width: '140px',
                    height: '115px',
                    backgroundColor: '#000',
                    opacity: '0.7',
                    borderRadius: '10px'
                  }
                }, [h("div", {
                  style: {
                    textAlign: 'center',
                    width: '100%',
                    height: '100%',
                    padding: '30px 0 20px',
                    boxSizing: 'border-box'
                  }
                }, [h("div", {
                  style: {
                    display: 'flex',
                    justifyContent: 'space-around',
                    margin: '0 auto 24px',
                    width: '36px',
                    height: '14px'
                  }
                }, [[1, 2, 3].map(function (item, index) {
                  return h("span", {
                    style: {
                      backgroundColor: '#fff',
                      height: '100%',
                      width: '3px',
                      transform: 'skewX(-15deg)',
                      animationFillMode: 'forwards',
                      animation: 'wave 0.6s 0s infinite linear',
                      animationDelay: index === 0 ? '0' : index === 1 ? '0.2s' : '0.4s'
                    }
                  });
                })]), h("div", {
                  style: {
                    color: '#fff',
                    fontSize: '15px'
                  }
                }, [self.showWaiting.message])])])]);
                break;
              case 'select':
                var _innerSelect = '';
                if (self.select.type === 'select') {
                  // 单选
                  _innerSelect = h(vant.RadioGroup, {
                    props: {
                      "value": self.select.value
                    }
                  }, [h(vant.CellGroup, [self.select.items.map(function (item) {
                    var clickEvent = function clickEvent() {
                      self.select.value = item;
                      self.selectConfirm();
                    };
                    return h(vant.Cell, {
                      props: {
                        "title": item,
                        "clickable": true
                      },
                      on: {
                        "click": clickEvent
                      },
                      "class": {
                        fontActive: self.select.value === item
                      }
                    }, [h(vant.Radio, {
                      attrs: {
                        name: item
                      },
                      slot: "right-icon"
                    })]);
                  })])]);
                } else if (self.select.type === 'selectMulti') {
                  // 多选
                  var _innerCell;
                  if (self.select.isShowSelectAll) {
                    var selectAll = function selectAll() {
                      if (self.select.value.length === self.select.items.length) {
                        self.select.value = [];
                      } else {
                        self.select.value = self.select.items.slice(0);
                      }
                    };
                    // 展示全选
                    _innerCell = h(vant.Cell, {
                      props: {
                        "title": "全选",
                        "clickable": true
                      },
                      on: {
                        "click": selectAll
                      },
                      "class": {
                        fontActive: self.select.value.length === self.select.items.length
                      }
                    }, [h(vant.Checkbox, {
                      props: {
                        "value": self.select.value.length === self.select.items.length,
                        "name": "all",
                        "shape": "square",
                        "bindGroup": false
                      },
                      slot: "right-icon"
                    })]);
                  }
                  _innerSelect = h("div", [h(vant.CheckboxGroup, {
                    props: {
                      "value": self.select.value
                    }
                  }, [h(vant.CellGroup, {
                    style: {
                      maxHeight: '292px'
                    }
                  }, [_innerCell, self.select.items.map(function (item) {
                    var clickEvent = function clickEvent() {
                      var k = self.select.value.indexOf(item);
                      if (k > -1) {
                        self.select.value.splice(k, 1);
                      } else {
                        self.select.value.push(item);
                      }
                    };
                    return h(vant.Cell, {
                      props: {
                        "title": item,
                        "clickable": true
                      },
                      on: {
                        "click": clickEvent
                      },
                      "class": {
                        fontActive: self.select.value.indexOf(item) > -1
                      }
                    }, [h(vant.Checkbox, {
                      props: {
                        "name": item,
                        "shape": "square"
                      },
                      slot: "right-icon"
                    })]);
                  })])]), h("div", {
                    style: {
                      padding: '10px 20px'
                    }
                  }, [h("div", {
                    style: {
                      height: '44px',
                      width: '100%',
                      lineHeight: '44px',
                      fontSize: '16px',
                      textAlign: 'center',
                      borderRadius: '22px'
                    },
                    "class": "ejs-ui-btn-custom",
                    on: {
                      "click": self.selectConfirm
                    }
                  }, [$t('确定')])])]);
                }
                innerDOM = h(vant.Popup, {
                  props: {
                    "value": self.select.show,
                    "position": "bottom",
                    "overlay-style": {
                      backgroundColor: 'rgba(0, 0, 0, 0.6)'
                    },
                    "close-on-click-overlay": self.select.cancelable,
                    "closeable": true
                  },
                  attrs: {
                    id: "ejs-ui-".concat(self.select.type)
                  },
                  "class": "ejs-ui-select",
                  on: {
                    "click-overlay": self.cancel,
                    "click": self.clickPop
                  }
                }, [h("h5", {
                  style: {
                    color: '#2e3033',
                    fontSize: '16px',
                    paddingLeft: '20px',
                    height: '44px',
                    lineHeight: '44px',
                    borderBottom: '0.5px solid #ebedf0',
                    marginBottom: '10px'
                  }
                }, [self.select.title]), _innerSelect]);
                if (self.select.type === 'selectSingleSP') {
                  // 九宫格
                  var items = [[]];
                  var i = 0;
                  self.select.items.forEach(function (item) {
                    if (items[i].length >= self.select.columns) {
                      i += 1;
                      items.push([]);
                    }
                    items[i].push(item);
                  });
                  _innerSelect = h(vant.RadioGroup, {
                    props: {
                      "value": self.select.value
                    }
                  }, [h(vant.CellGroup, [items.map(function (item) {
                    return h(vant.Row, [item.map(function (ele) {
                      var clickEvent = function clickEvent() {
                        self.select.value = ele;
                      };
                      return h(vant.Col, {
                        props: {
                          "span": 24 / self.select.columns
                        }
                      }, [h(vant.Cell, {
                        props: {
                          "title": ele,
                          "clickable": true
                        },
                        on: {
                          "click": clickEvent
                        }
                      }, [h(vant.Radio, {
                        attrs: {
                          name: ele
                        },
                        props: {
                          "checked-color": "rgb(36, 99, 224)"
                        },
                        slot: "right-icon"
                      })])]);
                    })]);
                  })])]);
                  innerDOM = h(vant.Dialog.Component, {
                    attrs: {
                      id: "ejs-ui-".concat(self.select.type)
                    },
                    props: {
                      "value": self.select.show,
                      "title": self.select.title,
                      "close-on-click-overlay": self.select.cancelable,
                      "show-cancel-button": true,
                      "overlay-style": {
                        backgroundColor: 'rgba(0, 0, 0, 0.6)'
                      },
                      "confirm-button-text": $t('确定'),
                      "cancel-button-text": $t('取消')
                    },
                    on: {
                      "confirm": self.selectConfirm,
                      "cancel": self.cancel,
                      "click-overlay": self.dialogCancel
                    }
                  }, [_innerSelect]);
                }
                break;
            }
            return h("div", {
              attrs: {
                id: "ejs-ui"
              }
            }, [innerDOM]);
          },
          watch: {
            'pickDateTime.innerValue': function pickDateTimeInnerValue(val, oldVal) {
              this.pickDateTime.columns = getColumns(this.pickDateTime.minDate, this.pickDateTime.maxDate, val, this.pickDateTime.showSecond);
            }
          },
          methods: {
            // 校验时间值
            correctValue: function correctValue(value) {
              // date type
              value = new Date(Math.max(value.getTime(), this.pickDateTime.minDate.getTime()));
              value = new Date(Math.min(value.getTime(), this.pickDateTime.maxDate.getTime()));
              return value;
            },
            conConfirm: function conConfirm() {
              var self = this;
              var result = {
                which: 1
              };
              clearTimeout(this.timer);
              this.confirm.show = false;
              this.timer = setTimeout(function () {
                self.success(result);
              }, 300);
            },
            conCancel: function conCancel() {
              var self = this;
              var result = {
                which: 0
              };
              clearTimeout(this.timer);
              this.confirm.show = false;
              this.timer = setTimeout(function () {
                self.success(result);
              }, 300);
            },
            dialogCancel: function dialogCancel() {
              var type = this.type;
              if (this[type].cancelable) {
                this[type].show = false;
              }
            },
            alertConfirm: function alertConfirm() {
              this.alert.show = false;
              this.success({});
            },
            promptConfirm: function promptConfirm() {
              var result = {
                which: 1,
                content: this.prompt.value
              };
              this.prompt.show = false;
              this.success(result);
            },
            promptCancel: function promptCancel() {
              var result = {
                which: 0,
                content: this.prompt.value
              };
              this.prompt.show = false;
              this.success(result);
            },
            promptInput: function promptInput(value) {
              this.prompt.value = value;
            },
            actionSheetSelect: function actionSheetSelect(item) {
              var result = {};
              if (item) {
                var index = this.actionSheet.actions.indexOf(item);
                result = {
                  which: index,
                  content: item.name
                };
              } else {
                result = {
                  which: -1,
                  content: ''
                };
              }
              this.actionSheet.show = false;
              this.success(result);
            },
            pickDateFullTimeConfirm: function pickDateFullTimeConfirm(value) {
              var nyr = value[0].substring(0, 10);
              var week = value[0].substring(11, 13);
              var result = {
                datetime: "".concat(nyr, " ").concat(value[1], ":").concat(value[2], ":").concat(value[3]),
                week: week
              };
              this.pickDateTime.show = false;
              this.success(result);
            },
            pickDateConfirm: function pickDateConfirm(value) {
              var result = {};
              var date = new Date(value);
              var year = date.getFullYear();
              var month = paddingWith0(date.getMonth() + 1);
              var day = paddingWith0(date.getDate());
              if (this.pickDate.type === 'date') {
                result = {
                  date: "".concat(year, "-").concat(month, "-").concat(day)
                };
              } else {
                result = {
                  month: "".concat(year, "-").concat(month)
                };
              }
              this.pickDate.show = false;
              this.success(result);
            },
            pickDateTimeConfirm: function pickDateTimeConfirm(value) {
              var nyr = value[0].substring(0, 10);
              var week = value[0].substring(11, 13);
              var result = {
                datetime: "".concat(nyr, " ").concat(value[1], ":").concat(value[2]),
                week: week
              };
              this.pickDateTime.show = false;
              this.success(result);
            },
            pickDateTimeChange: function pickDateTimeChange(v) {
              var val = v.getValues();
              val = "".concat(val[0].substring(0, 10), " ").concat(val[1], ":").concat(val[2]);
              this.pickDateTime.innerValue = this.correctValue(new Date(val.replace(/-/g, '/')));
            },
            pickDateFullTimeChange: function pickDateFullTimeChange(v) {
              var val = v.getValues();
              val = "".concat(val[0].substring(0, 10), " ").concat(val[1], ":").concat(val[2], ":").concat(val[3]);
              this.pickDateTime.innerValue = this.correctValue(new Date(val.replace(/-/g, '/')));
            },
            pickTimeConfirm: function pickTimeConfirm(value) {
              var result = {
                time: value
              };
              this.pickTime.show = false;
              this.success(result);
            },
            popPickerConfirm: function popPickerConfirm(item, values) {
              var res = item;
              if (Array.isArray(item)) {
                res = this.QueryPickerData(this.popPicker.columns, values);
              } else {
                res = [item];
              }
              var result = {
                items: res
              };
              this.popPicker.show = false;
              this.success(result);
            },
            QueryPickerData: function QueryPickerData(data, values) {
              var self = this;
              var arr = [{
                text: data[values[0]].text,
                value: data[values[0]].value
              }];
              if (values.length > 1) {
                return arr.concat(self.QueryPickerData(data[values[0]].children, values.slice(1, values.length)));
              } else {
                return arr;
              }
            },
            selectConfirm: function selectConfirm() {
              var result = {};
              var self = this;
              if (Array.isArray(self.select.value)) {
                var choiceState = self.select.items.map(function (item) {
                  if (self.select.value.indexOf(item) > -1) {
                    return '1';
                  }
                  return '0';
                });
                result = {
                  choiceState: choiceState,
                  choiceContent: this.select.value
                };
              } else {
                var index = self.select.items.indexOf(this.select.value);
                result = {
                  which: index,
                  content: this.select.value
                };
              }
              this.select.show = false;
              this.success(result);
            },
            clickPop: function clickPop(e) {
              if (e.target.classList.contains('van-popup__close-icon')) {
                this.select.show = false;
              }
            },
            cancel: function cancel() {
              var type = this.type;
              this[type].show = false;
            },
            success: function success(result) {
              this[this.type].success && this[this.type].success(result);
              this[this.type].resolve && this[this.type].resolve(result);
            }
          },
          mounted: function mounted() {
            var _this2 = this;
            var _this = this;
            var type = this.type;
            setTimeout(function () {
              _this[type].show = true;
            }, 300);
            // 路由变化时，关闭弹窗
            window.addEventListener('popstate', function () {
              Object.keys(vueData).forEach(function (k) {
                if (k !== 'type') {
                  _this2[k].show = false;
                }
              });
            }, false);
          }
        }).$mount();
        document.body.appendChild(vnode.$el);
        return vnode;
      };
      if (!document.querySelector('#ejs-ui')) {
        Vue.prototype.$ejsUI = createPickDate();
      } else {
        var type = vueData.type;
        setTimeout(function () {
          // 优化组件间切换过渡
          Vue.prototype.$ejsUI[type].show = true;
        }, 10);
      }
      if (method === 'showWaiting') {
        options.success && options.success();
        resolve && resolve();
      }
    }

    function noop(info) {
      return info;
    }
    function getI18nTxt(txt) {
      var $t = noop;
      $t = window.di18n && window.di18n.$t.bind(window.di18n) || noop;
      if (!txt || $t(txt) === 'undefined') {
        return txt;
      }
      return $t(txt);
    }

    var $t = getI18nTxt;
    function uiMixin(hybrid) {
      var hybridJs = hybrid;
      var innerUtil = hybridJs.innerUtil;
      hybridJs.extendModule('ui', [{
        namespace: 'toast',
        os: ['xm'],
        defaultParams: {
          message: ''
        },
        runCode: function runCode() {
          for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
            rest[_key] = arguments[_key];
          }
          // 兼容字符串形式
          var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'message');
          args[0].message = $t(args[0].message);
          args[0] = innerUtil.extend(args[0], {
            message: args[0].message || String(args[0].message)
          });
          callXmByArgs(args, xm.showToast, false);
        }
      }, {
        namespace: 'showDebugDialog',
        os: ['xm'],
        defaultParams: {
          debugInfo: ''
        },
        runCode: function runCode() {
          for (var _len2 = arguments.length, rest = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            rest[_key2] = arguments[_key2];
          }
          // 兼容字符串形式
          var args = innerUtil.compatibleStringParamsToObject(rest, 'debugInfo');
          args[0].debugInfo = $t(args[0].debugInfo);
          args[0] = innerUtil.extend(args[0], {
            title: '',
            message: args[0].debugInfo
          });
          args[0].dataFilter = function (result) {
            return {
              which: result === 'ok' ? 1 : 0
            };
          };
          callXmByArgs(args, xm.showConfirm, true);
        }
      }, {
        namespace: 'alert',
        os: ['xm'],
        defaultParams: {
          title: '',
          message: ''
        },
        runCode: function runCode() {
          for (var _len3 = arguments.length, rest = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            rest[_key3] = arguments[_key3];
          }
          // 兼容字符串形式
          var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'message', 'title', 'buttonName');
          var options = args[0];
          options.buttonName = $t(options.buttonName || '确定');
          options.message = $t(options.message);
          options.title = $t(options.title);
          args[0] = innerUtil.extend(args[0], {
            title: args[0].title,
            message: args[0].message
          });
          args[0].dataFilter = function (result) {
            return {
              which: result === 'ok' ? 1 : 0
            };
          };
          callXmByArgs(args, xm.showConfirm, true);
        }
      }, {
        namespace: 'confirm',
        os: ['xm'],
        defaultParams: {
          title: '',
          message: ''
        },
        runCode: function runCode() {
          for (var _len4 = arguments.length, rest = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            rest[_key4] = arguments[_key4];
          }
          var args = rest;
          args[0].title = $t(args[0].title);
          args[0].message = $t(args[0].message);
          args[0] = innerUtil.extend(args[0], {
            title: args[0].title,
            message: args[0].message
          });
          args[0].dataFilter = function (result) {
            return {
              which: result === 'ok' ? 1 : 0
            };
          };
          callXmByArgs(args, xm.showConfirm, true);
        }
      }, {
        namespace: 'prompt',
        os: ['xm'],
        defaultParams: {
          title: '',
          hint: '',
          text: ''
        },
        runCode: function runCode() {
          for (var _len5 = arguments.length, rest = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            rest[_key5] = arguments[_key5];
          }
          var args = rest;
          args[0].title = $t(args[0].title);
          args[0].hint = $t(args[0].hint);
          args[0].text = $t(args[0].text);
          args[0] = innerUtil.extend(args[0], {
            title: args[0].title,
            message: $t('请输入'),
            placeholder: args[0].hint,
            defaultValue: args[0].text
          });
          args[0].dataFilter = function (result) {
            return {
              which: 1,
              content: result
            };
          };
          callXmByArgs(args, xm.showPrompt, true);
        }
      }, {
        namespace: 'showWaiting',
        os: ['xm'],
        defaultParams: {
          message: '加载中...',
          h5UI: false
        },
        runCode: function runCode() {
          for (var _len6 = arguments.length, rest = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
            rest[_key6] = arguments[_key6];
          }
          // 兼容字符串形式
          var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'message');
          var options = args[0];
          var h5UI = options.h5UI;
          options.message = $t(options.message);
          if (h5UI !== false) {
            uiVue(args, 'showWaiting', hybridJs.os);
          } else {
            args[0] = innerUtil.extend(args[0], {});
            callXmByArgs(args, xm.showLoading, false);
          }
        }
      }, {
        namespace: 'closeWaiting',
        os: ['xm'],
        defaultParams: {},
        runCode: function runCode() {
          for (var _len7 = arguments.length, rest = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
            rest[_key7] = arguments[_key7];
          }
          var args = rest;
          if (window.Vue && window.Vue.prototype.$ejsUI && window.Vue.prototype.$ejsUI.showWaiting.show) {
            window.Vue.prototype.$ejsUI.showWaiting.show = false;
          }
          callXmByArgs(args, xm.hideLoading, false);
        }
      }, {
        namespace: 'select',
        os: ['xm'],
        defaultParams: {
          title: '',
          items: []
        },
        runCode: function runCode() {
          for (var _len8 = arguments.length, rest = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
            rest[_key8] = arguments[_key8];
          }
          var args = rest;
          args[0].title = $t(args[0].title);
          args[0].items = args[0].items.map(function (item) {
            return $t(item);
          });
          var itemList = args[0].items.map(function (value, index) {
            return {
              text: value,
              value: index
            };
          });
          args[0] = innerUtil.extend(args[0], {
            title: args[0].title,
            list: itemList,
            defaultValue: ''
          });
          args[0].dataFilter = function (result) {
            return {
              which: Number(result.value),
              content: result.text
            };
          };
          callXmByArgs(args, xm.picker, true);
        }
      }, {
        namespace: 'actionSheet',
        os: ['xm'],
        defaultParams: {
          items: []
        },
        runCode: function runCode() {
          for (var _len9 = arguments.length, rest = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
            rest[_key9] = arguments[_key9];
          }
          var args = rest;
          args[0].items = args[0].items.map(function (ele) {
            return $t(ele);
          });
          var itemList = args[0].items.map(function (value, index) {
            return {
              text: value,
              value: index
            };
          });
          args[0] = innerUtil.extend(args[0], {
            title: $t('请选择'),
            itemList: itemList,
            defaultValue: ''
          });
          args[0].dataFilter = function (result) {
            return {
              which: Number(result.value),
              content: result.text
            };
          };
          callXmByArgs(args, xm.showActionSheet, true);
        }
      }, {
        namespace: 'pickDate',
        os: ['xm'],
        defaultParams: {
          datetime: '',
          format: 'yyyy-MM-dd'
        },
        runCode: function runCode() {
          for (var _len0 = arguments.length, rest = new Array(_len0), _key0 = 0; _key0 < _len0; _key0++) {
            rest[_key0] = arguments[_key0];
          }
          var args = rest;
          // 兼容ios
          var datetime = args[0].datetime.replace(/-/g, '/');
          args[0] = innerUtil.extend(args[0], {
            format: args[0].format,
            defaultValue: new Date(datetime).getTime()
          });
          args[0].dataFilter = function (result) {
            return {
              date: result
            };
          };
          callXmByArgs(args, xm.selectDate, true);
        }
      }]);
    }

    /* eslint-disable camelcase */
    function streamMixin(hybrid) {
      var hybridJs = hybrid;
      hybridJs.extendModule('stream', [{
        namespace: 'fetch',
        os: ['xm'],
        defaultParams: {
          url: '',
          method: 'POST',
          body: '',
          // 有一些默认的头部信息
          headers: {
            // application/json
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        },
        runCode: function runCode() {
          for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
            rest[_key] = arguments[_key];
          }
          var args = rest;
          var resolve = args[1];
          var reject = args[2];
          xm.request({
            url: args[0].url,
            data: args[0].body,
            headers: args[0].headers,
            method: args[0].method,
            withCredentials: false
          }).then(function (response) {
            var res = response;
            if (args[0].type === 'json') {
              res = JSON.parse(response) || response;
            }
            var newResult = {
              data: res
            };
            args[0].success && args[0].success(newResult);
            resolve && resolve(newResult);
            // response.json().then((result) => {
            //     const newResult = {
            //         data: result
            //     };
            //     args[0].success && args[0].success(newResult);
            //     resolve && resolve(newResult);
            // });
          }).catch(function (error) {
            args[0].error && args[0].error(error);
            reject && reject(error);
          });
        }
      }, {
        // 标准的文件上传，可以上传多个文件
        // 自己传headers和额外参数
        namespace: 'uploadMultipartFile',
        os: ['xm'],
        defaultParams: {
          url: '',
          // 有一些默认的头部信息
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          file: {
            name: '',
            path: '',
            mediaType: '',
            fileName: ''
          },
          // 额外的表单数据
          dataForm: {}
        },
        runCode: function runCode() {
          for (var _len2 = arguments.length, rest = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            rest[_key2] = arguments[_key2];
          }
          var args = rest;
          var options = args[0];
          args[0].params = {
            url: options.url,
            name: options.file.name,
            filePath: options.file.path,
            data: options.dataForm,
            headers: options.headers
          };
          callXmByArgs(args, xm.uploadFile);
        }
      }]);
    }

    function audioMixin(hybrid) {
      var hybridJs = hybrid;
      var innerUtil = hybridJs.innerUtil;
      hybridJs.extendModule('audio', [{
        namespace: 'startRecord',
        os: ['xm'],
        defaultParams: {
          maxDuration: 120
        },
        runCode: function runCode() {
          for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
            rest[_key] = arguments[_key];
          }
          // 兼容字符串形式
          var args = rest;
          args[0] = innerUtil.extend(args[0], {
            duration: args[0].maxDuration * 1000
          });
          callXmByArgs(args, xm.startRecord, true);
        }
      }, {
        namespace: 'stopRecord',
        os: ['xm'],
        defaultParams: {},
        runCode: function runCode() {
          for (var _len2 = arguments.length, rest = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            rest[_key2] = arguments[_key2];
          }
          // 兼容字符串形式
          var args = rest;
          args[0] = innerUtil.extend(args[0], {});
          args[0].dataFilter = function (result) {
            return {
              duration: result.duration,
              path: result.filePath
            };
          };
          callXmByArgs(args, xm.stopRecord, true);
        }
      }, {
        namespace: 'cancelRecord',
        os: ['xm'],
        defaultParams: {},
        runCode: function runCode() {
          for (var _len3 = arguments.length, rest = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            rest[_key3] = arguments[_key3];
          }
          // 兼容字符串形式
          var args = rest;
          args[0] = innerUtil.extend(args[0], {});
          callXmByArgs(args, xm.cancelRecord, true);
        }
      }, {
        namespace: 'startPlay',
        os: ['xm'],
        defaultParams: {
          path: ''
        },
        runCode: function runCode() {
          for (var _len4 = arguments.length, rest = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            rest[_key4] = arguments[_key4];
          }
          // 兼容字符串形式
          var args = rest;
          args[0] = innerUtil.extend(args[0], {
            url: args[0].path
          });
          callXmByArgs(args, xm.playAudio, true);
        }
      }, {
        namespace: 'stopPlay',
        os: ['xm'],
        defaultParams: {},
        runCode: function runCode() {
          for (var _len5 = arguments.length, rest = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            rest[_key5] = arguments[_key5];
          }
          // 兼容字符串形式
          var args = rest;
          args[0] = innerUtil.extend(args[0], {});
          callXmByArgs(args, xm.stopAudio, false);
        }
      }]);
    }

    function eventMixin(hybrid) {
      var hybridJs = hybrid;
      hybridJs.extendModule('event', [{
        namespace: 'on',
        os: ['xm'],
        defaultParams: {
          key: ''
        },
        runCode: function runCode() {
          for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
            rest[_key] = arguments[_key];
          }
          var args = rest;
          var options = args[0];
          xm.on(options.key, function (data) {
            options.success && options.success(data);
          });
        }
      }, {
        namespace: 'once',
        os: ['xm'],
        defaultParams: {
          key: ''
        },
        runCode: function runCode() {
          for (var _len2 = arguments.length, rest = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            rest[_key2] = arguments[_key2];
          }
          var args = rest;
          var options = args[0];
          xm.once(options.key, function (data) {
            options.success && options.success(data);
          });
        }
      }, {
        namespace: 'emit',
        os: ['xm'],
        defaultParams: {
          key: ''
        },
        runCode: function runCode() {
          for (var _len3 = arguments.length, rest = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            rest[_key3] = arguments[_key3];
          }
          var args = rest;
          var options = args[0];
          xm.emit(options.key, options);
          options.success && options.success();
        }
      }, {
        namespace: 'off',
        os: ['xm'],
        defaultParams: {
          key: ''
        },
        runCode: function runCode() {
          for (var _len4 = arguments.length, rest = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            rest[_key4] = arguments[_key4];
          }
          var args = rest;
          var options = args[0];
          xm.off(options.key);
          options.success && options.success();
        }
      }, {
        namespace: 'app',
        os: ['xm'],
        defaultParams: {
          onLaunch: '',
          onShow: '',
          onHide: '',
          onClose: ''
        },
        runCode: function runCode() {
          for (var _len5 = arguments.length, rest = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            rest[_key5] = arguments[_key5];
          }
          var args = rest;
          var options = args[0];
          xm.on('onLaunch', function () {
            options.onLaunch && options.onLaunch();
          });
          xm.on('onPageShow', function () {
            options.onShow && options.onShow();
          });
          xm.on('onPageHide', function () {
            options.onHide && options.onHide();
          });
          xm.on('onAppClose', function () {
            options.onClose && options.onClose();
          });
        }
      }]);
    }

    var hybridJs = window.ejs;
    authMixin(hybridJs);
    deviceMixin(hybridJs);
    eventMixin(hybridJs);
    ioMixin(hybridJs);
    navigatorMixin(hybridJs);
    pageMixin(hybridJs);
    miniH5Mixin(hybridJs);
    runtimeMixin(hybridJs);
    storageMixin(hybridJs);
    utilMixin(hybridJs);
    uiMixin(hybridJs);
    streamMixin(hybridJs);
    audioMixin(hybridJs);

}));
