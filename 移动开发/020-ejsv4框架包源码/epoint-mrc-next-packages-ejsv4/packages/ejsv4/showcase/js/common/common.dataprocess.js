/**
 * 作者: guotq
 * 创建时间: 2017/06/22
 * 版本: [1.0, 2017/06/22 ]
 * 版权: 江苏国泰新点软件有限公司
 * 描述: 处理通用数据
 */

(function(exports) {
    // 处理数据的函数池
    exports.dataProcessFn = [];

    /**
     * 统一处理返回数据,返回数据必须符合标准才行,否则会返回错误提示
     * @param {JSON} response 接口返回的数据
     * @param {Object} options 配置信息，包括
     * dataPath 手动指定处理数据的路径，遇到一些其它数据格式可以手动指定
     * 可以传入数组，传入数组代表回一次找path，直到找到为止或者一直到最后都没找到
     * isDebug 是否是调试模式，调试模式会返回一个debugInfo节点包含着原数据
     * 其它:无法处理的数据,会返回对应错误信息
     * @return {JSON} 返回的数据,包括多个成功数据,错误提示等等
     */
    exports.dataProcess = function(response, options) {
        options = options || {};

        // 永远不要试图修改arguments，请单独备份，否则在严格模式和非严格模式下容易出现错误
        var args = [].slice.call(arguments);
        var result = {
            // code默认为0代表失败，1为成功
            code: 0,
            // 描述默认为空
            message: '',
            // 数据默认为空
            data: null,
            // v7接口中的status字段，放在第一层方便判断
            status: 0,
            // 一些数据详情,可以协助调试用
            debugInfo: {
                type: '未知数据格式'
            }
        };

        if (options.dataPath === undefined
            || options.dataPath === null) {
            // 不需要处理

            return response;
        }

        if (typeof options.dataPath === 'string') {
            options.dataPath = [options.dataPath];
        }

        // 默认为详情
        var isDebug = options.isDebug || false,
            paths = options.dataPath,
            processFns = exports.dataProcessFn,
            len = processFns.length,
            num = paths.length,
            ajaxParamsHandler = null;

        if (Config.ajax && typeof Config.ajax === 'object') {
            ajaxParamsHandler = Config.ajax.ajaxParamsHandler;
        }

        if (ajaxParamsHandler && typeof ajaxParamsHandler === 'function') {
            processFns.unshift(ajaxParamsHandler);
        }

        if (!response) {
            result.message = '接口返回数据为空!';

            return result;
        }
        
        // 添加一个result，将返回接口给子函数
        args.push(result);

        var isFoundFn = false;
        var isFoundData = false;
        var fnFoundMessage;

        for (var i = 0; !isFoundFn && i < len; i++) {
            var fn = processFns[i];

            for (var k = 0; !isFoundData && k < num; k++) {
                // 每次动态修改path参数
                args[1] = paths[k];

                var returnValue = fn.apply(this, args);
                
                if (returnValue) {
                    // 可能code为0，但其实已经找到，这时候不为null,不会再进入下一个fn了
                    // 而是在本fn中找路径
                    isFoundFn = true;
                    fnFoundMessage = returnValue.message;
                    // 找到了数据或者到了最后一个就退出
                    if (returnValue.data || k === num - 1) {
                        isFoundData = true;
                        result = returnValue;
                        break;
                    }
                }
            }
        }

        if (!isFoundData) {
            // 没有找到数据需要使用默认
            // 如果没有数据处理函数或数据格式不符合任何一个函数的要求
            result.message = fnFoundMessage || '没有数据处理函数或者接口数据返回格式不符合要求!';
            // 装载数据可以调试
            result.debugInfo.data = response;
        }

        // 非null代表已经找到格式了，这个是通过约定越好的
        if (!isDebug) {
            result.debugInfo = undefined;
        }

        return result;
    };
})(Util);