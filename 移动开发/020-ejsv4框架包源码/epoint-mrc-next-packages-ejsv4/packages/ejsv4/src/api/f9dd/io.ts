export default function ioMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;

    hybridJs.extendModule('io', [
        {
            namespace: 'downloadFile',
            os: ['dd'],
            support: '3.1.2',
            defaultParams: {
                // 下载地址
                url: '',
                // 文件名。必填。
                fileName: '',
                // 下载分类。默认为(其他分类)。推荐传对应的模块名称。例如邮件(MAIL)。如果没有"附件管理"模块，可忽略该参数。
                type: '',
                //  如果本地已有该文件是否重新下载。默认为0(直接打开文件)，为1时重新下载文件并且重命名。
                reDownloaded: 0,
                // 是否下载后打开，为1为默认打开,不传则根据配置文件而定
                // 仅在后台静默下载时有用
                // openAfterComplete: 1,
                // 是否在后台下载，如果是，则静默后台下载，否则会专门跳到一个下载页面
                isBackground: 1,
                autoStart: 0
            },
            runCode(...rest) {
                const args = rest;
                const options = args[0];
                const resolve = args[1];

                const corpId = localStorage.getItem('corpId') || '';

                dd.biz.cspace.saveFile({
                    corpId,
                    url: options.url, // 文件在第三方服务器地址， 也可为通过服务端接口上传文件得到的media_id，详见参数说明
                    name: options.fileName,
                    onSuccess(data) {
                        const res = data.data;

                        if (options.autoStart === 1) {
                            const spaceId = res[0].spaceId;
                            const fileId = res[0].fileId;
                            const fileName = res[0].fileName;
                            const fileSize = res[0].fileSize;
                            const fileType = res[0].fileType;

                            dd.biz.cspace.preview({
                                corpId,
                                spaceId,
                                fileId,
                                fileName,
                                fileSize,
                                fileType,
                                onSuccess() {
                                    options.success && options.success();
                                    resolve && resolve();
                                    // 无，直接在native显示文件详细信息
                                },
                                onFail(err) {
                                    console.warn(JSON.stringify(err));
                                    // 无，直接在native页面显示具体的错误
                                }
                            });
                        } else {
                            options.success && options.success(data);
                            resolve && resolve(data);
                        }
                    },
                    onFail(err) {
                        console.warn(JSON.stringify(err));
                    }
                });
            }
        }
    ]);
}
