import encrypt from './muilib/encrypt';

export default function utilMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;

    hybridJs.extendModule('util', [
        {
            namespace: 'encrypt',
            os: ['h5'],
            defaultParams: {
                type: '1',
                keys: [],
                text: ''
            },
            runCode(params, resolve, reject) {
                encrypt(params, resolve, reject);
            }
        }
    ]);
}
