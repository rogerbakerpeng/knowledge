/**
 * js引用特别控制
 */
(function(exports) {
	/**
	 * submitcss的版本号：
	 * workflow_submit.css、workflow_submit_blue.css、workflow_submit_orange.css、.....
	 */
	exports.submitcssversion = '';
	if (exports.submitcssversion === '')
		SrcBoot.output([ 'pages/workflow/css/workflow_submit.css' ]);
	else
		SrcBoot.output([ 'pages/workflow/css/workflow_submit_' + exports.submitcssversion + '.css' ]);

})(this && (this.ConfigSubmit = {}) || (global.ConfigSubmit = {}));
