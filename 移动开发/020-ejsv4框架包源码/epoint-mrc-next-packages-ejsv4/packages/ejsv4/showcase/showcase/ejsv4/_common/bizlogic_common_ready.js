/**
 * 作者: 戴荔春
 * 创建时间: 2017/05/25
 * 版本: [3.0, 2017/05/25 ]
 * 版权: 江苏国泰新点软件有限公司
 * 描述: ejs页面ready的通用操作 
 */
(function(exports) {

    function ready(isNotAutoConfig, fileArray, callback) {
        var args = [].slice.call(arguments);
        
        if (typeof isNotAutoConfig !== 'boolean') {
            fileArray = isNotAutoConfig;
            callback = fileArray;
        }

        if (typeof fileArray === 'function') {
            callback = fileArray;
            fileArray = null;
        }
        // 如果已经有2.0的，先消除
        if (Config.ejsVer !== 4) {
            window.ejs = undefined;
            window.JSBridge = undefined;
        }
        /**
         * 默认会取到html或者pages的上一层级
         * 如果要取更上一级的路径，需要自己取根路径进行拼凑
         */
        Util.loadJs(
            // 如果不是4.0的ejs 额外引入
            Config.ejsVer != 4 ? 'js/ejs/v4/ejs.js' : '',
            Config.ejsVer != 4 ? [
                // 默认引入ejs h5 dd所有的支持库作为示例展示
                'js/ejs/v4/ejs.native.js',
                'js/ejs/v4/ejs.h5.js',
                'js/ejs/dingtalk.js',
                'js/ejs/v4/ejs.dd.js'
            ] : '',
            './_common/bizlogic_common_default.js',
            './_common/bizlogic_common_ejs_default.js',
            fileArray || [],
            function() {
                if (isNotAutoConfig === true) {
                    callback && callback();
                } else {                  
                    var listAndroid = [{
                        'ui': 'com.epoint.ejs.api.UIApi'
                    }];
                    var listIOS = [{
                        'ui': 'EJSUIApi'
                    }];
                    var list = ejs.os.android ? listAndroid : listIOS;
                    // 默认是h5环境的。所以ejs.os.h5设置是没有意义的
                    // ejs.os.ejs = true;
                    // ejs.os.dd = false;
                    ejs.error(function(error) {
                        // alert("ejs错误提示:" + JSON.stringify(error));
                        // ejs.ui.alert("ejs错误提示:" + JSON.stringify(error));
                    });

                    // ejs.config({
                    //     corpId: '12345',
                    //     jsApiList: list
                    // });
                    // ejs.ready(function() {
                        callback && callback();
                    // });
                }

                //				if(ejs.os.ios) {
                //				    callback && callback();
                //				}				
            });
    }
    window.Util = window.Util || {};
    Util.bizlogic = Util.bizlogic || {};
    Util.bizlogic.ready = ready;
})({});