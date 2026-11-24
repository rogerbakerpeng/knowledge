/**
 * 选择人员界面
 * 依赖mui.css
 */

(function (exports, doc, win) {
    var ACTION_WRAP_UNIQUE_ID = 'defaultSelectPersonWrapContent';
    var ACTION_STRUCTURE_UNIQUE_ID = 'defaultStructureContent';
    var ACTION_EDIT_UNIQUE_ID = 'defaultEditContent';
    var ACTION_SEARCH_UNIQUE_ID = 'defaultSearchContent';
    var FORMAL_URL = 'http://218.4.136.126:1443/oa9_v7/rest/oa9/'; // 获取部门及人员列表接口

    var getoulistwithuser = 'address_getoulistwithuser_v7'; // 搜索人员接口

    var searchuserbycondition = 'address_searchuserbycondition_v7'; // 获取部门下所有人员列表

    var getalluserlist = 'address_getalluserlist_v7'; // 获取个人用户信息

    var personalgetdetail = 'getuserinfo_guid_v7'; // 通过guids获取用户信息

    var getuserinfolist = 'address_getuserinfolist_v7'; // 获取分组列表

    var getgrouplist = 'frame_myaddressgrouplist_v7'; // 获取分组下直属子用户列表

    var getaddressbooklist = 'frame_myaddressbooklist_v7'; // 传入参数

    var hybridJs = null;
    var formalUrl = ''; // 头像地址

    var photoUrl = FORMAL_URL.match(/(\S*)rest/)[1];
    var maxchoosecount = 500;
    var isouonly = '0';
    var issingle = '0';
    var selectedusers = [];
    var unableselectusers = [];
    var selectedous = [];
    var custom = {};
    var token = '';
    var callback = null;
    var searchOuUrl = '';
    var bizRootPath = '';
    var searchonce = 0;
    var timer = null;
    var isSelectRange = '0';
    var alwaysUseNetData = false;
    var selectedNum = 0;
    var getFromAjaxOu = [];
    var getFromAjaxUser = [];
    var getFromSearchUser = [];
    var getFromSearchOu = []; // 选择范围时用于计算部门人数

    var usercount = 0;
    var renderStructure;
    var renderSearchContent;
    var myShadowDom = null;
    var $t = null; // 用于外部页面拦截返回时调用的函数，以此来正常使用选人的功能

    window.goback = function (callback) {
        callback && callback();
    }; // 公共样式

    var commonClassName = function commonClassName() {
        var style = document.createElement('style');
        style.textContent =
            '\n        div,\n        ul{\n          scrollbar-width: none;\n          -ms-overflow-style: none;\n        }\n        ::-webkit-scrollbar {\n          display: none;\n        }\n        .mui-scroll{\n            overflow: scroll;\n        }\n        .ejs-select-wrapper .mui-table-view-cell:after{\n          right: 15px;\n        }\n        .ejs-select-wrapper .mui-scroll-wrapper,\n        .ejs-edit-wrapper .mui-scroll-wrapper{\n            width: 100%;\n            overflow: scroll;\n            touch-action: none;\n        }\n        .ejs-select-wrapper{\n            z-index: 10000;\n            position: fixed;\n            bottom: 0;\n            bottom: constant(safe-area-inset-bottom);\n            bottom: env(safe-area-inset-bottom);\n            left: 0;\n            background-color: #f9f9f9;\n            width: 100vw;\n            height: 0;\n            overflow: hidden;\n        }\n        .ejs-select-wrapper header {\n            padding: 0 10px;\n            text-align: center;\n            height: 48px;\n            line-height: 46px;\n            background-color: #fff;\n            border-bottom: 1px solid #d9d9d9;\n        }\n        .ejs-select-wrapper header .mui-input-search{\n            position: relative;\n            height: 46px;\n            vertical-align: middle;\n        }\n        .ejs-select-wrapper header .mui-input-search.focus{\n            display: inline-block;\n            width: 81%;\n        }\n        .ejs-select-wrapper header .mui-input-search.focus input{\n            text-align: left;\n        }\n        .ejs-select-wrapper header .mui-input-search input{\n            margin-bottom: 0;\n            padding: 10px 28px;\n            height: 31px;\n        }\n        .ejs-select-wrapper header .mui-icon-search{\n            position: absolute;\n            left: 2px;\n            top: 11px;\n        }\n        .ejs-select-wrapper header .cancel-btn{\n            color: #3C80E6;\n        }\n        .ejs-select-wrapper .content-body{\n            position: relative;\n            height: calc(100% - 56px);\n        }\n        .ejs-select-wrapper .content-body #view-0.mui-scroll-wrapper{\n            height: 100%;\n        }\n        .ejs-select-wrapper .mui-scroll.structure-bar{\n            width: calc(100% - 20px);\n            text-align: left;\n        }\n        .ejs-select-wrapper .select-tip,\n        .ejs-edit-wrapper .selected-tip {\n            padding-left: 10px;\n            width: 100%;\n            height: 43px;\n            line-height: 43px;\n            color: #999;\n            font-size: 14px;\n            background-color: #f9f9f9;\n        }\n        .ejs-select-wrapper .bottom-bar{\n            position: absolute;\n            left: 0;\n            bottom: 0;\n            padding-right: 10px;\n            padding-bottom: 15px;\n            width: 100%;\n            font-size: 16px;\n            text-align: center;\n            background-color: #fff;\n            border-top: 1px solid #d9d9d9;\n        }\n        .ejs-select-wrapper .bottom-bar #selectall{\n            line-height: 46px;\n        }\n        .ejs-select-wrapper .bottom-bar .mui-input-row input{\n            top: 10px;\n            left: 10px;\n        }\n        .ejs-select-wrapper .bottom-bar .btn-set{\n            margin-top: 8px;\n            padding: 0 3.2vw;\n            height: 30px;\n            font-size: 3.73vw;\n        }\n        .ejs-select-wrapper .bottom-bar .edit-selected-btn{\n            height: 100%;\n            line-height: 45px;\n            font-size: 4.26vw;\n        }\n        .ejs-select-wrapper [data-type="ou"]{\n            line-height: 23px;\n        }\n        .ejs-select-wrapper [data-type="ou"] .mui-input-row{\n            display: inline-block;\n            width: 28px;\n            height: 26px;\n            vertical-align: middle;\n        }\n        .ejs-select-wrapper [data-type="ou"] .mui-input-row label,\n        .ejs-select-wrapper [data-type="ou"] .user-single-span{\n            display: inline-block;\n            width: 55%;\n        }\n        .ejs-select-wrapper [data-type="ou"] .user-single-span{\n            vertical-align: middle;\n        }\n        .ejs-select-wrapper [data-type="ou"] .mui-input-row.checked label,\n        .ejs-select-wrapper [data-type="ou"] span.checked{\n            color: #999;\n        }\n        .ejs-select-wrapper [data-type="user"] .mui-input-row{\n            width: 100%;\n            height: 100%;\n        }\n        .ejs-select-wrapper .content-body .mui-input-row input,\n        .ejs-search-wrapper .mui-input-row.mui-left input{\n            top: 0;\n            right: 0;\n            left: 0;\n        }\n        .ejs-select-wrapper .mui-input-row input:before{\n            font-size: 24px;\n        }\n        .ejs-select-wrapper .mui-input-row.mui-left label{\n            padding: 3px 0;\n            padding-left: 38px;\n        }\n        .ejs-select-wrapper .user-photo,\n        .ejs-edit-wrapper .user-photo,\n        .ejs-select-wrapper .imgerror-backup,\n        .ejs-edit-wrapper .imgerror-backup{\n            width: 50px;\n            height: 50px;\n            border-radius: 50%;\n            vertical-align: middle;\n        }\n        .ejs-select-wrapper .imgerror-backup,\n        .ejs-edit-wrapper .imgerror-backup{\n            display: inline-block;\n            text-align: center;\n            color: #fff;\n            line-height: 50px;\n            background-color: #3C80E6;\n        }\n        .ejs-select-wrapper .user-info-txt,\n        .ejs-edit-wrapper .user-info-txt{\n            display: inline-block;\n            color: #000;\n            font-size: 16px;\n            vertical-align: middle;\n        }\n        .ejs-select-wrapper .user-info-txt{\n            width: 78%;\n        }\n        .ejs-edit-wrapper .user-info-txt{\n            width: 172px;\n            margin-left: 5px;\n        }\n        .ejs-select-wrapper .user-name,\n        .ejs-edit-wrapper .user-name{\n            line-height: 28px;\n        }\n        .ejs-select-wrapper .user-title{\n            color: #999;\n            font-size: 14px;\n            line-height: 26px;\n        }\n        .ejs-select-wrapper [data-type="user"] .mui-input-row input{\n            top: calc(50% - 13px);\n        }\n        .ejs-select-wrapper .mui-icon-arrowright{\n            font-size: 20px;\n            color: #bbb;\n            line-height: 23px;\n        }\n        .ejs-select-wrapper .empty-tip{\n            margin-top: 45%;\n            width: 100%;\n            font-size: 18px;\n            color: #8D939D;\n            text-align: center;\n        }\n        .ejs-structure-wrapper{\n            position: absolute;\n            right: 0;\n            top: 0;\n            width: 0;\n            height: 100%;\n        }\n        .ejs-structure-wrapper.width-100{\n            width: 100vw;\n        }\n        .ejs-structure-wrapper .mui-scroll-wrapper.mui-slider-indicator{\n            top: 0;\n            left: 0;\n            margin-bottom: 10px;\n            padding: 0 10px;\n            height: 38px;\n            line-height: 38px;\n            background-color: #fff;\n            border-bottom: 1px solid #d9d9d9;\n        }\n        .ejs-structure-wrapper .nav-title{\n            color: #000;\n        }\n        .ejs-structure-wrapper .nav-title span{\n            display: none;\n        }\n        .ejs-structure-wrapper .nav-title.active,\n        .ejs-structure-wrapper .nav-title.active .mui-icon-arrowright{\n            color: #3C80E6;\n        }\n        .ejs-structure-wrapper .nav-title.active span{\n            display: inline;\n            border: none;\n        }\n        .ejs-structure-wrapper .structure-body{\n            position: relative;\n            height: calc(100% - 48px);\n            border-top: 1px solid #d9d9d9;\n        }\n        .ejs-structure-wrapper .structure-body .mui-scroll-wrapper{\n            top: 0;\n            left: 0;\n            height: 100%;\n        }\n        .ejs-structure-wrapper .person-num,\n        .ejs-edit-wrapper .person-num{\n            color: #007aff;\n        }\n        .ejs-poptotop{\n            height: 100% !important;\n            height: calc(100% - constant(safe-area-inset-bottom)) !important;\n            height: calc(100% - env(safe-area-inset-bottom)) !important;\n        }\n        .ejs-poptoleft{\n            width: 100vw !important;\n        }';
        return style;
    }; // 编辑人员界面样式

    var editClassName = function editClassName() {
        myShadowDom.querySelector('style').innerHTML +=
            '\n        .ejs-edit-wrapper{\n            z-index: 10000;\n            position: fixed;\n            top: 0;\n            right: 0;\n            bottom: 0;\n            bottom: constant(safe-area-inset-bottom);\n            bottom: env(safe-area-inset-bottom);\n            background-color: #f9f9f9;\n            width: 0;\n            overflow: hidden;\n        }\n        .ejs-edit-wrapper .mui-scroll-wrapper{\n            height: calc(100% - 54px);\n        }\n        .ejs-edit-wrapper .person-num{\n            position: absolute;\n            right: 39px;\n            top: calc(50% - 11px);\n        }\n        .ejs-edit-wrapper .mui-table-view-cell label{\n            display: inline-block;\n            width: 208px;\n        }\n        .ejs-edit-wrapper .mui-icon{\n            color: #999;\n            line-height: 100%;\n        }\n        .ejs-edit-wrapper .mui-icon.mui-icon-bars{\n            margin-right: 5px;\n            position: relative;\n            top: 3px;\n        }\n        .ejs-edit-wrapper .mui-icon.mui-icon-trash{\n            position: absolute;\n            top: calc(50% - 12px);\n            right: 15px;\n        }\n        .ejs-edit-wrapper .opacity0{\n            opacity: 0;\n        }\n        .ejs-edit-wrapper .bg-color#000{\n            background-color: rgba(0, 0, 0, .5);\n        }\n        .ejs-edit-wrapper .bottom-bar{\n            position: absolute;\n            bottom: 0;\n            left: 0;\n            padding: 10px;\n            padding-bottom: 15px;\n            width: 100%;\n            background-color: #fff;\n            border-top: 1px solid #d9d9d9;\n            z-index: 1;\n        }\n        ';
    }; // 搜索界面样式

    var searchClassName = function searchClassName() {
        if (searchonce === 0) {
            searchonce = 1;
            myShadowDom.querySelector('style').innerHTML += '\n        #'
                .concat(
                    ACTION_SEARCH_UNIQUE_ID,
                    ' {\n            position: relative;\n            width: 100vw;\n            height: calc(100% - 48px);\n            background-color: #fff;\n        }\n\n        #'
                )
                .concat(
                    ACTION_SEARCH_UNIQUE_ID,
                    ' .fail-tip{\n            width: 100%;\n            font-size: 14px;\n            text-align: center;\n            color: #ccc;\n            line-height: 50px;\n        }\n        '
                );
        }
    }; // 检查是否全选

    function checkIsAll(dom) {
        if (issingle !== '1') {
            // 组织架构子界面
            var structure = myShadowDom.querySelector('#'.concat(ACTION_STRUCTURE_UNIQUE_ID)); // 组织架构主界面

            var mainPage = myShadowDom.querySelector('#'.concat(ACTION_WRAP_UNIQUE_ID));
            var items = structure.getElementsByTagName('li');
            var flag = false;

            for (var i = 0; i < items.length; i += 1) {
                if (
                    !items[i].querySelector('.mui-input-row input').disabled &&
                    !items[i].querySelector('input').checked &&
                    !(dom && items[i] === dom)
                ) {
                    flag = true;
                }
            }

            if (flag && mainPage.querySelector('#selectall input').checked) {
                mainPage.querySelector('#selectall input').checked = false;
            } else if (!flag) {
                mainPage.querySelector('#selectall input').checked = true;
            }
        }
    }
    /**
     * 获取数组中特定标识项的索引
     * @param {Array} arr 数组
     * @param {String} guid 标识
     * @param {String} type 类型
     * @return {Number} 索引
     */

    function getArrItemIndex(arr, guid, type) {
        var i = 0;

        for (; i < arr.length; i += 1) {
            if ((type === 'ou' && arr[i].ouguid === guid) || (type === 'user' && arr[i].userguid === guid)) {
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
        hybridJs.ui.showWaiting();
        Util.ajax({
            url: ''.concat(formalUrl).concat(getoulistwithuser),
            data: {
                params: JSON.stringify({
                    ouguid: ouGuid
                })
            },
            headers: {
                Authorization: 'Bearer '.concat(token)
            },
            success: function success(result) {
                hybridJs.ui.closeWaiting();

                if (parseInt(result.status.code, 10) === 1) {
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
                        }); // 渲染

                        renderStructure(result.custom);
                    } else {
                        // 如果为空时，展示空状态
                        myShadowDom.querySelector(
                            '#'.concat(ACTION_STRUCTURE_UNIQUE_ID, ' .structure-body')
                        ).innerHTML = '<div class="empty-tip">'.concat($t('暂无人员'), '</div>');
                    }
                } else {
                    hybridJs.ui.toast(result.status.text);
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
            url: ''.concat(formalUrl).concat(searchuserbycondition),
            data: {
                params: JSON.stringify({
                    keyword: keyWord,
                    currentpageindex: 1,
                    pagesize: -1
                })
            },
            headers: {
                Authorization: 'Bearer '.concat(token)
            },
            success: function success(result) {
                if (parseInt(result.status.code, 10) === 1) {
                    if (result.custom.userlist.length > 0) {
                        getFromSearchUser = result.custom.userlist; // 处理返回数据

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
                        myShadowDom.querySelector('#'.concat(ACTION_SEARCH_UNIQUE_ID)).innerHTML =
                            '<div class="fail-tip">未找到相关搜索结果</div>';
                    }
                } else {
                    hybridJs.ui.toast(result.status.text);
                }
            }
        });
    }
    /**
     * 搜索部门
     * @param {String} keyWord 关键词
     */

    function searchOu(keyWord) {
        Util.ajax({
            url: searchOuUrl,
            data: {
                params: JSON.stringify({
                    keyword: keyWord,
                    currentpageindex: 1,
                    pagesize: -1,
                    onlybaseou: 0
                })
            },
            headers: {
                Authorization: 'Bearer '.concat(token)
            },
            success: function success(result) {
                if (parseInt(result.status.code, 10) === 1) {
                    if (result.custom.oulist.length > 0) {
                        getFromSearchOu = result.custom.oulist; // 处理返回数据

                        result.custom.oulist.forEach(function (e) {
                            var element = e;
                            element.ischecked = '';

                            if (getArrItemIndex(selectedous, element.ouguid, 'ou') > -1) {
                                element.ischecked = 'checked';
                            }
                        });
                        renderSearchContent(null, result.custom.oulist);
                    } else {
                        myShadowDom.querySelector('#'.concat(ACTION_SEARCH_UNIQUE_ID)).innerHTML =
                            '<div class="fail-tip">未找到相关搜索结果</div>';
                    }
                } else {
                    hybridJs.ui.toast(result.status.text);
                }
            }
        });
    }
    /**
     * 获取部门下所有人员列表
     * @param {String} parentOuGuid 父部门guid
     * @param {String} cb 成功
     */

    function getUserList(parentOuGuid, cb) {
        hybridJs.ui.showWaiting();
        Util.ajax({
            url: ''.concat(formalUrl).concat(getalluserlist),
            data: {
                params: JSON.stringify({
                    parentouguid: parentOuGuid,
                    keyword: '',
                    currentpageindex: 1,
                    pagesize: -1
                })
            },
            headers: {
                Authorization: 'Bearer '.concat(token)
            },
            success: function success(result) {
                hybridJs.ui.closeWaiting();

                if (parseInt(result.status.code, 10) === 1) {
                    result.custom.userlist.forEach(function (element) {
                        if (
                            getArrItemIndex(selectedusers, element.userguid, 'user') === -1 &&
                            getArrItemIndex(unableselectusers, element.userguid, 'user') === -1
                        ) {
                            selectedusers.push(element);
                        }
                    });
                    cb && cb();
                } else {
                    hybridJs.ui.toast(result.status.text);
                }
            }
        });
    } // 从custom中获取部门人员

    function getUserFromCustom(parentOuGuid, parentou) {
        if (parentou.ouguid === parentOuGuid) {
            if ('userlist' in parentou && parentou.userlist.length > 0) {
                parentou.userlist.forEach(function (element) {
                    if (
                        getArrItemIndex(selectedusers, element.userguid, 'user') === -1 &&
                        getArrItemIndex(unableselectusers, element.userguid, 'user') === -1
                    ) {
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
        hybridJs.ui.showWaiting();
        Util.ajax({
            url: ''.concat(formalUrl).concat(getgrouplist),
            data: {
                params: JSON.stringify({
                    type: groupType
                })
            },
            headers: {
                Authorization: 'Bearer '.concat(token)
            },
            success: function success(result) {
                hybridJs.ui.closeWaiting();

                if (parseInt(result.status.code, 10) === 1) {
                    if (
                        (result.custom.grouplist && result.custom.grouplist.length) ||
                        (result.custom.groupList && result.custom.groupList.length)
                    ) {
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
                        getFromAjaxOu = result.custom.grouplist; // 渲染

                        renderStructure(data);
                    } else {
                        // 展示空提示
                        getFromAjaxUser = [];
                        getFromAjaxOu = [];
                        myShadowDom.querySelector(
                            '#'.concat(ACTION_STRUCTURE_UNIQUE_ID, ' .structure-body')
                        ).innerHTML = '<div class="empty-tip">'.concat($t('暂无分组'), '</div>');
                    }
                } else {
                    //     hybridJs.ui.toast(result.status.text);
                }
            }
        });
    } // 获取分组下的直属子用户

    function getAddressBookList(groupType, guid) {
        hybridJs.ui.showWaiting();
        Util.ajax({
            url: ''.concat(formalUrl).concat(getaddressbooklist),
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
                Authorization: 'Bearer '.concat(token)
            },
            success: function success(result) {
                hybridJs.ui.closeWaiting();

                if (parseInt(result.status.code, 10) === 1) {
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
                    getFromAjaxUser = result.custom.userlist; // 渲染

                    renderStructure(data);
                } else {
                    //     hybridJs.ui.toast(result.status.text);
                }
            }
        });
    } // 创建选人主界面HTML

    function createSelectPersonPage() {
        var finalHtml = '';

        if (Object.prototype.toString.call(custom) !== '[object Object]' && !(isouonly === '1' && !searchOuUrl)) {
            finalHtml +=
                '<header>\n        <div class="mui-input-row mui-input-search">\n        <span class="mui-icon mui-icon-search"></span>';

            if (isouonly === '1' && searchOuUrl) {
                finalHtml +=
                    '<input type="search" class="mui-input-speech mui-input-clear" id="search-input" placeholder="'.concat(
                        $t('搜索部门'),
                        '">'
                    );
            } else {
                finalHtml +=
                    '<input type="search" class="mui-input-speech mui-input-clear" id="search-input" placeholder="'.concat(
                        $t('搜索选择人员'),
                        '">'
                    );
            }

            finalHtml += '</div>\n        <span class="cancel-btn mui-hidden">'.concat(
                $t('确定'),
                '</span>\n        </header>'
            );
        }

        finalHtml += '<div class="content-body">';

        if (isouonly === '1' || Object.prototype.toString.call(custom) === '[object Object]') {
            // 只选部门或选择范围
            finalHtml += '<div id="'.concat(
                ACTION_STRUCTURE_UNIQUE_ID,
                '" class="ejs-structure-wrapper width-100">\n        <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">\n        <div class="mui-scroll structure-bar"></div>\n        </div>\n        <div class="structure-body"></div>\n        </div>'
            );
        } else {
            // 选择人员
            finalHtml += '<div class="mui-scroll-wrapper" id="view-0"><div class="mui-scroll">';
            finalHtml += '<div class="selectperson-all-list">';
            finalHtml += '<div class="select-tip">'.concat($t('选择人员'), '</div>');
            finalHtml += '<ul class="mui-table-view" id="zzjg">';
            finalHtml += '<li class="mui-table-view-cell">\n            <a class="mui-navigate-right">'
                .concat(
                    $t('组织架构'),
                    '</a>\n        </li>\n        <li class="mui-table-view-cell">\n            <a class="mui-navigate-right">'
                )
                .concat($t('我的部门'), '</a>\n        </li>'); // 分组功能

            finalHtml += '<li class="mui-table-view-cell">\n            <a class="mui-navigate-right">'.concat(
                $t('我的分组'),
                '</a>\n        </li>'
            );
            finalHtml += '<li class="mui-table-view-cell">\n            <a class="mui-navigate-right">'.concat(
                $t('公共分组'),
                '</a>\n        </li>'
            );
            finalHtml += '</ul>';
            finalHtml += '</div>';
            finalHtml += '</div></div>';
        }

        finalHtml += '</div>';
        finalHtml += '<div class="bottom-bar">';
        finalHtml +=
            '<div class="mui-input-row mui-checkbox mui-left l mui-hidden"  id="selectall">\n    <label>'.concat(
                $t('全选'),
                '</label>\n    <input name="checkbox1" value="Item 1" type="checkbox">\n    </div>'
            );
        finalHtml += '<button type="button" class="mui-btn mui-btn-primary btn-set r">'.concat(
            $t('确定'),
            '<span class="selected-num mui-hidden"></span></button>'
        );

        if (isouonly === '1') {
            finalHtml += '<a class="edit-selected-btn mui-hidden">'.concat(
                $t('编辑已选部门'),
                '<span class="mui-icon mui-icon-arrowup"></span></a>'
            );
        } else {
            finalHtml += '<a class="edit-selected-btn mui-hidden">'.concat(
                $t('编辑已选人员'),
                '<span class="mui-icon mui-icon-arrowup"></span></a>'
            );
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
        // 组织架构子界面
        var structure = myShadowDom.querySelector('#'.concat(ACTION_STRUCTURE_UNIQUE_ID)); // 组织架构主界面

        var mainPage = myShadowDom.querySelector('#'.concat(ACTION_WRAP_UNIQUE_ID));
        var navNextDom = document.createElement('a');
        navNextDom.classList.add('nav-title');
        navNextDom.id = ouguid;

        if (navTitle === $t('我的分组') || navTitle === $t('公共分组')) {
            navNextDom.setAttribute('type', 'grouptitle');
        } else {
            navNextDom.setAttribute('type', 'commontitle');
        }

        navNextDom.innerHTML = ''.concat(navTitle, '<span class="mui-icon mui-icon-arrowright"></span>');

        if (structure.getElementsByClassName('nav-title').length > 0) {
            // 给前一个标题添加样式
            structure.querySelector('.structure-bar').lastElementChild.classList.add('active');
        }

        structure.querySelector('.structure-bar').appendChild(navNextDom); // 给新插入的标题添加点击事件

        structure.querySelector('.structure-bar').lastElementChild.addEventListener('click', function tapNav() {
            var guid = this.id;
            var title = this.getAttribute('type');

            if (this.classList.contains('active')) {
                var aList = structure.getElementsByClassName('nav-title');
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
                    mainPage.querySelector('.bottom-bar #selectall').classList.add('mui-hidden');
                } else {
                    getOuListWithUser(guid);
                }
            }
        }); // 初始化横向滚动条

        mui(mainPage.querySelector('.content-body .mui-scroll-wrapper')).scroll();
    }
    /**
     * 渲染组织架构
     * @param {Object} data 部门及人员列表数据
     */

    renderStructure = function renderStructure(data) {
        var oulist = data.oulist;
        var userlist = data.userlist;

        if (!oulist.length && !userlist.length) {
            // 如果为空时，展示空状态
            myShadowDom.querySelector('#'.concat(ACTION_STRUCTURE_UNIQUE_ID, ' .structure-body')).innerHTML =
                '<div class="empty-tip">'.concat($t('暂无人员'), '</div>');
            return;
        }

        var html = '';
        var isoushow = '';
        var isshowcount = '';
        var isshowtitle = '';

        if ((issingle === '1' && isouonly === '0') || 'grouptype' in data) {
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
                html += '<li class="mui-table-view-cell" data-guid="'.concat(
                    userlist[j].userguid,
                    '" data-type="user">\n            <div class="mui-input-row mui-checkbox mui-left">\n            <label>'
                );
                html += '<img src="'.concat(
                    photoUrl + userlist[j].photourl,
                    "\" class=\"user-photo\" onerror=\"this.classList.add('mui-hidden');this.parentNode.querySelector('.imgerror-backup').classList.remove('mui-hidden');onerror=null;\">"
                );
                html += '<span class="imgerror-backup mui-hidden">'
                    .concat(
                        userlist[j].displayname.substring(userlist[j].displayname.length - 2),
                        '</span>\n            <p class="user-info-txt"><span class="user-name">'
                    )
                    .concat(userlist[j].displayname, '</span><br><span class="user-title ')
                    .concat(isshowtitle, '">')
                    .concat(userlist[j].title, '</span></p>\n            <input type="checkbox" ')
                    .concat(userlist[j].ischecked, ' ')
                    .concat(userlist[j].disabled, '>\n            </label>\n            </div>\n            </li>');
            }
        }

        if (oulist.length > 0) {
            for (var i = 0; i < oulist.length; i += 1) {
                html += '<li class="mui-table-view-cell" data-guid="'
                    .concat(oulist[i].ouguid, '" data-type="ou" data-haschildou="')
                    .concat(oulist[i].haschildou, '" data-haschilduser="')
                    .concat(oulist[i].haschilduser, '">\n            <span class="mui-icon mui-icon-arrowright r ')
                    .concat(oulist[i].isnext, '"></span>\n            <span class="person-num r ')
                    .concat(isshowcount, '">')
                    .concat(
                        oulist[i].usercount,
                        '</span>\n            <div class="mui-input-row mui-checkbox mui-left '
                    )
                    .concat(oulist[i].ischecked, ' ')
                    .concat(isoushow, '"><input type="checkbox" ')
                    .concat(oulist[i].ischecked, '></div>\n            <span class="')
                    .concat(oulist[i].ischecked, ' user-single-span">')
                    .concat(oulist[i].ouname, '</span>\n            </li>');
            }
        }

        html += '</ul>';
        html += '</div></div>';
        var structureView = document.createElement('div');
        structureView.classList.add('structureView');
        structureView.innerHTML = html; // 清空内容

        myShadowDom.querySelector('#'.concat(ACTION_STRUCTURE_UNIQUE_ID, ' .structure-body')).innerHTML = '';
        myShadowDom
            .querySelector('#'.concat(ACTION_STRUCTURE_UNIQUE_ID, ' .structure-body'))
            .appendChild(structureView); // 每一次渲染检查全选

        checkIsAll(); // 添加item点击事件

        mui(myShadowDom.querySelector('#'.concat(ACTION_STRUCTURE_UNIQUE_ID, ' .structure-body .structureView'))).on(
            'click',
            'li',
            function tapItem(e) {
                var ouCount = 0;
                var guid = this.dataset.guid; // mui中对tap事件做了处理，若父元素中某个元素绑定了tap事件，则click事件触发冒泡到这一层时，会禁掉默认行为，导致input框选中异常
                // 所以需要阻止冒泡

                e.stopPropagation();

                if (e.target.tagName === 'INPUT') {
                    // 点击复选框
                    if (!this.querySelector('.mui-input-row input').checked) {
                        // 取消全选
                        if (myShadowDom.querySelector('#'.concat(ACTION_WRAP_UNIQUE_ID, ' #selectall input')).checked) {
                            myShadowDom.querySelector(
                                '#'.concat(ACTION_WRAP_UNIQUE_ID, ' #selectall input')
                            ).checked = false;
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

                        if ((isouonly === '0' && selectedNum === 0) || (isouonly === '1' && selectedous.length <= 0)) {
                            myShadowDom
                                .querySelector('#'.concat(ACTION_WRAP_UNIQUE_ID, ' .selected-num'))
                                .classList.add('mui-hidden');
                            myShadowDom
                                .querySelector('#'.concat(ACTION_WRAP_UNIQUE_ID, ' .edit-selected-btn'))
                                .classList.add('mui-hidden');
                        } else if (selectedNum > 0 && isouonly !== '1') {
                            myShadowDom.querySelector('#'.concat(ACTION_WRAP_UNIQUE_ID, ' .selected-num')).innerHTML =
                                '('.concat(selectedNum, '/').concat(maxchoosecount, ')');
                        }
                    } else if (!this.querySelector('.mui-input-row input').disabled) {
                        if (this.dataset.type === 'ou') {
                            // 选中部门
                            if (issingle === '1') {
                                // 单选部门
                                var nextOuLi = this.parentNode.firstChild;

                                for (; nextOuLi; nextOuLi = nextOuLi.nextSibling) {
                                    if (
                                        nextOuLi.nodeType === 1 &&
                                        nextOuLi !== this &&
                                        nextOuLi.dataset.type === 'ou'
                                    ) {
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
                                    if (
                                        nextUserLi.nodeType === 1 &&
                                        nextUserLi !== this &&
                                        nextUserLi.dataset.type === 'user'
                                    ) {
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
                        } // 每一次选择检查全选，如果已全部选中，改变全选按钮状态

                        checkIsAll(this);

                        if (isouonly !== '1') {
                            if (issingle === '1') {
                                myShadowDom.querySelector(
                                    '#'.concat(ACTION_WRAP_UNIQUE_ID, ' .selected-num')
                                ).innerHTML = '('.concat(selectedNum, ')');
                            } else {
                                myShadowDom.querySelector(
                                    '#'.concat(ACTION_WRAP_UNIQUE_ID, ' .selected-num')
                                ).innerHTML = '('.concat(selectedNum, '/').concat(maxchoosecount, ')');
                            }

                            myShadowDom
                                .querySelector('#'.concat(ACTION_WRAP_UNIQUE_ID, ' .selected-num'))
                                .classList.remove('mui-hidden');
                        }

                        myShadowDom
                            .querySelector('#'.concat(ACTION_WRAP_UNIQUE_ID, ' .edit-selected-btn'))
                            .classList.remove('mui-hidden');
                    }
                } else if (
                    !this.querySelector('.mui-input-row').classList.contains('checked') &&
                    this.dataset.type === 'ou'
                ) {
                    // 点击部门进入下一层级
                    var navTitle = this.querySelector('.user-single-span').innerText.trim();

                    if (!alwaysUseNetData) {
                        // 非总是请求接口获取部门的人员和子部门信息
                        // 则判断部门字段信息
                        if (this.dataset.haschildou === '0' && isouonly === '1') {
                            // 只选部门且此部门没有子部门时，不做动作
                            return;
                        }

                        if (this.dataset.haschildou === '0' && this.dataset.haschilduser === '0') {
                            // 没有子部门且没有人员时不做动作
                            return;
                        }
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
            }
        ); // 滚动初始化

        mui(
            myShadowDom.querySelector('#'.concat(ACTION_STRUCTURE_UNIQUE_ID, ' .structureView .mui-scroll-wrapper'))
        ).scroll();

        if ('grouptype' in data) {
            return;
        }

        if (issingle !== '1') {
            myShadowDom
                .querySelector('#'.concat(ACTION_WRAP_UNIQUE_ID, ' .bottom-bar #selectall'))
                .classList.remove('mui-hidden');
        }
    };
    /**
     * 创建编辑已选人员界面
     */

    function createEditPage() {
        // 组织架构主界面
        var mainPage = myShadowDom.querySelector('#'.concat(ACTION_WRAP_UNIQUE_ID)); // 编辑人员界面

        var editPage = myShadowDom.querySelector('#'.concat(ACTION_EDIT_UNIQUE_ID));
        var html = '';
        var isshowcount = '';

        if (isouonly === '1') {
            isshowcount = 'mui-hidden';
        }

        html += '<div class="mui-scroll-wrapper"><div class="mui-scroll">';

        if (selectedous.length > 0) {
            html += '<div class="selected-ous">\n        <div class="selected-tip">'.concat(
                $t('已选部门'),
                '</div>\n        <ul class="mui-table-view">'
            );
            selectedous.forEach(function (element) {
                html += '<li class="mui-table-view-cell" data-guid="'
                    .concat(
                        element.ouguid,
                        '" data-type="ou">\n                <span class="mui-icon mui-icon-trash del-btn"></span>\n                <span class="person-num r '
                    )
                    .concat(isshowcount, '">')
                    .concat(element.usercount, '</span>\n                <label>')
                    .concat(element.ouname, '</label>\n                </li>');
            });
            html += '</ul>';
            html += '</div>';
        }

        if (selectedusers.length > 0) {
            html += '<div class="selected-users">\n        <div class="selected-tip">'.concat(
                $t('长按可以调整顺序'),
                '</div>\n        <ul class="mui-table-view">'
            );
            selectedusers.forEach(function (element) {
                html += '<li class="mui-table-view-cell" data-guid="'.concat(
                    element.userguid,
                    '" data-type="user">\n            <span class="mui-icon mui-icon-trash del-btn"></span>\n            <span class="mui-icon mui-icon-bars"></span>'
                );
                html += '<img src="'.concat(
                    photoUrl + element.photourl,
                    "\" class=\"user-photo\" onerror=\"this.classList.add('mui-hidden');this.parentNode.querySelector('.imgerror-backup').classList.remove('mui-hidden');onerror=null;\">"
                );
                html += '<span class="imgerror-backup mui-hidden">'
                    .concat(
                        element.displayname.substring(element.displayname.length - 2),
                        '</span>\n            <p class="user-info-txt"><span class="user-name">'
                    )
                    .concat(element.displayname, '</span></p>\n            </li>');
            });
            html += '</ul>';
            html += '</div>';
        }

        html += '</div></div>';
        html += '<div class="bottom-bar"><button class="mui-btn mui-btn-primary clearall-btn r">'.concat(
            $t('一键清空'),
            '</button></div>'
        );

        if (!editPage) {
            // 不重复添加
            editClassName();
            var wrapper = document.createElement('div');
            wrapper.id = ACTION_EDIT_UNIQUE_ID;
            wrapper.classList.add('ejs-edit-wrapper');
            wrapper.innerHTML = html;
            myShadowDom.appendChild(wrapper);
            editPage = myShadowDom.querySelector('#'.concat(ACTION_EDIT_UNIQUE_ID)); // 添加删除事件

            mui(editPage).on('click', '.del-btn', function tapDelBtn() {
                if (this.parentNode.dataset.type === 'ou') {
                    selectedous.splice(getArrItemIndex(selectedous, this.parentNode.dataset.guid, 'ou'), 1);
                    selectedNum -= parseInt(this.parentNode.querySelector('.person-num').innerText.trim(), 0);

                    if (selectedous.length > 0) {
                        this.parentNode.parentNode.removeChild(this.parentNode);
                    } else {
                        editPage.querySelector('.mui-scroll').removeChild(editPage.querySelector('.selected-ous'));
                    }
                } else {
                    selectedusers.splice(getArrItemIndex(selectedusers, this.parentNode.dataset.guid, 'user'), 1);
                    selectedNum -= 1;

                    if (selectedusers.length > 0) {
                        this.parentNode.parentNode.removeChild(this.parentNode);
                    } else {
                        editPage.querySelector('.mui-scroll').removeChild(editPage.querySelector('.selected-users'));
                    }
                }

                mainPage.querySelector('.selected-num').innerHTML = '('
                    .concat(selectedNum, '/')
                    .concat(maxchoosecount, ')');

                if ((isouonly === '0' && selectedNum <= 0) || (isouonly === '1' && selectedous.length <= 0)) {
                    mainPage.querySelector('.selected-num').classList.add('mui-hidden');
                    mainPage.querySelector('.edit-selected-btn').classList.add('mui-hidden');
                }
            });
        } else {
            // 直接更改html
            editPage.innerHTML = html;
        } // 初始化滚动

        mui(editPage.querySelector('.mui-scroll-wrapper')).scroll(); // 添加一键清空事件

        mui(editPage.querySelector('.bottom-bar')).on('click', 'button', function () {
            selectedusers = [];
            selectedous = [];
            selectedNum = 0;
            editPage.querySelector('.mui-scroll').innerHTML = '';
            mainPage.querySelector('.selected-num').innerHTML = '';
            mainPage.querySelector('.selected-num').classList.add('mui-hidden');
            mainPage.querySelector('.edit-selected-btn').classList.add('mui-hidden');
            mainPage.querySelector('.bottom-bar #selectall').querySelector('input').checked = false;
        }); // 长按拖拽功能

        if (editPage.querySelector('.selected-users')) {
            new Sortable(editPage.querySelector('.selected-users ul'), {
                // eslint-disable-line
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
        } // 切换到编辑已选人员界面

        mainPage.classList.add('mui-hidden');
        editPage.classList.add('ejs-transitionW');
        editPage.classList.add('ejs-poptoleft');
    } // 渲染搜索人员列表

    renderSearchContent = function renderSearchContent(userlist, oulist) {
        var html = '';
        html += '<div class="mui-scroll-wrapper"><div class="mui-scroll">';
        html += '<ul class="mui-table-view">';

        if (userlist && userlist.length > 0) {
            userlist.forEach(function (element) {
                html += '<li class="mui-table-view-cell" data-guid="'.concat(
                    element.userguid,
                    '" data-type="user">\n                <div class="mui-input-row mui-checkbox mui-left">\n                <label>'
                );
                html += '<img src="'.concat(
                    photoUrl + element.photourl,
                    "\" class=\"user-photo\" onerror=\"this.classList.add('mui-hidden');this.parentNode.querySelector('.imgerror-backup').classList.remove('mui-hidden');onerror=null;\">"
                );
                html += '<span class="imgerror-backup mui-hidden">'
                    .concat(
                        element.displayname.substring(element.displayname.length - 2),
                        '</span>\n                <p class="user-info-txt"><span class="user-name">'
                    )
                    .concat(element.displayname, '</span>');

                if (element.ouname) {
                    html += '<br><span class="user-title">'.concat(element.ouname, '</span>');
                }

                html += '</p>\n                <input type="checkbox" '
                    .concat(element.ischecked, ' ')
                    .concat(
                        element.disabled,
                        '>\n                </label>\n                </div>\n                </li>'
                    );
            });
        }

        if (oulist && oulist.length > 0) {
            oulist.forEach(function (element) {
                html += '<li class="mui-table-view-cell" data-guid="'
                    .concat(element.ouguid, '" data-type="ou" data-haschildou="')
                    .concat(element.haschildou, '" data-haschilduser="')
                    .concat(element.haschilduser, '">\n            <div class="mui-input-row mui-checkbox mui-left ')
                    .concat(element.ischecked, '"><input type="checkbox" ')
                    .concat(element.ischecked, '></div>\n            <span class="')
                    .concat(element.ischecked, ' user-single-span">')
                    .concat(element.ouname, '</span>\n            </li>');
            });
        }

        html += '</ul>';
        html += '</div></div>';
        myShadowDom.querySelector('#'.concat(ACTION_SEARCH_UNIQUE_ID)).innerHTML = html; // 初始化滚动

        mui(myShadowDom.querySelector('#'.concat(ACTION_SEARCH_UNIQUE_ID, ' .mui-scroll-wrapper'))).scroll();
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

        if (
            myShadowDom
                .querySelector('#'.concat(ACTION_WRAP_UNIQUE_ID, ' .bottom-bar #selectall'))
                .querySelector('input').checked &&
            flag
        ) {
            // 取消全选
            myShadowDom
                .querySelector('#'.concat(ACTION_WRAP_UNIQUE_ID, ' .bottom-bar #selectall'))
                .querySelector('input').checked = false;
        }

        var title = myShadowDom.querySelector('#'.concat(ACTION_STRUCTURE_UNIQUE_ID, ' .structure-bar'))
            .lastElementChild.innerText;

        if (title === $t('我的分组') || title === $t('公共分组')) {
            if (getFromAjaxOu.length === 0) {
                myShadowDom.querySelector('#'.concat(ACTION_STRUCTURE_UNIQUE_ID, ' .structure-body')).innerHTML =
                    '<div class="empty-tip">'.concat($t('暂无分组'), '</div>');
            } else {
                if (title === $t('我的分组')) {
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
    } // 用于搜索框防抖

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
        // 组织架构主界面
        var mainPage = myShadowDom.querySelector('#'.concat(ACTION_WRAP_UNIQUE_ID)); // let isIosMoveBack = 0;
        // 拦截返回判断

        var intercept = function hookEvent(callback) {
            var guid = window.location.href;
            var mainPageReg = new RegExp(ACTION_WRAP_UNIQUE_ID, 'g');
            var structureReg = new RegExp(ACTION_STRUCTURE_UNIQUE_ID, 'g'); // 组织架构子界面

            var structure = myShadowDom.querySelector('#'.concat(ACTION_STRUCTURE_UNIQUE_ID)); // 编辑人员界面

            var editPage = myShadowDom.querySelector('#'.concat(ACTION_EDIT_UNIQUE_ID)); // 搜索人员界面

            var searchPage = myShadowDom.querySelector('#'.concat(ACTION_SEARCH_UNIQUE_ID));

            if (ejs.os.ios) {
                // 如果是ios，避免与右滑返回的动画冲突
                mainPage.classList.remove('ejs-transitionH');
                structure && structure.classList.remove('ejs-transitionW');
                editPage && editPage.classList.remove('ejs-transitionW');
            }

            if (mainPageReg.test(guid)) {
                if (structure && structure.classList.contains('ejs-poptoleft')) {
                    // 组织架构子界面到主界面
                    mainPage.querySelector('#view-0').classList.remove('mui-hidden');
                    structure.classList.remove('ejs-poptoleft');
                    mainPage.querySelector('.bottom-bar #selectall').classList.add('mui-hidden');
                } else if (editPage && editPage.classList.contains('ejs-poptoleft')) {
                    // 编辑人员界面回到主界面
                    if (structure) {
                        refreshStructure();
                    }

                    mainPage.classList.remove('mui-hidden');
                    editPage.classList.remove('ejs-poptoleft');
                } else if (searchPage && !searchPage.classList.contains('mui-hidden')) {
                    // 搜索界面回到组织架构主界面
                    mainPage.querySelector('header input').blur();
                    mainPage.querySelector('header input').value = '';
                    mainPage.querySelector('header .mui-input-search').classList.remove('focus');
                    mainPage.querySelector('header .cancel-btn').classList.add('mui-hidden');
                    searchPage.classList.add('mui-hidden');
                    mainPage.querySelector('.content-body').classList.remove('mui-hidden');
                    mainPage.querySelector('.bottom-bar').classList.remove('mui-hidden');
                }
            } else if (structureReg.test(guid)) {
                refreshStructure();

                if (editPage && editPage.classList.contains('ejs-poptoleft')) {
                    // 编辑人员界面回到组织架构子界面
                    mainPage.classList.remove('mui-hidden');
                    editPage.classList.remove('ejs-poptoleft');
                } else if (searchPage && !searchPage.classList.contains('mui-hidden')) {
                    // 搜索界面回到组织架构子界面
                    mainPage.querySelector('header input').blur();
                    mainPage.querySelector('header input').value = '';
                    mainPage.querySelector('header .mui-input-search').classList.remove('focus');
                    mainPage.querySelector('header .cancel-btn').classList.add('mui-hidden');
                    searchPage.classList.add('mui-hidden');
                    mainPage.querySelector('.content-body').classList.remove('mui-hidden');
                    mainPage.querySelector('.bottom-bar').classList.remove('mui-hidden');
                }
            } else if (mainPage.classList.contains('ejs-poptotop')) {
                if (!ejs.os.ios) {
                    mainPage.classList.add('ejs-transitionH');
                } // 关闭选人界面

                mainPage.classList.remove('ejs-poptotop');
            } else {
                callback && callback();
            }
        }; // 用于外部页面拦截返回时调用的函数，以此来正常使用选人的功能

        window.goback = function (callback) {
            intercept(callback);
        }; // 左上角返回事件绑定

        window.addEventListener(
            'popstate',
            function () {
                intercept();
            },
            false
        ); // document.body.addEventListener('touchmove', () => {
        //     if (ejs.os.ios) {
        //         isIosMoveBack = 1;
        //     }
        // }, false);
        // 顶部搜索框，点击

        mui(mainPage).on('click', '#search-input', function tapSearch() {
            // 搜索人员界面
            var searchPage = myShadowDom.querySelector('#'.concat(ACTION_SEARCH_UNIQUE_ID));
            this.focus();

            if (!searchPage || searchPage.classList.contains('mui-hidden')) {
                if (!searchPage) {
                    // 不重复添加
                    searchClassName();
                    var wrapper = document.createElement('div');
                    wrapper.id = ACTION_SEARCH_UNIQUE_ID;
                    wrapper.classList.add('ejs-search-wrapper');
                    mainPage.appendChild(wrapper);
                    searchPage = myShadowDom.querySelector('#'.concat(ACTION_SEARCH_UNIQUE_ID)); // 添加点击事件

                    mui(searchPage).on('click', 'li', function tapSearchLi(e) {
                        var guid = this.dataset.guid; // mui中对tap事件做了处理，若父元素中某个元素绑定了tap事件，则click事件触发冒泡到这一层时，会禁掉默认行为，导致input框选中异常
                        // 所以需要阻止冒泡

                        e.stopPropagation();

                        if (e.target.tagName !== 'INPUT') {
                            return;
                        }

                        if (!this.querySelector('.mui-input-row input').checked) {
                            // 取消选中
                            if (this.dataset.type === 'ou') {
                                selectedous.splice(getArrItemIndex(selectedous, guid, 'ou'), 1);
                                this.querySelector('.mui-input-row').classList.remove('checked');
                                this.querySelector('.user-single-span').classList.remove('checked');
                            } else {
                                selectedusers.splice(getArrItemIndex(selectedusers, guid, 'user'), 1);
                                selectedNum -= 1;

                                if (selectedNum === 0) {
                                    mainPage.querySelector('.selected-num').classList.add('mui-hidden');
                                    mainPage.querySelector('.edit-selected-btn').classList.add('mui-hidden');
                                } else if (selectedNum > 0) {
                                    mainPage.querySelector('.selected-num').innerHTML = '('
                                        .concat(selectedNum, '/')
                                        .concat(maxchoosecount, ')');
                                }
                            }
                        } else if (!this.querySelector('.mui-input-row input').disabled) {
                            // 选中
                            if (this.dataset.type === 'ou') {
                                // 选中部门
                                if (issingle === '1') {
                                    // 单选部门
                                    var nextOuLi = this.parentNode.firstChild;

                                    for (; nextOuLi; nextOuLi = nextOuLi.nextSibling) {
                                        if (
                                            nextOuLi.nodeType === 1 &&
                                            nextOuLi !== this &&
                                            nextOuLi.dataset.type === 'ou'
                                        ) {
                                            nextOuLi.querySelector('input').checked = false;
                                            nextOuLi.querySelector('.mui-input-row').classList.remove('checked');
                                            nextOuLi.querySelector('.user-single-span').classList.remove('checked');
                                        }
                                    }
                                }

                                this.querySelector('.mui-input-row').classList.add('checked');
                                this.querySelector('.user-single-span').classList.add('checked');
                                getFromSearchOu.forEach(function (ele) {
                                    if (ele.ouguid === guid) {
                                        if (issingle === '1') {
                                            selectedous = [];
                                        }

                                        selectedous.push(ele);
                                    }
                                });
                            } else {
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
                                    mainPage.querySelector('.selected-num').innerHTML = '('.concat(selectedNum, ')');
                                } else {
                                    mainPage.querySelector('.selected-num').innerHTML = '('
                                        .concat(selectedNum, '/')
                                        .concat(maxchoosecount, ')');
                                }

                                mainPage.querySelector('.selected-num').classList.remove('mui-hidden');
                            }

                            mainPage.querySelector('.edit-selected-btn').classList.remove('mui-hidden');
                        }
                    });
                } else {
                    searchPage.innerHTML = '';
                    searchPage.classList.remove('mui-hidden');
                }

                mainPage.querySelector('header .mui-input-search').classList.add('focus');
                mainPage.querySelector('header .cancel-btn').classList.remove('mui-hidden');
                mainPage.querySelector('.content-body').classList.add('mui-hidden');
                mainPage.querySelector('.bottom-bar').classList.add('mui-hidden');
                mainPage.classList.remove('ejs-transitionH'); // 插入历史记录

                insertHistory('搜索界面', '#'.concat(ACTION_SEARCH_UNIQUE_ID));
            }
        }); // 顶部搜索框，搜索

        mui(mainPage).on('input', '#search-input', function keyup() {
            var keyword = this.value;
            debounce(function () {
                // 搜索人员界面
                var searchPage = myShadowDom.querySelector('#'.concat(ACTION_SEARCH_UNIQUE_ID));

                if (keyword === '') {
                    // 清空关键字
                    searchPage.innerHTML = '';
                } else if (isouonly === '1' && searchOuUrl) {
                    searchOu(keyword);
                } else {
                    searchUser(keyword);
                }
            }, 800);
        }); // 顶部搜索框，取消

        mui(mainPage).on('click', '.cancel-btn', function () {
            // this.parentNode.getElementsByTagName('input')[0].blur();
            window.history.go(-1);
        }); // 底部全选按钮点击

        mui(mainPage).on('click', '#selectall', function tapSelectall(e) {
            // 组织架构子界面
            var structure = myShadowDom.querySelector('#'.concat(ACTION_STRUCTURE_UNIQUE_ID));
            var items = structure.getElementsByTagName('li'); // mui中对tap事件做了处理，若父元素中某个元素绑定了tap事件，则click事件触发冒泡到这一层时，会禁掉默认行为，导致input框选中异常
            // 所以需要阻止冒泡

            e.stopPropagation();

            if (!this.querySelector('input').checked) {
                // 取消全选
                for (var i = 0; i < items.length; i += 1) {
                    if (!items[i].querySelector('.mui-input-row input').disabled) {
                        items[i].querySelector('.mui-input-row').classList.remove('checked');
                        items[i].querySelector('input').checked = false;

                        if (
                            items[i].dataset.type === 'ou' &&
                            getArrItemIndex(selectedous, items[i].dataset.guid, 'ou') > -1
                        ) {
                            items[i].querySelector('.user-single-span').classList.remove('checked');
                            selectedous.splice(getArrItemIndex(selectedous, items[i].dataset.guid, 'ou'), 1);
                            selectedNum -= parseInt(items[i].querySelector('.person-num').innerText.trim(), 0);
                        } else if (
                            items[i].dataset.type === 'user' &&
                            getArrItemIndex(selectedusers, items[i].dataset.guid, 'user') > -1
                        ) {
                            selectedusers.splice(getArrItemIndex(selectedusers, items[i].dataset.guid, 'user'), 1);
                            selectedNum -= 1;
                        }
                    }
                }

                if (selectedNum > 0) {
                    if (isouonly !== '1') {
                        mainPage.querySelector('.selected-num').innerHTML = '('
                            .concat(selectedNum, '/')
                            .concat(maxchoosecount, ')');
                    }
                } else if ((isouonly === '1' && selectedous.length <= 0) || (isouonly !== '1' && selectedNum === 0)) {
                    mainPage.querySelector('.selected-num').classList.add('mui-hidden');
                    mainPage.querySelector('.edit-selected-btn').classList.add('mui-hidden');
                }
            } else {
                // 全选
                for (var _i2 = 0; _i2 < items.length; _i2 += 1) {
                    if (!items[_i2].querySelector('.mui-input-row input').disabled) {
                        items[_i2].querySelector('.mui-input-row').classList.add('checked');

                        items[_i2].querySelector('input').checked = true;

                        if (
                            items[_i2].dataset.type === 'ou' &&
                            getArrItemIndex(selectedous, items[_i2].dataset.guid, 'ou') === -1
                        ) {
                            items[_i2].querySelector('.user-single-span').classList.add('checked');

                            for (var j = 0; j < getFromAjaxOu.length; j += 1) {
                                if (getFromAjaxOu[j].ouguid === items[_i2].dataset.guid) {
                                    selectedous.push(getFromAjaxOu[j]);
                                }
                            }

                            selectedNum += parseInt(items[_i2].querySelector('.person-num').innerText.trim(), 0);
                        } else if (
                            items[_i2].dataset.type === 'user' &&
                            getArrItemIndex(selectedusers, items[_i2].dataset.guid, 'user') === -1
                        ) {
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
                    mainPage.querySelector('.selected-num').innerHTML = '('
                        .concat(selectedNum, '/')
                        .concat(maxchoosecount, ')');
                    mainPage.querySelector('.selected-num').classList.remove('mui-hidden');
                }

                mainPage.querySelector('.edit-selected-btn').classList.remove('mui-hidden');
            }
        }); // 点击编辑已选人员

        mui(mainPage).on('click', '.edit-selected-btn', function () {
            // 创建编辑已选人员界面
            createEditPage(); // 插入历史记录

            insertHistory('编辑已选人员界面', '#'.concat(ACTION_EDIT_UNIQUE_ID));
        }); // 点击确定按钮返回选择结果

        mui(mainPage).on('click', '.btn-set', function () {
            var result = {};
            var i = 0;

            if (selectedNum > maxchoosecount && isouonly !== '1') {
                hybridJs.ui.toast($t('选择人数超出最大限制人数'));
                return;
            }

            var handleResultUsers = function handleResultUsers() {
                // 组织架构子界面
                var structure = myShadowDom.querySelector('#'.concat(ACTION_STRUCTURE_UNIQUE_ID));
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
                } else if (structure && structure.classList.contains('ejs-poptoleft')) {
                    window.history.go(-2);
                } else {
                    window.history.go(-1);
                }

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
        hybridJs.ui.showWaiting();
        Util.ajax({
            url: ''.concat(formalUrl).concat(personalgetdetail),
            data: {
                params: JSON.stringify({
                    devicenumber: ''
                })
            },
            headers: {
                Authorization: 'Bearer '.concat(token)
            },
            success: function success(result) {
                hybridJs.ui.closeWaiting();

                if (parseInt(result.status.code, 10) === 1) {
                    var ouname = result.custom.ouname;
                    var ouguid = result.custom.ouguid; // const ouname = result.custom.baseouname;
                    // const ouguid = result.custom.baseouguid;

                    createNavTitle(ouname, ouguid);
                    getOuListWithUser(ouguid);
                } else {
                    hybridJs.ui.toast(result.custom.text);
                }
            }
        });
    }
    /**
     * 获取给定userguid的信息
     */

    function getUserInfoByGuids() {
        hybridJs.ui.showWaiting();
        var guids = selectedusers.map(function (element) {
            return element.userguid;
        });
        Util.ajax({
            url: ''.concat(formalUrl).concat(getuserinfolist),
            data: {
                params: JSON.stringify({
                    sequenceid: '',
                    userguid: guids.join(';')
                })
            },
            headers: {
                Authorization: 'Bearer '.concat(token)
            },
            success: function success(result) {
                hybridJs.ui.closeWaiting();

                if (parseInt(result.status.code, 10) === 1) {
                    selectedusers = result.custom.infolist;
                } else {
                    hybridJs.ui.toast(result.custom.text);
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
     * @return {Number} 人数
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
    } // 用于选择范围兼容已选人员传参

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
    } // 用于选择范围兼容已选部门传参

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
    } // 创建选人组件容器

    function createShadowDom() {
        // 获取首界面HTML
        var html = createSelectPersonPage();

        if (!myShadowDom) {
            // 创建影子DOM
            var shadowEL = document.createElement('div');
            shadowEL.classList.add('shadow-host');
            document.body.appendChild(shadowEL);
            var shadow = shadowEL.attachShadow({
                mode: 'open'
            }); // 引入mui样式

            var basePath = SrcBoot.getProjectBasePath() + (bizRootPath || Config.bizRootPath || '');
            var linkElem = document.createElement('link');
            var linkElem2 = document.createElement('link');
            var linkElem3 = document.createElement('link');
            linkElem.setAttribute('rel', 'stylesheet');
            linkElem.setAttribute('href', ''.concat(basePath, 'js/mui/mui.css'));
            shadow.appendChild(linkElem);
            linkElem2.setAttribute('rel', 'stylesheet');
            linkElem2.setAttribute('href', ''.concat(basePath, 'js/mui/mui.extend.css'));
            shadow.appendChild(linkElem2);
            linkElem3.setAttribute('rel', 'stylesheet');
            linkElem3.setAttribute('href', ''.concat(basePath, 'js/comdto/css/resources.css'));
            shadow.appendChild(linkElem3); // 不重复添加公共样式

            var style = commonClassName();
            shadow.appendChild(style);
            var wrapper = document.createElement('div');
            wrapper.id = ACTION_WRAP_UNIQUE_ID;
            wrapper.classList.add('ejs-select-wrapper');
            wrapper.classList.add('ejs-transitionH');
            wrapper.innerHTML = html;
            shadow.appendChild(wrapper);
            myShadowDom = shadowEL.shadowRoot; // 添加公共事件

            addEventListener();
        } else {
            // 直接更改html
            myShadowDom.getElementById(ACTION_WRAP_UNIQUE_ID).innerHTML = html;
        }
    } // 处理选择范围

    function dealCustom() {
        // 组织架构主界面
        var mainPage = myShadowDom.querySelector('#'.concat(ACTION_WRAP_UNIQUE_ID)); // 添加usercount属性

        countUser(custom); // 计算已选人数

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
                mainPage.querySelector('.selected-num').innerHTML = '('
                    .concat(selectedNum, '/')
                    .concat(maxchoosecount, ')');
                mainPage.querySelector('.selected-num').classList.remove('mui-hidden');
            }

            mainPage.querySelector('.edit-selected-btn').classList.remove('mui-hidden');
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
                        ele.displayname = element.username;
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

            createNavTitle($t('选择范围'), custom.ouguid);
            getDataFromCustom(custom.ouguid, custom);
        } else {
            if (selectedusers.length > 0) {
                // 兼容不规范已选人员传参
                getUserInfoByGuids();
            }

            selectedous = []; // 选择范围参数不合法

            createNavTitle($t('选择范围'), '');
            getOuListWithUser('');
        } // 插入历史记录

        insertHistory('选择人员界面', '#'.concat(ACTION_WRAP_UNIQUE_ID));
    } // 处理只选部门

    function dealOuOnly() {
        // 组织架构主界面
        var mainPage = myShadowDom.querySelector('#'.concat(ACTION_WRAP_UNIQUE_ID));
        selectedusers = [];
        unableselectusers = [];

        if (selectedous.length > 0) {
            mainPage.querySelector('.edit-selected-btn').classList.remove('mui-hidden');
        }

        if (searchOuUrl) {
            mainPage.querySelector('.content-body').style.height = 'calc(100% - 56px - 48px)';
        } // 渲染组织架构

        createNavTitle($t('组织架构'), '');
        getOuListWithUser(''); // 插入历史记录

        insertHistory('选择部门界面', '#'.concat(ACTION_STRUCTURE_UNIQUE_ID));
    } // 处理选择人员

    function dealDefault() {
        // 组织架构主界面
        var mainPage = myShadowDom.querySelector('#'.concat(ACTION_WRAP_UNIQUE_ID));
        selectedous = [];
        selectedNum = selectedusers.length;

        if (selectedNum > 0) {
            // 兼容不规范已选人员传参
            getUserInfoByGuids();
            mainPage.querySelector('.selected-num').innerHTML = '('
                .concat(selectedNum, '/')
                .concat(maxchoosecount, ')');
            mainPage.querySelector('.selected-num').classList.remove('mui-hidden');
            mainPage.querySelector('.edit-selected-btn').classList.remove('mui-hidden');
        }

        mainPage.querySelector('.content-body').style.height = 'calc(100% - 56px - 48px)';
        mui(mainPage.querySelector('#view-0')).scroll(); // 选择人员主界面item点击事件

        mui(mainPage.querySelector('#view-0 #zzjg')).on('click', 'li', function tapFunc() {
            var title = this.innerText.trim(); // 组织架构子界面

            var structure = myShadowDom.querySelector('#'.concat(ACTION_STRUCTURE_UNIQUE_ID));
            var structureHtml = '';
            structureHtml +=
                '<div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">\n            <div class="mui-scroll structure-bar"></div>\n            </div>';
            structureHtml += '<div class="structure-body"></div>';

            if (!structure) {
                // 不重复添加
                var structureWrapper = document.createElement('div');
                structureWrapper.id = ACTION_STRUCTURE_UNIQUE_ID;
                structureWrapper.classList.add('ejs-structure-wrapper');
                structureWrapper.innerHTML = structureHtml;
                mainPage.querySelector('.content-body').appendChild(structureWrapper); // 初始化横向滚动条

                mui(mainPage.querySelector('.content-body .mui-scroll-wrapper')).scroll();
                structure = myShadowDom.querySelector('#'.concat(ACTION_STRUCTURE_UNIQUE_ID));
            } else {
                // 直接更改html
                structure.innerHTML = structureHtml;
            }

            if (title === $t('我的部门')) {
                getUserInfo();
            } else if (title === $t('组织架构')) {
                createNavTitle($t('组织架构'), '');
                getOuListWithUser('');
            } else if (title === $t('我的分组')) {
                createNavTitle($t('我的分组'), '');
                getGroupList('');
            } else if (title === $t('公共分组')) {
                createNavTitle($t('公共分组'), 'public');
                getGroupList('public');
            } // 主界面切换到组织架构子界面

            mainPage.querySelector('#view-0').classList.add('mui-hidden');
            structure.classList.add('ejs-transitionW');
            structure.classList.add('ejs-poptoleft'); // 插入历史记录

            insertHistory('组织架构界面', '#'.concat(ACTION_STRUCTURE_UNIQUE_ID));
        }); // 插入历史记录

        insertHistory('选择人员界面', '#'.concat(ACTION_WRAP_UNIQUE_ID));
    }

    function selectPerson(params, hybrid, success) {
        var options = params || {};
        hybridJs = hybrid || window.ejs; // 整理参数

        formalUrl = options.url || FORMAL_URL;
        photoUrl = formalUrl.match(/(\S*)rest/)[1];
        token = options.token;
        maxchoosecount = options.maxchoosecount;
        isouonly = options.isouonly;
        issingle = options.issingle;
        selectedusers = options.selectedusers.slice(0);
        unableselectusers = options.unableselectusers.slice(0);
        selectedous = options.selectedous.slice(0);
        callback = success || options.success;
        bizRootPath = options.bizRootPath || '';
        custom = options.custom;
        searchOuUrl = options.searchOuUrl || '';
        alwaysUseNetData = options.alwaysUseNetData || false;
        getFromAjaxOu = [];
        getFromAjaxUser = [];

        if (
            Object.prototype.toString.call(custom) === '[object Object]' &&
            ('oulist' in custom || 'userlist' in custom)
        ) {
            // 选择范围参数合法
            isSelectRange = '1';
        } else {
            // 传入的custom不是对象或参数不合法时
            isSelectRange = '0';
        }

        var noop = function noop(info) {
            return info;
        };

        $t = (window.di18n && window.di18n.$t.bind(window.di18n)) || noop; // 创建选人组件容器

        createShadowDom();

        if (Object.prototype.toString.call(custom) === '[object Object]') {
            // 选择范围
            dealCustom();
        } else if (isouonly === '1') {
            // 只选部门
            dealOuOnly();
        } else {
            // 选择人员
            dealDefault();
        } // 显示选人界面

        var mainPage = myShadowDom.querySelector('#'.concat(ACTION_WRAP_UNIQUE_ID));
        mainPage.classList.add('ejs-transitionH');
        mainPage.classList.add('ejs-poptotop');
    }

    win.SelectPerson = selectPerson;
})({}, document, window);
