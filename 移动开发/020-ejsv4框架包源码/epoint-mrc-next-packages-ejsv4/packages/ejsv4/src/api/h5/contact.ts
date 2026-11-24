export default function contactMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;

    // contact是底层用的openLocal
    hybridJs.extendModule('contact', [
        {
            namespace: 'select',
            os: ['h5'],
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
                // 兼容字符串形式
                const args = rest;
                const options = args[0];
                const resolve = args[1];
                const reject = args[2];

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
            }
        }
    ]);
}
