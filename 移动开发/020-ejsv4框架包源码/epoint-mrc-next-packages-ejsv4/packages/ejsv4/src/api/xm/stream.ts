/* eslint-disable camelcase */
import callXmByArgs from './lib/callxm';
export default function streamMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;

    hybridJs.extendModule('stream', [
        {
            namespace: 'fetch',
            os: ['xm'],
            defaultParams: {
                url: '',
                method: 'POST',
                body: '',
                // 有一些默认的头部信息
                headers: {
                    // application/json
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            },
            runCode(...rest) {
                const args = rest;
                const resolve = args[1];
                const reject = args[2];

                xm.request({
                    url: args[0].url,
                    data: args[0].body,
                    headers: args[0].headers,
                    method: args[0].method,
                    withCredentials: false
                })
                    .then((response) => {
                        let res = response;

                        if (args[0].type === 'json') {
                            res = JSON.parse(response) || response;
                        }

                        const newResult = {
                            data: res
                        };

                        args[0].success && args[0].success(newResult);
                        resolve && resolve(newResult);
                        // response.json().then((result) => {
                        //     const newResult = {
                        //         data: result
                        //     };

                        //     args[0].success && args[0].success(newResult);
                        //     resolve && resolve(newResult);
                        // });
                    })
                    .catch((error) => {
                        args[0].error && args[0].error(error);
                        reject && reject(error);
                    });
            }
        },
        {
            // 标准的文件上传，可以上传多个文件
            // 自己传headers和额外参数
            namespace: 'uploadMultipartFile',
            os: ['xm'],
            defaultParams: {
                url: '',
                // 有一些默认的头部信息
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                file: {
                    name: '',
                    path: '',
                    mediaType: '',
                    fileName: ''
                },
                // 额外的表单数据
                dataForm: {}
            },
            runCode(...rest) {
                const args = rest;
                const options = args[0];

                args[0].params = {
                    url: options.url,
                    name: options.file.name,
                    filePath: options.file.path,
                    data: options.dataForm,
                    headers: options.headers
                };

                callXmByArgs(args, xm.uploadFile);
            }
        }
    ]);
}
