/**
 * 作者: guotq
 * 创建时间: 2017/06/08
 * 版本: [1.0, 2017/06/08 ]
 * 版权: 江苏国泰新点软件有限公司
 * 描述: 统一js引用的控制，根据是否是debug，不同的系统环境以及不同的ejs版本进行切换
 */
(function() {
    var arr = [];

    // 如要增加自定义的文件，请勿在paths中增加（默认release无法打包）
    // 请在111行后面将要增加的文件push到arr中
    var paths = {
        // base层会最先加载，作为框架的基石，base层之后是ejs层再然后才是core层
        base: [
            // 'js/libs/promise.js',
            'js/mui/mui.js',
            'js/libs/zepto.min.js',
            'js/libs/mustache.min.js',
            'js/widgets/mui.picker/mui.picker.min.js',
            'js/widgets/mui.poppicker/mui.poppicker.min.js',
            'js/widgets/vue/vue.min.js',
            'js/widgets/vant/vant.min.js',
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
            'js/common/common.input.js',
            'js/common/common.ejs.webenv.js',
            // 依赖了下面的 ejs 类库，以3.x的用法 来兼容部分2.x的 api
            'js/common/common.ejs.compatible.js',
            'js/common/common.token.compatible.js',
            'js/common/common.ajax.proxy.js'
        ],
        ejsv2: {
            base: [
                'js/ejs/v2/epoint.moapi.v2.js'
            ],
            h5: [
                'js/ejs/v2/epoint.moapi.v2.h5mui.js'
            ],
            dd: [
                'js/ejs/dingtalk.js',
                'js/ejs/v2/epoint.moapi.v2.dd.js'
            ]
        },
        ejsv4: {
            base: [
                '../../dist/ejs.js'
            ],
            h5: [
                '../../dist/ejs.h5.js'
            ],
            dd: [
                'js/ejs/dingtalk.js',
                '../../dist/ejs.dd.js'
            ],
            ejs: [
                '../../dist/ejs.native.js'
            ],
            f9: [
                '../../dist/ejs.f9.js'
            ]
        }
    };

    function createPathArr(paths, ejsVer, env, bizRootPath) {
        var arr = [],
            envs = env.split('_');

        // ejs 层
        var correctPaths = paths['ejsv' + ejsVer];

        if (bizRootPath !== '' || bizRootPath !== '/') {
            paths.base = paths.base.map(function(e) {
                return bizRootPath + e;
            });

            correctPaths.base = correctPaths.base.map(function(e) {
                return bizRootPath + e;
            });

            paths.core = paths.core.map(function(e) {
                return bizRootPath + e;
            });
        }

        // base 层
        arr = arr.concat(paths.base);
        arr = arr.concat(correctPaths.base);

        for (var i = 0, len = envs.length; i < len; i++) {
            var item = correctPaths[envs[i]] || [];

            item = item.map(function(e) {
                return bizRootPath + e;
            });

            arr = arr.concat(item || []);
        }

        // core 层
        arr = arr.concat(paths.core);

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
        }
        else {
            arr.push(bizRootPath + 'js/_dist/core.v' + Config.ejsVer + '.' + Config.env + '.min.js');
        }

        if (Config.isComdto) {
            // comdto通过配置项引入
            arr.push(bizRootPath + 'js/comdto/comdto.' + (Config.isDebug ? 'js' : 'min.js'));
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
}());