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
        os: ['ejs'],
        defaultParams: {
            message: '',
            h5UI: false
        },
        runCode: function runCode() {
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
                rest[_key] = arguments[_key];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'message');
            var options = args[0];
            var h5UI = options.h5UI;
            var resolve = args[1];

            if (h5UI !== false) {
                toast(options);
                options.success && options.success();
                resolve && resolve();
            } else {
                hybridJs.callInner.apply(this, args);
            }
        }
    }, {
        namespace: 'showDebugDialog',
        os: ['ejs'],
        defaultParams: {
            debugInfo: '',
            h5UI: false
        },
        runCode: function runCode() {
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                rest[_key2] = arguments[_key2];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject(rest, 'debugInfo');

            var h5UI = args[0].h5UI;

            if (h5UI !== false) {
                args[0] = {
                    title: '',
                    message: args[0].debugInfo,
                    buttonName: '确定',
                    h5UI: true,
                    success: args[0].success
                };
                ejs.ui.alert.apply(this, args);
            } else {
                hybridJs.callInner.apply(this, args);
            }
        }
    }, {
        namespace: 'alert',
        os: ['ejs'],
        defaultParams: {
            title: '',
            message: '',
            buttonName: '确定',
            // 默认可取消
            cancelable: 1,
            h5UI: false
        },
        // 用confirm来模拟alert
        runCode: function runCode() {
            for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                rest[_key3] = arguments[_key3];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'message', 'title', 'buttonName');

            var options = args[0];
            var resolve = args[1];
            var h5UI = options.h5UI;

            if (h5UI !== false) {
                alert(options, function () {
                    options.success && options.success({});
                    resolve && resolve({});
                });
            } else {
                args[0].buttonLabels = [args[0].buttonName];
                hybridJs.ui.confirm.apply(this, args);
            }
        }
    }, {
        namespace: 'confirm',
        os: ['ejs'],
        defaultParams: {
            title: '',
            message: '',
            buttonLabels: ['取消', '确定'],
            // 默认可取消
            cancelable: 1,
            h5UI: false
        },
        runCode: function runCode() {
            for (var _len4 = arguments.length, rest = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                rest[_key4] = arguments[_key4];
            }

            // 兼容字符串形式
            var args = rest;
            var options = args[0];
            var resolve = args[1];
            var h5UI = options.h5UI;

            if (h5UI !== false) {
                confirm(options, function (index) {
                    var result = {
                        which: index
                    };

                    options.success && options.success(result);
                    resolve && resolve(result);
                });
            } else {
                hybridJs.callInner.apply(this, args);
            }
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
            buttonLabels: ['取消', '确定'],
            // 默认可取消
            cancelable: 1,
            h5UI: false
        },
        runCode: function runCode() {
            for (var _len5 = arguments.length, rest = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                rest[_key5] = arguments[_key5];
            }

            // 兼容字符串形式
            var args = rest;
            var options = args[0];
            var resolve = args[1];

            var h5UI = options.h5UI;

            if (h5UI !== false) {
                prompt(options, function (index, params) {
                    var content = params.content || '';
                    var result = {
                        which: index ? 1 : 0,
                        content: content
                    };

                    options.success && options.success(result);
                    resolve && resolve(result);
                });
            } else {
                hybridJs.callInner.apply(this, args);
            }
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
            columns: 3,
            // 可取消
            cancelable: 1,
            h5UI: false
        },
        runCode: function runCode() {
            for (var _len6 = arguments.length, rest = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                rest[_key6] = arguments[_key6];
            }

            var args = rest;
            var options = args[0];
            var h5UI = options.h5UI;

            if (h5UI !== false) {
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
            } else {
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
            for (var _len7 = arguments.length, rest = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
                rest[_key7] = arguments[_key7];
            }

            var args = rest;
            var options = args[0];
            var originalItems = options.items;
            var resolve = args[1];
            var h5UI = options.h5UI;

            if (h5UI !== false) {
                actionsheet(options, function (title) {
                    var index = options.items.indexOf(title);
                    var result = {
                        which: index,
                        content: title
                    };

                    options.success && options.success(result);
                    resolve && resolve(result);
                });
            } else {
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
            for (var _len8 = arguments.length, rest = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
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
            // 部分设备上设置标题后遮挡控件可不设置标题
            title: '',
            // 默认为空为使用当前时间
            // 格式为 yyyy-MM-dd。
            datetime: '',
            h5UI: false
        },
        runCode: function runCode() {
            for (var _len9 = arguments.length, rest = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
                rest[_key9] = arguments[_key9];
            }

            // 兼容字符串形式
            var args = rest;
            var options = args[0];
            var datetime = options.datetime;
            var h5UI = options.h5UI;

            if (h5UI !== false) {
                if (!datetime) {
                    // 如果不存在，默认为当前时间
                    var dateNow = new Date();

                    datetime = dateNow.getFullYear() + '\n                    -' + paddingWith0(dateNow.getMonth() + 1) + '\n                    -' + paddingWith0(dateNow.getDate());
                }
                options.value = datetime;
                options.type = 'date';

                pickerDateWithArgs(args);
            } else {
                hybridJs.callInner.apply(this, args);
            }
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
            h5UI: false
        },
        runCode: function runCode() {
            for (var _len10 = arguments.length, rest = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
                rest[_key10] = arguments[_key10];
            }

            // 兼容字符串形式
            var args = rest;
            var options = args[0];
            var h5UI = options.h5UI;

            if (h5UI !== false) {
                var dateNow = new Date();
                var datePrefix = dateNow.getFullYear() + '\n                -' + paddingWith0(dateNow.getMonth() + 1) + '\n                -' + paddingWith0(dateNow.getDate()) + ' ';
                var datetime = options.datetime;

                if (!datetime) {
                    // 如果不存在，默认为当前时间
                    var dateSuffix = paddingWith0(dateNow.getHours()) + '\n                :' + paddingWith0(dateNow.getMinutes());

                    datetime = datePrefix + dateSuffix;
                } else {
                    datetime = datePrefix + datetime;
                }
                options.value = datetime;
                options.type = 'time';

                pickerDateWithArgs(args);
            } else {
                hybridJs.callInner.apply(this, args);
            }
        }
    }, {
        namespace: 'pickDateTime',
        os: ['ejs'],
        defaultParams: {
            title1: '',
            title2: '',
            // 默认为空为使用当前时间
            // 格式为 yyyy-MM-dd HH:mm
            datetime: '',
            h5UI: false
        },
        runCode: function runCode() {
            for (var _len11 = arguments.length, rest = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
                rest[_key11] = arguments[_key11];
            }

            // 兼容字符串形式
            var args = rest;
            var options = args[0];
            var h5UI = options.h5UI;
            var datetime = options.datetime;

            if (h5UI !== false) {
                if (!datetime) {
                    // 如果不存在，默认为当前时间
                    var dateNow = new Date();
                    var datePrefix = dateNow.getFullYear() + '\n                -' + paddingWith0(dateNow.getMonth() + 1) + '\n                -' + paddingWith0(dateNow.getDate()) + ' ';
                    var dateSuffix = paddingWith0(dateNow.getHours()) + '\n                :' + paddingWith0(dateNow.getMinutes());

                    datetime = datePrefix + dateSuffix;
                }
                options.value = datetime;
                options.type = null;

                pickerDateWithArgs(args);
            } else {
                hybridJs.callInner.apply(this, args);
            }
        }
    }, {
        namespace: 'showWaiting',
        os: ['ejs'],
        defaultParams: {
            message: '加载中...',
            h5UI: false
        },
        runCode: function runCode() {
            for (var _len12 = arguments.length, rest = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
                rest[_key12] = arguments[_key12];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'message');
            var options = args[0];
            var resolve = args[1];
            var h5UI = options.h5UI;

            if (h5UI !== false) {
                showWaiting(options.message, {
                    padlock: options.padlock
                });

                options.success && options.success({});
                resolve && resolve({});
            } else {
                hybridJs.callInner.apply(this, args);
            }
        }
    }, {
        namespace: 'closeWaiting',
        os: ['ejs'],
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

            hybridJs.callInner.apply(this, args);
        }
    }, {
        namespace: 'pullToRefresh.disable',
        os: ['ejs'],
        runCode: function runCode() {
            // 修改为原生中的namespace
            this.api.namespace = 'pullToRefreshDisable';

            for (var _len14 = arguments.length, rest = Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
                rest[_key14] = arguments[_key14];
            }

            hybridJs.callInner.apply(this, rest);
        }
    }, {
        namespace: 'pullToRefresh.stop',
        os: ['ejs'],
        runCode: function runCode() {
            // 修改为原生中的namespace
            this.api.namespace = 'pullToRefreshStop';

            for (var _len15 = arguments.length, rest = Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
                rest[_key15] = arguments[_key15];
            }

            hybridJs.callInner.apply(this, rest);
        }
    }, {
        namespace: 'pullToRefresh.enable',
        os: ['ejs'],
        defaultParams: {
            color: '000000'
        },
        /**
         * 启用下拉刷新后，只要有下拉刷新就会回调，属于长期回调范围
         */
        runCode: function runCode() {
            // 修改为原生中的namespace
            this.api.namespace = 'pullToRefreshEnable';
            this.api.isLongCb = true;

            for (var _len16 = arguments.length, rest = Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
                rest[_key16] = arguments[_key16];
            }

            hybridJs.callInner.apply(this, rest);
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
        namespace: 'checkUpdate',
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
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
                rest[_key] = arguments[_key];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'text');

            hybridJs.callInner.apply(this, args);
        }
    }, {
        namespace: 'openUrl',
        os: ['ejs'],
        defaultParams: {
            url: ''
        },
        runCode: function runCode() {
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                rest[_key2] = arguments[_key2];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject(rest, 'url');

            hybridJs.callInner.apply(this, args);
        }
    }, {
        namespace: 'log',
        os: ['ejs'],
        defaultParams: {
            text: ''
        },
        runCode: function runCode() {
            for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                rest[_key3] = arguments[_key3];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'text');

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
            for (var _len4 = arguments.length, rest = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                rest[_key4] = arguments[_key4];
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
            // 1表示显示，0表示隐藏
            isShow: 1
        }
    }, {
        namespace: 'setBounce',
        os: ['ejs'],
        defaultParams: {
            // 1表示开启，0表示关闭
            isEnable: 1
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
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
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
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
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
            for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
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
            isShow: 1
        },
        runCode: function runCode() {
            for (var _len4 = arguments.length, rest = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
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
            isEnable: 1
        },
        runCode: function runCode() {
            for (var _len5 = arguments.length, rest = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
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

            for (var _len6 = arguments.length, rest = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
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

            for (var _len7 = arguments.length, rest = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
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
        support: '3.4.2'
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
        netChange: 'OnNetChanged',
        search: 'OnSearch',
        destroy: 'OnPageDestroy',
        created: 'OnPageCreated'
    };

    hybridJs.extendModule('event', [{
        namespace: 'registerEvent',
        os: ['ejs'],
        defaultParams: {
            key: ''
        },
        runCode: function runCode() {
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
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
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                rest[_key2] = arguments[_key2];
            }

            var args = rest;
            var options = args[0];

            options.key = EVENT_MAPPING[options.key];
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
            for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                rest[_key3] = arguments[_key3];
            }

            var args = rest;
            var options = args[0];

            options.key = EVENT_MAPPING[options.key];
            args[0] = options;

            hybridJs.callInner.apply(this, args);
        }
    }, {
        namespace: 'config',
        os: ['ejs'],
        defaultParams: {
            // 一个数组，不要传null，否则可能在iOS中会有问题
            jsApiList: []
        }
    }, {
        namespace: 'dispatchEventToNative',
        os: ['ejs']
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
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
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
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
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
        namespace: 'collection.getCollections',
        os: ['ejs'],
        defaultParams: {
            pageIndex: 1,
            pageSize: 20
        },
        runCode: function runCode() {
            // 修改为原生中的namespace
            this.api.namespace = 'getCollections';

            for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                rest[_key3] = arguments[_key3];
            }

            hybridJs.callInner.apply(this, rest);
        }
    }, {
        namespace: 'collection.saveCollections',
        os: ['ejs'],
        defaultParams: {
            // 信息guid，必选
            msgGuid: '',
            // 信息标题，必选
            title: '',
            // 信息类型,根据业务需求自行定义，必选
            type: '',
            // 以下为可选内容
            dateTime: '',
            publisher: '',
            // 链接地址
            forward: '',
            remark: '',
            flag: ''
        },
        runCode: function runCode() {
            // 修改为原生中的namespace
            this.api.namespace = 'saveCollections';

            for (var _len4 = arguments.length, rest = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                rest[_key4] = arguments[_key4];
            }

            hybridJs.callInner.apply(this, rest);
        }
    }, {
        namespace: 'collection.isCollection',
        os: ['ejs'],
        defaultParams: {
            // 信息guid，必选
            msgGuid: ''
        },
        runCode: function runCode() {
            // 修改为原生中的namespace
            this.api.namespace = 'isCollection';

            for (var _len5 = arguments.length, rest = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                rest[_key5] = arguments[_key5];
            }

            hybridJs.callInner.apply(this, rest);
        }
    }, {
        namespace: 'collection.delCollection',
        os: ['ejs'],
        defaultParams: {
            // 信息guid，必选
            msgGuid: ''
        },
        runCode: function runCode() {
            // 修改为原生中的namespace
            this.api.namespace = 'delCollection';

            for (var _len6 = arguments.length, rest = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                rest[_key6] = arguments[_key6];
            }

            hybridJs.callInner.apply(this, rest);
        }
    }, {
        namespace: 'collection.delAllCollections',
        os: ['ejs'],
        runCode: function runCode() {
            // 修改为原生中的namespace
            this.api.namespace = 'delAllCollections';

            for (var _len7 = arguments.length, rest = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
                rest[_key7] = arguments[_key7];
            }

            hybridJs.callInner.apply(this, rest);
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
            for (var _len8 = arguments.length, rest = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
                rest[_key8] = arguments[_key8];
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
        // 获取小程序通用平台参数配置
        namespace: 'getPlatformShareParam',
        os: ['ejs'],
        defaultParams: {
            // 对应的key
            key: ''
        },
        runCode: function runCode() {
            for (var _len9 = arguments.length, rest = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
                rest[_key9] = arguments[_key9];
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
        // 获取小程序独立配置参数
        namespace: 'getPlatformPrivateParam',
        os: ['ejs'],
        defaultParams: {
            // 对应的key
            key: ''
        },
        runCode: function runCode() {
            for (var _len10 = arguments.length, rest = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
                rest[_key10] = arguments[_key10];
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
        // 小程序通用数据库取数据
        namespace: 'getShareItem',
        os: ['ejs'],
        defaultParams: {
            // 对应的key
            key: ''
        },
        runCode: function runCode() {
            for (var _len11 = arguments.length, rest = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
                rest[_key11] = arguments[_key11];
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
            for (var _len12 = arguments.length, rest = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
                rest[_key12] = arguments[_key12];
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

function cardMixin(hybrid) {
    var hybridJS = hybrid;
    var innerUtil = hybridJS.innerUtil;

    hybridJS.extendModule('card', [{
        namespace: 'setTitle',
        os: ['ejs'],
        defaultParams: {
            text: '',
            imageUrl: ''
        },
        support: '3.1.6',
        runCode: function runCode() {
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
                rest[_key] = arguments[_key];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'text');

            hybridJS.callInner.apply(this, args);
        }
    }, {
        namespace: 'hide',
        os: ['ejs'],
        support: '3.1.6'
    }, {
        namespace: 'hideTitleBar',
        os: ['ejs'],
        support: '3.1.6'
    }, {
        namespace: 'addActionBtns',
        os: ['ejs'],
        defaultParams: {
            buttonTexts: ['menu1', 'menu2', 'menu3']
        },
        support: '3.1.6',
        runCode: function runCode() {
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                rest[_key2] = arguments[_key2];
            }

            var args = rest;

            args[0].buttonTexts = innerUtil.eclipseButtonsNumber(args[0].buttonTexts, 3);

            hybridJS.callInner.apply(this, args);
        }
    }, {
        namespace: 'hideActionBar',
        os: ['ejs'],
        support: '3.1.6'
    }, {
        namespace: 'showTip',
        os: ['ejs'],
        defaultParams: {
            tip: ''
        },
        support: '3.1.6',
        runCode: function runCode() {
            for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                rest[_key3] = arguments[_key3];
            }

            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'tip');

            hybridJS.callInner.apply(this, args);
        }
    }, {
        namespace: 'hideTip',
        os: ['ejs'],
        support: '3.1.6'
    }, {
        namespace: 'setTitleBtn',
        os: ['ejs'],
        defaultParams: {
            text: ''
        },
        support: '3.1.6',
        runCode: function runCode() {
            for (var _len4 = arguments.length, rest = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                rest[_key4] = arguments[_key4];
            }

            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'text');

            this.api.isLongCb = true;

            hybridJS.callInner.apply(this, args);
        }
    }, {
        namespace: 'setContentHeight',
        os: ['ejs'],
        support: '3.2.6',
        defaultParams: {
            unit: ''
        }
    }]);
}

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
            // 额外数据
            data: {},
            useRouter: true
        },
        runCode: function runCode() {
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
                rest[_key] = arguments[_key];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'pageUrl', 'data');
            var options = args[0];

            if (window.vm && vm.$router && options.useRouter) {
                options.pageUrl = innerUtil.getFullUrlByParams(options.pageUrl, options.data, true);
                vm.$router.push(options.pageUrl);
            } else {
                // 将额外数据拼接到url中
                options.pageUrl = innerUtil.getFullUrlByParams(options.pageUrl, options.data);
                // 去除无用参数的干扰
                options.data = undefined;

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
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
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
            resultData: ''
        },
        runCode: function runCode() {
            for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                rest[_key3] = arguments[_key3];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'resultData');

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
            for (var _len4 = arguments.length, rest = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
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
            url: ''
        },
        runCode: function runCode() {
            for (var _len5 = arguments.length, rest = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                rest[_key5] = arguments[_key5];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'url');

            var options = args[0];

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
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
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

            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
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

            for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
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

            for (var _len4 = arguments.length, rest = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                rest[_key4] = arguments[_key4];
            }

            hybridJs.callInner.apply(this, rest);
        }
    }, {
        namespace: 'hookBackBtn',
        os: ['ejs'],
        runCode: function runCode() {
            this.api.isLongCb = true;

            for (var _len5 = arguments.length, rest = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
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
            for (var _len6 = arguments.length, rest = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
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

            for (var _len7 = arguments.length, rest = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
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
            for (var _len8 = arguments.length, rest = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
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
            for (var _len9 = arguments.length, rest = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
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

            for (var _len10 = arguments.length, rest = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
                rest[_key10] = arguments[_key10];
            }

            hybridJs.callInner.apply(this, rest);
        }
    }, {
        namespace: 'hideBackBtn',
        os: ['ejs'],
        support: '3.4.1'
    }]);
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
        namespace: 'downloadFile',
        os: ['ejs'],
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
            isBackground: 1
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
        namespace: 'selectFile',
        os: ['ejs'],
        defaultParams: {
            // 文件数量
            count: 9
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
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
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
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                rest[_key2] = arguments[_key2];
            }

            // 兼容字符串形式
            var args = rest;

            args[0].className = args[0].className;
            args[0].data = {
                maxDuration: args[0].maxDuration
            };

            hybridJs.page.openLocal.apply(this, args);
        }
    }, {
        namespace: 'getPreviewUrl',
        os: ['ejs']
    }, {
        namespace: 'openFile',
        os: ['ejs'],
        defaultParams: {
            path: ''
        },
        runCode: function runCode() {
            for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                rest[_key3] = arguments[_key3];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'path');

            hybridJs.callInner.apply(this, args);
        }
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
            for (var _len4 = arguments.length, rest = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                rest[_key4] = arguments[_key4];
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
            dataMap: ''
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
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
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
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
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
            for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
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

/**
 * 如果version1大于version2，返回1，如果小于，返回-1，否则返回0。 TODO
 * 增加可以比较字母 2019年12月6日 14:45:59 wsz
 * @param {string} version1 版本1
 * @param {string} version2 版本2
 * @return {number} 返回版本1和版本2的关系
 */
function compareVersion(version1, version2) {
    if (typeof version1 !== 'string' || typeof version2 !== 'string') {
        throw new Error('version need to be string type');
    }

    var versionNumber1 = version1.replace(/[a-zA-Z]/g, function (match) {
        return match.charCodeAt();
    }).replace(/[^\d]/g, '') - 0;
    var versionNumber2 = version2.replace(/[a-zA-Z]/g, function (match) {
        return match.charCodeAt();
    }).replace(/[^\d]/g, '') - 0;

    if (versionNumber1 > versionNumber2) {
        return 1;
    } else if (versionNumber1 < versionNumber2) {
        return -1;
    }
    return 0;
}

/**
 * 字符串超出截取
 * @param {string} str 目标字符串
 * @param {Number} count 字数，以英文为基数，如果是中文，会自动除2
 * @return {string} 返回截取后的字符串
 * 暂时不考虑只遍历一部分的性能问题，因为在应用场景内是微不足道的
 */


/**
 * 得到一个项目的根路径
 * h5模式下例如:http://id:端口/项目名/
 * @return {String} 项目的根路径
 */


/**
 * 将相对路径转为绝对路径 ./ ../ 开头的  为相对路径
 * 会基于对应调用js的html路径去计算
 * @param {String} path 需要转换的路径
 * @return {String} 返回转换后的路径
 */


/**
 * 得到一个全路径
 * @param {String} path 路径
 * @return {String} 返回最终的路径
 */


/**
 * 将json参数拼接到url中
 * @param {String} url url地址
 * @param {Object} data 需要添加的json数据
 * @param {Boolean} type 是否相对路径
 * @return {String} 返回最终的url
 */


/**
 * 获取 base64 去除 url 部分
 * @param {String} base64 base64值
 * @returns {String} 该 base64 去除 url 后的值
 */

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**!
 * Sortable 1.10.2
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
(function (global, factory) {
  (typeof exports === 'undefined' ? 'undefined' : _typeof2(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = global || self, global.Sortable = factory());
})(undefined, function () {
  'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
      };
    }

    return _typeof(obj);
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var version = "1.10.2";

  function userAgent(pattern) {
    if (typeof window !== 'undefined' && window.navigator) {
      return !!
      /*@__PURE__*/
      navigator.userAgent.match(pattern);
    }
  }

  var IE11OrLess = userAgent(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i);
  var Edge = userAgent(/Edge/i);
  var FireFox = userAgent(/firefox/i);
  var Safari = userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i);
  var IOS = userAgent(/iP(ad|od|hone)/i);
  var ChromeForAndroid = userAgent(/chrome/i) && userAgent(/android/i);

  var captureMode = {
    capture: false,
    passive: false
  };

  function on(el, event, fn) {
    el.addEventListener(event, fn, !IE11OrLess && captureMode);
  }

  function off(el, event, fn) {
    el.removeEventListener(event, fn, !IE11OrLess && captureMode);
  }

  function matches(
  /**HTMLElement*/
  el,
  /**String*/
  selector) {
    if (!selector) return;
    selector[0] === '>' && (selector = selector.substring(1));

    if (el) {
      try {
        if (el.matches) {
          return el.matches(selector);
        } else if (el.msMatchesSelector) {
          return el.msMatchesSelector(selector);
        } else if (el.webkitMatchesSelector) {
          return el.webkitMatchesSelector(selector);
        }
      } catch (_) {
        return false;
      }
    }

    return false;
  }

  function getParentOrHost(el) {
    return el.host && el !== document && el.host.nodeType ? el.host : el.parentNode;
  }

  function closest(
  /**HTMLElement*/
  el,
  /**String*/
  selector,
  /**HTMLElement*/
  ctx, includeCTX) {
    if (el) {
      ctx = ctx || document;

      do {
        if (selector != null && (selector[0] === '>' ? el.parentNode === ctx && matches(el, selector) : matches(el, selector)) || includeCTX && el === ctx) {
          return el;
        }

        if (el === ctx) break;
        /* jshint boss:true */
      } while (el = getParentOrHost(el));
    }

    return null;
  }

  var R_SPACE = /\s+/g;

  function toggleClass(el, name, state) {
    if (el && name) {
      if (el.classList) {
        el.classList[state ? 'add' : 'remove'](name);
      } else {
        var className = (' ' + el.className + ' ').replace(R_SPACE, ' ').replace(' ' + name + ' ', ' ');
        el.className = (className + (state ? ' ' + name : '')).replace(R_SPACE, ' ');
      }
    }
  }

  function css(el, prop, val) {
    var style = el && el.style;

    if (style) {
      if (val === void 0) {
        if (document.defaultView && document.defaultView.getComputedStyle) {
          val = document.defaultView.getComputedStyle(el, '');
        } else if (el.currentStyle) {
          val = el.currentStyle;
        }

        return prop === void 0 ? val : val[prop];
      } else {
        if (!(prop in style) && prop.indexOf('webkit') === -1) {
          prop = '-webkit-' + prop;
        }

        style[prop] = val + (typeof val === 'string' ? '' : 'px');
      }
    }
  }

  function matrix(el, selfOnly) {
    var appliedTransforms = '';

    if (typeof el === 'string') {
      appliedTransforms = el;
    } else {
      do {
        var transform = css(el, 'transform');

        if (transform && transform !== 'none') {
          appliedTransforms = transform + ' ' + appliedTransforms;
        }
        /* jshint boss:true */
      } while (!selfOnly && (el = el.parentNode));
    }

    var matrixFn = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
    /*jshint -W056 */

    return matrixFn && new matrixFn(appliedTransforms);
  }

  function find(ctx, tagName, iterator) {
    if (ctx) {
      var list = ctx.getElementsByTagName(tagName),
          i = 0,
          n = list.length;

      if (iterator) {
        for (; i < n; i++) {
          iterator(list[i], i);
        }
      }

      return list;
    }

    return [];
  }

  function getWindowScrollingElement() {
    var scrollingElement = document.scrollingElement;

    if (scrollingElement) {
      return scrollingElement;
    } else {
      return document.documentElement;
    }
  }
  /**
   * Returns the "bounding client rect" of given element
   * @param  {HTMLElement} el                       The element whose boundingClientRect is wanted
   * @param  {[Boolean]} relativeToContainingBlock  Whether the rect should be relative to the containing block of (including) the container
   * @param  {[Boolean]} relativeToNonStaticParent  Whether the rect should be relative to the relative parent of (including) the contaienr
   * @param  {[Boolean]} undoScale                  Whether the container's scale() should be undone
   * @param  {[HTMLElement]} container              The parent the element will be placed in
   * @return {Object}                               The boundingClientRect of el, with specified adjustments
   */

  function getRect(el, relativeToContainingBlock, relativeToNonStaticParent, undoScale, container) {
    if (!el.getBoundingClientRect && el !== window) return;
    var elRect, top, left, bottom, right, height, width;

    if (el !== window && el !== getWindowScrollingElement()) {
      elRect = el.getBoundingClientRect();
      top = elRect.top;
      left = elRect.left;
      bottom = elRect.bottom;
      right = elRect.right;
      height = elRect.height;
      width = elRect.width;
    } else {
      top = 0;
      left = 0;
      bottom = window.innerHeight;
      right = window.innerWidth;
      height = window.innerHeight;
      width = window.innerWidth;
    }

    if ((relativeToContainingBlock || relativeToNonStaticParent) && el !== window) {
      // Adjust for translate()
      container = container || el.parentNode; // solves #1123 (see: https://stackoverflow.com/a/37953806/6088312)
      // Not needed on <= IE11

      if (!IE11OrLess) {
        do {
          if (container && container.getBoundingClientRect && (css(container, 'transform') !== 'none' || relativeToNonStaticParent && css(container, 'position') !== 'static')) {
            var containerRect = container.getBoundingClientRect(); // Set relative to edges of padding box of container

            top -= containerRect.top + parseInt(css(container, 'border-top-width'));
            left -= containerRect.left + parseInt(css(container, 'border-left-width'));
            bottom = top + elRect.height;
            right = left + elRect.width;
            break;
          }
          /* jshint boss:true */
        } while (container = container.parentNode);
      }
    }

    if (undoScale && el !== window) {
      // Adjust for scale()
      var elMatrix = matrix(container || el),
          scaleX = elMatrix && elMatrix.a,
          scaleY = elMatrix && elMatrix.d;

      if (elMatrix) {
        top /= scaleY;
        left /= scaleX;
        width /= scaleX;
        height /= scaleY;
        bottom = top + height;
        right = left + width;
      }
    }

    return {
      top: top,
      left: left,
      bottom: bottom,
      right: right,
      width: width,
      height: height
    };
  }
  /**
   * Checks if a side of an element is scrolled past a side of its parents
   * @param  {HTMLElement}  el           The element who's side being scrolled out of view is in question
   * @param  {String}       elSide       Side of the element in question ('top', 'left', 'right', 'bottom')
   * @param  {String}       parentSide   Side of the parent in question ('top', 'left', 'right', 'bottom')
   * @return {HTMLElement}               The parent scroll element that the el's side is scrolled past, or null if there is no such element
   */

  function isScrolledPast(el, elSide, parentSide) {
    var parent = getParentAutoScrollElement(el, true),
        elSideVal = getRect(el)[elSide];
    /* jshint boss:true */

    while (parent) {
      var parentSideVal = getRect(parent)[parentSide],
          visible = void 0;

      if (parentSide === 'top' || parentSide === 'left') {
        visible = elSideVal >= parentSideVal;
      } else {
        visible = elSideVal <= parentSideVal;
      }

      if (!visible) return parent;
      if (parent === getWindowScrollingElement()) break;
      parent = getParentAutoScrollElement(parent, false);
    }

    return false;
  }
  /**
   * Gets nth child of el, ignoring hidden children, sortable's elements (does not ignore clone if it's visible)
   * and non-draggable elements
   * @param  {HTMLElement} el       The parent element
   * @param  {Number} childNum      The index of the child
   * @param  {Object} options       Parent Sortable's options
   * @return {HTMLElement}          The child at index childNum, or null if not found
   */

  function getChild(el, childNum, options) {
    var currentChild = 0,
        i = 0,
        children = el.children;

    while (i < children.length) {
      if (children[i].style.display !== 'none' && children[i] !== Sortable.ghost && children[i] !== Sortable.dragged && closest(children[i], options.draggable, el, false)) {
        if (currentChild === childNum) {
          return children[i];
        }

        currentChild++;
      }

      i++;
    }

    return null;
  }
  /**
   * Gets the last child in the el, ignoring ghostEl or invisible elements (clones)
   * @param  {HTMLElement} el       Parent element
   * @param  {selector} selector    Any other elements that should be ignored
   * @return {HTMLElement}          The last child, ignoring ghostEl
   */

  function lastChild(el, selector) {
    var last = el.lastElementChild;

    while (last && (last === Sortable.ghost || css(last, 'display') === 'none' || selector && !matches(last, selector))) {
      last = last.previousElementSibling;
    }

    return last || null;
  }
  /**
   * Returns the index of an element within its parent for a selected set of
   * elements
   * @param  {HTMLElement} el
   * @param  {selector} selector
   * @return {number}
   */

  function index(el, selector) {
    var index = 0;

    if (!el || !el.parentNode) {
      return -1;
    }
    /* jshint boss:true */

    while (el = el.previousElementSibling) {
      if (el.nodeName.toUpperCase() !== 'TEMPLATE' && el !== Sortable.clone && (!selector || matches(el, selector))) {
        index++;
      }
    }

    return index;
  }
  /**
   * Returns the scroll offset of the given element, added with all the scroll offsets of parent elements.
   * The value is returned in real pixels.
   * @param  {HTMLElement} el
   * @return {Array}             Offsets in the format of [left, top]
   */

  function getRelativeScrollOffset(el) {
    var offsetLeft = 0,
        offsetTop = 0,
        winScroller = getWindowScrollingElement();

    if (el) {
      do {
        var elMatrix = matrix(el),
            scaleX = elMatrix.a,
            scaleY = elMatrix.d;
        offsetLeft += el.scrollLeft * scaleX;
        offsetTop += el.scrollTop * scaleY;
      } while (el !== winScroller && (el = el.parentNode));
    }

    return [offsetLeft, offsetTop];
  }
  /**
   * Returns the index of the object within the given array
   * @param  {Array} arr   Array that may or may not hold the object
   * @param  {Object} obj  An object that has a key-value pair unique to and identical to a key-value pair in the object you want to find
   * @return {Number}      The index of the object in the array, or -1
   */

  function indexOfObject(arr, obj) {
    for (var i in arr) {
      if (!arr.hasOwnProperty(i)) continue;

      for (var key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] === arr[i][key]) return Number(i);
      }
    }

    return -1;
  }

  function getParentAutoScrollElement(el, includeSelf) {
    // skip to window
    if (!el || !el.getBoundingClientRect) return getWindowScrollingElement();
    var elem = el;
    var gotSelf = false;

    do {
      // we don't need to get elem css if it isn't even overflowing in the first place (performance)
      if (elem.clientWidth < elem.scrollWidth || elem.clientHeight < elem.scrollHeight) {
        var elemCSS = css(elem);

        if (elem.clientWidth < elem.scrollWidth && (elemCSS.overflowX == 'auto' || elemCSS.overflowX == 'scroll') || elem.clientHeight < elem.scrollHeight && (elemCSS.overflowY == 'auto' || elemCSS.overflowY == 'scroll')) {
          if (!elem.getBoundingClientRect || elem === document.body) return getWindowScrollingElement();
          if (gotSelf || includeSelf) return elem;
          gotSelf = true;
        }
      }
      /* jshint boss:true */
    } while (elem = elem.parentNode);

    return getWindowScrollingElement();
  }

  function extend(dst, src) {
    if (dst && src) {
      for (var key in src) {
        if (src.hasOwnProperty(key)) {
          dst[key] = src[key];
        }
      }
    }

    return dst;
  }

  function isRectEqual(rect1, rect2) {
    return Math.round(rect1.top) === Math.round(rect2.top) && Math.round(rect1.left) === Math.round(rect2.left) && Math.round(rect1.height) === Math.round(rect2.height) && Math.round(rect1.width) === Math.round(rect2.width);
  }

  var _throttleTimeout;

  function throttle(callback, ms) {
    return function () {
      if (!_throttleTimeout) {
        var args = arguments,
            _this = this;

        if (args.length === 1) {
          callback.call(_this, args[0]);
        } else {
          callback.apply(_this, args);
        }

        _throttleTimeout = setTimeout(function () {
          _throttleTimeout = void 0;
        }, ms);
      }
    };
  }

  function cancelThrottle() {
    clearTimeout(_throttleTimeout);
    _throttleTimeout = void 0;
  }

  function scrollBy(el, x, y) {
    el.scrollLeft += x;
    el.scrollTop += y;
  }

  function clone(el) {
    var Polymer = window.Polymer;
    var $ = window.jQuery || window.Zepto;

    if (Polymer && Polymer.dom) {
      return Polymer.dom(el).cloneNode(true);
    } else if ($) {
      return $(el).clone(true)[0];
    } else {
      return el.cloneNode(true);
    }
  }

  function setRect(el, rect) {
    css(el, 'position', 'absolute');
    css(el, 'top', rect.top);
    css(el, 'left', rect.left);
    css(el, 'width', rect.width);
    css(el, 'height', rect.height);
  }

  function unsetRect(el) {
    css(el, 'position', '');
    css(el, 'top', '');
    css(el, 'left', '');
    css(el, 'width', '');
    css(el, 'height', '');
  }

  var expando = 'Sortable' + new Date().getTime();

  function AnimationStateManager() {
    var animationStates = [],
        animationCallbackId;
    return {
      captureAnimationState: function captureAnimationState() {
        animationStates = [];
        if (!this.options.animation) return;
        var children = [].slice.call(this.el.children);
        children.forEach(function (child) {
          if (css(child, 'display') === 'none' || child === Sortable.ghost) return;
          animationStates.push({
            target: child,
            rect: getRect(child)
          });

          var fromRect = _objectSpread({}, animationStates[animationStates.length - 1].rect); // If animating: compensate for current animation


          if (child.thisAnimationDuration) {
            var childMatrix = matrix(child, true);

            if (childMatrix) {
              fromRect.top -= childMatrix.f;
              fromRect.left -= childMatrix.e;
            }
          }

          child.fromRect = fromRect;
        });
      },
      addAnimationState: function addAnimationState(state) {
        animationStates.push(state);
      },
      removeAnimationState: function removeAnimationState(target) {
        animationStates.splice(indexOfObject(animationStates, {
          target: target
        }), 1);
      },
      animateAll: function animateAll(callback) {
        var _this = this;

        if (!this.options.animation) {
          clearTimeout(animationCallbackId);
          if (typeof callback === 'function') callback();
          return;
        }

        var animating = false,
            animationTime = 0;
        animationStates.forEach(function (state) {
          var time = 0,
              target = state.target,
              fromRect = target.fromRect,
              toRect = getRect(target),
              prevFromRect = target.prevFromRect,
              prevToRect = target.prevToRect,
              animatingRect = state.rect,
              targetMatrix = matrix(target, true);

          if (targetMatrix) {
            // Compensate for current animation
            toRect.top -= targetMatrix.f;
            toRect.left -= targetMatrix.e;
          }

          target.toRect = toRect;

          if (target.thisAnimationDuration) {
            // Could also check if animatingRect is between fromRect and toRect
            if (isRectEqual(prevFromRect, toRect) && !isRectEqual(fromRect, toRect) && // Make sure animatingRect is on line between toRect & fromRect
            (animatingRect.top - toRect.top) / (animatingRect.left - toRect.left) === (fromRect.top - toRect.top) / (fromRect.left - toRect.left)) {
              // If returning to same place as started from animation and on same axis
              time = calculateRealTime(animatingRect, prevFromRect, prevToRect, _this.options);
            }
          } // if fromRect != toRect: animate


          if (!isRectEqual(toRect, fromRect)) {
            target.prevFromRect = fromRect;
            target.prevToRect = toRect;

            if (!time) {
              time = _this.options.animation;
            }

            _this.animate(target, animatingRect, toRect, time);
          }

          if (time) {
            animating = true;
            animationTime = Math.max(animationTime, time);
            clearTimeout(target.animationResetTimer);
            target.animationResetTimer = setTimeout(function () {
              target.animationTime = 0;
              target.prevFromRect = null;
              target.fromRect = null;
              target.prevToRect = null;
              target.thisAnimationDuration = null;
            }, time);
            target.thisAnimationDuration = time;
          }
        });
        clearTimeout(animationCallbackId);

        if (!animating) {
          if (typeof callback === 'function') callback();
        } else {
          animationCallbackId = setTimeout(function () {
            if (typeof callback === 'function') callback();
          }, animationTime);
        }

        animationStates = [];
      },
      animate: function animate(target, currentRect, toRect, duration) {
        if (duration) {
          css(target, 'transition', '');
          css(target, 'transform', '');
          var elMatrix = matrix(this.el),
              scaleX = elMatrix && elMatrix.a,
              scaleY = elMatrix && elMatrix.d,
              translateX = (currentRect.left - toRect.left) / (scaleX || 1),
              translateY = (currentRect.top - toRect.top) / (scaleY || 1);
          target.animatingX = !!translateX;
          target.animatingY = !!translateY;
          css(target, 'transform', 'translate3d(' + translateX + 'px,' + translateY + 'px,0)');
          css(target, 'transition', 'transform ' + duration + 'ms' + (this.options.easing ? ' ' + this.options.easing : ''));
          css(target, 'transform', 'translate3d(0,0,0)');
          typeof target.animated === 'number' && clearTimeout(target.animated);
          target.animated = setTimeout(function () {
            css(target, 'transition', '');
            css(target, 'transform', '');
            target.animated = false;
            target.animatingX = false;
            target.animatingY = false;
          }, duration);
        }
      }
    };
  }

  function calculateRealTime(animatingRect, fromRect, toRect, options) {
    return Math.sqrt(Math.pow(fromRect.top - animatingRect.top, 2) + Math.pow(fromRect.left - animatingRect.left, 2)) / Math.sqrt(Math.pow(fromRect.top - toRect.top, 2) + Math.pow(fromRect.left - toRect.left, 2)) * options.animation;
  }

  var plugins = [];
  var defaults = {
    initializeByDefault: true
  };
  var PluginManager = {
    mount: function mount(plugin) {
      // Set default static properties
      for (var option in defaults) {
        if (defaults.hasOwnProperty(option) && !(option in plugin)) {
          plugin[option] = defaults[option];
        }
      }

      plugins.push(plugin);
    },
    pluginEvent: function pluginEvent(eventName, sortable, evt) {
      var _this = this;

      this.eventCanceled = false;

      evt.cancel = function () {
        _this.eventCanceled = true;
      };

      var eventNameGlobal = eventName + 'Global';
      plugins.forEach(function (plugin) {
        if (!sortable[plugin.pluginName]) return; // Fire global events if it exists in this sortable

        if (sortable[plugin.pluginName][eventNameGlobal]) {
          sortable[plugin.pluginName][eventNameGlobal](_objectSpread({
            sortable: sortable
          }, evt));
        } // Only fire plugin event if plugin is enabled in this sortable,
        // and plugin has event defined


        if (sortable.options[plugin.pluginName] && sortable[plugin.pluginName][eventName]) {
          sortable[plugin.pluginName][eventName](_objectSpread({
            sortable: sortable
          }, evt));
        }
      });
    },
    initializePlugins: function initializePlugins(sortable, el, defaults, options) {
      plugins.forEach(function (plugin) {
        var pluginName = plugin.pluginName;
        if (!sortable.options[pluginName] && !plugin.initializeByDefault) return;
        var initialized = new plugin(sortable, el, sortable.options);
        initialized.sortable = sortable;
        initialized.options = sortable.options;
        sortable[pluginName] = initialized; // Add default options from plugin

        _extends(defaults, initialized.defaults);
      });

      for (var option in sortable.options) {
        if (!sortable.options.hasOwnProperty(option)) continue;
        var modified = this.modifyOption(sortable, option, sortable.options[option]);

        if (typeof modified !== 'undefined') {
          sortable.options[option] = modified;
        }
      }
    },
    getEventProperties: function getEventProperties(name, sortable) {
      var eventProperties = {};
      plugins.forEach(function (plugin) {
        if (typeof plugin.eventProperties !== 'function') return;

        _extends(eventProperties, plugin.eventProperties.call(sortable[plugin.pluginName], name));
      });
      return eventProperties;
    },
    modifyOption: function modifyOption(sortable, name, value) {
      var modifiedValue;
      plugins.forEach(function (plugin) {
        // Plugin must exist on the Sortable
        if (!sortable[plugin.pluginName]) return; // If static option listener exists for this option, call in the context of the Sortable's instance of this plugin

        if (plugin.optionListeners && typeof plugin.optionListeners[name] === 'function') {
          modifiedValue = plugin.optionListeners[name].call(sortable[plugin.pluginName], value);
        }
      });
      return modifiedValue;
    }
  };

  function dispatchEvent(_ref) {
    var sortable = _ref.sortable,
        rootEl = _ref.rootEl,
        name = _ref.name,
        targetEl = _ref.targetEl,
        cloneEl = _ref.cloneEl,
        toEl = _ref.toEl,
        fromEl = _ref.fromEl,
        oldIndex = _ref.oldIndex,
        newIndex = _ref.newIndex,
        oldDraggableIndex = _ref.oldDraggableIndex,
        newDraggableIndex = _ref.newDraggableIndex,
        originalEvent = _ref.originalEvent,
        putSortable = _ref.putSortable,
        extraEventProperties = _ref.extraEventProperties;
    sortable = sortable || rootEl && rootEl[expando];
    if (!sortable) return;
    var evt,
        options = sortable.options,
        onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1); // Support for new CustomEvent feature

    if (window.CustomEvent && !IE11OrLess && !Edge) {
      evt = new CustomEvent(name, {
        bubbles: true,
        cancelable: true
      });
    } else {
      evt = document.createEvent('Event');
      evt.initEvent(name, true, true);
    }

    evt.to = toEl || rootEl;
    evt.from = fromEl || rootEl;
    evt.item = targetEl || rootEl;
    evt.clone = cloneEl;
    evt.oldIndex = oldIndex;
    evt.newIndex = newIndex;
    evt.oldDraggableIndex = oldDraggableIndex;
    evt.newDraggableIndex = newDraggableIndex;
    evt.originalEvent = originalEvent;
    evt.pullMode = putSortable ? putSortable.lastPutMode : undefined;

    var allEventProperties = _objectSpread({}, extraEventProperties, PluginManager.getEventProperties(name, sortable));

    for (var option in allEventProperties) {
      evt[option] = allEventProperties[option];
    }

    if (rootEl) {
      rootEl.dispatchEvent(evt);
    }

    if (options[onName]) {
      options[onName].call(sortable, evt);
    }
  }

  var pluginEvent = function pluginEvent(eventName, sortable) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        originalEvent = _ref.evt,
        data = _objectWithoutProperties(_ref, ["evt"]);

    PluginManager.pluginEvent.bind(Sortable)(eventName, sortable, _objectSpread({
      dragEl: dragEl,
      parentEl: parentEl,
      ghostEl: ghostEl,
      rootEl: rootEl,
      nextEl: nextEl,
      lastDownEl: lastDownEl,
      cloneEl: cloneEl,
      cloneHidden: cloneHidden,
      dragStarted: moved,
      putSortable: putSortable,
      activeSortable: Sortable.active,
      originalEvent: originalEvent,
      oldIndex: oldIndex,
      oldDraggableIndex: oldDraggableIndex,
      newIndex: newIndex,
      newDraggableIndex: newDraggableIndex,
      hideGhostForTarget: _hideGhostForTarget,
      unhideGhostForTarget: _unhideGhostForTarget,
      cloneNowHidden: function cloneNowHidden() {
        cloneHidden = true;
      },
      cloneNowShown: function cloneNowShown() {
        cloneHidden = false;
      },
      dispatchSortableEvent: function dispatchSortableEvent(name) {
        _dispatchEvent({
          sortable: sortable,
          name: name,
          originalEvent: originalEvent
        });
      }
    }, data));
  };

  function _dispatchEvent(info) {
    dispatchEvent(_objectSpread({
      putSortable: putSortable,
      cloneEl: cloneEl,
      targetEl: dragEl,
      rootEl: rootEl,
      oldIndex: oldIndex,
      oldDraggableIndex: oldDraggableIndex,
      newIndex: newIndex,
      newDraggableIndex: newDraggableIndex
    }, info));
  }

  var dragEl,
      parentEl,
      ghostEl,
      rootEl,
      nextEl,
      lastDownEl,
      cloneEl,
      cloneHidden,
      oldIndex,
      newIndex,
      oldDraggableIndex,
      newDraggableIndex,
      activeGroup,
      putSortable,
      awaitingDragStarted = false,
      ignoreNextClick = false,
      sortables = [],
      tapEvt,
      touchEvt,
      lastDx,
      lastDy,
      tapDistanceLeft,
      tapDistanceTop,
      moved,
      lastTarget,
      lastDirection,
      pastFirstInvertThresh = false,
      isCircumstantialInvert = false,
      targetMoveDistance,

  // For positioning ghost absolutely
  ghostRelativeParent,
      ghostRelativeParentInitialScroll = [],

  // (left, top)
  _silent = false,
      savedInputChecked = [];
  /** @const */

  var documentExists = typeof document !== 'undefined',
      PositionGhostAbsolutely = IOS,
      CSSFloatProperty = Edge || IE11OrLess ? 'cssFloat' : 'float',

  // This will not pass for IE9, because IE9 DnD only works on anchors
  supportDraggable = documentExists && !ChromeForAndroid && !IOS && 'draggable' in document.createElement('div'),
      supportCssPointerEvents = function () {
    if (!documentExists) return; // false when <= IE11

    if (IE11OrLess) {
      return false;
    }

    var el = document.createElement('x');
    el.style.cssText = 'pointer-events:auto';
    return el.style.pointerEvents === 'auto';
  }(),
      _detectDirection = function _detectDirection(el, options) {
    var elCSS = css(el),
        elWidth = parseInt(elCSS.width) - parseInt(elCSS.paddingLeft) - parseInt(elCSS.paddingRight) - parseInt(elCSS.borderLeftWidth) - parseInt(elCSS.borderRightWidth),
        child1 = getChild(el, 0, options),
        child2 = getChild(el, 1, options),
        firstChildCSS = child1 && css(child1),
        secondChildCSS = child2 && css(child2),
        firstChildWidth = firstChildCSS && parseInt(firstChildCSS.marginLeft) + parseInt(firstChildCSS.marginRight) + getRect(child1).width,
        secondChildWidth = secondChildCSS && parseInt(secondChildCSS.marginLeft) + parseInt(secondChildCSS.marginRight) + getRect(child2).width;

    if (elCSS.display === 'flex') {
      return elCSS.flexDirection === 'column' || elCSS.flexDirection === 'column-reverse' ? 'vertical' : 'horizontal';
    }

    if (elCSS.display === 'grid') {
      return elCSS.gridTemplateColumns.split(' ').length <= 1 ? 'vertical' : 'horizontal';
    }

    if (child1 && firstChildCSS["float"] && firstChildCSS["float"] !== 'none') {
      var touchingSideChild2 = firstChildCSS["float"] === 'left' ? 'left' : 'right';
      return child2 && (secondChildCSS.clear === 'both' || secondChildCSS.clear === touchingSideChild2) ? 'vertical' : 'horizontal';
    }

    return child1 && (firstChildCSS.display === 'block' || firstChildCSS.display === 'flex' || firstChildCSS.display === 'table' || firstChildCSS.display === 'grid' || firstChildWidth >= elWidth && elCSS[CSSFloatProperty] === 'none' || child2 && elCSS[CSSFloatProperty] === 'none' && firstChildWidth + secondChildWidth > elWidth) ? 'vertical' : 'horizontal';
  },
      _dragElInRowColumn = function _dragElInRowColumn(dragRect, targetRect, vertical) {
    var dragElS1Opp = vertical ? dragRect.left : dragRect.top,
        dragElS2Opp = vertical ? dragRect.right : dragRect.bottom,
        dragElOppLength = vertical ? dragRect.width : dragRect.height,
        targetS1Opp = vertical ? targetRect.left : targetRect.top,
        targetS2Opp = vertical ? targetRect.right : targetRect.bottom,
        targetOppLength = vertical ? targetRect.width : targetRect.height;
    return dragElS1Opp === targetS1Opp || dragElS2Opp === targetS2Opp || dragElS1Opp + dragElOppLength / 2 === targetS1Opp + targetOppLength / 2;
  },


  /**
   * Detects first nearest empty sortable to X and Y position using emptyInsertThreshold.
   * @param  {Number} x      X position
   * @param  {Number} y      Y position
   * @return {HTMLElement}   Element of the first found nearest Sortable
   */
  _detectNearestEmptySortable = function _detectNearestEmptySortable(x, y) {
    var ret;
    sortables.some(function (sortable) {
      if (lastChild(sortable)) return;
      var rect = getRect(sortable),
          threshold = sortable[expando].options.emptyInsertThreshold,
          insideHorizontally = x >= rect.left - threshold && x <= rect.right + threshold,
          insideVertically = y >= rect.top - threshold && y <= rect.bottom + threshold;

      if (threshold && insideHorizontally && insideVertically) {
        return ret = sortable;
      }
    });
    return ret;
  },
      _prepareGroup = function _prepareGroup(options) {
    function toFn(value, pull) {
      return function (to, from, dragEl, evt) {
        var sameGroup = to.options.group.name && from.options.group.name && to.options.group.name === from.options.group.name;

        if (value == null && (pull || sameGroup)) {
          // Default pull value
          // Default pull and put value if same group
          return true;
        } else if (value == null || value === false) {
          return false;
        } else if (pull && value === 'clone') {
          return value;
        } else if (typeof value === 'function') {
          return toFn(value(to, from, dragEl, evt), pull)(to, from, dragEl, evt);
        } else {
          var otherGroup = (pull ? to : from).options.group.name;
          return value === true || typeof value === 'string' && value === otherGroup || value.join && value.indexOf(otherGroup) > -1;
        }
      };
    }

    var group = {};
    var originalGroup = options.group;

    if (!originalGroup || _typeof(originalGroup) != 'object') {
      originalGroup = {
        name: originalGroup
      };
    }

    group.name = originalGroup.name;
    group.checkPull = toFn(originalGroup.pull, true);
    group.checkPut = toFn(originalGroup.put);
    group.revertClone = originalGroup.revertClone;
    options.group = group;
  },
      _hideGhostForTarget = function _hideGhostForTarget() {
    if (!supportCssPointerEvents && ghostEl) {
      css(ghostEl, 'display', 'none');
    }
  },
      _unhideGhostForTarget = function _unhideGhostForTarget() {
    if (!supportCssPointerEvents && ghostEl) {
      css(ghostEl, 'display', '');
    }
  }; // #1184 fix - Prevent click event on fallback if dragged but item not changed position


  if (documentExists) {
    document.addEventListener('click', function (evt) {
      if (ignoreNextClick) {
        evt.preventDefault();
        evt.stopPropagation && evt.stopPropagation();
        evt.stopImmediatePropagation && evt.stopImmediatePropagation();
        ignoreNextClick = false;
        return false;
      }
    }, true);
  }

  var nearestEmptyInsertDetectEvent = function nearestEmptyInsertDetectEvent(evt) {
    if (dragEl) {
      evt = evt.touches ? evt.touches[0] : evt;

      var nearest = _detectNearestEmptySortable(evt.clientX, evt.clientY);

      if (nearest) {
        // Create imitation event
        var event = {};

        for (var i in evt) {
          if (evt.hasOwnProperty(i)) {
            event[i] = evt[i];
          }
        }

        event.target = event.rootEl = nearest;
        event.preventDefault = void 0;
        event.stopPropagation = void 0;

        nearest[expando]._onDragOver(event);
      }
    }
  };

  var _checkOutsideTargetEl = function _checkOutsideTargetEl(evt) {
    if (dragEl) {
      dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
    }
  };
  /**
   * @class  Sortable
   * @param  {HTMLElement}  el
   * @param  {Object}       [options]
   */

  function Sortable(el, options) {
    if (!(el && el.nodeType && el.nodeType === 1)) {
      throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(el));
    }

    this.el = el; // root element

    this.options = options = _extends({}, options); // Export instance

    el[expando] = this;
    var defaults = {
      group: null,
      sort: true,
      disabled: false,
      store: null,
      handle: null,
      draggable: /^[uo]l$/i.test(el.nodeName) ? '>li' : '>*',
      swapThreshold: 1,
      // percentage; 0 <= x <= 1
      invertSwap: false,
      // invert always
      invertedSwapThreshold: null,
      // will be set to same as swapThreshold if default
      removeCloneOnHide: true,
      direction: function direction() {
        return _detectDirection(el, this.options);
      },
      ghostClass: 'sortable-ghost',
      chosenClass: 'sortable-chosen',
      dragClass: 'sortable-drag',
      ignore: 'a, img',
      filter: null,
      preventOnFilter: true,
      animation: 0,
      easing: null,
      setData: function setData(dataTransfer, dragEl) {
        dataTransfer.setData('Text', dragEl.textContent);
      },
      dropBubble: false,
      dragoverBubble: false,
      dataIdAttr: 'data-id',
      delay: 0,
      delayOnTouchOnly: false,
      touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
      forceFallback: false,
      fallbackClass: 'sortable-fallback',
      fallbackOnBody: false,
      fallbackTolerance: 0,
      fallbackOffset: {
        x: 0,
        y: 0
      },
      supportPointer: Sortable.supportPointer !== false && 'PointerEvent' in window,
      emptyInsertThreshold: 5
    };
    PluginManager.initializePlugins(this, el, defaults); // Set default options

    for (var name in defaults) {
      !(name in options) && (options[name] = defaults[name]);
    }

    _prepareGroup(options); // Bind all private methods


    for (var fn in this) {
      if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
        this[fn] = this[fn].bind(this);
      }
    } // Setup drag mode


    this.nativeDraggable = options.forceFallback ? false : supportDraggable;

    if (this.nativeDraggable) {
      // Touch start threshold cannot be greater than the native dragstart threshold
      this.options.touchStartThreshold = 1;
    } // Bind events


    if (options.supportPointer) {
      on(el, 'pointerdown', this._onTapStart);
    } else {
      on(el, 'mousedown', this._onTapStart);
      on(el, 'touchstart', this._onTapStart);
    }

    if (this.nativeDraggable) {
      on(el, 'dragover', this);
      on(el, 'dragenter', this);
    }

    sortables.push(this.el); // Restore sorting

    options.store && options.store.get && this.sort(options.store.get(this) || []); // Add animation state manager

    _extends(this, AnimationStateManager());
  }

  Sortable.prototype =
  /** @lends Sortable.prototype */
  {
    constructor: Sortable,
    _isOutsideThisEl: function _isOutsideThisEl(target) {
      if (!this.el.contains(target) && target !== this.el) {
        lastTarget = null;
      }
    },
    _getDirection: function _getDirection(evt, target) {
      return typeof this.options.direction === 'function' ? this.options.direction.call(this, evt, target, dragEl) : this.options.direction;
    },
    _onTapStart: function _onTapStart(
    /** Event|TouchEvent */
    evt) {
      if (!evt.cancelable) return;

      var _this = this,
          el = this.el,
          options = this.options,
          preventOnFilter = options.preventOnFilter,
          type = evt.type,
          touch = evt.touches && evt.touches[0] || evt.pointerType && evt.pointerType === 'touch' && evt,
          target = (touch || evt).target,
          originalTarget = evt.target.shadowRoot && (evt.path && evt.path[0] || evt.composedPath && evt.composedPath()[0]) || target,
          filter = options.filter;

      _saveInputCheckedState(el); // Don't trigger start event when an element is been dragged, otherwise the evt.oldindex always wrong when set option.group.


      if (dragEl) {
        return;
      }

      if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
        return; // only left button and enabled
      } // cancel dnd if original target is content editable


      if (originalTarget.isContentEditable) {
        return;
      }

      target = closest(target, options.draggable, el, false);

      if (target && target.animated) {
        return;
      }

      if (lastDownEl === target) {
        // Ignoring duplicate `down`
        return;
      } // Get the index of the dragged element within its parent


      oldIndex = index(target);
      oldDraggableIndex = index(target, options.draggable); // Check filter

      if (typeof filter === 'function') {
        if (filter.call(this, evt, target, this)) {
          _dispatchEvent({
            sortable: _this,
            rootEl: originalTarget,
            name: 'filter',
            targetEl: target,
            toEl: el,
            fromEl: el
          });

          pluginEvent('filter', _this, {
            evt: evt
          });
          preventOnFilter && evt.cancelable && evt.preventDefault();
          return; // cancel dnd
        }
      } else if (filter) {
        filter = filter.split(',').some(function (criteria) {
          criteria = closest(originalTarget, criteria.trim(), el, false);

          if (criteria) {
            _dispatchEvent({
              sortable: _this,
              rootEl: criteria,
              name: 'filter',
              targetEl: target,
              fromEl: el,
              toEl: el
            });

            pluginEvent('filter', _this, {
              evt: evt
            });
            return true;
          }
        });

        if (filter) {
          preventOnFilter && evt.cancelable && evt.preventDefault();
          return; // cancel dnd
        }
      }

      if (options.handle && !closest(originalTarget, options.handle, el, false)) {
        return;
      } // Prepare `dragstart`


      this._prepareDragStart(evt, touch, target);
    },
    _prepareDragStart: function _prepareDragStart(
    /** Event */
    evt,
    /** Touch */
    touch,
    /** HTMLElement */
    target) {
      var _this = this,
          el = _this.el,
          options = _this.options,
          ownerDocument = el.ownerDocument,
          dragStartFn;

      if (target && !dragEl && target.parentNode === el) {
        var dragRect = getRect(target);
        rootEl = el;
        dragEl = target;
        parentEl = dragEl.parentNode;
        nextEl = dragEl.nextSibling;
        lastDownEl = target;
        activeGroup = options.group;
        Sortable.dragged = dragEl;
        tapEvt = {
          target: dragEl,
          clientX: (touch || evt).clientX,
          clientY: (touch || evt).clientY
        };
        tapDistanceLeft = tapEvt.clientX - dragRect.left;
        tapDistanceTop = tapEvt.clientY - dragRect.top;
        this._lastX = (touch || evt).clientX;
        this._lastY = (touch || evt).clientY;
        dragEl.style['will-change'] = 'all';

        dragStartFn = function dragStartFn() {
          pluginEvent('delayEnded', _this, {
            evt: evt
          });

          if (Sortable.eventCanceled) {
            _this._onDrop();

            return;
          } // Delayed drag has been triggered
          // we can re-enable the events: touchmove/mousemove


          _this._disableDelayedDragEvents();

          if (!FireFox && _this.nativeDraggable) {
            dragEl.draggable = true;
          } // Bind the events: dragstart/dragend


          _this._triggerDragStart(evt, touch); // Drag start event


          _dispatchEvent({
            sortable: _this,
            name: 'choose',
            originalEvent: evt
          }); // Chosen item


          toggleClass(dragEl, options.chosenClass, true);
        }; // Disable "draggable"


        options.ignore.split(',').forEach(function (criteria) {
          find(dragEl, criteria.trim(), _disableDraggable);
        });
        on(ownerDocument, 'dragover', nearestEmptyInsertDetectEvent);
        on(ownerDocument, 'mousemove', nearestEmptyInsertDetectEvent);
        on(ownerDocument, 'touchmove', nearestEmptyInsertDetectEvent);
        on(ownerDocument, 'mouseup', _this._onDrop);
        on(ownerDocument, 'touchend', _this._onDrop);
        on(ownerDocument, 'touchcancel', _this._onDrop); // Make dragEl draggable (must be before delay for FireFox)

        if (FireFox && this.nativeDraggable) {
          this.options.touchStartThreshold = 4;
          dragEl.draggable = true;
        }

        pluginEvent('delayStart', this, {
          evt: evt
        }); // Delay is impossible for native DnD in Edge or IE

        if (options.delay && (!options.delayOnTouchOnly || touch) && (!this.nativeDraggable || !(Edge || IE11OrLess))) {
          if (Sortable.eventCanceled) {
            this._onDrop();

            return;
          } // If the user moves the pointer or let go the click or touch
          // before the delay has been reached:
          // disable the delayed drag


          on(ownerDocument, 'mouseup', _this._disableDelayedDrag);
          on(ownerDocument, 'touchend', _this._disableDelayedDrag);
          on(ownerDocument, 'touchcancel', _this._disableDelayedDrag);
          on(ownerDocument, 'mousemove', _this._delayedDragTouchMoveHandler);
          on(ownerDocument, 'touchmove', _this._delayedDragTouchMoveHandler);
          options.supportPointer && on(ownerDocument, 'pointermove', _this._delayedDragTouchMoveHandler);
          _this._dragStartTimer = setTimeout(dragStartFn, options.delay);
        } else {
          dragStartFn();
        }
      }
    },
    _delayedDragTouchMoveHandler: function _delayedDragTouchMoveHandler(
    /** TouchEvent|PointerEvent **/
    e) {
      var touch = e.touches ? e.touches[0] : e;

      if (Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1))) {
        this._disableDelayedDrag();
      }
    },
    _disableDelayedDrag: function _disableDelayedDrag() {
      dragEl && _disableDraggable(dragEl);
      clearTimeout(this._dragStartTimer);

      this._disableDelayedDragEvents();
    },
    _disableDelayedDragEvents: function _disableDelayedDragEvents() {
      var ownerDocument = this.el.ownerDocument;
      off(ownerDocument, 'mouseup', this._disableDelayedDrag);
      off(ownerDocument, 'touchend', this._disableDelayedDrag);
      off(ownerDocument, 'touchcancel', this._disableDelayedDrag);
      off(ownerDocument, 'mousemove', this._delayedDragTouchMoveHandler);
      off(ownerDocument, 'touchmove', this._delayedDragTouchMoveHandler);
      off(ownerDocument, 'pointermove', this._delayedDragTouchMoveHandler);
    },
    _triggerDragStart: function _triggerDragStart(
    /** Event */
    evt,
    /** Touch */
    touch) {
      touch = touch || evt.pointerType == 'touch' && evt;

      if (!this.nativeDraggable || touch) {
        if (this.options.supportPointer) {
          on(document, 'pointermove', this._onTouchMove);
        } else if (touch) {
          on(document, 'touchmove', this._onTouchMove);
        } else {
          on(document, 'mousemove', this._onTouchMove);
        }
      } else {
        on(dragEl, 'dragend', this);
        on(rootEl, 'dragstart', this._onDragStart);
      }

      try {
        if (document.selection) {
          // Timeout neccessary for IE9
          _nextTick(function () {
            document.selection.empty();
          });
        } else {
          window.getSelection().removeAllRanges();
        }
      } catch (err) {}
    },
    _dragStarted: function _dragStarted(fallback, evt) {

      awaitingDragStarted = false;

      if (rootEl && dragEl) {
        pluginEvent('dragStarted', this, {
          evt: evt
        });

        if (this.nativeDraggable) {
          on(document, 'dragover', _checkOutsideTargetEl);
        }

        var options = this.options; // Apply effect

        !fallback && toggleClass(dragEl, options.dragClass, false);
        toggleClass(dragEl, options.ghostClass, true);
        Sortable.active = this;
        fallback && this._appendGhost(); // Drag start event

        _dispatchEvent({
          sortable: this,
          name: 'start',
          originalEvent: evt
        });
      } else {
        this._nulling();
      }
    },
    _emulateDragOver: function _emulateDragOver() {
      if (touchEvt) {
        this._lastX = touchEvt.clientX;
        this._lastY = touchEvt.clientY;

        _hideGhostForTarget();

        var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
        var parent = target;

        while (target && target.shadowRoot) {
          target = target.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
          if (target === parent) break;
          parent = target;
        }

        dragEl.parentNode[expando]._isOutsideThisEl(target);

        if (parent) {
          do {
            if (parent[expando]) {
              var inserted = void 0;
              inserted = parent[expando]._onDragOver({
                clientX: touchEvt.clientX,
                clientY: touchEvt.clientY,
                target: target,
                rootEl: parent
              });

              if (inserted && !this.options.dragoverBubble) {
                break;
              }
            }

            target = parent; // store last element
          }
          /* jshint boss:true */
          while (parent = parent.parentNode);
        }

        _unhideGhostForTarget();
      }
    },
    _onTouchMove: function _onTouchMove(
    /**TouchEvent*/
    evt) {
      if (tapEvt) {
        var options = this.options,
            fallbackTolerance = options.fallbackTolerance,
            fallbackOffset = options.fallbackOffset,
            touch = evt.touches ? evt.touches[0] : evt,
            ghostMatrix = ghostEl && matrix(ghostEl, true),
            scaleX = ghostEl && ghostMatrix && ghostMatrix.a,
            scaleY = ghostEl && ghostMatrix && ghostMatrix.d,
            relativeScrollOffset = PositionGhostAbsolutely && ghostRelativeParent && getRelativeScrollOffset(ghostRelativeParent),
            dx = (touch.clientX - tapEvt.clientX + fallbackOffset.x) / (scaleX || 1) + (relativeScrollOffset ? relativeScrollOffset[0] - ghostRelativeParentInitialScroll[0] : 0) / (scaleX || 1),
            dy = (touch.clientY - tapEvt.clientY + fallbackOffset.y) / (scaleY || 1) + (relativeScrollOffset ? relativeScrollOffset[1] - ghostRelativeParentInitialScroll[1] : 0) / (scaleY || 1); // only set the status to dragging, when we are actually dragging

        if (!Sortable.active && !awaitingDragStarted) {
          if (fallbackTolerance && Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) < fallbackTolerance) {
            return;
          }

          this._onDragStart(evt, true);
        }

        if (ghostEl) {
          if (ghostMatrix) {
            ghostMatrix.e += dx - (lastDx || 0);
            ghostMatrix.f += dy - (lastDy || 0);
          } else {
            ghostMatrix = {
              a: 1,
              b: 0,
              c: 0,
              d: 1,
              e: dx,
              f: dy
            };
          }

          var cssMatrix = "matrix(".concat(ghostMatrix.a, ",").concat(ghostMatrix.b, ",").concat(ghostMatrix.c, ",").concat(ghostMatrix.d, ",").concat(ghostMatrix.e, ",").concat(ghostMatrix.f, ")");
          css(ghostEl, 'webkitTransform', cssMatrix);
          css(ghostEl, 'mozTransform', cssMatrix);
          css(ghostEl, 'msTransform', cssMatrix);
          css(ghostEl, 'transform', cssMatrix);
          lastDx = dx;
          lastDy = dy;
          touchEvt = touch;
        }

        evt.cancelable && evt.preventDefault();
      }
    },
    _appendGhost: function _appendGhost() {
      // Bug if using scale(): https://stackoverflow.com/questions/2637058
      // Not being adjusted for
      if (!ghostEl) {
        var container = this.options.fallbackOnBody ? document.body : rootEl,
            rect = getRect(dragEl, true, PositionGhostAbsolutely, true, container),
            options = this.options; // Position absolutely

        if (PositionGhostAbsolutely) {
          // Get relatively positioned parent
          ghostRelativeParent = container;

          while (css(ghostRelativeParent, 'position') === 'static' && css(ghostRelativeParent, 'transform') === 'none' && ghostRelativeParent !== document) {
            ghostRelativeParent = ghostRelativeParent.parentNode;
          }

          if (ghostRelativeParent !== document.body && ghostRelativeParent !== document.documentElement) {
            if (ghostRelativeParent === document) ghostRelativeParent = getWindowScrollingElement();
            rect.top += ghostRelativeParent.scrollTop;
            rect.left += ghostRelativeParent.scrollLeft;
          } else {
            ghostRelativeParent = getWindowScrollingElement();
          }

          ghostRelativeParentInitialScroll = getRelativeScrollOffset(ghostRelativeParent);
        }

        ghostEl = dragEl.cloneNode(true);
        toggleClass(ghostEl, options.ghostClass, false);
        toggleClass(ghostEl, options.fallbackClass, true);
        toggleClass(ghostEl, options.dragClass, true);
        css(ghostEl, 'transition', '');
        css(ghostEl, 'transform', '');
        css(ghostEl, 'box-sizing', 'border-box');
        css(ghostEl, 'margin', 0);
        css(ghostEl, 'top', rect.top);
        css(ghostEl, 'left', rect.left);
        css(ghostEl, 'width', rect.width);
        css(ghostEl, 'height', rect.height);
        css(ghostEl, 'opacity', '0.8');
        css(ghostEl, 'position', PositionGhostAbsolutely ? 'absolute' : 'fixed');
        css(ghostEl, 'zIndex', '100000');
        css(ghostEl, 'pointerEvents', 'none');
        Sortable.ghost = ghostEl;
        container.appendChild(ghostEl); // Set transform-origin

        css(ghostEl, 'transform-origin', tapDistanceLeft / parseInt(ghostEl.style.width) * 100 + '% ' + tapDistanceTop / parseInt(ghostEl.style.height) * 100 + '%');
      }
    },
    _onDragStart: function _onDragStart(
    /**Event*/
    evt,
    /**boolean*/
    fallback) {
      var _this = this;

      var dataTransfer = evt.dataTransfer;
      var options = _this.options;
      pluginEvent('dragStart', this, {
        evt: evt
      });

      if (Sortable.eventCanceled) {
        this._onDrop();

        return;
      }

      pluginEvent('setupClone', this);

      if (!Sortable.eventCanceled) {
        cloneEl = clone(dragEl);
        cloneEl.draggable = false;
        cloneEl.style['will-change'] = '';

        this._hideClone();

        toggleClass(cloneEl, this.options.chosenClass, false);
        Sortable.clone = cloneEl;
      } // #1143: IFrame support workaround


      _this.cloneId = _nextTick(function () {
        pluginEvent('clone', _this);
        if (Sortable.eventCanceled) return;

        if (!_this.options.removeCloneOnHide) {
          rootEl.insertBefore(cloneEl, dragEl);
        }

        _this._hideClone();

        _dispatchEvent({
          sortable: _this,
          name: 'clone'
        });
      });
      !fallback && toggleClass(dragEl, options.dragClass, true); // Set proper drop events

      if (fallback) {
        ignoreNextClick = true;
        _this._loopId = setInterval(_this._emulateDragOver, 50);
      } else {
        // Undo what was set in _prepareDragStart before drag started
        off(document, 'mouseup', _this._onDrop);
        off(document, 'touchend', _this._onDrop);
        off(document, 'touchcancel', _this._onDrop);

        if (dataTransfer) {
          dataTransfer.effectAllowed = 'move';
          options.setData && options.setData.call(_this, dataTransfer, dragEl);
        }

        on(document, 'drop', _this); // #1276 fix:

        css(dragEl, 'transform', 'translateZ(0)');
      }

      awaitingDragStarted = true;
      _this._dragStartId = _nextTick(_this._dragStarted.bind(_this, fallback, evt));
      on(document, 'selectstart', _this);
      moved = true;

      if (Safari) {
        css(document.body, 'user-select', 'none');
      }
    },
    // Returns true - if no further action is needed (either inserted or another condition)
    _onDragOver: function _onDragOver(
    /**Event*/
    evt) {
      var el = this.el,
          target = evt.target,
          dragRect,
          targetRect,
          revert,
          options = this.options,
          group = options.group,
          activeSortable = Sortable.active,
          isOwner = activeGroup === group,
          canSort = options.sort,
          fromSortable = putSortable || activeSortable,
          vertical,
          _this = this,
          completedFired = false;

      if (_silent) return;

      function dragOverEvent(name, extra) {
        pluginEvent(name, _this, _objectSpread({
          evt: evt,
          isOwner: isOwner,
          axis: vertical ? 'vertical' : 'horizontal',
          revert: revert,
          dragRect: dragRect,
          targetRect: targetRect,
          canSort: canSort,
          fromSortable: fromSortable,
          target: target,
          completed: completed,
          onMove: function onMove(target, after) {
            return _onMove(rootEl, el, dragEl, dragRect, target, getRect(target), evt, after);
          },
          changed: changed
        }, extra));
      } // Capture animation state


      function capture() {
        dragOverEvent('dragOverAnimationCapture');

        _this.captureAnimationState();

        if (_this !== fromSortable) {
          fromSortable.captureAnimationState();
        }
      } // Return invocation when dragEl is inserted (or completed)


      function completed(insertion) {
        dragOverEvent('dragOverCompleted', {
          insertion: insertion
        });

        if (insertion) {
          // Clones must be hidden before folding animation to capture dragRectAbsolute properly
          if (isOwner) {
            activeSortable._hideClone();
          } else {
            activeSortable._showClone(_this);
          }

          if (_this !== fromSortable) {
            // Set ghost class to new sortable's ghost class
            toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : activeSortable.options.ghostClass, false);
            toggleClass(dragEl, options.ghostClass, true);
          }

          if (putSortable !== _this && _this !== Sortable.active) {
            putSortable = _this;
          } else if (_this === Sortable.active && putSortable) {
            putSortable = null;
          } // Animation


          if (fromSortable === _this) {
            _this._ignoreWhileAnimating = target;
          }

          _this.animateAll(function () {
            dragOverEvent('dragOverAnimationComplete');
            _this._ignoreWhileAnimating = null;
          });

          if (_this !== fromSortable) {
            fromSortable.animateAll();
            fromSortable._ignoreWhileAnimating = null;
          }
        } // Null lastTarget if it is not inside a previously swapped element


        if (target === dragEl && !dragEl.animated || target === el && !target.animated) {
          lastTarget = null;
        } // no bubbling and not fallback


        if (!options.dragoverBubble && !evt.rootEl && target !== document) {
          dragEl.parentNode[expando]._isOutsideThisEl(evt.target); // Do not detect for empty insert if already inserted


          !insertion && nearestEmptyInsertDetectEvent(evt);
        }

        !options.dragoverBubble && evt.stopPropagation && evt.stopPropagation();
        return completedFired = true;
      } // Call when dragEl has been inserted


      function changed() {
        newIndex = index(dragEl);
        newDraggableIndex = index(dragEl, options.draggable);

        _dispatchEvent({
          sortable: _this,
          name: 'change',
          toEl: el,
          newIndex: newIndex,
          newDraggableIndex: newDraggableIndex,
          originalEvent: evt
        });
      }

      if (evt.preventDefault !== void 0) {
        evt.cancelable && evt.preventDefault();
      }

      target = closest(target, options.draggable, el, true);
      dragOverEvent('dragOver');
      if (Sortable.eventCanceled) return completedFired;

      if (dragEl.contains(evt.target) || target.animated && target.animatingX && target.animatingY || _this._ignoreWhileAnimating === target) {
        return completed(false);
      }

      ignoreNextClick = false;

      if (activeSortable && !options.disabled && (isOwner ? canSort || (revert = !rootEl.contains(dragEl)) // Reverting item into the original list
      : putSortable === this || (this.lastPutMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) && group.checkPut(this, activeSortable, dragEl, evt))) {
        vertical = this._getDirection(evt, target) === 'vertical';
        dragRect = getRect(dragEl);
        dragOverEvent('dragOverValid');
        if (Sortable.eventCanceled) return completedFired;

        if (revert) {
          parentEl = rootEl; // actualization

          capture();

          this._hideClone();

          dragOverEvent('revert');

          if (!Sortable.eventCanceled) {
            if (nextEl) {
              rootEl.insertBefore(dragEl, nextEl);
            } else {
              rootEl.appendChild(dragEl);
            }
          }

          return completed(true);
        }

        var elLastChild = lastChild(el, options.draggable);

        if (!elLastChild || _ghostIsLast(evt, vertical, this) && !elLastChild.animated) {
          // If already at end of list: Do not insert
          if (elLastChild === dragEl) {
            return completed(false);
          } // assign target only if condition is true


          if (elLastChild && el === evt.target) {
            target = elLastChild;
          }

          if (target) {
            targetRect = getRect(target);
          }

          if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, !!target) !== false) {
            capture();
            el.appendChild(dragEl);
            parentEl = el; // actualization

            changed();
            return completed(true);
          }
        } else if (target.parentNode === el) {
          targetRect = getRect(target);
          var direction = 0,
              targetBeforeFirstSwap,
              differentLevel = dragEl.parentNode !== el,
              differentRowCol = !_dragElInRowColumn(dragEl.animated && dragEl.toRect || dragRect, target.animated && target.toRect || targetRect, vertical),
              side1 = vertical ? 'top' : 'left',
              scrolledPastTop = isScrolledPast(target, 'top', 'top') || isScrolledPast(dragEl, 'top', 'top'),
              scrollBefore = scrolledPastTop ? scrolledPastTop.scrollTop : void 0;

          if (lastTarget !== target) {
            targetBeforeFirstSwap = targetRect[side1];
            pastFirstInvertThresh = false;
            isCircumstantialInvert = !differentRowCol && options.invertSwap || differentLevel;
          }

          direction = _getSwapDirection(evt, target, targetRect, vertical, differentRowCol ? 1 : options.swapThreshold, options.invertedSwapThreshold == null ? options.swapThreshold : options.invertedSwapThreshold, isCircumstantialInvert, lastTarget === target);
          var sibling;

          if (direction !== 0) {
            // Check if target is beside dragEl in respective direction (ignoring hidden elements)
            var dragIndex = index(dragEl);

            do {
              dragIndex -= direction;
              sibling = parentEl.children[dragIndex];
            } while (sibling && (css(sibling, 'display') === 'none' || sibling === ghostEl));
          } // If dragEl is already beside target: Do not insert


          if (direction === 0 || sibling === target) {
            return completed(false);
          }

          lastTarget = target;
          lastDirection = direction;
          var nextSibling = target.nextElementSibling,
              after = false;
          after = direction === 1;

          var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);

          if (moveVector !== false) {
            if (moveVector === 1 || moveVector === -1) {
              after = moveVector === 1;
            }

            _silent = true;
            setTimeout(_unsilent, 30);
            capture();

            if (after && !nextSibling) {
              el.appendChild(dragEl);
            } else {
              target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
            } // Undo chrome's scroll adjustment (has no effect on other browsers)


            if (scrolledPastTop) {
              scrollBy(scrolledPastTop, 0, scrollBefore - scrolledPastTop.scrollTop);
            }

            parentEl = dragEl.parentNode; // actualization
            // must be done before animation

            if (targetBeforeFirstSwap !== undefined && !isCircumstantialInvert) {
              targetMoveDistance = Math.abs(targetBeforeFirstSwap - getRect(target)[side1]);
            }

            changed();
            return completed(true);
          }
        }

        if (el.contains(dragEl)) {
          return completed(false);
        }
      }

      return false;
    },
    _ignoreWhileAnimating: null,
    _offMoveEvents: function _offMoveEvents() {
      off(document, 'mousemove', this._onTouchMove);
      off(document, 'touchmove', this._onTouchMove);
      off(document, 'pointermove', this._onTouchMove);
      off(document, 'dragover', nearestEmptyInsertDetectEvent);
      off(document, 'mousemove', nearestEmptyInsertDetectEvent);
      off(document, 'touchmove', nearestEmptyInsertDetectEvent);
    },
    _offUpEvents: function _offUpEvents() {
      var ownerDocument = this.el.ownerDocument;
      off(ownerDocument, 'mouseup', this._onDrop);
      off(ownerDocument, 'touchend', this._onDrop);
      off(ownerDocument, 'pointerup', this._onDrop);
      off(ownerDocument, 'touchcancel', this._onDrop);
      off(document, 'selectstart', this);
    },
    _onDrop: function _onDrop(
    /**Event*/
    evt) {
      var el = this.el,
          options = this.options; // Get the index of the dragged element within its parent

      newIndex = index(dragEl);
      newDraggableIndex = index(dragEl, options.draggable);
      pluginEvent('drop', this, {
        evt: evt
      });
      parentEl = dragEl && dragEl.parentNode; // Get again after plugin event

      newIndex = index(dragEl);
      newDraggableIndex = index(dragEl, options.draggable);

      if (Sortable.eventCanceled) {
        this._nulling();

        return;
      }

      awaitingDragStarted = false;
      isCircumstantialInvert = false;
      pastFirstInvertThresh = false;
      clearInterval(this._loopId);
      clearTimeout(this._dragStartTimer);

      _cancelNextTick(this.cloneId);

      _cancelNextTick(this._dragStartId); // Unbind events


      if (this.nativeDraggable) {
        off(document, 'drop', this);
        off(el, 'dragstart', this._onDragStart);
      }

      this._offMoveEvents();

      this._offUpEvents();

      if (Safari) {
        css(document.body, 'user-select', '');
      }

      css(dragEl, 'transform', '');

      if (evt) {
        if (moved) {
          evt.cancelable && evt.preventDefault();
          !options.dropBubble && evt.stopPropagation();
        }

        ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);

        if (rootEl === parentEl || putSortable && putSortable.lastPutMode !== 'clone') {
          // Remove clone(s)
          cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
        }

        if (dragEl) {
          if (this.nativeDraggable) {
            off(dragEl, 'dragend', this);
          }

          _disableDraggable(dragEl);

          dragEl.style['will-change'] = ''; // Remove classes
          // ghostClass is added in dragStarted

          if (moved && !awaitingDragStarted) {
            toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : this.options.ghostClass, false);
          }

          toggleClass(dragEl, this.options.chosenClass, false); // Drag stop event

          _dispatchEvent({
            sortable: this,
            name: 'unchoose',
            toEl: parentEl,
            newIndex: null,
            newDraggableIndex: null,
            originalEvent: evt
          });

          if (rootEl !== parentEl) {
            if (newIndex >= 0) {
              // Add event
              _dispatchEvent({
                rootEl: parentEl,
                name: 'add',
                toEl: parentEl,
                fromEl: rootEl,
                originalEvent: evt
              }); // Remove event


              _dispatchEvent({
                sortable: this,
                name: 'remove',
                toEl: parentEl,
                originalEvent: evt
              }); // drag from one list and drop into another


              _dispatchEvent({
                rootEl: parentEl,
                name: 'sort',
                toEl: parentEl,
                fromEl: rootEl,
                originalEvent: evt
              });

              _dispatchEvent({
                sortable: this,
                name: 'sort',
                toEl: parentEl,
                originalEvent: evt
              });
            }

            putSortable && putSortable.save();
          } else {
            if (newIndex !== oldIndex) {
              if (newIndex >= 0) {
                // drag & drop within the same list
                _dispatchEvent({
                  sortable: this,
                  name: 'update',
                  toEl: parentEl,
                  originalEvent: evt
                });

                _dispatchEvent({
                  sortable: this,
                  name: 'sort',
                  toEl: parentEl,
                  originalEvent: evt
                });
              }
            }
          }

          if (Sortable.active) {
            /* jshint eqnull:true */
            if (newIndex == null || newIndex === -1) {
              newIndex = oldIndex;
              newDraggableIndex = oldDraggableIndex;
            }

            _dispatchEvent({
              sortable: this,
              name: 'end',
              toEl: parentEl,
              originalEvent: evt
            }); // Save sorting


            this.save();
          }
        }
      }

      this._nulling();
    },
    _nulling: function _nulling() {
      pluginEvent('nulling', this);
      rootEl = dragEl = parentEl = ghostEl = nextEl = cloneEl = lastDownEl = cloneHidden = tapEvt = touchEvt = moved = newIndex = newDraggableIndex = oldIndex = oldDraggableIndex = lastTarget = lastDirection = putSortable = activeGroup = Sortable.dragged = Sortable.ghost = Sortable.clone = Sortable.active = null;
      savedInputChecked.forEach(function (el) {
        el.checked = true;
      });
      savedInputChecked.length = lastDx = lastDy = 0;
    },
    handleEvent: function handleEvent(
    /**Event*/
    evt) {
      switch (evt.type) {
        case 'drop':
        case 'dragend':
          this._onDrop(evt);

          break;

        case 'dragenter':
        case 'dragover':
          if (dragEl) {
            this._onDragOver(evt);

            _globalDragOver(evt);
          }

          break;

        case 'selectstart':
          evt.preventDefault();
          break;
      }
    },

    /**
     * Serializes the item into an array of string.
     * @returns {String[]}
     */
    toArray: function toArray() {
      var order = [],
          el,
          children = this.el.children,
          i = 0,
          n = children.length,
          options = this.options;

      for (; i < n; i++) {
        el = children[i];

        if (closest(el, options.draggable, this.el, false)) {
          order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
        }
      }

      return order;
    },

    /**
     * Sorts the elements according to the array.
     * @param  {String[]}  order  order of the items
     */
    sort: function sort(order) {
      var items = {},
          rootEl = this.el;
      this.toArray().forEach(function (id, i) {
        var el = rootEl.children[i];

        if (closest(el, this.options.draggable, rootEl, false)) {
          items[id] = el;
        }
      }, this);
      order.forEach(function (id) {
        if (items[id]) {
          rootEl.removeChild(items[id]);
          rootEl.appendChild(items[id]);
        }
      });
    },

    /**
     * Save the current sorting
     */
    save: function save() {
      var store = this.options.store;
      store && store.set && store.set(this);
    },

    /**
     * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
     * @param   {HTMLElement}  el
     * @param   {String}       [selector]  default: `options.draggable`
     * @returns {HTMLElement|null}
     */
    closest: function closest$1(el, selector) {
      return closest(el, selector || this.options.draggable, this.el, false);
    },

    /**
     * Set/get option
     * @param   {string} name
     * @param   {*}      [value]
     * @returns {*}
     */
    option: function option(name, value) {
      var options = this.options;

      if (value === void 0) {
        return options[name];
      } else {
        var modifiedValue = PluginManager.modifyOption(this, name, value);

        if (typeof modifiedValue !== 'undefined') {
          options[name] = modifiedValue;
        } else {
          options[name] = value;
        }

        if (name === 'group') {
          _prepareGroup(options);
        }
      }
    },

    /**
     * Destroy
     */
    destroy: function destroy() {
      pluginEvent('destroy', this);
      var el = this.el;
      el[expando] = null;
      off(el, 'mousedown', this._onTapStart);
      off(el, 'touchstart', this._onTapStart);
      off(el, 'pointerdown', this._onTapStart);

      if (this.nativeDraggable) {
        off(el, 'dragover', this);
        off(el, 'dragenter', this);
      } // Remove draggable attributes


      Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
        el.removeAttribute('draggable');
      });

      this._onDrop();

      this._disableDelayedDragEvents();

      sortables.splice(sortables.indexOf(this.el), 1);
      this.el = el = null;
    },
    _hideClone: function _hideClone() {
      if (!cloneHidden) {
        pluginEvent('hideClone', this);
        if (Sortable.eventCanceled) return;
        css(cloneEl, 'display', 'none');

        if (this.options.removeCloneOnHide && cloneEl.parentNode) {
          cloneEl.parentNode.removeChild(cloneEl);
        }

        cloneHidden = true;
      }
    },
    _showClone: function _showClone(putSortable) {
      if (putSortable.lastPutMode !== 'clone') {
        this._hideClone();

        return;
      }

      if (cloneHidden) {
        pluginEvent('showClone', this);
        if (Sortable.eventCanceled) return; // show clone at dragEl or original position

        if (rootEl.contains(dragEl) && !this.options.group.revertClone) {
          rootEl.insertBefore(cloneEl, dragEl);
        } else if (nextEl) {
          rootEl.insertBefore(cloneEl, nextEl);
        } else {
          rootEl.appendChild(cloneEl);
        }

        if (this.options.group.revertClone) {
          this.animate(dragEl, cloneEl);
        }

        css(cloneEl, 'display', '');
        cloneHidden = false;
      }
    }
  };

  function _globalDragOver(
  /**Event*/
  evt) {
    if (evt.dataTransfer) {
      evt.dataTransfer.dropEffect = 'move';
    }

    evt.cancelable && evt.preventDefault();
  }

  function _onMove(fromEl, toEl, dragEl, dragRect, targetEl, targetRect, originalEvent, willInsertAfter) {
    var evt,
        sortable = fromEl[expando],
        onMoveFn = sortable.options.onMove,
        retVal; // Support for new CustomEvent feature

    if (window.CustomEvent && !IE11OrLess && !Edge) {
      evt = new CustomEvent('move', {
        bubbles: true,
        cancelable: true
      });
    } else {
      evt = document.createEvent('Event');
      evt.initEvent('move', true, true);
    }

    evt.to = toEl;
    evt.from = fromEl;
    evt.dragged = dragEl;
    evt.draggedRect = dragRect;
    evt.related = targetEl || toEl;
    evt.relatedRect = targetRect || getRect(toEl);
    evt.willInsertAfter = willInsertAfter;
    evt.originalEvent = originalEvent;
    fromEl.dispatchEvent(evt);

    if (onMoveFn) {
      retVal = onMoveFn.call(sortable, evt, originalEvent);
    }

    return retVal;
  }

  function _disableDraggable(el) {
    el.draggable = false;
  }

  function _unsilent() {
    _silent = false;
  }

  function _ghostIsLast(evt, vertical, sortable) {
    var rect = getRect(lastChild(sortable.el, sortable.options.draggable));
    var spacer = 10;
    return vertical ? evt.clientX > rect.right + spacer || evt.clientX <= rect.right && evt.clientY > rect.bottom && evt.clientX >= rect.left : evt.clientX > rect.right && evt.clientY > rect.top || evt.clientX <= rect.right && evt.clientY > rect.bottom + spacer;
  }

  function _getSwapDirection(evt, target, targetRect, vertical, swapThreshold, invertedSwapThreshold, invertSwap, isLastTarget) {
    var mouseOnAxis = vertical ? evt.clientY : evt.clientX,
        targetLength = vertical ? targetRect.height : targetRect.width,
        targetS1 = vertical ? targetRect.top : targetRect.left,
        targetS2 = vertical ? targetRect.bottom : targetRect.right,
        invert = false;

    if (!invertSwap) {
      // Never invert or create dragEl shadow when target movemenet causes mouse to move past the end of regular swapThreshold
      if (isLastTarget && targetMoveDistance < targetLength * swapThreshold) {
        // multiplied only by swapThreshold because mouse will already be inside target by (1 - threshold) * targetLength / 2
        // check if past first invert threshold on side opposite of lastDirection
        if (!pastFirstInvertThresh && (lastDirection === 1 ? mouseOnAxis > targetS1 + targetLength * invertedSwapThreshold / 2 : mouseOnAxis < targetS2 - targetLength * invertedSwapThreshold / 2)) {
          // past first invert threshold, do not restrict inverted threshold to dragEl shadow
          pastFirstInvertThresh = true;
        }

        if (!pastFirstInvertThresh) {
          // dragEl shadow (target move distance shadow)
          if (lastDirection === 1 ? mouseOnAxis < targetS1 + targetMoveDistance // over dragEl shadow
          : mouseOnAxis > targetS2 - targetMoveDistance) {
            return -lastDirection;
          }
        } else {
          invert = true;
        }
      } else {
        // Regular
        if (mouseOnAxis > targetS1 + targetLength * (1 - swapThreshold) / 2 && mouseOnAxis < targetS2 - targetLength * (1 - swapThreshold) / 2) {
          return _getInsertDirection(target);
        }
      }
    }

    invert = invert || invertSwap;

    if (invert) {
      // Invert of regular
      if (mouseOnAxis < targetS1 + targetLength * invertedSwapThreshold / 2 || mouseOnAxis > targetS2 - targetLength * invertedSwapThreshold / 2) {
        return mouseOnAxis > targetS1 + targetLength / 2 ? 1 : -1;
      }
    }

    return 0;
  }
  /**
   * Gets the direction dragEl must be swapped relative to target in order to make it
   * seem that dragEl has been "inserted" into that element's position
   * @param  {HTMLElement} target       The target whose position dragEl is being inserted at
   * @return {Number}                   Direction dragEl must be swapped
   */

  function _getInsertDirection(target) {
    if (index(dragEl) < index(target)) {
      return 1;
    } else {
      return -1;
    }
  }
  /**
   * Generate id
   * @param   {HTMLElement} el
   * @returns {String}
   * @private
   */

  function _generateId(el) {
    var str = el.tagName + el.className + el.src + el.href + el.textContent,
        i = str.length,
        sum = 0;

    while (i--) {
      sum += str.charCodeAt(i);
    }

    return sum.toString(36);
  }

  function _saveInputCheckedState(root) {
    savedInputChecked.length = 0;
    var inputs = root.getElementsByTagName('input');
    var idx = inputs.length;

    while (idx--) {
      var el = inputs[idx];
      el.checked && savedInputChecked.push(el);
    }
  }

  function _nextTick(fn) {
    return setTimeout(fn, 0);
  }

  function _cancelNextTick(id) {
    return clearTimeout(id);
  } // Fixed #973:


  if (documentExists) {
    on(document, 'touchmove', function (evt) {
      if ((Sortable.active || awaitingDragStarted) && evt.cancelable) {
        evt.preventDefault();
      }
    });
  } // Export utils


  Sortable.utils = {
    on: on,
    off: off,
    css: css,
    find: find,
    is: function is(el, selector) {
      return !!closest(el, selector, el, false);
    },
    extend: extend,
    throttle: throttle,
    closest: closest,
    toggleClass: toggleClass,
    clone: clone,
    index: index,
    nextTick: _nextTick,
    cancelNextTick: _cancelNextTick,
    detectDirection: _detectDirection,
    getChild: getChild
  };
  /**
   * Get the Sortable instance of an element
   * @param  {HTMLElement} element The element
   * @return {Sortable|undefined}         The instance of Sortable
   */

  Sortable.get = function (element) {
    return element[expando];
  };
  /**
   * Mount a plugin to Sortable
   * @param  {...SortablePlugin|SortablePlugin[]} plugins       Plugins being mounted
   */

  Sortable.mount = function () {
    for (var _len = arguments.length, plugins = new Array(_len), _key = 0; _key < _len; _key++) {
      plugins[_key] = arguments[_key];
    }

    if (plugins[0].constructor === Array) plugins = plugins[0];
    plugins.forEach(function (plugin) {
      if (!plugin.prototype || !plugin.prototype.constructor) {
        throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(plugin));
      }

      if (plugin.utils) Sortable.utils = _objectSpread({}, Sortable.utils, plugin.utils);
      PluginManager.mount(plugin);
    });
  };
  /**
   * Create sortable instance
   * @param {HTMLElement}  el
   * @param {Object}      [options]
   */

  Sortable.create = function (el, options) {
    return new Sortable(el, options);
  }; // Export


  Sortable.version = version;

  var autoScrolls = [],
      scrollEl,
      scrollRootEl,
      scrolling = false,
      lastAutoScrollX,
      lastAutoScrollY,
      touchEvt$1,
      pointerElemChangedInterval;

  function AutoScrollPlugin() {
    function AutoScroll() {
      this.defaults = {
        scroll: true,
        scrollSensitivity: 30,
        scrollSpeed: 10,
        bubbleScroll: true
      }; // Bind all private methods

      for (var fn in this) {
        if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
          this[fn] = this[fn].bind(this);
        }
      }
    }

    AutoScroll.prototype = {
      dragStarted: function dragStarted(_ref) {
        var originalEvent = _ref.originalEvent;

        if (this.sortable.nativeDraggable) {
          on(document, 'dragover', this._handleAutoScroll);
        } else {
          if (this.options.supportPointer) {
            on(document, 'pointermove', this._handleFallbackAutoScroll);
          } else if (originalEvent.touches) {
            on(document, 'touchmove', this._handleFallbackAutoScroll);
          } else {
            on(document, 'mousemove', this._handleFallbackAutoScroll);
          }
        }
      },
      dragOverCompleted: function dragOverCompleted(_ref2) {
        var originalEvent = _ref2.originalEvent;

        // For when bubbling is canceled and using fallback (fallback 'touchmove' always reached)
        if (!this.options.dragOverBubble && !originalEvent.rootEl) {
          this._handleAutoScroll(originalEvent);
        }
      },
      drop: function drop() {
        if (this.sortable.nativeDraggable) {
          off(document, 'dragover', this._handleAutoScroll);
        } else {
          off(document, 'pointermove', this._handleFallbackAutoScroll);
          off(document, 'touchmove', this._handleFallbackAutoScroll);
          off(document, 'mousemove', this._handleFallbackAutoScroll);
        }

        clearPointerElemChangedInterval();
        clearAutoScrolls();
        cancelThrottle();
      },
      nulling: function nulling() {
        touchEvt$1 = scrollRootEl = scrollEl = scrolling = pointerElemChangedInterval = lastAutoScrollX = lastAutoScrollY = null;
        autoScrolls.length = 0;
      },
      _handleFallbackAutoScroll: function _handleFallbackAutoScroll(evt) {
        this._handleAutoScroll(evt, true);
      },
      _handleAutoScroll: function _handleAutoScroll(evt, fallback) {
        var _this = this;

        var x = (evt.touches ? evt.touches[0] : evt).clientX,
            y = (evt.touches ? evt.touches[0] : evt).clientY,
            elem = document.elementFromPoint(x, y);
        touchEvt$1 = evt; // IE does not seem to have native autoscroll,
        // Edge's autoscroll seems too conditional,
        // MACOS Safari does not have autoscroll,
        // Firefox and Chrome are good

        if (fallback || Edge || IE11OrLess || Safari) {
          autoScroll(evt, this.options, elem, fallback); // Listener for pointer element change

          var ogElemScroller = getParentAutoScrollElement(elem, true);

          if (scrolling && (!pointerElemChangedInterval || x !== lastAutoScrollX || y !== lastAutoScrollY)) {
            pointerElemChangedInterval && clearPointerElemChangedInterval(); // Detect for pointer elem change, emulating native DnD behaviour

            pointerElemChangedInterval = setInterval(function () {
              var newElem = getParentAutoScrollElement(document.elementFromPoint(x, y), true);

              if (newElem !== ogElemScroller) {
                ogElemScroller = newElem;
                clearAutoScrolls();
              }

              autoScroll(evt, _this.options, newElem, fallback);
            }, 10);
            lastAutoScrollX = x;
            lastAutoScrollY = y;
          }
        } else {
          // if DnD is enabled (and browser has good autoscrolling), first autoscroll will already scroll, so get parent autoscroll of first autoscroll
          if (!this.options.bubbleScroll || getParentAutoScrollElement(elem, true) === getWindowScrollingElement()) {
            clearAutoScrolls();
            return;
          }

          autoScroll(evt, this.options, getParentAutoScrollElement(elem, false), false);
        }
      }
    };
    return _extends(AutoScroll, {
      pluginName: 'scroll',
      initializeByDefault: true
    });
  }

  function clearAutoScrolls() {
    autoScrolls.forEach(function (autoScroll) {
      clearInterval(autoScroll.pid);
    });
    autoScrolls = [];
  }

  function clearPointerElemChangedInterval() {
    clearInterval(pointerElemChangedInterval);
  }

  var autoScroll = throttle(function (evt, options, rootEl, isFallback) {
    // Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
    if (!options.scroll) return;
    var x = (evt.touches ? evt.touches[0] : evt).clientX,
        y = (evt.touches ? evt.touches[0] : evt).clientY,
        sens = options.scrollSensitivity,
        speed = options.scrollSpeed,
        winScroller = getWindowScrollingElement();
    var scrollThisInstance = false,
        scrollCustomFn; // New scroll root, set scrollEl

    if (scrollRootEl !== rootEl) {
      scrollRootEl = rootEl;
      clearAutoScrolls();
      scrollEl = options.scroll;
      scrollCustomFn = options.scrollFn;

      if (scrollEl === true) {
        scrollEl = getParentAutoScrollElement(rootEl, true);
      }
    }

    var layersOut = 0;
    var currentParent = scrollEl;

    do {
      var el = currentParent,
          rect = getRect(el),
          top = rect.top,
          bottom = rect.bottom,
          left = rect.left,
          right = rect.right,
          width = rect.width,
          height = rect.height,
          canScrollX = void 0,
          canScrollY = void 0,
          scrollWidth = el.scrollWidth,
          scrollHeight = el.scrollHeight,
          elCSS = css(el),
          scrollPosX = el.scrollLeft,
          scrollPosY = el.scrollTop;

      if (el === winScroller) {
        canScrollX = width < scrollWidth && (elCSS.overflowX === 'auto' || elCSS.overflowX === 'scroll' || elCSS.overflowX === 'visible');
        canScrollY = height < scrollHeight && (elCSS.overflowY === 'auto' || elCSS.overflowY === 'scroll' || elCSS.overflowY === 'visible');
      } else {
        canScrollX = width < scrollWidth && (elCSS.overflowX === 'auto' || elCSS.overflowX === 'scroll');
        canScrollY = height < scrollHeight && (elCSS.overflowY === 'auto' || elCSS.overflowY === 'scroll');
      }

      var vx = canScrollX && (Math.abs(right - x) <= sens && scrollPosX + width < scrollWidth) - (Math.abs(left - x) <= sens && !!scrollPosX);
      var vy = canScrollY && (Math.abs(bottom - y) <= sens && scrollPosY + height < scrollHeight) - (Math.abs(top - y) <= sens && !!scrollPosY);

      if (!autoScrolls[layersOut]) {
        for (var i = 0; i <= layersOut; i++) {
          if (!autoScrolls[i]) {
            autoScrolls[i] = {};
          }
        }
      }

      if (autoScrolls[layersOut].vx != vx || autoScrolls[layersOut].vy != vy || autoScrolls[layersOut].el !== el) {
        autoScrolls[layersOut].el = el;
        autoScrolls[layersOut].vx = vx;
        autoScrolls[layersOut].vy = vy;
        clearInterval(autoScrolls[layersOut].pid);

        if (vx != 0 || vy != 0) {
          scrollThisInstance = true;
          /* jshint loopfunc:true */

          autoScrolls[layersOut].pid = setInterval(function () {
            // emulate drag over during autoscroll (fallback), emulating native DnD behaviour
            if (isFallback && this.layer === 0) {
              Sortable.active._onTouchMove(touchEvt$1); // To move ghost if it is positioned absolutely
            }

            var scrollOffsetY = autoScrolls[this.layer].vy ? autoScrolls[this.layer].vy * speed : 0;
            var scrollOffsetX = autoScrolls[this.layer].vx ? autoScrolls[this.layer].vx * speed : 0;

            if (typeof scrollCustomFn === 'function') {
              if (scrollCustomFn.call(Sortable.dragged.parentNode[expando], scrollOffsetX, scrollOffsetY, evt, touchEvt$1, autoScrolls[this.layer].el) !== 'continue') {
                return;
              }
            }

            scrollBy(autoScrolls[this.layer].el, scrollOffsetX, scrollOffsetY);
          }.bind({
            layer: layersOut
          }), 24);
        }
      }

      layersOut++;
    } while (options.bubbleScroll && currentParent !== winScroller && (currentParent = getParentAutoScrollElement(currentParent, false)));

    scrolling = scrollThisInstance; // in case another function catches scrolling as false in between when it is not
  }, 30);

  var drop = function drop(_ref) {
    var originalEvent = _ref.originalEvent,
        putSortable = _ref.putSortable,
        dragEl = _ref.dragEl,
        activeSortable = _ref.activeSortable,
        dispatchSortableEvent = _ref.dispatchSortableEvent,
        hideGhostForTarget = _ref.hideGhostForTarget,
        unhideGhostForTarget = _ref.unhideGhostForTarget;
    if (!originalEvent) return;
    var toSortable = putSortable || activeSortable;
    hideGhostForTarget();
    var touch = originalEvent.changedTouches && originalEvent.changedTouches.length ? originalEvent.changedTouches[0] : originalEvent;
    var target = document.elementFromPoint(touch.clientX, touch.clientY);
    unhideGhostForTarget();

    if (toSortable && !toSortable.el.contains(target)) {
      dispatchSortableEvent('spill');
      this.onSpill({
        dragEl: dragEl,
        putSortable: putSortable
      });
    }
  };

  function Revert() {}

  Revert.prototype = {
    startIndex: null,
    dragStart: function dragStart(_ref2) {
      var oldDraggableIndex = _ref2.oldDraggableIndex;
      this.startIndex = oldDraggableIndex;
    },
    onSpill: function onSpill(_ref3) {
      var dragEl = _ref3.dragEl,
          putSortable = _ref3.putSortable;
      this.sortable.captureAnimationState();

      if (putSortable) {
        putSortable.captureAnimationState();
      }

      var nextSibling = getChild(this.sortable.el, this.startIndex, this.options);

      if (nextSibling) {
        this.sortable.el.insertBefore(dragEl, nextSibling);
      } else {
        this.sortable.el.appendChild(dragEl);
      }

      this.sortable.animateAll();

      if (putSortable) {
        putSortable.animateAll();
      }
    },
    drop: drop
  };

  _extends(Revert, {
    pluginName: 'revertOnSpill'
  });

  function Remove() {}

  Remove.prototype = {
    onSpill: function onSpill(_ref4) {
      var dragEl = _ref4.dragEl,
          putSortable = _ref4.putSortable;
      var parentSortable = putSortable || this.sortable;
      parentSortable.captureAnimationState();
      dragEl.parentNode && dragEl.parentNode.removeChild(dragEl);
      parentSortable.animateAll();
    },
    drop: drop
  };

  _extends(Remove, {
    pluginName: 'removeOnSpill'
  });

  var lastSwapEl;

  function SwapPlugin() {
    function Swap() {
      this.defaults = {
        swapClass: 'sortable-swap-highlight'
      };
    }

    Swap.prototype = {
      dragStart: function dragStart(_ref) {
        var dragEl = _ref.dragEl;
        lastSwapEl = dragEl;
      },
      dragOverValid: function dragOverValid(_ref2) {
        var completed = _ref2.completed,
            target = _ref2.target,
            onMove = _ref2.onMove,
            activeSortable = _ref2.activeSortable,
            changed = _ref2.changed,
            cancel = _ref2.cancel;
        if (!activeSortable.options.swap) return;
        var el = this.sortable.el,
            options = this.options;

        if (target && target !== el) {
          var prevSwapEl = lastSwapEl;

          if (onMove(target) !== false) {
            toggleClass(target, options.swapClass, true);
            lastSwapEl = target;
          } else {
            lastSwapEl = null;
          }

          if (prevSwapEl && prevSwapEl !== lastSwapEl) {
            toggleClass(prevSwapEl, options.swapClass, false);
          }
        }

        changed();
        completed(true);
        cancel();
      },
      drop: function drop(_ref3) {
        var activeSortable = _ref3.activeSortable,
            putSortable = _ref3.putSortable,
            dragEl = _ref3.dragEl;
        var toSortable = putSortable || this.sortable;
        var options = this.options;
        lastSwapEl && toggleClass(lastSwapEl, options.swapClass, false);

        if (lastSwapEl && (options.swap || putSortable && putSortable.options.swap)) {
          if (dragEl !== lastSwapEl) {
            toSortable.captureAnimationState();
            if (toSortable !== activeSortable) activeSortable.captureAnimationState();
            swapNodes(dragEl, lastSwapEl);
            toSortable.animateAll();
            if (toSortable !== activeSortable) activeSortable.animateAll();
          }
        }
      },
      nulling: function nulling() {
        lastSwapEl = null;
      }
    };
    return _extends(Swap, {
      pluginName: 'swap',
      eventProperties: function eventProperties() {
        return {
          swapItem: lastSwapEl
        };
      }
    });
  }

  function swapNodes(n1, n2) {
    var p1 = n1.parentNode,
        p2 = n2.parentNode,
        i1,
        i2;
    if (!p1 || !p2 || p1.isEqualNode(n2) || p2.isEqualNode(n1)) return;
    i1 = index(n1);
    i2 = index(n2);

    if (p1.isEqualNode(p2) && i1 < i2) {
      i2++;
    }

    p1.insertBefore(n2, p1.children[i1]);
    p2.insertBefore(n1, p2.children[i2]);
  }

  var multiDragElements = [],
      multiDragClones = [],
      lastMultiDragSelect,

  // for selection with modifier key down (SHIFT)
  multiDragSortable,
      initialFolding = false,

  // Initial multi-drag fold when drag started
  folding = false,

  // Folding any other time
  dragStarted = false,
      dragEl$1,
      clonesFromRect,
      clonesHidden;

  function MultiDragPlugin() {
    function MultiDrag(sortable) {
      // Bind all private methods
      for (var fn in this) {
        if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
          this[fn] = this[fn].bind(this);
        }
      }

      if (sortable.options.supportPointer) {
        on(document, 'pointerup', this._deselectMultiDrag);
      } else {
        on(document, 'mouseup', this._deselectMultiDrag);
        on(document, 'touchend', this._deselectMultiDrag);
      }

      on(document, 'keydown', this._checkKeyDown);
      on(document, 'keyup', this._checkKeyUp);
      this.defaults = {
        selectedClass: 'sortable-selected',
        multiDragKey: null,
        setData: function setData(dataTransfer, dragEl) {
          var data = '';

          if (multiDragElements.length && multiDragSortable === sortable) {
            multiDragElements.forEach(function (multiDragElement, i) {
              data += (!i ? '' : ', ') + multiDragElement.textContent;
            });
          } else {
            data = dragEl.textContent;
          }

          dataTransfer.setData('Text', data);
        }
      };
    }

    MultiDrag.prototype = {
      multiDragKeyDown: false,
      isMultiDrag: false,
      delayStartGlobal: function delayStartGlobal(_ref) {
        var dragged = _ref.dragEl;
        dragEl$1 = dragged;
      },
      delayEnded: function delayEnded() {
        this.isMultiDrag = ~multiDragElements.indexOf(dragEl$1);
      },
      setupClone: function setupClone(_ref2) {
        var sortable = _ref2.sortable,
            cancel = _ref2.cancel;
        if (!this.isMultiDrag) return;

        for (var i = 0; i < multiDragElements.length; i++) {
          multiDragClones.push(clone(multiDragElements[i]));
          multiDragClones[i].sortableIndex = multiDragElements[i].sortableIndex;
          multiDragClones[i].draggable = false;
          multiDragClones[i].style['will-change'] = '';
          toggleClass(multiDragClones[i], this.options.selectedClass, false);
          multiDragElements[i] === dragEl$1 && toggleClass(multiDragClones[i], this.options.chosenClass, false);
        }

        sortable._hideClone();

        cancel();
      },
      clone: function clone(_ref3) {
        var sortable = _ref3.sortable,
            rootEl = _ref3.rootEl,
            dispatchSortableEvent = _ref3.dispatchSortableEvent,
            cancel = _ref3.cancel;
        if (!this.isMultiDrag) return;

        if (!this.options.removeCloneOnHide) {
          if (multiDragElements.length && multiDragSortable === sortable) {
            insertMultiDragClones(true, rootEl);
            dispatchSortableEvent('clone');
            cancel();
          }
        }
      },
      showClone: function showClone(_ref4) {
        var cloneNowShown = _ref4.cloneNowShown,
            rootEl = _ref4.rootEl,
            cancel = _ref4.cancel;
        if (!this.isMultiDrag) return;
        insertMultiDragClones(false, rootEl);
        multiDragClones.forEach(function (clone) {
          css(clone, 'display', '');
        });
        cloneNowShown();
        clonesHidden = false;
        cancel();
      },
      hideClone: function hideClone(_ref5) {
        var _this = this;

        var sortable = _ref5.sortable,
            cloneNowHidden = _ref5.cloneNowHidden,
            cancel = _ref5.cancel;
        if (!this.isMultiDrag) return;
        multiDragClones.forEach(function (clone) {
          css(clone, 'display', 'none');

          if (_this.options.removeCloneOnHide && clone.parentNode) {
            clone.parentNode.removeChild(clone);
          }
        });
        cloneNowHidden();
        clonesHidden = true;
        cancel();
      },
      dragStartGlobal: function dragStartGlobal(_ref6) {
        if (!this.isMultiDrag && multiDragSortable) {
          multiDragSortable.multiDrag._deselectMultiDrag();
        }

        multiDragElements.forEach(function (multiDragElement) {
          multiDragElement.sortableIndex = index(multiDragElement);
        }); // Sort multi-drag elements

        multiDragElements = multiDragElements.sort(function (a, b) {
          return a.sortableIndex - b.sortableIndex;
        });
        dragStarted = true;
      },
      dragStarted: function dragStarted(_ref7) {
        var _this2 = this;

        var sortable = _ref7.sortable;
        if (!this.isMultiDrag) return;

        if (this.options.sort) {
          // Capture rects,
          // hide multi drag elements (by positioning them absolute),
          // set multi drag elements rects to dragRect,
          // show multi drag elements,
          // animate to rects,
          // unset rects & remove from DOM
          sortable.captureAnimationState();

          if (this.options.animation) {
            multiDragElements.forEach(function (multiDragElement) {
              if (multiDragElement === dragEl$1) return;
              css(multiDragElement, 'position', 'absolute');
            });
            var dragRect = getRect(dragEl$1, false, true, true);
            multiDragElements.forEach(function (multiDragElement) {
              if (multiDragElement === dragEl$1) return;
              setRect(multiDragElement, dragRect);
            });
            folding = true;
            initialFolding = true;
          }
        }

        sortable.animateAll(function () {
          folding = false;
          initialFolding = false;

          if (_this2.options.animation) {
            multiDragElements.forEach(function (multiDragElement) {
              unsetRect(multiDragElement);
            });
          } // Remove all auxiliary multidrag items from el, if sorting enabled


          if (_this2.options.sort) {
            removeMultiDragElements();
          }
        });
      },
      dragOver: function dragOver(_ref8) {
        var target = _ref8.target,
            completed = _ref8.completed,
            cancel = _ref8.cancel;

        if (folding && ~multiDragElements.indexOf(target)) {
          completed(false);
          cancel();
        }
      },
      revert: function revert(_ref9) {
        var fromSortable = _ref9.fromSortable,
            rootEl = _ref9.rootEl,
            sortable = _ref9.sortable,
            dragRect = _ref9.dragRect;

        if (multiDragElements.length > 1) {
          // Setup unfold animation
          multiDragElements.forEach(function (multiDragElement) {
            sortable.addAnimationState({
              target: multiDragElement,
              rect: folding ? getRect(multiDragElement) : dragRect
            });
            unsetRect(multiDragElement);
            multiDragElement.fromRect = dragRect;
            fromSortable.removeAnimationState(multiDragElement);
          });
          folding = false;
          insertMultiDragElements(!this.options.removeCloneOnHide, rootEl);
        }
      },
      dragOverCompleted: function dragOverCompleted(_ref10) {
        var sortable = _ref10.sortable,
            isOwner = _ref10.isOwner,
            insertion = _ref10.insertion,
            activeSortable = _ref10.activeSortable,
            parentEl = _ref10.parentEl,
            putSortable = _ref10.putSortable;
        var options = this.options;

        if (insertion) {
          // Clones must be hidden before folding animation to capture dragRectAbsolute properly
          if (isOwner) {
            activeSortable._hideClone();
          }

          initialFolding = false; // If leaving sort:false root, or already folding - Fold to new location

          if (options.animation && multiDragElements.length > 1 && (folding || !isOwner && !activeSortable.options.sort && !putSortable)) {
            // Fold: Set all multi drag elements's rects to dragEl's rect when multi-drag elements are invisible
            var dragRectAbsolute = getRect(dragEl$1, false, true, true);
            multiDragElements.forEach(function (multiDragElement) {
              if (multiDragElement === dragEl$1) return;
              setRect(multiDragElement, dragRectAbsolute); // Move element(s) to end of parentEl so that it does not interfere with multi-drag clones insertion if they are inserted
              // while folding, and so that we can capture them again because old sortable will no longer be fromSortable

              parentEl.appendChild(multiDragElement);
            });
            folding = true;
          } // Clones must be shown (and check to remove multi drags) after folding when interfering multiDragElements are moved out


          if (!isOwner) {
            // Only remove if not folding (folding will remove them anyways)
            if (!folding) {
              removeMultiDragElements();
            }

            if (multiDragElements.length > 1) {
              var clonesHiddenBefore = clonesHidden;

              activeSortable._showClone(sortable); // Unfold animation for clones if showing from hidden


              if (activeSortable.options.animation && !clonesHidden && clonesHiddenBefore) {
                multiDragClones.forEach(function (clone) {
                  activeSortable.addAnimationState({
                    target: clone,
                    rect: clonesFromRect
                  });
                  clone.fromRect = clonesFromRect;
                  clone.thisAnimationDuration = null;
                });
              }
            } else {
              activeSortable._showClone(sortable);
            }
          }
        }
      },
      dragOverAnimationCapture: function dragOverAnimationCapture(_ref11) {
        var dragRect = _ref11.dragRect,
            isOwner = _ref11.isOwner,
            activeSortable = _ref11.activeSortable;
        multiDragElements.forEach(function (multiDragElement) {
          multiDragElement.thisAnimationDuration = null;
        });

        if (activeSortable.options.animation && !isOwner && activeSortable.multiDrag.isMultiDrag) {
          clonesFromRect = _extends({}, dragRect);
          var dragMatrix = matrix(dragEl$1, true);
          clonesFromRect.top -= dragMatrix.f;
          clonesFromRect.left -= dragMatrix.e;
        }
      },
      dragOverAnimationComplete: function dragOverAnimationComplete() {
        if (folding) {
          folding = false;
          removeMultiDragElements();
        }
      },
      drop: function drop(_ref12) {
        var evt = _ref12.originalEvent,
            rootEl = _ref12.rootEl,
            parentEl = _ref12.parentEl,
            sortable = _ref12.sortable,
            dispatchSortableEvent = _ref12.dispatchSortableEvent,
            oldIndex = _ref12.oldIndex,
            putSortable = _ref12.putSortable;
        var toSortable = putSortable || this.sortable;
        if (!evt) return;
        var options = this.options,
            children = parentEl.children; // Multi-drag selection

        if (!dragStarted) {
          if (options.multiDragKey && !this.multiDragKeyDown) {
            this._deselectMultiDrag();
          }

          toggleClass(dragEl$1, options.selectedClass, !~multiDragElements.indexOf(dragEl$1));

          if (!~multiDragElements.indexOf(dragEl$1)) {
            multiDragElements.push(dragEl$1);
            dispatchEvent({
              sortable: sortable,
              rootEl: rootEl,
              name: 'select',
              targetEl: dragEl$1,
              originalEvt: evt
            }); // Modifier activated, select from last to dragEl

            if (evt.shiftKey && lastMultiDragSelect && sortable.el.contains(lastMultiDragSelect)) {
              var lastIndex = index(lastMultiDragSelect),
                  currentIndex = index(dragEl$1);

              if (~lastIndex && ~currentIndex && lastIndex !== currentIndex) {
                // Must include lastMultiDragSelect (select it), in case modified selection from no selection
                // (but previous selection existed)
                var n, i;

                if (currentIndex > lastIndex) {
                  i = lastIndex;
                  n = currentIndex;
                } else {
                  i = currentIndex;
                  n = lastIndex + 1;
                }

                for (; i < n; i++) {
                  if (~multiDragElements.indexOf(children[i])) continue;
                  toggleClass(children[i], options.selectedClass, true);
                  multiDragElements.push(children[i]);
                  dispatchEvent({
                    sortable: sortable,
                    rootEl: rootEl,
                    name: 'select',
                    targetEl: children[i],
                    originalEvt: evt
                  });
                }
              }
            } else {
              lastMultiDragSelect = dragEl$1;
            }

            multiDragSortable = toSortable;
          } else {
            multiDragElements.splice(multiDragElements.indexOf(dragEl$1), 1);
            lastMultiDragSelect = null;
            dispatchEvent({
              sortable: sortable,
              rootEl: rootEl,
              name: 'deselect',
              targetEl: dragEl$1,
              originalEvt: evt
            });
          }
        } // Multi-drag drop


        if (dragStarted && this.isMultiDrag) {
          // Do not "unfold" after around dragEl if reverted
          if ((parentEl[expando].options.sort || parentEl !== rootEl) && multiDragElements.length > 1) {
            var dragRect = getRect(dragEl$1),
                multiDragIndex = index(dragEl$1, ':not(.' + this.options.selectedClass + ')');
            if (!initialFolding && options.animation) dragEl$1.thisAnimationDuration = null;
            toSortable.captureAnimationState();

            if (!initialFolding) {
              if (options.animation) {
                dragEl$1.fromRect = dragRect;
                multiDragElements.forEach(function (multiDragElement) {
                  multiDragElement.thisAnimationDuration = null;

                  if (multiDragElement !== dragEl$1) {
                    var rect = folding ? getRect(multiDragElement) : dragRect;
                    multiDragElement.fromRect = rect; // Prepare unfold animation

                    toSortable.addAnimationState({
                      target: multiDragElement,
                      rect: rect
                    });
                  }
                });
              } // Multi drag elements are not necessarily removed from the DOM on drop, so to reinsert
              // properly they must all be removed


              removeMultiDragElements();
              multiDragElements.forEach(function (multiDragElement) {
                if (children[multiDragIndex]) {
                  parentEl.insertBefore(multiDragElement, children[multiDragIndex]);
                } else {
                  parentEl.appendChild(multiDragElement);
                }

                multiDragIndex++;
              }); // If initial folding is done, the elements may have changed position because they are now
              // unfolding around dragEl, even though dragEl may not have his index changed, so update event
              // must be fired here as Sortable will not.

              if (oldIndex === index(dragEl$1)) {
                var update = false;
                multiDragElements.forEach(function (multiDragElement) {
                  if (multiDragElement.sortableIndex !== index(multiDragElement)) {
                    update = true;
                    return;
                  }
                });

                if (update) {
                  dispatchSortableEvent('update');
                }
              }
            } // Must be done after capturing individual rects (scroll bar)


            multiDragElements.forEach(function (multiDragElement) {
              unsetRect(multiDragElement);
            });
            toSortable.animateAll();
          }

          multiDragSortable = toSortable;
        } // Remove clones if necessary


        if (rootEl === parentEl || putSortable && putSortable.lastPutMode !== 'clone') {
          multiDragClones.forEach(function (clone) {
            clone.parentNode && clone.parentNode.removeChild(clone);
          });
        }
      },
      nullingGlobal: function nullingGlobal() {
        this.isMultiDrag = dragStarted = false;
        multiDragClones.length = 0;
      },
      destroyGlobal: function destroyGlobal() {
        this._deselectMultiDrag();

        off(document, 'pointerup', this._deselectMultiDrag);
        off(document, 'mouseup', this._deselectMultiDrag);
        off(document, 'touchend', this._deselectMultiDrag);
        off(document, 'keydown', this._checkKeyDown);
        off(document, 'keyup', this._checkKeyUp);
      },
      _deselectMultiDrag: function _deselectMultiDrag(evt) {
        if (typeof dragStarted !== "undefined" && dragStarted) return; // Only deselect if selection is in this sortable

        if (multiDragSortable !== this.sortable) return; // Only deselect if target is not item in this sortable

        if (evt && closest(evt.target, this.options.draggable, this.sortable.el, false)) return; // Only deselect if left click

        if (evt && evt.button !== 0) return;

        while (multiDragElements.length) {
          var el = multiDragElements[0];
          toggleClass(el, this.options.selectedClass, false);
          multiDragElements.shift();
          dispatchEvent({
            sortable: this.sortable,
            rootEl: this.sortable.el,
            name: 'deselect',
            targetEl: el,
            originalEvt: evt
          });
        }
      },
      _checkKeyDown: function _checkKeyDown(evt) {
        if (evt.key === this.options.multiDragKey) {
          this.multiDragKeyDown = true;
        }
      },
      _checkKeyUp: function _checkKeyUp(evt) {
        if (evt.key === this.options.multiDragKey) {
          this.multiDragKeyDown = false;
        }
      }
    };
    return _extends(MultiDrag, {
      // Static methods & properties
      pluginName: 'multiDrag',
      utils: {
        /**
         * Selects the provided multi-drag item
         * @param  {HTMLElement} el    The element to be selected
         */
        select: function select(el) {
          var sortable = el.parentNode[expando];
          if (!sortable || !sortable.options.multiDrag || ~multiDragElements.indexOf(el)) return;

          if (multiDragSortable && multiDragSortable !== sortable) {
            multiDragSortable.multiDrag._deselectMultiDrag();

            multiDragSortable = sortable;
          }

          toggleClass(el, sortable.options.selectedClass, true);
          multiDragElements.push(el);
        },

        /**
         * Deselects the provided multi-drag item
         * @param  {HTMLElement} el    The element to be deselected
         */
        deselect: function deselect(el) {
          var sortable = el.parentNode[expando],
              index = multiDragElements.indexOf(el);
          if (!sortable || !sortable.options.multiDrag || !~index) return;
          toggleClass(el, sortable.options.selectedClass, false);
          multiDragElements.splice(index, 1);
        }
      },
      eventProperties: function eventProperties() {
        var _this3 = this;

        var oldIndicies = [],
            newIndicies = [];
        multiDragElements.forEach(function (multiDragElement) {
          oldIndicies.push({
            multiDragElement: multiDragElement,
            index: multiDragElement.sortableIndex
          }); // multiDragElements will already be sorted if folding

          var newIndex;

          if (folding && multiDragElement !== dragEl$1) {
            newIndex = -1;
          } else if (folding) {
            newIndex = index(multiDragElement, ':not(.' + _this3.options.selectedClass + ')');
          } else {
            newIndex = index(multiDragElement);
          }

          newIndicies.push({
            multiDragElement: multiDragElement,
            index: newIndex
          });
        });
        return {
          items: _toConsumableArray(multiDragElements),
          clones: [].concat(multiDragClones),
          oldIndicies: oldIndicies,
          newIndicies: newIndicies
        };
      },
      optionListeners: {
        multiDragKey: function multiDragKey(key) {
          key = key.toLowerCase();

          if (key === 'ctrl') {
            key = 'Control';
          } else if (key.length > 1) {
            key = key.charAt(0).toUpperCase() + key.substr(1);
          }

          return key;
        }
      }
    });
  }

  function insertMultiDragElements(clonesInserted, rootEl) {
    multiDragElements.forEach(function (multiDragElement, i) {
      var target = rootEl.children[multiDragElement.sortableIndex + (clonesInserted ? Number(i) : 0)];

      if (target) {
        rootEl.insertBefore(multiDragElement, target);
      } else {
        rootEl.appendChild(multiDragElement);
      }
    });
  }
  /**
   * Insert multi-drag clones
   * @param  {[Boolean]} elementsInserted  Whether the multi-drag elements are inserted
   * @param  {HTMLElement} rootEl
   */

  function insertMultiDragClones(elementsInserted, rootEl) {
    multiDragClones.forEach(function (clone, i) {
      var target = rootEl.children[clone.sortableIndex + (elementsInserted ? Number(i) : 0)];

      if (target) {
        rootEl.insertBefore(clone, target);
      } else {
        rootEl.appendChild(clone);
      }
    });
  }

  function removeMultiDragElements() {
    multiDragElements.forEach(function (multiDragElement) {
      if (multiDragElement === dragEl$1) return;
      multiDragElement.parentNode && multiDragElement.parentNode.removeChild(multiDragElement);
    });
  }

  Sortable.mount(new AutoScrollPlugin());
  Sortable.mount(Remove, Revert);

  Sortable.mount(new SwapPlugin());
  Sortable.mount(new MultiDragPlugin());

  return Sortable;
});

/**
 * 选择人员界面
 * 依赖mui.css
 */

var ACTION_WRAP_UNIQUE_ID$2 = 'defaultSelectPersonWrapContent';
var ACTION_STRUCTURE_UNIQUE_ID = 'defaultStructureContent';
var ACTION_EDIT_UNIQUE_ID = 'defaultEditContent';
var ACTION_SEARCH_UNIQUE_ID = 'defaultSearchContent';
var FORMAL_URL = 'http://218.4.136.126:1443/oa9_v7/rest/oa9/';
// 头像地址
var PHOTO_URL = FORMAL_URL.match(/(\S*)rest/)[1];
// 获取部门及人员列表接口
var getoulistwithuser = 'address_getoulistwithuser_v7';
// 搜索人员接口
var searchuserbycondition = 'address_searchuserbycondition_v7';
// 获取部门下所有人员列表
var getalluserlist = 'address_getalluserlist_v7';
// 获取个人用户信息
var personalgetdetail = 'getuserinfo_guid_v7';
// 通过guids获取用户信息
var getuserinfolist = 'address_getuserinfolist_v7';
// 获取分组列表
var getgrouplist = 'frame_myaddressgrouplist_v7';
// 获取分组下直属子用户列表
var getaddressbooklist = 'frame_myaddressbooklist_v7';

// 传入参数
var formalUrl = '';
var maxchoosecount = 500;
var isouonly = '0';
var issingle = '0';
var selectedusers = [];
var unableselectusers = [];
var selectedous = [];
var custom = {};
var token = '';
var callback = null;

var searchonce = 0;
var timer = null;
var isSelectRange = '0';
var selectedNum = 0;
var getFromAjaxOu = [];
var getFromAjaxUser = [];
var getFromSearchUser = [];
// 选择范围时用于计算部门人数
var usercount = 0;
var renderStructure = void 0;
var renderSearchContent = void 0;
var myShadowDom = null;

// 公共样式
var commonClassName$1 = function commonClassName() {
    var style = document.createElement('style');
    style.textContent = '\n        .ejs-select-wrapper .mui-scroll-wrapper,\n        .ejs-edit-wrapper .mui-scroll-wrapper{\n            width: 100%;\n            overflow: scroll;\n            touch-action: none;\n        }\n        .ejs-select-wrapper{\n            z-index: 10000;\n            position: fixed;\n            bottom: 0;\n            left: 0;\n            background-color: #f9f9f9;\n            width: 100vw;\n            height: 0;\n            overflow: hidden;\n        }\n        .ejs-select-wrapper header {\n            padding: 0 10px;\n            text-align: center;\n            height: 48px;\n            line-height: 46px;\n            background-color: #fff;\n            border-bottom: 1px solid #d9d9d9;\n        }\n        .ejs-select-wrapper header .mui-input-search{\n            position: relative;\n            height: 46px;\n            vertical-align: middle;\n        }\n        .ejs-select-wrapper header .mui-input-search.focus{\n            display: inline-block;\n            width: 87%;\n        }\n        .ejs-select-wrapper header .mui-input-search.focus input{\n            text-align: left;\n        }\n        .ejs-select-wrapper header .mui-input-search input{\n            margin-bottom: 0;\n            padding: 10px 28px;\n            height: 31px;\n        }\n        .ejs-select-wrapper header .mui-icon-search{\n            position: absolute;\n            left: 2px;\n            top: 11px;\n        }\n        .ejs-select-wrapper header .cancel-btn{\n            color: #3C80E6;\n        }\n        .ejs-select-wrapper .content-body{\n            position: relative;\n            height: calc(100% - 56px);\n        }\n        .ejs-select-wrapper .content-body #view-0.mui-scroll-wrapper{\n            height: 100%;\n        }\n        .ejs-select-wrapper .select-tip,\n        .ejs-edit-wrapper .selected-tip {\n            padding-left: 10px;\n            width: 100%;\n            height: 43px;\n            line-height: 43px;\n            color: #999;\n            font-size: 14px;\n            background-color: #f9f9f9;\n        }\n        .ejs-select-wrapper .bottom-bar{\n            position: absolute;\n            left: 0;\n            bottom: 0;\n            padding-right: 10px;\n            padding-bottom: 15px;\n            width: 100%;\n            font-size: 16px;\n            text-align: center;\n            background-color: #fff;\n            border-top: 1px solid #d9d9d9;\n        }\n        .ejs-select-wrapper .bottom-bar #selectall{\n            line-height: 46px;\n        }\n        .ejs-select-wrapper .bottom-bar .mui-input-row input{\n            top: 10px;\n            left: 10px;\n        }\n        .ejs-select-wrapper .bottom-bar .btn-set{\n            margin-top: 8px;\n            padding: 0 12px;\n            height: 30px;\n        }\n        .ejs-select-wrapper .bottom-bar .edit-selected-btn{\n            height: 100%;\n            line-height: 45px;\n        }\n        .ejs-select-wrapper [data-type="ou"]{\n            line-height: 23px;\n        }\n        .ejs-select-wrapper [data-type="ou"] .mui-input-row{\n            display: inline-block;\n            width: 28px;\n            height: 26px;\n            vertical-align: middle;\n        }\n        .ejs-select-wrapper [data-type="ou"] .mui-input-row label,\n        .ejs-select-wrapper [data-type="ou"] .user-single-span{\n            display: inline-block;\n            width: 55%;\n        }\n        .ejs-select-wrapper [data-type="ou"] .user-single-span{\n            vertical-align: middle;\n        }\n        .ejs-select-wrapper [data-type="ou"] .mui-input-row.checked label,\n        .ejs-select-wrapper [data-type="ou"] span.checked{\n            color: #999;\n        }\n        .ejs-select-wrapper [data-type="user"] .mui-input-row{\n            width: 100%;\n            height: 100%;\n        }\n        .ejs-select-wrapper .content-body .mui-input-row input,\n        .ejs-search-wrapper .mui-input-row.mui-left input{\n            top: 0;\n            right: 0;\n            left: 0;\n        }\n        .ejs-select-wrapper .mui-input-row input:before{\n            font-size: 24px;\n        }\n        .ejs-select-wrapper .mui-input-row.mui-left label{\n            padding: 3px 0;\n            padding-left: 38px;\n        }\n        .ejs-select-wrapper .user-photo,\n        .ejs-edit-wrapper .user-photo,\n        .ejs-select-wrapper .imgerror-backup,\n        .ejs-edit-wrapper .imgerror-backup{\n            width: 50px;\n            height: 50px;\n            border-radius: 50%;\n            vertical-align: middle;\n        }\n        .ejs-select-wrapper .imgerror-backup,\n        .ejs-edit-wrapper .imgerror-backup{\n            display: inline-block;\n            text-align: center;\n            color: #fff;\n            line-height: 50px;\n            background-color: #3C80E6;\n        }\n        .ejs-select-wrapper .user-info-txt,\n        .ejs-edit-wrapper .user-info-txt{\n            display: inline-block;\n            color: #000;\n            font-size: 16px;\n            vertical-align: middle;\n        }\n        .ejs-select-wrapper .user-info-txt{\n            width: 78%;\n        }\n        .ejs-edit-wrapper .user-info-txt{\n            width: 172px;\n            margin-left: 5px;\n        }\n        .ejs-select-wrapper .user-name,\n        .ejs-edit-wrapper .user-name{\n            line-height: 28px;\n        }\n        .ejs-select-wrapper .user-title{\n            color: #999;\n            font-size: 14px;\n            line-height: 26px;\n        }\n        .ejs-select-wrapper [data-type="user"] .mui-input-row input{\n            top: calc(50% - 13px);\n        }\n        .ejs-select-wrapper .mui-icon-arrowright{\n            font-size: 20px;\n            color: #bbb;\n            line-height: 23px;\n        }\n        .ejs-select-wrapper .empty-tip{\n            margin-top: 45%;\n            width: 100%;\n            font-size: 18px;\n            color: #8D939D;\n            text-align: center;\n        }\n        .ejs-structure-wrapper{\n            position: absolute;\n            right: 0;\n            top: 0;\n            width: 0;\n            height: 100%;\n            transition: width .5s;\n        }\n        .ejs-structure-wrapper.width-100{\n            width: 100vw;\n        }\n        .ejs-structure-wrapper .mui-scroll-wrapper.mui-slider-indicator{\n            top: 0;\n            left: 0;\n            margin-bottom: 10px;\n            padding: 0 10px;\n            height: 38px;\n            line-height: 38px;\n            background-color: #fff;\n            border-bottom: 1px solid #d9d9d9;\n        }\n        .ejs-structure-wrapper .nav-title{\n            color: #000;\n        }\n        .ejs-structure-wrapper .nav-title span{\n            display: none;\n        }\n        .ejs-structure-wrapper .nav-title.active,\n        .ejs-structure-wrapper .nav-title.active .mui-icon-arrowright{\n            color: #3C80E6;\n        }\n        .ejs-structure-wrapper .nav-title.active span{\n            display: inline;\n            border: none;\n        }\n        .ejs-structure-wrapper .structure-body{\n            position: relative;\n            height: calc(100% - 48px);\n            border-top: 1px solid #d9d9d9;\n        }\n        .ejs-structure-wrapper .structure-body .mui-scroll-wrapper{\n            top: 0;\n            left: 0;\n            height: 100%;\n        }\n        .ejs-structure-wrapper .person-num,\n        .ejs-edit-wrapper .person-num{\n            color: #007aff;\n        }\n        .ejs-poptotop{\n            height: 100% !important;\n        }\n        .ejs-poptoleft{\n            width: 100vw !important;\n        }\n        .ejs-transitionH{\n            transition: height .5s;\n        }';

    return style;
};

// 编辑人员界面样式
var editClassName = function editClassName() {
    myShadowDom.querySelector('style').innerHTML += '\n        .ejs-edit-wrapper{\n            z-index: 10000;\n            position: fixed;\n            top: 0;\n            right: 0;\n            background-color: #f9f9f9;\n            width: 0;\n            height: 100%;\n            overflow: hidden;\n            transition: width .5s;\n        }\n        .ejs-edit-wrapper .mui-scroll-wrapper{\n            height: calc(100% - 54px);\n        }\n        .ejs-edit-wrapper .person-num{\n            position: absolute;\n            right: 39px;\n            top: calc(50% - 11px);\n        }\n        .ejs-edit-wrapper .mui-table-view-cell label{\n            display: inline-block;\n            width: 208px;\n        }\n        .ejs-edit-wrapper .mui-icon{\n            color: #999;\n            line-height: 100%;\n        }\n        .ejs-edit-wrapper .mui-icon.mui-icon-bars{\n            margin-right: 5px;\n            position: relative;\n            top: 3px;\n        }\n        .ejs-edit-wrapper .mui-icon.mui-icon-trash{\n            position: absolute;\n            top: calc(50% - 12px);\n            right: 15px;\n        }\n        .ejs-edit-wrapper .opacity0{\n            opacity: 0;\n        }\n        .ejs-edit-wrapper .bg-color#000{\n            background-color: rgba(0, 0, 0, .5);\n        }\n        .ejs-edit-wrapper .bottom-bar{\n            position: absolute;\n            bottom: 0;\n            left: 0;\n            padding: 10px;\n            padding-bottom: 15px;\n            width: 100%;\n            background-color: #fff;\n            border-top: 1px solid #d9d9d9;\n            z-index: 1;\n        }\n        ';
};

// 搜索界面样式
var searchClassName = function searchClassName() {
    if (searchonce === 0) {
        searchonce = 1;
        myShadowDom.querySelector('style').innerHTML += '\n        #' + ACTION_SEARCH_UNIQUE_ID + ' {\n            position: relative;\n            width: 100vw;\n            height: calc(100% - 48px);\n            background-color: #fff;\n        }\n\n        #' + ACTION_SEARCH_UNIQUE_ID + ' .fail-tip{\n            width: 100%;\n            font-size: 14px;\n            text-align: center;\n            color: #ccc;\n            line-height: 50px;\n        }\n        ';
    }
};

/**
 * 检查是否全选
 */
function checkIsAll(dom) {
    if (issingle !== '1') {
        var items = myShadowDom.getElementById(ACTION_STRUCTURE_UNIQUE_ID).getElementsByTagName('li');
        var flag = false;

        for (var i = 0; i < items.length; i += 1) {
            if (!items[i].querySelector('.mui-input-row input').disabled && !items[i].querySelector('input').checked && !(dom && items[i] === dom)) {
                flag = true;
            }
        }

        if (flag && myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' #selectall input').checked) {
            myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' #selectall input').checked = false;
        } else if (!flag) {
            myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' #selectall input').checked = true;
        }
    }
}

/**
 * 获取数组中特定标识项的索引
 * @param {Array} arr 数组
 * @param {String} guid 标识
 * @param {String} type 类型
 */
function getArrItemIndex(arr, guid, type) {
    var i = 0;
    for (; i < arr.length; i += 1) {
        if (type === 'ou' && arr[i].ouguid === guid || type === 'user' && arr[i].userguid === guid) {
            break;
        }
    }

    if (i >= arr.length) {
        i = -1;
    }

    return i;
}

/**
 * 获取部门及人员列表
 * @param {String} ouGuid 部门guid
 */
function getOuListWithUser(ouGuid) {
    ejs.ui.showWaiting();
    Util.ajax({
        url: '' + formalUrl + getoulistwithuser,
        data: {
            params: JSON.stringify({
                ouguid: ouGuid
            })
        },
        headers: {
            Authorization: 'Bearer ' + token
        },
        success: function success(result) {
            ejs.ui.closeWaiting();
            if (result.status.code === 1) {
                getFromAjaxOu = result.custom.oulist;
                getFromAjaxUser = result.custom.userlist;

                if (result.custom.oulist.length || result.custom.userlist.length) {
                    // 处理数据
                    result.custom.oulist.forEach(function (e) {
                        var guid = e.ouguid;
                        var element = e;
                        element.isnext = '';
                        element.ischecked = '';

                        if (getArrItemIndex(selectedous, guid, 'ou') > -1) {
                            element.ischecked = 'checked';
                        }

                        if (isouonly === '1' && parseInt(element.haschildou, 0) === 0) {
                            element.isnext = 'mui-hidden';
                        }
                    });

                    result.custom.userlist.forEach(function (e) {
                        var guid = e.userguid;
                        var element = e;
                        element.ischecked = '';
                        element.disabled = '';

                        if (getArrItemIndex(selectedusers, guid, 'user') > -1) {
                            element.ischecked = 'checked';
                        }

                        if (getArrItemIndex(unableselectusers, guid, 'user') > -1) {
                            element.disabled = 'disabled';
                        }
                    });

                    // 渲染
                    renderStructure(result.custom);
                }
            } else {
                ejs.ui.toast(result.status.text);
            }
        }
    });
}

/**
 * 从custom中获取数据列表
 * @param {String} ouguid 部门guid
 * @param {Object} parentou 父部门
 */
function getDataFromCustom(ouguid, parentou) {
    if (parentou.ouguid === ouguid) {
        getFromAjaxOu = [];
        getFromAjaxUser = [];

        if ('userlist' in parentou && parentou.userlist.length > 0) {
            parentou.userlist.forEach(function (e) {
                getFromAjaxUser.push(e);
                var element = e;

                if (!('displayname' in element)) {
                    element.displayname = element.username;
                }

                if (!('disabled' in element)) {
                    element.disabled = '';

                    if (getArrItemIndex(unableselectusers, element.userguid, 'user') > -1) {
                        element.disabled = 'disabled';
                    }
                }

                element.ischecked = '';
                if (getArrItemIndex(selectedusers, element.userguid, 'user') > -1) {
                    element.ischecked = 'checked';
                }
            });
        }

        if ('oulist' in parentou && parentou.oulist.length > 0) {
            parentou.oulist.forEach(function (e) {
                var element = e;
                if (!('isnext' in element)) {
                    element.isnext = '';
                    if (isouonly === '1' && element.haschildou === '0') {
                        element.isnext = 'mui-hidden';
                    }
                }

                element.ischecked = '';

                if (getArrItemIndex(selectedous, element.ouguid, 'ou') > -1) {
                    element.ischecked = 'checked';
                }

                getFromAjaxOu.push(element);
            });
        }

        var result = {
            oulist: parentou.oulist || [],
            userlist: parentou.userlist || []
        };

        renderStructure(result);
    } else if ('oulist' in parentou && parentou.oulist.length > 0) {
        for (var i = 0; i < parentou.oulist.length; i += 1) {
            getDataFromCustom(ouguid, parentou.oulist[i]);
        }
    }
}

/**
 * 搜索人员
 * @param {String} keyWord 关键词
 */
function searchUser(keyWord) {
    Util.ajax({
        url: '' + formalUrl + searchuserbycondition,
        data: {
            params: JSON.stringify({
                keyword: keyWord,
                currentpageindex: 1,
                pagesize: -1
            })
        },
        headers: {
            Authorization: 'Bearer ' + token
        },
        success: function success(result) {
            if (result.status.code === 1 || result.status.code === '1') {
                if (result.custom.userlist.length > 0) {
                    getFromSearchUser = result.custom.userlist;
                    // 处理返回数据
                    result.custom.userlist.forEach(function (e) {
                        var element = e;
                        element.disabled = '';
                        element.ischecked = '';

                        if (getArrItemIndex(selectedusers, element.userguid, 'user') > -1) {
                            element.ischecked = 'checked';
                        }

                        if (getArrItemIndex(unableselectusers, element.userguid, 'user') > -1) {
                            element.disabled = 'disabled';
                        }
                    });

                    renderSearchContent(result.custom.userlist);
                } else {
                    myShadowDom.querySelector('#' + ACTION_SEARCH_UNIQUE_ID).innerHTML = '<div class="fail-tip">未找到相关搜索结果</div>';
                }
            } else {
                ejs.ui.toast(result.status.text);
            }
        }
    });
}

/**
 * 获取部门下所有人员列表
 * @param {String} parentOuGuid 父部门guid
 */
function getUserList(parentOuGuid, cb) {
    ejs.ui.showWaiting();
    Util.ajax({
        url: '' + formalUrl + getalluserlist,
        data: {
            params: JSON.stringify({
                parentouguid: parentOuGuid,
                keyword: '',
                currentpageindex: 1,
                pagesize: -1
            })
        },
        headers: {
            Authorization: 'Bearer ' + token
        },
        success: function success(result) {
            ejs.ui.closeWaiting();
            if (result.status.code === 1) {
                result.custom.userlist.forEach(function (element) {
                    if (getArrItemIndex(selectedusers, element.userguid, 'user') === -1 && getArrItemIndex(unableselectusers, element.userguid, 'user') === -1) {
                        selectedusers.push(element);
                    }
                });
                cb && cb();
            } else {
                ejs.ui.toast(result.status.text);
            }
        }
    });
}

/**
 * 从custom中获取部门人员
 * @param {String} parentOuGuid 父部门guid
 */
function getUserFromCustom(parentOuGuid, parentou) {
    if (parentou.ouguid === parentOuGuid) {
        if ('userlist' in parentou && parentou.userlist.length > 0) {
            parentou.userlist.forEach(function (element) {
                if (getArrItemIndex(selectedusers, element.userguid, 'user') === -1 && getArrItemIndex(unableselectusers, element.userguid, 'user') === -1) {
                    selectedusers.push(element);
                }
            });
        }

        if ('oulist' in parentou && parentou.oulist.length > 0) {
            for (var i = 0; i < parentou.oulist.length; i += 1) {
                getUserFromCustom(parentou.oulist[i].ouguid, parentou.oulist[i]);
            }
        }
    } else if ('oulist' in parentou && parentou.oulist.length > 0) {
        for (var _i = 0; _i < parentou.oulist.length; _i += 1) {
            getUserFromCustom(parentOuGuid, parentou.oulist[_i]);
        }
    }
}

/**
 * 获取分组列表
 * @param {String} groupType 分组类别，public是公共分组，''是我的分组
 */
function getGroupList(groupType) {
    ejs.ui.showWaiting();
    Util.ajax({
        url: '' + formalUrl + getgrouplist,
        data: {
            params: JSON.stringify({
                type: groupType
            })
        },
        headers: {
            Authorization: 'Bearer ' + token
        },
        success: function success(result) {
            ejs.ui.closeWaiting();
            if (result.status.code === 1) {
                if (result.custom.grouplist.length) {
                    var data = {
                        userlist: [],
                        oulist: [],
                        grouptype: groupType
                    };

                    result.custom.grouplist.forEach(function (element) {
                        var ele = element;
                        ele.ouguid = element.groupguid;
                        ele.haschildou = '0';

                        if (parseInt(ele.addresscount, 10) === 0) {
                            ele.haschilduser = '0';
                        } else {
                            ele.haschilduser = '1';
                        }

                        ele.isnext = '';
                        ele.usercount = element.addresscount;
                        ele.ischecked = '';
                        ele.ouname = element.groupname;
                        data.oulist.push(element);
                    });
                    getFromAjaxUser = [];
                    getFromAjaxOu = result.custom.grouplist;
                    // 渲染
                    renderStructure(data);
                } else {
                    // 展示空提示
                    getFromAjaxUser = [];
                    getFromAjaxOu = [];
                    myShadowDom.querySelector('#' + ACTION_STRUCTURE_UNIQUE_ID + ' .structure-body').innerHTML = '<div class="empty-tip">暂无分组</div>';
                }
            } else {
                //     ejs.ui.toast(result.status.text);
            }
        }
    });
}

/**
 * 获取分组下的直属子用户
 * @param {String} guid 分组标识
 */
function getAddressBookList(groupType, guid) {
    ejs.ui.showWaiting();
    Util.ajax({
        url: '' + formalUrl + getaddressbooklist,
        data: {
            params: JSON.stringify({
                type: groupType,
                groupguid: guid,
                keyword: '',
                currentpageindex: 1,
                pagesize: -1
            })
        },
        headers: {
            Authorization: 'Bearer ' + token
        },
        success: function success(result) {
            ejs.ui.closeWaiting();
            if (result.status.code === 1) {
                var data = {
                    userlist: [],
                    oulist: [],
                    type: 'groups'
                };

                result.custom.userlist.forEach(function (element) {
                    var ele = element;
                    ele.disabled = '';
                    ele.ischecked = '';

                    ele.userguid = element.objectguid;
                    ele.displayname = element.objectname;
                    if (getArrItemIndex(unableselectusers, element.objectguid, 'user') > -1) {
                        ele.disabled = 'disabled';
                    }

                    if (getArrItemIndex(selectedusers, element.objectguid, 'user') > -1) {
                        ele.ischecked = 'checked';
                    }

                    data.userlist.push(element);
                });
                getFromAjaxOu = [];
                getFromAjaxUser = result.custom.userlist;
                // 渲染
                renderStructure(data);
            } else {
                //     ejs.ui.toast(result.status.text);
            }
        }
    });
}

/**
 * 创建选人主界面HTML
 */
function createSelectPersonPage() {
    var finalHtml = '';

    if (Object.prototype.toString.call(custom) !== '[object Object]' && isouonly === '0') {
        finalHtml += '<header>\n        <div class="mui-input-row mui-input-search">\n        <span class="mui-icon mui-icon-search"></span>\n        <input type="search" class="mui-input-speech mui-input-clear" id="search-input" placeholder="\u641C\u7D22\u9009\u62E9\u4EBA\u5458">\n        </div>\n        <span class="cancel-btn mui-hidden">\u786E\u5B9A</span>\n        </header>';
    }
    finalHtml += '<div class="content-body">';

    if (isouonly === '1' || Object.prototype.toString.call(custom) === '[object Object]') {
        // 只选部门或选择范围
        finalHtml += '<div id="' + ACTION_STRUCTURE_UNIQUE_ID + '" class="ejs-structure-wrapper width-100">\n        <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">\n        <div class="mui-scroll structure-bar"></div>\n        </div>\n        <div class="structure-body"></div>\n        </div>';
    } else {
        // 选择人员
        finalHtml += '<div class="mui-scroll-wrapper" id="view-0"><div class="mui-scroll">';
        finalHtml += '<div class="selectperson-all-list">';
        finalHtml += '<div class="select-tip">选择人员</div>';
        finalHtml += '<ul class="mui-table-view" id="zzjg">';
        finalHtml += '<li class="mui-table-view-cell">\n            <a class="mui-navigate-right">\u7EC4\u7EC7\u67B6\u6784</a>\n        </li>\n        <li class="mui-table-view-cell">\n            <a class="mui-navigate-right">\u6211\u7684\u90E8\u95E8</a>\n        </li>';
        // 分组功能
        finalHtml += '<li class="mui-table-view-cell">\n            <a class="mui-navigate-right">\u6211\u7684\u5206\u7EC4</a>\n        </li>';
        finalHtml += '<li class="mui-table-view-cell">\n            <a class="mui-navigate-right">\u516C\u5171\u5206\u7EC4</a>\n        </li>';
        finalHtml += '</ul>';
        finalHtml += '</div>';
        finalHtml += '</div></div>';
    }

    finalHtml += '</div>';
    finalHtml += '<div class="bottom-bar">';
    finalHtml += '<div class="mui-input-row mui-checkbox mui-left l mui-hidden"  id="selectall">\n    <label>\u5168\u9009</label>\n    <input name="checkbox1" value="Item 1" type="checkbox">\n    </div>';
    finalHtml += '<button type="button" class="mui-btn mui-btn-primary btn-set r">确定<span class="selected-num mui-hidden"></span></button>';
    if (isouonly === '1') {
        finalHtml += '<a class="edit-selected-btn mui-hidden">编辑已选部门<span class="mui-icon mui-icon-arrowup"></span></a>';
    } else {
        finalHtml += '<a class="edit-selected-btn mui-hidden">编辑已选人员<span class="mui-icon mui-icon-arrowup"></span></a>';
    }
    finalHtml += '</div>';

    return finalHtml;
}

/**
 * 创建组织架构目录标题导航
 * @param {String} navTitle 组织架构目录标题
 * @param {String} ouguid 部门guid
 */
function createNavTitle(navTitle, ouguid) {
    var navNextDom = document.createElement('a');
    navNextDom.classList.add('nav-title');
    navNextDom.id = ouguid;
    if (navTitle === '我的分组' || navTitle === '公共分组') {
        navNextDom.setAttribute('type', 'grouptitle');
    } else {
        navNextDom.setAttribute('type', 'commontitle');
    }

    navNextDom.innerHTML = navTitle + '<span class="mui-icon mui-icon-arrowright"></span>';

    if (myShadowDom.getElementById(ACTION_STRUCTURE_UNIQUE_ID).getElementsByClassName('nav-title').length > 0) {
        // 给前一个标题添加样式
        myShadowDom.querySelector('#' + ACTION_STRUCTURE_UNIQUE_ID + ' .structure-bar').lastElementChild.classList.add('active');
    }
    myShadowDom.querySelector('#' + ACTION_STRUCTURE_UNIQUE_ID + ' .structure-bar').appendChild(navNextDom);

    // 给新插入的标题添加点击事件
    myShadowDom.querySelector('#' + ACTION_STRUCTURE_UNIQUE_ID + ' .structure-bar').lastElementChild.addEventListener('click', function tapNav() {
        var guid = this.id;
        var title = this.getAttribute('type');

        if (this.classList.contains('active')) {
            var aList = myShadowDom.getElementById(ACTION_STRUCTURE_UNIQUE_ID).getElementsByClassName('nav-title');
            var i = 0;
            var j = 0;

            for (; i < aList.length; i += 1) {
                if (aList[i].id === guid) {
                    break;
                }
            }

            for (j = aList.length - 1; j > i; j -= 1) {
                aList[j].parentNode.removeChild(aList[j]);
            }

            this.classList.remove('active');
            if (isSelectRange === '1') {
                getDataFromCustom(guid, custom);
            } else if (title === 'grouptitle') {
                getGroupList(guid);
                myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .bottom-bar #selectall').classList.add('mui-hidden');
            } else {
                getOuListWithUser(guid);
            }
        }
    });

    // 初始化横向滚动条
    mui(myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .content-body .mui-scroll-wrapper')).scroll();
}

/**
 * 渲染组织架构
 * @param {Object} data 部门及人员列表数据
 */
renderStructure = function renderStructure(data) {
    var oulist = data.oulist;
    var userlist = data.userlist;

    var html = '';

    var isoushow = '';
    var isshowcount = '';
    var isshowtitle = '';

    if (issingle === '1' && isouonly === '0' || 'grouptype' in data) {
        // 如果是选人单选，部门的checkbox应该隐藏
        // 或者是分组的情况
        isoushow = 'mui-hidden';
    }
    if (isouonly === '1') {
        // 如果是只选部门，部门不显示人数
        isshowcount = 'mui-hidden';
    }
    if (isSelectRange === '1') {
        // 选择范围时不显示职位
        isshowtitle = 'mui-hidden';
    }

    html += '<div class="mui-scroll-wrapper"><div class="mui-scroll">';
    html += '<ul class="mui-table-view">';

    if (userlist.length > 0 && isouonly !== '1') {
        for (var j = 0; j < userlist.length; j += 1) {
            html += '<li class="mui-table-view-cell" data-guid="' + userlist[j].userguid + '" data-type="user">\n            <div class="mui-input-row mui-checkbox mui-left">\n            <label>';
            html += '<img src="' + (PHOTO_URL + userlist[j].photourl) + '" class="user-photo" onerror="this.classList.add(\'mui-hidden\');this.parentNode.querySelector(\'.imgerror-backup\').classList.remove(\'mui-hidden\');onerror=null;">';

            html += '<span class="imgerror-backup mui-hidden">' + userlist[j].displayname.substring(userlist[j].displayname.length - 2) + '</span>\n            <p class="user-info-txt"><span class="user-name">' + userlist[j].displayname + '</span><br><span class="user-title ' + isshowtitle + '">' + userlist[j].title + '</span></p>\n            </label>\n            <input type="checkbox" ' + userlist[j].ischecked + ' ' + userlist[j].disabled + '>\n            </div>\n            </li>';
        }
    }

    if (oulist.length > 0) {
        for (var i = 0; i < oulist.length; i += 1) {
            html += '<li class="mui-table-view-cell" data-guid="' + oulist[i].ouguid + '" data-type="ou" data-haschildou="' + oulist[i].haschildou + '" data-haschilduser="' + oulist[i].haschilduser + '">\n            <span class="mui-icon mui-icon-arrowright r ' + oulist[i].isnext + '"></span>\n            <span class="person-num r ' + isshowcount + '">' + oulist[i].usercount + '</span>\n            <div class="mui-input-row mui-checkbox mui-left ' + oulist[i].ischecked + ' ' + isoushow + '"><input type="checkbox" ' + oulist[i].ischecked + '></div>\n            <span class="' + oulist[i].ischecked + ' user-single-span">' + oulist[i].ouname + '</span>\n            </li>';
        }
    }

    html += '</ul>';
    html += '</div></div>';

    var structureView = document.createElement('div');

    structureView.classList.add('structureView');
    structureView.innerHTML = html;
    // 清空内容
    myShadowDom.querySelector('#' + ACTION_STRUCTURE_UNIQUE_ID + ' .structure-body').innerHTML = '';
    myShadowDom.querySelector('#' + ACTION_STRUCTURE_UNIQUE_ID + ' .structure-body').appendChild(structureView);

    // 每一次渲染检查全选
    checkIsAll();

    // 添加item点击事件
    mui(myShadowDom.querySelector('#' + ACTION_STRUCTURE_UNIQUE_ID + ' .structure-body .structureView')).on('click', 'li', function tapItem(e) {
        var ouCount = 0;
        var guid = this.dataset.guid;

        if (e.target.tagName === 'INPUT' || e.target.tagName === 'LABEL' || e.target.classList.contains('mui-checkbox') || e.target.classList.contains('user-photo') || e.target.classList.contains('user-info-txt') || e.target.classList.contains('user-name') || e.target.classList.contains('user-title')) {
            // 点击复选框
            if (!this.querySelector('.mui-input-row input').checked) {
                // 取消全选
                if (myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' #selectall input').checked) {
                    myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' #selectall input').checked = false;
                }

                if (this.dataset.type === 'ou') {
                    this.querySelector('.mui-input-row').classList.remove('checked');
                    this.querySelector('.user-single-span').classList.remove('checked');
                    ouCount = parseInt(this.querySelector('.person-num').innerText.trim(), 0);
                    selectedous.splice(getArrItemIndex(selectedous, guid, 'ou'), 1);
                    selectedNum -= ouCount;
                } else if (this.dataset.type === 'user') {
                    selectedusers.splice(getArrItemIndex(selectedusers, guid, 'user'), 1);
                    selectedNum -= 1;
                }

                if (selectedNum === 0 || isouonly === '1' && selectedous.length <= 0) {
                    myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .selected-num').classList.add('mui-hidden');
                    myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .edit-selected-btn').classList.add('mui-hidden');
                } else if (selectedNum > 0 && isouonly !== '1') {
                    myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .selected-num').innerHTML = '(' + selectedNum + '/' + maxchoosecount + ')';
                }
            } else if (!this.querySelector('.mui-input-row input').disabled) {
                if (this.dataset.type === 'ou') {
                    // 选中部门
                    if (issingle === '1') {
                        // 单选部门
                        var nextOuLi = this.parentNode.firstChild;
                        for (; nextOuLi; nextOuLi = nextOuLi.nextSibling) {
                            if (nextOuLi.nodeType === 1 && nextOuLi !== this && nextOuLi.dataset.type === 'ou') {
                                nextOuLi.querySelector('input').checked = false;
                                nextOuLi.querySelector('.mui-input-row').classList.remove('checked');
                                nextOuLi.querySelector('.user-single-span').classList.remove('checked');
                            }
                        }
                    }
                    this.querySelector('.mui-input-row').classList.add('checked');
                    this.querySelector('.user-single-span').classList.add('checked');
                    getFromAjaxOu.forEach(function (ele) {
                        if (ele.ouguid === guid) {
                            if (issingle === '1') {
                                selectedous = [];
                            }
                            selectedous.push(ele);
                        }
                    });
                    if (issingle === '0') {
                        ouCount = parseInt(this.querySelector('.person-num').innerText.trim(), 0);
                        selectedNum += ouCount;
                    }
                } else if (this.dataset.type === 'user') {
                    // 选中人员
                    if (issingle === '1') {
                        // 单选人员
                        var nextUserLi = this.parentNode.firstChild;
                        for (; nextUserLi; nextUserLi = nextUserLi.nextSibling) {
                            if (nextUserLi.nodeType === 1 && nextUserLi !== this && nextUserLi.dataset.type === 'user') {
                                nextUserLi.querySelector('input').checked = false;
                            }
                        }
                    }
                    getFromAjaxUser.forEach(function (ele) {
                        if (ele.userguid === guid) {
                            if (issingle === '1') {
                                selectedusers = [];
                            }
                            selectedusers.push(ele);
                        }
                    });

                    if (issingle === '1') {
                        selectedNum = 1;
                    } else {
                        selectedNum += 1;
                    }
                }

                // 每一次选择检查全选，如果已全部选中，改变全选按钮状态
                checkIsAll(this);

                if (isouonly !== '1') {
                    if (issingle === '1') {
                        myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .selected-num').innerHTML = '(' + selectedNum + ')';
                    } else {
                        myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .selected-num').innerHTML = '(' + selectedNum + '/' + maxchoosecount + ')';
                    }
                    myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .selected-num').classList.remove('mui-hidden');
                }
                myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .edit-selected-btn').classList.remove('mui-hidden');
            }
        } else if (!this.querySelector('.mui-input-row').classList.contains('checked') && this.dataset.type === 'ou') {
            // 点击部门进入下一层级
            var navTitle = this.querySelector('.user-single-span').innerText.trim();

            if (this.dataset.haschildou === '0' && isouonly === '1') {
                // 只选部门且此部门没有子部门时，不做动作
                return;
            }
            if (this.dataset.haschildou === '0' && this.dataset.haschilduser === '0') {
                // 没有子部门且没有人员时不做动作
                return;
            }

            createNavTitle(navTitle, guid);
            if (isSelectRange === '1') {
                // 选择范围时
                getDataFromCustom(guid, custom);
            } else if ('grouptype' in data) {
                getAddressBookList(data.grouptype, guid);
            } else {
                getOuListWithUser(guid);
            }
        }
    });

    // 滚动初始化
    mui(myShadowDom.querySelector('#' + ACTION_STRUCTURE_UNIQUE_ID + ' .structureView .mui-scroll-wrapper')).scroll();

    if ('grouptype' in data) {
        return;
    }

    if (issingle !== '1') {
        myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .bottom-bar #selectall').classList.remove('mui-hidden');
    }
};

/**
 * 创建编辑已选人员界面
 */
function createEditPage() {
    var html = '';
    var isshowcount = '';

    if (isouonly === '1') {
        isshowcount = 'mui-hidden';
    }

    html += '<div class="mui-scroll-wrapper"><div class="mui-scroll">';

    if (selectedous.length > 0) {
        html += '<div class="selected-ous">\n        <div class="selected-tip">\u5DF2\u9009\u90E8\u95E8</div>\n        <ul class="mui-table-view">';

        selectedous.forEach(function (element) {
            html += '<li class="mui-table-view-cell" data-guid="' + element.ouguid + '" data-type="ou">\n                <span class="mui-icon mui-icon-trash del-btn"></span>\n                <span class="person-num r ' + isshowcount + '">' + element.usercount + '</span>\n                <label>' + element.ouname + '</label>\n                </li>';
        });

        html += '</ul>';
        html += '</div>';
    }

    if (selectedusers.length > 0) {
        html += '<div class="selected-users">\n        <div class="selected-tip">\u957F\u6309\u53EF\u4EE5\u8C03\u6574\u987A\u5E8F</div>\n        <ul class="mui-table-view">';

        selectedusers.forEach(function (element) {
            html += '<li class="mui-table-view-cell" data-guid="' + element.userguid + '" data-type="user">\n            <span class="mui-icon mui-icon-trash del-btn"></span>\n            <span class="mui-icon mui-icon-bars"></span>';
            html += '<img src="' + (PHOTO_URL + element.photourl) + '" class="user-photo" onerror="this.classList.add(\'mui-hidden\');this.parentNode.querySelector(\'.imgerror-backup\').classList.remove(\'mui-hidden\');onerror=null;">';

            html += '<span class="imgerror-backup mui-hidden">' + element.displayname.substring(element.displayname.length - 2) + '</span>\n            <p class="user-info-txt"><span class="user-name">' + element.displayname + '</span></p>\n            </li>';
        });

        html += '</ul>';
        html += '</div>';
    }

    html += '</div></div>';
    html += '<div class="bottom-bar"><button class="mui-btn mui-btn-primary clearall-btn r">一键清空</button></div>';

    if (!myShadowDom.getElementById(ACTION_EDIT_UNIQUE_ID)) {
        // 不重复添加
        editClassName();

        var wrapper = document.createElement('div');

        wrapper.id = ACTION_EDIT_UNIQUE_ID;
        wrapper.classList.add('ejs-edit-wrapper');
        wrapper.innerHTML = html;
        myShadowDom.appendChild(wrapper);

        // 添加删除事件
        mui(myShadowDom.querySelector('#' + ACTION_EDIT_UNIQUE_ID)).on('click', '.del-btn', function tapDelBtn() {
            if (this.parentNode.dataset.type === 'ou') {
                selectedous.splice(getArrItemIndex(selectedous, this.parentNode.dataset.guid, 'ou'), 1);
                selectedNum -= parseInt(this.parentNode.querySelector('.person-num').innerText.trim(), 0);

                if (selectedous.length > 0) {
                    this.parentNode.parentNode.removeChild(this.parentNode);
                } else {
                    myShadowDom.querySelector('#' + ACTION_EDIT_UNIQUE_ID + ' .mui-scroll').removeChild(myShadowDom.querySelector('#' + ACTION_EDIT_UNIQUE_ID + ' .selected-ous'));
                }
            } else {
                selectedusers.splice(getArrItemIndex(selectedusers, this.parentNode.dataset.guid, 'user'), 1);
                selectedNum -= 1;

                if (selectedusers.length > 0) {
                    this.parentNode.parentNode.removeChild(this.parentNode);
                } else {
                    myShadowDom.querySelector('#' + ACTION_EDIT_UNIQUE_ID + ' .mui-scroll').removeChild(myShadowDom.querySelector('#' + ACTION_EDIT_UNIQUE_ID + ' .selected-users'));
                }
            }

            myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .selected-num').innerHTML = '(' + selectedNum + '/' + maxchoosecount + ')';
            if (selectedNum <= 0) {
                myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .selected-num').classList.add('mui-hidden');
                myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .edit-selected-btn').classList.add('mui-hidden');
            }
        });
    } else {
        // 直接更改html
        myShadowDom.getElementById(ACTION_EDIT_UNIQUE_ID).innerHTML = html;
    }

    // 初始化滚动
    mui(myShadowDom.querySelector('#' + ACTION_EDIT_UNIQUE_ID + ' .mui-scroll-wrapper')).scroll();

    // 添加一键清空事件
    mui(myShadowDom.querySelector('#' + ACTION_EDIT_UNIQUE_ID + ' .bottom-bar')).on('click', 'button', function () {
        selectedusers = [];
        selectedous = [];
        selectedNum = 0;
        myShadowDom.querySelector('#' + ACTION_EDIT_UNIQUE_ID + ' .mui-scroll').innerHTML = '';
        myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .selected-num').innerHTML = '';
        myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .selected-num').classList.add('mui-hidden');
        myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .edit-selected-btn').classList.add('mui-hidden');
        myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .bottom-bar #selectall').querySelector('input').checked = false;
    });

    // 长按拖拽功能
    if (myShadowDom.querySelector('#' + ACTION_EDIT_UNIQUE_ID + ' .selected-users')) {
        new Sortable(myShadowDom.querySelector('#' + ACTION_EDIT_UNIQUE_ID + ' .selected-users ul'), { // eslint-disable-line
            disabled: false,
            delay: 300,
            ghostClass: 'bg-color#000',
            onClone: function onClone(e) {
                e.item.classList.add('opacity0');
            },
            onEnd: function onEnd(e) {
                var con = selectedusers[e.oldIndex];
                selectedusers[e.oldIndex] = selectedusers[e.newIndex];
                selectedusers[e.newIndex] = con;
                e.item.classList.remove('opacity0');
            }
        });
    }

    // 切换到编辑已选人员界面
    myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2).classList.add('mui-hidden');
    myShadowDom.querySelector('#' + ACTION_EDIT_UNIQUE_ID).classList.add('ejs-poptoleft');
}

/**
 * 渲染搜索人员列表
 * @param {Array} userlist 人员列表
 */
renderSearchContent = function renderSearchContent(userlist) {
    var html = '';

    html += '<div class="mui-scroll-wrapper"><div class="mui-scroll">';
    html += '<ul class="mui-table-view">';

    userlist.forEach(function (element) {
        html += '<li class="mui-table-view-cell" data-guid="' + element.userguid + '" data-type="user">\n            <div class="mui-input-row mui-checkbox mui-left">\n            <label>';
        html += '<img src="' + (PHOTO_URL + element.photourl) + '" class="user-photo" onerror="this.classList.add(\'mui-hidden\');this.parentNode.querySelector(\'.imgerror-backup\').classList.remove(\'mui-hidden\');onerror=null;">';

        html += '<span class="imgerror-backup mui-hidden">' + element.displayname.substring(element.displayname.length - 2) + '</span>\n            <p class="user-info-txt"><span class="user-name">' + element.displayname + '</span>';
        if (element.ouname) {
            html += '<br><span class="user-title">' + element.ouname + '</span>';
        }
        html += '</p>\n            </label>\n            <input type="checkbox" ' + element.ischecked + ' ' + element.disabled + '>\n            </div>\n            </li>';
    });

    html += '</ul>';
    html += '</div></div>';

    myShadowDom.querySelector('#' + ACTION_SEARCH_UNIQUE_ID).innerHTML = html;
    // 初始化滚动
    mui(myShadowDom.querySelector('#' + ACTION_SEARCH_UNIQUE_ID + ' .mui-scroll-wrapper')).scroll();
};

/**
 * 重新渲染架构
 */
function refreshStructure() {
    var flag = false;
    var data = {};

    getFromAjaxOu.forEach(function (e) {
        var element = e;
        if (getArrItemIndex(selectedous, element.ouguid, 'ou') > -1) {
            element.ischecked = 'checked';
        } else {
            element.ischecked = '';
            flag = true;
        }
    });
    getFromAjaxUser.forEach(function (e) {
        var element = e;
        if (getArrItemIndex(selectedusers, element.userguid, 'user') > -1) {
            element.ischecked = 'checked';
        } else {
            element.ischecked = '';
            flag = true;
        }
    });

    if (myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .bottom-bar #selectall').querySelector('input').checked && flag) {
        // 取消全选
        myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .bottom-bar #selectall').querySelector('input').checked = false;
    }

    var title = myShadowDom.querySelector('#' + ACTION_STRUCTURE_UNIQUE_ID + ' .structure-bar').lastElementChild.innerText;

    if (title === '我的分组' || title === '公共分组') {
        if (getFromAjaxOu.length === 0) {
            myShadowDom.querySelector('#' + ACTION_STRUCTURE_UNIQUE_ID + ' .structure-body').innerHTML = '<div class="empty-tip">暂无分组</div>';
        } else {
            if (title === '我的分组') {
                data = {
                    userlist: [],
                    oulist: getFromAjaxOu,
                    grouptype: ''
                };
            } else {
                data = {
                    oulist: getFromAjaxOu,
                    userlist: [],
                    grouptype: 'public'
                };
            }

            renderStructure(data);
        }
    } else {
        data = {
            oulist: getFromAjaxOu,
            userlist: getFromAjaxUser
        };
        renderStructure(data);
    }
}

/**
 * 插入历史记录
 * @param {String} tit 标题
 * @param {String} Url 索引
 */
function insertHistory(tit, Url) {
    var state = {
        title: tit,
        url: Url
    };
    window.history.pushState(state, state.title, state.url);
}

/**
* 用于搜索框防抖
*/
function debounce(fn, wait) {
    clearTimeout(timer);

    timer = setTimeout(function () {
        fn();
    }, wait);
}

/**
 * 添加公共事件
 */
function addEventListener() {
    // 拦截返回判断
    var intercept = function hookEvent(callback) {
        var guid = window.location.href;
        var reg1 = new RegExp(ACTION_WRAP_UNIQUE_ID$2, 'g');
        var reg2 = new RegExp(ACTION_STRUCTURE_UNIQUE_ID, 'g');

        if (reg1.test(guid)) {
            if (myShadowDom.querySelector('#' + ACTION_STRUCTURE_UNIQUE_ID) && myShadowDom.querySelector('#' + ACTION_STRUCTURE_UNIQUE_ID).classList.contains('ejs-poptoleft')) {
                // 组织架构子界面到主界面
                myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' #view-0').classList.remove('mui-hidden');
                myShadowDom.querySelector('#' + ACTION_STRUCTURE_UNIQUE_ID).classList.remove('ejs-poptoleft');
                myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .bottom-bar #selectall').classList.add('mui-hidden');
            } else if (myShadowDom.querySelector('#' + ACTION_EDIT_UNIQUE_ID) && myShadowDom.querySelector('#' + ACTION_EDIT_UNIQUE_ID).classList.contains('ejs-poptoleft')) {
                // 编辑人员界面回到主界面
                if (myShadowDom.querySelector('#' + ACTION_STRUCTURE_UNIQUE_ID)) {
                    refreshStructure();
                }
                myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2).classList.remove('mui-hidden');
                myShadowDom.querySelector('#' + ACTION_EDIT_UNIQUE_ID).classList.remove('ejs-poptoleft');
            } else if (myShadowDom.querySelector('#' + ACTION_SEARCH_UNIQUE_ID) && !myShadowDom.querySelector('#' + ACTION_SEARCH_UNIQUE_ID).classList.contains('mui-hidden')) {
                // 搜索界面回到组织架构主界面
                myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' header input').value = '';
                myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' header .mui-input-search').classList.remove('focus');
                myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' header .cancel-btn').classList.add('mui-hidden');
                myShadowDom.querySelector('#' + ACTION_SEARCH_UNIQUE_ID).classList.add('mui-hidden');
                myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .content-body').classList.remove('mui-hidden');
                myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .bottom-bar').classList.remove('mui-hidden');
            }
        } else if (reg2.test(guid)) {
            refreshStructure();
            if (myShadowDom.querySelector('#' + ACTION_EDIT_UNIQUE_ID) && myShadowDom.querySelector('#' + ACTION_EDIT_UNIQUE_ID).classList.contains('ejs-poptoleft')) {
                // 编辑人员界面回到组织架构子界面
                myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2).classList.remove('mui-hidden');
                myShadowDom.querySelector('#' + ACTION_EDIT_UNIQUE_ID).classList.remove('ejs-poptoleft');
            } else if (myShadowDom.querySelector('#' + ACTION_SEARCH_UNIQUE_ID) && !myShadowDom.querySelector('#' + ACTION_SEARCH_UNIQUE_ID).classList.contains('mui-hidden')) {
                // 搜索界面回到组织架构子界面
                myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' header input').value = '';
                myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' header .mui-input-search').classList.remove('focus');
                myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' header .cancel-btn').classList.add('mui-hidden');
                myShadowDom.querySelector('#' + ACTION_SEARCH_UNIQUE_ID).classList.add('mui-hidden');
                myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .content-body').classList.remove('mui-hidden');
                myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .bottom-bar').classList.remove('mui-hidden');
            }
        } else if (myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2).classList.contains('ejs-poptotop')) {
            myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2).classList.add('ejs-transitionH');
            // 关闭选人界面
            myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2).classList.remove('ejs-poptotop');
        } else {
            callback && callback();
        }
    };

    // 用于外部页面拦截返回时调用的函数，以此来正常使用选人的功能
    window.goback = function (callback) {
        window.history.go(-1);
        intercept(callback);
    };

    // 如果是ejs容器，使用ejs的API返回拦截
    if (Util.os.ejs) {
        // 拦截系统返回
        ejs.navigator.hookSysBack({
            success: function success() {
                var reg1 = new RegExp(ACTION_WRAP_UNIQUE_ID$2, 'g');
                var reg2 = new RegExp(ACTION_STRUCTURE_UNIQUE_ID, 'g');
                var reg3 = new RegExp(ACTION_EDIT_UNIQUE_ID, 'g');
                var reg4 = new RegExp(ACTION_SEARCH_UNIQUE_ID, 'g');

                if (reg1.test(window.location.href) || reg2.test(window.location.href) || reg3.test(window.location.href) || reg4.test(window.location.href)) {
                    window.history.go(-1);
                } else {
                    ejs.page.close();
                }
            },
            error: function error(_error) {
                window.toast(_error);
            }
        });

        // 拦截返回按钮
        ejs.navigator.hookBackBtn({
            success: function success() {
                var reg1 = new RegExp(ACTION_WRAP_UNIQUE_ID$2, 'g');
                var reg2 = new RegExp(ACTION_STRUCTURE_UNIQUE_ID, 'g');
                var reg3 = new RegExp(ACTION_EDIT_UNIQUE_ID, 'g');
                var reg4 = new RegExp(ACTION_SEARCH_UNIQUE_ID, 'g');

                if (reg1.test(window.location.href) || reg2.test(window.location.href) || reg3.test(window.location.href) || reg4.test(window.location.href)) {
                    window.history.go(-1);
                } else {
                    ejs.page.close();
                }
            },
            error: function error(_error2) {
                window.toast(_error2);
            }
        });
    }
    // 左上角返回事件绑定
    window.addEventListener('popstate', function () {
        intercept();
    }, false);

    // 顶部搜索框，点击
    mui(myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2)).on('click', '#search-input', function tapSearch() {
        this.focus();
        if (!myShadowDom.getElementById(ACTION_SEARCH_UNIQUE_ID) || myShadowDom.querySelector('#' + ACTION_SEARCH_UNIQUE_ID).classList.contains('mui-hidden')) {
            if (!myShadowDom.getElementById(ACTION_SEARCH_UNIQUE_ID)) {
                // 不重复添加
                searchClassName();

                var wrapper = document.createElement('div');

                wrapper.id = ACTION_SEARCH_UNIQUE_ID;
                wrapper.classList.add('ejs-search-wrapper');
                myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2).appendChild(wrapper);

                // 添加点击事件
                mui(myShadowDom.querySelector('#' + ACTION_SEARCH_UNIQUE_ID)).on('click', 'li', function tapSearchLi() {
                    var guid = this.dataset.guid;

                    if (this.querySelector('.mui-input-row input').checked) {
                        selectedusers.splice(getArrItemIndex(selectedusers, guid, 'user'), 1);
                        selectedNum -= 1;

                        if (selectedNum === 0) {
                            myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .selected-num').classList.add('mui-hidden');
                            myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .edit-selected-btn').classList.add('mui-hidden');
                        } else if (selectedNum > 0) {
                            myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .selected-num').innerHTML = '(' + selectedNum + '/' + maxchoosecount + ')';
                        }
                    } else if (!this.querySelector('.mui-input-row input').disabled) {
                        // 选中人员
                        if (issingle === '1') {
                            // 单选
                            var nextUserLi = this.parentNode.firstChild;
                            for (; nextUserLi; nextUserLi = nextUserLi.nextSibling) {
                                if (nextUserLi.nodeType === 1 && nextUserLi !== this) {
                                    nextUserLi.querySelector('input').checked = false;
                                }
                            }
                        }
                        getFromSearchUser.forEach(function (ele) {
                            if (ele.userguid === guid) {
                                if (issingle === '1') {
                                    selectedusers = [];
                                }
                                selectedusers.push(ele);
                            }
                        });

                        if (issingle === '1') {
                            selectedNum = 1;
                        } else {
                            selectedNum += 1;
                        }

                        if (issingle === '1') {
                            myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .selected-num').innerHTML = '(' + selectedNum + ')';
                        } else {
                            myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .selected-num').innerHTML = '(' + selectedNum + '/' + maxchoosecount + ')';
                        }
                        myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .selected-num').classList.remove('mui-hidden');
                        myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .edit-selected-btn').classList.remove('mui-hidden');
                    }
                });
            } else {
                myShadowDom.querySelector('#' + ACTION_SEARCH_UNIQUE_ID).innerHTML = '';
                myShadowDom.querySelector('#' + ACTION_SEARCH_UNIQUE_ID).classList.remove('mui-hidden');
            }
            myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' header .mui-input-search').classList.add('focus');
            myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' header .cancel-btn').classList.remove('mui-hidden');
            myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .content-body').classList.add('mui-hidden');
            myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .bottom-bar').classList.add('mui-hidden');
            myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2).classList.remove('ejs-transitionH');

            // 插入历史记录
            insertHistory('搜索界面', '#' + ACTION_SEARCH_UNIQUE_ID);
        }
    });

    // 顶部搜索框，搜索
    mui(myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2)).on('input', '#search-input', function keyup() {
        var keyword = this.value;

        debounce(function () {
            if (keyword === '') {
                // 清空关键字
                myShadowDom.querySelector('#' + ACTION_SEARCH_UNIQUE_ID).innerHTML = '';
            } else {
                searchUser(keyword);
            }
        }, 800);
    });

    // 顶部搜索框，取消
    mui(myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2)).on('click', '.cancel-btn', function tapCancel() {
        this.parentNode.getElementsByTagName('input')[0].blur();
        window.history.go(-1);
    });

    // 底部全选按钮点击
    mui(myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2)).on('click', '#selectall', function tapSelectall() {
        var items = myShadowDom.getElementById(ACTION_STRUCTURE_UNIQUE_ID).getElementsByTagName('li');

        if (!this.querySelector('input').checked) {
            // 取消全选
            for (var i = 0; i < items.length; i += 1) {
                if (!items[i].querySelector('.mui-input-row input').disabled) {
                    items[i].querySelector('.mui-input-row').classList.remove('checked');
                    items[i].querySelector('input').checked = false;

                    if (items[i].dataset.type === 'ou' && getArrItemIndex(selectedous, items[i].dataset.guid, 'ou') > -1) {
                        items[i].querySelector('.user-single-span').classList.remove('checked');
                        selectedous.splice(getArrItemIndex(selectedous, items[i].dataset.guid, 'ou'), 1);
                        selectedNum -= parseInt(items[i].querySelector('.person-num').innerText.trim(), 0);
                    } else if (items[i].dataset.type === 'user' && getArrItemIndex(selectedusers, items[i].dataset.guid, 'user') > -1) {
                        selectedusers.splice(getArrItemIndex(selectedusers, items[i].dataset.guid, 'user'), 1);
                        selectedNum -= 1;
                    }
                }
            }

            if (selectedNum > 0) {
                if (isouonly !== '1') {
                    myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .selected-num').innerHTML = '(' + selectedNum + '/' + maxchoosecount + ')';
                }
            } else {
                myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .selected-num').classList.add('mui-hidden');
                myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .edit-selected-btn').classList.add('mui-hidden');
            }
        } else {
            // 全选
            for (var _i2 = 0; _i2 < items.length; _i2 += 1) {
                if (!items[_i2].querySelector('.mui-input-row input').disabled) {
                    items[_i2].querySelector('.mui-input-row').classList.add('checked');
                    items[_i2].querySelector('input').checked = true;

                    if (items[_i2].dataset.type === 'ou' && getArrItemIndex(selectedous, items[_i2].dataset.guid, 'ou') === -1) {
                        items[_i2].querySelector('.user-single-span').classList.add('checked');
                        for (var j = 0; j < getFromAjaxOu.length; j += 1) {
                            if (getFromAjaxOu[j].ouguid === items[_i2].dataset.guid) {
                                selectedous.push(getFromAjaxOu[j]);
                            }
                        }
                        selectedNum += parseInt(items[_i2].querySelector('.person-num').innerText.trim(), 0);
                    } else if (items[_i2].dataset.type === 'user' && getArrItemIndex(selectedusers, items[_i2].dataset.guid, 'user') === -1) {
                        for (var _j = 0; _j < getFromAjaxUser.length; _j += 1) {
                            if (getFromAjaxUser[_j].userguid === items[_i2].dataset.guid) {
                                selectedusers.push(getFromAjaxUser[_j]);
                            }
                        }
                        selectedNum += 1;
                    }
                }
            }

            if (isouonly !== '1') {
                myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .selected-num').innerHTML = '(' + selectedNum + '/' + maxchoosecount + ')';
                myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .selected-num').classList.remove('mui-hidden');
            }
            myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .edit-selected-btn').classList.remove('mui-hidden');
        }
    });

    // 点击编辑已选人员
    mui(myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2)).on('click', '.edit-selected-btn', function () {
        // 创建编辑已选人员界面
        createEditPage();
        // 插入历史记录
        insertHistory('编辑已选人员界面', '#' + ACTION_EDIT_UNIQUE_ID);
    });

    // 点击确定按钮返回选择结果
    mui(myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2)).on('click', '.btn-set', function () {
        var result = {};
        var i = 0;

        if (selectedNum > maxchoosecount && isouonly !== '1') {
            ejs.ui.toast('选择人数超出最大限制人数');
            return;
        }

        var handleResultUsers = function handleResultUsers() {
            selectedusers.forEach(function (e) {
                var element = e;
                delete element.ischecked;
                delete element.disabled;
            });

            result = {
                resultCode: -1,
                ouData: selectedous,
                resultData: selectedusers
            };

            if (isouonly === '1' || isSelectRange === '1') {
                window.history.go(-1);
            } else if (myShadowDom.querySelector('#' + ACTION_STRUCTURE_UNIQUE_ID) && myShadowDom.querySelector('#' + ACTION_STRUCTURE_UNIQUE_ID).classList.contains('ejs-poptoleft')) {
                window.history.go(-2);
            } else {
                window.history.go(-1);
            }

            // if (document.getElementsByTagName('body').length > 1) {
            //     for (let k = 0; k < document.getElementsByTagName('body').length; k += 1) {
            //         if (document.getElementsByTagName('body')[k].childNodes.length === 0) {
            //             document.getElementsByTagName('body')[k].parentNode.removeChild(document.getElementsByTagName('body')[k]);
            //         }
            //     }
            // }
            callback && callback(result);
        };

        var handleResult = function handleResult() {
            if (i < selectedous.length) {
                var element = selectedous[i];
                delete element.ischecked;
                delete element.isnext;

                if (isouonly === '0' && isSelectRange === '0') {
                    getUserList(element.ouguid, function () {
                        i += 1;
                        handleResult();
                    });
                } else if (isSelectRange === '1') {
                    getUserFromCustom(element.ouguid, custom);
                    i += 1;
                    handleResult();
                } else {
                    handleResultUsers();
                }
            } else {
                handleResultUsers();
            }
        };

        handleResult();
    });
}

/**
 * 获取个人用户信息
 */
function getUserInfo() {
    ejs.ui.showWaiting();

    Util.ajax({
        url: '' + formalUrl + personalgetdetail,
        data: {
            params: JSON.stringify({
                devicenumber: ''
            })
        },
        headers: {
            Authorization: 'Bearer ' + token
        },
        success: function success(result) {
            ejs.ui.closeWaiting();
            if (result.status.code === 1) {
                var ouname = result.custom.ouname;
                var ouguid = result.custom.ouguid;
                // const ouname = result.custom.baseouname;
                // const ouguid = result.custom.baseouguid;

                createNavTitle(ouname, ouguid);
                getOuListWithUser(ouguid);
            } else {
                ejs.ui.toast(result.custom.text);
            }
        }
    });
}

/**
 * 获取给定userguid的信息
 */
function getUserInfoByGuids() {
    ejs.ui.showWaiting();
    var guids = selectedusers.map(function (element) {
        return element.userguid;
    });

    Util.ajax({
        url: '' + formalUrl + getuserinfolist,
        data: {
            params: JSON.stringify({
                sequenceid: '',
                userguid: guids.join(';')
            })
        },
        headers: {
            Authorization: 'Bearer ' + token
        },
        success: function success(result) {
            ejs.ui.closeWaiting();
            if (result.status.code === 1) {
                selectedusers = result.custom.infolist;
            } else {
                ejs.ui.toast(result.custom.text);
            }
        }
    });
}

/**
 * 计算部门总人数
 * @param {Object} ou 要计算人数的部门
 */
function getUserCount(ou) {
    var n = 0;

    if ('userlist' in ou && ou.userlist.length > 0) {
        n = ou.userlist.length;
    }

    usercount += n;
    if ('oulist' in ou && ou.oulist.length > 0) {
        for (var i = 0; i < ou.oulist.length; i += 1) {
            getUserCount(ou.oulist[i]);
        }
    }
}

/**
 * 给需要的对象各个部门添加usercount参数
 * @param {Object} ou 对象
 */
function countUser(ou) {
    var obj = ou;
    if ('oulist' in obj && obj.oulist.length > 0) {
        for (var i = 0; i < obj.oulist.length; i += 1) {
            usercount = 0;
            getUserCount(obj.oulist[i]);
            obj.oulist[i].usercount = usercount;
            countUser(obj.oulist[i]);
        }
    }
}

/**
 * 用于选择范围对已选部门的人数统计
 * @param {String} guid 需要搜索的guid
 * @param {Object} ou 部门
 */
function searchChecked(guid, ou) {
    if (ou.ouguid === guid) {
        return ou.usercount;
    } else if ('oulist' in ou && ou.oulist.length > 0) {
        var i = 0;
        for (; i < ou.oulist.length; i += 1) {
            var t = searchChecked(guid, ou.oulist[i]);
            if (t !== false) {
                return t;
            }
        }
        if (i >= ou.oulist.length) {
            return false;
        }
    }
    return false;
}

/**
 * 用于选择范围兼容已选人员传参
 */
function setSelectedUsers(nowcustom) {
    if ('userlist' in nowcustom && nowcustom.userlist.length > 0) {
        for (var i = 0; i < selectedusers.length; i += 1) {
            for (var j = 0; j < nowcustom.userlist.length; j += 1) {
                if (nowcustom.userlist[j].userguid === selectedusers[i].userguid) {
                    selectedusers[i] = nowcustom.userlist[j];
                    selectedusers[i].displayname = nowcustom.userlist[j].username;
                }
            }
        }
    }

    if ('oulist' in nowcustom && nowcustom.oulist.length > 0) {
        nowcustom.oulist.forEach(function (element) {
            setSelectedUsers(element);
        });
    }
}

/**
 * 用于选择范围兼容已选部门传参
 */
function setSelectedOus(nowcustom) {
    if ('oulist' in nowcustom && nowcustom.oulist.length > 0) {
        for (var i = 0; i < selectedous.length; i += 1) {
            for (var j = 0; j < nowcustom.oulist.length; j += 1) {
                if (nowcustom.oulist[j].ouguid === selectedous[i].ouguid) {
                    selectedous[i].usercount = nowcustom.oulist[j].usercount;
                    selectedous[i].ouname = nowcustom.oulist[j].ouname;
                }

                if ('oulist' in nowcustom.oulist[j] && nowcustom.oulist[j].oulist.length > 0) {
                    setSelectedOus(nowcustom.oulist[j]);
                }
            }
        }
    }
}

/**
   * 得到一个项目的根路径
   * h5模式下例如:http://id:端口/项目名/
   * @return {String} 项目的根路径
   */
function getProjectBasePath$1() {
    var locObj = window.location;
    var patehName = locObj.pathname;
    var pathArray = patehName.split('/');
    // 如果是 host/xxx.html 则是/，如果是host/project/xxx.html,则是project/
    // pathName一般是 /context.html 或 /xxx/xx/content.html
    var hasProject = pathArray.length > 2;
    var contextPath = pathArray[Number(hasProject)] + '/';

    return contextPath;
}

function selectPerson(params, success) {
    var options = params || {};

    formalUrl = options.url || FORMAL_URL;
    token = options.token;
    maxchoosecount = options.maxchoosecount;
    isouonly = options.isouonly;
    issingle = options.issingle;
    selectedusers = options.selectedusers.slice(0);
    unableselectusers = options.unableselectusers.slice(0);
    selectedous = options.selectedous.slice(0);
    callback = success;
    custom = options.custom;

    getFromAjaxOu = [];
    getFromAjaxUser = [];

    if (Object.prototype.toString.call(custom) === '[object Object]' && ('oulist' in custom || 'userlist' in custom)) {
        // 选择范围参数合法
        isSelectRange = '1';
    } else {
        // 传入的custom不是对象或参数不合法时
        isSelectRange = '0';
    }

    // 获取首界面HTML
    var html = createSelectPersonPage();

    if (!myShadowDom) {
        // 创建影子DOM
        var shadowEL = document.createElement('div');
        shadowEL.classList.add('shadow-host');
        document.body.appendChild(shadowEL);
        var shadow = shadowEL.attachShadow({ mode: 'open' });

        // 引入mui样式
        var basePath = getProjectBasePath$1();
        var linkElem = document.createElement('link');
        var linkElem2 = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', '/' + basePath + 'js/mui/mui.css');
        shadow.appendChild(linkElem);
        linkElem2.setAttribute('rel', 'stylesheet');
        linkElem2.setAttribute('href', '/' + basePath + 'js/mui/mui.extend.css');
        shadow.appendChild(linkElem2);

        // 不重复添加公共样式
        var style = commonClassName$1();
        shadow.appendChild(style);

        var wrapper = document.createElement('div');

        wrapper.id = ACTION_WRAP_UNIQUE_ID$2;
        wrapper.classList.add('ejs-select-wrapper');
        wrapper.classList.add('ejs-transitionH');
        wrapper.innerHTML = html;
        shadow.appendChild(wrapper);
        myShadowDom = shadowEL.shadowRoot;
        // 添加公共事件
        addEventListener();
    } else {
        // 直接更改html
        myShadowDom.getElementById(ACTION_WRAP_UNIQUE_ID$2).innerHTML = html;
    }

    if (Object.prototype.toString.call(custom) === '[object Object]') {
        // 选择范围
        // 添加usercount属性
        countUser(custom);
        // 计算已选人数
        selectedNum = selectedusers.length;
        if (selectedous.length > 0) {
            selectedous.forEach(function (e) {
                var element = e;
                var num = searchChecked(element.ouguid, custom);

                if ('usercount' in element && num === false) {
                    selectedNum += element.usercount;
                } else if (num !== false) {
                    element.usercount = num;
                    selectedNum += num;
                }
            });
        }
        if (selectedNum > 0) {
            if (isouonly === '0') {
                myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .selected-num').innerHTML = '(' + selectedNum + '/' + maxchoosecount + ')';
                myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .selected-num').classList.remove('mui-hidden');
            }
            myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .edit-selected-btn').classList.remove('mui-hidden');
        }

        if (isSelectRange === '1') {
            if ('oulist' in custom && custom.oulist.length > 0) {
                custom.ouguid = custom.oulist[0].parentouguid;
            } else {
                custom.ouguid = 'root';
            }

            if (selectedusers.length > 0) {
                // 兼容不规范已选人员传参
                setSelectedUsers(custom);
                selectedusers.forEach(function (element) {
                    var ele = element;
                    if (!('displayname' in element)) {
                        ele.displayname = '';
                    }
                });
            }

            if (selectedous.length > 0) {
                // 兼容不规范已选部门传参
                setSelectedOus(custom);
                selectedous.forEach(function (element) {
                    var ele = element;
                    if (!('ouname' in element)) {
                        ele.ouname = '';
                    }
                    if (!('usercount' in element)) {
                        ele.usercount = 0;
                    }
                });
            }

            createNavTitle('选择范围', custom.ouguid);
            getDataFromCustom(custom.ouguid, custom);
        } else {
            if (selectedusers.length > 0) {
                // 兼容不规范已选人员传参
                getUserInfoByGuids();
            }
            selectedous = [];
            // 选择范围参数不合法
            createNavTitle('选择范围', '');
            getOuListWithUser('');
        }
    } else if (isouonly === '1') {
        // 只选部门
        selectedusers = [];
        unableselectusers = [];
        if (selectedous.length > 0) {
            myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .edit-selected-btn').classList.remove('mui-hidden');
        }
        // 渲染组织架构
        createNavTitle('组织架构', '');
        getOuListWithUser('');
    } else {
        // 选择人员
        selectedous = [];
        selectedNum = selectedusers.length;

        if (selectedNum > 0) {
            // 兼容不规范已选人员传参
            getUserInfoByGuids();
            myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .selected-num').innerHTML = '(' + selectedNum + '/' + maxchoosecount + ')';
            myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .selected-num').classList.remove('mui-hidden');
            myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .edit-selected-btn').classList.remove('mui-hidden');
        }

        myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .content-body').style.height = 'calc(100% - 56px - 48px)';
        mui(myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' #view-0')).scroll();
        // 选择人员主界面item点击事件
        mui(myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' #view-0 #zzjg')).on('click', 'li', function tapFunc() {
            var title = this.innerText.trim();
            var structureHtml = '';

            structureHtml += '<div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">\n                <div class="mui-scroll structure-bar"></div>\n                </div>';
            structureHtml += '<div class="structure-body"></div>';

            if (!myShadowDom.getElementById(ACTION_STRUCTURE_UNIQUE_ID)) {
                // 不重复添加
                var structureWrapper = document.createElement('div');

                structureWrapper.id = ACTION_STRUCTURE_UNIQUE_ID;
                structureWrapper.classList.add('ejs-structure-wrapper');
                structureWrapper.innerHTML = structureHtml;
                myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .content-body').appendChild(structureWrapper);

                // 初始化横向滚动条
                mui(myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' .content-body .mui-scroll-wrapper')).scroll();
            } else {
                // 直接更改html
                myShadowDom.getElementById(ACTION_STRUCTURE_UNIQUE_ID).innerHTML = structureHtml;
            }

            if (title === '我的部门') {
                getUserInfo();
            } else if (title === '组织架构') {
                createNavTitle('组织架构', '');
                getOuListWithUser('');
            } else if (title === '我的分组') {
                createNavTitle('我的分组', '');
                getGroupList('');
            } else if (title === '公共分组') {
                createNavTitle('公共分组', 'public');
                getGroupList('public');
            }

            // 主界面切换到组织架构子界面
            myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2 + ' #view-0').classList.add('mui-hidden');
            myShadowDom.querySelector('#' + ACTION_STRUCTURE_UNIQUE_ID).classList.add('ejs-poptoleft');

            // 插入历史记录
            insertHistory('组织架构界面', '#' + ACTION_STRUCTURE_UNIQUE_ID);
        });
    }

    // 显示选人界面
    myShadowDom.querySelector('#' + ACTION_WRAP_UNIQUE_ID$2).classList.add('ejs-poptotop');

    // 插入历史记录
    insertHistory('选择人员界面', '#' + ACTION_WRAP_UNIQUE_ID$2);
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
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
                rest[_key] = arguments[_key];
            }

            // 兼容字符串形式
            var args = rest;

            args[0].className = args[0].className;
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
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                rest[_key2] = arguments[_key2];
            }

            var args = rest;
            var options = args[0];
            var resolve = args[1];

            // 比较版本号是否大于3.2.0
            ejs.runtime.getEjsVersion({
                success: function success(result) {
                    var appVersion = result.version;
                    if (compareVersion('3.2.0', appVersion) > 0) {
                        selectPerson(options, function (res) {
                            options.success && options.success(res);
                            resolve && resolve(res);
                        });
                    } else {
                        ejs.util.invokePluginApi({
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
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
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
        support: '3.5.0',
        defaultParams: {
            // url地址
            url: '',
            // 响应时间(毫秒)
            responsetime: '',
            // 请求内容（请求出错才有）
            request: '',
            // 响应内容（请求出错才有）
            response: '',
            belong: '',
            // 成功或者失败标示，'0'失败，'1'成功
            successorfail: ''
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
            // 需要传递给小程序的额外参数
            extraData: {}
        },
        runCode: function runCode() {
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
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
            console.log(args);

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
            resultData: ''
        },
        runCode: function runCode() {
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                rest[_key2] = arguments[_key2];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'extraData');

            if (innerUtil.isObject(args[0].resultData)) {
                args[0].resultData = JSON.stringify(args[0].resultData);
            }

            ejs.page.close(args[0]);
        }
    }, {
        namespace: 'onNavigateBack',
        os: ['ejs'],
        support: '3.4.1',
        runCode: function runCode() {
            this.api.isLongCb = true;

            for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
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
            for (var _len4 = arguments.length, rest = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
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
            for (var _len5 = arguments.length, rest = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                rest[_key5] = arguments[_key5];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'frontColor', 'backgroundColor');

            hybridJs.callInner.apply(this, args);
        }
    }, {
        namespace: 'close',
        os: ['ejs']
    }]);
}

var hybridJs = window.ejs;

uiMixin(hybridJs);
authMixin(hybridJs);
runtimeMixin(hybridJs);
deviceMixin(hybridJs);
eventMixin(hybridJs);
storageMixin(hybridJs);
cardMixin(hybridJs);
pageMixin(hybridJs);
navigatorMixin(hybridJs);
utilMixin(hybridJs);
streamMixin(hybridJs);
contactMixin(hybridJs);
audioMixin(hybridJs);
ioMixin(hybridJs);
miniH5Mixin(hybridJs);

})));
