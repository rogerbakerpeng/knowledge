/**
 * 作者: guotq 时间: 2019-6-18 描述: 定义一些控件
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
			return this.value;
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
			var self = this;
			this.el.addEventListener('change', function (e) {
				self.value = self.el.value;
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
			this.isMulti = this.getAttribute('isMulti') || false;
			this.url = this.getAttribute('url');
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
				var formdata = new FormData();

				self.fileName = [];
				formdata.append('id', self.id);

				for (var i = 0, len = files.length; i < len; i++) {
					var file = files[i];

					self.fileName.push({
						name: file.name
					});
					formdata.append('name', file.name);
					formdata.append('type', file.type);
					formdata.append('size', file.size);
					formdata.append('lastModifiedDate', file.lastModifiedDate);
					formdata.append('file', file);
				}

				var data = self.onGetRequestData();

				if (data) {
					formdata.append('commonDto', data.commonDto);
				}

				formdata.append(''.concat(self.id, '_action'), 'upload');
				formdata.append(''.concat(self.id, '_fileCount'), files.length);
				formdata.append(''.concat(self.id, '_fileLoadedCount'), '0');

				self._upload(formdata);
			});
		},
		_upload: function (formdata) {
			var self = this;
			var fileName = this.fileName;
			var tpl = this.tpl;

			$.ajax({
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
					console.log(response);

					var item = '';

					if (Array.isArray(fileName)) {
						fileName.forEach(function (e) {
							item += Mustache.render(tpl, e);
						});

						self.el.querySelector('.webuploader-filelist').innerHTML = item;
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
			input.accept = 'image/*';

			if (this.isMulti) {
				input.multiple = 'multiple';
			}

			return input;
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
		type: 'selectcontact',
		_init: function () {
			this.bind = this.getAttribute('bind');

			var self = this;

			this.el.addEventListener('tap', function () {
				ejs.contact.choose({
					userguids: self.value.split(','),
					success: function (result) {
						var resultData = result.resultData,
							value = '',
							text = '';

						self.value = '';
						self.text = '';
						self.el.innerHTML = '';
						resultData.forEach(function (e, i) {
							if (i === resultData.length - 1) {
								value += e.userguid;
								text += e.username;
							} else {
								value += e.userguid + ',';
								text += e.username + ',';
							}
						});

						self.value = value;
						self.text = text;

						self.setText(text);
					}
				});
			});
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
		},
		_templ: '<span class="mui-badge mui-badge-primary mr10">{{username}}</span>',
		getModule: function () {
			return {
				id: this.id,
				bind: this.bind,
				type: this.type,
				value: this.value,
				text: this.text
			};
		}
	});

	register(SelectContact, 'ep-mui-selectcontact');

	var TreeSelect = function (dom) {
		TreeSelect.super.constructor.call(this, dom);
	};

	extend(TreeSelect, MControl, {
		type: 'treeselect-non-nested',
		_init: function () {
			this.action = this.getAttribute('action');
			this.url = this.getAttribute('url');
			this.rootName = this.getAttribute('rootName') || '根';

			var self = this;

			this.el.addEventListener('tap', function () {
				ejs.page.open({
					pageUrl: "./treeselect.html",
					data: {
						id: self.id,
						rootname: self.rootName
					},
					success: function (result) {
						var resultData = result.resultData;

						self.setValue(resultData.value);
						self.setText(resultData.text);
					},
					error: function (error) {}
				});

			});
		},
		setValue: function (value) {
			this.value = value;
		},
		setText: function (text) {
			this.text = text;
			this.el.innerHTML = text;
		},
		setData: function (data) {
			this.data = data;
			this.setStorage();
		},
		setStorage: function () {
			var localStorage = window.localStorage;

			if (localStorage) {
				window.localStorage.setItem(''.concat(this.id, '_comdto'), JSON.stringify(this.data));
			} else {
				Util.ejs.ui.toast('你的浏览器不支持 localStorage API');
			}
		},
		getModule: function () {
			return {
				id: this.id,
				action: this.action,
				idField: 'id',
				textField: "text",
				imgField: "img",
				iconField: "iconCls",
				parentField: 'pid',
				url: this.url,
				valueField: 'id',
				pinyinField: 'tag',
				type: this.type,
				value: this.value,
				text: this.text
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
			var optionsJson = this.getAttribute('data-options') || '{}';
			var options = epm.parseJSON(optionsJson);
			var opts = {};
			var data = this.getAttribute('data');

			if (options.buttons) {
				opts.buttons = options.buttons;

				delete options.buttons;
			}

			this.options = options;

			this.bind = this.getAttribute('bind');
			this.action = this.getAttribute('action');

			var self = this;
			this.picker = new mui.PopPicker(opts);

			// 客户端设置数据源
			if (data) {
				data = epm.parseJSON(data);
				this.setData(data);
			}
			this.el.addEventListener('tap', function (event) {
				self.picker.show(function (items) {
					self.setValue(items[0].value);
				});
			}, false);

			// 绑定change事件，在值改变时同步text
			this.picker.body.addEventListener('change', function (e) {
				var item = e.detail.item,
					text = item.text,
					value = item.value;

				self.setText(text);
				self.value = value;
			});
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
			this.value = value;

			if (this.picker.pickers[0]) {
				this.picker.pickers[0].setSelectedValue(value);
			}
		},
		setData: function (data) {
			this.data = data;
			this.picker.setData(data);
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

			if (this.radios) {
				var radios = this.radios;
				for (var i = 0, l = radios.length; i < l; i++) {
					if (radios[i].value == value) {
						radios[i].checked = true;
						break;
					}
				}
			}
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

			if (this.checkboxs) {
				var checkboxs = this.checkboxs;
				for (var i = 0, l = checkboxs.length; i < l; i++) {
					if (value.indexOf(checkboxs[i].value) > -1) {
						checkboxs[i].checked = true;
					}
				}
			}
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
			this.bind = this.getAttribute('bind');
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
				bind: this.bind
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
			this.bind = this.getAttribute('bind');
			this.onitemclick = this.getAttribute('onitemclick');

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
				bind: this.bind
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
			this.bind = this.getAttribute('bind');
			this.workflowPageUrl = this.getAttribute('workflowPageUrl') || '';
			this.pviGuid = '';
			this.operationGuid = '';
			this.transitionGuid = '';
			this.workitemGuid = '';
			this.afterbtn = null;
		},
		setData: function (data) {
			data = typeof data === 'string' ? JSON.parse(data) : data;
			this.data = data;

			var workitemGuid = data.workitemguid || Util.getExtraDataByKey('WorkItemGuid');
			var pviguid = data.pviguid || Util.getExtraDataByKey('ProcessVersionInstanceGuid');

			if (data && data.message) {
				Util.ejs.ui.toast(data.message);
				return;
			}

			this.workitemGuid = workitemGuid;
			this.pviGuid = pviguid;
			// 按钮操作集合
			this.btns = data.btn;
			this.acthtml = data.acthtml || '提交';

			// 设置右侧按钮
			this._setRightBtn(true);

			console.log(data);
		},
		_setRightBtn: function (isShow) {
			ejs.navigator.setRightBtn({
				isShow: isShow,
				text: this.acthtml,
				success: function () {
				    self._showActionSheet();
				}
			});
		},
		_showActionSheet: function () {
			var self = this;

			ejs.ui.actionSheet({
				items: this.btns.map(function (e) {
					return e.text;
				}),
				success: function (result) {
					var btn = self.btns[result.which];

					self.btn = btn;
					self._AjaxOperation(btn.operationguid, btn.transitionguid, btn.operationtype, btn.beforeact, btn.afteract, btn.isrequireopinion);
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
			this.transitionGuid = this.transitionGuid || '';

			var params = {
				transitionguid: this.transitionGuid,
				operationguid: this.operationGuid,
				pviguid: this.pviGuid,
				workitemguid: this.workitemGuid
			};

			epointm.execute('getPageUrlOfOperate', '@none', epm.encodeUtf8(epm.encodeJson(params)), this._AjaxOperationHd);
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
									.encodeJson(response)), self._AjaxOperationHd);
							} else {
								self._ShowTdOperate(true);
							}
						}
					});
				} else if (response.url) { // 返回url需要打开操作处理页面
					if (this.workflowPageUrl) {
						// messageitemguid, operationname, operationguid, is_requireopinion, targetactivitylist, targetActivityname, targetActivityguid
						// splittype, activityname, workitemguid
						ejs.page.open(this.workflowPageUrl, {
							messageitemguid: '',
							operationname: response.operationname,
							operationguid: this.operationGuid,
							is_requireopinion: this.isrequireopinion,
							targetactivitylist: '',
							targetActivityname: '',
							targetActivityguid: '',
							splittype: '',
							activityname: response.activityname,
							workitemguid: this.workitemGuid
						});
					}
				} else if (response.operationtype &&
					(response.operationtype == 25 || response.operationtype == "SendToSign")
					(!response.message || response.message == "Success")) {

					this._AfterClick();
					this._ShowTdOperate(true);
				} else if (!response.message || response.message == "Success") {
					this._AfterClick();
					this._CloseMe();
				} else if (response.message) {
					Util.ejs.ui.alert(response.message);
					this._ShowTdOperate(true);
				}
			} else {
				this._ShowTdOperate(true);
			}
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
			} catch (err) {
			}
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
				bind: this.bind,
				type: this.type
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
				//
				// if(total <= self.pageSize * (self.pageIndex + 1)) {
				// self.pullToRefresh.isShouldNoMoreData = false;
				// }

			};

			// 点击回调
			var onClickCallback = function (e) {
				if (self.onItemClick) {
					self.onItemClick.call(this, e, this.id, JSON.parse(this.getAttribute('extras')));
				}
			};

			var init = function () {
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
					skin: 'type3',
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
						'frame/fmui/js/widgets/pulltorefresh/pulltorefresh.skin.type3.js',
						'frame/fmui/js/widgets/pulltorefresh/pulltorefresh.skin.css',
					],
					'frame/fmui/js/widgets/pulltorefresh/pulltorefresh.bizlogic.impl.js', init);
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
 * 作者: guotq 时间: 2019-6-18 描述: f9移动端适配文件 MControl 目前作为文件引入，全局绑定在window上
 */
(function (win, $) {

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
			this.components[id] = control;
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
			var Hex2Utf8 = this.Hex2Utf8;
			var Str2Hex = this.Str2Hex;
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
			var Dec2Dig = this.Dec2Dig;
			for (var i = 0; i < s.length; i++) {
				c = s.charAt(i);
				n = ss.indexOf(c);
				digS += Dec2Dig(eval(n));
			}
			// return value;
			return digS;
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
})(window, mui);

(function () {
	"use strict";

	// epointm内容
	(function () {
		// 先初始化页面上的控件
		MControl.init(function (control) {
			var controlType = control.type;

			if (controlType == 'datagrid' || controlType == 'webuploader') {
				control.onGetRequestData = function () {
					// 获取自己的数据模型
					var data = null;

					data = new CommonDto(this.id).getData(true);

					if (controlType == 'datagrid') {
						data[0].isSecondRequest = true;
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

		function dealUrl(url, isCommondto) {
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
		}

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
					return mui('[class^="ep-mui-"]', $scope);
				}
			}

			if (scope != '@none') {
				if (!scope || scope === '@all') {
					controls = mui('[class^="ep-mui-"]');
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
						mcontrol.setUrl(dealUrl(this.action + '.' + mcontrol.action));
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
					data.push({
						id: '_common_hidden_viewdata',
						type: 'hidden',
						value: ''
					});
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
					if (item.data && control.setData) {
						if (control.type === 'treeselect-non-nested') {
							control.setText(item.text);
							control.setData(item);
						} else {
							control.setData(item.data);
						}

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
					url: epm.isMock ? url : dealUrl(url, true),
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
						url: epm.isMock ? url : dealUrl(url, true),
						params: (params ? (typeof params == 'string' ? params : mini.encode(params)) : null),
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
							Util.ejs.ui.toast(el.previousElementSibling.innerHTML + '不能为空');
							return false;
						}
					}

					// 验证是否有 vtype
					if (vtype && vtypes.indexOf(vtype) !== -1) {
						if (!Util.string[vtype](value)) {
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
				console.log(compareId);
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