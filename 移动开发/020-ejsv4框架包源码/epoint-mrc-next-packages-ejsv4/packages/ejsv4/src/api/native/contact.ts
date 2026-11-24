import { compareVersion } from '../../util/lang';

export default function contactMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;

    // contact是底层用的openLocal
    hybridJs.extendModule('contact', [
        {
            namespace: 'choose',
            os: ['ejs'],
            defaultParams: {
                // 已选人员的用户guid列表
                userguids: [],
                className: hybridJs.os.android
                    ? 'com.epoint.baseapp.component.chooseperson.PersonChooseActivity'
                    : 'WPLPersonnelSelectViewController'
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = rest;

                args[0].data = {
                    userguids: args[0].userguids
                };
                args[0].userguids = '';
                hybridJs.page.openLocal.apply(this, args as Parameters<EJSNamespace.pageType['openLocal']>);
            }
        },
        {
            namespace: 'select',
            os: ['ejs'],
            defaultParams: {
                token: '',
                url: '',
                // 已选人员的用户guid列表
                selectedusers: [],
                unableselectusers: [],
                issingle: '0',
                maxchoosecount: 500,
                isouonly: '0',
                isgroupenable: '0',
                selectedous: [],
                custom: ''
            },
            runCode(...rest) {
                const args = rest;
                const options = args[0];
                const resolve = args[1];
                const reject = args[2];

                // 比较版本号是否大于3.2.0
                hybridJs.runtime.getEjsVersion({
                    success(result) {
                        const appVersion = result.version;

                        if (compareVersion('3.2.0', appVersion) > 0) {
                            if (!SelectPerson) {
                                let msg = '未引入全局函数SelectPerson！';
            
                                console.error(msg);
                                options.error && options.error(msg);
                                reject && reject(msg);
            
                                return;
                            }
            
                            let success = options.confirm || options.success;

                            options.success = (result) => {
                                success && success(result);
                                resolve && resolve(result);
                            };

                            options.confirm = options.success;

                            // @ts-ignore
                            SelectPerson(options, hybridJs, (result) => {
                                options.success && options.success(result);
                                resolve && resolve(result);
                            });
                        } else {
                            hybridJs.util.invokePluginApi({
                                path: 'workplatform.provider.openNewPage',
                                dataMap: {
                                    method: 'goSelectPerson',
                                    issingle: options.issingle,
                                    unableselectusers: options.unableselectusers,
                                    selectedusers: options.selectedusers,
                                    isgroupenable: options.isgroupenable,
                                    maxchoosecount: options.maxchoosecount,
                                    selectedous: options.selectedous,
                                    isouonly: options.isouonly,
                                    custom: options.custom
                                },
                                success: (res) => {
                                    options.success && options.success(res);
                                    resolve && resolve(res);
                                },
                                error: (err) => {
                                    options.error && options.error(err);
                                    resolve && resolve(err);
                                }
                            });
                        }
                    },
                    error(error) {
                        options.error && options.error(error);
                    }
                });
            }
        }
    ]);
}
