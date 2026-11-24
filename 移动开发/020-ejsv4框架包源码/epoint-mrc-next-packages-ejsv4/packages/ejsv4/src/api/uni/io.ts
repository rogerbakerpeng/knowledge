import { warn, log } from '../../util/debug';

export default function ioMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('io', [
        {
            namespace: 'downloadFile',
            os: ['miniprogram', 'h5'],
            defaultParams: {
                // 下载地址
                url: '',
                // 指定文件下载路径
                filePath: '',
                // 新增自动打开下载文件参数 ejs3.4.0
                autoStart: 0
            },
            runCode(params, resolve, reject) {
                let fail = (err) => {
                    params.error && params.error(err);
                    reject && reject(err);
                };
                let saveSuccess = (res) => {
                    let obj = {
                        filePath: res.savedFilePath
                    };

                    if (params.autoStart) {
                        let openConfig: any = {
                            success() {
                                log('自动打开文件成功');
                            },
                            error(err) {
                                warn('自动打开文件失败', err);
                            }
                        };

                        if (params.fileName) {
                            let fileName = params.fileName.split('.');
                            let fileType = fileName[fileName.length - 1];
                            openConfig.fileType = fileType;
                        }
                        openConfig.path = res.savedFilePath;
                        // 自动打开文件
                        hybridJs.io.openFile(openConfig);
                    }

                    // 下载保存成功
                    params.success && params.success(obj);
                    resolve && resolve(obj);
                };

                let uniOption = {
                    url: params.url,
                    filePath: params.filePath,
                    success: (res) => {
                        if (hybridJs.os.h5) {
                            // H5端不支持自动打开文件
                            let obj = {
                                filePath: res.tempFilePath
                            };

                            params.success && params.success(obj);
                            resolve && resolve(obj);
                        } else if (hybridJs.os.wechat) {
                            if (params.filePath) {
                                // 传了filePath则不必重新保存，可直接打开
                                saveSuccess({
                                    savedFilePath: res.filePath
                                });
                            } else {
                                // 微信小程序使用微信的文件管理器保存文件
                                const fs = wx.getFileSystemManager();
                                fs.saveFile({
                                    tempFilePath: res.tempFilePath,
                                    success: saveSuccess,
                                    fail
                                });
                            }
                        } else {
                            // 保存本地临时路径
                            uni.saveFile({
                                tempFilePath: res.tempFilePath,
                                success: saveSuccess,
                                fail
                            });
                        }
                    },
                    fail
                };

                uni.downloadFile(Object.assign({}, params, uniOption));
            }
        },
        {
            namespace: 'selectFile',
            os: ['miniprogram', 'h5'],
            defaultParams: {
                multi: 0,
                // 文件数量
                count: 9
            },
            runCode(params, resolve, reject) {
                if (!params.multi) {
                    params.count = 1;
                } else {
                    params.count = params.count || 999;
                }

                if (hybridJs.os.h5 || hybridJs.os.ejs) {
                    let uniOption = {
                        count: params.count,
                        success(res) {
                            let result = {
                                resultData: res.tempFilePaths.length > 1 ? res.tempFilePaths : res.tempFilePaths[0],
                                tempFiles: res.tempFiles
                            };

                            params.success && params.success(result);
                            resolve && resolve(result);
                        },
                        fail(err) {
                            params.error && params.error(err);
                            reject && reject(err);
                        }
                    };

                    uni.chooseFile(Object.assign({}, params, uniOption));
                } else if (hybridJs.os.wechat) {
                    let uniOption = {
                        count: params.count,
                        success(res) {
                            let arr = res.tempFiles.map((item) => {
                                return item.path;
                            });
                            let result = {
                                resultData: arr.length > 1 ? arr : arr[0],
                                tempFiles: res.tempFiles
                            };

                            params.success && params.success(result);
                            resolve && resolve(result);
                        },
                        fail(err) {
                            params.error && params.error(err);
                            reject && reject(err);
                        }
                    };

                    wx.chooseMessageFile(Object.assign({}, params, uniOption));
                } else {
                    let msg = 'selectFile仅支持H5和微信端';

                    params.error && params.error(msg);
                    reject && reject(msg);
                }
            }
        },
        {
            namespace: 'openFile',
            os: ['miniprogram'],
            defaultParams: {
                path: ''
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'path');
                const options = args[0];
                const resolve = args[1];
                const reject = args[2];

                let docarr = ['doc', 'xls', 'ppt', 'pdf', 'docx', 'xlsx', 'pptx'];
                let imgarr = [
                    'xbm',
                    'tif',
                    'pjp',
                    'svgz',
                    'jpg',
                    'jpeg',
                    'ico',
                    'tiff',
                    'gif',
                    'svg',
                    'jfif',
                    'webp',
                    'png',
                    'bmp',
                    'pjpeg',
                    'avif'
                ];
                let typearr = options.path.split('.');
                let type = (options.fileType || typearr[typearr.length - 1]).toLowerCase();

                if (docarr.indexOf(type) > -1) {
                    // 非媒体文件
                    let uniOption: {
                        filePath: string;
                        fileType?: string;
                        success(): void;
                        fail(err: any): void;
                    };

                    uniOption = {
                        filePath: options.path,
                        success() {
                            options.success && options.success();
                            resolve && resolve();
                        },
                        fail(err) {
                            options.error && options.error(err);
                            reject && reject(err);
                        }
                    };

                    if (hybridJs.os.alipay) {
                        uniOption.fileType = 'pdf';
                    }
                    uni.openDocument(Object.assign({}, options, uniOption));
                } else if (imgarr.indexOf(type) > -1) {
                    let uniOption = {
                        urls: [options.path],
                        success() {
                            options.success && options.success();
                            resolve && resolve();
                        },
                        fail(err) {
                            options.error && options.error(err);
                            reject && reject(err);
                        }
                    };

                    uni.previewImage(Object.assign({}, options, uniOption));
                }
            }
        },
        {
            namespace: 'deleteFile',
            os: ['miniprogram'],
            defaultParams: {
                path: ''
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'path');
                const options = args[0];
                const resolve = args[1];
                const reject = args[2];

                uni.removeSavedFile({
                    filePath: options.path,
                    success() {
                        options.success && options.success();
                        resolve && resolve();
                    },
                    fail(err) {
                        options.error && options.error(err);
                        reject && reject(err);
                    }
                });
            }
        },
        {
            namespace: 'getFileSize',
            os: ['miniprogram', 'h5'],
            defaultParams: {
                path: ''
            },
            runCode(options, resolve, reject) {
                let uniOption = {
                    filePath: options.path,
                    success(res) {
                        let result = {
                            size: res.size
                        };

                        options.success && options.success(result);
                        resolve && resolve(result);
                    },
                    fail(err) {
                        options.error && options.error(err);
                        reject && reject(err);
                    }
                };

                uni.getFileInfo(Object.assign({}, options, uniOption));
            }
        }
    ]);
}
