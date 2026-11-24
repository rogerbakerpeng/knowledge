/**
 * 作者： 孙尊路
 * 创建时间： 2017/06/16 13:27:09
 * 版本： [1.0, 2017/6/16]
 * 版权： 江苏国泰新点软件有限公司
 * 描述： 格式化附件
 * （1）获取附件后缀名
 * （2）得到附件图标
 */

"use strict";

var FormatFile = window.FormatFile || (function(exports, undefined) {

	/**
	 * @description 处理文件格式
	 * @return 文件格式图标地址
	 * 文档文件（doc、docx、xls、xlsx、html、wps、rtf、hlp、txt、json）
	 * 图形文件（bmp、gif、jpg、pic、png、tif）
	 * 压缩文件（rar、zip）
	 * 声音文件（wav、aif、au、mp3、ram、wma、mmf、amr、aac、flac）
	 * 动画文件（avi、mpg、mov、swf）
	 */

	exports.getFileIcon = function(filename) {
		//截取后缀名
		if(!filename) {
			return '../../../fmui/css/extend/images_fileinput/icon_file/img_default.png';
		} else if(filename.indexOf('.') == "-1") {
			return '../../../fmui/css/extend/images_fileinput/icon_file/img_default.png';
		}
		var suffix = (filename.substring(filename.indexOf('.') + 1, filename.length)).toUpperCase();
		// 图标
		var fileIcon = "";
		if(suffix == "DOC" || suffix == "DOCX") {
			fileIcon = '../../../frame/fmui/css/extend/images_fileinput/icon_file/img_word.png';

		} else if(suffix == "XLS" || suffix == "XLSX") {
			fileIcon = '../../../frame/fmui/css/extend/images_fileinput/icon_file/img_xls.png';

		} else if(suffix == "PPT" || suffix == "PPTX") {
			fileIcon = '../../../frame/fmui/css/extend/images_fileinput/icon_file/img_ppt.png';

		} else if(suffix == "PDF") {
			fileIcon = '../../../frame/fmui/css/extend/images_fileinput/icon_file/img_pdf.png';

		} else if(suffix == "HTML") {
			fileIcon = '../../../frame/fmui/css/extend/images_fileinput/icon_file/img_html.png';

		} else if(suffix == "TXT") {
			fileIcon = '../../../frame/fmui/css/extend/images_fileinput/icon_file/img_txt.png';

		} else if(suffix == "CSS") {
			fileIcon = '../../../frame/fmui/css/extend/images_fileinput/icon_file/img_css.png';

		} else if(suffix == "JPG") {
			fileIcon = '../../../frame/fmui/css/extend/images_fileinput/icon_file/img_jpg.png';

		} else if(suffix == "PNG") {
			fileIcon = '../../../frame/fmui/css/extend/images_fileinput/icon_file/img_png.png';

		} else if(suffix == "GIF") {
			fileIcon = '../../../frame/fmui/css/extend/images_fileinput/icon_file/img_gif.png';

		} else if(suffix == "ICON") {
			fileIcon = '../../../frame/fmui/css/extend/images_fileinput/icon_file/img_icon.png';

		} else if(suffix == "TIF") {
			fileIcon = '../../../frame/fmui/css/extend/images_fileinput/icon_file/img_tif.png';

		} else if(suffix == "ZIP") {
			fileIcon = '../../../frame/fmui/css/extend/images_fileinput/icon_file/img_zip.png';

		} else if(suffix == "AI") {
			fileIcon = '../../../frame/fmui/css/extend/images_fileinput/icon_file/img_ai.png';

		} else if(suffix == "RAR") {
			fileIcon = '../../../frame/fmui/css/extend/images_fileinput/icon_file/img_zip.png';

		} else if(suffix == "DLL") {
			fileIcon = '../../../frame/fmui/css/extend/images_fileinput/icon_file/img_dll.png';

		} else if(suffix == "EPS") {
			fileIcon = '../../../frame/fmui/css/extend/images_fileinput/icon_file/img_eps.png';

		} else if(suffix == "PS") {
			fileIcon = '../../../frame/fmui/css/extend/images_fileinput/icon_file/img_ps.png';

		} else if(suffix == "SVG") {
			fileIcon = '../../../frame/fmui/css/extend/images_fileinput/icon_file/img_svg.png';

		} else if(suffix == "SWF") {
			fileIcon = '../../../frame/fmui/css/extend/images_fileinput/icon_file/img_swf.png';

		} else if(suffix == "FILE") {
			fileIcon = '../../../frame/fmui/css/extend/images_fileinput/icon_file/img_file.png';

		} else if(suffix == "MP3") {
			fileIcon = '../../../frame/fmui/css/extend/images_fileinput/icon_file/img_mp3.png';
		} else {
			fileIcon = '../../../frame/fmui/css/extend/images_fileinput/icon_file/img_default.png';
		}

		return fileIcon
	};
	/**
	 * 换算单位KB、MB
	 * 统一将字节 Byte处理成 KB、MB,方便显示文件大小
	 * @param {Object} byteSize 字节大小，一般是选择文件后的size
	 */
	exports.getKMByByte = function(byteSize) {
		var size = 0;
		// 换算单位(KB & MB)
		if(parseInt(byteSize) >= 0 && parseInt(byteSize) < 1024 * 1024) {
			// 换算成“KB”
			size = (byteSize / 1024).toFixed(2) + "K";
		} else {
			// 换算成“MB”
			size = (byteSize / 1024 / 1024).toFixed(2) + "M";
		}
		return size;
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