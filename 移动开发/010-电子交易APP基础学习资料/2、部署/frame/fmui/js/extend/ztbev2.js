var ztbev = (function() {

	return {
		/* 手机detail页面附件下载调用 */
		phoneDownloadAttach : function(AttachFileName, FileType, url) {
			ejs.io.downloadFile({
				url : url,
				fileName : AttachFileName,
				reDownloaded : 1, // 当已经下载过时，是否重新下载，为0代表已经存在时会直接打开，为1代表会重新下载文件并重命名，默认为0
				isBackground : 0, // 是否在后台下载，如果为1，则静默后台下载，否则为0时会专门跳到一个下载页面，默认为1
				success : function(result) {
				},
				error : function(error) {
				}
			});
		},
		/* 手机在线查看pdf、word等附件 */
		phonePreviewAttach : function(AttachFileName, url) {
			if (Config.ejsVer == '2') {
				ejs.page.openPage(url, AttachFileName, {}, {
					"showLoadProgress" : true
				}, function(result, msg, detail) {
					if (result.resultCode != 0 && callback) {
						callback(result.resultData);
					}
				});
			} else if (Config.ejsVer == '3') {
				if (AttachFileName) {
					AttachFileName = encodeURIComponent(AttachFileName);
					url = url.indexOf('?') > -1 ? (url + "&ejs_pagetitle=" + AttachFileName) : (url + "?ejs_pagetitle=" + AttachFileName);
				}
				ejs.page.open({
					pageUrl : url,
					pageStyle : 1, // 页面的类型，有多种类型，1为默认类型，参考pageStyle参数说明
					orientation : 1, // 是横屏打开还是竖屏打开，1为竖屏，0为横屏，默认为1,-1为跟随系统
					data : {},
					success : function(result) {
						if (result.resultCode != 0 && callback) {
							callback(result.resultData);
						}
					},
					error : function(error) {
					}
				});
			}
		},
		/* 手机工作流详情页面(detailpage或者workflowpage)统一初始化 */
		phoneworkflowpageinit : function() {
			// detail页面的附件下载需要注册ejs的io的api
			ejs.config({
				jsApiList : []
			});
			ejs.ready(function() {
			});
		},
		/* 手机工作流提交处理页面统一初始化 */
		phonesubmitpageinit : function(submitFunction) {
			// 提交按钮直接在页面放置，在此无需在写
		},
		/* 初始化非工作流页面的完成按钮 */
		phoneinitsavebtn : function(submitFunction, text) {
			ztbphone.setRightBtn(submitFunction, text);
		},
		/* 手机对话框统一关闭方法 */
		closePage : function(message) {
			if (Config.ejsVer == '2') {
				ejs.page.closePage(message);
			} else if (Config.ejsVer == '3') {
				ejs.page.close({
					resultData : message
				});
			}

		},
		/* 手机对话框统一打开方法 */
		openPage : function(pageUrl, title, callback, opbtn) {
			if (Config.ejsVer == '2') {
				ejs.page.openPage(pageUrl, title, {}, {}, function(result, msg, detail) {
					if (result.resultCode != 0 && callback) {
						callback(result.resultData);
					}
				});
			} else if (Config.ejsVer == '3') {
				if (title) {
					title = encodeURIComponent(title);
					pageUrl = pageUrl.indexOf('?') > -1 ? (pageUrl + "&ejs_pagetitle=" + title) : (pageUrl + "?ejs_pagetitle=" + title);
				}
				ejs.page.open({
					pageUrl : pageUrl,
					pageStyle : 1, // 页面的类型，有多种类型，1为默认类型，参考pageStyle参数说明
					orientation : 1, // 是横屏打开还是竖屏打开，1为竖屏，0为横屏，默认为1,-1为跟随系统
					data : {},
					success : function(result) {
						if (result.resultCode != 0 && callback) {
							callback(result.resultData);
						}
					},
					error : function(error) {
					}
				});
			}
		},
		/* 手机对话框统一提示方法 */
		alert : function(message, title, btnValue, callback) {
			epointm.alert(message, title, btnValue, callback);
		}

	};

}());