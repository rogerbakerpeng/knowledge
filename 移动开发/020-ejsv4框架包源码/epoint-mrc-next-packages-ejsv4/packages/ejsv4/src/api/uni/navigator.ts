export default function navigatorMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;
    const innerUtil = hybridJs.innerUtil;

    /**
     * 按钮最多允许6个英文字符，或3个中文
     */
    // const MAX_BTN_TEXT_COUNT = 6;

    hybridJs.extendModule('navigator', [
        {
            namespace: 'setTitle',
            os: ['miniprogram', 'h5'],
            defaultParams: {
                title: ''
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'title');
                const options = args[0];
                const resolve = args[1];
                const reject = args[2];

                uni.setNavigationBarTitle({
                    title: options.title,
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
            namespace: 'setNavigationBarColor',
            os: ['miniprogram', 'h5'],
            defaultParams: {
                frontColor: '#ffffff',
                backgroundColor: '#ff0000',
                animation: null
            },
            runCode(...rest) {
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'title');
                const options = args[0];
                const resolve = args[1];
                const reject = args[2];

                uni.setNavigationBarColor({
                    frontColor: options.frontColor,
                    backgroundColor: options.backgroundColor,
                    animation: options.animation,
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
        }
    ]);
}
