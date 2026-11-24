export default function encrypt(params, resolve, reject) {
    const options = params;
    const success = options.success;
    const error = options.error;

    if (!options.text) {
        const err = {
            code: 0,
            msg: '需要加密的字符串不存在'
        };

        error && error(err);
        reject && reject(err);

        return;
    }
    if (options.type === '0') {
        const result = {
            text: options.text
        };

        success && success(result);
        resolve && resolve(result);

        return;
    }
    if (!options.keys || options.keys.length !== 2) {
        const err = {
            code: 0,
            msg: 'H5encrypt加密需要正确传参keys数组'
        };

        error && error(err);
        reject && reject(err);

        return;
    }
    const key = options.keys[0];
    const iv = options.keys[1];
    const message = options.text;
    let result;

    try {
        const ciphertext = CryptoJS.AES.encrypt(message, CryptoJS.enc.Utf8.parse(key), {
            iv: CryptoJS.enc.Utf8.parse(iv),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        const encryptText = CryptoJS.enc.Base64.stringify(ciphertext.ciphertext);

        result = {
            text: encryptText
        };
    } catch (msg) {
        const errorMsg = 'CryptoJS加密失败，H5加密需要引入aes.js文件库';

        const err = {
            code: 0,
            msg: errorMsg,
            result: msg
        };

        error && error(err);
        reject && reject(err);

        return;
    }
    success && success(result);
    resolve && resolve(result);
}
