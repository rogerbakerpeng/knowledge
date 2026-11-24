import encrypt from '../h5/muilib/encrypt';

export default function utilMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;

    hybridJs.extendModule('util', [
        {
            namespace: 'scan',
            os: ['miniprogram'],
            runCode(options, resolve, reject) {
                let uniOption = {
                    success(res) {
                        let result = {
                            resultData: res.result
                        };

                        result = Object.assign({}, res, result);
                        options.success && options.success(result);
                        resolve && resolve(result);
                    },
                    fail(err) {
                        options.error && options.error(err);
                        reject && reject(err);
                    }
                };

                uni.scanCode(Object.assign({}, options, uniOption));
            }
        },
        {
            namespace: 'selectImage',
            os: ['miniprogram', 'h5'],
            defaultParams: {
                // 图片数量
                photoCount: 9,
                // 是否允许拍照，1：允许；0：不允许
                showCamera: 0
            },
            runCode(options, resolve, reject) {
                let uniOption = {
                    count: options.photoCount,
                    sourceType: options.showCamera ? ['album', 'camera'] : ['album'],
                    success(res) {
                        let result = {
                            resultData: res.tempFilePaths,
                            tempFiles: res.tempFiles
                        };

                        options.success && options.success(result);
                        resolve && resolve(result);
                    },
                    fail(err) {
                        options.error && options.error(err);
                        reject && reject(err);
                    }
                };

                uni.chooseImage(Object.assign({}, options, uniOption));
            }
        },
        {
            namespace: 'prevImage',
            os: ['miniprogram', 'h5'],
            defaultParams: {
                // 默认显示图片序号
                index: 0,
                // 图片地址，json数组格式，item为元素本地地址
                selectedPhotos: []
            },
            runCode(options, resolve, reject) {
                let uniOption = {
                    current: options.index,
                    urls: options.selectedPhotos,
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
        },
        {
            namespace: 'cameraImage',
            os: ['miniprogram', 'h5'],
            defaultParams: {
                width: 720,
                // 压缩质量
                quality: 70
            },
            runCode(options, resolve, reject) {
                let uniOption = {
                    count: 1,
                    sourceType: ['camera'],
                    crop: {
                        quality: options.quality,
                        width: options.width
                    },
                    success(res) {
                        let result = {
                            resultData: res.tempFilePaths[0],
                            tempFile: res.tempFiles[0]
                        };

                        options.success && options.success(result);
                        resolve && resolve(result);
                    },
                    fail(err) {
                        options.error && options.error(err);
                        reject && reject(err);
                    }
                };

                uni.chooseImage(Object.assign({}, options, uniOption));
            }
        },
        {
            namespace: 'recordVideo',
            os: ['miniprogram', 'h5'],
            defaultParams: {
                // 最大时长，单位为秒
                maxDuration: 60
            },
            runCode(options, resolve, reject) {
                let uniOption = {
                    maxDuration: options.maxDuration,
                    sourceType: ['camera'],
                    success(res) {
                        let result = {
                            resultData: res.tempFilePath
                        };

                        result = Object.assign({}, res, result);

                        options.success && options.success(result);
                        resolve && resolve(result);
                    },
                    fail(err) {
                        options.error && options.error(err);
                        reject && reject(err);
                    }
                };

                uni.chooseVideo(Object.assign({}, options, uniOption));
            }
        },
        {
            namespace: 'encrypt',
            os: ['miniprogram', 'h5'],
            defaultParams: {
                type: '1',
                keys: [],
                text: ''
            },
            runCode(params, resolve, reject) {
                encrypt(params, resolve, reject);
            }
        },
        {
            namespace: 'selectVideo',
            os: ['miniprogram', 'h5'],
            runCode(options, resolve, reject) {
                let uniOption = {
                    sourceType: ['album'],
                    success(res) {
                        let result = {
                            resultData: res.tempFilePath
                        };

                        result = Object.assign({}, res, result);

                        options.success && options.success(result);
                        resolve && resolve(result);
                    },
                    fail(err) {
                        options.error && options.error(err);
                        reject && reject(err);
                    }
                };

                uni.chooseVideo(Object.assign({}, options, uniOption));
            }
        },
        {
            namespace: 'saveImageToPhotosAlbum',
            os: ['miniprogram'],
            defaultParams: {
                filePath: ''
            },
            runCode(options, resolve, reject) {
                let uniOption = {
                    filePath: options.filePath,
                    success() {
                        options.success && options.success();
                        resolve && resolve();
                    },
                    fail(err) {
                        options.error && options.error(err);
                        reject && reject(err);
                    }
                };

                uni.saveImageToPhotosAlbum(Object.assign({}, options, uniOption));
            }
        },
        {
            namespace: 'saveVideoToPhotosAlbum',
            os: ['miniprogram'],
            defaultParams: {
                filePath: ''
            },
            runCode(options, resolve, reject) {
                let uniOption = {
                    filePath: options.filePath,
                    success() {
                        options.success && options.success();
                        resolve && resolve();
                    },
                    fail(err) {
                        options.error && options.error(err);
                        reject && reject(err);
                    }
                };

                uni.saveVideoToPhotosAlbum(Object.assign({}, options, uniOption));
            }
        }
    ]);
}
