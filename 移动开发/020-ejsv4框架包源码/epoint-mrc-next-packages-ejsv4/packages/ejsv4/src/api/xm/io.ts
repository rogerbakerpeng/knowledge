import callXmByArgs from './lib/callxm';

export default function ioMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('io', [
        {
            namespace: 'downloadFile',
            os: ['xm'],
            defaultParams: {
                url: '',
                fileName: ''
            },
            runCode(...rest) {
                const args = rest;
                const options = args[0];

                args[0] = innerUtil.extend(args[0], {
                    url: args[0].url,
                    filePath: `/ejs/${options.fileName}`
                });
                args[0].dataFilter = (result) => ({
                    filePath: result.filePath
                });
                callXmByArgs(args, xm.downloadFile);
            }
        },
        {
            namespace: 'selectFile',
            os: ['xm'],
            defaultParams: {
                multi: 0
            },
            runCode(...rest) {
                const args = rest;
                const options = args[0];

                if (options.multi === 0) {
                    // 单选
                    args[0] = innerUtil.extend(args[0], {
                        count: 1
                    });
                } else if (options.multi === 1) {
                    // 多选
                    args[0] = innerUtil.extend(args[0], {
                        count: 9
                    });
                }
                args[0].dataFilter = (result) => {
                    const path = [];

                    if (result instanceof Array) {
                        result.forEach((item) => {
                            path.push(item.path);
                        });
                    } else {
                        path.push(result.path);
                    }

                    return {
                        resultData: path
                    };
                };
                callXmByArgs(args, xm.chooseFile);
            }
        },
        {
            namespace: 'openFile',
            os: ['xm'],
            defaultParams: {
                path: ''
            },
            runCode(...rest) {
                const args = rest;
                const options = args[0];
                let fileName = options.path.split('/')[options.path.split('/').length - 1];

                fileName = fileName.split('?')[0];

                args[0] = innerUtil.extend(args[0], {
                    path: options.path,
                    fileName
                });
                callXmByArgs(rest, xm.openFile, false);
            }
        }
    ]);
}
