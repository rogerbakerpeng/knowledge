/**
 * 兼容一些fui切换到fmui中的惯用写法 by wxf 2021年11月18日
 */
(function() {
	epointm.alert_org = epointm.alert;
	epointm.openDialog_org = epointm.openDialog;
	// 重写框架方法
	$.extend(epointm, {
		alert : function(message, title, callback) {
			// 修复浏览器模式下，epointm.alert失效的问题，通过以下代码，可以使alert在父页面正常弹出 by wxf 2022年4月28日
			if (window.parent != window) {
				window.top.epointm.alert(message, title, callback);
				return;
			}
			if (title && typeof title == 'function') {
				epointm.alert_org(message, '系统提醒', title);
			} else {
				epointm.alert_org(message, title, callback);
			}
		},
		alertAndClose : function(message, title, callback, options) {
			options = $.extend({}, {
				chkMsg : '成功',
				backParam : 'ok',
				needCheck : false
			}, options);

			var close = true;
			// 如果传递了需要检查条件的参数,并且条件没有满足的话,不允许关闭
			if (options.needCheck && message.indexOf(options.chkMsg) < 0) {
				close = false;
			}
			// 只有在需要关闭的时候，才调用关闭回调
			if (close) {
				epointm.alert(message, title, function() {
					ztbphone.closePage(options.backParam);
				});
			} else {
				epointm.alert(message, title, callback);
			}
		},
		openDialog : function(title, url, successBack, options) {
			// 重写dialog方法，增加标题隐藏、options空兼容
			if (!options) {
				options = {};
			}
			if (!title) {
				options.titlebar = false;
			}
			epointm.openDialog_org(title, url, successBack, options);
		}
	});
})();
