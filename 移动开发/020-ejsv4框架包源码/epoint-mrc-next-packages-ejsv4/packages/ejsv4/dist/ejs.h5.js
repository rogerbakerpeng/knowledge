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
      os: ['h5'],
      defaultParams: {
        message: ''
      },
      runCode: function runCode() {
        for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
          rest[_key] = arguments[_key];
        }
        // 兼容字符串形式
        var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'message');
        var options = args[0];
        var resolve = args[1];
        options.message = $t(options.message) || String(args[0].message);
        vant.Toast(options.message);
        options.success && options.success();
        resolve && resolve();
      }
    }, {
      namespace: 'showDebugDialog',
      os: ['h5'],
      defaultParams: {
        debugInfo: ''
      },
      runCode: function runCode() {
        for (var _len2 = arguments.length, rest = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          rest[_key2] = arguments[_key2];
        }
        // 兼容字符串形式
        var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'debugInfo');
        args[0] = {
          title: '',
          message: args[0].debugInfo,
          buttonName: '确定',
          success: args[0].success
        };
        hybridJs.ui.alert.apply(this, args);
      }
    }, {
      namespace: 'alert',
      os: ['h5'],
      defaultParams: {
        title: '',
        message: '',
        buttonName: '确定',
        // 默认可取消
        cancelable: 1
      },
      runCode: function runCode() {
        for (var _len3 = arguments.length, rest = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          rest[_key3] = arguments[_key3];
        }
        // 兼容字符串形式
        var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'message', 'title', 'buttonName');
        var options = args[0];
        options.title = String(options.title);
        options.message = String(options.message);
        options.buttonName = String(options.buttonName || '确定');
        options.buttonName = $t(options.buttonName);
        options.title = $t(options.title);
        options.message = $t(options.message);
        uiVue(args, 'alert', hybridJs.os);
      }
    }, {
      namespace: 'confirm',
      os: ['h5'],
      defaultParams: {
        // 这是默认参数，API的每一个参数都应该有一个默认值
        title: '',
        message: '',
        buttonLabels: ['取消', '确定'],
        cancelable: 1
      },
      runCode: function runCode() {
        for (var _len4 = arguments.length, rest = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          rest[_key4] = arguments[_key4];
        }
        // 兼容字符串形式
        var args = rest;
        var options = args[0];
        options.buttonLabels = options.buttonLabels.map(function (ele) {
          return $t(ele);
        });
        options.title = $t(options.title);
        options.message = $t(options.message);
        uiVue(args, 'confirm', hybridJs.os);
      }
    }, {
      namespace: 'prompt',
      os: ['h5'],
      defaultParams: {
        title: '',
        hint: '',
        text: '',
        lines: 1,
        cancelable: 1,
        maxLength: 10000,
        buttonLabels: ['取消', '确定']
      },
      runCode: function runCode() {
        for (var _len5 = arguments.length, rest = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          rest[_key5] = arguments[_key5];
        }
        // 兼容字符串形式
        var args = rest;
        var options = args[0];
        options.buttonLabels = options.buttonLabels.map(function (ele) {
          return $t(ele);
        });
        options.title = $t(options.title);
        options.hint = $t(options.hint);
        options.text = $t(options.text);
        uiVue(args, 'prompt', hybridJs.os);
      }
    }, {
      namespace: 'actionSheet',
      os: ['h5'],
      defaultParams: {
        cancelable: 1,
        items: []
      },
      runCode: function runCode() {
        for (var _len6 = arguments.length, rest = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
          rest[_key6] = arguments[_key6];
        }
        // 兼容字符串形式
        var args = rest;
        var options = args[0];
        options.items = options.items.map(function (ele) {
          return $t(ele);
        });
        uiVue(args, 'actionSheet', hybridJs.os);
      }
    }, {
      namespace: 'pickDate',
      os: ['h5'],
      defaultParams: {
        // h5中的开始年份
        minDate: '',
        // h5中的结束年份
        maxDate: '',
        // 默认为空为使用当前时间
        // 格式为 yyyy-MM-dd。
        datetime: '',
        title: '选择日期'
      },
      runCode: function runCode() {
        for (var _len7 = arguments.length, rest = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
          rest[_key7] = arguments[_key7];
        }
        // 兼容字符串形式
        var args = rest;
        var options = args[0];
        options.title = $t(options.title);
        uiVue(args, 'pickDate', hybridJs.os);
      }
    }, {
      namespace: 'pickTime',
      os: ['h5'],
      defaultParams: {
        // 默认为空为使用当前时间
        // 格式为 hh:mm。
        datetime: '',
        title: '选择时间',
        minHour: 0,
        maxHour: 23,
        minMinute: 0,
        maxMinute: 59
      },
      runCode: function runCode() {
        for (var _len8 = arguments.length, rest = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
          rest[_key8] = arguments[_key8];
        }
        // 兼容字符串形式
        var args = rest;
        var options = args[0];
        options.title = $t(options.title);
        uiVue(args, 'pickTime', hybridJs.os);
      }
    }, {
      namespace: 'pickDateTime',
      os: ['h5'],
      defaultParams: {
        // 默认为空为使用当前时间
        // 格式为 yyyy-MM-dd hh:mm。
        datetime: '',
        // h5中的开始年份
        minDate: '',
        // h5中的结束年份
        maxDate: '',
        showSecond: false,
        title: '选择日期时间'
      },
      runCode: function runCode() {
        for (var _len9 = arguments.length, rest = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
          rest[_key9] = arguments[_key9];
        }
        // 兼容字符串形式
        var args = rest;
        var options = args[0];
        options.title = $t(options.title);
        uiVue(args, 'pickDateTime', hybridJs.os);
      }
    }, {
      namespace: 'pickMonth',
      os: ['h5'],
      defaultParams: {
        // 默认为空为使用当前时间
        // 格式为 yyyy-MM
        datetime: '',
        // h5中的开始年份
        minDate: '',
        // h5中的结束年份
        maxDate: '',
        title: '选择年月'
      },
      runCode: function runCode() {
        for (var _len0 = arguments.length, rest = new Array(_len0), _key0 = 0; _key0 < _len0; _key0++) {
          rest[_key0] = arguments[_key0];
        }
        // 兼容字符串形式
        var args = rest;
        var options = args[0];
        options.title = $t(options.title);
        uiVue(args, 'pickMonth', hybridJs.os);
      }
    }, {
      namespace: 'popPicker',
      os: ['h5'],
      defaultParams: {
        // 层级，默认为1
        layer: 1,
        data: []
      },
      runCode: function runCode() {
        for (var _len1 = arguments.length, rest = new Array(_len1), _key1 = 0; _key1 < _len1; _key1++) {
          rest[_key1] = arguments[_key1];
        }
        // 兼容字符串形式
        var args = rest;
        var options = args[0];
        options.data = options.data.map(function (ele) {
          var res = ele;
          res.text = $t(res.text);
          if (res.children && res.children.length) {
            res.children = res.children.map(function (item) {
              var res2 = item;
              res2.text = $t(res2.text);
              if (res2.children && res2.children.length) {
                res2.children = res2.children.map(function (element) {
                  var res3 = element;
                  res3.text = $t(element.text);
                  return res3;
                });
              }
              return res2;
            });
          }
          return res;
        });
        uiVue(args, 'popPicker', hybridJs.os);
      }
    }, {
      namespace: 'showWaiting',
      os: ['h5'],
      defaultParams: {
        message: '加载中...',
        padlock: true
      },
      runCode: function runCode() {
        for (var _len10 = arguments.length, rest = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
          rest[_key10] = arguments[_key10];
        }
        // 兼容字符串形式
        var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'message');
        var options = args[0];
        options.message = String(options.message);
        options.message = $t(options.message);
        uiVue(args, 'showWaiting', hybridJs.os);
      }
    }, {
      namespace: 'closeWaiting',
      os: ['h5'],
      runCode: function runCode() {
        for (var _len11 = arguments.length, rest = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
          rest[_key11] = arguments[_key11];
        }
        // 兼容字符串形式
        var args = rest;
        var options = args[0];
        var resolve = args[1];
        setTimeout(function () {
          if (Vue && Vue.prototype.$ejsUI) {
            Vue.prototype.$ejsUI.$nextTick(function () {
              Vue.prototype.$ejsUI.showWaiting.show = false;
            });
          }
          options.success && options.success();
          resolve && resolve();
        }, 300);
      }
    }, {
      namespace: 'select',
      os: ['h5'],
      defaultParams: {
        title: '',
        items: [],
        choiceState: [],
        // 由以前的true和false替换为了1和0
        isMultiSelect: 0,
        // 样式类型，默认为0。 0：单列表样式；1：九宫格样式(目前只支持单选)
        type: 0,
        columns: 2,
        // 多选时是否展示全选
        isShowSelectAll: 0,
        // 可取消
        cancelable: 1
      },
      runCode: function runCode() {
        for (var _len12 = arguments.length, rest = new Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
          rest[_key12] = arguments[_key12];
        }
        // 兼容字符串形式
        var args = rest;
        var options = args[0];
        options.title = $t(options.title);
        options.items = options.items.map(function (item) {
          return $t(item);
        });
        uiVue(args, 'select', hybridJs.os);
      }
    }]);
  }

  function onlyH5Page(hybrid) {
    var hybridJs = hybrid;
    hybridJs.extendModule('page', [{
      namespace: 'reload',
      os: ['h5'],
      runCode: function runCode() {
        window.location.reload();
      }
    }]);
  }

  // 该H5模块主要用于M7框架，所以useRouter全都默认为false
  function pageMixin(hybrid) {
    var hybridJs = hybrid;
    var innerUtil = hybridJs.innerUtil;
    onlyH5Page(hybridJs);
    hybridJs.extendModule('page', [{
      namespace: 'open',
      os: ['h5'],
      defaultParams: {
        pageUrl: '',
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
        // 政务微信环境下，统一去掉.html后缀
        if (hybridJs.os.wxWorkLocal) {
          options.pageUrl = options.pageUrl.replace(/.html/, '');
        }
        if (window.vm && window.vm.$router && (options.useRouter || options.useRouter === 'auto') && !/^(http|https)/.test(options.pageUrl)) {
          options.pageUrl = innerUtil.getFullUrlByParams(options.pageUrl, options.data, true);
          window.vm.$router.push(options.pageUrl);
        } else {
          // 将额外数据拼接到url中
          options.pageUrl = innerUtil.getFullUrlByParams(options.pageUrl, options.data);
          // 普通
          window.location.href = options.pageUrl;
        }
      }
    }, {
      namespace: 'close',
      os: ['h5'],
      defaultParams: {
        popPageNumber: 1,
        useRouter: false
      },
      runCode: function runCode() {
        for (var _len2 = arguments.length, rest = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          rest[_key2] = arguments[_key2];
        }
        var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'resultData');
        var options = args[0];
        var resolve = args[1];
        var popPageNumber = -options.popPageNumber;
        if (window.vm && window.vm.$router && options.useRouter && options.useRouter !== 'auto') {
          window.vm.$router.go(popPageNumber);
          return;
        }
        // 浏览器退出
        if (window.history.length > 1) {
          window.history.go(popPageNumber);
          options.success && options.success();
          resolve && resolve();
        }
      }
    }, {
      namespace: 'replace',
      os: ['h5'],
      defaultParams: {
        url: '',
        useRouter: false
      },
      runCode: function runCode() {
        for (var _len3 = arguments.length, rest = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          rest[_key3] = arguments[_key3];
        }
        // 兼容字符串形式
        var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'url');
        var options = args[0];
        if (window.vm && window.vm.$router && options.useRouter && options.useRouter !== 'auto' && !/^(http|https)/.test(options.url)) {
          window.vm.$router.replace(options.url);
          return;
        }
        // 将额外数据拼接到url中
        options.url = innerUtil.getFullPath(options.url);
        window.location.replace(options.url);
      }
    }]);
  }

  function storageMixin(hybrid) {
    var hybridJs = hybrid;
    var innerUtil = hybridJs.innerUtil;
    hybridJs.extendModule('storage', [{
      namespace: 'getItem',
      os: ['h5'],
      defaultParams: {
        // 对应的key
        key: ''
      },
      runCode: function runCode(params, resolve, reject) {
        var options = params;
        var success = options.success;
        var error = options.error;
        if (!innerUtil.isObject(options.key)) {
          options.key = [options.key];
        }
        var keys = options.key;
        var values = {};
        try {
          for (var i = 0, len = keys.length; i < len; i += 1) {
            var value = localStorage.getItem(keys[i]);
            values[keys[i]] = value;
          }
        } catch (msg) {
          var err = {
            code: 0,
            msg: "localStorage\u83B7\u53D6\u503C\u51FA\u9519:".concat(JSON.stringify(keys)),
            result: msg
          };
          error && error(err);
          reject && reject(err);
          return;
        }
        success && success(values);
        resolve && resolve(values);
      }
    }, {
      namespace: 'setItem',
      os: ['h5'],
      runCode: function runCode(params, resolve, reject) {
        var options = params;
        var success = options.success;
        var error = options.error;
        try {
          Object.keys(options).forEach(function (key) {
            if (key !== 'success' && key !== 'error') {
              var value = options[key];
              localStorage.setItem(key, value);
            }
          });
        } catch (msg) {
          var errorMsg = '';
          if (msg.name === 'QuotaExceededError') {
            errorMsg = '超出本地存储限额，建议先清除一些无用空间!';
          } else {
            errorMsg = 'localStorage存储值出错';
          }
          var err = {
            code: 0,
            msg: errorMsg,
            result: msg
          };
          error && error(err);
          reject && reject(err);
          return;
        }
        success && success({});
        resolve && resolve({});
      }
    }, {
      namespace: 'removeItem',
      os: ['h5'],
      defaultParams: {
        // 对应的key
        key: ''
      },
      runCode: function runCode(params, resolve, reject) {
        var options = params;
        var success = options.success;
        var error = options.error;
        if (!innerUtil.isObject(options.key)) {
          options.key = [options.key];
        }
        var keys = options.key;
        try {
          for (var i = 0, len = keys.length; i < len; i += 1) {
            localStorage.removeItem(keys[i]);
          }
        } catch (msg) {
          var err = {
            code: 0,
            msg: "localStorage\u79FB\u9664\u503C\u51FA\u9519:".concat(JSON.stringify(keys)),
            result: msg
          };
          error && error(err);
          reject && reject(err);
          return;
        }
        success && success({});
        resolve && resolve({});
      }
    }, {
      namespace: 'getShareItem',
      os: ['h5'],
      defaultParams: {
        // 对应的key
        key: ''
      },
      runCode: function runCode(params, resolve, reject) {
        var options = params;
        hybridJs.storage.getItem.apply(this, [options]);
      }
    }, {
      namespace: 'setShareItem',
      os: ['h5'],
      runCode: function runCode(params, resolve, reject) {
        var options = params;
        hybridJs.storage.setItem.apply(this, [options]);
      }
    }, {
      namespace: 'removeShareItem',
      os: ['h5'],
      runCode: function runCode(params, resolve, reject) {
        var options = params;
        hybridJs.storage.removeItem.apply(this, [options]);
      }
    }]);
  }

  function onlyH5Device(hybrid) {
    var hybridJs = hybrid;
    var innerUtil = hybridJs.innerUtil;
    hybridJs.extendModule('device', [{
      namespace: 'sendMsg',
      os: ['h5'],
      defaultParams: {
        phoneNum: '',
        message: ''
      },
      runCode: function runCode() {
        for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
          rest[_key] = arguments[_key];
        }
        // 兼容字符串形式
        var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'phoneNum', 'message');
        var phoneNum = args[0].phoneNum;
        var message = args[0].message;
        window.location.href = "sms:".concat(phoneNum, "?body=").concat(message);
      }
    }, {
      namespace: 'sendMail',
      os: ['h5'],
      defaultParams: {
        mail: '',
        subject: '',
        cc: ''
      },
      runCode: function runCode() {
        for (var _len2 = arguments.length, rest = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          rest[_key2] = arguments[_key2];
        }
        // 兼容字符串形式
        var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'mail', 'subject', 'cc');
        var mail = args[0].mail;
        var subject = args[0].subject;
        var cc = args[0].cc;
        window.location.href = "mailto:".concat(mail, "?subject=").concat(subject, "&cc=").concat(cc);
      }
    }]);
  }

  function deviceMixin(hybrid) {
    var hybridJs = hybrid;
    var innerUtil = hybridJs.innerUtil;
    onlyH5Device(hybridJs);
    hybridJs.extendModule('device', [{
      namespace: 'callPhone',
      os: ['h5'],
      defaultParams: {
        phoneNum: ''
      },
      runCode: function runCode() {
        for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
          rest[_key] = arguments[_key];
        }
        // 兼容字符串形式
        var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'phoneNum');
        var phoneNum = args[0].phoneNum;
        window.location.href = "tel:".concat(phoneNum);
      }
    }]);
  }

  function encrypt(params, resolve, reject) {
    var options = params;
    var success = options.success;
    var error = options.error;
    if (!options.text) {
      var err = {
        code: 0,
        msg: '需要加密的字符串不存在'
      };
      error && error(err);
      reject && reject(err);
      return;
    }
    if (options.type === '0') {
      var _result = {
        text: options.text
      };
      success && success(_result);
      resolve && resolve(_result);
      return;
    }
    if (!options.keys || options.keys.length !== 2) {
      var _err = {
        code: 0,
        msg: 'H5encrypt加密需要正确传参keys数组'
      };
      error && error(_err);
      reject && reject(_err);
      return;
    }
    var key = options.keys[0];
    var iv = options.keys[1];
    var message = options.text;
    var result;
    try {
      var ciphertext = CryptoJS.AES.encrypt(message, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      var encryptText = CryptoJS.enc.Base64.stringify(ciphertext.ciphertext);
      result = {
        text: encryptText
      };
    } catch (msg) {
      var errorMsg = 'CryptoJS加密失败，H5加密需要引入aes.js文件库';
      var _err2 = {
        code: 0,
        msg: errorMsg,
        result: msg
      };
      error && error(_err2);
      reject && reject(_err2);
      return;
    }
    success && success(result);
    resolve && resolve(result);
  }

  function utilMixin(hybrid) {
    var hybridJs = hybrid;
    hybridJs.extendModule('util', [{
      namespace: 'encrypt',
      os: ['h5'],
      defaultParams: {
        type: '1',
        keys: [],
        text: ''
      },
      runCode: function runCode(params, resolve, reject) {
        encrypt(params, resolve, reject);
      }
    }]);
  }

  function contactMixin(hybrid) {
    var hybridJs = hybrid;
    // contact是底层用的openLocal
    hybridJs.extendModule('contact', [{
      namespace: 'select',
      os: ['h5'],
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
        for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
          rest[_key] = arguments[_key];
        }
        // 兼容字符串形式
        var args = rest;
        var options = args[0];
        var resolve = args[1];
        var reject = args[2];
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
      }
    }]);
  }

  var hybridJs = window.ejs;
  uiMixin(hybridJs);
  pageMixin(hybridJs);
  storageMixin(hybridJs);
  deviceMixin(hybridJs);
  utilMixin(hybridJs);
  contactMixin(hybridJs);

}));
