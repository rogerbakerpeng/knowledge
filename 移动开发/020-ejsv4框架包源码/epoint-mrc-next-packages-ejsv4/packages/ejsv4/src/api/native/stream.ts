export default function streamMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;

    hybridJs.extendModule('stream', [
        {
            namespace: 'fetch',
            os: ['ejs'],
            defaultParams: {
                url: '',
                method: 'POST',
                // json text
                type: 'json',
                body: '',
                // 有一些默认的头部信息
                headers: {
                    // application/json
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            },
            runCode(...rest) {
                const args = rest;
                const options = args[0];

                options.dataFilter = (res) => {
                    const result = res.result;

                    if (options.type.toLowerCase() === 'json' && typeof result.data === 'string') {
                        try {
                            result.data = JSON.parse(result.data);
                        } catch (e) {}
                    }

                    return res;
                };

                args[0] = options;
                hybridJs.callInner.apply(this, args);
            }
        },
        {
            // 标准的框架附件上传方案，token由原始内部处理
            // 只能处理标准的框架接口
            namespace: 'uploadFile',
            os: ['ejs'],
            defaultParams: {
                // 默认参数为系统默认上传地址
                url: '',
                // 标准上传只支持一个文件接一个的上传
                path: '',
                clientGuid: '',
                clientInfo: '',
                clientTag: '',
                documentType: '',
                attachFileName: ''
            },
            runCode(...rest) {
                const args = rest;
                const options = args[0];

                // 自动处理fileName，根据路径提取
                if (!options.documentType) {
                    const pathMatch = options.path.match(/([.][^.]+)$/);

                    options.documentType = (pathMatch && pathMatch[1]) || '';
                }

                args[0] = options;
                hybridJs.callInner.apply(this, args);
            }
        },
        {
            // 标准的文件上传，可以上传多个文件
            // 自己传headers和额外参数
            namespace: 'uploadMultipartFile',
            os: ['ejs'],
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

                // 自动处理fileName，根据路径提取
                if (!options.file.fileName) {
                    const pathMatch = options.file.path.match(/[/]([^/]+)$/);

                    options.file.fileName = (pathMatch && pathMatch[1]) || '';
                }

                args[0] = options;
                hybridJs.callInner.apply(this, args);
            }
        }
    ]);
}
