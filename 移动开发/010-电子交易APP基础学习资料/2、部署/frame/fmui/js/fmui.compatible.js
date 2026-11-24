/**
 * fmui兼容脚本，用于兼容一些老fmui的写法 
 * by wxf 2021年11月18日
 */
(function() {
	// 兼容List未关联模板
	var mui_ul = document.getElementsByClassName('ep-mui-list');
	if (mui_ul.length) {
		for (var i = 0; i < mui_ul.length; i++) {
			if (!mui_ul[i].attributes['tplId']) {
				let list_li = mui_ul[i].innerHTML;
				let list_tpl = document.createElement("script");
				list_tpl.innerHTML = list_li;
				list_tpl.setAttribute('type', 'text/template');
				list_tpl.id = mui_ul[i].id + '_tpl';
				document.body.appendChild(list_tpl);
				mui_ul[i].setAttribute('tplId', list_tpl.id);
			}
		}
	}
	// 减少搜索栏高度
	var em_srhbar = document.getElementsByClassName("em-srhbar");
	if (em_srhbar.length) {
		for (var k = 0; k < em_srhbar.length; k++) {
			em_srhbar[k].style.height = '10px';
			em_srhbar[k].style.marginBottom = '0px';
			let keyword_input = document.getElementById("keyword");
			if(keyword_input){
				keyword_input.style.position = 'absolute';
				keyword_input.style.marginTop = '-10px';
				keyword_input.style.width = '93%';
			}
		}
	}
	// 兼容搜索图标和语音输入图标位置
	var searchbtn_ic = document.getElementById("searchbtn");
	if (searchbtn_ic) {
		searchbtn_ic.style.top = '13px';
		searchbtn_ic.style.left = '25px';
	}
	var voicebtn_ic = document.getElementById("voiceBtn");
	if (voicebtn_ic) {
		voicebtn_ic.style.top = '13px';
		voicebtn_ic.style.right = '26px';
	}
})();
