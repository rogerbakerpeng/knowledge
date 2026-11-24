/** 
 * 作者： 孙尊路
 * 创建时间：2017/08/28 10:22
 * 版本： [1.0, 2017/08/28]
 * 版权： 江苏国泰新点软件有限公司
 * 描述： 通用工作流---审批页面
 **/
"use strict";
Util.loadJs([
	'js/common/common.js',
	'js/utils/util.charset.js',
	'./js/workflow_approve_util.js',
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
		//开发人员调试
		self.isDebug = false;
		// 默认IOS,自定义关闭前一个页面
		var jsApiList = null;
		if(Util.os.ios) {
			jsApiList = [{
				'epointtodo': "EJSToDoApi" // 或者iOS下为 EJSPayApi
			}];
		}

		Config.configReady(jsApiList, function() {
			self.initListeners();
		});
	},
	initListeners: function() {
		var self = this;
		self.messageitemguid = Util.getExtraDataByKey('messageitemguid');
		self.type = Util.getExtraDataByKey('type');
		// 操作按钮
		if(Util.getExtraDataByKey('operationitem')) {
			// operationitem值不能为空，否则向下执行，直接解析会报错
			self.operationitem = JSON.parse(Util.charset.base64.decode(Util.getExtraDataByKey('operationitem')));
		}
		self.operationname = Util.getExtraDataByKey('operationname');
		self.operationguid = Util.getExtraDataByKey('operationguid');
		self.operationtype = Util.getExtraDataByKey('operationtype');
		self.is_requireopinion = Util.getExtraDataByKey('is_requireopinion');

		// 目标活动
		self.targetActivityname = Util.getExtraDataByKey('targetActivityname');
		self.targetActivityguid = Util.getExtraDataByKey('targetActivityguid');

		// 流程基本信息
		self.splittype = Util.getExtraDataByKey('splittype');
		self.activityname = Util.getExtraDataByKey('activityname');
		if(Util.getExtraDataByKey('targetactivitylist')) {
			// targetactivitylist值不能为空，否则向下执行，直接解析会报错
			self.targetactivitylist = JSON.parse(Util.charset.base64.decode(Util.getExtraDataByKey('targetactivitylist')));
		}
		// 开启调试
		if(self.isDebug) {
			//ejs.ui.showDebugDialog(self.targetactivitylist[0].activityname);
			ejs.ui.showDebugDialog("splittype类型：" + self.splittype);
			ejs.ui.showDebugDialog("分支活动列表：" + JSON.stringify(self.targetactivitylist));
			ejs.ui.showDebugDialog("当前操作：" + JSON.stringify(self.operationitem));
		}
		self.activitynameArr = [];
		self.activityguidArr = [];
		self.selectStatusArr = [];
		//处理数据
		mui.each(self.targetactivitylist, function(key, value) {
			self.activitynameArr.push(value.activityname);
			self.activityguidArr.push(value.activityguid);
			self.selectStatusArr.push("1");
		});

		//人员列表模块
		self.template01 = document.getElementById("tmp01").innerHTML;
		//送一步分支模板（可以选人）
		self.template02 = document.getElementById("tmp02").innerHTML;
		//送一步分支模板（不能选人）
		self.template03 = document.getElementById("tmp03").innerHTML;

		// 当前步骤
		document.querySelector('.activityname').innerText = self.activityname;
		// 当前操作
		document.querySelector('.operationname').innerText = self.operationname;
		// 当前分支
		document.querySelector('.splitname').innerText = self.targetActivityname;

		ejs.navigator.setRightBtn({
			text: '提交',
			which: 0,
			// 设置图片的优先级会较高
			success: function(result) {
				// 提交
				self.dealWaitHandle();

			}
		});

		// 默认目标活动列表临时数组
		self.targetActivityListArray = [];
		// 每一项选人监听事件
		mui(".target-activity-person").on('tap', '.em-editable', function() {
			var _this = this.parentNode.parentNode.parentNode;
			// 送下一步目标活动Guid
			var activityguid = _this.getAttribute("activityguid");
			// 去重索引值
			var index = _this.getAttribute("index");

			//=============修改当前选中的人员===============
			var userguids = WorkFlowUtil.getUserguidsByDom(_this);
			//选人
			ejs.contact.choose({
				userguids: userguids,
				success: function(result) {
					self.tmpUserInfo = result.resultData;
					// 选择人数
					var selectCounts = self.tmpUserInfo.length;
					var html = '';
					// 送签发
					var touserguidlist = "";
					mui.each(self.tmpUserInfo, function(key, value) {
						html += Mustache.render(self.template01, value);
						touserguidlist += value.userguid + ";";
					});
					//删除重复项，再插入数据，防止每次累加选择
					self.targetActivityListArray.splice(index, 1, {
						// 送下一步目标活动Guid
						"activityguid": activityguid,
						// 对应目标活动处理人，可以有多个,以“;”隔开
						"handleperson": touserguidlist,
					});
					//ejs.ui.showDebugDialog(JSON.stringify(self.targetActivityListArray));
					//刷新选择人数以及选择人员模板
					_this.querySelector('.selectpersonlist').innerHTML = html;
					_this.querySelector('.order').innerText = selectCounts;
				},
				error: function(error) {}
			});

		});

		// 初始化选择当前分支
		var output = '';
		if(self.splittype == "30") {
			// 默认取第一个
			var tmpInfo = [];
			//alert(JSON.stringify(self.targetactivitylist));
			mui.each(self.targetactivitylist, function(key, value) {
				if(key == 0) {
					tmpInfo.push(value);
				}
			});
			//output = self.createTargActivityTempl(tmpInfo);
			output = WorkFlowUtil.createTargActivityTempl(tmpInfo);
			// 送下一步目标活动数量
			self.targetCount = tmpInfo.length;
			// 默认处理人
			self.targetActivityListArray = WorkFlowUtil.getDefaultTargetactivitylist(tmpInfo);
			// 是否必须要选人
			self.is_showselectuser = tmpInfo[0].is_showselectuser;
			//=====作用：等于0，意味着选人控件一定不显示；默认传======
			if(self.is_showselectuser == "0") {
				self.targetActivityListArray.push({
					// 送下一步目标活动Guid
					"activityguid": self.targetActivityguid,
					// 对应目标活动处理人，可以有多个,以“;”隔开
					"handleperson": "",
				});
				//alert(JSON.stringify(self.targetActivityListArray));
			}
		} else if(self.splittype == "20") {
			document.querySelector('.split-select-options').style.display = 'none';
			//刷新下一步活动，动态生成模板
			self.choiceContent = Util.getExtraDataByKey('choiceContent');
			var tmpChoiceContent = JSON.parse(self.choiceContent);
			// 临时数据
			var tmpInfo = [];
			for(var i = 0, len = tmpChoiceContent.length; i < len; i++) {
				for(var k = 0, len = self.targetactivitylist.length; k < len; k++) {
					if(tmpChoiceContent[i] == self.targetactivitylist[k].activityname) {
						tmpInfo.push(self.targetactivitylist[k]);
					}
				}
			}

			//ejs.ui.showDebugDialog("送下一步分支方式：" + JSON.stringify(tmpInfo));
			output = WorkFlowUtil.createTargActivityTempl(tmpInfo);
			//送下一步目标活动数量
			self.targetCount = tmpInfo.length;
			// 默认处理人
			self.targetActivityListArray = WorkFlowUtil.getDefaultTargetactivitylistV(tmpInfo);
			// 是否必须要选人
			self.is_showselectuser = tmpInfo[0].is_showselectuser;

		} else if(self.splittype == "10") {
			document.querySelector('.split-select-options').style.display = 'none';
			//刷新下一步活动，动态生成模板
			var tmpInfo = self.targetactivitylist;
			output = WorkFlowUtil.createTargActivityTempl(self.targetactivitylist);
			//送下一步目标活动数量
			self.targetCount = tmpInfo.length;
			// 默认处理人
			self.targetActivityListArray = WorkFlowUtil.getDefaultTargetactivitylistV(tmpInfo);

			// 是否必须要选人
			self.is_showselectuser = tmpInfo[0].is_showselectuser;
		}
		document.querySelector('.target-activity-person').innerHTML = output;

		// 当前分支类型为10时，可以单向选择
		mui('.mui-content').on('tap', '.split-select-options', function() {
			if(self.splittype == "30") {
				ejs.ui.select({
					title: '请选择当前分支',
					items: self.activitynameArr,
					choiceState: self.selectStatusArr,
					isMultiSelect: 0,
					// 默认可取消
					cancelable: 1,
					success: function(result) {
						var which = result.which;
						self.targetActivityname = result.content;
						self.targetActivityguid = self.activityguidArr[which];
						//改变文本的值
						document.querySelector('.splitname').innerText = self.targetActivityname;
						var tmpInfo = [];
						tmpInfo.push(self.targetactivitylist[which]);
						//ejs.ui.showDebugDialog(JSON.stringify(tmpInfo));
						var output = WorkFlowUtil.createTargActivityTempl(tmpInfo)
						document.querySelector('.target-activity-person').innerHTML = output;
						//ejs.ui.toast(JSON.stringify(tmpInfo));
						self.targetCount = tmpInfo.length;
						// 默认处理人
						self.targetActivityListArray = WorkFlowUtil.getDefaultTargetactivitylistV(tmpInfo);
						// 是否必须要选人
						self.is_showselectuser = tmpInfo[0].is_showselectuser;
						//alert(self.is_showselectuser);
						//alert(JSON.stringify(self.targetActivityListArray));
					},
					error: function(error) {}
				});
			}
		});

		// 个人模板
		mui('.em-todo-opinion').on("tap", '.temple-item', function() {
			var tempItem = this.querySelector('span').innerText.trim();
			console.log(tempItem);
			var pageUrl = "";
			switch(tempItem) {
				case "公共模板":
					pageUrl = "./workflow_temple_public.html";
					break;
				case "个人模板":
					pageUrl = "./workflow_temple_personal.html";
					break;
				default:
					break;
			}
			ejs.page.open({
				pageUrl: pageUrl,
				pageStyle: 1,
				orientation: 1,
				data: {},
				success: function(result) {
					var selectItem = result.resultData.selectItem;
					document.querySelector('#opinion').value = selectItem;

				}
			});
		});

		// 是否开启手机提醒 是否发送短信，1设置提醒，0不设置提醒
		document.querySelector('.sendsms').addEventListener('toggle', function(event) {
			//event.detail.isActive 可直接获取当前状态
			if(event.detail.isActive) {
				console.log("开启");
				self.sendsms = "1";
			} else {
				console.log("关闭");
				self.sendsms = "0";
			}
		});

	},
	/**
	 * 动态渲染送下一步处理人模板
	 * @param {Object} tmpInfo 模板数据
	 * @param {Object} tmpInfo 模板DOM
	 * @return {String} 目标处理人模板
	 */
	createTargActivityTempl: function(tmpInfo) {
		var self = this;
		var html = "";
		mui.each(tmpInfo, function(key, value) {
			value.index = key;
			//是否展示用户选择页面
			if("1" == value.is_showselectuser) {
				html += Mustache.render(self.template02, value);
			} else {
				html += Mustache.render(self.template03, value);
			}
		});
		return html;
	},
	/**
	 * 提交操作
	 */
	dealWaitHandle: function() {
		var self = this;
		var options = document.getElementById("opinion").value;
		// 过滤掉所有特殊字符
		options = common.excludeSpecial(options);
		//判断下一步处理人是否全部送达
		//ejs.ui.showDebugDialog("已选择的分支："+self.targetActivityListArray.length+"\n必须送达的总分支数："+self.targetCount);
		//		if(self.targetActivityListArray.length < self.targetCount) {
		//			ejs.ui.toast("请选择送下一步处理人");
		//			return;
		//		}

		if(self.is_showselectuser == "1") {
			//alert("进来了");
			if(self.targetActivityListArray.length > 0) {
				//alert(JSON.stringify(self.targetActivityListArray));
				//alert(self.is_showselectuser);
				//alert(self.targetActivityListArray.length);
				if(self.targetActivityListArray[0].handleperson) {
					var handleperson = self.targetActivityListArray[0].handleperson;
					if(!handleperson) {
						//alert(self.targetActivityListArray)
						ejs.ui.toast("必须要选择送下一步处理人");
						return;
					}
				} else {
					ejs.ui.toast("必须要选择送下一步处理人");
					return;
				}
			} else {
				ejs.ui.toast("必须要选择送下一步处理人");
				return;
			}
		}

		//alert(self.is_requireopinion);
		//是否必须填写意见，10为必须，20为非必须
		//if(self.is_requireopinion == "10") {
		if(!options) {
			ejs.ui.toast("必须要填写签署意见！");
			return;
		}

		//}
		var data = {
			// 消息guid
			"messageitemguid": self.messageitemguid,
			// 意见
			"opinion": options || "",
			// 按钮guid
			"operationguid": self.operationguid,
			// 目标活动列表
			"targetactivitylist": self.targetActivityListArray,
			// 是否发送短信，0或空不发送，1为发送，2为退回时发送
			"sendsms": self.sendsms || "0",
			//aip手写签批,签批数据（暂时没有用到）
			"signature": ""
		};

		//ejs.ui.showDebugDialog("送一步参数：" + JSON.stringify(data));
		ejs.ui.confirm({
			title: "提示",
			message: '确认提交操作吗？',
			buttonLabels: ['取消', '确定'],
			success: function(result) {
				if(result.which == "1") {
					common.ajax({
						url: "handle_dealwaithandle_v7",
						data: data,
						//dataPath: "custom",
						isShowWaiting: true
					}, function(result) {
						//ejs.ui.showDebugDialog(JSON.stringify(result));
						if(result.status.code == "1") {
							var tmpInfo = result.custom;
							// 跳转成功提示
							ejs.page.open({
								pageUrl: Config.FRIEND_SUCCESS_URL,
								pageStyle: 1,
								orientation: 1,
								data: {
									// 成功提示文本
									successText: "提交成功",
									// 成功操作按钮
									successBtn: "返回首页",
									// 默认传"1"; 连续关闭 前1个页面；连续关闭前面2个页面
									popPageNumber: "3"
								},
								success: function(result) {

								}
							});

							// 流程实例guid
							//var pviguid = tmpInfo.clientguid;
							// 附件guid
							//var attachguid = tmpInfo.attachguid;
							// 工作项更新
							//var workitemsupdate = tmpInfo.workitemsupdate;
							// 工作项添加
							//var workitemsadd = tmpInfo.workitemsadd;

						} else {
							//alert("提示信息：" + result.status.text);
							setTimeout(function() {
								ejs.ui.toast("提示信息：" + result.status.text);
							}, 200);
							//ejs.ui.showDebugDialog(JSON.stringify(result));
						}
					}, function(error) {
						//console.log(error);
						ejs.ui.toast(Config.TIPS_II);
					}, {
						isDebug: true
					});
				}
			},
			error: function(error) {}
		});

	}

};