var ztbev = (function () {
	
	return {
    	/* 手机detail页面附件下载调用 */
		phoneDownloadAttach: function (AttachFileName, FileType, url) {
			document.location.href = url;//微信上下载可能有问题
		},
		/* 手机在线查看pdf、word等附件 */
		phonePreviewAttach : function (AttachFileName,url) {
			document.location.href = url;
    	},
		/* 手机工作流详情页面(detailpage或者workflowpage)统一初始化 */
		phoneworkflowpageinit: function () {
			//解决ios返回上一页不刷新的问题
			if(ejs.os.ios){
				window.onpageshow = function(event) {
					if (event.persisted) {
						window.location.reload();
					}
				}
			}
			var opbtninfo=localStorage.getItem('opbtninfo');
			var retinfo=localStorage.getItem('retinfo');
	    	if(retinfo != null && opbtninfo != null){
	    		// console.log("phoneworkflowpageinit:"+localStorage.getItem('retinfo'));
	    		// 调用工作流驱动，然后清除localStorage中的相关值
	    		localStorage.removeItem('retinfo');
	    		localStorage.removeItem('opbtninfo');
	    		ztbphone.ComOperAction(opbtninfo, retinfo);	
	    	}	    	
		} ,
		/* 手机工作流提交处理页面统一初始化 */
		phonesubmitpageinit: function (submitFunction) {
			//解决ios返回上一页不刷新的问题
			if(ejs.os.ios){
				window.onpageshow = function(event) {
					if (event.persisted) {
						window.location.reload();
					}
				}
			}
			var opinioninfo=localStorage.getItem('retinfo');
	    	if(opinioninfo != null){
	    		// console.log("phonesubmitpageinit:"+localStorage.getItem('opinioninfo'));
	    		// 给意见框赋值，因为在initpagedata后面所以没有问题，然后清除localStorage中的相关值
	    		$('#opinioncontent').val(opinioninfo);	
	    		localStorage.removeItem('retinfo');
	    	}	
		},
		/*初始化非工作流页面的完成按钮*/
		phoneinitsavebtn: function(submitFunction, text){
			
		},
		/* 手机对话框统一关闭方法 */
	    closePage: function (message) {
	    	if(message && message != 'close')
	    		localStorage.setItem('retinfo',message);//retinfo可能是多种：比如json、字符串
	    	if (window.history.length > 1) {
                window.history.back();  
	    	}
		},
		/* 手机对话框统一打开方法 */
		openPage: function(pageUrl,title,callback,opbtn) {
			//微信打开页面的时候存入opbtninfo，因为后面在phoneworkflowpageinit中拿到变量后，不知道点的哪个按钮的opbtn，所以打开的时候先存
			//opbtn可能是''可能是btnEnd
			localStorage.setItem('opbtninfo',opbtn);
			document.location.href = epm.getRightUrl(pageUrl);
		},
		/* 手机对话框统一提示方法 */
		alert: function(message, title, btnValue, callback) {
			epointm.alert(message, title, btnValue, callback);
		}


	};

}());