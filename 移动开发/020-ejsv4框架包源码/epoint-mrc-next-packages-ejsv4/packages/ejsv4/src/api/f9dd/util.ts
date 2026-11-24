import invokePluginApi from './lib/utiltool';
import ddF9Config from './lib/ddconfig';

export default function utilMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;

    hybridJs.extendModule('util', [
        {
            namespace: 'invokePluginApi',
            os: ['dd'],
            support: '3.2.0',
            defaultParams: {
                path: '',
                dataMap: ''
            },
            runCode(...rest) {
                const args = rest;
                const options = args[0];
                const resolve = args[1];

                // callDDByArgs(args, dd.biz.contact.complexPicker);
                ddF9Config().then(() => {
                    invokePluginApi(options, (result) => {
                        options.success && options.success(result);
                        resolve && resolve(result);
                    });
                });
            }
        }
    ]);
}
