export default function ioMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('io', [
        {
            namespace: 'downloadFile',
            os: ['ejs'],
            // 支持的最小版本，可以等于，Android，iOS通用
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
                // 新增自动打开下载文件参数 ejs3.4.0
                autoStart: 0
            }
        },
        {
            namespace: 'selectFile',
            os: ['ejs'],
            support: '3.1.2',
            defaultParams: {
                multi: 0,
                // 文件数量
                count: 9
            }
        },
        {
            namespace: 'openFile',
            os: ['ejs'],
            support: '3.1.2',
            defaultParams: {
                path: ''
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'path');

                hybridJs.callInner.apply(this, args);
            }
        },
        {
            namespace: 'renameFile',
            os: ['ejs'],
            support: '3.1.2',
            defaultParams: {
                path: '',
                // 如果仅仅是想重命名名字，传newName即可
                newName: '',
                // 如果想要重命名后缀，传后缀就可以了，没有后缀请不要传
                newSuffix: undefined
            }
        },
        {
            namespace: 'copyFile',
            os: ['ejs'],
            support: '3.1.2',
            defaultParams: {
                path: '',
                // 新的路径
                newPath: ''
            }
        },
        {
            namespace: 'deleteFile',
            os: ['ejs'],
            support: '3.1.2',
            defaultParams: {
                path: ''
            }
        },
        {
            namespace: 'getFileSize',
            os: ['ejs'],
            support: '3.1.7',
            defaultParams: {
                path: ''
            }
        },
        {
            namespace: 'screenShot',
            os: ['ejs'],
            support: '3.2.5a',
            defaultParams: {
                captureType: 1
            }
        },
        {
            namespace: 'report',
            os: ['ejs'],
            support: '4.0.0',
            defaultParams: {
                // url地址
                url: '',
                // 响应时间(毫秒)
                responsetime: '',
                // 请求内容（请求出错才有）
                request: '',
                // 响应内容（请求出错才有）
                response: '',
                // 0容器，1小程序，2H5
                belong: '',
                // 成功或者失败标示，'0'失败，'1'成功
                successorfail: ''
            }
        },
        {
            namespace: 'record',
            os: ['ejs'],
            defaultParams: {
                eventid: '', // 具体的页面
                eventname: '', // open|click|close|jserror|debug
                eventcontent: '', // jserror | debug事件内容
                clickid: '', // 点击按钮 id
                clicktitle: '' // 点击按钮 title
            }
        }
    ]);
}
