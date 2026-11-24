/**
 * 作者： 孙尊路
 * 创建时间： 2017/06/16 13:27:09
 * 版本： [1.0, 2017/6/16]
 * 版权： 江苏国泰新点软件有限公司
 * 描述： 工作流审批页面，通用处理
 */

"use strict";
var WorkFlowUtil = window.WorkFlowUtil || (function(exports, undefined) {

	/**
	 * 创建工作流必送达分支模板
	 */
	exports.createTargActivityTempl = function(tmpInfo) {
		//		tmpInfo = [{
		//			"activityname": "分送",
		//			"activityguid": "f14beebd-03e2-4711-80e4-7efd62ca0b93",
		//			"is_targettransactor_editable": "10",
		//			"transactorallowmaxcount": "0",
		//			"is_showselectuser": "1",
		//			"defaulttransactorlist": [{
		//				"userguid": "6e46acb4-cb93-477c-a304-eaf25e427714",
		//				"username": "test1"
		//			}],
		//			"transactorfilterlist": [{}]
		//		}];
		var html = "";
		if(tmpInfo && Array.isArray(tmpInfo) && tmpInfo.length > 0) {
			// 默认
			mui.each(tmpInfo, function(key, value) {
				value.index = key;
				// 默认处理人
				var defaulttransactorlist = value.defaulttransactorlist || [];
				// 可选处理人
				var transactorfilterlist = value.transactorfilterlist || [];
				// 可选处理人最大数量
				var transactorallowmaxcount = value.transactorallowmaxcount;
				// 允许修改处理人(=10代表显示选择按钮；=20代表不显示选择按钮)
				var is_targettransactor_editable = value.is_targettransactor_editable;
				// 是否一定要选人
				var is_showselectuser = value.is_showselectuser;
				//=1情况下，再去选择人
				if(is_showselectuser == "1") {
					html += '<ul class="em-todo-table-view mui-table-view em-isshowselectuser"  activityguid="' + value.activityguid + '" index="' + value.index + '">';
					html += '<li class="mui-table-view-cell em-todo-amount">';
					html += '<span>送下一步处理人<span class="em-todo-branch-name">(<span class="splitname2">' + value.activityname + '</span>)</span>';
					html += '</span>';
					html += '<div class="select" data-ripple="ripple">';
					if(defaulttransactorlist && Array.isArray(defaulttransactorlist) && defaulttransactorlist.length > 0) {
						html += '<span class="order">' + defaulttransactorlist.length + '</span>';
					} else {
						html += '<span class="order">' + 0 + '</span>';
					}
					if(is_targettransactor_editable == "10") {
						// 显示选择按钮
						html += '<img src="img/img_addperson.png" alt="" class="em-editable" />'
					}
					html += '</div>';
					html += '</li>';

					html += '<li class="mui-table-view-cell em-todo-people">';
					html += '<div class="em-todo-people-wrapper selectpersonlist">';

					//				if(is_targettransactor_editable == "20") {
					//不显示选择按钮（一定存在默认处理人）
					// 默认处理人
					if(defaulttransactorlist && Array.isArray(defaulttransactorlist) && defaulttransactorlist.length > 0) {
						mui.each(defaulttransactorlist, function(key1, value1) {
							html += '<span class="em-person-item" id="' + value1.userguid + '">' + value1.username + '</span>';
						});
					}
					//				}

					html += '</div>';
					html += '</li>';
					html += '</ul>';

				} else if(is_showselectuser == "0") {
					console.log("一定不显示下一步操作人");
				}
			});
		}

		return html;

	};
	/**
	 * @description 获取当前分支活动下的已选择的人员
	 * @param {Object} _this 当前分支活动根节点
	 * @return {Object} 返回值userguids数组，比如：['userguid1','userguid2']
	 */
	exports.getUserguidsByDom = function(_this) {
		var userguids = [];
		var items = _this.querySelector(".selectpersonlist").querySelectorAll(".em-person-item");

		if(items && items.length > 0) {

			mui.each(items, function(index, el) {
				var userguid = el.getAttribute("id");
				var username = el.innerText.trim();
				userguids.push(userguid);
			});
		}
		return userguids;
	};
	/**
	 * @description 获取默认处理人
	 * @param {Object} tmpInfo 
	 */

	exports.getDefaultTargetactivitylist = function(tmpInfo) {
		var targetactivitylist = [];
		//		tmpInfo = [{
		//			"activityname": "分送",
		//			"activityguid": "1",
		//			"is_targettransactor_editable": "10",
		//			"transactorallowmaxcount": "0",
		//			"is_showselectuser": "0",
		//			"defaulttransactorlist": [{
		//				"userguid": "6e46acb4-cb93-477c-a304-eaf25e427714",
		//				"username": "test1"
		//			},{
		//				"userguid": "6e46acb4-cb93-477c-a304-eaf25e427714",
		//				"username": "test1"
		//			}],
		//			"transactorfilterlist": []
		//		}];
		mui.each(tmpInfo, function(key, value) {
			if(value.is_targettransactor_editable == "10") {
				var tmp = value.defaulttransactorlist;
				var tmpStr = "";
				if(tmp && tmp.length > 0) {
					for(var i = 0; i < tmp.length; i++) {
						tmpStr += tmp[i].userguid + ";";
					}
					targetactivitylist.push({
						// 处理人标识，如有多个用分号分隔
						"handleperson": tmpStr,
						// 下一步活动标识
						"activityguid": value.activityguid

					});
				}
			}
		});
		return targetactivitylist;
	};
	/**
	 * @description 获取默认处理人(10和20的情况下)
	 * @param {Object} tmpInfo 
	 */

	exports.getDefaultTargetactivitylistV = function(tmpInfo) {
		var targetactivitylist = [];
		mui.each(tmpInfo, function(key, value) {
			var tmp = value.defaulttransactorlist;
			var tmpStr = "";
			if(tmp && tmp.length > 0) {
				for(var i = 0; i < tmp.length; i++) {
					tmpStr += tmp[i].userguid + ";";
				}
			}
			targetactivitylist.push({
				// 处理人标识，如有多个用分号分隔
				"handleperson": tmpStr,
				// 下一步活动标识
				"activityguid": value.activityguid
			});

		});
		return targetactivitylist;
	};
	/**
	 * 兼容require
	 */
	if(typeof module != 'undefined' && module.exports) {
		module.exports = exports;
	} else if(typeof define == 'function' && (define.amd || define.cmd)) {
		define(function() {
			return exports;
		});
	}

	return exports;
})({});