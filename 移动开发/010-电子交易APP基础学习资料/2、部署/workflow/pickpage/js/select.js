/*
 * 作者: 丁佳琪
 * 创建时间: 2021-07-20 10:21:39
 * 修改时间: 2023-02-15 15:37:36
 * 版本: [1.0]
 * 版权: 国泰新点软件股份有限公司
 * 描述: 通讯录
 */

(function (doc, Config, Util) {
    'use strict';
    // 搜索历史
    var historyList = [];
    // 请求参数，部门的ouguid
    var ouguid = "";
    // 部门列表数据
    var oulist = [];
    // 用户列表数据
    var userlist = [];
    // 选中用户数据
    var checkedArr = [];
    // 架构页面的title数据
    var titleData = [{name: '最近', id: ''}];
    // 选择本部门还是所有用户
    var tabkey = "ownou";
    // 搜索条件
    var searchContent = "";
    epointm.initPage('workflowtreeaction', null, function () {
        historyList = JSON.parse(localStorage.getItem("historyList"))|| [];
        historyList.reverse();
        initPage();
        initListeners();
    });

    window.onChange = function (text, value, controls) {
        var tabKey;
        if (value === false) {
            tabKey = 'ownou';
        }
        else {
            tabKey = 'ou';
        }
        var url = epointm.getCache('action')+".action?cmd=getTreeOuModel&tabKey=" + tabKey;
        epm.get("treeGuid").setUrl(url);
        var viewdata = epm.get('_common_hidden_viewdata').getValue();
        viewdata = JSON.parse(viewdata);
        viewdata.tabKey = tabKey;
        epm.get('_common_hidden_viewdata').setValue(JSON.stringify(viewdata));
        epm.get("treeGuid").node = {};
        epointm.refresh(['treeGuid']);
    };

    function initPage() {
        // 获取架构的初始数据
        getList('1');
        templateRender(historyList, 'historyitem', 'historylist');
    }

    function initListeners() {
        // 点击tab改变样式
        $('body').on('tap', '.tab-item', function (e) {
            $("input[name='user-checkbox']").prop("checked", false);
            $("input[name='checkbox-all']").prop("checked", false);
            checkedArr = [];
            if (this.innerHTML.indexOf('所有用户')> -1) {
                tabkey = 'ou';
            }
            else {
                tabkey = 'ownou';
            }
            $(this).addClass('active-color').siblings().removeClass('active-color');
            // $('#' + id + '-group').addClass('main-current').siblings().removeClass('main-current');
            if ($(this).index() == 0) {
                getList('ownou');
                titleData = [{name: '最近', id: ''}];
                // $('#oulist').css('display', 'none');
                // $("#userlist").css('display', 'block');
            }
            else if ($(this).index() == 1) {
                getList('ou');
                titleData = [{name: '组织架构', id: ''}];
                // $('#userlist').css('display', 'none');
                // $("#oulist").css('display', 'block');
            }
            //将title渲染在页面上
            templateRender(titleData, 'titleitem', 'titlelist')

            // 清空选中数目
            $(".pick-num").text('0')
            $(".picknum-total").text(`0/0`)


        })
            // 部门列表item的点击事件
            .on('tap', '.ouitem-wrap', function (e) {
                var ouIndex = $(this).index();
                // 通过当前点击的item的index值，获取对应的ouguid，并请求数据
                ouguid = oulist[ouIndex].id;
                getList(ouguid);
                // 将部门name添加到titleData数组中
                titleData.push({name: oulist[ouIndex].text, id: oulist[ouIndex].id});
                //将title渲染在页面上
                templateRender(titleData, 'titleitem', 'titlelist')
            })
            // title点击事件
            .on('tap', '.title-item', function (e) {
                // 获取被点击部门的ouguid，重新请求数据
                var titleIndex = $(this).index();
                getList(titleData[titleIndex].id);
                titleData = titleData.filter((item, index) => {
                    return index <= titleIndex;
                })
                // 将title渲染在页面上
                templateRender(titleData, 'titleitem', 'titlelist');
            });

        // 搜索框 聚焦时
        $('input[name="search-input"]').focus(function () {
            $('.search-history').css('display', 'block');
            $('.search-cancel').css('display', 'block');
        }).blur(function () {
            // 输入框失去焦点
        });

        // 点击取消按钮
        $('.search-wrap').on('tap', '.search-cancel', function () {
            $('.search-history').css('display', 'none');
            $('.search-cancel').css('display', 'none');
        });
        // 历史记录点击删除按钮
        $('.history-list').on('tap', '.delete-btn', function (e) {
            historyList.map((item, index) => {
                if (item == e.target.dataset.text) {
                    historyList.splice(index, 1)
                }
            })
            templateRender(historyList, 'historyitem', 'historylist');
            if(historyList.length>0){
                localStorage.setItem('historyList', historyList);
            }else{
                localStorage.removeItem('historyList');
            }
        }).on('tap', '.search-item ', function (e) {
            // 点击历史记录 进行搜索
            if (e.target.tagName != 'IMG') {
                $('input[name="search-input"]').val(e.target.dataset.text)
            }
        })
        $('body').on('tap','.history-clear',function(e){
            historyList=[];
            templateRender(historyList, 'historyitem', 'historylist');
            localStorage.removeItem('historyList');
        })

        // 员工复选框点击事件
        // $('body').on('click', 'input[name="user-checkbox"]', function (e) {
        $('body').on('click', '.useritem', function (e) {
            console.log($(this).find('input'));
            console.log($(this).find('input')[0].checked);
            console.log($(this).find('input')[0].value);
            if (e.target.className != 'check-box') {
                $(this).find('input').prop("checked", !$(this).find('input')[0].checked);
            }
            // 选中
            if ($(this).find('input')[0].checked) {
                userlist.map((item, index) => {
                    if (item.id == $(this).find('input')[0].value) {
                        checkedArr.push(item)
                    }
                })
            }
            else {
                // 取消选中
                checkedArr.map((item, index) => {
                    if (item.id == $(this).find('input')[0].value) {
                        checkedArr.splice(index, 1);
                    }
                })
            }
            $(".pick-num").text(checkedArr.length)
            $(".picknum-total").text(`${checkedArr.length}/${userlist.length}`)
            // 全选按钮是否选中
            $("input[name='checkbox-all']").prop("checked", checkedArr.length == userlist.length);
        })
            .on('click', 'input[name="checkbox-all"]', function (e) {
                // 全选点击事件
                // $('input[name="checkbox-all"]').on('click', function (e) {
                $("input[name='user-checkbox']").prop("checked", $(this)[0].checked);
                checkedArr = $(this)[0].checked ? JSON.parse(JSON.stringify(userlist)) : []
                $(".pick-num").text(checkedArr.length)
                $(".picknum-total").text(`${checkedArr.length}/${userlist.length}`)
            });

        //清空按钮
        $('body').on('click', '.btn-clear', function (e) {
            // 取消选中
            $('input[name="user-checkbox"]:checked').prop('checked', false);
            $('input[name="checkbox-all"]:checked').prop('checked', false);
            checkedArr = [];
            $(".pick-num").text(checkedArr.length)
            $(".picknum-total").text(`${checkedArr.length}/${userlist.length}`)
        });

        //确认按钮
        $('body').on('click', '.btn-confirm', function (e) {
            var contactText = "";
            var contactValue = "";
            checkedArr.forEach(function (item) {
                if (contactText != "") {
                    contactText += ";";
                }
                contactText += item.text;
                if (contactValue != "") {
                    contactValue += ";";
                }
                contactValue += item.id;
            })
            localStorage.setItem('contactText', contactText);
            localStorage.setItem('contactValue', contactValue);
            epointm.closeDialog('close','wfoppass');
        });

        //搜索
        $('input[name="search-input"]').on('keypress', function (e) {
            var ajaxData;
            var viewdata;
            var keycode = e.keyCode;
            //获取搜索框的值
            searchContent = $(this).val();
            if (keycode == '13') {
                e.preventDefault();
                //请求搜索接口
                if (searchContent == '') {
                    url = Util.addUrlParams("rest/" + epointm.getCache('action') + "/page_Refresh", Util.getUrlParams());
                    viewdata = epm.get('_common_hidden_viewdata').getValue();
                    viewdata = JSON.parse(viewdata);
                    viewdata.tabKey = tabkey;
                    epm.get('_common_hidden_viewdata').setValue(JSON.stringify(viewdata));
                    ajaxData = epm.get('treeGuid').onGetRequestData('false');
                    let newCommonDto = JSON.parse(ajaxData.commonDto);
                    newCommonDto[0].isSecondRequest = true;
                    ajaxData.commonDto = JSON.stringify(newCommonDto);
                    ajaxData.search_condition = searchContent;
                    ajaxData = epm.addReplayAttackData(ajaxData, url);
                    extracted(url, ajaxData);
                }
                else {
                    var url = "rest/" + epointm.getCache('action') + "/getTreeOuModel?tabKey=" + tabkey;
                    epm.get("treeGuid").setUrl(url);
                    viewdata = epm.get('_common_hidden_viewdata').getValue();
                    viewdata = JSON.parse(viewdata);
                    viewdata.tabKey = tabkey;
                    epm.get('_common_hidden_viewdata').setValue(JSON.stringify(viewdata));
                    url = Util.addUrlParams(url, Util.getUrlParams());
                    ajaxData = epm.get('treeGuid').onGetRequestData('true');
                    let newCommonDto = JSON.parse(ajaxData.commonDto);
                    newCommonDto[0].search_condition = searchContent;
                    newCommonDto[0].isSecondRequest = true;
                    newCommonDto[0].checkRecursive = true;
                    newCommonDto[0].eventType = '';
                    ajaxData.commonDto = JSON.stringify(newCommonDto);
                    ajaxData = epm.addReplayAttackData(ajaxData, url);
                    extracted(url,ajaxData);
                    historyList.push(searchContent);
                    if(historyList.length>50){
                        historyList.delete(0);
                    }
                    localStorage.setItem('historyList', JSON.stringify(historyList));
                    templateRender(historyList, 'historyitem', 'historylist');
                }
                $('.search-history').css('display', 'none');
                $('.search-cancel').css('display', 'none');

            }
        });
    }

    function extracted(url, ajaxData) {
        let host=location.origin+location.pathname.substring (0,location.pathname.substr (1).indexOf ('/')+2);
        Util.ajax({
            url: host+url,
            type: 'post',
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
            data: ajaxData,
            beforeSend: function (XMLHttpRequest) {
                Util.ejs.ui.showWaiting();
                var csrfcookie = epm.getCookie('_CSRFCOOKIE');
                if (csrfcookie) {
                    XMLHttpRequest.setRequestHeader('CSRFCOOKIE', csrfcookie);
                }
            },
            success: function (res) {
                userlist = [];
                oulist = [];
                if (res.status && res.status.code == 1) {
                    res.controls[0].data.forEach(function (item, index) {
                        if (item.dataType == 'user') {
                            userlist.push(item);
                        }
                        else {
                            if (item.pid != '')
                                oulist.push(item);
                        }
                    })
                    // 渲染部门节点
                    templateRender(oulist, 'ouitem', 'oulist')
                    // 渲染用户节点
                    templateRender(userlist, 'useritem', 'userlist');
                    // 渲染title
                    //将title渲染在页面上
                    templateRender(titleData, 'titleitem', 'titlelist')
                    // 使新增的title-item显示在页面上
                    Zepto("#titlelist").scrollLeft(Zepto("#titlelist")[0].scrollWidth);
                }
            },
            error: function (xhr) {
                console.error(xhr);
                console.error('获取下拉树失败');
                ejs.ui.toast('获取下拉树失败');
            },
            complete: function () {
                ejs.ui.closeWaiting();
            }
        });
    }

    /**
     * @description: 请求架构列表/部门列表的函数
     * @param {String} ouguid 请求参数，部门对应的ouguid
     */
    function getList(ouguid) {
        if (ouguid != '1') {
            var url;
            if (ouguid && ouguid.indexOf('ou') > -1) {
                url = Util.addUrlParams("rest/"+epointm.getCache('action')+"/page_Refresh", Util.getUrlParams());
                var viewdata = epm.get('_common_hidden_viewdata').getValue();
                viewdata = JSON.parse(viewdata);
                viewdata.tabKey = tabkey;
                epm.get('_common_hidden_viewdata').setValue(JSON.stringify(viewdata));
                //epm.get("treeGuid").setUrl(url);
            }
            else {
                url = "pages/workflow/select/"+epointm.getCache('action')+".action?cmd=getTreeOuModel&tabKey=" + tabkey;
                epm.get("treeGuid").setUrl(url.substring(url.lastIndexOf('/') + 1));
            }
            var ajaxData = epm.get('treeGuid').onGetRequestData('false');
            let listNew = oulist.filter(i => i.id == ouguid);
            //面包屑过滤
            if(ouguid && ouguid.indexOf('ou') <0&&ouguid!=''&&listNew.length==0){
                listNew.push({id:ouguid,recureMsg:ouguid,dataType:'ou'});
            }
            let newCommonDto = JSON.parse(ajaxData.commonDto);
            newCommonDto[0].node = listNew[0];
            //二次点击
            if (ouguid.indexOf('ou') < 0) {
                newCommonDto[0].isSecondRequest = true;
            }
            //查询条件
            if (searchContent!="") {
                newCommonDto[0].search_condition = searchContent;
                newCommonDto[0].eventType = '';
            }
            ajaxData.commonDto = JSON.stringify(newCommonDto);
            ajaxData.search_condition=searchContent;
            ajaxData = epm.addReplayAttackData(ajaxData, url);
            extracted(url, ajaxData);
        }
        else {
            var res = epm.get('treeGuid').data;
            res.forEach(function (item, index) {
                if (item.dataType == 'user') {
                    userlist.push(item);
                }
                else {
                    if (item.pid != '')
                        oulist.push(item);
                }
            })
            // 渲染部门节点
            templateRender(oulist, 'ouitem', 'oulist')
            // 渲染用户节点
            templateRender(userlist, 'useritem', 'userlist');
            // 渲染title
            //将title渲染在页面上
            templateRender(titleData, 'titleitem', 'titlelist')
            // 使新增的title-item显示在页面上
            Zepto("#titlelist").scrollLeft(Zepto("#titlelist")[0].scrollWidth);
        }
    }

    /**
     * description: 模板渲染函数
     * param {Array} data 模板渲染所需数据
     * param {String} template  需要渲染的模板id
     * param {String} renderId 需要挂载的模板id
     */
    function templateRender(data, template, renderId) {
        var templateHTML = doc.getElementById(template).innerHTML;
        var html = "";
        data.forEach((item) => {
            html += Mustache.render(templateHTML, item);
        });
        doc.getElementById(renderId).innerHTML = html;
    }
})(document, window.Config, window.Util);
