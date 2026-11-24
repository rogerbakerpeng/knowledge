/**
 * 作者: guotq
 * 创建时间: 2017/05/23
 * 版本: [1.0, 2017/05/23 ]
 * 版权: 江苏国泰新点软件有限公司
 * 描述: cssboot，用来初始化加载css
 * 同时进行一些统一的全局配置（不包含业务配置）
 */

/**
 * 全局config命名空间
 */
(function (exports) {
    exports.version = '7.3.2';

    /**
     * 时间戳
     */
    exports.TIME_STAMP = '_=' + (exports.isDebug ? '20180605' : '20241224');

    /**
     * 开发态和部署态的切换
     * 1为开发态，0为部署态
     * 开发态时自动引入源文件
     * 部署态时，除了排除的目录，其它目录都会自动将文件引用切换为.min后缀的压缩文件
     */
    exports.isDebug = 1;

    /**
     * 核心代码开发态和部署态的切换
     * 1为开发态，0为部署态
     * 开发态时自动引入源文件
     * 部署态时，除了排除的目录，其它目录都会自动将文件引用切换为.min后缀的压缩文件
     */
    exports.isCoreDebug = 1;

    /**
     * 资源默认引入路径，默认为 /
     */
    exports.bizRootPath = '/';
    /**
     * 是否开启配置文件
     * 开启后，会引入config.js，里面可以进行一些全局业务配置
     * 如果不开启：config.js文件中的配置都不会生效，因为它不会被加载
     */
    exports.isUseConfig = 1;

    /**
     * 是否开启 调试面板， 开启可以在移动端捕获log
     * 仅在debug模式下有效
     */
    exports.isDebugPanel = 0;

    /**
     * 是否自动记录，如果开启后，每次ajax请求前和收到数据后都会记录
     * 记录到原生调试面板上
     */
    exports.isAutoLogInNativeLogPanel = 0;

    /**
     * comdto通过配置项决定是否自动引入
     * 只有这个开启后，才会引入comdto，后续的配置才会生效
     */
    exports.isComdto = 1;

    /**
     * 开发环境常量，分别为：h5（wechat）、ejs、dingtalk
     */
    var ENV_H5 = 'h5',
        // ejs 环境
        ENV_EJS = 'ejs',
        // dingtalk 环境
        ENV_DD = 'dd',
        // 同时支持ejs与h5
        ENV_EJS_H5 = 'ejs_h5',
        // 同时支持ejs与f9框架下部分API
        ENV_EJS_F9 = 'ejs_f9',
        // 同时支持ejs、dd与f9框架下部分API
        ENV_EJS_DD_F9 = 'ejs_dd_f9',
        // 同时支持dd与h5
        ENV_DD_H5 = 'dd_h5',
        // 会引入h5、dd和native全部的库
        ENV_ALL = 'ejs_dd_h5';

    exports.env = ENV_ALL;

    /**
     * 当ejs前框架使用的版本
     * 2 代表 2.x 版本的 ejs
     * 3 代表 3.x
     */
    exports.ejsVer = 4;

    if (!exports.isDebug) {
        // 关闭log
        // console.log = function() {};
    }

    /**
     * 需要排除的目录或者文件数组，文件请以.css或者.js结尾，否则会默认认为是目录
     * 被排除的目录在发布态下不会切换为.min
     * 会根据引入的实际路径计算，并且或默认排除网络路径
     */
    exports.exclude = [
        /js\/_dist\//,
        /js\/config/,
        /js\/libs/,
        // 可以是 showcase/ 或 showcasexxx/ 但不能是 showcase//
        /modules[^/]*/,
        /showcase[^/]*/,
        /examples[^/]*/,
        /test[^/]*/
    ];

})(this && (this.Config = {}) || (global.Config = {}));

(function (exports) {

    var TIME_STAMP = exports.Config.TIME_STAMP;

    /**
     * 文件写入
     */
    var SrcBoot = {

        /**
         * 得到一个项目的根路径,只适用于混合开发
         * h5模式下例如:http://id:端口/项目名/
         * @param {String} reg 项目需要读取的基本目录
         * @return {String} 项目的根路径
         */
        getProjectBasePath: function (reg) {
            reg = reg || '/frame/';
            var basePath = '';
            var obj = window.location;
            var patehName = obj.pathname;
            // h5
            var contextPath = '';

            // 兼容pages
            // 普通浏览器
            contextPath = patehName.substr(0, patehName.lastIndexOf(reg) + 1);
            // 暂时放一个兼容列表，兼容一些固定的目录获取
            var pathCompatibles = ['/html/', '/showcase/', '/showcase_pending/', '/test/', '/'];

            for (var i = 0, len = pathCompatibles.length; i < len && (!contextPath || contextPath === '/'); i++) {
                var regI = pathCompatibles[i];

                // 这种获取路径的方法有一个要求,那就是所有的html必须在regI文件夹中,并且regI文件夹中不允许再出现regI目录
                contextPath = patehName.substr(0, patehName.lastIndexOf(regI) + 1);

                if (regI === '/') {
                    // 最后的根目录单独算
                    var path = patehName;

                    if (/^\//.test(path)) {
                        // 如果是/开头
                        path = path.substring(1);
                    }
                    contextPath = '/' + path.split('/')[0] + '/';
                }
            }
            // 兼容在网站根路径时的路径问题
            basePath = obj.protocol + '//' + obj.host + (contextPath ? contextPath : '/');

            return basePath;
        },

        /**
         * 将相对路径转为绝对路径 ./ ../ 开头的  为相对路径
         * 会基于对应调用js的html路径去计算
         * @param {Object} path 路径
         * @return {String} 返回转化后的相对路径
         */
        changeRelativePathToAbsolute: function (path) {
            var obj = window.location,
                patehName = window.location.pathname;

            // 匹配相对路径返回父级的个数
            var relatives = path.match(/\.\.\//g);
            var count = relatives && relatives.length;

            // 将patehName拆为数组，然后计算当前的父路径，需要去掉相应相对路径的层级
            var pathArray = patehName.split('/');
            var parentPath = pathArray.slice(0, pathArray.length - (count + 1)).join('/');
            // 找到最后的路径， 通过正则 去除 ./ 之前的所有路径
            var finalPath = parentPath + '/' + path.replace(/\.+\//g, '');

            finalPath = obj.protocol + '//' + obj.host + finalPath;

            return finalPath;
        },

        /**
         * 得到一个全路径
         * @param {String} path 路径
         * @return {String} 返回全路径
         */
        getFullPath: function (path) {
            // 全路径
            if (/^(http|https|ftp|\/\/)/g.test(path)) {
                return path;
            }
            // 是否是相对路径
            var isRelative = /^(\.\/|\.\.\/)/.test(path);

            // 非相对路径，页面路径默认从html目录开始
            path = (isRelative ? path : ((SrcBoot.getProjectBasePath()) + path));

            return path;
        },

        /**
         * 根据config中的开发态和部署态
         * 切换对应的path
         * 如部署态非排除目录下的文件切换为.min文件
         * @param {String} path 路径
         * @return {String} 返回转换后的路径
         */
        changePathByConfig: function (path) {
            if (Config.isDebug || !path || /\.min\./.test(path) || /^(http|https|ftp|\/\/)/g.test(path)) {
                return path;
            }

            // 考虑相对路径的存在
            var isRelative = /^(\.\/|\.\.\/)/.test(path);

            // 转为绝对路径，方便判断
            if (isRelative) {
                path = SrcBoot.changeRelativePathToAbsolute(path);
            } else {
                path = SrcBoot.getFullPath(path);
            }
            // 排除目录
            var exclude = Config.exclude;

            // 默认就用indexOf去判断了
            for (var i = 0, len = exclude.length; i < len; i++) {
                if (exclude[i].test(path)) {
                    return path;
                }
            }
            // 替换.min
            var suffix = SrcBoot.getPathSuffix(path);

            path = path.replace('.' + suffix, '');
            path += '.min.' + suffix;

            return path;
        },

        /**
         * 得到文件的后缀
         * @param {String} path 路径
         * @return {String} 返回后缀
         */
        getPathSuffix: function (path) {
            var dotPos = path.lastIndexOf('.'),
                suffix = path.substring(dotPos + 1);

            return suffix;
        },

        /**
         * 批量输出css|js
         * @param {Array} arr 文件数组
         */
        output: function (arr) {
            var i = 0,
                len = arr.length,
                path,
                ext;

            for (; i < len; i++) {
                path = arr[i];
                if (!path) {
                    continue;
                }

                path = SrcBoot.changePathByConfig(path);
                path = SrcBoot.getFullPath(path);

                ext = SrcBoot.getPathSuffix(path);

                // 统一加上时间戳缓存
                if (path.indexOf('?') === -1) {
                    // 没有?,加上？
                    path += '?';
                } else {
                    // 有了?,加上&
                    path += '&';
                }
                path += TIME_STAMP;

                if (ext === 'js') {
                    document.writeln('<script src="' + path + '"></sc' + 'ript>');
                } else {
                    document.writeln('<link rel="stylesheet" href="' + path + '">');
                }
            }
        }
    };

    exports.SrcBoot = SrcBoot;

})(this || global);

var bizRootPath = this.Config.bizRootPath;
var paths = [
    // 写入每个页面必备的css文件
    bizRootPath + 'js/mui/mui.css',
    bizRootPath + 'js/mui/mui-icons-extra.css',
    bizRootPath + 'js/mui/mui.extend.css',
    bizRootPath + 'js/widgets/mui.picker/mui.picker.min.css',
    bizRootPath + 'js/widgets/mui.poppicker/mui.poppicker.min.css',
    bizRootPath + 'js/widgets/vant/index.css'
];

if (typeof Config !== 'undefined') {
    var arr = [];

    if (Config.isDebug) {
        arr = paths;
    } else {
        // 正式模式下的，比较简单
        arr.push(bizRootPath + 'js/_dist/core.min.css');
    }

    // 可以在这加入项目自定义的全局css

    SrcBoot.output(arr);
}

if (typeof module !== 'undefined' && module.exports) {
    // 暴露给gulpfile自动构建
    module.exports = {
        paths: paths
    };
}
