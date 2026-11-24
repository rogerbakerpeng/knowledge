(function() {
    // 注册控件
    function register(control, className) {
        // 真机方式不加载封装的ep-mui-actionsheet
        if (className == 'ep-mui-actionsheet' && window.location.href.indexOf('localhost') == -1) {
            return;
        }
        MControl.register(control, className);
    }

    var Switch = function(dom) {
        Switch.super.constructor.call(this, dom);
    };

    MControl.extend(Switch, MControl.UserControl, {
        type: 'switch',
        _init: function() {
            var data = this.getAttribute('data');
            this.bind = this.getAttribute('bind');
            this.action = this.getAttribute('action');

            // 客户端设置数据源
            if (data) {
                data = epm.parseJSON(data);
                this.setData(data);
            }
        },
        _templ: '<div class="mui-switch {{#status}}mui-active{{/status}}" type="switch"><div class="mui-switch-handle"></div></div>',
        setData: function(data) {},
        setValue: function(value) {
            this.value = value;

            var html = [];
            var statusdata = {};
            // 直接填属性
            // if(value == '1')
            // statusdata = {"status": "mui-active"};
            // else
            // statusdata = {"status": ""};
            if (value == '1')
                statusdata.status = true;
            else
                statusdata.status = false;
            html.push(Mustache.render(this._templ, statusdata));
            this.el.innerHTML = html.join('');
            // this.el.innerHTML = this._templ;

            this.switchs = mui('div[type="switch"]', this.el);
            // 绑定switchs的change事件，保证value与switchs的值一致
            var self = this;
            this.switchs.each(function(index, item) {
                item.addEventListener('toggle', function(event) {
                    if (event.detail.isActive) {
                        self.value = '1';
                    } else {
                        self.value = '0';
                    }
                });
            });
            mui('.mui-switch')['switch'](); // 关键是这句话，动态添加的mui-switch需要手动初始化
        },
        getModule: function() {
            return {
                id: this.id,
                type: this.type,
                bind: this.bind,
                action: this.action,
                value: this.value
            };
        }
    });
    register(Switch, 'ep-mui-switch');


    var ActionSheet = function(dom) {
        ActionSheet.super.constructor.call(this, dom);
    };

    MControl.extend(ActionSheet, MControl.UserControl, {
        type: 'actionsheet',
        _init: function() {
            var data = this.getAttribute('data');
            this.bind = this.getAttribute('bind');
            this.action = this.getAttribute('action');
            this.refreshid = this.getAttribute('refreshid');

            // 客户端设置数据源
            if (data) {
                data = epm.parseJSON(data);
                this.setData(data);
            }
        },
        _templOne: '<div id="{{controlid}}" class="mui-popover mui-popover-action mui-popover-bottom"><ul class="mui-table-view">',
        _templTwo: '<li class="mui-table-view-cell"><a href="#" acvalue="{{acvalue}}">{{actext}}</a></li>',
        _templThree: '</ul><ul class="mui-table-view"><li class="mui-table-view-cell"><a href="#{{controlid}}"><b>取消</b></a></li></ul></div>',
        setData: function(data) {

            var json = JSON.parse(data);
            var btns = json.btn;
            var refreshid = this.refreshid;
            if (refreshid) {
                btns = json.data; // 当前分支
            }
            var controlid = this.id + 'gen';
            var html = [];
            var acdata = {};
            var controliddata = {};
            controliddata.controlid = controlid;
            html.push(Mustache.render(this._templOne, controliddata)); // 模板第一部分
            for (var i = 0, l = btns.length; i < l; i++) {
                if (refreshid) {
                    acdata.actext = btns[i].stepname;
                    acdata.acvalue = btns[i].stepguid;
                } else {
                    acdata.actext = btns[i].text;
                    acdata.acvalue = btns[i].operationGuid;
                }
                html.push(Mustache.render(this._templTwo, acdata)); // 模板第二部分
            }
            html.push(Mustache.render(this._templThree, controliddata)); // 模板第三部分
            this.el.innerHTML = html.join('');
            mui('#' + controlid).on('tap', '.mui-popover-action li>a', function() {
                var a = this;
                mui('#' + controlid).popover('toggle'); // 传入toggle参数，用户无需关心当前是显示还是隐藏状态，mui会自动识别处理
                // 模板中的取消按钮不做任何处理
                if (a.innerText != "取消") {
                    if (refreshid) {
                        $('#' + refreshid).text(a.innerText);
                        $('#' + refreshid).val(a.getAttribute("acvalue"));
                    } else {
                        ztbphone.openActionsheetHandlePage(a.getAttribute("acvalue"));
                    }
                }
            });
        },
        setValue: function(value) {},
        getModule: function() {
            return {
                id: this.id,
                type: this.type,
                bind: this.bind,
                action: this.action,
                value: this.value
            };
        }
    });
    register(ActionSheet, 'ep-mui-actionsheet');

    var ucjsgcbdlist = function(dom) {
        ucjsgcbdlist.super.constructor.call(this, dom);
    };
    MControl.extend(ucjsgcbdlist, MControl.UserControl, {
        type: 'jsgcbdlist',
        _init: function() {
            var data = this.getAttribute('data');
            this.bind = this.getAttribute('bind');
            this.action = this.getAttribute('action');
            // 客户端设置数据源
            if (data) {
                data = epm.parseJSON(data);
                this.setData(data);
            }
        },
        tplUrlbzb: '../../frame/fmui/js/tpluc/jsgcbdlist.tpl',
        tplUrlqy: '../../frame/fmui/js/tpluc/qyjsgcbdlist.tpl',
        mapClass: 'com.epoint.ztb.tradecontrols.bdlist.BdListView',
        rowids: "",
        setData: function(data) {
            var item = data; // JSON.parse(data.json || data);
            var baodata = {};
            var caigoufs = '';
            data = item.datagrid;
            var html = [];
            var type = this.getAttribute('type');
            // 初始化rowid by wxf 2022年4月26日
            var rowids = '';
            for (var i = 0, l = data.length; i < l; i++) {
            	if (item.datagrid[i].rowid) {
            		rowids += item.datagrid[i].rowid + ',';
            	}else {
            		rowids += item.datagrid[i].row_id + ',';
            	}
            }
            this.set({
                'rowids': rowids.trim(',')
            });
            if (type == "qy") {
                var tplUrlqy_text = loadText(this.tplUrlqy);
                for (var i = 0, l = data.length; i < l; i++) {
                    baodata.biaoduanno = data[i].biaoduanno;
                    baodata.biaoduanname = data[i].biaoduanname;
                    baodata.touzigusuan = data[i].touzigusuan;
                    if (baodata.touzigusuan && baodata.touzigusuan != 0) {
                        baodata.touzigusuan = new Number(baodata.touzigusuan).toFixed(2);
                    }
                    baodata.zhaobiaofangshi = data[i].zhaobiaofangshi;
                    baodata.guapaiprice = data[i].guapaiprice;
                    html.push(Mustache.render(tplUrlqy_text, baodata));
                }
                this.el.innerHTML = html.join('');
                /* 不同采购方式的分包信息显示 */
                if (data.length > 0) {
                    caigoufs = data[0].zhaobiaofangshi_value;
                }
                switch (caigoufs) {
                    case 'G':
                    case 'Q':
                        // 招标方式
                        $("[name='biaoduanno'] .tit").text("标段(包)编号");
                        $("[name='biaoduanname'] .tit").text("标段(包)名称");
                        $("[name='touzigusuan'] .tit").text("合同估算(万元)");
                        $("[name='zhaobiaofangshi'] .tit").text("招标方式");
                        break;
                    default:
                        // 非招标方式
                        $("[name='biaoduanno'] .tit").text("分包编号");
                        $("[name='biaoduanname'] .tit").text("分包名称");
                        $("[name='touzigusuan'] .tit").text("预算金额(元)");
                        $("[name='zhaobiaofangshi'] .tit").text("采购方式");

                        break;
                }
            } else {
                var tplUrlbzb_text = loadText(this.tplUrlbzb);
                baodata.bdinfo = data;
                this.el.innerHTML = Mustache.render(tplUrlbzb_text, baodata);
                // 保留两位小数
                $(".format2").each(function() {
                    var a = new Number($(this).text());
                    $(this).text(a.toFixed(2));
                })
                var projectjiaoyitype = "";
                if (data.length > 0) {
                    projectjiaoyitype = data[0].projectjiaoyitype;
                }
                switch (projectjiaoyitype) {
                    case 'M':
                        $("[name='biaoduanno'] .tit").text("分包编号");
                        $("[name='biaoduanname'] .tit").text("分包名称");
                        $("[name='cgys'] .tit").text("预算金额(元)");
                        break;
                    case 'NQ': // 农权交易
                    case 'CQ': // 产权实物、产权股权交易
                    case 'Q': // 产权交易
                    case 'PWQ': // 排污权
                        $("[name='biaoduanno'] .tit").text("标的编号");
                        $("[name='biaoduanname'] .tit").text("标的名称");
                        break;
                    case 'T': // 土地交易
                        $("[name='biaoduanno'] .tit").text("地块编号");
                        $("[name='biaoduanname'] .tit").text("地块名称");
                        break;
                    case 'KQ': // 矿权
                        $("[name='biaoduanno'] .tit").text("矿区编号");
                        $("[name='biaoduanname'] .tit").text("矿区名称");
                        break;
                    default: // 建设工程
                        $("[name='biaoduanno'] .tit").text("标段(包)编号");
                        $("[name='biaoduanname'] .tit").text("标段(包)名称");
                        $("[name='yjfs'] .tit").text("招标方式");
                        break;
                }
                if (projectjiaoyitype == 'M') {
                    $("[name='yjfs']").hide(); // 招标方式
                    $("[name='htgs']").hide(); // 合同估算价
                    $("[name='cqjy']").hide(); // 挂牌价格(万元)
                    $("[name='pgj']").hide(); // 评估价
                    $("[name='bdfirsttype']").hide(); // 污染物种类
                    $("[name='biaoshuprice']").hide(); // 交易数量(吨)
                    $("[name='touzigusuan']").hide(); // 挂牌价格(元/吨*年)
                } else if (projectjiaoyitype == 'Q') {
                    $("[name='htgs']").hide(); // 合同估算价
                    $("[name='cqjy']").hide(); // 挂牌价格(万元)
                    $("[name='cgfs']").hide(); // 采购方式
                    $("[name='pgj']").hide(); // 评估价
                    $("[name='bdfirsttype']").hide(); // 污染物种类
                    $("[name='biaoshuprice']").hide(); // 交易数量(吨)
                    $("[name='touzigusuan']").hide(); // 挂牌价格(元/吨*年)
                } else if (projectjiaoyitype == "NQ" || projectjiaoyitype == "CQ" || projectjiaoyitype == "LQ") {
                    $("[name='htgs']").hide(); // 合同估算价
                    $("[name='cgys']").hide(); // 预算金额(元)
                    $("[name='cgfs']").hide(); // 采购方式
                    $("[name='bdfirsttype']").hide(); // 污染物种类
                    $("[name='biaoshuprice']").hide(); // 交易数量(吨)
                    $("[name='touzigusuan']").hide(); // 挂牌价格(元/吨*年)
                } else if (projectjiaoyitype == "PWQ") {
                    $("[name='yjfs']").hide(); // 招标方式
                    $("[name='htgs']").hide(); // 合同估算价
                    $("[name='cqjy']").hide(); // 挂牌价格(万元)
                    $("[name='cgys']").hide(); // 预算金额(元)
                    $("[name='cgfs']").hide(); // 采购方式
                    $("[name='pgj']").hide(); // 评估价
                } else {
                    $("[name='cqjy']").hide(); // 挂牌价格(万元)
                    $("[name='cgys']").hide(); // 预算金额(元)
                    $("[name='cgfs']").hide(); // 采购方式
                    $("[name='pgj']").hide(); // 评估价
                    $("[name='bdfirsttype']").hide(); // 污染物种类
                    $("[name='biaoshuprice']").hide(); // 交易数量(吨)
                    $("[name='touzigusuan']").hide(); // 挂牌价格(元/吨*年)
                    $("[name='htgs']").hide(); // 合同估算价
                    $("[name='yjfs']").hide(); // 招标方式
                }
            }
        },
        setValue: function(value) {},
        getModule: function() {
            return {
                id: this.id,
                type: this.type,
                action: this.action,
                // 兼容PC写法 by wxf 2022年4月26日
                // 兼容50的页面，老页面使用老控件的，不要把mapclass带回去 by wxf 2022年4月27日
                // mapClass: this.action.indexOf('Phone') > -1 ? "" : this.mapClass,
                mapClass: this.mapClass, // 必然带mapclass
                value: (this.rowids || '').trim(',')
            };
        }
    });
    register(ucjsgcbdlist, 'ep-mui-jsgcbdlist');

    var ucworkitemlist = function(dom) {
        ucworkitemlist.super.constructor.call(this, dom);
    };
    MControl.extend(ucworkitemlist, MControl.UserControl, {
        type: 'workitemlist',
        _init: function() {
            var data = this.getAttribute('data');
            this.bind = this.getAttribute('bind');
            this.action = this.getAttribute('action');
            // 客户端设置数据源
            if (data) {

                data = epm.parseJSON(data);
                this.setData(data);
            }
        },
        tplUrl: '../../frame/fmui/js/tpluc/workitemlist.tpl',
        setData: function(data) {
            var data = JSON.parse(data.json || data); // 这个返回的是string，所以这个代码不改
            var recorddata = {};
            var html = [];
            var tplUrl_text = loadText(this.tplUrl);
            for (var i = 0, l = data.length; i < l; i++) {
                recorddata.operationdate = data[i].operationDate;
                recorddata.transactorname = data[i].transactorName;
                recorddata.activityname = data[i].activityName;
                recorddata.opinion = data[i].opinion;
                if (data[i].operationDate != "") {
                    recorddata.active = "";
                    recorddata.checkmarkempty = "mui-icon-checkmarkempty";
                } else {
                    recorddata.active = "active";
                    recorddata.hidden = "hidden";
                    recorddata.checkmarkempty = "";
                }
                html.push(Mustache.render(tplUrl_text, recorddata));
            }
            this.el.innerHTML = html.join('');

        },
        setValue: function(value) {},
        getModule: function() {
            return {
                id: this.id,
                type: this.type,
                bind: this.bind,
                action: this.action,
                value: this.value
            };
        }
    });
    register(ucworkitemlist, 'ep-mui-workitemlist');

	var ucywscanfilelist = function(dom) {
		ucywscanfilelist.super.constructor.call(this, dom);
	};
	MControl.extend(ucywscanfilelist, MControl.UserControl, {
		type: 'ywscanfilelist',
		_init: function() {
			var data = this.getAttribute('data');
			this.bind = this.getAttribute('bind');
			this.action = this.getAttribute('action');
			this.dataOptions = this.getAttribute('data-options');
			// 客户端设置数据源
			if(data) {
				data = epm.parseJSON(data);
				this.setData(data);
			}
			// 加载formatfile的js
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.src = '../../frame/fmui/js/extend/formatfile.js';
			document.body.appendChild(script);
			// 加载fileinput的js
			script = document.createElement("script");
			script.src = '../../frame/fmui/js/widgets/fileinput/fileinput.js';
			document.body.appendChild(script);
			
			// 附件提示html
			var tipsHtml = '<div class="mask mui-hidden" id="mask"><div class="tips"><div class="tips-head" id="tipshead"></div><p class="tips-content" id="tipscontent">	</p></div></div>',
				filecontainerHtml = '<input class="fileinput mui-hidden" type="file" id="integrity" />'; // 文件容器html
			$("body").append(tipsHtml).append(filecontainerHtml);
		},
		tplUrl : '../../frame/fmui/js/tpluc/ywscanfilelist.tpl', 
		tplUrlOld : '../../frame/fmui/js/tpluc/ywscanfilelistold.tpl', 
		setData: function(data) {
			// 自动判断后端是新控件还是老控件 by wxf 2022年4月27日
			var oriData = data; // JSON.parse(data.json || data);
			// 判断条件如下：如果datagrid为空（一般不太可能），或datagrid不为空且包含attachex节点，则使用老控件
			if(oriData.datagrid.length == 0 || (oriData.datagrid.length > 0 && oriData.datagrid[0].attachex)) {
	            for (var i = 0; i < oriData.datagrid.length; i++) {
	            	oriData.datagrid[i].attachex = JSON.parse(oriData.datagrid[i].attachex);
	                if (oriData.datagrid[i].filetype == '2' || oriData.datagrid[i].filetype == '11') {
	                	oriData.datagrid[i].unsupported = '1'; // 此字段用于标识手机上不能处理该类型附件
	                }
	            }
	            var tplUrlOld_text = loadText(this.tplUrlOld);
	            this.el.innerHTML = Mustache.render(tplUrlOld_text, oriData);
			}
			else{
				this.renderAttach(data, this.action);
				this.initListeners();
			}
		},
		setValue: function(value) {
		},
		getModule: function() {
			return {
				id: this.id,
				type: this.type,
				bind: this.bind,
				action: this.action,
				value: this.value,
				mapClass : 'com.epoint.ztb.tradecontrols.ywscanfilelist.YWScanFileView',
				dataOptions : this.dataOptions
			};
		},
		// 附件上传操作
		upload: function(file, filecode) {
			var _this = this;
			var size = FormatFile.getKMByByte(file.size),
			img = FormatFile.getFileIcon(file.name);
			var file = {
				name: file.name,
				size: size,
				img: img,
				file: file,
			};
			
			var url = ztbphone.dealUrl(epointm.getCache('action') + '.action?cmd=mobilefileupload') ;
			// 从隐藏的viewdata里面拿到rowguid
			var dtoData = {
				filecode: filecode,
				ClientGuid:_this.clientguid,
				commonDto : '[{"id":"_common_hidden_viewdata","type":"hidden","value":' + epm.get('_common_hidden_viewdata').value + '}]'
			}
			// 重放攻击，签名防御 by wxf 2021年12月7日
			dtoData = epm.addReplayAttackData(dtoData, url);
			console.log(url);
			console.log(dtoData);
			Util.upload({
				url: url,
				data: dtoData,
				files: file,
				beforeSend: function(){
					console.log("准备上传");
				},
				success: function (response, detail) {
					_this.renderAttach('', _this.action);
	                ejs.ui.closeWaiting();
	            },
	            error: function (msg, detail) {
	                console.log("上传失败:" + msg);
	                console.log("detail:" + detail);
	                ztbphone.toast('上传失败');
	                ejs.ui.closeWaiting();
	            },
	            uploading: function (percent, msg, speed) {
	                console.log("上传中:" + percent + ',msg:' + msg + ',speed:' + speed);
	                ejs.ui.showWaiting('上传中...');
	            }
			});
		},
		// 附件删除操作
		deleteAttach: function(elem, id){
			var _this = this;
			var filecode = $(elem).attr("filecode");
			epointm.confirm('确认要删除吗？', '删除确认', function(e) {
				epointm.execute('deleteAttach', '', [id, filecode], function(ret){
					if(ret == '删除成功！'){
						_this.renderAttach('', _this.action);
					}
					ztbphone.toast(ret);
				});
			})
		},
		// 渲染附件数据，有data时直接用data渲染，否则使用action向后台请求数据。
		renderAttach: function(data, action){
			var _this = this;
			var url = _this.tplUrl;
			if(!data && action){
				// 兼容action属性已经有get的情况，没有的话首字母大写，并拼上get
				if(!action.startsWith('get')){
					var char0 = action.charAt(0).toUpperCase();
					action = 'get' + char0 + action.substring(1);
				}
				epointm.execute(action, '@all', '', function(ret){
					var attachdata = JSON.parse(ret);
					var html = Mustache.render(loadText(url), attachdata);
					_this.el.innerHTML = html;
					// 格式文件大小
					$.each($(".em-attach-info .size"), function(a,b){
						$(b).html(FormatFile.getKMByByte($(b).html()));
					});
					// 根据文件名显示对应的文件类型图片
					$.each($(".em-attach-info img"), function(a,b){
						$(b).attr("src", FormatFile.getFileIcon($(b).attr("filename")));
					});
					$(".file-container .em-table-view-cell").css("padding", 0);
				});
			}else{
				var attachdata = data; // JSON.parse(data.json || data);
				_this.el.innerHTML = Mustache.render(loadText(url), attachdata);
				
				if (true == data.readonly) {
					$(_this.el).find("span.mui-icon-upload").hide(); 	// 当只读时需要控制上传按钮是否显示；
					$(_this.el).find("i.mui-icon-trash").hide();		// 当只读时需要控制删除按钮是否显示；
				}
				// 格式文件大小
				$.each($(".em-attach-info .size"), function(a,b){
					$(b).html(FormatFile.getKMByByte($(b).html()));
				});
				// 根据文件名显示对应的文件类型图片
				$.each($(".em-attach-info img"), function(a,b){
					$(b).attr("src", FormatFile.getFileIcon($(b).attr("filename")));
				});
				$(".file-container .em-table-view-cell").css("padding", 0);
			}
			
		},
		// 注册点击事件
		initListeners: function(){
			var _this = this;
			// 上传
			$(_this.el).on('tap', '.mui-icon-upload', function(e) {
				_this.filecode = $(this).attr("filecode");
				_this.clientguid = $(this).attr("clientguid");
				$('#integrity').click();
			});
			
			// 生成
			$(_this.el).on('tap', '.mui-icon-gear', function(e) {
				ztbphone.openPage(this.dataset.previewurl, '', function(ret) {
					// epointm.refresh();
					window.location.reload();
				});
			});
			
			// 删除
			$(_this.el).on('tap', '.mui-icon-trash', function(e) {
				_this.deleteAttach(this.parentElement.parentElement.parentElement, this.dataset.id);
			});
			
			// 预览
			$(_this.el).on('tap', '.mui-icon-search', function(e) {
				var url = this.dataset.previewurl;
				var fileName = this.dataset.name;
				ztbphone.phonePreviewAttach(fileName, url);
			});
			
			// 下载
			$(_this.el).on('tap', '.mui-icon-download', function(e) {
				var url = this.dataset.downurl;
				var fileName = this.dataset.name;
				ztbphone.phoneDownloadAttach(fileName,$(this).attr("filecode"), url);
			});
			
			new FileInput({
				container: '#integrity',
				isMulti: false,
				type: 'All',
				success: function(b64, file, detail) {
					_this.upload(file, _this.filecode);
				},
				error: function(error) {
					console.error(error);
				}
			});
		}
	});
	register(ucywscanfilelist, 'ep-mui-ywscanfilelist');

    var fileupload = function(dom) {
        fileupload.super.constructor.call(this, dom);
    };
    MControl.extend(fileupload, MControl.UserControl, {
        type: 'fileupload',
        filecode: '', // 记录filecode
        _init: function() {
            this.bind = this.getAttribute('bind');
            this.action = this.getAttribute('action');

            // 加载formatfile的js
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = '../../frame/fmui/js/extend/formatfile.js';
            document.body.appendChild(script);
            // 加载fileinput的js
            script = document.createElement("script");
            script.src = '../../frame/fmui/js/widgets/fileinput/fileinput.js';
            document.body.appendChild(script);

            // 附件提示html
            var tipsHtml = '<div class="mask mui-hidden" id="mask"><div class="tips"><div class="tips-head" id="tipshead"></div><p class="tips-content" id="tipscontent">	</p></div></div>',
                filecontainerHtml = '<input class="fileinput mui-hidden" type="file" id="integrity" />'; // 文件容器html
            $("body").append(tipsHtml).append(filecontainerHtml);
        },
        tplUrl: '../../frame/fmui/js/tpluc/fileupload.tpl',
        setData: function(data) {
            this.renderAttach(data, this.action);
            this.initListeners();
        },
        setValue: function(value) {},
        getModule: function() {
            return {
                id: this.id,
                type: this.type,
                bind: this.bind,
                action: this.action,
                value: this.value
            };
        },
        // 附件上传操作
        upload: function(file, filecode) {
            var _this = this;
            var size = FormatFile.getKMByByte(file.size),
                img = FormatFile.getFileIcon(file.name);
            var file = {
                name: file.name,
                size: size,
                img: img,
                file: file,
            };

            var url = ztbphone.dealUrl(epointm.getCache('action') + '.action?cmd=mobilefileupload');
            // 从隐藏的viewdata里面拿到rowguid
            var dtoData = {
                filecode: filecode,
                commonDto: '[{"id":"_common_hidden_viewdata","type":"hidden","value":' + epm.get('_common_hidden_viewdata').value + '}]'
            }
            // 重放攻击，签名防御 by wxf 2021年12月7日
            dtoData = epm.addReplayAttackData(dtoData, url);
            Util.upload({
                url: url,
                data: dtoData,
                files: file,
                beforeSend: function() {
                    console.log("准备上传");
                },
                success: function(response, detail) {
                    _this.renderAttach('', _this.action);
                    ejs.ui.closeWaiting();
                },
                error: function(msg, detail) {
                    console.log("上传失败:" + msg);
                    console.log("detail:" + detail);
                    ztbphone.toast('上传失败');
                    ejs.ui.closeWaiting();
                },
                uploading: function(percent, msg, speed) {
                    console.log("上传中:" + percent + ',msg:' + msg + ',speed:' + speed);
                    ejs.ui.showWaiting('上传中...');
                }
            });
        },
        // 附件删除操作
        deleteAttach: function(elem, id) {
            var _this = this;
            var filecode = $(elem).attr("filecode");
            epointm.confirm('确认要删除吗？', '删除确认', function(e) {
                epointm.execute('deleteAttach', '', [id, filecode], function(ret) {
                    ztbphone.toast(ret);
                    if (ret == '删除成功！') {
                        _this.renderAttach('', _this.action);
                    }
                });
            })
        },
        // 渲染附件数据，有data时直接用data渲染，否则使用action向后台请求数据。
        renderAttach: function(data, action) {
        	var _this = this;
            var url = this.tplUrl;
            if (!data && action) {
                // 兼容action属性已经有get的情况，没有的话首字母大写，并拼上get
                if (!action.startsWith('get')) {
                    var char0 = action.charAt(0).toUpperCase();
                    action = 'get' + char0 + action.substring(1);
                }
                epointm.execute(action, '@all', '', function(ret) {
                    var attachdata = JSON.parse(ret);
                    for (var i = 0; i < attachdata.datagrid.length; i++) {
                        attachdata.datagrid[i].attachex = JSON.parse(attachdata.datagrid[i].attachex);
                    }
                    var html = Mustache.render(loadText(url), attachdata);
                    _this.el.innerHTML = html;
                    // 格式文件大小
                    $.each($(".em-attach-info .size"), function(a, b) {
                        $(b).html(FormatFile.getKMByByte($(b).html()));
                    });
                    // 根据文件名显示对应的文件类型图片
                    $.each($(".em-attach-info img"), function(a, b) {
                        $(b).attr("src", FormatFile.getFileIcon($(b).attr("filename")));
                    });
                    $(".file-container .em-table-view-cell").css("padding", 0);
                });
            } else {
                var attachdata = JSON.parse(data);
                for (var i = 0; i < attachdata.datagrid.length; i++) {
                     attachdata.datagrid[i].attachex = JSON.parse(attachdata.datagrid[i].attachex);
                }
                var html = Mustache.render(loadText(url), attachdata);
                _this.el.innerHTML = html;
                // 格式文件大小
                $.each($(".em-attach-info .size"), function(a, b) {
                    $(b).html(FormatFile.getKMByByte($(b).html()));
                });
                // 根据文件名显示对应的文件类型图片
                $.each($(".em-attach-info img"), function(a, b) {
                    $(b).attr("src", FormatFile.getFileIcon($(b).attr("filename")));
                });
                $(".file-container .em-table-view-cell").css("padding", 0);
            }

        },
        // 注册点击事件
        initListeners: function() {
            var _this = this;
            $(_this.el).on('tap', '.em-attach-info', function(e) {
                var self = this,
                    $icon = $(this).find('i'),
                    parentElem = self.parentElement;

                if (parentElem.classList.contains('active')) {
                    parentElem.classList.remove('active');
                    $icon.removeClass('mui-icon-arrowdown').addClass('mui-icon-arrowup');
                } else {
                    parentElem.classList.add('active');
                    $icon.removeClass('mui-icon-arrowup').addClass('mui-icon-arrowdown');
                }
            });

            // 关闭说明
            document.getElementById('mask').addEventListener('tap', function(e) {
                if (e.target.id === 'mask') {
                    this.classList.add('mui-hidden');
                }
            });
            // 打开说明
            $(_this.el).on('tap', '.icon-tips', function(e) {
                var $tips = $(this).prev();
                $("#tipshead").html($tips.text());
                $("#tipscontent").html($tips.attr("tips-content"));
                document.getElementById('mask').classList.remove('mui-hidden');
            });

            // 附件上传
            $(_this.el).on('tap', '.icon-input', function(e) {
                // flag = this.dataset.num;
                _this.filecode = $(this).attr("filecode");
                $('#integrity').click();
            });

            // 附件按钮
            $(_this.el).on('tap', '.attach-button', function(e) {
                var self = this,
                    name = this.innerText,
                    parentElem = this.parentElement.parentElement.parentElement;

                switch (name) {
                    case '删除':
                        var id = self.dataset.id;

                        _this.deleteAttach(parentElem, id);
                        break;
                    case '预览':
                        var url = self.dataset.url;
                        var fileName = $(this).attr("filename");
                        ztbphone.phonePreviewAttach(fileName, url);
                        break;
                    default:
                        break;
                }
            });
            new FileInput({
                container: '#integrity',
                isMulti: false,
                type: 'All',
                success: function(b64, file, detail) {
                    _this.upload(file, _this.filecode);
                },
                error: function(error) {
                    console.error(error);
                }
            });
        }
    });
    register(fileupload, 'ep-mui-fileupload');

    function loadText(url) {
        var text = "";
        var isLocal = document.all && location.protocol == "file:";

        var xmlhttp = null;
        if (isLocal) {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } else {
            if (window.XMLHttpRequest) { // for all new browsers
                xmlhttp = new XMLHttpRequest();
            } else if (window.ActiveXObject) { // for IE5 and IE6
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
        }


        xmlhttp.onreadystatechange = state_Change;

        var d = '_=' + new Date().getTime();
        if (url.indexOf("?") == -1) d = "?" + d;
        else d = "&" + d;
        url += d;
        xmlhttp.open("GET", url, false);
        xmlhttp.send(null);

        function state_Change() {
            if (xmlhttp.readyState == 4) {
                var statusCode = isLocal ? 0 : 200;
                if (xmlhttp.status == statusCode) {
                    text = xmlhttp.responseText;
                } else {
                    // error
                }
            }
        }
        return text;
    }
    MControl.init();
})();