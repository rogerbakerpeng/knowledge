/**
 * js引用特别控制
 */
(function(exports) {
	/**
	 * detailcss的版本号： app_detail_blue.css、app_detail_orange.css、.....
	 */
	exports.detailcssversion = 'blue_v2';
	if (exports.detailcssversion === '')
		SrcBoot.output([ 'frame/fmui/css/extend/app_detail.css' ]);
	else
		SrcBoot.output([ 'frame/fmui/css/extend/app_detail_' + exports.detailcssversion + '.css' ]);
})(this && (this.ConfigDetail = {}) || (global.ConfigDetail = {}));
