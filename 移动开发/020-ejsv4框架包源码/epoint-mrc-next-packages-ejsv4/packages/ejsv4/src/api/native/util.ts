import { compareVersion } from '../../util/lang';
export default function utilMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('util', [
        {
            namespace: 'scan',
            os: ['ejs'],
            defaultParams: {
                // 是否显示历史记录 3.4.0add
                showHistory: 0,
                // 0 容器底座处理结果，1 H5接受并个性化处理，默认为 1
                needResult: 1
            }
        },
        {
            namespace: 'playVideo',
            os: ['ejs'],
            defaultParams: {
                // 视频地址
                videoUrl: ''
            }
        },
        {
            namespace: 'selectImage',
            os: ['ejs'],
            defaultParams: {
                // 图片数量
                photoCount: 9,
                // 是否允许拍照，1：允许；0：不允许
                showCamera: 0,
                // 是否显示gif图片，1：显示；0：不显示
                showGif: 0,
                // 是否允许预览，1：允许，0：不允许
                previewEnabled: 1,
                // 已选图片，json数组格式，item为元素本地地址
                selectedPhotos: []
            }
        },
        {
            namespace: 'prevImage',
            os: ['ejs'],
            defaultParams: {
                // 默认显示图片序号
                index: 0,
                // 是否显示删除按钮，1：显示，0：不显示，默认不显示。如果显示按钮则自动注册回调事件。
                showDeleteButton: 0,
                // 图片地址，json数组格式，item为元素本地地址
                selectedPhotos: []
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'text');
                const selectedPhotos = args[0].selectedPhotos;

                for (let i = 0, len = selectedPhotos.length; i < len; i += 1) {
                    args[0].selectedPhotos[i] = innerUtil.getFullPath(selectedPhotos[i]);
                }

                hybridJs.callInner.apply(this, args);
            }
        },
        {
            namespace: 'cameraImage',
            os: ['ejs'],
            defaultParams: {
                // 宽度
                width: 720,
                // 压缩质量
                quality: 70,
                // 0“表示拍照时默认打开后置摄像头，“1“ 表示默认打开前置摄像头。默认值为“0“
                defaultCamera: '0'
            }
        },
        {
            namespace: 'recordVideo',
            os: ['ejs'],
            support: '3.1.2',
            defaultParams: {
                // 最大时长，单位为秒
                maxDuration: 120,
                className: hybridJs.os.android
                    ? 'com.epoint.baseapp.component.media.ShootActivity'
                    : 'EPTVideoRecordViewController'
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = rest;

                args[0].data = {
                    maxDuration: args[0].maxDuration
                };

                hybridJs.page.openLocal.apply(this, args as Parameters<EJSNamespace.pageType['openLocal']>);
            }
        },
        {
            namespace: 'getPreviewUrl',
            os: ['ejs']
        },
        {
            namespace: 'goSearch',
            os: ['ejs'],
            defaultParams: {
                searchType: '',
                conditions: ''
            }
        },
        {
            namespace: 'createQRCode',
            os: ['ejs'],
            support: '3.1.8',
            defaultParams: {
                qrCodeStr: '',
                size: 200
            }
        },
        {
            namespace: 'recognizeQRCode',
            os: ['ejs'],
            support: '3.1.8',
            defaultParams: {
                imgPath: '',
                imgBase64: ''
            },
            runCode(...rest) {
                const args = rest;
                const imgBase64 = args[0].imgBase64;

                args[0].imgBase64 = imgBase64 ? innerUtil.getBase64NotUrl(imgBase64) : '';

                hybridJs.callInner.apply(this, rest);
            }
        },
        {
            namespace: 'invokePluginApi',
            os: ['ejs'],
            support: '3.2.0',
            defaultParams: {
                path: '',
                dataMap: '',
                appVersion: '',
                isLongCb: false
            },
            runCode(this: any, ...rest) {
                const args = rest;
                const appVersion = args[0].appVersion;
                const self = this;

                this.api.isLongCb = args[0].isLongCb;
                if (appVersion) {
                    // 如果传了appVersion，比较一下容器版本
                    hybridJs.runtime.getAppVersion({
                        success: function (result) {
                            if (result.version && compareVersion(result.version, appVersion) >= 0) {
                                // 若容器版本大于传进来的最低版本
                                hybridJs.callInner.apply(self, rest);
                            } else {
                                const msg = `${args[0].dataMap.method}要求的容器版本至少为:${appVersion}，当前容器版本：${result.version}，请升级`;

                                hybridJs.showError(
                                    hybridJs.globalError.ERROR_TYPE_APINEEDHIGHNATIVEVERSION.code,
                                    msg
                                );
                            }
                        },
                        error: function (error) {
                            console.error(error);
                        }
                    });
                } else {
                    hybridJs.callInner.apply(this, rest);
                }
            }
        },
        {
            namespace: 'encrypt',
            os: ['ejs'],
            support: '3.2.3',
            defaultParams: {
                text: ''
            }
        },
        {
            namespace: 'decrypt',
            os: ['ejs'],
            support: '3.4.0',
            defaultParams: {
                text: ''
            }
        },
        {
            namespace: 'selectVideo',
            os: ['ejs'],
            support: '3.4.1.b',
            defaultParams: {
                // 选择视频的最大允许数量，默认为1
                videoCount: 1
            }
        }
    ]);
}
