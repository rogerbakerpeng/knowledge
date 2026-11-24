import { isObject, getFullPath, getFullUrlByParams, eclipseText, extend, getBase64NotUrl } from '../util/lang';

export default function innerUtilMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const innerUtil = {} as EJSNamespace.EJSType['innerUtil'];

    hybridJs.innerUtil = innerUtil;

    /**
     * 将参数兼容字符串形式，返回新的args
     * 正常应该是 object, resolve, reject
     * 兼容的字符串可能是 key1, (key2, key3,) ..., resolve, reject
     * @param {Object} args 原始的参数
     * @param {Object} rest 剩余的参数，相当于从arguments1开始算起
     * @return {Object} 返回标准的参数
     */
    function compatibleStringParamsToObject(this:any, args, ...rest) {
        const newArgs = args;

        if (!args || !Array.isArray(args)) {
            return args;
        }

        if (!innerUtil.isObject(newArgs[0])) {
            const options = {};
            const isPromise = !!hybridJs.getPromise();
            const len = newArgs.length;
            const paramsLen = isPromise ? len - 2 : len;

            // 填充字符串key，排除最后的resolve与reject
            for (let i = 0; i < paramsLen; i += 1) {
                // 注意映射关系，rest[0]相当于以前的arguments[1]
                if (rest[i] !== undefined) {
                    options[rest[i]] = newArgs[i];
                }
            }

            // 分别为options，resolve，reject
            newArgs[0] = options;
            if (isPromise) {
                newArgs[1] = newArgs[len - 2];
                newArgs[2] = newArgs[len - 1];
            } else {
                // 去除普通参数对resolve与reject的影响
                newArgs[1] = undefined;
                newArgs[2] = undefined;
            }
        }

        // 默认参数的处理，因为刚兼容字符串后是没有默认参数的
        if (this.api && this.api.defaultParams && newArgs[0] instanceof Object) {
            Object.keys(this.api.defaultParams).forEach((item) => {
                if (newArgs[0][item] === undefined) {
                    newArgs[0][item] = this.api.defaultParams[item];
                }
            });
        }

        // 否则已经是标准的参数形式，直接返回
        return newArgs;
    }

    /**
     * 限制按钮个数，只选其中num个
     * @param {Array} arr 参数数组
     * @param {Number} maximum 允许最大个数
     * @returns {Array} 返回正确的数组
     */
    function eclipseButtonsNumber(arr, maximum) {
        const result = arr;

        if (result && Array.isArray(result)) {
            const len = result.length;

            if (len > maximum) {
                const difference = len - (len - maximum);

                result.length = difference;
            }
        }

        return result;
    }

    innerUtil.extend = extend;
    innerUtil.isObject = isObject;
    innerUtil.getFullPath = getFullPath;
    innerUtil.getFullUrlByParams = getFullUrlByParams;
    innerUtil.eclipseText = eclipseText;
    innerUtil.compatibleStringParamsToObject = compatibleStringParamsToObject;
    innerUtil.eclipseButtonsNumber = eclipseButtonsNumber;
    innerUtil.getBase64NotUrl = getBase64NotUrl;
}
