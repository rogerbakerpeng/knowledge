/*
 * @Author: guotq
 * @Date: 2018-04-20 14:44:48
 * @Last Modified by: guotq
 * @Last Modified time: 2018-07-05 09:58:38
 * @Description: 关于 base64 的一些操作
 * 比如 base64 转换为 blob 对象
 * 或者 blob 对象转换成 base64
 * 去除 base64 url 部分
 * 获取 base64 url 部分
 * 获取 base64 的 mime 类型
 */

(function (exports) {
    'use strict';

    var core = {

        /*
         * base64 转换成 blob 对象
         * @param {String} b64 base64值
         * returns {Object} blob对象
         */
        base64ToBlob: function (b64) {
            var arr = b64.split(',');

            // 解码 b64 并且转换成 btype
            var btypes = window.atob(arr[1]);
            var mime = this.getMime(arr[0]);

            // 处理异常，将 ascii 码小于 0 的转换为大于 0 的
            var ab = new ArrayBuffer(btypes.length);
            // 生成识图（直接针对内存）：8位无符号整数，长度1个字节
            var ia = new Uint8Array(ab);

            for (var i = 0, len = btypes.length; i < len; i++) {
                ia[i] = btypes.charCodeAt(i);
            }

            return new Blob([ab], {
                type: mime
            });
        },

        /*
         * blob 转换成 base64 对象
         * @param {object} blob 文件对象
         * @param {Function} callback 回调函数
         * returns {String} 该文件的base64值
         */
        blobToBase64: function (blob, callback) {
            var fileReader = new FileReader();
            var that = this;

            fileReader.readAsDataURL(blob);
            fileReader.onload = function(e) {
                callback && callback.call(that, e.target.result);
            };
        },

        /**
         * 获取 base64 的类型
         * @param {String} b64 base64值
         * @returns {String} mime 类型
         */
        getMime: function (b64) {
            return b64.match(/:(.*);/)[1];
        },

        /**
         * 获取 base64 的 url 部分
         * @param {String} base64 base64值
         * @returns {String} 该 base64 的 url 部分
         */
        getBase64Url: function(base64) {
            return base64.match(/(.*),/)[1];
        },

        /**
         * 获取 base64 去除 url 部分
         * @param {String} base64 base64值
         * @returns {String} 该 base64 去除 url 后的值
         */
        getBase64NotUrl: function(base64) {
            return base64.replace(/^data.*,/, '');
        }
    };

    exports.base64 = core;
}(Util));