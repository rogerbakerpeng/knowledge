/**
 * 作者: guotq
 * 创建时间: 2017/06/16
 * 版本: [1.0, 2017/06/16 ]
 * 版权: 江苏国泰新点软件有限公司
 * 描述: 作为dataProcess的一个插拔式功能
 * 通过指定路径(v7格式下)，来获取对应的数据
 */

(function(exports) {

    /**
     * 通过指定路径，来获取对应的数据
     * 如果不符合数据要求的，请返回null，这样就会进入下一个函数处理了
     * @param {JSON} response 接口返回的数据
     * @param {String} path 一个自定义路径，以点分割，用来找数据
     * @param {JSON} returnValue 返回数据
     * 1:返回列表
     * 其它:返回详情
     * @return {JSON} 返回的数据,包括多个成功数据,错误提示等等
     * */
    function handleDataByPathV7(response, path, returnValue) {
        if (!(path !== undefined && path !== null && response && response.status && response.custom)) {
            return null;
        }
        var debugInfo = {
            type: 'v7数据格式:' + path
        };
        var status = response.status;

        // 对应状态码
        returnValue.status = status.code || 0;
        returnValue.message = status.text;
        if (+status.code === 200 || +status.code === 1) {
            returnValue.code = 1;
            
            var data = exports.getNameSpaceObj(response, path);
            
            if (data) {
                returnValue.data = data;
            } else {
                returnValue.message = returnValue.message || '指定路径下没有找到数据';
                returnValue.data = null;
            }
        } else {
            // 状态码不对，给予明确提示，v7只接受1或200状态码
            returnValue.code = 0;
            returnValue.message = 'status状态非法，非1或200';
        }

        returnValue.debugInfo = debugInfo;

        return returnValue;
    }

    exports.dataProcessFn.push(handleDataByPathV7);
})(Util);