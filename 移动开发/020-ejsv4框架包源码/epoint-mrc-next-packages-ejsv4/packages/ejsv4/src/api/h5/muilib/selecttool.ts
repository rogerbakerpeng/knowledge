const CLASS_POPUP_BACKDROP = 'mui-popup-backdrop';
const CLASS_ACTIVE = 'mui-active';
const ACTION_WRAP_UNIQUE_ID = 'defaultSelectWrapContent';
let once = 0;
const commonClassName = () => {
    if (once === 0) {
        once = 1;
        document.querySelector('html').insertAdjacentHTML(
            'beforeend',
            `
        <style>
        .ejs-select-div {
            z-index: 10000;
            position: fixed;
            background-color: #fff;
            width: 90%;
            left: 50%;
            top: 50%;
            border-radius: 10px;
            transform: translate(-50% , -50%);
            -webkit-transform: translate(-50% , -50%);
            max-height: 80vh;
            overflow: hidden;
        }
        .ejs-select-title {
            text-align: center;
            height: 43px;
            line-height: 43px;
        }
        .ejs-select-div .mui-table-view,.ejs-select-ul {
            overflow: scroll;
            position: relative;
            max-height: calc(80vh - 88px);
        }

        .mui-popup-buttons {
            bottom: 0;
            width: 100%;
            background: #fff;
        }
        .mui-popup-buttons + .ejs-select-ul {
            padding-bottom: 44px;
        }
        .ejs-select-div .mui-input-row:after {
            position: absolute;
            right: 0;
            bottom: 0;
            left: 15px;
            height: 1px;
            content: '';
            -webkit-transform: scaleY(.5);
            transform: scaleY(.5);
            background-color: #c8c7cc;
        }
        .ejs-select-div .mui-input-row:last-child:after {
            height: 0;
        }


        .ejs-select-sp-li{
            width: 32.5%;
            display: inline-block;
            text-align: center;
            padding: 10px 0;
        }
        .ejs-select-sp-li:active {
            color: #fff;
            background-color: #929292;
        }
        </style>`
        );
    }
};

const backdrop = (() => {
    const element = document.createElement('div');

    element.classList.add(CLASS_POPUP_BACKDROP);
    element.addEventListener('webkitTransitionEnd', () => {
        if (!element.classList.contains(CLASS_ACTIVE)) {
            element.parentNode && element.parentNode.removeChild(element);
        }
    });

    return element;
})();
const removeBackDrop = () => {
    const selectDom = document.getElementById(ACTION_WRAP_UNIQUE_ID);

    selectDom && selectDom.remove();
    backdrop.classList.remove(CLASS_ACTIVE);
};

const isCancelable = (options) => {
    document.getElementsByClassName(CLASS_POPUP_BACKDROP)[0].removeEventListener('tap', removeBackDrop);
    if (options.cancelable && options.cancelable === 1) {
        document.getElementsByClassName(CLASS_POPUP_BACKDROP)[0].addEventListener('tap', removeBackDrop);
    }
};

function selectH5(params) {
    commonClassName();
    const options = params || {};

    isCancelable(params);
    let finalHtml = '';

    finalHtml += '<div class="ejs-select-div">';
    // 加上title
    if (options.title) {
        finalHtml += `<div class="ejs-select-title">${options.title}</div>`;
    }
    finalHtml += '<ul class="mui-table-view">';
    // 添加内容
    if (options.items && Array.isArray(options.items)) {
        for (let i = 0; i < options.items.length; i += 1) {
            const title = options.items[i] || '';

            finalHtml += `<li class="mui-table-view-cell" which=${i}>`;
            finalHtml += `${title}`;
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
export function selectSingle(opt, success) {
    // 显示遮罩
    if (!backdrop.classList.contains(CLASS_ACTIVE)) {
        backdrop.style.display = 'block';
        document.body.appendChild(backdrop);
        backdrop.classList.add(CLASS_ACTIVE);
    }

    const html = selectH5(opt);

    if (!document.getElementById(ACTION_WRAP_UNIQUE_ID)) {
        // 不重复添加
        const wrapper = document.createElement('div');

        wrapper.id = ACTION_WRAP_UNIQUE_ID;
        wrapper.innerHTML = html;
        document.body.appendChild(wrapper);
    } else {
        // 直接更改html
        document.getElementById(ACTION_WRAP_UNIQUE_ID).innerHTML = html;
    }
    const actionSheetDom = document.getElementById(ACTION_WRAP_UNIQUE_ID);

    // 每次都需要监听，否则引用对象会出错，注意每次都生成新生成出来的dom，免得重复
    mui(actionSheetDom).off();
    mui(actionSheetDom).on('tap', '.mui-table-view > li', function tapFunc(this: any) {
        const title = this.innerText;
        const index = parseInt(this.getAttribute('which'), 10);

        document.getElementById(ACTION_WRAP_UNIQUE_ID).remove();
        backdrop.classList.remove(CLASS_ACTIVE);
        // console.log('class:' + mClass);
        // console.log('点击,title:' + title + ',value:' + value);
        // 排除取消按钮,回调函数
        success &&
            success({
                which: index,
                content: title
            });
    });
}
function errorFun(error, msge) {
    error &&
        error({
            code: 0,
            msg: msge,
            result: {}
        });
}
function selectMultiH5(params) {
    commonClassName();
    const options = params || {};

    isCancelable(params);
    let finalHtml = '';

    finalHtml += '<div class="ejs-select-div">';
    // 加上title
    if (options.title) {
        finalHtml += `<div class="ejs-select-title">${options.title}</div>`;
    }
    finalHtml += '<div class="ejs-select-ul">';
    // 添加内容
    if (options.items && Array.isArray(options.items)) {
        for (let i = 0; i < options.items.length; i += 1) {
            const title = options.items[i] || '';
            const ischecked =
                (options.choiceState && Array.isArray(options.choiceState) && options.choiceState[i]) === '1'
                    ? 'checked'
                    : '';

            finalHtml += `<div class="mui-input-row mui-checkbox" which=${i}>`;
            finalHtml += `<label for="ejs-select-multi-${i}">${title}</label>`;
            finalHtml += `<input name="checkbox1" value="Item 1" type="checkbox" id="ejs-select-multi-${i}" ${ischecked}>`;
            finalHtml += '</div>';
        }
    }
    finalHtml += '</div>';

    finalHtml +=
        '<div class="mui-popup-buttons"><span class="mui-popup-button ">取消</span><span class="mui-popup-button mui-popup-button-bold">确定</span></div>';
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
export function selectMulti(opt, success, error) {
    if (opt.items.length !== opt.choiceState.length) {
        errorFun(error, '请求参数错误');

        return;
    }
    // 显示遮罩
    if (!backdrop.classList.contains(CLASS_ACTIVE)) {
        backdrop.style.display = 'block';
        document.body.appendChild(backdrop);
        backdrop.classList.add(CLASS_ACTIVE);
    }
    const html = selectMultiH5(opt);

    if (!document.getElementById(ACTION_WRAP_UNIQUE_ID)) {
        // 不重复添加
        const wrapper = document.createElement('div');

        wrapper.id = ACTION_WRAP_UNIQUE_ID;
        wrapper.innerHTML = html;
        document.body.appendChild(wrapper);
    } else {
        // 直接更改html
        document.getElementById(ACTION_WRAP_UNIQUE_ID).innerHTML = html;
    }
    const actionSheetDom = document.getElementById(ACTION_WRAP_UNIQUE_ID);

    mui(actionSheetDom).off();
    mui(actionSheetDom).on('tap', '.mui-popup-buttons > .mui-popup-button', function tapFunc(this: any) {
        const title = this.innerText;

        if (title === '取消') {
            document.getElementById(ACTION_WRAP_UNIQUE_ID).remove();
            backdrop.classList.remove(CLASS_ACTIVE);
        } else if (title === '确定') {
            const content = [];
            const state = [];
            const inputDom = document.querySelectorAll('.ejs-select-div .mui-input-row');

            [].forEach.call(inputDom, (e: Element) => {
                if (e.querySelector('input').checked) {
                    content.push(e.querySelector('label').innerText);
                    state.push('1');
                } else {
                    state.push('0');
                }
            });

            document.getElementById(ACTION_WRAP_UNIQUE_ID).remove();
            backdrop.classList.remove(CLASS_ACTIVE);
            success &&
                success({
                    choiceContent: content,
                    choiceState: state
                });
        }
    });
}
function selectSpH5(params) {
    commonClassName();
    const options = params || {};

    isCancelable(params);
    let finalHtml = '';

    finalHtml += '<div class="ejs-select-div">';
    // 加上title
    if (options.title) {
        finalHtml += `<div class="ejs-select-title">${options.title}</div>`;
    }
    finalHtml += '<div class="ejs-select-ul">';
    // 添加内容
    if (options.items && Array.isArray(options.items)) {
        for (let i = 0; i < options.items.length; i += 1) {
            const title = options.items[i] || '';

            finalHtml += `<li class="ejs-select-sp-li"  which=${i}>`;
            finalHtml += `${title}`;
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
export function selectSingleSP(opt, success) {
    // 显示遮罩
    if (!backdrop.classList.contains(CLASS_ACTIVE)) {
        backdrop.style.display = 'block';
        document.body.appendChild(backdrop);
        backdrop.classList.add(CLASS_ACTIVE);
    }
    const html = selectSpH5(opt);

    if (!document.getElementById(ACTION_WRAP_UNIQUE_ID)) {
        // 不重复添加
        const wrapper = document.createElement('div');

        wrapper.id = ACTION_WRAP_UNIQUE_ID;
        wrapper.innerHTML = html;
        document.body.appendChild(wrapper);
    } else {
        // 直接更改html
        document.getElementById(ACTION_WRAP_UNIQUE_ID).innerHTML = html;
    }
    const actionSheetDom = document.getElementById(ACTION_WRAP_UNIQUE_ID);

    // 每次都需要监听，否则引用对象会出错，注意每次都生成新生成出来的dom，免得重复
    mui(actionSheetDom).off();
    mui(actionSheetDom).on('tap', '.ejs-select-ul > li', function tapFunc(this: any) {
        const title = this.innerText;
        const index = parseInt(this.getAttribute('which'), 10);

        document.getElementById(ACTION_WRAP_UNIQUE_ID).remove();
        backdrop.classList.remove(CLASS_ACTIVE);
        // console.log('class:' + mClass);
        // console.log('点击,title:' + title + ',value:' + value);
        // 排除取消按钮,回调函数
        success &&
            success({
                which: index,
                content: title
            });
    });
}
