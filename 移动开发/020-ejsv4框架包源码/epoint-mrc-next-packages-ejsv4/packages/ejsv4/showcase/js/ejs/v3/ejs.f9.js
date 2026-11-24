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

/**
 * 普通消息框模块、
 * 包括:alert,confirm,prompt
 * 基于mui.css
 */

var CLASS_POPUP = 'mui-popup';
var CLASS_POPUP_BACKDROP = 'mui-popup-backdrop';
var CLASS_POPUP_IN = 'mui-popup-in';
var CLASS_POPUP_OUT = 'mui-popup-out';
var CLASS_POPUP_INNER = 'mui-popup-inner';
var CLASS_POPUP_TITLE = 'mui-popup-title';
var CLASS_POPUP_TEXT = 'mui-popup-text';
var CLASS_POPUP_INPUT = 'mui-popup-input';
var CLASS_POPUP_BUTTONS = 'mui-popup-buttons';
var CLASS_POPUP_BUTTON = 'mui-popup-button';
var CLASS_POPUP_BUTTON_BOLD = 'mui-popup-button-bold';
var CLASS_ACTIVE = 'mui-active';

var popupStack = [];
var backdrop = function () {
    var element = document.createElement('div');

    element.classList.add(CLASS_POPUP_BACKDROP);
    element.addEventListener('webkitTransitionEnd', function () {
        if (!element.classList.contains(CLASS_ACTIVE)) {
            element.parentNode && element.parentNode.removeChild(element);
        }
    });

    return element;
}();
var createInput = function createInput(placeholder, hint) {
    var inputHtml = '<input type="text" autofocus placeholder="' + (placeholder || '') + '" value="' + (hint || '') + '"/>';

    return '<div class="' + CLASS_POPUP_INPUT + '">' + inputHtml + '</div>';
};
var createInner = function createInner(message, title, extra) {
    var divPopText = '<div class="' + CLASS_POPUP_TEXT + '">' + message + '</div>';
    var divPopTitle = '<div class="' + CLASS_POPUP_TITLE + '">' + title + '</div>';

    return '<div class="' + CLASS_POPUP_INNER + '">' + divPopTitle + divPopText + (extra || '') + '</div>';
};
var createButtons = function createButtons(btnArray) {
    var len = btnArray.length;
    var btns = [];

    for (var i = 0; i < len; i += 1) {
        var classBold = i === len - 1 ? CLASS_POPUP_BUTTON_BOLD : '';

        btns.push('<span class="' + CLASS_POPUP_BUTTON + ' ' + classBold + '">' + btnArray[i] + '</span>');
    }

    return '<div class="' + CLASS_POPUP_BUTTONS + '">' + btns.join('') + '</div>';
};
var createPopup = function createPopup(html, callback) {
    // 将所有的\n替换为  <br>
    var newHtml = html.replace(/[\n]/g, '<BR />');
    var popupElement = document.createElement('div');

    popupElement.className = CLASS_POPUP;
    popupElement.innerHTML = newHtml;

    var removePopupElement = function removePopupElement() {
        popupElement.parentNode && popupElement.parentNode.removeChild(popupElement);
        popupElement = null;
    };

    popupElement.addEventListener('webkitTransitionEnd', function (e) {
        if (popupElement && e.target === popupElement && popupElement.classList.contains(CLASS_POPUP_OUT)) {
            removePopupElement();
        }
    });
    popupElement.style.display = 'block';
    document.body.appendChild(popupElement);
    popupElement.classList.add(CLASS_POPUP_IN);

    if (!backdrop.classList.contains(CLASS_ACTIVE)) {
        backdrop.style.display = 'block';
        document.body.appendChild(backdrop);
        backdrop.classList.add(CLASS_ACTIVE);
    }
    var btns = popupElement.querySelectorAll('.' + CLASS_POPUP_BUTTON);
    var input = popupElement.querySelector('.' + CLASS_POPUP_INPUT + ' input');
    var popup = {
        element: popupElement,
        close: function close(index, animate) {
            if (popupElement) {
                callback && callback(index || 0, {
                    index: index || 0,
                    content: input && input.value || ''
                });
                if (animate !== false) {
                    popupElement.classList.remove(CLASS_POPUP_IN);
                    popupElement.classList.add(CLASS_POPUP_OUT);
                } else {
                    removePopupElement();
                }
                popupStack.pop();
                // 如果还有其他popup，则不remove backdrop
                if (popupStack.length) {
                    popupStack[popupStack.length - 1].show(animate);
                } else {
                    backdrop.classList.remove(CLASS_ACTIVE);
                }
            }
        }
    };
    var handleEvent = function handleEvent(e) {
        popup.close([].slice.call(btns).indexOf(e.target));
    };
    var allBtns = document.querySelectorAll('.' + CLASS_POPUP_BUTTON);

    if (allBtns && allBtns.length > 0) {
        for (var i = 0; i < allBtns.length; i += 1) {
            allBtns[i].addEventListener('click', handleEvent);
        }
    }
    if (popupStack.length) {
        popupStack[popupStack.length - 1].hide();
    }
    popupStack.push({
        close: popup.close,
        show: function show() {
            popupElement.style.display = 'block';
            popupElement.classList.add(CLASS_POPUP_IN);
        },
        hide: function hide() {
            popupElement.style.display = 'none';
            popupElement.classList.remove(CLASS_POPUP_IN);
        }
    });

    return popup;
};

function alert(params, success) {
    var options = params;

    options.title = options.title || '提示';
    options.buttonName = options.buttonName || '确定';
    options.message = options.message || '';

    var innerHtml = createInner(options.message, options.title);
    var buttonHtml = createButtons([options.buttonName]);

    return createPopup(innerHtml + buttonHtml, success);
}

function confirm(params, success) {
    var options = params;

    options.title = options.title || '提示';
    options.buttonLabels = options.buttonLabels || ['确认', '取消'];
    options.message = options.message || '';

    var innerHtml = createInner(options.message, options.title);
    var buttonHtml = createButtons(options.buttonLabels);

    return createPopup(innerHtml + buttonHtml, success);
}

function prompt(params, success) {
    var options = params;

    options.title = options.title || '您好';
    options.buttonLabels = options.buttonLabels || ['确认', '取消'];
    options.text = options.text || '';
    options.hint = options.hint || '请输入内容';

    var innerHtml = createInner('', options.title, createInput(options.hint, options.text));
    var buttonHtml = createButtons(options.buttonLabels);

    return createPopup(innerHtml + buttonHtml, success);
}

function toast(params) {
    var options = params;
    var message = options.message;
    var duration = options.duration || 2000;
    var toastDiv = document.createElement('div');

    toastDiv.classList.add('mui-toast-container');
    toastDiv.innerHTML = '<div class="mui-toast-message">' + message + '</div>';
    toastDiv.addEventListener('webkitTransitionEnd', function () {
        if (!toastDiv.classList.contains(CLASS_ACTIVE)) {
            toastDiv.parentNode.removeChild(toastDiv);
            toastDiv = null;
        }
    });
    // 点击则自动消失
    toastDiv.addEventListener('click', function () {
        toastDiv.parentNode.removeChild(toastDiv);
        toastDiv = null;
    });
    document.body.appendChild(toastDiv);
    toastDiv.classList.add(CLASS_ACTIVE);
    setTimeout(function () {
        toastDiv && toastDiv.classList.remove(CLASS_ACTIVE);
    }, duration);
}

/**
 * waitingdialog
 * 基于mui.css
 */

var DEFAULT_ID = 'MFRAME_LOADING';
var dialogInstance = void 0;

/**
 * 通过div和遮罩,创建一个H5版本loading动画(如果已经存在则直接得到)
 * 基于mui的css
 * @return {HTMLElement} 返回创建后的div对象
 */
function createLoading() {
    var loadingDiv = document.getElementById(DEFAULT_ID);

    if (!loadingDiv) {
        // 如果不存在,则创建
        loadingDiv = document.createElement('div');
        loadingDiv.id = DEFAULT_ID;
        loadingDiv.className = 'mui-backdrop mui-loading';

        var iconStyle = 'width: 20%;height: 20%;\n        max-width: 46px;max-height: 46px;\n        position:absolute;top:46%;left:46%;';

        var contentStyle = 'position:absolute;\n        font-size: 14px;\n        top:54%;left: 46%;\n        text-align: center;';

        // 自己加了些样式,让loading能够有所自适应,并且居中
        loadingDiv.innerHTML = ' \n        <span class=" mui-spinner mui-spinner-white"\n            style="' + iconStyle + '">\n        </span>\n        <span class="tipsContent" style="' + contentStyle + '">\n                        \u52A0\u8F7D\u4E2D...\n        </span>';
    }

    return loadingDiv;
}

/**
 * h5版本waiting dialog的构造方法
 * @param {String} title 标题
 * @param {Object} options 配置
 * @constructor
 */
function H5WaitingDialog(title, options) {
    var _this = this;

    // 构造的时候生成一个dialog
    this.loadingDiv = createLoading();
    document.body.appendChild(this.loadingDiv);
    this.setTitle(title);
    if (options && options.padlock === true) {
        // 如果设置了点击自动关闭
        this.loadingDiv.addEventListener('click', function () {
            _this.close();
        });
    }
}

/**
 * 设置提示标题方法,重新显示
 * @param {String} title 标题
 */
H5WaitingDialog.prototype.setTitle = function setTitle(title) {
    if (this.loadingDiv) {
        // 只有存在对象时才能设置
        this.loadingDiv.style.display = 'block';
        this.loadingDiv.querySelector('.tipsContent').innerText = title || '';
    }
};

/**
 * 关闭后执行的方法,这里只是为了扩充原型
 */
H5WaitingDialog.prototype.onclose = function () {};

/**
 * 设置关闭dialog
 */
H5WaitingDialog.prototype.close = function close() {
    if (this.loadingDiv) {
        this.loadingDiv.style.display = 'none';
        this.onclose();
    }
};

/**
 * 销毁方法
 */
H5WaitingDialog.prototype.dispose = function dispose() {
    // 将loadingDiv销毁
    this.loadingDiv && this.loadingDiv.parentNode && this.loadingDiv.parentNode.removeChild(this.loadingDiv);
};

/**
 * 显示waiting对话框
 * @param {String} title 标题
 * @param {Object} options 配置参数
 * @return {Object} 返回一个dialog对象
 */
function showWaiting(title, options) {
    if (dialogInstance === undefined) {
        dialogInstance = new H5WaitingDialog(title, options);
    } else {
        dialogInstance.setTitle(title);
    }

    return dialogInstance;
}

/**
 * 关闭waiting对话框
 */
function closeWaiting() {
    if (dialogInstance) {
        dialogInstance.dispose();
        dialogInstance = undefined;
    }
}

/**
 * actionsheet
 * 基于mui.css
 */

var ACTION_UNIQUE_ID = 'defaultActionSheetId';
var ACTION_WRAP_UNIQUE_ID = 'defaultActionSheetWrapContent';

function createActionSheetH5(params) {
    var options = params || {};
    var idStr = options.id ? 'id="' + options.id + '"' : '';
    var finalHtml = '';

    finalHtml += '<div ' + idStr + ' class="mui-popover mui-popover-action mui-popover-bottom">';
    // 加上title
    if (options.title) {
        finalHtml += '<ul class="mui-table-view">';
        finalHtml += '<li class="mui-table-view-cell">';
        finalHtml += '<a class="titleActionSheet"><b>' + options.title + '</b></a>';
        finalHtml += '</li>';
        finalHtml += '</ul>';
    }
    finalHtml += '<ul class="mui-table-view">';
    // 添加内容
    if (options.items && Array.isArray(options.items)) {
        for (var i = 0; i < options.items.length; i += 1) {
            var title = options.items[i] || '';

            finalHtml += '<li class="mui-table-view-cell">';
            finalHtml += '<a >' + title + '</a>';
            finalHtml += '</li>';
        }
    }
    finalHtml += '</ul>';
    // 加上最后的取消
    finalHtml += '<ul class="mui-table-view">';
    finalHtml += '<li class="mui-table-view-cell">';
    finalHtml += '<a class="cancelActionSheet"><b>取消</b></a>';
    finalHtml += '</li>';
    finalHtml += '</ul>';

    // 补齐mui-popover
    finalHtml += '</div>';

    return finalHtml;
}

function actionsheet(params, success) {
    var options = params;

    options.id = ACTION_UNIQUE_ID;

    var html = createActionSheetH5(options);

    if (!document.getElementById(ACTION_WRAP_UNIQUE_ID)) {
        // 不重复添加
        var wrapper = document.createElement('div');

        wrapper.id = ACTION_WRAP_UNIQUE_ID;
        wrapper.innerHTML = html;
        document.body.appendChild(wrapper);
        mui('body').on('shown', '.mui-popover', function () {
            // console.log('shown:'+e.detail.id, e.detail.id); //detail为当前popover元素
        });
        mui('body').on('hidden', '.mui-popover', function () {
            // console.log('hidden:'+e.detail.id, e.detail.id); //detail为当前popover元素
        });
    } else {
        // 直接更改html
        document.getElementById(ACTION_WRAP_UNIQUE_ID).innerHTML = html;
    }

    var actionSheetDom = document.getElementById(ACTION_WRAP_UNIQUE_ID);

    // 每次都需要监听，否则引用对象会出错，注意每次都生成新生成出来的dom，免得重复
    mui(actionSheetDom).off();
    mui(actionSheetDom).on('tap', 'li > a', function tapFunc() {
        var title = this.innerText;

        // console.log('class:' + mClass);
        // console.log('点击,title:' + title + ',value:' + value);
        if (this.className.indexOf('titleActionSheet') === -1) {
            // 排除title的点击
            mui('#' + options.id).popover('toggle');
            if (this.className.indexOf('cancelActionSheet') === -1) {
                // 排除取消按钮,回调函数
                success && success(title);
            }
        }
    });
    // 显示actionsheet
    mui('#' + options.id).popover('toggle');
}

/**
 * 日期时间选择相关
 * 依赖于 mui.min.css,mui.picker.min.css,mui.min.js,mui.picker.min.js
 */

var dtPicker = void 0;
var oldDtType = void 0;

/**
 * mui的时间选择单例选择
 * 如果当前类别和以前类别是同一个,则使用同一个对象,
 * 否则销毁当前,重新构造
 * @param {JSON} params 传入的构造参数
 * @param {Function} success(res) 选择后的回调
 * 日期时 result.date
 * 时间时 result.time
 * 月份时 result.month
 * 日期时间时 result.datetime
 */
function showDatePicter(params, success) {
    var options = params || {};

    if (window.mui && window.mui.DtPicker) {
        if (oldDtType !== options.type) {
            // 如果两次类别不一样,重新构造
            if (dtPicker) {
                // 如果存在,先dispose
                dtPicker.dispose();
                dtPicker = undefined;
            }
            oldDtType = options.type;
        }
        dtPicker = dtPicker || new mui.DtPicker(options);
        dtPicker.show(function (rs) {
            var result = {};

            if (options.type === 'date') {
                result.date = rs.y.value + '-' + rs.m.value + '-' + rs.d.value;
            } else if (options.type === 'time') {
                result.time = rs.h.value + ':' + rs.i.value;
            } else if (options.type === 'month') {
                result.month = rs.y.value + '-' + rs.m.value;
            } else {
                // 日期时间
                result.datetime = rs.y.value + '-' + rs.m.value + '-' + rs.d.value + ' ' + rs.h.value + ':' + rs.i.value;
            }

            success && success(result);
        });
    } else {
        console.error('错误,缺少引用的css或js,无法使用mui的dtpicker');
    }
}

/**
 * 日期时间选择相关
 * 依赖于mui.min.css,mui.picker.min.css,mui.poppicker.css,mui.min.js,mui.picker.min.js,mui.poppicker.js
 */

var pPicker = void 0;
// 上一次的layer,如果layer换了,也需要重新换一个
var lastLayer = void 0;

/**
 * mui的PopPicker,单例显示
 * @param {options} params 配置包括
 * data 装载的数据
 * @param {Function} success 选择回调
 */
function showPopPicker(params, success) {
    var options = params || {};

    if (window.mui && window.mui.PopPicker) {
        var layer = options.layer || 1;

        if (lastLayer !== layer) {
            // 如果两次类别不一样,重新构造
            if (pPicker) {
                // 如果存在,先dispose
                pPicker.dispose();
                pPicker = undefined;
            }
            lastLayer = layer;
        }
        pPicker = pPicker || new mui.PopPicker({
            layer: layer
        });
        pPicker.setData(options.data || []);
        pPicker.show(function (items) {
            var result = {};

            result.items = [];
            for (var i = 0; i < layer; i += 1) {
                result.items.push({
                    text: items[i].text,
                    value: items[i].value
                });
            }
            success && success(result);
        });
    } else {
        console.error('未引入mui pop相关js(css)');
    }
}

/**
 * 将小于10的数字前面补齐0,然后变为字符串返回
 * @param {Number} number 需要不起的数字
 * @return {String} 补齐0后的字符串
 */
function paddingWith0(numberStr) {
    var DECIMAL_TEN = 10;
    var number = numberStr;

    if (typeof number === 'number' || typeof number === 'string') {
        number = parseInt(number, DECIMAL_TEN);
        if (number < DECIMAL_TEN) {
            number = '0' + number;
        }

        return number;
    }

    return '';
}

var CLASS_POPUP_BACKDROP$1 = 'mui-popup-backdrop';
var CLASS_ACTIVE$1 = 'mui-active';
var ACTION_WRAP_UNIQUE_ID$1 = 'defaultSelectWrapContent';
var once = 0;
var commonClassName = function commonClassName() {
    if (once === 0) {
        once = 1;
        document.querySelector('html').insertAdjacentHTML('beforeend', '\n        <style>\n        .ejs-select-div {\n            z-index: 10000;\n            position: fixed;\n            background-color: #fff;\n            width: 90%;\n            left: 50%;\n            top: 50%;\n            border-radius: 10px;\n            transform: translate(-50% , -50%);\n            -webkit-transform: translate(-50% , -50%);\n            max-height: 80vh;\n            overflow: hidden;\n        }\n        .ejs-select-title {\n            text-align: center;\n            height: 43px;\n            line-height: 43px;\n        }\n        .ejs-select-div .mui-table-view,.ejs-select-ul {\n            overflow: scroll;\n            position: relative;\n            max-height: calc(80vh - 88px);\n        }\n\n        .mui-popup-buttons {\n            bottom: 0;\n            width: 100%;\n            background: #fff;\n        }\n        .mui-popup-buttons + .ejs-select-ul {\n            padding-bottom: 44px;\n        }\n        .ejs-select-div .mui-input-row:after {\n            position: absolute;\n            right: 0;\n            bottom: 0;\n            left: 15px;\n            height: 1px;\n            content: \'\';\n            -webkit-transform: scaleY(.5);\n            transform: scaleY(.5);\n            background-color: #c8c7cc;\n        }\n        .ejs-select-div .mui-input-row:last-child:after {\n            height: 0;\n        }\n\n\n        .ejs-select-sp-li{\n            width: 32.5%;\n            display: inline-block;\n            text-align: center;\n            padding: 10px 0;\n        }\n        .ejs-select-sp-li:active {\n            color: #fff;\n            background-color: #929292;\n        }\n        </style>');
    }
};

var backdrop$1 = function () {
    var element = document.createElement('div');

    element.classList.add(CLASS_POPUP_BACKDROP$1);
    element.addEventListener('webkitTransitionEnd', function () {
        if (!element.classList.contains(CLASS_ACTIVE$1)) {
            element.parentNode && element.parentNode.removeChild(element);
        }
    });

    return element;
}();
var removeBackDrop = function removeBackDrop() {
    var selectDom = document.getElementById(ACTION_WRAP_UNIQUE_ID$1);
    selectDom && selectDom.remove();
    backdrop$1.classList.remove(CLASS_ACTIVE$1);
};

var isCancelable = function isCancelable(options) {
    document.getElementsByClassName(CLASS_POPUP_BACKDROP$1)[0].removeEventListener('tap', removeBackDrop);
    if (options.cancelable && options.cancelable === 1) {
        document.getElementsByClassName(CLASS_POPUP_BACKDROP$1)[0].addEventListener('tap', removeBackDrop);
    }
};
function selectH5(params) {
    commonClassName();
    var options = params || {};
    isCancelable(params);
    var finalHtml = '';

    finalHtml += '<div class="ejs-select-div">';
    // 加上title
    if (options.title) {
        finalHtml += '<div class="ejs-select-title">' + options.title + '</div>';
    }
    finalHtml += '<ul class="mui-table-view">';
    // 添加内容
    if (options.items && Array.isArray(options.items)) {
        for (var i = 0; i < options.items.length; i += 1) {
            var title = options.items[i] || '';

            finalHtml += '<li class="mui-table-view-cell" which=' + i + '>';
            finalHtml += '' + title;
            finalHtml += '</li>';
        }
    }
    finalHtml += '</ul>';

    // 补齐mui-popover
    finalHtml += '</div>';

    return finalHtml;
}
/**
 * 单选
 * @param {Object} opt 配置项
 * @param {Object} success 成功回调
 */
function selectSingle(opt, success) {
    // 显示遮罩
    if (!backdrop$1.classList.contains(CLASS_ACTIVE$1)) {
        backdrop$1.style.display = 'block';
        document.body.appendChild(backdrop$1);
        backdrop$1.classList.add(CLASS_ACTIVE$1);
    }

    var html = selectH5(opt);

    if (!document.getElementById(ACTION_WRAP_UNIQUE_ID$1)) {
        // 不重复添加
        var wrapper = document.createElement('div');

        wrapper.id = ACTION_WRAP_UNIQUE_ID$1;
        wrapper.innerHTML = html;
        document.body.appendChild(wrapper);
    } else {
        // 直接更改html
        document.getElementById(ACTION_WRAP_UNIQUE_ID$1).innerHTML = html;
    }
    var actionSheetDom = document.getElementById(ACTION_WRAP_UNIQUE_ID$1);

    // 每次都需要监听，否则引用对象会出错，注意每次都生成新生成出来的dom，免得重复
    mui(actionSheetDom).off();
    mui(actionSheetDom).on('tap', '.mui-table-view > li', function tapFunc() {
        var title = this.innerText;
        var index = parseInt(this.getAttribute('which'), 10);

        document.getElementById(ACTION_WRAP_UNIQUE_ID$1).remove();
        backdrop$1.classList.remove(CLASS_ACTIVE$1);
        // console.log('class:' + mClass);
        // console.log('点击,title:' + title + ',value:' + value);
        // 排除取消按钮,回调函数
        success && success({
            which: index,
            content: title
        });
    });
}
function errorFun(error, msge) {
    error && error({
        code: 0,
        msg: msge,
        result: {}
    });
}
function selectMultiH5(params) {
    commonClassName();
    var options = params || {};
    isCancelable(params);
    var finalHtml = '';

    finalHtml += '<div class="ejs-select-div">';
    // 加上title
    if (options.title) {
        finalHtml += '<div class="ejs-select-title">' + options.title + '</div>';
    }
    finalHtml += '<div class="ejs-select-ul">';
    // 添加内容
    if (options.items && Array.isArray(options.items)) {
        for (var i = 0; i < options.items.length; i += 1) {
            var title = options.items[i] || '';
            var ischecked = (options.choiceState && Array.isArray(options.choiceState) && options.choiceState[i]) === '1' ? 'checked' : '';

            finalHtml += '<div class="mui-input-row mui-checkbox" which=' + i + '>';
            finalHtml += '<label for="ejs-select-multi-' + i + '">' + title + '</label>';
            finalHtml += '<input name="checkbox1" value="Item 1" type="checkbox" id="ejs-select-multi-' + i + '" ' + ischecked + '>';
            finalHtml += '</div>';
        }
    }
    finalHtml += '</div>';

    finalHtml += '<div class="mui-popup-buttons"><span class="mui-popup-button ">取消</span><span class="mui-popup-button mui-popup-button-bold">确定</span></div>';
    // 补齐mui-popover
    finalHtml += '</div>';

    return finalHtml;
}
/**
 * 多选
 * @param {Object} opt 配置项
 * @param {Object} success 成功回调
 * @param {Object} error 成功回调
 */
function selectMulti(opt, success, error) {
    if (opt.items.length !== opt.choiceState.length) {
        errorFun(error, '请求参数错误');
        return;
    }
    // 显示遮罩
    if (!backdrop$1.classList.contains(CLASS_ACTIVE$1)) {
        backdrop$1.style.display = 'block';
        document.body.appendChild(backdrop$1);
        backdrop$1.classList.add(CLASS_ACTIVE$1);
    }
    var html = selectMultiH5(opt);

    if (!document.getElementById(ACTION_WRAP_UNIQUE_ID$1)) {
        // 不重复添加
        var wrapper = document.createElement('div');

        wrapper.id = ACTION_WRAP_UNIQUE_ID$1;
        wrapper.innerHTML = html;
        document.body.appendChild(wrapper);
    } else {
        // 直接更改html
        document.getElementById(ACTION_WRAP_UNIQUE_ID$1).innerHTML = html;
    }
    var actionSheetDom = document.getElementById(ACTION_WRAP_UNIQUE_ID$1);

    mui(actionSheetDom).off();
    mui(actionSheetDom).on('tap', '.mui-popup-buttons > .mui-popup-button', function tapFunc() {
        var title = this.innerText;
        if (title === '取消') {
            document.getElementById(ACTION_WRAP_UNIQUE_ID$1).remove();
            backdrop$1.classList.remove(CLASS_ACTIVE$1);
        } else if (title === '确定') {
            var content = [];
            var state = [];
            var inputDom = document.querySelectorAll('.ejs-select-div .mui-input-row');

            [].forEach.call(inputDom, function (e) {
                if (e.querySelector('input').checked) {
                    content.push(e.querySelector('label').innerText);
                    state.push('1');
                } else {
                    state.push('0');
                }
            });

            document.getElementById(ACTION_WRAP_UNIQUE_ID$1).remove();
            backdrop$1.classList.remove(CLASS_ACTIVE$1);
            success && success({
                choiceContent: content,
                choiceState: state
            });
        }
    });
}
function selectSpH5(params) {
    commonClassName();
    var options = params || {};
    isCancelable(params);
    var finalHtml = '';

    finalHtml += '<div class="ejs-select-div">';
    // 加上title
    if (options.title) {
        finalHtml += '<div class="ejs-select-title">' + options.title + '</div>';
    }
    finalHtml += '<div class="ejs-select-ul">';
    // 添加内容
    if (options.items && Array.isArray(options.items)) {
        for (var i = 0; i < options.items.length; i += 1) {
            var title = options.items[i] || '';

            finalHtml += '<li class="ejs-select-sp-li"  which=' + i + '>';
            finalHtml += '' + title;
            finalHtml += '</li>';
        }
    }
    finalHtml += '</div>';

    return finalHtml;
}
/**
 * 九宫格
 * @param {Object} opt 配置项
 * @param {Object} success 成功回调
 * @param {Object} error 成功回调
 */
function selectSingleSP(opt, success) {
    // 显示遮罩
    if (!backdrop$1.classList.contains(CLASS_ACTIVE$1)) {
        backdrop$1.style.display = 'block';
        document.body.appendChild(backdrop$1);
        backdrop$1.classList.add(CLASS_ACTIVE$1);
    }
    var html = selectSpH5(opt);

    if (!document.getElementById(ACTION_WRAP_UNIQUE_ID$1)) {
        // 不重复添加
        var wrapper = document.createElement('div');

        wrapper.id = ACTION_WRAP_UNIQUE_ID$1;
        wrapper.innerHTML = html;
        document.body.appendChild(wrapper);
    } else {
        // 直接更改html
        document.getElementById(ACTION_WRAP_UNIQUE_ID$1).innerHTML = html;
    }
    var actionSheetDom = document.getElementById(ACTION_WRAP_UNIQUE_ID$1);
    // 每次都需要监听，否则引用对象会出错，注意每次都生成新生成出来的dom，免得重复
    mui(actionSheetDom).off();
    mui(actionSheetDom).on('tap', '.ejs-select-ul > li', function tapFunc() {
        var title = this.innerText;
        var index = parseInt(this.getAttribute('which'), 10);

        document.getElementById(ACTION_WRAP_UNIQUE_ID$1).remove();
        backdrop$1.classList.remove(CLASS_ACTIVE$1);
        // console.log('class:' + mClass);
        // console.log('点击,title:' + title + ',value:' + value);
        // 排除取消按钮,回调函数
        success && success({
            which: index,
            content: title
        });
    });
}

function pickerDateWithArgs(args) {
    var options = args[0];
    var resolve = args[1];

    showDatePicter(options, function (result) {
        options.success && options.success(result);
        resolve && resolve(result);
    });
}

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
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
                rest[_key] = arguments[_key];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'message');
            var options = args[0];
            var resolve = args[1];

            toast(options);
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
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
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
            ejs.ui.alert.apply(this, args);
        }
    }, {
        namespace: 'alert',
        os: ['h5'],
        defaultParams: {
            title: '',
            message: '',
            buttonName: '确定'
        },
        runCode: function runCode() {
            for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                rest[_key3] = arguments[_key3];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'message', 'title', 'buttonName');
            var options = args[0];
            var resolve = args[1];

            alert(options, function () {
                options.success && options.success({});
                resolve && resolve({});
            });
        }
    }, {
        namespace: 'confirm',
        os: ['h5'],
        defaultParams: {
            // 这是默认参数，API的每一个参数都应该有一个默认值
            title: '',
            message: '',
            buttonLabels: ['取消', '确定']
        },
        runCode: function runCode() {
            for (var _len4 = arguments.length, rest = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                rest[_key4] = arguments[_key4];
            }

            // 兼容字符串形式
            var args = rest;
            var options = args[0];
            var resolve = args[1];

            confirm(options, function (index) {
                var result = {
                    which: index
                };

                options.success && options.success(result);
                resolve && resolve(result);
            });
        }
    }, {
        namespace: 'prompt',
        os: ['h5'],
        defaultParams: {
            title: '',
            hint: '',
            text: '',
            buttonLabels: ['取消', '确定']
        },
        runCode: function runCode() {
            for (var _len5 = arguments.length, rest = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                rest[_key5] = arguments[_key5];
            }

            // 兼容字符串形式
            var args = rest;
            var options = args[0];
            var resolve = args[1];

            prompt(options, function (index, params) {
                var content = params.content || '';
                var result = {
                    which: index ? 1 : 0,
                    content: content
                };

                options.success && options.success(result);
                resolve && resolve(result);
            });
        }
    }, {
        namespace: 'actionSheet',
        os: ['h5'],
        defaultParams: {
            items: []
        },
        runCode: function runCode() {
            for (var _len6 = arguments.length, rest = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                rest[_key6] = arguments[_key6];
            }

            // 兼容字符串形式
            var args = rest;
            var options = args[0];
            var resolve = args[1];

            actionsheet(options, function (title) {
                var index = options.items.indexOf(title);
                var result = {
                    which: index,
                    content: title
                };

                options.success && options.success(result);
                resolve && resolve(result);
            });
        }
    }, {
        namespace: 'pickDate',
        os: ['h5'],
        defaultParams: {
            // h5中的开始年份
            beginYear: 1900,
            // h5中的结束年份
            endYear: 2100,
            // 默认为空为使用当前时间
            // 格式为 yyyy-MM-dd。
            datetime: ''
        },
        runCode: function runCode() {
            for (var _len7 = arguments.length, rest = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
                rest[_key7] = arguments[_key7];
            }

            // 兼容字符串形式
            var args = rest;
            var options = args[0];
            var datetime = options.datetime;

            if (!datetime) {
                // 如果不存在，默认为当前时间
                var dateNow = new Date();

                datetime = dateNow.getFullYear() + '-' + paddingWith0(dateNow.getMonth() + 1) + '-' + paddingWith0(dateNow.getDate());
            }
            options.value = datetime;
            options.type = 'date';

            pickerDateWithArgs(args);
        }
    }, {
        namespace: 'pickTime',
        os: ['h5'],
        defaultParams: {
            // 默认为空为使用当前时间
            // 格式为 hh:mm。
            datetime: ''
        },
        runCode: function runCode() {
            for (var _len8 = arguments.length, rest = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
                rest[_key8] = arguments[_key8];
            }

            // 兼容字符串形式
            var args = rest;
            var options = args[0];
            var dateNow = new Date();
            var datePrefix = dateNow.getFullYear() + '-' + paddingWith0(dateNow.getMonth() + 1) + '-' + paddingWith0(dateNow.getDate()) + ' ';
            var datetime = options.datetime;

            if (!datetime) {
                // 如果不存在，默认为当前时间
                var dateSuffix = paddingWith0(dateNow.getHours()) + ':' + paddingWith0(dateNow.getMinutes());

                datetime = datePrefix + dateSuffix;
            } else {
                datetime = datePrefix + datetime;
            }
            options.value = datetime;
            options.type = 'time';

            pickerDateWithArgs(args);
        }
    }, {
        namespace: 'pickDateTime',
        os: ['h5'],
        defaultParams: {
            // 默认为空为使用当前时间
            // 格式为 yyyy-MM-dd hh:mm。
            datetime: '',
            // h5中的开始年份
            beginYear: 1900,
            // h5中的结束年份
            endYear: 2100
        },
        runCode: function runCode() {
            for (var _len9 = arguments.length, rest = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
                rest[_key9] = arguments[_key9];
            }

            // 兼容字符串形式
            var args = rest;
            var options = args[0];
            var datetime = options.datetime;

            if (!datetime) {
                // 如果不存在，默认为当前时间
                var dateNow = new Date();
                var datePrefix = dateNow.getFullYear() + '-' + paddingWith0(dateNow.getMonth() + 1) + '-' + paddingWith0(dateNow.getDate()) + ' ';
                var dateSuffix = paddingWith0(dateNow.getHours()) + ':' + paddingWith0(dateNow.getMinutes());

                datetime = datePrefix + dateSuffix;
            }
            options.value = datetime;
            options.type = null;

            pickerDateWithArgs(args);
        }
    }, {
        namespace: 'pickMonth',
        os: ['h5'],
        defaultParams: {
            // 默认为空为使用当前时间
            // 格式为 yyyy-MM
            datetime: '',
            // h5中的开始年份
            beginYear: 1900,
            // h5中的结束年份
            endYear: 2100
        },
        runCode: function runCode() {
            for (var _len10 = arguments.length, rest = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
                rest[_key10] = arguments[_key10];
            }

            // 兼容字符串形式
            var args = rest;
            var options = args[0];
            var dateNow = new Date();
            var datetime = options.datetime;

            if (!datetime) {
                // 如果不存在，默认为当前时间
                datetime = dateNow.getFullYear() + '-' + paddingWith0(dateNow.getMonth() + 1) + '-' + paddingWith0(dateNow.getDate()) + ' ';
            } else {
                // 否则，只需要加上日期尾缀
                datetime += '-' + paddingWith0(dateNow.getDate());
            }
            options.value = datetime;
            options.type = 'month';

            pickerDateWithArgs(args);
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
            for (var _len11 = arguments.length, rest = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
                rest[_key11] = arguments[_key11];
            }

            // 兼容字符串形式
            var args = rest;
            var options = args[0];
            var resolve = args[1];

            showPopPicker(options, function (result) {
                options.success && options.success(result);
                resolve && resolve(result);
            });
        }
    }, {
        namespace: 'showWaiting',
        os: ['h5'],
        defaultParams: {
            message: '',
            padlock: true
        },
        runCode: function runCode() {
            for (var _len12 = arguments.length, rest = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
                rest[_key12] = arguments[_key12];
            }

            // 兼容字符串形式
            var args = rest;
            var options = args[0];
            var resolve = args[1];

            showWaiting(options.message, {
                padlock: options.padlock
            });

            options.success && options.success({});
            resolve && resolve({});
        }
    }, {
        namespace: 'closeWaiting',
        os: ['h5'],
        runCode: function runCode() {
            for (var _len13 = arguments.length, rest = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
                rest[_key13] = arguments[_key13];
            }

            // 兼容字符串形式
            var args = rest;
            var options = args[0];
            var resolve = args[1];

            closeWaiting();

            options.success && options.success();
            resolve && resolve();
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
            columns: 3,
            // 可取消
            cancelable: 1
        },
        runCode: function runCode() {
            for (var _len14 = arguments.length, rest = Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
                rest[_key14] = arguments[_key14];
            }

            // 兼容字符串形式
            var args = rest;
            var options = args[0];
            var resolve = args[1];
            var reject = args[2];
            var res = void 0;
            if (options.type === 0 && options.isMultiSelect === 0) {
                // 单选
                selectSingle(options, function (result) {
                    res = result;
                    options.success && options.success(res);
                    resolve && resolve({});
                });
            } else if (options.type === 0 && options.isMultiSelect === 1) {
                // 多选
                selectMulti(options, function (result) {
                    res = result;
                    options.success && options.success(res);
                    resolve && resolve({});
                }, function (err) {
                    options.error && options.error(err);
                    reject && reject(err);
                });
            } else if (options.type === 1) {
                // 九宫格
                selectSingleSP(options, function (result) {
                    res = result;
                    options.success && options.success(res);
                    resolve && resolve({});
                }, function (err) {
                    options.error && options.error(err);
                    reject && reject(err);
                });
            }
        }
    }]);
}

function pageMixin(hybrid) {
    var hybridJs = hybrid;
    var innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('page', [{
        namespace: 'open',
        os: ['h5'],
        defaultParams: {
            pageUrl: '',
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
            options.pageUrl = innerUtil.getFullUrlByParams(options.pageUrl, options.data);

            // f9
            parent.appendIframe(options.pageUrl, options.success);
            // 普通
            // document.location.href = options.pageUrl;
        }
    }, {
        namespace: 'close',
        os: ['h5'],
        runCode: function runCode(params) {
            var options = params;

            // 浏览器退出
            /* if (window.history.length > 1) {
                window.history.back();
            } */
            parent.delIframe(options);
        }
    }, {
        namespace: 'reload',
        os: ['h5'],
        runCode: function runCode() {
            window.location.reload();
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
                    msg: 'localStorage\u83B7\u53D6\u503C\u51FA\u9519:' + JSON.stringify(keys),
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
                    msg: 'localStorage\u79FB\u9664\u503C\u51FA\u9519:' + JSON.stringify(keys),
                    result: msg
                };

                error && error(err);
                reject && reject(err);

                return;
            }

            success && success({});
            resolve && resolve({});
        }
    }]);
}

function deviceMixin(hybrid) {
    var hybridJs = hybrid;
    var innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('device', [{
        namespace: 'callPhone',
        os: ['h5'],
        defaultParams: {
            phoneNum: ''
        },
        runCode: function runCode() {
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
                rest[_key] = arguments[_key];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'phoneNum');
            var phoneNum = args[0].phoneNum;

            window.location.href = 'tel:' + phoneNum;
        }
    }, {
        namespace: 'sendMsg',
        os: ['h5'],
        defaultParams: {
            phoneNum: '',
            message: ''
        },
        runCode: function runCode() {
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                rest[_key2] = arguments[_key2];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'phoneNum', 'message');
            var phoneNum = args[0].phoneNum;
            var message = args[0].message;

            window.location.href = 'sms:' + phoneNum + '?body=' + message;
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
            for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                rest[_key3] = arguments[_key3];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'mail', 'subject', 'cc');
            var mail = args[0].mail;
            var subject = args[0].subject;
            var cc = args[0].cc;

            window.location.href = 'mailto:' + mail + '?subject=' + subject + '&cc=' + cc;
        }
    }]);
}

var parseHtml = function parseHtml(strHtml) {
    if (!strHtml || typeof strHtml !== 'string') {
        return null;
    }
    // 创一个灵活的div
    var a = document.createElement('div');
    var b = document.createDocumentFragment();

    a.innerHTML = strHtml;

    var i = a.firstChild;
    b.appendChild(i);

    return b;
};
var choposeOnce = 0;
var commonClassName$1 = function commonClassName(cb) {
    if (choposeOnce === 0) {
        choposeOnce = 1;
        document.querySelector('html').insertAdjacentHTML('beforeend', '\n        <style>\n        body {\n            overflow: hidden;\n        }\n        .ejs-contact-content {\n        position: absolute;\n        width: 100%;\n        top: 0;\n        bottom: 0;\n        height: 100%;\n        z-index: 99;\n        background: #fff;\n        overflow: hidden;\n    }\n    .ejs-choose-ul:after {\n        display:none\n    }\n    .ejs-choose-ul {\n        margin-top: 10px;\n        overflow: scroll;\n        height: 100%;\n        padding-bottom: 44px;\n    }\n    .ejs-choose-ul .ejs-choose-li label {\n        padding: 11px 0;\n    }\n    .ejs-choose-ul .ejs-choose-li {\n        padding: 0 15px;\n    }\n    .ejs-contact-bottom {\n        position: absolute;\n        bottom: 0;\n        height: 44px;\n        border-top: 1px solid #eee;\n        width: 100%;\n        background: #fff;\n    }\n    .ejs-contact-bottom  button {\n        float: right;\n        margin-right: 10px;\n        margin-top: 5px;\n        background-color: #3c80e6;\n        color:#fff;\n        width: 90px;\n        border-radius: 5px;\n    }\n    .ejs-hidden {\n        overflow: hidden;\n        height: 100vh;\n    }\n\n\n    .ejs-choose-li {\n        position: relative;\n        overflow: hidden;\n        padding: 11px 15px;\n        -webkit-touch-callout: none;\n    }\n\n    .ejs-choose-li:after {\n        position: absolute;\n        right: 0;\n        bottom: 0;\n        left: 15px;\n        height: 1px;\n        content: \'\';\n        -webkit-transform: scaleY(.5);\n        transform: scaleY(.5);\n        background-color: #c8c7cc;\n    }\n\n    .ejs-choose-li.mui-radio input[type=radio],\n    .ejs-choose-li.mui-checkbox input[type=checkbox] {\n        top: 8px;\n    }\n\n    .ejs-choose-li.mui-radio.mui-left,\n    .ejs-choose-li.mui-checkbox.mui-left {\n        padding-left: 58px;\n    }\n\n    .ejs-choose-li.mui-active {\n        background-color: #eee;\n    }\n\n    .ejs-choose-li:last-child:before,\n    .ejs-choose-li:last-child:after {\n        height: 0;\n    }\n\n    .ejs-choose-li>a:not(.mui-btn) {\n        position: relative;\n        display: block;\n        overflow: hidden;\n        margin: -11px -15px;\n        padding: inherit;\n        white-space: nowrap;\n        text-overflow: ellipsis;\n        color: inherit;\n        /*&:active {\n        background-color: #eee;\n    }*/\n    }\n\n    .ejs-choose-li>a:not(.mui-btn).mui-active {\n        background-color: #eee;\n    }\n\n    .ejs-choose-li p {\n        margin-bottom: 0;\n    }\n\n    .ejs-choose-li.mui-transitioning>.mui-slider-handle,\n    .ejs-choose-li.mui-transitioning>.mui-slider-left .mui-btn,\n    .ejs-choose-li.mui-transitioning>.mui-slider-right .mui-btn {\n        -webkit-transition: -webkit-transform 300ms ease;\n        transition: transform 300ms ease;\n    }\n\n    .ejs-choose-li.mui-active>.mui-slider-handle {\n        background-color: #eee;\n    }\n\n    .ejs-choose-li>.mui-slider-handle {\n        position: relative;\n        background-color: #fff;\n    }\n\n    .ejs-choose-li>.mui-slider-handle.mui-navigate-right:after,\n    .ejs-choose-li>.mui-slider-handle .mui-navigate-right:after {\n        right: 0;\n    }\n\n    .ejs-choose-li>.mui-slider-handle,\n    .ejs-choose-li>.mui-slider-left .mui-btn,\n    .ejs-choose-li>.mui-slider-right .mui-btn {\n        -webkit-transition: -webkit-transform 0ms ease;\n        transition: transform 0ms ease;\n    }\n\n    .ejs-choose-li>.mui-slider-left,\n    .ejs-choose-li>.mui-slider-right {\n        position: absolute;\n        top: 0;\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: flex;\n        height: 100%;\n    }\n\n    .ejs-choose-li>.mui-slider-left>.mui-btn,\n    .ejs-choose-li>.mui-slider-right>.mui-btn {\n        position: relative;\n        left: 0;\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: flex;\n        padding: 0 30px;\n        color: #fff;\n        border: 0;\n        border-radius: 0;\n        -webkit-box-align: center;\n        -webkit-align-items: center;\n        align-items: center;\n    }\n\n    .ejs-choose-li>.mui-slider-left>.mui-btn:after,\n    .ejs-choose-li>.mui-slider-right>.mui-btn:after {\n        position: absolute;\n        z-index: -1;\n        top: 0;\n        width: 600%;\n        height: 100%;\n        content: \'\';\n        background: inherit;\n    }\n\n    .ejs-choose-li>.mui-slider-left>.mui-btn.mui-icon,\n    .ejs-choose-li>.mui-slider-right>.mui-btn.mui-icon {\n        font-size: 30px;\n    }\n\n    .ejs-choose-li>.mui-slider-right {\n        right: 0;\n        -webkit-transition: -webkit-transform 0ms ease;\n        transition: transform 0ms ease;\n        -webkit-transform: translateX(100%);\n        transform: translateX(100%);\n    }\n\n    .ejs-choose-li>.mui-slider-left {\n        left: 0;\n        -webkit-transition: -webkit-transform 0ms ease;\n        transition: transform 0ms ease;\n        -webkit-transform: translateX(-100%);\n        transform: translateX(-100%);\n    }\n\n    .ejs-choose-li>.mui-slider-left>.mui-btn:after {\n        right: 100%;\n        margin-right: -1px;\n    }\n    .ejs-choose-li>.mui-btn,\n    .ejs-choose-li>.mui-badge,\n    .ejs-choose-li>.mui-switch,\n    .ejs-choose-li>a>.mui-btn,\n    .ejs-choose-li>a>.mui-badge,\n    .ejs-choose-li>a>.mui-switch {\n        position: absolute;\n        top: 50%;\n        right: 15px;\n        -webkit-transform: translateY(-50%);\n        transform: translateY(-50%);\n    }\n    .ejs-f9-content .ejs-choose-ul .mui-badge {\n        font-size: 12px;\n        line-height: 1;\n        display: inline-block;\n        padding: 3px 6px;\n        border-radius: 100px;\n        width:auto;\n    }\n        </style>');

        cb && cb();
    } else {
        cb && cb();
    }
};
var contactDom = function contactDom(cb) {
    commonClassName$1(function () {
        var f9Div = document.querySelector('.ejs-f9-content');
        if (!f9Div) {
            console.error('缺少ejs-f9-content样式，请在需要调试ejs的页面body加入class="ejs-f9-content"');

            return;
        }
        var divNav = '<div class="ejs-contact-content">\n        <ul class="mui-table-view">\n            <li class="mui-table-view-cell">\u7EC4\u7EC7\u67B6\u6784</li>\n        </ul>\n\n        <ul class="mui-table-view ejs-choose-ul"></ul>\n        <div class="ejs-contact-bottom">\n            <button>\u786E\u5B9A</button>\n        </div>\n    </div>';

        f9Div.insertBefore(parseHtml(divNav), f9Div.childNodes[0]);
        cb && cb();
    });
};
var resultUser = [];
var viewli = function viewli(arr, selectedusers) {
    var chooseUl = document.querySelector('.ejs-choose-ul');
    var contactLi = '';
    chooseUl.innerHTML = '';
    arr.forEach(function (e) {
        // 渲染部门
        if (e.iconCls === 'mini-tree-folder') {
            contactLi += '<li class="ejs-choose-li mui-input-row  mui-checkbox  mui-left"\n            fullPath="' + e.fullPath + '"\n            textCls="' + e.textCls + '"\n            pid="' + e.pid + '"\n            ckr="' + e.ckr + '"\n            isLeaf="' + e.isLeaf + '"\n            tableName="' + e.tableName + '"\n            objectcode="' + e.objectcode + '"\n            path="' + e.path + '"\n            expanded="' + e.expanded + '"\n            isSubNode="' + e.isSubNode + '"\n            titleExtra="' + e.titleExtra + '"\n            checked="' + e.checked + '"\n            ouguid="' + e.id + '"\n            text="' + e.text + '"\n            >\n                <label class="ejs-chontact-label">' + e.text + '</label>\n                <input class="mui-hidden" name="checkbox1" value="Item 1" type="checkbox" ' + (e.checked === true ? 'checked' : '') + '>\n                <span class="mui-badge mui-badge-primary">\u90E8\u95E8</span>\n            </li>';
        } else {
            selectedusers && selectedusers.forEach(function (item) {
                if (item.userguid === e.id) {
                    e.checked = true;
                }
            });
            /* if (e.checked) {
                resultUser.push({
                    username: e.text || '',
                    loginid: e.loginid || '',
                    sequenceid: e.sequenceid || '',
                    photourl: e.photourl || '',
                    displayname: e.text || '',
                    title: e.title || '',
                    baseouname: e.baseouname || '',
                    ccworksequenceid: e.ccworksequenceid || '',
                    userguid: e.id || '',
                    ordernumber: e.ordernumber || '',
                });
            } */
            // 渲染人员列表
            contactLi += '<li class="ejs-choose-li mui-input-row mui-checkbox  mui-left"\n            loginid="' + e.loginid + '"\n            sequenceid="' + e.sequenceid + '"\n            photourl="' + e.photourl + '"\n            displayname="' + e.text + '"\n            username="' + e.text + '"\n            title="' + e.title + '"\n            baseouname="' + e.baseouname + '"\n            ccworksequenceid="' + e.ccworksequenceid + '"\n            userguid="' + e.id + '"\n            ordernumber="' + e.ordernumber + '"\n            >\n                <label class="ejs-chontact-label" for=' + e.id + '>' + e.text + '</label>\n                <input name="checkbox1" value="Item 1" type="checkbox" ' + (e.checked === true ? 'checked' : '') + '>\n                <span class="mui-badge">\u4EBA\u5458</span>\n            </li>';
        }
    });
    chooseUl.insertAdjacentHTML('afterbegin', contactLi);
};
var listenBack = function listenBack() {
    var state = {
        title: '选人',
        url: '#choose' // 这个url可以随便填，只是为了不让浏览器显示的url地址发生变化，对页面其实无影响
    };
    window.history.pushState(state, state.title, state.url);
    window.addEventListener('popstate', function () {
        document.querySelector('.mui-content').classList.remove('ejs-hidden');
        document.querySelector('.ejs-contact-content') && document.querySelector('.ejs-contact-content').remove();
    }, false);
};

var formdataRoot = new FormData();
var invokePluginApi = function (opt, cb) {
    if (opt.path === 'workplatform.provider.openNewPage' && opt.dataMap.method === 'goSelectPerson') {
        contactDom(function () {
            listenBack();
            resultUser = [];

            if (opt.dataMap.selectedusers && opt.dataMap.selectedusers.length > 0) {
                resultUser = opt.dataMap.selectedusers;
            }
            document.querySelector('.mui-content').classList.add('ejs-hidden');
            // console.log(opt.f9userdata);
            if (opt.f9userdata) {
                viewli(opt.f9userdata, opt.dataMap.selectedusers);
            } else {
                formdataRoot.append('commonDto', JSON.stringify([{
                    id: opt.f9controlid,
                    url: epm.getRightUrl(epm.dealUrl(opt.f9action, true)),
                    type: 'treeselect-non-nested',
                    action: opt.f9action,
                    idField: 'id',
                    textField: 'text',
                    imgField: 'img',
                    iconField: 'iconCls',
                    parentField: 'pid',
                    valueField: 'id',
                    pinyinField: 'tag',
                    value: '',
                    text: '',
                    isSecondRequest: true
                }]));
                Util.ajax({
                    url: epm.getRightUrl(epm.dealUrl(opt.f9action, true)), // opt.f9action,
                    type: 'post',
                    // dataType: 'json',
                    data: formdataRoot,
                    processData: false,
                    contentType: false,
                    success: function success(data) {
                        viewli(data.controls[0].data, opt.dataMap.selectedusers);
                    },
                    complete: function complete() {
                        /* if (!opts.notShowLoading) {
                            epm.hideMask();
                        } */
                    }
                });
            }
            mui('.ejs-contact-content').on('click', '.ejs-choose-li input', function (e) {
                e.preventDefault();
                e.stopPropagation();
            });
            mui('.ejs-contact-content').off('click', '.ejs-choose-li');
            // eslint-disable-next-line func-names
            mui('.ejs-contact-content').on('click', '.ejs-choose-li', function () {
                var liNode = this;
                var ouguid = liNode.getAttribute('ouguid');
                // 如果点击是部门，渲染展开数组
                var formdata = new FormData();
                if (ouguid) {
                    var nodeData = {
                        fullPath: liNode.getAttribute('fullPath'),
                        textCls: liNode.getAttribute('textCls'),
                        pid: liNode.getAttribute('pid'),
                        ckr: liNode.getAttribute('ckr'),
                        isLeaf: liNode.getAttribute('isLeaf'),
                        tableName: liNode.getAttribute('tableName'),
                        objectcode: liNode.getAttribute('objectcode'),
                        path: liNode.getAttribute('path'),
                        expanded: liNode.getAttribute('expanded'),
                        isSubNode: liNode.getAttribute('isSubNode'),
                        titleExtra: liNode.getAttribute('titleExtra'),
                        checked: liNode.getAttribute('checked'),
                        id: liNode.getAttribute('ouguid'),
                        text: liNode.getAttribute('text')
                    };
                    // 工作流选人不走这边
                    if (opt.f9userdata) {
                        var params = epm.get(opt.f9controlid).getModule();

                        params.node = nodeData;
                        params.isSecondRequest = true;
                        params.checkRecursive = true;
                        formdata.set('commonDto', JSON.stringify([params]));
                    } else {
                        formdata.set('commonDto', JSON.stringify([{
                            id: opt.f9controlid,
                            url: epm.getRightUrl(epm.dealUrl(opt.f9action, true)),
                            type: 'treeselect-non-nested',
                            action: opt.f9action,
                            idField: 'id',
                            textField: 'text',
                            imgField: 'img',
                            iconField: 'iconCls',
                            parentField: 'pid',
                            valueField: 'id',
                            pinyinField: 'tag',
                            value: '',
                            text: '',
                            isSecondRequest: true,
                            node: nodeData
                        }]));
                    }
                    Util.ajax({
                        url: epm.getRightUrl(epm.dealUrl(opt.f9action, true)), // opt.f9action,
                        type: 'post',
                        // dataType: 'json',
                        data: formdata,
                        processData: false,
                        contentType: false,
                        success: function success(data) {
                            viewli(data.controls[0].data, opt.dataMap.selectedusers);
                        },
                        complete: function complete() {
                            /* if (!opts.notShowLoading) {
                                epm.hideMask();
                            } */
                        }
                    });
                } else {
                    // console.log(liNode.querySelector('input').checked);

                    if (!liNode.querySelector('input').checked) {
                        resultUser.push({
                            username: liNode.getAttribute('username') || '',
                            loginid: liNode.getAttribute('loginid') || '',
                            sequenceid: liNode.getAttribute('sequenceid') || '',
                            photourl: liNode.getAttribute('photourl') || '',
                            displayname: liNode.getAttribute('displayname') || '',
                            title: liNode.getAttribute('title') || '',
                            baseouname: liNode.getAttribute('baseouname') || '',
                            ccworksequenceid: liNode.getAttribute('ccworksequenceid') || '',
                            userguid: liNode.getAttribute('userguid') || '',
                            ordernumber: liNode.getAttribute('ordernumber') || ''
                        });
                    } else {
                        resultUser = resultUser.filter(function (e) {
                            return e.userguid !== liNode.getAttribute('userguid');
                        });
                    }

                    this.querySelector('input').checked = !this.querySelector('input').checked;
                }
            });
            mui('.ejs-contact-bottom').off('click', 'button');
            mui('.ejs-contact-bottom').on('click', 'button', function () {
                history.go(-1);

                cb && cb({
                    resultData: resultUser,
                    grouipData: [],
                    talkData: []
                });
            });
        });
    }
};

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
            var result = void 0;
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
    }, {
        namespace: 'invokePluginApi',
        os: ['h5'],
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

            invokePluginApi(options, function (result) {
                options.success && options.success(result);
                resolve && resolve(result);
            });
        }
    }]);
}

var parseHtml$1 = function parseHtml(strHtml) {
    if (!strHtml || typeof strHtml !== 'string') {
        return null;
    }
    // 创一个灵活的div
    var a = document.createElement('div');
    var b = document.createDocumentFragment();

    a.innerHTML = strHtml;

    var i = a.firstChild;
    b.appendChild(i);

    return b;
};
var once$1 = 0;
var commonClassName$2 = function commonClassName(cb) {
    if (once$1 === 0) {
        once$1 = 1;
        document.querySelector('html').insertAdjacentHTML('beforeend', '\n        <style>\n        .mui-bar-nav~.mui-content {\n            padding-top: 0px;\n            margin-top: 44px;\n        }\n        .mui-focusin>.mui-bar-nav,\n        .mui-focusin>.mui-bar-header-secondary {\n            position: fixed;\n        }\n        .ejs-tab {\n            border: 1px solid #3c80e6;\n            border-radius: 20px;\n            width: 100px;\n        }\n        .ejs-tab0 {\n            margin-right: -12px;\n        }\n        .ejs-tab1 {\n            margin-left: -12px;\n        }\n        .ejs-tab-active{\n            background: #3c80e6;\n                color: #fff;\n                z-index: 9;\n        }\n        .ejs-f9-content #header {\n            padding-right: 0px;\n        }\n        .ejs-f9-content #header .ejs-right-a-0,\n        .ejs-f9-content #header .ejs-right-a-1 {\n            font-size: 14px;\n            line-height: 44px;\n            color: #007aff;\n            min-width: 44px;\n            min-height: 44px;\n            background-size: auto 35px;\n            background-position: 50%,50%;\n            background-repeat: no-repeat;\n            z-index: 9;\n            position: relative;\n            text-align: center;\n        }\n        .ejs-f9-content #header .ejs-right-a-1 {\n            margin-right: 0px;\n        }\n        </style>');
        var f9Div = document.querySelector('.ejs-f9-content');
        if (!f9Div) {
            console.error('缺少ejs-f9-content样式，请在需要调试ejs的页面body加入class="ejs-f9-content"');

            return;
        }
        document.querySelector('header#header') && document.querySelector('header#header').remove();
        var divNav = '<header id="header" class="mui-bar mui-bar-nav ">\n                            <a class="ejs-action-back mui-icon mui-icon-left-nav  mui-pull-left ' + (Util.os.dd ? 'mui-hidden' : '') + '"></a>\n                            <span id="title" class="mui-title">\n                                <div class="ejs-title">' + document.title + '</div>\n                                <div class="ejs-sub-title"></div>\n                            </span>\n                            <a id="info" class="mui-pull-right mui-hidden ejs-right-a-0"></a>\n                            <a id="info" class="mui-pull-right mui-hidden ejs-right-a-1"></a>\n                        </header>';

        f9Div.insertBefore(parseHtml$1(divNav), f9Div.childNodes[0]);
        cb && cb();
    } else {
        cb && cb();
    }
};
var hasNavDiv = function hasNavDiv(cb) {
    commonClassName$2(function () {
        mui('.ejs-f9-content').on('click', '.ejs-action-back', function () {
            parent.delIframe();
        });
        cb && cb();
    });
};

function setTitle(opt) {
    hasNavDiv(function () {
        var titleDiv = document.querySelector('.ejs-title');
        var subTitleDiv = document.querySelector('.ejs-sub-title');

        document.querySelector('.mui-bar .mui-title .ejs-title').innerText = opt.title;
        if (opt.subTitle) {
            document.querySelector('.mui-bar .mui-title .ejs-sub-title').innerText = opt.subTitle;
            titleDiv.style.height = '30px';
            titleDiv.style.lineHeight = '30px';
            subTitleDiv.style.height = '14px';
            subTitleDiv.style.lineHeight = '14px';
            subTitleDiv.style.fontSize = '16px';
        } else {
            document.querySelector('.mui-bar .mui-title .ejs-sub-title').innerText = '';
            titleDiv.style.height = '';
            titleDiv.style.lineHeight = '';
            subTitleDiv.style.height = '0';
            subTitleDiv.style.lineHeight = '';
            subTitleDiv.style.fontSize = '';
        }
    });
}

function setMultiTitle(opt, cb) {
    hasNavDiv(function () {
        var tab0 = opt.titles[0];
        var tab1 = opt.titles[1];
        var titleDiv = document.querySelector('.mui-title');
        titleDiv.style.display = 'flex';
        titleDiv.style.justifyContent = 'center';
        titleDiv.style.height = '44px';
        titleDiv.style.alignItems = 'center';
        var multDiv = '\n        <button class="ejs-tab ejs-tab0 ejs-tab-active">' + tab0 + '</button>\n        <button class="ejs-tab ejs-tab1">' + tab1 + '</button>';
        document.querySelector('.mui-title').innerHTML = multDiv;
        var callback = function callback(num) {
            cb && cb({
                which: num
            });
        };
        mui('#header').off('click', '.ejs-tab');
        mui('#header').on('click', '.ejs-tab', function (el) {
            document.querySelector('.ejs-tab-active').classList.remove('ejs-tab-active');
            el.target.classList.add('ejs-tab-active');
            if (el.target.classList.contains('ejs-tab0')) {
                callback(0);
            } else {
                callback(1);
            }
        });
    });
}

function setRightBtn(opt, cb) {
    hasNavDiv(function () {
        var text = opt.text;
        var imageUrl = opt.imageUrl;
        var isShow = opt.isShow;
        var which = opt.which;
        var textleDiv = document.querySelector('.ejs-right-a-' + which);
        if (isShow === 1) {
            textleDiv.classList.remove('mui-hidden');
            if (!imageUrl) {
                textleDiv.innerText = text;
                textleDiv.style.backgroundImage = '';
            } else {
                textleDiv.innerText = '';
                textleDiv.style.backgroundImage = 'url(' + imageUrl + ')';
            }
        } else {
            textleDiv.classList.add('mui-hidden');
        }

        var callback = function callback(num) {
            cb && cb({
                which: num
            });
        };
        mui('#header').off('click', '.ejs-right-a-' + which);
        mui('#header').on('click', '.ejs-right-a-' + which, function () {
            callback(which);
        });
    });
}

function pageMixin$1(hybrid) {
    var hybridJs = hybrid;

    hybridJs.extendModule('navigator', [{
        namespace: 'setTitle',
        os: ['h5'],
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
            var innerUtil = hybridJs.innerUtil;
            // 兼容字符串形式

            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
                rest[_key] = arguments[_key];
            }

            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'title');
            var options = args[0];
            var resolve = args[1];

            setTitle(options);
            options.success && options.success({});
            resolve && resolve({});
        }
    }, {
        namespace: 'setMultiTitle',
        os: ['h5'],
        defaultParams: {
            titles: ''
        },
        runCode: function runCode() {
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                rest[_key2] = arguments[_key2];
            }

            var args = rest;
            var options = args[0];
            var resolve = args[1];

            setMultiTitle(options, function (result) {
                options.success && options.success(result);
                resolve && resolve(result);
            });
        }
    }, {
        namespace: 'setRightBtn',
        os: ['h5'],
        defaultParams: {
            text: '',
            imageUrl: '',
            isShow: 1,
            // 对应哪一个按钮，一般是0, 1可选择
            which: 0
        },
        runCode: function runCode() {
            for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                rest[_key3] = arguments[_key3];
            }

            var args = rest;
            var options = args[0];
            var resolve = args[1];

            setRightBtn(options, function (result) {
                options.success && options.success(result);
                resolve && resolve(result);
            });
        }
    }]);
}

function authMixin(hybrid) {
    var hybridJs = hybrid;

    hybridJs.extendModule('auth', [{
        namespace: 'getUserInfo',
        os: ['h5'],
        runCode: function runCode() {
            var innerUtil = hybridJs.innerUtil;
            // 兼容字符串形式

            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
                rest[_key] = arguments[_key];
            }

            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'title');
            var options = args[0];
            var resolve = args[1];
            Util.ajax({
                url: Util.getProjectBasePath('') + 'rest/frame/getuserinfo_guid_v7',
                contentType: 'application/x-www-form-urlencoded',
                type: 'POST',
                data: {
                    params: JSON.stringify({})
                },
                success: function success(result) {
                    var userInfo = {
                        userInfo: JSON.stringify(result.custom)
                    };
                    options.success && options.success(userInfo);
                    resolve && resolve(userInfo);
                },
                error: function error(err) {
                    console.log(err);
                }
            });
        }
    }]);
}

var hybridJs = window.ejs;

uiMixin(hybridJs);
authMixin(hybridJs);
pageMixin(hybridJs);
storageMixin(hybridJs);
deviceMixin(hybridJs);
utilMixin(hybridJs);
pageMixin$1(hybridJs);

})));
