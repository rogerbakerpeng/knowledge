const parseHtml = (strHtml) => {
    if (!strHtml || typeof strHtml !== 'string') {
        return null;
    }
    // 创一个灵活的div
    const a = document.createElement('div');
    const b = document.createDocumentFragment();

    a.innerHTML = strHtml;

    const i = a.firstChild;

    b.appendChild(i);

    return b;
};
let choposeOnce = 0;
const commonClassName = (cb) => {
    if (choposeOnce === 0) {
        choposeOnce = 1;
        document.querySelector('html').insertAdjacentHTML(
            'beforeend',
            `
        <style>
        body {
            overflow: hidden;
        }
        .ejs-contact-content {
        position: absolute;
        width: 100%;
        top: 0;
        bottom: 0;
        height: 100%;
        z-index: 99;
        background: #fff;
        overflow: hidden;
    }
    .ejs-choose-ul:after {
        display:none
    }
    .ejs-choose-ul {
        margin-top: 10px;
        overflow: scroll;
        height: 100%;
        padding-bottom: 44px;
    }
    .ejs-choose-ul .ejs-choose-li label {
        padding: 11px 0;
    }
    .ejs-choose-ul .ejs-choose-li {
        padding: 0 15px;
    }
    .ejs-contact-bottom {
        position: absolute;
        bottom: 0;
        height: 44px;
        border-top: 1px solid #eee;
        width: 100%;
        background: #fff;
    }
    .ejs-contact-bottom  button {
        float: right;
        margin-right: 10px;
        margin-top: 5px;
        background-color: #3c80e6;
        color:#fff;
        width: 90px;
        border-radius: 5px;
    }
    .ejs-hidden {
        overflow: hidden;
        height: 100vh;
    }


    .ejs-choose-li {
        position: relative;
        overflow: hidden;
        padding: 11px 15px;
        -webkit-touch-callout: none;
    }

    .ejs-choose-li:after {
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

    .ejs-choose-li.mui-radio input[type=radio],
    .ejs-choose-li.mui-checkbox input[type=checkbox] {
        top: 8px;
    }

    .ejs-choose-li.mui-radio.mui-left,
    .ejs-choose-li.mui-checkbox.mui-left {
        padding-left: 58px;
    }

    .ejs-choose-li.mui-active {
        background-color: #eee;
    }

    .ejs-choose-li:last-child:before,
    .ejs-choose-li:last-child:after {
        height: 0;
    }

    .ejs-choose-li>a:not(.mui-btn) {
        position: relative;
        display: block;
        overflow: hidden;
        margin: -11px -15px;
        padding: inherit;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: inherit;
        /*&:active {
        background-color: #eee;
    }*/
    }

    .ejs-choose-li>a:not(.mui-btn).mui-active {
        background-color: #eee;
    }

    .ejs-choose-li p {
        margin-bottom: 0;
    }

    .ejs-choose-li.mui-transitioning>.mui-slider-handle,
    .ejs-choose-li.mui-transitioning>.mui-slider-left .mui-btn,
    .ejs-choose-li.mui-transitioning>.mui-slider-right .mui-btn {
        -webkit-transition: -webkit-transform 300ms ease;
        transition: transform 300ms ease;
    }

    .ejs-choose-li.mui-active>.mui-slider-handle {
        background-color: #eee;
    }

    .ejs-choose-li>.mui-slider-handle {
        position: relative;
        background-color: #fff;
    }

    .ejs-choose-li>.mui-slider-handle.mui-navigate-right:after,
    .ejs-choose-li>.mui-slider-handle .mui-navigate-right:after {
        right: 0;
    }

    .ejs-choose-li>.mui-slider-handle,
    .ejs-choose-li>.mui-slider-left .mui-btn,
    .ejs-choose-li>.mui-slider-right .mui-btn {
        -webkit-transition: -webkit-transform 0ms ease;
        transition: transform 0ms ease;
    }

    .ejs-choose-li>.mui-slider-left,
    .ejs-choose-li>.mui-slider-right {
        position: absolute;
        top: 0;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        height: 100%;
    }

    .ejs-choose-li>.mui-slider-left>.mui-btn,
    .ejs-choose-li>.mui-slider-right>.mui-btn {
        position: relative;
        left: 0;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        padding: 0 30px;
        color: #fff;
        border: 0;
        border-radius: 0;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
    }

    .ejs-choose-li>.mui-slider-left>.mui-btn:after,
    .ejs-choose-li>.mui-slider-right>.mui-btn:after {
        position: absolute;
        z-index: -1;
        top: 0;
        width: 600%;
        height: 100%;
        content: '';
        background: inherit;
    }

    .ejs-choose-li>.mui-slider-left>.mui-btn.mui-icon,
    .ejs-choose-li>.mui-slider-right>.mui-btn.mui-icon {
        font-size: 30px;
    }

    .ejs-choose-li>.mui-slider-right {
        right: 0;
        -webkit-transition: -webkit-transform 0ms ease;
        transition: transform 0ms ease;
        -webkit-transform: translateX(100%);
        transform: translateX(100%);
    }

    .ejs-choose-li>.mui-slider-left {
        left: 0;
        -webkit-transition: -webkit-transform 0ms ease;
        transition: transform 0ms ease;
        -webkit-transform: translateX(-100%);
        transform: translateX(-100%);
    }

    .ejs-choose-li>.mui-slider-left>.mui-btn:after {
        right: 100%;
        margin-right: -1px;
    }
    .ejs-choose-li>.mui-btn,
    .ejs-choose-li>.mui-badge,
    .ejs-choose-li>.mui-switch,
    .ejs-choose-li>a>.mui-btn,
    .ejs-choose-li>a>.mui-badge,
    .ejs-choose-li>a>.mui-switch {
        position: absolute;
        top: 50%;
        right: 15px;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
    }
    .ejs-f9-content .ejs-choose-ul .mui-badge {
        font-size: 12px;
        line-height: 1;
        display: inline-block;
        padding: 3px 6px;
        border-radius: 100px;
        width:auto;
    }
        </style>`
        );

        cb && cb();
    } else {
        cb && cb();
    }
};
const contactDom = (cb) => {
    commonClassName(() => {
        const f9Div = document.querySelector('.ejs-f9-content');

        if (!f9Div) {
            console.error('缺少ejs-f9-content样式，请在需要调试ejs的页面body加入class="ejs-f9-content"');

            return;
        }
        const divNav = `<div class="ejs-contact-content">
        <ul class="mui-table-view">
            <li class="mui-table-view-cell">组织架构</li>
        </ul>

        <ul class="mui-table-view ejs-choose-ul"></ul>
        <div class="ejs-contact-bottom">
            <button>确定</button>
        </div>
    </div>`;

        f9Div.insertBefore(parseHtml(divNav), f9Div.childNodes[0]);
        cb && cb();
    });
};
let resultUser = [];
const viewli = (arr, selectedusers) => {
    const chooseUl = document.querySelector('.ejs-choose-ul');
    let contactLi = '';

    chooseUl.innerHTML = '';
    arr.forEach((e) => {
        // 渲染部门
        if (e.iconCls === 'mini-tree-folder') {
            contactLi += `<li class="ejs-choose-li mui-input-row  mui-checkbox  mui-left"
            fullPath="${e.fullPath}"
            textCls="${e.textCls}"
            pid="${e.pid}"
            ckr="${e.ckr}"
            isLeaf="${e.isLeaf}"
            tableName="${e.tableName}"
            objectcode="${e.objectcode}"
            path="${e.path}"
            expanded="${e.expanded}"
            isSubNode="${e.isSubNode}"
            titleExtra="${e.titleExtra}"
            checked="${e.checked}"
            ouguid="${e.id}"
            text="${e.text}"
            >
                <label class="ejs-chontact-label">${e.text}</label>
                <input class="mui-hidden" name="checkbox1" value="Item 1" type="checkbox" ${
    e.checked === true ? 'checked' : ''
}>
                <span class="mui-badge mui-badge-primary">部门</span>
            </li>`;
        } else {
            selectedusers &&
                selectedusers.forEach((item) => {
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
            contactLi += `<li class="ejs-choose-li mui-input-row mui-checkbox  mui-left"
            loginid="${e.loginid}"
            sequenceid="${e.sequenceid}"
            photourl="${e.photourl}"
            displayname="${e.text}"
            username="${e.text}"
            title="${e.title}"
            baseouname="${e.baseouname}"
            ccworksequenceid="${e.ccworksequenceid}"
            userguid="${e.id}"
            ordernumber="${e.ordernumber}"
            >
                <label class="ejs-chontact-label" for=${e.id}>${e.text}</label>
                <input name="checkbox1" value="Item 1" type="checkbox" ${e.checked === true ? 'checked' : ''}>
                <span class="mui-badge">人员</span>
            </li>`;
        }
    });
    chooseUl.insertAdjacentHTML('afterbegin', contactLi);
};
const listenBack = () => {
    const state = {
        title: '选人',
        url: '#choose' // 这个url可以随便填，只是为了不让浏览器显示的url地址发生变化，对页面其实无影响
    };

    window.history.pushState(state, state.title, state.url);
    window.addEventListener(
        'popstate',
        () => {
            document.querySelector('.mui-content').classList.remove('ejs-hidden');
            document.querySelector('.ejs-contact-content') && document.querySelector('.ejs-contact-content').remove();
        },
        false
    );
};

const formdataRoot = new FormData();

export default function (opt, cb) {
    if (opt.path === 'workplatform.provider.openNewPage' && opt.dataMap.method === 'goSelectPerson') {
        contactDom(() => {
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
                formdataRoot.append(
                    'commonDto',
                    JSON.stringify([
                        {
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
                        }
                    ])
                );
                Util.ajax({
                    url: epm.getRightUrl(epm.dealUrl(opt.f9action, true)), // opt.f9action,
                    type: 'post',
                    // dataType: 'json',
                    data: formdataRoot,
                    processData: false,
                    contentType: false,
                    success(data) {
                        viewli(data.controls[0].data, opt.dataMap.selectedusers);
                    },
                    complete() {
                        /* if (!opts.notShowLoading) {
                            epm.hideMask();
                        } */
                    }
                });
            }
            mui('.ejs-contact-content').on('click', '.ejs-choose-li input', (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
            mui('.ejs-contact-content').off('click', '.ejs-choose-li');
            // eslint-disable-next-line func-names
            mui('.ejs-contact-content').on('click', '.ejs-choose-li', function (this:any) {
                const liNode = this;
                const ouguid = liNode.getAttribute('ouguid');
                // 如果点击是部门，渲染展开数组
                const formdata = new FormData();

                if (ouguid) {
                    const nodeData = {
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
                        const params = epm.get(opt.f9controlid).getModule();

                        params.node = nodeData;
                        params.isSecondRequest = true;
                        params.checkRecursive = true;
                        formdata.set('commonDto', JSON.stringify([params]));
                    } else {
                        formdata.set(
                            'commonDto',
                            JSON.stringify([
                                {
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
                                }
                            ])
                        );
                    }
                    Util.ajax({
                        url: epm.getRightUrl(epm.dealUrl(opt.f9action, true)), // opt.f9action,
                        type: 'post',
                        // dataType: 'json',
                        data: formdata,
                        processData: false,
                        contentType: false,
                        success(data) {
                            viewli(data.controls[0].data, opt.dataMap.selectedusers);
                        },
                        complete() {
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
                        resultUser = resultUser.filter((e) => e.userguid !== liNode.getAttribute('userguid'));
                    }

                    this.querySelector('input').checked = !this.querySelector('input').checked;
                }
            });
            mui('.ejs-contact-bottom').off('click', 'button');
            mui('.ejs-contact-bottom').on('click', 'button', () => {
                history.go(-1);

                cb &&
                    cb({
                        resultData: resultUser,
                        grouipData: [],
                        talkData: []
                    });
            });
        });
    }
}
