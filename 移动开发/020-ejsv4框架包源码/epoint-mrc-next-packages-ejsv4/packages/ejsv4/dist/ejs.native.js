/*!
 * @epoint-mrc/ejsv4 v4.2.23
 * (c) 2017-2026 
 * Released under the ISC License.
 * 
 */

(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

    function uiMixin(hybrid) {
      var hybridJs = hybrid;
      var innerUtil = hybridJs.innerUtil;
      hybridJs.extendModule('ui', [{
        namespace: 'toast',
        os: ['ejs'],
        defaultParams: {
          message: '',
          h5UI: false
        },
        runCode: function runCode() {
          for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
            rest[_key] = arguments[_key];
          }
          // 兼容字符串形式
          var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'message');
          args[0].message = args[0].message || String(args[0].message);
          hybridJs.callInner.apply(this, args);
        }
      }, {
        namespace: 'showDebugDialog',
        os: ['ejs'],
        defaultParams: {
          debugInfo: '',
          h5UI: false
        },
        runCode: function runCode() {
          for (var _len2 = arguments.length, rest = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            rest[_key2] = arguments[_key2];
          }
          // 兼容字符串形式
          var args = innerUtil.compatibleStringParamsToObject(rest, 'debugInfo');
          args[0].debugInfo = String(args[0].debugInfo);
          hybridJs.callInner.apply(this, args);
        }
      }, {
        namespace: 'alert',
        os: ['ejs'],
        defaultParams: {
          title: '',
          message: '',
          // 默认可取消
          cancelable: 1,
          h5UI: false
        },
        // 用confirm来模拟alert
        runCode: function runCode() {
          for (var _len3 = arguments.length, rest = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            rest[_key3] = arguments[_key3];
          }
          // 兼容字符串形式
          var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'message', 'title', 'buttonName');
          args[0].buttonLabels = [String(args[0].buttonName || '确定')];
          hybridJs.ui.confirm.apply(this, args);
        }
      }, {
        namespace: 'confirm',
        os: ['ejs'],
        defaultParams: {
          title: '',
          message: '',
          buttonLabels: [],
          // 默认可取消
          cancelable: 1,
          h5UI: false
        },
        runCode: function runCode() {
          for (var _len4 = arguments.length, rest = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            rest[_key4] = arguments[_key4];
          }
          // 兼容字符串形式
          var args = rest;
          args[0].title = String(args[0].title);
          args[0].message = String(args[0].message);
          args[0].buttonLabels = args[0].buttonLabels.length ? args[0].buttonLabels.map(function (item) {
            return String(item);
          }) : ['取消', '确定'];
          hybridJs.callInner.apply(this, args);
        }
      }, {
        namespace: 'prompt',
        os: ['ejs'],
        defaultParams: {
          title: '',
          hint: '',
          text: '',
          lines: 1,
          maxLength: 10000,
          // 默认可取消
          cancelable: 1,
          h5UI: false
        },
        runCode: function runCode() {
          for (var _len5 = arguments.length, rest = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            rest[_key5] = arguments[_key5];
          }
          // 兼容字符串形式
          var args = rest;
          args[0].buttonLabels = args[0].buttonLabels && args[0].buttonLabels.length ? args[0].buttonLabels : ['取消', '确定'];
          hybridJs.callInner.apply(this, args);
        }
      }, {
        namespace: 'select',
        os: ['ejs'],
        defaultParams: {
          title: '',
          items: [],
          choiceState: [],
          // 由以前的true和false替换为了1和0
          isMultiSelect: 0,
          // 样式类型，默认为0。 0：单列表样式；1：九宫格样式(目前只支持单选)
          type: 0,
          columns: 2,
          // 可取消
          cancelable: 1,
          isShowSelectAll: 0,
          h5UI: false
        },
        runCode: function runCode() {
          for (var _len6 = arguments.length, rest = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
            rest[_key6] = arguments[_key6];
          }
          var args = rest;
          var options = args[0];
          var originalItems = options.items;
          options.dataFilter = function (res) {
            var newRes = res;
            var index = -1;
            var content = '';
            if (newRes.result) {
              var choiceState = newRes.result.choiceState;
              if (newRes.result.which !== undefined) {
                index = newRes.result.which || 0;
                content = originalItems[index];
                // 需要将中文解码
                newRes.result.content = decodeURIComponent(content);
              } else if (choiceState !== undefined) {
                newRes.result.choiceContent = [];
                for (var i = 0, len = choiceState.length; i < len; i += 1) {
                  if (+choiceState[i] === 1) {
                    newRes.result.choiceContent.push(originalItems[i]);
                  }
                }
              }
            }
            return newRes;
          };
          args[0] = options;
          hybridJs.callInner.apply(this, args);
        }
      }, {
        namespace: 'actionSheet',
        os: ['ejs'],
        defaultParams: {
          items: [],
          // 默认可取消
          cancelable: 1,
          h5UI: false
        },
        runCode: function runCode() {
          for (var _len7 = arguments.length, rest = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
            rest[_key7] = arguments[_key7];
          }
          var args = rest;
          var options = args[0];
          var originalItems = options.items;
          options.dataFilter = function (res) {
            var newRes = res;
            var index = -1;
            var content = '';
            if (newRes.result) {
              index = newRes.result.which || 0;
              content = originalItems[index];
              // 需要将中文解码
              newRes.result.content = decodeURIComponent(content);
            }
            return newRes;
          };
          args[0] = options;
          hybridJs.callInner.apply(this, args);
        }
      }, {
        namespace: 'popWindow',
        os: ['ejs'],
        defaultParams: {
          titleItems: [],
          iconItems: undefined,
          iconFilterColor: ''
        },
        /**
         * 有横向菜单和垂直菜单2种
         * 可配合setNBRightImage、setNBRightText使用(iOS 不可配合使用)
         */
        runCode: function runCode() {
          for (var _len8 = arguments.length, rest = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
            rest[_key8] = arguments[_key8];
          }
          var args = rest;
          var options = args[0];
          var originalItems = options.titleItems;
          // 处理相对路径问题
          if (options.iconItems) {
            for (var i = 0, len = options.iconItems.length; i < len; i += 1) {
              options.iconItems[i] = innerUtil.getFullPath(options.iconItems[i]);
            }
          }
          options.dataFilter = function (res) {
            var newRes = res;
            var index = -1;
            var content = '';
            if (newRes.result) {
              index = newRes.result.which || 0;
              content = originalItems[index];
              // 需要将中文解码
              newRes.result.content = decodeURIComponent(content);
            }
            return newRes;
          };
          args[0] = options;
          hybridJs.callInner.apply(this, args);
        }
      }, {
        namespace: 'pickDate',
        os: ['ejs'],
        defaultParams: {
          // h5中的开始年份
          minDate: '',
          // h5中的结束年份
          maxDate: '',
          // 部分设备上设置标题后遮挡控件可不设置标题
          title: '',
          // 默认为空为使用当前时间
          // 格式为 yyyy-MM-dd。
          datetime: '',
          h5UI: false
        },
        runCode: function runCode() {
          for (var _len9 = arguments.length, rest = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
            rest[_key9] = arguments[_key9];
          }
          // 兼容字符串形式
          var args = rest;
          hybridJs.callInner.apply(this, args);
        }
      }, {
        namespace: 'pickTime',
        os: ['ejs'],
        defaultParams: {
          // 部分设备上设置标题后遮挡控件可不设置标题
          title: '',
          // 默认为空为使用当前时间
          // 格式为 HH:mm
          datetime: '',
          minHour: 0,
          maxHour: 23,
          minMinute: 0,
          maxMinute: 59,
          h5UI: false
        },
        runCode: function runCode() {
          for (var _len0 = arguments.length, rest = new Array(_len0), _key0 = 0; _key0 < _len0; _key0++) {
            rest[_key0] = arguments[_key0];
          }
          // 兼容字符串形式
          var args = rest;
          hybridJs.callInner.apply(this, args);
        }
      }, {
        namespace: 'pickDateTime',
        os: ['ejs'],
        defaultParams: {
          title1: '',
          title2: '',
          // h5中的开始年份
          minDate: '',
          // h5中的结束年份
          maxDate: '',
          // 默认为空为使用当前时间
          // 格式为 yyyy-MM-dd HH:mm
          datetime: '',
          showSecond: false,
          h5UI: false
        },
        runCode: function runCode() {
          for (var _len1 = arguments.length, rest = new Array(_len1), _key1 = 0; _key1 < _len1; _key1++) {
            rest[_key1] = arguments[_key1];
          }
          // 兼容字符串形式
          var args = rest;
          hybridJs.callInner.apply(this, args);
        }
      }, {
        namespace: 'showWaiting',
        os: ['ejs'],
        defaultParams: {
          message: '',
          h5UI: false
        },
        runCode: function runCode() {
          for (var _len10 = arguments.length, rest = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
            rest[_key10] = arguments[_key10];
          }
          // 兼容字符串形式
          var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'message');
          args[0].message = String(args[0].message);
          hybridJs.callInner.apply(this, args);
        }
      }, {
        namespace: 'closeWaiting',
        os: ['ejs'],
        runCode: function runCode() {
          for (var _len11 = arguments.length, rest = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
            rest[_key11] = arguments[_key11];
          }
          // 兼容字符串形式
          var args = rest;
          hybridJs.callInner.apply(this, args);
        }
      }, {
        namespace: 'toastAndEvent',
        os: ['ejs'],
        defaultParams: {
          message: '',
          buttonName: '',
          iconType: '0',
          duration: '2000',
          position: '',
          h5UI: false
        },
        runCode: function runCode() {
          for (var _len12 = arguments.length, rest = new Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
            rest[_key12] = arguments[_key12];
          }
          // 兼容字符串形式
          var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'message');
          args[0].message = String(args[0].message);
          args[0].buttonName = String(args[0].buttonName);
          hybridJs.callInner.apply(this, args);
        }
      }]);
    }

    function authMixin(hybrid) {
      var hybridJs = hybrid;
      hybridJs.extendModule('auth', [{
        namespace: 'getToken',
        os: ['ejs']
      }, {
        namespace: 'refreshToken',
        os: ['ejs']
      }, {
        namespace: 'getUserInfo',
        os: ['ejs']
      }, {
        namespace: 'refreshUserInfo',
        os: ['ejs'],
        support: '4.2.3'
      }, {
        namespace: 'getAuthCode',
        os: ['ejs'],
        support: '3.2.4'
      }, {
        namespace: 'logoutUserWithAlert',
        os: ['ejs'],
        support: '3.5.0',
        defaultParams: {
          title: '提示',
          message: '请重新登录'
        }
      }, {
        namespace: 'logout',
        os: ['ejs'],
        support: '4.1.9'
      }, {
        namespace: 'getUserAuthCode',
        os: ['ejs'],
        support: '4.0.2',
        // 实际支持版本4.0.3a，为兼容姑苏项目降为4.0.2
        defaultParams: {
          appkey: ''
        }
      }]);
    }

    function runtimeMixin(hybrid) {
      var hybridJs = hybrid;
      var innerUtil = hybridJs.innerUtil;
      hybridJs.extendModule('runtime', [{
        namespace: 'launchApp',
        os: ['ejs'],
        defaultParams: {
          // android应用的包名
          packageName: '',
          // android应用页面类名
          className: '',
          // android应用页面配置的ActionName
          actionName: '',
          // 页面配置的Scheme名字，适用于Android与iOS
          scheme: '',
          // 传递的参数。需要目标应用解析获取参数。字符串形式
          data: ''
        }
      }, {
        namespace: 'isApplicationExist',
        os: ['ejs'],
        support: '3.1.2',
        defaultParams: {
          // android应用的包名
          packageName: '',
          // ios下的scheme
          scheme: ''
        }
      }, {
        namespace: 'getAppKey',
        os: ['ejs']
      }, {
        namespace: 'getAppVersion',
        os: ['ejs']
      }, {
        namespace: 'getEjsVersion',
        os: ['ejs']
      }, {
        namespace: 'clearCache',
        os: ['ejs']
      }, {
        namespace: 'getGeolocation',
        os: ['ejs'],
        defaultParams: {
          isShowDetail: 1,
          // 1采用的火星坐标系，0采用地球坐标系
          coordinate: 1
        }
      }, {
        namespace: 'clipboard',
        os: ['ejs'],
        defaultParams: {
          text: ''
        },
        runCode: function runCode() {
          for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
            rest[_key] = arguments[_key];
          }
          // 兼容字符串形式
          var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'text');
          args[0].text = String(args[0].text);
          var success = args[0].success;
          args[0].success = function () {
            hybridJs.ui.toast('内容已复制');
            success && success();
          };
          hybridJs.callInner.apply(this, args);
        }
      }, {
        namespace: 'openUrl',
        os: ['ejs'],
        defaultParams: {
          url: ''
        },
        runCode: function runCode() {
          for (var _len2 = arguments.length, rest = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            rest[_key2] = arguments[_key2];
          }
          // 兼容字符串形式
          var args = innerUtil.compatibleStringParamsToObject(rest, 'url');
          hybridJs.callInner.apply(this, args);
        }
      }, {
        // 调试面板，如果native开启了调试，会在面板中打印
        namespace: 'logPanel',
        os: ['ejs'],
        support: '3.1.4',
        defaultParams: {
          text: ''
        },
        runCode: function runCode() {
          for (var _len3 = arguments.length, rest = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            rest[_key3] = arguments[_key3];
          }
          // 兼容字符串形式
          var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'text');
          hybridJs.callInner.apply(this, args);
        }
      }, {
        namespace: 'openSetting',
        os: ['ejs'],
        support: '3.1.6'
      }, {
        namespace: 'getPlatformUrl',
        os: ['ejs'],
        support: '3.1.9'
      }, {
        namespace: 'getPluginVersion',
        os: ['ejs'],
        support: '3.2.1',
        defaultParams: {
          pluginName: '',
          packageName: ''
        }
      }, {
        namespace: 'securityType',
        os: ['ejs'],
        support: '3.4.0'
      }, {
        namespace: 'platform',
        os: ['ejs'],
        support: '3.4.0'
      }, {
        namespace: 'canIUse',
        os: ['ejs'],
        support: '4.0.0'
      }, {
        namespace: 'startLocationUpdate',
        os: ['ejs'],
        support: '4.0.3'
      }, {
        namespace: 'stopLocationUpdate',
        os: ['ejs'],
        support: '4.0.3'
      },
      // 以下为 EUI4.0 新增API
      // 获取当前模式
      // 出参(string)：0-标版模式；1-适老模式
      {
        namespace: 'getCurrentMode',
        os: ['ejs']
      },
      // 获取当前主题。（目前仅有默认主题，支持自定义扩展主题，可以设置成主题1、主题2这种）
      // 出参(string)： 0-默认主题；1-主题1；2-主题2
      {
        namespace: 'getCurrentTheme',
        os: ['ejs']
      },
      // 获取指定模式下的配置。（例如：type:0，是获取标版模式下的所有原生尺寸配置。）
      // 出参：{"key1":"value1","key2":"value2"}
      {
        namespace: 'getModeConfig',
        os: ['ejs'],
        defaultParams: {
          type: '0'
        }
      },
      // 获取指定主题下的配置。（例如：type:0，是获取默认主题下的所有原生颜色配置。）
      // 出参：{"key1":"value1","key2":"value2"}
      {
        namespace: 'getThemeConfig',
        os: ['ejs'],
        defaultParams: {
          type: '0'
        }
      },
      // 获取指定样式值（主要针对扩展样式，默认样式规范和命名按照基础token文档定义，可以根据样式名称获取对应的值信息）
      // 出参(string)：value
      {
        namespace: 'getConfigValue',
        os: ['ejs'],
        defaultParams: {
          key: ''
        }
      }]);
    }

    function deviceMixin(hybrid) {
      var hybridJs = hybrid;
      var innerUtil = hybridJs.innerUtil;
      hybridJs.extendModule('device', [{
        namespace: 'setOrientation',
        os: ['ejs'],
        defaultParams: {
          // 1表示竖屏，0表示横屏，-1表示跟随系统
          orientation: 1
        }
      }, {
        namespace: 'setZoomControl',
        os: ['ejs'],
        defaultParams: {
          isShow: 1
        }
      }, {
        namespace: 'getDeviceId',
        os: ['ejs']
      }, {
        namespace: 'getMacAddress',
        os: ['ejs']
      }, {
        namespace: 'getScreenInfo',
        os: ['ejs']
      }, {
        namespace: 'getVendorInfo',
        os: ['ejs']
      }, {
        namespace: 'isTablet',
        os: ['ejs']
      }, {
        namespace: 'getNetWorkInfo',
        os: ['ejs']
      }, {
        namespace: 'callPhone',
        os: ['ejs'],
        defaultParams: {
          phoneNum: ''
        },
        runCode: function runCode() {
          for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
            rest[_key] = arguments[_key];
          }
          // 兼容字符串形式
          var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'phoneNum');
          hybridJs.callInner.apply(this, args);
        }
      }, {
        namespace: 'sendMsg',
        os: ['ejs'],
        defaultParams: {
          phoneNum: '',
          message: ''
        },
        runCode: function runCode() {
          for (var _len2 = arguments.length, rest = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            rest[_key2] = arguments[_key2];
          }
          // 兼容字符串形式
          var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'phoneNum', 'message');
          hybridJs.callInner.apply(this, args);
        }
      }, {
        namespace: 'closeInputKeyboard',
        os: ['ejs']
      }, {
        namespace: 'vibrate',
        os: ['ejs'],
        defaultParams: {
          duration: 200
        },
        runCode: function runCode() {
          for (var _len3 = arguments.length, rest = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            rest[_key3] = arguments[_key3];
          }
          // 兼容字符串形式
          var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'duration');
          hybridJs.callInner.apply(this, args);
        }
      }, {
        namespace: 'sendTo',
        os: ['ejs'],
        defaultParams: {
          title: '',
          url: '',
          imgBase64: '',
          imgURL: '',
          sdPath: ''
        }
      }, {
        namespace: 'setZoomControl',
        os: ['ejs'],
        defaultParams: {
          // 1表示显示，0表示隐藏
          isShow: 1
        },
        runCode: function runCode() {
          for (var _len4 = arguments.length, rest = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            rest[_key4] = arguments[_key4];
          }
          // 兼容字符串形式
          var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'isShow');
          hybridJs.callInner.apply(this, args);
        }
      }, {
        namespace: 'setBounce',
        os: ['ejs'],
        defaultParams: {
          // 1表示开启，0表示关闭
          isEnable: 1
        },
        runCode: function runCode() {
          for (var _len5 = arguments.length, rest = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            rest[_key5] = arguments[_key5];
          }
          // 兼容字符串形式
          var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'isEnable');
          hybridJs.callInner.apply(this, args);
        }
      }, {
        namespace: 'shake.disable',
        os: ['ejs'],
        runCode: function runCode() {
          // 修改为原生中的namespace
          this.api.namespace = 'shakeDisable';
          for (var _len6 = arguments.length, rest = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
            rest[_key6] = arguments[_key6];
          }
          hybridJs.callInner.apply(this, rest);
        }
      }, {
        namespace: 'shake.enable',
        os: ['ejs'],
        /**
         * 启用摇一摇后，只要有摇一摇就会回调，属于长期回调范围
         */
        runCode: function runCode() {
          // 修改为原生中的namespace
          this.api.namespace = 'shakeEnable';
          this.api.isLongCb = true;
          for (var _len7 = arguments.length, rest = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
            rest[_key7] = arguments[_key7];
          }
          hybridJs.callInner.apply(this, rest);
        }
      }, {
        namespace: 'checkPermissions',
        os: ['ejs'],
        support: '3.1.5',
        defaultParams: {
          // 0-6分别对应：location，storage，phone，camera，sms，contacts，microphone
          permissionsType: 0
        }
      }, {
        namespace: 'requestPermissions',
        os: ['ejs'],
        support: '3.1.5',
        defaultParams: {
          // 0-6分别对应：location，storage，phone，camera，sms，contacts，microphone
          permissionsType: 0
        }
      }, {
        namespace: 'beep',
        support: '3.4.0',
        os: ['ejs']
      }, {
        namespace: 'goAppSetting',
        support: '3.4.0',
        os: ['ejs']
      }, {
        namespace: 'setEnableShot',
        os: ['ejs'],
        support: '3.4.0',
        defaultParams: {
          isEnableShot: 0
        }
      }, {
        namespace: 'getDeviceInfo',
        os: ['ejs'],
        support: '3.4.2'
      }, {
        namespace: 'isHasVirtualPosApp',
        os: ['ejs'],
        support: '4.0.0'
      }]);
    }

    function eventMixin(hybrid) {
      var hybridJs = hybrid;
      /**
       * 前端的EVENT名称和原生容器的有一些差别
       */
      var EVENT_MAPPING = {
        resume: 'OnPageResume',
        pause: 'OnPagePause',
        miniH5Resume: 'OnMiniPageResume',
        netChange: 'OnNetChanged',
        search: 'OnSearch',
        destroy: 'OnPageDestroy',
        created: 'OnPageCreated',
        cardOpenbox: 'onCardOpenbox',
        cardClosebox: 'onCardClosebox'
      };
      hybridJs.extendModule('event', [{
        namespace: 'registerEvent',
        os: ['ejs'],
        defaultParams: {
          key: ''
        },
        runCode: function runCode() {
          for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
            rest[_key] = arguments[_key];
          }
          var args = rest;
          var options = args[0];
          options.key = EVENT_MAPPING[options.key] || options.key;
          args[0] = options;
          // 长期回调为true，里面会自动生成长期回调id
          this.api.isLongCb = true;
          // 标识是event，event的时候需要额外增加一个port参数，对应相应的长期回调id
          this.api.isEvent = true;
          hybridJs.callInner.apply(this, args);
        }
      }, {
        namespace: 'unRegisterEvent',
        os: ['ejs'],
        defaultParams: {
          key: ''
        },
        runCode: function runCode() {
          for (var _len2 = arguments.length, rest = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            rest[_key2] = arguments[_key2];
          }
          var args = rest;
          var options = args[0];
          options.key = EVENT_MAPPING[options.key] || options.key;
          args[0] = options;
          hybridJs.callInner.apply(this, args);
        }
      }, {
        namespace: 'isRegisterEvent',
        os: ['ejs'],
        defaultParams: {
          key: ''
        },
        runCode: function runCode() {
          for (var _len3 = arguments.length, rest = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            rest[_key3] = arguments[_key3];
          }
          var args = rest;
          var options = args[0];
          options.key = EVENT_MAPPING[options.key] || options.key;
          args[0] = options;
          hybridJs.callInner.apply(this, args);
        }
      }, {
        namespace: 'dispatchEventToNative',
        os: ['ejs']
      }, {
        namespace: 'on',
        os: ['ejs'],
        defaultParams: {
          key: ''
        },
        runCode: function runCode() {
          for (var _len4 = arguments.length, rest = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            rest[_key4] = arguments[_key4];
          }
          var args = rest;
          // 长期回调为true，里面会自动生成长期回调id
          this.api.isLongCb = true;
          // 标识是event，event的时候需要额外增加一个port参数，对应相应的长期回调id
          this.api.isEvent = true;
          hybridJs.callInner.apply(this, args);
        }
      }, {
        namespace: 'once',
        os: ['ejs'],
        defaultParams: {
          key: ''
        }
      }, {
        namespace: 'emit',
        os: ['ejs'],
        defaultParams: {
          key: ''
        }
      }, {
        namespace: 'off',
        os: ['ejs'],
        defaultParams: {
          key: ''
        }
      }, {
        namespace: 'app',
        os: ['ejs'],
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
          if (hybridJs.os.ejs) {
            hybridJs.event.registerEvent({
              key: 'created',
              success: function success() {
                options.onLaunch && options.onLaunch();
              }
            });
            hybridJs.event.registerEvent({
              key: 'miniH5Resume',
              success: function success() {
                options.onShow && options.onShow();
              }
            });
            hybridJs.event.registerEvent({
              key: 'pause',
              success: function success() {
                options.onHide && options.onHide();
              }
            });
            hybridJs.event.registerEvent({
              key: 'destroy',
              success: function success() {
                options.onClose && options.onClose();
                hybridJs.event.dispatchEventToNative({
                  key: 'DOMContentUnLoaded'
                });
              }
            });
          } else if (hybridJs.os.xm) {
            xm.on('onLoad', function () {
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
        }
      }]);
    }

    function storageMixin(hybrid) {
      var hybridJs = hybrid;
      var innerUtil = hybridJs.innerUtil;
      hybridJs.extendModule('storage', [{
        namespace: 'getItem',
        os: ['ejs'],
        defaultParams: {
          // 对应的key
          key: ''
        },
        runCode: function runCode() {
          for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
            rest[_key] = arguments[_key];
          }
          // 兼容数组形式
          var args = rest;
          var options = args[0];
          if (!innerUtil.isObject(options.key)) {
            options.key = [options.key];
          }
          args[0] = options;
          hybridJs.callInner.apply(this, args);
        }
      }, {
        namespace: 'setItem',
        os: ['ejs']
        // 格式为 key: value形式，支持多个key value
      }, {
        namespace: 'removeItem',
        os: ['ejs'],
        defaultParams: {
          // 对应的key
          key: ''
        },
        runCode: function runCode() {
          for (var _len2 = arguments.length, rest = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            rest[_key2] = arguments[_key2];
          }
          // 兼容数组形式
          var args = rest;
          var options = args[0];
          if (!innerUtil.isObject(options.key)) {
            options.key = [options.key];
          }
          args[0] = options;
          hybridJs.callInner.apply(this, args);
        }
      }, {
        // 获取应用管理平台配置的业务接口地址
        namespace: 'getBusinessRestUrl',
        os: ['ejs']
      }, {
        // 获取小程序配置参数（先从独立配置中获取，否则从通用配置中获取）
        namespace: 'getPlatformParam',
        os: ['ejs'],
        defaultParams: {
          // 对应的key
          key: ''
        },
        runCode: function runCode() {
          for (var _len3 = arguments.length, rest = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            rest[_key3] = arguments[_key3];
          }
          // 兼容数组形式
          var args = rest;
          var options = args[0];
          if (hybridJs.os.miniH5) {
            if (!innerUtil.isObject(options.key)) {
              options.key = [options.key];
            }
            args[0] = options;
            hybridJs.callInner.apply(this, args);
          } else {
            hybridJs.storage.getItem(options);
          }
        }
      }, {
        // 获取小程序通用平台参数配置
        namespace: 'getPlatformShareParam',
        os: ['ejs'],
        defaultParams: {
          // 对应的key
          key: ''
        },
        runCode: function runCode() {
          for (var _len4 = arguments.length, rest = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            rest[_key4] = arguments[_key4];
          }
          // 兼容数组形式
          var args = rest;
          var options = args[0];
          if (hybridJs.os.miniH5) {
            if (!innerUtil.isObject(options.key)) {
              options.key = [options.key];
            }
            args[0] = options;
            hybridJs.callInner.apply(this, args);
          } else {
            hybridJs.storage.getItem(options);
          }
        }
      }, {
        // 获取小程序独立配置参数
        namespace: 'getPlatformPrivateParam',
        os: ['ejs'],
        defaultParams: {
          // 对应的key
          key: ''
        },
        runCode: function runCode() {
          for (var _len5 = arguments.length, rest = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            rest[_key5] = arguments[_key5];
          }
          // 兼容数组形式
          var args = rest;
          var options = args[0];
          if (hybridJs.os.miniH5) {
            if (!innerUtil.isObject(options.key)) {
              options.key = [options.key];
            }
            args[0] = options;
            hybridJs.callInner.apply(this, args);
          } else {
            hybridJs.storage.getItem(options);
          }
        }
      }, {
        // 小程序通用数据库取数据
        namespace: 'getShareItem',
        os: ['ejs'],
        defaultParams: {
          // 对应的key
          key: ''
        },
        runCode: function runCode() {
          for (var _len6 = arguments.length, rest = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
            rest[_key6] = arguments[_key6];
          }
          // 兼容数组形式
          var args = rest;
          var options = args[0];
          // if (hybridJs.os.miniH5) {
          if (!innerUtil.isObject(options.key)) {
            options.key = [options.key];
          }
          args[0] = options;
          hybridJs.callInner.apply(this, args);
          // } else {
          //     hybridJs.storage.getItem(args);
          // }
        }
      }, {
        // 小程序通用数据库存数据
        namespace: 'setShareItem',
        os: ['ejs']
        // 格式为 key: value形式，支持多个key value
      }, {
        // 小程序通用数据库删数据
        namespace: 'removeShareItem',
        os: ['ejs'],
        defaultParams: {
          // 对应的key
          key: ''
        },
        runCode: function runCode() {
          for (var _len7 = arguments.length, rest = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
            rest[_key7] = arguments[_key7];
          }
          // 兼容数组形式
          var args = rest;
          var options = args[0];
          if (!innerUtil.isObject(options.key)) {
            options.key = [options.key];
          }
          args[0] = options;
          hybridJs.callInner.apply(this, args);
        }
      }]);
    }

    // ejs原生模块后续主要用于跨端框架，所以useRouter默认为true
    function pageMixin(hybrid) {
      var hybridJs = hybrid;
      var innerUtil = hybridJs.innerUtil;
      hybridJs.extendModule('page', [{
        namespace: 'open',
        os: ['ejs'],
        defaultParams: {
          pageUrl: '',
          pageStyle: 1,
          // 横竖屏,默认为1表示竖屏
          orientation: 1,
          // 为1保活状态关闭小程序，为0不保活,默认为0
          alive: 0,
          // 额外数据
          data: {},
          useRouter: true
        },
        runCode: function runCode() {
          for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
            rest[_key] = arguments[_key];
          }
          // 兼容字符串形式
          var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'pageUrl', 'data');
          var options = args[0];
          if (options.useRouter && options.useRouter !== 'auto' && !/^(http|https)/.test(options.url)) {
            var url = innerUtil.getFullUrlByParams(options.pageUrl, options.data, true);
            if (hybridJs.os.weex) {
              options.pageUrl = url;
              // @ts-ignore
              Vue['$router'].push(options.pageUrl);
              return;
            }
            if (window.vm && window.vm.$router) {
              options.pageUrl = url;
              window.vm.$router.push(options.pageUrl);
              return;
            }
            try {
              if (uni) {
                var uniOption = {
                  url: url,
                  success: function success() {
                    options.success && options.success();
                  },
                  fail: function fail(err) {
                    options.error && options.error(err);
                  }
                };
                uni.navigateTo(Object.assign({}, options, uniOption));
                return;
              }
            } catch (_unused) {}
          }
          // 将额外数据拼接到url中
          options.pageUrl = innerUtil.getFullUrlByParams(options.pageUrl, options.data);
          // 去除无用参数的干扰
          options.data = undefined;
          args[0] = options;
          hybridJs.callInner.apply(this, args);
        }
      }, {
        namespace: 'openLocal',
        os: ['ejs'],
        defaultParams: {
          className: '',
          // 为1则是打开已存在的页面，会杀掉所有该页面上的页面
          isOpenExist: 0,
          // 额外数据，注意额外数据只能一层键值对形式，不能再包裹子json
          data: {}
        },
        runCode: function runCode() {
          for (var _len2 = arguments.length, rest = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            rest[_key2] = arguments[_key2];
          }
          var args = rest;
          var options = args[0];
          var pageStyle = options.data.pageStyle;
          // 兼容 pageStyle, 确保传递给原生的均是 Number 类型
          if (pageStyle) {
            options.data.pageStyle = typeof pageStyle === 'string' ? parseInt(pageStyle, 10) : pageStyle;
          }
          options.dataFilter = function (res) {
            var newRes = res;
            if (!innerUtil.isObject(newRes.result.resultData)) {
              try {
                newRes.result.resultData = JSON.parse(newRes.result.resultData);
              } catch (e) {}
            }
            return newRes;
          };
          args[0] = options;
          hybridJs.callInner.apply(this, args);
        }
      }, {
        namespace: 'close',
        os: ['ejs'],
        defaultParams: {
          // 需要关闭的页面层级，默认只会关闭一层
          popPageNumber: 1,
          // 需要传递的参数，是一个字符串
          resultData: '',
          useRouter: true
        },
        runCode: function runCode() {
          for (var _len3 = arguments.length, rest = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            rest[_key3] = arguments[_key3];
          }
          // 兼容字符串形式
          var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'resultData');
          var options = args[0];
          var resolve = args[1];
          var reject = args[2];
          if (options.useRouter && options.useRouter !== 'auto') {
            if (hybridJs.os.weex) {
              // @ts-ignore
              Vue['$router'].go(-options.popPageNumber);
              return;
            }
            if (window.vm && window.vm.$router) {
              window.vm.$router.go(-options.popPageNumber);
              return;
            }
            try {
              if (uni) {
                var uniOption = {
                  delta: options.popPageNumber,
                  success: function success() {
                    options.success && options.success();
                    resolve && resolve();
                  },
                  fail: function fail(err) {
                    options.error && options.error(err);
                    reject && reject(err);
                  }
                };
                uni.navigateBack(Object.assign({}, options, uniOption));
                return;
              }
            } catch (_unused2) {}
          }
          if (innerUtil.isObject(args[0].resultData)) {
            args[0].resultData = JSON.stringify(args[0].resultData);
          }
          hybridJs.callInner.apply(this, args);
        }
      }, {
        namespace: 'reload',
        os: ['ejs']
      }, {
        namespace: 'showError',
        os: ['ejs'],
        defaultParams: {
          // 0: 网络异常  1: 服务器异常 2: 访问超时 3: 页面加载失败
          type: 0
        },
        runCode: function runCode() {
          for (var _len4 = arguments.length, rest = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            rest[_key4] = arguments[_key4];
          }
          // 兼容字符串形式
          var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'type');
          hybridJs.callInner.apply(this, args);
        }
      }, {
        namespace: 'replace',
        os: ['ejs'],
        defaultParams: {
          url: '',
          useRouter: true
        },
        runCode: function runCode() {
          for (var _len5 = arguments.length, rest = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            rest[_key5] = arguments[_key5];
          }
          // 兼容字符串形式
          var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'url');
          var options = args[0];
          if (options.useRouter && options.useRouter !== 'auto') {
            if (hybridJs.os.weex) {
              // @ts-ignore
              Vue['$router'].replace(options.url);
              return;
            }
            if (window.vm && window.vm.$router) {
              window.vm.$router.replace(options.url);
              return;
            }
            try {
              if (uni) {
                var uniOption = {
                  url: options.url,
                  success: function success() {
                    options.success && options.success();
                  },
                  fail: function fail(err) {
                    options.error && options.error(err);
                  }
                };
                uni.redirectTo(Object.assign({}, options, uniOption));
                return;
              }
            } catch (_unused3) {}
          }
          // 将额外数据拼接到url中
          options.url = innerUtil.getFullPath(options.url);
          args[0] = options;
          hybridJs.callInner.apply(this, args);
        }
      }]);
    }

    function navigatorMixin(hybrid) {
      var hybridJs = hybrid;
      var innerUtil = hybridJs.innerUtil;
      /**
       * 按钮最多允许6个英文字符，或3个中文
       */
      // const MAX_BTN_TEXT_COUNT = 6;
      hybridJs.extendModule('navigator', [{
        namespace: 'setTitle',
        os: ['ejs'],
        defaultParams: {
          title: '',
          // 子标题
          subTitle: '',
          // 是否可点击，可点击时会有点击效果并且点击后会触发回调，不可点击时永远不会触发回调
          // 可点击时，title会有下拉箭头
          // promise调用时和其他长期回调一样立马then
          direction: 'bottom',
          // 是否可点击，如果为1，代表可点击，会在标题右侧出现一个下拉图标，并且能被点击监听
          clickable: 0
        },
        runCode: function runCode() {
          for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
            rest[_key] = arguments[_key];
          }
          // 兼容字符串形式
          var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'title');
          this.api.isLongCb = true;
          hybridJs.callInner.apply(this, args);
        }
      }, {
        namespace: 'setMultiTitle',
        os: ['ejs'],
        defaultParams: {
          titles: ''
        },
        runCode: function runCode() {
          this.api.isLongCb = true;
          for (var _len2 = arguments.length, rest = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            rest[_key2] = arguments[_key2];
          }
          hybridJs.callInner.apply(this, rest);
        }
      }, {
        namespace: 'show',
        os: ['ejs']
      }, {
        namespace: 'hide',
        os: ['ejs']
      }, {
        namespace: 'showSearchBar',
        os: ['ejs'],
        runCode: function runCode() {
          this.api.isLongCb = true;
          for (var _len3 = arguments.length, rest = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            rest[_key3] = arguments[_key3];
          }
          hybridJs.callInner.apply(this, rest);
        }
      }, {
        namespace: 'hideSearchBar',
        os: ['ejs']
      }, {
        namespace: 'hideBackButton',
        os: ['ejs']
      }, {
        namespace: 'hookSysBack',
        os: ['ejs'],
        runCode: function runCode() {
          this.api.isLongCb = true;
          for (var _len4 = arguments.length, rest = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            rest[_key4] = arguments[_key4];
          }
          hybridJs.callInner.apply(this, rest);
        }
      }, {
        namespace: 'hookBackBtn',
        os: ['ejs'],
        runCode: function runCode() {
          this.api.isLongCb = true;
          for (var _len5 = arguments.length, rest = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            rest[_key5] = arguments[_key5];
          }
          hybridJs.callInner.apply(this, rest);
        }
      }, {
        namespace: 'setRightBtn',
        os: ['ejs'],
        defaultParams: {
          text: '',
          imageUrl: '',
          isShow: 1,
          // 对应哪一个按钮，一般是0, 1可选择
          which: 0,
          // 按钮最多允许6个英文字符，或3个中文
          maxCount: 6
        },
        runCode: function runCode() {
          for (var _len6 = arguments.length, rest = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
            rest[_key6] = arguments[_key6];
          }
          var args = rest;
          var options = args[0];
          options.imageUrl = options.imageUrl && innerUtil.getFullPath(options.imageUrl);
          options.text = innerUtil.eclipseText(options.text, options.maxCount);
          args[0] = options;
          this.api.isLongCb = true;
          hybridJs.callInner.apply(this, args);
        }
      }, {
        namespace: 'setRightMenu',
        os: ['ejs'],
        defaultParams: {
          text: '',
          imageUrl: '',
          // 过滤色默认为空
          iconFilterColor: '',
          // 点击后出现的菜单列表，这个API会覆盖rightBtn
          titleItems: [],
          iconItems: []
        },
        /**
         * 这个API比较特殊，暂时由前端模拟
         */
        runCode: function runCode() {
          var _this = this;
          for (var _len7 = arguments.length, rest = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
            rest[_key7] = arguments[_key7];
          }
          var newArgs = [].slice.call(rest);
          var newOptions = innerUtil.extend({}, newArgs[0]);
          newOptions.success = function () {
            // 点击的时候，弹出菜单
            hybridJs.ui.popWindow.apply(_this, rest);
          };
          newArgs[0] = newOptions;
          hybridJs.navigator.setRightBtn.apply(this, newArgs);
        }
      }, {
        namespace: 'setLeftBtn',
        os: ['ejs'],
        defaultParams: {
          text: '',
          imageUrl: '',
          isShow: 1,
          // 是否显示下拉箭头,如果带箭头，它会占两个位置，同时覆盖左侧按钮和左侧返回按钮
          isShowArrow: 0,
          // ejs3.4.0新增 在 isShowArrow 为1的情况下有效，direction 参数值支持：“bottom（箭头向下，默认值）”，“top（箭头向上）”
          direction: 'bottom',
          // 按钮最多允许6个英文字符，或3个中文
          maxCount: 6
        },
        runCode: function runCode() {
          for (var _len8 = arguments.length, rest = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
            rest[_key8] = arguments[_key8];
          }
          var args = rest;
          var options = args[0];
          options.imageUrl = options.imageUrl && innerUtil.getFullPath(options.imageUrl);
          options.text = innerUtil.eclipseText(options.text, options.maxCount);
          args[0] = options;
          this.api.isLongCb = true;
          hybridJs.callInner.apply(this, args);
        }
      }, {
        namespace: 'showStatusBar',
        os: ['ejs']
      }, {
        namespace: 'hideStatusBar',
        os: ['ejs']
      }, {
        namespace: 'setSearchWord',
        os: ['ejs'],
        support: '3.1.9',
        defaultParams: {
          keyword: ''
        },
        runCode: function runCode() {
          for (var _len9 = arguments.length, rest = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
            rest[_key9] = arguments[_key9];
          }
          // 兼容字符串形式
          var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'keyword');
          hybridJs.callInner.apply(this, args);
        }
      }, {
        namespace: 'getSearchWord',
        os: ['ejs'],
        support: '3.1.9'
      }, {
        namespace: 'setSearchBar',
        os: ['ejs'],
        defaultParams: {
          isShow: 1,
          keyword: '',
          placeholder: '请输入搜索关键字',
          isSearchable: 0,
          cancelOnSearchBarAndNotRefresh: 0,
          hideBottomLine: 0
        },
        support: '3.2.2',
        runCode: function runCode() {
          this.api.isLongCb = true;
          for (var _len0 = arguments.length, rest = new Array(_len0), _key0 = 0; _key0 < _len0; _key0++) {
            rest[_key0] = arguments[_key0];
          }
          hybridJs.callInner.apply(this, rest);
        }
      }, {
        namespace: 'hideBackBtn',
        os: ['ejs'],
        support: '3.4.1'
      }]);
    }

    // 返回一个当前时刻的毫秒数，用于获取一个时间戳
    // 检查是否是对象（对象包括普通对象、函数、数组，排除Null）
    function isObject(object) {
      var classType = Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
      return classType !== 'String' && classType !== 'Number' && classType !== 'Boolean' && classType !== 'Undefined' && classType !== 'Null';
    }
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
     * 产生一个 唯一uuid，默认为32位的随机字符串，8-4-4-4-12 格式
     * @param {Object} options 配置項
     * len 默认为32位（包括连字符），最大不能超过36，最小不能小于4
     * radix 随机的基数，如果小于等于10代表只用纯数字，最大为62，最小为2，默认为62
     * type 类别，默认为default代表 8-4-4-4-12的模式，如果为 其他（不为空） 代表不会有连线
     * @returns {String} uuid
     */
    function uuid(options) {
      var option = options || {};
      var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
      var innerUuid = [];
      var i;
      var radix = option.radix || chars.length;
      var len = option.len || 32;
      var type = option.type || 'default';
      len = Math.min(len, 36);
      len = Math.max(len, 4);
      radix = Math.min(radix, 62);
      radix = Math.max(radix, 2);
      if (len) {
        for (i = 0; i < len; i += 1) {
          // eslint-disable-next-line no-bitwise
          innerUuid[i] = chars[0 | Math.random() * radix];
        }
        if (type === 'default') {
          len > 23 && (innerUuid[23] = '-');
          len > 18 && (innerUuid[18] = '-');
          len > 13 && (innerUuid[13] = '-');
          len > 8 && (innerUuid[8] = '-');
        }
      }
      return innerUuid.join('');
    }

    function utilMixin(hybrid) {
      var hybridJs = hybrid;
      var innerUtil = hybridJs.innerUtil;
      hybridJs.extendModule('util', [{
        namespace: 'scan',
        os: ['ejs'],
        defaultParams: {
          // 是否显示历史记录 3.4.0add
          showHistory: 0,
          // 0 容器底座处理结果，1 H5接受并个性化处理，默认为 1
          needResult: 1
        }
      }, {
        namespace: 'playVideo',
        os: ['ejs'],
        defaultParams: {
          // 视频地址
          videoUrl: ''
        }
      }, {
        namespace: 'selectImage',
        os: ['ejs'],
        defaultParams: {
          // 图片数量
          photoCount: 9,
          // 是否允许拍照，1：允许；0：不允许
          showCamera: 0,
          // 是否显示gif图片，1：显示；0：不显示
          showGif: 0,
          // 是否允许预览，1：允许，0：不允许
          previewEnabled: 1,
          // 已选图片，json数组格式，item为元素本地地址
          selectedPhotos: []
        }
      }, {
        namespace: 'prevImage',
        os: ['ejs'],
        defaultParams: {
          // 默认显示图片序号
          index: 0,
          // 是否显示删除按钮，1：显示，0：不显示，默认不显示。如果显示按钮则自动注册回调事件。
          showDeleteButton: 0,
          // 图片地址，json数组格式，item为元素本地地址
          selectedPhotos: []
        },
        runCode: function runCode() {
          for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
            rest[_key] = arguments[_key];
          }
          // 兼容字符串形式
          var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'text');
          var selectedPhotos = args[0].selectedPhotos;
          for (var i = 0, len = selectedPhotos.length; i < len; i += 1) {
            args[0].selectedPhotos[i] = innerUtil.getFullPath(selectedPhotos[i]);
          }
          hybridJs.callInner.apply(this, args);
        }
      }, {
        namespace: 'cameraImage',
        os: ['ejs'],
        defaultParams: {
          // 宽度
          width: 720,
          // 压缩质量
          quality: 70,
          // 0“表示拍照时默认打开后置摄像头，“1“ 表示默认打开前置摄像头。默认值为“0“
          defaultCamera: '0'
        }
      }, {
        namespace: 'recordVideo',
        os: ['ejs'],
        support: '3.1.2',
        defaultParams: {
          // 最大时长，单位为秒
          maxDuration: 120,
          className: hybridJs.os.android ? 'com.epoint.baseapp.component.media.ShootActivity' : 'EPTVideoRecordViewController'
        },
        runCode: function runCode() {
          for (var _len2 = arguments.length, rest = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            rest[_key2] = arguments[_key2];
          }
          // 兼容字符串形式
          var args = rest;
          args[0].data = {
            maxDuration: args[0].maxDuration
          };
          hybridJs.page.openLocal.apply(this, args);
        }
      }, {
        namespace: 'getPreviewUrl',
        os: ['ejs']
      }, {
        namespace: 'goSearch',
        os: ['ejs'],
        defaultParams: {
          searchType: '',
          conditions: ''
        }
      }, {
        namespace: 'createQRCode',
        os: ['ejs'],
        support: '3.1.8',
        defaultParams: {
          qrCodeStr: '',
          size: 200
        }
      }, {
        namespace: 'recognizeQRCode',
        os: ['ejs'],
        support: '3.1.8',
        defaultParams: {
          imgPath: '',
          imgBase64: ''
        },
        runCode: function runCode() {
          for (var _len3 = arguments.length, rest = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            rest[_key3] = arguments[_key3];
          }
          var args = rest;
          var imgBase64 = args[0].imgBase64;
          args[0].imgBase64 = imgBase64 ? innerUtil.getBase64NotUrl(imgBase64) : '';
          hybridJs.callInner.apply(this, rest);
        }
      }, {
        namespace: 'invokePluginApi',
        os: ['ejs'],
        support: '3.2.0',
        defaultParams: {
          path: '',
          dataMap: '',
          appVersion: '',
          isLongCb: false
        },
        runCode: function runCode() {
          for (var _len4 = arguments.length, rest = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            rest[_key4] = arguments[_key4];
          }
          var args = rest;
          var appVersion = args[0].appVersion;
          var self = this;
          this.api.isLongCb = args[0].isLongCb;
          if (appVersion) {
            // 如果传了appVersion，比较一下容器版本
            hybridJs.runtime.getAppVersion({
              success: function success(result) {
                if (result.version && compareVersion(result.version, appVersion) >= 0) {
                  // 若容器版本大于传进来的最低版本
                  hybridJs.callInner.apply(self, rest);
                } else {
                  var msg = "".concat(args[0].dataMap.method, "\u8981\u6C42\u7684\u5BB9\u5668\u7248\u672C\u81F3\u5C11\u4E3A:").concat(appVersion, "\uFF0C\u5F53\u524D\u5BB9\u5668\u7248\u672C\uFF1A").concat(result.version, "\uFF0C\u8BF7\u5347\u7EA7");
                  hybridJs.showError(hybridJs.globalError.ERROR_TYPE_APINEEDHIGHNATIVEVERSION.code, msg);
                }
              },
              error: function error(_error) {
                console.error(_error);
              }
            });
          } else {
            hybridJs.callInner.apply(this, rest);
          }
        }
      }, {
        namespace: 'encrypt',
        os: ['ejs'],
        support: '3.2.3',
        defaultParams: {
          text: ''
        }
      }, {
        namespace: 'decrypt',
        os: ['ejs'],
        support: '3.4.0',
        defaultParams: {
          text: ''
        }
      }, {
        namespace: 'selectVideo',
        os: ['ejs'],
        support: '3.4.1.b',
        defaultParams: {
          // 选择视频的最大允许数量，默认为1
          videoCount: 1
        }
      }]);
    }

    function streamMixin(hybrid) {
      var hybridJs = hybrid;
      hybridJs.extendModule('stream', [{
        namespace: 'fetch',
        os: ['ejs'],
        defaultParams: {
          url: '',
          method: 'POST',
          // json text
          type: 'json',
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
          var options = args[0];
          options.dataFilter = function (res) {
            var result = res.result;
            if (options.type.toLowerCase() === 'json' && typeof result.data === 'string') {
              try {
                result.data = JSON.parse(result.data);
              } catch (e) {}
            }
            return res;
          };
          args[0] = options;
          hybridJs.callInner.apply(this, args);
        }
      }, {
        // 标准的框架附件上传方案，token由原始内部处理
        // 只能处理标准的框架接口
        namespace: 'uploadFile',
        os: ['ejs'],
        defaultParams: {
          // 默认参数为系统默认上传地址
          url: '',
          // 标准上传只支持一个文件接一个的上传
          path: '',
          clientGuid: '',
          clientInfo: '',
          clientTag: '',
          documentType: '',
          attachFileName: ''
        },
        runCode: function runCode() {
          for (var _len2 = arguments.length, rest = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            rest[_key2] = arguments[_key2];
          }
          var args = rest;
          var options = args[0];
          // 自动处理fileName，根据路径提取
          if (!options.documentType) {
            var pathMatch = options.path.match(/([.][^.]+)$/);
            options.documentType = pathMatch && pathMatch[1] || '';
          }
          args[0] = options;
          hybridJs.callInner.apply(this, args);
        }
      }, {
        // 标准的文件上传，可以上传多个文件
        // 自己传headers和额外参数
        namespace: 'uploadMultipartFile',
        os: ['ejs'],
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
          for (var _len3 = arguments.length, rest = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            rest[_key3] = arguments[_key3];
          }
          var args = rest;
          var options = args[0];
          // 自动处理fileName，根据路径提取
          if (!options.file.fileName) {
            var pathMatch = options.file.path.match(/[/]([^/]+)$/);
            options.file.fileName = pathMatch && pathMatch[1] || '';
          }
          args[0] = options;
          hybridJs.callInner.apply(this, args);
        }
      }]);
    }

    function contactMixin(hybrid) {
      var hybridJs = hybrid;
      // contact是底层用的openLocal
      hybridJs.extendModule('contact', [{
        namespace: 'choose',
        os: ['ejs'],
        defaultParams: {
          // 已选人员的用户guid列表
          userguids: [],
          className: hybridJs.os.android ? 'com.epoint.baseapp.component.chooseperson.PersonChooseActivity' : 'WPLPersonnelSelectViewController'
        },
        runCode: function runCode() {
          for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
            rest[_key] = arguments[_key];
          }
          // 兼容字符串形式
          var args = rest;
          args[0].data = {
            userguids: args[0].userguids
          };
          args[0].userguids = '';
          hybridJs.page.openLocal.apply(this, args);
        }
      }, {
        namespace: 'select',
        os: ['ejs'],
        defaultParams: {
          token: '',
          url: '',
          // 已选人员的用户guid列表
          selectedusers: [],
          unableselectusers: [],
          issingle: '0',
          maxchoosecount: 500,
          isouonly: '0',
          isgroupenable: '0',
          selectedous: [],
          custom: ''
        },
        runCode: function runCode() {
          for (var _len2 = arguments.length, rest = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            rest[_key2] = arguments[_key2];
          }
          var args = rest;
          var options = args[0];
          var resolve = args[1];
          var reject = args[2];
          // 比较版本号是否大于3.2.0
          hybridJs.runtime.getEjsVersion({
            success: function success(result) {
              var appVersion = result.version;
              if (compareVersion('3.2.0', appVersion) > 0) {
                if (!SelectPerson) {
                  var msg = '未引入全局函数SelectPerson！';
                  console.error(msg);
                  options.error && options.error(msg);
                  reject && reject(msg);
                  return;
                }
                var success = options.confirm || options.success;
                options.success = function (result) {
                  success && success(result);
                  resolve && resolve(result);
                };
                options.confirm = options.success;
                // @ts-ignore
                SelectPerson(options, hybridJs, function (result) {
                  options.success && options.success(result);
                  resolve && resolve(result);
                });
              } else {
                hybridJs.util.invokePluginApi({
                  path: 'workplatform.provider.openNewPage',
                  dataMap: {
                    method: 'goSelectPerson',
                    issingle: options.issingle,
                    unableselectusers: options.unableselectusers,
                    selectedusers: options.selectedusers,
                    isgroupenable: options.isgroupenable,
                    maxchoosecount: options.maxchoosecount,
                    selectedous: options.selectedous,
                    isouonly: options.isouonly,
                    custom: options.custom
                  },
                  success: function success(res) {
                    options.success && options.success(res);
                    resolve && resolve(res);
                  },
                  error: function error(err) {
                    options.error && options.error(err);
                    resolve && resolve(err);
                  }
                });
              }
            },
            error: function error(_error) {
              options.error && options.error(_error);
            }
          });
        }
      }]);
    }

    function audioMixin(hybrid) {
      var hybridJs = hybrid;
      hybridJs.extendModule('audio', [{
        namespace: 'startRecord',
        os: ['ejs'],
        support: '3.1.2',
        defaultParams: {
          minDuration: 1,
          maxDuration: 120,
          folderPath: '',
          fileName: ''
        }
      }, {
        namespace: 'stopRecord',
        os: ['ejs'],
        support: '3.1.2'
      }, {
        namespace: 'cancelRecord',
        os: ['ejs'],
        support: '3.1.2'
      }, {
        namespace: 'startPlay',
        os: ['ejs'],
        support: '3.1.2',
        defaultParams: {
          path: ''
        }
      }, {
        namespace: 'stopPlay',
        os: ['ejs'],
        support: '3.1.2',
        defaultParams: {
          path: ''
        }
      }]);
    }

    function ioMixin(hybrid) {
      var hybridJs = hybrid;
      var innerUtil = hybridJs.innerUtil;
      hybridJs.extendModule('io', [{
        namespace: 'downloadFile',
        os: ['ejs'],
        // 支持的最小版本，可以等于，Android，iOS通用
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
          // 新增自动打开下载文件参数 ejs3.4.0
          autoStart: 0
        }
      }, {
        namespace: 'selectFile',
        os: ['ejs'],
        support: '3.1.2',
        defaultParams: {
          multi: 0,
          // 文件数量
          count: 9
        }
      }, {
        namespace: 'openFile',
        os: ['ejs'],
        support: '3.1.2',
        defaultParams: {
          path: ''
        },
        runCode: function runCode() {
          for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
            rest[_key] = arguments[_key];
          }
          // 兼容字符串形式
          var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'path');
          hybridJs.callInner.apply(this, args);
        }
      }, {
        namespace: 'renameFile',
        os: ['ejs'],
        support: '3.1.2',
        defaultParams: {
          path: '',
          // 如果仅仅是想重命名名字，传newName即可
          newName: '',
          // 如果想要重命名后缀，传后缀就可以了，没有后缀请不要传
          newSuffix: undefined
        }
      }, {
        namespace: 'copyFile',
        os: ['ejs'],
        support: '3.1.2',
        defaultParams: {
          path: '',
          // 新的路径
          newPath: ''
        }
      }, {
        namespace: 'deleteFile',
        os: ['ejs'],
        support: '3.1.2',
        defaultParams: {
          path: ''
        }
      }, {
        namespace: 'getFileSize',
        os: ['ejs'],
        support: '3.1.7',
        defaultParams: {
          path: ''
        }
      }, {
        namespace: 'screenShot',
        os: ['ejs'],
        support: '3.2.5a',
        defaultParams: {
          captureType: 1
        }
      }, {
        namespace: 'report',
        os: ['ejs'],
        support: '4.0.0',
        defaultParams: {
          // url地址
          url: '',
          // 响应时间(毫秒)
          responsetime: '',
          // 请求内容（请求出错才有）
          request: '',
          // 响应内容（请求出错才有）
          response: '',
          // 0容器，1小程序，2H5
          belong: '',
          // 成功或者失败标示，'0'失败，'1'成功
          successorfail: ''
        }
      }, {
        namespace: 'record',
        os: ['ejs'],
        defaultParams: {
          eventid: '',
          // 具体的页面
          eventname: '',
          // open|click|close|jserror|debug
          eventcontent: '',
          // jserror | debug事件内容
          clickid: '',
          // 点击按钮 id
          clicktitle: '' // 点击按钮 title
        }
      }]);
    }

    function miniH5Mixin(hybrid) {
      var hybridJs = hybrid;
      var innerUtil = hybridJs.innerUtil;
      hybridJs.extendModule('miniH5', [{
        namespace: 'navigateTo',
        os: ['ejs'],
        support: '3.4.1',
        defaultParams: {
          // 要打开的小程序 appId
          appId: '',
          // 打开指定的页面路径
          path: '',
          // 为1保活状态关闭小程序，为0不保活,默认为0
          alive: 0,
          // 需要传递给小程序的额外参数
          extraData: {}
        },
        runCode: function runCode() {
          for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
            rest[_key] = arguments[_key];
          }
          // 兼容字符串形式
          var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'appId', 'path', 'extraData');
          var options = args[0];
          // 去除无用参数的干扰
          options.data = undefined;
          options.dataFilter = function (res) {
            var newRes = res;
            if (!innerUtil.isObject(newRes.result.extraData)) {
              try {
                newRes.result.extraData = JSON.parse(newRes.result.extraData);
              } catch (e) {}
            }
            return newRes;
          };
          args[0] = options;
          hybridJs.callInner.apply(this, args);
        }
      }, {
        namespace: 'navigateBack',
        os: ['ejs'],
        support: '3.4.1',
        defaultParams: {
          // 需要关闭的页面层级，默认只会关闭一层
          popPageNumber: 1,
          // 需要传递的参数，是一个字符串
          resultData: '',
          useRouter: false
        },
        runCode: function runCode() {
          for (var _len2 = arguments.length, rest = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            rest[_key2] = arguments[_key2];
          }
          // 兼容字符串形式
          var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'extraData');
          if (args[0].useRouter) {
            if (hybridJs.os.weex) {
              // @ts-ignore
              Vue['$router'].go(-1);
              return;
            }
            if (window.vm && window.vm.$router) {
              window.vm.$router.go(-1);
            }
          } else if (innerUtil.isObject(args[0].resultData)) {
            args[0].resultData = JSON.stringify(args[0].resultData);
          }
          hybridJs.page.close(args[0]);
        }
      }, {
        namespace: 'onNavigateBack',
        os: ['ejs'],
        support: '3.4.1',
        runCode: function runCode() {
          this.api.isLongCb = true;
          for (var _len3 = arguments.length, rest = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            rest[_key3] = arguments[_key3];
          }
          hybridJs.callInner.apply(this, rest);
        }
      }, {
        // 获取应用管理平台配置的业务接口地址
        namespace: 'getEpointCodeInfo',
        os: ['ejs']
      }, {
        namespace: 'setNavigationBarTitle',
        os: ['ejs'],
        support: '3.4.1',
        defaultParams: {
          // 页面标题
          title: ''
        },
        runCode: function runCode() {
          for (var _len4 = arguments.length, rest = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            rest[_key4] = arguments[_key4];
          }
          // 兼容字符串形式
          var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'title');
          hybridJs.callInner.apply(this, args);
        }
      }, {
        namespace: 'setNavigationBarColor',
        os: ['ejs'],
        support: '3.4.1',
        defaultParams: {
          // 页面前景色
          frontColor: '',
          // 导航栏背景色
          backgroundColor: ''
        },
        runCode: function runCode() {
          for (var _len5 = arguments.length, rest = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            rest[_key5] = arguments[_key5];
          }
          // 兼容字符串形式
          var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'frontColor', 'backgroundColor');
          hybridJs.callInner.apply(this, args);
        }
      }, {
        namespace: 'close',
        os: ['ejs'],
        support: '3.4.1',
        defaultParams: {
          // 为1保活状态关闭小程序，为0不保活，默认1
          alive: 1
        },
        runCode: function runCode() {
          for (var _len6 = arguments.length, rest = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
            rest[_key6] = arguments[_key6];
          }
          // 兼容字符串形式
          var args = rest;
          if (hybridJs.os.ios) {
            // ios环境下做版本兼容
            hybridJs.runtime.getEjsVersion({
              success: function success(result) {
                var appVersion = result.version;
                if (compareVersion('4.0.1.a', appVersion) > 0) {
                  args[0].alive = args[0].alive === 1 ? 0 : 1;
                }
              },
              error: function error(_error) {
                args[0].error && args[0].error(_error);
              }
            });
          }
          hybridJs.callInner.apply(this, args);
        }
      }, {
        // 检测小程序是否已更新
        namespace: 'checkForUpdate',
        os: ['ejs'],
        support: '4.0.2'
      }, {
        // 小程序强制更新并重启
        namespace: 'applyUpdate',
        os: ['ejs'],
        support: '4.0.2'
      }, {
        // 小程序支持下载卡片资源
        namespace: 'applyCard',
        os: ['ejs'],
        support: '4.0.2',
        defaultParams: {
          // 支持配置强制更新 isforce 参数，1 不再执行判断逻辑、直接更新  0 正常更新
          isforce: '0',
          // 传入卡片 appkey、version、cardguid、isdebug
          appkey: '',
          version: '',
          cardguid: '',
          isdebug: ''
        }
      }]);
    }

    function basicCardMixin(hybrid) {
      var hybridJs = hybrid;
      hybridJs.extendModule('basicCard', [{
        namespace: 'showBigCardEntrance',
        os: ['ejs'],
        support: '4.0.1'
      }, {
        namespace: 'setBigCardTitle',
        os: ['ejs'],
        support: '4.0.1'
      }, {
        namespace: 'setCardHeight',
        os: ['ejs'],
        support: '4.0.1'
      }]);
    }

    function warn(msg, err) {
      // 模板字符串
      console.error("[hybridJs error]: ".concat(msg), err);
    }

    function _defineProperty(e, r, t) {
      return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[r] = t, e;
    }
    function ownKeys(e, r) {
      var t = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function (r) {
          return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })), t.push.apply(t, o);
      }
      return t;
    }
    function _objectSpread2(e) {
      for (var r = 1; r < arguments.length; r++) {
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
          _defineProperty(e, r, t[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
      }
      return e;
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
    function _typeof(o) {
      "@babel/helpers - typeof";

      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
        return typeof o;
      } : function (o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
      }, _typeof(o);
    }

    // jsbridge协议定义的名称
    var CUSTOM_PROTOCOL_SCHEME = 'EpointJSBridge';
    // 要排除掉的端口号
    var excludePort = [8193, 8194, 8195];
    // 唯一id,用来确保长期回调的唯一性，初始化为最大值
    var uniqueLongCallbackId = 65536;
    // 临时解决：iframe跨域时，长期回调port需要随机。防止安卓非iframe的webview下，从全局port中读取到iframeuuid，误以iframe传参方式进行回调。
    if (typeof weex === 'undefined' && !(window.self === window.top)) {
      uniqueLongCallbackId = 50000 + Math.round(Math.random() * (65536 - 50000));
    }
    /**
     * 获取短期回调id，内部要避免和长期回调的冲突
     * @return {Number} 返回一个随机的短期回调id
     */
    function getCallbackId() {
      var exclude = function exclude(port) {
        if (excludePort.indexOf(port) !== -1) {
          return exclude(Math.floor(Math.random() * uniqueLongCallbackId));
        }
        return port;
      };
      // 确保每次都不会和长期id相同
      return exclude(Math.floor(Math.random() * uniqueLongCallbackId));
    }
    function getLongCallbackId() {
      uniqueLongCallbackId -= 1;
      return uniqueLongCallbackId;
    }
    /**
     * 手动函数传参
     * @param {String} UUID 唯一标识
     * @returns {String} FuncString 带协议的字符串
     */
    function callFuncData(UUID) {
      var FuncString = "JSBridgeParamForCallback://".concat(UUID);
      return FuncString;
    }
    /**
     * 将函数转换为唯一协议标识
     * @param {object} newMessage 构建后参数
     * @param {function} fun 函数参数
     * @param {object} JSBridge JSBridge
     * @returns {String} FuncString 带协议的字符串
     */
    function funToGuid(newMessage, fun, JSBridge) {
      var FuncId = getCallbackId();
      // 全局存储参数函数
      JSBridge.responseCallbacks[FuncId] = fun;
      // 存储函数参数id至本地，将与api成功回调id绑定，用于统一成功回调后销毁
      newMessage.funcitonCallbackId.push(FuncId);
      return callFuncData(FuncId);
    }
    /**
     * 递归处理传参内函数参数未唯一协议标识字符串
     * @param {object} newMessage 构建后参数
     * @param {object} data api入参
     * @param {object} JSBridge JSBridge
     */
    function handleFunOpt(newMessage, data, JSBridge) {
      data && Object.keys(data).forEach(function (item) {
        if (typeof data[item] === 'function') {
          // eslint-disable-next-line no-param-reassign
          data[item] = funToGuid(newMessage, data[item], JSBridge);
        } else if (_typeof(data[item]) === 'object') {
          handleFunOpt(newMessage, data[item], JSBridge);
        }
      });
    }
    /**
     * 将JSON参数转为字符串
     * @param {Object} data 对应的json对象
     * @return {String} 转为字符串后的结果
     */
    function getParam(data) {
      if (typeof data !== 'string') {
        return JSON.stringify(data);
      }
      return data;
    }

    /**
     * h5和原生交互，jsbridge核心代码
     * 依赖于showError，globalError，os
     * @param {Object} hybrid hybrid对象
     */
    function jsbridgeMixin$2(hybrid) {
      var hybridJs = hybrid;
      var ejsIframeUuid = uuid({
        len: 10,
        type: 'noline'
      });
      // 必须要有一个全局的JSBridge，否则原生和H5无法通信
      // 已有的JSBridge将被重写
      window.JSBridge = window.JSBridge || {};
      var JSBridge = window.JSBridge;
      // 声明依赖
      var showError = hybridJs.showError;
      var globalError = hybridJs.globalError;
      var os = hybridJs.os;
      hybridJs.JSBridge = JSBridge;
      // 本地注册的方法集合,原生只能调用本地注册的方法,否则会提示错误
      if (!JSBridge.messageHandlers) {
        JSBridge.messageHandlers = {};
      }
      // 短期回调函数集合
      // 在原生调用完对应的方法后,会执行对应的回调函数id，并删除
      if (!JSBridge.responseCallbacks) {
        JSBridge.responseCallbacks = {};
      }
      // 长期存在的回调，调用后不会删除
      if (!JSBridge.responseCallbacksLongTerm) {
        JSBridge.responseCallbacksLongTerm = {};
      }
      if (!JSBridge.functionCallbacks) {
        JSBridge.functionCallbacks = {};
      }
      /**
       * 递归获取当前iframe位置层级
       * @param {Object} win window环境
       * @param {String} str 拼接的iframe字符串
       * @returns {String} 拼接的iframe字符串
       */
      function getParentWindow(win, str) {
        var callBack;
        var callStr;
        if (win.parent === win) {
          // 当前页面已经是根页面了
          if ((str || '').length >= 0) {
            callBack = str;
          }
        } else {
          // 存在父级页面
          try {
            var p = win.parent;
            // 跨域执行时，无法获取到p.document，走try-catch回调
            var frames = p.document.getElementsByTagName('iframe');
            var index = 0;
            for (var i = 0; i < frames.length; i += 1) {
              var frame = frames[i];
              if (frame.contentWindow === win) {
                index = i;
                break;
              }
            }
            if ((str || '').length > 0) {
              callStr = ".".concat(str);
            }
            callBack = getParentWindow(p, "document.getElementsByTagName(\"iframe\")[".concat(index, "].contentWindow").concat(callStr || ''));
          } catch (error) {
            console.error(
            // '请勿在小程序内嵌入iframe使用ejs，或者请升级ejs容器组件、ejs前端框架版本4.0.3-c及以上，4.0.3-c及以上请忽略'
            '识别当前页面为iframe下跨域使用ejsapi\n为了正常使用ejsapi，请确认：\n移动前端框架ejs版本v4.0.3-c及以上\nv7容器ejs组件版本v3.5.1.e(Android)、v3.5.1.l(iOS)及以上\nM8容器ejs组件版本v4.0.3.c及以上\n同时iframe标签请去除sandbox属性或者sandbox属性增加allow-modals值');
          }
        }
        return callBack;
      }
      /**
       * 提取出原生给ejs回调处理方式
       * @param {Object} bridge JSBridge变量
       * @param {Object} message 原生传递给ejs的回调参数
       */
      function nativeActionCallback(bridge, message) {
        // 回调函数
        var responseId = message.responseId;
        var responseData = message.responseData;
        var responseCallback;
        if (responseId) {
          // 这里规定,原生执行方法完毕后准备通知h5执行回调时,回调函数id是responseId
          responseCallback = bridge.responseCallbacks[responseId];
          // 默认先短期再长期
          responseCallback = responseCallback || bridge.responseCallbacksLongTerm[responseId];
          // 执行本地的回调函数
          responseCallback && responseCallback(responseData);
          // 删除api回调
          // eslint-disable-next-line no-param-reassign
          delete bridge.responseCallbacks[responseId];
          // 删除参数函数回调
          if (bridge.functionCallbacks[responseId]) {
            bridge.functionCallbacks[responseId].forEach(function (e) {
              // eslint-disable-next-line no-param-reassign
              delete bridge.responseCallbacks[e];
            });
          }
        } else {
          /**
           * 否则,代表原生主动执行h5本地的函数
           * 从本地注册的函数中获取
           */
          var handler = bridge.messageHandlers[message.handlerName];
          var data = message.data;
          // 执行本地函数,按照要求传入数据和回调
          handler && handler(data);
        }
      }
      /**
       * 给所有iframe页面推送内容
       * @param {Object} message 对应的方法的详情,需要手动转为json
       */
      function allIframePostMessage(message) {
        // 获取原生传递过来指定的iframe标记
        var iframeUuid = message.callbackIframeUUid || message.iframeUuid;
        var ifrmaePages = document.getElementsByTagName('iframe');
        [].forEach.call(ifrmaePages, function (e) {
          e.contentWindow.postMessage({
            iframeUuid: iframeUuid,
            message: message
          }, '*');
        });
      }
      /**
       * 获取最终的url scheme
       * @param {String} proto 协议头，一般不同模块会有不同的协议头
       * @param {Object} message 兼容android中的做法
       * android中由于原生不能获取JS函数的返回值,所以得通过协议传输
       * @return {String} 返回拼接后的uri
       */
      function getUri(proto, message) {
        var uri = "".concat(CUSTOM_PROTOCOL_SCHEME, "://").concat(proto);
        // 回调id作为端口存在
        var callbackId;
        var method;
        var params;
        if (message.callbackId) {
          // 必须有回调id才能生成一个scheme
          // 这种情况是H5主动调用native时
          callbackId = message.callbackId;
          method = message.handlerName;
          params = message.data;
        }
        if (!(window.self === window.top)) {
          // 老版本对ejsiframe页面ejs兼容，存在跨域无法响应问题
          params.callbackFunc = getParentWindow(window);
          // 4.0.3a以上，使用新版iframe兼容，由原生判断使用新版还是老版
          params.callbackIframeUUid = "".concat(ejsIframeUuid);
        }
        // 参数转为字符串
        params = encodeURIComponent(getParam(params));
        // uri 补充,需要编码，防止非法字符
        uri += ":".concat(callbackId, "/").concat(method, "?").concat(params);
        return uri;
      }
      /**
       * 将长字符串转成数组
       * @param {String} uri 长参数字符串
       * @returns {Array} ejsLongArr 根据5000长度拆分的数组
       */
      function longStringToArr(uri) {
        var ejsLongArr = [];
        var n = 5000;
        for (var i = 0, l = uri.length; i < l / n; i += 1) {
          var a = uri.slice(n * i, n * (i + 1));
          ejsLongArr.push(a);
        }
        return ejsLongArr;
      }
      /**
       * 手动实现setItem
       * @param {Number} id 数字
       * @param {String} string 数据拆分后的字符串
       * @param {String} index 拆分序列
       * @returns {String} uir 单独调用存储api
       */
      function callSetItem(id, string, index) {
        var uir = '';
        if (hybrid.version > '4.0.3') {
          // 在小程序里传大数据参数,setItem原生无法正常获取,改用setLongCache
          uir = "EpointJSBridge://storage:".concat(id + 99, "/setLongCache?").concat(encodeURIComponent("{\"".concat(id, "-").concat(index, "\":\"").concat(string, "\"}")));
        } else {
          uir = "EpointJSBridge://storage:".concat(id + 99, "/setItem?{\"").concat(id, "-").concat(index, "\":\"").concat(string, "\"}");
        }
        return uir;
      }
      /**
       * JS调用原生方法前,会先send到这里进行处理
       * @param {String} proto 这个属于协议头的一部分
       * @param {JSON} message 调用的方法详情,包括方法名,参数
       * @param {Object} responseCallback 调用完方法后的回调,或者长期回调的id
       */
      function doSend(proto, message, responseCallback) {
        var newMessage = message;
        newMessage.funcitonCallbackId = [];
        // 递归处理api参数内函数参数
        handleFunOpt(newMessage, message.data, JSBridge);
        if (typeof responseCallback === 'function') {
          // 如果传入的回调时函数，需要给它生成id
          // 取到一个唯一的callbackid
          var callbackId = getCallbackId();
          // 回调函数添加到短期集合中
          JSBridge.responseCallbacks[callbackId] = responseCallback;
          // 方法的详情添加回调函数的关键标识
          newMessage.callbackId = callbackId;
          // 将函数参数与函数回调绑定
          if (newMessage.funcitonCallbackId.length > 0) {
            // 与api回调id存储在functionCallbacks中
            JSBridge.functionCallbacks[callbackId] = newMessage.funcitonCallbackId;
          }
        } else {
          // 如果传入时已经是id，代表已经在回调池中了，直接使用即可
          newMessage.callbackId = responseCallback;
        }
        // 获取 触发方法的url scheme
        var uri = getUri(proto, newMessage);
        if (os.ejs) {
          // 依赖于os判断
          if (os.ios) {
            // ios采用
            window.webkit.messageHandlers.WKWebViewJavascriptBridge.postMessage(uri);
          } else if (os.android && !os.harmonyOs && uri.length > 5000) {
            // 当安卓传入数据大于5000时，进行拆分
            var uriArr = longStringToArr(uri);
            var _callbackId = newMessage.callbackId;
            var callArr = [];
            uriArr.forEach(function (e, n) {
              var uriLong = callSetItem(_callbackId, e, n);
              // eslint-disable-next-line no-alert
              window.prompt(uriLong, '');
              callArr.push("".concat(_callbackId, "-").concat(n));
            });
            var newUri = "EpointJSBridge://veryLongString?{'storageKey':".concat(JSON.stringify(callArr), "}");
            // eslint-disable-next-line no-alert
            window.prompt(newUri, '');
          } else if (os.android) {
            // eslint-disable-next-line no-alert
            window.prompt(uri, '');
          } else {
            warn("\u5F53\u524Dejs\u73AF\u5883\u672A\u8BC6\u522B\u7CFB\u7EDF\u7C7B\u578B\uFF0C\u5BF9\u5E94ua:".concat(navigator.userAgent));
          }
        } else {
          // 浏览器
          warn("\u6D4F\u89C8\u5668\u4E2Djsbridge\u65E0\u6548,\u5BF9\u5E94scheme:".concat(uri));
        }
      }
      /**
       * 注册本地JS方法通过JSBridge给原生调用
       * 我们规定,原生必须通过JSBridge来调用H5的方法
       * 注意,这里一般对本地函数有一些要求,要求第一个参数是data,第二个参数是callback
       * @param {String} handlerName 方法名
       * @param {Function} handler 对应的方法
       */
      JSBridge.registerHandler = function registerHandler(handlerName, handler) {
        JSBridge.messageHandlers[handlerName] = handler;
      };
      /**
       * 注册长期回调到本地
       * @param {String} callbackId 回调id
       * @param {Function} callback 对应回调函数
       */
      JSBridge.registerLongCallback = function registerLongCallback(callbackId, callback) {
        JSBridge.responseCallbacksLongTerm[callbackId] = callback;
      };
      /**
       * 获得本地的长期回调，每一次都是一个唯一的值
       * @retrurn 返回对应的回调id
       * @return {Number} 返回长期回调id
       */
      JSBridge.getLongCallbackId = getLongCallbackId;
      /**
       * 调用原生开放的方法
       * @param {String} proto 这个属于协议头的一部分
       * @param {String} handlerName 方法名
       * @param {JSON} data 参数
       * @param {Object} callback 回调函数或者是长期的回调id
       */
      JSBridge.callHandler = function callHandler(proto, handlerName, data, callback) {
        doSend(proto, {
          handlerName: handlerName,
          data: data
        }, callback);
      };
      /**
       * 函数参数执行回调
       * @param {String} messageJSON 对应的方法的详情,需要手动转为json
       */
      // eslint-disable-next-line max-len
      JSBridge._handleParamCallbackMessageFromNative = function _handleParamCallbackMessageFromNative(messageJSON) {
        /**
         * 处理原生过来的方法
         */
        function doDispatchMessageFromNative() {
          var message;
          var bridge = window.JSBridge || JSBridge || {};
          if (!messageJSON) {
            showError(globalError.ERROR_TYPE_NATIVECALL.code, globalError.ERROR_TYPE_NATIVECALL.msg);
            return;
          }
          try {
            if (typeof messageJSON === 'string') {
              message = decodeURIComponent(messageJSON);
              message = JSON.parse(message);
            } else {
              message = messageJSON;
            }
          } catch (e) {
            showError(globalError.ERROR_TYPE_NATIVECALL.code, globalError.ERROR_TYPE_NATIVECALL.msg);
            return;
          }
          // 回调函数
          var responseId = message.responseId;
          var responseData = message.responseData;
          var responseCallback;
          if (responseId) {
            // 这里规定,原生执行方法完毕后准备通知h5执行回调时,回调函数id是responseId
            responseCallback = bridge.responseCallbacks[responseId];
            // 默认先短期再长期
            responseCallback = responseCallback || bridge.responseCallbacksLongTerm[responseId];
            // 执行本地的回调函数
            if (responseData && responseData.code === 1) {
              responseData.result && responseCallback && responseCallback(responseData.result);
            } else {
              console.error('原生返回的参数函数回调responseData');
              console.error(responseData);
            }
          } else {
            /**
             * 否则,代表原生主动执行h5本地的函数
             * 从本地注册的函数中获取
             */
            var handler = bridge.messageHandlers[message.handlerName];
            var data = message.data;
            if (handler) {
              // 执行本地函数,按照要求传入数据和回调
              handler(data);
            } else {
              showError(0, "\u672A\u5728\u672C\u5730\u627E\u5230".concat(message.handlerName, "\u65B9\u6CD5\u7684\u56DE\u8C03"));
            }
          }
        }
        setTimeout(doDispatchMessageFromNative);
      };
      /**
       * 原生调用H5页面注册的方法,或者调用回调方法
       * @param {String} messageJSON 对应的方法的详情,需要手动转为json
       */
      JSBridge._handleMessageFromNative = function _handleMessageFromNative(messageJSON) {
        /**
         * 处理原生过来的方法
         */
        function doDispatchMessageFromNative() {
          var message;
          var bridge = window.JSBridge || JSBridge || {};
          if (!messageJSON) {
            showError(globalError.ERROR_TYPE_NATIVECALL.code, globalError.ERROR_TYPE_NATIVECALL.msg);
            return;
          }
          try {
            if (typeof messageJSON === 'string') {
              message = decodeURIComponent(messageJSON);
              message = JSON.parse(message);
            } else {
              message = messageJSON;
            }
          } catch (e) {
            showError(globalError.ERROR_TYPE_NATIVECALL.code, globalError.ERROR_TYPE_NATIVECALL.msg);
            return;
          }
          // 回调函数
          var responseId = message.responseId;
          var responseData = message.responseData;
          var responseCallback;
          if (responseId) {
            // 这里规定,原生执行方法完毕后准备通知h5执行回调时,回调函数id是responseId
            responseCallback = bridge.responseCallbacks[responseId];
            // 默认先短期再长期
            responseCallback = responseCallback || bridge.responseCallbacksLongTerm[responseId];
            // 执行本地的回调函数
            responseCallback && responseCallback(responseData);
            // 删除api回调
            delete bridge.responseCallbacks[responseId];
            // 删除参数函数回调
            if (bridge.functionCallbacks[responseId]) {
              bridge.functionCallbacks[responseId].forEach(function (e) {
                delete bridge.responseCallbacks[e];
              });
            }
          } else {
            /**
             * 否则,代表原生主动执行h5本地的函数
             * 从本地注册的函数中获取
             */
            var handler = bridge.messageHandlers[message.handlerName];
            var data = message.data;
            if (handler) {
              // 执行本地函数,按照要求传入数据和回调
              handler(data);
            } else {
              showError(0, "\u672A\u5728\u672C\u5730\u627E\u5230".concat(message.handlerName, "\u65B9\u6CD5\u7684\u56DE\u8C03"));
            }
          }
        }
        // 使用异步
        setTimeout(doDispatchMessageFromNative);
      };
      // 用于给原生在iframe跨域情况下给ejs的回调信息
      // eslint-disable-next-line no-underscore-dangle
      JSBridge._handlePostMessage = function _handlePostMessage(messageJSON) {
        var message;
        try {
          if (typeof messageJSON === 'string') {
            message = decodeURIComponent(messageJSON);
            message = JSON.parse(message);
          } else {
            message = messageJSON;
          }
        } catch (e) {
          showError(globalError.ERROR_TYPE_NATIVECALL.code, globalError.ERROR_TYPE_NATIVECALL.msg);
          return;
        }
        // 给所有的iframe推送消息
        allIframePostMessage(message);
      };
      // 用于监听跨域iframe发送的执行内容
      window.addEventListener('message', function (e) {
        if (e.data && e.data.message) {
          var message = e.data.message;
          var iframeUuid = message.iframeUuid;
          if (iframeUuid === ejsIframeUuid) {
            var bridge = window.JSBridge || JSBridge || {};
            nativeActionCallback(bridge, message);
          } else {
            // 给所有的iframe推送消息
            allIframePostMessage(message);
          }
        }
      });
      window && document && document.addEventListener('DOMContentLoaded', function () {
        if (!hybridJs.os.ejs) {
          return;
        }
        hybridJs.event.dispatchEventToNative && hybridJs.event.dispatchEventToNative({
          key: 'DOMContentLoaded'
        });
      });
      /**
       * 注册接收原生的错误信息
       */
      JSBridge.registerHandler('handleError', function (data) {
        showError(globalError.ERROR_TYPE_NATIVE.code, JSON.stringify(data));
      });
    }

    /**
     * h5和原生交互，jsbridge核心代码
     * 依赖于showError，globalError，os
     * @param {Object} hybrid hybrid对象
     */
    function jsbridgeMixin$1(hybrid) {
      var hybridJs = hybrid;
      var JSBridge = hybridJs.JSBridge || {};
      // 声明依赖
      var showError = hybridJs.showError;
      var globalError = hybridJs.globalError;
      var os = hybridJs.os;
      hybridJs.JSBridge = JSBridge;
      // 本地注册的方法集合,原生只能调用本地注册的方法,否则会提示错误
      if (!JSBridge.messageHandlers) {
        JSBridge.messageHandlers = {};
      }
      // 短期回调函数集合
      // 在原生调用完对应的方法后,会执行对应的回调函数id，并删除
      if (!JSBridge.responseCallbacks) {
        JSBridge.responseCallbacks = {};
      }
      // 长期存在的回调，调用后不会删除
      if (!JSBridge.responseCallbacksLongTerm) {
        JSBridge.responseCallbacksLongTerm = {};
      }
      if (!JSBridge.functionCallbacks) {
        JSBridge.functionCallbacks = {};
      }
      /**
       * 获取最终的url scheme
       * @param {String} proto 协议头，一般不同模块会有不同的协议头
       * @param {Object} message 兼容android中的做法
       * android中由于原生不能获取JS函数的返回值,所以得通过协议传输
       * @return {String} 返回拼接后的uri
       */
      function getUri(proto, message) {
        var uri = "".concat(CUSTOM_PROTOCOL_SCHEME, "://").concat(proto);
        // 回调id作为端口存在
        var callbackId;
        var method;
        var params;
        if (message.callbackId) {
          // 必须有回调id才能生成一个scheme
          // 这种情况是H5主动调用native时
          callbackId = message.callbackId;
          method = message.handlerName;
          params = message.data;
        }
        // 参数转为字符串
        params = encodeURIComponent(getParam(params));
        // uri 补充,需要编码，防止非法字符
        uri += ":".concat(callbackId, "/").concat(method, "?").concat(params);
        return uri;
      }
      /**
       * JS调用原生方法前,会先send到这里进行处理
       * @param {String} proto 这个属于协议头的一部分
       * @param {JSON} message 调用的方法详情,包括方法名,参数
       * @param {Object} responseCallback 调用完方法后的回调,或者长期回调的id
       */
      function doSend(proto, message, responseCallback) {
        var newMessage = message;
        newMessage.funcitonCallbackId = [];
        // 递归处理api参数内函数参数
        handleFunOpt(newMessage, message.data, JSBridge);
        if (typeof responseCallback === 'function') {
          // 如果传入的回调时函数，需要给它生成id
          // 取到一个唯一的callbackid
          var callbackId = getCallbackId();
          // 回调函数添加到短期集合中
          JSBridge.responseCallbacks[callbackId] = responseCallback;
          // 方法的详情添加回调函数的关键标识
          newMessage.callbackId = callbackId;
          // 将函数参数与函数回调绑定
          if (newMessage.funcitonCallbackId.length > 0) {
            // 与api回调id存储在functionCallbacks中
            JSBridge.functionCallbacks[callbackId] = newMessage.funcitonCallbackId;
          }
        } else {
          // 如果传入时已经是id，代表已经在回调池中了，直接使用即可
          newMessage.callbackId = responseCallback;
        }
        // 获取 触发方法的url scheme
        var uri = getUri(proto, newMessage);
        if (os.ejs && os.weex) {
          // 依赖于os判断
          weex.requireModule('ejs').postMessage(uri, function () {
            console.log('success');
          });
        } else {
          // 浏览器
          warn("\u6D4F\u89C8\u5668\u4E2Djsbridge\u65E0\u6548,\u5BF9\u5E94scheme:".concat(uri));
        }
      }
      /**
       * 注册本地JS方法通过JSBridge给原生调用
       * 我们规定,原生必须通过JSBridge来调用H5的方法
       * 注意,这里一般对本地函数有一些要求,要求第一个参数是data,第二个参数是callback
       * @param {String} handlerName 方法名
       * @param {Function} handler 对应的方法
       */
      JSBridge.registerHandler = function registerHandler(handlerName, handler) {
        JSBridge.messageHandlers[handlerName] = handler;
      };
      /**
       * 注册长期回调到本地
       * @param {String} callbackId 回调id
       * @param {Function} callback 对应回调函数
       */
      JSBridge.registerLongCallback = function registerLongCallback(callbackId, callback) {
        JSBridge.responseCallbacksLongTerm[callbackId] = callback;
      };
      /**
       * 获得本地的长期回调，每一次都是一个唯一的值
       * @retrurn 返回对应的回调id
       * @return {Number} 返回长期回调id
       */
      JSBridge.getLongCallbackId = getLongCallbackId;
      /**
       * 调用原生开放的方法
       * @param {String} proto 这个属于协议头的一部分
       * @param {String} handlerName 方法名
       * @param {JSON} data 参数
       * @param {Object} callback 回调函数或者是长期的回调id
       */
      JSBridge.callHandler = function callHandler(proto, handlerName, data, callback) {
        doSend(proto, {
          handlerName: handlerName,
          data: data
        }, callback);
      };
      /**
       * 注册接收原生的错误信息
       */
      JSBridge.registerHandler('handleError', function (data) {
        showError(globalError.ERROR_TYPE_NATIVE.code, JSON.stringify(data));
      });
      /**
       * 获取长监听数据回调
       *
       */
      weex.requireModule('globalEvent').addEventListener('onJSAPIResponse', function (rlt) {
        var responseId = rlt.responseId || '';
        var responseData = rlt.responseData;
        var responseCallback;
        var isLongCb = false;
        if (responseId.length > 0) {
          // 这里规定,原生执行方法完毕后准备通知h5执行回调时,回调函数id是responseId
          responseCallback = JSBridge.responseCallbacks[responseId];
          if (!responseCallback) {
            responseCallback = JSBridge.responseCallbacksLongTerm[responseId];
            isLongCb = true;
          }
          // 执行本地的回调函数
          responseCallback && responseCallback(responseData);
          // 执行完 删除短期回调
          if (!isLongCb) {
            delete JSBridge.responseCallbacks[responseId];
          }
        }
      });
    }

    /**
     * h5和原生交互，jsbridge核心代码
     * 依赖于showError，globalError，os
     * @param {Object} hybrid hybrid对象
     */
    function jsbridgeMixin(hybrid) {
      var hybridJs = hybrid;
      if (hybridJs.os.weex) {
        jsbridgeMixin$1(hybridJs);
      } else {
        jsbridgeMixin$2(hybridJs);
      }
    }

    /**
     * 内部触发jsbridge的方式，作为一个工具类提供
     * @param {Object} JSBridge JSBridge对象
     * @return {Object} callJsBridge
     */
    function generateJSBridgeTrigger(JSBridge) {
      /**
       * 有三大类型，短期回调，延时回调，长期回调，其中长期回调中又有一个event比较特殊
       * @param {JSON} options 配置参数，包括
       * handlerName 方法名
       * data 额外参数
       * isLongCb 是否是长期回调，如果是，则会生成一个长期回调id，以长期回调的形式存在
       * proto 对应方法的模块名
       * 其它 代表相应的头部
       * @param {Function} resolve promise中成功回调函数
       * @param {Function} reject promise中失败回调函数
       */
      return function callJsBridge(options, resolve, reject) {
        var success = options.success;
        var error = options.error;
        var dataFilter = options.dataFilter;
        var proto = options.proto;
        var handlerName = options.handlerName;
        var isLongCb = options.isLongCb;
        var isEvent = options.isEvent;
        var data = options.data;
        // 统一的回调处理
        var cbFunc = function cbFunc(res) {
          if (!res) {
            error && error('原生未正常传参');
            reject && reject('原生未正常传参');
            return;
          }
          if (Number(res.code) === 0) {
            error && error(res);
            // 长期回调不走promise
            !isLongCb && reject && reject(res);
          } else {
            var finalRes = res;
            if (dataFilter) {
              finalRes = dataFilter(finalRes);
            }
            // 提取出result
            success && success(finalRes.result);
            !isLongCb && resolve && resolve(finalRes.result);
          }
        };
        if (isLongCb) {
          /**
           * 长期回调的做法，需要注册一个长期回调id,每一个方法都有一个固定的长期回调id
           * 短期回调的做法(短期回调执行一次后会自动销毁)
           * 但长期回调不会销毁，因此可以持续触发，例如下拉刷新
           * 长期回调id通过函数自动生成，每次会获取一个唯一的id
           */
          var longCbId = JSBridge.getLongCallbackId();
          if (isEvent) {
            // 如果是event，data里需要增加一个参数
            data.port = longCbId;
          }
          JSBridge.registerLongCallback(longCbId, cbFunc);
          // 传入的是id
          JSBridge.callHandler(proto, handlerName, data, longCbId);
          // 长期回调默认就成功了，这是兼容的情况，防止有人误用
          resolve && resolve();
        } else {
          // 短期回调直接使用方法
          JSBridge.callHandler(proto, handlerName, data, cbFunc);
        }
      };
    }

    // 如果api没有runcode，应该有一个默认的实现
    function callinnerMixin(hybrid) {
      var hybridJs = hybrid;
      var os = hybridJs.os;
      var JSBridge = hybridJs.JSBridge;
      var callJsBridge = generateJSBridgeTrigger(JSBridge);
      /**
       * 专门供API内部调用的，this指针被指向了proxy对象，方便处理
       * @param {Object} options 配置参数
       * @param {Function} resolve promise的成功回调
       * @param {Function} reject promise的失败回调
       */
      function callInner(options, resolve, reject) {
        var data = extend({}, options);
        // 纯数据不需要回调
        data.success = undefined;
        data.error = undefined;
        data.dataFilter = undefined;
        if (os.ejs) {
          // 默认ejs环境才触发jsbridge
          callJsBridge({
            handlerName: this.api.namespace,
            data: data,
            proto: this.api.moduleName,
            success: options.success,
            error: options.error,
            dataFilter: options.dataFilter,
            isLongCb: this.api.isLongCb,
            isEvent: this.api.isEvent
          }, resolve, reject);
        }
      }
      hybridJs.callInner = callInner;
    }

    /**
     * 定义如何调用一个API
     * 一般指调用原生环境下的API
     * 依赖于Promise,calljsbridgeMixin
     * @param {Object} hybrid hybrid
     */
    function callnativeapiMixin(hybrid) {
      var hybridJs = hybrid;
      var JSBridge = hybridJs.JSBridge;
      // 只有在 JSBridge 存在时才创建 callJsBridge
      var callJsBridge = JSBridge ? generateJSBridgeTrigger(JSBridge) : null;
      var os = hybridJs.os;
      /**
       * 调用自定义API
       * @param {Object} options 配置参数
       * @return {Object} 返回一个Promise对象，如果没有Promise环境，直接返回运行结果
       */
      function callApi(options) {
        // 实时获取promise
        var Promise = hybridJs.getPromise();
        var finalOptions = options || {};
        var callback = function callback(resolve, reject) {
          // 1. 如果是 EJS 原生环境，直接走 callJsBridge（与历史行为一致）
          if (os.ejs) {
            var appVersion = finalOptions.appVersion;
            var callInner = function callInner() {
              callJsBridge({
                handlerName: finalOptions.name,
                proto: finalOptions.mudule,
                data: finalOptions.data || {},
                success: finalOptions.success,
                error: finalOptions.error,
                isLongCb: finalOptions.isLongCb,
                isEvent: finalOptions.isEvent
              }, resolve, reject);
            };
            if (appVersion) {
              // 若传了容器版本，需要进行比较
              hybridJs.runtime.getAppVersion({
                success: function success(result) {
                  if (result.version && compareVersion(result.version, appVersion) >= 0) {
                    // 若容器版本大于传进来的最低版本
                    callInner();
                  } else {
                    var msg = "".concat(finalOptions.name, "\u8981\u6C42\u7684\u5BB9\u5668\u7248\u672C\u81F3\u5C11\u4E3A:").concat(appVersion, "\uFF0C\u5F53\u524D\u5BB9\u5668\u7248\u672C\uFF1A").concat(result.version, "\uFF0C\u8BF7\u5347\u7EA7");
                    hybridJs.showError(hybridJs.globalError.ERROR_TYPE_APINEEDHIGHNATIVEVERSION.code, msg);
                  }
                },
                error: function error(_error) {
                  console.error(_error);
                }
              });
            } else {
              callInner();
            }
            if (!resolve && !reject) {
              return Promise && Promise.resolve();
            }
            return;
          }
          // 2. 非 EJS 原生环境，复用 Proxy.walk() 机制调用 extendModule 注册的 API
          var moduleName = finalOptions.mudule;
          var apiName = finalOptions.name;
          var proxyApi = hybridJs._getProxyApi ? hybridJs._getProxyApi(moduleName, apiName) : null;
          if (!proxyApi) {
            // 未找到注册的 API，返回错误
            var error = {
              code: hybridJs.globalError.ERROR_TYPE_APINOTEXIST.code,
              msg: "\u975EEJS\u73AF\u5883\u4E0B\u9700\u8981\u5148\u901A\u8FC7 extendModule \u6CE8\u518C API: ".concat(moduleName, ".").concat(apiName)
            };
            hybridJs.showError(error.code, error.msg);
            if (finalOptions.error) {
              finalOptions.error(error);
            }
            if (reject) {
              reject(error);
            }
            return;
          }
          // 复用 _getNameSpaceApi 获取对应端的 Proxy 对象
          var proxyObj = hybridJs._getNameSpaceApi ? hybridJs._getNameSpaceApi(proxyApi, os) : null;
          if (!proxyObj) {
            // 当前环境不支持该 API
            var _error2 = {
              code: hybridJs.globalError.ERROR_TYPE_APIOS.code,
              msg: "API ".concat(moduleName, ".").concat(apiName, " \u65E0\u6CD5\u5728\u5F53\u524DOS\u4E0B\u8FD0\u884C")
            };
            hybridJs.showError(_error2.code, _error2.msg);
            if (finalOptions.error) {
              finalOptions.error(_error2);
            }
            if (reject) {
              reject(_error2);
            }
            return;
          }
          // 复用 Proxy.walk() 返回的函数，自动支持：
          // - 默认参数合并
          // - h5UI 切换
          // - 拦截器（invoke、success、error）
          // - Promise 支持
          var proxyFn = proxyObj.walk(hybridJs);
          // 构建调用参数，将 data、success、error 合并
          var callOptions = _objectSpread2(_objectSpread2({}, finalOptions.data), {}, {
            success: finalOptions.success,
            error: finalOptions.error
          });
          // 支持 h5UI 参数
          if (finalOptions.h5UI) {
            callOptions.h5UI = finalOptions.h5UI;
          }
          // 支持长期回调参数
          if (finalOptions.isLongCb) {
            callOptions.isLongCb = finalOptions.isLongCb;
          }
          // 支持事件参数
          if (finalOptions.isEvent) {
            callOptions.isEvent = finalOptions.isEvent;
          }
          // 调用代理函数，传入 resolve 和 reject
          return proxyFn(callOptions, resolve, reject);
        };
        return Promise && new Promise(callback) || callback();
      }
      hybridJs.callApi = callApi;
      hybridJs.callNativeApi = callApi;
    }

    var hybridJs = window.ejs;
    // 依赖于showError，globalError，os
    jsbridgeMixin(hybridJs);
    // api没有runcode时的默认实现，依赖于jsbridge与os
    callinnerMixin(hybridJs);
    // 依赖于JSBridge，Promise,jsbridge
    callnativeapiMixin(hybridJs);
    uiMixin(hybridJs);
    authMixin(hybridJs);
    runtimeMixin(hybridJs);
    deviceMixin(hybridJs);
    eventMixin(hybridJs);
    storageMixin(hybridJs);
    pageMixin(hybridJs);
    navigatorMixin(hybridJs);
    utilMixin(hybridJs);
    streamMixin(hybridJs);
    contactMixin(hybridJs);
    audioMixin(hybridJs);
    ioMixin(hybridJs);
    miniH5Mixin(hybridJs);
    basicCardMixin(hybridJs);

}));
