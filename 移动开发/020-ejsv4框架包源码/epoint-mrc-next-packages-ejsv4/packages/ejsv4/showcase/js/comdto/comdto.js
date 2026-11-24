/**
 * 作者: guotq
 * 时间: 2019-6-18
 * 描述:  定义一些控件
 */
(function (exports, controlMap) {
    "use strict";
    // 每一个页面都要引入的工具类
    // 下拉刷新 PullToRefreshTools 通过脚本引入

    // class与控件的对应关系
    // var controlMap = {};

    var getControlClazz = function (control) {
        var clsName = control.className,
            clazz,
            matchs = clsName.match(/ep-mui-\w*/g);

        if (matchs.length > 0) {
            clazz = controlMap[matchs[0]];
        }

        if (!clazz) {
            console.warn('没有对应的控件类型', control);
        }

        return clazz;

    };

    // 实现对象继承
    function extend(child, parent, proto) {
        var F = function () { };
        F.prototype = parent.prototype;
        child.prototype = new F();
        child.prototype.constructor = child;
        child.super = parent.prototype;

        if (proto) {
            for (var i in proto) {
                child.prototype[i] = proto[i];
            }
        }
    }

    // 注册控件
    function register(control, className) {
        controlMap[className] = control;
    }

    // 控件基类
    var MControl = function (dom) {
        this.el = dom;

        var id = dom.id;
        // 自动生成id
        if (!id) {
            id = epm.generateId();
            dom.id = id;
        }
        this.id = id;

        this._init();
    };

    MControl.prototype = {
        constructor: MControl,

        // 控件初始化
        _init: function () {

        },

        value: '',

        getValue: function () {
            return this.el.value;
        },

        setValue: function (value) {
            this.value = value;
            if (this.el.value !== undefined) {
                this.el.value = value;
            } else {
                this.el.innerText = value;
            }
        },
        // 获取控件的数据模型
        getModule: function () {
            return {
                id: this.id
            };
        },
        getAttribute: function (attrName) {
            return this.el.getAttribute(attrName);
        },
        render: function (parent) {
            if (typeof parent === 'string') {
                if (parent == "#body") {
                    parent = document.body;
                } else {
                    parent = document.getElementById(parent);
                }
            }
            if (!parent) return;

            parent.appendChild(this.el);

            this.el.id = this.id;
        }
    };
    /*情形控件*/
    var ChoiseCase = function (dom) {
        ChoiseCase.super.constructor.call(this, dom);
    };
    extend(ChoiseCase, MControl, {
        type: 'choisecase',
        _init: function () {
            $(this.el).on('click', function () {
                var data = $(this)[0];
                var activityGuid = data.getAttribute("data-name");

                ejs.page.open({
                    pageUrl: 'frame/fmui/showcase/comdto/popwindow.html',
                    data: {
                        pviguid: Util.getExtraDataByKey('ProcessVersionInstanceGuid'),
                        activityGuid: activityGuid,
                    },
                    success: function (data) {
                        epointm.execute("oaauditsformaction.modelAuditMaterial", '@none', function (materialData) {
                            if (materialData) {
                                epm.get('material').setData(
                                    materialData);
                                var json = strToJson(materialData);
                                document.querySelector("#choisecase").setAttribute("data-name", json.activityGuid);
                            }
                        });
                    }
                });
            });
        },
        setValue: function (value) {
            this.el.innerHTML = value || "选择情形";
        },
        getModule: function () {
            return {
                id: this.id,
                type: this.type
            };
        }
    });
    register(ChoiseCase, 'ep-mui-choisecase');

    /*材料控件*/
    var MaterialList = function (dom) {
        MaterialList.super.constructor.call(this, dom);
    };
    extend(MaterialList, MControl, {
        type: 'materiallist',
        _init: function () {
            this.action = this.getAttribute('action');

            /*下载*/
            $(this.el).on('click', '#upload', function () {
                var data = $(this)[0];
                var attachlink = data.getAttribute("data-name");
                var tempdownload = data.getAttribute("data-id");
                if (tempdownload === "1") {
                    if (attachlink) {
                        ejs.page.open(epm.getRootPath() + attachlink);
                    } else {
                        Util.ejs.ui.toast("没有可下载的附件!");
                    }
                }

            });

            /*模板下载*/
            $(this.el).on('click', '#uploadmodel', function () {
                var data = $(this)[0];
                //console.log(data);
                //alert(111);
                var path = data.getAttribute("data-name");
                var materialdownload = data.getAttribute("data-id");
                if (materialdownload === "1") {
                    ejs.page.open(epm.getRootPath() + path);
                    //window.open(epm.getRootPath() + path);
                }
            });

            /*模板上传*/
            $(this.el).on('click', '#import', function () {
                var data = $(this)[0];
                var data2 = $(this).parent().find("span")[2];
                var cliengguids = data.getAttribute("data-name");
                var materialinstanceguid = data.getAttribute("data-guid");
                var pviguid = data.getAttribute("data-value");
                var contenttype = data.getAttribute("data-url");
                var cliengguid = cliengguids.split("cliengguid")[1];
                var imports = data.getAttribute("data-id");
                if (imports == 0) {
                    return;
                }
                document.querySelector('.fileChoose').setAttribute("data-id", cliengguid);
                document.querySelector('.fileChoose').setAttribute("data-guid", materialinstanceguid);
                document.querySelector('.fileChoose').setAttribute("data-value", pviguid);
                document.querySelector('.fileChoose').setAttribute("data-url", contenttype);


                $('.fileChoose').click();
            });
            this.setData();
        },

        _templ: '{{#data}}' +
            '<li class="mui-table-view-cell">' +
            '<div class="em-todo-attach-info" ><img style="width: 50px; float: left" src="{{photo}}" alt="" />' +
            '<div style="height: 30px;"><p style="font-size: 15px;color: #000;" class="em-todo-attach-name name">{{#mobileneed}}<span style=\"color:#F00\">【必要】</span>{{/mobileneed}}{{materialname}}</p></div></div>' +
            '<div style="height: 20px ; float:left">{{#isupload}}<a style="color: #000;font-size: 12px;">已上传</a>{{/isupload}}</div>' +
            '<div style="height: 20px ; float:right">' +
            '<span class="edit-file" id="import"  data-name="{{mobilecliengguid}}" data-id="{{mobileimports}}" data-url="{{contenttype}}" data-guid="{{materialinstanceguid}}" data-value="{{pviguid}}" style="margin-left: 6px;color:blue;font-size: 14px;{{^mobileimports}}color: grey;cursor:not-allowed;{{/mobileimports}}" >上传</span>' +
            '<span class="edit-file" id="uploadmodel" data-name="{{kbmblink}}" data-id="{{mobiletempdownload}}" style="margin-left: 6px;color:blue;font-size: 14px;{{^mobiletempdownload}}color: grey;cursor:not-allowed;{{/mobiletempdownload}}">下载模板</span>' +
            '<span class="edit-file" id="upload" data-name="{{attachlink}}" data-id="{{mobilematerialdownload}}" style="margin-left: 6px;color:blue;font-size: 14px;{{^mobilematerialdownload}}color: grey;cursor:not-allowed;{{/mobilematerialdownload}}">下载</span></div>' +
            '{{/data}}',

        setData: function (data) {
            if (data) {
                var json = strToJson(data);
                var item = '';
                var that = this;

                item += Mustache.render(this._templ, {
                    "data": json.data
                });

                this.el.innerHTML = item;
            }
        },
        setValue: function (value) {
            this.el.innerHTML = value;
        },
        setText: function (text) {
            this.el.innerText = text;
        }
    });

    function strToJson(str) {
        var json = eval('(' + str + ')');
        return json;
    }

    register(MaterialList, 'ep-mui-materiallist');

    //事件基本信息
    var AuditBaseInfo = function (dom) {
        AuditBaseInfo.super.constructor.call(this, dom);
    };
    extend(AuditBaseInfo, MControl, {
        type: 'auditbaseinfo',
        _init: function () {
            this.action = this.getAttribute('action');

            this.setData();
        },
        _templ: '{{#data}}' +
            '<ul class="mui-table-view" style="margin-bottom: 15px;">' +
            '    <li class="mui-input-row" style="text-align: center;">' +
            '        <label style="color:black;width: 100%;">事项基本信息</label>' +
            '    </li>' +
            '    <li class="mui-input-row">' +
            '        <label style="color: black">事项名称:</label>' +
            '        <input  id="taskname" class="ep-mui-textbox"  disabled="disabled" name="taskname" allowInput="false"  type="text" value="{{taskname}}"  />' +
            '    </li>' +
            '    <li class="mui-input-row">' +
            '        <label style="color: black">事项类型：</label>' +
            '        <input  id="taskname" class="ep-mui-textbox"  disabled="disabled" name="taskname"  type="text" value="{{typestr}}"  />' +
            '    </li>' + '    <li class="mui-input-row">' +
            '        <label style="color: black">承诺期限：</label>' +
            '        <input  id="taskname" class="ep-mui-textbox"  disabled="disabled" name="taskname"  type="text" value="{{promise_day}} 工作日"  />' +
            '    </li>' + '    <li class="mui-input-row">' +
            '        <label style="color: black">所属部门：</label>' +
            '        <input  id="taskname" class="ep-mui-textbox"  disabled="disabled" name="taskname"  type="text" value="{{baseouname}}"  />' +
            '    </li>' + '    <li class="mui-input-row">' +
            '        <label style="color: black">办理依据：</label>' +
            '        <label style="width: 100%;margin:0;white-space: pre-wrap">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{acceptcondition}}</label>' +
            '    </li>' + '</ul>' +
            ' {{/data}}',

        setData: function (data) {
            if (data) {
                var json = strToJson(data);
                console.log(json.data);
                var item = '';
                var that = this;

                item += Mustache.render(this._templ, {
                    "data": json.data
                });

                this.el.innerHTML = item;
            }
        },
        setValue: function (value) {
            this.el.innerHTML = value;
        },
        setText: function (text) {
            this.el.innerText = text;
        }
    });
    register(AuditBaseInfo, 'ep-mui-auditbaseinfo');

    /*申报材料*/
    var FilingMaterials = function (dom) {
        FilingMaterials.super.constructor.call(this, dom);
    };

    extend(FilingMaterials, MControl, {
        type: 'filingmaterials',
        _init: function () {
            $(this.el).on('click', '#upload', function () {
                var data = $(this)[0];
                var path = data.getAttribute("data-guid");
                if (path) {
                    ejs.page.open(epm.getRootPath() + path);
                }
                // var materialdownload = data.getAttribute("data-id");
                // if (materialdownload === "1") {
                //     ejs.page.open(epm.getRootPath() + path);
                //     //window.open(epm.getRootPath() + path);
                // }
            });
        },
        _templ: '{{#data}}' +
            '<tr>' +
            '<td><div>' + "{{materialname}}" + '</div></td>' +
            '<td><div>' + '</div></td>' +
            '<td><div>' + '</div></td>' +
            '<td><div>' + "{{elementrelate}}" + '</div></td>' +
            '<td><div style="color:#616dff;text-align: center" id="upload" data-guid="{{downloadlink}}" >' + "下载" + '</div></td>' +
            '</tr>' +
            '{{/data}}',
        setData: function (data) {
            if (data) {
                var json = strToJson(data);
                var item = '';
                item += Mustache.render(this._templ, {
                    "data": json.data
                });


                this.el.innerHTML = '<table style="width: 100%">' +
                    '<tr>' + '<td style="background-color: #e7e7e7;text-align: center"><div style="width: 100px">' + "材料名称" + '</div></td>' +
                    '<td style="background-color: #e7e7e7;text-align: center"><div style="width: 55px">' + "裁量基准" + '</div></td>' +
                    '<td style="background-color: #e7e7e7;text-align: center"><div style="width: 55px">' + "是否容缺" + '</div></td>' +
                    '<td style="background-color: #e7e7e7;text-align: center"><div style="width: 80px">' + "关联情形" + '</div></td>' +
                    '<td style="background-color: #e7e7e7;text-align: center"><div style="width: 70px">' + "模板下载" + '</div></td>' + '</tr>' +
                    item + '</table>';
            }
        },
        setValue: function (value) {
            this.el.innerHTML = value;
        },
        setText: function (text) {
            this.el.innerText = text;
        }
    });

    register(FilingMaterials, 'ep-mui-filingmaterials')


    var TextBox = function (dom) {
        TextBox.super.constructor.call(this, dom);
    };
    extend(TextBox, MControl, {
        type: 'textbox',
        _init: function () {
            this.bind = this.getAttribute('bind');
            this.action = this.getAttribute('action');

            var self = this;
            this.el.addEventListener('input', function (e) {
                self.value = self.el.value;
            });
        },
        getModule: function () {
            return {
                id: this.id,
                type: this.type,
                bind: this.bind,
                action: this.action,
                value: this.value
            };
        }
    });
    register(TextBox, 'ep-mui-textbox');

    var TextArea = function (dom) {
        TextArea.super.constructor.call(this, dom);
    };

    extend(TextArea, TextBox, {
        type: 'textarea'
    });
    register(TextArea, 'ep-mui-textarea');

    var SearchBar = function (dom) {
        SearchBar.super.constructor.call(this, dom);
    };
    extend(SearchBar, MControl, {
        type: 'searchbar',
        _init: function () {
            this.bind = this.getAttribute('bind');

            var onSearch = this.getAttribute('onSearch');
            var self = this;

            this.el.addEventListener('change', function (e) {
                self.value = self.el.value;

                if (window[onSearch] && typeof window[onSearch] === 'function') {
                    window[onSearch](self.value);
                }
            });
        },
        getModule: function () {
            return {
                id: this.id,
                type: this.type,
                bind: this.bind,
                value: this.value
            };
        }
    });
    register(SearchBar, 'ep-mui-searchbar');

    var WebUploader = function (dom) {
        WebUploader.super.constructor.call(this, dom);
    };
    extend(WebUploader, MControl, {
        type: 'webuploader',
        _init: function () {
            this.action = this.getAttribute('action');
            this.url = this.getAttribute('url');
            this.isMulti = this.getAttribute('isMulti') || false;
            this.mapClass = this.getAttribute('mapClass') || 'com.epoint.basic.faces.fileupload.WebUploader';
            this.tplId = this.getAttribute('tplId');
            this.isMulti = epm.parseJSON(this.isMulti);
            this.input = this._createInput();

            if (this.tplId) {
                this.tpl = document.getElementById(this.tplId).innerHTML;
            } else {
                this.tpl = '<li>{{filename}} - 上传成功</li>';
            }

            var self = this;

            this.el.querySelector('.webuploader-button').addEventListener('tap', function () {
                self.input.click();
            });

            this.input.addEventListener('change', function () {
                var files = this.files;
                var data = self.onGetRequestData();
                var filelist = self.el.querySelector('.webuploader-filelist');

                if (filelist.firstElementChild && filelist.firstElementChild.textContent === '暂未上传文件') {
                    filelist.innerHTML = '';
                }

                for (var i = 0, len = files.length; i < len; i++) {
                    var file = files[i],
                        formdata = new FormData(),
                        id = self.id,
                        filename = file.name;

                    self.filetype = file.type;

                    formdata.append('id', id);
                    formdata.append('name', filename);
                    formdata.append('type', file.type);
                    formdata.append('size', file.size);
                    formdata.append('lastModifiedDate', file.lastModifiedDate);
                    formdata.append('file', file);

                    if (data) {
                        formdata.append('commonDto', data.commonDto);
                    }

                    formdata.append(''.concat(id, '_action'), 'upload');
                    formdata.append(''.concat(id, '_fileCount'), files.length);
                    formdata.append(''.concat(id, '_fileLoadedCount'), '0');
                    self._upload(formdata);
                }
            });

            mui(this.el).on('tap', '[data-role="preview"]', function () {
                var el = this;

                while (!(el.dataset.type === 'body')) {
                    el = el.parentElement;
                }
                var dataset = el.dataset,
                    downloadurl = dataset.downloadurl,
                    filetype = dataset.filetype;

                if (filetype.indexOf('image') !== -1) {
                    ejs.util.prevImage({
                        index: 0,
                        selectedPhotos: [epm.dealUrl(downloadurl)],
                        success: function () { }
                    });
                } else {
                    ejs.util.getPreviewUrl({
                        success: function (result) {
                            var previewUrl = result.previewUrl;

                            if (previewUrl.indexOf('?furl') === -1) {
                                Util.ejs.ui.toast('officeweb365地址配置错误，或未配置');
                                return;
                            }

                            ejs.page.open(previewUrl + epm.dealUrl(downloadurl));
                        }
                    });
                }
            });
        },
        _upload: function (formdata) {
            var self = this;
            var tpl = this.tpl;

            Util.ajax({
                url: self.url || self.action,
                data: formdata,
                type: 'post',
                processData: false,
                contentType: false,
                beforeSend: function (XMLHttpRequest) {
                    console.log('准备上传', 'before');
                    Util.ejs.ui.showWaiting();

                    var csrfcookie = epm.getCookie('_CSRFCOOKIE');
                    if (csrfcookie) {
                        XMLHttpRequest.setRequestHeader("CSRFCOOKIE", csrfcookie);
                    }
                },
                success: function (response) {
                    var controls = response.controls,
                        data = controls[0].data,
                        filelist = self.el.querySelector('.webuploader-filelist');

                    if (controls) {
                        var data = controls[0].data,
                            filelist = self.el.querySelector('.webuploader-filelist');

                        data.filetype = self.filetype;
                        filelist.innerHTML += Mustache.render(tpl, data);
                    }
                },
                error: function (xhr, status) {
                    Util.ejs.ui.toast('上传失败');
                    console.error(xhr, status);
                },
                complete: function () {
                    Util.ejs.ui.closeWaiting();
                }
            });
        },
        setUrl: function (url) {
            this.url = url;
        },
        _createInput: function () {
            var input = document.createElement('input');

            input.type = 'file';

            if (this.isMulti) {
                input.multiple = 'multiple';
            }

            return input;
        },
        setData: function (data) {
            var files = data.files;
            var item = '';
            var filelist = this.el.querySelector('.webuploader-filelist');
            var tpl = this.tpl;

            if (Array.isArray(files)) {
                $.each(files, function (i, e) {
                    item += Mustache.render(tpl, e);
                });

                filelist.innerHTML = item;
            }
        },
        getModule: function () {
            return {
                id: this.id,
                type: this.type,
                mapClass: this.mapClass,
                action: this.action
            };
        }
    });
    register(WebUploader, 'ep-mui-webuploader');

    var SelectContact = function (dom) {
        SelectContact.super.constructor.call(this, dom);
    };

    extend(SelectContact, MControl, {
        type: 'treeselect-non-nested',
        _init: function () {
            var self = this;

            this.bind = this.getAttribute('bind');
            this.action = this.getAttribute('action');
            this.isouonly = this.getAttribute('isouonly') || false; // 是否仅选择部门

            if (this.action) {
                this.url = epm.getRightUrl(epm.dealUrl(this.action, true));
            }

            this.value = '';
            this.text = '';
            this.el.addEventListener('tap', function () {
                var userguids = null;
                var usernames = null;
                var selectedusers = [];

                if (self.value && self.text) {
                    userguids = self.value.split(',');
                    usernames = self.value.split(',');
                }

                $.each(userguids, function (i, e) {
                    selectedusers.push({
                        userguid: e,
                        username: usernames[i]
                    });
                });

                ejs.util.invokePluginApi({
                    path: 'workplatform.provider.openNewPage',
                    dataMap: {
                        method: 'goSelectPerson',
                        selectedusers: selectedusers,
                        issingle: 0,
                        isouonly: self.isouonly ? 1 : 0
                    },
                    f9action: self.action,
                    f9userdata: self.data,
                    f9controlid: self.id,
                    success: function (result) {
                        var value = '',
                            text = '';

                        self.value = '';
                        self.text = '';
                        self.el.innerHTML = '';

                        // 如果只选择了部门
                        if (self.isouonly) {
                            result.ouData.forEach(function (e, i) {
                                value += e.ouguid + ',';
                                text += e.ouname + ',';
                            });
                        } else {
                            result.resultData.forEach(function (e, i) {
                                value += e.userguid + ',';
                                text += e.username + ',';
                            });
                        }

                        self.value = epm.delsemiforstring(value, ',');
                        self.setText(epm.delsemiforstring(text, ','));
                    }
                });
            });
        },
        setData: function (data) {
            this.data = data;
        },
        setValue: function (value) {
            this.value = value;
        },
        setText: function (text) {
            var textArr = text.split(',');
            var item = '';
            var self = this;

            if (textArr.length >= 1 && textArr[0]) {
                textArr.forEach(function (e) {
                    item += Mustache.render(self._templ, {
                        username: e
                    });
                });

                self.el.innerHTML = item;
            } else {
                self.el.innerHTML = '请选择人员';
            }

            this.text = text;
        },
        _templ: '<span class="mui-badge mui-badge-primary mr10">{{username}}</span>',
        getModule: function () {
            return {
                id: this.id,
                url: this.url,
                type: this.type,
                action: this.action,
                idField: "id",
                textField: "text",
                imgField: "img",
                iconField: "iconCls",
                parentField: "pid",
                valueField: "id",
                pinyinField: "tag",
                value: this.value,
                text: this.text
            };
        }
    });

    register(SelectContact, 'ep-mui-selectcontact');

    // TODO: treeSelect
    var TreeSelect = function (dom) {
        TreeSelect.super.constructor.call(this, dom);
    };

    extend(TreeSelect, MControl, {
        type: 'treeselect-non-nested',
        _init: function () {
            this.bind = this.getAttribute('bind');
            this.action = this.getAttribute('action');
            this.treeTpl = this.getAttribute('treetpl') || './tree.tpl';
            this.multiselect = eval(this.getAttribute('multiselect'));
            this.confirmCallback = this.getAttribute('confirmcallback');
            this.insertText = this.getAttribute('inserttext');
            this.url = this.getAttribute('url');

            if (typeof this.insertText === 'string') {
                this.insertText = eval(this.insertText);
            } else {
                this.insertText = true;
            }

            if (this.url) {
                this.url = epm.getRightUrl(epm.dealUrl(this.url));
            } else {
                this.url = epm.getRightUrl(epm.dealUrl(this.action));
            }

            this.rootName = this.getAttribute('rootname') || '根';
            var self = this;

            // 如果是多选
            if (this.multiselect) {
                this._dirTempl = [
                    '<div class="mui-input-row mui-checkbox mui-left tree-con-item dir" data-id="{{id}}" data-text="{{text}}" data-issubnode="{{isSubNode}}">',
                    '  <span>{{text}}</span>',
                    '  <input name="checkbox" {{#cls}}class="hidden"{{/cls}} type="checkbox" {{#checked}}checked{{/checked}} />',
                    '</div>'
                ].join('');

                this._templ = [
                    '<div class="mui-input-row mui-checkbox mui-left tree-con-item tree-item-node" data-id="{{id}}" data-text="{{text}}" data-issubnode="{{isSubNode}}">',
                    '  <label>{{text}}</label>',
                    '  <input name="checkbox" type="checkbox" {{#checked}}checked{{/checked}} />',
                    '</div>'
                ].join('');
            } else {
                this._dirTempl = [
                    '<div class="mui-input-row mui-radio mui-left tree-con-item dir" data-id="{{id}}" data-text="{{text}}" data-issubnode="{{isSubNode}}">',
                    '  <span>{{text}}</span>',
                    '  <input {{#cls}}class="hidden"{{/cls}} name="radio" type="radio" {{#checked}}checked{{/checked}} />',
                    '</div>'
                ].join('');

                this._templ = [
                    '<div class="mui-input-row mui-radio mui-left tree-con-item tree-item-node" data-id="{{id}}" data-text="{{text}}" data-issubnode="{{isSubNode}}">',
                    '  <label>{{text}}</label>',
                    '  <input name="radio" type="radio" {{#checked}}checked{{/checked}} />',
                    '</div>'
                ].join('');
            }

            this._breadcrumbsTempl = '<a class="tree-breadcrumbs-item" data-id="{{nodeId}}">{{breadcrumbsName}}</a>';
            this.el.addEventListener('tap', function () {
                $(self.container).find('.tree-breadcrumbs-items').html(Mustache.render(self._breadcrumbsTempl, {
                    breadcrumbsName: self.rootName,
                    nodeId: ''
                }));

                self.showTree();
                self._render(self.initData);
                window.history.pushState({}, '', '#treeselect');
            });

            // 监听 history 状态，关闭树控件
            window.onpopstate = function (e) {
                self.hideTree();
            };
        },
        showTree: function () {
            $(this.container).removeClass('hidden');
        },
        hideTree: function () {
            $.each($('.epm-tree-container'), function (i, e) {
                e.classList.add('hidden');
            });
        },
        _createTreeContainer: function () {
            var el = document.createElement('div');

            el.id = 'epm-tree-' + epm.generateId();
            el.className = 'hidden epm-tree-container';

            document.body.appendChild(el);
            this.container = el;
            this.loadTemplate();
        },
        loadTemplate: function () {
            var container = this.container;
            var self = this;

            $(container).load(this.treeTpl, function () {
                // 初始化滚动条
                mui('.mui-scroll-wrapper').scroll({
                    scrollY: false,
                    scrollX: true
                });

                self._bindTreeListener();
            });
        },
        _bindTreeListener: function () {
            var $breadcrumbsItems = $(this.container).find('.tree-breadcrumbs-items');
            var self = this;

            // 点击 tree dir
            $(this.container).on('tap', '.tree-con-item', function () {
                // 点击目录状态
                var $this = $(this);
                var issubnode = $this.data('issubnode');
                var id = $this.data('id');
                var text = $this.data('text');
                var isMultiselect = self.multiselect;

                issubnode = Boolean(issubnode);

                // 点击的如果是目录的话插入 history 记录、生成面包屑导航，并且请求相关接口
                if ($this.hasClass('dir')) {
                    var preChecked = $this.find('input').prop('checked');

                    setTimeout(function () {
                        var checked = $this.find('input').prop('checked');
                        var isCheckedDir = false;

                        // 如果前后两次一样，说明点击的是文件夹，需要渲染子集，并且插入浏览记录、渲染面包屑
                        if (preChecked == checked) {
                            $breadcrumbsItems.html($breadcrumbsItems.html() + Mustache.render(self._breadcrumbsTempl, {
                                breadcrumbsName: text,
                                nodeId: id
                            }));

                            self.getTreeData(id, checked, isCheckedDir);
                        } else if (isMultiselect) {
                            isCheckedDir = true;
                            self.getTreeData(id, checked, isCheckedDir);
                        } else {
                            self.value = id;
                            self.text = text;
                        }
                    }, 50);
                } else {
                    // 判断当前是否重复选择，如果在 self.value 中有的话，再次点击代表删除
                    if (self.value.length >= 1 && isMultiselect) {
                        if (self.value.indexOf(id) !== -1) {
                            var valueArr = self.value.split(',');
                            var textArr = self.text.split(',');
                            var index = valueArr.indexOf(id);

                            valueArr.splice(index, 1);
                            textArr.splice(index, 1);
                            self.value = valueArr.join(',');
                            self.text = textArr.join(',');
                        } else {
                            self.value += ',' + id;
                            self.text += ',' + text;
                        }
                    } else {
                        self.value = id;
                        self.text = text;
                    }
                }

            }).on('tap', '.tree-confirm', function () {
                // 点击确认按钮关闭选人控件
                self.setText(self.text);
                self.setValue(self.value);
                self.hideTree();

                var confirmCallback = self.confirmCallback;
                var callback = window[confirmCallback];

                if (callback && typeof callback === 'function') {
                    callback();
                }
            });

            // 点击面包屑
            $breadcrumbsItems.on('tap', '.tree-breadcrumbs-item', function () {
                var $this = $(this);
                var id = $this.data('id');

                if (!$this.next().get(0)) {
                    return;
                }

                !id ? self._render(self.initData) : self.getTreeData(id, false);
                self._removeNextSiblings(this);
            });
        },
        getTreeData: function (nodeId, checkState, isCheckedDir) {
            var data = this.data;
            var self = this;

            // 根据 NODEID 添加节点
            for (var i = 0, len = data.length; i < len; i++) {
                var item = data[i];

                if (item.id === nodeId) {
                    item.checked = checkState;
                    this.node = item;
                    break;
                }
            }

            // https://www.easy-mock.com/mock/5cb6ca44f6c8be4af31ae04d/mock/getTreeOuModel
            // https://www.easy-mock.com/mock/5cb6ca44f6c8be4af31ae04d/mock/getSingleTreeModule
            // epm.isMock ? this.action : this.url
            Util.ajax({
                url: epm.isMock ? this.action : this.url,
                type: 'post',
                dataType: 'json',
                contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
                data: this.onGetRequestData(isCheckedDir),
                beforeSend: function () {
                    ejs.ui.showWaiting();
                },
                success: function (response) {
                    var control = response.controls[0];
                    var data = control.data;

                    // 如果 data 是数组，说明当前目录被展开了
                    if (data && Array.isArray(data) && data.length >= 1) {
                        self._render(data);
                        self.data = self.data.concat(data);
                    }
                },
                error: function (xhr) {
                    console.error(xhr);
                    console.error('获取下拉树失败');
                },
                complete: function () {
                    ejs.ui.closeWaiting();
                }
            });
        },
        _render: function (data) {
            var dirItem = '';
            var item = '';
            var self = this;
            var value = self.value;

            $.each(data, function (i, e) {
                e.cls = e.ckr ? '' : 'hidden';
                e.checked = value.indexOf(e.id) !== -1 ? true : false;

                if (!e.isLeaf) {
                    dirItem += Mustache.render(self._dirTempl, e);
                } else {
                    item += Mustache.render(self._templ, e);
                }
            });

            $(this.container).find('.tree-con-items').html(dirItem + item);
        },
        _renderBreadcrumbs: function (nodeText) {
            var $treeBreadcrumbsItem = $(this.container).find('.tree-breadcrumbs-item');
            var self = this;

            if ($treeBreadcrumbsItem && $treeBreadcrumbsItem.length >= 1) {
                for (var i = 0, len = $treeBreadcrumbsItem.length; i < len; i++) {
                    var item = $treeBreadcrumbsItem[i];

                    if (item.textContent == nodeText) {
                        self._removeNextSiblings(item);
                        break;
                    }
                }
            }
        },
        _removeNextSiblings: function (el) {
            var $el = $(el);
            var $next = $el.next();

            if ($next.get(0)) {
                $next.remove();
                this._removeNextSiblings(el);
            }
        },
        setValue: function (value) {
            this.value = value;
        },
        setText: function (text) {
            this.text = text;
            var el = this.el;

            if (this.insertText) {
                var tagName = el.tagName;

                if (tagName === 'INPUT' || tagName === 'TEXTAREA') {
                    el.value = text;
                } else {
                    el.innerHTML = text;
                }
            }
        },
        setData: function (data) {
            this.data = JSON.parse(JSON.stringify(data));
            this.initData = JSON.parse(JSON.stringify(data));

            // 生成容器
            this._createTreeContainer();
        },
        getModule: function () {
            return {
                id: this.id,
                bind: this.bind,
                url: this.url,
                type: this.type,
                action: this.action,
                idField: "id",
                textField: "text",
                imgField: "img",
                iconField: "iconCls",
                parentField: "pid",
                valueField: "id",
                pinyinField: "tag",
                value: this.value,
                text: this.text,
                node: this.node
            };
        }
    });

    register(TreeSelect, 'ep-mui-treeselect');

    var DatePicker = function (dom) {
        DatePicker.super.constructor.call(this, dom);
    };

    extend(DatePicker, MControl, {
        _init: function () {
            var optionsJson = this.getAttribute('data-options') || '{}';
            var options = epm.parseJSON(optionsJson);

            if (options.beginDate) {
                options.beginDate = new Date(options.beginDate);
            }
            if (options.endDate) {
                options.endDate = new Date(options.endDate);
            }

            this.format = options.format || this.getAttribute('format') || 'yyyy-MM-dd';
            this.bind = this.getAttribute('bind');

            var self = this;

            this.el.addEventListener('tap', function () {
                var picker = new mui.DtPicker(options);
                picker.show(function (rs) {
                    self.setValue(rs.text);
                    picker.dispose();
                });
            }, false);
        },
        type: 'datepicker',
        getModule: function () {
            return {
                id: this.id,
                type: this.type,
                bind: this.bind,
                format: this.format,
                value: this.value
            };
        }
    });
    register(DatePicker, 'ep-mui-datepicker');

    var ComboBox = function (dom) {
        ComboBox.super.constructor.call(this, dom);
    };

    extend(ComboBox, MControl, {
        type: 'combobox',
        _init: function () {
            var data = this.getAttribute('data');
            var onchange = this.getAttribute('onchange');

            this.bind = this.getAttribute('bind');
            this.action = this.getAttribute('action');

            var self = this;
            // 客户端设置数据源
            if (data) {
                data = epm.parseJSON(data);
                this.data = data;
            }

            this.el.addEventListener('tap', function (event) {
                ejs.ui.popPicker({
                    layer: 1,
                    data: self.data,
                    success: function (result) {
                        var item = result.items[0];
                        var text = item.text;
                        var value = item.value;

                        if (window[onchange] && typeof window[onchange] === 'function') {
                            window[onchange](text, value, self);
                            self.text = text;
                            self.value = value;
                        } else {
                            self.setValue(value);
                            self.setText(text);
                        }
                    },
                    error: function (err) { }
                });
            }, false);
        },
        getText: function () {
            return this.text;
        },
        setValue: function (value) {
            this.value = value;
        },
        setText: function (text) {
            var tagName = this.el.tagName;

            if (tagName == 'INPUT' || tagName == 'TEXTAREA') {
                this.el.value = text;
            } else {
                this.el.innerHTML = text;
            }

            this.text = text;
        },
        setData: function (data) {
            var result = [],
                value = this.value,
                self = this;

            if (Array.isArray(data)) {
                data.forEach(function (e, i) {
                    var text = e.text,
                        id = e.id;

                    if (value == id) {
                        self.setText(text);
                    }

                    result.push({
                        text: text,
                        value: id
                    });
                });
            }

            this.data = result;
        },
        getValue: function () {
            return this.value;
        },
        getData: function () {
            return this.data;
        },
        getModule: function () {
            return {
                id: this.id,
                type: this.type,
                bind: this.bind,
                action: this.action,
                value: this.value,
                text: this.text,
                textField: 'text',
                valueField: 'id',
                pinyinField: 'tag',
                columns: []
            };
        }
    });
    register(ComboBox, 'ep-mui-combobox');

    var RadioButtonList = function (dom) {
        RadioButtonList.super.constructor.call(this, dom);
    };

    extend(RadioButtonList, MControl, {
        type: 'radiobuttonlist',
        _init: function () {
            var data = this.getAttribute('data');
            this.bind = this.getAttribute('bind');
            this.action = this.getAttribute('action');

            // 客户端设置数据源
            if (data) {
                data = epm.parseJSON(data);
                this.setData(data);
            }
        },
        _templ: '<div class="mui-input-row mui-radio"><label>{{text}}</label><input type="radio" name="{{name}}" value="{{value}}" {{#checked}}checked="checked"{{/checked}}></div>',
        setData: function (data) {
            var html = [];
            var val = this.value;

            for (var i = 0, l = data.length; i < l; i++) {
                if (val && val === data[i].value) {
                    data[i].checked = true;
                }
                data[i].name = this.id;
                html.push(Mustache.render(this._templ, data[i]));
            }
            this.el.innerHTML = html.join('');
            this.radios = mui('input[type="radio"]', this.el);

            // 绑定radio的change事件，保证value与radio的值一致
            var self = this;
            this.radios.each(function (index, item) {
                item.addEventListener('change', function (e) {
                    self.value = e.target.value;
                });
            });
        },
        setValue: function (value) {
            this.value = value;

            var self = this;

            setTimeout(function () {
                if (self.radios) {
                    var radios = self.radios;

                    for (var i = 0, l = radios.length; i < l; i++) {
                        if (radios[i].value == value) {
                            radios[i].checked = true;
                            break;
                        }
                    }
                }
            }, 200);
        },
        getModule: function () {
            return {
                id: this.id,
                type: this.type,
                bind: this.bind,
                action: this.action,
                value: this.value
            };
        }
    });
    register(RadioButtonList, 'ep-mui-radiobuttonlist');

    var CheckboxList = function (dom) {
        CheckboxList.super.constructor.call(this, dom);
    };

    extend(CheckboxList, RadioButtonList, {
        type: 'checkboxlist',
        _templ: '<div class="mui-input-row mui-checkbox"><label>{{text}}</label><input type="checkbox" value="{{value}}" {{#checked}}checked="checked"{{/checked}}></div>',
        setData: function (data) {
            var html = [];
            var val = this.value;

            if (val) {
                val = ',' + val + ',';
            }

            for (var i = 0, l = data.length; i < l; i++) {
                if (val && val.indexOf(',' + data[i].value + ',') > -1) {
                    data[i].checked = true;
                }
                html.push(Mustache.render(this._templ, data[i]));
            }
            this.el.innerHTML = html.join('');
            this.checkboxs = mui('input[type="checkbox"]', this.el);

            // 绑定checkbox的change事件，保证value与checkbox的值一致
            var self = this;
            this.checkboxs.each(function (index, item) {
                item.addEventListener('change', function (e) {
                    var target = e.target,
                        value;

                    if (target.checked) {
                        if (self.value) {
                            self.value += ',';
                        }

                        self.value += target.value;
                    } else {
                        value = ',' + self.value + ',';
                        value = value.replace(',' + target.value + ',', ',');
                        self.value = value.substr(1, value.length - 2);
                    }
                });
            });
        },
        setValue: function (value) {
            this.value = value;
            value = ',' + value + ',';

            var self = this;
            setTimeout(function () {
                if (self.checkboxs) {
                    var checkboxs = self.checkboxs;
                    for (var i = 0, l = checkboxs.length; i < l; i++) {
                        if (value.indexOf(checkboxs[i].value) > -1) {
                            checkboxs[i].checked = true;
                        }
                    }
                }
            }, 200);
        }
    });
    register(CheckboxList, 'ep-mui-checkboxlist');

    var Hidden = function (dom) {
        Hidden.super.constructor.call(this, dom);
    };
    extend(Hidden, MControl, {
        type: 'hidden',
        _init: function () {
            this.bind = this.getAttribute('bind');
        },
        setValue: function (value) {
            this.value = value;
        },
        getModule: function () {
            return {
                id: this.id,
                bind: this.bind,
                type: this.type,
                value: this.value
            }
        }
    });
    register(Hidden, 'ep-mui-hidden');

    var OutputText = function (dom) {
        OutputText.super.constructor.call(this, dom);
    };
    extend(OutputText, MControl, {
        type: 'outputtext',
        _init: function () {
            this.bind = this.getAttribute('bind');
            this.options = this.getAttribute('data-options');
            if (this.options) {
                this.options = epm.parseJSON(this.options);
            }
        },
        setValue: function (value) {
            this.value = value;
            this.el.innerHTML = value;
        },
        getModule: function () {
            // 展示类的控件，不需要把value传回后台
            return {
                id: this.id,
                type: this.type,
                bind: this.bind,
                dataOptions: this.options
            };
        }
    });
    register(OutputText, 'ep-mui-outputtext');

    var WorkFlowHistory = function (dom) {
        WorkFlowHistory.super.constructor.call(this, dom);
    };
    extend(WorkFlowHistory, MControl, {
        type: 'workflowhistory',
        _init: function () {
            this.action = this.getAttribute('action');
        },
        setData: function (data) {
            this.data = typeof data === 'string' ? JSON.parse(data) : data;
            this.renderHistory();
        },
        renderHistory: function () {
            var data = this.data.data;
            var _tpl = this._templ;
            var item = '';

            if (Array.isArray(data)) {
                var rootPath = epm.getRootPath();

                this.el.innerHTML = '';

                data.forEach(function (e) {
                    e.photoUrl = rootPath + 'rest/readpictureaction/getUserPicture?isCommondto=true&userGuid=' + e.adduserguid + '&isMobile=true&md5=';
                    item += Mustache.render(_tpl, e);
                });

                this.el.innerHTML = item;
                this._setDefaultImg();
            }
        },
        _setDefaultImg: function () {
            $.each($('.timeline-photo img'), function (i, e) {
                e.onerror = setDefaultImg;
            });
        },
        _templ: '<div class="em-timeline"><div class="em-timeline-item"><div class="em-timeline-node"></div><div class="em-timeline-panel"><div class="timeline-photo"><img src="{{photoUrl}}" alt=""></div><div class="em-timeline-title clearfix"><div class="timeline-name l">{{addusername}}</div><div class="timeline-activityname r">{{activityname}}</div></div><p class="em-timeline-content">{{opiniontext}}</p></div></div><span class="em-timeline-date">{{opiniondate}}</span></div>',
        getModule: function () {
            // 展示类的控件，不需要把value传回后台
            return {
                id: this.id,
                type: this.type,
                action: this.action
            };
        }
    });
    register(WorkFlowHistory, 'ep-mui-workflowhistory');

    var WorkFlowAttach = function (dom) {
        WorkFlowAttach.super.constructor.call(this, dom);
    };
    extend(WorkFlowAttach, MControl, {
        type: 'workflowattach',
        _init: function () {
            this.onitemclick = this.getAttribute('onitemclick');
            this.action = this.getAttribute('action');

            var self = this;

            mui(this.el).on('tap', '.download', function () {
                var itemClick = window[self.onitemclick];

                if (itemClick && typeof itemClick === 'function') {
                    itemClick(self.el, this.getAttribute('materialguid'), this.getAttribute('materialname'));
                }
            });
        },
        setData: function (data) {
            this.data = typeof data === 'string' ? JSON.parse(data) : data;
            this._renderAttach();
        },
        _renderAttach: function () {
            var data = this.data.data;
            var _tpl = this._templ;
            var item = '';

            if (Array.isArray(data)) {
                data.forEach(function (e) {
                    item += Mustache.render(_tpl, e);
                });

                this.el.innerHTML = '<ul class="mui-table-view">' + item + '</ul>';
            }
        },
        _templ: '<li class="mui-table-view-cell clearfix"><div class="l"><div class="attach-name">{{materialname}}</div><p class="hidden">更新时间 | 文件大小</p></div><div class="download r" materialname="{{materialname}}" materialguid="{{materialguid}}"><img src="./images/img_download.png" alt=""></div></li>',
        getModule: function () {
            // 展示类的控件，不需要把value传回后台
            return {
                id: this.id,
                type: this.type,
                action: this.action
            };
        }
    });
    register(WorkFlowAttach, 'ep-mui-workflowattach');

    var HandleControls = function (dom) {
        HandleControls.super.constructor.call(this, dom);
    };
    extend(HandleControls, MControl, {
        type: 'handlecontrols',
        _init: function () {
            this.action = this.getAttribute('action');
            this.workflowPageUrl = this.getAttribute('workflowpageurl') || '';
            this.submitBefore = this.getAttribute('submitbefore');
            this.pviGuid = '';
            this.operationGuid = '';
            this.transitionGuid = '';
            this.workitemGuid = '';
            this.afterbtn = null;
        },
        setData: function (data) {
            data = typeof data === 'string' ? JSON.parse(data) : data;
            this.data = data;
            this.lockStatus = false;  // 流程是否被锁定，锁定则无法点击右上角

            var workitemGuid = data.workitemguid || Util.getExtraDataByKey('WorkItemGuid');
            var pviguid = data.pviguid || Util.getExtraDataByKey('ProcessVersionInstanceGuid');
            var messageitemguid = Util.getExtraDataByKey('MessageItemGuid') || '';
            var self = this;

            this.workitemGuid = workitemGuid;
            this.pviGuid = pviguid;
            this.messageitemguid = messageitemguid;

            // 按钮操作集合
            this.btns = data.btn;
            this.acthtml = data.acthtml || '提交';

            if (data.lockdttm) {
                Util.ejs.ui.alert('当前流程已锁定');
                this.lockStatus = true;
                self.setControlsDisabled();
            } else {
                // 如果是 ejs 环境
                if (ejs.os.ejs) {
                    // 获取当前权限
                    this.getPermissions(function (canhandle) {
                        self.canhandle = canhandle;

                        // 1 可以处理；0 不可以处理；-1 能看不能处理
                        if (canhandle == 0) {
                            Util.ejs.ui.alert({
                                title: '提示',
                                message: '请在PC端处理',
                                buttonName: '确定',
                                success: function () {
                                    ejs.page.close();
                                }
                            });
                        } else if (canhandle == -1) {
                            self.setControlsDisabled();
                        } else {
                            // TODO: 如果有 送下一步按钮，则代表待办，否则为已办
                            if (self.btns.length > 0) {
                                // 设置右侧按钮
                                self.setRightBtn(true);
                            }
                        }
                    });
                } else {
                    if (self.btns.length > 0) {
                        // 设置右侧按钮
                        this.canhandle = 1;
                        self.setRightBtn(true);
                    }
                }

                if (data && data.message) {
                    Util.ejs.ui.toast(data.message);
                    return;
                }
            }
        },
        setControlsDisabled: function () {
            var controls = mui('[class*="ep-mui-"]');

            $.each(controls, function (i, e) {
                var tagName = e.tagName;

                switch (tagName) {
                    case 'INPUT':
                    case 'TEXTAREA':
                        e.disabled = true;
                        break;

                    case 'DIV':
                        e.style.cssText = 'pointer-events: none;';
                        break;
                }
            });
        },
        getPermissions: function (callback) {
            var self = this;

            ejs.storage.getBusinessRestUrl({
                success: function (result) {
                    var url = result['business-rest-url'] + 'handledetail_base_v7';

                    Util.ajax({
                        url: url,
                        data: {
                            params: JSON.stringify({
                                messageitemguid: self.messageitemguid,
                                'pviguid': self.pviguid,
                                'type': 1,
                                'filetype': ''
                            })
                        },
                        success: function (result) {
                            console.log(result);
                            if (callback && typeof callback === 'function') {
                                callback(result.custom.canhandle);
                            }
                        },
                        error: function (err) {
                            Util.ejs.ui.toast(url + ' 接口请求失败');
                        }
                    });
                },
                error: function () { }
            });
        },
        setRightBtn: function (isShow) {
            var self = this;

            // TODO: 如果当前流程被锁定或者无权限处理，直接返回
            if (this.lockStatus || this.canhandle != '1') {
                return;
            }

            ejs.navigator.setRightBtn({
                isShow: isShow ? 1 : 0,
                text: this.acthtml,
                success: function () {
                    var submitBefore = window[self.submitBefore];

                    if (submitBefore && typeof submitBefore === 'function') {
                        submitBefore(function () {
                            self.showActionSheet();
                        });
                    } else {
                        self.showActionSheet();
                    }
                }
            });
        },
        showActionSheet: function () {
            var self = this;
            var btns = [];

            this.btns.map(function (e) {
                if (e.operationtype !== 'Custom') {
                    btns.push(e);
                }
            });

            ejs.ui.actionSheet({
                items: btns.map(function (e) {
                    return e.text;
                }),
                success: function (result) {
                    // 先提交表单，然后在送下一步
                    epointm.execute('submit', '', function () {
                        var btn = btns[result.which];

                        self.btn = btn;
                        self.AjaxOperation(btn.operationguid, btn.transitionguid, btn.operationtype, btn.beforeact, btn.afteract, btn.isrequireopinion);
                    });
                }
            });
        },
        AjaxOperation: function (OperationGuid, TransitionGuid, OperationType, btnbefore,
            btnafter, isrequireopinion) {
            this.operationGuid = OperationGuid;
            this.transitionGuid = TransitionGuid;
            this.afterbtn = btnafter;

            var batchHandleGuid = null;

            try {
                batchHandleGuid = document.getElementById('hidIsBatchHandle').value;
            } catch (error) { }

            if (btnbefore) {
                try {
                    var btnSubmit = null;

                    if (batchHandleGuid) {
                        btnSubmit = this.getButton(batchHandleGuid);
                    } else {
                        btnSubmit = getButton(btnbefore);
                    }

                    if (btnSubmit) {
                        btnSubmit.click();
                    }
                } catch (error) {
                    this.HandleNextStep(OperationGuid, TransitionGuid, OperationType,
                        btnbefore, btnafter);
                }
            } else {
                this.HandleNextStep(OperationGuid, TransitionGuid, OperationType,
                    btnbefore, btnafter);
            }
        },
        HandleNextStep: function (OperationGuid, TransitionGuid, OperationType,
            btnbefore, btnafter) {
            this.ShowTdOperate(false);
            var batchHandleGuid = null;
            var self = this;

            try {
                batchHandleGuid = document.getElementById('hidIsBatchHandle').value;
            } catch (error) { }

            if (OperationType === 'Save' || OperationType == 60) {
                var btnId = 'btnSaveFrom';

                if (batchHandleGuid != null && batchHandleGuid != "") {
                    btnId = 'btnSaveBatchHandle';
                }
                try {
                    var saveBtn = this.getButton(btnId);
                    if (saveBtn != null) {
                        saveBtn.click();
                    } else {
                        this.HeaderSubmit();
                    }
                } catch (er) {
                    this.HeaderSubmit();
                }
            } else if (OperationType == "Custom" || OperationType == 1) {
                eval(btnafter);
            } else if (OperationType == "Pass" || OperationType == "Pass_Transition" ||
                OperationType == 10 || OperationType == 15) {
                // 先执行个性化的业务逻辑
                var btnId = 'btnSubmit';
                if (batchHandleGuid) {
                    btnId = 'btnSubmitBatchHandle';
                }

                try {
                    var btnSubmit = this.getButton(btnId);
                    if (btnSubmit != null) {
                        btnSubmit.click();
                    } else {
                        this.HeaderSubmit();
                    }
                } catch (err) {
                    this.HeaderSubmit();
                }
            } else if (OperationType == "DrawBack" || OperationType == 50) {
                ejs.ui.confirm({
                    message: '确认收回已发待办事项？',
                    buttonLabels: ['取消', '确定'],
                    success: function (result) {
                        // 点击确定
                        if (result.which == 1) {
                            self.HeaderSubmit();
                        } else {
                            self.ShowTdOperate(true);
                        }
                    }
                });
            } else {
                this.HeaderSubmit();
            }
        },
        HeaderSubmit: function () {
            var self = this;

            this.transitionGuid = this.transitionGuid || '';

            var params = {
                transitionguid: this.transitionGuid,
                operationguid: this.operationGuid,
                pviguid: this.pviGuid,
                workitemguid: this.workitemGuid
            };

            epointm.execute('getPageUrlOfOperate', '@none', epm.encodeUtf8(epm.encodeJson(params)), self.AjaxOperationHd.bind(self));
        },
        // 通用的ajax方法返回结果处理
        AjaxOperationHd: function (response) {
            var self = this;

            if (response) {
                var response = epm.decodeJson(response);

                if (response.isdefoperation) {
                    var operationname = "送下一步";

                    if (response.operationname) {
                        operationname = response.operationname;
                    }

                    ejs.ui.confirm({
                        message: '确认执行' + operationname + '操作？',
                        buttonLabels: ['取消', '确定'],
                        success: function (result) {
                            if (result.which == 1) {
                                epointm.execute("getoperate", "@none", epm.encodeUtf8(epm
                                    .encodeJson(response)), self.AjaxOperationHd.bind(self));
                            } else {
                                self.ShowTdOperate(true);
                            }
                        }
                    });
                } else if (response.url) { // 返回url需要打开操作处理页面
                    // url: frame/pages/epointworkflow/client/commonoperationhandlepassopinion?workItemGuid=e45d1a78-de8e-4c41-a448-679463efd049&operationGuid=7327f758-4f81-4c34-bb20-919bf795e653&processVersionInstanceGuid=a85eb358-03c7-4cce-957a-6173bdb857fd&stepguid=e01ae006-76bb-448a-855f-a31a874666e8&transitionGuid=
                    var url = response.url;

                    ejs.page.open({
                        pageUrl: this.workflowPageUrl + url.substring(url.indexOf('?')) + '&operationtype=' + self.btn.operationtype,
                        success: function (result) {
                            if (result && result.resultData.message) {
                                self.ShowTdOperate(false);
                                self.DefaultOperateHd(result.resultData.message);
                            } else {
                                self.ShowTdOperate(true);
                            }
                        }
                    });
                } else if (response.operationtype &&
                    (response.operationtype == 25 || response.operationtype == "SendToSign")
                        (!response.message || response.message == "Success")) {

                    this.AfterClick();
                    this.ShowTdOperate(true);
                } else if (!response.message || response.message == "Success") {
                    this.AfterClick();

                    ejs.ui.confirm({
                        title: '流程处理',
                        message: '处理完成是否关闭页面',
                        success: function (result) {
                            if (result.which == 1) {
                                self.CloseMe();
                            }
                        }
                    });
                } else if (response.message) {
                    Util.ejs.ui.alert(response.message);
                    this.ShowTdOperate(true);
                }
            } else {
                this.ShowTdOperate(true);
            }
        },
        DefaultOperateHd: function (json) {
            epointm.execute("getoperate", "@none", epm.encodeUtf8(epm.encodeJson(json)),
                this.AjaxOperationHd.bind(this));
        },
        beforeUnlock: function () {
            var workitemGuid = this.workitemGuid;
            var pviGuid = this.pviGuid;

            if (workitemGuid && pviGuid) {
                epointm.execute("workItem_Unlock", "@none", [pviGuid, workitemGuid, "norm"], this.UnlockCallBack);
            }
        },
        UnlockCallBack: function (msg) {
            try {
                if (msg && msg == "refresh") {
                    epointm.refresh();
                }
                if (msg.message && msg.message == "refresh") {
                    epointm.refresh();
                }
            } catch (err) { }
        },
        AfterClick: function () {
            var afterbtn = this.afterbtn;

            if (afterbtn) {
                try {
                    var btnSubmit = this.getButton(afterbtn);
                    if (btnSubmit != null) {
                        btnSubmit.click();
                    }
                } catch (err) { }
            }
        },
        // 按钮区域的显隐控制
        ShowTdOperate: function (Is_Show) {
            if (Is_Show) {
                this.setRightBtn(true);
            } else {
                this.setRightBtn(false);
            }
        },
        CloseMe: function () {
            ejs.page.close();
        },
        getButton: function (id) {
            return document.querySelector('#' + id);
        },
        getModule: function () {
            return {
                id: this.id,
                type: this.type,
                action: this.action
            };
        }
    });
    register(HandleControls, 'ep-mui-handlecontrols');

    var SubTable = function (dom) {
        SubTable.super.constructor.call(this, dom);
    };
    extend(SubTable, MControl, {
        type: 'subtable',
        _init: function () {
            this.bind = this.getAttribute('bind');
            this.tplId = this.getAttribute('tplId');
            this.action = this.getAttribute('action');

            if (!this.tplId) {
                Util.ejs.ui.toast('子表控件id: ' + this.id + '未设置 tplId 属性');
                return;
            }

            this.template = document.getElementById(this.tplId).innerHTML;
        },
        setData: function (data) {
            var template = this.template;
            var item = '';

            if (typeof template === 'string') {
                data.forEach(function (e) {
                    item += Mustache.render(template, e);
                });
            }

            this.el.innerHTML = item;
        },
        getModule: function () {
            return {
                id: this.id,
                type: this.type,
                bind: this.bind,
                action: this.action,
                dataOptions: this.options
            };
        }
    });
    register(SubTable, 'ep-mui-subtable');

    var List = function (dom) {
        List.super.constructor.call(this, dom);
    };

    extend(List, MControl, {
        type: 'datagrid',

        _init: function () {
            var fields = this.getAttribute('fields'),
                onItemRender = this.getAttribute('onitemrender'),
                onItemClick = this.getAttribute('onitemclick');

            this.action = this.getAttribute('action');
            this.url = this.getAttribute('url');
            this.pageSize = parseInt(this.getAttribute('pageSize'));
            this.defaultPage = parseInt(this.getAttribute('defaultPage')) || 0;
            this.extraId = this.getAttribute('extraId');
            this.idField = this.getAttribute('idField');
            this.tplId = this.getAttribute('tplId') || '';
            this.requestType = this.getAttribute('requesttype') || 'post';
            this.columns = [];

            var tplel = document.getElementById(this.tplId);

            if (tplel) {
                this.template = tplel.innerHTML;
            }

            // if(tplNode[0]) {
            // tplNode[0].id = '{{' + this.idField + '}}';
            // this.template = tplNode[0].outerHTML.trim();
            // }

            // 根据fields生成columns
            if (fields) {
                fields = fields.split(',');
                for (var i = 0, l = fields.length; i < l; i++) {
                    this.columns.push({
                        fieldName: fields[i]
                    });
                }
            }

            if (onItemRender && typeof window[onItemRender] == 'function') {
                this.onItemRender = window[onItemRender];
            }
            var self = this;
            if (onItemClick && typeof window[onItemClick] == 'function') {
                this.onItemClick = window[onItemClick];
            } else {
                window.addEventListener('DOMContentLoaded', function () {
                    if (onItemClick && typeof window[onItemClick] == 'function') {
                        self.onItemClick = window[onItemClick];
                    }
                });
            }

            this.el.innerHTML = '';

            // 如果配置了pageSize，则说明有分页，自动绑定分页效果
            if (this.pageSize > 0) {
                var container = epm.closest(this.el, 'mui-scroll-wrapper');
                // 未配置下拉刷新的容器，则自动将.mui-content设为下拉容器
                if (!container) {
                    container = mui('.mui-content')[0];
                    // 构建最外层容器
                    if (container) {
                        container.classList.add('mui-scroll-wrapper');
                    }
                }
                if (!container.id) {
                    container.id = epm.generateId('pullrefresh');
                }
                this.scrollId = container.id;

                // 列表外包裹.mui-scroll的div
                var div = document.createElement('div');
                div.className = 'mui-scroll';

                this.el.parentNode.replaceChild(div, this.el);
                div.appendChild(this.el);

                // 绑定上拉加载事件
                this.initPullRefresh();
            }
        },
        /*
         * 设置数据 @params isRefresh 是否是刷新，为true时刷新整个列表，false则加载下一页
         */
        setData: function (data, isRefresh) {
            var html = [],
                item;
            for (var i = 0, l = data.length; i < l; i++) {
                // if (this.leafTemplate && data[i].isLeaf) {
                // item = Mustache.render(this.leafTemplate, data[i]);
                // } else {
                // item = Mustache.render(this.template, data[i]);
                // }
                if (this.onItemRender) {
                    data[i].extras = JSON.stringify(data[i]);
                    item = this.onItemRender.call(this, data[i]);
                } else {
                    data[i].extras = JSON.stringify(data[i]);
                    item = Mustache.render(this.template, data[i]);
                }
                if (isRefresh) {
                    html.push(item);
                } else {
                    this.el.innerHTML += item;
                }
            }

            if (isRefresh) {
                var self = this;

                self.el.innerHTML = html.join('');
            }
        },

        setTotal: function (total) {
            this.total = total;
        },

        setUrl: function (url) {
            this.url = url;
            if (this.pullToRefresh) {
                console.log(url)
                this.pullToRefresh.options.url = url;
            }
        },

        initPullRefresh: function () {
            var self = this;
            // 获得请求参数的回调
            var getData = function (pageIndex) {

                self.pageIndex = pageIndex;

                var data = {};

                if (self.onGetRequestData) {
                    data = self.onGetRequestData();
                }

                return data;
            };
            // 处理后台返回数据
            var changeResponseDataCallback = function (data) {
                data = epm.getSecondRequestData(data);
                return data;
            };
            // 数据请求成功回调
            var successRequestCallback = function (data, isRefresh) {

                var total = data.total;
                data = data.data;

                self.setTotal(total);
                self.setData(data, isRefresh);

                if (total <= self.pageSize * (self.pageIndex + 1)) {
                    self.pullToRefresh.isShouldNoMoreData = false;
                }
            };

            // 点击回调
            var onClickCallback = function (e) {
                if (self.onItemClick) {
                    self.onItemClick.call(this, e, this.id, JSON.parse(this.getAttribute('extras')));
                }
            };

            var init = function () {
                console.log(self.url || self.action);
                self.pullToRefresh = new PullToRefreshTools.bizlogic({
                    isDebug: true,
                    type: self.requestType,
                    url: self.url || self.action,
                    initPageIndex: self.defaultPage || 0,
                    template: self.template,
                    dataRequest: getData,
                    itemClick: onClickCallback,
                    dataChange: changeResponseDataCallback,
                    success: successRequestCallback,
                    isAutoRender: false,
                    contentType: 'application/x-www-form-urlencoded',
                    container: '#' + self.scrollId,
                    listContainer: '#' + self.id,
                    setting: {
                        up: {
                            auto: false
                        }
                    }
                });
            }

            if (!window.PullToRefreshTools) {
                Util.loadJs(
                    [
                        Config.bizRootPath + 'js/widgets/pulltorefresh/pulltorefresh.skin.default.js',
                        Config.bizRootPath + 'js/widgets/pulltorefresh/pulltorefresh.skin.css',
                    ],
                    Config.bizRootPath + 'js/widgets/pulltorefresh/pulltorefresh.bizlogic.impl.js', init);
            } else {
                init();
            }
        },
        refresh: function () {
            this.el.innerHTML = '';
            this.pullToRefresh.refresh();
        },
        getModule: function () {
            var data = {
                id: this.id,
                type: this.type,
                action: this.action,
                columns: this.columns,
                idField: this.idField,
                isSecondRequest: false
            };

            if (this.pageSize > 0) {
                data.pageSize = this.pageSize;
                data.pageIndex = this.pageIndex;
            }
            return data;
        }
    });
    register(List, 'ep-mui-list');

    exports.extend = extend;
    exports.register = register;
    exports.control = MControl;

    // TODO: 扫描页面，初始化所有控件·
    exports.init = function (callback) {
        var controls = document.querySelectorAll('[class*="ep-mui-"]'),
            clazz,
            control;

        for (var i = 0, l = controls.length; i < l; i++) {
            clazz = getControlClazz(controls[i]);

            if (clazz) {
                control = new clazz(controls[i]);
                epm.set(control.id, control);

                if (callback) {
                    callback(control);
                }
            }
        }
    };

})(window.MControl = {}, window.controlMap = {});

/**
 * 作者: guotq
 * 时间: 2019-6-18
 * 描述:  f9移动端适配文件
 * MControl 目前作为文件引入，全局绑定在window上
 */
(function (win, $) {

    var dio = new (function () {
        var sb = [];
        var _dateFormat = null;
        var useHasOwn = !!{}.hasOwnProperty,
            replaceString = function (a, b) {

                var c = m[b];
                if (c) {

                    //sb[sb.length] = c;
                    return c;
                }
                c = b.charCodeAt();
                return "\\u00" + Math.floor(c / 16).toString(16) + (c % 16).toString(16);

            },
            doEncode = function (o, field) {

                if (o === null) {
                    sb[sb.length] = "null";
                    return;
                }
                var t = typeof o;
                if (t == "undefined") {
                    sb[sb.length] = "null";
                    return;
                } else if (o.push) { //array

                    sb[sb.length] = '[';
                    var b, i, l = o.length,
                        v;
                    for (i = 0; i < l; i += 1) {
                        v = o[i];
                        t = typeof v;
                        if (t == "undefined" || t == "function" || t == "unknown") { } else {
                            if (b) {
                                sb[sb.length] = ',';
                            }
                            doEncode(v);

                            b = true;
                        }
                    }
                    sb[sb.length] = ']';
                    return;
                } else if (o.getFullYear) {
                    if (_dateFormat) {
                        sb[sb.length] = '"';
                        if (typeof _dateFormat == 'function') {
                            sb[sb.length] = _dateFormat(o, field);
                        } else {
                            sb[sb.length] = mini.formatDate(o, _dateFormat);
                        }
                        sb[sb.length] = '"';
                    } else {
                        var n;
                        sb[sb.length] = '"';
                        sb[sb.length] = o.getFullYear();
                        sb[sb.length] = "-";
                        n = o.getMonth() + 1;
                        sb[sb.length] = n < 10 ? "0" + n : n;
                        sb[sb.length] = "-";
                        n = o.getDate();
                        sb[sb.length] = n < 10 ? "0" + n : n;
                        sb[sb.length] = "T"
                        n = o.getHours();
                        sb[sb.length] = n < 10 ? "0" + n : n;
                        sb[sb.length] = ":"
                        n = o.getMinutes();
                        sb[sb.length] = n < 10 ? "0" + n : n;
                        sb[sb.length] = ":"
                        n = o.getSeconds();
                        sb[sb.length] = n < 10 ? "0" + n : n;
                        sb[sb.length] = '"';
                    }
                    return;
                } else if (t == "string") {
                    if (strReg1.test(o)) {
                        sb[sb.length] = '"';

                        sb[sb.length] = o.replace(strReg2, replaceString);
                        sb[sb.length] = '"';
                        return;
                    }
                    sb[sb.length] = '"' + o + '"';
                    return;
                } else if (t == "number") {
                    sb[sb.length] = o;
                    return;
                } else if (t == "boolean") {
                    sb[sb.length] = String(o);
                    return;
                } else { //object
                    sb[sb.length] = "{";
                    var b, i, v;
                    for (i in o) {
                        //if (!useHasOwn || (o.hasOwnProperty && o.hasOwnProperty(i))) {
                        if (!useHasOwn || Object.prototype.hasOwnProperty.call(o, i)) {

                            v = o[i];
                            t = typeof v;
                            if (t == "undefined" || t == "function" || t == "unknown") { } else {
                                if (b) {
                                    sb[sb.length] = ',';
                                }
                                doEncode(i);
                                sb[sb.length] = ":";
                                doEncode(v, i)

                                b = true;
                            }
                        }
                    }
                    sb[sb.length] = "}";
                    return;
                }
            },
            m = {
                "\b": '\\b',
                "\t": '\\t',
                "\n": '\\n',
                "\f": '\\f',
                "\r": '\\r',
                '"': '\\"',
                "\\": '\\\\'
            },
            strReg1 = /["\\\x00-\x1f]/,
            strReg2 = /([\x00-\x1f\\"])/g;

        this.encode = function () {

            var ec;
            return function (o, dateFormat) {
                sb = [];

                _dateFormat = dateFormat;
                doEncode(o);

                _dateFormat = null;

                return sb.join("");
            };
        }();
        this.decode = function () {

            //        var dateRe1 = /(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})/g;
            //        var dateRe2 = new RegExp('\/Date\\(([0-9]+)\\)\/', 'g');
            //var dateRe2 = new RegExp('\/Date\((\d+)\)\/', 'g');


            //"2000-11-12 11:22:33", "2000-05-12 11:22:33", "2008-01-11T12:22:00", "2008-01-11T12:22:00.111Z"


            var dateRe1 = /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2}(?:\.*\d*)?)Z*$/;
            //"\/Date(1382101422005)\/", "//Date(1034000000000)//", "/Date(1034000000000+0800)/"
            var dateRe2 = new RegExp('^\/+Date\\((-?[0-9]+)\.*\\)\/+$', 'g');

            var re = /[\"\'](\d{4})-(\d{1,2})-(\d{1,2})[T ](\d{1,2}):(\d{1,2}):(\d{1,2})(\.*\d*)[\"\']/g;

            return function (json, parseDate) {
                if (json === "" || json === null || json === undefined) return json;

                if (typeof json == 'object') { //不应该序列化，应该遍历处理日期字符串
                    json = this.encode(json);
                }

                function evalParse(json) {
                    if (parseDate !== false) {

                        //json = json.replace(__js_dateRegEx, "$1new Date($2)");

                        json = json.replace(__js_dateRegEx, "$1new Date($2)");
                        json = json.replace(re, "new Date($1,$2-1,$3,$4,$5,$6)");
                        json = json.replace(__js_dateRegEx2, "new Date($1)");
                    }
                    return window["ev" + "al"]('(' + json + ')');
                }


                var data = null;


                if (window.JSON && window.JSON.parse) {

                    var dateReviver = function (key, value) {
                        if (typeof value === 'string' && parseDate !== false) {
                            //dateRe1
                            dateRe1.lastIndex = 0;
                            var a = dateRe1.exec(value);
                            if (a) {
                                value = new Date(a[1], a[2] - 1, a[3], a[4], a[5], a[6]);

                                return value;
                            }
                            //dateRe2
                            dateRe2.lastIndex = 0;
                            var a = dateRe2.exec(value);
                            if (a) {
                                value = new Date(parseInt(a[1]));

                                return value;
                            }
                        }
                        return value;
                    };

                    try {
                        var json2 = json.replace(__js_dateRegEx, "$1\"\/Date($2)\/\"");
                        data = window.JSON.parse(json2, dateReviver);
                    } catch (ex) {
                        data = evalParse(json);
                    }

                } else {

                    data = evalParse(json);
                }
                return data;
            };

        }();

    })();

    var epm = {
        // 保存所有new出来的mui组件，用id作为索引
        components: {},
        idIndex: 0,
        generateId: function (pre) {
            return (pre || 'epm-') + this.idIndex++;
        },
        // 根据id获取mui组件实例，主要用于commondto中实现建立页面dom元素与实际mui组件的联系
        get: function (id) {
            return epm.components[id] || null;
        },
        set: function (id, control) {
            epm.components[id] = control;
        },
        /**
         * 将某个对象转换成json字符串
         *
         * @param obj 对象
         */
        encodeJson: function (obj) {
            return JSON.stringify(obj);
        },
        /**
         * 将json字符串转换为对象
         *
         * @param json  要转换的json字符串
         */
        decodeJson: function (json) {
            return JSON.parse(json);
        },
        /**
         * utf-8编码函数
         *
         * @param s1  要编码的数据
         */
        encodeUtf8: function (s1) {
            var s = escape(s1);
            var sa = s.split("%");
            var retV = "";
            var Hex2Utf8 = epm.Hex2Utf8;
            var Str2Hex = epm.Str2Hex;
            if (sa[0] !== "") {
                retV = sa[0];
            }
            for (var i = 1; i < sa.length; i++) {
                if (sa[i].substring(0, 1) == "u") {
                    retV += Hex2Utf8(Str2Hex(sa[i].substring(1, 5)));
                    if (sa[i].length > 5) {
                        retV += sa[i].substring(5);
                    }

                } else retV += "%" + sa[i];
            }

            return retV;
        },
        Hex2Utf8: function (s) {
            var retS = "";
            var tempS = "";
            var ss = "";
            var Dig2Dec = epm.Dig2Dec;
            if (s.length == 16) {
                tempS = "1110" + s.substring(0, 4);
                tempS += "10" + s.substring(4, 10);
                tempS += "10" + s.substring(10, 16);
                var sss = "0123456789ABCDEF";
                for (var i = 0; i < 3; i++) {
                    retS += "%";
                    ss = tempS.substring(i * 8, (eval(i) + 1) * 8);

                    retS += sss.charAt(Dig2Dec(ss.substring(0, 4)));
                    retS += sss.charAt(Dig2Dec(ss.substring(4, 8)));
                }
                return retS;
            }
            return "";
        },
        Str2Hex: function (s) {
            var c = "";
            var n;
            var ss = "0123456789ABCDEF";
            var digS = "";
            var Dec2Dig = epm.Dec2Dig;
            for (var i = 0; i < s.length; i++) {
                c = s.charAt(i);
                n = ss.indexOf(c);
                digS += Dec2Dig(eval(n));
            }
            // return value;
            return digS;
        },
        Dig2Dec: function (s) {
            var retV = 0;
            if (s.length == 4) {
                for (var i = 0; i < 4; i++) {
                    retV += eval(s.charAt(i)) * Math.pow(2, 3 - i);
                }
                return retV;
            }
            return -1;
        },
        Dec2Dig: function (n1) {
            var s = "";
            var n2 = 0;
            for (var i = 0; i < 4; i++) {
                n2 = Math.pow(2, 3 - i);
                if (n1 >= n2) {
                    s += '1';
                    n1 = n1 - n2;
                } else s += '0';

            }
            return s;
        },
        dealUrl: function (url, isCommondto) {
            /*
             * 不用加上页面路径了，移动端和pc端的页面路径是不一样的，而且有没有页面路径对于后台来说都是一样的 //
             * action形式的url需要加上页面路径 // 例如在
             * "/pages/login/login.xhtml"中，url为"login.autoLoad" // 则url会转换为
             * "/pages/login/login.autoLoad" url = getRequestMapping() + '/' +
             * url;
             */

            // TODO: 应根据配置项决定是否需要将"a.b"类型的url转化为"a/b"
            // 将"a.b"类型的url转化为"a/b"
            // restFul形式才需要转换
            if (url.indexOf('.') != -1 && url.indexOf('.jspx') == -1) {
                if (epm.isRestFul) {
                    url = url.replace('.', '/');
                } else if (url.indexOf('cmd=') < 0) {
                    url = url.replace('.', '.action?cmd=');
                }
            }

            // 加上页面地址中的请求参数
            var all = window.location.href;
            var index = all.indexOf('?');
            var hasParam = url.indexOf('?') > -1;

            if (index != -1) {
                if (hasParam) {
                    url += '&' + all.substring(index + 1);
                } else {
                    url += '?' + all.substring(index + 1);
                }

                if (isCommondto) {
                    // 加上isCommondto标识
                    // 用来给后台区分与其他不是通过epoint中的三个方法发送的请求
                    url += '&isCommondto=true';
                }

            } else if (isCommondto) {
                if (hasParam) {
                    url += '&isCommondto=true';
                } else {
                    url += '?isCommondto=true';
                }
            }

            url = epm.getRightUrl('rest/' + url);
            return url;
        },
        encode: dio.encode,
        decode: dio.decode,
        mask: $.createMask(),
        // 显示遮罩
        showMask: function () {
            this.mask.show();
        },
        // 关闭遮罩
        hideMask: function () {
            this.mask.close();
        },
        // 处理二次请求返回的数据
        getSecondRequestData: function (data) {
            var status = data.status;

            // 处理后台返回的状态码
            if (status) {
                var code = parseInt(status.code),
                    text = status.text,
                    url = status.url;

                if (code >= 300) {
                    if (url) {
                        win.location.href = this.getRightUrl(url);
                    } else {
                        $.alert(text, '提示', '我知道了');
                    }
                    return;
                }

            }

            if (data.controls) {
                data = data.controls[0];
            }

            return data;

        },

        // 返回完整的WebContent根路径
        getRootPath: function () {
            var loc = window.location,
                host = loc.hostname,
                protocol = loc.protocol,
                port = loc.port ? (':' + loc.port) : '',
                path = (window._rootPath !== undefined ? _rootPath : ('/' + loc.pathname.split('/')[1])) + '/';

            var rootPath = protocol + '//' + host + port + path;

            return rootPath;
        },

        // 返回适合的url
        // 1.url为全路径，则返回自身
        // 2.url为，则返回自身
        // 3.url为WebContent开始的路径，则补全为完整的路径
        getRightUrl: function (url) {
            if (!url) return '';

            // 是否是相对路径
            var isRelative = url.indexOf('./') != -1 || url.indexOf('../') != -1;

            // 全路径、相对路径直接返回
            if (/^(http|https|ftp)/g.test(url) || isRelative) {
                url = url;
            } else {
                url = this.getRootPath() + url;
            }

            return url;
        },

        _pageLoagding: $('body>.page-loading'),

        hidePageLoading: function () {
            if (this._pageLoagding && this._pageLoagding.length) {
                document.body.removeChild(this._pageLoagding[0]);
                this._pageLoagding = undefined;
            }
        },
        delsemiforstring: function (str, separator) {
            separator = separator || ';';
            var reg = new RegExp(separator + '$');

            return str.replace(reg, '');
        },
        // 解析配置参数
        // 不用JSON.parse的方法是因为JSON.parse方法要求参数为严格的json格式
        // 而控件的配置参数我们之前是可以不加引号或用单引号的
        parseJSON: function (str) {
            return eval("(" + str + ")");
        },
        // 获取class为cls的最近父元素
        closest: function (dom, cls) {
            if (!dom || !cls) {
                return;
            }
            var parent = dom.parentNode,
                className = parent.className;

            if ((' ' + className + ' ').indexOf(' ' + cls + ' ') >= 0) {
                return parent;
            } else if (parent.tagName === 'BODY') {
                return;
            } else {
                return this.closest(parent, cls);
            }
        },
        getCookie: function (name) {
            var arr,
                reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg)) {
                return unescape(arr[2]);
            } else {
                return null;
            }
        },
        // 拓展的方法
        extend: function () {
            var options, name, src, copy, copyIsArray, clone,
                target = arguments[0] || {},
                i = 1,
                length = arguments.length,
                deep = false;

            if (typeof target === "boolean") {
                deep = target;
                target = arguments[i] || {};
                i++;
            }
            if (typeof target !== "object" && !exports.isFunction(target)) {
                target = {};
            }
            if (i === length) {
                target = this;
                i--;
            }
            for (; i < length; i++) {
                if ((options = arguments[i]) != null) {
                    for (name in options) {
                        src = target[name];
                        copy = options[name];
                        if (target === copy) {
                            continue;
                        }
                        if (deep && copy && (exports.isPlainObject(copy) || (copyIsArray = exports.isArray(copy)))) {
                            if (copyIsArray) {
                                copyIsArray = false;
                                clone = src && exports.isArray(src) ? src : [];

                            } else {
                                clone = src && exports.isPlainObject(src) ? src : {};
                            }

                            target[name] = epm.extend(deep, clone, copy);
                        } else if (copy !== undefined) {
                            target[name] = copy;
                        }
                    }
                }
            }
            return target;
        },
        // 为下拉刷新服务
        appendHtmlChildCustom: function (targetObj, childElem) {
            if (typeof targetObj === 'string') {
                targetObj = document.querySelector(targetObj);
            }
            if (targetObj == null || childElem == null || !(targetObj instanceof HTMLElement)) {
                return;
            }
            if (childElem instanceof HTMLElement) {
                targetObj.appendChild(childElem);
            } else {
                // 否则,创建dom对象然后添加
                var tmpDomObk = exports.pareseStringToHtml(childElem);
                if (tmpDomObk != null) {
                    targetObj.appendChild(tmpDomObk);
                }
            }

        },
        getChildElemLength: function (targetObj) {
            if (!(targetObj instanceof HTMLElement)) {
                return 0;
            }
            return targetObj.children.length;
        },

        isUseConfig: window.Config && window.Config.comdto && window.Config.comdto.isUseConfig,

        isRestFul: window.Config && window.Config.comdto && window.Config.comdto.isRestFul,

        isMock: window.Config && window.Config.comdto && window.Config.comdto.isMock,

        requestMethod: (window.Config && window.Config.comdto && window.Config.comdto.requestMethod) || 'post'
    };
    // 如果存在配置文件
    if (epm.isUseConfig) {
        // 测试时候的重写
        epm.getRootPath = function () {
            return window.Config.comdto.rootUrl;
        };
        // epm.getRightUrl = function(url) {
        // if(!url) return '';
        //
        // // 是否是相对路径
        // var isRelative = url.indexOf('./') != -1 || url.indexOf('../') != -1;
        //
        // // 全路径、相对路径直接返回
        // if(/^(http|https|ftp)/g.test(url) || isRelative) {
        // url = url;
        // } else {
        // url = this.getRootPath() + url;
        // }
        //
        // return url;
        // };
    }

    win.epm = epm;
})(window, window.mui);

(function () {
    "use strict";

    Util.loadJs(Config.bizRootPath + 'js/utils/util.string.js');

    // epointm内容
    (function () {
        // 先初始化页面上的控件
        MControl.init(function (control) {
            var controlType = control.type;

            if (controlType == 'datagrid' || controlType == 'webuploader' || controlType == 'treeselect-non-nested') {
                control.onGetRequestData = function (isCheckedDir) {
                    // 获取自己的数据模型
                    var data = null;

                    data = new CommonDto(this.id).getData(true);

                    if (controlType == 'datagrid' || (controlType == 'treeselect-non-nested' && !isCheckedDir)) {
                        data[0].isSecondRequest = true;
                    }

                    if (isCheckedDir) {
                        data[0].eventType = 'checkedchanged';
                    }
                    // 拼上额外数据
                    if (this.extraId) {
                        var ids = this.extraId.split(',');
                        for (var i = 0; i < ids.length; i++) {
                            data = data.concat(new CommonDto(ids[i]).getData(true));
                        }
                    }

                    return {
                        commonDto: JSON.stringify(data)
                    };
                };
            }
        });

        // 属性扩展
        var extendAttr = function (base, attrs) {
            for (var key in attrs) {
                if (attrs[key]) {
                    base[key] = attrs[key];
                }
            }
        };

        var CommonDto = function (scope, action, initHook, initControl) {
            this.controls = {};

            // 页面action，用于拼接url
            this.action = action;
            this.initHook = initHook;

            var self = this;
            var i, l;

            var controls = [];

            function getControls(scope) {
                var $scope = mui('#' + scope);

                if ($scope[0] && /ep-mui-\w*/g.test($scope[0].className)) {
                    // 有以"ep-mui-"开头的class，说明它本身就是要处理的控件，直接返回其本身
                    // 不考虑有控件嵌套的情况
                    return $scope;
                } else {
                    return mui('[class*="ep-mui-"]', $scope);
                }
            }

            if (scope != '@none') {
                if (!scope || scope === '@all') {
                    controls = mui('[class*="ep-mui-"]');
                } else {
                    if (Array.isArray(scope)) {
                        for (i = 0, l = scope.length; i < l; i++) {
                            controls = controls.concat(getControls(scope[i]));
                        }
                    } else {
                        controls = controls.concat(getControls(scope));
                    }
                }
            }

            for (i = 0, l = controls.length; i < l; i++) {
                var control = controls[i],
                    mcontrol = epm.get(control.id);

                if (mcontrol) {
                    self.controls[mcontrol.id] = mcontrol;

                    // 根据控件action设置控件的url
                    // 主要用于有二次请求的控件（表格）
                    if (initControl && mcontrol.action && mcontrol.setUrl) {
                        mcontrol.setUrl(epm.dealUrl(this.action + '.' + mcontrol.action));
                    }
                }
            }
        };

        CommonDto.prototype = {
            constructor: CommonDto,

            /*
             * 获取控件数据 @params original 控制是否返回原始数据，返回原始数据是为了方便外部操作控件字段
             */
            getData: function (original) {
                var data = [],
                    control,
                    controlData,
                    dataOptions,
                    hidden;
                // 遍历所有控件
                for (var id in this.controls) {
                    control = this.controls[id];

                    // 把data-options加到控件数据中
                    controlData = control.getModule();
                    dataOptions = control.getAttribute('data-options');
                    if (dataOptions) {
                        controlData["dataOptions"] = epm.parseJSON(dataOptions);
                    }
                    data.push(controlData);
                    if (id == '_common_hidden_viewdata') {
                        hidden = control;
                    }
                }

                if (!hidden) {
                    hidden = epm.get('_common_hidden_viewdata');

                    if (hidden) {
                        data.push(hidden.getModule());
                    } else {
                        data.push({
                            id: '_common_hidden_viewdata',
                            type: 'hidden',
                            value: ''
                        });
                    }

                }

                if (original) {
                    return data;
                } else {
                    return {
                        commonDto: JSON.stringify(data)
                    };
                }

            },

            setData: function (data, customData) {
                var id, control, item;

                for (var i = 0, l = data.length; i < l; i++) {
                    item = data[i];
                    id = item.id;
                    control = this.controls[id];

                    if (id === '_common_hidden_viewdata') {
                        this.createHiddenView(item);
                    }

                    if (!control) {
                        continue;
                    }

                    if (item.value !== undefined && control.setValue) {
                        control.setValue(item.value);
                    }
                    if (item.text !== undefined && control.setText) {
                        control.setText(item.text);
                    }
                    if (item.data && control.setData) {
                        control.setData(item.data);

                        if (item.total && control.setTotal) {
                            control.setTotal(item.total);
                        }
                    }

                    if (this.initHook) {
                        this.initHook.call(this, control, item, customData);
                    }
                }
            },
            createHiddenView: function (data) {
                var control = epm.get('_common_hidden_viewdata');

                if (control) {
                    control.setValue(data.value);
                    return;
                }

                var input = document.createElement('input');

                input.id = '_common_hidden_viewdata';
                input.type = 'hidden';
                input.className = 'ep-mui-hidden';
                control = new controlMap['ep-mui-hidden'](input);

                control.setValue(data.value);
                control.render('#body');
                epm.set(control.id, control);
            },
            init: function (opts) {
                var self = this;
                var data = this.getData();

                if (opts.params) {
                    data.cmdParams = opts.params;
                }
                if (!opts.notShowLoading) {
                    epm.showMask();
                }
                // TODO: 发送请求
                Util.ajax({
                    url: opts.url,
                    type: epm.requestMethod,
                    dataType: 'json',
                    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
                    data: data,
                    beforeSend: function (XMLHttpRequest) {
                        // F9框架做了csrf攻击的防御
                        var csrfcookie = epm.getCookie('_CSRFCOOKIE');
                        if (csrfcookie) {
                            XMLHttpRequest.setRequestHeader("CSRFCOOKIE", csrfcookie);
                        }
                    },
                    success: function (data) {
                        var status = data.status,
                            controls = data.controls,
                            custom = data.custom || '',
                            code = parseInt(status.code),
                            text = status.text,
                            url = status.url;

                        if (code == 0) {
                            if (url) {

                                url = epm.getRightUrl(url);
                                Util.ejs.ui.alert('错误:' + JSON.stringify(status));
                                return;
                                // if (status.top) {
                                // top.window.location.href = url;
                                // } else {
                                // window.location.href = url;

                                // }
                            } else {

                                if (opts.fail) {
                                    opts.fail.call(self, text, status);

                                } else {
                                    Util.ejs.alert(text, '提示', '我知道了');

                                }

                            }
                        } else if (code == 1) {
                            controls.length && self.setData(controls, custom);

                            opts.done && opts.done.call(self, custom);
                        }

                    },
                    complete: function () {
                        if (!opts.notShowLoading) {
                            epm.hideMask();
                        }
                    }
                });

            }

        };

        var epointm = {
            /**
             * 初始化页面
             *
             * @param url
             *            ajax请求地址(如果不传，默认为page_Load)
             * @param ids
             *            要回传的页面元素id，是个数组['tree', 'datagrid1']
             * @param callback
             *            回调事件
             * @param opt
             *            其他参数 isPostBack 是否是回传，默认为false keepPageIndex 是否停留在当前页码
             *            默认为false initHook: 初始化时控件在setValue后的回调
             */
            initPage: function (url, ids, callback, fail, opt) {
                var initHook;
                if (typeof fail === 'object' && opt === undefined) {
                    opt = fail;
                    fail = undefined;
                }

                opt = opt || {};
                if (typeof opt == 'function') {
                    initHook = opt;
                    opt = {};
                } else {
                    initHook = opt.initHook;
                }

                var urlArr = url.split('?'),
                    subUrl = urlArr[0],
                    urlParam = urlArr[1];

                var len = subUrl.indexOf('.'),
                    action = (len > 0 ? subUrl.substr(0, len) : subUrl);

                if (!this.getCache('action')) {
                    this.setCache('action', action);
                    this.setCache('urlParam', urlParam);
                    this.setCache('callback', callback);
                }

                // 非模拟数据情况下才需要处理url
                if (!epm.isMock) {
                    if (len < 0) {
                        subUrl += ".page_Load";
                    }

                    url = subUrl + (urlParam ? '?' + urlParam : '');
                }


                var params = {};
                if (ids && ids.constructor === Object) {
                    params = ids;
                    ids = undefined;
                }

                /**
                 * 框架访问日志记录的时候，需要记录模块名称，目前是通过action地址反推的，有的项目如果页面地址和action地址不规范的话，可能反推不了。
                 * 所以需要在初始化请求的时候，自动带上页面地址
                 */
                params.pageUrl = window.location.href;
                params = JSON.stringify(params);

                // 在new CommonDto时是否需要初始化控件与action相关的属性
                // 一般只需要在initPage方法中初始化，其他方法不需要
                var initControl = opt.initControl;
                if (initControl === undefined) {
                    initControl = true;
                }

                // 加载页面数据
                var commonDto = new CommonDto(ids, action, initHook, initControl);
                commonDto.init({
                    url: epm.isMock ? url : epm.dealUrl(url, true),
                    method: opt.method,
                    params: params,
                    done: function (data) {
                        if (callback) {
                            callback.call(this, data);
                        }

                        if (window.epoint_afterInit) {
                            window.epoint_afterInit(data);
                        }

                        // 初始化完后隐藏pageloading
                        epm.hidePageLoading();
                    },
                    fail: fail
                });
            },

            /**
             * 刷新页面
             *
             * @param ids
             *            要回传的页面元素id，是个数组['tree', 'datagrid1'],如果不传，默认为整个form
             * @param callback
             *            回调事件
             */
            refresh: function (ids, callback) {
                var url = this.getCache('action') + '.page_Refresh';

                var urlParam = this.getCache('urlParam');

                if (urlParam) {
                    url += '?' + urlParam;
                }

                if (typeof ids == 'function') {
                    callback = ids;
                    ids = '@all';
                }

                callback = callback || this.getCache('callback');

                this.initPage(url, ids, callback, {
                    initControl: false
                });
            },

            /**
             * 提交表单数据
             *
             * @param url
             *            ajax请求地址
             * @param ids
             *            要回传的页面元素id，是个数组['tree', 'datagrid1'],如果不传，默认为整个form
             * @param callback
             *            回调事件
             * @param notShowLoading
             *            是否不显示loading效果
             */
            execute: function (url, ids, params, callback, notShowLoading) {
                var action,
                    index = url.indexOf('.');

                if (!epm.isMock) {
                    // url不带'.'，则表示没带action，则自动加上initPage时的action
                    if (index < 0) {
                        action = this.getCache('action');

                        url = action + '.' + url;
                    } else {
                        action = url.substr(0, index);
                    }
                }

                var commonDto = new CommonDto(ids, action);
                if (typeof params == 'function') {
                    callback = params;
                    params = null;
                }

                if (this.validate(commonDto.controls)) {
                    commonDto.init({
                        url: epm.isMock ? url : epm.dealUrl(url, true),
                        params: (params ? (typeof params == 'string' ? params : epm.encode(params)) : null),
                        done: callback,
                        notShowLoading: notShowLoading
                    });
                }
            },
            validate: function (controls) {
                var vtypes = ['email', 'url', 'int', 'float', 'phone', 'mobile', 'tel', 'postCode', 'orgCode', 'idCard'];
                var vtypesErrMsg = {
                    email: function (msg) {
                        return (msg || '') + '请输入一个有效的电子邮件地址';
                    },
                    url: function (msg) {
                        return (msg || '') + '请输入一个有效的URL';
                    },
                    int: function (msg) {
                        return (msg || '') + '请输入一个整数';
                    },
                    float: function (msg) {
                        return (msg || '') + '请输入一个有效号码';
                    },
                    phone: function () {
                        return '输入的电话号码格式不正确';
                    },
                    mobile: function () {
                        return '输入的手机号码格式不正确';
                    },
                    tel: function () {
                        return '输入的固定电话号码格式不正确';
                    },
                    postCode: function () {
                        return '输入的邮政编码格式不正确';
                    },
                    orgCode: function () {
                        return '输入的组织机构代码格式不正确';
                    },
                    idCard: function () {
                        return '输入的身份证号码格式不正确';
                    }
                };

                for (var key in controls) {
                    var el = controls[key].el;
                    var vtype = el.getAttribute('vtype');
                    var regExp = el.getAttribute('regExp');
                    var maxthenId = el.getAttribute('maxthen');
                    var minthenId = el.getAttribute('minthen');
                    var value = el.value;

                    // 先验证是否为必填
                    if (el.required) {
                        if (value === '') {
                            var text = ($(el).parent().attr('label') || $(el).parent().text() || $(el).parent().prev().text()).replace(/[:: ]$/, '');
                            Util.ejs.ui.toast(el.getAttribute('requiredErrorText') || (text + '不能为空'));
                            return false;
                        }
                    }

                    // 验证是否有 vtype
                    if (vtype && vtypes.indexOf(vtype) !== -1) {
                        var type = 'is' + vtype.charAt(0).toUpperCase() + vtype.slice(1);

                        if (!Util.string[type](value)) {
                            if (vtype == 'email' || vtype == 'url' || vtype == 'int' || vtype == 'float') {
                                Util.ejs.ui.toast(vtypesErrMsg[vtype](el.previousElementSibling.innerHTML));
                            } else {
                                Util.ejs.ui.toast(vtypesErrMsg[vtype]());
                            }

                            return false;
                        }
                    }

                    // 验证是否有自定义正则
                    if (regExp && regExp !== '') {
                        try {
                            regExp = eval(regExp);
                        } catch (error) {
                            throw new Error(el.id + '自定义正则解析出错');
                        }

                        if (value.length >= 1) {
                            if (!regExp.test(value)) {
                                Util.ejs.ui.toast(el.getAttribute('regExpErrText'));
                                return false;
                            }
                        }
                    }

                    // 验证日期 - 比大
                    if (maxthenId) {
                        var res = this.compare(maxthenId, el, '>', function (elText, compareObjText) {
                            return compareObjText + '不能大于' + elText;
                        });

                        if (!res) {
                            return false;
                        }
                    }

                    // 验证日期 - 比小
                    if (minthenId) {
                        var res = this.compare(minthenId, el, '<', function (elText, compareObjText) {
                            return compareObjText + '不能小于' + elText;
                        });

                        if (!res) {
                            return false;
                        }
                    }
                }

                return true;
            },

            compare: function (compareId, el, operator, callback) {
                var compareObj = epm.get(compareId);
                var compareValue = (compareObj && compareObj.value) || compareId;
                var value = el.value;

                if (compareValue && value) {
                    if (operator === '>' && +new Date(compareValue) > +new Date(value)) {
                        Util.ejs.ui.toast(callback(el.previousElementSibling.innerHTML, (compareObj && compareObj.el.previousElementSibling.innerHTML) || compareId));
                        return false;
                    } else if (operator === '<' && +new Date(compareValue) < +new Date(value)) {
                        Util.ejs.ui.toast(callback(el.previousElementSibling.innerHTML, (compareObj && compareObj.el.previousElementSibling.innerHTML) || compareId));
                        return false;
                    }
                }

                return true;
            },

            alert: function (message, title, callback) {
                Util.ejs.alert(message, title, '我知道了', callback);
            },

            confirm: function (message, title, okCallback, cancelCallback) {
                Util.ejs.confirm(message, title, ['确定', '取消'], function (index) {
                    // 确定
                    if (index === 0 && okCallback) {
                        okCallback();
                    } else if (cancelCallback) {
                        cancelCallback();
                    }
                });
            },

            // 在epoint上增加缓存操作
            _cache: {},

            setCache: function (key, value) {
                this._cache[key] = value;
            },

            getCache: function (key) {
                return this._cache[key];
            },

            delCache: function (key) {
                this._cache[key] = null;
                delete this._cache[key];
            }
        };

        window.epointm = epointm;
    })();
})();