/**
 * 作者: guotq
 * 创建时间: 2017/10/12
 * 版本: [1.0, 2017/10/12 ]
 * 版权: 江苏国泰新点软件有限公司
 * 描述: ajax用户信息的自动代理
 * 如果开启了代理或自动在ajax中带上用户数据
 * 如果util.ajax配置项的isAutoProxy为false,则单个请求不会代理（只影响这一次）
 * 对于ajax的返回，会在dataprocess中统一处理
 */
(function() {
    'use strict';
    
    if (!Config.ajax) {
        return;
    }
    
    var ajaxInjectType = {
        // INJECT_TYPE_COOKIE，cookie方式注入，前提是前端已经通过统一认证登陆页面登陆
        // 具体登陆地址可以从相应的项目后台人员获取
        INJECT_TYPE_COOKIE: 0,
        // INJECT_TYPE_HEADERS, headers方式注入，前提是在新点项目app容器内部，并且ejs.auth.getToken正常使用
        // 注意，每一个项目app的token应该都是不一样的，只有当认证平台一致时才可以用oa容器测试其它项目
        INJECT_TYPE_HEADERS: 1
    };

    var injectType = ajaxInjectType.INJECT_TYPE_COOKIE;
    
    if (ejs.os.ejs) {
        // app中为头部注入
        injectType = ajaxInjectType.INJECT_TYPE_HEADERS;
    }
    
    var oldAjax = Util.ajax;

    var getTokenByApi = function(callback) {
        if (Config.ejsVer === 3) {
            ejs.auth.getToken({
                success: function(result) {
                    callback(result.access_token);
                },
                error: function(error) {
                    callback('');
                }
            });
        } else if (Config.ejsVer === 2) {
            ejs.oauth.getToken(function(result) {
                callback(result.token);
            });
        }
    };

    Util.ajax = function(options) {
        var isAutoProxy = Config.ajax && Config.ajax.isAutoProxy;
        
        var newPromise = new Promise(function(resolve, reject) {
            var newOptions = Util.extend({}, options);
            
            var isCanProxy = (isAutoProxy && newOptions.isAutoProxy !== false) || newOptions.isAutoProxy === true;
            
            if (isCanProxy) {
                if (injectType === ajaxInjectType.INJECT_TYPE_HEADERS) {
                    getTokenByApi(function(token) {
                        // header方式
                        newOptions.headers = newOptions.headers || {};
                        newOptions.headers.Authorization = 'Bearer ' + token;
                        resolve(newOptions);
                    });
                } else if (injectType === ajaxInjectType.INJECT_TYPE_COOKIE) {
                    if (options.xhrFields && options.xhrFields.withCredentials === false) {
                        newOptions.xhrFields = {
                            // 跨域带cookie
                            withCredentials: false
                        };
                    }
                    else {
                        newOptions.xhrFields = {
                            // 跨域带cookie
                            withCredentials: true
                        };
                    }
                    resolve(newOptions);
                }
            } else {
                resolve(newOptions);
            }
        });

        return newPromise.then(function(val) {
            return oldAjax(val);
        }).catch(function(error) {
            // 目前不实现错误的情况，直接抛出，防止冲突
            throw error;
        });
    };
})();