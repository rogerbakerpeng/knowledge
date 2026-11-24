/**
 * 作者: guotq
 * 创建时间: 2017/08/03
 * 版本: [1.0, 2017/08/03 ]
 * 版权: 江苏国泰新点软件有限公司
 * 描述: ejs token的处理，包括
 * h5下的getToken代理
 */

(function(Config) {
    if (!Config.token) {
        return;
    }
    
    // 每个页面默认只会请求一次token
    var globalToken,
        // token自动过期的定时器
        timer,
        tokenDuration = Config.token.duration || 7200;

    var durationTimer = function() {
        clearTimeout(timer);

        timer = setTimeout(function() {
            globalToken = undefined;
        }, tokenDuration * 1000);
    };

    /**
     * 获取token，通过回调传值
     * @param {Function} success 成功回调
     */
    var getTokenH5 = function(success) {
        if (globalToken) {
            success(globalToken);
        } else {
            if (typeof Config.token.getToken === 'string') {
                globalToken = Config.token.getToken;
                success(globalToken);
            } else if (typeof Config.token.getToken === 'function') {
                Config.token.getToken(function(token) {
                    globalToken = token;
                    success(globalToken);
                    durationTimer();
                });
            }
        }

    };

    if (Config.ejsVer === 3) {
        ejs.extendApi('auth', {
            namespace: 'getToken',
            os: ['h5'],
            runCode: function(options, resolve, reject) {
                getTokenH5(function(token) {
                    var result = {
                        token: token || ''
                    };

                    options.success && options.success(result);
                    resolve && resolve(result);
                });
            }
        });
    } else if (Config.ejsVer === 2) {
        var oldToken = ejs.oauth.getToken;

        ejs.oauth.getToken = function(callback, defaultValue) {
            if (Util.os.ejs) {
                oldToken.apply(this, arguments);
            } else {
                getTokenH5(function(token) {
                    var result = {
                        token: token || ''
                    };

                    callback && callback(result);
                });
            }
        };
    }

})(window.Config);