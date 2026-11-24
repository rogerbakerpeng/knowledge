// 返回一个当前时刻的毫秒数，用于获取一个时间戳
export function getNow() {
    return window && window.performance && window.performance.now
        ? window.performance.now() : Date.now();
}

// 检查是否是对象（对象包括普通对象、函数、数组，排除Null）
export function isObject(object) {
    const classType = Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];

    return (
        classType !== 'String' &&
        classType !== 'Number' &&
        classType !== 'Boolean' &&
        classType !== 'Undefined' &&
        classType !== 'Null'
    );
}

export const noop = () => {};

// 对象拓展，且覆盖目标对象的相同的key, 后面的覆盖前面的
export function extend(target, ...rest) {
    if (!isObject(target)) {
        throw new Error('extend请传对象');
    }
    const finalTarget = target;

    rest.forEach((source) => {
        source &&
            Object.keys(source).forEach((key) => {
                finalTarget[key] = source[key];
            });
    });

    return finalTarget;
}

/**
 * 如果version1大于version2，返回1，如果小于，返回-1，否则返回0。 TODO
 * 增加可以比较字母 2019年12月6日 14:45:59 wsz
 * @param {string} version1 版本1
 * @param {string} version2 版本2
 * @return {number} 返回版本1和版本2的关系
 */
export function compareVersion(version1, version2) {
    if (typeof version1 !== 'string' || typeof version2 !== 'string') {
        throw new Error('版本号应该是一个字符串');
    }

    // 非数字字符转换
    const getCharCode = (char) => {
        return char.replace(/[a-zA-Z]/g, (match) => match.charCodeAt()).replace(/[^\d]/g, '') - 0;
    };

    // 判断版本号每个连字符之间字符大小
    const compareChar = (char1, char2, hyphen, islong) => {
        // 连字符情况
        const charArray1 = char1.split(hyphen);
        const charArray2 = char2.split(hyphen);

        for (let j = 0; j < charArray1.length; j += 1) {
            if (!charArray2[j]) {
                // 前几位都相同的情况下，char2比char1短
                // islong为true时，谁长谁大
                return islong ? 1 : -1;
            }

            if (charArray1[j].match(/-/) || charArray2[j].match(/-/)) {
                // 如果有连字符，判断字符大小
                return compareChar(charArray1[j], charArray2[j], '-', true);
            }

            if (getCharCode(charArray1[j]) > getCharCode(charArray2[j])) {
                return 1;
            } else if (getCharCode(charArray1[j]) < getCharCode(charArray2[j])) {
                return -1;
            }
        }

        if (charArray1.length === charArray2.length) {
            // 若跳出循环时，两者长度相同，表明两者相等
            return 0;
        }
        
        // 若跳出循环时，char2比char1长
        // islong为true时，谁长谁大
        return islong ? -1 : 1;
    };

    return compareChar(version1, version2, '.', true);
}

/**
 * 字符串超出截取
 * @param {string} str 目标字符串
 * @param {Number} count 字数，以英文为基数，如果是中文，会自动除2
 * @return {string} 返回截取后的字符串
 * 暂时不考虑只遍历一部分的性能问题，因为在应用场景内是微不足道的
 */
export function eclipseText(str = '', count = 6) {
    const LEN_CHINESE = 2;
    const LEN_ENGLISH = 1;
    let num = 0;

    return str
        .split('')
        .filter((ch) => {
            num += /[\u4e00-\u9fa5]/.test(ch) ? LEN_CHINESE : LEN_ENGLISH;

            return num <= count;
        })
        .join('');
}

/**
 * 得到一个项目的根路径
 * h5模式下例如:http://id:端口/项目名/
 * @return {String} 项目的根路径，返回'http://id:端口/项目名/'或'http://id:端口/'
 */
export function getProjectBasePath() {
    const locObj = window.location;
    const patehName = locObj.pathname;
    const pathArray = patehName.split('/');
    // 如果是 host/xxx.html 则是/，如果是host/project/xxx.html,则是project/
    // pathName一般是 /context.html 或 /xxx/xx/content.html
    const hasProject = pathArray.length > 2;
    const contextPath = `${pathArray[Number(hasProject)]}/`;

    // 如果尾部有两个//替换成一个
    return `${locObj.protocol}//${locObj.host}/${contextPath}`.replace(/[/]{2}$/, '/');
}

/**
 * 将相对路径转为绝对路径 ./ ../ 开头的  为相对路径
 * 会基于对应调用js的html路径去计算
 * @param {String} path 需要转换的路径
 * @return {String} 返回转换后的路径
 */
export function changeRelativePathToAbsolute(path) {
    if (!path) {
        throw new Error('changeRelativePathToAbsolute传参不为空');
    }
    const isAbsolute = !path.match(/(^\.\.\/)|(^\.\/)/g);

    if (isAbsolute) {
        return `${getProjectBasePath()}${path.substring(0, 1) === '/' ? path.substring(1) : path}`;
    }
    const locObj = window.location;
    const patehName = locObj.pathname;
    // 匹配相对路径返回父级的个数
    const relatives = path.match(/\.\.\//g);
    const count = (relatives && relatives.length) || 0;
    // 将patehName拆为数组，然后计算当前的父路径，需要去掉相应相对路径的层级
    const pathArray = patehName.split('/');
    const parentPath = pathArray.slice(0, pathArray.length - (count + 1)).join('/');
    const childPath = path.replace(/\.+\//g, '');
    // 找到最后的路径， 通过正则 去除 ./ 之前的所有路径
    let finalPath = `${parentPath}/${childPath}`;

    finalPath = `${locObj.protocol}//${locObj.host}${finalPath}`;

    return finalPath;
}

/**
 * 得到一个全路径
 * @param {String} path 路径
 * @return {String} 返回最终的路径
 */
export function getFullPath(path = '') {
    // 全路径
    if (/^(http|https|ftp|epth|h5|file|\/\/)/g.test(path)) {
        return path;
    }

    // 是否是相对路径
    const isRelative = /(\.\/)|(\.\.\/)/.test(path);

    if (isRelative) {
        return changeRelativePathToAbsolute(path);
    }

    return `${getProjectBasePath()}${path.substring(0, 1) === '/' ? path.substring(1) : path}`;
}

/**
 * 将json参数拼接到url中
 * @param {String} url url地址
 * @param {Object} data 需要添加的json数据
 * @param {Boolean} type 是否相对路径
 * @return {String} 返回最终的url
 */
export function getFullUrlByParams(url = '', data, type) {
    let fullUrl = type === true ? url : getFullPath(url);
    let extrasDataStr = '';

    if (data) {
        Object.keys(data).forEach((item) => {
            if (extrasDataStr.indexOf('?') === -1 && fullUrl.indexOf('?') === -1) {
                extrasDataStr += '?';
            } else {
                extrasDataStr += '&';
            }
            extrasDataStr += `${item}=${data[item]}`;
        });
    }

    fullUrl += extrasDataStr;

    return fullUrl;
}

/**
 * 获取 base64 去除 url 部分
 * @param {String} base64 base64值
 * @returns {String} 该 base64 去除 url 后的值
 */
export function getBase64NotUrl(base64 = '') {
    return base64.replace(/^data.*,/, '');
}

/**
 * 产生一个 唯一uuid，默认为32位的随机字符串，8-4-4-4-12 格式
 * @param {Object} options 配置項
 * len 默认为32位（包括连字符），最大不能超过36，最小不能小于4
 * radix 随机的基数，如果小于等于10代表只用纯数字，最大为62，最小为2，默认为62
 * type 类别，默认为default代表 8-4-4-4-12的模式，如果为 其他（不为空） 代表不会有连线
 * @returns {String} uuid
 */
export function uuid(options) {
    const option = options || {};

    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    const innerUuid:string[] = [];
    let i;

    let radix = option.radix || chars.length;
    let len = option.len || 32;
    const type = option.type || 'default';

    len = Math.min(len, 36);
    len = Math.max(len, 4);
    radix = Math.min(radix, 62);
    radix = Math.max(radix, 2);

    if (len) {
        for (i = 0; i < len; i += 1) {
            // eslint-disable-next-line no-bitwise
            innerUuid[i] = chars[0 | (Math.random() * radix)];
        }

        if (type === 'default') {
            len > 23 && (innerUuid[23] = '-');
            len > 18 && (innerUuid[18] = '-');
            len > 13 && (innerUuid[13] = '-');
            len > 8 && (innerUuid[8] = '-');
        }
    }

    return innerUuid.join('');
}
