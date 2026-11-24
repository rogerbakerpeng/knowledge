/**
 * 作者: guotq
 * 创建时间: 2017/12/11
 * 版本: [1.0, 2017/12/11 ]
 * 版权: 江苏国泰新点软件有限公司
 * 描述: 配置文件，可以用来放置一些业务相关配置代码（仍然是基于config的拓展）
 * cssboot中需开启isUseConfig（否则不会引入）
 * 注意⚠️：一些通用全局配置在cssboot中
 * 这个文件中也可以拓展自己项目的相关业务配置
 */
(function (exports) {
    /**
     * 这里是ajax的全局变量，影响所有请求，当然了，每次请求时，可以单独覆盖一些配置，只影响单次请求
     * Util.ajax中的参数优先级要大于全局配置
     */
    exports.ajax = {
        // 是否默认处理错误返回信息
        // 如果开启，框架会处理一些默认的返回错误,并提示（非200情况下），处理的错误码如下
        // 400，401，403，404，500，503
        isAutoDealError: true,
        // 是否开启自动弹窗提示，isAutoDealError为true时才生效
        isAutoToast: true,
        // 每次 ajax时，也可以增加isAutoProxy:false，来让本次请求不代理
        // 是否自动代理，如果开启，所有的请求会默认带上用户相关信息，h5是cookie中，app是headers中
        // 如果非新点标准后台，请关闭，否则会影响正常请求
        // 登陆地址譬如：http://218.4.136.114:8089/oarest9V7/fui/pages/themes/dream/dream
        isAutoProxy: true
    };

    /**
     * v6中针对ejs.oauth.getToken接口的定制
     * 可以修改getToken返回的值，方便v6中调试
     * v7中开发人员无需关注token（通过ajax自动代理进行设置）
     */
    exports.token = {
        // token的过期时间，防止页面的token过期，单位为秒
        // H5下动态获取时才会有缓存
        duration: 7200,
        // 可以是字符串，也可以是方法
        // 字符串的话直接可以使用，函数的话 通过success回调返回
        // 只是H5下有效，ejs下默认就是容器的token，不容改变
        getToken: function (success) {
            success('');
        }
    };

    /**
     * 设置在非EJS容器环境下
     * EJS的配置项的一些默认值，存在localStorage中
     * 通过ejs.storage.getItem获取的
     * 用来方便开发
     */
    exports.webEjsEnvStore = {
        oaName: '移动研发部'
    };

    /**
     * commondto的配置
     * 用于适配基于f9的业务action
     */
    var comdto = {
        // 是否使用配置，使用的话使用配置里的rootUrl，否则使用f9默认的
        isUseConfig: false,
        isRestFul: true,
        rootUrl: './',
        // 是否模拟数据
        isMock: true,

        // ajax请求方式，'post'/'get'
        requestMethod: ''
    };

    if (comdto.isRestFul) {
        comdto.rootUrl += 'rest/';
    }

    exports.comdto = comdto;

    /**
     * 业务接口相关的配置
     */
    var bizlogic = {
        // 是否是正式
        isFormal: true,
        // 正式的接口地址
        serverUrlFormal: '//115.29.151.25:8012/',
        // 测试的接口地址
        serverUrlTest: '//192.168.114.35:8016/webUploaderServer/'
    };

    exports.serverUrl = bizlogic.isFormal ? bizlogic.serverUrlFormal : bizlogic.serverUrlTest;
})(Config);
