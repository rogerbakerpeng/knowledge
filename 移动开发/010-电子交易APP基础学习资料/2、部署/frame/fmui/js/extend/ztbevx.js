var ztbev = (function () {
	
	return {
    	/* 手机detail页面附件下载调用 */
		phoneDownloadAttach: function (AttachFileName, FileType, url) {
			window.location.href = url;
		},
		/* 手机在线查看pdf、word等附件 */
		phonePreviewAttach : function (AttachFileName,url) {
			window.location.href = url;
    	},
		/* 手机工作流详情页面(detailpage或者workflowpage)统一初始化 */
		phoneworkflowpageinit: function () {
			//现在按钮做在了页面底部，不需要再动态加载header
			//动态加载header
			//$("body").prepend("<header class='mui-bar mui-bar-nav'><a class='midpos mui-action-back mui-icon mui-icon-left-nav mui-pull-left'></a><h1 class='mui-title'>待办详情</h1><a href='#ztbactionsheetgen' class='ztb-action mui-pull-right'>下一步</a></header>");
			//浏览器调试时，大标题tab向下移动50px，为上面的header留出位置。
			//$("#tapheader").css("margin-top","50px");
		},
		/* 手机工作流提交处理页面统一初始化 */
		phonesubmitpageinit: function (submitFunction) {
			//现在按钮做在了页面底部，不需要再动态加载header
			//动态加载header
			//$("body").prepend("<header class='mui-bar mui-bar-nav'><a class='midpos mui-action-back mui-icon mui-icon-left-nav mui-pull-left'></a><h1 class='mui-title'>事项处理</h1></header>");//<a id='submitbtn' class='ztb-action mui-pull-right'>确认提交</a></header>");
			//header点击确认提交，调用函数
			$("#submitbtn").on('click',submitFunction);
		},
		/*初始化非工作流页面的完成按钮*/
		phoneinitsavebtn: function(submitFunction, text){
			//动态加载header
			$("body").prepend("<header class='mui-bar mui-bar-nav'><a class='midpos mui-action-back mui-icon mui-icon-left-nav mui-pull-left'></a><h1 class='mui-title'></h1><a id='submitbtn' class='ztb-action mui-pull-right'>" + (text ? text : "完成") + "</a></header>");
			//header点击确认提交，调用函数
			$("#submitbtn").on('click',submitFunction);
		},
		/* 手机对话框统一关闭方法 */
	    closePage: function (message) {
			epointm.closeDialog(message);
		},
		/* 手机对话框统一打开方法 */
		openPage: function(pageUrl,title,callback,opbtn) {
			// 这个openDialog的title不要
			// 处理打开到相对地址的问题 by wxf 2022年4月27日
			epointm.openDialog(title, epm.getRightUrl(pageUrl), function(ret){
				if(ret!='close' && callback) {
					callback(ret);
				}
			});
		},
		/* 手机对话框统一提示方法 */
		alert: function(message, title, btnValue, callback) {
			epointm.alert(message, title, btnValue, callback);
		}

	};

    
}());