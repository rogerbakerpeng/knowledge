/**
 * 作者: 戴荔春
 * 创建时间: 2017/05/24
 * 版本: [3.0, 2017/05/24 ]
 * 版权: 移动研发部
 * 描述: 抽象ejs demo演示页面的业务逻辑代码
 */
(function(exports) {
	"use strict";

	var listLitemplate = Util.litemplate.defaultLitemplate.extend({
		/**
		 * @description 重写刷新整个页面的方法，对应的API环境改变了
		 * @param {String} evn
		 */
		refresh: function(evn) {
			var self = this;
			// 默认为ALL
			evn = evn || 'default';
			var title = self.options.title;
			if(evn != 'default') {
				title += '-' + evn;
			}
			if(!Util.os.ejs) {
				var titleDom = document.getElementById('title');
				titleDom.innerText = title;
			} else {
				ejs.navigator && ejs.navigator.setTitle(title);
			}
			self.generateRunCodeLayout(evn);
		},
		/**
		 * @description 初始化
		 */
		initBiz: function() {
			var self = this;
			self._super();
			// 增加额外的监听
			mui(self.appDom).on('tap', 'li>a', function() {
				var runCode = self.getRunCodeById(this.id);
				runCode && runCode();
			});
		},
		/**
		 * @description 显示消息
		 * @param {String} msg
		 */
		showTips: function(msg, isAlert) {
			if(isAlert) {
				ejs.ui.alert(msg, '提示');
			} else {
				ejs.ui.toast(msg);
			}

		},
		/**
		 * @description 根据runcode,生成出来在页面显示
		 * @param {String} evn 对应的环境
		 */
		generateRunCodeLayout: function(evn) {
			var self = this;
			//获取运行代码并生成示例
			var runCodeData = self.getEjsRunCodeData() || self.options.ejsApi;
			self.runCodeData = runCodeData;
			if(!runCodeData) {
				return;
			}
			self.getRunCodeHtmlByData(evn, runCodeData, function(html) {
				if(html) {
					self.appDom.innerHTML = html;
				}

			});

		},
		/**
		 * @description 根据传入的id找到对应的执行代码
		 * @param {String} id
		 */
		getRunCodeById: function(id) {
			var self = this;
			if(!id) {
				return;
			}
			var loop = function(data) {
				var runCode;
				if(!Array.isArray(data)) {
					//如果这个数据本身就是允许代码
					if(data.id == id) {
						runCode = data.runCode;
					} else if(data.items && Array.isArray(data.items)) {
						for(var i = 0, len = data.items.length; i < len; i++) {
							var tmpCode = loop(data.items[i]);
							if(tmpCode) {
								runCode = tmpCode;
								break;
							}
						}
					}

				} else {
					//这个是父元素
					//for in循环效率较低，但是方便，有一个取舍点
					for(var i = 0, len = data.length; i < len; i++) {
						var tmpCode = loop(data[i]);
						if(tmpCode) {
							runCode = tmpCode;
							break;
						}
					}
				}
				return runCode;
			};
			var runCode = loop(self.runCodeData);

			return runCode;
		},
		/**
		 * @description 传入数据,然后
		 * @param {String} evn 对应的环境
		 * @param {JSON} runCodeData 对应数据
		 * @param {Function} callback
		 */
		getRunCodeHtmlByData: function(evn, runCodeData, callback) {
			var self = this;
			var loop = function(data) {
				var html = '';
				if(!Array.isArray(data)) {
					//如果这个数据本身就是允许代码
					if(!data.items) {
						data.evn = data.evn || '';
						if(!self.checkEvn(evn, data.evn)) {
							// 如果环境不符合要求，不显示
							return html;
						}
						html += '<li class="mui-table-view-cell">';
						if(data.evn) {
							var tmpEvn = data.evn;
							var classStr = '';
							if(data.evn == 'h5') {
								classStr = ' blue';
							} else if(data.evn == 'ejs') {
								classStr = ' green';
							} else if(data.evn == 'dd') {
								classStr = ' purple';
							} else if(data.evn == 'ejs_dd') {
								// 省略
								tmpEvn = 'ed';
								// 同时ejs 和dd
								classStr = ' yellow';
							} else if(data.evn == 'ejs_h5') {
								// 省略
								tmpEvn = 'eh';
								// 同时ejs 和dd
								classStr = ' yellow';
							} else if(data.evn == 'ejs_dd_h5') {
								// 省略
								tmpEvn = 'edh';
							}
							// 目前在任何环境下都显示左侧标识
							html += '<div class="topleft-triangle' + classStr + '"></div><div class="topleft-text">' + tmpEvn + '</div>'; 				
						}

						html += '<a class="mui-navigate-right" id="' + data.id + '">';
						html += data.text;
						html += '</a>';
						html += '</li>';
					} else if(data.items && Array.isArray(data.items)) {
						for(var i = 0, len = data.items.length; i < len; i++) {
							html += loop(data.items[i]);
						}
					}

				} else {
					//这个是父元素
					//for in循环效率较低，但是方便，有一个取舍点
					for(var i = 0, len = data.length; i < len; i++) {
						html += loop(data[i]);
					}
				}
				return html;
			};
			var html = '';
			if(runCodeData) {
				html = '<ul class="mui-table-view ">';

				html += loop(runCodeData);

				html += '</ul>';

			}

			callback && callback(html);

		},
		/**
		 * @description 坚持环境与API的evn是否匹配
		 * @param {String} evn
		 * @param {String} tag
		 */
		checkEvn: function(evn, tag) {
			// 默认是ejs环境
			evn = evn.toLowerCase(evn);
			tag = tag.toLowerCase(tag);
			tag = tag.replace(/_/g, '、');
			var evnArr = evn.split('、');
			var tagArr = tag.split('、');
			if(evn == 'default' || tag == '') {
				// tag为''时代表不是API，默认也可以显示
				return true;
			} else {
				for( var i = 0, len = tagArr.length; i < len; i ++ ) {
					var index = evnArr.indexOf(tagArr[i]);
					if(index != -1) {
						evnArr.splice(index, 1);
					}
				}
				if(evnArr.length) {
					return false;
				} else {
					return true;
				}
				
			}
		},
		/**
		 * @description 获取ejs执行代码
		 * @return {JSON} 返回可执行代码
		 */
		getEjsRunCodeData: function() {
			//以模块划分
			var ejsRunCode = [{
				'id': 'ejs_v1',
				'text': 'ejs_v1',
			}, {
				'id': 'ejs_v2',
				'text': 'ejs_v2',
				'runCode': function() {
					console.log("执行");
				}
			}];

			//不返回就会默认用options里的
		},
	});

	window.Util = window.Util || {};
	Util.litemplate = Util.litemplate || {};
	Util.litemplate.listLitemplate = listLitemplate;
})({});