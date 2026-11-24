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

// 获取sso地址
function getSsoUrl() {
    return new Promise(function (resolve, reject) {
        console.log(Util.getProjectBasePath('js'));
        Util.ajax({
            url: Util.getProjectBasePath() + 'rest/common/getSSOUrl',
            contentType: 'application/x-www-form-urlencoded',
            type: 'GET',
            isAutoProxy: false,
            success: function success(result) {
                console.log(result);
                if (result.status.code === '1' && result.custom.ssourl && result.custom.ssourl !== '') {
                    var res = {
                        ssoUrl: result.custom.ssourl || '',
                        agentId: result.custom.dingtalk_agentid || ''
                    };
                    resolve(res);
                } else {
                    reject('ssourl地址没获取到');
                }
            },
            error: function error(err) {
                console.log(err);
                reject(err);
            }
        });
    });
}
var isF9DdFirst = 0;
// 用于钉钉鉴权
function ddF9Config(jsApiList) {
    return new Promise(function (resolve, reject) {
        // 一个页面只需要config一次
        if (ejs.os.dd && isF9DdFirst === 0) {
            getSsoUrl().then(function (res) {
                Util.ajax({
                    url: res.ssoUrl + '/rest/common/getJsTicket',
                    data: {
                        tickettype: 'dingtalk',
                        pageurl: decodeURIComponent(window.location.href)
                    },
                    contentType: 'application/x-www-form-urlencoded',
                    isAutoProxy: false,
                    success: function success(result) {
                        var nonceStr = result.custom.nonceStr;
                        var signature = result.custom.signature;
                        var corpId = result.custom.corpId;
                        var timestamp = result.custom.timestamp;
                        var agentId = result.custom.dingtalk_agentid || '';

                        dd.config({
                            agentId: agentId || res.agentId || Config && Config.agentId || '', // 必填，微应用ID
                            corpId: corpId, // 必填，企业ID
                            timeStamp: timestamp, // 必填，生成签名的时间戳
                            nonceStr: nonceStr, // 必填，生成签名的随机串
                            signature: signature, // 必填，签名
                            // 选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
                            type: 0,
                            jsApiList: jsApiList || ['runtime.info', 'biz.contact.choose', 'device.notification.confirm', 'device.notification.alert', 'device.notification.prompt', 'biz.ding.post', 'biz.util.openLink', 'biz.contact.complexPicker', 'biz.cspace.saveFile', 'biz.cspace.preview', 'biz.cspace.chooseSpaceDir', 'biz.util.uploadAttachment'] // 必填，需要使用的jsapi列表，注意：不要带dd。
                        });
                        dd.error(function (error) {
                            console.log('dd error: ' + JSON.stringify(error));
                            reject(error);
                        });
                        dd.ready(function () {
                            isF9DdFirst = 1;
                            localStorage.setItem('corpId', corpId);
                            document.addEventListener('resume', function () {
                                // 读取最后打开的页面id
                                var funcName = JSON.parse(localStorage.getItem('f9PageGuid')) || [];
                                // console.log(funcName);

                                funcName = funcName.slice(-1)[0];
                                // 触发打开页面时id生成的函数
                                if (typeof window[funcName] === 'function' && localStorage.getItem(funcName)) {
                                    var resData = localStorage.getItem(funcName) === '{}' ? '' : localStorage.getItem(funcName);
                                    // eslint-disable-next-line no-eval
                                    eval(funcName + '(' + resData + ')');
                                    localStorage.removeItem(funcName);
                                    // 去除该id
                                    var f9PageGuid = JSON.parse(localStorage.getItem('f9PageGuid'));
                                    var deleteArrItems = function deleteArrItems(arr, item) {
                                        return arr.filter(function (v) {
                                            return v.indexOf(item) === -1;
                                        });
                                    };
                                    f9PageGuid = deleteArrItems(f9PageGuid, funcName);
                                    // f9PageGuid.splice(f9PageGuid.findIndex(e => e === funcName));
                                    // console.log(f9PageGuid);
                                    localStorage.setItem('f9PageGuid', JSON.stringify(f9PageGuid));
                                }
                            });
                            resolve();
                        });
                    },
                    error: function error(_error) {
                        console.log(_error);
                        isF9DdFirst = 1;
                        reject(_error);
                    }
                });
            }).catch(function (error) {
                reject(error);
            });
        } else {
            resolve();
        }
    });
}

function callDDByArgs(args, api) {
    var options = args[0];
    var resolve = args[1];
    var reject = args[2];

    options.onSuccess = function (result) {
        var newResult = result;

        if (options.dataFilter) {
            newResult = options.dataFilter(result);
        }

        options.success && options.success(newResult);
        resolve && resolve(newResult);
    };
    options.onFail = function (error) {
        options.error && options.error(error);
        reject && reject(error);
    };

    ddF9Config().then(function () {
        api(options);
    });
}

function uiMixin(hybrid) {
    var hybridJs = hybrid;
    var innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('ui', [{
        namespace: 'toast',
        os: ['dd'],
        defaultParams: {
            message: ''
        },
        runCode: function runCode() {
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
                rest[_key] = arguments[_key];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'message');

            // 有参数形式不一样，需要重新定义
            args[0] = innerUtil.extend(args[0], {
                // icon样式，有success和error，默认为空 0.0.2
                icon: '',
                // 提示信息
                text: args[0].message,
                // 显示持续时间，单位秒，默认按系统规范[android只有两种(<=2s >2s)]
                duration: 2,
                // 延迟显示，单位秒，默认0
                delay: 0
            });

            callDDByArgs(args, dd.device.notification.toast);
        }
    }, {
        namespace: 'alert',
        os: ['dd'],
        defaultParams: {
            title: '',
            message: '',
            buttonName: '确定'
        },
        runCode: function runCode() {
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                rest[_key2] = arguments[_key2];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'message', 'title', 'buttonName');

            // 参数形式一样，无需重新定义
            callDDByArgs(args, dd.device.notification.alert);
        }
    }, {
        namespace: 'confirm',
        os: ['dd'],
        defaultParams: {
            title: '',
            message: '',
            buttonLabels: ['取消', '确定']
        },
        runCode: function runCode() {
            for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                rest[_key3] = arguments[_key3];
            }

            var args = rest;

            args[0].dataFilter = function (result) {
                return {
                    which: result.buttonIndex
                };
            };

            // 参数形式一样，无需重新定义
            callDDByArgs(args, dd.device.notification.confirm);
        }
    }, {
        namespace: 'prompt',
        os: ['dd'],
        defaultParams: {
            title: '',
            text: '',
            hint: '',
            lines: 1,
            maxLength: 10000,
            buttonLabels: ['取消', '确定']
        },
        runCode: function runCode() {
            for (var _len4 = arguments.length, rest = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                rest[_key4] = arguments[_key4];
            }

            var args = rest;

            args[0] = innerUtil.extend(args[0], {
                message: args[0].text,
                defaultText: args[0].hint
            });

            args[0].dataFilter = function (result) {
                return {
                    which: result.buttonIndex,
                    content: result.value
                };
            };

            // 参数形式一样，无需重新定义
            callDDByArgs(args, dd.device.notification.prompt);
        }
    }, {
        namespace: 'showWaiting',
        os: ['dd'],
        defaultParams: {
            message: ''
        },
        runCode: function runCode() {
            for (var _len5 = arguments.length, rest = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                rest[_key5] = arguments[_key5];
            }

            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'message');

            args[0] = innerUtil.extend(args[0], {
                // 提示信息
                text: args[0].message,
                showIcon: true
            });

            callDDByArgs(args, dd.device.notification.showPreloader);
        }
    }, {
        namespace: 'closeWaiting',
        os: ['dd'],
        runCode: function runCode() {
            for (var _len6 = arguments.length, rest = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                rest[_key6] = arguments[_key6];
            }

            callDDByArgs(rest, dd.device.notification.hidePreloader);
        }
    }, {
        namespace: 'actionSheet',
        os: ['dd'],
        defaultParams: {
            title: '',
            items: []
        },
        runCode: function runCode() {
            for (var _len7 = arguments.length, rest = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
                rest[_key7] = arguments[_key7];
            }

            var args = rest;

            args[0] = innerUtil.extend(args[0], {
                cancelButton: '取消',
                otherButtons: args[0].items
            });

            var originalItems = args[0].items;

            args[0].dataFilter = function (result) {
                return {
                    which: result.buttonIndex,
                    content: originalItems[result.buttonIndex]
                };
            };

            callDDByArgs(args, dd.device.notification.actionSheet);
        }
    }, {
        namespace: 'pickDate',
        os: ['dd'],
        defaultParams: {
            // 部分设备上设置标题后遮挡控件可不设置标题
            title: '',
            // 默认为空为使用当前时间
            // 格式为 yyyy-MM-dd。
            datetime: ''
        },
        runCode: function runCode() {
            for (var _len8 = arguments.length, rest = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
                rest[_key8] = arguments[_key8];
            }

            var args = rest;

            args[0] = innerUtil.extend(args[0], {
                format: 'yyyy-MM-dd',
                value: args[0].datetime
            });

            args[0].dataFilter = function (result) {
                return {
                    date: result.value
                };
            };

            callDDByArgs(args, dd.biz.util.datepicker);
        }
    }, {
        namespace: 'pickTime',
        os: ['dd'],
        defaultParams: {
            // 部分设备上设置标题后遮挡控件可不设置标题
            title: '',
            // 默认为空为使用当前时间
            // 格式为 HH:mm
            datetime: ''
        },
        runCode: function runCode() {
            for (var _len9 = arguments.length, rest = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
                rest[_key9] = arguments[_key9];
            }

            var args = rest;

            args[0] = innerUtil.extend(args[0], {
                format: 'HH:mm',
                value: args[0].datetime
            });

            args[0].dataFilter = function (result) {
                return {
                    time: result.value
                };
            };

            callDDByArgs(args, dd.biz.util.timepicker);
        }
    }, {
        namespace: 'pickDateTime',
        os: ['dd'],
        defaultParams: {
            title1: '',
            title2: '',
            // 默认为空为使用当前时间
            // 格式为 yyyy-MM-dd HH:mm
            datetime: ''
        },
        runCode: function runCode() {
            for (var _len10 = arguments.length, rest = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
                rest[_key10] = arguments[_key10];
            }

            var args = rest;

            args[0] = innerUtil.extend(args[0], {
                format: 'yyyy-MM-dd HH:mm',
                value: args[0].datetime
            });

            args[0].dataFilter = function (result) {
                return {
                    datetime: result.value
                };
            };

            callDDByArgs(args, dd.biz.util.datetimepicker);
        }
    }]);
}

function deviceMixin(hybrid) {
    var hybridJs = hybrid;

    hybridJs.extendModule('device', [{
        namespace: 'getDeviceId',
        os: ['dd'],
        runCode: function runCode() {
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
                rest[_key] = arguments[_key];
            }

            var args = rest;

            args[0].dataFilter = function (result) {
                return {
                    deviceId: result.uuid
                };
            };

            callDDByArgs(args, dd.device.base.getUUID);
        }
    }, {
        namespace: 'vibrate',
        os: ['dd'],
        defaultParams: {
            duration: 500
        },
        runCode: function runCode() {
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                rest[_key2] = arguments[_key2];
            }

            callDDByArgs(rest, dd.device.notification.vibrate);
        }
    }, {
        namespace: 'getNetWorkInfo',
        os: ['dd'],
        runCode: function runCode() {
            for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                rest[_key3] = arguments[_key3];
            }

            var args = rest;
            var netTypeMap = {
                wifi: 1,
                '2g': 0,
                '3g': 0,
                '4g': 0,
                unknown: -1,
                none: -1
            };

            args[0].dataFilter = function (result) {
                return {
                    // 保留原来状态
                    result: result.result,
                    netWorkType: netTypeMap[result.result]
                };
            };

            callDDByArgs(args, dd.device.connection.getNetworkType);
        }
    }]);
}

function pageMixin(hybrid) {
    var hybridJs = hybrid;
    var innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('page', [{
        namespace: 'open',
        os: ['dd'],
        defaultParams: {
            pageUrl: '',
            pageStyle: 1,
            // 横竖屏,默认为1表示竖屏
            orientation: 1,
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

            // 将额外数据拼接到url中
            options.url = innerUtil.getFullUrlByParams(options.pageUrl, options.data);
            // 去除无用参数的干扰
            options.data = undefined;
            args[0] = options;

            if (args[0].success) {
                // 每次打开页面时，存储一个随机id
                var id = 'ejs' + Util.uuid({
                    len: 10,
                    type: 'noline'
                }).replace(/-/g, '_');
                if (typeof localStorage.getItem('f9PageGuid') !== 'string') {
                    localStorage.removeItem('f9PageGuid');
                }
                var f9PageGuid = JSON.parse(localStorage.getItem('f9PageGuid')) || [];
                // 根据id命名成功回调函数，关闭页面时调用
                f9PageGuid.push(id);
                localStorage.setItem('f9PageGuid', JSON.stringify(f9PageGuid));
                // console.log('args');
                // console.log(f9PageGuid);
                // 当前页面使用id命名成功回调函数
                window[id] = args[0].success;
                // 去除钉钉默认成功回调，与ejs保持一致
                args[0].success = null;
            }

            callDDByArgs(args, dd.biz.util.openLink);
        }
    }, {
        namespace: 'close',
        os: ['dd'],
        runCode: function runCode() {
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                rest[_key2] = arguments[_key2];
            }

            var args = rest;
            var options = args[0];
            // if (options.resultData) {
            var f9PageGuid = JSON.parse(localStorage.getItem('f9PageGuid')) || [];
            var funcName = f9PageGuid.slice(-1)[0];
            localStorage.setItem(funcName, JSON.stringify(options));
            // }
            callDDByArgs(rest, dd.biz.navigation.close);
        }
    }]);
}

function navigatorMixin(hybrid) {
    var hybridJs = hybrid;
    var innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('navigator', [{
        namespace: 'setTitle',
        os: ['dd'],
        defaultParams: {
            title: ''
        },
        runCode: function runCode() {
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
                rest[_key] = arguments[_key];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'title');

            callDDByArgs(args, dd.biz.navigation.setTitle);
        }
    }, {
        namespace: 'setRightBtn',
        os: ['dd'],
        defaultParams: {
            text: '',
            imageUrl: '',
            isShow: true
        },
        runCode: function runCode() {
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                rest[_key2] = arguments[_key2];
            }

            var args = rest;

            args[0] = innerUtil.extend(args[0], {
                control: true,
                show: Boolean(args[0].isShow)
            });

            callDDByArgs(args, dd.biz.navigation.setRight);
        }
    }, {
        namespace: 'setRightMenu',
        os: ['dd'],
        defaultParams: {
            text: '',
            imageUrl: '',
            // 过滤色默认为空
            iconFilterColor: '',
            // 点击后出现的菜单列表，这个API会覆盖rightBtn
            titleItems: [],
            iconItems: [],
            // 钉钉中的参数
            backgroundColor: '#ADD8E6',
            textColor: '#ADD8E611'
        },
        runCode: function runCode() {
            for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                rest[_key3] = arguments[_key3];
            }

            // 兼容字符串形式
            var args = rest;
            var titleItems = args[0].titleItems;
            var iconItems = args[0].iconItems;
            var items = [];

            for (var i = 0, len = titleItems.length; i < len; i += 1) {
                items.push({
                    id: i + 1,
                    text: titleItems[i],
                    iconId: iconItems[i]
                });
            }

            args[0] = innerUtil.extend(args[0], {
                items: items
            });

            callDDByArgs(args, dd.biz.navigation.setMenu);
        }
    }, {
        namespace: 'hookBackBtn',
        os: ['dd'],
        defaultParams: {
            control: true,
            text: ''
        },
        runCode: function runCode() {
            for (var _len4 = arguments.length, rest = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                rest[_key4] = arguments[_key4];
            }

            // 只拦截ios
            var args = rest;

            args[0] = innerUtil.extend(args[0], {
                control: args[0].control,
                text: args[0].text
            });
            callDDByArgs(args, dd.biz.navigation.setLeft);
        }
    }, {
        namespace: 'hookSysBack',
        os: ['dd'],
        runCode: function runCode() {
            for (var _len5 = arguments.length, rest = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                rest[_key5] = arguments[_key5];
            }

            // 只拦截Android
            var args = rest;
            var options = args[0];

            ddF9Config().then(function () {
                document.addEventListener('backbutton', function (e) {
                    // 在这里处理你的业务逻辑
                    // backbutton事件的默认行为是回退历史记录，如果你想阻止默认的回退行为，那么可以通过preventDefault()实现
                    e.preventDefault();
                    options.success && options.success();
                });
            });
        }
    }]);
}

function runtimeMixin(hybrid) {
    var hybridJs = hybrid;
    var innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('runtime', [{
        namespace: 'launchApp',
        os: ['dd'],
        defaultParams: {
            // android应用的包名
            packageName: '',
            // android应用页面类名
            className: '',
            // 页面配置的Scheme名字，适用于Android与iOS
            scheme: ''
        },
        runCode: function runCode() {
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
                rest[_key] = arguments[_key];
            }

            var args = rest;

            args[0] = innerUtil.extend(args[0], {
                app: hybridJs.os.android ? args[0].packageName : args[0].scheme,
                activity: args[0].className
            });

            callDDByArgs(args, dd.device.launcher.launchApp);
        }
    }, {
        namespace: 'clipboard',
        os: ['dd'],
        defaultParams: {
            text: ''
        },
        runCode: function runCode() {
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                rest[_key2] = arguments[_key2];
            }

            callDDByArgs(rest, dd.biz.clipboardData.setData);
        }
    }, {
        namespace: 'getGeolocation',
        os: ['dd'],
        defaultParams: {
            isShowDetail: 0,
            targetAccuracy: 1000,
            coordinate: 1,
            useCache: true,
            withReGeocode: false
        },
        runCode: function runCode() {
            for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                rest[_key3] = arguments[_key3];
            }

            callDDByArgs(rest, dd.device.geolocation.get);
        }
    }]);
}

var invokePluginApi = function (opt, cb) {
    if (opt.path === 'workplatform.provider.openNewPage' && opt.dataMap.method === 'goSelectPerson') {
        var pickedUsers = [];
        // 已选人员
        if (opt.dataMap.selectedusers && opt.dataMap.selectedusers.length > 0) {
            var selectedusers = opt.dataMap.selectedusers;

            selectedusers.forEach(function (element) {
                pickedUsers.push(element.userguid);
            });
        }
        var issingle = void 0;

        // eslint-disable-next-line eqeqeq
        if (opt.dataMap.issingle == 0) {
            issingle = true;
        } else {
            issingle = false;
        }

        var corpId = localStorage.getItem('corpId');

        dd.biz.contact.complexPicker({
            title: '选择页面', // 标题
            corpId: corpId, // 企业的corpId
            multiple: issingle, // 是否多选
            limitTips: '', // 超过限定人数返回提示
            maxUsers: opt.dataMap.maxchoosecount || 1000, // 最大可选人数
            pickedUsers: pickedUsers || [], // 已选用户
            pickedDepartments: [], // 已选部门
            disabledUsers: [], // 不可选用户
            disabledDepartments: [], // 不可选部门
            requiredUsers: [], // 必选用户（不可取消选中状态）
            requiredDepartments: [], // 必选部门（不可取消选中状态）
            appId: opt.dataMap.appId || '288560694', // 微应用的Id
            responseUserOnly: false, // 返回人，或者返回人和部门
            startWithDepartmentId: 0, // 仅支持0和-1
            onSuccess: function onSuccess(result) {
                var tmpUserInfo = result.users;

                var resultUser = [];

                if (tmpUserInfo.length > 0) {
                    tmpUserInfo.forEach(function (element) {
                        resultUser.push({
                            username: element.name || '',
                            loginid: '',
                            sequenceid: '',
                            photourl: element.avatar || '',
                            displayname: element.name || '',
                            title: '',
                            baseouname: '',
                            ccworksequenceid: '',
                            userguid: element.emplId || '',
                            ordernumber: ''
                        });
                    });
                }

                cb && cb({
                    resultData: resultUser,
                    grouipData: [],
                    talkData: []
                });
            },
            onFail: function onFail(err) {
                console.log(err);
            }
        });
    }
};

function utilMixin(hybrid) {
    var hybridJs = hybrid;

    hybridJs.extendModule('util', [{
        namespace: 'invokePluginApi',
        os: ['dd'],
        support: '3.2.0',
        defaultParams: {
            path: '',
            dataMap: ''
        },
        runCode: function runCode() {
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
                rest[_key] = arguments[_key];
            }

            var args = rest;
            var options = args[0];
            var resolve = args[1];

            // callDDByArgs(args, dd.biz.contact.complexPicker);
            ddF9Config().then(function () {
                invokePluginApi(options, function (result) {
                    options.success && options.success(result);
                    resolve && resolve(result);
                });
            });
        }
    }]);
}

function ioMixin(hybrid) {
    var hybridJs = hybrid;

    hybridJs.extendModule('io', [{
        namespace: 'downloadFile',
        os: ['dd'],
        support: '3.1.2',
        defaultParams: {
            // 下载地址
            url: '',
            // 文件名。必填。
            fileName: '',
            // 下载分类。默认为(其他分类)。推荐传对应的模块名称。例如邮件(MAIL)。如果没有"附件管理"模块，可忽略该参数。
            type: '',
            //  如果本地已有该文件是否重新下载。默认为0(直接打开文件)，为1时重新下载文件并且重命名。
            reDownloaded: 0,
            // 是否下载后打开，为1为默认打开,不传则根据配置文件而定
            // 仅在后台静默下载时有用
            // openAfterComplete: 1,
            // 是否在后台下载，如果是，则静默后台下载，否则会专门跳到一个下载页面
            isBackground: 1,
            autoStart: 0
        },
        runCode: function runCode() {
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
                rest[_key] = arguments[_key];
            }

            var args = rest;
            var options = args[0];
            var resolve = args[1];

            var corpId = localStorage.getItem('corpId') || '';
            dd.biz.cspace.saveFile({
                corpId: corpId,
                url: options.url, // 文件在第三方服务器地址， 也可为通过服务端接口上传文件得到的media_id，详见参数说明
                name: options.fileName,
                onSuccess: function onSuccess(data) {
                    var res = data.data;

                    if (options.autoStart === 1) {
                        var spaceId = res[0].spaceId;
                        var fileId = res[0].fileId;
                        var fileName = res[0].fileName;
                        var fileSize = res[0].fileSize;
                        var fileType = res[0].fileType;

                        dd.biz.cspace.preview({
                            corpId: corpId,
                            spaceId: spaceId,
                            fileId: fileId,
                            fileName: fileName,
                            fileSize: fileSize,
                            fileType: fileType,
                            onSuccess: function onSuccess() {
                                options.success && options.success();
                                resolve && resolve();
                                // 无，直接在native显示文件详细信息
                            },
                            onFail: function onFail(err) {
                                console.warn(JSON.stringify(err));
                                // 无，直接在native页面显示具体的错误
                            }
                        });
                    } else {
                        options.success && options.success(data);
                        resolve && resolve(data);
                    }
                },
                onFail: function onFail(err) {
                    console.warn(JSON.stringify(err));
                }
            });
        }
    }]);
}

var hybridJs = window.ejs;

uiMixin(hybridJs);
deviceMixin(hybridJs);
pageMixin(hybridJs);
navigatorMixin(hybridJs);
runtimeMixin(hybridJs);
utilMixin(hybridJs);
ioMixin(hybridJs);

})));
