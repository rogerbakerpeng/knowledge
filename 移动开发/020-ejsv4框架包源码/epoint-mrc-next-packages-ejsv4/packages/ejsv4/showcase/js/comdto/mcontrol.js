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
        var F = function () {};
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
                    attachfilename = dataset.attachfilename,
                    filetype = dataset.filetype;

                if (filetype.indexOf('image') !== -1) {
                    ejs.util.prevImage({
                        index: 0,
                        selectedPhotos: [epm.dealUrl(downloadurl)],
                        success: function () {}
                    });
                } else {
                    ejs.io.downloadFile({
                        url: epm.dealUrl(downloadurl),
                        fileName: attachfilename,
                        reDownloaded: 0,
                        success: function (result) {
                            var filePath = result.filePath;

                            ejs.io.openFile({
                                path: filePath,
                                success: function () {},
                                error: function () {}
                            });
                        },
                        error: function (error) {}
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
                        isgroupenable: 1
                    },
                    f9action: self.action,
                    f9userdata: self.data,
                    f9controlid: self.id,
                    success: function (result) {
                        var resultData = result.resultData,
                            value = '',
                            text = '';

                        self.value = '';
                        self.text = '';
                        self.el.innerHTML = '';
                        resultData.forEach(function (e, i) {
                            value += e.userguid + ',';
                            text += e.username + ',';
                        });

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

                if (tagName === 'INPUT' || tagName === 'TEXTAREA'){
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
                    success: function(result) {
                        var item = result.items[0];

                        if (window[onchange] && typeof window[onchange] === 'function') {
                            window[onchange](item.text, item.value, self);
                        } else {
                            self.setValue(item.value);
                            self.setText(item.text);
                        }
                    },
                    error: function(err) {}
                });
            }, false);
        },
        type: 'combobox',
        setText: function (text) {
            var tagName = this.el.tagName.toLowerCase();

            if (tagName === 'input' || tagName === 'textarea') {
                this.el.value = text;
            } else {
                this.el.innerText = text;
            }

            this.text = text;
        },
        getText: function () {
            return this.text;
        },
        setValue: function (value) {
            var tagName = this.el.tagName.toLowerCase();

            if (tagName === 'input' || tagName === 'textarea') {
                this.el.value = value;
            } else {
                this.el.innerText = value;
            }

            this.value = value;
        },
        setData: function (data) {
            this.data = data;
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
                dataOptions: this.options
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
            this.lockStatus = false; // 流程是否被锁定，锁定则无法点击右上角

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
                self._setControlsDisabled();
            } else {
                // 获取当前权限
                this._getPermissions(function (canhandle) {
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
                        self._setControlsDisabled();
                    } else {
                        // TODO: 如果有 送下一步按钮，则代表待办，否则为已办
                        if (self.btns.length > 0) {
                            // 设置右侧按钮
                            self._setRightBtn(true);
                        }
                    }
                });
            }

            if (data && data.message) {
                Util.ejs.ui.toast(data.message);
                return;
            }
        },
        _setControlsDisabled: function () {
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
        _getPermissions: function (callback) {
            Util.ajax({
                url: window.handledetail_base_v7 || 'http://work.epoint.com.cn:8089/oarest94/rest/oa9/handledetail_base_v7',
                data: {
                    params: JSON.stringify({
                        messageitemguid: this.messageitemguid,
                        'pviguid': this.pviguid,
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
                    console.error(err);
                    Util.ejs.ui.toast('http://work.epoint.com.cn:8089/oarest94/rest/oa9/handledetail_base_v7  接口请求失败');
                }
            });
        },
        _setRightBtn: function (isShow) {
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
                            self._showActionSheet();
                        });
                    } else {
                        self._showActionSheet();
                    }
                }
            });
        },
        _showActionSheet: function () {
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
                        self._AjaxOperation(btn.operationguid, btn.transitionguid, btn.operationtype, btn.beforeact, btn.afteract, btn.isrequireopinion);
                    });
                }
            });
        },
        _AjaxOperation: function (OperationGuid, TransitionGuid, OperationType, btnbefore,
            btnafter, isrequireopinion) {
            this.operationGuid = OperationGuid;
            this.transitionGuid = TransitionGuid;
            this.afterbtn = btnafter;

            var batchHandleGuid = null;

            try {
                batchHandleGuid = document.getElementById('hidIsBatchHandle').value;
            } catch (error) {}

            if (btnbefore) {
                try {
                    var btnSubmit = null;

                    if (batchHandleGuid) {
                        btnSubmit = this._getButton(batchHandleGuid);
                    } else {
                        btnSubmit = getButton(btnbefore);
                    }

                    if (btnSubmit) {
                        btnSubmit.click();
                    }
                } catch (error) {
                    this._HandleNextStep(OperationGuid, TransitionGuid, OperationType,
                        btnbefore, btnafter);
                }
            } else {
                this._HandleNextStep(OperationGuid, TransitionGuid, OperationType,
                    btnbefore, btnafter);
            }
        },
        _HandleNextStep: function (OperationGuid, TransitionGuid, OperationType,
            btnbefore, btnafter) {
            this._ShowTdOperate(false);
            var batchHandleGuid = null;
            var self = this;

            try {
                batchHandleGuid = document.getElementById('hidIsBatchHandle').value;
            } catch (error) {}

            if (OperationType === 'Save' || OperationType == 60) {
                var btnId = 'btnSaveFrom';

                if (batchHandleGuid != null && batchHandleGuid != "") {
                    btnId = 'btnSaveBatchHandle';
                }
                try {
                    var saveBtn = this._getButton(btnId);
                    if (saveBtn != null) {
                        saveBtn.click();
                    } else {
                        this._HeaderSubmit();
                    }
                } catch (er) {
                    this._HeaderSubmit();
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
                    var btnSubmit = this._getButton(btnId);
                    if (btnSubmit != null) {
                        btnSubmit.click();
                    } else {
                        this._HeaderSubmit();
                    }
                } catch (err) {
                    this._HeaderSubmit();
                }
            } else if (OperationType == "DrawBack" || OperationType == 50) {
                ejs.ui.confirm({
                    message: '确认收回已发待办事项？',
                    buttonLabels: ['取消', '确定'],
                    success: function (result) {
                        // 点击确定
                        if (result.which == 1) {
                            self._HeaderSubmit();
                        } else {
                            self._ShowTdOperate(true);
                        }
                    }
                });
            } else {
                this._HeaderSubmit();
            }
        },
        _HeaderSubmit: function () {
            var self = this;

            this.transitionGuid = this.transitionGuid || '';

            var params = {
                transitionguid: this.transitionGuid,
                operationguid: this.operationGuid,
                pviguid: this.pviGuid,
                workitemguid: this.workitemGuid
            };

            epointm.execute('getPageUrlOfOperate', '@none', epm.encodeUtf8(epm.encodeJson(params)), self._AjaxOperationHd.bind(self));
        },
        // 通用的ajax方法返回结果处理
        _AjaxOperationHd: function (response) {
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
                                    .encodeJson(response)), self._AjaxOperationHd.bind(self));
                            } else {
                                self._ShowTdOperate(true);
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
                                self._ShowTdOperate(false);
                                self._DefaultOperateHd(result.resultData.message);
                            } else {
                                self._ShowTdOperate(true);
                            }
                        }
                    });
                } else if (response.operationtype &&
                    (response.operationtype == 25 || response.operationtype == "SendToSign")
                    (!response.message || response.message == "Success")) {

                    this._AfterClick();
                    this._ShowTdOperate(true);
                } else if (!response.message || response.message == "Success") {
                    this._AfterClick();

                    ejs.ui.confirm({
                        title: '流程处理',
                        message: '处理完成是否关闭页面',
                        success: function (result) {
                            if (result.which == 1) {
                                self._CloseMe();
                            }
                        }
                    });
                } else if (response.message) {
                    Util.ejs.ui.alert(response.message);
                    this._ShowTdOperate(true);
                }
            } else {
                this._ShowTdOperate(true);
            }
        },
        _DefaultOperateHd: function (json) {
            epointm.execute("getoperate", "@none", epm.encodeUtf8(epm.encodeJson(json)),
                this._AjaxOperationHd.bind(this));
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
            } catch (err) {}
        },
        _AfterClick: function () {
            var afterbtn = this.afterbtn;

            if (afterbtn) {
                try {
                    var btnSubmit = this._getButton(afterbtn);
                    if (btnSubmit != null) {
                        btnSubmit.click();
                    }
                } catch (err) {}
            }
        },
        // 按钮区域的显隐控制
        _ShowTdOperate: function (Is_Show) {
            if (Is_Show) {
                this._setRightBtn(true);
            } else {
                this._setRightBtn(false);
            }
        },
        _CloseMe: function () {
            ejs.page.close();
        },
        _getButton: function (id) {
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
