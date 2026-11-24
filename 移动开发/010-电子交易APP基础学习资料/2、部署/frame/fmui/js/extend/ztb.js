var ztb = (function() {
	var timerNum = 0;
	// 给String添加trim功能
	String.prototype.trim = function(s) {
		s || (s = '\\s');
		var reg = new RegExp('^' + s + '+|' + s + '+$', 'g');
		return this.replace(reg, "");
	};
	return {
		DateTime : {
			show_time : function(showSpan, str_time_end, time_start) {
				var time_now, time_end, time_distance, str_time, timerID;
				var int_day, int_hour, int_minute, int_second;
				// 添加time_start参数作为服务器时间 by fjx
				time_now = time_start ? new Date(time_start) : new Date();
				time_end = new Date(str_time_end);
				time_distance = time_end - time_now;
				if (time_distance > 0) {
					int_day = Math.floor(time_distance / 86400000);
					time_distance -= int_day * 86400000;
					int_hour = Math.floor(time_distance / 3600000);
					time_distance -= int_hour * 3600000;
					int_minute = Math.floor(time_distance / 60000);
					time_distance -= int_minute * 60000;
					int_second = Math.floor(time_distance / 1000);

					showSpan.html("<span style='color:red;'>" + int_day + "</span><span style='padding-left: 3px;'>天</span><span style='color:red;padding-left:5px;'>" + int_hour
							+ "</span><span style='padding-left: 3px;'>时</span><span style='color:red;padding-left:5px;'>" + int_minute
							+ "</span><span style='padding-left: 3px;'>分</span><span style='color:red;padding-left:5px;'>" + int_second + "</span><span style='padding-left: 3px;'>秒</span>");
					// 上面不知道为什么要加div嵌套，css也没定义，导致数据竖向显示了 朱健 2016-05-13
					// showSpan.html(int_day + "天" + int_hour + "时" + int_minute
					// + "分" + int_second + "秒");

					timerID = setTimeout(function() {
						time_start && (time_start += 1000);
						ztb.DateTime.show_time(showSpan, str_time_end, time_start);
					}, 1000);
				} else {
					showSpan.html("已到截止时间");
					// 注释掉，否则initpage中调用该方法，页面会一直刷新 edit by czy 2021-10-19
					// epoint.refresh();
					timerID && clearTimeout(timerID);
				}
			},
	
			showServerTime : function(showContainer, format, serverTime) {
				if (!serverTime) {
					serverTime = ztb.DateTime.getServerTime();
				} else {
					// serverTime.setSeconds(serverTime.getSeconds() + 1);
					timerNum = timerNum + 1;
					if (timerNum == 120) {
						serverTime = ztb.DateTime.getServerTime();
						timerNum = 0;
					} else {
						serverTime.setSeconds(serverTime.getSeconds() + 1);
					}
				}
				if (!format) {
					format = "yyyy年MM月dd日 hh时mm分ss秒";
				}
				var now = ztb.DateTime.dateFormat(serverTime, format);
				if (!showContainer) {
					showContainer = $(".showservertime");
				}
				if (showContainer.length == 0) {
					document.write("<div class='showservertime'>" + now + "</div>");
				} else {
					showContainer.html(now);
				}
				setTimeout(function() {
					ztb.DateTime.showServerTime(showContainer, format, serverTime)
				}, 1000);
			},

			// 部分环境是response中无Date的
			getServerTime : function() {
				// 使用原生js获取服务器时间 add by douww 20211217
				var xhr = null;
			    if(window.XMLHttpRequest){
			      xhr = new window.XMLHttpRequest();
			    }else{ // ie
			      xhr = new ActiveObject("Microsoft")
			    }
		
			    xhr.open("GET","/",false)// false不可变
			    xhr.send(null);
			    var dt = xhr.getResponseHeader("Date");
			    if (dt == null){
					return new Date("2021-12-16 00:00:00");
				}
			    return new Date(dt);
			},

			/**
			 * 对日期进行格式化，
			 * 
			 * @param date
			 *            要格式化的日期
			 * @param format
			 *            进行格式化的模式字符串 支持的模式字母有： y:年, M:年中的月份(1-12),
			 *            d:月份中的天(1-31), h:小时(0-23), m:分(0-59), s:秒(0-59),
			 *            S:毫秒(0-999), q:季度(1-4)
			 * @return String
			 * @author yanis.wang@gmail.com
			 */
			dateFormat : function(date, format) {
				if (format === undefined) {
					format = date;
					date = new Date();
				}
				var map = {
					"M" : date.getMonth() + 1, // 月份
					"d" : date.getDate(), // 日
					"h" : date.getHours(), // 小时
					"m" : date.getMinutes(), // 分
					"s" : date.getSeconds(), // 秒
					"q" : Math.floor((date.getMonth() + 3) / 3), // 季度
					"S" : date.getMilliseconds()
				// 毫秒
				};
				format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
					var v = map[t];
					if (v !== undefined) {
						if (all.length > 1) {
							v = '0' + v;
							v = v.substr(v.length - 2);
						}
						return v;
					} else if (t === 'y') {
						return (date.getFullYear() + '').substr(4 - all.length);
					}
					return all;
				});
				return format;
			}
		}
	};
}());