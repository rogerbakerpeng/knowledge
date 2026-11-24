/*!
 * ejsv3 v3.5.0
 * (c) 2017-2020 
 * Released under the BSD-3-Clause License.
 * 
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

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
 * @param {Boolean} type 是否支持promise
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

function authMixin(hybrid) {
    var hybridJs = hybrid;

    hybridJs.extendModule('auth', [{
        namespace: 'getToken',
        os: ['xm'],
        runCode: function runCode() {
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
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
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                rest[_key2] = arguments[_key2];
            }

            var args = rest;

            args[0].dataFilter = function (result) {
                return {
                    authCode: result
                };
            };
            callXmByArgs(args, xm.getAuthCode);
        }
    }, {
        namespace: 'refreshToken',
        os: ['xm'],
        runCode: function runCode() {
            for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
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
    }]);
}

function deviceMixin(hybrid) {
    var hybridJs = hybrid;

    hybridJs.extendModule('device', [{
        namespace: 'setOrientation',
        os: ['xm'],
        defaultParams: {
            orientation: 1 // 1表示竖屏，0表示横屏
        },
        runCode: function runCode() {
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
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
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                rest[_key2] = arguments[_key2];
            }

            var args = rest;
            var options = args[0];
            var isOnline = xm.isOnline();

            options.success && options.success({
                netWorkType: isOnline ? 1 : -1
            });
        }
    }, {
        namespace: 'callPhone',
        os: ['xm'],
        defaultParams: {
            phoneNum: ''
        },
        runCode: function runCode() {
            for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                rest[_key3] = arguments[_key3];
            }

            var args = rest;
            var options = args[0];

            args[0].params = {
                dialNumber: options.phoneNum
            };
            callXmByArgs(rest, xm.makePhoneCall, false);
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
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
                rest[_key] = arguments[_key];
            }

            var args = rest;
            var options = args[0];

            args[0] = innerUtil.extend(args[0], {
                url: args[0].url,
                filePath: '/ejs/' + options.fileName
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
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
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
            for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
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
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
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
        var data = arguments[1];

        var extrasDataStr = '';

        if (data) {
            Object.keys(data).forEach(function (item) {
                if (extrasDataStr.indexOf('?') === -1) {
                    extrasDataStr += '?';
                } else {
                    extrasDataStr += '&';
                }
                extrasDataStr += item + '=' + data[item];
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
            data: {}
        },
        runCode: function runCode() {
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
                rest[_key] = arguments[_key];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'pageUrl', 'data');
            var options = args[0];

            if (/^(http|https|ftp|epth|h5|\/\/)/g.test(options.pageUrl)) {
                // 将额外数据拼接到url中
                options.pageUrl = innerUtil.getFullUrlByParams(options.pageUrl, options.data);
                args[0] = innerUtil.extend(args[0], {
                    url: options.pageUrl,
                    hideNavibar: options.pageStyle !== 1
                });
                // 如果是全路径
                callXmByArgs(args, xm.openExternal);
            } else {
                // xm.on('resultData', (result) => {
                //     options.success && options.success({
                //         resultData: result,
                //     });
                // });
                if (options.data) {
                    // eslint-disable-next-line no-restricted-syntax
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
                    }
                };

                if (options.pageStyle === -1) {
                    opt.naviStyle = 2;
                } else {
                    opt.naviStyle = 0;
                }

                xm.navigateTo(opt);
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
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                rest[_key2] = arguments[_key2];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'resultData');
            var options = args[0];
            options.resultData && xm.emitParent('resultData', typeof options.resultData === 'string' ? JSON.stringify(options.resultData) : options.resultData);
            xm.navigateBack({
                delta: args[0].popPageNumber
            });
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
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
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
            // 要打开的小程序 appId
            delta: 1
        },
        runCode: function runCode() {
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                rest[_key2] = arguments[_key2];
            }

            var args = rest;

            xm.navigateBack({
                delta: args[0].delta
            });
        }
    }, {
        namespace: 'close',
        os: ['xm'],
        defaultParams: {
            params: 'close'
        },
        runCode: function runCode() {
            for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                rest[_key3] = arguments[_key3];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'params');

            callXmByArgs(args, xm.native, true);
        }
    }]);
}

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
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
                rest[_key] = arguments[_key];
            }

            var args = rest;
            var options = args[0];

            args[0] = innerUtil.extend(args[0], {
                sdk: !options.coordinate
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
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                rest[_key2] = arguments[_key2];
            }

            var args = rest;

            args[0].dataFilter = function (result) {
                return {
                    version: result.version
                };
            };
            callXmByArgs(args, xm.getAppInfo);
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
    }]);
}

function utilMixin(hybrid) {
    var hybridJs = hybrid;
    var innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('util', [{
        namespace: 'scan',
        os: ['xm'],
        runCode: function runCode() {
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
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
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
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
            photoCount: 9
        },
        runCode: function runCode() {
            for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                rest[_key3] = arguments[_key3];
            }

            var args = rest;

            args[0] = innerUtil.extend(args[0], {
                sourceType: 2,
                count: args[0].photoCount
            });
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
            for (var _len4 = arguments.length, rest = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                rest[_key4] = arguments[_key4];
            }

            var args = rest;

            args[0] = innerUtil.extend(args[0], {
                sourceType: 1
            });
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
        namespace: 'prevImage',
        os: ['xm'],
        defaultParams: {
            index: '',
            selectedPhotos: {}
        },
        runCode: function runCode() {
            for (var _len5 = arguments.length, rest = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
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
            for (var _len6 = arguments.length, rest = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
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
    }]);
}

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
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
                rest[_key] = arguments[_key];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'message');

            args[0] = innerUtil.extend(args[0], {
                message: args[0].message
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
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                rest[_key2] = arguments[_key2];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject(rest, 'debugInfo');

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
            for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                rest[_key3] = arguments[_key3];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'message', 'title', 'buttonName');

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
            for (var _len4 = arguments.length, rest = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                rest[_key4] = arguments[_key4];
            }

            var args = rest;

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
            for (var _len5 = arguments.length, rest = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                rest[_key5] = arguments[_key5];
            }

            var args = rest;

            args[0] = innerUtil.extend(args[0], {
                title: args[0].title,
                message: '请输入',
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
            message: '正在加载...'
        },
        runCode: function runCode() {
            for (var _len6 = arguments.length, rest = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                rest[_key6] = arguments[_key6];
            }

            var args = rest;

            args[0] = innerUtil.extend(args[0], {});

            callXmByArgs(args, xm.showLoading, false);
        }
    }, {
        namespace: 'closeWaiting',
        os: ['xm'],
        defaultParams: {},
        runCode: function runCode() {
            for (var _len7 = arguments.length, rest = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
                rest[_key7] = arguments[_key7];
            }

            var args = rest;

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
            for (var _len8 = arguments.length, rest = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
                rest[_key8] = arguments[_key8];
            }

            var args = rest;
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
            for (var _len9 = arguments.length, rest = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
                rest[_key9] = arguments[_key9];
            }

            var args = rest;
            var itemList = args[0].items.map(function (value, index) {
                return {
                    text: value,
                    value: index
                };
            });

            args[0] = innerUtil.extend(args[0], {
                title: '请选择',
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
            for (var _len10 = arguments.length, rest = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
                rest[_key10] = arguments[_key10];
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

function streamMixin(hybrid) {
    var hybridJs = hybrid;
    var innerUtil = hybridJs.innerUtil;

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
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
                rest[_key] = arguments[_key];
            }

            var args = rest;
            var resolve = args[1];
            var reject = args[2];

            args[0] = innerUtil.extend(args[0], {
                body: args[0].body,
                headers: args[0].headers,
                method: args[0].method,
                credentials: false
            });

            var opt = args[0].params ? args[0].params : args[0];

            xm.fetch(args[0].url, opt).then(function (response) {
                response.json().then(function (result) {
                    var newResult = {
                        data: result
                    };
                    args[0].success && args[0].success(newResult);
                    resolve && resolve(newResult);
                });
            }).catch(function (error) {
                args[0].error && args[0].error(error);
                reject && reject(error);
            });
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
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
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
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
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
            for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
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
            for (var _len4 = arguments.length, rest = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
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
            for (var _len5 = arguments.length, rest = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                rest[_key5] = arguments[_key5];
            }

            // 兼容字符串形式
            var args = rest;

            args[0] = innerUtil.extend(args[0], {});

            callXmByArgs(args, xm.stopAudio, true);
        }
    }]);
}

var hybridJs = window.ejs;

authMixin(hybridJs);
deviceMixin(hybridJs);
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

})));
