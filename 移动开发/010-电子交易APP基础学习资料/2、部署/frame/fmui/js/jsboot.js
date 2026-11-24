/**
 * 作者: 吴松泽
 * 创建时间: 2017/06/08
 * 版本: [1.0, 2017/06/08 ]
 * 版权: 江苏国泰新点软件有限公司
 * 描述: 统一js引用的控制，根据是否是debug，不同的系统环境以及不同的ejs版本进行切换
 */
(function () {
	// 兼容新版fmui相关规范，日后需要逐步调整代码并删除此js by wxf 2021年10月15日
	var compatible = [];
	compatible.push('frame/fmui/js/fmui.compatible.js');
	SrcBoot.output(compatible);
    var arr = [];

    // 如要增加自定义的文件，请勿在paths中增加（默认release无法打包）
    // 请在111行后面将要增加的文件push到arr中
    var paths = {
        // base层会最先加载，作为框架的基石，base层之后是ejs层再然后才是core层
        base: [
            'js/libs/vue.js',
            'js/libs/vant.js',
            // 'js/libs/promise.js',
            'js/mui/mui.js',
            'js/libs/zepto.min.js',
            'js/libs/mustache.min.js',
            'js/libs/fastclick.js',
            'js/libs/pipeline.min.js',
            'js/libs/tinymce/tinymce.min.js',
            'js/widgets/mui.picker/mui.picker.min.js',
            'js/widgets/mui.poppicker/mui.poppicker.min.js'
        ],
        // core层会在base层和ejs层加载完毕后再加载
        core: [
            'js/common/common.js',
            'js/common/common.ajax.js',
            'js/common/common.ajax.upload.js',
            // 这个会对 ajax 和 upload都进行一次数据请求的代理
            'js/common/common.ajax.dataprocess.js',
            'js/common/common.clazz.js',
            'js/common/common.dataprocess.js',
            'js/common/common.dataprocess.v6path.js',
            'js/common/common.dataprocess.v7path.js',
            'js/common/common.loadjs.js',
            'js/common/common.os.js',
            'js/common/common.path.js',
            // "js/common/common.input.js",
            'js/common/common.ejs.webenv.js',
            // 依赖了下面的 ejs 类库，以3.x的用法 来兼容部分2.x的 api
            'js/common/common.ejs.compatible.js',
            'js/common/common.token.compatible.js',
            'js/common/common.ajax.proxy.js'
        ],
        ejsv2: {
            base: ['js/ejs/v2/epoint.moapi.v2.js'],
            h5: ['js/ejs/v2/epoint.moapi.v2.h5mui.js'],
            dd: ['js/ejs/dingtalk.js', 'js/ejs/v2/epoint.moapi.v2.dd.js']
        },
        ejsv3: {
            base: ['js/ejs/v3/ejs.js'],
            h5: ['js/ejs/v3/ejs.h5.js'],
            dd: ['js/ejs/dingtalk.js', 'js/ejs/v3/ejs.dd.js'],
            ejs: ['js/ejs/v3/ejs.native.js'],
            f9: ['js/ejs/v3/ejs.f9.js'],
            f9dd: ['js/ejs/v3/ejs.f9dd.js']
        },
        ejsv4: {
            base: ['js/ejs/v4/ejs.js'],
            h5: ['js/ejs/v4/ejs.h5.js'],
            dd: ['js/ejs/dingtalk.js', 'js/ejs/v4/ejs.dd.js'],
            ejs: ['js/ejs/v4/ejs.native.js'],
            f9: ['js/ejs/v4/ejs.f9.js'],
            f9dd: ['js/ejs/v4/ejs.f9dd.js']
        },
        fmui: [
            'js/comdto/epm.js',
            'js/comdto/epointm.js',
            'js/comdto/lisenterEvents.js',
            'js/comdto/controls/image.js',
            'js/comdto/controls/hidecontrol.js',
            'js/comdto/controls/textbox.js',
            'js/comdto/controls/buttonedit.js',
            'js/comdto/controls/textarea.js',
            'js/comdto/controls/outputtext.js',
            'js/comdto/controls/list.js',
            'js/comdto/controls/treelist.js',
            'js/comdto/controls/tabs.js',
            'js/comdto/controls/tabbar.js',
            'js/comdto/controls/buttonbox.js',
            'js/comdto/controls/webuploader.js',
            'js/comdto/controls/searchbar.js',
            'js/comdto/controls/combobox.js',
            'js/comdto/controls/radiobutton.js',
            'js/comdto/controls/checkbox.js',
            'js/comdto/controls/tree.js',
            'js/comdto/controls/datepicker.js',
            'js/comdto/controls/daterangepicker.js',
            'js/comdto/controls/calendar.js',
            'js/comdto/controls/downdrop.js',
            'js/comdto/controls/material.js',
            'js/comdto/controls/sublist.js',
            'js/comdto/controls/video.js',
            'js/comdto/controls/controls.js',
            'js/comdto/controls/collapse.js',
            'js/comdto/controls/sidebar.js',
            'js/comdto/controls/overlay.js',
            'js/comdto/controls/evaluate.js',
            'js/comdto/controls/divider.js',
            'js/comdto/controls/tag.js',
            'js/comdto/controls/customlayout.js',
            'js/comdto/controls/autocomplete.js',
            'js/comdto/controls/webEditor.js',
            'js/comdto/table.js'
            // 在线表单
            // 'js/comdto/sform/sformbutton.js',
            // 'js/comdto/sform/sformdatepicker.js',
            // 'js/comdto/sform/sformdaterangepicker.js',
            // 'js/comdto/sform/sformimage.js',
            // 'js/comdto/sform/sformimageuploader.js',
            // 'js/comdto/sform/sformmonthpicker.js',
            // 'js/comdto/sform/sformoutputtext.js',
            // 'js/comdto/sform/sformsubtable.js',
            // 'js/comdto/sform/sformtitle.js',
            // 'js/comdto/sform/sformlabel.js',
            // 'js/comdto/sform/sformserialnumber.js',
            // 'js/comdto/sform/sformcombobox.js',
            // 'js/comdto/sform/sformtextbox.js',
            // 'js/comdto/sform/sformhtml.js'
        ]
    };

    function createPathArr(paths, ejsVer, env, bizRootPath) {
        var arr = [],
            envs = env.split('_');

        // ejs 层
        var correctPaths = paths['ejsv' + ejsVer];

        if (bizRootPath !== '' || bizRootPath !== '/') {
            paths.base = paths.base.map(function (e) {
                return bizRootPath + e;
            });

            correctPaths.base = correctPaths.base.map(function (e) {
                return bizRootPath + e;
            });

            paths.core = paths.core.map(function (e) {
                return bizRootPath + e;
            });

            paths.fmui = paths.fmui.map(function (e) {
                return bizRootPath + e;
            });
        }

        // base 层
        arr = arr.concat(paths.base);
        arr = arr.concat(correctPaths.base);

        for (var i = 0, len = envs.length; i < len; i++) {
            var item = correctPaths[envs[i]] || [];

            item = item.map(function (e) {
                return bizRootPath + e;
            });

            arr = arr.concat(item || []);
        }

        // core 层
        arr = arr.concat(paths.core);

        // iframesdk使用父页面ejs
        if (window.iframeSDKBizRootPath) {
            arr = arr.filter(function (path) {
                return /ejs\/v/.test(path) === false;
            });
        }

        return arr;
    }

    if (typeof Config !== 'undefined') {
        var bizRootPath = Config.bizRootPath;

        if (Config.isUseConfig) {
            // 引入配置文件
            arr.push(bizRootPath + 'js/config.js');
        }

        if (Config.isDebug) {
            if (!Config.isCoreDebug) {
                arr.push(bizRootPath + 'js/_dist/core.v' + Config.ejsVer + '.' + Config.env + '.min.js');
            } else {
                // debug模式下的资源，通过版本号和环境，自动读取配置，生成最终的文件
                arr = arr.concat(createPathArr(paths, Config.ejsVer, Config.env, bizRootPath));
            }

            if (Config.isDebugPanel) {
                // 用来捕获移动端的 log
                arr.push(bizRootPath + 'js/libs/vconsole.min.js');
            }
        } else {
            arr.push(bizRootPath + 'js/_dist/core.v' + Config.ejsVer + '.' + Config.env + '.min.js');
        }

        // 判断环境，切换JS引用
        var jsExtendData = [];

        if (ENV && Config.ENV.isUse) {
            if (Config.ENV.isAuto) {
                var uaType = ENV.getUAType(navigator.userAgent);

                if (!ENV[uaType]) {
                    console.error(`请在fmui/js/env/index.js，添加ENV.${uaType}变量。`);
                }
                jsExtendData = ENV[uaType] ? ENV[uaType] : [];
            } else {
                if (!ENV[Config.ENV.env]) {
                    console.error(`请在fmui/js/env/index.js，添加ENV.${Config.ENV.env}变量。`);
                }
                jsExtendData = ENV[Config.ENV.env] ? ENV[Config.ENV.env] : [];
            }

            for (var i = 0, l = jsExtendData.length; i < l; i++) {
                arr.push(bizRootPath + jsExtendData[i]);
            }
        }

        if (Config.isComdto) {
            arr.push(bizRootPath + 'js/libs/crypto-js.js');
            arr.push(bizRootPath + 'js/utils/util.sm2.js');
            arr.push(bizRootPath + 'js/utils/util.storage.js');
            arr.push(bizRootPath + 'js/utils/util.string.js');
            if (window.iframeSDKBizRootPath) {
                arr.push(bizRootPath + '../../rest/resource/jsboot?mobile=true');
            } else {
                arr.push(SrcBoot.getFullPath('rest/resource/jsboot?mobile=true'));
            }
            arr.push(bizRootPath + 'js/comdto/comdto.encrypt.js');
            if (window.isEmui2 || window.isEmui2 === undefined) {
                if (Config.isFmuiBuild) {
                    arr.push(bizRootPath + 'js/_dist/comdto.min.js');
                } else {
                    arr.push(bizRootPath + 'js/comdto/comdto.js');
                    arr = arr.concat(paths.fmui);
                }
            } else {
                arr.push(bizRootPath + 'js/comdto/comdto.v3.' + (Config.isDebug ? 'js' : 'min.js'));
            }
            arr.push(bizRootPath + 'js/comdto/eventFunsFmui.js');
            arr.push(bizRootPath + 'js/widgets/selectperson/m7/selectperson.js');
            arr.push(bizRootPath + 'showcase/comdto/js/handlecontrols.js');
            arr.push(bizRootPath + 'js/comdto/layout.js');
            arr.push(bizRootPath + '/js/comdto/usercontrol.js');
            arr.push(bizRootPath + 'js/extends/ejs.frame.js');
            arr.push(bizRootPath + 'js/extends/frame.custom.js');
            // arr.push(bizRootPath + 'js/libs/petite-vue.iife.js');
        }

        SrcBoot.output(arr);
    }

    if (typeof module !== 'undefined' && module.exports) {
        // 暴露给gulpfile自动构建
        module.exports = {
            paths: paths,
            createPathArr: createPathArr
        };
    }
	/** *************ztb个性化开始 by wxf 2021年10月13日************** */
	/**
	 * 全局configztb命名空间
	 */
	(function(exports) {

		/**
		 * 工作流页面的统一处理目前分为以下几种模式，对应不同的ztbev.js,会根据cssboot中的jsmode的值，动态加载ztbev(?).js文件
		 * x:[√]浏览器模式(开发和调试)-----本地开发调使用-----'x' 0:[√]接口模式(公司内app)
		 * -----标准版的v6app使用 1:[√]action模式(公司内app)
		 * -----企业版的v6app使用，因为企业版工作流没法使用接口，工作流页面按钮都是通过ejs放在右上角的app容器上
		 * 2:[√]action模式(公司内app)
		 * -----标准版的v7v8app使用，工作流页面按钮全都在页面底部，使用ep-mui-handlecontrols新封装的控件
		 * 3:[×]action模式(微信)-----标准版的v7app页面在微信中使用，但是有些机器可以，有些不触发监听
		 * 4:[√]action模式(微信[公众号、企业微信])-----标准版的v7app页面在微信中使用,把数据定义到全局变量，b页面操作完赋值，a直接从全局变量取，控制好全局变量的值
		 * 5:[×]action模式(?)-----mui.openWindow (mui的open back
		 * fire)-----不能在app中使用，变成外部浏览器打开;不能在微信中;不能在浏览器中使用;
		 * 6:[√]action模式(公司外app)-----其他公司的app中挂载我们的页面，将其他公司提供的js放在ztbev(?).js中
		 * 7:[√]action模式(微信[小程序])-----标准版的v7app页面在微信中使用,把数据定义到全局变量，b页面操作完赋值，a直接从全局变量取，控制好全局变量的值
		 * ...
		 */
		exports.jsmode = '2';

	})(this && (this.ConfigZtb = {}) || (global.ConfigZtb = {}));

	(function() {
		var commoncss = [ "frame/fmui/css/extend/app_common.css", 'frame/fmui/css/extend/app_extend.css' ];
		SrcBoot.output(commoncss);
	})();

	if ('wx' === ENV.getUAType(navigator.userAgent)) {
		ConfigZtb.jsmode = '4';
	} else if ('miniH5' === ENV.getUAType(navigator.userAgent)) {
		ConfigZtb.jsmode = '7';
	} 
	var arrZtb = [];
	arrZtb.push('frame/fmui/js/mcontrol.js');
	arrZtb.push('frame/fmui/js/extend/ztbev' + ConfigZtb.jsmode + '.js');
	arrZtb.push('frame/fmui/js/extend/ztbphone.js');
	// 兼容一些fui切换到fmui中的惯用写法，日后需要逐步调整代码并删除此js by wxf 2021年11月18日
	arrZtb.push('frame/fmui/js/epointm.compatible.js');
	arrZtb.push('frame/fmui/js/extend/ztb.js');
	// 工作流意见处理页 by wxf 2022年4月26日
	arrZtb.push('frame/fmui/js/extend/asphonebox.js');
	SrcBoot.output(arrZtb);
})();
