export default function eventMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const showError = hybridJs.showError;
    const globalError = hybridJs.globalError;

    /**
     * 检查环境是否合法，包括
     * 检测是否有检测版本号，如果不是，给出错误提示
     * 是否版本号小于容器版本号，如果小于，给予升级提示
     * @param {Object} hy hybrid对象
     */
    function checkEnvAndPrompt(hy) {
        if (!hy.runtime || !hy.runtime.getEjsVersion) {
            showError(globalError.ERROR_TYPE_VERSIONNOTSUPPORT.code, globalError.ERROR_TYPE_VERSIONNOTSUPPORT.msg);
        } else {
            hy.runtime.getEjsVersion({
                success: (result) => {
                    /**
                     * 版本可以有差异
                        const version = `${result.version} `;

                        if (compareVersion(hybridJs.version, version) < 0) {
                            showError(
                                globalError.ERROR_TYPE_VERSIONNEEDUPGRADE.code,
                                globalError.ERROR_TYPE_VERSIONNEEDUPGRADE.msg);
                        }
                    */
                    // 记录原生容器的版本号
                    hybridJs.nativeVersion = result.version;
                },
                error: () => {
                    showError(
                        globalError.ERROR_TYPE_INITVERSIONERROR.code,
                        globalError.ERROR_TYPE_INITVERSIONERROR.msg
                    );
                }
            });
        }
    }

    hybridJs.extendModule('event', [
        {
            namespace: 'config',
            os: ['ejs'],
            defaultParams: {
                // 一个数组，不要传null，否则可能在iOS中会有问题
                jsApiList: []
            },
            runCode(...rest) {
                const args = rest;

                checkEnvAndPrompt(hybridJs);

                hybridJs.callInner.apply(this, args);
            }
        }
    ]);
}
