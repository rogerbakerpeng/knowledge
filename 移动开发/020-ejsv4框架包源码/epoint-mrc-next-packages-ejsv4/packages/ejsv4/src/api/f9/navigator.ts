import { setTitle, setMultiTitle, setRightBtn } from './muilib/navigatortool';

export default function pageMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;

    hybridJs.extendModule('navigator', [
        {
            namespace: 'setTitle',
            os: ['h5'],
            defaultParams: {
                title: '',
                // 子标题
                subTitle: '',
                // 是否可点击，可点击时会有点击效果并且点击后会触发回调，不可点击时永远不会触发回调
                // 可点击时，title会有下拉箭头
                // promise调用时和其他长期回调一样立马then
                direction: 'bottom',
                // 是否可点击，如果为1，代表可点击，会在标题右侧出现一个下拉图标，并且能被点击监听
                clickable: 0
            },
            runCode(...rest) {
                const innerUtil = hybridJs.innerUtil;
                // 兼容字符串形式
                const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'title');
                const options = args[0];
                const resolve = args[1];

                setTitle(options);
                options.success && options.success({});
                resolve && resolve({});
            }
        },
        {
            namespace: 'setMultiTitle',
            os: ['h5'],
            defaultParams: {
                titles: ''
            },
            runCode(...rest) {
                const args = rest;
                const options = args[0];
                const resolve = args[1];

                setMultiTitle(options, (result) => {
                    options.success && options.success(result);
                    resolve && resolve(result);
                });
            }
        },
        {
            namespace: 'setRightBtn',
            os: ['h5'],
            defaultParams: {
                text: '',
                imageUrl: '',
                isShow: 1,
                // 对应哪一个按钮，一般是0, 1可选择
                which: 0
            },
            runCode(...rest) {
                const args = rest;
                const options = args[0];
                const resolve = args[1];

                setRightBtn(options, (result) => {
                    options.success && options.success(result);
                    resolve && resolve(result);
                });
            }
        }
    ]);
}
