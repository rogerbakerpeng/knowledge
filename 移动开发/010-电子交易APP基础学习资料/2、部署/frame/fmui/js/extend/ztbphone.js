var ztbphone = (function() {
	return {
		/* 手机版弹出框处理：将pc版本的弹出框处理成mui或者ejs的弹出框 */
		ztbeval : function(tip) {
			// 判断下tip有没有 mui||ztbphone
			if (tip.indexOf('mui') > -1 || tip.indexOf('ztbphone') > -1) {
				if (tip.indexOf("mui.alert") > -1) {
					tip = tip.replace("mui.alert", "epointm.alert");
				}
				if (tip.indexOf("mui.confirm") > -1) {
					tip = tip.replace("mui.confirm", "epointm.confirm");
				}
				if (tip.indexOf("mui.alertAndClose") > -1) {
					tip = tip.replace("mui.alertAndClose", "epointm.alertAndClose");
				}
				Util.safeEval(tip);
			} else {
				// 如果btnAfterSubmit_Click重写过
				// 并且retrun了epoint.alert('资审场地取消成功！','',function(){epoint.closeDialog();});的话要特殊处理下
				if (tip.indexOf(",'',function(){epoint.closeDialog();}") > -1) {
					tip = tip.replace("epoint.alert", "ztbphone.toast");
					tip = tip.replace(",'',function(){epoint.closeDialog();}", "");
				} else {
					tip = tip.replace("ShowTdOperate(true);", "");
					if (tip.indexOf("epoint.alert(") > -1) {
						tip = tip.replace("epoint.alert", "epointm.alert");
					}
					if (tip.indexOf("epoint.confirm") > -1) {
						tip = tip.replace("epoint.confirm", "epointm.confirm");
					}
					if (tip.indexOf("epoint.alertAndClose") > -1) {
						tip = tip.replace("epoint.alertAndClose", "epointm.alertAndClose");
					}
				}
				Util.safeEval(tip);
			}
		},
		/* 手机detail页面附件下载调用 */
		phoneDownloadAttach : function(AttachFileName, FileType, url) {
			ztbev.phoneDownloadAttach(AttachFileName, FileType, url);
		},
		/* 手机在线查看pdf、word等附件 */
		phonePreviewAttach : function(AttachFileName, url) {
			ztbev.phonePreviewAttach(AttachFileName, url);
		},
		/* 手机工作流详情页面(detailpage或者workflowpage)统一初始化 */
		phoneworkflowpageinit : function() {
			// 已办页面上，隐藏工作流按钮控件，只在代办列表处理
			if (Util.getUrlParams('waittype') == '1') {
				$(".ep-mui-handlecontrols").hide();
			}
			ztbev.phoneworkflowpageinit();
			// 如果url里面包含opguid，则说明是从首页卡片上直接点处理按钮进来了，此时自动跳转工作流处理页面
			var opguid = Util.getUrlParams('opguid')
			if (opguid) {
				// 点返回按钮时也触发一次卡片刷新
				ztbphone.ListenHookBack();
				ztbphone.openActionsheetHandlePage(opguid);
			}

		},
		/* 手机工作流提交处理页面统一初始化 */
		phonesubmitpageinit : function(submitFunction) {
			ztbev.phonesubmitpageinit(submitFunction);
		},
		/* 初始化非工作流页面的完成按钮 */
		phoneinitsavebtn : function(submitFunction, text) {
			ztbev.phoneinitsavebtn(submitFunction, text);
		},
		/* 手机对话框统一关闭方法 */
		closePage : function(message) {
			ztbev.closePage(message);
		},
		/* 手机对话框统一打开方法 */
		openPage : function(pageUrl, title, callback, opbtn) {
			ztbev.openPage(pageUrl, title, callback, opbtn);
		},
		/* 手机对话框统一提示方法 */
		alert : function(message, title, btnValue, callback) {
			ztbev.alert(message, title, btnValue, callback);
		},
		/* 微信小程序对话框提示并返回vxml原生界面 */
		alertandclosetovxml : function(msg) {
			mui.back();
			ztbphone.toast(msg);
			// ztbev.alertandclosetovxml(msg);
		},
		reload : function() {
			if (Config.ejsVer == '2') {
				ejs.page.reloadPage();
			} else if (Config.ejsVer == '3') {
				ejs.page.reload();
			}
		},
		toast : function(message) {
			if (ConfigZtb.jsmode == '4') {
				ejs.ui.toast(message);
			} else if (Config.ejsVer == '2') {
				ejs.nativeUI.toast({
					"message" : message
				});
			} else if (Config.ejsVer == '3') {
				ejs.ui.toast({
					message : message,
					success : function(result) {
					},
					error : function(err) {
					}
				});
			} else {
				ejs.ui.toast(message);
			}
		},
		/* 手机工作流actionsheet的底部浮动按钮点击触发函数 */
		openActionsheetHandlePage : function(operationtype, operationGuid) {
			// workflow页面上定义的validate方法，用于验证输入内容以及执行mui.trigger操作。
			if (typeof validate === 'function') {
				var msg = validate();
				if (msg) {
					ztbphone.alert(msg);
					return;
				}
			}
//			if (!epointm.validate()) {
//				console.log('表单校验不通过');
//				return;
//			}
			// 根据operationGuid问后台拿地址(最终计算成手机版地址)
			epointm.execute("comAction", '@all', [ operationtype, operationGuid ], function(ret) {
				if (ret.indexOf('处理成功') != -1) {
					ztbphone.closePage('close');
					return;
				} else if (ret.indexOf('epoint.alert') != -1) {
					ztbphone.ztbeval(ret);
					return;
				} else if (ret.indexOf('OpenHandlePage') != -1) {
					// 重构，做以下工作:
					// 1、废弃getappworkflowapproveparams方法，没什么意义，这里面的操作在comaction里已经全部处理过了
					// 2、将PC处理地址转换为APP处理地址的操作，迁移至js内
					// by wxf 2022年4月26日
					// 后端返回的格式如下:"OpenHandlePage('url','opbtn');
					var params = {};
					var pcUrl, pcOpbtn;
					pcUrl = ret.substring(ret.indexOf('\'') + 1, ret.indexOf(',') - 1);
					pcOpbtn = ret.substring(ret.indexOf(',') + 2, ret.indexOf(')') - 1);
					pcUrl = pcUrl + '&IsToolBarOpen=1';
					pcUrl = pcUrl.replace('.aspx', '').replace('frame/', '');
					var pcUri = pcUrl.substring(0, pcUrl.indexOf('?'));
					// asphonebox文件在frame/fmui/js/extend/asphonebox.js
					var appUri = window.asphonebox[pcUri];
					if (!appUri) {
						// 设置一个默认地址
						appUri = 'workflow/wf_approve_opinion';
					}
					params.url = pcUrl.replace(pcUri, appUri);
					params.opbtn = pcOpbtn;
					ztbphone.openPage(params.url, '事项处理', function(ret1) {
						// 点左上角返回，不要进后台保存的逻辑 2021-11-19 zlm
						if (ret1) {
							ztbphone.ComOperAction(params.opbtn, ret1);
						}
					}, params.opbtn);
					// epointm.execute("getAppWorkflowApproveParams", '@all', [
					// operationGuid ], function(ParamsRet) {
					// params = JSON.parse(ParamsRet);
					//
					// })
				} else {
					// 兼容一些其他的情况，一般都是些action里个性化的返回值，可能会出现错误 by wxf 2022年4月27日
					ztbphone.ztbeval(ret);
				}
			});
		},
		/* 手机端审批路径 */
		phoneQypathmodel : function() {
			epointm
					.execute(
							"getQypathmodel",
							'@none',
							'',
							function(ret) {
								ret = JSON.parse(ret);
								if (ret.openMode) {
									getQypathmodel();
									$("#notSelect").show();
									$("#selected").hide();
									var iduc = "qypath1";
									$("#localpath").on('click', function() {
										SelpathOperation(ret.pvguid, ret.acqType, ret.approvalType);
									})
								} else {
									$("#notSelect").hide();
									$("#selected").show();
									if (ret.length == 0) {
										$("#selected").html("<div style='margin-left:15px;margin-top:15px'>暂未选择审批路径</div>");
									} else {
										var template1 = "<div style='margin-left:15px;margin-top:15px'>路径名称:{{pvname}}</div>";
										var template2 = "<li class='mui-table-view-cell approve-li greenicon'><h5 class='tit '>{{{activityType}}}</h5><div class='con'><span class='name'>审批人：</span><span class='txt'>{{{transactor}}}</span></div><div class='con'><span class='name'>邮箱：</span><span class='txt'>{{{mailAddress}}}</span></div></li>";
										var html = '';
										for (var i = 0; i < ret.length; i++) {
											html += Mustache.render(template1, ret[i]);
											var ul = "<ul class='mui-table-view mt10 approve-ul'>";
											var data2 = ret[i].grid.wrappedData;
											mui.each(data2, function(key, value) {
												ul += Mustache.render(template2, value);
											})
											ul += "</ul>";
											html += ul;
										}
										$("#selected").html(html);
									}
								}
							});
		},
		/* 获取按钮随机颜色 */
		getBtnRandomStyle : function() {
			var colors = new Array();
			colors[0] = "";
			colors[1] = "mui-btn-primary";
			colors[2] = "mui-btn-success";
			colors[3] = "mui-btn-warning";
			colors[4] = "mui-btn-danger";
			colors[5] = "mui-btn-royal";
			var outlineds = new Array();
			outlineds[0] = "";
			outlineds[1] = "mui-btn-outlined";
			var indexcolor = Math.floor(Math.random() * (colors.length));
			var randomcolor = colors[indexcolor];
			var indexisoutlined = Math.floor(Math.random() * (outlineds.length));
			var randomisoutlined = outlineds[indexisoutlined];

			var btnstyle = randomcolor + " " + randomisoutlined;
			// console.info(btnstyle);
			return btnstyle;
		},
		/* detail根据内容调整底部工作流按钮位置，使其始终处于屏幕最底部 */
		heightInit : function() {
			var html = " <li class='em-table-view-card'><div style='height:0px;background:#fff;' id='scrolldiff'></div></li>";
			var screenHeight = window.screen.availHeight;
			var scrollHeight = $("#scroll1 .mui-scroll").height() + $("#sliderSegmentedControl").height();
			var scrolldiff = screenHeight - scrollHeight;
			if (screenHeight > scrollHeight) {
				$("#scroll1 .content").append(html);
				$("#scrolldiff").height(scrolldiff);
			}
		},
		/* 表格控件统一刷新，默认id是listdata;页面有多个表格的时候id会不一样，复制js自己写 */
		onSearch : function() {
			var keyword_id = this.id;
			// 确保input值在发生改变时立刻更新keyword控件值，否则bind关键字无法及时回传到后端导致搜索失败 by wxf
			// 2021年11月22日
			var keyword_ctrl = epm.get(keyword_id);
			if (keyword_ctrl) {
				keyword_ctrl.setValue(this.value);
			}
			var pulltorefreshObj = epm.get('listdata');
			pulltorefreshObj && pulltorefreshObj.refresh();
		},
		/* 招投标基类action后台最终的工作流驱动，适用于pc和phone */
		ComOperAction : function(OperationType, jsonstr) {
			if (ConfigZtb.jsmode != '7')// 非微信小程序不能隐藏
				// TODO 这段代码相当奇怪，待研究 by wxf 2022年4月25日
				//$('body').hide();// 工作流回调隐藏页面元素，否则可能点到按钮
			// 基类处理完毕comAction后,显示toast，并关闭detail，回到代办list
			ejs.ui.showWaiting('正在提交，请稍候...');
			if (ConfigZtb.jsmode == '7' || ConfigZtb.jsmode == '4') {
				alert('正在提交，请稍候...');
			}
			epointm.execute("comAction", '@all', [ OperationType, jsonstr ], function(ret) {
				if (ret.indexOf('epoint.alert') != -1 || ret.indexOf('ztbphone.toast') != -1) {
					if (ConfigZtb.jsmode == '7') { // 模式7微信小程序退回首页的vxml原生页面
						// 不管是什么开头都直接替换
						ret = 'ztbphone.alertandclosetovxml' + ret.substring(ret.indexOf('('));
						// ret = ret.replace('toast','alertandclosetovxml');
						ztbphone.ztbeval(ret); // 执行ztbphone.alertandclosetovxml
					} else {
						ejs.ui.closeWaiting({
							success : function(result) {
							},
							error : function(err) {
							}
						});
						ztbphone.ztbeval(ret);
						// 这里传值代表，回到代办list时，刷新列表
						// 不过为啥一定要关闭页面？正常处理成功时都会使用alertAndClose进行关闭，处理失败时更不用关闭了
						// by wxf 2022年4月25日
						// TODO
						// 如果只是为了刷新待办列表页，应该从待办列表页进行下手，任意工作流页面关闭回调时均刷新，完成后把下面的语句删掉
						// ztbphone.closePage('close');
					}
				} else {
					ztbphone.ztbeval(ret);
				}
			});
		},
		/* ComOperAction的转交特殊处理 */
		ComOperActionAddActivity : function(data) {
			// 基类处理完毕comAction后,显示toast，并关闭detail，回到代办list
			if (data) {
				var clr = data;
				var te = data.split(';');
				te = te.join('-=-');
				epointm.execute('addActivity', '@none', [ te ], function(data) {
					if (!data.message) {
						ztbphone.toast('下一步处理人:' + clr.split('_SPLIT_')[1]);
						// 这里传值代表，回到代办list时，刷新列表
						ztbphone.closePage('close');
					}
				})
			}
		},

		/* 手机工作流提交处理页面子函数，用与真机ejs初始化 */
		setRightBtn : function(submitFunction, text) {
			if (Config.ejsVer == '2') {
				ejs.navigator.setRightBtn(text ? text : "确认提交");
				window.onClickNBRightEJS = function() {
					// 调用方法
					submitFunction();
					// 防止连点,执行完方法后去掉按钮,1.5秒后再次用ejs注册
					ejs.navigator.setRightTextBtn('');
					window.onClickNBRightEJS = function() {
					};
					setTimeout(function() {
						setRightBtn(submitFunction);
					}, 1500);
				}
			} else if (Config.ejsVer == '3') {
				ejs.navigator.setRightBtn({
					isShow : 1,
					text : text ? text : "确认提交",
					which : 0,
					success : function(result) {
						submitFunction();
					}
				});
			}

		},

		/**
		 * 语音组件注册
		 */
		InitSpeech : function() {
			ejs.config({});
			// 语音按钮
			document.getElementById('voiceBtn').addEventListener('tap', function(e) {
				ejs.util.invokePluginApi({
					path : 'speech.provider.recognize',
					dataMap : {},
					success : function(result) {
						$("#keyword").val(result.voiceString);
						mui.trigger(document.getElementById('keyword'), 'change');
					},
					error : function(err) {
						// err 错误信息
						epointm.alert(err);
					}
				});
			});
		},
		InitEjsApi : function(jsApiList) {
			var tmpApiList = jsApiList || [];
			ejs.error(function(error) {
				console.error("初始化api失败:" + error);
			});
			ejs.config({
				jsApiList : tmpApiList
			});
			ejs.ready(function() {
				console.log("初始化api成功" + JSON.stringify(tmpApiList));
			});
		},
		// 监听拦截导航栏左侧的返回按钮，用于返回时需要刷新父页面的情况。
		ListenHookBack : function() {
			ejs.navigator.hookBackBtn({
				success : function(result) {
					ztbphone.closePage('close');
				},
				error : function(error) {
				}
			});
		},
		// 获取审核状态
		AuditStatus : function(status) {
			var code = {
				"1" : "编辑中",
				"2" : "待审核",
				"3" : "审核通过",
				"4" : "审核不通过",
				"5" : "作废",
				"6" : "删除",
				"7" : "退回",
				"8" : "暂停"
			};
			return code[status];
		},
		dealUrl : function(url) {
			var path = window.location.href;
			if (path.indexOf("?") != -1) {
				path = path.split("?")[1];
			}
			return url + "&" + path;
		},
		getRequestUrl : function() {
			// 获取网络协议
			var protocol = window.location.protocol;
			// 获取主机名+端口号
			var domainPort = window.location.host;
			// 获取发布项目的名称
			// 获取路径
			var url = window.location.pathname;
			var webApp = url.split('/')[1];
			// http://127.0.0.1/demo
			return protocol + "//" + domainPort + "/" + webApp;
		},
		isIOS : function() {
			var u = navigator.userAgent;
			return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
		},
		isAndroid : function() {
			var u = navigator.userAgent;
			return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
		},
		// 获取url中的参数值
		getUrlParamsValue : function(url, paramName) {
			var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
			var paraObj = {}
			var i, j;
			for (i = 0; j = paraString[i]; i++) {
				paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
			}
			var returnValue = paraObj[paramName.toLowerCase()];
			// 需要解码浏览器编码
			returnValue = decodeURIComponent(returnValue);
			if (typeof (returnValue) == "undefined") {
				return undefined;
			} else {
				return returnValue;
			}
		},
		// 补充手风琴相关api
		accordion : {
			setTitle : function(title, index) {
				if ($(".card-title").length) {
					$(".card-title").eq(index).html(title);
				}
			},
			// 隐藏手风琴及对应元素 by wxf 2022年7月8日
			hideItem : function(index) {
				if ($(".card-head").length) {
					$(".card-head").eq(index).hide();
					// 继续向下隐藏，直到下一个card-head节点，或元素末尾
					let $next = $(".card-head").eq(index).next();
					while ($next.length > 0 && !$next.hasClass('card-head')) {
						$next.hide();
						$next = $next.next();
					}
				}
			},
			// 显示手风琴及对应元素 by wxf 2022年8月18日
			showItem : function(index) {
				if ($(".card-head").length) {
					$(".card-head").eq(index).show();
					// 继续向下隐藏，直到下一个card-head节点，或元素末尾
					let $next = $(".card-head").eq(index).next();
					while ($next.length > 0 && !$next.hasClass('card-head')) {
						$next.show();
						$next = $next.next();
					}
				}
			}
		},
		/* 签章部分逻辑 开始 */
		/* 创建二维码 */
		createQR : function(obj) {
			Util.ajax({
				type : "post",
				url : ztbphone.getRequestUrl() + '/rest/frameztbv8/createqr',
				data : {
					"params" : JSON.stringify(obj)
				},
				success : function(result) {
					if (result.custom.status == '1') {
						qrcodeid = result.custom.qrcodeid;
						var params = {
							'qrcodeid' : qrcodeid
						};
						var params1 = encodeURIComponent(JSON.stringify(params));
						// 如果是ejs环境下 调用ejs的api打开标证通APP
						console.log("Util.os.ejs:" + Util.os.ejs);
						if (Util.os.ejs) {
							var isBZT = ejs.storage.getItem('isBZT');
							isBZT = false;
							console.log("isBZT:" + isBZT);

							// 处于交易APP内，并且整合标证通
							// ztbphone.openBztH5(mobilephone, bztH5Url,
							// qrcodeid);

							if (isBZT) {
								// 如果是处于标证通专区环境内，则跳转到标证通的h5证书选择页面
								ztbphone.openBztH5(mobilephone, bztH5Url, qrcodeid);
							} else {
								// 如果是交易APP环境内，先判断是否整合了标证通的h5首页
								console.log("integrateBzt:" + integrateBzt);
								integrateBzt = true;
								if (integrateBzt) {
									// 处于交易APP内，且未整合标证通
									ztbphone.ejsLaunchBZT(ztbphone.getBztScheme(qrcodeid, params1, ''), JSON.stringify(params));
								} else {
									// 处于交易APP内，并且整合标证通
									ztbphone.openBztH5(mobilephone, bztH5Url, qrcodeid);
								}
							}
						} else {
							// 三方APP唤起标证通APP
							window.location.href = ztbphone.getBztScheme(qrcodeid, params1, '');
						}
					}
				}
			})
		},
		/** 打开标证通的h5证书选择页* */
		openBztH5 : function(mobilephone, bztH5Url, qrcodeid) {
			var newUrl = ztbphone.getRequestUrl() + '/rest/frameztbv8/getbztToken' + '?phone=' + mobilephone + '&uri='
					+ encodeURIComponent(bztH5Url + 'pages/homepage/index.html?qrcodeId=' + qrcodeid + '&source=dzbh');
			// ios需要多加一层encode，调用openpage，框架会解开，到后台参数不对。
			if (Util.os.ios) {
				newUrl = ztbphone.getRequestUrl() + '/rest/frameztbv8/getbztToken' + '?phone=' + mobilephone + '&uri='
						+ encodeURIComponent(encodeURIComponent(bztH5Url + 'pages/homepage/index.html?qrcodeId=' + qrcodeid + '&source=dzbh'));
			}
			var params = {
				'qrcodeid' : qrcodeid
			};
			ztbphone.openPage(newUrl, '证书选择', function() {
				var time = 9999;
				setInterval(function() {
					if (time != 0) {
						// 查询签名接口
						time--;
						// 定时器 每一秒 调用一次查询结果接口
						console.log('openBztH5->>>params:' + params);
						ztbphone.queryqrresult(params);
					}
				}, 1000);
			});
		},

		// 交易APP中ejs环境下 唤起标证通APP进行选证书签名
		ejsLaunchBZT : function(url_scheme, params) {
			ejs.runtime.launchApp({
				packageName : '',
				className : '',
				actionName : '',
				scheme : url_scheme,
				data : '',
				success : function(result) {
					// 此处回调为成功唤起标证通APP
					// 设置定时器，每隔1秒调用接口 查询是否签名成功
					var time = 9999;
					setInterval(function() {
						if (time != 0) {
							// 查询签名接口
							time--;
							// 定时器 每一秒 调用一次查询结果接口
							ztbphone.queryqrresult(params);
						}
					}, 1000);
				},
				error : function(error) {
					ztbphone.toast('请安装标证通APP！');
				}
			});
		},
		/** 查询签名结果* */
		queryqrresult : function(params) {
			console.log('queryqrresult->>>params:' + params);
			Util.ajax({
				type : "post",
				url : ztbphone.getRequestUrl() + '/rest/frameztbv8/queryqrresult',
				data : {
					"params" : params
				},
				success : function(QRResult) {
					console.log('queryqrresult', QRResult);
					if (QRResult.custom.status == '1') {
						time = 0;
						// 合并签章
						console.log('开始合并签章');
						ztbphone.postMargeapp();
					}
				}
			})
		},

		/** 合并签章* */
		postMargeapp : function() {
			var margeObj = {};
			margeObj.clientguid = ClientGuid;
			margeObj.fileguid = AttachGuid;
			margeObj.qrcodeid = qrcodeid;
			console.log("postMargeapp->>>ClientGuid:" + ClientGuid);
			console.log("postMargeapp->>>AttachGuid:" + AttachGuid);
			console.log("postMargeapp->>>qrcodeid:" + qrcodeid);
			Util.ajax({
				type : "post",
				url : ztbphone.getRequestUrl() + '/rest/frameztbv8/margeapp',
				data : {
					"params" : JSON.stringify(margeObj)
				},
				success : function(margeResult) {
					console.log('合并结果', margeResult);
					if (margeResult && margeResult.custom.status == '1') {
						document.getElementById('frame').contentWindow.location.reload(true);
						$('#qz').hide();
						ztbphone.closePage();
					} else {
						ejs.ui.toast(margeResult.custom.msg);
					}
				}
			})
		},
		/** 获取标证通的url_scheme，用于三方APP打开标证通APP */
		/**
		 * qrcodeid：创建的二维码返回标识 params1：json格式的qrcodeid backAPP：当前这个APP的名字
		 */
		getBztScheme : function(qrcodeid, params1, backAPP) {
			console.log("isFormalBZT:" + isFormalBZT);
			console.log("backAPP:" + backAPP);
			if (backAPP) {
				backAPP = encodeURIComponent(backAPP);
			} else {
				backAPP = encodeURIComponent('鞍钢招标平台');
			}
			// 打开标证通包名，默认安卓（安卓正式和测试一致）
			var btzPackge = "epointbzt://platformapi/startapp";
			if (ztbphone.isIOS()) {
				// 正式
				if (isFormalBZT == '1') {
					btzPackge = "EpointBZT://";
				} else {
					btzPackge = "EpointBZTTest://";
				}
			}
			// 默认ios
			var url_scheme = btzPackge + "?mobile=1&pageno=2&qrcodeid=" + qrcodeid + "&params=" + params1 + "&sourceTitle=" + backAPP + "&sourceScheme=epointmobilebase://";
			if (ejs.os.android == 'android' || ejs.os.android == true || ejs.os.android == 'true') {
				url_scheme = btzPackge + "?mobile=1&pageno=2&qrcodeid=" + qrcodeid + "&params=" + params1 + "&packagename=com.epoint.workplatform.dzjy.agzbpt&sourceTitle=" + backAPP + "&paTest=://";
			}
			console.log("url_scheme:" + url_scheme);
			return url_scheme;
		}
	};

	// 获取审批路径
	function getQypathmodel() {
		epointm
				.execute(
						"getQypathmodel",
						'@none',
						null,
						function(ret) {
							var item = JSON.parse(ret);
							$("#localpath").val(item.showSelectedPVName);
							var html = '';
							// var template = "<ul class='ep-mui-list
							// mui-table-view default'><li
							// class='mui-table-view-cell{{#disabled}}
							// mui-disabled{{/disabled}}'><div
							// class='table-row'><div
							// class='table-label'>审批类型</div>{{activityType}}</div><div
							// class='table-row'><div
							// class='table-label'>审批人</div>{{transactor}}</div><div
							// class='table-row'><div
							// class='table-label'>邮箱</div>{{mailAddress}}</div></li></ul>";
							var template = "<li class='mui-table-view-cell approve-li greenicon'><h5 class='tit '>{{{activityType}}}</h5><div class='con'><span class='name'>审批人：</span><span class='txt'>{{{transactor}}}</span></div><div class='con'><span class='name'>邮箱：</span><span class='txt'>{{{mailAddress}}}</span></div></li>";
							mui.each(item.datagrid, function(key, value) {
								html += Mustache.render(template, value);
							})
							$("#selectapprove").html(html);
						})
	}
	// 选择审批路径
	function SelpathOperation(pvguid, acqType, approvalType) {
		var url = 'workflow/XuanZeSet?pvguid=' + pvguid + '&acqType=' + acqType + '&approvalType=' + approvalType;
		ztbphone.openPage(url, '选择审批路径', function(ret) {
			epointm.execute('cmdPathSelect', '@none', [ ret ], function(ret) {
				if (ret.wfmsg) {
					ztbphone.alert(ret.wfmsg);
				} else {
					getQypathmodel();
				}
			})
		}, '');
	}

}());

// 对PC端一些方法做兼容
(function(epoint) {

	// 全局配置参数 pcAdapterMobile 控制是否开启pc端方法转移动端
	// 浏览器模式时，不适配PCjs,因为可能造成死循环
	if ((window.epointmConfig && epointmConfig.pcAdapterMobile === false) || ConfigZtb.jsmode == 'x') {
		return;
	}

	epoint.alert = function(message, title, callback, icon) {
		epointm.alert(message, title, callback);
	};

	epoint.confirm = function(message, title, okCallback, cancelCallback) {
		epointm.confirm(message, title, okCallback, cancelCallback);
	};

	epoint.alertAndClose = function(message, title, callback, options, iconCls) {
		epointm.alertAndClose(message, title, callback);
	};

	epoint.execute = epointm.execute;

	epoint.openDialog = function(title, url, callback, settings) {
		ztbphone.openPage(url, title, callback);
	};

	epoint.closeDialog = function() {
		ztbphone.closePage();
	};

	epoint.refresh = function(ids, callback, keepPageIndex) {
		ztbphone.reload();
	};
})(this && (this.epoint = {}) || (global.epoint = {}));
