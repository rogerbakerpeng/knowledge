/** 
 * 作者： 孙尊路
 * 创建时间：2017/08/28 10:22
 * 版本： [1.0, 2017/08/28]
 * 版权： 江苏国泰新点软件有限公司
 * 描述：  通用工作流---个人意见模板页面
 **/
"use strict";

Util.loadJs([
	'js/common/common.js',
	'js/widgets/mui.picker/mui.picker.css',
	'js/widgets/mui.poppicker/mui.poppicker.css',
	'js/widgets/mui.picker/mui.picker.js',
	'js/widgets/mui.poppicker/mui.poppicker.js',
], function() {
	customBiz.configReady();
});

/**
 * @description 所有业务处理
 */
var customBiz = {
	// 初始化校验，必须调用
	// 注，如果没有组件API需要注册，可以传空，注册组件时，必须容器支持对应组件才能注册成功
	configReady: function() {
		var self = this;

		Config.configReady([], function() {
			self.initListeners();
		}, function(error) {});

	},
	initListeners: function() {
		var self = this;
		ejs.navigator.setRightBtn({
			text: '确定',
			which: 0,
			// 设置图片的优先级会较高
			success: function(result) {
				var lis = document.getElementById("listdata").querySelectorAll("li");
				for(var i = 0; i < lis.length; i++) {
					if(lis[i].querySelector("input").checked) {
						var selectItem = lis[i].querySelector("label").innerText.trim();
						ejs.page.close({
							resultData: {
								selectItem: selectItem
							}
						});
					}
				}
			}
		});
		//区域滚动
		mui(".mui-scroll-wrapper").scroll({
			bounce: false
		});
		// 列表项
		mui('.em-todo-table-view').on('tap', '.mui-table-view-cell', function() {
			var _this = Zepto(this);
			if(!_this.hasClass('em-todo-active')) {
				_this.addClass('em-todo-active').siblings().removeClass('em-todo-active');
				_this.siblings().find('input').removeAttr('checked');
				_this.find('input').attr('checked', 'checked');

			} else {
				_this.find('input').attr('checked', 'checked');
			}
		});

		// 取消
		self.maskNode = document.querySelector('.em-mask');
		self.tipsWrapperNode = document.querySelector('.em-tips');
		document.querySelector('.em-cancel').addEventListener('tap', function() {
			self.maskNode.style.display = "none";
			self.tipsWrapperNode.style.display = "none";
		});
		// 确认
		document.querySelector('.em-confirm').addEventListener('tap', function() {
			var opiniontext = document.getElementById("content").value;
			var len = opiniontext.length;
			if(parseInt(len) < 50) {
				self.addMyOpinion(opiniontext)
			} else {
				ejs.ui.toast("最多可以输入50个字符！");
			}
		});

		//新增模板
		document.querySelector('.em-todo-add-temple').addEventListener('tap', function() {
			self.maskNode.style.display = "block";
			self.tipsWrapperNode.style.display = "block";

			/**
			ejs.ui.prompt({
				title: "新增模板",
				hint: "请输入模板名称",
				text: "",
				lines: 1,
				maxLength: 10000,
				buttonLabels: ['取消', '确定'],
				cancelable: 1,
				success: function(result) {
					// 点击任意一个按钮都会回调
					//alert(JSON.stringify(result));
					if(result.which == "1") {
						var opiniontext = result.content;
						var len = opiniontext.length;
						if(parseInt(len) < 50) {
							self.addMyOpinion(opiniontext)
						} else {
							ejs.ui.toast("最多可以输入50个字符！");
						}
					}
				}
			});
			
			**/
		});

		// 获取用户意见模板列表
		self.getUserOpinion();
	},
	/**
	 * 获取个人意见模板
	 */
	getUserOpinion: function() {
		var self = this;
		common.ajax({
			url: "opinion_getuseropinion_v7",
			data: {},
			dataPath: "custom.opinionlist",
		}, function(result) {
			//ejs.ui.showDebugDialog(JSON.stringify(result))

			if(result.code == "1") {
				console.log(JSON.stringify(result));
				//ejs.ui.showDebugDialog(JSON.stringify(result))
				var tmpInfo = result.data;
				var template = document.getElementById("tmp01").innerHTML;
				var html = '';
				if(tmpInfo && Array.isArray(tmpInfo) && tmpInfo.length > 0) {
					// 有数据
					mui.each(tmpInfo, function(key, value) {
						html += Mustache.render(template, value);
					});
				} else {
					//暂无公共模板
					html += "";
				}
				document.getElementById("listdata").innerHTML = html;

			}
		}, function(error) {
			//console.log(error);
			ejs.ui.toast(Config.TIPS_II);
		}, {
			isDebug: false
		});

	},
	/**
	 * 新增个人意见模板
	 */
	addMyOpinion: function(opiniontext) {
		var self = this;
		if(!opiniontext) {
			ejs.ui.toast("请输入模板内容！");
			return;
		}
		var data = {
			// 个人意见模版内容
			"opiniontext": opiniontext,
			// 排序号
			"ordernumber": "0"

		};
		//ejs.ui.showDebugDialog(JSON.stringify(data));
		common.ajax({
			url: "opinion_addmyopinion_v7",
			data: data,
			//dataPath: "custom",
		}, function(result) {
			//ejs.ui.showDebugDialog(JSON.stringify(result));
			console.log("新增模板意见" + JSON.stringify(result));
			if(result.status.code == "1") {
				//关闭对话框
				self.maskNode.style.display = "none";
				self.tipsWrapperNode.style.display = "none";
				document.getElementById("content").value = "";
				// 成功提示
				ejs.ui.toast("新增模板成功！");
				self.getUserOpinion();
			} else {
				ejs.ui.toast(result.status.text);
			}
		}, function(error) {
			console.log(error);
			ejs.ui.toast(Config.TIPS_II);
		}, {
			isDebug: true
		});

	}
};